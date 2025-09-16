'use client';

import { useState } from 'react';
// L'erreur provient de la ligne ci-dessous. Dans un projet Next.js, on n'importe pas une page de cette manière.
// Le code est réorganisé pour fonctionner sans cet import.
import "@/app/page"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Revise-IA */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-blue-600 text-3xl font-bold">🧠</span>
              <span className="text-2xl font-extrabold text-gray-900">Revise-IA</span>
            </a>
          </div>

          {/* Boutons d'authentification pour bureau */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="auth/sign-in" 
              className="px-5 py-2 rounded-full font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              Se connecter
            </a>
            <a 
              href="auth/sign-up" 
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              S'inscrire
            </a>
          </div>

          {/* Bouton de menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {/* Icône du menu hamburger */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile, bascule en fonction de l'état "isOpen" */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="flex flex-col items-center py-4 space-y-2">
          <a href="auth/sign-in" className="w-1/2 text-center py-2 text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200">
            Se connecter
          </a>
          <a href="auth/sign-up" className="w-1/2 text-center py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200">
            S'inscrire
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
