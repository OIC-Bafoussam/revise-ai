// app/controllers/Http/QuizController.ts

import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import gemini from '#services/gemini_service'
import File from '#models/File'
import RevisionItem from '#models/revision_item'
import PDFParser from 'pdf2json'

export default class QuizController {
  /**
   * Génère un quiz à partir d'un fichier en utilisant l'API Gemini.
   */
  async generate({ request, response, auth }: HttpContext) {
    try {
      const { fileName, quizOptions } = request.only(['fileName', 'quizOptions'])
      const user = auth.user

      if (!fileName || !quizOptions) {
        return response.badRequest({ message: 'Le nom du fichier et les options du quiz sont requis.' })
      }
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      const uploadedFile = await File.findBy('file_name', fileName)
      if (!uploadedFile || uploadedFile.userId !== user.id) {
        console.error('Erreur de génération du quiz : Fichier introuvable ou non autorisé pour l\'utilisateur.', { fileName, userId: user.id });
        return response.notFound({ message: 'Fichier introuvable ou non autorisé.' })
      }

      const uploadPath = fileURLToPath(new URL('../../../public/uploads/', import.meta.url))
      const filePath = path.join(uploadPath, uploadedFile.fileName)
      const fileExtension = uploadedFile.fileName.split('.').pop()?.toLowerCase() || '';

      type GeminiContentPart = string | { text: string } | { inlineData: { data: string, mimeType: string } };
      let aiInput: GeminiContentPart[];

      const quizPrompt = this.createQuizPrompt(quizOptions);

      const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'];
      
      if (imageExtensions.includes(fileExtension)) {
        const imageBuffer = await fs.readFile(filePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

        console.log(`Préparation de l'entrée image pour Gemini : ${fileName}, MIME : ${mimeType}`);
        aiInput = [
          quizPrompt,
          {
            inlineData: { data: base64Image, mimeType: mimeType }
          },
        ];
      } else if (fileExtension === 'txt') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log(`Préparation de l'entrée texte pour Gemini : ${fileName}. Longueur du contenu : ${fileContent.length}`);
        aiInput = [
          `${quizPrompt}\n\nContenu à analyser :\n"""\n${fileContent}\n"""\n\nRéponse JSON :`,
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
        
        console.log(`Préparation de l'entrée texte PDF pour Gemini : ${fileName}. Longueur du contenu : ${pdfContent.length}`);
        aiInput = [
          `${quizPrompt}\n\nContenu à analyser à partir du PDF :\n"""\n${pdfContent}"""\n\nRéponse JSON :`,
        ];
      } else {
        return response.badRequest({ message: `Type de fichier non pris en charge pour la génération par l'IA : .${fileExtension}. Actuellement pris en charge : .txt, .pdf et formats d'image.` });
      }

      let quizContent: any;
      try {
        quizContent = await this.callAIModelForQuiz(aiInput);
        console.log('Appel de l\'API Gemini pour le quiz réussi.');
      } catch (geminiError) {
        console.error('Erreur lors de l\'appel de l\'API Gemini pour le quiz :', geminiError);
        return response.internalServerError({ message: 'Échec de la génération du quiz avec le modèle IA.' });
      }

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
   * ✅ NOUVELLE MÉTHODE : Récupère un quiz spécifique par son identifiant.
   */
  async show({ params, response, auth }: HttpContext) {
    try {
      const { id } = params;
      const user = auth.user;

      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' });
      }

      const quizItem = await RevisionItem.query()
        .where('id', id)
        .andWhere('userId', user.id)
        .first();

      if (!quizItem || quizItem.type !== 'quiz') {
        return response.notFound({ message: 'Quiz introuvable ou non autorisé.' });
      }

      return response.ok({ quiz: quizItem.content });
    } catch (error) {
      console.error('Erreur lors de la récupération du quiz:', error);
      return response.internalServerError({ message: 'Impossible de récupérer le quiz.' });
    }
  }

  /**
   * Crée un prompt dynamique pour Gemini en fonction des options de quiz.
   */
  private createQuizPrompt(quizOptions: { difficulty: string, numberOfQuestions: number, questionType: string }): string {
    const { difficulty, numberOfQuestions, questionType } = quizOptions;

    let optionsText = "";
    if (questionType === "QCM") {
        optionsText = "Chaque question doit avoir 4 options, dont une seule est correcte.";
    } else if (questionType === "Vrai/Faux") {
        optionsText = "Chaque question doit avoir 2 options : 'Vrai' et 'Faux', dont une seule est correcte.";
    } else if (questionType === "Questions ouvertes") {
        optionsText = "Chaque question est une question ouverte et ne nécessite pas d'options.";
    }

    const formatPrompt = (
        questionType === "Questions ouvertes" ?
        `{ "questionText": "Texte de la question 1 ?", "correctAnswer": "Réponse correcte" }` :
        `{ "questionText": "Texte de la question 1 ?", "options": ["Option A", "Option B", ...], "correctAnswer": "Réponse correcte" }`
    );

    return `En tant qu'expert en pédagogie, crée un quiz de **${numberOfQuestions} questions** de type **${questionType}** avec un niveau de **difficulté ${difficulty}**. 
    ${optionsText}
    La réponse doit être au format JSON.
    
    Exemple de format JSON attendu :
    {
      "title": "Titre du quiz",
      "questions": [
        ${formatPrompt},
        // ... plus de questions
      ]
    }
    
    Réponse JSON :`;
  }
  
  /**
   * Fonction pour appeler le modèle IA Gemini et générer un quiz.
   */
  private async callAIModelForQuiz(aiInput: GeminiContentPart[]): Promise<any> {
    console.log('Envoi des prompts à l\'API Gemini...');
    const result = await gemini.generateContent(aiInput);
    let responseText = result.response.text();
    console.log('Réponse reçue de l\'API Gemini.');
    console.log('Texte brut de la réponse Gemini (premiers 500 caractères) :', responseText.substring(0, 500));

    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      console.error('Aucun bloc JSON valide trouvé dans la réponse de Gemini.');
      console.error('Réponse brute :', responseText);
      throw new Error("Le modèle IA n'a pas renvoyé de format JSON valide.");
    }
    
    const jsonString = responseText.substring(firstBrace, lastBrace + 1);
    console.log('Réponse Gemini nettoyée et prête pour le parsing JSON.');

    try {
      const parsedQuiz = JSON.parse(jsonString);
      console.log('Réponse JSON Gemini parsée avec succès.');
      return parsedQuiz;
    } catch (parseError) {
      console.error('Erreur lors du parsing de la réponse JSON de Gemini pour le quiz :', parseError);
      console.error('Texte brut qui a échoué le parsing :', jsonString.substring(0, 200));
      throw new Error(`Échec du parsing de la réponse IA en JSON : ${parseError.message}.`);
    }
  }
}