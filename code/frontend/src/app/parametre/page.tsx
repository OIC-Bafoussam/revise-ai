'use client';

import { useState, useEffect } from 'react';
import "@/app/page"

// Composant de la page de réglages
export default function SettingsPage() {
  // États factices pour les réglages
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('Français');

  // Effet pour appliquer ou retirer la classe 'dark' sur le body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 md:p-10 transition-colors duration-300">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 text-center">
          Réglages
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Section Préférences du compte */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Préférences du compte</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Activer les notifications</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <div className={`block bg-gray-300 w-14 h-8 rounded-full transition-colors duration-300 ${notificationsEnabled ? 'bg-blue-600' : ''}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${notificationsEnabled ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Mode sombre</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <div className={`block bg-gray-300 w-14 h-8 rounded-full transition-colors duration-300 ${darkMode ? 'bg-blue-600' : ''}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${darkMode ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
              
              <div>
                <label htmlFor="language-select" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Langue</label>
                <select 
                  id="language-select" 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Espagnol">Espagnol</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Sécurité */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Sécurité</h2>
            <div className="space-y-4">
              <button className="w-full py-3 rounded-lg text-lg font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
                Changer de mot de passe
              </button>
              <button className="w-full py-3 rounded-lg text-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">
                Supprimer mon compte
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
