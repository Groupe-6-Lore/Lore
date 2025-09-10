import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const CreateCampaign = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUniverseClick = () => {
    navigate('/campaigns/create/universe');
  };

  const handleRulesClick = () => {
    navigate('/campaigns/create/rules');
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* CSS pour les effets visuels avancés */}
      <style jsx>{`
        /* Effet de brillance au hover */
        .card-shine {
          position: relative;
          overflow: hidden;
        }

        .card-shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg) translate(-100%, -100%);
          transition: transform 0.6s;
          z-index: 1;
        }

        .card-shine:hover::before {
          transform: rotate(45deg) translate(100%, 100%);
        }

        /* Animation d'entrée staggered */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Animation pour le titre principal */
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
          opacity: 0;
        }

        /* Animation pour le breadcrumb */
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      {/* Background identique aux autres pages */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234A90E2;stop-opacity:1" /><stop offset="100%" style="stop-color:%236B73FF;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23bg)"/></svg>')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 lg:p-6">
        {/* Logo */}
        <h1 className="text-3xl lg:text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        {/* Navigation droite */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={20} className="lg:w-6 lg:h-6" />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={20} className="lg:w-6 lg:h-6" />
          </button>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold text-sm lg:text-base">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="relative z-10 px-4 lg:px-6 mb-8">
        <nav className="flex items-center space-x-2 text-light/80 animate-fade-in-left noto-sans-font">
          <button
            onClick={() => handleBreadcrumbClick('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden border-b border-golden pb-1">
            Créer une campagne
          </span>
        </nav>
      </div>

      {/* Titre principal */}
      <div className="relative z-10 px-4 lg:px-6 mb-12 lg:mb-16">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-light eagle-lake-font leading-tight animate-fade-in-down">
          Créer une campagne
        </h2>
      </div>

      {/* Cards de choix */}
      <div className="relative z-10 px-4 lg:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card Univers */}
          <div 
            onClick={handleUniverseClick}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-80 lg:h-96 card-shine">
              {/* Image */}
              <div className="h-3/4 relative overflow-hidden">
                <img 
                  src="/images/fantasy-universe.jpg" 
                  alt="Univers fantasy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-500/20"></div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </div>
              
              {/* Titre */}
              <div className="h-1/4 flex items-center justify-center bg-white">
                <h3 className="text-2xl font-bold text-dark calligraphy-font">Univers</h3>
              </div>
            </div>
          </div>

          {/* Card Règles */}
          <div 
            onClick={handleRulesClick}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-80 lg:h-96 card-shine">
              {/* Image */}
              <div className="h-3/4 relative overflow-hidden">
                <img 
                  src="/images/dm-rules.jpg" 
                  alt="Règles et livres de JDR"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-amber-500/20"></div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </div>
              
              {/* Titre */}
              <div className="h-1/4 flex items-center justify-center bg-white">
                <h3 className="text-2xl font-bold text-dark calligraphy-font">Règles</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
