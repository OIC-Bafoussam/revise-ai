/**
 * Configuration de l'envoi d'e-mails.
 * Cette configuration utilise les variables d'environnement pour
 * la connexion SMTP, notamment pour le serveur Mailtrap.
 * Le port 587 est utilisé avec le protocole STARTTLS.
 */
import env from '#start/env'
import { defineConfig, transports, InferMailers } from '@adonisjs/mail'

console.log('Mot de passe d\'application lu:', env.get('MAIL_APP_PASSWORD'));
const mailConfig = defineConfig({
  default: 'smtp',

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: { 
    smtp: transports.smtp({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        type: 'login',
        // Utilisation de votre adresse e-mail Gmail
        user: 'reviseai00@gmail.com',
        // Utilisation du mot de passe d'application généré
        
        pass: env.get('MAIL_APP_PASSWORD'),
      },
      secure: true,
      requireTLS: true,
    }),

    ses: transports.ses({
      apiVersion: '2010-12-01',
      region: env.get('AWS_REGION'),
      credentials: {
        accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
      },
      sendingRate: 10,
      maxConnections: 5,
    }),

    mailgun: transports.mailgun({
      key: env.get('MAILGUN_API_KEY'),
      baseUrl: 'https://api.mailgun.net/v3',
      domain: env.get('MAILGUN_DOMAIN'),
    }),

    sparkpost: transports.sparkpost({
      key: env.get('SPARKPOST_API_KEY'),
      baseUrl: 'https://api.sparkpost.com/api/v1',
    }),

    brevo: transports.brevo({
      key: env.get('BREVO_API_KEY'),
      baseUrl: 'https://api.brevo.com/v3',
    }),

    resend: transports.resend({
      key: env.get('RESEND_API_KEY'),
      baseUrl: 'https://api.resend.com',
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
