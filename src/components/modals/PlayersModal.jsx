import React, { useMemo, useState, useRef, useEffect } from 'react';
import { X, Search, Copy, Trash2, Calendar, ChevronLeft, ChevronRight, UserMinus, UserPlus } from 'lucide-react';

const Avatar = ({ image, initials, name }) => (
  <div className="w-6 h-6 rounded-full overflow-hidden bg-[#46718A] flex items-center justify-center">
    {image ? (
      <img src={image} alt={name} className="w-full h-full object-cover" />
    ) : (
      <span className="text-[#F0EAE1] text-xs font-bold">{initials}</span>
    )}
  </div>
);

const PlayersModal = ({ isOpen, onClose, characterAssignments = {}, onRemoveAssignment = () => {}, campaignPlayers: externalPlayers, onUpdatePlayers, onRemovePlayer, onUpdateAssignments }) => {
  // Utiliser les joueurs externes ou un état local par défaut
  const [campaignPlayers, setCampaignPlayers] = useState(externalPlayers || [
    { id: 'p1', name: 'Abdel', character: 'Kriks', initials: 'A', playerImage: '/images/players/abdel.jpg', characterImage: '/images/characters/kriks.jpg', status: 'active' },
    { id: 'p2', name: 'Thomas', character: 'Vaelene', initials: 'T', playerImage: '/images/players/thomas.jpg', characterImage: '/images/characters/vaelene.jpg', status: 'active' },
    { id: 'p3', name: 'Chris', character: 'Tardek', initials: 'C', playerImage: '/images/players/chris.jpg', characterImage: '/images/characters/tardek.jpg', status: 'active' },
    { id: 'p4', name: 'Rick', character: 'Gora', initials: 'R', playerImage: '/images/players/rick.jpg', characterImage: '/images/characters/gora.jpg', status: 'active' },
    { id: 'p5', name: 'Maya', character: "T'Sari", initials: 'M', playerImage: '/images/players/maya.jpg', characterImage: '/images/characters/tsari.jpg', status: 'active' },
    { id: 'p6', name: 'Estelle', character: 'Lira', initials: 'E', playerImage: '/images/players/estelle.jpg', characterImage: '/images/characters/lira.jpg', status: 'active' },
  ]);
  
  // Synchroniser avec les joueurs externes
  useEffect(() => {
    if (externalPlayers) {
      setCampaignPlayers(externalPlayers);
    }
  }, [externalPlayers]);

  const friends = useMemo(() => ([
    { id: 'f1', name: 'Diane', initials: 'D', image: '/images/players/diane.jpg' },
    { id: 'f2', name: 'Maxime', initials: 'M', image: '/images/players/maxime.jpg' },
    { id: 'f3', name: 'Justine', initials: 'J', image: '/images/players/justine.jpg' },
    { id: 'f4', name: 'Jean', initials: 'J', image: '/images/players/jean.jpg' },
  ]), []);

  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [invited, setInvited] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const inviteUrl = 'https://lore.com/join/7FxRctIneUHH/EktwKLcHgAdI';
  
  // États pour l'assignation de personnages
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [selectedPlayerForCharacter, setSelectedPlayerForCharacter] = useState(null);
  
  // Liste des personnages disponibles (basée sur TemplatePanel)
  const availableCharacters = [
    // Aventuriers
    { id: 'char-1', name: 'Elandra', level: '5', class: 'Mage', category: 'Aventuriers' },
    { id: 'char-2', name: 'Thorin', level: '4', class: 'Guerrier', category: 'Aventuriers' },
    { id: 'char-3', name: 'Lyra', level: '3', class: 'Rôdeuse', category: 'Aventuriers' },
    { id: 'char-4', name: 'Merric', level: '2', class: 'Voleur', category: 'Aventuriers' },
    // Alliés
    { id: 'char-5', name: 'Seraphine', level: '6', class: 'Clerc', category: 'Alliés' },
    { id: 'char-6', name: 'Korgan', level: '5', class: 'Barbare', category: 'Alliés' },
    { id: 'char-7', name: 'Alistair', level: '4', class: 'Paladin', category: 'Alliés' },
    { id: 'char-8', name: 'Nymeria', level: '3', class: 'Druide', category: 'Alliés' },
    // Adversaires
    { id: 'char-9', name: 'Vargash', level: '7', class: 'Sorcier', category: 'Adversaires' },
    { id: 'char-10', name: 'Kael', level: '5', class: 'Assassin', category: 'Adversaires' },
    { id: 'char-11', name: 'Oona', level: '4', class: 'Chaman', category: 'Adversaires' },
    { id: 'char-12', name: 'Darius', level: '6', class: 'Chevalier noir', category: 'Adversaires' }
  ];

  const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  const handleAssignCharacter = (character) => {
    if (!selectedPlayerForCharacter) return;
    
    // Mettre à jour l'assignation dans l'état local
    const updatedPlayers = campaignPlayers.map(player => 
      player.id === selectedPlayerForCharacter.id 
        ? { ...player, character: character.name }
        : player
    );
    setCampaignPlayers(updatedPlayers);
    
    // Mettre à jour les joueurs externes si la fonction est fournie
    if (onUpdatePlayers) {
      onUpdatePlayers(updatedPlayers);
    }
    
    // Mettre à jour les assignations externes
    if (onUpdateAssignments) {
      onUpdateAssignments(prev => ({
        ...prev,
        [selectedPlayerForCharacter.id]: character.name
      }));
    }
    
    // Fermer la sélection
    setShowCharacterSelection(false);
    setSelectedPlayerForCharacter(null);
  };

  const handleInvite = (id) => {
    const friend = friends.find(f => f.id === id);
    if (friend) {
      // Vérifier si le joueur est déjà invité
      const isAlreadyInvited = invited[id] === 'sent';
      
      if (isAlreadyInvited) {
        // Désinviter : retirer le joueur de la campagne
        const updatedPlayers = campaignPlayers.filter(player => 
          !(player.name === friend.name && player.status === 'pending')
        );
        setCampaignPlayers(updatedPlayers);
        
        // Mettre à jour les joueurs externes si la fonction est fournie
        if (onUpdatePlayers) {
          onUpdatePlayers(updatedPlayers);
        }
        
        setInvited(prev => ({ ...prev, [id]: undefined }));
      } else {
        // Inviter : ajouter le joueur à la campagne avec le statut "En attente"
        const newPlayer = {
          id: `invited-${Date.now()}`,
          name: friend.name,
          character: null,
          initials: friend.initials,
          playerImage: friend.image,
          characterImage: null,
          status: 'pending'
        };
        
        const updatedPlayers = [...campaignPlayers, newPlayer];
        setCampaignPlayers(updatedPlayers);
        
        // Mettre à jour les joueurs externes si la fonction est fournie
        if (onUpdatePlayers) {
          onUpdatePlayers(updatedPlayers);
        }
        
        setInvited(prev => ({ ...prev, [id]: 'sent' }));
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      
      // Créer une notification de succès
      const notification = {
        id: Date.now(),
        type: 'link_copied',
        title: 'Lien copié !',
        message: 'Le lien d\'invitation a été copié dans le presse-papiers',
        timestamp: new Date().toISOString(),
        read: false
      };
      
      // Stocker la notification dans localStorage
      const existingNotifications = JSON.parse(localStorage.getItem('lore_notifications') || '[]');
      existingNotifications.unshift(notification);
      localStorage.setItem('lore_notifications', JSON.stringify(existingNotifications));
      
      // Déclencher un événement personnalisé pour notifier le header
      window.dispatchEvent(new CustomEvent('notificationAdded', { detail: notification }));
      
    } catch (e) {
      console.error('Clipboard error', e);
      
      // Créer une notification d'erreur
      const notification = {
        id: Date.now(),
        type: 'error',
        title: 'Erreur de copie',
        message: 'Impossible de copier le lien d\'invitation',
        timestamp: new Date().toISOString(),
        read: false
      };
      
      const existingNotifications = JSON.parse(localStorage.getItem('lore_notifications') || '[]');
      existingNotifications.unshift(notification);
      localStorage.setItem('lore_notifications', JSON.stringify(existingNotifications));
      
      window.dispatchEvent(new CustomEvent('notificationAdded', { detail: notification }));
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Simuler l'envoi de notification aux joueurs
    const notification = {
      id: Date.now(),
      type: 'session_reminder',
      title: 'Rappel de session envoyé',
      message: `Notification envoyée à ${campaignPlayers.length} joueurs`,
      details: message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Stocker la notification dans localStorage pour la récupérer dans le header
    const existingNotifications = JSON.parse(localStorage.getItem('lore_notifications') || '[]');
    existingNotifications.unshift(notification);
    localStorage.setItem('lore_notifications', JSON.stringify(existingNotifications));
    
    // Déclencher un événement personnalisé pour notifier le header
    window.dispatchEvent(new CustomEvent('notificationAdded', { detail: notification }));
    
    // Réinitialiser le formulaire
    setMessage('');
    setSelectedDate('');
    
    // Optionnel: Afficher un toast de confirmation
    console.log('Notification envoyée aux joueurs:', message);
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toLocaleDateString('fr-FR');
    setSelectedDate(formattedDate);
    setSelectedCalendarDate(date);
    setMessage(`Prochaine session le ${formattedDate}.`);
    setShowCalendar(false);
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCalendar && calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCalendar]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-[#f7f1e5] text-[#1a1a1a] w-full max-w-5xl mx-4 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 bg-[rgba(255,255,255,0.6)]">
          <h3 className="text-2xl font-semibold">Gestion des joueurs</h3>
          <button onClick={onClose} className="text-black/60 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left column */}
          <div className="p-6 border-r border-black/10">
            <div className="text-lg font-semibold mb-4">Joueurs de la campagne</div>

             <div className="space-y-3">
               {campaignPlayers.map(p => {
                 const assignedCharacter = characterAssignments[p.id] || p.character;
                 return (
                   <div key={p.id} className="flex items-center justify-between bg-white/50 border border-black/10 rounded-lg px-3 py-2">
                     <div className="flex items-center space-x-3">
                       <Avatar image={p.playerImage} initials={p.initials} name={p.name} />
                        <div className="flex items-center space-x-16">
                          <div className="flex flex-col">
                            <span className="font-medium w-24 text-left">{p.name}</span>
                            {p.status === 'pending' && (
                              <span className="text-xs text-amber-600 font-medium">En attente</span>
                            )}
                          </div>
                         <div className="flex items-center space-x-2">
                           {assignedCharacter ? (
                             <>
                               <Avatar image={p.characterImage} initials={assignedCharacter[0]} name={assignedCharacter} />
                               <span className="font-medium">{assignedCharacter}</span>
                             </>
                           ) : (
                             <div className="flex items-center space-x-2">
                               <span className="text-gray-500 italic">Aucun personnage</span>
                               <button
                                 onClick={() => {
                                   setSelectedPlayerForCharacter(p);
                                   setShowCharacterSelection(true);
                                 }}
                                 className="text-blue-500 hover:text-blue-600 p-1"
                                 title="Assigner un personnage"
                               >
                                 <UserPlus size={16} />
                               </button>
                             </div>
                           )}
                         </div>
                       </div>
                     </div>
                     <div className="flex items-center space-x-2">
                       {assignedCharacter && (
                         <button 
                           onClick={() => {
                             // Supprimer l'assignation dans l'état local
                             const updatedPlayers = campaignPlayers.map(player => 
                               player.id === p.id 
                                 ? { ...player, character: null }
                                 : player
                             );
                             setCampaignPlayers(updatedPlayers);
                             
                             // Mettre à jour les joueurs externes si la fonction est fournie
                             if (onUpdatePlayers) {
                               onUpdatePlayers(updatedPlayers);
                             }
                             
                             // Appeler la fonction de suppression d'assignation externe
                             onRemoveAssignment(p.id);
                           }}
                           className="text-orange-600 hover:text-orange-700 p-1" 
                           title="Supprimer l'assignation du personnage"
                         >
                           <UserMinus size={16} />
                         </button>
                       )}
                       <button 
                         onClick={() => {
                           // Supprimer le joueur de la liste
                           const updatedPlayers = campaignPlayers.filter(player => player.id !== p.id);
                           setCampaignPlayers(updatedPlayers);
                           
                           // Mettre à jour les joueurs externes si la fonction est fournie
                           if (onUpdatePlayers) {
                             onUpdatePlayers(updatedPlayers);
                           }
                           
                           // Supprimer aussi l'assignation si elle existe
                           if (assignedCharacter) {
                             onRemoveAssignment(p.id);
                           }
                           
                           // Appeler la fonction de suppression externe si fournie
                           if (onRemovePlayer) {
                             onRemovePlayer(p.id);
                           }
                         }}
                         className="text-red-600 hover:text-red-700 p-1" 
                         title="Supprimer le joueur de la campagne"
                       >
                         <X size={16} />
                       </button>
                     </div>
                   </div>
                 );
               })}
             </div>

            {/* Notify section */}
            <div className="mt-6">
              <div className="text-sm mb-2">Notifiez vos joueurs en leur envoyant un message :</div>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Prochaine session le JJ/MM/AA."
                    className="w-full px-3 py-2 rounded-lg border border-black/20 bg-white/60 pr-10"
                    onClick={() => setShowCalendar(true)}
                  />
                  <Calendar 
                    size={16} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 cursor-pointer" 
                    onClick={() => setShowCalendar(true)}
                  />
                  
                </div>
                <button onClick={handleSendMessage} className="px-4 py-2 rounded-lg border border-[#985E41] text-[#985E41] hover:bg-[#985E41]/10">Envoyer</button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="p-6">
            <div className="text-lg font-semibold mb-4">Invitez des amis à jouer</div>

            {/* Search */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher des joueurs"
                  className="w-full px-3 py-2 rounded-lg border border-black/20 pl-9 bg-white/60"
                />
                <Search size={16} className="text-[#552E1A] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* All friends */}
            <div className="mb-3 text-sm font-semibold">Tous les amis – {friends.length}</div>
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {filteredFriends.map(f => (
                 <div key={f.id} className="flex items-center justify-between bg-white/50 border border-black/10 rounded-lg px-3 py-2">
                   <div className="flex items-center space-x-3">
                     <Avatar image={f.image} initials={f.initials} name={f.name} />
                     <span className="font-medium">{f.name}</span>
                   </div>
                  <button
                    onClick={() => handleInvite(f.id)}
                    className={`px-3 py-1 rounded-lg border border-[#985E41] text-[#985E41] text-sm ${invited[f.id] ? 'bg-[#985E41] text-white' : 'hover:bg-[#985E41]/10'}`}
                  >
                    {invited[f.id] ? 'Désinviter' : 'Inviter'}
                  </button>
                </div>
              ))}
            </div>

            {/* Invite link */}
            <div className="mt-6">
              <div className="text-sm mb-2">Donnez ce lien pour inviter les personnes à votre table :</div>
              <div className="flex items-center space-x-2">
                <input
                  value={inviteUrl}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-lg border border-black/20 bg-white/60"
                />
                <button onClick={handleCopy} className="px-3 py-2 rounded-lg border border-[#985E41] text-[#985E41] hover:bg-[#985E41]/10 flex items-center space-x-2">
                  <span>Copier</span>
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-golden hover:bg-golden/80 text-dark-blue font-semibold">Fermer</button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Overlay */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div ref={calendarRef} className="bg-white rounded-lg shadow-xl p-6 w-80">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="text-lg font-semibold text-black">
                {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </div>
              <button 
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 p-2 text-sm">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && handleDateSelect(day)}
                  disabled={!day}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    day 
                      ? 'text-gray-800 hover:bg-golden/10 hover:text-golden cursor-pointer' 
                      : 'text-transparent cursor-default'
                  } ${
                    day && day.toDateString() === new Date().toDateString() 
                      ? 'bg-golden/20 text-golden font-semibold' 
                      : ''
                  } ${
                    selectedCalendarDate && day && day.toDateString() === selectedCalendarDate.toDateString()
                      ? 'bg-golden/30 text-golden font-medium border border-golden'
                      : ''
                  }`}
                >
                  {day?.getDate()}
                </button>
              ))}
            </div>

            {/* Close button */}
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setShowCalendar(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Interface de sélection de personnages */}
      {showCharacterSelection && selectedPlayerForCharacter && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => {
            setShowCharacterSelection(false);
            setSelectedPlayerForCharacter(null);
          }} />
          
          <div className="relative bg-[#f7f1e5] text-[#1a1a1a] w-full max-w-2xl mx-4 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[rgba(255,255,255,0.6)]">
              <h3 className="text-xl font-semibold">
                Assigner un personnage à {selectedPlayerForCharacter.name}
              </h3>
              <button 
                onClick={() => {
                  setShowCharacterSelection(false);
                  setSelectedPlayerForCharacter(null);
                }}
                className="text-black/60 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {availableCharacters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => handleAssignCharacter(character)}
                    className="p-4 text-left bg-white/50 border border-black/10 rounded-lg hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">{character.name}</div>
                        <div className="text-sm text-gray-600">
                          Niveau {character.level} • {character.class}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{character.category}</div>
                      </div>
                      <div className="w-12 h-12 bg-[#46718A] rounded-full flex items-center justify-center text-[#F0EAE1] text-lg font-bold">
                        {character.name[0]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayersModal;


