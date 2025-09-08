'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Menu, 
  PlusCircle, 
  BookOpen, 
  HelpCircle, 
  User, 
  Plus, 
  Send,
  Trash2,
  Clock,
  File,
  BarChart3,
  Brain,
  UploadCloud
} from 'lucide-react';
import "@/app/page"

// Définition des types pour une meilleure lisibilité
interface Message {
  sender: 'utilisateur' | 'coach';
  text: string;
  timestamp: Date;
}

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
  originalFile: File;
  base64Data: string;
}

interface UserStats {
  quizzesCompleted: number;
  fichesGenerated: number;
  averageQuizScore: number;
  generatedContent: string;
}

const ChatFichier = () => {
  // Gestion de l'état local
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'coach', text: 'Salut 👋, je suis ton coach de révision  !', timestamp: new Date() }
  ]);
  const [input, setInput] = useState<string>('');
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    quizzesCompleted: 0,
    fichesGenerated: 0,
    averageQuizScore: 0,
    generatedContent: ''
  });

  // Convertit le fichier en une chaîne Base64 pour l'envoyer à Gemini
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Appel API Gemini avec le contenu du fichier et le message de l'utilisateur
  const callGeminiAPI = async (prompt: string, systemMessage: string, fileData: UploadedFile | null): Promise<string> => {
    try {
      // API Key
      const apiKey = "AIzaSyDuwo7xqEmkOsCNa_UuO1FKAGNP09jeFuo";
      
      const parts = [];
      parts.push({ text: `${systemMessage}\n\n${prompt}` });

      if (fileData) {
        parts.push({
          inlineData: {
            mimeType: fileData.type,
            data: fileData.base64Data.split(',')[1]
          }
        });
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API : ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Réponse  invalide');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Erreur revise API:', error);
      throw new Error("Désolé, j'ai rencontré une erreur avec l'API . Veuillez réessayer.");
    }
  };

  const envoyerMessage = async (): Promise<void> => {
    if (!input.trim()) return;
    
    // Ajoute le message de l'utilisateur à l'état local
    setMessages(prev => [...prev, { 
      sender: 'utilisateur', 
      text: input, 
      timestamp: new Date() 
    }]);
    
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const systemMessage = `Tu es un coach IA de révision powered by Gemini. Tu aides les étudiants avec leurs études de manière personnalisée et engageante. 
      Utilise les capacités d'analyse de Gemini pour fournir des réponses précises et pédagogiques.
      Reste amical, motivant et utilise des emojis pour rendre l'interaction plus vivante.`;

      const response = await callGeminiAPI(userInput, systemMessage, file);
      
      // Ajoute la réponse de l'IA à l'état local
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: response,
        timestamp: new Date()
      }]);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi du message à Gemini:", error);
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: "Désolé, j'ai rencontré une erreur. Peux-tu réessayer ? 😅",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFichier = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;
    
    try {
      const base64Data = await convertFileToBase64(uploadedFile);
      const newFile: UploadedFile = {
        id: Date.now(),
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
        originalFile: uploadedFile,
        base64Data: base64Data
      };
      
      setFile(newFile);
      
      // Enregistre l'action dans le chat
      setMessages(prev => [...prev, {
        sender: 'utilisateur',
        text: `📁 Fichier téléchargé: ${uploadedFile.name}`,
        timestamp: new Date()
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'coach',
          text: `Super ! J'ai bien reçu ton fichier "${uploadedFile.name}". Je suis maintenant prêt à l'analyser. Que souhaites-tu faire ? Générer un résumé ou un quiz ? 🎓`,
          timestamp: new Date()
        }]);
      }, 1000);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error);
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: `❌ Erreur lors du téléchargement du fichier. Veuillez réessayer.`,
        timestamp: new Date()
      }]);
    }
  };

  const genererContenuIA = async (type: 'resume' | 'quiz'): Promise<void> => {
    if (!file) {
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: "🚨 Tu dois d'abord uploader un fichier pour que je puisse générer du contenu !", 
        timestamp: new Date()
      }]);
      return;
    }

    setIsLoading(true);
    
    try {
      const systemMessage = type === 'resume' 
        ? `Tu es Gemini AI, expert en création de résumés académiques. Crée un résumé structuré, intelligent et optimisé pour l'apprentissage étudiant avec des sections claires et des emojis pour la lisibilité.`
        : `Tu es Gemini AI, expert en création de quiz éducatifs. Crée un quiz engageant avec des questions pertinentes, des explications détaillées et des métadonnées d'apprentissage.`;
      
      const prompt = type === 'resume'
        ? `Crée un résumé intelligent et structuré en te basant sur le contenu du fichier. Le résumé doit inclure :\n📚 Points clés identifiés\n💡 Synthèse intelligente\n🚀 Stratégie de révision\n⚡ Points critiques pour l'examen`
        : `Crée un quiz interactif basé sur le contenu du fichier. Le quiz doit inclure :\n🧠 Questions de compréhension\n🎯 Réponses avec explications\n⏱️ Temps estimé\n📊 Niveau de difficulté`;

      const response = await callGeminiAPI(prompt, systemMessage, file);
      
      const actionText = type === 'resume' ? 'résumé' : 'quiz';
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: `🎉 Voici ton ${actionText} généré par Coach AI :\n\n${response}`, 
        timestamp: new Date()
      }]);
      
      // Met à jour les stats utilisateur dans l'état local
      setUserStats(prev => ({
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + (type === 'quiz' ? 1 : 0),
        fichesGenerated: prev.fichesGenerated + (type === 'resume' ? 1 : 0),
        generatedContent: response
      }));
      
      // Ajoute à l'historique dans l'état local
      setHistory(prev => [`${type === 'resume' ? 'Résumé' : 'Quiz'} - ${file.name}`, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Erreur génération:', error);
      const actionText = type === 'resume' ? 'résumé' : 'quiz';
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: `❌ Erreur lors de la génération du ${actionText}. Veuillez réessayer.`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const nouvelleSession = (): void => {
    setMessages([
      { sender: 'coach', text: 'Nouvelle session démarrée ! Je suis prêt à t\'aider avec tes révisions 🚀', timestamp: new Date() }
    ]);
    setFile(null);
    setInput('');
    setHistory([]);
    setUserStats({
      quizzesCompleted: 0,
      fichesGenerated: 0,
      averageQuizScore: 0,
      generatedContent: ''
    });
  };

  const supprimerFichier = (): void => {
    setFile(null);
    setMessages(prev => [...prev, {
      sender: 'coach',
      text: 'Fichier supprimé ! Tu peux en uploader un nouveau quand tu veux 📂',
      timestamp: new Date()
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      envoyerMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-blue-100 flex flex-col shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-blue-100 bg-blue-600">
          <h2 className="text-2xl font-bold text-white tracking-wide">RéviseAI</h2>
          <Menu className="w-6 h-6 text-white" />
        </div>
        
        <button 
          onClick={nouvelleSession}
          className="m-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-5 h-5" /> 
          <span className="font-medium">Nouvelle session</span>
        </button>
        
        {/* Stats utilisateur */}
        <div className="mx-4 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Mes Statistiques
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Quiz complétés:</span>
              <span className="font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs">
                {userStats.quizzesCompleted}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Résumés créés:</span>
              <span className="font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                {userStats.fichesGenerated}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Score moyen:</span>
              <span className="font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full text-xs">
                {userStats.averageQuizScore}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            Historique récent
          </h3>
          {history.length > 0 ? history.map((item, idx) => (
            <div
              key={idx}
              className="p-3 mb-2 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
            >
              <div className="flex items-center gap-2">
                 <File className="w-4 h-4 text-gray-500" />
                 <span className="text-sm truncate">{item}</span>
              </div>
            </div>
          )) : (
            <div className="text-sm text-gray-500 text-center mt-8 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-200">
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              Aucun historique
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-blue-100 flex items-center gap-3 bg-blue-50">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-800 font-medium">Mon Profil</span>
            <span className="text-xs text-gray-600">Étudiant actif</span>
          </div>
        </div>
      </aside>

      {/* Zone principale */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-6 border-b border-blue-100 bg-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              Coach Revise AI
            </h1>
            {file && (
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-2 bg-blue-50 px-3 py-1 rounded-full">
                <File className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{file.name}</span>
                <span className="text-blue-600">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => genererContenuIA('resume')}
              disabled={!file || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
            >
              {isLoading && <Clock className="w-5 h-5 animate-spin" />}
              <BookOpen className="w-5 h-5" />
              Générer Résumé
            </button>
            
            <button
              onClick={() => genererContenuIA('quiz')}
              disabled={!file || isLoading}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
            >
              {isLoading && <Clock className="w-5 h-5 animate-spin" />}
              <HelpCircle className="w-5 h-5" />
              Générer Quiz
            </button>
          </div>
        </header>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'utilisateur' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {msg.sender === 'coach' && (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                  <Brain className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-2xl ${msg.sender === 'utilisateur' ? 'order-1' : 'order-2'}`}>
                <div
                  className={`px-6 py-4 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                    msg.sender === 'utilisateur'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-blue-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.text}</div>
                </div>
                <div className={`text-xs text-gray-500 mt-2 ${msg.sender === 'utilisateur' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white text-gray-800 border border-blue-100 px-6 py-4 rounded-2xl shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="text-sm text-gray-600 ml-3 font-medium">`` réfléchit...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zone de saisie */}
        <div className="p-6 border-t border-blue-100 bg-white">
          {/* Affichage du fichier uploadé */}
          {file && (
            <div className="mb-4 p-4 bg-blue-50 rounded-xl flex items-center justify-between border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <File className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">{file.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Prêt pour Coach ia 
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={supprimerFichier}
                className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <div className="flex gap-3">
            {/* Bouton Upload */}
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="w-14 h-14 bg-gray-600 hover:bg-gray-700 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <UploadCloud className="w-6 h-6 text-white" />
              </div>
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={uploadFichier}
              accept=".pdf,.docx,.txt,.ppt,.pptx"
              className="hidden"
            />
            
            <input
              type="text"
              placeholder="Pose ta question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-1 px-6 py-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm text-gray-800 placeholder-gray-500"
            />
            
            <button
              onClick={envoyerMessage}
              disabled={!input.trim() || isLoading}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </div>
          
          {/* Message d'aide */}
          {!file && (
            <div className="mt-4 text-sm text-gray-600 text-center p-3 bg-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Commencez par uploader un fichier</span>
              </div>
              <span className="text-xs">Formats supportés: PDF, Word, TXT, PowerPoint</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatFichier;