'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant pour l\'appartement. Comment puis-je vous aider aujourd\'hui ?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }

      const data = await response.json();
      setMessages([...newMessages, data.message]);
    } catch (error) {
      console.error('Erreur:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Où sont les oreillers ?',
    'Comment fonctionne le chauffage ?',
    'Quels restaurants recommandez-vous dans le quartier ?',
    'Où puis-je trouver les draps supplémentaires ?',
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-[#e5ddd5] md:max-w-4xl md:mx-auto md:shadow-lg">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-[#aa9592] text-white p-3 sm:p-4 shadow-md flex-shrink-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">🏠 Assistant Appartement 5</h1>
        <p className="text-xs sm:text-sm opacity-90">Rue des Trois Rois</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#e5ddd5]">
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4 sm:py-3 ${
                message.role === 'user'
                  ? 'bg-[#aa9592] text-white rounded-br-none shadow-sm'
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
              }`}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                {message.content}
              </p>
              <span className={`text-[10px] sm:text-xs mt-1 block ${
                message.role === 'user' ? 'text-white/70 text-right' : 'text-gray-500 text-right'
              }`}>
                {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg rounded-bl-none px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#aa9592] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#aa9592] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#aa9592] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-3 py-2 sm:px-4 sm:py-3 bg-white border-t border-gray-200 flex-shrink-0">
          <p className="text-xs text-gray-500 mb-2">Questions fréquentes :</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="text-xs sm:text-sm bg-[#aa9592]/10 hover:bg-[#aa9592]/20 active:bg-[#aa9592]/30 text-[#aa9592] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-[#aa9592]/30 transition-colors touch-manipulation"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-3 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0 safe-area-bottom">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#aa9592] focus:border-transparent text-gray-800 bg-gray-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#aa9592] hover:bg-[#8a7572] active:bg-[#6a5552] text-white p-2.5 sm:p-3 rounded-full font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors touch-manipulation flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
          >
            {isLoading ? '...' : '➤'}
          </button>
        </div>
      </form>
    </div>
  );
}
