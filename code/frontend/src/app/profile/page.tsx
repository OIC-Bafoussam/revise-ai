'use client';

import { useEffect, useState } from "react";
import "@/app/page";

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

interface Coach {
  id: number;
  name: string;
  subject: string;
  bio: string;
  avatar?: string;
}

// Données factices pour les coachs
const dummyCoaches: Coach[] = [
  { id: 1, name: 'Mme. Claire Martin', subject: 'Mathématiques', bio: 'Spécialiste en algèbre.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 2, name: 'M. David Dubois', subject: 'UML', bio: 'Expert UML.', avatar: 'https://randomuser.me/api/portraits/men/66.jpg' },
  { id: 3, name: 'Mme. Sarah Lemaitre', subject: 'Littérature & Philosophie', bio: 'Analyse des textes et dissertations.', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
  { id: 4, name: 'M. Paul Dupont', subject: 'Informatique & Programmation', bio: 'Algorithmes, structures de données et web.', avatar: 'https://randomuser.me/api/portraits/men/68.jpg' },
  { id: 5, name: 'Mme. Émilie Gauthier', subject: 'Biologie & Chimie', bio: 'Maîtrise des concepts du vivant et réactions chimiques.', avatar: 'https://randomuser.me/api/portraits/women/69.jpg' },
];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      setUser(userData);

      if (userData.coachId) {
        const selectedCoach = dummyCoaches.find(c => c.id === userData.coachId) || null;
        // Charger avatar du coach personnalisé s'il existe
        const storedCoach = localStorage.getItem(`coach_${userData.coachId}`);
        if (storedCoach) {
          setCoach(JSON.parse(storedCoach));
        } else {
          setCoach(selectedCoach);
        }
      }
    } else {
      window.location.href = "/auth/sign-in";
    }
  }, []);

  // Upload Avatar Utilisateur
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  // Upload Avatar Coach
  const handleCoachAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!coach) return;
    const file = e.target.files?.[0];
    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      const updatedCoach = { ...coach, avatar: avatarUrl };
      setCoach(updatedCoach);
      localStorage.setItem(`coach_${coach.id}`, JSON.stringify(updatedCoach)); // Sauvegarde personnalisée
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 relative">
      
      {/* Flèche de retour */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition-colors duration-200"
        aria-label="Retour"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-10 text-blue-800 text-center">Mon Profil</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        {/* Profil utilisateur */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-gray-200 transition-transform transform hover:scale-102 duration-300">
          <img
            src={user.avatar || 'https://placehold.co/150x150?text=👤'}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gradient-to-r from-blue-400 to-blue-600"
          />
          <h2 className="text-2xl font-bold mb-2">{user.nom} {user.prenom}</h2>
          <div className="flex flex-col gap-2 text-gray-700 text-sm mt-2 w-full">
            <p className="flex items-center gap-2">📧 <span className="font-semibold">{user.email}</span></p>
            <p className="flex items-center gap-2">🎓 <span className="font-semibold">{user.niveau}</span></p>
            <p className="flex items-center gap-2">💼 <span className="font-semibold">{user.profession}</span></p>
            <p className="flex items-center gap-2">📚 <span className="font-semibold">{user.domaine}</span></p>
          </div>

          {/* Upload avatar */}
          <label className="mt-6 w-full flex flex-col items-center cursor-pointer">
            <span className="py-2 px-4 bg-blue-600 text-white font-bold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
              Changer d'avatar
            </span>
            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
          </label>
        </div>

        {/* Carte du coach */}
        {coach && (
          <div className="flex-1 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg border border-blue-200 flex flex-col items-center transition-transform transform hover:scale-102 duration-300">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Coach</h3>
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-blue-400"
            />
            <h4 className="text-xl font-semibold text-gray-800">{coach.name}</h4>
            <p className="text-blue-600 font-semibold mt-1">{coach.subject}</p>
            <p className="text-gray-600 text-center text-sm mt-2">{coach.bio}</p>

            {/* Upload coach avatar */}
            <label className="mt-6 w-full flex flex-col items-center cursor-pointer">
              <span className="py-2 px-4 bg-green-600 text-white font-bold rounded-full shadow-md hover:bg-green-700 transition-all duration-300">
                Changer l'avatar du coach
              </span>
              <input type="file" accept="image/*" onChange={handleCoachAvatarUpload} className="hidden" />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
