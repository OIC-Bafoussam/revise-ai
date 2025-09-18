import User from "#models/User";
import { loginValidator, registerValidator } from "#validators/auth";
import { HttpContext } from "@adonisjs/core/http";
import hash from '@adonisjs/core/services/hash'
import { v4 as uuidv4 } from 'uuid';
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import { DateTime } from 'luxon'


export default class AuthController {
    async register({ request, response }: HttpContext) {
        const validatedData = await request.validateUsing(registerValidator)

        const user = await User.create({
            fullName: validatedData.fullName,
            email: validatedData.email,
            password: validatedData.password,
        })

        if (!user) {
            return response.badRequest({ message: 'User registration failed' })
        }
        const token = await User.accessTokens.create(user)

        return response.created({ message: 'User registered successfully', user, token })
    }

    async login({ request, response }: HttpContext) {
        const validatedData = await request.validateUsing(loginValidator)
        const user = await User.findBy('email', validatedData.email)
        if (!user) {
            return response.unauthorized({ message: 'Invalid credentials' })
        }

        const isPasswordValid = await user.verifyPassword(validatedData.password)
        if (!isPasswordValid) {
            return response.unauthorized({ message: 'Invalid credentials' })
        }
        const token = await User.accessTokens.create(user)
        return response.ok({ message: 'Login successful', token, user })
    }

    async logout({ auth, response }: HttpContext) {
        if (!auth.user) {
            return response.unauthorized({ message: 'User not authenticated' })
        }
        return response.ok({ message: 'Logged out successfully' })
    }

    async me({ auth, response }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized({ message: 'User not authenticated' })
        }
        return response.ok({ user })
    }

    /**
     * Gère la demande de mot de passe oublié.
     */
    async forgotPassword({ request, response }: HttpContext) {
        const email = request.input('email')
        if (!email) {
            return response.badRequest({ message: "L'email est requis." })
        }

        const user = await User.findBy('email', email)

        if (!user) {
            return response.ok({
                message:
                    'Si cet e-mail est dans notre base de données, un code de réinitialisation vous sera envoyé.',
            })
        }

        // Générez un code OTP à 4 chiffres.
        const resetPasswordOtp = Math.floor(1000 + Math.random() * 9000).toString()
        // Définissez l'expiration à 10 minutes.
        const resetPasswordExpiry = DateTime.now().plus({ minutes: 10 })
        
        user.resetPasswordOtp = resetPasswordOtp
        user.resetPasswordExpiry = resetPasswordExpiry
        await user.save()

        try {
            await mail.send((message) => {
                message
                    .from('info@revise-ai.com')
                    .to(user.email)
                    .subject('Votre code de réinitialisation de mot de passe')
                    .html(`
                    <p>Bonjour,</p>
                    <p>Voici votre code de réinitialisation de mot de passe : <strong>${resetPasswordOtp}</strong></p>
                    <p>Ce code est valide pour les 10 prochaines minutes.</p>
                    <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
                    `)
            })

            return response.ok({
                message: 'Un code de réinitialisation a été envoyé à votre adresse e-mail.',
            })
        } catch (error) {
            console.error(error)
            return response.internalServerError({
                message: "Une erreur est survenue lors de l'envoi de l'e-mail.",
            })
        }
    }
    /**
     * Gère la réinitialisation du mot de passe en utilisant un code OTP.
     */
    async resetPassword({ request, response }: HttpContext) {
        const { otp, email, password } = request.all()

        if (!otp || !email || !password) {
            return response.badRequest({ message: 'Le code, l\'email et le mot de passe sont requis.' })
        }

        const user = await User.query()
            .where('email', email)
            .where('resetPasswordOtp', otp)
            .first()

        if (!user) {
            return response.badRequest({ message: 'Le code est invalide ou l\'email ne correspond pas.' })
        }

        const tokenExpiry = user.resetPasswordExpiry
        if (!tokenExpiry || tokenExpiry < DateTime.now()) {
            user.resetPasswordOtp = null
            user.resetPasswordExpiry = null
            await user.save()
            return response.badRequest({ message: 'Le code de réinitialisation a expiré.' })
        }

        user.password = await hash.make(password)

        user.resetPasswordOtp = null
        user.resetPasswordExpiry = null
        await user.save()

        return response.ok({ message: 'Votre mot de passe a été réinitialisé avec succès.' })
    }
}
