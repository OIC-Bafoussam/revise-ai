'use client';

import { useState } from 'react';
import Link from 'next/link';

// Liste des liens de navigation avec des icônes
const navLinks = [
  { href: '/', label: 'Accueil', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0v-2.5a2.5 2.5 0 01-2.5-2.5V9.5" />
    </svg>
  )},
  { href: '/upload', label: 'Uploader', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )},
  { href: '/generate-quiz', label: 'Quiz', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
    </svg>
  )},
  { href: '/generate-summary', label: 'Résumés', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h.01M12 11h.01M15 11h.01M12 16h.01M12 19h.01" />
    </svg>
  )},
  { href: '/flash-quiz', label: 'FlashQuiz', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.5a2.5 2.5 0 012.5-2.5h1.5a1 1 0 011 1v1.5a2.5 2.5 0 01-2.5 2.5H12a2.5 2.5 0 01-2.5-2.5V6.5m2.5 0v3m0 0v3m0-3h1.5m-1.5 0h-3" />
    </svg>
  )},
  { href: '/coach-selection', label: 'Coachs', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2a2 2 0 002 2h14a2 2 0 002-2zm-2-2h-2m-4-2H5m1.5-6a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  )},
  { href: '/profile', label: 'Profil', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )},
  { href: '/settings', label: 'Réglages', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.245 1.1-.09 1.486-.525L10.325 4.317z" />
    </svg>
  )},
  { href: '/help', label: 'Aide', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.255a.99.99 0 100-1.98.99.99 0 000 1.98zM12 12a4.5 4.5 0 01-4.5 4.5h-.5a1 1 0 100 2h5a1 1 0 100-2h-.5A2.5 2.5 0 0012 12z" />
    </svg>
  )},
];

/**
 * Barre de navigation verticale pour l'application.
 * Comprend des liens vers différentes pages et un bouton de déconnexion.
 */
export default function Navbar() {
  const [activeLink, setActiveLink] = useState('/');

  // Gestion de la déconnexion (simulée)
  const handleLogout = () => {
    console.log("Déconnexion de l'utilisateur...");
    // Ici, vous ajouteriez la logique réelle de déconnexion,
    // comme la suppression du token d'authentification et la redirection.
    window.location.href = '/login'; // Redirection vers la page de connexion
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-xl font-bold text-gray-900">StudyMate</span>
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} passHref legacyBehavior>
            <a
              onClick={() => setActiveLink(link.href)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${activeLink === link.href ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {link.icon(activeLink === link.href)}
              <span>{link.label}</span>
            </a>
          </Link>
        ))}
      </div>

      {/* Bouton de déconnexion en bas de la barre de navigation */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 transition-colors duration-200 font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}
