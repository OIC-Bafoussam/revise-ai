import vine from '@vinejs/vine';

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
);

export const resetPasswordValidator = vine.compile(
  vine.object({
    // Le champ email est obligatoire et doit être une adresse email valide
    email: vine.string().email(),

    // Le champ OTP (code) est obligatoire et doit être une chaîne de caractères
    // L'OTP généré est un string, donc ce type est correct
    otp: vine.string().trim(),

    // Le champ password est obligatoire et doit respecter les règles de complexité
    // J'ai ajouté une règle de minimum pour vous donner un exemple
    password: vine
      .string()
      .minLength(8) // Mot de passe d'au moins 8 caractères
      .confirmed(), // S'assure qu'un champ 'password_confirmation' existe et correspond
  })
);
