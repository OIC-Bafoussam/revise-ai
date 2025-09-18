// app/controllers/Http/FlashcardsController.ts

import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import gemini from '#services/gemini_service' // Import Gemini service
import File from '#models/File' // Import File model
import RevisionItem from '#models/revision_item' // Import RevisionItem model
import PDFParser from 'pdf2json' // Import the pdf2json library

export default class FlashcardsController {
  /**
   * Génère des flashcards à partir d'un fichier uploadé en utilisant l'API Gemini.
   * Prend en charge les fichiers texte, images et PDF en ajustant dynamiquement l'entrée de l'IA.
   * Il enregistre ensuite les flashcards générées comme un élément de révision.
   */
  async generate({ request, response, auth }: HttpContext) {
    try {
      // 1. Récupérer le nom du fichier depuis le corps de la requête.
      const { fileName } = request.only(['fileName'])
      const user = auth.user // L'utilisateur authentifié

      if (!fileName) {
        return response.badRequest({ message: 'Le nom du fichier est requis.' })
      }
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      // 2. Trouver le fichier uploadé dans la base de données
      const uploadedFile = await File.findBy('file_name', fileName)
      if (!uploadedFile || uploadedFile.userId !== user.id) {
        console.error('Erreur de génération de flashcards : Fichier introuvable ou non autorisé pour l\'utilisateur.', { fileName, userId: user.id });
        return response.notFound({ message: 'Fichier non trouvé ou non autorisé.' })
      }

      // 3. Construire le chemin complet du fichier sur le système de fichiers.
      const uploadPath = fileURLToPath(new URL('../../../public/uploads/', import.meta.url))
      const filePath = path.join(uploadPath, uploadedFile.fileName)
      const fileExtension = uploadedFile.fileName.split('.').pop()?.toLowerCase() || '';

      // Type pour les parties de contenu de Gemini
      type GeminiContentPart = string | { text: string } | { inlineData: { data: string, mimeType: string } };
      let aiInput: GeminiContentPart[];

      // 4. Préparer l'entrée de l'IA en fonction du type de fichier
      const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg']; 

      if (imageExtensions.includes(fileExtension)) {
        // Gérer les fichiers image
        const imageBuffer = await fs.readFile(filePath); // Lire en tant que tampon binaire
        const base64Image = imageBuffer.toString('base64');
        const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`; // Ajuster pour JPG

        console.log(`Préparation de l'entrée image pour Gemini (flashcards) : ${fileName}, MIME : ${mimeType}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `Génère un ensemble de flashcards à partir de cette image. Chaque flashcard doit avoir une question et une réponse. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre de l'ensemble de Flashcards (à partir de l'image)",
            "flashcards": [
              {
                "question": "Question de la flashcard 1 ?",
                "answer": "Réponse de la flashcard 1."
              },
              // ... plus de flashcards
            ]
          }
          
          Réponse JSON :`,
          { // Directement un objet pour la partie inlineData
            inlineData: { data: base64Image, mimeType: mimeType }
          },
        ];
      } else if (fileExtension === 'txt') {
        // Gérer les fichiers texte
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log(`Préparation de l'entrée texte pour Gemini (flashcards) : ${fileName}. Longueur du contenu : ${fileContent.length}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `À partir du texte suivant, génère un ensemble de flashcards. Chaque flashcard doit avoir une question et une réponse. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre de l'ensemble de Flashcards",
            "flashcards": [
              {
                "question": "Question de la flashcard 1 ?",
                "answer": "Réponse de la flashcard 1."
              },
              // ... plus de flashcards
            ]
          }
          
          Contenu à analyser :
          """
          ${fileContent}
          """
          
          Réponse JSON :`,
        ];
      } else if (fileExtension === 'pdf') {
        // Gérer les fichiers PDF à l'aide de pdf2json
        const dataBuffer = await fs.readFile(filePath);
        const pdfParser = new PDFParser();

        let pdfContent = '';
        await new Promise<void>((resolve, reject) => {
          pdfParser.on('pdfParser_dataReady', (pdfData) => {
            // pdf2json fournit le texte page par page
            pdfContent = pdfData.Pages.map((page) =>
              page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(' ')
            ).join('\n');
            resolve();
          });

          pdfParser.on('pdfParser_dataError', (errData) => {
            console.error('Erreur de parsing PDF :', errData.parserError);
            reject(new Error(`Échec du parsing du PDF : ${errData.parserError}`));
          });

          pdfParser.parseBuffer(dataBuffer);
        });

        if (!pdfContent.trim()) {
            return response.badRequest({ message: 'Le fichier PDF ne contient pas de texte lisible ou est vide.' });
        }
        
        console.log(`Préparation de l'entrée texte PDF pour Gemini (flashcards) : ${fileName}. Longueur du contenu : ${pdfContent.length}`);
        aiInput = [
          {
            text: `À partir du contenu PDF suivant, génère un ensemble de flashcards. Chaque flashcard doit avoir une question et une réponse. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre de l'ensemble de Flashcards",
            "flashcards": [
              {
                "question": "Question de la flashcard 1 ?",
                "answer": "Réponse de la flashcard 1."
              },
              // ... plus de flashcards
            ]
          }
          
          Contenu à analyser à partir du PDF :
          """
          ${pdfContent}
          """
          
          Réponse JSON :`
          },
        ];
      }
      else {
        // Retour pour les types de fichiers non pris en charge
        return response.badRequest({ message: `Type de fichier non pris en charge pour la génération par l'IA : .${fileExtension}. Actuellement pris en charge : .txt, .pdf et formats d'image.` });
      }

      // 5. Appeler l'API Gemini pour générer les flashcards.
      let flashcardsContent: any;
      try {
        flashcardsContent = await this.callAIModelForFlashcards(aiInput); // Passer l'entrée IA préparée
        console.log('Appel de l\'API Gemini pour les flashcards réussi.');
      } catch (geminiError) {
        console.error('Erreur lors de l\'appel de l\'API Gemini pour les flashcards :', geminiError);
        return response.internalServerError({ message: 'Échec de la génération des flashcards avec le modèle IA.' });
      }

      // 6. Enregistrer les flashcards générées comme un RevisionItem dans la base de données.
      const revisionItem = await RevisionItem.create({
        title: flashcardsContent.title || `Flashcards de ${uploadedFile.originalName}`, // Utiliser le titre généré ou un fallback
        fileId: uploadedFile.id,
        userId: user.id,
        type: 'flashcard',
        content: flashcardsContent, // Stocker le JSON complet des flashcards
      })
      console.log('Flashcards enregistrées dans la base de données en tant qu\'élément de révision :', revisionItem.id);


      // 7. Renvoyer les flashcards générées et l'élément de révision créé en réponse.
      return response.ok({
        message: 'Flashcards générées et enregistrées avec succès !',
        flashcards: flashcardsContent,
        revisionItem,
      })

    } catch (error) {
      console.error('Erreur générale lors de la génération des flashcards :', error)
      return response.internalServerError({ message: 'Une erreur est survenue lors de la génération des flashcards.' })
    }
  }

  /**
   * Fonction pour appeler le modèle IA Gemini et générer des flashcards.
   * Cette méthode accepte maintenant un tableau de parties pour une entrée multimodale.
   * @param {GeminiContentPart[]} aiInput - Le contenu à envoyer à Gemini (texte ou parties multimodales).
   * @returns {Promise<any[]>} - Un tableau de flashcards générées par l'IA au format JSON.
   */
  private async callAIModelForFlashcards(aiInput: GeminiContentPart[]): Promise<any[]> {
    console.log('Envoi des prompts à l\'API Gemini pour les flashcards...');
    const result = await gemini.generateContent(aiInput); 
    let responseText = result.response.text(); 
    console.log('Réponse reçue de l\'API Gemini pour les flashcards.');
    console.log('Texte brut de la réponse Gemini (premiers 500 caractères) :', responseText.substring(0, 500)); 

    // Nettoyer la réponse pour supprimer les wrappers markdown
    if (responseText.startsWith('```json')) {
      responseText = responseText.substring(
        responseText.indexOf('\n') + 1, // Commencer après le '```json' et le retour à la ligne
        responseText.lastIndexOf('```') // Finir avant le dernier '```'
      ).trim(); // Supprimer les espaces blancs restants
      console.log('Réponse Gemini nettoyée des wrappers markdown pour les flashcards.');
    }

    // Parser le JSON
    try {
      const parsedFlashcards = JSON.parse(responseText.trim());
      console.log('Réponse JSON Gemini parsée avec succès pour les flashcards.');
      return parsedFlashcards;
    } catch (parseError: any) {
      console.error('Erreur lors du parsing de la réponse JSON de Gemini pour les flashcards :', parseError);
      console.error('Texte brut complet de la réponse qui a échoué le parsing (après nettoyage potentiel) :', responseText.trim());
      throw new Error(`Échec du parsing de la réponse IA en JSON pour les flashcards : ${parseError.message}. Réponse brute : ${responseText.trim().substring(0, 200)}...`);
    }
  }
}
