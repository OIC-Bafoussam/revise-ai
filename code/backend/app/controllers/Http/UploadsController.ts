// app/controllers/Http/UploadsController.ts

import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises' // Import fs for directory check/creation
import File from '#models/File' // Import the File model

export default class UploadsController {
  /**
   * Stores an uploaded file and saves its metadata to the database.
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'Authentication required.' })
      }

      const file = request.file('file', {
        size: '20mb',
        extnames: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'mp4', 'mp3', 'pdf', 'doc', 'docx', 'txt'],
      })

      if (!file) {
        return response.badRequest('No file was sent.')
      }

      if (!file.isValid) {
        console.error('File validation failed:', file.errors);
        return response.badRequest({ errors: file.errors })
      }

      const fileName = `${cuid()}.${file.extname}`

      const appRoot = fileURLToPath(new URL('../../../', import.meta.url));
      const uploadDirectory = path.join(appRoot, 'public', 'uploads');
      const finalFilePath = path.join(uploadDirectory, fileName); // Chemin complet du fichier déplacé

      // Vérifier si le dossier d'upload existe, sinon le créer
      try {
        await fs.mkdir(uploadDirectory, { recursive: true });
        console.log(`Dossier d'upload vérifié/créé à: ${uploadDirectory}`);
      } catch (dirError) {
        console.error(`Erreur lors de la vérification/création du dossier d'upload: ${uploadDirectory}`, dirError);
        return response.internalServerError({ message: 'Impossible de préparer le dossier d\'upload.' });
      }

      // Déplacer le fichier de son emplacement temporaire vers le dossier public
      try {
        await file.move(uploadDirectory, {
          name: fileName,
          overwrite: true,
        });
        console.log(`Tentative de déplacement du fichier vers: ${finalFilePath}`);
      } catch (moveError: any) {
        console.error('Erreur lors du déplacement du fichier (via exception):', moveError);
        return response.internalServerError({ message: `Erreur lors du déplacement du fichier: ${moveError.message}` });
      }

      // NOUVEAU: Vérifier manuellement si le fichier existe après la tentative de déplacement
      let isFileActuallyMoved = false;
      try {
          await fs.access(finalFilePath, fs.constants.F_OK); // Vérifie si le fichier existe
          isFileActuallyMoved = true;
          console.log(`Vérification manuelle: Le fichier existe bien à ${finalFilePath}`);
      } catch (accessError) {
          console.error(`Vérification manuelle: Le fichier n'existe PAS à ${finalFilePath}`, accessError);
      }
      
      // Si file.isMoved est faux MAIS que le fichier existe réellement sur le disque, on continue
      if (!file.isMoved && !isFileActuallyMoved) { // Si ni isMoved n'est vrai, ni le fichier n'existe
        console.error('File failed to move. file.isMoved is false and manual check failed.');
        console.error('Additional error details from file.error object:', file.error);
        return response.internalServerError({ message: file.error?.message || 'Failed to move the uploaded file. Check server logs for details.' });
      }

      const filePathForDb = path.join('/uploads', fileName);

      const uploadedFile = await File.create({
        originalName: file.clientName,
        fileName: fileName,
        path: filePathForDb,
        userId: user.id,
      })

      return response.ok({
        message: 'Fichier uploadé et enregistré avec succès !',
        path: filePathForDb,
        file: uploadedFile,
      })
    } catch (error) {
      console.error('Erreur générale lors de l\'upload du fichier:', error)
      return response.internalServerError({ message: 'Une erreur est survenue lors de l\'upload du fichier.' })
    }
  }
}
