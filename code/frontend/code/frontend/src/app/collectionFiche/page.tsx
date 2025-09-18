'use client';

import { useState } from 'react';
import "@/app/page"

// Interface pour un document
interface Document {
  id: string;
  name: string;
  type: string;
  dateAdded: string;
  size: string;
}

// Données factices pour la collection de documents
const dummyDocuments: Document[] = [
  { id: '1', name: 'Cours de Mathématiques.pdf', type: 'PDF', dateAdded: '15/04/2024', size: '2.5 MB' },
  { id: '2', name: 'Résumé d\'Histoire.docx', type: 'DOCX', dateAdded: '12/04/2024', size: '1.2 MB' },
  { id: '3', name: 'Exercices de Physique.xlsx', type: 'XLSX', dateAdded: '10/04/2024', size: '500 KB' },
  { id: '4', name: 'Fiche de Biologie.pdf', type: 'PDF', dateAdded: '08/04/2024', size: '1.8 MB' },
];

/**
 * Composant principal de la page.
 * Affiche la liste des documents, la barre de recherche et les options de gestion.
 */
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les documents en fonction du terme de recherche
  const filteredDocuments = dummyDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex items-start justify-center">
      <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        
        {/* Titre de la page */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Ma Collection de Documents
        </h1>

        {/* Barre de recherche */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* En-tête du tableau (visible sur les grands écrans) */}
        <div className="hidden md:grid grid-cols-5 gap-4 py-3 px-4 text-gray-500 font-semibold border-b border-gray-200">
          <span className="col-span-2">Nom du Fichier</span>
          <span>Type</span>
          <span>Date d'ajout</span>
          <span className="text-right">Taille</span>
        </div>

        {/* Liste des documents */}
        <div className="space-y-4 mt-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(doc => (
              <div 
                key={doc.id} 
                className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm md:shadow-none items-center"
              >
                <div className="col-span-2 flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 3h6m-6 3h6m6-12H9a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z" />
                  </svg>
                  <span className="font-medium text-gray-800">{doc.name}</span>
                </div>
                <span className="text-gray-600">{doc.type}</span>
                <span className="text-gray-600">{doc.dateAdded}</span>
                <div className="flex justify-end items-center space-x-2">
                  <span className="text-gray-600 mr-2">{doc.size}</span>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Télécharger">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition-colors duration-200" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3m12 0H4" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">Aucun document trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
}
