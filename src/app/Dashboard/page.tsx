'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, BookOpen, BarChart3, Settings as SettingsIcon, Shield, Mail, 
  FileText, Star, TrendingUp, AlertTriangle, Plus,
  Search, Filter, Download, Edit, Trash2, Eye,
  Calendar, Clock, DollarSign, Activity, Bell,
  ChevronDown, ChevronRight, RefreshCw, Save,
  UserPlus, MessageSquare, PieChart, LineChart, LogOut,
  User, Lock, Key, Database, Server, Wifi, WifiOff,
  CheckCircle, XCircle, AlertCircle, Info, Send,
  Archive, Flag, Reply, Forward, MoreVertical,
  Globe, Smartphone, Monitor, Tablet, Chrome,
  Cpu, HardDrive, MemoryStick,
  Zap, ShieldCheck, ShieldAlert, ShieldOff, Menu, X
} from 'lucide-react';
import "@/app/page"

// Types
interface User {
  id: number;
  name?: string;
  nom?: string;
  prenom?: string;
  email: string;
  password?: string;
  role: string;
  niveau?: string;
  domaine?: string;
  lastActive: string;
  status: string;
  isAuthenticated?: boolean;
  loginTime?: string;
}

interface Message {
  id: number;
  from: string;
  email: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  type: 'support' | 'feedback' | 'bug' | 'feature';
}

interface SecurityEvent {
  id: number;
  type: 'login' | 'failed_login' | 'suspicious' | 'admin_action' | 'data_access';
  user: string;
  description: string;
  timestamp: string;
  ip: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Admin credentials
const ADMIN_CREDENTIALS = [
  { email: 'kana@revise-ia.com', password: 'kana2025', name: 'Administrateur Principal' },
  { email: 'admin@revise-ia.com', password: 'admin123', name: 'Kana Administrateur' }
];

// Mock Data
const initialUsers: User[] = [
  { 
    id: 1, 
    nom: 'Dupont', 
    prenom: 'Marie', 
    email: 'marie.dupont@email.com', 
    role: 'student', 
    niveau: 'Terminale', 
    domaine: 'Scientifique', 
    lastActive: '2025-01-15', 
    status: 'active' 
  },
  { 
    id: 2, 
    nom: 'Martin', 
    prenom: 'Jean', 
    email: 'jean.martin@email.com', 
    role: 'premium', 
    niveau: 'Première', 
    domaine: 'Littéraire', 
    lastActive: '2025-01-14', 
    status: 'active' 
  },
  { 
    id: 3, 
    nom: 'Dubois', 
    prenom: 'Sophie', 
    email: 'sophie.dubois@email.com', 
    role: 'student', 
    niveau: 'Seconde', 
    domaine: 'Général', 
    lastActive: '2025-01-13', 
    status: 'inactive' 
  },
  { 
    id: 4, 
    nom: 'Kouam', 
    prenom: 'Pierre', 
    email: 'pierre.kouam@email.com', 
    role: 'premium', 
    niveau: 'Terminale', 
    domaine: 'Technique', 
    lastActive: '2025-01-15', 
    status: 'active' 
  }
];

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'Marie Dupont',
    email: 'marie@email.com',
    subject: 'Problème avec les exercices de mathématiques',
    content: 'Bonjour, je rencontre des difficultés pour accéder aux exercices de niveau Terminale en mathématiques. Pourriez-vous m\'aider ? Les pages se chargent très lentement et parfois ne s\'affichent pas du tout.',
    timestamp: '2025-01-15T14:30:00',
    status: 'new',
    priority: 'high',
    type: 'support'
  },
  {
    id: 2,
    from: 'Jean Martin',
    email: 'kanavaroulrich@gmail.com',
    subject: 'Suggestion d\'amélioration interface',
    content: 'Il serait génial d\'avoir des vidéos explicatives pour les concepts de physique. Cela aiderait beaucoup les étudiants à mieux comprendre. Aussi, peut-être ajouter des quiz interactifs ?',
    timestamp: '2025-01-15T12:15:00',
    status: 'read',
    priority: 'normal',
    type: 'feature'
  },
  {
    id: 3,
    from: 'Sophie Dubois',
    email: 'sophie.dubois@email.com',
    subject: 'Bug critique dans l\'application',
    content: 'L\'application se ferme automatiquement quand j\'essaie de sauvegarder mes notes. C\'est très frustrant car je perds tout mon travail. Cela arrive surtout sur mobile.',
    timestamp: '2025-01-15T10:45:00',
    status: 'replied',
    priority: 'urgent',
    type: 'bug'
  }
];

