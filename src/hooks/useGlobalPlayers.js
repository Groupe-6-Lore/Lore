import { useState, useEffect } from 'react';

export const useGlobalPlayers = () => {
  const [globalCampaignPlayers, setGlobalCampaignPlayers] = useState([]);
  const [characterAssignments, setCharacterAssignments] = useState({});

  // Charger les joueurs globaux depuis localStorage
  useEffect(() => {
    const loadGlobalPlayers = () => {
      try {
        const savedCampaigns = JSON.parse(localStorage.getItem('allCampaigns') || '[]');
        const allPlayers = [];
        
        savedCampaigns.forEach(campaign => {
          campaign.players.forEach(player => {
            // Éviter les doublons
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
        
        // Charger les assignations de personnages
        const assignments = {};
        savedCampaigns.forEach(campaign => {
          campaign.players.forEach(player => {
            if (player.character_name) {
              assignments[player.id] = player.character_name;
            }
          });
        });
        setCharacterAssignments(assignments);
        
      } catch (error) {
        console.error('Erreur lors du chargement des joueurs globaux:', error);
      }
    };

    loadGlobalPlayers();
    
    // Écouter les changements dans localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'allCampaigns') {
        loadGlobalPlayers();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fonction pour mettre à jour les joueurs globaux
  const updateGlobalPlayers = (updatedCampaigns) => {
    const allPlayers = [];
    
    updatedCampaigns.forEach(campaign => {
      campaign.players.forEach(player => {
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
    
    // Mettre à jour les assignations
    const assignments = {};
    updatedCampaigns.forEach(campaign => {
      campaign.players.forEach(player => {
        if (player.character_name) {
          assignments[player.id] = player.character_name;
        }
      });
    });
    setCharacterAssignments(assignments);
  };

  return {
    globalCampaignPlayers,
    setGlobalCampaignPlayers,
    characterAssignments,
    setCharacterAssignments,
    updateGlobalPlayers
  };
};
