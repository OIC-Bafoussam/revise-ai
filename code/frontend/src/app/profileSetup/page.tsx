'use client';

import React, { useState, useEffect } from "react";
import "@/app/page"

export default function App() {
  // State pour les champs du profil
  const [userEmail, setUserEmail] = useState("");
  const [niveau, setNiveau] = useState("");
  const [profession, setProfession] = useState("");
  const [domaine, setDomaine] = useState("");
  const [message, setMessage] = useState("");

  // Options pour les menus déroulants
  const niveauxOptions = ["Lycée", "Bac+2", "Bac+3", "Bac+5", "Doctorat", "Autre"];
  const professionsOptions = ["Étudiant", "Ingénieur", "Développeur", "Designer", "Chef de projet", "Autre"];
  const domainesOptions = ["Informatique", "Sciences", "Lettres", "Droit", "Médecine", "Autre"];

  // Charger le profil de l'utilisateur depuis localStorage au chargement du composant
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
      setNiveau(user.niveau || "");
      setProfession(user.profession || "");
      setDomaine(user.domaine || "");
    } else {
      // Redirection si non connecté
      // Note: Dans un environnement réel, cela pourrait être une redirection vers une page de connexion
      console.log("Utilisateur non connecté. Redirection...");
    }
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Récupérer tous les utilisateurs et trouver l'utilisateur actuel
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: { email: string }) => u.email === userEmail);

    if (userIndex === -1) {
      setMessage("❌ Erreur: Utilisateur non trouvé.");
      return;
    }

    // Mettre à jour les informations du profil de l'utilisateur
    users[userIndex] = {
      ...users[userIndex],
      niveau,
      profession,
      domaine,
      // On utilise une URL d'avatar simple pour cette version
      avatar: users[userIndex].avatar || "https://placehold.co/100x100/A0A0A0/FFFFFF?text=Avatar",
    };

    // Sauvegarder les données mises à jour dans localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));

    setMessage("✅ Profil enregistré avec succès !");

    // Redirection après 1,5s
    setTimeout(() => {
      window.location.href = "/coach-selection";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 border-4 border-blue-500 shadow-md">
            <img 
              src="https://placehold.co/100x100/A0A0A0/FFFFFF?text=Avatar" 
              alt="Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Configurer votre profil</h1>
          <p className="text-sm text-gray-500 mt-1">{userEmail}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <select
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 bg-white"
            >
              <option value="" disabled>Sélectionner votre niveau d'étude</option>
              {niveauxOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 bg-white"
            >
              <option value="" disabled>Sélectionner votre profession</option>
              {professionsOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={domaine}
              onChange={(e) => setDomaine(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 bg-white"
            >
              <option value="" disabled>Sélectionner votre domaine d'étude</option>
              {domainesOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 mt-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Enregistrer le profil
          </button>
          
          {message && (
            <div className={`mt-4 p-3 text-center rounded-lg ${message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
