'use client';

import Link from 'next/link';
import "@/app/page"

// Composant de la page de création de compte

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-2 bg-gradient-to-br from-[#1d0033] via-[#00009b] to-[#1d0033]">
      <title>Créer un compte</title>
      <meta name="description" content="Page de création de compte" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <main className="w-full flex flex-col justify-center items-center py-20">
        <div className="flex flex-col md:flex-row bg-white rounded-[20px] shadow-xl max-w-[900px] w-full overflow-hidden">
          {/* Section de bienvenue */}
          <div className="flex-1 bg-[#00009b] text-white p-10 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-bold mb-2">
              Rejoignez-nous !
            </h2>
            <p className="text-lg">
              Créez votre compte en quelques étapes pour démarrer.
            </p>
          </div>

          {/* Section du formulaire */}
          <div className="flex-1 p-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-800">Créer un compte</h1>
            
            {/* Connexion via les réseaux sociaux */}
            <div className="flex justify-center gap-4 mb-5">
              <a href="#" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/facebook.svg" alt="Facebook" className="w-full h-full" />
              </a>
              <a href="#" className="#" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/twiter.svg" alt="Twitter" className="w-full h-full" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/google.svg" alt="Google" className="w-full h-full" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/linkdlin.svg" alt="LinkedIn" className="w-full h-full" />
              </a>
            </div>
            
            <div className="w-full text-center border-b border-gray-300 leading-none my-5">
              <span className="bg-white px-2 text-gray-500 text-sm">ou utilisez votre email pour l'inscription</span>
            </div>
            
            {/* Formulaire */}
            <form className="flex flex-col w-full gap-5">
              <div className="relative w-full">
                <input type="text" placeholder="Nom" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none transition-colors duration-300 focus:border-blue-500" />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
              </div>
              <div className="relative w-full">
                <input type="text" placeholder="Prénom" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none transition-colors duration-300 focus:border-blue-500" />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
              </div>
              <div className="relative w-full">
                <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none transition-colors duration-300 focus:border-blue-500" />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
              </div>
              <div className="relative w-full">
                <input type="password" placeholder="Mot de passe" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none transition-colors duration-300 focus:border-blue-500" />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              </div>
              <button type="submit" className="py-4 bg-[#00009b] text-white border-none rounded-full text-lg font-bold cursor-pointer transition-colors duration-300 hover:bg-[#00004b]">
                S'inscrire
              </button>
            </form>
            
            <p className="mt-5 text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link href="/auth/sign-in" className="text-blue-600 font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
