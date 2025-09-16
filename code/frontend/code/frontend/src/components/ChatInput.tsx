"use client";

import React, { useState } from "react";

type ChatInputProps = {
  onSend: (text: string, sender: "etudiant") => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message, "etudiant");
    setMessage("");
  };

  return (
    <div className="flex gap-2 p-2 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez un message..."
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Envoyer
      </button>
    </div>
  );
};

export default ChatInput;
