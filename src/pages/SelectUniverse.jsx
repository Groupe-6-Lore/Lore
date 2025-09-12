import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SelectUniverse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedFilters, setSelectedFilters] = useState({
    themes: [],
    rules: [],
    prices: [],
    difficulty: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [allFilteredUniverses, setAllFilteredUniverses] = useState([]);
  const itemsPerPage = 12;
  const [userLibrary, setUserLibrary] = useState([]);
  const [userPlayedGames, setUserPlayedGames] = useState([]);

  const allUniverses = [
    { id: 1, name: "Dungeons & Dragons 5e", description: "Manuel des joueurs - Système de jeu de rôle fantasy épique avec des règles complètes pour créer des aventures", publisher: "Wizards of the Coast", price: 49.99, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/dnd5e.jpg", popularity: 95 },
    { id: 2, name: "Donjons & Dragons de l'Ère Moderne", description: "Livre de règles", publisher: "Wizards of the Coast", price: 45.99, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/dnd-modern.jpg", popularity: 88 },
    { id: 3, name: "L'Univers Héroïque 2e Edition", description: "Livre principal", publisher: "Free League", price: null, type: "free", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/heroic-universe.jpg", popularity: 75 },
    { id: 4, name: "L'Appel de Cthulhu - 7e Edition", description: "Livre de base", publisher: "Chaosium et Sans-Détour", price: null, type: "free", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/cthulhu.jpg", popularity: 92 },
    { id: 6, name: "Pathfinder 2e", description: "Livre de base", publisher: "Greg Stafford / Chaosium", price: 40, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/pathfinder.jpg", popularity: 85 },
    { id: 7, name: "Lasers & Feelings", description: "Jeu narratif", publisher: "John Harper", price: null, type: "freemium", isOwned: false, hasOptionalPurchases: true, themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Débutant", image: "/images/lasers-feelings.jpg", popularity: 60 },
    { id: 8, name: "Dungeon World", description: "Règles narratives - Système de jeu de rôle fantasy avec des mécaniques innovantes et une approche narrative unique", publisher: "Sage Kobold", price: null, type: "free", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/dungeon-world.jpg", popularity: 80 },
    { id: 9, name: "Vampire: The Masquerade", description: "5e édition", publisher: "White Wolf", price: 55, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/vampire.jpg", popularity: 78 },
    { id: 10, name: "Cyberpunk RED", description: "Livre de base", publisher: "R. Talsorian Games", price: 60, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Expert", image: "/images/cyberpunk.jpg", popularity: 82 },
    { id: 11, name: "Fiasco", description: "Jeu de rôle narratif", publisher: "Bully Pulpit Games", price: null, type: "free", themes: ["Comédie & Parodique"], rules: ["Libres"], difficulty: "Débutant", image: "/images/fiasco.jpg", popularity: 65 },
    { id: 12, name: "Blades in the Dark", description: "Livre de base", publisher: "John Harper", price: 50, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/blades.jpg", popularity: 85 },
    { id: 13, name: "Call of Cthulhu", description: "7e édition", publisher: "Chaosium", price: null, type: "free", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/call-cthulhu.jpg", popularity: 90 },
    { id: 14, name: "Numenera", description: "Discovery & Destiny", publisher: "Monte Cook Games", price: 45, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/numenera.jpg", popularity: 72 },
    { id: 15, name: "Apocalypse World", description: "2e édition", publisher: "D. Vincent Baker", price: 35, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/apocalypse-world.jpg", popularity: 85 },
    { id: 16, name: "Monsterhearts", description: "Jeu de monstres adolescents", publisher: "Avery Alder", price: 25, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Débutant", image: "/images/monsterhearts.jpg", popularity: 68 },
    { id: 17, name: "Masks: A New Generation", description: "Super-héros adolescents", publisher: "Brendan Conway", price: 30, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Débutant", image: "/images/masks.jpg", popularity: 75 },
    { id: 18, name: "The Sprawl", description: "Cyberpunk narratif", publisher: "Hamish Cameron", price: 40, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/the-sprawl.jpg", popularity: 70 },
    { id: 19, name: "Urban Shadows", description: "Horreur urbaine", publisher: "Andrew Medeiros", price: 35, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/urban-shadows.jpg", popularity: 73 },
    { id: 20, name: "Fellowship", description: "Fantasy épique", publisher: "Jacob Randolph", price: 30, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/fellowship.jpg", popularity: 77 },
    { id: 21, name: "The Veil", description: "Cyberpunk transhumaniste", publisher: "Samjoko Publishing", price: 25, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Expert", image: "/images/the-veil.jpg", popularity: 62 },
    { id: 22, name: "Bluebeard's Bride", description: "Horreur gothique", publisher: "Marissa Kelly", price: 45, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/bluebeards-bride.jpg", popularity: 58 },
    { id: 23, name: "Dream Askew", description: "Post-apocalyptique queer", publisher: "Avery Alder", price: null, type: "free", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/dream-askew.jpg", popularity: 55 },
    { id: 24, name: "Wanderhome", description: "Fantasy pastoral", publisher: "Jay Dragon", price: 35, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Débutant", image: "/images/wanderhome.jpg", popularity: 82 },
    { id: 25, name: "Thirsty Sword Lesbians", description: "Fantasy queer", publisher: "April Kit Walsh", price: 30, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Débutant", image: "/images/thirsty-sword.jpg", popularity: 75 },
    { id: 26, name: "Neverland", description: "Jeux narratifs", publisher: "Scott Malthouse", price: 38, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/neverland.jpg", popularity: 65 },
    { id: 27, name: "Pax Ethica", description: "Science-fiction", publisher: "Scott Malthouse", price: 24, type: "paid", themes: ["Science-fiction"], rules: ["Liées"], difficulty: "Expert", image: "/images/pax-ethica.jpg", popularity: 45 },
    { id: 28, name: "Lady Blackbird", description: "Jeu narratif", publisher: "John Harper", price: null, type: "free", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Débutant", image: "/images/lady-blackbird.jpg", popularity: 70 },
    { id: 29, name: "Aria", description: "Système générique", publisher: "Last Unicorn / Elder Craft", price: 60, type: "paid", themes: ["Autres"], rules: ["Liées"], difficulty: "Expert", image: "/images/aria.jpg", popularity: 40 },
    { id: 30, name: "Microscope", description: "Création d'histoire collaborative", publisher: "Ben Robbins", price: null, type: "free", themes: ["Autres"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/microscope.jpg", popularity: 55 },
    { id: 31, name: "Forbidden Lands", description: "Exploration et survie", publisher: "Tomas Härenstam", price: 42, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Intermédiaire", image: "/images/forbidden-lands.jpg", popularity: 72 },
    { id: 32, name: "Horror in Arkham", description: "Horreur cosmique", publisher: "Chaosium", price: 35, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/horror-arkham.jpg", popularity: 78 },
    { id: 33, name: "Warhammer Fantasy Roleplay", description: "4e édition", publisher: "Cubicle 7", price: 45, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Expert", image: "/images/warhammer-fantasy.jpg", popularity: 78 },
    { id: 34, name: "Shadowrun", description: "6e édition", publisher: "Catalyst Game Labs", price: 50, type: "paid", themes: ["Science-fiction"], rules: ["Liées"], difficulty: "Expert", image: "/images/shadowrun.jpg", popularity: 72 },
    { id: 35, name: "World of Darkness", description: "Système de base", publisher: "White Wolf", price: 35, type: "paid", themes: ["Horreur & Mystère"], rules: ["Liées"], difficulty: "Intermédiaire", image: "/images/world-of-darkness.jpg", popularity: 85 },
    { id: 36, name: "GURPS", description: "Système générique", publisher: "Steve Jackson Games", price: 40, type: "paid", themes: ["Autres"], rules: ["Liées"], difficulty: "Expert", image: "/images/gurps.jpg", popularity: 68 },
    { id: 37, name: "Honey Heist", description: "Jeu narratif court", publisher: "Grant Howitt", price: null, type: "free", themes: ["Comédie & Parodique"], rules: ["Libres"], difficulty: "Débutant", image: "/images/honey-heist.jpg", popularity: 55 },
    { id: 38, name: "The Quiet Year", description: "Construction de communauté", publisher: "Avery Alder", price: null, type: "free", themes: ["Autres"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/quiet-year.jpg", popularity: 62 },
    { id: 39, name: "Dread", description: "Horreur avec Jenga", publisher: "Rafael Chandler", price: null, type: "free", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Débutant", image: "/images/dread.jpg", popularity: 58 },
    { id: 40, name: "Mutant: Year Zero", description: "Post-apocalyptique", publisher: "Free League Publishing", price: 45, type: "paid", themes: ["Science-fiction"], rules: ["Liées"], difficulty: "Intermédiaire", image: "/images/mutant-year-zero.jpg", popularity: 85 },
    
    // AJOUTER CES 2 NOUVEAUX :
    {
      id: 'symbaroum-core',
      name: 'Symbaroum Core Rulebook',
      publisher: 'Free League Publishing',
      description: 'Système de jeu de rôle dark fantasy dans un monde mystérieux où la magie corrompt et transforme tout ce qu\'elle touche.',
      themes: ['Fantasy'],
      rules: ['Libres'],
      difficulty: 'Intermédiaire',
      price: 45.99,
      type: 'owned',
      isOwned: true,
      image: '/images/symbaroum.jpg',
      popularity: 78
    },
    {
      id: 'fate-core',
      name: 'Fate Core System',
      publisher: 'Evil Hat Productions',
      description: 'Système générique narratif extrêmement flexible permettant de créer vos propres aventures dans n\'importe quel univers imaginable.',
      themes: ['Générique'],
      rules: ['Libres'],
      difficulty: 'Intermédiaire',
      price: null,
      type: 'owned',
      isOwned: true,
      image: '/images/fate-core.jpg',
      popularity: 82
    },
    
    // JEUX FREEMIUM MANQUANTS
    {
      id: 44,
      name: "Pathfinder 2e (Version de base)",
      publisher: "Paizo Publishing",
      description: "Règles de base gratuites du célèbre JDR fantasy avec contenu avancé payant",
      themes: ["Fantasy"],
      rules: ["Liées"],
      difficulty: "Intermédiaire",
      price: null,
      type: "freemium",
      hasOptionalPurchases: true,
      image: "/images/pathfinder-2e-free.jpg",
      popularity: 82
    },
    {
      id: 45,
      name: "Starfinder (Règles de base)",
      publisher: "Paizo Publishing", 
      description: "JDR de science-fiction gratuit en version de base avec suppléments payants",
      themes: ["Science-fiction"],
      rules: ["Liées"],
      difficulty: "Intermédiaire",
      price: null,
      type: "freemium",
      hasOptionalPurchases: true,
      image: "/images/starfinder-free.jpg",
      popularity: 75
    }
  ];

  // Section univers déjà connus - UN SEUL RÉELLEMENT POSSÉDÉ
  const knownUniverses = [
    {
      id: 'known-1',
      name: 'Dungeons & Dragons 5e',
      publisher: 'Wizards of the Coast',
      description: 'Manuel des joueurs - Système de jeu de rôle fantasy épique',
      themes: ['Fantasy'],
      rules: ['Libres'],
      difficulty: 'Débutant',
      price: 49.99,
      isOwned: true // SEUL RÉELLEMENT POSSÉDÉ
    },
    {
      id: 'known-2',
      name: 'Symbaroum Core Rulebook',
      publisher: 'Free League Publishing',
      description: 'Dark fantasy dans un monde mystérieux où la magie corrompt',
      themes: ['Fantasy'],
      rules: ['Libres'],
      difficulty: 'Intermédiaire',
      price: 45.99,
      isOwned: false // Pas réellement possédé
    },
    {
      id: 'known-3',
      name: 'Fate Core System',
      publisher: 'Evil Hat Productions',
      description: 'Système générique narratif flexible',
      themes: ['Générique'],
      rules: ['Libres'],
      difficulty: 'Intermédiaire',
      price: null,
      isOwned: false // Pas réellement possédé
    },
    {
      id: 'known-4',
      name: 'L\'Appel de Cthulhu - 7e Edition',
      publisher: 'Chaosium et Sans-Détour',
      description: 'Horreur cosmique et mystère dans les années 1920',
      themes: ['Horreur & Mystère'],
      rules: ['Libres'],
      difficulty: 'Expert',
      price: null,
      isOwned: false // Pas réellement possédé
    }
  ];

  // Vérification des données
  console.log("Premier univers:", allUniverses[0]);
  console.log("Univers connus:", knownUniverses);
  console.log("Jeux freemium:", allUniverses.filter(u => u.type === 'freemium'));

  useEffect(() => {
    if (user) {
      setUserLibrary([1, 2]);
      setUserPlayedGames([3, 4]);
    }
  }, [user]);

  const filterOptions = {
    themes: ["Fantasy", "Science-fiction", "Horreur & Mystère", "Historique & Réaliste", "Comédie & Parodique", "Générique", "Autres"],
    rules: ["Liées", "Libres"],
    prices: ["free", "freemium", "paid", "owned"],
    difficulty: ["Débutant", "Intermédiaire", "Expert"]
  };

  const sortOptions = [
    { value: 'popularity', label: 'Trier par popularité' },
    { value: 'alphabetical', label: 'Ordre alphabétique' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' }
  ];

  useEffect(() => {
    let filtered = allUniverses.filter(universe => {
      const matchesSearch = universe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           universe.publisher.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesThemes = selectedFilters.themes.length === 0 || 
                           selectedFilters.themes.some(theme => universe.themes.includes(theme));
      const matchesRules = selectedFilters.rules.length === 0 || 
                          selectedFilters.rules.some(rule => universe.rules.includes(rule));
      const matchesPrices = selectedFilters.prices.length === 0 || 
                           selectedFilters.prices.some(priceFilter => {
                             if (priceFilter === 'free' && universe.price === null && universe.type !== 'freemium') return true;
                             if (priceFilter === 'freemium' && universe.type === 'freemium') return true;
                             if (priceFilter === 'paid' && universe.price !== null) return true;
                             if (priceFilter === 'owned' && universe.type === 'owned') return true;
                             return false;
                           });
      const matchesDifficulty = selectedFilters.difficulty.length === 0 || 
                               selectedFilters.difficulty.includes(universe.difficulty);

      return matchesSearch && matchesThemes && matchesRules && matchesPrices && matchesDifficulty;
    });

    const sortUniverses = (universesToSort) => {
      return universesToSort.sort((a, b) => {
        switch (sortBy) {
          case 'alphabetical':
            return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
          case 'price_asc':
            if ((a.type === 'free' || a.type === 'freemium') && 
                (b.type === 'paid' || b.type === 'owned')) return -1;
            if ((b.type === 'free' || b.type === 'freemium') && 
                (a.type === 'paid' || a.type === 'owned')) return 1;
            // Ordre: free (0) -> freemium (0.5) -> paid/owned (prix réel)
            const getPriceValue = (universe) => {
              if (universe.type === 'free') return 0;
              if (universe.type === 'freemium') return 0.5;
              // owned et paid sont traités de la même façon avec leur prix réel
              return universe.price || 0;
            };
            return getPriceValue(a) - getPriceValue(b);
          case 'price_desc':
            if ((a.type === 'free' || a.type === 'freemium') && 
                (b.type === 'paid' || b.type === 'owned')) return 1;
            if ((b.type === 'free' || b.type === 'freemium') && 
                (a.type === 'paid' || a.type === 'owned')) return -1;
            // Ordre inverse: paid/owned (prix réel) -> freemium (0.5) -> free (0)
            const getPriceValueDesc = (universe) => {
              if (universe.type === 'free') return 0;
              if (universe.type === 'freemium') return 0.5;
              // owned et paid sont traités de la même façon avec leur prix réel
              return universe.price || 0;
            };
            return getPriceValueDesc(b) - getPriceValueDesc(a);
          case 'popularity':
          default:
            return b.popularity - a.popularity;
        }
      });
    };

    const sortedFiltered = sortUniverses([...filtered]);
    setAllFilteredUniverses(sortedFiltered);
    setCurrentPage(1);
  }, [searchTerm, selectedFilters, sortBy]);

  // Calcul de la pagination pour l'affichage
  const totalPages = Math.ceil(allFilteredUniverses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUniverses = allFilteredUniverses.slice(startIndex, endIndex);

  const ownedUniverses = currentUniverses.filter(u => {
    return u.type === 'owned' || 
           userLibrary.includes(u.id) || 
           userPlayedGames.includes(u.id);
  });

  const unknownUniverses = currentUniverses.filter(u => {
    return u.type !== 'owned' && 
           !userLibrary.includes(u.id) && 
           !userPlayedGames.includes(u.id);
  });

  // Vérification des univers connus/inconnus
  console.log("knownUniverses (ownedUniverses):", ownedUniverses);
  console.log("unknownUniverses:", unknownUniverses);

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleUniverseSelect = (universeId) => {
    navigate(`/campaigns/create/universe/${universeId}/details`);
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      <header className="flex items-center justify-between p-4 sm:p-6 bg-primary-blue/90">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={20} className="sm:w-6 sm:h-6" />
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold text-sm sm:text-base">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <nav className="flex items-center space-x-2 text-light/80 text-sm sm:text-base">
          <button onClick={() => navigate('/campaigns')} className="hover:text-light transition-colors">
            Mes campagnes
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden border-b border-golden pb-1">Créer une campagne</span>
        </nav>
      </div>

      <div className="px-4 sm:px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-80 bg-light/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 lg:sticky lg:top-6 lg:h-fit mb-8 lg:mb-0">
            <h3 className="text-light font-bold text-xl calligraphy-font mb-6">Filtres</h3>
            
            <div className="mb-6">
              <h4 className="text-light/90 font-semibold mb-3">Par thème</h4>
              <div className="space-y-2">
                {filterOptions.themes.map(theme => (
                  <label key={theme} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.themes.includes(theme)}
                      onChange={() => toggleFilter('themes', theme)}
                      className="filter-checkbox mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{theme}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-light/90 font-semibold mb-3">Par règles</h4>
              <div className="space-y-2">
                {filterOptions.rules.map(rule => (
                  <label key={rule} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.rules.includes(rule)}
                      onChange={() => toggleFilter('rules', rule)}
                      className="filter-checkbox mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{rule}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-light/90 font-semibold mb-3">Par prix</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.prices.includes('free')}
                    onChange={() => toggleFilter('prices', 'free')}
                    className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                  />
                  <span className="text-light/80 text-sm">Gratuit</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.prices.includes('freemium')}
                    onChange={() => toggleFilter('prices', 'freemium')}
                    className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                  />
                  <span className="text-light/80 text-sm">Gratuit avec achats facultatifs</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.prices.includes('paid')}
                    onChange={() => toggleFilter('prices', 'paid')}
                    className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                  />
                  <span className="text-light/80 text-sm">Payant</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.prices.includes('owned')}
                    onChange={() => toggleFilter('prices', 'owned')}
                    className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                  />
                  <span className="text-light/80 text-sm">Possédé</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-light/90 font-semibold mb-3">Par difficulté</h4>
              <div className="space-y-2">
                {filterOptions.difficulty.map(diff => (
                  <label key={diff} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.difficulty.includes(diff)}
                      onChange={() => toggleFilter('difficulty', diff)}
                      className="filter-checkbox mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{diff}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-light eagle-lake-font">
                Choix de l'univers
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/60" />
                  <input
                    type="text"
                    placeholder="Rechercher des jeux de rôles"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input pl-10 pr-4 py-3 w-full sm:w-80 rounded-lg border border-light/30 bg-light text-dark placeholder-dark/60 focus:ring-2 focus:ring-golden focus:border-transparent"
                  />
                </div>
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-golden text-dark border border-golden rounded-lg px-4 py-3 pr-10 w-full sm:w-auto focus:ring-2 focus:ring-golden focus:border-transparent cursor-pointer font-semibold"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} className="text-dark">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark pointer-events-none" />
                </div>
              </div>
            </div>

            {(selectedFilters.themes.length > 0 || 
              selectedFilters.rules.length > 0 || 
              selectedFilters.prices.length > 0 || 
              selectedFilters.difficulty.length > 0) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.themes.map(theme => (
                    <span 
                      key={`selected-theme-${theme}`}
                      className="bg-golden text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {theme}
                      <button
                        onClick={() => toggleFilter('themes', theme)}
                        className="text-white hover:text-dark transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  
                  {selectedFilters.rules.map(rule => (
                    <span 
                      key={`selected-rule-${rule}`}
                      className="bg-golden text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {rule}
                      <button
                        onClick={() => toggleFilter('rules', rule)}
                        className="text-white hover:text-dark transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  
                  {selectedFilters.prices.map(price => (
                    <span 
                      key={`selected-price-${price}`}
                      className="bg-golden text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {price === 'free' ? 'Gratuit' : 
                       price === 'freemium' ? 'Gratuit avec achats facultatifs' :
                       price === 'paid' ? 'Payant' : 
                       price === 'owned' ? 'Possédé' : price}
                      <button
                        onClick={() => toggleFilter('prices', price)}
                        className="text-white hover:text-dark transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  
                  {selectedFilters.difficulty.map(diff => (
                    <span 
                      key={`selected-diff-${diff}`}
                      className="bg-golden text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {diff}
                      <button
                        onClick={() => toggleFilter('difficulty', diff)}
                        className="text-white hover:text-dark transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  
                  <button
                    onClick={() => setSelectedFilters({
                      themes: [],
                      rules: [],
                      prices: [],
                      difficulty: []
                    })}
                    className="text-light/60 hover:text-light text-sm underline"
                  >
                    Effacer tous les filtres
                  </button>
                </div>
              </div>
            )}

            {/* Section Univers déjà connus - MASQUÉE si recherche active */}
            {!searchTerm && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Univers déjà connus</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {knownUniverses.map((universe) => (
                    <UniverseCard 
                      key={universe.id}
                      universe={universe}
                      onClick={handleUniverseSelect}
                      isKnown={true}  // TOUS dans cette section sont marqués visuellement comme connus
                    />
                  ))}
                </div>
              </div>
            )}

            {ownedUniverses.length > 0 && unknownUniverses.length > 0 && (
              <div className="border-t border-light/20 my-8"></div>
            )}

            {/* Grille principale - TOUJOURS VISIBLE (sauf si filtre "Possédé") */}
            {!selectedFilters.prices.includes('owned') && currentUniverses.length > 0 && (
              <div className="mb-8">
                {ownedUniverses.length > 0 && !searchTerm ? (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Autres univers disponibles</h3>
                ) : (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Univers disponibles</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentUniverses.map((universe) => (
                    <UniverseCard 
                      key={universe.id}
                      universe={universe}
                      onClick={handleUniverseSelect}
                      isKnown={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {ownedUniverses.length === 0 && unknownUniverses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-light/60 text-lg mb-4">
                  Aucun univers ne correspond à vos critères de recherche
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilters({ themes: [], rules: [], prices: [], difficulty: [] });
                  }}
                  className="bg-golden text-dark px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}


            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/10 text-white rounded disabled:opacity-50 hover:bg-white/20 transition-colors"
                >
                  Précédent
                </button>
                
                <span className="text-white mx-4">
                  Page {currentPage} sur {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/10 text-white rounded disabled:opacity-50 hover:bg-white/20 transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}

            {allFilteredUniverses.length > 0 && (
              <div className="text-center text-light/60 text-sm mt-4">
                {allFilteredUniverses.length} univers au total
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pour les cartes "univers connus" ET "univers inconnus"
// Même structure, même CSS, même alignement
const UniverseCard = ({ universe, onClick, isKnown = false }) => {
  return (
    <div 
      onClick={() => onClick(universe.id)}
      className="universe-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      style={{ backgroundColor: 'rgba(13, 21, 26, 0.7)' }}
    >
      {/* Zone image AVEC CLASSES LORE ORIGINALES */}
      <div className="universe-image-container relative h-48 overflow-hidden">
        {/* Background pattern LORE original */}
        <div className="w-full h-full bg-white opacity-70 flex items-center justify-center"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '30px 30px'
             }}>
        </div>
        
        {/* TAGS REPOSITIONNÉS - AVEC RETOUR À LA LIGNE */}
        <div className="absolute top-2 right-2 z-10 universe-tags-container">
          <div className="flex flex-wrap gap-1 justify-end">
            {/* Badge "Déjà possédé" - Pour section univers connus OU si réellement possédé */}
            {(isKnown || universe.isOwned || universe.type === 'owned') && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Possédé
              </span>
            )}
            
            {/* Tags thèmes - Doré Lore */}
            {universe.themes?.map((theme, index) => (
              <span key={`theme-${index}`} className="bg-[#E9BD72] text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {theme}
              </span>
            ))}
            
            {/* Tags règles - Bleu */}
            {universe.rules?.map((rule, index) => (
              <span key={`rule-${index}`} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {rule}
              </span>
            ))}
            
            {/* Tag difficulté - Violet */}
            {universe.difficulty && (
              <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {universe.difficulty}
              </span>
            )}
            
            {/* Tag gratuit avec achats facultatifs - Orange */}
            {universe.hasOptionalPurchases && universe.price === null && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Achats optionnels
              </span>
            )}
            
            {/* Tag gratuit - Vert (seulement si pas déjà possédé et pas freemium) */}
            {universe.price === null && !isKnown && !universe.hasOptionalPurchases && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Gratuit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contenu AVEC CLASSES LORE ORIGINALES */}
      <div className="universe-card-content p-4 flex flex-col h-40">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{universe.name}</h3>
        <p className="text-sm text-white/70 mb-2">{universe.publisher}</p>
        
        {/* Description avec MOINS d'espace avant séparateur */}
        <p className="universe-description text-xs text-white/60 flex-grow mb-2 line-clamp-2">
          {universe.description}
        </p>
        
        {/* Séparateur et prix - CLASSES LORE ORIGINALES */}
        <div className="universe-separator-section border-t border-white/20 pt-2 mt-auto">
          <div className="universe-price-row flex items-center justify-between">
            <div className="universe-price-content">
              <div className="universe-price-text font-semibold text-white text-sm">
                {isKnown ? "Déjà possédé" : 
                 universe.isOwned ? "Déjà possédé" : 
                 universe.type === 'owned' ? "Déjà possédé" :
                 universe.type === 'freemium' ? "Gratuit avec achats facultatifs" :
                 universe.price === null ? "Gratuit" : `${universe.price} €`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUniverse;