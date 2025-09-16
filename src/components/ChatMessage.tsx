"use client";

import React from "react";

type ChatMessageProps = {
  sender: "etudiant" | "enseignant" | "ia";
  text: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text }) => {
  const senderColors: Record<string, string> = {
    etudiant: "bg-blue-100 text-blue-800",
    enseignant: "bg-green-100 text-green-800",
    ia: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="flex items-start gap-2 my-2">
      <div
        className={`p-2 rounded-2xl shadow-sm max-w-xs ${senderColors[sender]}`}
      >
        <p className="text-sm">{text}</p>
        <span className="block text-xs opacity-70 mt-1 text-right">
          {sender}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
