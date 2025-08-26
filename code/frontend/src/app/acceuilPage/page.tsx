'use client';

import { useState, useEffect } from 'react';
import '@/app/page';

// Composant pour la page d'accueil
// Il affiche un message de bienvenue et des boutons pour naviguer vers d'autres pages.
// Il utilise Tailwind CSS pour le style et les animations.

// Composant pour la page d'accueil
const HomePage = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto">
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold text-blue-800 drop-shadow-lg mb-4 animate-fade-in-down">
        Bienvenue sur Revise-ia !
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up">
        Votre compagnon d'étude intelligent pour transformer vos documents en fiches et quiz interactifs.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
        <a href="/upload" className="py-5 px-10 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Uploader un Fichier
        </a>
        <a href="/generateResume" className="py-5 px-10 bg-white text-blue-600 font-bold rounded-full shadow-lg border border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
          Générer un Résumé
        </a>
        <a href="/generateQuiz" className="py-5 px-10 bg-white text-blue-600 font-bold rounded-full shadow-lg border border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
          Créer un Quiz
        </a>
      </div>
    </div>
  </div>
);

// Composant pour la page de déconnexion
interface LogoutPageProps {
  onLogout: LogoutHandler;
  onCancel: CancelHandler;
}

const LogoutPage = ({ onLogout, onCancel }: LogoutPageProps) => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto">
    <div className="w-full max-w-md text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
        Déconnexion
      </h2>
      <p className="text-gray-600 mb-8">
        Êtes-vous sûr de vouloir vous déconnecter ?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onLogout}
          className="py-3 px-8 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          Confirmer
        </button>
        <button
          onClick={onCancel}
          className="py-3 px-8 bg-gray-200 text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
);



// Interface pour le handler de clic de navigation
interface NavClickHandler {
  (e: React.MouseEvent<HTMLAnchorElement>, href: string): void;
}

// Interface pour le handler de logout
interface LogoutHandler {
  (): void;
}

// Interface pour le handler d'annulation
interface CancelHandler {
  (): void;
}

// Interface pour les props de la barre de navigation
interface NavbarProps {
  activeLink: string;
  onNavClick: NavClickHandler;
}

// Barre de navigation verticale pour l'application.
const Navbar = ({ activeLink, onNavClick }: NavbarProps) => {
  // Liste des liens de navigation avec des icônes
 // Liste des liens de navigation avec des icônes
const navLinks = [
  { href: '/acceuilPage', label: 'Accueil', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0v-2.5a2.5 2.5 0 01-2.5-2.5V9.5" />
    </svg>
  )},
  { href: '/upload', label: 'Uploader', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )},
  { href: '/generateQuiz', label: 'Quiz', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
    </svg>
  )},
  { href: '/generateResume', label: 'Résumés', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h.01M12 11h.01M15 11h.01M12 16h.01M12 19h.01" />
    </svg>
  )},
  { href: '/flashQuiz', label: 'FlashQuiz', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.5a2.5 2.5 0 012.5-2.5h1.5a1 1 0 011 1v1.5a2.5 2.5 0 01-2.5 2.5H12a2.5 2.5 0 01-2.5-2.5V6.5m2.5 0v3m0 0v3m0-3h1.5m-1.5 0h-3" />
    </svg>
  )},
  { href: '/coach-selection', label: 'Coachs', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2a2 2 0 002 2h14a2 2 0 002-2zm-2-2h-2m-4-2H5m1.5-6a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  )},
  { href: '/profiles', label: 'Profil', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )},
  { href: '/parametre', label: 'Réglages', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.245 1.1-.09 1.486-.525L10.325 4.317z" />
    </svg>
  )},
  { href: '/pageDaide', label: 'Aide', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.255a.99.99 0 100-1.98.99.99 0 000 1.98zM12 12a4.5 4.5 0 01-4.5 4.5h-.5a1 1 0 100 2h5a1 1 0 100-2h-.5A2.5 2.5 0 0012 12z" />
    </svg>
  )},
  { href: '/logout', label: 'Déconnexion', icon: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )},
];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-xl font-bold text-gray-900">Revise-ia</span>
      </div>

      <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${activeLink === link.href ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}
              ${link.href === '/logout' ? 'text-red-500 font-semibold' : ''}`}
          >
            {link.icon(activeLink === link.href)}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

// Composant d'application principal qui gère le routage et l'état
export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('/');

  // Utilise useEffect pour lire l'URL initiale et définir la page
  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  // Gère la navigation entre les pages
  const handleNavClick: NavClickHandler = (e, href) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    setCurrentPage(href);
  };
  
  // Gère la déconnexion
  const handleLogout: LogoutHandler = () => {
    // Logique de déconnexion (par exemple, effacer le token d'authentification)
    console.log("Déconnexion de l'utilisateur...");
    window.history.pushState({}, '', '/');
    setCurrentPage('/');
    // Ici, vous ajouteriez la logique de déconnexion réelle, comme la redirection vers une page de connexion
    // window.location.href = '/login';
  };
  
  // Gère l'annulation de la déconnexion
  const handleCancel: CancelHandler = () => {
    window.history.pushState({}, '', '/');
    setCurrentPage('/');
  };

  return (
    <div className="flex flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <Navbar activeLink={currentPage} onNavClick={handleNavClick} />
      {HomePage()}
    </div>
  );
}
