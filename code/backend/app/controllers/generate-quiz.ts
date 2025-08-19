import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import path from 'path'

export default class QuizController {
  public async generate({ request, response }: HttpContextContract) {
    try {
      // 1. Récupérer le nom du fichier envoyé
      const fileName = request.input('fileName')
      if (!fileName) {
        return response.badRequest({ error: 'Nom du fichier manquant' })
      }

      // 2. Lire le fichier uploadé
      const filePath = path.join(__dirname, '../../../public/uploads', fileName)
      if (!fs.existsSync(filePath)) {
        return response.notFound({ error: 'Fichier introuvable' })
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8') // (⚠️ marche bien pour txt/pdf convertis en texte)

      // 3. Appeler le service IA (ici on simule avec un quiz factice)
      const quiz = [
        {
          question: 'Quelle est la définition de l’IA ?',
          options: ['Informatique Avancée', 'Intelligence Artificielle', 'Information Automatique'],
          answer: 'Intelligence Artificielle',
        },
        {
          question: 'Qui est considéré comme le père de l’IA ?',
          options: ['Alan Turing', 'Albert Einstein', 'John McCarthy'],
          answer: 'John McCarthy',
        },
      ]

      // 👉 Plus tard : remplacer par un vrai appel IA avec OpenAI ou HuggingFace

      return response.json({
        message: 'Quiz généré avec succès ✅',
        file: fileName,
        quiz,
      })
    } catch (error) {
      return response.status(500).json({ error: 'Erreur lors de la génération du quiz', details: error.message })
    }
  }
}
