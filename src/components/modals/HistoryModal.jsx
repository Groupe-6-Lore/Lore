import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryModal = ({ isOpen, onClose, sessions = [] }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  // Utiliser les vraies sessions ou des données d'exemple si aucune session
  const gameHistory = sessions.length > 0 ? sessions.map(session => ({
    id: session.id,
    date: session.date,
    title: session.title
  })) : [
    // Données d'exemple si aucune session
    { id: 1, date: '15/01/2025', title: 'Les Gardiens de la Flamme Éternelle' },
    { id: 2, date: '08/01/2025', title: "La Relique d'Émeraude" },
    { id: 3, date: '28/12/2024', title: 'La Tombe Oubliée' },
    { id: 4, date: '20/12/2024', title: 'Le Pacte des Ombres' },
    { id: 5, date: '12/12/2024', title: 'La Forteresse de Givre' }
  ];

  const handleTitleClick = (game) => {
    // Navigation vers la session si c'est une session, sinon vers la campagne
    if (game.id.toString().startsWith('session-')) {
      // C'est une session, naviguer vers le dashboard de session
      const campaignId = 'default-campaign'; // Ou récupérer depuis les données de session
      navigate(`/campaigns/${campaignId}/session/${game.id}`);
    } else {
      // C'est une campagne normale
      navigate(`/campaigns/${game.id}`);
    }
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-[#f7f1e5] text-[#1a1a1a] w-full max-w-md mx-4 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[rgba(255,255,255,0.6)]">
          <h3 className="text-xl font-semibold" style={{ fontFamily: 'serif' }}>
            Historique de vos parties
          </h3>
          <button 
            onClick={onClose} 
            className="text-black/60 hover:text-black transition-colors text-xl"
          >
            ×
          </button>
        </div>

        {/* Liste des parties */}
        <div className="max-h-96 overflow-y-auto">
          <div className="px-6 py-4 space-y-3">
            {gameHistory.map((game) => (
              <div
                key={game.id}
                className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-black/5 cursor-pointer transition-colors"
              >
                <span className="text-sm text-gray-700 font-mono min-w-[80px]">
                  {game.date}
                </span>
                <button
                  onClick={() => handleTitleClick(game)}
                  className="text-sm text-golden hover:text-golden/80 text-left flex-1"
                >
                  {game.title}
                </button>
              </div>
            ))}
          </div>
          
          {/* Zone vide en bas */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;


