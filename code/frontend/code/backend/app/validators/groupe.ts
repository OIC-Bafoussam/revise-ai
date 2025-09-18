// app/validators/group.ts
import vine from '@vinejs/vine'

/**
 * Validateur pour la création d'un nouveau groupe.
 * S'assure que le nom est présent et dans les limites de longueur.
 */
export const createGroupValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100), // Nom du groupe requis
    description: vine.string().trim().optional().maxLength(500), // Description optionnelle
  })
)

/**
 * Validateur pour la mise à jour d'un groupe existant.
 * Les champs sont optionnels car il peut s'agir d'une mise à jour partielle.
 */
export const updateGroupValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional().minLength(3).maxLength(100),
    description: vine.string().trim().optional().maxLength(500),
  })
)
