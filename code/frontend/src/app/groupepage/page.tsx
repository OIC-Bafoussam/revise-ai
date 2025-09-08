'use client';
import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  PlusCircle, 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MoreVertical,
  Users,
  Bell,
  BellOff,
  Info,
  Image,
  Search,
  LogOut,
  X,
  Check,
  BookOpen,
  Clock,
  Star
} from "lucide-react";
import "@/app/page"

// Types
interface RevisionGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
  color: string;
  subject: string;
  examDate?: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
}

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isFromUser: boolean;
  messageType: string;
}

interface SubjectAvatar {
  emoji: string;
  color: string;
  subject: string;
}

interface CreateGroupData {
  name: string;
  description: string;
  avatar: string;
  color: string;
  subject: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  examDate?: string;
}

interface CreateRevisionGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: CreateGroupData) => void;
}

interface GroupOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: RevisionGroup | null;
  onLeaveGroup: () => void;
}

interface RevisionGroupItemProps {
  group: RevisionGroup;
  onSelect: (group: RevisionGroup) => void;
}

interface MessageItemProps {
  message: Message;
  isConsecutive: boolean;
}

interface MessageInputBarProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

// Données initiales des groupes de révision
const INITIAL_REVISION_GROUPS: RevisionGroup[] = [
  {
    id: 1,
    name: 'Révision Bac Maths',
    description: 'Préparation intensive pour l\'épreuve de mathématiques',
    members: 28,
    lastMessage: 'Session de révision ce soir à 20h !',
    lastMessageTime: '15:42',
    unreadCount: 5,
    isOnline: true,
    avatar: '📐',
    color: '#3B82F6',
    subject: 'Mathématiques',
    examDate: '15 juin 2025',
    difficulty: 'Avancé'
  },
  {
    id: 2,
    name: 'Physique Terminale S',
    description: 'Révisions complètes programme Terminal S',
    members: 22,
    lastMessage: 'Exercices d\'optique partagés dans les fichiers',
    lastMessageTime: '13:20',
    unreadCount: 0,
    isOnline: true,
    avatar: '⚛️',
    color: '#8B5CF6',
    subject: 'Physique',
    examDate: '18 juin 2025',
    difficulty: 'Intermédiaire'
  },
  {
    id: 3,
    name: 'Histoire-Géo Bac',
    description: 'Révision méthodique des chapitres clés',
    members: 35,
    lastMessage: 'Fiches de révision Seconde Guerre mondiale',
    lastMessageTime: '11:30',
    unreadCount: 12,
    isOnline: false,
    avatar: '🌍',
    color: '#EF4444',
    subject: 'Histoire-Géographie',
    examDate: '20 juin 2025',
    difficulty: 'Intermédiaire'
  },
  {
    id: 4,
    name: 'Programmation Exam',
    description: 'Révision Python et algorithmes',
    members: 18,
    lastMessage: 'Quiz interactif disponible !',
    lastMessageTime: 'Hier',
    unreadCount: 8,
    isOnline: true,
    avatar: '💻',
    color: '#10B981',
    subject: 'Informatique',
    difficulty: 'Avancé'
  },
  {
    id: 5,
    name: 'Philo Révisions',
    description: 'Dissertation et commentaire de texte',
    members: 15,
    lastMessage: 'Méthode pour l\'introduction',
    lastMessageTime: 'Hier',
    unreadCount: 0,
    isOnline: true,
    avatar: '🤔',
    color: '#F59E0B',
    subject: 'Philosophie',
    examDate: '14 juin 2025',
    difficulty: 'Intermédiaire'
  }
];

// Messages simulés pour les groupes de révision
const REVISION_MESSAGES: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      senderId: 'prof_martin',
      senderName: 'Prof. Martin',
      message: 'Bonsoir ! Rappel de notre session de révision intensive ce soir. Nous travaillerons sur les intégrales.',
      timestamp: '14:20',
      isFromUser: false,
      messageType: 'text'
    },
    {
      id: 2,
      senderId: 'sophie_m',
      senderName: 'Sophie M.',
      message: 'Super ! J\'ai préparé quelques exercices types. Qui peut m\'aider avec les primitives ?',
      timestamp: '14:22',
      isFromUser: false,
      messageType: 'text'
    },
    {
      id: 3,
      senderId: 'current_user',
      senderName: 'Vous',
      message: 'Je peux aider ! J\'ai bien maîtrisé cette partie',
      timestamp: '14:23',
      isFromUser: true,
      messageType: 'text'
    },
    {
      id: 4,
      senderId: 'lucas_p',
      senderName: 'Lucas P.',
      message: 'Génial ! On pourrait faire des groupes de 3-4 personnes pour s\'entraider ?',
      timestamp: '14:25',
      isFromUser: false,
      messageType: 'text'
    },
    {
      id: 5,
      senderId: 'prof_martin',
      senderName: 'Prof. Martin',
      message: 'Excellente idée ! Les révisions en petits groupes sont très efficaces. RDV à 20h en visio !',
      timestamp: '15:42',
      isFromUser: false,
      messageType: 'text'
    }
  ]
};

