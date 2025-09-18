import PasswordReset from '#models/password_reset';
import User from '#models/User';
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/auth';
import { HttpContext } from '@adonisjs/core/http';
import mail from '@adonisjs/mail/services/main';
import hash from '@adonisjs/core/services/hash';

export default class PasswordResetController {
    /**
     * Gère la logique de demande de réinitialisation du mot de passe en envoyant un OTP.
     */
    async forgotPassword({ request, response }: HttpContext) {
        const { email } = await request.validateUsing(forgotPasswordValidator);

        const user = await User.findBy('email', email);

        if (!user) {
            return response.badRequest({
                message: 'Utilisateur non trouvé',
            });
        }

        // Génère un code OTP numérique à 6 chiffres
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);

        // Crée ou met à jour l'entrée de réinitialisation
        await PasswordReset.updateOrCreate(
            { email },
            {
                token: otp, // Utilise l'OTP comme token
                expiresAt,
            }
        );

        // Envoie l'e-mail avec le code OTP
        await mail.send((message) => {
            message.to(email).from('noreply@gmail.com', 'revise-ai').subject('Réinitialisation de votre mot de passe').html(`
                <p>Bonjour,</p>
                <p>Pour réinitialiser votre mot de passe, utilisez le code suivant :</p>
                <h3>${otp}</h3>
                <p>Ce code expirera dans une heure.</p>
            `);
        });

        return response.ok({
            message: 'Un e-mail de réinitialisation de mot de passe a été envoyé avec le code.',
        });
    }

    /**
     * Gère la logique de réinitialisation du mot de passe avec l'OTP.
     */
    async resetPassword({ request, response }: HttpContext) {
        const { email, otp, password } = await request.validateUsing(resetPasswordValidator);

        // 1. Chercher l'utilisateur par email
        const user = await User.findBy('email', email);

        // 2. Si l'utilisateur n'est pas trouvé, renvoyer une erreur générique
        if (!user) {
            return response.badRequest({
                message: 'Informations de réinitialisation invalides.',
            });
        }

        // 3. Chercher le token de réinitialisation pour cet utilisateur en utilisant l'OTP
        const resetEntry = await PasswordReset.query()
            .where('email', email)
            .andWhere('token', otp)
            .first();

        // 4. Si le token est invalide ou inexistant, renvoyer une erreur
        if (!resetEntry || resetEntry.expiresAt < new Date()) {
            // Vérifie également si le code a expiré
            return response.badRequest({
                message: 'Le code de réinitialisation est invalide ou a expiré.',
            });
        }

        // 5. Mettre à jour le mot de passe de l'utilisateur
        user.password = await hash.make(password);

        // 6. Sauvegarder les modifications
        await user.save();
        
        // 7. Supprimer le token de réinitialisation de la base de données
        await resetEntry.delete();

        // 8. Renvoyer une réponse de succès
        return response.ok({
            message: 'Votre mot de passe a été réinitialisé avec succès.',
        });
    }
}
