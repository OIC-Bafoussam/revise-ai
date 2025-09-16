'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  ArrowLeft,
  Eye,
  EyeOff,
  Trash2,
  Save,
  Camera,
  Edit,
  BookOpen,
  Users,
  MessageSquare,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Lock,
  Key,
  Check
} from 'lucide-react';
import "@/app/page";

// Types
interface UserProfile {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  school?: string;
  level?: string;
  subjects: string[];
  profession?: string;
  domaine?: string;
  niveau?: string;
  coachId?: number;
}

interface Coach {
  id: number;
  name: string;
  subject: string;
  bio: string;
  avatar: string;
}

interface NotificationSettings {
  newMessages: boolean;
  groupInvitations: boolean;
  examReminders: boolean;
  studySessions: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
}

interface AppSettings {
  darkMode: boolean;
  language: string;
  autoJoinGroups: boolean;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  profileVisibility: 'public' | 'friends' | 'private';
  dataSharing: boolean;
}

// Données factices pour les coachs
const AVAILABLE_COACHES: Coach[] = [
  { 
    id: 1, 
    name: 'Mme. Claire Martin', 
    subject: 'Mathématiques', 
    bio: 'Spécialiste en algèbre et analyse. 15 ans d\'expérience dans l\'enseignement.', 
    avatar: '👩‍🏫' 
  },
  { 
    id: 2, 
    name: 'M. David Dubois', 
    subject: 'Informatique & UML', 
    bio: 'Expert en développement logiciel et modélisation UML.', 
    avatar: '👨‍💻' 
  },
  { 
    id: 3, 
    name: 'Mme. Sarah Lemaitre', 
    subject: 'Littérature & Philosophie', 
    bio: 'Analyse des textes et méthodologie de dissertation.', 
    avatar: '👩‍🎓' 
  },
  { 
    id: 4, 
    name: 'M. Paul Dupont', 
    subject: 'Informatique & Programmation', 
    bio: 'Algorithmes, structures de données et développement web.', 
    avatar: '👨‍🔬' 
  },
  { 
    id: 5, 
    name: 'Mme. Émilie Gauthier', 
    subject: 'Biologie & Chimie', 
    bio: 'Maîtrise des concepts du vivant et réactions chimiques.', 
    avatar: '👩‍⚕️' 
  }
];

const INITIAL_NOTIFICATIONS: NotificationSettings = {
  newMessages: true,
  groupInvitations: true,
  examReminders: true,
  studySessions: true,
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: true
};

const INITIAL_APP_SETTINGS: AppSettings = {
  darkMode: false,
  language: 'Français',
  autoJoinGroups: false,
  showOnlineStatus: true,
  allowDirectMessages: true
};

const INITIAL_SECURITY: SecuritySettings = {
  twoFactorAuth: false,
  profileVisibility: 'friends',
  dataSharing: false
};

const AVAILABLE_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const AVAILABLE_SUBJECTS = [
  'Mathématiques', 'Physique', 'Chimie', 'SVT', 'Français', 'Philosophie',
  'Histoire-Géographie', 'Anglais', 'Espagnol', 'Allemand', 'Informatique',
  'Arts', 'Musique', 'Sport'
];

const AVATAR_OPTIONS = ['👩‍🎓', '🧑‍🎓', '👨‍🎓', '👩‍💻', '🧑‍💻', '👨‍💻', '👩‍🔬', '🧑‍🔬', '👨‍🔬'];

// Niveaux d'étude disponibles
const AVAILABLE_LEVELS = [
  'Lycée', 'Seconde', 'Première', 'Terminale S', 'Terminale ES', 'Terminale L',
  'Bac+2', 'Bac+3', 'Bac+5', 'Doctorat', 'Autre'
];

// Professions disponibles
const AVAILABLE_PROFESSIONS = [
  'Étudiant', 'Lycéen', 'Ingénieur', 'Développeur', 'Designer', 'Chef de projet', 'Autre'
];

// Domaines d'étude
const AVAILABLE_DOMAINS = [
  'Informatique', 'Sciences', 'Lettres', 'Droit', 'Médecine', 'Arts', 'Commerce', 'Autre'
];

