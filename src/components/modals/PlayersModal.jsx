import React, { useMemo, useState, useRef, useEffect } from 'react';
import { X, Search, Copy, Trash2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Avatar = ({ image, initials, name }) => (
  <div className="w-6 h-6 rounded-full overflow-hidden bg-[#46718A] flex items-center justify-center">
    {image ? (
      <img src={image} alt={name} className="w-full h-full object-cover" />
    ) : (
      <span className="text-[#F0EAE1] text-xs font-bold">{initials}</span>
    )}
  </div>
);

const PlayersModal = ({ isOpen, onClose }) => {
  const campaignPlayers = useMemo(() => ([
    { id: 'p1', name: 'Abdel', character: 'Kriks', initials: 'A', playerImage: '/images/players/abdel.jpg', characterImage: '/images/characters/kriks.jpg' },
    { id: 'p2', name: 'Thomas', character: 'Vaelene', initials: 'T', playerImage: '/images/players/thomas.jpg', characterImage: '/images/characters/vaelene.jpg' },
    { id: 'p3', name: 'Chris', character: 'Tardek', initials: 'C', playerImage: '/images/players/chris.jpg', characterImage: '/images/characters/tardek.jpg' },
    { id: 'p4', name: 'Rick', character: 'Gora', initials: 'R', playerImage: '/images/players/rick.jpg', characterImage: '/images/characters/gora.jpg' },
    { id: 'p5', name: 'Maya', character: "T'Sari", initials: 'M', playerImage: '/images/players/maya.jpg', characterImage: '/images/characters/tsari.jpg' },
    { id: 'p6', name: 'Estelle', character: 'Lira', initials: 'E', playerImage: '/images/players/estelle.jpg', characterImage: '/images/characters/lira.jpg' },
  ]), []);

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

  const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  const handleInvite = (id) => {
    setInvited(prev => ({ ...prev, [id]: prev[id] === 'sent' ? undefined : 'sent' }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
    } catch (e) {
      console.error('Clipboard error', e);
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
               {campaignPlayers.map(p => (
                 <div key={p.id} className="flex items-center justify-between bg-white/50 border border-black/10 rounded-lg px-3 py-2">
                   <div className="flex items-center space-x-3">
                     <Avatar image={p.playerImage} initials={p.initials} name={p.name} />
                      <div className="flex items-center space-x-16">
                        <span className="font-medium w-24 text-left">{p.name}</span>
                       <div className="flex items-center space-x-2">
                         <Avatar image={p.characterImage} initials={p.character[0]} name={p.character} />
                         <span className="font-medium">{p.character}</span>
                       </div>
                     </div>
                   </div>
                   <button className="text-red-600 hover:text-red-700" title="Supprimer le personnage">
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
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
                    {invited[f.id] ? 'Invité' : 'Inviter'}
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
    </div>
  );
};

export default PlayersModal;


