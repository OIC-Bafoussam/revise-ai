import { useState, useEffect } from 'react';

// Interface pour le hook d'authentification
interface AuthHook {
  loading: boolean;
  isLoggedIn: boolean;
}

/**
 * Hook personnalisé pour gérer l'état d'authentification de l'utilisateur.
 * Ce hook simule une logique de connexion locale.
 */
const useAuth = (): AuthHook => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Simuler un appel API ou une vérification locale pour l'état de connexion.
    // Dans une vraie application, vous vérifieriez ici un token dans le localStorage,
    // une session, ou l'état de l'utilisateur de votre solution d'auth.
    const checkAuthStatus = () => {
      // Pour cet exemple, nous simulons un chargement de 1 seconde avant de définir l'état.
      setTimeout(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setLoading(false);
      }, 1000); // 1 seconde de simulation de chargement
    };

    checkAuthStatus();
  }, []); // Le tableau de dépendances vide assure que l'effet s'exécute une seule fois au montage du composant.

  return { loading, isLoggedIn };
};

export default useAuth;