// Avatars disponibles pour les matières
const SUBJECT_AVATARS: SubjectAvatar[] = [
  { emoji: '📐', color: '#3B82F6', subject: 'Mathématiques' },
  { emoji: '⚛️', color: '#8B5CF6', subject: 'Physique' },
  { emoji: '🌍', color: '#EF4444', subject: 'Histoire-Géographie' },
  { emoji: '💻', color: '#10B981', subject: 'Informatique' },
  { emoji: '🧪', color: '#F59E0B', subject: 'Chimie' },
  { emoji: '🌱', color: '#06B6D4', subject: 'SVT' },
  { emoji: '📖', color: '#84CC16', subject: 'Français' },
  { emoji: '🎭', color: '#F97316', subject: 'Arts' },
  { emoji: '🤔', color: '#6366F1', subject: 'Philosophie' },
  { emoji: '🎵', color: '#EC4899', subject: 'Musique' },
  { emoji: '🏃', color: '#14B8A6', subject: 'Sport' },
  { emoji: '🌐', color: '#8B5CF6', subject: 'Langues' }
];

// Modal pour créer un nouveau groupe de révision
const CreateRevisionGroupModal: React.FC<CreateRevisionGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_AVATARS[0]);
  const [difficulty, setDifficulty] = useState<'Débutant' | 'Intermédiaire' | 'Avancé'>('Intermédiaire');
  const [examDate, setExamDate] = useState('');

  const handleCreate = () => {
    if (groupName.trim() && groupDescription.trim()) {
      onCreateGroup({
        name: groupName.trim(),
        description: groupDescription.trim(),
        avatar: selectedSubject.emoji,
        color: selectedSubject.color,
        subject: selectedSubject.subject,
        difficulty,
        examDate: examDate || undefined
      });
      setGroupName('');
      setGroupDescription('');
      setSelectedSubject(SUBJECT_AVATARS[0]);
      setDifficulty('Intermédiaire');
      setExamDate('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg border border-blue-100 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-blue-50">
          <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Nouveau Groupe de Révision</h2>
          <button 
            onClick={handleCreate}
            disabled={!groupName.trim() || !groupDescription.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-md"
          >
            Créer
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Matière
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {SUBJECT_AVATARS.map((subject, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSubject(subject)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 ${
                    selectedSubject.emoji === subject.emoji 
                      ? 'ring-3 ring-blue-400 ring-offset-2 ring-offset-white scale-110 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.emoji}
                </button>
              ))}
            </div>
            <p className="text-sm text-blue-600 mt-3 font-medium">{selectedSubject.subject}</p>
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-3 block">Nom du groupe</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Ex: Révision Bac Maths - Analyse"
              className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
              maxLength={50}
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-3 block">Description</label>
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Décrivez les objectifs de révision et le contenu à étudier"
              className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 resize-none transition-all duration-200"
              rows={3}
              maxLength={200}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-800 font-semibold mb-3 block">Niveau</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'Débutant' | 'Intermédiaire' | 'Avancé')}
                className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
              >
                <option value="Débutant" className="bg-white">Débutant</option>
                <option value="Intermédiaire" className="bg-white">Intermédiaire</option>
                <option value="Avancé" className="bg-white">Avancé</option>
              </select>
            </div>

            <div>
              <label className="text-gray-800 font-semibold mb-3 block">Date d'examen (optionnel)</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Aperçu
            </h3>
            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                  style={{ backgroundColor: selectedSubject.color }}
                >
                  {selectedSubject.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-800 font-bold text-lg truncate">
                    {groupName || 'Nom du groupe'}
                  </h4>
                  <p className="text-gray-600 text-sm truncate mb-1">
                    {groupDescription || 'Description du groupe'}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">{selectedSubject.subject}</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">{difficulty}</span>
                    {examDate && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(examDate).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal pour les options du groupe
const GroupOptionsModal: React.FC<GroupOptionsModalProps> = ({ isOpen, onClose, group, onLeaveGroup }) => {
  if (!isOpen || !group) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md border border-blue-100 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-blue-50">
          <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Options du groupe</h2>
          <div className="w-9" />
        </div>

        <div className="p-6">
          <div className="bg-blue-50/50 rounded-2xl p-4 mb-6 border border-blue-100">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                style={{ backgroundColor: group.color }}
              >
                {group.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-800 font-bold text-lg">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">{group.subject}</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">{group.difficulty}</span>
                  {group.examDate && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {group.examDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 text-left group">
              <Info className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-800">Informations du groupe</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 text-left group">
              <BellOff className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-800">Gérer les notifications</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 text-left group">
              <Users className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-800">Voir les membres ({group.members})</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 text-left group">
              <Image className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-800">Ressources partagées</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 text-left group">
              <Search className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-800">Rechercher dans les messages</span>
            </button>

            <button 
              onClick={onLeaveGroup}
              className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-all duration-200 text-left mt-6 group"
            >
              <LogOut className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-red-600">Quitter le groupe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour un groupe de révision
const RevisionGroupItem: React.FC<RevisionGroupItemProps> = ({ group, onSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-700';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-700';
      case 'Avancé': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const isExamSoon = () => {
    if (!group.examDate) return false;
    const examDate = new Date(group.examDate);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div 
      onClick={() => onSelect(group)}
      className="bg-white hover:bg-blue-50/50 border border-blue-100 hover:border-blue-200 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
            style={{ backgroundColor: group.color }}
          >
            {group.avatar}
          </div>
          {group.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
          )}
          {isExamSoon() && (
            <div className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-800 font-bold text-lg group-hover:text-blue-700 transition-colors truncate">
              {group.name}
            </h3>
            <span className="text-gray-500 text-xs font-medium">{group.lastMessageTime}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-2 truncate">{group.description}</p>
          <p className="text-gray-500 text-sm mb-3 truncate font-medium">💬 {group.lastMessage}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">
                {group.members} membres
              </span>
              <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getDifficultyColor(group.difficulty)}`}>
                {group.difficulty}
              </span>
              {group.examDate && (
                <span className={`text-xs px-2 py-1 rounded-lg font-medium flex items-center gap-1 ${
                  isExamSoon() ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <Clock className="w-3 h-3" />
                  {group.examDate}
                </span>
              )}
            </div>
            
            {group.unreadCount > 0 && (
              <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full min-w-[24px] text-center font-bold shadow-md">
                {group.unreadCount > 99 ? '99+' : group.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour un message
const MessageItem: React.FC<MessageItemProps> = ({ message, isConsecutive }) => (
  <div className={`mb-4 ${message.isFromUser ? 'text-right' : 'text-left'} animate-fadeIn`}>
    {!message.isFromUser && !isConsecutive && (
      <p className="text-blue-600 text-xs mb-2 ml-12 font-medium">{message.senderName}</p>
    )}
    
    <div className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
        message.isFromUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-white text-gray-800 border border-blue-100'
      }`}>
        <p className="text-sm leading-relaxed">{message.message}</p>
      </div>
    </div>
    
    <p className={`text-xs text-gray-500 mt-2 font-medium ${
      message.isFromUser ? 'mr-2' : 'ml-2'
    }`}>
      {message.timestamp}
    </p>
  </div>
);

// Barre de saisie améliorée
const MessageInputBar: React.FC<MessageInputBarProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-blue-100 bg-white p-4">
      <div className="flex items-end gap-3">
        <button className="p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110 group">
          <Paperclip className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={disabled ? "Groupe hors ligne..." : "Partagez vos questions, notes ou encouragements..."}
            disabled={disabled}
            className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 resize-none transition-all duration-200"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        
        <button 
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`p-3 rounded-xl transition-all duration-200 shadow-md ${
            message.trim() && !disabled
              ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-110 hover:shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const RevisionGroups: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<RevisionGroup | null>(null);
  const [currentView, setCurrentView] = useState<string>('groups');
  const [messages, setMessages] = useState<Message[]>([]);
  const [revisionGroups, setRevisionGroups] = useState<RevisionGroup[]>(INITIAL_REVISION_GROUPS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGroupSelect = (group: RevisionGroup) => {
    setSelectedGroup(group);
    setMessages(REVISION_MESSAGES[group.id] || []);
    setCurrentView('chat');
    
    // Marquer les messages comme lus
    if (group.unreadCount > 0) {
      setRevisionGroups(prev => 
        prev.map(g => 
          g.id === group.id ? { ...g, unreadCount: 0 } : g
        )
      );
    }
  };

  const handleBackToGroups = () => {
    setCurrentView('groups');
    setSelectedGroup(null);
    setMessages([]);
  };

  const handleCreateGroup = (groupData: CreateGroupData) => {
    const newGroup: RevisionGroup = {
      id: revisionGroups.length + 1,
      name: groupData.name,
      description: groupData.description,
      members: 1,
      lastMessage: 'Groupe de révision créé ! 🎉',
      lastMessageTime: 'Maintenant',
      unreadCount: 0,
      isOnline: true,
      avatar: groupData.avatar,
      color: groupData.color,
      subject: groupData.subject,
      difficulty: groupData.difficulty,
      examDate: groupData.examDate
    };

    setRevisionGroups([newGroup, ...revisionGroups]);
  };

  const handleLeaveGroup = () => {
    if (selectedGroup) {
      setRevisionGroups(revisionGroups.filter(group => group.id !== selectedGroup.id));
      handleBackToGroups();
      setIsOptionsModalOpen(false);
    }
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedGroup) return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 'current_user',
      senderName: 'Vous',
      message: messageText,
      timestamp: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isFromUser: true,
      messageType: 'text'
    };

    setMessages(prev => [...prev, newMessage]);

    // Mettre à jour le dernier message du groupe
    setRevisionGroups(prev =>
      prev.map(group =>
        group.id === selectedGroup.id
          ? { ...group, lastMessage: messageText, lastMessageTime: 'Maintenant' }
          : group
      )
    );
  };

  const getTotalUnreadCount = () => {
    return revisionGroups.reduce((total, group) => total + group.unreadCount, 0);
  };

  const renderGroupsList = () => (
    <div className="h-full flex flex-col">
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Groupes de Révision</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {revisionGroups.length} groupe{revisionGroups.length > 1 ? 's' : ''}
              </span>
              {getTotalUnreadCount() > 0 && (
                <span className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  {getTotalUnreadCount()} nouveau{getTotalUnreadCount() > 1 ? 'x' : ''} message{getTotalUnreadCount() > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg group"
          >
            <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {revisionGroups.map(group => (
            <RevisionGroupItem
              key={group.id}
              group={group}
              onSelect={handleGroupSelect}
            />
          ))}
          
          {revisionGroups.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-gray-800 font-semibold text-lg mb-2">Aucun groupe de révision</h3>
              <p className="text-gray-600 mb-6">Créez votre premier groupe pour commencer à réviser avec d'autres étudiants</p>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-md"
              >
                Créer un groupe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="h-full flex flex-col">
      {/* En-tête du chat */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBackToGroups}
            className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: selectedGroup?.color }}
          >
            <span className="text-xl">{selectedGroup?.avatar}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-gray-800 font-bold text-lg truncate">{selectedGroup?.name}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">
                {selectedGroup?.members} membres
              </span>
              {selectedGroup?.isOnline && (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="w-3 h-3" />
                  En ligne
                </span>
              )}
              {selectedGroup?.examDate && (
                <span className="flex items-center gap-1 text-orange-600">
                  <Clock className="w-3 h-3" />
                  {selectedGroup.examDate}
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => setIsOptionsModalOpen(true)}
            className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
      </div>

      {/* Zone de messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              // Pour éviter d'afficher le nom de l'expéditeur plusieurs fois de suite
              isConsecutive={
                index > 0 && messages[index - 1].senderId === message.senderId && !message.isFromUser
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Barre de saisie */}
      <MessageInputBar
        onSendMessage={handleSendMessage}
        disabled={!selectedGroup?.isOnline}
      />

      {/* Modale des options du groupe */}
      <GroupOptionsModal
        isOpen={isOptionsModalOpen}
        onClose={() => setIsOptionsModalOpen(false)}
        group={selectedGroup}
        onLeaveGroup={handleLeaveGroup}
      />
    </div>
  );

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col text-gray-800 antialiased overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-row rounded-3xl overflow-hidden shadow-xl bg-white">
        {/* Colonne de gauche (Groupes) */}
        <div 
          className={`flex-none w-full sm:w-80 md:w-96 transition-transform duration-300 ease-in-out ${currentView === 'chat' ? '-translate-x-full' : 'translate-x-0'} sm:translate-x-0 border-r border-blue-100`}
        >
          {renderGroupsList()}
        </div>
        
        {/* Colonne de droite (Chat) */}
        <div 
          className={`flex-1 transition-transform duration-300 ease-in-out ${currentView === 'chat' ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 sm:block relative w-full`}
        >
          {selectedGroup && renderChatView()}
        </div>
      </div>

      {/* Modale de création de groupe */}
      <CreateRevisionGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreateGroup={handleCreateGroup} 
      />
    </div>
  );
};

export default RevisionGroups;