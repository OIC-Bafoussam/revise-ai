import React from 'react';
import {
  BookOpen,
  HelpCircle,
  BarChart3,
  Bell,
  Rocket,
  Joystick,
  Mic,
  WifiOff,
  Users
} from 'lucide-react';
import "@/app/page"

// Définit le type pour les propriétés du composant Card
interface CardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  avatar: string;
}

// Composant pour une carte de fonctionnalité
const Card: React.FC<CardProps> = ({ title, description, icon: Icon, avatar }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer">
    {/* Avatar ajouté */}
    <div className="mb-4">
      <img 
        src={avatar} 
        alt={`Avatar ${title}`}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
      />
    </div>
    
    {/* Icône avec un fond dégradé */}
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 text-white">
      <Icon size={32} />
    </div>
    
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Composant de la section Services
const Services: React.FC = () => (
  <section id="services" className="py-20 bg-gray-50 text-center font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
        Fonctionnalités principales
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
        Découvrez comment notre coach IA vous aide à réviser de manière efficace et personnalisée.
      </p>
      
      {/* Grille responsive pour les cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          title="Génération de fiches"
          description="Créez des résumés clairs et concis à partir de n'importe quel document."
          icon={BookOpen}
          avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Quiz intelligent"
          description="Passez des quiz dynamiques et adaptés à votre progression."
          icon={HelpCircle}
          avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Suivi de progression"
          description="Visualisez votre évolution avec des statistiques détaillées."
          icon={BarChart3}
          avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Rappels d'étude"
          description="Recevez des rappels pour ne plus jamais manquer une session de révision."
          icon={Bell}
          avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Tutorat IA"
          description="Obtenez une aide instantanée pour vos devoirs et vos questions."
          icon={Rocket}
          avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Apprentissage gamifié"
          description="Rendez l'étude amusante avec des jeux éducatifs et interactifs."
          icon={Joystick}
          avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Synthèse vocale"
          description="Écoutez vos fiches de révision en mode audio."
          icon={Mic}
          avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Mode hors ligne"
          description="Accédez à vos fiches et quiz même sans connexion internet."
          icon={WifiOff}
          avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
        <Card
          title="Collaboration"
          description="Partagez et révisez avec vos amis en temps réel."
          icon={Users}
          avatar="https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
        />
      </div>
    </div>
  </section>
);

export default Services;