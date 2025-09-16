'use client';

import React, { useState, useEffect } from 'react';
import '@/app/page';

// Définition de l'interface pour un lien de navigation
interface NavLink {
  href: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
}

/**
 * Composant de la barre de navigation.
 * Affiche les liens de navigation avec des icônes et gère l'état actif.
 */
// 
// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState('/flashQuiz');

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
  const [activeLink, setActiveLink] = useState('/flashQuiz');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Simule la lecture du chemin de l'URL pour la démonstration
    const path = '/flashQuiz'; 
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

// Définition de l'interface pour une question de quiz
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

/**
 * Composant de la page FlashQuiz.
 * Permet à l'utilisateur de saisir un sujet ou de télécharger un fichier pour générer un quiz.
 */
function FlashQuizPage() {
  const [quizState, setQuizState] = useState("selection"); // "selection", "subject_input", "upload", "generating", "playing", "finished"
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [message, setMessage] = useState(''); // Pour les messages de l'utilisateur
  const [subject, setSubject] = useState('');

  /**
   * Appelle l'API Gemini pour générer un quiz à partir du contenu du fichier ou d'un sujet.
   * @param content Le contenu (texte ou sujet) à partir duquel générer le quiz.
   * @param mode Le mode de génération ('subject' ou 'file').
   * @returns Un tableau d'objets QuizQuestion.
   */
  const generateQuiz = async (content: string, mode: 'subject' | 'file'): Promise<QuizQuestion[]> => {
    let prompt = '';
    if (mode === 'subject') {
      prompt = `Génère un quiz de 3 questions à choix multiples (QCM) sur le sujet suivant : ${content}. Pour chaque question, fournis la question, 4 options de réponse et la bonne réponse.`;
    } else {
      prompt = `Génère un quiz de 3 questions à choix multiples (QCM) sur le texte suivant. Pour chaque question, fournis la question, 4 options de réponse et la bonne réponse.
      Texte:
      """
      ${content}
      """
      `;
    }

    // API Key for Gemini API (empty string for canvas)
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

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
              "correctAnswer": { "type": "STRING" }
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
      return JSON.parse(jsonText);
    } else {
      throw new Error("La génération du quiz a échoué. Aucune donnée n'a été retournée.");
    }
  };

  /**
   * Lance la génération du quiz à partir d'un sujet textuel.
   */
  const startQuizFromSubject = async () => {
    if (!subject.trim()) {
      setMessage("Veuillez saisir un sujet.");
      return;
    }
    setQuizState("generating");
    setMessage("Génération du quiz en cours...");
    
    try {
      const quiz = await generateQuiz(subject, 'subject');
      if (quiz && quiz.length > 0) {
        setQuizData(quiz);
        setQuizState("playing");
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowAnswer(false);
        setMessage("");
      } else {
        setMessage("Impossible de générer un quiz sur ce sujet. Veuillez réessayer.");
        setQuizState("subject_input");
      }
    } catch (error: any) {
      console.error("Erreur lors de la génération du quiz:", error);
      setMessage(error.message || "Une erreur s'est produite lors de la génération. Veuillez réessayer.");
      setQuizState("subject_input");
    }
  };

  /**
   * Gère le changement de fichier. Lit le contenu et lance la génération du quiz.
   * @param event L'événement de changement de fichier.
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setMessage("Aucun fichier sélectionné.");
      return;
    }

    setMessage("");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const textContent = e.target?.result as string;
      if (textContent.length < 50) {
        setMessage("Le fichier est trop court pour générer un quiz. Veuillez en choisir un plus long.");
        setQuizState("upload");
        return;
      }
      
      setQuizState("generating");
      setMessage("Génération du quiz en cours...");
      
      try {
        const quiz = await generateQuiz(textContent, 'file');
        if (quiz && quiz.length > 0) {
          setQuizData(quiz);
          setQuizState("playing");
          setCurrentQuestionIndex(0);
          setScore(0);
          setShowAnswer(false);
          setMessage("");
        } else {
          setMessage("Impossible de générer un quiz à partir de ce fichier. Veuillez réessayer avec un autre.");
          setQuizState("upload");
        }
      } catch (error: any) {
        console.error("Erreur lors de la génération du quiz:", error);
        setMessage(error.message || "Une erreur s'est produite lors de la génération. Veuillez réessayer.");
        setQuizState("upload");
      }
    };
    reader.readAsText(file);
  };

  /**
   * Gère la sélection d'une réponse par l'utilisateur.
   * @param selectedOption La réponse sélectionnée.
   */
  const handleAnswerClick = (selectedOption: string) => {
    if (showAnswer) return;
    setShowAnswer(true);

    if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  /**
   * Passe à la question suivante ou termine le quiz.
   */
  const handleNextQuestion = () => {
    setShowAnswer(false);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizState("finished");
    }
  };

  /**
   * Gère le redémarrage du quiz.
   */
  const handleRestart = () => {
    setQuizState("selection");
    setMessage("");
    setSubject("");
  };

  // Rendu conditionnel en fonction de l'état du quiz
  const renderQuizContent = () => {
    switch (quizState) {
      case "selection":
        return (
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Choisissez une option pour créer votre quiz :</h2>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg">
              <button
                onClick={() => setQuizState("subject_input")}
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Entrer un sujet
              </button>
              <button
                onClick={() => setQuizState("upload")}
                className="flex-1 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
              >
                Générer à partir d'un fichier
              </button>
            </div>
          </div>
        );
      case "subject_input":
        return (
          <div className="text-center flex flex-col items-center w-full max-w-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Quel sujet voulez-vous tester ?</h2>
            <p className="text-md text-gray-600 mb-6">Génère un quiz de 3 questions sur n'importe quel sujet.</p>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: L'histoire de Rome antique"
              className="w-full px-6 py-4 rounded-full text-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={startQuizFromSubject}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Générer le quiz
            </button>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
            {/* Bouton de retour */}
            <button
              onClick={handleRestart}
              className="mt-8 text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
            >
              Retour
            </button>
          </div>
        );
      case "upload":
        return (
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Téléchargez un fichier</h2>
            <p className="text-md text-gray-600 mb-6">Génère un quiz de 3 questions à partir d'un fichier texte.</p>
            <label className="cursor-pointer bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105">
              <input type="file" onChange={handleFileChange} className="hidden" />
              Choisir un fichier
            </label>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
            {/* Bouton de retour */}
            <button
              onClick={handleRestart}
              className="mt-8 text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
            >
              Retour
            </button>
          </div>
        );
      case "generating":
        return (
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-700 mb-4">Génération du quiz en cours...</p>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Cela peut prendre quelques instants.</p>
          </div>
        );
      case "playing":
        const currentQuestion = quizData[currentQuestionIndex];
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-8 text-center">{currentQuestion.question}</h2>
            <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`w-full py-4 rounded-xl text-lg font-medium transition-all duration-300 border-2
                    ${showAnswer 
                      ? (option === currentQuestion.correctAnswer 
                        ? 'bg-green-100 border-green-500 text-green-800' 
                        : (option === currentQuestion.correctAnswer && option !== currentQuestion.correctAnswer) ? 'bg-red-100 border-red-500 text-red-800' : 'bg-gray-50 border-gray-200 text-gray-800')
                      : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-blue-300'
                    }
                  `}
                  disabled={showAnswer}
                >
                  {option}
                </button>
              ))}
            </div>
            {showAnswer && (
              <button
                onClick={handleNextQuestion}
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                {currentQuestionIndex < quizData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
              </button>
            )}
          </div>
        );
      case "finished":
        return (
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Quiz Terminé !</h2>
            <p className="text-2xl text-gray-700 mb-8">
              Votre score : <span className="font-bold text-blue-600">{score}</span> / {quizData.length}
            </p>
            <div className="space-y-4">
              {quizData.map((q, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 border-2 border-gray-200">
                  <p className="font-bold">{`Question ${index + 1}: ${q.question}`}</p>
                  <p className="mt-2 text-green-700 font-semibold">Réponse correcte: {q.correctAnswer}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleRestart}
              className="mt-8 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
            >
              Créer un nouveau quiz
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">FlashQuiz</h1>
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200 min-h-[400px] flex items-center justify-center">
        {renderQuizContent()}
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
        <FlashQuizPage />
      </div>
    </div>
  );
}
