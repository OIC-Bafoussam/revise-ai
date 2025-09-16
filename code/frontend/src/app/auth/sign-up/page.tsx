'use client';

import React, { useState } from "react";
import "@/app/page"

// Définir un type pour l'utilisateur pour éviter les erreurs TypeScript
type User = {
  nom: string;
  email: string;
  password: string;
};

export default function App() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // Réinitialiser le message
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u: User) => u.email === email)) {
      setMessage("❌ Cet email est déjà utilisé.");
      setIsLoading(false);
      return;
    }

    // Créer un nouvel utilisateur avec le nom, l'email et le mot de passe
    users.push({ nom, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("✅ Compte créé avec succès ! Redirection en cours...");
    setNom("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // Redirection vers la page de configuration du profil
    setTimeout(() => {
      window.location.href = `/profileSetup?email=${encodeURIComponent(email)}`;
    }, 1500);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-2 bg-gradient-to-br from-[#1d0033] via-[#00009b] to-[#1d0033]">
      <main className="w-full flex flex-col justify-center items-center py-20">
        <div className="flex flex-col md:flex-row bg-white rounded-[20px] shadow-xl max-w-[900px] w-full overflow-hidden">
          
          {/* Section d'accueil */}
          <div className="flex-1 bg-[#5252fc] text-white p-10 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-bold mb-2">Rejoignez-nous !</h2>
            <p className="text-lg mb-4">Créez votre compte en quelques étapes pour démarrer.</p>
            <div className="relative w-full max-w-[300px] aspect-square bg-[#6161fb] rounded-lg mt-4 flex items-center justify-center">
              <span className="text-6xl text-white">✨</span>
            </div>
          </div>
          

          {/* Formulaire */}
          <div className="flex-1 p-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-800">Créer un compte</h1>
            
            {/* Connexion via les réseaux sociaux */}
            <div className="flex justify-center gap-4 mb-5">
              <a href="https://www.facebook.com/" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/facebook.svg" alt="Facebook" className="w-full h-full" />
              </a>
              <a href="https://twitter.com/" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/twiter.svg" alt="Twitter" className="w-full h-full" />
              </a>
              <a href="https://www.google.com/" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/google.svg" alt="Google" className="w-full h-full" />
              </a>
              <a href="https://www.linkedin.com/" className="w-10 h-10 rounded-full shadow-md transition-transform duration-200 hover:scale-110">
                <img src="/linkdlin.svg" alt="LinkedIn" className="w-full h-full" />
              </a>
            </div>

            <div className="w-full text-center border-b border-gray-300 leading-none my-5">
              <span className="bg-white px-2 text-gray-500 text-sm">
                ou utilisez votre email pour vous inscrire
              </span>
            </div>
            
            <form onSubmit={handleRegister} className="flex flex-col w-full gap-5">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Nom" 
                  value={nom} 
                  onChange={(e) => setNom(e.target.value)} 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-blue-500" 
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
              </div>
              <div className="relative w-full">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-blue-500" 
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
              </div>
              <div className="relative w-full">
                <input 
                  type="password" 
                  placeholder="Mot de passe" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-blue-500" 
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              </div>
              <div className="relative w-full">
                <input 
                  type="password" 
                  placeholder="Confirmer le mot de passe" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-blue-500" 
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              </div>
              
              <button 
                type="submit" 
                className={`py-4 bg-[#00009b] text-white rounded-full text-lg font-bold transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00004b]'}`}
                disabled={isLoading}
              >
                {isLoading ? "En cours..." : "S'inscrire"}
              </button>
            </form>

            {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}

            <p className="mt-5 text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <a href="/auth/sign-in" className="text-blue-600 font-bold hover:underline">Se connecter</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
