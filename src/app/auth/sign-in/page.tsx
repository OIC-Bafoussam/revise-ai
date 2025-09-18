'use client';
import { useState } from "react";
import "@/app/page"

// Page de connexion
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fonction de connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://10.35.82.53:3333/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        // Sauvegarde du token et utilisateur
        localStorage.setItem("token", data.token.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        setMessage("✅ Connexion réussie !");
        setTimeout(() => {
          window.location.href = "/profileSetup";
        }, 1000);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-2 bg-gradient-to-br from-[#a673cd] via-[#6b6bfc] to-[#1d0033]">
      <title>Se connecter</title>
      <meta name="description" content="Connectez-vous à votre compte" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <main className="w-full flex flex-col justify-center items-center py-20">
        <div className="flex flex-col md:flex-row bg-white rounded-[20px] shadow-xl max-w-[900px] w-full overflow-hidden">
          
          {/* Section de bienvenue */}
          <div className="flex-1 bg-[#6767ff] text-white p-10 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-bold mb-2">
              Bienvenue sur Revise-IA
            </h2>
            <p className="text-lg mb-4">
              Connectez-vous pour accéder à votre espace et découvrir nos services.
            </p>
            <div className="w-full max-w-[300px] mt-4">
              <img 
                src="/images/kana.png" 
                alt="Image de connexion" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Section du formulaire */}
          <div className="flex-1 p-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-800">Se connecter</h1>
            
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
                ou utilisez votre email pour vous connecter
              </span>
            </div>
            
            {/* Formulaire */}
            <form onSubmit={handleLogin} className="flex flex-col w-full gap-5">
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
              <button type="submit" className="py-4 bg-[#2a2aab] text-white rounded-full text-lg font-bold hover:bg-[#00004b]">
                Se connecter
              </button>
            </form>

            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            
            <p className="mt-5 text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <a href="/auth/sign-up" className="text-blue-600 font-bold hover:underline">
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
