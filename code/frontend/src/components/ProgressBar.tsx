'use client';

import { useState } from 'react';
import "@/app/page"

// Composant de la barre de progression
// Il reçoit une valeur 'progress' en tant que prop et l'affiche.
function ProgressBar({ progress }) {
  return (
    <div className="my-8 px-4 md:px-20">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 text-gray-600">{progress}%</p>
    </div>
  );
}

// Composant parent qui gère l'état et le bouton
// C'est ici que la logique se trouve.
export default function App() {
  // Déclare l'état 'progress' et sa fonction de mise à jour 'setProgress'
  const [progress, setProgress] = useState(0);

  // Fonction pour incrémenter la valeur de la progression
  const handleProgressIncrement = () => {
    setProgress((prevProgress) => {
      // S'assure que la progression ne dépasse pas 100%
      if (prevProgress + 10 > 100) {
        return 100;
      }
      return prevProgress + 10;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Exemple de barre de progression
      </h2>
      
      {/* Affiche le composant ProgressBar en lui passant la valeur de l'état */}
      <ProgressBar progress={progress} />
      
      {/* Bouton pour déclencher la mise à jour de l'état */}
      <button
        onClick={handleProgressIncrement}
        className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
      >
        Augmenter la progression
      </button>
    </div>
  );
}

