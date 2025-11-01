
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Message } from '../types';
import { GoogleGenAI, Chat } from '@google/genai';
import { BackButtonIcon, SendIcon, UserIcon, BotIcon } from './icons';

interface ChatScreenProps {
  onNavigateToIntro: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigateToIntro }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = useCallback(() => {
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "You are a knowledgeable and respectful chatbot specializing in the life, philosophy, and societal impact of Basavanna, the 12th-century social reformer from Karnataka, India. Answer questions clearly and concisely, focusing on his teachings about equality, the Anubhava Mantapa, Kayaka, Dasoha, and his influence on society. Stick strictly to this topic. Format your answers using markdown for better readability."
        },
      });

      setMessages([
        {
          role: 'model',
          text: "Greetings! I am here to answer your questions about the great social reformer, Basavanna. What would you like to know?"
        }
      ]);
    } catch (e) {
      console.error(e);
      setError("Failed to initialize the chatbot. Please check the API key and configuration.");
    }
  }, []);

  useEffect(() => {
    initChat();
  }, [initChat]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatRef.current.sendMessage({ message: userInput });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
       setMessages((prev) => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md z-10">
        <button
          onClick={onNavigateToIntro}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <BackButtonIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Basavanna Chatbot
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white">
                <BotIcon className="w-6 h-6" />
              </div>
            )}
            <div className={`max-w-md lg:max-w-2xl px-5 py-3 rounded-2xl shadow ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></div>
            </div>
             {msg.role === 'user' && (
              <div className="w-10 h-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <UserIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
             <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white">
                <BotIcon className="w-6 h-6" />
              </div>
            <div className="max-w-md lg:max-w-2xl px-5 py-3 rounded-2xl shadow bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-1 w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !userInput.trim()}
              className="p-3 rounded-full bg-amber-500 text-white disabled:bg-gray-400 dark:disabled:bg-gray-600 hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
