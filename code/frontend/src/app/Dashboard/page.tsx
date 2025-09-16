"use client"

import React, { useState, useEffect } from 'react';
import {
  Users, BookOpen, BarChart3, Settings, Shield, Mail, 
  FileText, Star, TrendingUp, AlertTriangle, Plus,
  Search, Filter, Download, Edit, Trash2, Eye,
  Calendar, Clock, DollarSign, Activity, Bell,
  ChevronDown, ChevronRight, RefreshCw, Save,
  UserPlus, MessageSquare, PieChart, LineChart
} from 'lucide-react';
import "@/app/page";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: string;
}

interface Course {
  id: number;
  title: string;
  students: number;
  rating: number;
  created: string;
  status: string;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalRevenue: number;
  growthRate: number;
}

interface AnalyticsData {
  month: string;
  users?: number;
  amount?: number;
}

interface Message {
  id: number;
  from: string;
  subject: string;
  status: string;
  priority: string;
  date: string;
}

interface Settings {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  emailNotifications: boolean;
  maintenanceMode: boolean;
  maxFileSize: string;
  sessionTimeout: string;
}

interface Log {
  id: number;
  action: string;
  user: string;
  ip: string;
  date: string;
  status: string;
}

interface Notification {
  id: number;
  text: string;
  time: string;
  type: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface HeaderProps {
  user?: any;
}

// Données simulées
const mockData = {
  stats: {
    totalUsers: 12547,
    activeUsers: 8932,
    totalCourses: 342,
    totalRevenue: 125840,
    growthRate: 23.5
  } as Stats,
  users: [
    { id: 1, name: 'Marie Dubois', email: 'marie@example.com', role: 'student', lastActive: '2025-01-15', status: 'active' },
    { id: 2, name: 'Jean Vaillant', email: 'jean@example.com', role: 'premium', lastActive: '2025-01-14', status: 'active' },
    { id: 3, name: 'Sophie Martin', email: 'sophie@example.com', role: 'student', lastActive: '2025-01-10', status: 'inactive' }
  ] as User[],
  courses: [
    { id: 1, title: 'Mathématiques Avancées', students: 1204, rating: 4.8, created: '2024-12-01', status: 'published' },
    { id: 2, title: 'Physique Quantique', students: 856, rating: 4.9, created: '2024-11-15', status: 'published' },
    { id: 3, title: 'Chimie Organique', students: 623, rating: 4.7, created: '2024-10-20', status: 'draft' }
  ] as Course[],
  analytics: {
    userGrowth: [
      { month: 'Jan', users: 8400 },
      { month: 'Fév', users: 9200 },
      { month: 'Mar', users: 10100 },
      { month: 'Avr', users: 11200 },
      { month: 'Mai', users: 12547 }
    ] as AnalyticsData[],
    revenue: [
      { month: 'Jan', amount: 45000 },
      { month: 'Fév', amount: 52000 },
      { month: 'Mar', amount: 61000 },
      { month: 'Avr', amount: 78000 },
      { month: 'Mai', amount: 89000 }
    ] as AnalyticsData[]
  }
};

// Composant Analytiques
const AnalyticsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['users', 'revenue', 'engagement']);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytiques Avancées</h2>
          <p className="text-gray-600">Analyse détaillée des performances de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
            <option value="1y">1 année</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Métriques en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Taux de conversion</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">12.5%</div>
          <div className="text-sm text-green-600">+2.3% vs mois dernier</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Temps de session moyen</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">24min</div>
          <div className="text-sm text-blue-600">+5min vs mois dernier</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Taux de rétention</h3>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">87%</div>
          <div className="text-sm text-purple-600">+1.2% vs mois dernier</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Score NPS</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">67</div>
          <div className="text-sm text-yellow-600">+8 points vs mois dernier</div>
        </div>
      </div>

      {/* Graphiques détaillés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Acquisition utilisateurs</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Recherche organique</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Réseaux sociaux</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">30%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Email marketing</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Parrainage</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-4 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Utilisation par fonctionnalité</h3>
          <div className="space-y-4">
            {[
              { name: 'Génération de fiches', usage: 92, color: 'bg-blue-500' },
              { name: 'Quiz interactifs', usage: 78, color: 'bg-green-500' },
              { name: 'Suivi progression', usage: 65, color: 'bg-purple-500' },
              { name: 'Mode collaboratif', usage: 43, color: 'bg-yellow-500' },
              { name: 'Synthèse vocale', usage: 28, color: 'bg-red-500' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{feature.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 ${feature.color} rounded-full transition-all duration-500`}
                      style={{ width: `${feature.usage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-10">{feature.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Messages & Support
const MessagesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tickets');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'marie@example.com', subject: 'Problème de connexion', status: 'open', priority: 'high', date: '2025-01-15' },
    { id: 2, from: 'jean@example.com', subject: 'Question sur les tarifs', status: 'pending', priority: 'medium', date: '2025-01-14' },
    { id: 3, from: 'sophie@example.com', subject: 'Suggestion d\'amélioration', status: 'closed', priority: 'low', date: '2025-01-13' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Messages & Support</h2>
          <p className="text-gray-600">Gérez les demandes de support et communications</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Nouveau message
        </button>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'tickets', label: 'Tickets Support', count: 12 },
            { id: 'messages', label: 'Messages', count: 5 },
            { id: 'feedback', label: 'Feedback', count: 8 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Liste des tickets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Rechercher dans les tickets..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Tous les statuts</option>
              <option>Ouvert</option>
              <option>En attente</option>
              <option>Fermé</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-800">{message.subject}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.priority === 'high' ? 'bg-red-100 text-red-800' :
                      message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.priority === 'high' ? 'Haute' : message.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'open' ? 'bg-green-100 text-green-800' :
                      message.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.status === 'open' ? 'Ouvert' : message.status === 'pending' ? 'En attente' : 'Fermé'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{message.from}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant Paramètres
const SettingsSection: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Revise-IA',
    siteDescription: 'Plateforme d\'apprentissage intelligente',
    allowRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
    maxFileSize: '10',
    sessionTimeout: '30'
  });

  const handleSettingChange = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Paramètres Système</h2>
        <p className="text-gray-600">Configuration générale de la plateforme</p>
      </div>

      {/* Paramètres généraux */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Paramètres Généraux</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Nom du site</div>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Description</div>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Inscription ouverte</h4>
                <p className="text-sm text-gray-600">Permettre aux nouveaux utilisateurs de s'inscrire</p>
              </div>
              <button
                onClick={() => handleSettingChange('allowRegistration', !settings.allowRegistration)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowRegistration ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Notifications email</h4>
                <p className="text-sm text-gray-600">Envoyer des notifications par email</p>
              </div>
              <button
                onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h4 className="font-medium text-red-800">Mode maintenance</h4>
                <p className="text-sm text-red-600">Activer le mode maintenance (site inaccessible)</p>
              </div>
              <button
                onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Sécurité
const SecuritySection: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, action: 'Connexion admin', user: 'admin@revise-ia.com', ip: '192.168.1.100', date: '2025-01-15 14:30', status: 'success' },
    { id: 2, action: 'Modification utilisateur', user: 'admin@revise-ia.com', ip: '192.168.1.100', date: '2025-01-15 14:25', status: 'success' },
    { id: 3, action: 'Tentative connexion échouée', user: 'unknown@domain.com', ip: '45.123.45.67', date: '2025-01-15 13:45', status: 'failed' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Sécurité & Audit</h2>
        <p className="text-gray-600">Surveillance et logs de sécurité</p>
      </div>

      {/* Alertes de sécurité */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Tentatives de connexion</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">23</div>
          <div className="text-sm text-yellow-600">Dernières 24h</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Sessions actives</h3>
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">1,247</div>
          <div className="text-sm text-green-600">En ce moment</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">IPs bloquées</h3>
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">5</div>
          <div className="text-sm text-red-600">Cette semaine</div>
        </div>
      </div>

      {/* Logs d'audit */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Logs d'audit</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse IP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'success' ? 'Succès' : 'Échec'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant de navigation latérale
const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isCollapsed, setIsCollapsed }) => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'courses', label: 'Cours & Contenu', icon: BookOpen },
    { id: 'analytics', label: 'Analytiques', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen relative`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          {!isCollapsed && <span className="font-bold text-xl">Admin</span>}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors ${
              activeSection === item.id ? 'bg-slate-800 border-r-2 border-blue-500' : ''
            }`}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-slate-700 hover:bg-slate-600 rounded-full p-1.5 transition-colors"
      >
        <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>
    </div>
  );
};

