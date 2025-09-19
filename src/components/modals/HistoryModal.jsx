import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  // Données d'exemple pour l'historique des parties
  const baseHistory = [
    { id: 1, date: '01 / 01 / 23' },
    { id: 2, date: '15 / 12 / 22' },
    { id: 3, date: '28 / 11 / 22' },
    { id: 4, date: '10 / 11 / 22' },
    { id: 5, date: '25 / 10 / 22' },
    { id: 6, date: '08 / 10 / 22' },
    { id: 7, date: '20 / 09 / 22' },
    { id: 8, date: '05 / 09 / 22' },
    { id: 9, date: '18 / 08 / 22' },
    { id: 10, date: '02 / 08 / 22' }
  ];

  const sampleTitles = [
    "La Relique d'Émeraude",
    'La Tombe Oubliée',
    'Le Pacte des Ombres',
    'La Forteresse de Givre',
    'Les Sables du Temps',
    'Le Phare des Brumes',
    'Les Lames du Destin',
    'La Marche des Titans',
    'Le Voile Cramoisi',
    'L’Écho des Ruines'
  ];

  const formatDate = (raw) => {
    // Accepte des formats "dd / mm / yy" et renvoie "dd/mm/yyyy"
    const parts = raw.replaceAll(' ', '').split('/');
    if (parts.length !== 3) return raw;
    const [dd, mm, yy] = parts;
    const yyyy = yy.length === 2 ? `20${yy}` : yy;
    return `${dd}/${mm}/${yyyy}`;
  };

  const gameHistory = baseHistory.map((g, idx) => ({
    id: g.id,
    date: formatDate(g.date),
    title: sampleTitles[idx % sampleTitles.length]
  }));

  const handleTitleClick = (game) => {
    // Navigation vers le dashboard de la campagne sélectionnée
    navigate(`/campaigns/${game.id}`);
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


