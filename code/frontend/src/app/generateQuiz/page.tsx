'use client';

import React, { useState, useEffect } from 'react';
import "@/app/page"

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
  { href: '/generateQuiz', label: 'Quiz', icon: (isActive: boolean) => (
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
 * Composant de la barre de navigation.
 */
function Navbar() {
  const [activeLink, setActiveLink] = useState('/generateQuiz');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Simule la lecture du chemin de l'URL pour la démonstration
    const path = '/generateQuiz'; 
    setCurrentPath(path);
    setActiveLink(path);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Déconnexion de l'utilisateur...");
    // window.location.href = '/login';
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-lg z-50">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-xl font-bold text-gray-900">Revise-ia</span>
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

// Définition de l'interface pour la question de quiz
interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

/**
 * Composant de la page de génération de quiz.
 */
function GenerateQuizPage() {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  /**
   * Gère l'envoi du formulaire pour générer le quiz.
   */
  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Veuillez entrer un sujet pour générer le quiz.");
      return;
    }

    setLoading(true);
    setQuiz(null);
    setError(null);
    setShowResults(false);
    setUserAnswers([]);

    try {
      // API Key for Gemini API (empty string for canvas)
      const apiKey = "AIzaSyDdC3z4axWR3xcD2t9yZaJNirSeSGRO_hY"; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      // Prompt pour générer un quiz
      const prompt = `Génère un quiz de 20 questions à choix multiples sur le sujet suivant : "${topic}". Chaque question doit avoir 4 options et une seule bonne réponse. Fournis le résultat au format JSON avec un tableau d'objets. Chaque objet doit avoir les clés suivantes: "question", "options" (un tableau de chaînes de caractères), et "answer" (la bonne réponse).`;
      
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "question": { "type": "STRING" },
                "options": {
                  "type": "ARRAY",
                  "items": { "type": "STRING" }
                },
                "answer": { "type": "STRING" }
              }
            }
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
          
        const jsonText = result.candidates[0].content.parts[0].text;
        const parsedQuiz = JSON.parse(jsonText);
        setQuiz(parsedQuiz);
        setUserAnswers(new Array(parsedQuiz.length).fill(''));

      } else {
        throw new Error("La génération du quiz a échoué. Aucune donnée n'a été retournée.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue lors de la génération du quiz. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gère la sélection d'une option par l'utilisateur.
   */
  const handleOptionSelect = (questionIndex: number, option: string) => {
    if (showResults) return; // Empêche de modifier les réponses une fois les résultats affichés
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = option;
    setUserAnswers(newAnswers);
  };

  /**
   * Calcule le score et affiche les résultats.
   */
  const handleCheckAnswers = () => {
    let newScore = 0;
    quiz?.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Générer un Quiz</h1>
        
        {/* Formulaire pour générer un nouveau quiz */}
        {!quiz && (
          <form onSubmit={handleGenerateQuiz} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-lg font-semibold text-gray-700 mb-2">Sujet du quiz</label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Exemple : L'histoire de la Révolution française"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
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
              {loading ? 'Génération en cours...' : 'Générer le Quiz'}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-8 p-5 bg-red-50 border border-red-400 text-red-700 rounded-lg text-center shadow-md">
            <p className="font-semibold text-lg">{error}</p>
          </div>
        )}

        {/* Afficher le quiz (mode de réponse) */}
        {quiz && !showResults && (
          <div className="mt-12 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Quiz généré</h2>
            {quiz.map((q, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{`Question ${index + 1}: ${q.question}`}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      onClick={() => handleOptionSelect(index, option)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 text-gray-700
                        ${userAnswers[index] === option ? 'bg-blue-200 border-2 border-blue-500 font-semibold' : 'bg-gray-50 hover:bg-gray-100'}`
                      }
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleCheckAnswers}
              disabled={userAnswers.some(answer => answer === '')}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 transform
                ${userAnswers.some(answer => answer === '')
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white shadow-lg hover:bg-green-700 hover:scale-105'
                }`}
            >
              Voir les résultats
            </button>
          </div>
        )}

        {/* Afficher les résultats */}
        {quiz && showResults && (
          <div className="mt-12 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Votre résultat: {score} / {quiz.length}</h2>
            {quiz.map((q, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{`Question ${index + 1}: ${q.question}`}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, optionIndex) => {
                    const isCorrect = option === q.answer;
                    const isUserAnswer = userAnswers[index] === option;
                    
                    let bgColor = 'bg-gray-50';
                    let borderColor = 'border-gray-200';
                    let textColor = 'text-gray-700';
                    let fontWeight = 'font-normal';

                    if (isUserAnswer) {
                      bgColor = isCorrect ? 'bg-green-200' : 'bg-red-200';
                      borderColor = isCorrect ? 'border-green-500' : 'border-red-500';
                      textColor = isCorrect ? 'text-green-800' : 'text-red-800';
                      fontWeight = 'font-semibold';
                    }
                    if (isCorrect) {
                       bgColor = 'bg-green-100';
                       borderColor = 'border-green-500';
                       textColor = 'text-green-700';
                       fontWeight = 'font-semibold';
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-lg border-2 ${bgColor} ${borderColor} ${textColor} ${fontWeight}`}
                      >
                        {option}
                        {isUserAnswer && !isCorrect && (
                          <span className="ml-2 text-red-500 font-bold"> (Votre réponse)</span>
                        )}
                        {!isUserAnswer && isCorrect && (
                          <span className="ml-2 text-green-500 font-bold"> (Réponse juste)</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setQuiz(null);
                setTopic('');
                setUserAnswers([]);
                setShowResults(false);
              }}
              className="w-full py-4 rounded-full font-bold text-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Créer un nouveau quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant d'application principal
export default function App() {
  return (
    <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <Navbar />
      <div className="flex-1 ml-64 p-6">
        <GenerateQuizPage />
      </div>
    </div>
  );
}
