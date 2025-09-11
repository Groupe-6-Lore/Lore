import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, Plus, Users, UserPlus, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

const CampaignSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newCharacterName, setNewCharacterName] = useState('');

  // Données par défaut si pas de campagnes
  const defaultCampaign = {
    id: 'default-campaign',
    title: 'Les Échos de Nerath',
    game_system: 'Donjons & Dragons 5e',
    universe: 'Les Royaumes Fragmentés',
    resume: `Dans un monde où les anciens royaumes se sont effondrés sous le poids de guerres fratricides, seules subsistent des cités-états isolées, reliées par des routes dangereuses et des alliances fragiles. 

Les Royaumes Fragmentés portent les cicatrices d'une ère glorieuse révolue : ruines de tours de mages, forteresses abandonnées et temples désacralisés parsèment un paysage déchiré. Au cœur de ce chaos, une menace ancestrale se réveille dans les Profondeurs Oubliées.

Autrefois emprisonné par un pacte entre les royaumes unis, un fléau immémorial ronge les fondations mêmes de la réalité. Aujourd'hui, son sceau se fissure, libérant des légions corrompues qui avancent de ruine en ruine. Les héros devront rassembler des alliances fragiles, explorer des forteresses oubliées et défier des adversaires dont le nom seul fait trembler les bardes.

Chaque choix renforcera ou brisera le destin des Royaumes Fragmentés : les serments trahis forgeront l'histoire, et le sang versé nourrira l'aube incertaine d'une nouvelle ère.`,
    players: [
      { id: '1', name: 'Alexis', character_name: 'Theron Lameacier', status: 'active' },
      { id: '2', name: 'Marine', character_name: 'Lyralei Ventargent', status: 'active' },
      { id: '3', name: 'Thomas', character_name: 'Kael le Vagabond', status: 'active' },
      { id: '4', name: 'Sophie', character_name: 'Zara Ombreflame', status: 'active' }
    ]
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          players (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active');
      
      if (error) throw error;
      
      // Si pas de campagnes, utilise la campagne par défaut
      setCampaigns(data?.length ? data : [defaultCampaign]);
    } catch (error) {
      console.error('Erreur récupération campagnes:', error);
      // En cas d'erreur, affiche la campagne par défaut
      setCampaigns([defaultCampaign]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns/create');
  };

  const handleAccessCampaign = (campaignId) => {
    if (campaignId === 'default-campaign') {
      toast.success('Redirection vers le dashboard de campagne...');
      // Simule la navigation pour la demo
      setTimeout(() => {
        navigate('/campaigns/default-campaign/dashboard');
      }, 1000);
    } else {
      navigate(`/campaigns/${campaignId}/dashboard`);
    }
  };

  const handleNavigateToSystem = (system) => {
    navigate('/systems', { state: { selectedSystem: system } });
  };

  const handleNavigateToUniverse = (universe) => {
    navigate('/universes', { state: { selectedUniverse: universe } });
  };

  const handleAddPlayer = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setShowAddPlayerModal(true);
  };

  const handleSavePlayer = async () => {
    if (!newPlayerName.trim()) {
      toast.error('Le nom du joueur est requis');
      return;
    }

    try {
      if (selectedCampaignId === 'default-campaign') {
        // Pour la campagne par défaut, simule l'ajout
        toast.success(`Joueur ${newPlayerName} ajouté à la campagne !`);
      } else {
        // Pour les vraies campagnes, utilise Supabase
        const { error } = await supabase
          .from('players')
          .insert({
            campaign_id: selectedCampaignId,
            name: newPlayerName,
            character_name: newCharacterName || null,
            status: 'active'
          });

        if (error) throw error;
        toast.success('Joueur ajouté avec succès !');
        fetchCampaigns(); // Rafraîchit la liste
      }

      // Reset modal
      setShowAddPlayerModal(false);
      setNewPlayerName('');
      setNewCharacterName('');
      setSelectedCampaignId(null);
    } catch (error) {
      console.error('Erreur ajout joueur:', error);
      toast.error('Erreur lors de l\'ajout du joueur');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-light text-xl">Chargement de vos campagnes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore fixe */}
      <header className="flex items-center justify-between p-6 bg-primary-blue border-b border-light/10">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-6">
          {/* Bouton News hexagonal vert */}
          <div className="relative">
            <div className="w-12 h-12 bg-green-500 transform rotate-45 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm transform -rotate-45">NEWS</span>
            </div>
          </div>
          
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Titre principal avec soulignement doré */}
      <div className="px-6 pt-8 pb-6">
        <h2 className="text-3xl font-bold text-light eagle-lake-font border-b-2 border-golden pb-2 inline-block">
          Mes campagnes
        </h2>
      </div>

      {/* Contenu principal - Cartes de campagnes */}
      <div className="px-6 pb-8">
        {campaigns.length === 0 ? (
          <div className="text-center text-light py-16">
            <h3 className="text-xl mb-4">Aucune campagne pour le moment</h3>
            <p className="text-light/70 mb-8">Créez votre première campagne pour commencer l'aventure !</p>
          </div>
        ) : (
          <div className="space-y-6">
            {campaigns.map((campaign) => {
              const activePlayers = campaign.players?.filter(p => p.status === 'active') || [];
              
              return (
                <div key={campaign.id} className="bg-light/15 backdrop-blur-sm rounded-2xl p-8 border border-light/20 shadow-xl">
                  
                  {/* Header avec breadcrumbs + bouton accès */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-light/80 text-sm">
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
                      className="bg-golden hover:bg-golden/80 text-dark px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      Accéder à la campagne
                    </button>
                  </div>

                  {/* Titre de la campagne */}
                  <h3 className="text-4xl font-bold text-golden mb-8 italic eagle-lake-font">
                    {campaign.title}
                  </h3>

                  {/* Layout : Résumé (2/3) + Joueurs (1/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Résumé à gauche (2/3) */}
                    <div className="lg:col-span-2">
                      <h4 className="text-light font-bold mb-4 italic text-xl eagle-lake-font">Résumé</h4>
                      <div className="text-light/90 text-base leading-7 space-y-4">
                        {campaign.resume ? (
                          campaign.resume.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-justify">{paragraph}</p>
                          ))
                        ) : (
                          <p className="text-light/60 italic">Aucun résumé disponible pour cette campagne.</p>
                        )}
                      </div>
                    </div>

                    {/* Joueurs à droite (1/3) */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-light font-bold italic text-xl eagle-lake-font flex items-center">
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
                        {activePlayers.length === 0 ? (
                          <p className="text-light/60 text-sm italic">Aucun joueur pour le moment</p>
                        ) : (
                          activePlayers.slice(0, 4).map((player) => (
                            <div key={player.id} className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center text-dark text-lg font-bold shadow-lg">
                                {player.name[0]?.toUpperCase()}
                              </div>
                              <div>
                                <div className="text-light font-semibold text-base">{player.name}</div>
                                {player.character_name && (
                                  <div className="text-light/70 text-sm italic">{player.character_name}</div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                        
                        {activePlayers.length > 4 && (
                          <button 
                            onClick={() => handleAddPlayer(campaign.id)}
                            className="text-light/70 hover:text-light text-sm underline transition-colors"
                          >
                            Voir plus ({activePlayers.length - 4} autres)
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bouton Créer nouvelle campagne - Style horizontal */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreateCampaign}
            className="bg-light/15 hover:bg-light/25 border border-golden text-light px-8 py-4 rounded-lg font-bold transition-colors flex items-center space-x-3"
          >
            <Plus size={24} className="text-golden" />
            <span>Créer une nouvelle campagne</span>
          </button>
        </div>
      </div>

      {/* Modale Ajout Joueur */}
      {showAddPlayerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary-blue border border-golden rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-light eagle-lake-font">Ajouter un joueur</h3>
              <button 
                onClick={() => setShowAddPlayerModal(false)}
                className="text-light/70 hover:text-light"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-light text-sm font-bold mb-2">
                  Nom du joueur *
                </label>
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="w-full px-3 py-2 bg-light/15 border border-light/30 rounded text-light placeholder-light/50"
                  placeholder="Nom du joueur"
                />
              </div>
              
              <div>
                <label className="block text-light text-sm font-bold mb-2">
                  Nom du personnage
                </label>
                <input
                  type="text"
                  value={newCharacterName}
                  onChange={(e) => setNewCharacterName(e.target.value)}
                  className="w-full px-3 py-2 bg-light/15 border border-light/30 rounded text-light placeholder-light/50"
                  placeholder="Nom du personnage (optionnel)"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddPlayerModal(false)}
                className="flex-1 px-4 py-2 bg-light/15 text-light rounded hover:bg-light/25 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSavePlayer}
                className="flex-1 px-4 py-2 bg-golden text-dark rounded hover:bg-golden/80 transition-colors font-bold"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignSelection;