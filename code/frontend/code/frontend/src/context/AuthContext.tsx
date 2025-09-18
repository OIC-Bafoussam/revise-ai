'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Définition des types pour le contexte d'authentification
interface AuthContextType {
  user: { uid: string } | null;
  loading: boolean;
  userId: string | null;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userId: null,
});

// Définition des props pour le fournisseur de contexte
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Le fournisseur de contexte d'authentification pour l'application.
 * Il gère l'état de l'utilisateur de manière locale, sans dépendance externe comme Firebase.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ uid: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Simuler une connexion réussie
    // Vous pouvez remplacer cela par votre propre logique de connexion locale si nécessaire
    const localUserId = "local-user-id-12345";
    setUserId(localUserId);
    setUser({ uid: localUserId });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte d'authentification.
 * Il permet d'accéder facilement à l'utilisateur, à l'état de chargement et à l'ID utilisateur.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
