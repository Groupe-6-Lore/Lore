import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Sparkles, BookOpen, Settings } from 'lucide-react';
import aiService from '../services/aiService';

const ChatbotPanel = ({ campaign, universe, rules }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('ChatbotPanel rendu, isOpen:', isOpen);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Salut ! Je suis Lore IA, votre assistant pour les questions sur votre univers et système de jeu. Que souhaitez-vous savoir ?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialiser le service IA avec le contexte
  useEffect(() => {
    if (campaign && universe && rules) {
      aiService.initializeContext(campaign, universe, rules);
    }
  }, [campaign, universe, rules]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const question = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    try {
      // Utiliser le service IA pour traiter la question
      const result = await aiService.processQuestion(question);
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: result.response,
        timestamp: new Date(),
        sources: result.sources || [],
        keywords: result.keywords || []
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erreur lors du traitement de la question:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Je suis désolé, une erreur est survenue lors du traitement de votre question. Veuillez réessayer.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-[9999]">
        <button
          onClick={() => {
            console.log('Bouton cliqué, ouverture du chatbot');
            setIsOpen(true);
          }}
          className="w-16 h-32 bg-gradient-to-br from-slate-600 to-slate-800 rounded-r-2xl shadow-2xl border border-slate-500/30 hover:from-slate-500 hover:to-slate-700 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="text-golden font-bold text-sm transform -rotate-90 tracking-wider shadow-lg">
            LORE IA
          </div>
          <MessageCircle size={16} className="text-golden mt-2 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-96 z-[9999]">
      {/* Fond avec texture obsidienne */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-r-2xl">
        {/* Texture obsidienne */}
        <div className="absolute inset-0 opacity-20 rounded-r-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-800/20 rounded-r-2xl"></div>
          <div className="absolute inset-0 rounded-r-2xl" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)
            `,
            backgroundSize: '200px 200px, 300px 300px, 150px 150px'
          }}></div>
        </div>

        {/* Bordure avec runes */}
        <div className="absolute inset-0 border-2 border-golden/30 rounded-r-2xl">
          {/* Runes sur les côtés de la conversation */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
            <div className="text-golden/30 text-lg font-mono transform -rotate-90">
              ᚨᛒᚲᛞᛖᚠᚷᚺ
            </div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
            <div className="text-golden/30 text-lg font-mono transform rotate-90">
              ᚨᛒᚲᛞᛖᚠᚷᚺ
            </div>
          </div>
        </div>

        {/* Contenu du panel */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-golden/20">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-golden" size={20} />
              <h2 className="text-golden font-bold text-lg">Lore IA</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-golden/70 hover:text-golden transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contexte de la campagne */}
          <div className="p-3 border-b border-golden/10 bg-slate-800/50">
            <div className="flex items-center space-x-2 text-xs text-golden/80">
              <BookOpen size={14} />
              <span className="truncate">
                {campaign?.nom || 'Campagne'} - {universe?.nom || 'Univers'} - {rules?.nom || 'Règles'}
              </span>
            </div>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg relative ${
                    message.type === 'user'
                      ? 'bg-golden/20 text-golden border border-golden/30 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-700/50 text-slate-200 border border-slate-600/30 shadow-lg shadow-blue-500/20'
                  }`}
                  style={{
                    boxShadow: message.type === 'user' 
                      ? '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)' 
                      : '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)'
                  }}
                >
                  <div className="text-sm leading-relaxed">{message.content}</div>
                  
                  {/* Afficher les sources si disponibles */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-600/30">
                      <div className="text-xs text-golden/80 mb-1">Sources utilisées :</div>
                      <div className="space-y-1">
                        {message.sources.slice(0, 3).map((source, index) => (
                          <div key={index} className="text-xs text-slate-400">
                            • {source.title} ({source.type})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className="bg-slate-700/50 text-slate-200 border border-slate-600/30 p-3 rounded-lg shadow-lg"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-golden border-t-transparent rounded-full"></div>
                    <span className="text-sm">Lore IA réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="p-4 border-t border-golden/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question sur l'univers..."
                className="flex-1 bg-slate-800/50 border border-golden/30 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-golden/20 hover:bg-golden/30 border border-golden/30 text-golden px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                style={{
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.1)'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPanel;
