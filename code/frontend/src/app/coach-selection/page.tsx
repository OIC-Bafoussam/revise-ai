'use client';

import { useState } from 'react';
import "@/app/page"

// Interface pour un objet Coach
interface Coach {
  id: number;
  name: string;
  subject: string;
  bio: string;
}

// Fonction utilitaire pour générer des couleurs uniques
const generateColor = (id: number) => {
  const colors = [
    '50B8E3', 'A478E3', 'E35050', 'E38B50', '78E3A4', 'E3D678', '9C78E3', 'E378A4'
  ];
  return colors[id % colors.length];
};

/**
 * Composant pour le bouton de retour.
 */
const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="absolute top-6 left-6 md:top-10 md:left-10 p-2 rounded-full bg-white text-gray-800 shadow-md transition-colors duration-200 hover:bg-gray-200"
      aria-label="Retour"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
  );
};

/**
 * Composant pour afficher une carte de coach.
 * Gère l'état de "suivi" localement.
 */
const CoachCard = ({ coach }: { coach: Coach }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // Dans une application réelle, vous feriez ici un appel API
    // pour mettre à jour le statut de suivi de l'utilisateur.
  };

  // Générer les initiales pour l'avatar
  const initials = coach.name.split(' ').map(n => n[0]).join('');
  const avatarColor = generateColor(coach.id);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center">
      <img 
        src={`https://placehold.co/96x96/${avatarColor}/ffffff?text=${initials}`} 
        alt={`Avatar de ${coach.name}`} 
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{coach.name}</h3>
      <p className="text-blue-600 font-semibold mb-2">{coach.subject}</p>
      <p className="text-gray-600 text-sm mb-6 flex-grow">{coach.bio}</p>
      <button
        onClick={handleFollowClick}
        className={`w-full py-3 rounded-full font-bold text-lg transition-all duration-300 transform
          ${isFollowing
            ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
            : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
          }`}
      >
        {isFollowing ? 'Suivi !' : 'Suivre'}
      </button>
    </div>
  );
};

// Données factices pour les coachs
const dummyCoaches: Coach[] = [
  {
    id: 1,
    name: 'Mme. Claire Martin',
    subject: 'Mathématiques & Physique',
    bio: 'Spécialiste en algèbre, calcul différentiel et physique quantique. Aide à comprendre les concepts complexes avec des exemples simples.',
  },
  {
    id: 2,
    name: 'M. David Dubois',
    subject: 'Histoire & Géographie',
    bio: 'Historien passionné, expert en histoire antique et moderne. Rend l\'apprentissage de l\'histoire captivant et mémorable.',
  },
  {
    id: 3,
    name: 'Mme. Sarah Lemaitre',
    subject: 'Littérature & Philosophie',
    bio: 'Professeure de lettres modernes. Aide à analyser les textes, développer la pensée critique et préparer les dissertations.',
  },
  {
    id: 4,
    name: 'M. Paul Dupont',
    subject: 'Informatique & Programmation',
    bio: 'Développeur expérimenté, se spécialise en algorithmes, structures de données et développement web. Propose un soutien pratique.',
  },
  {
    id: 5,
    name: 'Mme. Émilie Gauthier',
    subject: 'Biologie & Chimie',
    bio: 'Biologiste et chimiste passionnée. Aide les étudiants à maîtriser les concepts du vivant et des réactions chimiques.',
  },
];

/**
 * Page principale de sélection des coachs.
 */
export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex items-start justify-center relative">
      <BackButton />
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
          Choisissez votre Coach
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </div>
  );
}
