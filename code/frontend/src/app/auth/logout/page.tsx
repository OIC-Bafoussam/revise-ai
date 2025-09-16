'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/page"

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Suppression des données stockées localement
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.clear();

        // Redirection vers la page de connexion
        router.push('/auth/sign-in');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="p-6 bg-gray-700 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Déconnexion...</h1>
        <p className="text-gray-300">Veuillez patienter pendant que nous vous déconnectons.</p>
      </div>
    </div>
  );
}
