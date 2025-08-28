// app/controllers/Http/QuizController.ts

import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import gemini from '#services/gemini_service' // Import Gemini service
import File from '#models/File' // Import File model
import RevisionItem from '#models/revision_item' // Import RevisionItem model
import PDFParser from 'pdf2json' // Import the pdf2json library

export default class QuizController {
  /**
   * Génère un quiz à partir d'un fichier uploadé en utilisant l'API Gemini.
   * Prend en charge les fichiers texte et image en ajustant dynamiquement l'entrée de l'IA.
   * Il enregistre ensuite le quiz généré comme un élément de révision.
   */
  async generate({ request, response, auth }: HttpContext) {
    try {
      const { fileName } = request.only(['fileName'])
      const user = auth.user // Récupérer l'utilisateur authentifié

      if (!fileName) {
        return response.badRequest({ message: 'Le nom du fichier est requis.' })
      }
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      // 1. Trouver le fichier uploadé dans la base de données
      const uploadedFile = await File.findBy('file_name', fileName)
      if (!uploadedFile || uploadedFile.userId !== user.id) {
        console.error('Erreur de génération du quiz : Fichier introuvable ou non autorisé pour l\'utilisateur.', { fileName, userId: user.id });
        return response.notFound({ message: 'Fichier introuvable ou non autorisé.' })
      }

      // 2. Construire le chemin complet du fichier sur le système de fichiers
      const uploadPath = fileURLToPath(new URL('../../../public/uploads/', import.meta.url))
      const filePath = path.join(uploadPath, uploadedFile.fileName)
      const fileExtension = uploadedFile.fileName.split('.').pop()?.toLowerCase() || '';

      // Type pour les parties de contenu de Gemini. Le premier élément peut être une chaîne directe.
      type GeminiContentPart = string | { text: string } | { inlineData: { data: string, mimeType: string } };
      let aiInput: GeminiContentPart[];

      // 3. Préparer l'entrée de l'IA en fonction du type de fichier
      const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg']; 

      if (imageExtensions.includes(fileExtension)) {
        // Gérer les fichiers image
        const imageBuffer = await fs.readFile(filePath); // Lire en tant que tampon binaire
        const base64Image = imageBuffer.toString('base64');
        const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`; // Ajuster pour JPG

        console.log(`Préparation de l'entrée image pour Gemini : ${fileName}, MIME : ${mimeType}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `Génère un quiz de 5 questions à choix multiples à partir de cette image. Chaque question doit avoir 4 options, dont une seule est correcte. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre du quiz (à partir du contenu de l'image)",
            "questions": [
              {
                "questionText": "Texte de la question 1 ?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A"
              },
              // ... plus de questions
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
        console.log(`Préparation de l'entrée texte pour Gemini : ${fileName}. Longueur du contenu : ${fileContent.length}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `À partir du texte suivant, génère un quiz de 5 questions à choix multiples. Chaque question doit avoir 4 options, dont une seule est correcte. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre du quiz",
            "questions": [
              {
                "questionText": "Texte de la question 1 ?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A"
              },
              // ... plus de questions
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
        
        console.log(`Préparation de l'entrée texte PDF pour Gemini : ${fileName}. Longueur du contenu : ${pdfContent.length}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `À partir du contenu PDF suivant, génère un quiz de 5 questions à choix multiples. Chaque question doit avoir 4 options, dont une seule est correcte. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre du quiz",
            "questions": [
              {
                "questionText": "Texte de la question 1 ?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A"
              },
              // ... plus de questions
            ]
          }
          
          Contenu à analyser à partir du PDF :
          """
          ${pdfContent}
          """
          
          Réponse JSON :`,
        ];
      }
      else {
        // Retour pour les types de fichiers non pris en charge
        return response.badRequest({ message: `Type de fichier non pris en charge pour la génération par l'IA : .${fileExtension}. Actuellement pris en charge : .txt, .pdf et formats d'image.` });
      }

      // 4. Appeler l'API Gemini pour générer le quiz
      let quizContent: any;
      try {
        quizContent = await this.callAIModelForQuiz(aiInput); // Passer l'entrée IA préparée
        console.log('Appel de l\'API Gemini pour le quiz réussi.');
      } catch (geminiError) {
        console.error('Erreur lors de l\'appel de l\'API Gemini pour le quiz :', geminiError);
        return response.internalServerError({ message: 'Échec de la génération du quiz avec le modèle IA.' });
      }

      // 5. Enregistrer le quiz généré en tant qu'élément de révision dans la base de données
      let revisionItem: RevisionItem;
      try {
        revisionItem = await RevisionItem.create({
          title: quizContent.title || `Quiz de ${uploadedFile.originalName}`,
          fileId: uploadedFile.id,
          userId: user.id,
          type: 'quiz',
          content: quizContent,
        });
        console.log('Quiz enregistré dans la base de données en tant qu\'élément de révision :', revisionItem.id);
      } catch (dbError) {
        console.error('Erreur lors de l\'enregistrement du quiz dans la base de données :', dbError);
        return response.internalServerError({ message: 'Échec de l\'enregistrement du quiz généré dans la base de données.' });
      }
      
      // 6. Renvoyer le quiz généré et l'élément de révision créé
      return response.ok({
        message: 'Quiz généré et enregistré avec succès !',
        quiz: quizContent,
        revisionItem,
      })

    } catch (error) {
      console.error('Erreur générale lors de la génération du quiz :', error);
      return response.internalServerError({ message: 'Une erreur inattendue s\'est produite lors de la génération du quiz.' });
    }
  }

  /**
   * Fonction pour appeler le modèle IA Gemini et générer un quiz.
   * Cette méthode accepte maintenant un tableau de parties pour une entrée multimodale.
   * @param {GeminiContentPart[]} aiInput - Le contenu à envoyer à Gemini (texte ou parties multimodales).
   * @returns {Promise<any>} - Les données du quiz généré par l'IA au format JSON.
   */
  private async callAIModelForQuiz(aiInput: GeminiContentPart[]): Promise<any> {
    console.log('Envoi des prompts à l\'API Gemini...');
    // CHANGEMENT ICI : Passer le tableau aiInput directement à gemini.generateContent
    const result = await gemini.generateContent(aiInput); 
    let responseText = result.response.text();
    console.log('Réponse reçue de l\'API Gemini.');
    console.log('Texte brut de la réponse Gemini (premiers 500 caractères) :', responseText.substring(0, 500));

    // Nettoyer la réponse pour supprimer les wrappers markdown
    if (responseText.startsWith('```json')) {
      responseText = responseText.substring(
        responseText.indexOf('\n') + 1,
        responseText.lastIndexOf('```')
      ).trim();
      console.log('Réponse Gemini nettoyée des wrappers markdown.');
    }

    // Parser le JSON
    try {
      const parsedQuiz = JSON.parse(responseText.trim());
      console.log('Réponse JSON Gemini parsée avec succès.');
      return parsedQuiz;
    } catch (parseError) {
      console.error('Erreur lors du parsing de la réponse JSON de Gemini pour le quiz :', parseError);
      console.error('Texte brut complet de la réponse qui a échoué le parsing (après nettoyage potentiel) :', responseText.trim());
      throw new Error(`Échec du parsing de la réponse IA en JSON : ${parseError.message}. Réponse brute : ${responseText.trim().substring(0, 200)}...`);
    }
  }
}
