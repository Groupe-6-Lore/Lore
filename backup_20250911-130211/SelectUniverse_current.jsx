import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SelectUniverse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // États pour les filtres et tri
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedFilters, setSelectedFilters] = useState({
    themes: [],
    rules: [],
    prices: [],
    difficulty: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [universes, setUniverses] = useState([]);
  const itemsPerPage = 12;

  // Données de test pour les univers
  const allUniverses = [
    {
      id: 1,
      title: "Dungeons & Dragons 5e",
      subtitle: "Manuel des joueurs",
      author: "Wizards of the Coast",
      price: 49.99,
      type: "Déjà possédé",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/dnd5e.jpg",
      popularity: 95
    },
    {
      id: 2,
      title: "Donjons & Dragons de l'Ère Moderne",
      subtitle: "Livre de règles",
      author: "Wizards of the Coast",
      price: null,
      type: "Déjà possédé",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/dnd-modern.jpg",
      popularity: 88
    },
    {
      id: 3,
      title: "L'Univers Héroïque 2e Edition",
      subtitle: "Livre principal",
      author: "Free League",
      price: 45,
      type: "Gratuit",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/heroic-universe.jpg",
      popularity: 75
    },
    {
      id: 4,
      title: "L'Appel de Cthulhu - 7e Edition",
      subtitle: "Livre de base",
      author: "Chaosium et Sans-Détour",
      price: null,
      type: "Gratuit",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/cthulhu.jpg",
      popularity: 92
    },
    {
      id: 5,
      title: "Legend of the Five Rings",
      subtitle: "5e édition",
      author: "Max / FFG / Edge",
      price: 49,
      type: "Payant",
      themes: ["Historique & Réaliste"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/l5r.jpg",
      popularity: 70
    },
    {
      id: 6,
      title: "Pathfinder 2e",
      subtitle: "Livre de base",
      author: "Greg Stafford / Chaosium",
      price: 40,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/pathfinder.jpg",
      popularity: 85
    },
    {
      id: 7,
      title: "Star Wars: Edge of the Empire",
      subtitle: "Livre de base",
      author: "Fantasy Flight Games",
      price: 55,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/star-wars.jpg",
      popularity: 78
    },
    {
      id: 8,
      title: "Vampire: The Masquerade 5e",
      subtitle: "Livre de base",
      author: "White Wolf",
      price: 50,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/vampire.jpg",
      popularity: 82
    },
    {
      id: 9,
      title: "Call of Cthulhu 7e",
      subtitle: "Livre de base",
      author: "Chaosium",
      price: null,
      type: "Gratuit avec achats facultatifs",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/call-cthulhu.jpg",
      popularity: 90
    },
    {
      id: 10,
      title: "Fate Core System",
      subtitle: "Système générique",
      author: "Evil Hat Productions",
      price: null,
      type: "Gratuit",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/fate-core.jpg",
      popularity: 65
    },
    {
      id: 11,
      title: "Cyberpunk 2020",
      subtitle: "Livre de base",
      author: "R. Talsorian Games",
      price: 35,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/cyberpunk.jpg",
      popularity: 68
    },
    {
      id: 12,
      title: "Paranoia XP",
      subtitle: "Livre de base",
      author: "Mongoose Publishing",
      price: 42,
      type: "Payant",
      themes: ["Comédie & Parodique"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/paranoia.jpg",
      popularity: 55
    },
    {
      id: 13,
      title: "Lasers & Feelings",
      subtitle: "Jeu narratif",
      author: "John Harper",
      price: null,
      type: "Gratuit",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/lasers-feelings.jpg",
      popularity: 60
    },
    {
      id: 14,
      title: "Dungeon World",
      subtitle: "Règles narratives",
      author: "Sage Kobold",
      price: null,
      type: "Gratuit",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/dungeon-world.jpg",
      popularity: 80
    },
    {
      id: 15,
      title: "Blades in the Dark",
      subtitle: "Livre de base",
      author: "John Harper",
      price: 45,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/blades-dark.jpg",
      popularity: 85
    },
    {
      id: 16,
      title: "Apocalypse World",
      subtitle: "Livre de base",
      author: "D. Vincent Baker",
      price: 40,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/apocalypse-world.jpg",
      popularity: 75
    },
    {
      id: 17,
      title: "Monsterhearts",
      subtitle: "Livre de base",
      author: "Avery Alder",
      price: 35,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/monsterhearts.jpg",
      popularity: 70
    },
    {
      id: 18,
      title: "Masks: A New Generation",
      subtitle: "Livre de base",
      author: "Brendan Conway",
      price: 50,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/masks.jpg",
      popularity: 78
    },
    {
      id: 19,
      title: "The Sprawl",
      subtitle: "Livre de base",
      author: "Hamish Cameron",
      price: 38,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/sprawl.jpg",
      popularity: 65
    },
    {
      id: 20,
      title: "Urban Shadows",
      subtitle: "Livre de base",
      author: "Andrew Medeiros",
      price: 42,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/urban-shadows.jpg",
      popularity: 72
    },
    {
      id: 21,
      title: "The Veil",
      subtitle: "Livre de base",
      author: "Samjoko Publishing",
      price: 40,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/veil.jpg",
      popularity: 58
    },
    {
      id: 22,
      title: "Bluebeard's Bride",
      subtitle: "Livre de base",
      author: "Whitney Beltrán",
      price: 45,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/bluebeard.jpg",
      popularity: 68
    },
    {
      id: 23,
      title: "Dream Askew",
      subtitle: "Livre de base",
      author: "Avery Alder",
      price: null,
      type: "Gratuit",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/dream-askew.jpg",
      popularity: 55
    },
    {
      id: 24,
      title: "Wanderhome",
      subtitle: "Livre de base",
      author: "Jay Dragon",
      price: 50,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/wanderhome.jpg",
      popularity: 82
    },
    {
      id: 25,
      title: "Thirsty Sword Lesbians",
      subtitle: "Livre de base",
      author: "April Kit Walsh",
      price: 45,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/thirsty-sword.jpg",
      popularity: 75
    },
    {
      id: 26,
      title: "Alice is Missing",
      subtitle: "Jeu silencieux",
      author: "Spenser Starke",
      price: 35,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/alice-missing.jpg",
      popularity: 88
    },
    {
      id: 27,
      title: "Ten Candles",
      subtitle: "Livre de base",
      author: "Stephen Dewey",
      price: 30,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/ten-candles.jpg",
      popularity: 85
    },
    {
      id: 28,
      title: "Dread",
      subtitle: "Livre de base",
      author: "Rafael Chandler",
      price: 25,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/dread.jpg",
      popularity: 80
    },
    {
      id: 29,
      title: "Fiasco",
      subtitle: "Livre de base",
      author: "Jason Morningstar",
      price: 40,
      type: "Payant",
      themes: ["Comédie & Parodique"],
      rules: ["Lidées"],
      difficulty: "Débutant",
      image: "/images/fiasco.jpg",
      popularity: 78
    },
    {
      id: 30,
      title: "Microscope",
      subtitle: "Livre de base",
      author: "Ben Robbins",
      price: 35,
      type: "Payant",
      themes: ["Autres"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/microscope.jpg",
      popularity: 70
    },
    {
      id: 31,
      title: "Numenera",
      subtitle: "Livre de base",
      author: "Monte Cook Games",
      price: 50,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/numenera.jpg",
      popularity: 75
    },
    {
      id: 32,
      title: "The One Ring",
      subtitle: "Livre de base",
      author: "Free League Publishing",
      price: 45,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/one-ring.jpg",
      popularity: 88
    },
    {
      id: 33,
      title: "Traveller",
      subtitle: "Livre de base",
      author: "Mongoose Publishing",
      price: 40,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/traveller.jpg",
      popularity: 65
    },
    {
      id: 34,
      title: "Savage Worlds",
      subtitle: "Système générique",
      author: "Pinnacle Entertainment",
      price: 35,
      type: "Payant",
      themes: ["Autres"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/savage-worlds.jpg",
      popularity: 72
    },
    {
      id: 35,
      title: "GURPS",
      subtitle: "Système générique",
      author: "Steve Jackson Games",
      price: 30,
      type: "Payant",
      themes: ["Autres"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/gurps.jpg",
      popularity: 68
    },
    {
      id: 36,
      title: "World of Darkness",
      subtitle: "Livre de base",
      author: "White Wolf",
      price: 45,
      type: "Payant",
      themes: ["Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/world-darkness.jpg",
      popularity: 80
    },
    {
      id: 37,
      title: "Shadowrun",
      subtitle: "Livre de base",
      author: "Catalyst Game Labs",
      price: 50,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/shadowrun.jpg",
      popularity: 70
    },
    {
      id: 38,
      title: "Warhammer Fantasy Roleplay",
      subtitle: "Livre de base",
      author: "Cubicle 7",
      price: 55,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Lidées"],
      difficulty: "Expert",
      image: "/images/warhammer-fantasy.jpg",
      popularity: 78
    },
    {
      id: 39,
      title: "Mutant: Year Zero",
      subtitle: "Livre de base",
      author: "Free League Publishing",
      price: 40,
      type: "Payant",
      themes: ["Science-fiction"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/mutant-year-zero.jpg",
      popularity: 82
    },
    {
      id: 40,
      title: "Alien RPG",
      subtitle: "Livre de base",
      author: "Free League Publishing",
      price: 45,
      type: "Payant",
      themes: ["Science-fiction", "Horreur & Mystère"],
      rules: ["Lidées"],
      difficulty: "Intermédiaire",
      image: "/images/alien-rpg.jpg",
      popularity: 85
    }
  ];

  // Filtres disponibles
  const filterOptions = {
    themes: ["Fantasy", "Science-fiction", "Horreur & Mystère", "Historique & Réaliste", "Comédie & Parodique", "Autres"],
    rules: ["Lidées", "Libres"],
    prices: ["Gratuit", "Gratuit avec achats facultatifs", "Payant"],
    difficulty: ["Débutant", "Intermédiaire", "Expert"]
  };

  // Options de tri
  const sortOptions = [
    { value: 'popularity', label: 'Trier par popularité' },
    { value: 'alphabetical', label: 'Ordre alphabétique' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' }
  ];

  // Fonction de filtrage et tri
  useEffect(() => {
    let filtered = allUniverses.filter(universe => {
      // Recherche par terme
      const matchesSearch = universe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           universe.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtres par catégorie
      const matchesThemes = selectedFilters.themes.length === 0 || 
                           selectedFilters.themes.some(theme => universe.themes.includes(theme));
      const matchesRules = selectedFilters.rules.length === 0 || 
                          selectedFilters.rules.some(rule => universe.rules.includes(rule));
      const matchesPrices = selectedFilters.prices.length === 0 || 
                           selectedFilters.prices.includes(universe.type);
      const matchesDifficulty = selectedFilters.difficulty.length === 0 || 
                               selectedFilters.difficulty.includes(universe.difficulty);

      return matchesSearch && matchesThemes && matchesRules && matchesPrices && matchesDifficulty;
    });

    // Tri
    switch (sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price_asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setUniverses(filtered);
    setCurrentPage(1); // Reset à la première page lors du filtrage
  }, [searchTerm, selectedFilters, sortBy]);

  // Gestion des filtres
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  // Pagination
  const totalPages = Math.ceil(universes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUniverses = universes.slice(startIndex, startIndex + itemsPerPage);

  const handleUniverseSelect = (universe) => {
    // Navigation vers la page de détails de l'univers
    navigate(`/campaigns/create/universe/${universe.id}/details`);
  };

  const handleUniverseChoose = (universe) => {
    // Continuer avec cet univers pour créer la campagne
    navigate('/campaigns/create/configure', { state: { selectedUniverse: universe } });
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 bg-primary-blue/90">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold text-sm sm:text-base">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={() => navigate('/campaigns')}
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

      {/* Section principale */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Sidebar filtres */}
          <div className="w-full lg:w-80 bg-light/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 lg:sticky lg:top-6 lg:h-fit">
            <h3 className="text-light font-bold text-xl calligraphy-font mb-6">Filtres</h3>
            
            {/* Par thème */}
            <div className="mb-6">
              <h4 className="text-light/90 font-semibold mb-3">Par thème</h4>
              <div className="space-y-2">
                {filterOptions.themes.map(theme => (
                  <label key={theme} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.themes.includes(theme)}
                      onChange={() => toggleFilter('themes', theme)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{theme}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Par règles */}
            <div className="mb-6">
              <h4 className="text-light/90 font-semibold mb-3">Par règles</h4>
              <div className="space-y-2">
                {filterOptions.rules.map(rule => (
                  <label key={rule} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.rules.includes(rule)}
                      onChange={() => toggleFilter('rules', rule)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{rule}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Par prix */}
            <div className="mb-6">
              <h4 className="text-light/90 font-semibold mb-3">Par prix</h4>
              <div className="space-y-2">
                {filterOptions.prices.map(price => (
                  <label key={price} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.prices.includes(price)}
                      onChange={() => toggleFilter('prices', price)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Par difficulté */}
            <div>
              <h4 className="text-light/90 font-semibold mb-3">Par difficulté</h4>
              <div className="space-y-2">
                {filterOptions.difficulty.map(diff => (
                  <label key={diff} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.difficulty.includes(diff)}
                      onChange={() => toggleFilter('difficulty', diff)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{diff}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            
            {/* Header avec recherche et tri */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-light eagle-lake-font">
                Choix de l'univers
              </h2>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                {/* Barre de recherche */}
                <div className="relative w-full sm:w-80">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/60" />
                  <input
                    type="text"
                    placeholder="Rechercher des jeux de rôles"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-light/30 bg-light text-dark placeholder-dark/60 focus:ring-2 focus:ring-golden focus:border-transparent"
                  />
                </div>

                {/* Dropdown tri */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-light/20 text-light border border-light/30 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto focus:ring-2 focus:ring-golden focus:border-transparent cursor-pointer"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} className="text-dark">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Section "Univers déjà connus" */}
            <div className="mb-8">
              <h3 className="text-light/90 font-semibold text-lg mb-6">Univers déjà connus</h3>
              
              {/* Grille d'univers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
                {paginatedUniverses.map(universe => (
                  <UniverseCard 
                    key={universe.id} 
                    universe={universe} 
                    onSelect={() => handleUniverseSelect(universe)}
                    onChoose={() => handleUniverseChoose(universe)}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 bg-light/20 text-light rounded-lg hover:bg-light/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                  >
                    Précédent
                  </button>
                  
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                            currentPage === pageNum
                              ? 'bg-golden text-dark font-bold'
                              : 'bg-light/20 text-light hover:bg-light/30'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="text-light/60 text-sm sm:text-base px-2">...</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 bg-light/20 text-light rounded-lg hover:bg-light/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                  >
                    Suivant
                  </button>
                </div>
                
                <div className="text-light/60 text-sm">
                  Page {currentPage} sur {totalPages}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant carte d'univers
const UniverseCard = ({ universe, onSelect, onChoose }) => {
  return (
    <div className="bg-light rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer">
      
      {/* Tags de prix en haut */}
      <div className="relative h-48 bg-gray-200">
        {/* Image placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-golden/20 to-golden/40 flex items-center justify-center">
          <div className="text-golden/60 text-6xl font-bold opacity-50">JDR</div>
        </div>
        
        {/* Tags prix */}
        <div className="absolute top-3 left-3 flex gap-2">
          {universe.type === 'Gratuit' && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Gratuit
            </span>
          )}
          {universe.type === 'Déjà possédé' && (
            <span className="bg-golden text-dark px-2 py-1 rounded text-xs font-semibold">
              Déjà possédé
            </span>
          )}
          {universe.price && (
            <span className="bg-dark text-light px-2 py-1 rounded text-xs font-semibold">
              {universe.price}€
            </span>
          )}
        </div>

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-all duration-300"></div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h4 className="font-bold text-dark text-sm mb-1 line-clamp-2">{universe.title}</h4>
        <p className="text-dark/70 text-xs mb-2">{universe.subtitle}</p>
        <p className="text-dark/60 text-xs mb-4">{universe.author}</p>
        
        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="flex-1 bg-light border border-golden text-golden px-2 sm:px-3 py-2 rounded text-xs font-semibold hover:bg-golden hover:text-dark transition-colors"
          >
            <span className="hidden sm:inline">En savoir plus sur cet univers</span>
            <span className="sm:hidden">En savoir plus</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChoose();
            }}
            className="flex-1 bg-golden text-dark px-2 sm:px-3 py-2 rounded text-xs font-semibold hover:bg-golden/80 transition-colors"
          >
            <span className="hidden sm:inline">Choisir cet univers</span>
            <span className="sm:hidden">Choisir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectUniverse;