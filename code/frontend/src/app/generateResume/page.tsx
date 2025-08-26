'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import "@/app/page";

// Icônes SVG pour la barre de navigation

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
  { href: '/generate-quiz', label: 'Quiz', icon: (isActive: boolean) => (
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

/**
 * Barre de navigation verticale pour l'application.
 * Comprend des liens vers différentes pages et un bouton de déconnexion.
 */
function Navbar() {
  const [activeLink, setActiveLink] = useState('/generateResume'); // Active 'Résumés' par défaut

  // Gère la déconnexion (simulée)
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    console.log("Déconnexion de l'utilisateur...");
    // window.location.href = '/login'; // Redirection vers la page de connexion
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-xl font-bold text-gray-900">StudyMate</span>
      </div>

      <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              setActiveLink(link.href);
              if (link.href === '/logout') {
                handleLogout(e);
              }
            }}
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
}

// Interface pour le résumé généré
interface SummaryResponse {
  title: string;
  content: string;
}

/**
 * Composant de la page de génération de résumés.
 * Permet à l'utilisateur de soumettre un sujet pour générer un résumé.
 */
function GenerateSummaryPage() {
  const [mode, setMode] = useState('ia');
  const [topic, setTopic] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Gère l'envoi du formulaire pour générer le résumé.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSummary(null);
    setError(null);

    try {
      if ((mode === 'ia' || mode === 'topic') && !topic.trim()) {
        setError("Veuillez entrer un sujet pour générer le résumé.");
        setLoading(false);
        return;
      }
      
      let generatedSummaryContent = '';
      let generatedSummaryTitle = '';

      // Logic for AI-powered summary generation
      if (mode === 'ia' || mode === 'topic') {
        // --- Intégration de l'API Gemini ---
        const apiKey = "AIzaSyDdC3z4axWR3xcD2t9yZaJNirSeSGRO_hY"; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Prompt pour générer un résumé
        const prompt = `Crée un résumé détaillé et bien structuré sur le sujet suivant: "${topic}". Le résumé doit être au format HTML, en utilisant des balises comme <h2> pour le titre, <p> pour les paragraphes, <ul> pour les listes, et <strong> pour les mots-clés. Assure-toi que la réponse ne contient pas de balises de formatage de code.`;
        
        const payload = {
            contents: [{ parts: [{ text: prompt }] }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
              
            generatedSummaryContent = result.candidates[0].content.parts[0].text;
            
            // Extrait le titre du HTML généré
            const titleMatch = generatedSummaryContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
            generatedSummaryTitle = titleMatch ? titleMatch[1] : `Résumé sur : ${topic}`;
            
            // Supprime le titre du contenu pour éviter la duplication
            generatedSummaryContent = generatedSummaryContent.replace(/<h2[^>]*>.*?<\/h2>/i, '').trim();

        } else {
            throw new Error("La génération du résumé a échoué. Veuillez réessayer.");
        }
      } 
      // Other modes (youtube, file) not yet implemented, will fall through to error
      else {
        setError("Ce mode de génération n'est pas encore pris en charge.");
        setLoading(false);
        return;
      }

      setSummary({ title: generatedSummaryTitle, content: generatedSummaryContent });
      setTopic('');
      setYoutubeUrl('');
      setFile(null);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue lors de la génération du résumé. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'ia':
      case 'topic':
        return (
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Exemple : Le système solaire"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        );
      case 'youtube':
        return (
          <input
            id="youtubeUrl"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Exemple : https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        );
      case 'file':
        return (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-2xl p-6 cursor-pointer hover:bg-blue-50 transition-colors duration-300 group">
            <input
              id="file-upload"
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="hidden"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4v-1a4 4 0 014-4h14a4 4 0 014 4v1a4 4 0 01-4 4h-1M7 16l4-4m0 0l4 4m-4-4v9" />
              </svg>
              <p className="text-gray-500 font-medium text-center">
                <span className="text-blue-600 font-bold hover:underline">Cliquez pour uploader</span> ou glissez-déposez un fichier.
              </p>
            </label>
            {file && (
              <p className="mt-4 text-gray-800 font-semibold text-sm transition-opacity duration-300 animate-fade-in">Fichier sélectionné : <span className="text-blue-600 font-bold">{file.name}</span></p>
            )}
          </div>
        );
    }
  };

  interface IconProps {
    path: string;
    isActive: boolean;
  }

  const Icon = ({ path, isActive }: IconProps) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={`h-8 w-8 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-blue-600'}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );

  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Générer un Résumé</h1>
        
        {/* SÉLECTEUR DE MODE AVEC ICÔNES */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => { setMode('ia'); setSummary(null); setError(null); }}
            className={`p-4 rounded-full transition-all duration-300 transform group
              ${mode === 'ia' ? 'bg-blue-600 shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Générer par l'IA"
          >
            <Icon path="M9 13a6 6 0 110-12 6 6 0 010 12zm0-2a4 4 0 100-8 4 4 0 000 8zm13-5a2 2 0 11-4 0 2 2 0 014 0zm-4-4a2 2 0 11-4 0 2 2 0 014 0zM7 21a2 2 0 11-4 0 2 2 0 014 0zm-4-4a2 2 0 11-4 0 2 2 0 014 0z" isActive={mode === 'ia'} />
          </button>
          <button
            onClick={() => { setMode('topic'); setSummary(null); setError(null); }}
            className={`p-4 rounded-full transition-all duration-300 transform group
              ${mode === 'topic' ? 'bg-blue-600 shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Générer par Sujet"
          >
            <Icon path="M12 6.5V17.5M17.5 12H6.5" isActive={mode === 'topic'} />
          </button>
          <button
            onClick={() => { setMode('youtube'); setSummary(null); setError(null); }}
            className={`p-4 rounded-full transition-all duration-300 transform group
              ${mode === 'youtube' ? 'bg-blue-600 shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Générer par Vidéo YouTube"
          >
            <Icon path="M10 17l6-5-6-5v10zM21 12c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3s1.34-3 3-3h12c1.66 0 3 1.34 3 3z" isActive={mode === 'youtube'} />
          </button>
          <button
            onClick={() => { setMode('file'); setSummary(null); setError(null); }}
            className={`p-4 rounded-full transition-all duration-300 transform group
              ${mode === 'file' ? 'bg-blue-600 shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Générer par Fichier"
          >
            <Icon path="M4 14.5v5a2 2 0 002 2h12a2 2 0 002-2v-5m-16 0l8-8 8 8m-8-8v12" isActive={mode === 'file'} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-lg font-semibold text-gray-700 mb-2">
              {mode === 'ia' || mode === 'topic' ? 'Sujet du résumé' : mode === 'youtube' ? 'URL de la vidéo YouTube' : 'Fichier de cours'}
            </label>
            {renderForm()}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 transform
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105'
              }`}
          >
            {loading ? 'Génération en cours...' : 'Générer le Résumé'}
          </button>
        </form>

        {error && (
          <div className="mt-8 p-5 bg-red-50 border border-red-400 text-red-700 rounded-lg text-center shadow-md">
            <p className="font-semibold text-lg">{error}</p>
          </div>
        )}

        {summary && (
          <div className="mt-12 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{summary.title}</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: summary.content }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant d'application principal qui combine la navigation et le contenu de la page
export default function App() {
  return (
    <div className="flex flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <Navbar />
      <GenerateSummaryPage />
    </div>
  );
}