// Composant de header avec notifications
const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  
  const notifications: Notification[] = [
    { id: 1, text: 'Nouveau utilisateur inscrit', time: '5 min', type: 'info' },
    { id: 2, text: 'Problème technique signalé', time: '15 min', type: 'warning' },
    { id: 3, text: 'Revenus mensuels atteints', time: '1h', type: 'success' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Administration Revise-IA</h1>
          <p className="text-gray-600">Gérez votre plateforme d'apprentissage</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'info' ? 'bg-blue-500' :
                          notif.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
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
          
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <div className="font-medium text-gray-800">Admin User</div>
              <div className="text-gray-500">Administrateur</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Composant tableau de bord
const Dashboard: React.FC = () => {
  const { stats } = mockData;
  
  return (
    <div className="space-y-6">
      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilisateurs Total</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">+12% ce mois</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
              <p className="text-3xl font-bold text-gray-800">{stats.activeUsers.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">+8% ce mois</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cours Créés</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalCourses}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">+15% ce mois</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenus</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalRevenue.toLocaleString()}€</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">+{stats.growthRate}% ce mois</span>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Croissance des utilisateurs</h3>
          <div className="h-64 flex items-end gap-4">
            {mockData.analytics.userGrowth.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${((data.users || 0) / 15000) * 100}%` }}
                />
                <div className="mt-2 text-sm text-gray-600">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Évolution des revenus</h3>
          <div className="h-64 flex items-end gap-4">
            {mockData.analytics.revenue.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t-lg transition-all duration-300 hover:bg-green-600"
                  style={{ height: `${((data.amount || 0) / 100000) * 100}%` }}
                />
                <div className="mt-2 text-sm text-gray-600">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-800">Ajouter un utilisateur</span>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800">Créer un cours</span>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-800">Exporter les données</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant gestion des utilisateurs
const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockData.users);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête et actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">Gérez les comptes et permissions utilisateurs</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            Nouvel utilisateur
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Tous les rôles</option>
            <option>Étudiants</option>
            <option>Premium</option>
            <option>Administrateurs</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>Actifs</option>
            <option>Inactifs</option>
            <option>Suspendus</option>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={`https://images.unsplash.com/photo-${user.id === 1 ? '1494790108755-2616b612b786' : user.id === 2 ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?w=40&h=40&fit=crop&crop=face&auto=format`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">3</span> sur <span className="font-medium">12547</span> résultats
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Précédent</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal
const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersManagement />;
      case 'courses':
        return (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800">Gestion des Cours</h3>
            <p className="text-gray-600">Module en développement...</p>
          </div>
        );
      case 'analytics':
        return <AnalyticsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'settings':
        return <SettingsSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return (
          <div className="text-center py-20">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800">Section en développement</h3>
            <p className="text-gray-600">Cette fonctionnalité sera bientôt disponible.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;