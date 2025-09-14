import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

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
    { id: 1, name: "Forgotten Realms", description: "L'univers fantasy le plus célèbre de D&D avec Faerûn et ses royaumes", publisher: "Wizards of the Coast", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Débutant", image: "/images/forgotten-realms.jpg", popularity: 95 },
    { id: 2, name: "Eberron", description: "Univers steampunk fantasy avec magie et technologie", publisher: "Wizards of the Coast", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Intermédiaire", image: "/images/eberron.jpg", popularity: 85 },
    { id: 3, name: "Ravenloft", description: "Domaine de l'horreur gothique avec vampires et créatures sombres", publisher: "Wizards of the Coast", price: 45, type: "paid", themes: ["Horreur & Mystère"], difficulty: "Expert", image: "/images/ravenloft.jpg", popularity: 92 },
    { id: 4, name: "Planescape", description: "Multivers cosmique avec Sigil et les plans d'existence", publisher: "Wizards of the Coast", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Expert", image: "/images/planescape.jpg", popularity: 78 },
    { id: 5, name: "Dark Sun", description: "Désert post-apocalyptique avec magie destructrice", publisher: "Wizards of the Coast", price: 60, type: "paid", themes: ["Science-fiction"], difficulty: "Expert", image: "/images/dark-sun.jpg", popularity: 82 },
    { id: 6, name: "Spelljammer", description: "Voyages spatiaux fantasy avec vaisseaux magiques", publisher: "Wizards of the Coast", price: 0, type: "free", themes: ["Science-fiction"], difficulty: "Intermédiaire", image: "/images/spelljammer.jpg", popularity: 80 },
    { id: 7, name: "Golarion", description: "Monde de Pathfinder avec nations et cultures variées", publisher: "Paizo Publishing", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Intermédiaire", image: "/images/golarion.jpg", popularity: 85 },
    { id: 8, name: "Numenera", description: "Terre du futur lointain avec technologie mystérieuse", publisher: "Monte Cook Games", price: 50, type: "paid", themes: ["Science-fiction"], difficulty: "Intermédiaire", image: "/images/numenera-world.jpg", popularity: 85 },
    { id: 9, name: "Shadowrun", description: "Cyberpunk fantasy avec magie et technologie", publisher: "Catalyst Game Labs", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Science-fiction"], difficulty: "Expert", image: "/images/shadowrun.jpg", popularity: 60 },
    { id: 10, name: "Warhammer 40k", description: "Grimdark futuriste avec guerre éternelle", publisher: "Games Workshop", price: 0, type: "free", themes: ["Science-fiction"], difficulty: "Expert", image: "/images/warhammer40k.jpg", popularity: 80 },
    { id: 11, name: "Middle-earth", description: "Terre du Milieu de Tolkien avec elfes et nains", publisher: "Free League Publishing", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Intermédiaire", image: "/images/middle-earth.jpg", popularity: 90 },
    { id: 12, name: "The Witcher", description: "Monde sombre avec monstres et magie", publisher: "R. Talsorian Games", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Intermédiaire", image: "/images/witcher.jpg", popularity: 85 },
    { id: 13, name: "Star Wars", description: "Galaxie lointaine avec Force et sabres laser", publisher: "Fantasy Flight Games", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Science-fiction"], difficulty: "Débutant", image: "/images/star-wars.jpg", popularity: 95 },
    { id: 14, name: "Cyberpunk 2077", description: "Mondes futuristes avec technologie et corruption", publisher: "R. Talsorian Games", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Science-fiction"], difficulty: "Intermédiaire", image: "/images/cyberpunk2077.jpg", popularity: 80 },
    { id: 15, name: "Vampire: The Masquerade", description: "Monde sombre avec vampires et politique", publisher: "White Wolf", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Horreur & Mystère"], difficulty: "Intermédiaire", image: "/images/vampire-masquerade.jpg", popularity: 80 },
    { id: 16, name: "Call of Cthulhu", description: "Monde d'horreur cosmique avec investigation", publisher: "Chaosium", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Horreur & Mystère"], difficulty: "Intermédiaire", image: "/images/call-of-cthulhu.jpg", popularity: 85 },
    { id: 17, name: "Dragon Age", description: "Thédas avec magie et conflits politiques", publisher: "Green Ronin", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Fantasy"], difficulty: "Intermédiaire", image: "/images/dragon-age.jpg", popularity: 75 },
    { id: 18, name: "Fallout", description: "Monde post-apocalyptique avec technologie rétro", publisher: "Modiphius Entertainment", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Science-fiction"], difficulty: "Intermédiaire", image: "/images/fallout.jpg", popularity: 70 },
    { id: 19, name: "The Expanse", description: "Système solaire avec politique et technologie", publisher: "Green Ronin", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Science-fiction"], difficulty: "Intermédiaire", image: "/images/expanse.jpg", popularity: 75 },
    { id: 20, name: "Alien", description: "Espace avec horreur et survie", publisher: "Free League Publishing", price: 0, type: "freemium", hasOptionalPurchases: true, themes: ["Horreur & Mystère"], difficulty: "Intermédiaire", image: "/images/alien.jpg", popularity: 80 }
  ];

  // Section univers déjà connus - UN SEUL RÉELLEMENT POSSÉDÉ
  const knownUniverses = [
    {
      id: 'known-1',
      name: 'Forgotten Realms',
      publisher: 'Wizards of the Coast',
      description: 'L\'univers fantasy le plus célèbre de D&D avec Faerûn et ses royaumes',
      themes: ['Fantasy'],
      difficulty: 'Débutant',
      price: 0,
      isOwned: true // SEUL RÉELLEMENT POSSÉDÉ
    },
    {
      id: 'known-2',
      name: 'Eberron',
      publisher: 'Wizards of the Coast',
      description: 'Univers steampunk fantasy avec magie et technologie',
      themes: ['Fantasy'],
      difficulty: 'Intermédiaire',
      price: 0,
      isOwned: false // Pas réellement possédé
    },
    {
      id: 'known-3',
      name: 'Star Wars',
      publisher: 'Fantasy Flight Games',
      description: 'Galaxie lointaine avec Force et sabres laser',
      themes: ['Science-fiction'],
      difficulty: 'Débutant',
      price: 0,
      isOwned: false // Pas réellement possédé
    },
    {
      id: 'known-4',
      name: 'Middle-earth',
      publisher: 'Free League Publishing',
      description: 'Terre du Milieu de Tolkien avec elfes et nains',
      themes: ['Fantasy'],
      difficulty: 'Intermédiaire',
      price: 0,
      isOwned: false // Pas réellement possédé
    }
  ];

  // Vérification des données
  console.log("Premier univers:", allUniverses[0]);
  console.log("Univers connus:", knownUniverses);

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
      const matchesPrices = selectedFilters.prices.length === 0 || 
                           selectedFilters.prices.some(priceFilter => {
                             if (priceFilter === 'free' && universe.price === 0 && universe.type !== 'freemium') return true;
                             if (priceFilter === 'freemium' && universe.type === 'freemium') return true;
                             if (priceFilter === 'paid' && universe.price > 0) return true;
                             if (priceFilter === 'owned' && universe.type === 'owned') return true;
                             return false;
                           });
      const matchesDifficulty = selectedFilters.difficulty.length === 0 || 
                               selectedFilters.difficulty.includes(universe.difficulty);

      return matchesSearch && matchesThemes && matchesPrices && matchesDifficulty;
    });

    const sortUniverses = (universesToSort) => {
      return universesToSort.sort((a, b) => {
        switch (sortBy) {
          case 'alphabetical':
            return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
          case 'price_asc':
            // Tri croissant : gratuit (0) → freemium (0.5) → payant (prix réel)
            const getPriceValueAsc = (universe) => {
              if (universe.type === 'free') return 0;
              if (universe.type === 'freemium') return 0.5;
              return universe.price || 0;
            };
            return getPriceValueAsc(a) - getPriceValueAsc(b);
          case 'price_desc':
            // Tri décroissant : payant (prix réel) → freemium (0.5) → gratuit (0)
            const getPriceValueDesc = (universe) => {
              if (universe.type === 'free') return 0;
              if (universe.type === 'freemium') return 0.5;
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
      {/* Header unifié */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigate('/campaigns/create')}
        className="bg-primary-blue/90"
      />

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
          <span>›</span>
          <span className="text-light">Choix d'univers</span>
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
                Choix d'univers
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
                  {knownUniverses.map((universe) => (
                    <RulesCard 
                      key={universe.id}
                      rule={universe}
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
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Autres règles disponibles</h3>
                ) : (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Règles disponibles</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentUniverses.map((universe) => (
                    <RulesCard 
                      key={universe.id}
                      rule={universe}
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
            {(isKnown || rule.isOwned || rule.type === 'owned') && (
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
                 rule.type === 'owned' ? "Déjà possédé" :
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

export default SelectUniverse;