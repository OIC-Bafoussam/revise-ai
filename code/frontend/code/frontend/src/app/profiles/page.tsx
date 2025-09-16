'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";

// Données factices pour l'utilisateur
const userProfile = {
  name: 'Kana',
  email: 'kana@example.com',
  memberSince: 'Janvier 2023',
};

// Données factices pour les statistiques d'activité
const userStats = {
  quizzesCompleted: 15,
  fichesCreated: 8,
  learningHours: 25,
};

// Données factices pour les coachs suivis
const followedCoaches = [
  { id: 1, name: 'Mme. Claire Martin', subject: 'Mathématiques & Physique' },
  { id: 2, name: 'M. David Dubois', subject: 'Histoire & Géographie' },
];

/**
 * Composant de la page de profil utilisateur.
 * Affiche les informations de l'utilisateur, ses statistiques et les coachs qu'il suit.
 */
export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6 md:p-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
          Mon Profil
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Informations personnelles */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Informations personnelles</h2>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{userProfile.name}</p>
                <p className="text-gray-500">{userProfile.email}</p>
                <p className="text-sm text-gray-400 mt-1">Membre depuis {userProfile.memberSince}</p>
              </div>
            </div>
          </div>

          {/* Section Statistiques d'activité */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Mon Activité</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-4xl font-bold text-blue-600">{userStats.quizzesCompleted}</p>
                <p className="text-gray-600">Quiz complétés</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600">{userStats.fichesCreated}</p>
                <p className="text-gray-600">Fiches créées</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-4xl font-bold text-purple-600">{userStats.learningHours}</p>
                <p className="text-gray-600">Heures d'étude</p>
              </div>
            </div>
          </div>
          
          {/* Section Mes Coachs */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Mes Coachs</h2>
            {followedCoaches.length > 0 ? (
              <div className="space-y-4">
                {followedCoaches.map((coach) => (
                  <div key={coach.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between transition-colors duration-200 hover:bg-gray-100">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{coach.name}</p>
                      <p className="text-sm text-gray-500">{coach.subject}</p>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">
                      Ne plus suivre
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Vous ne suivez pas encore de coachs.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