const initialSecurityEvents: SecurityEvent[] = [
  {
    id: 1,
    type: 'failed_login',
    user: 'marie@email.com',
    description: '5 tentatives de connexion échouées consécutives',
    timestamp: '2025-01-15T15:30:00',
    ip: '192.168.1.100',
    location: 'Yaoundé, CM',
    severity: 'medium'
  },
  {
    id: 2,
    type: 'suspicious',
    user: 'unknown',
    description: 'Tentative d\'accès non autorisé à l\'API admin',
    timestamp: '2025-01-15T14:45:00',
    ip: '203.45.67.89',
    location: 'Lagos, NG',
    severity: 'high'
  },
  {
    id: 3,
    type: 'admin_action',
    user: 'kana@revise-ia.com',
    description: 'Modification des paramètres de sécurité système',
    timestamp: '2025-01-15T13:20:00',
    ip: '192.168.1.50',
    location: 'Bamenda, CM',
    severity: 'low'
  }
];

// Authentication Hook
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(null);
      setShowLogin(true);
      setIsLoading(false);
    };

    setTimeout(checkAuth, 1000);
  }, []);

  const isValidAdmin = (user: any) => {
    return user && 
           user.isAuthenticated === true && 
           user.role === 'admin' &&
           ADMIN_CREDENTIALS.some(cred => cred.email === user.email);
  };

  const login = () => {
    setLoginError('');
    const adminCred = ADMIN_CREDENTIALS.find(
      cred => cred.email === loginForm.email && cred.password === loginForm.password
    );

    if (adminCred) {
      const adminUser = {
        id: 1,
        name: adminCred.name,
        email: adminCred.email,
        role: 'admin',
        lastActive: new Date().toISOString().split('T')[0],
        status: 'active',
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      };

      setCurrentUser(adminUser);
      setShowLogin(false);
      setLoginForm({ email: '', password: '' });
    } else {
      setLoginError('Email ou mot de passe incorrect');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setLoginForm({ email: '', password: '' });
  };

  return {
    currentUser,
    isLoading,
    showLogin,
    loginForm,
    setLoginForm,
    loginError,
    login,
    logout,
    isAdmin: currentUser !== null && isValidAdmin(currentUser)
  };
};

