// app/validators/revision_item.ts
import vine from '@vinejs/vine'

/**
 * Validateur pour la mise à jour d'un élément de révision (quiz, résumé, flashcard).
 * Permet de modifier le titre et potentiellement le contenu si celui-ci est éditable.
 */
export const updateRevisionItemValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional().minLength(1).maxLength(255), // Titre optionnel
    // Si le contenu JSON est directement éditable, vous pourriez avoir quelque chose comme :
    // content: vine.any().optional(), // Ou un schéma plus strict si la structure est connue
    // Pour des raisons de simplicité et de sécurité, l'édition directe du JSON est souvent complexe.
    // Il est plus courant d'avoir des champs spécifiques pour éditer des parties du contenu.
  })
)
