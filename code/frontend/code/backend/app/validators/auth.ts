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