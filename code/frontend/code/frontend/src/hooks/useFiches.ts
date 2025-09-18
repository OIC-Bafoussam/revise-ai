import { useState, useEffect } from 'react';

// Interface pour les données d'une fiche
interface Fiche {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

// Interface pour le hook
interface UseFiches {
  fiches: Fiche[];
  loading: boolean;
  error: string | null;
  addFiche: (content: string) => Promise<void>;
  deleteFiche: (id: string) => Promise<void>;
}

/**
 * Hook personnalisé pour gérer les fiches de révision de l'utilisateur.
 * Ce hook simule une gestion de données locale (similaire à un back-end).
 */
const useFiches = (): UseFiches => {
  const [fiches, setFiches] = useState<Fiche[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour simuler la récupération des fiches depuis une "base de données" locale
  useEffect(() => {
    const fetchFiches = async () => {
      try {
        setLoading(true);
        // Simuler un délai de réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simuler les données récupérées
        const storedFiches = JSON.parse(localStorage.getItem('fiches') || '[]');
        setFiches(storedFiches);
      } catch (err) {
        console.error('Erreur lors de la récupération des fiches:', err);
        setError('Impossible de charger les fiches.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFiches();
  }, []);

  // Fonction pour simuler l'ajout d'une nouvelle fiche
  const addFiche = async (content: string) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simuler un délai
      
      const newFiche: Fiche = {
        id: Date.now().toString(), // ID simple basé sur le timestamp
        title: content.substring(0, 50) + '...', // Titre basé sur le début du contenu
        content: content,
        createdAt: new Date(),
      };
      
      const updatedFiches = [newFiche, ...fiches];
      localStorage.setItem('fiches', JSON.stringify(updatedFiches));
      setFiches(updatedFiches);

    } catch (err) {
      console.error('Erreur lors de l\'ajout de la fiche:', err);
      setError('Impossible d\'ajouter la fiche.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour simuler la suppression d'une fiche
  const deleteFiche = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simuler un délai

      const updatedFiches = fiches.filter(fiche => fiche.id !== id);
      localStorage.setItem('fiches', JSON.stringify(updatedFiches));
      setFiches(updatedFiches);

    } catch (err) {
      console.error('Erreur lors de la suppression de la fiche:', err);
      setError('Impossible de supprimer la fiche.');
    } finally {
      setLoading(false);
    }
  };

  return { fiches, loading, error, addFiche, deleteFiche };
};

export default useFiches;
