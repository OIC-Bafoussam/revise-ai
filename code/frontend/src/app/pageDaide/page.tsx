'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react'; // Icône de flèche
import "@/app/page"

// Composant de la page d'aide
export default function HelpPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAiHelp = async () => {
    setLoading(true);
    setResponse(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResponse("Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ? Posez-moi vos questions sur le cours, les révisions ou la plateforme.");
    } catch (error) {
      setResponse("Désolé, une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const handleCallExpert = () => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_self');
      setIsModalOpen(false);
      setResponse(`Appel en cours vers le numéro: ${phoneNumber}`);
    } else {
      alert("Veuillez entrer un numéro de téléphone.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGoBack = () => {
    window.history.back(); // Retour à la page précédente
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex flex-col items-center justify-start">
        
        {/* Flèche de retour */}
        <button 
          onClick={handleGoBack}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          <ArrowLeft size={24} />
          Retour
        </button>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">Besoin d'aide ?</h1>
        
        <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <p className="text-xl text-gray-700 mb-8 text-center">
            Choisissez la manière dont vous souhaitez obtenir de l'aide.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-6 bg-blue-50 rounded-2xl shadow-md border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Assistance par IA</h2>
              <p className="text-gray-700 mb-6">
                Obtenez des réponses instantanées à vos questions sur les cours, les exercices ou l'utilisation de l'application.
              </p>
              <a 
                href="Group-Chat"
                className="w-full py-3 block rounded-xl font-bold text-lg text-center
                  bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                Demander à l'IA
              </a>
            </div>

            <div className="flex-1 p-6 bg-green-50 rounded-2xl shadow-md border-2 border-green-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Contacter un expert</h2>
              <p className="text-gray-700 mb-6">
                Pour une aide plus personnalisée ou des questions complexes, contactez un enseignant ou un expert.
              </p>
              
              <div className="flex flex-col gap-4 mt-6">
                <a
                  href="mailto:expert@example.com"
                  className="w-full py-3 rounded-xl font-bold text-lg text-center bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                >
                  Par e-mail
                </a>
                <button
                  onClick={openModal}
                  className="w-full py-3 rounded-xl font-bold text-lg text-center bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                >
                  Par téléphone
                </button>
              </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Appeler un expert</h3>
            <p className="text-gray-700 mb-4">Veuillez entrer le numéro de téléphone :</p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ex:+237 655328953"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="py-2 px-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
              >
                Annuler
              </button>
              <button
                onClick={handleCallExpert}
                className="py-2 px-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
              >
                Appeler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
