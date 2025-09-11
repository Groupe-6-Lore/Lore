import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const RulesSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // États pour la recherche et filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    complexity: [],
    prices: [],
    themes: []
  });
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Données des règles
  const allRules = [
    {
      id: 'dnd-5e',
      name: 'D&D 5e',
      author: 'Wizards of the Coast',
      description: 'Le système de jeu de rôle le plus populaire au monde, parfait pour débuter.',
      complexity: 'Débutant',
      themes: ['Fantasy', 'Aventure'],
      type: 'freemium',
      price: 0,
      popularity: 100,
      image: null
    },
    {
      id: 'fate-core',
      name: 'Fate Core',
      author: 'Evil Hat Productions',
      description: 'Un système narratif flexible qui s\'adapte à tous les univers.',
      complexity: 'Débutant',
      themes: ['Narratif', 'Flexible'],
      type: 'free',
      price: 0,
      popularity: 88,
      image: null
    },
    {
      id: 'symbaroum',
      name: 'Symbaroum',
      author: 'Free League Publishing',
      description: 'Système simple mais profond, parfait pour l\'horreur et le mystère.',
      complexity: 'Intermédiaire',
      themes: ['Horreur & Mystère', 'Fantasy sombre'],
      type: 'paid',
      price: 35,
      popularity: 85,
      image: null
    },
    {
      id: 'call-of-cthulhu',
      name: 'Call of Cthulhu',
      author: 'Chaosium',
      description: 'Système d\'investigation et d\'horreur cosmique.',
      complexity: 'Intermédiaire',
      themes: ['Horreur & Mystère', 'Investigation'],
      type: 'paid',
      price: 28,
      popularity: 82,
      image: null
    },
    {
      id: 'world-of-darkness',
      name: 'World of Darkness',
      author: 'White Wolf',
      description: 'Système gothique-punk pour jeux d\'horreur moderne.',
      complexity: 'Avancé',
      themes: ['Horreur & Mystère', 'Gothique'],
      type: 'paid',
      price: 45,
      popularity: 78,
      image: null
    },
    {
      id: 'cyberpunk-red',
      name: 'Cyberpunk RED',
      author: 'R. Talsorian Games',
      description: 'Système d\'action pour futurs dystopiques.',
      complexity: 'Intermédiaire',
      themes: ['Science-fiction', 'Cyberpunk'],
      type: 'paid',
      price: 50,
      popularity: 85,
      image: null
    },
    {
      id: 'pathfinder-2e',
      name: 'Pathfinder 2e',
      author: 'Paizo Publishing',
      description: 'Système tactique et détaillé pour fantasy épique.',
      complexity: 'Avancé',
      themes: ['Fantasy', 'Tactique'],
      type: 'freemium',
      price: 0,
      popularity: 90,
      image: null
    },
    {
      id: 'savage-worlds',
      name: 'Savage Worlds',
      author: 'Pinnacle Entertainment',
      description: 'Système rapide et fun pour tous types d\'aventures.',
      complexity: 'Intermédiaire',
      themes: ['Pulpe', 'Action'],
      type: 'paid',
      price: 25,
      popularity: 75,
      image: null
    }
  ];

  // États pour pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [allFilteredRules, setAllFilteredRules] = useState([]);
  const itemsPerPage = 12;

  // Logique de filtrage et tri
  useEffect(() => {
    let filtered = allRules.filter(rule => {
      // Recherche par terme
      const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rule.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtres par catégorie
      const matchesComplexity = selectedFilters.complexity.length === 0 ||
                               selectedFilters.complexity.includes(rule.complexity);
      const matchesPrices = selectedFilters.prices.length === 0 ||
                           selectedFilters.prices.includes(rule.type);
      const matchesThemes = selectedFilters.themes.length === 0 ||
                           selectedFilters.themes.some(theme => rule.themes.includes(theme));

      return matchesSearch && matchesComplexity && matchesPrices && matchesThemes;
    });

    // Tri avec priorité freemium
    const sortRules = (rulesToSort) => {
      return rulesToSort.sort((a, b) => {
        // Les freemium passent toujours en premier
        if (a.type === 'freemium' && b.type !== 'freemium') return -1;
        if (b.type === 'freemium' && a.type !== 'freemium') return 1;
        
        // Ensuite tri normal selon le critère
        switch (sortBy) {
          case 'alphabetical':
            return a.name.localeCompare(b.name, 'fr');
          case 'price_asc':
            return (a.price || 0) - (b.price || 0);
          case 'price_desc':
            return (b.price || 0) - (a.price || 0);
          case 'popularity':
          default:
            return b.popularity - a.popularity;
        }
      });
    };

    const sortedFiltered = sortRules([...filtered]);
    setAllFilteredRules(sortedFiltered);
    setCurrentPage(1); // Reset à la page 1 lors du filtrage
  }, [searchTerm, selectedFilters, sortBy]);

  // Calcul pagination
  const totalPages = Math.ceil(allFilteredRules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRules = allFilteredRules.slice(startIndex, startIndex + itemsPerPage);

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleRuleClick = (rule) => {
    navigate(`/campaigns/create/rules/${rule.id}/details`);
  };

  const handleBackToCreate = () => {
    navigate('/campaigns/create');
  };

  const getPriceLabel = (type) => {
    switch (type) {
      case 'free': return 'Gratuit';
      case 'freemium': return 'Gratuit avec achats facultatifs';
      case 'paid': return 'Payant';
      default: return type;
    }
  };

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
            onClick={handleBackToCreate}
            className="hover:text-light transition-colors"
          >
            Créer une campagne
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden">
            Choisir des règles
          </span>
        </nav>
      </div>

      {/* Titre principal */}
      <div className="px-6 mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-light eagle-lake-font border-b-2 border-golden pb-2 inline-block">
          Choisir des règles
        </h2>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light/60" />
              <input
                type="text"
                placeholder="Rechercher des règles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-light/15 border border-light/30 rounded-lg text-light placeholder-light/50 focus:ring-2 focus:ring-golden focus:border-transparent transition-colors"
              />
            </div>

            {/* Bouton filtres mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-light/15 border border-light/30 rounded-lg text-light hover:bg-light/25 transition-colors"
            >
              <span>Filtres</span>
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-light/15 border border-light/30 rounded-lg text-light focus:ring-2 focus:ring-golden focus:border-transparent transition-colors"
            >
              <option value="popularity">Popularité</option>
              <option value="alphabetical">Alphabétique</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar filtres */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-light/10 rounded-xl p-6 border border-light/20">
              <h3 className="text-lg font-bold text-light mb-6 eagle-lake-font">Filtres</h3>
              
              {/* Par prix */}
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
                </div>
              </div>

              {/* Par complexité */}
              <div className="mb-6">
                <h4 className="text-light/90 font-semibold mb-3">Par complexité</h4>
                <div className="space-y-2">
                  {['Débutant', 'Intermédiaire', 'Avancé'].map(complexity => (
                    <label key={complexity} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.complexity.includes(complexity)}
                        onChange={() => toggleFilter('complexity', complexity)}
                        className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                      />
                      <span className="text-light/80 text-sm">{complexity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Par thème */}
              <div className="mb-6">
                <h4 className="text-light/90 font-semibold mb-3">Par thème</h4>
                <div className="space-y-2">
                  {['Fantasy', 'Horreur & Mystère', 'Science-fiction', 'Narratif', 'Aventure', 'Investigation', 'Gothique', 'Cyberpunk', 'Pulpe', 'Action', 'Tactique'].map(theme => (
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
            </div>
          </div>

          {/* Grille des règles */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRules.map((rule) => (
                <div
                  key={rule.id}
                  onClick={() => handleRuleClick(rule)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-light/15 backdrop-blur-sm rounded-2xl border border-light/20 shadow-xl overflow-hidden h-80 relative">
                    
                    {/* Image/Background */}
                    <div className="h-3/4 relative overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: rule.image ? 
                            `url(${rule.image})` : 
                            `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
                        }}
                      >
                        <div className="absolute inset-0 bg-black/30"></div>
                        
                        {/* Prix sur l'image */}
                        {rule.price > 0 && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-golden text-dark px-2 py-1 rounded-full text-sm font-bold">
                              {rule.price}€
                            </span>
                          </div>
                        )}
                        
                        {/* Tags sur l'image */}
                        <div className="absolute top-2 right-2 left-2 flex flex-wrap gap-1 justify-end">
                          {rule.themes.slice(0, 2).map((theme, index) => (
                            <span
                              key={index}
                              className="bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                    </div>
                    
                    {/* Titre et description */}
                    <div className="h-1/4 p-4 bg-light/10">
                      <h3 className="text-lg font-bold text-light mb-1 truncate">
                        {rule.name}
                      </h3>
                      <p className="text-light/70 text-sm truncate">
                        {rule.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-light/20 text-light rounded-lg hover:bg-light/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>
                
                {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                  let pageNumber;
                  if (totalPages <= 7) {
                    pageNumber = index + 1;
                  } else {
                    if (currentPage <= 4) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNumber = totalPages - 6 + index;
                    } else {
                      pageNumber = currentPage - 3 + index;
                    }
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-golden text-dark font-bold'
                          : 'bg-light/20 text-light hover:bg-light/30'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-light/20 text-light rounded-lg hover:bg-light/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}

            {/* Affichage info pagination */}
            {allFilteredRules.length > 0 && (
              <div className="text-center text-light/60 text-sm mt-4">
                Page {currentPage} sur {totalPages} • {allFilteredRules.length} règles au total
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesSelection;
