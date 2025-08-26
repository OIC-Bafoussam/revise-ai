'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Définition des types pour le contexte de l'interface utilisateur
interface UIContextType {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  // Vous pouvez ajouter d'autres états ici, par exemple:
  // notifications: string[];
  // showSidebar: boolean;
}

// Création du contexte de l'interface utilisateur avec des valeurs par défaut
const UIContext = createContext<UIContextType>({
  loading: false,
  setLoading: () => {},
});

// Définition des props pour le fournisseur de contexte
interface UIProviderProps {
  children: ReactNode;
}

/**
 * Le fournisseur de contexte pour l'interface utilisateur.
 * Il gère les états globaux de l'interface, comme l'état de chargement.
 */
export const UIProvider = ({ children }: UIProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UIContext.Provider value={{ loading, setLoading }}>
      {children}
    </UIContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte de l'interface utilisateur.
 * Il permet d'accéder facilement et de modifier les états globaux de l'UI.
 */
export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
