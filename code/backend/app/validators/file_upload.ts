// app/validators/file_upload.ts
import vine from '@vinejs/vine'

/**
 * Validateur pour le téléchargement de fichiers.
 * S'assure que le fichier est présent, a une taille maximale et des extensions autorisées.
 */
export const fileUploadValidator = vine.compile(
  vine.object({
    file: vine.file()
      .size('20mb') // Taille maximale de 20 Mo
      .extnames(['pdf', 'txt', 'jpeg', 'jpg', 'png', 'gif', 'webp', 'svg']) // Extensions autorisées
  })
)
