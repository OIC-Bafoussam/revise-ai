// app/validators/user_profile.ts
import vine from '@vinejs/vine'

/**
 * Validateur pour la mise à jour du profil utilisateur.
 * Tous les champs sont optionnels car l'utilisateur ne met pas forcément tout à jour.
 */
export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional().maxLength(255),
    email: vine.string().trim().email().maxLength(255).optional(), // Vérifier l'unicité dans le contrôleur ou avec une règle personnalisée
    
    // Pour le changement de mot de passe, il est recommandé de demander l'ancien mot de passe
    oldPassword: vine.string().trim().minLength(8).maxLength(255).optional(),
    newPassword: vine.string().trim().minLength(8).maxLength(255)
      .optional()
      .confirmed('newPasswordConfirmation'), // Nécessite un champ 'newPasswordConfirmation'
    newPasswordConfirmation: vine.string().trim().optional(), // Champ de confirmation pour newPassword
    
    // Le rôle ne devrait généralement pas être modifiable par l'utilisateur lui-même via cette route.
    // role: vine.enum(['student', 'teacher']).optional(),
  }).and(['oldPassword', 'newPassword', 'newPasswordConfirmation'], (body) => {
    // Si 'newPassword' est présent, alors 'oldPassword' et 'newPasswordConfirmation' sont requis.
    if (body.newPassword) {
      body.oldPassword = vine.string().trim().minLength(8).maxLength(255).required()
      body.newPasswordConfirmation = vine.string().trim().required()
    }
  })
)
