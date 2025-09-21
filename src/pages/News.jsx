import React, { useState } from 'react';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';
import PlayersModal from '../components/modals/PlayersModal';

const News = () => {
  // États pour les modals Sources et Joueurs
  const [showSources, setShowSources] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90">
      {/* Header unifié */}
      <Header 
        onSourcesClick={() => setShowSources(true)}
        onPlayersClick={() => setShowPlayers(true)}
      />
      
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center text-light">
          <h1 className="text-4xl font-bold eagle-lake-font mb-4">Actualités</h1>
          <p className="text-light/80">Page en cours de développement...</p>
        </div>
      </div>

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />

      {/* Modal Players */}
      <PlayersModal 
        isOpen={showPlayers} 
        onClose={() => setShowPlayers(false)}
        characterAssignments={{}}
        onRemoveAssignment={() => {}}
        campaignPlayers={[]}
        onUpdatePlayers={() => {}}
      />
    </div>
  );
};

export default News;




