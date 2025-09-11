import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
// import { supabase } from '../services/supabase'; // TODO: Décommenter quand Supabase sera configuré

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
  // États pour pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [allFilteredUniverses, setAllFilteredUniverses] = useState([]);
  const itemsPerPage = 12;
  
  // États pour la bibliothèque utilisateur
  const [userLibrary, setUserLibrary] = useState([]); // Jeux achetés
  const [userPlayedGames, setUserPlayedGames] = useState([]); // Jeux joués avec d'autres MJ

  // Données de test pour les univers
  const allUniverses = [
    {
      id: 1,
      title: "Dungeons & Dragons 5e",
      subtitle: "Manuel des joueurs",
      author: "Wizards of the Coast",
      price: 49.99,
      type: "paid",
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
      price: 45.99,
      type: "paid",
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
      price: null,
      type: "free",
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
      type: "free",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/cthulhu.jpg",
      popularity: 92
    },
    {
      id: 5,
      title: "Roll20 Universe",
      subtitle: "Plateforme en ligne",
      author: "Roll20",
      price: null,
      type: "owned",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/roll20.jpg",
      popularity: 60
    },
    {
      id: 6,
      title: "Pathfinder 2e",
      subtitle: "Livre de base",
      author: "Greg Stafford / Chaosium",
      price: 40,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/pathfinder.jpg",
      popularity: 85
    },
    {
      id: 7,
      title: "Lasers & Feelings",
      subtitle: "Jeu narratif",
      author: "John Harper",
      price: null,
      type: "free",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/lasers-feelings.jpg",
      popularity: 60
    },
    {
      id: 8,
      title: "Dungeon World",
      subtitle: "Règles narratives",
      author: "Sage Kobold",
      price: null,
      type: "free",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/dungeon-world.jpg",
      popularity: 80
    },
    {
      id: 9,
      title: "Vampire: The Masquerade",
      subtitle: "5e édition",
      author: "White Wolf",
      price: 55,
      type: "paid",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/vampire.jpg",
      popularity: 78
    },
    {
      id: 10,
      title: "Cyberpunk RED",
      subtitle: "Livre de base",
      author: "R. Talsorian Games",
      price: 60,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/cyberpunk.jpg",
      popularity: 82
    },
    {
      id: 11,
      title: "Fiasco",
      subtitle: "Jeu de rôle narratif",
      author: "Bully Pulpit Games",
      price: null,
      type: "free",
      themes: ["Comédie & Parodique"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/fiasco.jpg",
      popularity: 65
    },
    {
      id: 12,
      title: "Blades in the Dark",
      subtitle: "Livre de base",
      author: "John Harper",
      price: 50,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/blades.jpg",
      popularity: 85
    },
    {
      id: 13,
      title: "Call of Cthulhu",
      subtitle: "7e édition",
      author: "Chaosium",
      price: null,
      type: "free",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/call-cthulhu.jpg",
      popularity: 90
    },
    {
      id: 14,
      title: "Numenera",
      subtitle: "Discovery & Destiny",
      author: "Monte Cook Games",
      price: 45,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/numenera.jpg",
      popularity: 72
    },
    {
      id: 15,
      title: "Apocalypse World",
      subtitle: "2e édition",
      author: "D. Vincent Baker",
      price: 35,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/apocalypse-world.jpg",
      popularity: 85
    },
    {
      id: 16,
      title: "Monsterhearts",
      subtitle: "Jeu de monstres adolescents",
      author: "Avery Alder",
      price: 25,
      type: "paid",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/monsterhearts.jpg",
      popularity: 68
    },
    {
      id: 17,
      title: "Masks: A New Generation",
      subtitle: "Super-héros adolescents",
      author: "Brendan Conway",
      price: 30,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/masks.jpg",
      popularity: 75
    },
    {
      id: 18,
      title: "The Sprawl",
      subtitle: "Cyberpunk narratif",
      author: "Hamish Cameron",
      price: 40,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/the-sprawl.jpg",
      popularity: 70
    },
    {
      id: 19,
      title: "Urban Shadows",
      subtitle: "Horreur urbaine",
      author: "Andrew Medeiros",
      price: 35,
      type: "paid",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/urban-shadows.jpg",
      popularity: 73
    },
    {
      id: 20,
      title: "Fellowship",
      subtitle: "Fantasy épique",
      author: "Jacob Randolph",
      price: 30,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/fellowship.jpg",
      popularity: 77
    },
    {
      id: 21,
      title: "The Veil",
      subtitle: "Cyberpunk transhumaniste",
      author: "Samjoko Publishing",
      price: 25,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/the-veil.jpg",
      popularity: 62
    },
    {
      id: 22,
      title: "Bluebeard's Bride",
      subtitle: "Horreur gothique",
      author: "Marissa Kelly",
      price: 45,
      type: "paid",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/bluebeards-bride.jpg",
      popularity: 58
    },
    {
      id: 23,
      title: "Dream Askew",
      subtitle: "Post-apocalyptique queer",
      author: "Avery Alder",
      price: null,
      type: "free",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/dream-askew.jpg",
      popularity: 55
    },
    {
      id: 24,
      title: "Wanderhome",
      subtitle: "Fantasy pastoral",
      author: "Jay Dragon",
      price: 35,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Liées"],
      difficulty: "Débutant",
      image: "/images/wanderhome.jpg",
      popularity: 82
    },
    {
      id: 25,
      title: "Thirsty Sword Lesbians",
      subtitle: "Fantasy queer",
      author: "April Kit Walsh",
      price: 30,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Liées"],
      difficulty: "Débutant",
      image: "/images/thirsty-sword.jpg",
      popularity: 75
    },
    {
      id: 26,
      title: "Neverland",
      subtitle: "Jeux narratifs",
      author: "Scott Malthouse",
      price: 38,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/neverland.jpg",
      popularity: 65
    },
    {
      id: 27,
      title: "Pax Ethica",
      subtitle: "Science-fiction",
      author: "Scott Malthouse",
      price: 24,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/pax-ethica.jpg",
      popularity: 45
    },
    {
      id: 28,
      title: "Lady Blackbird",
      subtitle: "Jeu narratif",
      author: "John Harper",
      price: null,
      type: "free",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/lady-blackbird.jpg",
      popularity: 70
    },
    {
      id: 29,
      title: "Aria",
      subtitle: "Système générique",
      author: "Last Unicorn / Elder Craft",
      price: 60,
      type: "paid",
      themes: ["Autres"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/aria.jpg",
      popularity: 40
    },
    {
      id: 30,
      title: "Microscope",
      subtitle: "Création d'histoire collaborative",
      author: "Ben Robbins",
      price: null,
      type: "free",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/microscope.jpg",
      popularity: 55
    },
    {
      id: 31,
      title: "Forbidden Lands",
      subtitle: "Exploration et survie",
      author: "Tomas Härenstam",
      price: 42,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Liées"],
      difficulty: "Intermédiaire",
      image: "/images/forbidden-lands.jpg",
      popularity: 72
    },
    {
      id: 32,
      title: "Horror in Arkham",
      subtitle: "Horreur cosmique",
      author: "Chaosium",
      price: 35,
      type: "paid",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Expert",
      image: "/images/horror-arkham.jpg",
      popularity: 78
    },
    {
      id: 33,
      title: "Warhammer Fantasy Roleplay",
      subtitle: "4e édition",
      author: "Cubicle 7",
      price: 45,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/warhammer-fantasy.jpg",
      popularity: 78
    },
    {
      id: 34,
      title: "Shadowrun",
      subtitle: "6e édition",
      author: "Catalyst Game Labs",
      price: 50,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/shadowrun.jpg",
      popularity: 72
    },
    {
      id: 35,
      title: "World of Darkness",
      subtitle: "Système de base",
      author: "White Wolf",
      price: 35,
      type: "paid",
      themes: ["Horreur & Mystère"],
      rules: ["Liées"],
      difficulty: "Intermédiaire",
      image: "/images/world-of-darkness.jpg",
      popularity: 85
    },
    {
      id: 36,
      title: "GURPS",
      subtitle: "Système générique",
      author: "Steve Jackson Games",
      price: 40,
      type: "paid",
      themes: ["Autres"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/gurps.jpg",
      popularity: 68
    },
    {
      id: 37,
      title: "Honey Heist",
      subtitle: "Jeu narratif court",
      author: "Grant Howitt",
      price: null,
      type: "free",
      themes: ["Comédie & Parodique"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/honey-heist.jpg",
      popularity: 55
    },
    {
      id: 38,
      title: "The Quiet Year",
      subtitle: "Construction de communauté",
      author: "Avery Alder",
      price: null,
      type: "free",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/quiet-year.jpg",
      popularity: 62
    },
    {
      id: 39,
      title: "Dread",
      subtitle: "Horreur avec Jenga",
      author: "Rafael Chandler",
      price: null,
      type: "free",
      themes: ["Horreur & Mystère"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/dread.jpg",
      popularity: 58
    },
    {
      id: 40,
      title: "Mutant: Year Zero",
      subtitle: "Post-apocalyptique",
      author: "Free League Publishing",
      price: 45,
      type: "paid",
      themes: ["Science-fiction"],
      rules: ["Liées"],
      difficulty: "Intermédiaire",
      image: "/images/mutant-year-zero.jpg",
      popularity: 85
    }
  ];

  // TODO: Remplacer par vraies requêtes Supabase
  const fetchUserLibrary = async () => {
    try {
      // Jeux achetés par l'utilisateur
      const { data: purchased } = await supabase
        .from('user_purchases')
        .select('universe_id')
        .eq('user_id', user.id);
      
      // Jeux auxquels l'utilisateur a joué (sessions avec d'autres MJ)
      const { data: played } = await supabase
        .from('game_sessions')
        .select('universe_id')
        .eq('player_id', user.id)
        .neq('dm_id', user.id);
      
      setUserLibrary(purchased.map(p => p.universe_id));
      setUserPlayedGames(played.map(p => p.universe_id));
    } catch (error) {
      console.error('Erreur chargement bibliothèque:', error);
    }
  };

  // Simuler le chargement de la bibliothèque (à remplacer par vraie logique Supabase)
  useEffect(() => {
    if (user) {
      // TODO: Décommenter quand Supabase sera configuré
      // fetchUserLibrary();
      
      // Données utilisateur simulées (à remplacer par Supabase)
      setUserLibrary([1, 2]); // L'utilisateur a acheté D&D 5e et Cthulhu
      setUserPlayedGames([3, 4]); // A joué Pathfinder et Blades avec d'autres MJ
    }
  }, [user]);

  // Filtres disponibles
  const filterOptions = {
    themes: ["Fantasy", "Science-fiction", "Horreur & Mystère", "Historique & Réaliste", "Comédie & Parodique", "Autres"],
    rules: ["Liées", "Libres"],
    prices: ["free", "freemium", "paid", "owned"],
    difficulty: ["Débutant", "Intermédiaire", "Expert"]
  };

  // Labels pour les prix (mapping technique -> affichage)
  const priceLabels = {
    "free": "Gratuit",
    "freemium": "Gratuit avec achats facultatifs", 
    "paid": "Payant",
    "owned": "Possédé"
  };

  // Options de tri
  const sortOptions = [
    { value: 'popularity', label: 'Trier par popularité' },
    { value: 'alphabetical', label: 'Ordre alphabétique' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' }
  ];

  // Logique de filtrage ET tri (sans pagination)
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

    const sortUniverses = (universesToSort) => {
      return universesToSort.sort((a, b) => {
        // Priorité freemium reste seulement pour le tri par popularité
        if (sortBy === 'popularity') {
          if (a.type === 'freemium' && b.type !== 'freemium') return -1;
          if (b.type === 'freemium' && a.type !== 'freemium') return 1;
        }
        
        switch (sortBy) {
          case 'alphabetical':
            return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
            
          case 'price_asc':
            // Gratuits D'ABORD, puis prix croissant
            if ((a.type === 'free' || a.type === 'freemium') && 
                (b.type === 'paid' || b.type === 'owned')) return -1;
            if ((b.type === 'free' || b.type === 'freemium') && 
                (a.type === 'paid' || a.type === 'owned')) return 1;
            if ((a.type === 'free' || a.type === 'freemium') && 
                (b.type === 'free' || b.type === 'freemium')) {
              return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
            }
            return (a.price || 0) - (b.price || 0);
            
          case 'price_desc':
            // Gratuits À LA FIN, prix décroissant d'abord
            if ((a.type === 'free' || a.type === 'freemium') && 
                (b.type === 'paid' || b.type === 'owned')) return 1;
            if ((b.type === 'free' || b.type === 'freemium') && 
                (a.type === 'paid' || a.type === 'owned')) return -1;
            if ((a.type === 'free' || a.type === 'freemium') && 
                (b.type === 'free' || b.type === 'freemium')) {
              return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
            }
            return (b.price || 0) - (a.price || 0);
            
          case 'popularity':
          default:
            return b.popularity - a.popularity;
        }
      });
    };

    const sortedFiltered = sortUniverses([...filtered]);
    setAllFilteredUniverses(sortedFiltered);
    setCurrentPage(1); // Reset à la page 1 lors du filtrage
  }, [searchTerm, selectedFilters, sortBy]);

  // Calcul pagination sur les univers filtrés et triés
  const totalPages = Math.ceil(allFilteredUniverses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUniverses = allFilteredUniverses.slice(startIndex, startIndex + itemsPerPage);

  // Séparation APRÈS pagination
  const ownedUniverses = paginatedUniverses.filter(u => {
    return u.type === 'owned' || 
           userLibrary.includes(u.id) || 
           userPlayedGames.includes(u.id);
  });

  const unknownUniverses = paginatedUniverses.filter(u => {
    return u.type !== 'owned' && 
           !userLibrary.includes(u.id) && 
           !userPlayedGames.includes(u.id);
  });

  // Gestion des filtres
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };



  const handleUniverseSelect = (universe) => {
    // Navigation vers la page de détails de l'univers
    navigate(`/campaigns/create/universe/${universe.id}/info`);
  };


  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header */}
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

      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <nav className="flex items-center space-x-2 text-light/80 text-sm sm:text-base">
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
          
          {/* Sidebar collapsible sur mobile */}
          <div className="w-full lg:w-80 bg-light/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 lg:sticky lg:top-6 lg:h-fit mb-8 lg:mb-0">
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
                      className="filter-checkbox mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
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
                      className="filter-checkbox mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
                    <span className="text-light/80 text-sm">{rule}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Par prix - LABELS EN FRANÇAIS */}
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
                      className="filter-checkbox mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-light eagle-lake-font">
                Choix de l'univers
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Barre de recherche */}
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
                {/* Dropdown tri */}
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

            {/* Tags sélectionnés - comme sur le wireframe */}
            {(selectedFilters.themes.length > 0 || 
              selectedFilters.rules.length > 0 || 
              selectedFilters.prices.length > 0 || 
              selectedFilters.difficulty.length > 0) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {/* Tags thèmes sélectionnés */}
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
                  
                  {/* Tags règles sélectionnés */}
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
                  
                  {/* Tags prix sélectionnés - LABELS EN FRANÇAIS */}
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
                  
                  {/* Tags difficulté sélectionnés */}
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
                  
                  {/* Bouton tout effacer */}
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

            {/* Section "Univers déjà connus" - SEULEMENT s'il y en a */}
            {ownedUniverses.length > 0 && (
              <div className="mb-8">
                <h3 className="text-light/90 font-semibold text-lg mb-6">Univers déjà connus</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
                  {ownedUniverses.map(universe => (
                    <div key={universe.id} className="p-2">
                      <UniverseCard 
                        universe={universe} 
                        onSelect={() => handleUniverseSelect(universe)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ligne de séparation - SEULEMENT s'il y a les deux sections */}
            {ownedUniverses.length > 0 && unknownUniverses.length > 0 && (
              <div className="border-t border-light/20 my-8"></div>
            )}

            {/* Section "Autres univers disponibles" - Toujours affichée */}
            {unknownUniverses.length > 0 && (
              <div className="mb-8">
                {ownedUniverses.length > 0 ? (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Autres univers disponibles</h3>
                ) : (
                  <h3 className="text-light/90 font-semibold text-lg mb-6">Univers disponibles</h3>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
                  {unknownUniverses.map(universe => (
                    <div key={universe.id} className="p-2">
                      <UniverseCard 
                        universe={universe} 
                        onSelect={() => handleUniverseSelect(universe)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message si aucun univers trouvé */}
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

            {/* Pagination - UTILISE allFilteredUniverses pour le calcul */}
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
                    // Logique pour afficher les pages pertinentes
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
            {allFilteredUniverses.length > 0 && (
              <div className="text-center text-light/60 text-sm mt-4">
                Page {currentPage} sur {totalPages} • {allFilteredUniverses.length} univers au total
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant carte d'univers
const UniverseCard = ({ universe, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect()}
      className="universe-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
      style={{ 
        backgroundColor: 'rgba(13, 21, 26, 0.7)',
        padding: '8px'
      }}
    >
      
      {/* Image avec tags en overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={universe.image} 
          alt={universe.title}
          className="w-full h-full object-cover"
        />
        {/* TAGS EN HAUT DROITE */}
        <div className="universe-tags">
          {universe.themes && universe.themes.map((theme, index) => (
            <span key={`theme-${index}`} className="universe-tag">
              {theme}
            </span>
          ))}
          {universe.rules && universe.rules.map((rule, index) => (
            <span key={`rule-${index}`} className="universe-tag">
              {rule}
            </span>
          ))}
          {universe.difficulty && (
            <span className="universe-tag">
              {universe.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Zone contenu avec espacement corrigé */}
      <div className="card-content">
        <h3 className="text-xl font-bold text-dark mb-2">{universe.title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          {universe.author} • {universe.subtitle}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          {universe.subtitle}
        </p>
        
        {/* SÉPARATEUR ET PRIX ALIGNÉS */}
        <div className="separator-section">
          <div className="price-row">
            <span className="font-semibold text-dark">
              {universe.type === 'owned' ? (
                <>💰 POSSÉDÉ</>
              ) : universe.type === 'free' ? (
                <>💰 GRATUIT</>
              ) : universe.type === 'freemium' ? (
                <>
                  💰 GRATUIT
                  <div className="text-xs text-gray-600">avec achats fac.</div>
                </>
              ) : (
                `💰 ${universe.price.toFixed(2)} €`
              )}
            </span>
            {/* PAS DE BOUTON CHOISIR ICI */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUniverse;