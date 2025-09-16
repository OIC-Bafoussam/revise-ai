// app/validators/group_member.ts
import vine from '@vinejs/vine'

/**
 * Validateur pour l'ajout d'un membre à un groupe.
 * S'assure que l'ID du groupe et l'e-mail du membre sont valides.
 */
export const addGroupMemberValidator = vine.compile(
  vine.object({
    groupId: vine.number().positive(), // L'ID du groupe doit être un nombre positif
    email: vine.string().trim().email().maxLength(255), // L'e-mail du membre à ajouter
    role: vine.enum(['member', 'admin']).optional().default('member'), // Rôle optionnel, par défaut 'member'
  })
)

/**
 * Validateur pour la mise à jour du rôle d'un membre dans un groupe.
 * S'assure que l'ID du groupe, l'ID du membre et le nouveau rôle sont valides.
 */
export const updateGroupMemberRoleValidator = vine.compile(
  vine.object({
    // Ces IDs seraient généralement passés dans les paramètres de l'URL ou du corps, selon votre API
    // groupId: vine.number().positive(), // ID du groupe si nécessaire dans le corps
    // memberId: vine.number().positive(), // ID du membre si nécessaire dans le corps
    role: vine.enum(['member', 'admin']), // Le nouveau rôle (requis)
  })
)
