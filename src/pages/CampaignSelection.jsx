import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, Plus, Users, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCampaigns } from '../hooks/useCampaigns';
import AddPlayerModal from '../components/modals/AddPlayerModal';

const CampaignSelection = () => {
  const { user, signOut } = useAuth();
  const { campaigns, loading } = useCampaigns();
  const navigate = useNavigate();
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const handleAddPlayer = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setShowAddPlayerModal(true);
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns/create');
  };

  const handleAccessCampaign = (campaignId) => {
    navigate(`/campaigns/${campaignId}/dashboard`);
  };

  const handleNavigateToUniverse = (universe) => {
    navigate(`/universes/${universe.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleNavigateToSystem = (system) => {
    navigate(`/systems/${system.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleNavigateToPlayers = () => {
    navigate('/players');
  };

  const handleNavigateToSources = () => {
    navigate('/sources');
  };

  const handleNavigateToNews = () => {
    navigate('/news');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  const activePlayers = campaigns[0]?.players?.filter(p => p.status === 'active') || [];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* CSS pour le bouton dé 20 authentique */}
      <style jsx>{`
        .dice-d20 {
          width: 80px;
          height: 80px;
          position: relative;
          /* Forme d'icosaèdre (dé 20 faces) */
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.875rem;
          color: white;
          cursor: pointer;
          /* Optimisation des transitions pour de meilleures performances */
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          /* Ombre portée pour effet 3D */
          box-shadow: 
            0 8px 25px rgba(34, 197, 94, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
          /* Optimisation GPU pour les animations */
          will-change: transform, box-shadow;
          /* Amélioration de l'accessibilité */
          border: none;
          outline: none;
        }

        /* Reflet sur le dessus du dé */
        .dice-d20::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 70%);
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          pointer-events: none;
          border-radius: 50% 50% 0 0;
        }

        /* Ligne de lumière centrale */
        .dice-d20::after {
          content: '';
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, transparent 100%);
          border-radius: 1px;
          pointer-events: none;
        }

        /* Animations JDR au hover - Optimisées */
        .dice-d20:hover {
          /* Rotation légère comme un vrai dé qui roule */
          transform: rotate(12deg) scale(1.1);
          /* Ombre plus intense */
          box-shadow: 
            0 12px 35px rgba(34, 197, 94, 0.6),
            0 6px 18px rgba(0, 0, 0, 0.4),
            inset 0 3px 6px rgba(255, 255, 255, 0.3);
          /* Gradient plus brillant */
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #16a34a 100%);
        }

        /* Animation de rotation douce - Optimisée */
        .dice-d20:active {
          transform: rotate(-8deg) scale(1.05);
          transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Effet de pulse subtil */
        @keyframes d20-pulse {
          0%, 100% { 
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); 
          }
          50% { 
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.7); 
          }
        }

        .dice-d20:focus {
          animation: d20-pulse 2s infinite;
          outline: none;
        }

        /* Dé rouge (pour les alertes) */
        .dice-d20-red {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        /* Dé bleu (pour les infos) */
        .dice-d20-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        /* Dé doré (pour les récompenses) */
        .dice-d20-golden {
          background: linear-gradient(135deg, #E9BD72 0%, #d4a853 50%, #b8941f 100%);
          box-shadow: 0 8px 25px rgba(233, 189, 114, 0.4);
        }

        /* Ajustement pour le texte dans les dés */
        .dice-d20-text {
          font-size: 0.7rem;
          line-height: 1;
          text-align: center;
          word-break: break-word;
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
          .dice-d20 {
            width: 60px;
            height: 60px;
            font-size: 0.75rem;
          }
          
          .dice-d20-text {
            font-size: 0.6rem;
          }
          
          .dice-d20::before {
            width: 30px;
            height: 15px;
            top: 6px;
          }
          
          .dice-d20::after {
            height: 15px;
            top: 8px;
          }
        }
      `}</style>
      {/* Background identique à la page auth */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234A90E2;stop-opacity:1" /><stop offset="100%" style="stop-color:%236B73FF;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23bg)"/></svg>')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        {/* Logo */}
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        {/* Navigation droite */}
        <div className="flex items-center space-x-4">
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-white font-bold">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Section titre avec dés 20 */}
      <div className="relative z-10 px-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-light border-b-2 border-golden pb-1 inline-block eagle-lake-font">
            Mes campagnes
          </h2>
          
          {/* Dés 20 pour navigation */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Dé doré - Joueurs */}
            <div className="relative">
              <button 
                className="dice-d20 dice-d20-golden eagle-lake-font dice-d20-text"
                onClick={handleNavigateToPlayers}
                title="Gérer les joueurs"
                aria-label="Accéder à la gestion des joueurs"
                role="button"
                tabIndex={0}
              >
                Joueurs
              </button>
            </div>
            
            {/* Dé bleu - Sources */}
            <div className="relative">
              <button 
                className="dice-d20 dice-d20-blue eagle-lake-font dice-d20-text"
                onClick={handleNavigateToSources}
                title="Sources et références"
                aria-label="Accéder aux sources et références"
                role="button"
                tabIndex={0}
              >
                Sources
              </button>
            </div>
            
            {/* Dé vert - News */}
            <div className="relative">
              <button 
                className="dice-d20 eagle-lake-font"
                onClick={handleNavigateToNews}
                title="Actualités et nouveautés de Lore"
                aria-label="Accéder aux actualités et nouveautés"
                role="button"
                tabIndex={0}
              >
                News
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 px-6 space-y-6">
        {campaigns.length === 0 ? (
          <div className="text-center text-light py-16">
            <h3 className="text-xl mb-4">Aucune campagne pour le moment</h3>
            <p className="text-light/80 mb-8">Créez votre première campagne pour commencer l'aventure !</p>
            <button
              onClick={handleCreateCampaign}
              className="bg-gradient-to-r from-golden to-golden hover:bg-golden/90 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Créer ma première campagne
            </button>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-2xl">
              
              {/* Header avec système et univers */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-light/70 text-sm font-medium">
                  <span>Système de jeu : </span>
                  <button
                    onClick={() => handleNavigateToSystem(campaign.game_system)}
                    className="text-light hover:text-golden underline transition-colors"
                  >
                    {campaign.game_system}
                  </button>
                  <span className="mx-3 text-light/50">•</span>
                  <span>Univers : </span>
                  <button
                    onClick={() => handleNavigateToUniverse(campaign.universe)}
                    className="text-light hover:text-golden underline transition-colors"
                  >
                    {campaign.universe}
                  </button>
                </div>
                <button
                  onClick={() => handleAccessCampaign(campaign.id)}
                  className="bg-gradient-to-r from-golden to-golden hover:bg-golden/90 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Accéder à la campagne
                </button>
              </div>

              {/* Titre de la campagne */}
              <h3 className="text-4xl font-bold text-golden mb-6 eagle-lake-font leading-tight">
                {campaign.title}
              </h3>

              {/* Contenu principal */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Section Résumé (2/3 de l'espace) */}
                <div className="lg:col-span-2">
                  <h4 className="text-light font-bold mb-4 calligraphy-font text-xl">Résumé</h4>
                  <div className="text-light-medium text-base leading-7 space-y-4 font-light">
                    {campaign.resume ? (
                      campaign.resume.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-justify">{paragraph}</p>
                      ))
                    ) : (
                      <p className="text-light/60 italic">Aucun résumé disponible pour cette campagne.</p>
                    )}
                  </div>
                </div>

                {/* Section Joueurs (1/3 de l'espace) */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-light font-bold calligraphy-font text-xl flex items-center">
                      <Users size={22} className="mr-2" />
                      Joueurs
                    </h4>
                    <button
                      onClick={() => handleAddPlayer(campaign.id)}
                      className="text-light/70 hover:text-light transition-colors"
                      title="Ajouter un joueur"
                    >
                      <UserPlus size={22} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {campaign.players?.filter(p => p.status === 'active').length === 0 ? (
                      <p className="text-light/60 text-sm italic">Aucun joueur pour le moment</p>
                    ) : (
                      campaign.players?.filter(p => p.status === 'active').map((player) => (
                        <div key={player.id} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-golden to-golden rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                            {player.name[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="text-light-high font-semibold text-base">{player.name}</div>
                            {player.character_name && (
                              <div className="text-light-low text-sm italic">{player.character_name}</div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    
                    {campaign.players?.filter(p => p.status === 'active').length > 0 && campaign.players?.filter(p => p.status === 'active').length >= 4 && (
                      <button className="text-light/70 hover:text-light text-sm underline transition-colors">
                        Voir plus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Bouton horizontal de création de campagne */}
        <div className="mt-8">
          <button
            onClick={handleCreateCampaign}
            className="w-full bg-gradient-to-r from-golden to-golden hover:bg-golden/90 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 shadow-xl"
          >
            <Plus size={24} />
            <span>Créer une nouvelle campagne</span>
          </button>
        </div>
      </div>

      {/* Modal d'ajout de joueur */}
      {showAddPlayerModal && (
        <AddPlayerModal
          campaignId={selectedCampaignId}
          onClose={() => {
            setShowAddPlayerModal(false);
            setSelectedCampaignId(null);
          }}
        />
      )}
    </div>
  );
};

export default CampaignSelection;