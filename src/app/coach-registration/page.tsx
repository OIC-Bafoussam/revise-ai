'use client';

import React, { useEffect, useState } from 'react';
import { Check, User, BookOpen, MessageSquare, ArrowRight, Save, Star, ArrowLeft } from 'lucide-react';
import "@/app/page";

interface User {
  nom?: string;
  prenom?: string;
  name?: string;
  email: string;
  niveau?: string;
  profession?: string;
  domaine?: string;
  avatar?: string | null;
  coachId?: number;
}

interface Coach {
  id: number;
  name: string;
  subject: string;
  bio: string;
  avatar?: string;
}

// Données des coachs - doit correspondre à la page de sélection
const AVAILABLE_COACHES: Coach[] = [
  { 
    id: 1, 
    name: 'Mme. Claire Martin', 
    subject: 'UML', 
    bio: 'Spécialiste en UML.',
    avatar: '👩‍🏫'
  },
  { 
    id: 2, 
    name: 'M. David Dubois', 
    subject: 'Histoire', 
    bio: 'Expert en histoire antique et moderne.',
    avatar: '👨‍🏫'
  },
  { 
    id: 3, 
    name: 'Mme. Sarah Lemaitre', 
    subject: 'Littérature', 
    bio: 'Spécialiste des textes littéraires.',
    avatar: '👩‍🎓'
  },
  { 
    id: 4, 
    name: 'M. Paul Dupont', 
    subject: 'Informatique & Programmation', 
    bio: 'Développeur fullstack.',
    avatar: '👨‍💻'
  },
  { 
    id: 5, 
    name: 'Mme. Émilie Gauthier', 
    subject: 'Biologie', 
    bio: 'Passionnée des sciences du vivant.',
    avatar: '👩‍⚕️'
  }
];

export default function CoachRegistrationPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [studyGoals, setStudyGoals] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      
      if (user.coachId) {
        const coach = AVAILABLE_COACHES.find(c => c.id === user.coachId);
        setSelectedCoach(coach || null);
      }
    }
    setIsLoading(false);
  }, []);

  const handleSaveCoachRegistration = async () => {
    if (!currentUser || !selectedCoach) return;

    setIsSaving(true);
    
    try {
      // Récupérer tous les utilisateurs
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u: any) => u.email === currentUser.email);

      if (userIndex !== -1) {
        // Mettre à jour l'utilisateur avec les informations du coach et les préférences
        users[userIndex] = {
          ...users[userIndex],
          coachId: selectedCoach.id,
          coachRegistrationData: {
            studyGoals,
            weeklyHours,
            preferredTime,
            registrationDate: new Date().toISOString(),
            coachInfo: selectedCoach
          }
        };

        // Sauvegarder dans localStorage
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));

        setMessage("Enregistrement réussi ! Votre coach a été assigné avec vos préférences.");
        
        // Redirection après 5 secondes
        setTimeout(() => {
          window.location.href = "/acceuilPage";
        }, 5000);
      }
    } catch (error) {
      setMessage("Erreur lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à cette page.</p>
          <button
            onClick={() => window.location.href = "/auth/sign-in"}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (!selectedCoach) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Aucun coach sélectionné</h2>
          <p className="text-gray-600 mb-6">Vous devez d'abord sélectionner un coach avant de procéder à l'enregistrement.</p>
          <button
            onClick={() => window.location.href = "/coach-selection"}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            Sélectionner un coach
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Félicitations !</h1>
          <p className="text-gray-600">Finalisez votre inscription avec votre coach</p>
        </div>

        {/* Message de notification */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center ${
            message.includes('réussi') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations du coach sélectionné */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Votre coach sélectionné
            </h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                  {selectedCoach.avatar || '👨‍🏫'}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedCoach.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{selectedCoach.subject}</p>
                  <p className="text-gray-600 text-sm">{selectedCoach.bio}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-xl p-3 text-center">
                  <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Expertise</p>
                  <p className="text-xs text-gray-600">{selectedCoach.subject}</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <MessageSquare className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Support</p>
                  <p className="text-xs text-gray-600">24/7 disponible</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Évaluation</p>
                  <p className="text-xs text-gray-600">5.0 ⭐⭐⭐⭐⭐</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de préférences */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-purple-600" />
              Vos préférences d'étude
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objectifs d'étude
                </label>
                <textarea
                  value={studyGoals}
                  onChange={(e) => setStudyGoals(e.target.value)}
                  placeholder="Décrivez vos objectifs et ce que vous souhaitez accomplir..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heures d'étude par semaine
                </label>
                <select
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="1-5">1-5 heures</option>
                  <option value="6-10">6-10 heures</option>
                  <option value="11-15">11-15 heures</option>
                  <option value="16-20">16-20 heures</option>
                  <option value="20+">Plus de 20 heures</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moment préféré pour étudier
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="morning">Matin (6h-12h)</option>
                  <option value="afternoon">Après-midi (12h-18h)</option>
                  <option value="evening">Soir (18h-22h)</option>
                  <option value="night">Nuit (22h-6h)</option>
                </select>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Ce qui vous attend :</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Sessions d'accompagnement personnalisées</li>
                  <li>• Suivi de vos progrès en temps réel</li>
                  <li>• Ressources adaptées à vos besoins</li>
                  <li>• Support direct avec votre coach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton d'enregistrement */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSaveCoachRegistration}
            disabled={isSaving || !studyGoals || !weeklyHours || !preferredTime}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-3 mx-auto ${
              isSaving || !studyGoals || !weeklyHours || !preferredTime
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Finaliser l'inscription
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {(!studyGoals || !weeklyHours || !preferredTime) && (
            <p className="text-sm text-gray-500 mt-2">
              Veuillez remplir tous les champs pour continuer
            </p>
          )}
        </div>

        {/* Informations utilisateur */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Votre profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Nom :</span>
              <span className="ml-2 font-medium">{currentUser.name || `${currentUser.prenom || ''} ${currentUser.nom || ''}`.trim() || 'Non défini'}</span>
            </div>
            <div>
              <span className="text-gray-600">Niveau :</span>
              <span className="ml-2 font-medium">{currentUser.niveau || 'Non défini'}</span>
            </div>
            <div>
              <span className="text-gray-600">Domaine :</span>
              <span className="ml-2 font-medium">{currentUser.domaine || 'Non défini'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}