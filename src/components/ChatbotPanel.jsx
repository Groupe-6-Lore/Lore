import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Sparkles, BookOpen, Settings } from 'lucide-react';
import aiService from '../services/aiService';

const ChatbotPanel = ({ campaign, universe, rules }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('ChatbotPanel rendu, isOpen:', isOpen);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const panelRef = useRef(null);

  // Initialiser le service IA avec le contexte et les messages
  useEffect(() => {
    if (campaign && universe && rules) {
      aiService.initializeContext(campaign, universe, rules);
    }
    
    // Générer des exemples dynamiques selon l'univers et les règles
    const universeName = campaign?.univers?.nom || universe?.nom || 'l\'univers';
    const rulesName = campaign?.regles?.nom || rules?.nom || 'le système';
    
    // Générer des exemples sur le lore et les règles
    const dynamicSuggestions = [
      { text: `Lore de ${universeName}`, icon: '📚' },
      { text: `Règles de ${rulesName}`, icon: '⚔️' },
      { text: `Histoire de ${universeName}`, icon: '🏰' },
      { text: `Magie de ${rulesName}`, icon: '✨' }
    ];
    
    setMessages([{
      id: 1,
      type: 'ai',
      content: `Bonjour ! Je suis Lore IA, votre assistant pour les questions sur ${universeName} et ${rulesName}.\n\nVoici quelques exemples de ce que je peux faire :`,
      timestamp: new Date(),
      suggestions: dynamicSuggestions
    }]);
  }, [campaign, universe, rules]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gérer les clics extérieurs pour fermer le panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

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

  const handleSourceClick = (source) => {
    // Ouvrir le modal Sources et naviguer vers la bonne page
    console.log('Source cliquée:', source);
    
    // Créer un événement personnalisé pour ouvrir le modal Sources avec navigation
    const event = new CustomEvent('openSourcesWithNavigation', {
      detail: {
        sourceId: source.id,
        page: source.page || 1,
        sourceType: source.type,
        sourceTitle: source.title
      }
    });
    
    // Dispatcher l'événement pour que le composant parent puisse l'écouter
    window.dispatchEvent(event);
    
    // Fermer le chatbot après avoir ouvert les sources
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed -left-4 top-[100px] h-[800px] w-[100px] z-[9999]">
        <button
          onClick={() => {
            console.log('Bouton cliqué, toggle du chatbot');
            setIsOpen(!isOpen);
          }}
          className="w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 group"
        >
          <img 
            src="/images/templates/chatbot-tab-closed.svg" 
            alt="Lore IA - Chatbot fermé" 
            className="w-full h-full object-contain drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300"
            onLoad={() => console.log('Image chatbot fermé chargée:', '/images/templates/chatbot-tab-closed.svg')}
            onError={(e) => {
              console.error('Erreur chargement image chatbot fermé:', '/images/templates/chatbot-tab-closed.svg');
              // Fallback avec le design original
              e.target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-16 h-32 bg-gradient-to-br from-slate-600 to-slate-800 rounded-r-2xl shadow-2xl border border-slate-500/30 hover:from-slate-500 hover:to-slate-700 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer';
              fallback.innerHTML = `
                <div class="text-golden font-bold text-sm transform -rotate-90 tracking-wider shadow-lg">LORE IA</div>
                <svg class="text-golden mt-2 group-hover:scale-110 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              `;
              fallback.onclick = () => setIsOpen(true);
              e.target.parentNode.appendChild(fallback);
            }}
          />
        </button>
      </div>
    );
  }

  return (
    <div ref={panelRef} className="fixed -left-16 top-[100px] h-[800px] w-[550px] z-[9999]">
      {/* Fond avec image chatbot-tab-open.svg */}
      <div className="absolute inset-0">
        <img 
          src="/images/templates/chatbot-tab-open.svg" 
          alt="Chatbot panel background" 
          className="w-full h-full object-contain"
          onError={(e) => {
            console.error('Erreur chargement image chatbot ouvert:', '/images/templates/chatbot-tab-open.svg');
            // Fallback avec le design original
            e.target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-r-2xl';
            fallback.innerHTML = `
              <div class="absolute inset-0 opacity-20 rounded-r-2xl">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-800/20 rounded-r-2xl"></div>
                <div class="absolute inset-0 rounded-r-2xl" style="background-image: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(37, 99, 235, 0.05) 0%, transparent 50%); background-size: 200px 200px, 300px 300px, 150px 150px;"></div>
              </div>
              <div class="absolute inset-0 border-2 border-golden/30 rounded-r-2xl">
                <div class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                  <div class="text-golden/30 text-lg font-mono transform -rotate-90">ᚨᛒᚲᛞᛖᚠᚷᚺ</div>
                </div>
                <div class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                  <div class="text-golden/30 text-lg font-mono transform rotate-90">ᚨᛒᚲᛞᛖᚠᚷᚺ</div>
                </div>
              </div>
            `;
            e.target.parentNode.appendChild(fallback);
          }}
          onLoad={() => console.log('Image chatbot ouvert chargée:', '/images/templates/chatbot-tab-open.svg')}
        />
      </div>

      {/* Contenu du panel - Style Templates */}
      <div className="absolute inset-0 z-10 p-6 pt-14 pb-4 overflow-hidden flex flex-col">
        {/* Bouton fermer aligné avec le titre */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-12 right-24 w-6 h-6 transition-colors z-20 flex items-center justify-center"
          style={{color: '#E9BD72'}}
        >
          <X size={16} />
        </button>
        
        {/* Header simple - Style Templates */}
        <div className="flex-shrink-0 mb-8 pl-16">
          <h2 className="font-bold text-2xl eagle-lake-font mb-2" style={{color: '#E9BD72'}}>LORE IA</h2>
          <div className="flex items-center space-x-4 text-sm" style={{color: '#E9BD72'}}>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Univers:</span>
              <span className="font-semibold">{campaign?.univers?.nom || universe?.nom || 'Non sélectionné'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Système:</span>
              <span className="font-semibold">{campaign?.regles?.nom || rules?.nom || 'Non sélectionné'}</span>
            </div>
          </div>
        </div>

        {/* Zone de messages - Style Templates */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-3 pl-16 pr-16">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end pr-12' : 'justify-start'}`}
            >
              <div className={`${message.type === 'user' ? 'max-w-[70%]' : 'max-w-[75%]'} ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-[#46718A] to-[#2C4A5B]' 
                      : 'bg-gradient-to-br from-golden to-[#B8941F]'
                  }`}>
                    {message.type === 'user' ? (
                      <span className="text-white text-xs font-bold">U</span>
                    ) : (
                      <Sparkles size={12} style={{color: '#E9BD72'}} />
                    )}
                  </div>
                  
                  {/* Message */}
                  <div className={`rounded-lg px-3 py-2 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-[#46718A] text-white border border-[#46718A]/30'
                      : 'border border-gray-300/30'
                  }`} style={{
                    backgroundColor: message.type === 'user' ? undefined : 'rgb(209 213 219)',
                    color: message.type === 'user' ? undefined : 'black'
                  }}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                    
                    {/* Suggestions d'actions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInputValue(suggestion.text)}
                            className="w-full text-left p-2 bg-[#F0EAE1]/50 hover:bg-[#F0EAE1]/70 border border-[#552E1A]/20 rounded-md transition-colors text-xs text-[#552E1A] hover:border-golden/50"
                          >
                            <span className="mr-2">{suggestion.icon}</span>
                            {suggestion.text}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Sources avec liens vers les PDFs */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-current/20">
                        <div className="text-xs opacity-70 mb-1">Sources utilisées :</div>
                        <div className="space-y-1">
                          {message.sources.slice(0, 3).map((source, index) => (
                            <button
                              key={index}
                              onClick={() => handleSourceClick(source)}
                              className="text-xs opacity-80 hover:opacity-100 transition-opacity block text-left hover:underline"
                            >
                              • {source.title} ({source.type})
                              {source.page && ` - Page ${source.page}`}
                            </button>
                          ))}
                          {message.sources.length > 3 && (
                            <div className="text-xs opacity-60">
                              ... et {message.sources.length - 3} autres sources
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Timestamp */}
                <div className={`text-xs text-[#552E1A]/50 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Indicateur de chargement - Style Lore */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-golden to-[#B8941F] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Sparkles className="text-white" size={12} />
                </div>
                <div className="bg-[#F0EAE1] text-[#552E1A] border border-[#552E1A]/30 rounded-lg px-3 py-2 flex items-center space-x-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-golden/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-golden/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-golden/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm font-medium">Lore IA réfléchit...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie - Style Templates */}
        <div className="flex-shrink-0 pl-16 mt-8 mb-16">
          <div className="relative w-3/4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Posez votre question"
              className="w-full bg-[#F0EAE1] border border-[#552E1A]/30 rounded-lg px-3 py-2 pr-10 text-[#552E1A] placeholder-[#552E1A]/50 focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20 resize-none shadow-sm transition-all duration-200 overflow-hidden"
              rows="1"
              disabled={isLoading}
              style={{
                minHeight: '40px',
                maxHeight: '200px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#E9BD72';
                e.target.style.boxShadow = '0 0 0 1px #E9BD72';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(85, 46, 26, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                inputValue.trim() && !isLoading
                  ? 'bg-[#E9BD72] hover:bg-[#D4AF37] text-white shadow-md hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPanel;
