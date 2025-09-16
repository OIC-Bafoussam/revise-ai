"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Users, Plus, Link as LinkIcon, Clipboard, Send, ArrowLeft, CheckCircle, Upload, Settings } from 'lucide-react';
import "@/app/page";

// --- Définition des types pour l'application ---
interface FileAttachment {
  name: string;
  type: string;
  dataUrl: string;
}

interface Message {
  id: string;
  senderId: string;
  senderRole: 'enseignant' | 'etudiant';
  timestamp: string;
  text?: string;
  file?: FileAttachment;
}

interface Group {
  id: number;
  name: string;
  members: string[];
  admins: string[];
  messages: Message[];
}

// Composant principal de la page de gestion des groupes
export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'enseignant' | 'etudiant'>('etudiant');
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedChatGroupId, setSelectedChatGroupId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  // Utiliser l'interface FileAttachment pour le type d'état
  const [selectedFile, setSelectedFile] = useState<FileAttachment | null>(null);
  const [currentView, setCurrentView] = useState<'groups' | 'chat' | 'settings'>('groups');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Fonction pour charger les données depuis localStorage
  const loadState = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedGroups = localStorage.getItem('groups');
        const storedRole = localStorage.getItem('userRole');
        if (storedGroups) {
          setGroups(JSON.parse(storedGroups));
        }
        if (storedRole) {
          setUserRole(storedRole as 'enseignant' | 'etudiant');
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données depuis le localStorage", error);
      }
    }
  };

  // Fonction pour sauvegarder les données dans localStorage
  const saveState = (stateToSave: Group[], roleToSave: 'enseignant' | 'etudiant') => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('groups', JSON.stringify(stateToSave));
        localStorage.setItem('userRole', roleToSave);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des données dans le localStorage", error);
      }
    }
  };

  // Génère un ID utilisateur unique au montage et charge l'état
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Génère un ID simple et unique pour la session en cours
      const currentUserId = localStorage.getItem('userId') || crypto.randomUUID();
      localStorage.setItem('userId', currentUserId);
      setUserId(currentUserId);
      
      // Charge l'état depuis le localStorage, incluant les messages et le rôle
      loadState();
      
      // Vérifie si l'URL contient un lien d'invitation
      const urlParams = new URLSearchParams(window.location.search);
      const inviteGroupId = urlParams.get('invite');

      if (inviteGroupId) {
        handleJoinGroupFromLink(parseInt(inviteGroupId), currentUserId);
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, []);

  // Sauvegarde les groupes et le rôle dans localStorage à chaque modification
  useEffect(() => {
    saveState(groups, userRole);
  }, [groups, userRole]);

  // Fait défiler la vue du chat vers le bas lorsqu'un nouveau message est ajouté
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatGroupId, groups]);

  // Gère l'ajout de l'utilisateur à un groupe via un lien
  const handleJoinGroupFromLink = (groupId: number, currentUserId: string) => {
    setGroups(prevGroups => {
      const existingGroup = prevGroups.find(g => g.id === groupId);
      
      if (existingGroup && !existingGroup.members.includes(currentUserId)) {
        const updatedGroups = prevGroups.map(group =>
          group.id === groupId
            ? { ...group, members: [...group.members, currentUserId] }
            : group
        );
        saveState(updatedGroups, userRole);
        return updatedGroups;
      } else if (!existingGroup) {
        const newGroup: Group = {
          id: groupId,
          name: `Groupe #${groupId}`,
          members: [currentUserId],
          admins: [currentUserId],
          messages: [],
        };
        const updatedGroups = [...prevGroups, newGroup];
        saveState(updatedGroups, userRole);
        return updatedGroups;
      }
      return prevGroups;
    });
  };

  // Gère la création d'un nouveau groupe et le lien d'invitation
  const createGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroupId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    const newGroup: Group = {
      id: newGroupId,
      name: newGroupName,
      members: [userId as string],
      admins: [userId as string],
      messages: [],
    };
    
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    setNewGroupName('');
    
    const link = `${window.location.origin}${window.location.pathname}?invite=${newGroupId}`;
    setInvitationLink(link);
    setShowLinkModal(true);
  };
  
  // Gère l'envoi d'un message (texte ou fichier)
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedFile) || selectedChatGroupId === null) return;

    const updatedGroups = groups.map(group => {
      if (group.id === selectedChatGroupId) {
        const message: Message = {
          id: crypto.randomUUID(),
          senderId: userId as string,
          senderRole: userRole,
          timestamp: new Date().toISOString(),
          text: newMessage.trim() ? newMessage : undefined,
          file: selectedFile || undefined, // Utiliser l'objet FileAttachment directement
        };
        return { ...group, messages: [...group.messages, message] };
      }
      return group;
    });
    setGroups(updatedGroups);
    setNewMessage('');
    setSelectedFile(null);
  };

  // Gère la sélection d'un fichier
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Créez un objet FileAttachment pour le stocker dans l'état
        const fileAttachment: FileAttachment = {
          name: file.name,
          type: file.type,
          dataUrl: event.target?.result as string
        };
        setSelectedFile(fileAttachment);
        setNewMessage('');
      };
      reader.readAsDataURL(file);
    }
  };
  
  const openChat = (groupId: number) => {
    setSelectedChatGroupId(groupId);
    setCurrentView('chat');
  };

  const goBackToGroups = () => {
    setSelectedChatGroupId(null);
    setCurrentView('groups');
  };
  
  const goToSettings = () => {
    setCurrentView('settings');
  };

  const goBackFromSettings = () => {
    setCurrentView('groups');
  };

  const copyLinkToClipboard = () => {
    if (!invitationLink) return;
    navigator.clipboard.writeText(invitationLink).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };
  
  const LinkModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
        <h3 className="text-xl font-bold mb-4">Lien d'invitation</h3>
        <p className="text-sm text-gray-600 mb-4">Partagez ce lien avec vos étudiants pour qu'ils rejoignent le groupe.</p>
        <div className="relative mb-4">
          <input
            type="text"
            value={invitationLink}
            readOnly
            className="w-full p-2 pr-10 border border-gray-300 rounded-md bg-gray-100 font-mono text-sm"
          />
          <button
            onClick={copyLinkToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            title="Copier le lien"
          >
            {isCopied ? <CheckCircle size={20} className="text-green-500" /> : <Clipboard size={20} />}
          </button>
        </div>
        <button onClick={() => setShowLinkModal(false)} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Fermer
        </button>
      </div>
    </div>
  );
  
  const ChatView = () => {
    const group = groups.find(g => g.id === selectedChatGroupId);
    if (!group) return null;
    
    // Détermine le nom de l'expéditeur en fonction de son rôle
    const getSenderLabel = (message: Message) => {
      if (message.senderId === userId) {
        return 'Vous';
      }
      return message.senderRole === 'enseignant' ? 'Enseignant' : 'Étudiant';
    };

    const isImage = (mimeType: string) => mimeType.startsWith('image/');
    
    const renderMessageContent = (message: Message) => {
      if (message.file) {
        if (isImage(message.file.type)) {
          return (
            <div className="flex flex-col items-center">
              <img src={message.file.dataUrl} alt={message.file.name} className="max-w-[150px] md:max-w-[200px] h-auto rounded-lg mb-2 shadow-md" />
              <span className="text-xs text-gray-400 truncate w-full text-center">{message.file.name}</span>
            </div>
          );
        } else {
          return (
            <a href={message.file.dataUrl} download={message.file.name} className="flex items-center text-blue-500 hover:underline">
              <Upload size={16} className="mr-1" />
              <span>{message.file.name}</span>
            </a>
          );
        }
      }
      return <div>{message.text}</div>;
    };
    
    return (
      <div className="flex flex-col h-full">
        {/* En-tête du chat */}
        <div className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
          <button onClick={goBackToGroups} className="mr-3 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="font-bold text-xl text-gray-800">{group.name}</div>
        </div>

        {/* Corps du chat */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {group.messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Commencez la conversation !</p>
            </div>
          ) : (
            group.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                    message.senderId === userId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {getSenderLabel(message)}
                  </div>
                  {renderMessageContent(message)}
                  <div className="text-right text-xs opacity-60 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulaire d'envoi de message */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
              title="Joindre un fichier"
            >
              <Upload size={20} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setSelectedFile(null); // Réinitialise le fichier si l'utilisateur tape du texte
              }}
              placeholder={selectedFile ? selectedFile.name : "Écrivez un message..."}
              disabled={!!selectedFile}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    );
  };

  const SettingsView = () => (
    <div className="flex flex-col h-full">
      {/* En-tête des paramètres */}
      <div className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={goBackFromSettings} className="mr-3 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="font-bold text-xl text-gray-800">Paramètres</div>
      </div>
  
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Affichage de l'ID utilisateur */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Votre ID utilisateur</h3>
          <p className="font-mono text-sm bg-gray-200 p-2 rounded-md break-all">{userId}</p>
        </div>
  
        {/* Sélecteur de rôle */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Votre rôle</h3>
          <p className="text-sm text-gray-600 mb-4">Sélectionnez votre rôle pour cette session.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setUserRole('enseignant')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${userRole === 'enseignant' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Enseignant(e)
            </button>
            <button
              onClick={() => setUserRole('etudiant')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${userRole === 'etudiant' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Étudiant(e)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600 animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 font-sans flex justify-center relative">
      <div className="w-full max-w-xl">
        {currentView === 'chat' && <ChatView />}
        {currentView === 'settings' && <SettingsView />}
        {currentView === 'groups' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="text-left">
                <h1 className="text-4xl font-extrabold text-gray-900">Groupes d'étude</h1>
                <p className="text-gray-500 mt-2">Collaborez et révisez ensemble avec d'autres étudiants</p>
              </div>
              <button
                onClick={goToSettings}
                className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 transition-colors"
                title="Paramètres"
              >
                <Settings size={24} />
              </button>
            </div>

            {/* Section de création de groupe */}
            <form onSubmit={createGroup} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Créer un nouveau groupe</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Nom du groupe"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </form>

            {/* Section Mes groupes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center text-gray-700 mb-4">
                <Users size={20} className="mr-3" />
                <h2 className="text-xl font-bold">Mes groupes ({groups.length})</h2>
              </div>
              <div className="space-y-4">
                {groups.length === 0 ? (
                  <p className="text-gray-500">Vous n'êtes dans aucun groupe.</p>
                ) : (
                  groups.map(group => (
                    <div
                      key={group.id}
                      onClick={() => openChat(group.id)}
                      className="p-4 bg-gray-50 rounded-lg flex items-center justify-between border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.members.length} membres</div>
                      </div>
                      {group.admins?.includes(userId as string) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const link = `${window.location.origin}${window.location.pathname}?invite=${group.id}`;
                            setInvitationLink(link);
                            setShowLinkModal(true);
                          }}
                          className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                          title="Partager le lien d'invitation"
                        >
                          <LinkIcon size={16} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {showLinkModal && <LinkModal />}
      </div>
    </div>
  );
}
