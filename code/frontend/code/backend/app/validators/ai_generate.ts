// app/validators/ai_generate.ts
import vine from '@vinejs/vine'

/**
 * Validateur pour les requêtes de génération de contenu par IA.
 * S'assure que le nom du fichier à traiter est une chaîne valide.
 */
export const aiGenerateValidator = vine.compile(
  vine.object({
    fileName: vine.string().trim().minLength(1).maxLength(255) // Nom du fichier requis
  })
)
