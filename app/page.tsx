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
    <div className="flex flex-col h-screen w-full bg-white md:max-w-4xl md:mx-auto md:shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 shadow-md flex-shrink-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">🏠 Assistant Appartement</h1>
        <p className="text-xs sm:text-sm text-blue-100">Rue des Trois Rois</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 shadow-md rounded-bl-sm border border-gray-200'
              }`}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-3 py-2 sm:px-4 sm:py-3 shadow-md border border-gray-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
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
                className="text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-blue-200 transition-colors touch-manipulation"
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
            placeholder="Posez votre question..."
            className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors touch-manipulation flex-shrink-0"
          >
            {isLoading ? '...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}
