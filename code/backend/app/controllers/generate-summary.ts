import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import path from 'path'

export default class SummaryController {
  public async generate({ request, response }: HttpContextContract) {
    try {
      // 1. Récupération du nom du fichier
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

      // 3. Génération du résumé (simulation pour l’instant)
      const summary = `
        Voici un résumé généré automatiquement :
        - Le document parle d'intelligence artificielle et de ses applications.
        - L'IA peut aider dans l'éducation en générant quiz, résumés et flashcards.
        - Les enseignants peuvent personnaliser les supports.
        - Les apprenants bénéficient de recommandations adaptées.
      `

      // 👉 Plus tard : remplacer ce bloc par un vrai appel à un modèle IA pour résumer `fileContent`

      return response.json({
        message: 'Résumé généré avec succès ✅',
        file: fileName,
        summary: summary.trim(),
      })
    } catch (error) {
      return response.status(500).json({ error: 'Erreur lors de la génération du résumé', details: error.message })
    }
  }
}
