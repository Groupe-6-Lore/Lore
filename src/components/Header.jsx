import React, { useState, useRef, useEffect } from 'react';
import { Settings, Bell, Newspaper, ArrowLeft, Users, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Header = ({ 
  showBackButton = false, 
  onBackClick, 
  showNewsButton = true, 
  showNotifications = true, 
  showSettings = true,
  showUserAvatar = true,
  showSourcesButton = true,
  showPlayersButton = true,
  additionalButtons = [],
  className = "",
  onSourcesClick = null // Callback for Sources button click
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userMenuRef = useRef(null);

  // Fermer le menu utilisateur au clic extérieur ou avec Échap
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showUserMenu]);

  // Charger les notifications au montage du composant
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('lore_notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  // Écouter les nouvelles notifications
  useEffect(() => {
    const handleNotificationAdded = (event) => {
      const newNotification = event.detail;
      setNotifications(prev => [newNotification, ...prev]);
    };

    window.addEventListener('notificationAdded', handleNotificationAdded);
    return () => window.removeEventListener('notificationAdded', handleNotificationAdded);
  }, []);

  return (
    <header className={`flex items-center justify-between p-6 bg-primary-blue border-b border-light/10 ${className}`}>
      {/* Logo LORE */}
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="text-light hover:text-golden transition-colors p-2 hover:bg-light/10 rounded-lg"
            title="Retour"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
      </div>
      
      {/* Boutons de droite */}
      <div className="flex items-center space-x-6">
        {/* Boutons spécifiques à la page */}
        {additionalButtons.map((button, index) => (
          <div key={index}>
            {button}
          </div>
        ))}
        
        {/* Bouton Sources hexagonal bleu */}
        {showSourcesButton && (
          <button 
            className="relative"
            onClick={onSourcesClick || (() => navigate('/sources'))}
          >
            <div className="w-12 h-12 bg-blue-500 transform rotate-45 rounded-sm flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <span className="text-white font-bold text-[10px] transform -rotate-45">Sources</span>
            </div>
          </button>
        )}
        
        {/* Bouton Joueurs hexagonal vert */}
        {showPlayersButton && (
          <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
            <Users size={20} />
          </button>
        )}
        
        {/* Bouton Notifications */}
        {showNotifications && (
          <div className="relative">
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors relative"
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            
            {/* Dropdown Notifications */}
            {showNotificationsDropdown && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-gray-500 text-center">Aucune notification</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-[#f7f1e5]' : ''}`}
                        onClick={() => {
                          // Marquer comme lu
                          const updatedNotifications = notifications.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          );
                          setNotifications(updatedNotifications);
                          localStorage.setItem('lore_notifications', JSON.stringify(updatedNotifications));
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-golden' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{notification.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                            {notification.details && (
                              <div className="text-xs text-gray-500 mt-1 italic">"{notification.details}"</div>
                            )}
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(notification.timestamp).toLocaleString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        const allRead = notifications.map(n => ({ ...n, read: true }));
                        setNotifications(allRead);
                        localStorage.setItem('lore_notifications', JSON.stringify(allRead));
                      }}
                      className="text-sm text-black hover:text-gray-700"
                    >
                      Marquer tout comme lu
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Bouton Paramètres */}
        {showSettings && (
          <button className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        )}
        
        {/* Avatar utilisateur + menu */}
        {showUserAvatar && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(prev => !prev)}
              className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold focus:outline-none focus:ring-2 focus:ring-golden/60"
              title="Profil"
            >
              {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[#F0EAE1] text-gray-800 rounded-lg shadow-xl border border-black/5 z-[9999] origin-top-right transform transition-all duration-150"
                style={{
                  boxShadow: '0px 12px 32px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.15)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                     <div className="py-2">
                       <button 
                         className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors"
                         onClick={() => {
                           setShowUserMenu(false);
                           navigate('/profil');
                         }}
                       >
                         Profil
                       </button>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors"
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/abonnement');
                    }}
                  >
                    Abonnement
                  </button>
                       <button 
                         className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors"
                         onClick={() => {
                           setShowUserMenu(false);
                           navigate('/stockage');
                         }}
                       >
                         Stockage
                       </button>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors"
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/confidentialite');
                    }}
                  >
                    Confidentialité
                  </button>
                  <div className="my-1 border-t border-black/10"></div>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors text-red-700"
                    onClick={async () => {
                      try {
                        await supabase.auth.signOut();
                      } catch (e) {
                        console.error('Erreur de déconnexion:', e);
                      } finally {
                        setShowUserMenu(false);
                        navigate('/');
                      }
                    }}
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

