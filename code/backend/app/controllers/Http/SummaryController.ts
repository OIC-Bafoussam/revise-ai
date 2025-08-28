// app/controllers/Http/SummaryController.ts

import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import gemini from '#services/gemini_service' // Importez le service Gemini
import File from '#models/File' // Importez le modèle File
import RevisionItem from '#models/revision_item' // Importez le modèle RevisionItem
import PDFParser from 'pdf2json' // Importez la bibliothèque pdf2json

export default class SummaryController {
  /**
   * Génère un résumé à partir d'un fichier uploadé en utilisant l'API Gemini.
   * Prend en charge les fichiers texte, images et PDF en ajustant dynamiquement l'entrée de l'IA.
   * Il enregistre ensuite le résumé généré comme un élément de révision.
   */
  async generate({ request, response, auth }: HttpContext) {
    try {
      const { fileName } = request.only(['fileName'])
      const user = auth.user // L'utilisateur authentifié

      if (!fileName) {
        return response.badRequest({ message: 'Le nom du fichier est requis.' })
      }
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      // 1. Trouver le fichier uploadé dans la base de données
      const uploadedFile = await File.findBy('file_name', fileName)
      if (!uploadedFile || uploadedFile.userId !== user.id) {
        console.error('Erreur de génération de résumé : Fichier introuvable ou non autorisé pour l\'utilisateur.', { fileName, userId: user.id });
        return response.notFound({ message: 'Fichier non trouvé ou non autorisé.' })
      }

      // 2. Construire le chemin complet du fichier sur le système de fichiers
      const uploadPath = fileURLToPath(new URL('../../../public/uploads/', import.meta.url))
      const filePath = path.join(uploadPath, uploadedFile.fileName)
      const fileExtension = uploadedFile.fileName.split('.').pop()?.toLowerCase() || '';

      // Type pour les parties de contenu de Gemini
      type GeminiContentPart = string | { text: string } | { inlineData: { data: string, mimeType: string } };
      let aiInput: GeminiContentPart[];

      // 3. Préparer l'entrée de l'IA en fonction du type de fichier
      const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg']; 

      if (imageExtensions.includes(fileExtension)) {
        // Gérer les fichiers image
        const imageBuffer = await fs.readFile(filePath); // Lire en tant que tampon binaire
        const base64Image = imageBuffer.toString('base64');
        const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`; // Ajuster pour JPG

        console.log(`Préparation de l'entrée image pour Gemini (résumé) : ${fileName}, MIME : ${mimeType}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `Génère un résumé concis et pertinent à partir de cette image. La réponse doit être au format JSON et inclure un titre pour le résumé.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre du Résumé (à partir de l'image)",
            "summaryText": "Ceci est le texte détaillé du résumé..."
          }
          
          Réponse JSON :`,
          { // Directement un objet pour la partie inlineData
            inlineData: { data: base64Image, mimeType: mimeType }
          },
        ];
      } else if (fileExtension === 'txt') {
        // Gérer les fichiers texte
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log(`Préparation de l'entrée texte pour Gemini (résumé) : ${fileName}. Longueur du contenu : ${fileContent.length}`);
        aiInput = [
          // Le prompt textuel est maintenant une chaîne directe
          `À partir du texte suivant, génère un résumé concis et pertinent. La réponse doit être au format JSON et inclure un titre pour le résumé.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre du Résumé",
            "summaryText": "Ceci est le texte détaillé du résumé..."
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
        
        console.log(`Préparation de l'entrée texte PDF pour Gemini (résumé) : ${fileName}. Longueur du contenu : ${pdfContent.length}`);
        aiInput = [
          {
            text: `À partir du contenu PDF suivant, génère un résumé concis et pertinent. La réponse doit être au format JSON et inclure un titre pour le résumé.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre du Résumé",
            "summaryText": "Ceci est le texte détaillé du résumé..."
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

      // 4. Appeler l'API Gemini pour générer le résumé
      let summaryContent: {title: string, summaryText: string};
      try {
        summaryContent = await this.callAIModelForSummary(aiInput); // Passer l'entrée IA préparée
        console.log('Appel de l\'API Gemini pour le résumé réussi.');
      } catch (geminiError) {
        console.error('Erreur lors de l\'appel de l\'API Gemini pour le résumé :', geminiError);
        return response.internalServerError({ message: 'Échec de la génération du résumé avec le modèle IA.' });
      }

      // 5. Enregistrer le résumé généré comme un RevisionItem dans la base de données
      const revisionItem = await RevisionItem.create({
        title: summaryContent.title,
        fileId: uploadedFile.id,
        userId: user.id,
        type: 'summary',
        content: summaryContent, // Stocker le JSON complet du résumé
      })
      console.log('Résumé enregistré dans la base de données en tant qu\'élément de révision :', revisionItem.id);


      // 6. Renvoyer le résumé généré et l'élément de révision créé
      return response.ok({
        message: 'Résumé généré et enregistré avec succès !',
        summary: summaryContent,
        revisionItem,
      })

    } catch (error) {
      console.error('Erreur générale lors de la génération du résumé :', error)
      return response.internalServerError({ message: 'Une erreur est survenue lors de la génération du résumé.' })
    }
  }

  /**
   * Fonction pour appeler le modèle IA Gemini et générer un résumé.
   * Cette méthode accepte maintenant un tableau de parties pour une entrée multimodale.
   * @param {GeminiContentPart[]} aiInput - Le contenu à envoyer à Gemini (texte ou parties multimodales).
   * @returns {Promise<{title: string, summaryText: string}>} - Le résumé généré par l'IA au format JSON.
   */
  private async callAIModelForSummary(aiInput: GeminiContentPart[]): Promise<{title: string, summaryText: string}> {
    console.log('Envoi des prompts à l\'API Gemini pour le résumé...');
    const result = await gemini.generateContent(aiInput); 
    let responseText = result.response.text(); 
    console.log('Réponse reçue de l\'API Gemini pour le résumé.');
    console.log('Texte brut de la réponse Gemini (premiers 500 caractères) :', responseText.substring(0, 500)); 

    // Nettoyer la réponse pour supprimer les wrappers markdown
    if (responseText.startsWith('```json')) {
      responseText = responseText.substring(
        responseText.indexOf('\n') + 1, // Commencer après le '```json' et le retour à la ligne
        responseText.lastIndexOf('```') // Finir avant le dernier '```'
      ).trim(); // Supprimer les espaces blancs restants
      console.log('Réponse Gemini nettoyée des wrappers markdown pour le résumé.');
    }

    // Parser le JSON
    try {
      const parsedSummary = JSON.parse(responseText.trim());
      console.log('Réponse JSON Gemini parsée avec succès pour le résumé.');
      return parsedSummary;
    } catch (parseError: any) {
      console.error('Erreur lors du parsing de la réponse JSON de Gemini pour le résumé :', parseError);
      console.error('Texte brut complet de la réponse qui a échoué le parsing (après nettoyage potentiel) :', responseText.trim());
      throw new Error(`Échec du parsing de la réponse IA en JSON pour le résumé : ${parseError.message}. Réponse brute : ${responseText.trim().substring(0, 200)}...`);
    }
  }
}
