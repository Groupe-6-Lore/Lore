import React from 'react';
import { X } from 'lucide-react';

const HistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Données d'exemple pour l'historique des parties
  const gameHistory = [
    { id: 1, date: '01 / 01 / 23', title: 'Titre de la partie' },
    { id: 2, date: '15 / 12 / 22', title: 'Titre de la partie' },
    { id: 3, date: '28 / 11 / 22', title: 'Titre de la partie' },
    { id: 4, date: '10 / 11 / 22', title: 'Titre de la partie' },
    { id: 5, date: '25 / 10 / 22', title: 'Titre de la partie' },
    { id: 6, date: '08 / 10 / 22', title: 'Titre de la partie' },
    { id: 7, date: '20 / 09 / 22', title: 'Titre de la partie' },
    { id: 8, date: '05 / 09 / 22', title: 'Titre de la partie' },
    { id: 9, date: '18 / 08 / 22', title: 'Titre de la partie' },
    { id: 10, date: '02 / 08 / 22', title: 'Titre de la partie' }
  ];

  const handleGameClick = (game) => {
    // Fonctionnalité future : navigation vers le détail de la partie
    console.log('Clic sur la partie:', game);
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
                onClick={() => handleGameClick(game)}
                className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-black/5 cursor-pointer transition-colors"
              >
                <span className="text-sm text-gray-700 font-mono min-w-[80px]">
                  {game.date}
                </span>
                <span className="text-gray-400">...</span>
                <span className="text-sm text-gray-800 flex-1">
                  {game.title}
                </span>
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

