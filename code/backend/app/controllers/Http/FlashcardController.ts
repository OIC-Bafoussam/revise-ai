// app/controllers/Http/FlashcardsController.ts

import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import gemini from '#services/gemini_service'
import File from '#models/File'
import RevisionItem from '#models/revision_item'
import PDFParser from 'pdf2json'

export default class FlashcardsController {
  async generate({ request, response, auth }: HttpContext) {
    try {
      const { fileName } = request.only(['fileName'])
      const user = auth.user

      if (!fileName) {
        return response.badRequest({ message: 'Le nom du fichier est requis.' })
      }
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      const uploadedFile = await File.findBy('file_name', fileName)
      if (!uploadedFile || uploadedFile.userId !== user.id) {
        console.error('Erreur de génération de flashcards : Fichier introuvable ou non autorisé pour l\'utilisateur.', { fileName, userId: user.id });
        return response.notFound({ message: 'Fichier non trouvé ou non autorisé.' })
      }

      const uploadPath = fileURLToPath(new URL('../../../public/uploads/', import.meta.url))
      const filePath = path.join(uploadPath, uploadedFile.fileName)
      const fileExtension = uploadedFile.fileName.split('.').pop()?.toLowerCase() || '';

      type GeminiContentPart = string | { text: string } | { inlineData: { data: string, mimeType: string } };
      let aiInput: GeminiContentPart[];

      const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg']; 

      if (imageExtensions.includes(fileExtension)) {
        const imageBuffer = await fs.readFile(filePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

        aiInput = [
          `Génère un ensemble de flashcards à partir de cette image. Chaque flashcard doit avoir une question et une réponse. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre de l'ensemble de Flashcards (à partir de l'image)",
            "flashcards": [
              {
                "question": "Question de la flashcard 1 ?",
                "answer": "Réponse de la flashcard 1."
              },
            ]
          }
          
          Réponse JSON :`,
          {
            inlineData: { data: base64Image, mimeType: mimeType }
          },
        ];
      } else if (fileExtension === 'txt') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        aiInput = [
          `À partir du texte suivant, génère un ensemble de flashcards. Chaque flashcard doit avoir une question et une réponse. La réponse doit être au format JSON.
          
          Exemple de format JSON attendu :
          {
            "title": "Titre de l'ensemble de Flashcards",
            "flashcards": [
              {
                "question": "Question de la flashcard 1 ?",
                "answer": "Réponse de la flashcard 1."
              },
            ]
          }
          
          Contenu à analyser :
          """
          ${fileContent}
          """
          
          Réponse JSON :`,
        ];
      } else if (fileExtension === 'pdf') {
        const dataBuffer = await fs.readFile(filePath);
        const pdfParser = new PDFParser();

        let pdfContent = '';
        await new Promise<void>((resolve, reject) => {
          pdfParser.on('pdfParser_dataReady', (pdfData) => {
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
        return response.badRequest({ message: `Type de fichier non pris en charge pour la génération par l'IA : .${fileExtension}. Actuellement pris en charge : .txt, .pdf et formats d'image.` });
      }

      let flashcardsContent: any;
      try {
        flashcardsContent = await this.callAIModelForFlashcards(aiInput);
        console.log('Appel de l\'API Gemini pour les flashcards réussi.');
      } catch (geminiError) {
        console.error('Erreur lors de l\'appel de l\'API Gemini pour les flashcards :', geminiError);
        return response.internalServerError({ message: 'Échec de la génération des flashcards avec le modèle IA.' });
      }

      const revisionItem = await RevisionItem.create({
        title: flashcardsContent.title || `Flashcards de ${uploadedFile.originalName}`,
        fileId: uploadedFile.id,
        userId: user.id,
        type: 'flashcard',
        content: flashcardsContent,
      })
      console.log('Flashcards enregistrées dans la base de données en tant qu\'élément de révision :', revisionItem.id);

      // CORRECTION : On renvoie directement le tableau de flashcards pour éviter l'imbrication
      return response.ok({
        message: 'Flashcards générées et enregistrées avec succès !',
        flashcards: flashcardsContent.flashcards,
        revisionItem,
      })

    } catch (error) {
      console.error('Erreur générale lors de la génération des flashcards :', error)
      return response.internalServerError({ message: 'Une erreur est survenue lors de la génération des flashcards.' })
    }
  }

  private async callAIModelForFlashcards(aiInput: GeminiContentPart[]): Promise<any> {
    console.log('Envoi des prompts à l\'API Gemini pour les flashcards...');
    const result = await gemini.generateContent(aiInput);
    let responseText = result.response.text();
    console.log('Réponse reçue de l\'API Gemini pour les flashcards.');
    
    // Si la réponse est vide, lancez une erreur claire
    if (!responseText || responseText.trim() === '') {
      throw new Error("L'IA n'a pas renvoyé de contenu. Le document est peut-être vide ou non pertinent.");
    }
    
    console.log('Texte brut de la réponse Gemini (premiers 500 caractères) :', responseText.substring(0, 500));

    const jsonRegex = /```json\s*(\{[\s\S]*?\})\s*```/;
    const match = responseText.match(jsonRegex);
    
    if (match && match[1]) {
      responseText = match[1].trim();
      console.log('Réponse Gemini nettoyée via Regex pour les flashcards.');
    } else {
      console.warn('Regex pour le bloc JSON non trouvée. Tentative de parsing du texte brut.');
      responseText = responseText.trim();
    }
    
    try {
      const parsedFlashcards = JSON.parse(responseText.trim());
      console.log('Réponse JSON Gemini parsée avec succès pour les flashcards.');
      return parsedFlashcards;
    } catch (parseError: any) {
      console.error('Erreur lors du parsing de la réponse JSON de Gemini pour les flashcards :', parseError);
      console.error('Texte brut complet de la réponse qui a échoué le parsing (après nettoyage potentiel) :', responseText.trim());
      throw new Error(`Échec du parsing de la réponse IA en JSON pour les flashcards : ${parseError.message}.`);
    }
  }
}