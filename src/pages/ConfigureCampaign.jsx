import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';
import PlayersModal from '../components/modals/PlayersModal';

const ConfigureCampaign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedUniverse = location.state?.selectedUniverse;

  // États pour les modals Sources et Joueurs
  const [showSources, setShowSources] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header unifié */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigate('/campaigns/create/universe')}
        onSourcesClick={() => setShowSources(true)}
        onPlayersClick={() => setShowPlayers(true)}
      />
      
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-light text-2xl mb-4 eagle-lake-font">
            Configuration de la campagne
          </h1>
          {selectedUniverse && (
            <p className="text-light/80 mb-6 noto-sans-font">
              Univers sélectionné : {selectedUniverse.title}
            </p>
          )}
          <p className="text-light/80 mb-6 noto-sans-font">Configuration finale - Coming Soon</p>
          <button
            onClick={() => navigate('/campaigns/create/universe')}
            className="bg-golden text-dark px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors noto-sans-font"
          >
            Retour à la sélection
          </button>
        </div>
      </div>

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />

      {/* Modal Players */}
      <PlayersModal isOpen={showPlayers} onClose={() => setShowPlayers(false)} />
    </div>
  );
};

export default ConfigureCampaign;