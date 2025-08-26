'use client';

import { useState } from 'react';
import { Send, Bot, User, GraduationCap, Loader } from "lucide-react";
import "@/app/page"



// Définition de l'interface pour un message dans le chat
interface Message {
  id: number;
  sender: "etudiant" | "enseignant" | "ia";
  text: string;
}

// Composant principal de la page de chat
export default function GroupChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "enseignant", text: "Bonjour à tous, bienvenue dans le groupe 📚" },
    { id: 2, sender: "etudiant", text: "Bonjour monsieur 👋" },
    { id: 3, sender: "ia", text: "Salut ! Je suis votre assistant IA 🤖. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // État pour le message "l'IA est en train d'écrire"

  // Fonction pour envoyer le message de l'utilisateur
  const handleSend = async () => {
    if (!input.trim()) return;

    // Ajoute immédiatement le message de l'étudiant à la liste
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "etudiant",
      text: input,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    
    // Simule la réponse de l'IA après un court délai
    setIsTyping(true);
    await generateAiResponse(input);
    setIsTyping(false);
  };

  /**
   * Fonction pour générer une réponse de l'IA en appelant l'API Gemini.
   * Cette fonction simule l'intelligence de l'assistant.
   * @param promptText Le texte du message de l'utilisateur.
   */
  const generateAiResponse = async (promptText: string) => {
    // Le prompt initial donne le contexte à l'IA
    const systemPrompt = "Vous êtes un assistant IA amical et serviable dans un chat de groupe entre un enseignant et des étudiants. Répondez de manière concise et pertinente.";
    const chatHistory = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Bien sûr, je suis prêt à aider." }] },
      { role: "user", parts: [{ text: promptText }] },
    ];
    
    const payload = {
      contents: chatHistory,
    };
    // REMPLACEZ la ligne ci-dessous par votre propre clé API
    // Vous pouvez obtenir une clé sur Google AI Studio.
    const apiKey = "AIzaSyDdC3z4axWR3xcD2t9yZaJNirSeSGRO_hY"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      // Récupère le texte de la réponse de l'IA
      const aiResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiResponse) {
        // Crée et ajoute le nouveau message de l'IA à la liste des messages
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: "ia",
          text: aiResponse,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse de l'IA:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: "ia",
        text: "Désolé, je n'ai pas pu générer de réponse pour le moment.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  // Sélectionne l'icône en fonction de l'expéditeur
  const getSenderIcon = (sender: string) => {
    if (sender === "ia") return <Bot className="w-6 h-6 text-green-500" />;
    if (sender === "enseignant") return <GraduationCap className="w-6 h-6 text-blue-500" />;
    return <User className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-green-600 text-white font-bold">
      ChatBot
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-2">
            {getSenderIcon(msg.sender)}
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.sender === "etudiant"
                  ? "bg-white text-gray-800"
                  : msg.sender === "enseignant"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* Indicateur de saisie de l'IA */}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-green-500 animate-pulse" />
            <div className="px-4 py-2 rounded-2xl bg-green-100 text-green-800 animate-pulse">
              L'IA est en train d'écrire...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white flex items-center border-t">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          placeholder="Écrire un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-green-600 rounded-full text-white"
          disabled={isTyping}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
