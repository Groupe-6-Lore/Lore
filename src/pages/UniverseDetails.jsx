import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Bell, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UniverseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [universe, setUniverse] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

  // Données des univers selon wireframe
  const universeData = {
    1: {
      id: 1,
      name: "Dungeons & Dragons 5e",
      publisher: "Wizards of the Coast",
      price: 49,
      tags: ["Difficulté - Débutant", "Fantasy", "Liées"],
      description: "Dungeons & Dragons 5e est le système de jeu de rôle le plus populaire au monde. Cette édition simplifie les règles tout en conservant la profondeur tactique qui fait la renommée de D&D. Parfait pour les débutants comme pour les vétérans.",
      included: [
        "Manuel du MJ",
        "Manuel du Joueur"
      ],
      extensions: [],
      type: 'paid'
    },
    2: {
      id: 2,
      name: "Fate Core System",
      publisher: "Evil Hat Productions",
      price: null,
      tags: ["Difficulté - Facile", "Multi-genre", "Libres"],
      description: "Fate Core System est un jeu où les héros sont définis par leurs convictions, leurs failles et leurs choix. Vos aspects deviennent des leviers narratifs : une phrase peut changer le cours d'une bataille ou d'un destin. Avec des règles simples et universelles, Fate vous permet de créer ensemble n'importe quel monde — des royaumes de fantasy aux cités cyberpunk. Gratuit en PDF et enrichi de suppléments, il place vos histoires au cœur de l'aventure.",
      included: [
        "Livre de base",
        "Conseils pour MJ et joueurs"
      ],
      extensions: [
        {
          id: 11,
          name: "Fate Worlds",
          subtitle: "Suppléments univers",
          price: 7.50,
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 12,
          name: "Venture City",
          subtitle: "Suppléments univers",
          price: 8.00,
          image: "/images/venture-city.jpg"
        }
      ],
      type: 'free'
    },
    3: {
      id: 3,
      name: "Symbaroum Core Rulebook",
      publisher: "Free League Publishing",
      price: 49,
      tags: ["Difficulté - Avancé", "Dark Fantasy", "Liées"],
      description: "Au nord du royaume d'Ambria s'étend Davokar, une forêt ancienne emplie de ruines et de secrets maudits. Ses profondeurs promettent richesses et artefacts oubliés, mais aussi corruption et damnation pour les imprudents. Dans l'ombre des arbres colossaux, des clans barbares, des elfes millénaires et des créatures abjectes veillent sur un héritage dangereux. Les aventuriers, poussés par l'avidité ou la gloire, explorent ces terres au péril de leur âme. Le pouvoir des ombres grandit et chaque incursion rapproche le monde d'un nouvel âge de ténèbres. Symbaroum propose une dark fantasy où beauté et horreur se confondent, et où chaque victoire peut coûter votre humanité.",
      included: [
        "Manuel du MJ",
        "Manuel du Joueur"
      ],
      extensions: [
        {
          id: 1,
          name: "Advanced Player's Guide",
          price: 15,
          image: "/images/symbaroum-apg.jpg"
        },
        {
          id: 2,
          name: "Monster Codex", 
          price: 22,
          image: "/images/symbaroum-monsters.jpg"
        }
      ],
      type: 'paid'
    }
  };

  useEffect(() => {
    console.log('ID reçu:', id);
    console.log('Universe data:', universeData);
    const data = universeData[id];
    console.log('Universe trouvé:', data);
    if (data) {
      setUniverse(data);
    }
  }, [id]);

  const handleExtensionClick = (extension) => {
    // Navigation vers page détails de l'extension
    navigate(`/campaigns/create/universe/${id}/extension/${extension.id}`);
  };

  const handleExtensionToggle = (extensionId) => {
    setSelectedExtensions(prev => 
      prev.includes(extensionId) 
        ? prev.filter(id => id !== extensionId)
        : [...prev, extensionId]
    );
  };

  const calculateTotal = () => {
    if (!universe) return 0;
    const basePrice = universe.price || 0;
    const extensionsPrice = selectedExtensions.reduce((total, extId) => {
      const extension = universe.extensions.find(ext => ext.id === extId);
      return total + (extension ? extension.price : 0);
    }, 0);
    return basePrice + extensionsPrice;
  };

  const handleUseUniverse = () => {
    // Stocker l'univers sélectionné et retourner à la création de campagne
    const selectedData = {
      universe: universe,
      extensions: selectedExtensions.map(extId => 
        universe.extensions.find(ext => ext.id === extId)
      ).filter(Boolean)
    };
    sessionStorage.setItem('selectedUniverse', JSON.stringify(selectedData));
    navigate('/campaigns/create');
  };

  if (!universe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore */}
      <header className="flex items-center justify-between p-6 bg-primary-blue/90">
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

      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/70">
          <button onClick={() => navigate('/campaigns')} className="hover:text-light transition-colors">
            Mes campagnes
          </button>
          <span>›</span>
          <button onClick={() => navigate('/campaigns/create')} className="hover:text-light transition-colors">
            Créer une campagne
          </button>
        </nav>
      </div>

      {/* Layout principal selon wireframe */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Image */}
          <div>
            <div className="aspect-[3/4] bg-light/10 rounded-lg flex items-center justify-center border border-light/20">
              <div className="text-light/40 text-8xl font-bold opacity-50">IMG</div>
            </div>
          </div>

          {/* Colonne droite - Contenu */}
          <div>
            {/* Titre et éditeur */}
            <h2 className="text-4xl font-bold text-light mb-2 eagle-lake-font">
              {universe.name}
            </h2>
            <p className="text-light/80 text-lg mb-8">{universe.publisher}</p>

            {/* Section Présentation avec tags */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-2xl font-bold text-light eagle-lake-font">Présentation</h3>
                <div className="flex flex-wrap gap-2">
                  {universe.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-golden text-dark px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-light/90 leading-relaxed text-sm">{universe.description}</p>
            </div>

            {/* Section Compris */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Compris</h4>
              <ul className="space-y-2">
                {universe.included.map((item, index) => (
                  <li key={index} className="text-light/80 flex items-start text-sm">
                    <span className="text-golden mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Achats facultatifs */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Achats facultatifs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {universe.extensions.map(extension => (
                  <div 
                    key={extension.id}
                    onClick={() => handleExtensionClick(extension)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedExtensions.includes(extension.id)
                        ? 'ring-2 ring-golden'
                        : 'hover:ring-1 hover:ring-light/30'
                    }`}
                    style={{ backgroundColor: 'rgba(13, 21, 26, 0.7)' }}
                  >
                    <div className="aspect-[4/3] bg-light/20 flex items-center justify-center">
                      <div className="text-light/40 text-4xl font-bold opacity-50">IMG</div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-light font-semibold text-sm mb-2">{extension.name}</h5>
                      <p className="text-light font-bold text-lg">{extension.price} €</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prix et bouton - CORRECTION AFFICHAGE PRIX */}
            <div className="flex items-center justify-between">
              {universe.type === 'free' ? (
                <div className="text-4xl font-bold text-light">
                  {selectedExtensions.length > 0 ? `${total} €` : "Gratuit"}
                </div>
              ) : (
                <div className="text-4xl font-bold text-light">
                  {universe.price} €
                  {selectedExtensions.length > 0 && (
                    <span className="text-lg text-light/70 ml-2">+ {total - universe.price}€ ext.</span>
                  )}
                </div>
              )}
              
              <button
                onClick={handleUseUniverse}
                className="bg-golden text-dark px-6 py-3 rounded-lg font-bold text-lg hover:bg-golden/80 transition-colors"
              >
                Utiliser cet univers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseDetails;