import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim().maxLength(255).optional(),
        email: vine.string().trim().email().maxLength(255),
        password: vine.string().trim().minLength(8).maxLength(255)
    })
)

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().maxLength(255),
        password: vine.string().trim().minLength(8).maxLength(255)
    })
)

// Validateur pour la demande de réinitialisation de mot de passe
export const forgotPasswordValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().maxLength(255)
    })
)

// Le validateur pour la réinitialisation du mot de passe accepte un OTP de 6 chiffres
export const resetPasswordValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().maxLength(255),
        // L'OTP est maintenant validé comme une chaîne de 6 chiffres.
        otp: vine.string().trim().fixedLength(6),
        // Le mot de passe doit être confirmé par le champ 'password_confirmation'
        password: vine
            .string()
            .trim()
            .minLength(8)
            .maxLength(255)
            .confirmed(),
    })
)
