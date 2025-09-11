import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Settings, Bell, ChevronRight, ArrowLeft, Check, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const UniverseDetailsCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { universeId } = useParams();
  
  // États pour les extensions et sélection
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const [showAllExtensions, setShowAllExtensions] = useState(false);

  // Données des univers avec extensions
  const universeData = {
    'symbaroum': {
      id: 'symbaroum',
      name: 'Symbaroum',
      author: 'Free League Publishing',
      description: 'Un univers sombre et mystérieux où la corruption ronge tout ce qu\'elle touche. Dans les forêts d\'Ambria, les héros explorent des ruines anciennes et affrontent des créatures corrompues.',
      fullDescription: 'Symbaroum est un univers de fantasy sombre où la corruption est omniprésente. Les joueurs incarnent des aventuriers explorant les mystérieuses forêts d\'Ambria, où les ruines de l\'ancien empire de Symbaroum cachent des secrets terrifiants. Le système de jeu met l\'accent sur l\'atmosphère, la corruption progressive des personnages, et les choix moraux difficiles.',
      themes: ['Horreur & Mystère', 'Fantasy sombre'],
      rules: ['Symbaroum'],
      difficulty: 'Intermédiaire',
      type: 'paid',
      price: 49,
      popularity: 95,
      image: null,
      extensions: [
        {
          id: 'symbaroum-core',
          name: 'Livre de base',
          description: 'Tout ce qu\'il faut pour commencer à jouer à Symbaroum.',
          price: 0,
          included: true
        },
        {
          id: 'symbaroum-adventures',
          name: 'Aventures d\'Ambria',
          description: 'Une collection d\'aventures pour débuter dans l\'univers.',
          price: 25,
          included: false
        },
        {
          id: 'symbaroum-bestiary',
          name: 'Bestiaire de Symbaroum',
          description: 'Monstres et créatures corrompues d\'Ambria.',
          price: 30,
          included: false
        }
      ]
    },
    'fate-core': {
      id: 'fate-core',
      name: 'Fate Core',
      author: 'Evil Hat Productions',
      description: 'Un système narratif flexible qui s\'adapte à tous les univers. Parfait pour les joueurs qui aiment la créativité et l\'improvisation.',
      fullDescription: 'Fate Core est un système de jeu de rôle narratif qui met l\'accent sur la collaboration entre le MJ et les joueurs. Le système utilise des aspects, des compétences et des sorts pour créer des histoires dynamiques et créatives. Il est particulièrement adapté aux joueurs qui préfèrent l\'improvisation et la narration collaborative.',
      themes: ['Narratif', 'Flexible'],
      rules: ['Fate Core'],
      difficulty: 'Débutant',
      type: 'free',
      price: 0,
      popularity: 88,
      image: null,
      extensions: [
        {
          id: 'fate-core-book',
          name: 'Livre de base',
          description: 'Les règles complètes du système Fate Core.',
          price: 0,
          included: true
        },
        {
          id: 'fate-worlds',
          name: 'Fate Worlds',
          description: 'Collection d\'univers prêts à jouer pour Fate.',
          price: 15,
          included: false
        },
        {
          id: 'fate-toolkit',
          name: 'Fate Toolkit',
          description: 'Outils avancés pour personnaliser votre jeu Fate.',
          price: 12,
          included: false
        }
      ]
    },
    'dnd-5e': {
      id: 'dnd-5e',
      name: 'D&D 5e',
      author: 'Wizards of the Coast',
      description: 'Le système de jeu de rôle le plus populaire au monde. Parfait pour débuter dans le JDR.',
      fullDescription: 'Dungeons & Dragons 5e est le système de jeu de rôle le plus populaire au monde. Il offre un équilibre parfait entre simplicité et profondeur, avec des règles claires et une grande variété de classes, races et sorts. Le système est idéal pour les débutants comme pour les joueurs expérimentés.',
      themes: ['Fantasy', 'Aventure'],
      rules: ['D&D 5e'],
      difficulty: 'Débutant',
      type: 'freemium',
      price: 0,
      popularity: 100,
      image: null,
      extensions: [
        {
          id: 'dnd-basic-rules',
          name: 'Règles de base',
          description: 'Les règles essentielles pour commencer à jouer.',
          price: 0,
          included: true
        },
        {
          id: 'dnd-phb',
          name: 'Manuel du Joueur',
          description: 'Classes, races et sorts complets.',
          price: 35,
          included: false
        },
        {
          id: 'dnd-dmg',
          name: 'Guide du Maître',
          description: 'Outils et conseils pour les MJ.',
          price: 40,
          included: false
        },
        {
          id: 'dnd-mm',
          name: 'Manuel des Monstres',
          description: 'Créatures et adversaires pour vos aventures.',
          price: 38,
          included: false
        }
      ]
    }
  };

  const universe = universeData[universeId];

  useEffect(() => {
    if (!universe) {
      toast.error('Univers non trouvé');
      navigate('/campaigns/create/universe');
    }
  }, [universe, navigate]);

  const handleExtensionToggle = (extension) => {
    setSelectedExtensions(prev => {
      if (prev.find(ext => ext.id === extension.id)) {
        return prev.filter(ext => ext.id !== extension.id);
      } else {
        return [...prev, extension];
      }
    });
  };

  const calculateTotalPrice = () => {
    const basePrice = universe?.price || 0;
    const extensionsPrice = selectedExtensions.reduce((total, ext) => total + ext.price, 0);
    return basePrice + extensionsPrice;
  };

  const handleUseUniverse = () => {
    const totalPrice = calculateTotalPrice();
    const universeData = {
      ...universe,
      selectedExtensions: selectedExtensions,
      totalPrice: totalPrice
    };

    // Sauvegarder dans localStorage
    localStorage.setItem('selectedUniverse', JSON.stringify(universeData));
    
    toast.success(`${universe.name} sélectionné !`);
    
    // Retourner à la page de création
    setTimeout(() => {
      navigate('/campaigns/create');
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate('/campaigns/create/universe');
  };

  if (!universe) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-center text-light">
          <h1 className="text-2xl font-bold mb-4">Univers non trouvé</h1>
          <button
            onClick={handleBackToSelection}
            className="bg-golden hover:bg-golden/80 text-dark px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Retour à la sélection
          </button>
        </div>
      </div>
    );
  }

  const displayedExtensions = showAllExtensions ? universe.extensions : universe.extensions.slice(0, 3);

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore */}
      <header className="flex items-center justify-between p-6 bg-primary-blue border-b border-light/10">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-6">
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

      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={() => navigate('/campaigns/create')}
            className="hover:text-light transition-colors"
          >
            Créer une campagne
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <button
            onClick={handleBackToSelection}
            className="hover:text-light transition-colors"
          >
            Choisir un univers
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden">
            {universe.name}
          </span>
        </nav>
      </div>

      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header de l'univers */}
          <div className="bg-light/15 backdrop-blur-sm rounded-2xl border border-light/20 shadow-xl overflow-hidden mb-8">
            <div className="h-64 relative">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: universe.image ? 
                    `url(${universe.image})` : 
                    `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Prix sur l'image */}
                {universe.price > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-golden text-dark px-3 py-2 rounded-full text-lg font-bold">
                      {universe.price}€
                    </span>
                  </div>
                )}
                
                {/* Tags sur l'image */}
                <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                  {universe.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
                
                {/* Titre et auteur */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-4xl font-bold text-light mb-2 eagle-lake-font">
                    {universe.name}
                  </h1>
                  <p className="text-light/90 text-lg">
                    par {universe.author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contenu principal (2/3) */}
            <div className="lg:col-span-2">
              
              {/* Description */}
              <div className="bg-light/10 rounded-xl p-6 mb-6 border border-light/20">
                <h2 className="text-2xl font-bold text-light mb-4 eagle-lake-font">Description</h2>
                <div className="text-light/90 leading-relaxed space-y-4">
                  <p>{universe.description}</p>
                  <p>{universe.fullDescription}</p>
                </div>
              </div>

              {/* Extensions */}
              <div className="bg-light/10 rounded-xl p-6 border border-light/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-light eagle-lake-font">Extensions</h2>
                  {universe.extensions.length > 3 && (
                    <button
                      onClick={() => setShowAllExtensions(!showAllExtensions)}
                      className="flex items-center space-x-2 text-golden hover:text-golden/80 transition-colors"
                    >
                      {showAllExtensions ? (
                        <>
                          <EyeOff size={16} />
                          <span>Voir moins</span>
                        </>
                      ) : (
                        <>
                          <Eye size={16} />
                          <span>Voir tout ({universe.extensions.length})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {displayedExtensions.map((extension) => {
                    const isSelected = selectedExtensions.find(ext => ext.id === extension.id);
                    const isIncluded = extension.included;
                    
                    return (
                      <div
                        key={extension.id}
                        onClick={() => !isIncluded && handleExtensionToggle(extension)}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          isIncluded
                            ? 'bg-green-500/20 border-green-500/50 cursor-default'
                            : isSelected
                            ? 'bg-golden/20 border-golden cursor-pointer'
                            : 'bg-light/10 border-light/20 cursor-pointer hover:bg-light/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-light">
                                {extension.name}
                              </h3>
                              {isIncluded && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  Inclus
                                </span>
                              )}
                              {isSelected && !isIncluded && (
                                <span className="bg-golden text-dark px-2 py-1 rounded-full text-xs font-bold">
                                  Sélectionné
                                </span>
                              )}
                            </div>
                            <p className="text-light/80 text-sm">
                              {extension.description}
                            </p>
                          </div>
                          
                          <div className="ml-4 text-right">
                            {extension.price === 0 ? (
                              <span className="text-green-400 font-bold">Gratuit</span>
                            ) : (
                              <span className="text-golden font-bold text-lg">
                                {extension.price}€
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <div>
              
              {/* Récapitulatif prix */}
              <div className="bg-light/10 rounded-xl p-6 mb-6 border border-light/20">
                <h3 className="text-xl font-bold text-light mb-4 eagle-lake-font">Récapitulatif</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-light">
                    <span>Univers : {universe.name}</span>
                    <span className="font-bold">
                      {universe.price === 0 ? 'Gratuit' : `${universe.price}€`}
                    </span>
                  </div>
                  
                  {selectedExtensions.map((extension) => (
                    <div key={extension.id} className="flex justify-between items-center text-light">
                      <span className="text-sm">+ {extension.name}</span>
                      <span className="font-bold text-sm">
                        {extension.price}€
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-light/30 pt-3">
                    <div className="flex justify-between items-center text-light text-lg font-bold">
                      <span>Total :</span>
                      <span className="text-golden">
                        {calculateTotalPrice() === 0 ? 'Gratuit' : `${calculateTotalPrice()}€`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton Utiliser */}
              <button
                onClick={handleUseUniverse}
                className="w-full bg-golden hover:bg-golden/80 text-dark py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-3 shadow-lg"
              >
                <Check size={24} />
                <span>Utiliser cet univers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseDetailsCreate;
