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
export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCoachId, setSelectedCoachId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setSelectedCoachId(user.coachId || null);
    } else {
      router.push('/auth/sign-in');
    }
  }, [router]);

  const handleSelectCoach = (coachId: number) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, coachId };
    setSelectedCoachId(coachId);
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    alert(`Vous avez sélectionné ${dummyCoaches.find(c => c.id === coachId)?.name}`);
    router.push('/acceuilPage'); // 🔥 Redirection vers l'accueil
  };

  if (!currentUser) return null;

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex items-start justify-center relative">
      <BackButton />
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
          Choisissez votre Coach
        </h1>
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
      </div>
    </div>
  );
}
