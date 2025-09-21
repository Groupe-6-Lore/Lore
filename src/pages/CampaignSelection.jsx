import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, Plus, Users, UserPlus, X, Edit2, Save, X as XIcon, MoreVertical, Trash2, Archive } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';
import PlayersModal from '../components/modals/PlayersModal';

const CampaignSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newCharacterName, setNewCharacterName] = useState('');
  
  // États pour l'édition des campagnes
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editResume, setEditResume] = useState('');

  // États pour les modals Sources et Joueurs
  const [showSources, setShowSources] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  
  // États pour l'affichage des joueurs
  const [expandedCampaign, setExpandedCampaign] = useState(null);
  
  // États pour la synchronisation avec la modale joueurs
  const [globalCampaignPlayers, setGlobalCampaignPlayers] = useState([]);
  
  // État pour gérer les assignations de personnages aux joueurs (comme dans le dashboard)
  const [characterAssignments, setCharacterAssignments] = useState({
    '1': 'Elandra',
    '2': 'Thorin', 
    '3': 'Kael',
    '4': 'Seraphine'
  });
  
  // États pour l'assignation de personnages
  const [selectedPlayerForAssignment, setSelectedPlayerForAssignment] = useState(null);
  const [showCharacterAssignment, setShowCharacterAssignment] = useState(false);
  
  // États pour le menu contextuel des campagnes
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [showPlayerSelection, setShowPlayerSelection] = useState(false);
  const [selectedCampaignForPlayer, setSelectedCampaignForPlayer] = useState(null);

  // Liste des joueurs disponibles pour l'ajout (même que dans PlayersModal)
  const availablePlayers = [
    { id: 'f1', name: 'Diane', initials: 'D', image: '/images/players/diane.jpg' },
    { id: 'f2', name: 'Maxime', initials: 'M', image: '/images/players/maxime.jpg' },
    { id: 'f3', name: 'Justine', initials: 'J', image: '/images/players/justine.jpg' },
    { id: 'f4', name: 'Jean', initials: 'J', image: '/images/players/jean.jpg' },
  ];

  // Liste des personnages disponibles pour l'assignation (basée sur les personnages du TemplatePanel)
  const availableCharacters = [
    { id: 'char-1', name: 'Elandra', level: '5', class: 'Mage' },
    { id: 'char-2', name: 'Thorin', level: '4', class: 'Guerrier' },
    { id: 'char-3', name: 'Lyra', level: '3', class: 'Rôdeuse' },
    { id: 'char-4', name: 'Merric', level: '2', class: 'Voleur' },
    { id: 'char-5', name: 'Seraphine', level: '6', class: 'Clerc' },
    { id: 'char-6', name: 'Korgan', level: '5', class: 'Barbare' },
    { id: 'char-7', name: 'Alistair', level: '4', class: 'Paladin' },
    { id: 'char-8', name: 'Nymeria', level: '3', class: 'Druide' },
    { id: 'char-9', name: 'Vargash', level: '7', class: 'Sorcier' },
    { id: 'char-10', name: 'Kael', level: '4', class: 'Barde' },
    { id: 'char-11', name: 'Oona', level: '3', class: 'Moine' },
    { id: 'char-12', name: 'Darius', level: '5', class: 'Rôdeur' }
  ];

  // Synchroniser les joueurs globaux pour la modale (somme de tous les joueurs de toutes les campagnes)
  useEffect(() => {
    const allPlayers = [];
    campaigns.forEach(campaign => {
      campaign.players.forEach(player => {
        // Éviter les doublons en vérifiant si le joueur existe déjà
        if (!allPlayers.find(p => p.id === player.id)) {
          allPlayers.push({
            id: player.id,
            name: player.name,
            character: player.character_name,
            initials: player.name[0]?.toUpperCase() || '?',
            playerImage: `/images/players/${player.name.toLowerCase()}.jpg`,
            characterImage: player.character_name ? `/images/characters/${player.character_name.toLowerCase().replace(/\s+/g, '')}.jpg` : null,
            status: player.status
          });
        }
      });
    });
    setGlobalCampaignPlayers(allPlayers);
    
    // Sauvegarder les campagnes dans localStorage pour la persistance
    localStorage.setItem('allCampaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Données par défaut si pas de campagnes
  const defaultCampaign = {
    id: 'default-campaign',
    title: 'Les Gardiens de la Flamme Éternelle',
    game_system: 'Donjons & Dragons 5e',
    universe: 'Les Royaumes Fragmentés',
    resume: `Dans un monde où les anciens royaumes se sont effondrés sous le poids de guerres fratricides, seules subsistent des cités-états isolées, reliées par des routes dangereuses et des alliances fragiles. 

Les Royaumes Fragmentés portent les cicatrices d'une ère glorieuse révolue : ruines de tours de mages, forteresses abandonnées et temples désacralisés parsèment un paysage déchiré. Au cœur de ce chaos, une menace ancestrale se réveille dans les Profondeurs Oubliées.

Autrefois emprisonné par un pacte entre les royaumes unis, un fléau immémorial ronge les fondations mêmes de la réalité. Aujourd'hui, son sceau se fissure, libérant des légions corrompues qui avancent de ruine en ruine. Les héros devront rassembler des alliances fragiles, explorer des forteresses oubliées et défier des adversaires dont le nom seul fait trembler les bardes.

Chaque choix renforcera ou brisera le destin des Royaumes Fragmentés : les serments trahis forgeront l'histoire, et le sang versé nourrira l'aube incertaine d'une nouvelle ère.`,
    players: [
      { id: '1', name: 'Alexis', character_name: 'Elandra', status: 'active' },
      { id: '2', name: 'Marine', character_name: 'Thorin', status: 'active' },
      { id: '3', name: 'Thomas', character_name: 'Kael', status: 'active' },
      { id: '4', name: 'Sophie', character_name: 'Seraphine', status: 'active' }
    ]
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  // Recharger les campagnes quand la page devient active
  useEffect(() => {
    const handleFocus = () => {
      fetchCampaigns();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchCampaigns = async () => {
    try {
      if (!user) return;
      
      // Mode démo : récupérer les campagnes du localStorage
      const demoCampaigns = JSON.parse(localStorage.getItem('demoCampaigns') || '[]');
      const savedCampaigns = JSON.parse(localStorage.getItem('allCampaigns') || '[]');
      
      // Utiliser les campagnes sauvegardées si disponibles, sinon utiliser les démo
      const allCampaigns = savedCampaigns.length > 0 ? savedCampaigns : [defaultCampaign, ...demoCampaigns];
      
      setCampaigns(allCampaigns);
    } catch (error) {
      console.error('Erreur récupération campagnes:', error);
      // En cas d'erreur, affiche la campagne par défaut
      setCampaigns([defaultCampaign]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    // Nettoyer le sessionStorage avant de naviguer
    sessionStorage.removeItem('selectedUniverse');
    sessionStorage.removeItem('selectedRules');
    sessionStorage.removeItem('campaignTotalPrice');
    sessionStorage.removeItem('campaignData');
    navigate('/campaigns/create');
  };

  const handleAccessCampaign = (campaignId) => {
    console.log('Navigating to campaign:', campaignId);
    
    // Trouver la campagne spécifique
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      // Passer les données de la campagne au dashboard
      const campaignData = {
        id: campaign.id,
        title: campaign.title,
        game_system: campaign.game_system,
        universe: campaign.universe,
        resume: campaign.resume,
        players: campaign.players,
        // Autres données nécessaires
      };
      
      // Stocker les données dans sessionStorage pour le dashboard
      sessionStorage.setItem('campaignData', JSON.stringify(campaignData));
      toast.success('Redirection vers le dashboard de campagne...');
      navigate(`/campaigns/${campaignId}`);
    } else {
      toast.error('Campagne non trouvée');
    }
  };

  const handleNavigateToSystem = (system) => {
    navigate('/systems', { state: { selectedSystem: system } });
  };

  const handleNavigateToUniverse = (universe) => {
    navigate('/universes', { state: { selectedUniverse: universe } });
  };

  const handleAddPlayer = (campaignId) => {
    console.log('=== AJOUT DE JOUEUR ===');
    console.log('Campaign ID:', campaignId);
    console.log('availablePlayers:', availablePlayers);
    
    // Ouvrir la sélection de joueurs depuis la modale header
    setSelectedCampaignForPlayer(campaignId);
    setShowPlayerSelection(true);
    setShowPlayers(true); // Ouvrir la modale PlayersModal
    
    console.log('Modale ouverte avec showPlayerSelection = true');
  };

  const handleSelectPlayer = (campaignId, player) => {
    // Ajouter le joueur à la campagne spécifique
    const newPlayerId = `invited-${Date.now()}`;
    const newPlayer = {
      id: newPlayerId,
      name: player.name,
      character_name: null,
      status: 'active'
    };
    
    // Mettre à jour la campagne spécifique
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          players: [...campaign.players, newPlayer]
        };
      }
      return campaign;
    }));
    
    toast.success(`Joueur ${player.name} ajouté à la campagne !`);
  };

  const handleSelectPlayerFromModal = (player) => {
    console.log('=== SÉLECTION DE JOUEUR ===');
    console.log('Player sélectionné:', player);
    console.log('Campaign cible:', selectedCampaignForPlayer);
    
    if (selectedCampaignForPlayer) {
      handleSelectPlayer(selectedCampaignForPlayer, player);
      setShowPlayerSelection(false);
      setSelectedCampaignForPlayer(null);
      setShowPlayers(false); // Fermer la modale PlayersModal
      console.log('Joueur ajouté et modale fermée');
    } else {
      console.error('Aucune campagne sélectionnée pour ajouter le joueur');
    }
  };


  const handleToggleExpanded = (campaignId) => {
    setExpandedCampaign(expandedCampaign === campaignId ? null : campaignId);
  };

  const handleRemovePlayer = (playerId, campaignId) => {
    // Supprimer le joueur de la campagne spécifique
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          players: campaign.players.filter(player => player.id !== playerId)
        };
      }
      return campaign;
    }));
    
    // Supprimer aussi l'assignation si elle existe
    setCharacterAssignments(prev => {
      const newAssignments = { ...prev };
      delete newAssignments[playerId];
      return newAssignments;
    });
    
    toast.success('Joueur supprimé de la campagne !');
  };

  const handleAssignCharacter = (playerId, characterName, campaignId) => {
    // Mettre à jour l'assignation de personnage
    setCharacterAssignments(prev => ({
      ...prev,
      [playerId]: characterName
    }));
    
    // Mettre à jour le joueur dans la campagne spécifique
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          players: campaign.players.map(player => 
            player.id === playerId 
              ? { ...player, character_name: characterName }
              : player
          )
        };
      }
      return campaign;
    }));
    
    toast.success(`Personnage "${characterName}" assigné au joueur !`);
  };

  const handleStartCharacterAssignment = (player) => {
    setSelectedPlayerForAssignment(player);
    setShowCharacterAssignment(true);
  };

  const handleCompleteCharacterAssignment = (characterName, campaignId) => {
    if (selectedPlayerForAssignment && characterName) {
      handleAssignCharacter(selectedPlayerForAssignment.id, characterName, campaignId);
      setShowCharacterAssignment(false);
      setSelectedPlayerForAssignment(null);
    }
  };

  const handleContextMenu = (e, campaignId) => {
    console.log('=== OUVERTURE MENU CONTEXTUEL ===');
    console.log('Campaign ID:', campaignId);
    console.log('Type:', typeof campaignId);
    console.log('Position:', { x: e.clientX, y: e.clientY });
    
    e.preventDefault();
    e.stopPropagation();
    setShowContextMenu(campaignId);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    
    console.log('Menu contextuel ouvert pour:', campaignId);
  };

  const handleDeleteCampaign = (campaignId) => {
    console.log('=== DÉBUT SUPPRESSION ===');
    console.log('ID de campagne à supprimer:', campaignId);
    
    // Vérifier si la campagne existe
    const campaign = campaigns.find(c => c.id === campaignId);
    console.log('Campagne trouvée:', campaign);
    
    if (!campaign) {
      console.error('Campagne non trouvée avec l\'ID:', campaignId);
      toast.error('Campagne non trouvée !');
      setShowContextMenu(null);
      return;
    }
    
    // Fermer le menu contextuel et afficher le toast de confirmation
    setShowContextMenu(null);
    setCampaignToDelete(campaign);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteCampaign = () => {
    if (!campaignToDelete) return;
    
    console.log('Confirmation reçue, suppression en cours...');
    
    setCampaigns(prev => {
      console.log('État précédent:', prev);
      const newCampaigns = prev.filter(campaign => campaign.id !== campaignToDelete.id);
      console.log('Nouvel état:', newCampaigns);
      return newCampaigns;
    });
    
    setShowDeleteConfirmation(false);
    setCampaignToDelete(null);
    toast.success('Campagne supprimée !');
    console.log('=== FIN SUPPRESSION ===');
  };

  const cancelDeleteCampaign = () => {
    console.log('Suppression annulée par l\'utilisateur');
    setShowDeleteConfirmation(false);
    setCampaignToDelete(null);
  };

  const handleArchiveCampaign = (campaignId) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, archived: !campaign.archived }
        : campaign
    ));
    setShowContextMenu(null);
    toast.success('Campagne archivée !');
  };

  const handleSavePlayer = async () => {
    if (!newPlayerName.trim()) {
      toast.error('Le nom du joueur est requis');
      return;
    }

    try {
      if (selectedCampaignId === 'default-campaign') {
        // Pour la campagne par défaut, simule l'ajout en mettant à jour l'état local
        const newPlayer = {
          id: Date.now().toString(),
          name: newPlayerName,
          character_name: newCharacterName || null,
          status: 'active'
        };
        
        // Mettre à jour la campagne par défaut avec le nouveau joueur
        setCampaigns(prev => prev.map(campaign => {
          if (campaign.id === 'default-campaign') {
            return {
              ...campaign,
              players: [...campaign.players, newPlayer]
            };
          }
          return campaign;
        }));
        
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

        if (error) {
          console.error('Erreur Supabase:', error);
          throw error;
        }
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
      toast.error(`Erreur lors de l'ajout du joueur: ${error.message || 'Erreur inconnue'}`);
    }
  };

  // Fonctions pour l'édition des campagnes
  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign.id);
    setEditTitle(campaign.title);
    setEditResume(campaign.resume || '');
  };

  const handleSaveCampaign = async () => {
    if (!editTitle.trim()) {
      toast.error('Le titre de la campagne est requis');
      return;
    }

    try {
      if (editingCampaign === 'default-campaign') {
        // Pour la campagne par défaut, simule la sauvegarde
        toast.success('Campagne mise à jour !');
      } else {
        // Pour les vraies campagnes, utilise Supabase
        const { error } = await supabase
          .from('campaigns')
          .update({
            title: editTitle.trim(),
            resume: editResume.trim()
          })
          .eq('id', editingCampaign);

        if (error) throw error;
        toast.success('Campagne mise à jour avec succès !');
        fetchCampaigns(); // Rafraîchit la liste
      }

      // Reset édition
      setEditingCampaign(null);
      setEditTitle('');
      setEditResume('');
    } catch (error) {
      console.error('Erreur mise à jour campagne:', error);
      toast.error('Erreur lors de la mise à jour de la campagne');
    }
  };

  const handleCancelEdit = () => {
    setEditingCampaign(null);
    setEditTitle('');
    setEditResume('');
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
      {/* Header unifié */}
      <Header 
        onSourcesClick={() => setShowSources(true)}
        onPlayersClick={() => setShowPlayers(true)}
      />

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
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAccessCampaign(campaign.id)}
                        className="bg-golden hover:bg-golden/80 text-dark px-6 py-3 rounded-lg font-bold transition-colors"
                      >
                        Accéder à la campagne
                      </button>
                      <button
                        onClick={(e) => handleContextMenu(e, campaign.id)}
                        className="text-light/70 hover:text-light p-2 hover:bg-light/10 rounded-lg transition-colors"
                        title="Options de la campagne"
                      >
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Titre de la campagne - Éditable */}
                  <div className="mb-8">
                    {editingCampaign === campaign.id ? (
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="text-4xl font-bold text-golden italic eagle-lake-font bg-transparent border-b-2 border-golden/50 focus:border-golden outline-none w-full"
                          placeholder="Titre de la campagne"
                        />
                        <button
                          onClick={handleSaveCampaign}
                          className="text-golden hover:text-light transition-colors"
                          title="Sauvegarder"
                        >
                          <Save size={24} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-light/70 hover:text-light transition-colors"
                          title="Annuler"
                        >
                          <XIcon size={24} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <h3 className="text-4xl font-bold text-golden italic eagle-lake-font">
                          {campaign.title}
                        </h3>
                        <button
                          onClick={() => handleEditCampaign(campaign)}
                          className="text-light/50 hover:text-golden transition-colors"
                          title="Modifier le titre et le résumé"
                        >
                          <Edit2 size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Layout : Résumé (2/3) + Joueurs (1/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Résumé à gauche (2/3) */}
                    <div className="lg:col-span-2">
                      <h4 className="text-light font-bold mb-4 italic text-xl eagle-lake-font">Résumé</h4>
                      {editingCampaign === campaign.id ? (
                        <textarea
                          value={editResume}
                          onChange={(e) => setEditResume(e.target.value)}
                          className="w-full h-64 bg-light/10 border border-light/20 rounded-lg p-4 text-black text-base leading-7 resize-none focus:border-golden focus:outline-none"
                          placeholder="Décrivez votre campagne, son univers, ses enjeux, ses personnages principaux..."
                        />
                      ) : (
                        <div className="text-light/90 text-base leading-7 space-y-4">
                          {campaign.resume ? (
                            campaign.resume.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="text-justify">{paragraph}</p>
                            ))
                          ) : (
                            <p className="text-light/60 italic">Aucun résumé disponible pour cette campagne.</p>
                          )}
                        </div>
                      )}
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
                            <div key={player.id} className="flex items-center justify-between space-x-4">
                              <div className="flex items-center space-x-4">
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
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleStartCharacterAssignment(player)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                                  title="Assigner un personnage"
                                >
                                  👤
                                </button>
                                <button
                                  onClick={() => handleRemovePlayer(player.id, campaign.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                                  title="Supprimer le joueur"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                        
                        {activePlayers.length > 4 && (
                          <button 
                            onClick={() => handleToggleExpanded(campaign.id)}
                            className="text-light/70 hover:text-light text-sm underline transition-colors"
                          >
                            {expandedCampaign === campaign.id ? 'Voir moins' : `Voir plus (${activePlayers.length - 4} autres)`}
                          </button>
                        )}
                        
                        {/* Affichage des joueurs supplémentaires */}
                        {expandedCampaign === campaign.id && activePlayers.length > 4 && (
                          <div className="mt-4 space-y-3">
                            {activePlayers.slice(4).map((player) => (
                              <div key={player.id} className="flex items-center justify-between space-x-4">
                                <div className="flex items-center space-x-4">
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
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleStartCharacterAssignment(player)}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                                    title="Assigner un personnage"
                                  >
                                    👤
                                  </button>
                                  <button
                                    onClick={() => handleRemovePlayer(player.id, campaign.id)}
                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                    title="Supprimer le joueur"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        
                        {/* Interface d'assignation de personnage */}
                        {showCharacterAssignment && selectedPlayerForAssignment && (
                          <div className="mt-4 p-4 bg-dark/20 border border-light/20 rounded-lg">
                            <h4 className="text-light font-semibold mb-3">
                              Assigner un personnage à {selectedPlayerForAssignment.name}
                            </h4>
                            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                              {availableCharacters.map((character) => (
                                <button
                                  key={character.id}
                                  onClick={() => handleCompleteCharacterAssignment(character.name, campaign.id)}
                                  className="p-3 text-sm bg-light/10 hover:bg-light/20 rounded text-light transition-colors text-left"
                                >
                                  <div className="font-medium">{character.name}</div>
                                  <div className="text-xs text-light/70">Niveau {character.level} • {character.class}</div>
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                setShowCharacterAssignment(false);
                                setSelectedPlayerForAssignment(null);
                              }}
                              className="mt-3 text-light/70 hover:text-light text-sm underline"
                            >
                              Annuler
                            </button>
                          </div>
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
                  className="w-full px-3 py-2 bg-light/15 border border-light/30 rounded text-black placeholder-light/50"
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
                  className="w-full px-3 py-2 bg-light/15 border border-light/30 rounded text-black placeholder-light/50"
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

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />

      {/* Modal Players */}
        <PlayersModal 
          isOpen={showPlayers} 
          onClose={() => setShowPlayers(false)}
          characterAssignments={characterAssignments}
          onRemoveAssignment={(playerId) => {
            setCharacterAssignments(prev => {
              const newAssignments = { ...prev };
              delete newAssignments[playerId];
              return newAssignments;
            });
          }}
          campaignPlayers={globalCampaignPlayers}
          onUpdatePlayers={setGlobalCampaignPlayers}
          onUpdateAssignments={setCharacterAssignments}
          onRemovePlayer={(playerId) => {
            // Supprimer le joueur des joueurs globaux
            setGlobalCampaignPlayers(prev => prev.filter(player => player.id !== playerId));
            
            // Supprimer aussi l'assignation si elle existe
            setCharacterAssignments(prev => {
              const newAssignments = { ...prev };
              delete newAssignments[playerId];
              return newAssignments;
            });
          }}
          // Nouvelles props pour la sélection de joueurs
          showPlayerSelection={showPlayerSelection}
          onSelectPlayer={handleSelectPlayerFromModal}
          onClosePlayerSelection={() => {
            setShowPlayerSelection(false);
            setSelectedCampaignForPlayer(null);
            setShowPlayers(false); // Fermer la modale PlayersModal
          }}
          availablePlayers={availablePlayers}
        />
        
        {/* Menu contextuel pour les campagnes */}
        {showContextMenu && (
          <div 
            className="fixed inset-0 z-[1000]" 
            onClick={() => {
              console.log('Fermeture du menu contextuel');
              setShowContextMenu(null);
            }}
          >
            <div 
              className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px]"
              style={{ 
                left: contextMenuPosition.x, 
                top: contextMenuPosition.y,
                transform: 'translate(-100%, 0)' // Aligner à droite du clic
              }}
              onClick={(e) => {
                console.log('Clic sur le menu contextuel');
                e.stopPropagation();
              }}
            >
              <button
                onClick={(e) => {
                  console.log('Clic sur Archiver');
                  e.preventDefault();
                  e.stopPropagation();
                  handleArchiveCampaign(showContextMenu);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Archive size={16} />
                <span>Archiver</span>
              </button>
              <button
                onClick={(e) => {
                  console.log('Clic sur Supprimer');
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteCampaign(showContextMenu);
                }}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        )}

        {/* Toast de confirmation de suppression */}
        {showDeleteConfirmation && campaignToDelete && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={cancelDeleteCampaign} />
            
            <div className="relative bg-[#f7f1e5] text-[#1a1a1a] w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[rgba(255,255,255,0.6)]">
                <h3 className="text-xl font-semibold flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 size={20} className="text-red-600" />
                  </div>
                  <span>Supprimer la campagne</span>
                </h3>
                <button 
                  onClick={cancelDeleteCampaign}
                  className="text-black/60 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    Êtes-vous sûr de vouloir supprimer la campagne :
                  </p>
                  <div className="bg-white/50 border border-black/10 rounded-lg p-4">
                    <h4 className="font-semibold text-lg text-[#1a1a1a] mb-2">
                      {campaignToDelete.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {campaignToDelete.resume}
                    </p>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-red-800 font-medium text-sm mb-1">
                        Action irréversible
                      </p>
                      <p className="text-red-700 text-sm">
                        Cette action supprimera définitivement la campagne et toutes ses données associées.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={cancelDeleteCampaign}
                    className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDeleteCampaign}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 size={16} />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default CampaignSelection;