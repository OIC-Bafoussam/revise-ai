import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@adonisjs/core/helpers'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export default class UploadsController {
  async store({ request, response }: HttpContext) {
    // 1. Définir les règles de validation du fichier
     const file = request.file('file', {
      size: '20mb', // Limite la taille du fichier à 2 Mo
      extnames: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'mp4', 'mp3', 'pdf', 'doc', 'docx'], // Autorise ces extensions
    })

    // 2. Vérifier si un fichier a été envoyé
    if (!file) {
      return response.badRequest('Aucun fichier n\'a été envoyé.')
    }

    // 3. Vérifier si le fichier est valide (taille et extension)
    if (!file.isValid) {
      // Si la validation échoue, renvoie les erreurs au client
      return response.badRequest({ errors: file.errors })
    }

    // 4. Générer un nom de fichier unique pour éviter les collisions
    const fileName = `${cuid()}.${file.extname}`

    // 5. Définir le chemin de destination. On utilise 'fileURLToPath'
    //    pour convertir l'URL en un chemin de fichier (string).
    const uploadPath = fileURLToPath(new URL('../../../public/uploads/', import.meta.url));

    // 6. Déplacer le fichier de son emplacement temporaire vers le dossier public
    await file.move(uploadPath, {
      name: fileName,
      overwrite: true,
    })

    // 7. Renvoyer une réponse de succès avec le chemin d'accès au fichier
    return response.ok({
      message: 'Fichier uploadé avec succès !',
      path: `/uploads/${fileName}`,
    })
  }
}