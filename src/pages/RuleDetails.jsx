import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Bell, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const RuleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rule, setRule] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

  // Données des règles selon wireframe
  const ruleData = {
    1: {
      id: 1,
      name: "Dungeons & Dragons 5e",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Difficulté - Débutant", "Fantasy", "Populaire"],
      description: "Dungeons & Dragons 5e est le système de jeu de rôle le plus populaire au monde. Cette édition simplifie les règles tout en conservant la profondeur tactique qui fait la renommée de D&D. Parfait pour les débutants comme pour les vétérans.",
      included: [
        "Règles de base",
        "Classes et races",
        "Sorts et équipement"
      ],
      extensions: [
        {
          id: 11,
          name: "Manuel du Joueur",
          subtitle: "Classes et races complètes",
          price: 35,
          image: "/images/dnd-phb.jpg"
        },
        {
          id: 12,
          name: "Guide du Maître",
          subtitle: "Outils pour les MJ",
          price: 40,
          image: "/images/dnd-dmg.jpg"
        },
        {
          id: 13,
          name: "Manuel des Monstres",
          subtitle: "Créatures et adversaires",
          price: 38,
          image: "/images/dnd-mm.jpg"
        }
      ],
      type: 'freemium'
    },
    2: {
      id: 2,
      name: "Fate Core System",
      publisher: "Evil Hat Productions",
      price: 0,
      tags: ["Difficulté - Facile", "Multi-genre", "Narratif"],
      description: "Fate Core System est un jeu où les héros sont définis par leurs convictions, leurs failles et leurs choix. Vos aspects deviennent des leviers narratifs : une phrase peut changer le cours d'une bataille ou d'un destin.",
      included: [
        "Règles de base",
        "Création de personnages",
        "Conseils pour MJ"
      ],
      extensions: [
        {
          id: 21,
          name: "Fate Worlds",
          subtitle: "Suppléments univers",
          price: 15,
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 22,
          name: "Fate Toolkit",
          subtitle: "Outils avancés",
          price: 12,
          image: "/images/fate-toolkit.jpg"
        }
      ],
      type: 'free'
    },
    3: {
      id: 3,
      name: "Symbaroum Core Rulebook",
      publisher: "Free League Publishing",
      price: 35,
      tags: ["Difficulté - Intermédiaire", "Fantasy sombre", "Atmosphérique"],
      description: "Symbaroum est un système de jeu simple mais profond, parfait pour l'horreur et le mystère. Les règles sont faciles à apprendre mais offrent une grande richesse tactique.",
      included: [
        "Livre de base",
        "Bestiaire",
        "Aventures"
      ],
      extensions: [
        {
          id: 31,
          name: "Advanced Player's Guide",
          subtitle: "Options avancées",
          price: 25,
          image: "/images/symbaroum-apg.jpg"
        },
        {
          id: 32,
          name: "Monster Codex",
          subtitle: "Créatures détaillées",
          price: 28,
          image: "/images/symbaroum-monsters.jpg"
        }
      ],
      type: 'paid'
    }
  };

  useEffect(() => {
    const ruleId = parseInt(id);
    if (ruleData[ruleId]) {
      setRule(ruleData[ruleId]);
    }
  }, [id]);

  const handleExtensionClick = (extension) => {
    console.log('Extension clicked:', extension);
    // Navigation vers la page de détails de l'extension
    navigate(`/campaigns/create/rules/${id}/extension/${extension.id}`);
  };

  const handleExtensionToggle = (extension) => {
    setSelectedExtensions(prev => {
      if (prev.find(ext => ext.id === extension.id)) {
        return prev.filter(ext => ext.id !== extension.id);
      } else {
        return [...prev, extension];
      }
    });
  };

  const calculateTotal = () => {
    const basePrice = rule?.price || 0;
    const extensionsPrice = selectedExtensions.reduce((total, ext) => total + ext.price, 0);
    return basePrice + extensionsPrice;
  };

  const handleUseRule = () => {
    console.log('Using rule:', rule);
    console.log('Selected extensions:', selectedExtensions);
    console.log('Total price:', calculateTotal());
    
    // Sauvegarder la sélection
    const selection = {
      rule: rule,
      extensions: selectedExtensions,
      totalPrice: calculateTotal()
    };
    
    localStorage.setItem('selectedRules', JSON.stringify(selection));
    
    // Retourner à la page de création
    navigate('/campaigns/create');
  };

  if (!rule) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-center text-light">
          <h1 className="text-2xl font-bold mb-4">Règles non trouvées</h1>
          <button
            onClick={() => navigate('/campaigns/create/rules')}
            className="bg-golden hover:bg-golden/80 text-dark px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Retour à la sélection
          </button>
        </div>
      </div>
    );
  }

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
          <span className="text-light/60">•</span>
          <button
            onClick={() => navigate('/campaigns/create/rules')}
            className="hover:text-light transition-colors"
          >
            Choisir des règles
          </button>
          <span className="text-light/60">•</span>
          <span className="text-golden">
            {rule.name}
          </span>
        </nav>
      </div>

      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header des règles */}
          <div className="bg-light/15 backdrop-blur-sm rounded-2xl border border-light/20 shadow-xl overflow-hidden mb-8">
            <div className="h-64 relative">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: rule.image ? 
                    `url(${rule.image})` : 
                    `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Prix sur l'image */}
                {rule.price && rule.price > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-golden text-dark px-3 py-2 rounded-full text-lg font-bold">
                      {rule.price}€
                    </span>
                  </div>
                )}
                
                {/* Tags sur l'image */}
                <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                  {rule.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Titre et éditeur */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-4xl font-bold text-light mb-2 eagle-lake-font">
                    {rule.name}
                  </h1>
                  <p className="text-light/90 text-lg">
                    par {rule.publisher}
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
                  <p>{rule.description}</p>
                </div>
              </div>

              {/* Contenu inclus */}
              <div className="bg-light/10 rounded-xl p-6 mb-6 border border-light/20">
                <h2 className="text-2xl font-bold text-light mb-4 eagle-lake-font">Contenu inclus</h2>
                <div className="space-y-2">
                  {rule.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-golden rounded-full"></div>
                      <span className="text-light/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extensions */}
              {rule.extensions.length > 0 && (
                <div className="bg-light/10 rounded-xl p-6 border border-light/20">
                  <h2 className="text-2xl font-bold text-light mb-4 eagle-lake-font">Extensions disponibles</h2>
                  
                  <div className="space-y-4">
                    {rule.extensions.map((extension) => (
                      <div
                        key={extension.id}
                        className="p-4 rounded-lg border border-light/20 bg-light/5 hover:bg-light/10 transition-colors cursor-pointer"
                        onClick={() => handleExtensionClick(extension)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-light mb-1">
                              {extension.name}
                            </h3>
                            <p className="text-light/80 text-sm">
                              {extension.subtitle}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-golden font-bold text-lg">
                              {extension.price}€
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (1/3) */}
            <div>
              
              {/* Récapitulatif prix */}
              <div className="bg-light/10 rounded-xl p-6 mb-6 border border-light/20">
                <h3 className="text-xl font-bold text-light mb-4 eagle-lake-font">Récapitulatif</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-light">
                    <span>Règles : {rule.name}</span>
                    <span className="font-bold">
                      {rule.price ? `${rule.price}€` : 'Gratuit'}
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
                        {calculateTotal()}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton Utiliser */}
              <button
                onClick={handleUseRule}
                className="w-full bg-golden hover:bg-golden/80 text-dark py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-3 shadow-lg"
              >
                <span>Utiliser ces règles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleDetails;
