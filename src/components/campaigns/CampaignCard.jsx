import React from 'react';
import { Users, UserPlus } from 'lucide-react';

const CampaignCard = ({ campaign, onAddPlayer, onAccessCampaign }) => {
  const activePlayers = campaign.players?.filter(p => p.status === 'active') || [];

  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      {/* Header avec système et univers */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/80 text-sm">
          <span>Système de jeu : {campaign.game_system}</span>
          <span className="mx-2">•</span>
          <span>Univers : {campaign.universe}</span>
        </div>
        <button
          onClick={onAccessCampaign}
          className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
        >
          Accéder à la campagne
        </button>
      </div>

      {/* Titre de la campagne */}
      <h3 className="text-3xl font-bold text-amber-300 mb-4 italic font-serif">
        {campaign.title}
      </h3>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Section Résumé (2/3 de l'espace) */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-semibold mb-3 italic text-lg font-serif">Résumé</h4>
          <div className="text-white/90 text-sm leading-relaxed space-y-3 text-justify">
            {campaign.resume ? (
              campaign.resume.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph}</p>
              ))
            ) : (
              <p className="text-white/60 italic">Aucun résumé disponible pour cette campagne.</p>
            )}
          </div>
        </div>

        {/* Section Joueurs (1/3 de l'espace) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold italic text-lg flex items-center font-serif">
              <Users size={20} className="mr-2" />
              Joueurs
            </h4>
            <button
              onClick={onAddPlayer}
              className="text-white/70 hover:text-white transition-colors"
              title="Ajouter un joueur"
            >
              <UserPlus size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            {activePlayers.length === 0 ? (
              <p className="text-white/60 text-sm italic">Aucun joueur pour le moment</p>
            ) : (
              activePlayers.map((player, index) => (
                <div key={player.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {player.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{player.name}</div>
                    {player.character_name && (
                      <div className="text-white/70 text-xs">{player.character_name}</div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {activePlayers.length > 0 && activePlayers.length < 6 && (
              <button
                onClick={onAddPlayer}
                className="text-white/70 hover:text-white text-sm underline transition-colors"
              >
                Voir plus
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;