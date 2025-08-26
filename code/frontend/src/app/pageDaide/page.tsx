'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";

// Composant de la page d'aide
export default function HelpPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const handleAiHelp = async () => {
    setLoading(true);
    setResponse(null);
    
    // Simulation d'une requête à une API d'IA pour obtenir de l'aide
    try {
      // Simuler une requête API avec un délai
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResponse("Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ? Posez-moi vos questions sur le cours, les révisions ou la plateforme.");
    } catch (error) {
      setResponse("Désolé, une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const handleExpertHelp = () => {
    // Redirection ou affichage d'un formulaire pour contacter un enseignant
    setResponse("Vous avez choisi d'être mis en relation avec un expert. Un formulaire de contact ou un lien vers un chat en direct apparaîtra ici.");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">Besoin d'aide ?</h1>
        
        <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <p className="text-xl text-gray-700 mb-8 text-center">
            Choisissez la manière dont vous souhaitez obtenir de l'aide.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Option d'aide par l'IA */}
            <div className="flex-1 p-6 bg-blue-50 rounded-2xl shadow-md border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Assistance par IA</h2>
              <p className="text-gray-700 mb-6">
                Obtenez des réponses instantanées à vos questions sur les cours, les exercices ou l'utilisation de l'application.
              </p>
              <button
                onClick={handleAiHelp}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300
                  ${loading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {loading ? 'Connexion en cours...' : "Demander à l'IA"}
              </button>
            </div>

            {/* Option d'aide par des experts */}
            <div className="flex-1 p-6 bg-green-50 rounded-2xl shadow-md border-2 border-green-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Contacter un expert</h2>
              <p className="text-gray-700 mb-6">
                Pour une aide plus personnalisée ou des questions complexes, contactez un enseignant ou un expert.
              </p>
              <button
                onClick={handleExpertHelp}
                className="w-full py-3 rounded-xl font-bold text-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
              >
                Contacter un expert
              </button>
            </div>

          </div>
          
          {response && (
            <div className="mt-8 p-5 bg-gray-100 rounded-lg text-gray-800 shadow-md animate-fade-in-up">
              <p className="font-semibold text-lg">{response}</p>
              {response.includes("assistant IA") && (
                <textarea
                  className="mt-4 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Écrivez votre question ici..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
