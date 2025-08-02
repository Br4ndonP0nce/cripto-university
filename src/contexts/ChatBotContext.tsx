"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ChatBotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBot must be used within a ChatBotProvider");
  }
  return context;
};

export const ChatBotProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatBotContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}
    </ChatBotContext.Provider>
  );
};