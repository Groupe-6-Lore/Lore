import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UniverseSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Données simples des univers
  const universes = [
    {
      id: 'symbaroum',
      name: 'Symbaroum',
      description: 'Un univers sombre et mystérieux',
      price: 49,
      type: 'paid'
    },
    {
      id: 'fate-core',
      name: 'Fate Core',
      description: 'Un système narratif flexible',
      price: 0,
      type: 'free'
    },
    {
      id: 'dnd-5e',
      name: 'D&D 5e',
      description: 'Le système de jeu le plus populaire',
      price: 0,
      type: 'freemium'
    }
  ];

  const handleUniverseClick = (universe) => {
    navigate(`/campaigns/create/universe/${universe.id}/details`);
  };

  const handleBack = () => {
    navigate('/campaigns/create');
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header simple */}
      <header className="flex items-center justify-between p-6 bg-primary-blue border-b border-light/10">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-4">
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

      {/* Breadcrumb simple */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={handleBack}
            className="hover:text-light transition-colors"
          >
            Créer une campagne
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden">
            Choisir un univers
          </span>
        </nav>
      </div>

      {/* Titre */}
      <div className="px-6 mb-8">
        <h2 className="text-4xl font-bold text-light eagle-lake-font border-b-2 border-golden pb-2 inline-block">
          Choisir un univers
        </h2>
      </div>

      {/* Grille simple des univers */}
      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universes.map((universe) => (
              <div
                key={universe.id}
                onClick={() => handleUniverseClick(universe)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-light/15 backdrop-blur-sm rounded-2xl border border-light/20 shadow-xl overflow-hidden h-80">
                  
                  {/* Image placeholder */}
                  <div className="h-3/4 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🌍</div>
                        <div className="text-lg font-bold">Univers</div>
                      </div>
                    </div>
                    
                    {/* Prix */}
                    {universe.price > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-golden text-dark px-2 py-1 rounded-full text-sm font-bold">
                          {universe.price}€
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Contenu */}
                  <div className="h-1/4 p-4 bg-light/10">
                    <h3 className="text-lg font-bold text-light mb-1">
                      {universe.name}
                    </h3>
                    <p className="text-light/70 text-sm">
                      {universe.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseSelection;