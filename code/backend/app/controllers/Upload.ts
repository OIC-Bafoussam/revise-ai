import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class UploadsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // Récupérer le fichier (champ 'file' dans la requête)
      const file = request.file('file', {
        size: '20mb', // taille max
        extnames: ['jpg', 'png', 'pdf', 'docx', 'mp3', 'mp4'], // extensions autorisées
      })

      if (!file) {
        return response.badRequest({ error: 'Aucun fichier reçu' })
      }

      if (!file.isValid) {
        return response.badRequest(file.errors)
      }

      // Sauvegarder le fichier dans /public/uploads
      await file.move(Application.publicPath('uploads'))

      return {
        message: 'Fichier uploadé avec succès ✅',
        fileName: file.fileName,
        fileType: file.extname,
        size: file.size,
        url: `/uploads/${file.fileName}`,
      }
    } catch (error) {
      return response.status(500).json({ error: 'Erreur serveur', details: error.message })
    }
  }
}
