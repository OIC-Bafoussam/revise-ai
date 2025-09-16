'use client';

import { useState, ReactNode } from 'react';
import { LayoutDashboard, User, Settings, ArrowLeft, BarChart, Trophy, BookOpen, Clock } from 'lucide-react';
import "@/app/page"


// Interfaces pour définir les types des props
interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

interface PerformanceBarProps {
  topic: string;
  progress: number;
}

// Composant pour les petites cartes de statistiques en haut de page
const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center w-full">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-blue-600 mb-3">
      {icon}
    </div>
    <div className="text-sm text-gray-500 font-medium">{title}</div>
    <div className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{value}</div>
  </div>
);

// Composant pour les barres de progression des performances
const PerformanceBar = ({ topic, progress }: PerformanceBarProps) => (
  <div className="w-full mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700">{topic}</span>
      <span className="text-sm font-bold text-gray-600">{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

// Composant principal de la page de suivi de la progression
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Données factices pour simuler la progression
  const statsData = [
    { title: "Quiz complétés", value: "4", icon: <Trophy size={24} /> },
    { title: "Score moyen", value: "76%", icon: <BarChart size={24} /> },
    { title: "Temps d'étude", value: "4h", icon: <Clock size={24} /> },
    { title: "Série en cours", value: "3", icon: <BookOpen size={24} /> },
  ];

  const weeklyData = [
    { day: "Lun", quizCount: 4, score: 78 },
    { day: "Mar", quizCount: 3, score: 76 },
    { day: "Merc", quizCount: 1, score: 74 },
    { day: "Jeu", quizCount: 2, score: 80 },
    { day: "Vend", quizCount: 1, score: 70 },
    { day: "Sam", quizCount: 4, score: 60 },
    { day: "Dim", quizCount: 2, score: 88 },
  ];

  const performanceData = [
    { topic: "Merise", progress: 70 },
    { topic: "Uml", progress: 60 },
    { topic: "Crypto", progress: 90 },
  ];

  const recommendationsData = [
    "Continuez sur cette lancée.",
    "Prenez des pauses régulières.",
    "Rejoignez un groupe d'étude.",
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Barre latérale (Sidebar) */}
      <aside className={`fixed z-50 md:sticky top-0 left-0 h-full w-64 bg-gray-800 text-gray-200 p-6 flex flex-col transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="text-2xl font-bold text-white mb-8">Menu</div>
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                <LayoutDashboard size={20} className="mr-4" />
                Tableau de bord
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                <User size={20} className="mr-4" />
                Profil
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                <Settings size={20} className="mr-4" />
                Paramètres
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 md:p-10 relative">
        {/* Bouton pour ouvrir la barre latérale sur mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg"
          aria-label="Ouvrir le menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Bouton de retour */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-xl shadow-md hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour
          </button>
        </div>

        {/* En-tête de la page */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Suivi de progression</h1>
          <p className="text-gray-500 mt-2">Analysez vos performances et suivez votre évolution</p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsData.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        {/* Graphique de progression hebdomadaire */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-10">
          <div className="flex items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Progression de la semaine</h2>
          </div>
          <div className="flex flex-col space-y-4">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-gray-600 font-medium">{data.day}</div>
                <div className="flex-1 ml-4 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${data.score}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-sm font-bold text-gray-700">{data.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sections Performances et Recommandations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performances */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Performances</h2>
            {performanceData.map((perf, index) => (
              <PerformanceBar key={index} topic={perf.topic} progress={perf.progress} />
            ))}
          </div>

          {/* Recommandations */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Recommandations</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recommendationsData.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0 mt-2 mr-2"></span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