export default function SettingsPage() {
  const [currentSection, setCurrentSection] = useState('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alice Martin',
    email: 'alice@example.com',
    avatar: '👩‍🎓',
    school: 'Lycée Victor Hugo',
    level: 'Terminale S',
    subjects: ['Mathématiques', 'Physique', 'Informatique'],
    profession: 'Étudiante',
    domaine: 'Sciences',
    coachId: 1
  });
  const [notifications, setNotifications] = useState<NotificationSettings>(INITIAL_NOTIFICATIONS);
  const [appSettings, setAppSettings] = useState<AppSettings>(INITIAL_APP_SETTINGS);
  const [security, setSecurity] = useState<SecuritySettings>(INITIAL_SECURITY);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userProfile.coachId) {
      const coach = AVAILABLE_COACHES.find(c => c.id === userProfile.coachId);
      setSelectedCoach(coach || null);
    }
  }, [userProfile.coachId]);

  useEffect(() => {
    if (appSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appSettings.darkMode]);

  const handleSave = async () => {
    if (!isLoggedIn) return;

    setIsSaving(true);
    setMessage('');

    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUnsavedChanges(false);
      setIsEditing(false);
      setMessage("✅ Paramètres sauvegardés avec succès !");
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setMessage("❌ Erreur lors de la sauvegarde des paramètres. Veuillez réessayer.");
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!newPassword.trim()) {
      setMessage("❌ Veuillez saisir un nouveau mot de passe.");
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("❌ Le mot de passe doit contenir au moins 6 caractères.");
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      // Simuler la mise à jour du mot de passe
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserProfile(prev => ({ ...prev, password: newPassword }));
      setNewPassword('');
      setMessage("✅ Mot de passe mis à jour avec succès !");
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      setMessage("❌ Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.");
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileChange = (field: keyof UserProfile, value: any) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleAppSettingChange = (field: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleSecurityChange = (field: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const avatarUrl = event.target?.result as string;
        handleProfileChange('avatar', avatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoachSelection = (coachId: number) => {
    handleProfileChange('coachId', coachId);
    const coach = AVAILABLE_COACHES.find(c => c.id === coachId);
    setSelectedCoach(coach || null);
    setUnsavedChanges(true);
  };

  const removeCoach = () => {
    handleProfileChange('coachId', undefined);
    setSelectedCoach(null);
    setUnsavedChanges(true);
  };

  const toggleSubject = (subject: string) => {
    const updatedSubjects = userProfile.subjects.includes(subject)
      ? userProfile.subjects.filter(s => s !== subject)
      : [...userProfile.subjects, subject];
    handleProfileChange('subjects', updatedSubjects);
  };

  const handleDeleteAccount = async () => {
    const confirmMessage = "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et supprimera toutes vos données.";
    const secondConfirmMessage = "Tapez 'SUPPRIMER' pour confirmer la suppression de votre compte :";
    
    if (confirm(confirmMessage)) {
      const confirmation = prompt(secondConfirmMessage);
      
      if (confirmation === 'SUPPRIMER') {
        setIsSaving(true);
        setMessage('');

        try {
          // Simuler la suppression
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          alert("Votre compte a été supprimé avec succès. Vous allez être redirigé vers la page de connexion.");
          window.location.href = "/";
        } catch (error) {
          console.error("Erreur lors de la suppression du compte:", error);
          setMessage("❌ Erreur lors de la suppression du compte. Veuillez réessayer.");
          setTimeout(() => setMessage(''), 5000);
        } finally {
          setIsSaving(false);
        }
      } else if (confirmation !== null) {
        setMessage("❌ Confirmation incorrecte. Suppression annulée.");
        setTimeout(() => setMessage(''), 5000);
      }
    }
  };

  // Composant Toggle Switch
  const ToggleSwitch: React.FC<{ 
    checked: boolean; 
    onChange: (checked: boolean) => void; 
    disabled?: boolean;
    size?: 'sm' | 'md';
  }> = ({ checked, onChange, disabled = false, size = 'md' }) => {
    const sizeClasses = size === 'sm' 
      ? 'w-10 h-6' 
      : 'w-14 h-8';
    const dotClasses = size === 'sm'
      ? 'w-4 h-4'
      : 'w-6 h-6';
    const translateClasses = size === 'sm'
      ? 'translate-x-4'
      : 'translate-x-6';

    return (
      <button
        type="button"
        className={`relative inline-flex ${sizeClasses} rounded-full transition-colors duration-200 ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span
          className={`${dotClasses} bg-white rounded-full shadow-md transform transition-transform duration-200 ${
            checked ? translateClasses : 'translate-x-1'
          } translate-y-1`}
        />
      </button>
    );
  };

  // Section Navigation
  const sections = [
    { id: 'profile', name: 'Profil', icon: User, color: 'text-blue-600' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'text-green-600' },
    { id: 'appearance', name: 'Apparence', icon: Settings, color: 'text-purple-600' },
    { id: 'security', name: 'Sécurité', icon: Shield, color: 'text-red-600' }
  ];

  const renderSectionNav = () => (
    <div className="bg-white border border-blue-100 rounded-2xl p-2 mb-6 shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 ${
              currentSection === section.id
                ? 'bg-blue-50 border border-blue-200 shadow-sm'
                : 'hover:bg-gray-50'
            }`}
          >
            <section.icon className={`w-5 h-5 ${
              currentSection === section.id ? section.color : 'text-gray-500'
            }`} />
            <span className={`font-medium text-sm ${
              currentSection === section.id ? 'text-gray-800' : 'text-gray-600'
            }`}>
              {section.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  // Section Profil
  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Informations personnelles */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            Informations personnelles
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-md overflow-hidden">
              {userProfile.avatar.startsWith('data:') || userProfile.avatar.startsWith('http') ? (
                <img 
                  src={userProfile.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                userProfile.avatar
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors cursor-pointer">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{userProfile.name}</h3>
            <p className="text-gray-600 mb-1">{userProfile.email}</p>
            {userProfile.school && <p className="text-gray-500 text-sm">{userProfile.school}</p>}
            {userProfile.level && <p className="text-blue-600 text-sm">📚 {userProfile.level}</p>}
            {userProfile.profession && (
              <p className="text-purple-600 text-sm">💼 {userProfile.profession}</p>
            )}
            {userProfile.domaine && (
              <p className="text-green-600 text-sm">🎯 {userProfile.domaine}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <p className="text-sm font-medium text-gray-700 col-span-3 mb-2">Choisir un avatar :</p>
            {AVATAR_OPTIONS.map((avatar, index) => (
              <button
                key={index}
                onClick={() => handleProfileChange('avatar', avatar)}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                  userProfile.avatar === avatar
                    ? 'bg-blue-100 border-2 border-blue-500 scale-110'
                    : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">École/Lycée</label>
              <input
                type="text"
                value={userProfile.school || ''}
                onChange={(e) => handleProfileChange('school', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
              <select
                value={userProfile.level || ''}
                onChange={(e) => handleProfileChange('level', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Sélectionner un niveau</option>
                {AVAILABLE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
              <select
                value={userProfile.profession || ''}
                onChange={(e) => handleProfileChange('profession', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Sélectionner une profession</option>
                {AVAILABLE_PROFESSIONS.map(profession => (
                  <option key={profession} value={profession}>{profession}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domaine d'étude</label>
              <select
                value={userProfile.domaine || ''}
                onChange={(e) => handleProfileChange('domaine', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Sélectionner un domaine</option>
                {AVAILABLE_DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Matières d'intérêt</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {AVAILABLE_SUBJECTS.map(subject => (
                <button
                  key={subject}
                  onClick={() => isEditing && toggleSubject(subject)}
                  disabled={!isEditing}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    userProfile.subjects.includes(subject)
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gestion du Coach */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-green-600" />
          Mon Coach Personnel
        </h2>

        {selectedCoach ? (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200 mb-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                {selectedCoach.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedCoach.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{selectedCoach.subject}</p>
                <p className="text-gray-600 text-sm">{selectedCoach.bio}</p>
              </div>
              <button
                onClick={removeCoach}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
              >
                Retirer
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun coach assigné</h3>
            <p className="text-gray-600 mb-4">Choisissez un coach pour vous accompagner dans vos révisions</p>
          </div>
        )}

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Coachs disponibles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AVAILABLE_COACHES.map(coach => (
              <div
                key={coach.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedCoach?.id === coach.id
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => handleCoachSelection(coach.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                    {coach.avatar}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">{coach.name}</h5>
                    <p className="text-blue-600 text-sm font-medium">{coach.subject}</p>
                    <p className="text-gray-600 text-xs mt-1">{coach.bio}</p>
                  </div>
                  {selectedCoach?.id === coach.id && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Changement de mot de passe */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Key className="w-6 h-6 text-orange-600" />
          Sécurité du compte
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Saisissez votre nouveau mot de passe"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <button
            onClick={handlePasswordUpdate}
            disabled={isSaving || !newPassword.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              isSaving || !newPassword.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            {isSaving ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Mise à jour...
              </>
            ) : (
              'Mettre à jour le mot de passe'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Section Notifications
  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-green-600" />
          Préférences de notifications
        </h2>

        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications de l'application</h3>
            <div className="space-y-4">
              {[
                { key: 'newMessages', label: 'Nouveaux messages', icon: MessageSquare, desc: 'Être notifié des nouveaux messages privés' },
                { key: 'groupInvitations', label: 'Invitations de groupe', icon: Users, desc: 'Recevoir les invitations à rejoindre des groupes d\'étude' },
                { key: 'examReminders', label: 'Rappels d\'examens', icon: BookOpen, desc: 'Rappels automatiques avant vos examens' },
                { key: 'studySessions', label: 'Sessions d\'étude', icon: Settings, desc: 'Notifications sur les sessions d\'étude programmées' }
              ].map(({ key, label, icon: Icon, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{label}</p>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={notifications[key as keyof NotificationSettings] as boolean}
                    onChange={(checked) => handleNotificationChange(key as keyof NotificationSettings, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Canaux de notification</h3>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Notifications par email', icon: Mail, desc: 'Recevoir les notifications importantes par email' },
                { key: 'pushNotifications', label: 'Notifications push', icon: Smartphone, desc: 'Notifications sur votre appareil mobile' },
                { key: 'soundEnabled', label: 'Sons de notification', icon: Volume2, desc: 'Jouer un son lors des notifications' }
              ].map(({ key, label, icon: Icon, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{label}</p>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={notifications[key as keyof NotificationSettings] as boolean}
                    onChange={(checked) => handleNotificationChange(key as keyof NotificationSettings, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">Conseil</h4>
                <p className="text-sm text-blue-600">
                  Vous pouvez ajuster ces paramètres à tout moment selon vos préférences d'étude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Section Apparence
  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-600" />
          Personnalisation de l'interface
        </h2>

        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Thème d'affichage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                !appSettings.darkMode 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAppSettingChange('darkMode', false)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Mode clair</h4>
                    <p className="text-sm text-gray-600">Interface lumineuse et claire</p>
                  </div>
                  {!appSettings.darkMode && <Check className="w-5 h-5 text-blue-600 ml-auto" />}
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                appSettings.darkMode 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAppSettingChange('darkMode', true)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                    <Moon className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Mode sombre</h4>
                    <p className="text-sm text-gray-600">Interface sombre pour les yeux</p>
                  </div>
                  {appSettings.darkMode && <Check className="w-5 h-5 text-blue-600 ml-auto" />}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Langue de l'interface</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVAILABLE_LANGUAGES.map(language => (
                <div
                  key={language.code}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    appSettings.language === language.name 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleAppSettingChange('language', language.name)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{language.name}</h4>
                    </div>
                    {appSettings.language === language.name && (
                      <Check className="w-5 h-5 text-blue-600 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Préférences d'interaction</h3>
            <div className="space-y-4">
              {[
                { 
                  key: 'autoJoinGroups', 
                  label: 'Rejoindre automatiquement les groupes', 
                  desc: 'Rejoindre automatiquement les groupes d\'étude recommandés' 
                },
                { 
                  key: 'showOnlineStatus', 
                  label: 'Afficher mon statut en ligne', 
                  desc: 'Permettre aux autres de voir quand vous êtes connecté' 
                },
                { 
                  key: 'allowDirectMessages', 
                  label: 'Autoriser les messages privés', 
                  desc: 'Permettre à d\'autres utilisateurs de vous envoyer des messages privés' 
                }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{label}</p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                  <ToggleSwitch
                    checked={appSettings[key as keyof AppSettings] as boolean}
                    onChange={(checked) => handleAppSettingChange(key as keyof AppSettings, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Section Sécurité
  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-600" />
          Paramètres de sécurité
        </h2>

        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Authentification</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Authentification à deux facteurs</p>
                    <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire</p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={security.twoFactorAuth}
                  onChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Visibilité du profil</h3>
            <div className="space-y-3">
              {[
                { value: 'public', label: 'Public', desc: 'Visible par tous les utilisateurs', icon: Globe },
                { value: 'friends', label: 'Amis uniquement', desc: 'Visible seulement par vos amis', icon: Users },
                { value: 'private', label: 'Privé', desc: 'Visible seulement par vous', icon: Lock }
              ].map(({ value, label, desc, icon: Icon }) => (
                <div
                  key={value}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    security.profileVisibility === value 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSecurityChange('profileVisibility', value)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{label}</h4>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                    {security.profileVisibility === value && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confidentialité des données</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">Partage de données d'utilisation</p>
                  <p className="text-sm text-gray-600">Aider à améliorer l'application en partageant des données anonymes</p>
                </div>
                <ToggleSwitch
                  checked={security.dataSharing}
                  onChange={(checked) => handleSecurityChange('dataSharing', checked)}
                />
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Zone de danger
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-800">Supprimer le compte</p>
                  <p className="text-sm text-red-600">
                    Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isSaving
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Suppression...
                    </>
                  ) : (
                    'Supprimer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Rendu principal
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      appSettings.darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => window.history.back()}
              className="p-3 bg-white border border-blue-100 rounded-xl shadow-md hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${
                appSettings.darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Paramètres
              </h1>
              <p className={`${
                appSettings.darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Gérez vos préférences et paramètres de compte
              </p>
            </div>
          </div>

          {/* Message de statut */}
          {message && (
            <div className={`p-4 rounded-xl border ${
              message.includes('✅') 
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Navigation des sections */}
        {renderSectionNav()}

        {/* Contenu de la section active */}
        {currentSection === 'profile' && renderProfileSection()}
        {currentSection === 'notifications' && renderNotificationsSection()}
        {currentSection === 'appearance' && renderAppearanceSection()}
        {currentSection === 'security' && renderSecuritySection()}

        {/* Bouton de sauvegarde fixe */}
        {unsavedChanges && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 hover:scale-105 ${
                isSaving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Sauvegarder les modifications
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}