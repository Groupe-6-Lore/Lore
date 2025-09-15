import React from 'react';
import { Settings, Bell, Newspaper, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = ({ 
  showBackButton = false, 
  onBackClick, 
  showNewsButton = true, 
  showNotifications = true, 
  showSettings = true,
  showUserAvatar = true,
  additionalButtons = [],
  className = ""
}) => {
  const { user } = useAuth();

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
      <div className="flex items-center space-x-4">
        {/* Boutons spécifiques à la page */}
        {additionalButtons.map((button, index) => (
          <div key={index}>
            {button}
          </div>
        ))}
        
        {/* Bouton News hexagonal vert */}
        {showNewsButton && (
          <div className="relative">
            <div className="w-12 h-12 bg-green-500 transform rotate-45 rounded-sm flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <span className="text-white font-bold text-sm transform -rotate-45">NEWS</span>
            </div>
          </div>
        )}
        
        {/* Bouton Notifications */}
        {showNotifications && (
          <button className="text-light hover:text-golden transition-colors p-2 hover:bg-light/10 rounded-lg">
            <Bell size={24} />
          </button>
        )}
        
        {/* Bouton Paramètres */}
        {showSettings && (
          <button className="text-light hover:text-golden transition-colors p-2 hover:bg-light/10 rounded-lg">
            <Settings size={24} />
          </button>
        )}
        
        {/* Avatar utilisateur */}
        {showUserAvatar && (
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