// Login Component
const LoginForm: React.FC<{
  loginForm: any;
  setLoginForm: any;
  loginError: string;
  onLogin: () => void;
}> = ({ loginForm, setLoginForm, loginError, onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-600 mt-2">Accès réservé aux administrateurs</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email administrateur
            </label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="kana@revise-ia.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              onKeyPress={(e) => e.key === 'Enter' && onLogin()}
            />
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Se connecter
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Démo:</strong> admin@revise-ia.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header: React.FC<{ onMenuToggle: () => void; currentUser: User | null; logout: () => void }> = ({ 
  onMenuToggle, currentUser, logout 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const notifications = [
    { id: 1, text: '3 nouveaux messages support', time: '5 min', type: 'info', unread: true },
    { id: 2, text: 'Tentative de connexion suspecte détectée', time: '15 min', type: 'warning', unread: true },
    { id: 3, text: 'Sauvegardes automatiques réussies', time: '1h', type: 'success', unread: false }
  ];

  const exportData = () => {
    const data = {
      users: initialUsers,
      messages: initialMessages,
      securityEvents: initialSecurityEvents,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_data_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Administration Revise-IA</h1>
            <p className="text-sm text-gray-600 hidden sm:block">
              Connecté: {currentUser?.name || currentUser?.email} • {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Admin Authentifié
          </div>

          <button
            onClick={exportData}
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Exporter
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                        notif.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'warning' ? 'bg-orange-500' :
                          notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {(currentUser?.name || currentUser?.email || 'A')[0].toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <div className="font-semibold text-gray-800">
                    {currentUser?.name || 'Administrateur'}
                  </div>
                  <div className="text-sm text-gray-500">{currentUser?.email}</div>
                  <div className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Administrateur • Session active
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <User className="w-4 h-4" />
                    Profil Admin
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <SettingsIcon className="w-4 h-4" />
                    Paramètres
                  </button>
                  <div className="border-t my-1"></div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar: React.FC<{ 
  activeTab: string; 
  onTabChange: (tab: string) => void; 
  isOpen: boolean; 
  onClose: () => void 
}> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3, badge: null },
    { id: 'users', label: 'Utilisateurs', icon: Users, badge: '4' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
    { id: 'analytics', label: 'Analytiques', icon: TrendingUp, badge: null },
    { id: 'security', label: 'Sécurité', icon: Shield, badge: '!' },
    { id: 'settings', label: 'Paramètres', icon: SettingsIcon, badge: null }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Revise-IA</h2>
              <p className="text-xs text-gray-500">Admin kana</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.badge === '!' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Système</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Version: 2.1.0</div>
              <div>Uptime: 99.9%</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Opérationnel
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

// Dashboard Component
const Dashboard: React.FC<{ currentUser: User | null }> = ({ currentUser }) => {
  const [users] = useState(initialUsers);
  const [messages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    newMessages: messages.filter(m => m.status === 'new').length,
    premiumUsers: users.filter(u => u.role === 'premium').length
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const statsData = [
    { 
      label: 'Total Utilisateurs', 
      value: stats.totalUsers, 
      sublabel: '+2 cette semaine', 
      icon: Users, 
      color: 'blue'
    },
    { 
      label: 'Utilisateurs Actifs', 
      value: stats.activeUsers, 
      sublabel: 'En ligne maintenant', 
      icon: Activity, 
      color: 'green'
    },
    { 
      label: 'Messages Support', 
      value: stats.newMessages, 
      sublabel: 'Nouveaux à traiter', 
      icon: MessageSquare, 
      color: 'purple'
    },
    { 
      label: 'Abonnés Premium', 
      value: stats.premiumUsers, 
      sublabel: `${((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1)}% du total`, 
      icon: Star, 
      color: 'yellow'
    }
  ];

  const recentActivity = [
    { type: 'user', message: 'Nouvel utilisateur inscrit', time: '2 min', user: 'Pierre Kouam' },
    { type: 'message', message: 'Nouveau message support', time: '5 min', user: 'Marie Dupont' },
    { type: 'security', message: 'Connexion admin', time: '1h', user: currentUser?.name },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenue, {currentUser?.name?.split(' ')[0] || 'Admin'} 👋
          </h2>
          <p className="text-gray-600">
            Voici un aperçu de votre plateforme Revise-IA
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefreshData}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.sublabel}
                </p>
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activité Récente
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'message' ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'message' && <MessageSquare className="w-5 h-5 text-purple-600" />}
                  {activity.type === 'security' && <Shield className="w-5 h-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            État du Système
          </h3>
          <div className="space-y-4">
            {[
              { name: 'CPU', value: 45, color: 'blue', status: 'Normal' },
              { name: 'RAM', value: 68, color: 'green', status: 'Bon' },
              { name: 'Stockage', value: 23, color: 'purple', status: 'Optimal' },
              { name: 'Réseau', value: 92, color: 'orange', status: 'Excellent' }
            ].map((metric) => (
              <div key={metric.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${metric.color}-500`}></div>
                  <span className="text-gray-700 font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-500`} 
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-16">{metric.value}%</span>
                  <span className="text-xs text-gray-500">{metric.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Événements de Sécurité Récents
          </h3>
        </div>
        
        <div className="space-y-4">
          {initialSecurityEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                {event.type === 'failed_login' && <XCircle className="w-5 h-5 text-red-600" />}
                {event.type === 'suspicious' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                {event.type === 'admin_action' && <SettingsIcon className="w-5 h-5 text-blue-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-gray-800">{event.description}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.severity}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {event.user} • {event.ip} • {event.location}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Users Management Component
const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    nom: '', prenom: '', email: '', role: 'student', niveau: '', domaine: ''
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.nom + ' ' + user.prenom + ' ' + user.email)
      .toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (newUser.nom && newUser.prenom && newUser.email) {
      const user: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role,
        niveau: newUser.niveau,
        domaine: newUser.domaine,
        lastActive: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setUsers(prev => [...prev, user]);
      setNewUser({ nom: '', prenom: '', email: '', role: 'student', niveau: '', domaine: '' });
      setShowAddUser(false);
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      nom: user.nom || '',
      prenom: user.prenom || '',
      email: user.email,
      role: user.role,
      niveau: user.niveau || '',
      domaine: user.domaine || ''
    });
  };

  const handleUpdateUser = () => {
    if (editingUser && newUser.nom && newUser.prenom && newUser.email) {
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id 
          ? { ...u, nom: newUser.nom, prenom: newUser.prenom, email: newUser.email, 
              role: newUser.role, niveau: newUser.niveau, domaine: newUser.domaine }
          : u
      ));
      setEditingUser(null);
      setNewUser({ nom: '', prenom: '', email: '', role: 'student', niveau: '', domaine: '' });
    }
  };

  const exportUsers = () => {
    const csv = [
      ['Nom', 'Prénom', 'Email', 'Rôle', 'Niveau', 'Domaine', 'Statut', 'Dernière Activité'],
      ...users.map(u => [u.nom, u.prenom, u.email, u.role, u.niveau, u.domaine, u.status, u.lastActive])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">{users.length} utilisateurs • {users.filter(u => u.status === 'active').length} actifs</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportUsers}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter
          </button>
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Nouvel utilisateur
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les rôles</option>
            <option value="student">Étudiants</option>
            <option value="premium">Premium</option>
            <option value="admin">Administrateurs</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Formation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dernière activité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {(user.nom || user.name || user.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {user.nom && user.prenom ? `${user.nom} ${user.prenom}` : user.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">{user.niveau || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{user.domaine || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddUser || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom"
                  value={newUser.nom}
                  onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={newUser.prenom}
                  onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Étudiant</option>
                  <option value="premium">Premium</option>
                  <option value="admin">Administrateur</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Niveau"
                  value={newUser.niveau}
                  onChange={(e) => setNewUser({...newUser, niveau: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <input
                type="text"
                placeholder="Domaine"
                value={newUser.domaine}
                onChange={(e) => setNewUser({...newUser, domaine: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddUser(false);
                  setEditingUser(null);
                  setNewUser({ nom: '', prenom: '', email: '', role: 'student', niveau: '', domaine: '' });
                }}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={editingUser ? handleUpdateUser : handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingUser ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Messages Management Component
const MessagesManagement: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || message.status === filter || message.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-purple-100 text-purple-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const updateMessageStatus = (messageId: number, newStatus: Message['status']) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    ));
  };

  const handleReply = () => {
    if (selectedMessage && replyText.trim()) {
      updateMessageStatus(selectedMessage.id, 'replied');
      setReplyText('');
      setShowReplyModal(false);
      alert(`Réponse envoyée à ${selectedMessage.from}`);
    }
  };

  const markAsRead = (messageId: number) => {
    updateMessageStatus(messageId, 'read');
  };

  const exportMessages = () => {
    const csv = [
      ['De', 'Email', 'Sujet', 'Statut', 'Priorité', 'Type', 'Date'],
      ...messages.map(m => [
        m.from, m.email, m.subject, m.status, m.priority, m.type, 
        new Date(m.timestamp).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messages_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Messages & Support</h2>
          <p className="text-gray-600">
            {messages.length} messages • {messages.filter(m => m.status === 'new').length} nouveaux
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportMessages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher dans les messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'Tous' },
              { key: 'new', label: 'Nouveaux' },
              { key: 'read', label: 'Lus' },
              { key: 'replied', label: 'Répondus' },
              { key: 'support', label: 'Support' },
              { key: 'bug', label: 'Bugs' },
              { key: 'feature', label: 'Fonctionnalités' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => {
                setSelectedMessage(message);
                if (message.status === 'new') markAsRead(message.id);
              }}
              className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''
              } ${message.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {message.from[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{message.from}</div>
                      <div className="text-sm text-gray-500">{message.email}</div>
                    </div>
                    {message.status === 'new' && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{message.subject}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{message.content}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      message.type === 'support' ? 'bg-blue-100 text-blue-800' :
                      message.type === 'bug' ? 'bg-red-100 text-red-800' :
                      message.type === 'feature' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {message.type}
                    </span>
                    <Flag className={`w-4 h-4 ${getPriorityColor(message.priority)}`} />
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          
          {filteredMessages.length === 0 && (
            <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun message trouvé</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          {selectedMessage ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{selectedMessage.subject}</h3>
                <p className="text-gray-600">De: {selectedMessage.from}</p>
                <p className="text-sm text-gray-500">{new Date(selectedMessage.timestamp).toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedMessage.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    selectedMessage.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    selectedMessage.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    Priorité: {selectedMessage.priority}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Message:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowReplyModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  Répondre
                </button>
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                  className="flex items-center gap-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  Archiver
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>Sélectionnez un message pour le voir en détail</p>
            </div>
          )}
        </div>
      </div>

      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Répondre à {selectedMessage.from}
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Sujet: {selectedMessage.subject}</p>
                <p className="text-xs text-gray-500 mt-1">Message original: {selectedMessage.content.substring(0, 100)}...</p>
              </div>
              
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Votre réponse..."
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyText('');
                }}
                className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleReply}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Analytics Component
const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  const analyticsData = {
    users: {
      total: 1245,
      growth: 12.5,
      newThisWeek: 89,
      activeToday: 324
    },
    engagement: {
      sessionsPerUser: 4.2,
      avgSessionTime: '18m 34s',
      bounceRate: 23.8,
      returnRate: 67.3
    },
    content: {
      mostPopular: [
        { subject: 'Mathématiques - Terminale', views: 2341, engagement: 89 },
        { subject: 'Physique - Première', views: 1876, engagement: 82 },
        { subject: 'Français - Seconde', views: 1543, engagement: 76 }
      ],
      completion: 78.5
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytiques</h2>
          <p className="text-gray-600">Analyse des performances et de l'engagement</p>
        </div>
        <div className="flex gap-3">
          {[
            { key: '7d', label: '7 jours' },
            { key: '30d', label: '30 jours' },
            { key: '90d', label: '3 mois' }
          ].map((range) => (
            <button
              key={range.key}
              onClick={() => setTimeRange(range.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Utilisateurs totaux', 
            value: analyticsData.users.total.toLocaleString(), 
            change: `+${analyticsData.users.growth}%`,
            icon: Users,
            color: 'blue'
          },
          { 
            label: 'Nouveaux utilisateurs', 
            value: analyticsData.users.newThisWeek, 
            change: 'Cette semaine',
            icon: UserPlus,
            color: 'green'
          },
          { 
            label: 'Utilisateurs actifs', 
            value: analyticsData.users.activeToday, 
            change: 'Aujourd\'hui',
            icon: Activity,
            color: 'purple'
          },
          { 
            label: 'Taux de complétion', 
            value: `${analyticsData.content.completion}%`, 
            change: '+3.2%',
            icon: CheckCircle,
            color: 'yellow'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Engagement utilisateurs</h3>
          <div className="space-y-4">
            {[
              { label: 'Sessions par utilisateur', value: analyticsData.engagement.sessionsPerUser },
              { label: 'Temps de session moyen', value: analyticsData.engagement.avgSessionTime },
              { label: 'Taux de rebond', value: `${analyticsData.engagement.bounceRate}%` },
              { label: 'Taux de retour', value: `${analyticsData.engagement.returnRate}%` }
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{metric.label}</span>
                <span className="font-semibold text-gray-800">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contenu populaire</h3>
          <div className="space-y-4">
            {analyticsData.content.mostPopular.map((content, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{content.subject}</span>
                  <span className="text-sm text-gray-600">{content.views} vues</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${content.engagement}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{content.engagement}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Component
const Security: React.FC = () => {
  const [securityEvents, setSecurityEvents] = useState(initialSecurityEvents);
  const [filter, setFilter] = useState('all');

  const filteredEvents = securityEvents.filter(event => 
    filter === 'all' || event.severity === filter || event.type === filter
  );

  const securityStats = {
    totalEvents: securityEvents.length,
    criticalEvents: securityEvents.filter(e => e.severity === 'critical').length,
    failedLogins: securityEvents.filter(e => e.type === 'failed_login').length,
    suspiciousActivity: securityEvents.filter(e => e.type === 'suspicious').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sécurité & Surveillance</h2>
          <p className="text-gray-600">Monitoring des activités et événements de sécurité</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Événements totaux', 
            value: securityStats.totalEvents,
            icon: Shield,
            color: 'blue'
          },
          { 
            label: 'Événements critiques', 
            value: securityStats.criticalEvents,
            icon: ShieldAlert,
            color: 'red'
          },
          { 
            label: 'Échecs de connexion', 
            value: securityStats.failedLogins,
            icon: XCircle,
            color: 'orange'
          },
          { 
            label: 'Activité suspecte', 
            value: securityStats.suspiciousActivity,
            icon: AlertTriangle,
            color: 'yellow'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Événements de sécurité</h3>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Tous' },
              { key: 'critical', label: 'Critiques' },
              { key: 'high', label: 'Élevés' },
              { key: 'failed_login', label: 'Échecs connexion' },
              { key: 'suspicious', label: 'Suspects' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                {event.type === 'failed_login' && <XCircle className="w-5 h-5 text-red-600" />}
                {event.type === 'suspicious' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                {event.type === 'admin_action' && <SettingsIcon className="w-5 h-5 text-blue-600" />}
                {event.type === 'login' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {event.type === 'data_access' && <Database className="w-5 h-5 text-purple-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-gray-800">{event.description}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    event.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.severity}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {event.user} • {event.ip} • {event.location}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Settings Component
const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Revise-IA',
    maintenance: false,
    registrations: true,
    notifications: true,
    backupFrequency: 'daily',
    sessionTimeout: 30,
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png']
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    { id: 'general', label: 'Général', icon: SettingsIcon },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'storage', label: 'Stockage', icon: Database },
    { id: 'system', label: 'Système', icon: Server }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Paramètres système</h2>
        <p className="text-gray-600">Configuration de la plateforme Revise-IA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <section.icon className="w-5 h-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Paramètres généraux</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du site
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => updateSetting('siteName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Mode maintenance</h4>
                    <p className="text-sm text-gray-600">Désactiver temporairement le site</p>
                  </div>
                  <button
                    onClick={() => updateSetting('maintenance', !settings.maintenance)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.maintenance ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.maintenance ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Inscriptions ouvertes</h4>
                    <p className="text-sm text-gray-600">Permettre les nouvelles inscriptions</p>
                  </div>
                  <button
                    onClick={() => updateSetting('registrations', !settings.registrations)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.registrations ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.registrations ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Paramètres de sécurité</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeout de session (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800">Sécurité avancée</h4>
                  </div>
                  <p className="text-sm text-yellow-700">
                    L'authentification à deux facteurs sera bientôt disponible.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Paramètres de notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Notifications par email</h4>
                    <p className="text-sm text-gray-600">Recevoir les alertes importantes</p>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications', !settings.notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'storage' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Paramètres de stockage</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille maximale des fichiers (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => updateSetting('maxFileSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fréquence des sauvegardes
                  </label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => updateSetting('backupFrequency', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Informations système</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Version', value: '2.1.0' },
                  { label: 'Uptime', value: '15j 4h 23m' },
                  { label: 'Dernière sauvegarde', value: 'Il y a 2h' },
                  { label: 'Espace libre', value: '234 GB' }
                ].map((info, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">{info.label}</div>
                    <div className="font-semibold text-gray-800">{info.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Redémarrer le système
                </button>
              </div>
            </div>
          )}

          <div className="pt-6 border-t">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4" />
              Sauvegarder les paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AdminPanel: React.FC = () => {
  const { currentUser, isLoading, showLogin, loginForm, setLoginForm, loginError, login, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Chargement de l'administration...</p>
        </div>
      </div>
    );
  }

  if (showLogin || !isAdmin) {
    return (
      <LoginForm
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        loginError={loginError}
        onLogin={login}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'users':
        return <UsersManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'analytics':
        return <Analytics />;
      case 'security':
        return <Security />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuToggle={() => setSidebarOpen(true)} 
          currentUser={currentUser}
          logout={logout}
        />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
export default AdminPanel;