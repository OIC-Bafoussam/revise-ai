'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/page";

// Interface utilisateur
interface User {
  nom: string;
  prenom: string;
  email: string;
  niveau?: string;
  profession?: string;
  domaine?: string;
  avatar?: string | null;
  coachId?: number;
}

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

/** Bouton de retour */
const BackButton = () => (
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

/** Carte de coach */
const CoachCard = ({
  coach,
  selectedCoachId,
  onSelect
}: {
  coach: Coach;
  selectedCoachId: number | null;
  onSelect: (coachId: number) => void;
}) => {
  const isSelected = coach.id === selectedCoachId;

  const initials = coach.name.split(' ').map(n => n[0]).join('');
  const avatarColor = generateColor(coach.id);

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center cursor-pointer
        ${isSelected ? 'ring-4 ring-blue-400' : ''}
      `}
      onClick={() => onSelect(coach.id)}
    >
      <img
        src={`https://placehold.co/96x96/${avatarColor}/ffffff?text=${initials}`}
        alt={`Avatar de ${coach.name}`}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{coach.name}</h3>
      <p className="text-blue-600 font-semibold mb-2">{coach.subject}</p>
      <p className="text-gray-600 text-sm mb-6 flex-grow">{coach.bio}</p>
      <button
        className={`w-full py-3 rounded-full font-bold text-lg transition-all duration-300 transform
          ${isSelected ? 'bg-green-600 text-white shadow-md' : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'}
        `}
      >
        {isSelected ? 'Sélectionné' : 'Sélectionner'}
      </button>
    </div>
  );
};

// Données factices pour les coachs
const dummyCoaches: Coach[] = [
  { id: 1, name: 'Mme. Claire Martin', subject: 'UML', bio: 'Spécialiste en UML.' },
  { id: 2, name: 'M. David Dubois', subject: 'Histoire', bio: 'Expert en histoire antique et moderne.' },
  { id: 3, name: 'Mme. Sarah Lemaitre', subject: 'Littérature', bio: 'Spécialiste des textes littéraires.' },
  { id: 4, name: 'M. Paul Dupont', subject: 'Informatique & Programmation', bio: 'Développeur fullstack.' },
  { id: 5, name: 'Mme. Émilie Gauthier', subject: 'Biologie', bio: 'Passionnée des sciences du vivant.' },
];

/** Page principale de sélection des coachs */
export default function CoachSelectionPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCoachId, setSelectedCoachId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setSelectedCoachId(user.coachId || null);
    } else {
      // Redirection vers la page de connexion si non connecté
      window.location.href = '/auth/sign-in';
      return;
    }
    setIsLoading(false);
  }, []);

  const handleSelectCoach = (coachId: number) => {
    if (!currentUser) return;

    // Mettre à jour temporairement l'utilisateur avec l'ID du coach
    const updatedUser = { ...currentUser, coachId };
    setSelectedCoachId(coachId);
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Redirection vers la page d'enregistrement au lieu de l'accueil
    setTimeout(() => {
      window.location.href = '/coach-registration';
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour sélectionner un coach.</p>
          <button
            onClick={() => window.location.href = "/auth/sign-in"}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex items-start justify-center relative">
      <BackButton />
      <div className="w-full max-w-6xl mx-auto">
        {/* Header avec informations utilisateur */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Choisissez votre Coach
          </h1>
          <div className="bg-white rounded-2xl p-4 shadow-md inline-block">
            <p className="text-gray-600 mb-1">
              Bienvenue, <span className="font-semibold text-gray-800">
                {currentUser.prenom && currentUser.nom 
                  ? `${currentUser.prenom} ${currentUser.nom}` 
                  : currentUser.email}
              </span>
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              {currentUser.niveau && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {currentUser.niveau}
                </span>
              )}
              {currentUser.domaine && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {currentUser.domaine}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Grille des coachs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCoaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              selectedCoachId={selectedCoachId}
              onSelect={handleSelectCoach}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Comment choisir le bon coach ?
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              Sélectionnez le coach qui correspond le mieux à vos besoins d'apprentissage. 
              Chaque coach a ses spécialités et pourra vous accompagner dans votre parcours.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Accompagnement personnalisé</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Suivi en temps réel</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Ressources adaptées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}