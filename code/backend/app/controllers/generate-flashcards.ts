import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import path from 'path'

export default class FlashcardsController {
  public async generate({ request, response }: HttpContextContract) {
    try {
      // 1. Récupérer le nom du fichier
      const fileName = request.input('fileName')
      if (!fileName) {
        return response.badRequest({ error: 'Nom du fichier manquant' })
      }

      // 2. Vérifier et lire le fichier
      const filePath = path.join(__dirname, '../../../public/uploads', fileName)
      if (!fs.existsSync(filePath)) {
        return response.notFound({ error: 'Fichier introuvable' })
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // 3. Générer des flashcards (simulation pour l’instant)
      const flashcards = [
        { question: 'Qu’est-ce que l’IA ?', answer: 'L’intelligence artificielle est un domaine informatique qui vise à reproduire des capacités cognitives humaines.' },
        { question: 'Qui est Alan Turing ?', answer: 'Un pionnier de l’informatique, considéré comme l’un des pères de l’IA.' },
        { question: 'Quel est le but des flashcards ?', answer: 'Faciliter la mémorisation par répétition espacée.' },
      ]

      // 👉 Plus tard : remplacer ce bloc par un vrai appel à une IA pour générer des flashcards à partir de `fileContent`

      return response.json({
        message: 'Flashcards générées avec succès ✅',
        file: fileName,
        flashcards,
      })
    } catch (error) {
      return response.status(500).json({ error: 'Erreur lors de la génération des flashcards', details: error.message })
    }
  }
}
