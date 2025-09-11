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
<<<<<<< HEAD
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
=======
  // États pour pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [allFilteredUniverses, setAllFilteredUniverses] = useState([]);
  const itemsPerPage = 12;

  // États pour la bibliothèque personnelle
  const [userLibrary, setUserLibrary] = useState([]); // Jeux achetés
  const [userPlayedGames, setUserPlayedGames] = useState([]); // Jeux joués avec d'autres MJ

  // Données de test pour les univers
  const allUniverses = [
    {
      id: 2,
      title: "Fate Core System",
      subtitle: "Fate Core System est un jeu où les héros sont définis par leurs convictions, leurs failles et leurs choix. Vos aspects deviennent des leviers narratifs : une phrase peut changer le cours d'une bataille ou d'un destin.",
      author: "Evil Hat Productions",
      price: null,
      type: "free",
      themes: ["Narratif", "Multi-genre"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/fate-core.jpg",
      popularity: 85
    },
    {
      id: 3,
      title: "Symbaroum Core Rulebook",
      subtitle: "Symbaroum est un jeu de rôle sombre et mystérieux qui se déroule dans un monde où la magie est dangereuse et la nature sauvage regorge de créatures terrifiantes. Un univers unique où l'exploration et la découverte sont au cœur de l'aventure.",
      author: "Free League Publishing",
      price: 49,
      type: "paid",
      themes: ["Fantasy sombre", "Exploration"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/symbaroum.jpg",
      popularity: 88
    },
    {
      id: 1,
      title: "Dungeons & Dragons 5e",
      subtitle: "Dungeons & Dragons 5e est le système de jeu de rôle le plus populaire au monde. Cette édition simplifie les règles tout en conservant la profondeur tactique qui fait la renommée de D&D. Parfait pour les débutants comme pour les vétérans.",
      author: "Wizards of the Coast",
      price: 49,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/dnd5e.jpg",
      popularity: 95
    },
    {
      id: 4,
      title: "Donjons & Dragons de l'Ère Moderne",
      subtitle: "Livre de règles",
      author: "Wizards of the Coast",
      price: null,
      type: "owned",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/dnd-modern.jpg",
      popularity: 88
    },
    {
      id: 3,
      title: "Roll20 Universe",
      subtitle: "Plateforme en ligne",
      author: "Roll20",
      price: null,
      type: "freemium",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/roll20.jpg",
      popularity: 60
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
      title: "Legend of the Five Rings",
      subtitle: "5e édition",
      author: "Max / FFG / Edge",
      price: 49,
      type: "paid",
      themes: ["Historique & Réaliste"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/l5r.jpg",
      popularity: 70
    },
    {
      id: 6,
>>>>>>> parent of 39cef2c (changement 11/09)
      title: "Lasers & Feelings",
      subtitle: "Jeu narratif",
      author: "John Harper",
      price: null,
<<<<<<< HEAD
      type: "Gratuit",
=======
      type: "free",
>>>>>>> parent of 39cef2c (changement 11/09)
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/lasers-feelings.jpg",
      popularity: 60
    },
    {
<<<<<<< HEAD
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
=======
      id: 7,
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
      id: 8,
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
      id: 9,
      title: "Fiasco",
      subtitle: "Jeu de rôle narratif - Une expérience de jeu unique qui explore les conséquences dramatiques et comiques de décisions malheureuses",
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
      id: 10,
      title: "Blades in the Dark",
      subtitle: "Livre de base",
      author: "John Harper",
      price: 50,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/blades.jpg",
      popularity: 88
    },
    {
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
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
      id: 19,
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
      id: 20,
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
      id: 21,
      title: "Dream Askew",
      subtitle: "Post-apocalyptique queer",
      author: "Avery Alder",
      price: null,
      type: "free",
      themes: ["Science-fiction"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
>>>>>>> parent of 39cef2c (changement 11/09)
      image: "/images/dream-askew.jpg",
      popularity: 55
    },
    {
<<<<<<< HEAD
      id: 24,
      title: "Wanderhome",
      subtitle: "Livre de base",
      author: "Jay Dragon",
      price: 50,
      type: "Payant",
      themes: ["Fantasy"],
      rules: ["Lidées"],
=======
      id: 22,
      title: "Wanderhome",
      subtitle: "Fantasy pastoral",
      author: "Jay Dragon",
      price: 35,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Libres"],
>>>>>>> parent of 39cef2c (changement 11/09)
      difficulty: "Débutant",
      image: "/images/wanderhome.jpg",
      popularity: 82
    },
    {
<<<<<<< HEAD
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
=======
      id: 23,
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
      id: 24,
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
      id: 25,
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
      id: 26,
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
      id: 27,
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
      id: 28,
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
      id: 29,
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
    // === DONNÉES DE TEST COMPLÈTES ===
    // 4 univers type "owned" (Déjà possédé)
    {
      id: 30,
      title: "Warhammer Fantasy Roleplay",
      subtitle: "4e édition",
      author: "Cubicle 7",
      price: 45,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Liées"],
>>>>>>> parent of 39cef2c (changement 11/09)
      difficulty: "Expert",
      image: "/images/warhammer-fantasy.jpg",
      popularity: 78
    },
    {
<<<<<<< HEAD
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
=======
      id: 31,
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
      id: 32,
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
      id: 33,
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
    // 3 univers type "free" (Gratuit)
    {
      id: 34,
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
      id: 35,
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
      id: 36,
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
    // 2 univers type "freemium" (Gratuit avec achats facultatifs)
    {
      id: 37,
      title: "Discord RPG",
      subtitle: "Plateforme communautaire",
      author: "Discord Inc.",
      price: null,
      type: "freemium",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Débutant",
      image: "/images/discord-rpg.jpg",
      popularity: 45
    },
    {
      id: 38,
      title: "Roll20 Plus",
      subtitle: "Version premium",
      author: "Roll20",
      price: null,
      type: "freemium",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/roll20-plus.jpg",
      popularity: 52
    },
    // 3 univers type "paid" (Prix variés : 25€, 45€, 60€)
    {
      id: 39,
      title: "Burning Wheel",
      subtitle: "Système narratif",
      author: "Luke Crane",
      price: 25,
      type: "paid",
      themes: ["Fantasy"],
      rules: ["Liées"],
      difficulty: "Expert",
      image: "/images/burning-wheel.jpg",
      popularity: 75
    },
    {
      id: 40,
      title: "Fate Core",
      subtitle: "Système générique",
      author: "Evil Hat Productions",
      price: 45,
      type: "paid",
      themes: ["Autres"],
      rules: ["Libres"],
      difficulty: "Intermédiaire",
      image: "/images/fate-core.jpg",
      popularity: 80
    },
    {
      id: 41,
      title: "Savage Worlds",
      subtitle: "Système universel",
      author: "Pinnacle Entertainment",
      price: 60,
      type: "paid",
      themes: ["Autres"],
      rules: ["Liées"],
      difficulty: "Intermédiaire",
      image: "/images/savage-worlds.jpg",
      popularity: 88
    },
>>>>>>> parent of 39cef2c (changement 11/09)
  ];

  // Filtres disponibles
  const filterOptions = {
    themes: ["Fantasy", "Science-fiction", "Horreur & Mystère", "Historique & Réaliste", "Comédie & Parodique", "Autres"],
<<<<<<< HEAD
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
    navigate(`/campaigns/create/universe/${universe.id}/info`);
  };

  const handleUniverseChoose = (universe) => {
    // Continuer avec cet univers pour créer la campagne
    navigate('/campaigns/create/configure', { state: { selectedUniverse: universe } });
  };
=======
    rules: ["Liées", "Libres"],
    prices: ["owned", "free", "freemium", "paid"],
    difficulty: ["Débutant", "Intermédiaire", "Expert"]
  };

  // Options de tri
  const sortOptions = [
    { value: 'popularity', label: 'Trier par popularité' },
    { value: 'alphabetical', label: 'Ordre alphabétique' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' }
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

  // Initialisation données utilisateur
  useEffect(() => {
    if (user) {
      // Simuler le chargement de la bibliothèque utilisateur
      setUserLibrary([1, 2]); // IDs des jeux achetés
      setUserPlayedGames([3, 4]); // IDs des jeux joués avec d'autres MJ
      
      // TODO: Décommenter pour utiliser Supabase
      // fetchUserLibrary();
    }
  }, [user]);

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

  // Pagination (calculée dans le useEffect)

  const handleUniverseSelect = (universe) => {
    // Navigation vers la page de détails de l'univers
    navigate(`/campaigns/create/universe/${universe.id}/details`);
  };

>>>>>>> parent of 39cef2c (changement 11/09)

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header */}
<<<<<<< HEAD
      <header className="flex items-center justify-between p-4 sm:p-6 bg-primary-blue/90">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
=======
      <header className="flex items-center justify-between p-4 lg:p-6 bg-primary-blue/90">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
>>>>>>> parent of 39cef2c (changement 11/09)
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={20} className="lg:w-6 lg:h-6" />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={20} className="lg:w-6 lg:h-6" />
          </button>
<<<<<<< HEAD
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold text-sm sm:text-base">
=======
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold text-sm lg:text-base">
>>>>>>> parent of 39cef2c (changement 11/09)
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
<<<<<<< HEAD
      <div className="px-4 sm:px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80">
=======
      <div className="px-4 lg:px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80 noto-sans-font text-sm lg:text-base">
>>>>>>> parent of 39cef2c (changement 11/09)
          <button
            onClick={() => navigate('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
<<<<<<< HEAD
          <ChevronRight size={16} className="text-light/60" />
=======
          <ChevronRight size={14} className="lg:w-4 lg:h-4 text-light/60" />
>>>>>>> parent of 39cef2c (changement 11/09)
          <span className="text-golden border-b border-golden pb-1">
            Créer une campagne
          </span>
        </nav>
      </div>

      {/* Section principale */}
<<<<<<< HEAD
      <div className="px-4 sm:px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Sidebar filtres */}
          <div className="w-full lg:w-80 bg-light/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 lg:sticky lg:top-6 lg:h-fit">
=======
      <div className="px-4 lg:px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Sidebar collapsible sur mobile */}
          <div className="w-full lg:w-80 bg-light/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 lg:sticky lg:top-6 lg:h-fit mb-8 lg:mb-0">
>>>>>>> parent of 39cef2c (changement 11/09)
            <h3 className="text-light font-bold text-xl calligraphy-font mb-6">Filtres</h3>
            
            {/* Par thème */}
            <div className="mb-6">
<<<<<<< HEAD
              <h4 className="text-light/90 font-semibold mb-3">Par thème</h4>
=======
              <h4 className="text-light/90 font-semibold mb-3 noto-sans-font">Par thème</h4>
>>>>>>> parent of 39cef2c (changement 11/09)
              <div className="space-y-2">
                {filterOptions.themes.map(theme => (
                  <label key={theme} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.themes.includes(theme)}
                      onChange={() => toggleFilter('themes', theme)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
<<<<<<< HEAD
                    <span className="text-light/80 text-sm">{theme}</span>
=======
                    <span className="text-light/80 text-sm noto-sans-font">{theme}</span>
>>>>>>> parent of 39cef2c (changement 11/09)
                  </label>
                ))}
              </div>
            </div>

            {/* Par règles */}
            <div className="mb-6">
<<<<<<< HEAD
              <h4 className="text-light/90 font-semibold mb-3">Par règles</h4>
=======
              <h4 className="text-light/90 font-semibold mb-3 noto-sans-font">Par règles</h4>
>>>>>>> parent of 39cef2c (changement 11/09)
              <div className="space-y-2">
                {filterOptions.rules.map(rule => (
                  <label key={rule} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.rules.includes(rule)}
                      onChange={() => toggleFilter('rules', rule)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
<<<<<<< HEAD
                    <span className="text-light/80 text-sm">{rule}</span>
=======
                    <span className="text-light/80 text-sm noto-sans-font">{rule}</span>
>>>>>>> parent of 39cef2c (changement 11/09)
                  </label>
                ))}
              </div>
            </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 39cef2c (changement 11/09)
              </div>
            </div>

            {/* Par difficulté */}
            <div>
<<<<<<< HEAD
              <h4 className="text-light/90 font-semibold mb-3">Par difficulté</h4>
=======
              <h4 className="text-light/90 font-semibold mb-3 noto-sans-font">Par difficulté</h4>
>>>>>>> parent of 39cef2c (changement 11/09)
              <div className="space-y-2">
                {filterOptions.difficulty.map(diff => (
                  <label key={diff} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.difficulty.includes(diff)}
                      onChange={() => toggleFilter('difficulty', diff)}
                      className="mr-3 h-4 w-4 text-golden rounded border-light/30 focus:ring-golden"
                    />
<<<<<<< HEAD
                    <span className="text-light/80 text-sm">{diff}</span>
=======
                    <span className="text-light/80 text-sm noto-sans-font">{diff}</span>
>>>>>>> parent of 39cef2c (changement 11/09)
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
<<<<<<< HEAD
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-light/30 bg-light text-dark placeholder-dark/60 focus:ring-2 focus:ring-golden focus:border-transparent"
=======
                    className="search-input pl-10 pr-4 py-3 w-full rounded-lg border border-light/30 bg-light text-dark placeholder-dark/60 focus:ring-2 focus:ring-golden focus:border-transparent noto-sans-font"
>>>>>>> parent of 39cef2c (changement 11/09)
                  />
                </div>

                {/* Dropdown tri */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
<<<<<<< HEAD
                    className="appearance-none bg-light/20 text-light border border-light/30 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto focus:ring-2 focus:ring-golden focus:border-transparent cursor-pointer"
=======
                    className="appearance-none bg-golden text-dark border border-golden rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-golden focus:border-transparent cursor-pointer font-semibold w-full sm:w-auto"
>>>>>>> parent of 39cef2c (changement 11/09)
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} className="text-dark">
                        {option.label}
                      </option>
                    ))}
                  </select>
<<<<<<< HEAD
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
=======
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
                <h3 className="text-light/90 font-semibold text-lg mb-6 noto-sans-font">Univers déjà connus</h3>
                
                {/* Grille responsive pour cartes étroites */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-4">
                  {ownedUniverses.map(universe => (
                    <UniverseCard 
                      key={universe.id}
                      universe={universe} 
                      onClick={(id) => handleUniverseSelect(universe)}
                      isKnown={true}
                    />
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
                  <h3 className="text-light/90 font-semibold text-lg mb-6 noto-sans-font">Autres univers disponibles</h3>
                ) : (
                  <h3 className="text-light/90 font-semibold text-lg mb-6 noto-sans-font">Univers disponibles</h3>
                )}
                
                {/* Grille responsive pour cartes étroites */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-4">
                  {unknownUniverses.map(universe => (
                    <UniverseCard 
                      key={universe.id}
                      universe={universe} 
                      onClick={(id) => handleUniverseSelect(universe)}
                      isKnown={false}
                    />
                  ))}
                </div>
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
>>>>>>> parent of 39cef2c (changement 11/09)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
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
=======
// Composant carte d'univers - Structure harmonisée pour toutes les cartes
const UniverseCard = ({ universe, onClick, isKnown = false }) => {
  return (
    <div 
      onClick={() => onClick(universe.id)}
      className="universe-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      style={{ backgroundColor: 'rgba(13, 21, 26, 0.7)' }}
    >
      
      {/* Image avec tags en overlay */}
      <div className="relative h-40 bg-gray-200 rounded-md overflow-hidden">
        <div className="w-full h-full bg-white/80 flex items-center justify-center">
          <div className="text-gray-400 text-3xl font-bold opacity-50">IMG</div>
        </div>
        
        {/* Tags positionnés en haut droite sur l'image */}
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end pointer-events-none">
          {universe.themes && universe.themes.map((theme, index) => (
            <span key={`theme-${index}`} className="bg-golden text-white text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              {theme}
            </span>
          ))}
          {universe.rules && universe.rules.map((rule, index) => (
            <span key={`rule-${index}`} className="bg-golden text-white text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              {rule}
            </span>
          ))}
          {universe.difficulty && (
            <span className="bg-golden text-white text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              {universe.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Contenu avec espacement corrigé */}
      <div className="universe-card-content p-4">
        {/* Titre et infos - TEXTES EN BLANC */}
        <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{universe.title}</h3>
        <p className="text-sm text-white/70 mb-2">
          {universe.author}
        </p>
        
        {/* Description avec PLUS D'ESPACE EN BAS */}
        <p className="universe-description text-xs text-white/60 mb-6 line-clamp-2 min-h-[2.5rem]">
          {universe.subtitle}
        </p>
        
        {/* Zone séparateur et prix - MÊME HAUTEUR GARANTIE */}
        <div className="universe-separator-section border-t border-white/20 pt-3" style={{ minHeight: '48px' }}>
          <div className="universe-price-row flex items-start justify-end min-h-[48px]">
            <div className="universe-price-content text-right">
              <div className="universe-price-text font-semibold text-white text-sm leading-6">
                {universe.price === null ? (
                  universe.type === 'freemium' ? "Gratuit" : universe.type === 'owned' ? "Déjà possédé" : "Gratuit"
                ) : (
                  `${universe.price} €`
                )}
              </div>
              {universe.price === null && universe.type === 'freemium' && (
                <div className="universe-price-subtext text-xs text-white/60 leading-4">
                  avec achats facultatifs
                </div>
              )}
            </div>
          </div>
>>>>>>> parent of 39cef2c (changement 11/09)
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default SelectUniverse;
=======
export default SelectUniverse;
>>>>>>> parent of 39cef2c (changement 11/09)
