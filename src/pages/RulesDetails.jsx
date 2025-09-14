import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Bell, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

const RulesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rules, setRules] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

  // Données des règles selon l'ID
  const rulesData = {
    1: {
      id: 1,
      name: "D&D 5e",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "D&D 5e propose un système de règles fantasy éprouvé et accessible. Le système utilise un d20 comme dé principal avec des modificateurs de caractéristiques. Les mécaniques incluent : classes avec progression sur 20 niveaux, système de sorts par niveaux, combat tactique sur grille, jets de sauvegarde, et création de personnage détaillée. Le système privilégie la simplicité tout en offrant de la profondeur tactique. Parfait pour débuter, il reste suffisamment riche pour les joueurs expérimentés.",
      included: [
        "Règles de base complètes",
        "12 classes de personnage",
        "9 races jouables",
        "Système de sorts (niveaux 1-9)",
        "Règles de combat tactique",
        "Système d'expérience et niveaux"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Classes avec progression sur 20 niveaux",
        "Système de sorts par niveaux",
        "Combat sur grille avec actions/bonus actions",
        "Jets de sauvegarde (Force, Dextérité, Constitution, Intelligence, Sagesse, Charisme)",
        "Système d'avantage/désavantage"
      ],
      extensions: [
        {
          id: 1,
          name: "Player's Handbook",
          price: 49.99,
          type: "Achats facultatifs",
          image: "/images/players-handbook.jpg"
        },
        {
          id: 2,
          name: "Dungeon Master's Guide",
          price: 49.99,
          type: "Achats facultatifs",
          image: "/images/dungeon-masters-guide.jpg"
        }
      ],
      image: "/images/dnd5e-rules.jpg",
      type: 'free'
    },
    2: {
      id: 2,
      name: "Pathfinder 2e",
      publisher: "Paizo Publishing",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Pathfinder 2e propose un système de règles fantasy tactique et détaillé. Le système utilise un d20 avec des modificateurs de caractéristiques et un système de trois actions par tour. Les mécaniques incluent : classes avec archétypes, système de sorts par traditions, combat tactique avec actions multiples, système de traits et conditions, et progression par points d'expérience. Le système offre une grande profondeur tactique avec de nombreuses options de personnalisation.",
      included: [
        "Règles de base complètes",
        "12 classes de base",
        "Ancêtres et héritages",
        "Système de sorts (niveaux 1-10)",
        "Règles de combat tactique",
        "Système de traits et conditions"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Système de trois actions par tour",
        "Classes avec archétypes multiclassés",
        "Système de sorts par traditions (arcane, divine, occulte, primordiale)",
        "Combat tactique avec actions multiples",
        "Système de traits et conditions détaillé"
      ],
      extensions: [
        {
          id: 3,
          name: "Advanced Player's Guide",
          price: 39.99,
          type: "Achats facultatifs",
          image: "/images/pathfinder-apg.jpg"
        },
        {
          id: 4,
          name: "Bestiary",
          price: 44.99,
          type: "Achats facultatifs",
          image: "/images/pathfinder-bestiary.jpg"
        }
      ],
      image: "/images/pathfinder-rules.jpg",
      type: 'freemium'
    },
    3: {
      id: 3,
      name: "Call of Cthulhu",
      publisher: "Chaosium",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Call of Cthulhu 7e propose un système de règles d'horreur basé sur des pourcentages. Le système utilise des caractéristiques (Force, Constitution, Taille, Intelligence, Pouvoir, Dextérité, Apparence, Éducation) avec des compétences en pourcentage. Les mécaniques incluent : jets de compétences d100, système de santé mentale, jets de pouvoirs, combat létal, et progression par utilisation. Le système privilégie l'investigation et la survie face aux horreurs cosmiques.",
      included: [
        "Règles de base complètes",
        "8 caractéristiques principales",
        "Système de compétences en pourcentage",
        "Règles de santé mentale",
        "Système de combat létal",
        "Règles de magie et pouvoirs"
      ],
      features: [
        "D100 + compétences en pourcentage",
        "8 caractéristiques (FOR, CON, TAI, INT, POU, DEX, APP, ÉDU)",
        "Système de santé mentale et folie",
        "Jets de pouvoirs et magie",
        "Combat létal et blessures",
        "Progression par utilisation des compétences"
      ],
      extensions: [
        {
          id: 5,
          name: "Masks of Nyarlathotep",
          price: 89.99,
          type: "Campagne",
          image: "/images/masks-nyarlathotep.jpg"
        },
        {
          id: 6,
          name: "Horror on the Orient Express",
          price: 79.99,
          type: "Campagne",
          image: "/images/horror-orient-express.jpg"
        }
      ],
      image: "/images/cthulhu-rules.jpg",
      type: 'free'
    },
    4: {
      id: 4,
      name: "Vampire: The Masquerade",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Vampire: The Masquerade 5e édition plonge les joueurs dans l'univers sombre et gothique des vampires modernes. En tant que créatures de la nuit, ils doivent naviguer entre leur humanité perdue et leur soif de sang. Le système utilise des dés à 10 faces et explore les thèmes de la corruption et du pouvoir. Un jeu mature qui explore la politique surnaturelle et la lutte contre la bestialité.",
      included: [
        "5e édition",
        "Règles de la Masquerade",
        "Clans vampires",
        "Système de Hunger"
      ],
      features: [
        "Système d10",
        "Clans vampires",
        "Hunger et Humanité",
        "Politique surnaturelle"
      ],
      extensions: [
        {
          id: 7,
          name: "Camarilla",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/vampire-camarilla.jpg"
        },
        {
          id: 8,
          name: "Anarch",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/vampire-anarch.jpg"
        }
      ],
      image: "/images/vampire-rules.jpg",
      type: 'freemium'
    },
    5: {
      id: 5,
      name: "Cyberpunk RED",
      publisher: "R. Talsorian Games",
      price: 0,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "Cyberpunk RED transporte les joueurs dans un futur dystopique où la technologie et la cybernétique ont transformé la société. Dans Night City, les joueurs incarnent des cyberpunks qui vivent en marge de la loi. Le système utilise un d10 et met l'accent sur l'action et la technologie. Un monde où style et substance se rencontrent dans des aventures high-tech et low-life.",
      included: [
        "Livre de base",
        "Règles de cybernétique",
        "Guide de Night City",
        "Système de combat"
      ],
      features: [
        "Système d10",
        "Cybernétique",
        "Combat brutal",
        "Technologie futuriste"
      ],
      extensions: [
        {
          id: 9,
          name: "Black Chrome",
          price: 34.99,
          type: "Équipement",
          image: "/images/cyberpunk-black-chrome.jpg"
        },
        {
          id: 10,
          name: "Danger Gal Dossier",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/cyberpunk-danger-gal.jpg"
        }
      ],
      image: "/images/cyberpunk-rules.jpg",
      type: 'free'
    },
    6: {
      id: 6,
      name: "Fate Core",
      publisher: "Evil Hat Productions",
      price: 0,
      tags: ["Générique", "Libres", "Intermédiaire"],
      description: "Fate Core propose un système de règles générique et narratif basé sur des aspects et des dés Fate. Le système utilise des dés Fate (d6 avec faces +, -, et 0) et des aspects narratifs pour résoudre les actions. Les mécaniques incluent : création d'aspects, utilisation de points Fate, jets de compétences, création d'avantages, et narration collaborative. Le système privilégie la flexibilité et l'improvisation pour tous types d'univers.",
      included: [
        "Règles de base complètes",
        "Système d'aspects",
        "Système de compétences",
        "Règles de création d'avantages",
        "Système de points Fate",
        "Règles de narration collaborative"
      ],
      features: [
        "Dés Fate (d6 avec faces +, -, 0)",
        "Système d'aspects narratifs",
        "Jets de compétences + aspects",
        "Création d'avantages et d'invokes",
        "Système de points Fate",
        "Narration collaborative et improvisation"
      ],
      extensions: [
        {
          id: 11,
          name: "Fate Worlds",
          price: 19.99,
          type: "Suppléments univers",
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 12,
          name: "Venture City",
          price: 14.99,
          type: "Suppléments univers",
          image: "/images/venture-city.jpg"
        }
      ],
      image: "/images/fate-rules.jpg",
      type: 'free'
    },
    7: {
      id: 7,
      name: "Apocalypse World",
      publisher: "D. Vincent Baker",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Apocalypse World 2e édition est le jeu qui a révolutionné le design de jeux de rôle avec son système Powered by the Apocalypse. Dans un monde post-apocalyptique, les joueurs incarnent des survivants qui tentent de reconstruire la civilisation. Le système encourage l'improvisation et la collaboration, créant des histoires dynamiques et imprévisibles où chaque session est unique.",
      included: [
        "2e édition",
        "Règles PbtA",
        "Classes post-apocalyptiques",
        "Système de Moves"
      ],
      features: [
        "Système PbtA",
        "Moves narratifs",
        "Classes uniques",
        "Improvisation"
      ],
      extensions: [
        {
          id: 13,
          name: "Burn Over",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/apocalypse-burn-over.jpg"
        },
        {
          id: 14,
          name: "World of Dungeons",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/world-of-dungeons.jpg"
        }
      ],
      image: "/images/apocalypse-rules.jpg",
      type: 'free'
    },
    8: {
      id: 8,
      name: "Blades in the Dark",
      publisher: "John Harper",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Blades in the Dark plonge les joueurs dans Doskvol, une ville sombre et industrielle hantée par des fantômes. Ils incarnent une bande de criminels qui tentent de faire fortune dans les bas-fonds. Le système utilise des dés à 6 faces et propose des mécaniques innovantes comme les flashbacks. Un jeu qui mélange heist, horreur et politique dans un cadre unique.",
      included: [
        "Livre de base",
        "Règles de bande criminelle",
        "Guide de Doskvol",
        "Système de Stress"
      ],
      features: [
        "Système d6",
        "Flashbacks",
        "Stress et Trauma",
        "Bande criminelle"
      ],
      extensions: [
        {
          id: 15,
          name: "Scum & Villainy",
          price: 34.99,
          type: "Achats facultatifs",
          image: "/images/scum-villainy.jpg"
        },
        {
          id: 16,
          name: "Band of Blades",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/band-of-blades.jpg"
        }
      ],
      image: "/images/blades-rules.jpg",
      type: 'free'
    },
    9: {
      id: 9,
      name: "Lasers & Feelings",
      publisher: "John Harper",
      price: 0,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Lasers & Feelings est un jeu de rôle minimaliste et narratif qui capture l'essence des séries de science-fiction des années 60-80. Avec une seule stat et des règles ultra-simples, il se concentre sur l'histoire et l'improvisation. Parfait pour des sessions courtes et intenses, il permet de créer des aventures épiques en quelques minutes de préparation.",
      included: [
        "Règles complètes (1 page)",
        "Générateur d'aventures",
        "Conseils de jeu",
        "Système minimaliste"
      ],
      features: [
        "Une seule stat",
        "Règles simples",
        "Improvisation",
        "Sessions courtes"
      ],
      extensions: [
        {
          id: 17,
          name: "Honey Heist",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/honey-heist.jpg"
        },
        {
          id: 18,
          name: "The Witch is Dead",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/witch-is-dead.jpg"
        }
      ],
      image: "/images/lasers-rules.jpg",
      type: 'free'
    },
    10: {
      id: 10,
      name: "Dungeon World",
      publisher: "Sage Kobold",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Dungeon World révolutionne le jeu de rôle fantasy en combinant la familiarité de D&D avec l'innovation narrative des jeux Powered by the Apocalypse. Les règles simples mais profondes encouragent la collaboration et l'improvisation, créant des histoires dynamiques. Un système qui capture l'essence de l'aventure fantasy tout en restant accessible aux nouveaux joueurs.",
      included: [
        "Règles de base",
        "Classes fantasy",
        "Guide du MJ",
        "Système PbtA"
      ],
      features: [
        "Système PbtA",
        "Classes fantasy",
        "Narration fluide",
        "Collaboration"
      ],
      extensions: [
        {
          id: 19,
          name: "Class Warfare",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/class-warfare.jpg"
        },
        {
          id: 20,
          name: "Perilous Wilds",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/perilous-wilds.jpg"
        }
      ],
      image: "/images/dungeon-world-rules.jpg",
      type: 'free'
    },
    // Règles déjà connues
    'known-1': {
      id: 'known-1',
      name: "D&D 5e",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Dungeons & Dragons 5e est le système de jeu de rôle fantasy le plus populaire au monde. Avec ses règles accessibles et son univers riche, il permet aux joueurs de créer des héros épiques dans un monde de magie et d'aventure. Le système utilise un d20 comme dé principal et propose des mécaniques simples mais profondes pour le combat, la magie et l'exploration. Parfait pour débuter dans le jeu de rôle, D&D 5e offre une expérience immersive et collaborative où chaque dé peut changer le cours de l'histoire.",
      included: [
        "Manuel des Joueurs",
        "Guide du Maître de Donjon",
        "Bestiaire Monstrueux",
        "Règles de combat et magie"
      ],
      features: [
        "Système de classes et races",
        "Magie par sorts",
        "Combat tactique",
        "Création de personnage détaillée"
      ],
      extensions: [
        {
          id: 1,
          name: "Tasha's Cauldron of Everything",
          price: 49.99,
          type: "Achats facultatifs",
          image: "/images/tashas-cauldron.jpg"
        },
        {
          id: 2,
          name: "Xanathar's Guide to Everything",
          price: 49.99,
          type: "Achats facultatifs",
          image: "/images/xanathars-guide.jpg"
        }
      ],
      image: "/images/dnd5e-rules.jpg",
      type: 'owned'
    },
    'known-2': {
      id: 'known-2',
      name: "Call of Cthulhu",
      publisher: "Chaosium",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Call of Cthulhu 7e propose un système de règles d'horreur basé sur des pourcentages. Le système utilise des caractéristiques (Force, Constitution, Taille, Intelligence, Pouvoir, Dextérité, Apparence, Éducation) avec des compétences en pourcentage. Les mécaniques incluent : jets de compétences d100, système de santé mentale, jets de pouvoirs, combat létal, et progression par utilisation. Le système privilégie l'investigation et la survie face aux horreurs cosmiques.",
      included: [
        "Règles de base complètes",
        "8 caractéristiques principales",
        "Système de compétences en pourcentage",
        "Règles de santé mentale",
        "Système de combat létal",
        "Règles de magie et pouvoirs"
      ],
      features: [
        "D100 + compétences en pourcentage",
        "8 caractéristiques (FOR, CON, TAI, INT, POU, DEX, APP, ÉDU)",
        "Système de santé mentale et folie",
        "Jets de pouvoirs et magie",
        "Combat létal et blessures",
        "Progression par utilisation des compétences"
      ],
      extensions: [
        {
          id: 5,
          name: "Masks of Nyarlathotep",
          price: 89.99,
          type: "Campagne",
          image: "/images/masks-nyarlathotep.jpg"
        },
        {
          id: 6,
          name: "Horror on the Orient Express",
          price: 79.99,
          type: "Campagne",
          image: "/images/horror-orient-express.jpg"
        }
      ],
      image: "/images/cthulhu-rules.jpg",
      type: 'owned'
    },
    'known-3': {
      id: 'known-3',
      name: "Fate Core",
      publisher: "Evil Hat Productions",
      price: 0,
      tags: ["Générique", "Libres", "Intermédiaire"],
      description: "Fate Core propose un système de règles générique et narratif basé sur des aspects et des dés Fate. Le système utilise des dés Fate (d6 avec faces +, -, et 0) et des aspects narratifs pour résoudre les actions. Les mécaniques incluent : création d'aspects, utilisation de points Fate, jets de compétences, création d'avantages, et narration collaborative. Le système privilégie la flexibilité et l'improvisation pour tous types d'univers.",
      included: [
        "Règles de base complètes",
        "Système d'aspects",
        "Système de compétences",
        "Règles de création d'avantages",
        "Système de points Fate",
        "Règles de narration collaborative"
      ],
      features: [
        "Dés Fate (d6 avec faces +, -, 0)",
        "Système d'aspects narratifs",
        "Jets de compétences + aspects",
        "Création d'avantages et d'invokes",
        "Système de points Fate",
        "Narration collaborative et improvisation"
      ],
      extensions: [
        {
          id: 11,
          name: "Fate Worlds",
          price: 19.99,
          type: "Suppléments univers",
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 12,
          name: "Venture City",
          price: 14.99,
          type: "Suppléments univers",
          image: "/images/venture-city.jpg"
        }
      ],
      image: "/images/fate-rules.jpg",
      type: 'owned'
    },
    'known-4': {
      id: 'known-4',
      name: "Pathfinder 2e",
      publisher: "Paizo Publishing",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Pathfinder 2e est l'évolution moderne du système de jeu de rôle fantasy le plus détaillé. Avec ses règles tactiques sophistiquées et sa profondeur de personnalisation, il offre une expérience de jeu riche et complexe. Le système utilise trois actions par tour et propose une grande variété d'options tactiques. Parfait pour les joueurs expérimentés qui cherchent de la profondeur mécanique et de la stratégie dans leurs parties.",
      included: [
        "Livre de base",
        "Règles de combat tactique",
        "Système de classes avancé",
        "Magie et sorts"
      ],
      features: [
        "Système à 3 actions",
        "Classes et archétypes",
        "Combat tactique",
        "Magie flexible"
      ],
      extensions: [
        {
          id: 3,
          name: "Advanced Player's Guide",
          price: 39.99,
          type: "Achats facultatifs",
          image: "/images/pathfinder-apg.jpg"
        },
        {
          id: 4,
          name: "Bestiary",
          price: 44.99,
          type: "Achats facultatifs",
          image: "/images/pathfinder-bestiary.jpg"
        }
      ],
      image: "/images/pathfinder-rules.jpg",
      type: 'owned'
    },
    
    // Nouveaux systèmes de règles
    21: {
      id: 21,
      name: "D&D Modern",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "D&D Modern adapte le système D&D 5e pour l'époque moderne. Le système utilise les mêmes mécaniques de base (d20, classes, sorts) mais adaptées aux technologies et armes modernes. Les mécaniques incluent : classes modernes, armes à feu, véhicules, technologie, et sorts adaptés au monde contemporain.",
      included: [
        "Règles de base D&D 5e",
        "Classes modernes",
        "Système d'armes à feu",
        "Règles de véhicules",
        "Technologie moderne",
        "Sorts adaptés"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Classes modernes (Soldat, Expert, etc.)",
        "Système d'armes à feu et explosifs",
        "Règles de véhicules et chases",
        "Technologie et cybernétique",
        "Sorts adaptés au monde moderne"
      ],
      extensions: [
        {
          id: 21,
          name: "Urban Arcana",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/urban-arcana.jpg"
        },
        {
          id: 22,
          name: "Future Tech",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/future-tech.jpg"
        }
      ],
      image: "/images/dnd-modern-rules.jpg",
      type: 'free'
    },
    22: {
      id: 22,
      name: "L'Univers Héroïque",
      publisher: "Free League",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "L'Univers Héroïque propose un système fantasy épique avec des héros légendaires. Le système utilise des dés d6 avec des mécaniques de héros et de légendes. Les mécaniques incluent : création de héros épiques, système de légendes, combat héroïque, et progression par accomplissements.",
      included: [
        "Règles de base complètes",
        "Système de héros épiques",
        "Mécaniques de légendes",
        "Combat héroïque",
        "Système d'accomplissements",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de héros",
        "Système de héros épiques",
        "Mécaniques de légendes et récits",
        "Combat héroïque et dramatique",
        "Système d'accomplissements",
        "Progression par légendes"
      ],
      extensions: [
        {
          id: 23,
          name: "Légendes Perdues",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/legendes-perdues.jpg"
        },
        {
          id: 24,
          name: "Héros Légendaires",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/heros-legendaires.jpg"
        }
      ],
      image: "/images/heroic-universe-rules.jpg",
      type: 'free'
    },
    23: {
      id: 23,
      name: "Numenera",
      publisher: "Monte Cook Games",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Numenera propose un système science-fiction avec technologie mystérieuse. Le système utilise des dés d20 avec des mécaniques de découverte et d'exploration. Les mécaniques incluent : création de personnages uniques, système de cyphers, exploration de ruines, et technologie mystérieuse.",
      included: [
        "Règles de base complètes",
        "Système de personnages uniques",
        "Mécaniques de cyphers",
        "Règles d'exploration",
        "Technologie mystérieuse",
        "Système de découverte"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Système de personnages uniques (Type + Descripteur + Focus)",
        "Mécaniques de cyphers et artefacts",
        "Règles d'exploration et découverte",
        "Technologie mystérieuse et ruines",
        "Système de progression par découverte"
      ],
      extensions: [
        {
          id: 25,
          name: "Discovery & Destiny",
          price: 34.99,
          type: "Achats facultatifs",
          image: "/images/discovery-destiny.jpg"
        },
        {
          id: 26,
          name: "Cypher Collection",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/cypher-collection.jpg"
        }
      ],
      image: "/images/numenera-rules.jpg",
      type: 'free'
    },
    24: {
      id: 24,
      name: "Thirsty Sword Lesbians",
      publisher: "April Kit Walsh",
      price: 0,
      tags: ["Fantasy", "Liées", "Débutant"],
      description: "Thirsty Sword Lesbians propose un système fantasy queer avec romance et aventure. Le système utilise des dés d6 avec des mécaniques de romance et d'aventure. Les mécaniques incluent : création de personnages queer, système de romance, combat dramatique, et progression par relations.",
      included: [
        "Règles de base complètes",
        "Système de personnages queer",
        "Mécaniques de romance",
        "Combat dramatique",
        "Système de relations",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système de personnages queer",
        "Mécaniques de romance et relations",
        "Combat dramatique et émotionnel",
        "Système de relations et liens",
        "Progression par relations"
      ],
      extensions: [
        {
          id: 27,
          name: "Romance & Adventure",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/romance-adventure.jpg"
        },
        {
          id: 28,
          name: "Queer Fantasy",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/queer-fantasy.jpg"
        }
      ],
      image: "/images/thirsty-sword-rules.jpg",
      type: 'free'
    },
    25: {
      id: 25,
      name: "Neverland",
      publisher: "Scott Malthouse",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Neverland propose un système narratif pour histoires d'aventure. Le système utilise des dés d6 avec des mécaniques narratives simples. Les mécaniques incluent : création de personnages d'aventure, système narratif, exploration, et progression par découvertes.",
      included: [
        "Règles de base complètes",
        "Système narratif simple",
        "Mécaniques d'aventure",
        "Règles d'exploration",
        "Système de découvertes",
        "Progression narrative"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système narratif simple",
        "Mécaniques d'aventure et exploration",
        "Règles de découvertes",
        "Système de progression narrative",
        "Focus sur l'histoire"
      ],
      extensions: [
        {
          id: 29,
          name: "Adventure Tales",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/adventure-tales.jpg"
        },
        {
          id: 30,
          name: "Explorer's Guide",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/explorers-guide.jpg"
        }
      ],
      image: "/images/neverland-rules.jpg",
      type: 'free'
    },
    26: {
      id: 26,
      name: "Pax Ethica",
      publisher: "Scott Malthouse",
      price: 0,
      tags: ["Science-fiction", "Liées", "Expert"],
      description: "Pax Ethica propose un système science-fiction éthique et philosophique. Le système utilise des dés d6 avec des mécaniques de choix moraux et d'éthique. Les mécaniques incluent : création de personnages éthiques, système de dilemmes moraux, résolution de conflits éthiques, et progression par valeurs.",
      included: [
        "Règles de base complètes",
        "Système de personnages éthiques",
        "Mécaniques de dilemmes moraux",
        "Résolution de conflits éthiques",
        "Système de valeurs",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système de personnages éthiques",
        "Mécaniques de dilemmes moraux",
        "Résolution de conflits éthiques",
        "Système de valeurs et principes",
        "Progression par choix éthiques"
      ],
      extensions: [
        {
          id: 31,
          name: "Ethical Dilemmas",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/ethical-dilemmas.jpg"
        },
        {
          id: 32,
          name: "Moral Philosophy",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/moral-philosophy.jpg"
        }
      ],
      image: "/images/pax-ethica-rules.jpg",
      type: 'free'
    },
    27: {
      id: 27,
      name: "Lady Blackbird",
      publisher: "John Harper",
      price: 0,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Lady Blackbird propose un système narratif pour aventures spatiales. Le système utilise des dés d6 avec des mécaniques narratives simples. Les mécaniques incluent : création de personnages d'aventure spatiale, système narratif, exploration spatiale, et progression par découvertes.",
      included: [
        "Règles de base complètes",
        "Système narratif simple",
        "Mécaniques d'aventure spatiale",
        "Règles d'exploration spatiale",
        "Système de découvertes",
        "Progression narrative"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système narratif simple",
        "Mécaniques d'aventure spatiale",
        "Règles d'exploration spatiale",
        "Système de découvertes",
        "Focus sur l'histoire spatiale"
      ],
      extensions: [
        {
          id: 33,
          name: "Space Adventures",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/space-adventures.jpg"
        },
        {
          id: 34,
          name: "Galactic Explorer",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/galactic-explorer.jpg"
        }
      ],
      image: "/images/lady-blackbird-rules.jpg",
      type: 'free'
    },
    28: {
      id: 28,
      name: "Aria",
      publisher: "Last Unicorn / Elder Craft",
      price: 0,
      tags: ["Autres", "Liées", "Expert"],
      description: "Aria propose un système générique complexe pour tous genres. Le système utilise des dés d10 avec des mécaniques complexes et détaillées. Les mécaniques incluent : création de personnages complexes, système de compétences détaillé, résolution de conflits complexes, et progression par expérience.",
      included: [
        "Règles de base complètes",
        "Système de personnages complexes",
        "Mécaniques de compétences détaillées",
        "Résolution de conflits complexes",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D10 + modificateurs de caractéristiques",
        "Système de personnages complexes",
        "Mécaniques de compétences détaillées",
        "Résolution de conflits complexes",
        "Système d'expérience et progression",
        "Adaptable à tous genres"
      ],
      extensions: [
        {
          id: 35,
          name: "Advanced Rules",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/advanced-rules.jpg"
        },
        {
          id: 36,
          name: "Genre Adaptations",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/genre-adaptations.jpg"
        }
      ],
      image: "/images/aria-rules.jpg",
      type: 'free'
    },
    29: {
      id: 29,
      name: "Microscope",
      publisher: "Ben Robbins",
      price: 0,
      tags: ["Autres", "Libres", "Intermédiaire"],
      description: "Microscope propose un système de création d'histoire collaborative. Le système utilise des mécaniques de narration collaborative sans dés. Les mécaniques incluent : création d'histoire collaborative, système de périodes, résolution de conflits narratifs, et progression par création.",
      included: [
        "Règles de base complètes",
        "Système de création d'histoire",
        "Mécaniques de périodes",
        "Résolution de conflits narratifs",
        "Système de création",
        "Règles de progression"
      ],
      features: [
        "Système sans dés",
        "Création d'histoire collaborative",
        "Mécaniques de périodes et époques",
        "Résolution de conflits narratifs",
        "Système de création et imagination",
        "Focus sur la collaboration"
      ],
      extensions: [
        {
          id: 37,
          name: "History Builder",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/history-builder.jpg"
        },
        {
          id: 38,
          name: "Collaborative Worlds",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/collaborative-worlds.jpg"
        }
      ],
      image: "/images/microscope-rules.jpg",
      type: 'free'
    },
    30: {
      id: 30,
      name: "Forbidden Lands",
      publisher: "Tomas Härenstam",
      price: 0,
      tags: ["Fantasy", "Liées", "Intermédiaire"],
      description: "Forbidden Lands propose un système d'exploration et survie fantasy. Le système utilise des dés d6 avec des mécaniques de survie et d'exploration. Les mécaniques incluent : création de personnages d'explorateurs, système de survie, exploration de terres interdites, et progression par découvertes.",
      included: [
        "Règles de base complètes",
        "Système de personnages d'explorateurs",
        "Mécaniques de survie",
        "Exploration de terres interdites",
        "Système de découvertes",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système de personnages d'explorateurs",
        "Mécaniques de survie et exploration",
        "Exploration de terres interdites",
        "Système de découvertes et trésors",
        "Focus sur la survie"
      ],
      extensions: [
        {
          id: 39,
          name: "Explorer's Guide",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/explorers-guide.jpg"
        },
        {
          id: 40,
          name: "Survival Rules",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/survival-rules.jpg"
        }
      ],
      image: "/images/forbidden-lands-rules.jpg",
      type: 'free'
    },
    31: {
      id: 31,
      name: "Horror in Arkham",
      publisher: "Chaosium",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Horror in Arkham propose un système d'horreur cosmique dans Arkham. Le système utilise des dés d100 avec des mécaniques d'horreur et d'investigation. Les mécaniques incluent : création d'investigateurs, système d'horreur cosmique, investigation dans Arkham, et progression par découvertes.",
      included: [
        "Règles de base complètes",
        "Système d'investigateurs",
        "Mécaniques d'horreur cosmique",
        "Investigation dans Arkham",
        "Système de découvertes",
        "Règles de progression"
      ],
      features: [
        "D100 + compétences en pourcentage",
        "Système d'investigateurs",
        "Mécaniques d'horreur cosmique",
        "Investigation dans Arkham",
        "Système de découvertes et révélations",
        "Focus sur l'horreur psychologique"
      ],
      extensions: [
        {
          id: 41,
          name: "Arkham Investigations",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/arkham-investigations.jpg"
        },
        {
          id: 42,
          name: "Cosmic Horror",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/cosmic-horror.jpg"
        }
      ],
      image: "/images/horror-arkham-rules.jpg",
      type: 'free'
    },
    32: {
      id: 32,
      name: "Warhammer Fantasy Roleplay",
      publisher: "Cubicle 7",
      price: 0,
      tags: ["Fantasy", "Liées", "Expert"],
      description: "Warhammer Fantasy Roleplay propose un système fantasy sombre et brutal. Le système utilise des dés d100 avec des mécaniques de combat brutal et de corruption. Les mécaniques incluent : création de personnages sombres, système de combat brutal, corruption et chaos, et progression par expérience.",
      included: [
        "Règles de base complètes",
        "Système de personnages sombres",
        "Mécaniques de combat brutal",
        "Corruption et chaos",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D100 + compétences en pourcentage",
        "Système de personnages sombres",
        "Mécaniques de combat brutal",
        "Corruption et chaos",
        "Système d'expérience et progression",
        "Focus sur la brutalité"
      ],
      extensions: [
        {
          id: 43,
          name: "Dark Fantasy",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/dark-fantasy.jpg"
        },
        {
          id: 44,
          name: "Chaos & Corruption",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/chaos-corruption.jpg"
        }
      ],
      image: "/images/warhammer-fantasy-rules.jpg",
      type: 'free'
    },
    33: {
      id: 33,
      name: "Shadowrun",
      publisher: "Catalyst Game Labs",
      price: 0,
      tags: ["Science-fiction", "Liées", "Expert"],
      description: "Shadowrun propose un système cyberpunk avec magie et technologie. Le système utilise des dés d6 avec des mécaniques de cyberpunk et de magie. Les mécaniques incluent : création de personnages cyberpunk, système de magie et technologie, combat futuriste, et progression par expérience.",
      included: [
        "Règles de base complètes",
        "Système de personnages cyberpunk",
        "Mécaniques de magie et technologie",
        "Combat futuriste",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système de personnages cyberpunk",
        "Mécaniques de magie et technologie",
        "Combat futuriste et cybernétique",
        "Système d'expérience et progression",
        "Focus sur le cyberpunk"
      ],
      extensions: [
        {
          id: 45,
          name: "Cyberpunk Rules",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/cyberpunk-rules.jpg"
        },
        {
          id: 46,
          name: "Magic & Technology",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/magic-technology.jpg"
        }
      ],
      image: "/images/shadowrun-rules.jpg",
      type: 'free'
    },
    34: {
      id: 34,
      name: "World of Darkness",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Liées", "Intermédiaire"],
      description: "World of Darkness propose un système d'horreur urbaine moderne. Le système utilise des dés d10 avec des mécaniques d'horreur et de politique. Les mécaniques incluent : création de personnages surnaturels, système d'horreur urbaine, politique surnaturelle, et progression par expérience.",
      included: [
        "Règles de base complètes",
        "Système de personnages surnaturels",
        "Mécaniques d'horreur urbaine",
        "Politique surnaturelle",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D10 + modificateurs de caractéristiques",
        "Système de personnages surnaturels",
        "Mécaniques d'horreur urbaine",
        "Politique surnaturelle et intrigues",
        "Système d'expérience et progression",
        "Focus sur l'horreur moderne"
      ],
      extensions: [
        {
          id: 47,
          name: "Urban Horror",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/urban-horror.jpg"
        },
        {
          id: 48,
          name: "Supernatural Politics",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/supernatural-politics.jpg"
        }
      ],
      image: "/images/world-of-darkness-rules.jpg",
      type: 'free'
    },
    35: {
      id: 35,
      name: "GURPS",
      publisher: "Steve Jackson Games",
      price: 0,
      tags: ["Autres", "Liées", "Expert"],
      description: "GURPS propose un système générique universel pour tous genres. Le système utilise des dés d6 avec des mécaniques complexes et détaillées. Les mécaniques incluent : création de personnages complexes, système de compétences détaillé, résolution de conflits complexes, et progression par expérience.",
      included: [
        "Règles de base complètes",
        "Système de personnages complexes",
        "Mécaniques de compétences détaillées",
        "Résolution de conflits complexes",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système de personnages complexes",
        "Mécaniques de compétences détaillées",
        "Résolution de conflits complexes",
        "Système d'expérience et progression",
        "Adaptable à tous genres"
      ],
      extensions: [
        {
          id: 49,
          name: "Advanced Rules",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/advanced-rules.jpg"
        },
        {
          id: 50,
          name: "Genre Adaptations",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/genre-adaptations.jpg"
        }
      ],
      image: "/images/gurps-rules.jpg",
      type: 'free'
    },
    36: {
      id: 36,
      name: "Honey Heist",
      publisher: "Grant Howitt",
      price: 0,
      tags: ["Comédie & Parodique", "Libres", "Débutant"],
      description: "Honey Heist propose un système narratif court pour comédie. Le système utilise des dés d6 avec des mécaniques narratives simples. Les mécaniques incluent : création de personnages comiques, système narratif simple, comédie et parodie, et progression par découvertes.",
      included: [
        "Règles de base complètes",
        "Système narratif simple",
        "Mécaniques de comédie",
        "Parodie et humour",
        "Système de découvertes",
        "Progression narrative"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système narratif simple",
        "Mécaniques de comédie et parodie",
        "Humour et légèreté",
        "Système de découvertes",
        "Focus sur l'amusement"
      ],
      extensions: [
        {
          id: 51,
          name: "Comedy Rules",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/comedy-rules.jpg"
        },
        {
          id: 52,
          name: "Parody Adventures",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/parody-adventures.jpg"
        }
      ],
      image: "/images/honey-heist-rules.jpg",
      type: 'free'
    },
    37: {
      id: 37,
      name: "The Quiet Year",
      publisher: "Avery Alder",
      price: 0,
      tags: ["Autres", "Libres", "Intermédiaire"],
      description: "The Quiet Year propose un système de construction de communauté. Le système utilise des mécaniques de narration collaborative sans dés. Les mécaniques incluent : création de communauté, système de saisons, résolution de conflits communautaires, et progression par construction.",
      included: [
        "Règles de base complètes",
        "Système de construction de communauté",
        "Mécaniques de saisons",
        "Résolution de conflits communautaires",
        "Système de construction",
        "Règles de progression"
      ],
      features: [
        "Système sans dés",
        "Construction de communauté",
        "Mécaniques de saisons et temps",
        "Résolution de conflits communautaires",
        "Système de construction et développement",
        "Focus sur la collaboration"
      ],
      extensions: [
        {
          id: 53,
          name: "Community Builder",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/community-builder.jpg"
        },
        {
          id: 54,
          name: "Seasonal Rules",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/seasonal-rules.jpg"
        }
      ],
      image: "/images/quiet-year-rules.jpg",
      type: 'free'
    },
    38: {
      id: 38,
      name: "Dread",
      publisher: "Rafael Chandler",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Débutant"],
      description: "Dread propose un système d'horreur avec mécanique Jenga. Le système utilise une tour Jenga comme mécanique principale. Les mécaniques incluent : création de personnages d'horreur, système de tension avec Jenga, horreur psychologique, et progression par survie.",
      included: [
        "Règles de base complètes",
        "Système de personnages d'horreur",
        "Mécaniques de tension avec Jenga",
        "Horreur psychologique",
        "Système de survie",
        "Règles de progression"
      ],
      features: [
        "Système avec tour Jenga",
        "Système de personnages d'horreur",
        "Mécaniques de tension et stress",
        "Horreur psychologique",
        "Système de survie et tension",
        "Focus sur l'horreur"
      ],
      extensions: [
        {
          id: 55,
          name: "Horror Scenarios",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/horror-scenarios.jpg"
        },
        {
          id: 56,
          name: "Tension Rules",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/tension-rules.jpg"
        }
      ],
      image: "/images/dread-rules.jpg",
      type: 'free'
    },
    39: {
      id: 39,
      name: "Mutant: Year Zero",
      publisher: "Free League Publishing",
      price: 0,
      tags: ["Science-fiction", "Liées", "Intermédiaire"],
      description: "Mutant: Year Zero propose un système post-apocalyptique avec mutations. Le système utilise des dés d6 avec des mécaniques de survie et de mutations. Les mécaniques incluent : création de mutants, système de mutations, survie post-apocalyptique, et progression par découvertes.",
      included: [
        "Règles de base complètes",
        "Système de mutants",
        "Mécaniques de mutations",
        "Survie post-apocalyptique",
        "Système de découvertes",
        "Règles de progression"
      ],
      features: [
        "D6 + modificateurs de caractéristiques",
        "Système de mutants",
        "Mécaniques de mutations et pouvoirs",
        "Survie post-apocalyptique",
        "Système de découvertes et exploration",
        "Focus sur la survie"
      ],
      extensions: [
        {
          id: 57,
          name: "Mutation Rules",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/mutation-rules.jpg"
        },
        {
          id: 58,
          name: "Post-Apocalyptic Survival",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/post-apocalyptic-survival.jpg"
        }
      ],
      image: "/images/mutant-year-zero-rules.jpg",
      type: 'free'
    },
    40: {
      id: 40,
      name: "Symbaroum",
      publisher: "Free League Publishing",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Symbaroum propose un système dark fantasy avec corruption. Le système utilise des dés d20 avec des mécaniques de corruption et de magie. Les mécaniques incluent : création de personnages sombres, système de corruption, magie dangereuse, et progression par expérience.",
      included: [
        "Règles de base complètes",
        "Système de personnages sombres",
        "Mécaniques de corruption",
        "Magie dangereuse",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Système de personnages sombres",
        "Mécaniques de corruption et ténèbres",
        "Magie dangereuse et corrompue",
        "Système d'expérience et progression",
        "Focus sur la dark fantasy"
      ],
      extensions: [
        {
          id: 59,
          name: "Dark Fantasy Rules",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/dark-fantasy-rules.jpg"
        },
        {
          id: 60,
          name: "Corruption & Magic",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/corruption-magic.jpg"
        }
      ],
      image: "/images/symbaroum-rules.jpg",
      type: 'free'
    },
    
    // Systèmes manquants - Pages détails à créer
    41: {
      id: 41,
      name: "D&D 5e (Freemium)",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "D&D 5e propose un système de règles fantasy éprouvé et accessible. Le système utilise un d20 comme dé principal avec des modificateurs de caractéristiques. Les mécaniques incluent : classes avec progression sur 20 niveaux, système de sorts par niveaux, combat tactique sur grille, jets de sauvegarde, et création de personnage détaillée. Le système privilégie la simplicité tout en offrant de la profondeur tactique. Parfait pour débuter, il reste suffisamment riche pour les joueurs expérimentés.",
      included: [
        "Règles de base complètes",
        "12 classes de personnage",
        "9 races jouables",
        "Système de sorts (niveaux 1-9)",
        "Règles de combat tactique",
        "Système d'expérience et niveaux"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Classes avec progression sur 20 niveaux",
        "Système de sorts par niveaux",
        "Combat sur grille avec actions/bonus actions",
        "Jets de sauvegarde (Force, Dextérité, Constitution, Intelligence, Sagesse, Charisme)",
        "Système d'avantage/désavantage"
      ],
      extensions: [
        {
          id: 61,
          name: "Player's Handbook",
          price: 49.99,
          type: "Achats facultatifs",
          image: "/images/players-handbook.jpg"
        },
        {
          id: 62,
          name: "Dungeon Master's Guide",
          price: 49.99,
          type: "Achats facultatifs",
          image: "/images/dungeon-masters-guide.jpg"
        }
      ],
      image: "/images/dnd5e-rules.jpg",
      type: 'freemium'
    },
    42: {
      id: 42,
      name: "Pathfinder 2e (Freemium)",
      publisher: "Paizo Publishing",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Pathfinder 2e est l'évolution moderne du système de jeu de rôle fantasy le plus détaillé. Avec ses règles tactiques sophistiquées et sa profondeur de personnalisation, il offre une expérience de jeu riche et complexe. Le système utilise trois actions par tour et propose une grande variété d'options tactiques. Parfait pour les joueurs expérimentés qui cherchent de la profondeur mécanique et de la stratégie dans leurs parties.",
      included: [
        "Règles de base complètes",
        "Système à 3 actions par tour",
        "Classes et archétypes",
        "Combat tactique",
        "Magie flexible",
        "Système de compétences détaillé"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Système à 3 actions par tour",
        "Classes et archétypes",
        "Combat tactique",
        "Magie flexible",
        "Système de compétences détaillé"
      ],
      extensions: [
        {
          id: 63,
          name: "Core Rulebook",
          price: 59.99,
          type: "Achats facultatifs",
          image: "/images/pathfinder-core.jpg"
        },
        {
          id: 64,
          name: "Bestiary",
          price: 44.99,
          type: "Achats facultatifs",
          image: "/images/pathfinder-bestiary.jpg"
        }
      ],
      image: "/images/pathfinder-rules.jpg",
      type: 'freemium'
    },
    43: {
      id: 43,
      name: "Vampire: The Masquerade (Freemium)",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Vampire: The Masquerade propose un système de jeu de rôle gothique moderne avec des vampires. Le système utilise des dés d10 avec des mécaniques de sang et de politique. Les mécaniques incluent : création de vampires, système de sang et de faim, politique surnaturelle, et progression par expérience. Le système privilégie le drame et la politique surnaturelle.",
      included: [
        "Règles de base complètes",
        "Système de vampires",
        "Mécaniques de sang et faim",
        "Politique surnaturelle",
        "Système d'expérience",
        "Règles de progression"
      ],
      features: [
        "D10 + modificateurs de caractéristiques",
        "Système de vampires",
        "Mécaniques de sang et faim",
        "Politique surnaturelle",
        "Système d'expérience et progression",
        "Focus sur le drame"
      ],
      extensions: [
        {
          id: 65,
          name: "Core Rulebook",
          price: 55.99,
          type: "Achats facultatifs",
          image: "/images/vampire-core.jpg"
        },
        {
          id: 66,
          name: "Camarilla",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/vampire-camarilla.jpg"
        }
      ],
      image: "/images/vampire-rules.jpg",
      type: 'freemium'
    },
    44: {
      id: 44,
      name: "D&D Modern (Freemium)",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "D&D Modern adapte le système D&D 5e pour l'époque moderne. Le système utilise les mêmes mécaniques de base (d20, classes, sorts) mais adaptées aux technologies et armes modernes. Les mécaniques incluent : classes modernes, armes à feu, véhicules, technologie, et sorts adaptés au monde contemporain.",
      included: [
        "Règles de base D&D 5e",
        "Classes modernes",
        "Système d'armes à feu",
        "Règles de véhicules",
        "Technologie moderne",
        "Sorts adaptés"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Classes modernes (Soldat, Expert, etc.)",
        "Système d'armes à feu et explosifs",
        "Règles de véhicules et chases",
        "Technologie et cybernétique",
        "Sorts adaptés au monde moderne"
      ],
      extensions: [
        {
          id: 67,
          name: "Modern Player's Guide",
          price: 39.99,
          type: "Achats facultatifs",
          image: "/images/modern-players-guide.jpg"
        },
        {
          id: 68,
          name: "Urban Arcana",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/urban-arcana.jpg"
        }
      ],
      image: "/images/dnd-modern-rules.jpg",
      type: 'freemium'
    },
    
    // Règles manquantes ID 5-40
    5: {
      id: 5,
      name: "Cyberpunk RED",
      publisher: "R. Talsorian Games",
      price: 60,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "Cyberpunk RED propose un système de règles cyberpunk futuriste avec technologie et cybernétique. Le système utilise un d10 avec des modificateurs de caractéristiques et un système de compétences. Les mécaniques incluent : classes avec rôles, système de cybernétique, combat avec armes à feu, système de réputation, et progression par expérience. Le système privilégie l'action et la survie dans un monde dystopique.",
      included: [
        "Règles de base complètes",
        "9 rôles de personnage",
        "Système de cybernétique",
        "Règles de combat avec armes à feu",
        "Système de réputation",
        "Règles de véhicules et chases"
      ],
      features: [
        "D10 + modificateurs de caractéristiques",
        "9 rôles (Solo, Netrunner, Techie, etc.)",
        "Système de cybernétique et implants",
        "Combat avec armes à feu et explosifs",
        "Système de réputation et contacts",
        "Règles de véhicules et chases"
      ],
      extensions: [
        {
          id: 69,
          name: "Black Chrome",
          price: 39.99,
          type: "Achats facultatifs",
          image: "/images/black-chrome.jpg"
        },
        {
          id: 70,
          name: "Danger Gal Dossier",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/danger-gal-dossier.jpg"
        }
      ],
      image: "/images/cyberpunk-rules.jpg",
      type: 'paid'
    },
    6: {
      id: 6,
      name: "Fate Core",
      publisher: "Evil Hat Productions",
      price: 0,
      tags: ["Générique", "Libres", "Intermédiaire"],
      description: "Fate Core propose un système narratif générique flexible pour tous types d'aventures. Le système utilise des dés Fudge (d6 avec faces +, -, et 0) et des aspects narratifs. Les mécaniques incluent : aspects et invocations, compétences avec pyramides, stress et conséquences, création de personnage collaborative, et résolution de conflits. Le système privilégie la narration et la collaboration entre joueurs.",
      included: [
        "Règles de base complètes",
        "Système d'aspects",
        "18 compétences",
        "Système de stress et conséquences",
        "Règles de création collaborative",
        "Résolution de conflits"
      ],
      features: [
        "Dés Fudge (d6 avec +, -, 0)",
        "Aspects et invocations",
        "18 compétences avec pyramides",
        "Système de stress et conséquences",
        "Création de personnage collaborative",
        "Résolution de conflits (Physique, Social, Mental)"
      ],
      extensions: [
        {
          id: 71,
          name: "Fate Worlds",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 72,
          name: "Venture City",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/venture-city.jpg"
        }
      ],
      image: "/images/fate-rules.jpg",
      type: 'free'
    },
    7: {
      id: 7,
      name: "Apocalypse World",
      publisher: "D. Vincent Baker",
      price: 35,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Apocalypse World propose un système post-apocalyptique avec mécaniques innovantes. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de Hx (histoire), résolution de conflits, création de monde collaborative, et progression par expérience. Le système privilégie la narration et les choix difficiles.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de Hx (histoire)",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de Hx (histoire entre personnages)",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de monde collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 73,
          name: "Burn Over",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/burn-over.jpg"
        },
        {
          id: 74,
          name: "World of Dungeons",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/world-of-dungeons.jpg"
        }
      ],
      image: "/images/apocalypse-rules.jpg",
      type: 'paid'
    },
    8: {
      id: 8,
      name: "Blades in the Dark",
      publisher: "John Harper",
      price: 50,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Blades in the Dark propose un système de bande criminelle dans une ville sombre et industrielle. Le système utilise des dés d6 avec des résultats partiels et des conséquences. Les mécaniques incluent : classes avec actions, système de stress et trauma, résolution de conflits, création de bande, et progression par réputation. Le système privilégie l'action et les conséquences.",
      included: [
        "Règles de base complètes",
        "Classes avec actions",
        "Système de stress et trauma",
        "Règles de résolution de conflits",
        "Création de bande",
        "Système de réputation"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Classes avec actions (Attaque, Furtivité, etc.)",
        "Système de stress et trauma",
        "Résolution de conflits avec conséquences",
        "Création de bande collaborative",
        "Progression par réputation et contacts"
      ],
      extensions: [
        {
          id: 75,
          name: "Scum & Villainy",
          price: 34.99,
          type: "Achats facultatifs",
          image: "/images/scum-villainy.jpg"
        },
        {
          id: 76,
          name: "Band of Blades",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/band-of-blades.jpg"
        }
      ],
      image: "/images/blades-rules.jpg",
      type: 'paid'
    },
    9: {
      id: 9,
      name: "Lasers & Feelings",
      publisher: "John Harper",
      price: 0,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Lasers & Feelings propose un système minimaliste de science-fiction pour sessions courtes. Le système utilise un seul dé d6 avec une caractéristique unique. Les mécaniques incluent : création de personnage rapide, résolution simple, création de monde collaborative, et sessions courtes. Le système privilégie la simplicité et la créativité.",
      included: [
        "Règles de base complètes",
        "Création de personnage rapide",
        "Système de résolution simple",
        "Création de monde collaborative",
        "Règles pour sessions courtes",
        "Exemples de scénarios"
      ],
      features: [
        "Un seul dé d6",
        "Une caractéristique unique (Lasers/Feelings)",
        "Création de personnage rapide",
        "Résolution simple avec créativité",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 77,
          name: "Honey Heist",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/honey-heist.jpg"
        },
        {
          id: 78,
          name: "The Witch is Dead",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/witch-is-dead.jpg"
        }
      ],
      image: "/images/lasers-rules.jpg",
      type: 'free'
    },
    10: {
      id: 10,
      name: "Dungeon World",
      publisher: "Sage Kobold",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Dungeon World propose un système fantasy narratif avec mécaniques PbtA. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de bonds, résolution de conflits, création de monde collaborative, et progression par expérience. Le système privilégie la narration et l'action.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de bonds",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de bonds entre personnages",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de monde collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 79,
          name: "Class Warfare",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/class-warfare.jpg"
        },
        {
          id: 80,
          name: "Perilous Wilds",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/perilous-wilds.jpg"
        }
      ],
      image: "/images/dungeon-world-rules.jpg",
      type: 'free'
    },
    11: {
      id: 11,
      name: "Fiasco",
      publisher: "Bully Pulpit Games",
      price: 0,
      tags: ["Comédie & Parodique", "Libres", "Débutant"],
      description: "Fiasco propose un système narratif pour histoires de comédie noire. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de relations, résolution de conflits, création de scénarios, et sessions courtes. Le système privilégie la narration et la comédie.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de relations",
        "Règles de résolution de conflits",
        "Création de scénarios",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de relations entre personnages",
        "Résolution de conflits avec conséquences",
        "Création de scénarios",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 81,
          name: "Fiasco Companion",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/fiasco-companion.jpg"
        },
        {
          id: 82,
          name: "Fiasco Playsets",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/fiasco-playsets.jpg"
        }
      ],
      image: "/images/fiasco-rules.jpg",
      type: 'free'
    },
    12: {
      id: 12,
      name: "Monsterhearts",
      publisher: "Avery Alder",
      price: 25,
      tags: ["Horreur & Mystère", "Libres", "Débutant"],
      description: "Monsterhearts propose un système de monstres adolescents avec drama. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de conditions, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie le drama et les relations.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 83,
          name: "Monsterhearts 2",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/monsterhearts-2.jpg"
        },
        {
          id: 84,
          name: "Monsterhearts: The Veil",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/monsterhearts-veil.jpg"
        }
      ],
      image: "/images/monsterhearts-rules.jpg",
      type: 'paid'
    },
    13: {
      id: 13,
      name: "Masks: A New Generation",
      publisher: "Brendan Conway",
      price: 30,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Masks propose un système de super-héros adolescents avec émotions. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système d'émotions, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie les émotions et l'identité.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système d'émotions",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système d'émotions (Colère, Peur, etc.)",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 85,
          name: "Masks: Unbound",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/masks-unbound.jpg"
        },
        {
          id: 86,
          name: "Masks: Halcyon City",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/masks-halcyon.jpg"
        }
      ],
      image: "/images/masks-rules.jpg",
      type: 'paid'
    },
    14: {
      id: 14,
      name: "The Sprawl",
      publisher: "Hamish Cameron",
      price: 40,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "The Sprawl propose un système cyberpunk narratif avec missions. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de missions, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie l'action et les missions.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de missions",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de missions et objectifs",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 87,
          name: "The Sprawl: Mission Files",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/sprawl-mission-files.jpg"
        },
        {
          id: 88,
          name: "The Sprawl: Corporate Intrigue",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/sprawl-corporate.jpg"
        }
      ],
      image: "/images/the-sprawl-rules.jpg",
      type: 'paid'
    },
    15: {
      id: 15,
      name: "Urban Shadows",
      publisher: "Andrew Medeiros",
      price: 35,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Urban Shadows propose un système d'horreur urbaine avec politique surnaturelle. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de corruption, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie la politique et la corruption.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de corruption",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de corruption et politique",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 89,
          name: "Urban Shadows: Dark Streets",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/urban-shadows-dark.jpg"
        },
        {
          id: 90,
          name: "Urban Shadows: Blood & Smoke",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/urban-shadows-blood.jpg"
        }
      ],
      image: "/images/urban-shadows-rules.jpg",
      type: 'paid'
    },
    16: {
      id: 16,
      name: "Fellowship",
      publisher: "Jacob Randolph",
      price: 30,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Fellowship propose un système fantasy épique avec héros contre l'empire. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de bonds, résolution de conflits, création de monde collaborative, et progression par expérience. Le système privilégie l'épique et la camaraderie.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de bonds",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de bonds entre personnages",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de monde collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 91,
          name: "Fellowship: In Rebellion",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/fellowship-rebellion.jpg"
        },
        {
          id: 92,
          name: "Fellowship: The Empire",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/fellowship-empire.jpg"
        }
      ],
      image: "/images/fellowship-rules.jpg",
      type: 'paid'
    },
    17: {
      id: 17,
      name: "The Veil",
      publisher: "Samjoko Publishing",
      price: 25,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "The Veil propose un système cyberpunk transhumaniste avec IA. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système d'émotions, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie la technologie et l'humanité.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système d'émotions",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système d'émotions (Colère, Peur, etc.)",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 93,
          name: "The Veil: Cascade",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/veil-cascade.jpg"
        },
        {
          id: 94,
          name: "The Veil: The Signal",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/veil-signal.jpg"
        }
      ],
      image: "/images/the-veil-rules.jpg",
      type: 'paid'
    },
    18: {
      id: 18,
      name: "Bluebeard's Bride",
      publisher: "Marissa Kelly",
      price: 45,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Bluebeard's Bride propose un système d'horreur gothique avec psychologie. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de folie, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie l'horreur psychologique.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de folie",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de folie et psychologie",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 95,
          name: "Bluebeard's Bride: The Book of Rooms",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/bluebeard-rooms.jpg"
        },
        {
          id: 96,
          name: "Bluebeard's Bride: The Book of Mirrors",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/bluebeard-mirrors.jpg"
        }
      ],
      image: "/images/bluebeards-bride-rules.jpg",
      type: 'paid'
    },
    19: {
      id: 19,
      name: "Dream Askew",
      publisher: "Avery Alder",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Dream Askew propose un système post-apocalyptique queer sans MJ. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la collaboration et l'identité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 97,
          name: "Dream Askew: The Queer Apocalypse",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/dream-askew-queer.jpg"
        },
        {
          id: 98,
          name: "Dream Askew: The Book of Mirrors",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/dream-askew-mirrors.jpg"
        }
      ],
      image: "/images/dream-askew-rules.jpg",
      type: 'free'
    },
    20: {
      id: 20,
      name: "Wanderhome",
      publisher: "Jay Dragon",
      price: 35,
      tags: ["Fantasy", "Liées", "Débutant"],
      description: "Wanderhome propose un système fantasy pastoral sans violence. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la paix et la nature.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 99,
          name: "Wanderhome: The Book of Seasons",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/wanderhome-seasons.jpg"
        },
        {
          id: 100,
          name: "Wanderhome: The Book of Mirrors",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/wanderhome-mirrors.jpg"
        }
      ],
      image: "/images/wanderhome-rules.jpg",
      type: 'paid'
    },
    21: {
      id: 21,
      name: "D&D Modern",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "D&D Modern adapte le système D&D 5e pour l'époque moderne. Le système utilise les mêmes mécaniques de base (d20, classes, sorts) mais adaptées aux technologies et armes modernes. Les mécaniques incluent : classes modernes, armes à feu, véhicules, technologie, et sorts adaptés au monde contemporain.",
      included: [
        "Règles de base D&D 5e",
        "Classes modernes",
        "Système d'armes à feu",
        "Règles de véhicules",
        "Technologie moderne",
        "Sorts adaptés"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Classes modernes (Soldat, Expert, etc.)",
        "Système d'armes à feu et explosifs",
        "Règles de véhicules et chases",
        "Technologie et cybernétique",
        "Sorts adaptés au monde moderne"
      ],
      extensions: [
        {
          id: 101,
          name: "Modern Player's Guide",
          price: 39.99,
          type: "Achats facultatifs",
          image: "/images/modern-players-guide.jpg"
        },
        {
          id: 102,
          name: "Urban Arcana",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/urban-arcana.jpg"
        }
      ],
      image: "/images/dnd-modern-rules.jpg",
      type: 'freemium'
    },
    22: {
      id: 22,
      name: "L'Univers Héroïque",
      publisher: "Free League",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "L'Univers Héroïque propose un système fantasy épique avec héros légendaires. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de légende, résolution de conflits, création de monde collaborative, et progression par expérience. Le système privilégie l'épique et la légende.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de légende",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Système de progression"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Classes avec moves uniques",
        "Système de légende et réputation",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de monde collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 103,
          name: "L'Univers Héroïque: Légendes",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/heroic-universe-legends.jpg"
        },
        {
          id: 104,
          name: "L'Univers Héroïque: Monstres",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/heroic-universe-monsters.jpg"
        }
      ],
      image: "/images/heroic-universe-rules.jpg",
      type: 'free'
    },
    23: {
      id: 23,
      name: "Numenera",
      publisher: "Monte Cook Games",
      price: 45,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Numenera propose un système science-fiction avec technologie mystérieuse. Le système utilise un d20 avec des modificateurs de caractéristiques. Les mécaniques incluent : classes avec types, système de cyphers, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie l'exploration et la découverte.",
      included: [
        "Règles de base complètes",
        "Classes avec types",
        "Système de cyphers",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "D20 + modificateurs de caractéristiques",
        "Classes avec types (Glaive, Nano, Jack)",
        "Système de cyphers et artefacts",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 105,
          name: "Numenera: Discovery",
          price: 34.99,
          type: "Achats facultatifs",
          image: "/images/numenera-discovery.jpg"
        },
        {
          id: 106,
          name: "Numenera: Destiny",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/numenera-destiny.jpg"
        }
      ],
      image: "/images/numenera-rules.jpg",
      type: 'paid'
    },
    24: {
      id: 24,
      name: "Thirsty Sword Lesbians",
      publisher: "April Kit Walsh",
      price: 30,
      tags: ["Fantasy", "Liées", "Débutant"],
      description: "Thirsty Sword Lesbians propose un système fantasy queer avec romance et aventure. Le système utilise 2d6 + modificateur avec des résultats partiels. Les mécaniques incluent : classes avec moves, système de romance, résolution de conflits, création de personnage collaborative, et progression par expérience. Le système privilégie la romance et l'identité.",
      included: [
        "Règles de base complètes",
        "Classes avec moves uniques",
        "Système de romance",
        "Règles de résolution de conflits",
        "Création de personnage collaborative",
        "Système de progression"
      ],
      features: [
        "2d6 + modificateur",
        "Classes avec moves uniques",
        "Système de romance et relations",
        "Résolution de conflits (Violence, Manipulation, etc.)",
        "Création de personnage collaborative",
        "Progression par expérience et choix"
      ],
      extensions: [
        {
          id: 107,
          name: "Thirsty Sword Lesbians: Romance",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/thirsty-sword-romance.jpg"
        },
        {
          id: 108,
          name: "Thirsty Sword Lesbians: Adventure",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/thirsty-sword-adventure.jpg"
        }
      ],
      image: "/images/thirsty-sword-rules.jpg",
      type: 'paid'
    },
    25: {
      id: 25,
      name: "Neverland",
      publisher: "Scott Malthouse",
      price: 38,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Neverland propose un système narratif pour histoires d'aventure. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'aventure et la créativité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 109,
          name: "Neverland: Adventure",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/neverland-adventure.jpg"
        },
        {
          id: 110,
          name: "Neverland: Magic",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/neverland-magic.jpg"
        }
      ],
      image: "/images/neverland-rules.jpg",
      type: 'paid'
    },
    26: {
      id: 26,
      name: "Pax Ethica",
      publisher: "Scott Malthouse",
      price: 24,
      tags: ["Science-fiction", "Liées", "Expert"],
      description: "Pax Ethica propose un système science-fiction éthique et philosophique. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'éthique et la philosophie.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 111,
          name: "Pax Ethica: Philosophy",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/pax-ethica-philosophy.jpg"
        },
        {
          id: 112,
          name: "Pax Ethica: Ethics",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/pax-ethica-ethics.jpg"
        }
      ],
      image: "/images/pax-ethica-rules.jpg",
      type: 'paid'
    },
    27: {
      id: 27,
      name: "Lady Blackbird",
      publisher: "John Harper",
      price: 0,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Lady Blackbird propose un système narratif pour aventures spatiales. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'aventure et la créativité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 113,
          name: "Lady Blackbird: Adventure",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/lady-blackbird-adventure.jpg"
        },
        {
          id: 114,
          name: "Lady Blackbird: Space",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/lady-blackbird-space.jpg"
        }
      ],
      image: "/images/lady-blackbird-rules.jpg",
      type: 'free'
    },
    28: {
      id: 28,
      name: "Aria",
      publisher: "Last Unicorn / Elder Craft",
      price: 60,
      tags: ["Autres", "Liées", "Expert"],
      description: "Aria propose un système générique complexe pour tous genres. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la complexité et la flexibilité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 115,
          name: "Aria: Complexity",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/aria-complexity.jpg"
        },
        {
          id: 116,
          name: "Aria: Flexibility",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/aria-flexibility.jpg"
        }
      ],
      image: "/images/aria-rules.jpg",
      type: 'paid'
    },
    29: {
      id: 29,
      name: "Microscope",
      publisher: "Ben Robbins",
      price: 0,
      tags: ["Autres", "Libres", "Intermédiaire"],
      description: "Microscope propose un système de création d'histoire collaborative. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la collaboration et la créativité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 117,
          name: "Microscope: Collaboration",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/microscope-collaboration.jpg"
        },
        {
          id: 118,
          name: "Microscope: Creativity",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/microscope-creativity.jpg"
        }
      ],
      image: "/images/microscope-rules.jpg",
      type: 'free'
    },
    30: {
      id: 30,
      name: "Forbidden Lands",
      publisher: "Tomas Härenstam",
      price: 42,
      tags: ["Fantasy", "Liées", "Intermédiaire"],
      description: "Forbidden Lands propose un système d'exploration et survie fantasy. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'exploration et la survie.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 119,
          name: "Forbidden Lands: Exploration",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/forbidden-lands-exploration.jpg"
        },
        {
          id: 120,
          name: "Forbidden Lands: Survival",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/forbidden-lands-survival.jpg"
        }
      ],
      image: "/images/forbidden-lands-rules.jpg",
      type: 'paid'
    },
    31: {
      id: 31,
      name: "Horror in Arkham",
      publisher: "Chaosium",
      price: 35,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Horror in Arkham propose un système d'horreur cosmique dans Arkham. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'horreur et la tension.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 121,
          name: "Horror in Arkham: Tension",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/horror-arkham-tension.jpg"
        },
        {
          id: 122,
          name: "Horror in Arkham: Mystery",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/horror-arkham-mystery.jpg"
        }
      ],
      image: "/images/horror-arkham-rules.jpg",
      type: 'paid'
    },
    32: {
      id: 32,
      name: "Warhammer Fantasy Roleplay",
      publisher: "Cubicle 7",
      price: 45,
      tags: ["Fantasy", "Liées", "Expert"],
      description: "Warhammer Fantasy Roleplay propose un système fantasy sombre et brutal. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la brutalité et la survie.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 123,
          name: "Warhammer Fantasy: Brutality",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/warhammer-fantasy-brutality.jpg"
        },
        {
          id: 124,
          name: "Warhammer Fantasy: Survival",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/warhammer-fantasy-survival.jpg"
        }
      ],
      image: "/images/warhammer-fantasy-rules.jpg",
      type: 'paid'
    },
    33: {
      id: 33,
      name: "Shadowrun",
      publisher: "Catalyst Game Labs",
      price: 50,
      tags: ["Science-fiction", "Liées", "Expert"],
      description: "Shadowrun propose un système cyberpunk avec magie et technologie. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la technologie et la magie.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 125,
          name: "Shadowrun: Technology",
          price: 29.99,
          type: "Achats facultatifs",
          image: "/images/shadowrun-technology.jpg"
        },
        {
          id: 126,
          name: "Shadowrun: Magic",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/shadowrun-magic.jpg"
        }
      ],
      image: "/images/shadowrun-rules.jpg",
      type: 'paid'
    },
    34: {
      id: 34,
      name: "World of Darkness",
      publisher: "White Wolf",
      price: 35,
      tags: ["Horreur & Mystère", "Liées", "Intermédiaire"],
      description: "World of Darkness propose un système d'horreur urbaine moderne. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'horreur et la modernité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 127,
          name: "World of Darkness: Horror",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/world-of-darkness-horror.jpg"
        },
        {
          id: 128,
          name: "World of Darkness: Modernity",
          price: 14.99,
          type: "Achats facultatifs",
          image: "/images/world-of-darkness-modernity.jpg"
        }
      ],
      image: "/images/world-of-darkness-rules.jpg",
      type: 'paid'
    },
    35: {
      id: 35,
      name: "GURPS",
      publisher: "Steve Jackson Games",
      price: 40,
      tags: ["Autres", "Liées", "Expert"],
      description: "GURPS propose un système générique universel pour tous genres. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la flexibilité et la complexité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 129,
          name: "GURPS: Flexibility",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/gurps-flexibility.jpg"
        },
        {
          id: 130,
          name: "GURPS: Complexity",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/gurps-complexity.jpg"
        }
      ],
      image: "/images/gurps-rules.jpg",
      type: 'paid'
    },
    36: {
      id: 36,
      name: "Honey Heist",
      publisher: "Grant Howitt",
      price: 0,
      tags: ["Comédie & Parodique", "Libres", "Débutant"],
      description: "Honey Heist propose un système narratif court pour comédie. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la comédie et la simplicité.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 131,
          name: "Honey Heist: Comedy",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/honey-heist-comedy.jpg"
        },
        {
          id: 132,
          name: "Honey Heist: Simplicity",
          price: 2.99,
          type: "Achats facultatifs",
          image: "/images/honey-heist-simplicity.jpg"
        }
      ],
      image: "/images/honey-heist-rules.jpg",
      type: 'free'
    },
    37: {
      id: 37,
      name: "The Quiet Year",
      publisher: "Avery Alder",
      price: 0,
      tags: ["Autres", "Libres", "Intermédiaire"],
      description: "The Quiet Year propose un système de construction de communauté. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la construction et la collaboration.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 133,
          name: "The Quiet Year: Construction",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/quiet-year-construction.jpg"
        },
        {
          id: 134,
          name: "The Quiet Year: Collaboration",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/quiet-year-collaboration.jpg"
        }
      ],
      image: "/images/quiet-year-rules.jpg",
      type: 'free'
    },
    38: {
      id: 38,
      name: "Dread",
      publisher: "Rafael Chandler",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Débutant"],
      description: "Dread propose un système d'horreur avec mécanique Jenga. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie l'horreur et la tension.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 135,
          name: "Dread: Horror",
          price: 9.99,
          type: "Achats facultatifs",
          image: "/images/dread-horror.jpg"
        },
        {
          id: 136,
          name: "Dread: Tension",
          price: 4.99,
          type: "Achats facultatifs",
          image: "/images/dread-tension.jpg"
        }
      ],
      image: "/images/dread-rules.jpg",
      type: 'free'
    },
    39: {
      id: 39,
      name: "Mutant: Year Zero",
      publisher: "Free League Publishing",
      price: 45,
      tags: ["Science-fiction", "Liées", "Intermédiaire"],
      description: "Mutant: Year Zero propose un système post-apocalyptique avec mutations. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la survie et les mutations.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 137,
          name: "Mutant: Year Zero: Survival",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/mutant-year-zero-survival.jpg"
        },
        {
          id: 138,
          name: "Mutant: Year Zero: Mutations",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/mutant-year-zero-mutations.jpg"
        }
      ],
      image: "/images/mutant-year-zero-rules.jpg",
      type: 'paid'
    },
    40: {
      id: 40,
      name: "Symbaroum",
      publisher: "Free League Publishing",
      price: 45,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Symbaroum propose un système dark fantasy avec corruption. Le système utilise des dés d6 avec des résultats partiels. Les mécaniques incluent : création de personnage collaborative, système de conditions, résolution de conflits, création de monde collaborative, et sessions courtes. Le système privilégie la corruption et la dark fantasy.",
      included: [
        "Règles de base complètes",
        "Création de personnage collaborative",
        "Système de conditions",
        "Règles de résolution de conflits",
        "Création de monde collaborative",
        "Sessions courtes"
      ],
      features: [
        "Dés d6 avec résultats partiels",
        "Création de personnage collaborative",
        "Système de conditions (En colère, Blessé, etc.)",
        "Résolution de conflits avec conséquences",
        "Création de monde collaborative",
        "Sessions courtes et flexibles"
      ],
      extensions: [
        {
          id: 139,
          name: "Symbaroum: Corruption",
          price: 24.99,
          type: "Achats facultatifs",
          image: "/images/symbaroum-corruption.jpg"
        },
        {
          id: 140,
          name: "Symbaroum: Dark Fantasy",
          price: 19.99,
          type: "Achats facultatifs",
          image: "/images/symbaroum-dark-fantasy.jpg"
        }
      ],
      image: "/images/symbaroum-rules.jpg",
      type: 'paid'
    }
  };

  useEffect(() => {
    const data = rulesData[id];
    if (data) {
      setRules(data);
    }
  }, [id]);

  const handleExtensionClick = (extension) => {
    // Toggle de la sélection de l'extension
    handleExtensionToggle(extension.id);
  };

  const handleExtensionToggle = (extensionId) => {
    setSelectedExtensions(prev => 
      prev.includes(extensionId) 
        ? prev.filter(id => id !== extensionId) 
        : [...prev, extensionId]
    );
  };

  const calculateTotal = () => {
    if (!rules) return 0;
    // Pour les éléments possédés, le prix de base est 0
    const basePrice = rules.type === 'owned' ? 0 : (rules.price || 0);
    const extensionsPrice = selectedExtensions.reduce((total, extId) => {
      const extension = rules.extensions.find(ext => ext.id === extId);
      return total + (extension ? extension.price : 0);
    }, 0);
    return Math.round((basePrice + extensionsPrice) * 100) / 100; // ✅ Arrondi à 2 décimales
  };

  const handleUseRules = () => {
    // Stocker les règles sélectionnées et retourner à la création de campagne
    const selectedData = {
      id: rules.id,
      name: rules.name,
      publisher: rules.publisher,
      price: rules.price,
      type: rules.type,
      image: rules.image,
      description: rules.description,
      totalPrice: total,
      extensions: selectedExtensions.map(extId => 
        rules.extensions.find(ext => ext.id === extId)
      ).filter(Boolean)
    };
    sessionStorage.setItem('selectedRules', JSON.stringify(selectedData));
    navigate('/campaigns/create');
  };

  if (!rules) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  // Recalculer le total à chaque rendu pour assurer la mise à jour dynamique
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header unifié */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigate('/campaigns/create/rules')}
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
          <button onClick={() => navigate('/campaigns/create/rules')} className="hover:text-light transition-colors">
            Choix des règles
          </button>
          <span>›</span>
          <span className="text-light">Détails</span>
        </nav>
      </div>

      {/* Layout principal selon wireframe */}
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-12">
        
        {/* Titre et éditeur au-dessus de l'image */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-light mb-2 eagle-lake-font">
            {rules.name}
          </h2>
          <p className="text-light/80 text-lg">{rules.publisher}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne gauche - Image */}
          <div>
            <div className="aspect-[3/4] bg-light/10 rounded-lg flex items-center justify-center border border-light/20 p-4">
              <div className="border border-white w-full h-full bg-cover bg-center rounded" 
                   style={{ backgroundImage: `url(${rules.image})` }}>
              </div>
            </div>
          </div>

          {/* Colonne droite - Contenu */}
          <div className="flex flex-col justify-start">
            {/* Section Présentation avec tags */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-2xl font-bold text-light eagle-lake-font">Présentation</h3>
                <div className="flex flex-wrap gap-2">
                  {rules.tags.map((tag, index) => (
                    <span key={index} className="bg-golden text-dark px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-light/90 leading-relaxed text-sm">{rules.description}</p>
            </div>

        {/* Section Règles incluses */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Règles incluses</h4>
              <ul className="space-y-2">
                {rules.included.map((item, index) => (
                  <li key={index} className="text-light/80 flex items-start text-sm">
                    <span className="text-golden mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Mécaniques du système */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Mécaniques du système</h4>
              <ul className="space-y-2">
                {rules.features.map((feature, index) => (
                  <li key={index} className="text-light/80 flex items-start text-sm">
                    <span className="text-golden mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Suppléments facultatifs */}
            {rules.extensions && rules.extensions.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Achats facultatifs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rules.extensions.map(extension => {
                    const isSelected = selectedExtensions.includes(extension.id);
                    return (
                      <div key={extension.id} onClick={() => handleExtensionClick(extension)} className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 relative ${isSelected ? 'ring-2 ring-golden bg-golden/10' : 'hover:ring-1 hover:ring-light/30'}`} style={{ backgroundColor: isSelected ? 'rgba(233, 189, 114, 0.1)' : 'rgba(13, 21, 26, 0.7)' }}>
                        {/* Indicateur de sélection */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className="w-6 h-6 bg-golden rounded-full flex items-center justify-center">
                              <span className="text-dark text-xs font-bold">✓</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="aspect-[4/3] bg-light/20 flex items-center justify-center p-3">
                          <div className="border border-white w-full h-full bg-cover bg-center rounded" 
                               style={{ backgroundImage: `url(${extension.image})` }}>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h5 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-golden' : 'text-light'}`}>{extension.name}</h5>
                              <p className="text-light/70 text-xs">Achats facultatifs</p>
                            </div>
                            <div className="ml-4 pl-4 border-l-2 border-white/30">
                              <p className={`font-bold text-lg ${isSelected ? 'text-golden' : 'text-light'}`}>{Math.round(extension.price * 100) / 100} €</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Prix et bouton */}
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-light">
                {rules.type === 'owned' ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Déjà possédé"
                 ) :
                 rules.type === 'freemium' ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Gratuit avec achats facultatifs"
                 ) : 
                 rules.price === 0 ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Gratuit"
                 ) : (
                   selectedExtensions.length > 0 ? `${total} €` : `${Math.round(rules.price * 100) / 100} €`
                 )}
                {selectedExtensions.length > 0 && (
                  <div className="text-lg text-light/70 mt-1">
                    {rules.type === 'owned' ? 
                      `${total}€ achats` :
                      rules.type === 'freemium' ? 
                        `Gratuit + ${total}€ achats` : 
                        rules.price === 0 ? 
                          `${total}€ achats` : 
                          `${Math.round(rules.price * 100) / 100}€ base + ${Math.round((total - rules.price) * 100) / 100}€ achats`
                    }
                  </div>
                )}
              </div>
              <button
                onClick={handleUseRules}
                className="bg-golden text-dark px-6 py-3 rounded-lg font-bold text-lg hover:bg-golden/80 transition-colors"
              >
                Utiliser ces règles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesDetails;