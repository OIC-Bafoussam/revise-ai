'use client';

import { useState, useEffect } from "react";
import "@/app/page";

export default function ProfileSetup() {
  const [userEmail, setUserEmail] = useState("");
  const [niveau, setNiveau] = useState("");
  const [profession, setProfession] = useState("");
  const [domaine, setDomaine] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Récupérer l'utilisateur connecté
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
      window.location.href = "/auth/sign-in";
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.email === userEmail);

    if (userIndex === -1) return;

    const avatarURL = avatar ? URL.createObjectURL(avatar) : users[userIndex].avatar || null;

    // Mettre à jour les informations du profil
    users[userIndex] = {
      ...users[userIndex],
      niveau,
      profession,
      domaine,
      avatar: avatarURL,
    };

    // Sauvegarder dans localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));

    setMessage("✅ Profil enregistré avec succès !");

    // Redirection après 1,5s
    setTimeout(() => {
      window.location.href = "/coach-selection";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-5">
      <h1 className="text-3xl font-bold mb-6">Configurer votre profil</h1>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <p>Email : <strong>{userEmail}</strong></p>

        <input 
          type="text" 
          placeholder="Niveau d'étude" 
          value={niveau} 
          onChange={(e) => setNiveau(e.target.value)} 
          required
          className="w-full p-3 border border-gray-300 rounded-lg" 
        />

        <input 
          type="text" 
          placeholder="Profession" 
          value={profession} 
          onChange={(e) => setProfession(e.target.value)} 
          required
          className="w-full p-3 border border-gray-300 rounded-lg" 
        />

        <input 
          type="text" 
          placeholder="Domaine d'étude" 
          value={domaine} 
          onChange={(e) => setDomaine(e.target.value)} 
          required
          className="w-full p-3 border border-gray-300 rounded-lg" 
        />

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleAvatarChange} 
          className="w-full" 
        />

        <button 
          type="submit" 
          className="py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700"
        >
          Enregistrer le profil
        </button>

        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
