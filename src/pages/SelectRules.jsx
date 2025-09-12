import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SelectRules = () => {
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
  const [allFilteredRules, setAllFilteredRules] = useState([]);
  const itemsPerPage = 12;
  const [userLibrary, setUserLibrary] = useState([]);
  const [userPlayedGames, setUserPlayedGames] = useState([]);

  const allRules = [
    { id: 1, name: "D&D 5e", description: "Système de jeu de rôle fantasy épique avec des règles complètes pour créer des aventures", publisher: "Wizards of the Coast", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/dnd5e-rules.jpg", popularity: 95 },
    { id: 2, name: "Pathfinder 2e", description: "Système de jeu de rôle fantasy tactique avec des règles sophistiquées", publisher: "Paizo Publishing", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/pathfinder-rules.jpg", popularity: 85 },
    { id: 3, name: "Call of Cthulhu", description: "Système d'horreur cosmique basé sur l'univers de H.P. Lovecraft", publisher: "Chaosium", price: 45, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/cthulhu-rules.jpg", popularity: 92 },
    { id: 4, name: "Vampire: The Masquerade", description: "Système de jeu de rôle gothique moderne avec des vampires", publisher: "White Wolf", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/vampire-rules.jpg", popularity: 78 },
    { id: 5, name: "Cyberpunk RED", description: "Système de cyberpunk futuriste avec technologie et cybernétique", publisher: "R. Talsorian Games", price: 60, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Expert", image: "/images/cyberpunk-rules.jpg", popularity: 82 },
    { id: 6, name: "Fate Core", description: "Système narratif générique flexible pour tous types d'aventures", publisher: "Evil Hat Productions", price: 0, type: "free", themes: ["Générique"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/fate-rules.jpg", popularity: 80 },
    { id: 7, name: "Apocalypse World", description: "Système post-apocalyptique avec mécaniques innovantes", publisher: "D. Vincent Baker", price: 35, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/apocalypse-rules.jpg", popularity: 85 },
    { id: 8, name: "Blades in the Dark", description: "Système de bande criminelle dans une ville sombre et industrielle", publisher: "John Harper", price: 50, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/blades-rules.jpg", popularity: 85 },
    { id: 9, name: "Lasers & Feelings", description: "Système minimaliste de science-fiction pour sessions courtes", publisher: "John Harper", price: 0, type: "free", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Débutant", image: "/images/lasers-rules.jpg", popularity: 60 },
    { id: 10, name: "Dungeon World", description: "Système fantasy narratif avec mécaniques PbtA", publisher: "Sage Kobold", price: 0, type: "free", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/dungeon-world-rules.jpg", popularity: 80 },
    { id: 11, name: "Fiasco", description: "Système narratif pour histoires de comédie noire", publisher: "Bully Pulpit Games", price: 0, type: "free", themes: ["Comédie & Parodique"], rules: ["Libres"], difficulty: "Débutant", image: "/images/fiasco-rules.jpg", popularity: 65 },
    { id: 12, name: "Monsterhearts", description: "Système de monstres adolescents avec drama", publisher: "Avery Alder", price: 25, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Débutant", image: "/images/monsterhearts-rules.jpg", popularity: 68 },
    { id: 13, name: "Masks: A New Generation", description: "Système de super-héros adolescents avec émotions", publisher: "Brendan Conway", price: 30, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Débutant", image: "/images/masks-rules.jpg", popularity: 75 },
    { id: 14, name: "The Sprawl", description: "Système cyberpunk narratif avec missions", publisher: "Hamish Cameron", price: 40, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/the-sprawl-rules.jpg", popularity: 70 },
    { id: 15, name: "Urban Shadows", description: "Système d'horreur urbaine avec politique surnaturelle", publisher: "Andrew Medeiros", price: 35, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/urban-shadows-rules.jpg", popularity: 73 },
    { id: 16, name: "Fellowship", description: "Système fantasy épique avec héros contre l'empire", publisher: "Jacob Randolph", price: 30, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/fellowship-rules.jpg", popularity: 77 },
    { id: 17, name: "The Veil", description: "Système cyberpunk transhumaniste avec IA", publisher: "Samjoko Publishing", price: 25, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Expert", image: "/images/the-veil-rules.jpg", popularity: 62 },
    { id: 18, name: "Bluebeard's Bride", description: "Système d'horreur gothique avec psychologie", publisher: "Marissa Kelly", price: 45, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/bluebeards-bride-rules.jpg", popularity: 58 },
    { id: 19, name: "Dream Askew", description: "Système post-apocalyptique queer sans MJ", publisher: "Avery Alder", price: 0, type: "free", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/dream-askew-rules.jpg", popularity: 55 },
    { id: 20, name: "Wanderhome", description: "Système fantasy pastoral sans violence", publisher: "Jay Dragon", price: 35, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Débutant", image: "/images/wanderhome-rules.jpg", popularity: 82 },
    
    // Systèmes manquants de SelectUniverse.jsx
    { id: 21, name: "D&D Modern", description: "Système D&D adapté pour l'époque moderne", publisher: "Wizards of the Coast", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/dnd-modern-rules.jpg", popularity: 88 },
    { id: 22, name: "L'Univers Héroïque", description: "Système fantasy épique avec héros légendaires", publisher: "Free League", price: 0, type: "free", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/heroic-universe-rules.jpg", popularity: 75 },
    { id: 23, name: "Numenera", description: "Système science-fiction avec technologie mystérieuse", publisher: "Monte Cook Games", price: 45, type: "paid", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/numenera-rules.jpg", popularity: 72 },
    { id: 24, name: "Thirsty Sword Lesbians", description: "Système fantasy queer avec romance et aventure", publisher: "April Kit Walsh", price: 30, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Débutant", image: "/images/thirsty-sword-rules.jpg", popularity: 75 },
    { id: 25, name: "Neverland", description: "Système narratif pour histoires d'aventure", publisher: "Scott Malthouse", price: 38, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Débutant", image: "/images/neverland-rules.jpg", popularity: 65 },
    { id: 26, name: "Pax Ethica", description: "Système science-fiction éthique et philosophique", publisher: "Scott Malthouse", price: 24, type: "paid", themes: ["Science-fiction"], rules: ["Liées"], difficulty: "Expert", image: "/images/pax-ethica-rules.jpg", popularity: 45 },
    { id: 27, name: "Lady Blackbird", description: "Système narratif pour aventures spatiales", publisher: "John Harper", price: 0, type: "free", themes: ["Science-fiction"], rules: ["Libres"], difficulty: "Débutant", image: "/images/lady-blackbird-rules.jpg", popularity: 70 },
    { id: 28, name: "Aria", description: "Système générique complexe pour tous genres", publisher: "Last Unicorn / Elder Craft", price: 60, type: "paid", themes: ["Autres"], rules: ["Liées"], difficulty: "Expert", image: "/images/aria-rules.jpg", popularity: 40 },
    { id: 29, name: "Microscope", description: "Système de création d'histoire collaborative", publisher: "Ben Robbins", price: 0, type: "free", themes: ["Autres"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/microscope-rules.jpg", popularity: 55 },
    { id: 30, name: "Forbidden Lands", description: "Système d'exploration et survie fantasy", publisher: "Tomas Härenstam", price: 42, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Intermédiaire", image: "/images/forbidden-lands-rules.jpg", popularity: 72 },
    { id: 31, name: "Horror in Arkham", description: "Système d'horreur cosmique dans Arkham", publisher: "Chaosium", price: 35, type: "paid", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Expert", image: "/images/horror-arkham-rules.jpg", popularity: 78 },
    { id: 32, name: "Warhammer Fantasy Roleplay", description: "Système fantasy sombre et brutal", publisher: "Cubicle 7", price: 45, type: "paid", themes: ["Fantasy"], rules: ["Liées"], difficulty: "Expert", image: "/images/warhammer-fantasy-rules.jpg", popularity: 78 },
    { id: 33, name: "Shadowrun", description: "Système cyberpunk avec magie et technologie", publisher: "Catalyst Game Labs", price: 50, type: "paid", themes: ["Science-fiction"], rules: ["Liées"], difficulty: "Expert", image: "/images/shadowrun-rules.jpg", popularity: 72 },
    { id: 34, name: "World of Darkness", description: "Système d'horreur urbaine moderne", publisher: "White Wolf", price: 35, type: "paid", themes: ["Horreur & Mystère"], rules: ["Liées"], difficulty: "Intermédiaire", image: "/images/world-of-darkness-rules.jpg", popularity: 85 },
    { id: 35, name: "GURPS", description: "Système générique universel pour tous genres", publisher: "Steve Jackson Games", price: 40, type: "paid", themes: ["Autres"], rules: ["Liées"], difficulty: "Expert", image: "/images/gurps-rules.jpg", popularity: 68 },
    { id: 36, name: "Honey Heist", description: "Système narratif court pour comédie", publisher: "Grant Howitt", price: 0, type: "free", themes: ["Comédie & Parodique"], rules: ["Libres"], difficulty: "Débutant", image: "/images/honey-heist-rules.jpg", popularity: 55 },
    { id: 37, name: "The Quiet Year", description: "Système de construction de communauté", publisher: "Avery Alder", price: 0, type: "free", themes: ["Autres"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/quiet-year-rules.jpg", popularity: 62 },
    { id: 38, name: "Dread", description: "Système d'horreur avec mécanique Jenga", publisher: "Rafael Chandler", price: 0, type: "free", themes: ["Horreur & Mystère"], rules: ["Libres"], difficulty: "Débutant", image: "/images/dread-rules.jpg", popularity: 58 },
    { id: 39, name: "Mutant: Year Zero", description: "Système post-apocalyptique avec mutations", publisher: "Free League Publishing", price: 45, type: "paid", themes: ["Science-fiction"], rules: ["Liées"], difficulty: "Intermédiaire", image: "/images/mutant-year-zero-rules.jpg", popularity: 85 },
    { id: 40, name: "Symbaroum", description: "Système dark fantasy avec corruption", publisher: "Free League Publishing", price: 45, type: "paid", themes: ["Fantasy"], rules: ["Libres"], difficulty: "Intermédiaire", image: "/images/symbaroum-rules.jpg", popularity: 78 }
  ];

  // Section règles déjà connues - UN SEUL RÉELLEMENT POSSÉDÉ
  const knownRules = [
    {
      id: 'known-1',
      name: 'D&D 5e',
      publisher: 'Wizards of the Coast',
      description: 'Système de jeu de rôle fantasy épique avec des règles complètes',
      themes: ['Fantasy'],
      rules: ['Libres'],
      difficulty: 'Débutant',
      price: 0,
      isOwned: true // SEUL RÉELLEMENT POSSÉDÉ
    },
    {
      id: 'known-2',
      name: 'Call of Cthulhu',
      publisher: 'Chaosium',
      description: 'Système d\'horreur cosmique basé sur l\'univers de H.P. Lovecraft',
      themes: ['Horreur & Mystère'],
      rules: ['Libres'],
      difficulty: 'Expert',
      price: 0,
      isOwned: false // Pas réellement possédé
    },
    {
      id: 'known-3',
      name: 'Fate Core',
      publisher: 'Evil Hat Productions',
      description: 'Système narratif générique flexible',
      themes: ['Générique'],
      rules: ['Libres'],
      difficulty: 'Intermédiaire',
      price: 0,
      isOwned: false // Pas réellement possédé
    },
    {
      id: 'known-4',
      name: 'Pathfinder 2e',
      publisher: 'Paizo Publishing',
      description: 'Système de jeu de rôle fantasy tactique avec des règles sophistiquées',
      themes: ['Fantasy'],
      rules: ['Libres'],
      difficulty: 'Intermédiaire',
      price: 0,
      isOwned: false // Pas réellement possédé
    }
  ];

  // Vérification des données
  console.log("Premier système de règles:", allRules[0]);
  console.log("Règles connues:", knownRules);

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
    let filtered = allRules.filter(rule => {
      const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rule.publisher.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesThemes = selectedFilters.themes.length === 0 || 
                           selectedFilters.themes.some(theme => rule.themes.includes(theme));
      const matchesRules = selectedFilters.rules.length === 0 || 
                          selectedFilters.rules.some(ruleType => rule.rules.includes(ruleType));
      const matchesPrices = selectedFilters.prices.length === 0 || 
                           selectedFilters.prices.some(priceFilter => {
                             if (priceFilter === 'free' && rule.price === 0 && rule.type !== 'freemium') return true;
                             if (priceFilter === 'freemium' && rule.type === 'freemium') return true;
                             if (priceFilter === 'paid' && rule.price > 0) return true;
                             if (priceFilter === 'owned' && rule.type === 'owned') return true;
                             return false;
                           });
      const matchesDifficulty = selectedFilters.difficulty.length === 0 || 
                               selectedFilters.difficulty.includes(rule.difficulty);

      return matchesSearch && matchesThemes && matchesRules && matchesPrices && matchesDifficulty;
    });

    const sortRules = (rulesToSort) => {
      return rulesToSort.sort((a, b) => {
        switch (sortBy) {
          case 'alphabetical':
            return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'popularity':
          default:
            return b.popularity - a.popularity;
        }
      });
    };

    const sortedFiltered = sortRules([...filtered]);
    setAllFilteredRules(sortedFiltered);
    setCurrentPage(1);
  }, [searchTerm, selectedFilters, sortBy]);

  // Calcul de la pagination pour l'affichage
  const totalPages = Math.ceil(allFilteredRules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRules = allFilteredRules.slice(startIndex, endIndex);

  const ownedRules = currentRules.filter(r => {
    return r.type === 'owned' || 
           userLibrary.includes(r.id) || 
           userPlayedGames.includes(r.id);
  });

  const unknownRules = currentRules.filter(r => {
    return r.type !== 'owned' && 
           !userLibrary.includes(r.id) && 
           !userPlayedGames.includes(r.id);
  });

  // Vérification des règles connues/inconnues
  console.log("knownRules (ownedRules):", ownedRules);
  console.log("unknownRules:", unknownRules);

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleRuleSelect = (ruleId) => {
    navigate(`/campaigns/create/rules/${ruleId}/details`);
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
                Choix des règles
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/60" />
                  <input
                    type="text"
                    placeholder="Rechercher des systèmes de règles"
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

            {/* Section Règles déjà connues - MASQUÉE si recherche active */}
            {!searchTerm && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Règles déjà connues</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {knownRules.map((rule) => (
                    <RulesCard 
                      key={rule.id}
                      rule={rule}
                      onClick={handleRuleSelect}
                      isKnown={true}  // TOUS dans cette section sont marqués visuellement comme connus
                    />
                  ))}
                </div>
              </div>
            )}

            {ownedRules.length > 0 && unknownRules.length > 0 && (
              <div className="border-t border-light/20 my-8"></div>
            )}

            {/* Grille principale - TOUJOURS VISIBLE (sauf si filtre "Possédé") */}
            {!selectedFilters.prices.includes('owned') && currentRules.length > 0 && (
              <div className="mb-8">
                {ownedRules.length > 0 && !searchTerm ? (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Autres règles disponibles</h3>
                ) : (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Règles disponibles</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentRules.map((rule) => (
                    <RulesCard 
                      key={rule.id}
                      rule={rule}
                      onClick={handleRuleSelect}
                      isKnown={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {ownedRules.length === 0 && unknownRules.length === 0 && (
              <div className="text-center py-12">
                <div className="text-light/60 text-lg mb-4">
                  Aucune règle ne correspond à vos critères de recherche
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

            {allFilteredRules.length > 0 && (
              <div className="text-center text-light/60 text-sm mt-4">
                {allFilteredRules.length} règles au total
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pour les cartes "règles connues" ET "règles inconnues"
// Même structure, même CSS, même alignement
const RulesCard = ({ rule, onClick, isKnown = false }) => {
  return (
    <div 
      onClick={() => onClick(rule.id)}
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
            {/* Badge "Déjà possédé" - Pour section règles connues OU si réellement possédé */}
            {(isKnown || rule.isOwned) && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Possédé
              </span>
            )}
            
            {/* Tags thèmes - Doré Lore */}
            {rule.themes?.map((theme, index) => (
              <span key={`theme-${index}`} className="bg-[#E9BD72] text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {theme}
              </span>
            ))}
            
            {/* Tags règles - Bleu */}
            {rule.rules?.map((ruleType, index) => (
              <span key={`rule-${index}`} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {ruleType}
              </span>
            ))}
            
            {/* Tag difficulté - Violet */}
            {rule.difficulty && (
              <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {rule.difficulty}
              </span>
            )}
            
            {/* Tag gratuit avec achats facultatifs - Orange */}
            {rule.hasOptionalPurchases && rule.price === 0 && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Achats optionnels
              </span>
            )}
            
            {/* Tag gratuit - Vert (seulement si pas déjà possédé et pas freemium) */}
            {rule.price === 0 && !isKnown && !rule.hasOptionalPurchases && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Gratuit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contenu AVEC CLASSES LORE ORIGINALES */}
      <div className="universe-card-content p-4 flex flex-col h-40">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{rule.name}</h3>
        <p className="text-sm text-white/70 mb-2">{rule.publisher}</p>
        
        {/* Description avec MOINS d'espace avant séparateur */}
        <p className="universe-description text-xs text-white/60 flex-grow mb-2 line-clamp-2">
          {rule.description}
        </p>
        
        {/* Séparateur et prix - CLASSES LORE ORIGINALES */}
        <div className="universe-separator-section border-t border-white/20 pt-2 mt-auto">
          <div className="universe-price-row flex items-center justify-between">
            <div className="universe-price-content">
              <div className="universe-price-text font-semibold text-white text-sm">
                {isKnown ? "Déjà possédé" : 
                 rule.isOwned ? "Déjà possédé" : 
                 rule.type === 'freemium' ? "Gratuit avec achats facultatifs" :
                 rule.price === 0 ? "Gratuit" : `${rule.price} €`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRules;