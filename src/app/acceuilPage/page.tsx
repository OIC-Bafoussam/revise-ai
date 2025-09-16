'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import '@/app/page';

// ===================
// Pages principales
// ===================

const HomePage = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto">
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold text-blue-800 drop-shadow-lg mb-4">
        Bienvenue sur Revise-ia !
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Votre compagnon d'étude intelligent pour transformer vos documents en fiches et quiz interactifs.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
        <Link
          href="/upload"
          className="py-5 px-10 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Uploader un Fichier
        </Link>
      </div>
    </div>
  </div>
);

const LogoutPage = ({ onLogout, onCancel }: { onLogout: () => void; onCancel: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto">
    <div className="w-full max-w-md text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Déconnexion</h2>
      <p className="text-gray-600 mb-8">Êtes-vous sûr de vouloir vous déconnecter ?</p>
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

// ===================
// Navbar
// ===================
interface NavbarProps {
  activeLink: string;
  onNavClick: (href: string) => void;
}

const Navbar = ({ activeLink, onNavClick }: NavbarProps) => {
  const pathname = usePathname();
  const navLinks = [
    { href: '/acceuilPage', label: 'Accueil  ✅' },
     { href: '/Dashboard', label: 'dashboard' },
    { href: '/upload', label: 'Uploader' },
    { href: '/parametre', label: 'Réglages' },
    { href: '/pageDaide', label: 'Aide' },
    { href: '/groupe', label: 'groupe' },
    { href: '/auth/logout', label: 'Déconnexion' },
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
          <Link
            key={link.href}
            href={link.href}
            onClick={() => onNavClick(link.href)}
            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200
              ${pathname === link.href ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}
              ${link.href === '/auth/logout' ? 'text-red-500 font-semibold' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

// ===================
// App principale
// ===================
export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    else router.push('/auth/sign-in');
  }, [router]);

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    router.push('/auth/sign-in');
  };

  const handleCancelLogout = () => {
    router.push('/acceuilPage');
  };

  return (
    <div className="flex flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <Navbar activeLink={pathname || ''} onNavClick={handleNavClick} />
      {pathname === '/auth/logout' ? (
        <LogoutPage onLogout={handleLogout} onCancel={handleCancelLogout} />
      ) : (
        <HomePage />
      )}
    </div>
  );
}
