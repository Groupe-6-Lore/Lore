import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Bell, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

const UniverseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [universe, setUniverse] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

  // Données Symbaroum selon wireframe
  const universeData = {
    1: {
      id: 1,
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
          type: "Supplément",
          image: "/images/symbaroum-apg.jpg"
        },
        {
          id: 2,
          name: "Monster Codex", 
          price: 22,
          type: "Bestiaire",
          image: "/images/symbaroum-monsters.jpg"
        }
      ],
      type: 'paid'
    },
    'symbaroum-core': {
      id: 'symbaroum-core',
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
          type: "Supplément",
          image: "/images/symbaroum-apg.jpg"
        },
        {
          id: 2,
          name: "Monster Codex", 
          price: 22,
          type: "Bestiaire",
          image: "/images/symbaroum-monsters.jpg"
        }
      ],
      type: 'owned'
    },
    'known-2': {
      id: 'known-2',
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
          type: "Supplément",
          image: "/images/symbaroum-apg.jpg"
        },
        {
          id: 2,
          name: "Monster Codex", 
          price: 22,
          type: "Bestiaire",
          image: "/images/symbaroum-monsters.jpg"
        }
      ],
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
          id: 3,
          name: "Fate Worlds",
          price: 7.50,
          type: "Suppléments univers",
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 4,
          name: "Venture City",
          price: 8.00,
          type: "Suppléments univers",
          image: "/images/venture-city.jpg"
        }
      ],
      type: 'free'
    },
    'fate-core': {
      id: 'fate-core',
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
          id: 3,
          name: "Fate Worlds",
          price: 7.50,
          type: "Suppléments univers",
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 4,
          name: "Venture City",
          price: 8.00,
          type: "Suppléments univers",
          image: "/images/venture-city.jpg"
        }
      ],
      type: 'owned'
    },
    'known-3': {
      id: 'known-3',
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
          id: 3,
          name: "Fate Worlds",
          price: 7.50,
          type: "Suppléments univers",
          image: "/images/fate-worlds.jpg"
        },
        {
          id: 4,
          name: "Venture City",
          price: 8.00,
          type: "Suppléments univers",
          image: "/images/venture-city.jpg"
        }
      ],
      type: 'free'
    },
    // D&D 5e
    1: {
      id: 1,
      name: "Dungeons & Dragons 5e",
      publisher: "Wizards of the Coast",
      price: 49.99,
      tags: ["Fantasy", "Libres", "Débutant"],
      image: "/images/dnd5e.jpg",
      description: "Dungeons & Dragons 5e est le système de jeu de rôle fantasy le plus populaire au monde. Avec ses règles accessibles et son univers riche, il permet aux joueurs de créer des héros épiques dans un monde de magie et d'aventure. Que vous soyez un guerrier courageux, un magicien puissant ou un voleur rusé, D&D 5e offre une expérience de jeu immersive et collaborative où chaque dé peut changer le cours de l'histoire.",
      included: [
        "Manuel des Joueurs",
        "Guide du Maître de Donjon",
        "Bestiaire Monstrueux"
      ],
      extensions: [
        {
          id: 5,
          name: "Tasha's Cauldron of Everything",
          price: 49.99,
          type: "Supplément",
          image: "/images/tashas-cauldron.jpg"
        },
        {
          id: 6,
          name: "Xanathar's Guide to Everything",
          price: 49.99,
          type: "Supplément",
          image: "/images/xanathars-guide.jpg"
        },
        {
          id: 7,
          name: "Volo's Guide to Monsters",
          price: 49.99,
          type: "Bestiaire",
          image: "/images/volos-guide.jpg"
        }
      ],
      type: 'paid'
    },
    // D&D Modern
    2: {
      id: 2,
      name: "Donjons & Dragons de l'Ère Moderne",
      publisher: "Wizards of the Coast",
      price: 45.99,
      tags: ["Fantasy", "Libres", "Débutant"],
      image: "/images/dnd-modern.jpg",
      description: "Donjons & Dragons de l'Ère Moderne transpose l'univers fantasy classique dans un cadre contemporain. Les héros évoluent dans un monde où la magie coexiste avec la technologie moderne, créant des aventures uniques mêlant épées et smartphones, sorts et réseaux sociaux. Un système innovant qui réinvente D&D pour une nouvelle génération d'aventuriers.",
      included: [
        "Livre de règles moderne",
        "Classes adaptées à l'ère moderne",
        "Équipements technologiques"
      ],
      extensions: [
        {
          id: 8,
          name: "Cyberpunk Expansion",
          price: 29.99,
          type: "Supplément",
          image: "/images/cyberpunk-expansion.jpg"
        },
        {
          id: 9,
          name: "Urban Fantasy Toolkit",
          price: 24.99,
          type: "Supplément",
          image: "/images/urban-fantasy.jpg"
        }
      ],
      type: 'paid'
    },
    // Univers Héroïque
    3: {
      id: 3,
      name: "L'Univers Héroïque 2e Edition",
      publisher: "Free League",
      price: null,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      image: "/images/heroic-universe.jpg",
      description: "L'Univers Héroïque 2e Edition est un système de jeu de rôle fantasy épique qui met l'accent sur l'héroïsme et l'aventure. Dans un monde où les héros sont destinés à accomplir de grandes choses, les joueurs incarnent des personnages exceptionnels capables de changer le cours de l'histoire. Un système qui récompense la bravoure et l'ingéniosité.",
      included: [
        "Livre principal",
        "Règles de création de personnage",
        "Guide du monde héroïque"
      ],
      extensions: [
        {
          id: 10,
          name: "Légendes Perdues",
          price: 19.99,
          type: "Campagne",
          image: "/images/legendes-perdues.jpg"
        },
        {
          id: 11,
          name: "Bestiaire Héroïque",
          price: 24.99,
          type: "Bestiaire",
          image: "/images/bestiaire-heroique.jpg"
        }
      ],
      type: 'free'
    },
    // Cthulhu
    4: {
      id: 4,
      name: "L'Appel de Cthulhu - 7e Edition",
      publisher: "Chaosium et Sans-Détour",
      price: null,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      image: "/images/cthulhu.jpg",
      description: "L'Appel de Cthulhu 7e Edition plonge les joueurs dans l'univers terrifiant de H.P. Lovecraft. Enquêteurs ordinaires confrontés à des horreurs cosmiques indicibles, ils doivent résoudre des mystères qui menacent la santé mentale et la survie de l'humanité. Un système qui privilégie l'atmosphère et la tension psychologique.",
      included: [
        "Livre de base",
        "Règles d'investigation",
        "Scénarios d'introduction"
      ],
      extensions: [
        {
          id: 12,
          name: "Masks of Nyarlathotep",
          price: 89.99,
          type: "Campagne",
          image: "/images/masks-nyarlathotep.jpg"
        },
        {
          id: 13,
          name: "Horror on the Orient Express",
          price: 79.99,
          type: "Campagne",
          image: "/images/horror-orient-express.jpg"
        }
      ],
      type: 'free'
    },
    // Pathfinder 2e
    6: {
      id: 6,
      name: "Pathfinder 2e",
      publisher: "Greg Stafford / Chaosium",
      price: 40,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Pathfinder 2e est l'évolution moderne du système de jeu de rôle fantasy le plus détaillé. Avec ses règles tactiques sophistiquées et sa profondeur de personnalisation, il offre une expérience de jeu riche et complexe. Les joueurs peuvent créer des personnages uniques grâce à un système de classes et d'archétypes flexible, tandis que les combats tactiques offrent des défis stratégiques captivants.",
      included: [
        "Livre de base",
        "Règles de combat tactique",
        "Système de classes avancé"
      ],
      extensions: [
        {
          id: 14,
          name: "Advanced Player's Guide",
          price: 49.99,
          type: "Supplément",
          image: "/images/pathfinder-apg.jpg"
        },
        {
          id: 15,
          name: "Bestiary",
          price: 39.99,
          type: "Bestiaire",
          image: "/images/pathfinder-bestiary.jpg"
        },
        {
          id: 16,
          name: "Gamemastery Guide",
          price: 44.99,
          type: "Guide MJ",
          image: "/images/pathfinder-gmg.jpg"
        }
      ],
      type: 'paid'
    },
    // Lasers & Feelings
    7: {
      id: 7,
      name: "Lasers & Feelings",
      publisher: "John Harper",
      price: null,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Lasers & Feelings est un jeu de rôle minimaliste et narratif qui capture l'essence des séries de science-fiction des années 60-80. Avec une seule stat et des règles ultra-simples, il se concentre sur l'histoire et l'improvisation. Parfait pour des sessions courtes et intenses, il permet de créer des aventures épiques dans l'espace en quelques minutes de préparation.",
      included: [
        "Règles complètes (1 page)",
        "Générateur d'aventures",
        "Conseils de jeu"
      ],
      extensions: [
        {
          id: 17,
          name: "Honey Heist",
          price: null,
          type: "Jeu dérivé",
          image: "/images/honey-heist.jpg"
        },
        {
          id: 18,
          name: "The Witch is Dead",
          price: null,
          type: "Jeu dérivé",
          image: "/images/witch-is-dead.jpg"
        }
      ],
      type: 'freemium'
    },
    // Dungeon World
    8: {
      id: 8,
      name: "Dungeon World",
      publisher: "Sage Kobold",
      price: null,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Dungeon World révolutionne le jeu de rôle fantasy en combinant la familiarité de D&D avec l'innovation narrative des jeux Powered by the Apocalypse. Les règles simples mais profondes encouragent la collaboration et l'improvisation, créant des histoires dynamiques où les échecs sont aussi intéressants que les succès. Un système qui met l'accent sur l'action et la narration fluide.",
      included: [
        "Règles de base",
        "Classes fantasy",
        "Guide du MJ"
      ],
      extensions: [
        {
          id: 19,
          name: "Class Warfare",
          price: 19.99,
          type: "Supplément",
          image: "/images/class-warfare.jpg"
        },
        {
          id: 20,
          name: "Perilous Wilds",
          price: 14.99,
          type: "Supplément",
          image: "/images/perilous-wilds.jpg"
        }
      ],
      type: 'free'
    },
    // Vampire: The Masquerade
    9: {
      id: 9,
      name: "Vampire: The Masquerade",
      publisher: "White Wolf",
      price: 55,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Vampire: The Masquerade 5e édition plonge les joueurs dans l'univers sombre et gothique des vampires modernes. En tant que créatures de la nuit, ils doivent naviguer entre leur humanité perdue et leur soif de sang, tout en respectant la Masquerade qui protège leur existence secrète. Un jeu de rôle mature qui explore les thèmes de la corruption, du pouvoir et de la survie.",
      included: [
        "5e édition",
        "Règles de la Masquerade",
        "Clans vampires"
      ],
      extensions: [
        {
          id: 21,
          name: "Camarilla",
          price: 39.99,
          type: "Supplément",
          image: "/images/camarilla.jpg"
        },
        {
          id: 22,
          name: "Anarch",
          price: 39.99,
          type: "Supplément",
          image: "/images/anarch.jpg"
        },
        {
          id: 23,
          name: "Chicago by Night",
          price: 49.99,
          type: "Campagne",
          image: "/images/chicago-by-night.jpg"
        }
      ],
      type: 'paid'
    },
    // Cyberpunk RED
    10: {
      id: 10,
      name: "Cyberpunk RED",
      publisher: "R. Talsorian Games",
      price: 60,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "Cyberpunk RED transporte les joueurs dans un futur dystopique où la technologie et la cybernétique ont transformé la société. Dans Night City, les joueurs incarnent des cyberpunks, des marginaux qui vivent en marge de la loi dans un monde dominé par les mégacorporations. Un système de combat brutal et des règles de cybernétique détaillées créent une expérience immersive dans l'univers de Cyberpunk 2077.",
      included: [
        "Livre de base",
        "Règles de cybernétique",
        "Guide de Night City"
      ],
      extensions: [
        {
          id: 24,
          name: "Black Chrome",
          price: 39.99,
          type: "Supplément",
          image: "/images/black-chrome.jpg"
        },
        {
          id: 25,
          name: "Danger Gal Dossier",
          price: 29.99,
          type: "Campagne",
          image: "/images/danger-gal.jpg"
        }
      ],
      type: 'paid'
    },
    // Fiasco
    11: {
      id: 11,
      name: "Fiasco",
      publisher: "Bully Pulpit Games",
      price: null,
      tags: ["Comédie & Parodique", "Libres", "Débutant"],
      description: "Fiasco est un jeu de rôle narratif qui simule des films de type Coen Brothers - des histoires où tout va mal de façon spectaculaire et comique. Sans MJ, les joueurs créent ensemble une histoire de désastre en utilisant des dés et des tables de résultats. Un jeu parfait pour des sessions courtes et hilarantes où l'échec est la source du divertissement.",
      included: [
        "Jeu de rôle narratif",
        "Tables de génération",
        "Scénarios prêts à jouer"
      ],
      extensions: [
        {
          id: 26,
          name: "Fiasco Companion",
          price: 19.99,
          type: "Supplément",
          image: "/images/fiasco-companion.jpg"
        },
        {
          id: 27,
          name: "Fiasco: The Diner",
          price: 14.99,
          type: "Scénario",
          image: "/images/fiasco-diner.jpg"
        }
      ],
      type: 'free'
    },
    // Blades in the Dark
    12: {
      id: 12,
      name: "Blades in the Dark",
      publisher: "John Harper",
      price: 50,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Blades in the Dark plonge les joueurs dans Doskvol, une ville sombre et industrielle hantée par des fantômes. Ils incarnent une bande de criminels qui tentent de faire fortune dans les bas-fonds de la ville. Avec son système de flashbacks et de stress, le jeu encourage la planification créative et les actions audacieuses dans un univers steampunk gothique unique.",
      included: [
        "Livre de base",
        "Règles de bande criminelle",
        "Guide de Doskvol"
      ],
      extensions: [
        {
          id: 28,
          name: "Scum & Villainy",
          price: 45.99,
          type: "Supplément",
          image: "/images/scum-villainy.jpg"
        },
        {
          id: 29,
          name: "Band of Blades",
          price: 39.99,
          type: "Supplément",
          image: "/images/band-of-blades.jpg"
        }
      ],
      type: 'paid'
    },
    // Call of Cthulhu
    13: {
      id: 13,
      name: "Call of Cthulhu",
      publisher: "Chaosium",
      price: null,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Call of Cthulhu 7e édition est le jeu de rôle d'horreur cosmique par excellence. Les joueurs incarnent des enquêteurs ordinaires confrontés à des horreurs indicibles qui menacent la réalité même. Avec son système de santé mentale et ses règles d'investigation, il crée une atmosphère de tension et de terreur dans l'univers de H.P. Lovecraft.",
      included: [
        "7e édition",
        "Règles d'investigation",
        "Scénarios d'horreur"
      ],
      extensions: [
        {
          id: 30,
          name: "Pulp Cthulhu",
          price: 49.99,
          type: "Supplément",
          image: "/images/pulp-cthulhu.jpg"
        },
        {
          id: 31,
          name: "Down Darker Trails",
          price: 39.99,
          type: "Supplément",
          image: "/images/down-darker-trails.jpg"
        }
      ],
      type: 'free'
    },
    // Univers déjà connus - D&D 5e
    'known-1': {
      id: 'known-1',
      name: "Dungeons & Dragons 5e",
      publisher: "Wizards of the Coast",
      price: 49.99,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Dungeons & Dragons 5e est le système de jeu de rôle fantasy le plus populaire au monde. Avec ses règles accessibles et son univers riche, il permet aux joueurs de créer des héros épiques dans un monde de magie et d'aventure. Que vous soyez un guerrier courageux, un magicien puissant ou un voleur rusé, D&D 5e offre une expérience de jeu immersive et collaborative où chaque dé peut changer le cours de l'histoire.",
      included: [
        "Manuel des Joueurs",
        "Guide du Maître de Donjon",
        "Bestiaire Monstrueux"
      ],
      extensions: [
        {
          id: 5,
          name: "Tasha's Cauldron of Everything",
          price: 49.99,
          type: "Supplément",
          image: "/images/tashas-cauldron.jpg"
        },
        {
          id: 6,
          name: "Xanathar's Guide to Everything",
          price: 49.99,
          type: "Supplément",
          image: "/images/xanathars-guide.jpg"
        }
      ],
      type: 'owned'
    },
    // Univers déjà connus - L'Appel de Cthulhu
    'known-4': {
      id: 'known-4',
      name: "L'Appel de Cthulhu - 7e Edition",
      publisher: "Chaosium et Sans-Détour",
      price: null,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "L'Appel de Cthulhu 7e Edition plonge les joueurs dans l'univers terrifiant de H.P. Lovecraft. Enquêteurs ordinaires confrontés à des horreurs cosmiques indicibles, ils doivent résoudre des mystères qui menacent la santé mentale et la survie de l'humanité. Un système qui privilégie l'atmosphère et la tension psychologique.",
      included: [
        "Livre de base",
        "Règles d'investigation",
        "Scénarios d'introduction"
      ],
      extensions: [
        {
          id: 12,
          name: "Masks of Nyarlathotep",
          price: 89.99,
          type: "Campagne",
          image: "/images/masks-nyarlathotep.jpg"
        },
        {
          id: 13,
          name: "Horror on the Orient Express",
          price: 79.99,
          type: "Campagne",
          image: "/images/horror-orient-express.jpg"
        }
      ],
      type: 'free'
    },
    // Numenera
    14: {
      id: 14,
      name: "Numenera",
      publisher: "Monte Cook Games",
      price: 45,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Numenera transporte les joueurs dans le Neuvième Monde, un futur lointain où la Terre a été transformée par huit civilisations précédentes. Les joueurs incarnent des explorateurs qui découvrent les mystères de technologies anciennes et incompréhensibles. Un système unique qui met l'accent sur la découverte et l'exploration dans un monde étrange et merveilleux.",
      included: [
        "Discovery & Destiny",
        "Règles de découverte",
        "Guide du Neuvième Monde"
      ],
      extensions: [
        {
          id: 32,
          name: "The Jade Colossus",
          price: 29.99,
          type: "Campagne",
          image: "/images/jade-colossus.jpg"
        },
        {
          id: 33,
          name: "Into the Deep",
          price: 24.99,
          type: "Supplément",
          image: "/images/into-the-deep.jpg"
        }
      ],
      type: 'paid'
    },
    // Apocalypse World
    15: {
      id: 15,
      name: "Apocalypse World",
      publisher: "D. Vincent Baker",
      price: 35,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Apocalypse World 2e édition est le jeu qui a révolutionné le design de jeux de rôle avec son système Powered by the Apocalypse. Dans un monde post-apocalyptique, les joueurs incarnent des survivants qui tentent de reconstruire la civilisation. Un système narratif qui encourage l'improvisation et la collaboration pour créer des histoires intenses et personnelles.",
      included: [
        "2e édition",
        "Règles PbtA",
        "Classes post-apocalyptiques"
      ],
      extensions: [
        {
          id: 34,
          name: "Burned Over",
          price: 19.99,
          type: "Supplément",
          image: "/images/burned-over.jpg"
        },
        {
          id: 35,
          name: "The Master of Ceremonies",
          price: 14.99,
          type: "Guide MJ",
          image: "/images/master-ceremonies.jpg"
        }
      ],
      type: 'paid'
    },
    // Monsterhearts
    16: {
      id: 16,
      name: "Monsterhearts",
      publisher: "Avery Alder",
      price: 25,
      tags: ["Horreur & Mystère", "Libres", "Débutant"],
      description: "Monsterhearts explore les drames adolescents à travers le prisme de l'horreur surnaturelle. Les joueurs incarnent des monstres adolescents qui naviguent entre leurs pulsions surnaturelles et leurs émotions humaines. Un jeu mature qui traite de l'identité, de la sexualité et de la transformation dans un cadre horrifique et émotionnel.",
      included: [
        "Jeu de monstres adolescents",
        "Classes monstrueuses",
        "Règles de drame"
      ],
      extensions: [
        {
          id: 36,
          name: "Monsterhearts 2",
          price: 29.99,
          type: "Édition",
          image: "/images/monsterhearts-2.jpg"
        },
        {
          id: 37,
          name: "The Shame",
          price: 9.99,
          type: "Supplément",
          image: "/images/the-shame.jpg"
        }
      ],
      type: 'paid'
    },
    // Masks: A New Generation
    17: {
      id: 17,
      name: "Masks: A New Generation",
      publisher: "Brendan Conway",
      price: 30,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Masks: A New Generation plonge les joueurs dans l'univers des super-héros adolescents. Ils incarnent de jeunes héros qui découvrent leurs pouvoirs tout en naviguant les défis de l'adolescence. Un système Powered by the Apocalypse qui explore l'identité, la responsabilité et la croissance personnelle dans un monde de super-héros.",
      included: [
        "Super-héros adolescents",
        "Règles d'identité",
        "Classes de héros"
      ],
      extensions: [
        {
          id: 38,
          name: "Unbound",
          price: 24.99,
          type: "Supplément",
          image: "/images/unbound.jpg"
        },
        {
          id: 39,
          name: "The Unfixed",
          price: 19.99,
          type: "Supplément",
          image: "/images/the-unfixed.jpg"
        }
      ],
      type: 'paid'
    },
    // The Sprawl
    18: {
      id: 18,
      name: "The Sprawl",
      publisher: "Hamish Cameron",
      price: 40,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "The Sprawl est un jeu de rôle cyberpunk Powered by the Apocalypse qui capture l'essence des œuvres de William Gibson et Philip K. Dick. Les joueurs incarnent des cyberpunks qui naviguent dans un monde dystopique dominé par les mégacorporations. Un système qui met l'accent sur l'espionnage, la technologie et la survie dans un futur sombre.",
      included: [
        "Cyberpunk narratif",
        "Règles de cybernétique",
        "Classes de cyberpunks"
      ],
      extensions: [
        {
          id: 40,
          name: "The Sprawl: Mission Files",
          price: 19.99,
          type: "Supplément",
          image: "/images/mission-files.jpg"
        },
        {
          id: 41,
          name: "The Sprawl: Corporate Wars",
          price: 24.99,
          type: "Campagne",
          image: "/images/corporate-wars.jpg"
        }
      ],
      type: 'paid'
    },
    // Urban Shadows
    19: {
      id: 19,
      name: "Urban Shadows",
      publisher: "Andrew Medeiros",
      price: 35,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Urban Shadows plonge les joueurs dans l'horreur urbaine moderne où les créatures surnaturelles vivent cachées parmi nous. Vampires, loups-garous, fées et autres êtres mythiques naviguent dans les rues de la ville, chacun avec ses propres codes et alliances. Un système Powered by the Apocalypse qui explore la politique surnaturelle et les conflits urbains.",
      included: [
        "Horreur urbaine",
        "Classes surnaturelles",
        "Règles de corruption"
      ],
      extensions: [
        {
          id: 42,
          name: "Urban Shadows: Dark Streets",
          price: 19.99,
          type: "Supplément",
          image: "/images/dark-streets.jpg"
        },
        {
          id: 43,
          name: "Urban Shadows: Blood & Smoke",
          price: 24.99,
          type: "Supplément",
          image: "/images/blood-smoke.jpg"
        }
      ],
      type: 'paid'
    },
    // Fellowship
    20: {
      id: 20,
      name: "Fellowship",
      publisher: "Jacob Randolph",
      price: 30,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Fellowship est un jeu de rôle fantasy épique Powered by the Apocalypse qui met l'accent sur l'héroïsme et l'aventure. Les joueurs incarnent des héros qui s'unissent pour combattre un Overlord maléfique et sauver le monde. Un système qui encourage la collaboration et l'improvisation pour créer des histoires épiques de fantasy.",
      included: [
        "Fantasy épique",
        "Classes de héros",
        "Règles d'Overlord"
      ],
      extensions: [
        {
          id: 44,
          name: "Fellowship: In Rebellion",
          price: 19.99,
          type: "Supplément",
          image: "/images/in-rebellion.jpg"
        },
        {
          id: 45,
          name: "Fellowship: The Empire",
          price: 24.99,
          type: "Supplément",
          image: "/images/the-empire.jpg"
        }
      ],
      type: 'paid'
    },
    // The Veil
    21: {
      id: 21,
      name: "The Veil",
      publisher: "Samjoko Publishing",
      price: 25,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "The Veil explore le cyberpunk transhumaniste dans un monde où la technologie a fusionné avec l'humanité. Les joueurs incarnent des personnages qui naviguent entre réalité et virtuel, explorant les questions de l'identité, de la conscience et de l'humanité dans un futur dystopique. Un système Powered by the Apocalypse qui traite de thèmes philosophiques profonds.",
      included: [
        "Cyberpunk transhumaniste",
        "Règles de réalité virtuelle",
        "Classes transhumanes"
      ],
      extensions: [
        {
          id: 46,
          name: "The Veil: Cascade",
          price: 19.99,
          type: "Supplément",
          image: "/images/cascade.jpg"
        },
        {
          id: 47,
          name: "The Veil: Psionics",
          price: 14.99,
          type: "Supplément",
          image: "/images/psionics.jpg"
        }
      ],
      type: 'paid'
    },
    // Bluebeard's Bride
    22: {
      id: 22,
      name: "Bluebeard's Bride",
      publisher: "Marissa Kelly",
      price: 45,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Bluebeard's Bride est un jeu d'horreur gothique qui explore les thèmes de la violence domestique et de la peur féminine. Basé sur le conte de fées de Barbe Bleue, les joueurs incarnent différents aspects de la mariée qui explore le château interdit de son mari. Un jeu mature et intense qui traite de thèmes difficiles dans un cadre horrifique.",
      included: [
        "Horreur gothique",
        "Règles de peur",
        "Scénarios de château"
      ],
      extensions: [
        {
          id: 48,
          name: "Bluebeard's Bride: The Book of Rooms",
          price: 29.99,
          type: "Supplément",
          image: "/images/book-of-rooms.jpg"
        },
        {
          id: 49,
          name: "Bluebeard's Bride: The Book of Mirrors",
          price: 24.99,
          type: "Supplément",
          image: "/images/book-of-mirrors.jpg"
        }
      ],
      type: 'paid'
    },
    // Dream Askew
    23: {
      id: 23,
      name: "Dream Askew",
      publisher: "Avery Alder",
      price: null,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Dream Askew est un jeu post-apocalyptique queer qui explore la survie et la communauté dans un monde en ruine. Les joueurs incarnent des survivants qui tentent de reconstruire leur vie dans un paysage dévasté. Un système Belonging Outside Belonging qui encourage la narration collaborative et l'exploration de thèmes queer et post-apocalyptiques.",
      included: [
        "Post-apocalyptique queer",
        "Règles de communauté",
        "Classes de survivants"
      ],
      extensions: [
        {
          id: 50,
          name: "Dream Askew: The Book of Dreams",
          price: 19.99,
          type: "Supplément",
          image: "/images/book-of-dreams.jpg"
        },
        {
          id: 51,
          name: "Dream Askew: The Book of Ruins",
          price: 14.99,
          type: "Supplément",
          image: "/images/book-of-ruins.jpg"
        }
      ],
      type: 'free'
    },
    // Wanderhome
    24: {
      id: 24,
      name: "Wanderhome",
      publisher: "Jay Dragon",
      price: 35,
      tags: ["Fantasy", "Liées", "Débutant"],
      description: "Wanderhome est un jeu de rôle pastoral fantasy qui explore la beauté et la mélancolie du voyage. Les joueurs incarnent des vagabonds qui parcourent un monde magique, découvrant des lieux merveilleux et aidant ceux qu'ils rencontrent. Un système Belonging Outside Belonging qui privilégie la narration collaborative et l'exploration émotionnelle.",
      included: [
        "Fantasy pastoral",
        "Règles de voyage",
        "Classes de vagabonds"
      ],
      extensions: [
        {
          id: 52,
          name: "Wanderhome: The Book of Seasons",
          price: 19.99,
          type: "Supplément",
          image: "/images/book-of-seasons.jpg"
        }
      ],
      type: 'paid'
    },
    // Thirsty Sword Lesbians
    25: {
      id: 25,
      name: "Thirsty Sword Lesbians",
      publisher: "April Kit Walsh",
      price: 30,
      tags: ["Fantasy", "Liées", "Débutant"],
      description: "Thirsty Sword Lesbians est un jeu de rôle fantasy queer qui célèbre l'amour, l'aventure et l'identité LGBTQ+. Les joueurs incarnent des personnages queer dans un monde fantasy où ils peuvent être eux-mêmes tout en vivant des aventures épiques. Un système Powered by the Apocalypse qui explore les relations, l'identité et l'acceptation de soi.",
      included: [
        "Fantasy queer",
        "Règles de relations",
        "Classes queer"
      ],
      extensions: [
        {
          id: 53,
          name: "Thirsty Sword Lesbians: The Book of Hearts",
          price: 24.99,
          type: "Supplément",
          image: "/images/book-of-hearts.jpg"
        }
      ],
      type: 'paid'
    },
    // Neverland
    26: {
      id: 26,
      name: "Neverland",
      publisher: "Scott Malthouse",
      price: 38,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Neverland transporte les joueurs dans l'univers magique de Peter Pan, mais avec une approche plus sombre et mature. Les joueurs incarnent des enfants perdus qui naviguent entre l'innocence et la cruauté de Neverland. Un jeu qui explore les thèmes de l'enfance, de la croissance et de la perte de l'innocence dans un cadre fantastique.",
      included: [
        "Jeux narratifs",
        "Règles de Neverland",
        "Classes d'enfants perdus"
      ],
      extensions: [
        {
          id: 54,
          name: "Neverland: The Book of Shadows",
          price: 19.99,
          type: "Supplément",
          image: "/images/book-of-shadows.jpg"
        }
      ],
      type: 'paid'
    },
    // Pax Ethica
    27: {
      id: 27,
      name: "Pax Ethica",
      publisher: "Scott Malthouse",
      price: 24,
      tags: ["Science-fiction", "Liées", "Expert"],
      description: "Pax Ethica explore la science-fiction éthique dans un futur où l'humanité a colonisé l'espace. Les joueurs incarnent des diplomates, des scientifiques et des explorateurs qui doivent prendre des décisions morales difficiles dans un univers complexe. Un jeu qui traite de l'éthique, de la politique et de la responsabilité dans un cadre science-fiction.",
      included: [
        "Science-fiction",
        "Règles d'éthique",
        "Classes de diplomates"
      ],
      extensions: [
        {
          id: 55,
          name: "Pax Ethica: The Book of Conflicts",
          price: 14.99,
          type: "Supplément",
          image: "/images/book-of-conflicts.jpg"
        }
      ],
      type: 'paid'
    },
    // Lady Blackbird
    28: {
      id: 28,
      name: "Lady Blackbird",
      publisher: "John Harper",
      price: null,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "Lady Blackbird est un jeu de rôle narratif court qui capture l'essence des aventures pulp et steampunk. Les joueurs incarnent des personnages à bord du vaisseau spatial Lady Blackbird, tentant d'échapper à leurs poursuivants. Un jeu parfait pour des sessions courtes et intenses avec des règles simples et une forte emphase narrative.",
      included: [
        "Jeu narratif",
        "Règles pulp",
        "Scénario prêt à jouer"
      ],
      extensions: [
        {
          id: 56,
          name: "Lady Blackbird: The Book of Adventures",
          price: 9.99,
          type: "Supplément",
          image: "/images/book-of-adventures.jpg"
        }
      ],
      type: 'free'
    },
    // Aria
    29: {
      id: 29,
      name: "Aria",
      publisher: "Last Unicorn / Elder Craft",
      price: 60,
      tags: ["Autres", "Liées", "Expert"],
      description: "Aria est un système générique complexe qui permet de créer des mondes et des civilisations entières. Les joueurs peuvent jouer à différentes échelles, des individus aux nations, dans un système qui simule l'évolution des sociétés. Un jeu ambitieux pour les joueurs expérimentés qui veulent explorer la création de monde et la simulation sociale.",
      included: [
        "Système générique",
        "Règles de civilisation",
        "Guide de création de monde"
      ],
      extensions: [
        {
          id: 57,
          name: "Aria: The Book of Worlds",
          price: 39.99,
          type: "Supplément",
          image: "/images/book-of-worlds.jpg"
        }
      ],
      type: 'paid'
    },
    // Microscope
    30: {
      id: 30,
      name: "Microscope",
      publisher: "Ben Robbins",
      price: null,
      tags: ["Autres", "Libres", "Intermédiaire"],
      description: "Microscope est un jeu de création d'histoire collaborative qui permet aux joueurs de construire ensemble l'histoire d'une civilisation, d'un empire ou d'un monde. Les joueurs peuvent zoomer sur différents moments historiques, créant des événements, des périodes et des scènes. Un jeu unique qui encourage la créativité et la collaboration narrative.",
      included: [
        "Création d'histoire collaborative",
        "Règles de zoom temporel",
        "Guide de construction d'histoire"
      ],
      extensions: [
        {
          id: 58,
          name: "Microscope: The Book of Epochs",
          price: 19.99,
          type: "Supplément",
          image: "/images/book-of-epochs.jpg"
        }
      ],
      type: 'free'
    },
    // Forbidden Lands
    31: {
      id: 31,
      name: "Forbidden Lands",
      publisher: "Tomas Härenstam",
      price: 42,
      tags: ["Fantasy", "Liées", "Intermédiaire"],
      description: "Forbidden Lands est un jeu de rôle fantasy d'exploration et de survie dans un monde dangereux et mystérieux. Les joueurs incarnent des aventuriers qui explorent des terres interdites, découvrant des ruines anciennes et affrontant des créatures terrifiantes. Un système qui met l'accent sur la survie, l'exploration et la gestion des ressources dans un monde hostile.",
      included: [
        "Exploration et survie",
        "Règles de survie",
        "Guide des terres interdites"
      ],
      extensions: [
        {
          id: 59,
          name: "Forbidden Lands: The Book of Beasts",
          price: 29.99,
          type: "Bestiaire",
          image: "/images/book-of-beasts.jpg"
        }
      ],
      type: 'paid'
    },
    // Horror in Arkham
    32: {
      id: 32,
      name: "Horror in Arkham",
      publisher: "Chaosium",
      price: 35,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Horror in Arkham plonge les joueurs dans l'horreur cosmique de la ville fictive d'Arkham, inspirée de l'univers de H.P. Lovecraft. Les joueurs incarnent des enquêteurs qui découvrent les mystères sombres qui se cachent derrière les façades respectables de la ville. Un jeu qui capture l'atmosphère oppressante et terrifiante de l'horreur lovecraftienne.",
      included: [
        "Horreur cosmique",
        "Règles d'investigation",
        "Guide d'Arkham"
      ],
      extensions: [
        {
          id: 60,
          name: "Horror in Arkham: The Book of Shadows",
          price: 24.99,
          type: "Supplément",
          image: "/images/arkham-shadows.jpg"
        }
      ],
      type: 'paid'
    },
    // Warhammer Fantasy Roleplay
    33: {
      id: 33,
      name: "Warhammer Fantasy Roleplay",
      publisher: "Cubicle 7",
      price: 45,
      tags: ["Fantasy", "Liées", "Expert"],
      description: "Warhammer Fantasy Roleplay 4e édition transporte les joueurs dans l'univers sombre et brutal de Warhammer Fantasy. Les joueurs incarnent des personnages ordinaires dans un monde où le chaos et la corruption menacent constamment. Un système complexe qui capture l'atmosphère sombre et désespérée de l'univers Warhammer.",
      included: [
        "4e édition",
        "Règles de chaos",
        "Guide de l'Empire"
      ],
      extensions: [
        {
          id: 61,
          name: "Warhammer Fantasy: The Book of Corruption",
          price: 34.99,
          type: "Supplément",
          image: "/images/book-of-corruption.jpg"
        }
      ],
      type: 'paid'
    },
    // Shadowrun
    34: {
      id: 34,
      name: "Shadowrun",
      publisher: "Catalyst Game Labs",
      price: 50,
      tags: ["Science-fiction", "Liées", "Expert"],
      description: "Shadowrun 6e édition combine cyberpunk et fantasy dans un monde unique où la magie a refait surface. Les joueurs incarnent des shadowrunners, des mercenaires qui effectuent des missions illégales dans un monde dominé par les mégacorporations. Un système complexe qui mélange technologie, magie et action dans un univers dystopique.",
      included: [
        "6e édition",
        "Règles de cybernétique et magie",
        "Guide de Seattle"
      ],
      extensions: [
        {
          id: 62,
          name: "Shadowrun: The Book of Magic",
          price: 39.99,
          type: "Supplément",
          image: "/images/book-of-magic.jpg"
        }
      ],
      type: 'paid'
    },
    // World of Darkness
    35: {
      id: 35,
      name: "World of Darkness",
      publisher: "White Wolf",
      price: 35,
      tags: ["Horreur & Mystère", "Liées", "Intermédiaire"],
      description: "World of Darkness est le système de base pour l'univers sombre et gothique de White Wolf. Les joueurs incarnent des créatures surnaturelles qui vivent cachées dans le monde moderne, naviguant entre leur nature monstrueuse et leur humanité. Un système mature qui explore les thèmes de la corruption, du pouvoir et de la survie dans un monde sombre.",
      included: [
        "Système de base",
        "Règles de créatures surnaturelles",
        "Guide du monde sombre"
      ],
      extensions: [
        {
          id: 63,
          name: "World of Darkness: The Book of Spirits",
          price: 29.99,
          type: "Supplément",
          image: "/images/book-of-spirits.jpg"
        }
      ],
      type: 'paid'
    },
    // GURPS
    36: {
      id: 36,
      name: "GURPS",
      publisher: "Steve Jackson Games",
      price: 40,
      tags: ["Autres", "Liées", "Expert"],
      description: "GURPS (Generic Universal RolePlaying System) est un système générique ultra-flexible qui peut s'adapter à n'importe quel genre ou univers. Les joueurs peuvent créer des personnages dans n'importe quel cadre, de la fantasy médiévale à la science-fiction futuriste. Un système complexe mais puissant pour les joueurs expérimentés qui veulent une simulation détaillée.",
      included: [
        "Système générique",
        "Règles universelles",
        "Guide de création de personnage"
      ],
      extensions: [
        {
          id: 64,
          name: "GURPS: The Book of Powers",
          price: 34.99,
          type: "Supplément",
          image: "/images/book-of-powers.jpg"
        }
      ],
      type: 'paid'
    },
    // Honey Heist
    37: {
      id: 37,
      name: "Honey Heist",
      publisher: "Grant Howitt",
      price: null,
      tags: ["Comédie & Parodique", "Libres", "Débutant"],
      description: "Honey Heist est un jeu de rôle narratif court et hilarant où les joueurs incarnent des ours qui tentent de voler du miel lors d'une convention. Un jeu simple et amusant parfait pour des sessions courtes et détendues. Avec seulement deux stats (Bear et Criminal), il se concentre sur l'improvisation et l'humour absurde.",
      included: [
        "Jeu narratif court",
        "Règles simples",
        "Scénario de convention"
      ],
      extensions: [
        {
          id: 65,
          name: "Honey Heist: The Book of Bears",
          price: 9.99,
          type: "Supplément",
          image: "/images/book-of-bears.jpg"
        }
      ],
      type: 'free'
    },
    // The Quiet Year
    38: {
      id: 38,
      name: "The Quiet Year",
      publisher: "Avery Alder",
      price: null,
      tags: ["Autres", "Libres", "Intermédiaire"],
      description: "The Quiet Year est un jeu de construction de communauté qui permet aux joueurs de créer ensemble l'histoire d'une communauté qui survit pendant une année calme. Les joueurs dessinent une carte et créent des événements qui façonnent la communauté. Un jeu unique qui encourage la créativité et la collaboration narrative.",
      included: [
        "Construction de communauté",
        "Règles de cartographie",
        "Guide de création d'événements"
      ],
      extensions: [
        {
          id: 66,
          name: "The Quiet Year: The Book of Seasons",
          price: 14.99,
          type: "Supplément",
          image: "/images/quiet-year-seasons.jpg"
        }
      ],
      type: 'free'
    },
    // Dread
    39: {
      id: 39,
      name: "Dread",
      publisher: "Rafael Chandler",
      price: null,
      tags: ["Horreur & Mystère", "Libres", "Débutant"],
      description: "Dread est un jeu d'horreur unique qui utilise une tour de Jenga au lieu de dés pour résoudre les actions. Quand un joueur fait tomber la tour, son personnage meurt. Un système simple mais efficace qui crée une tension palpable et une horreur psychologique intense. Parfait pour des sessions d'horreur courtes et intenses.",
      included: [
        "Horreur avec Jenga",
        "Règles de tension",
        "Scénarios d'horreur"
      ],
      extensions: [
        {
          id: 67,
          name: "Dread: The Book of Nightmares",
          price: 19.99,
          type: "Supplément",
          image: "/images/book-of-nightmares.jpg"
        }
      ],
      type: 'free'
    },
    // Mutant: Year Zero
    40: {
      id: 40,
      name: "Mutant: Year Zero",
      publisher: "Free League Publishing",
      price: 45,
      tags: ["Science-fiction", "Liées", "Intermédiaire"],
      description: "Mutant: Year Zero plonge les joueurs dans un monde post-apocalyptique où ils incarnent des mutants qui tentent de survivre et de reconstruire la civilisation. Un système qui combine exploration, survie et gestion de ressources dans un monde dévasté. Les joueurs doivent gérer leur base, explorer les ruines et faire face aux dangers du monde mutant.",
      included: [
        "Post-apocalyptique",
        "Règles de survie",
        "Guide de la Zone"
      ],
      extensions: [
        {
          id: 68,
          name: "Mutant: Year Zero: The Book of Mutations",
          price: 29.99,
          type: "Supplément",
          image: "/images/book-of-mutations.jpg"
        }
      ],
      type: 'paid'
    },
    // Pathfinder 2e (Version de base)
    44: {
      id: 44,
      name: "Pathfinder 2e (Version de base)",
      publisher: "Paizo Publishing",
      price: null,
      tags: ["Fantasy", "Liées", "Intermédiaire"],
      description: "Pathfinder 2e Version de base offre les règles essentielles du système Pathfinder 2e en version gratuite. Les joueurs peuvent créer des personnages et jouer des aventures de base, avec la possibilité d'acheter des suppléments pour étendre l'expérience. Un excellent moyen de découvrir le système Pathfinder 2e sans investissement initial.",
      included: [
        "Règles de base gratuites",
        "Classes de base",
        "Système de combat"
      ],
      extensions: [
        {
          id: 69,
          name: "Pathfinder 2e: Core Rulebook",
          price: 59.99,
          type: "Livre complet",
          image: "/images/pathfinder-core.jpg"
        }
      ],
      type: 'freemium'
    },
    // Starfinder (Règles de base)
    45: {
      id: 45,
      name: "Starfinder (Règles de base)",
      publisher: "Paizo Publishing",
      price: null,
      tags: ["Science-fiction", "Liées", "Intermédiaire"],
      description: "Starfinder Règles de base offre les règles essentielles du système Starfinder en version gratuite. Les joueurs peuvent explorer l'univers de science-fiction de Starfinder, créer des personnages et vivre des aventures spatiales. Un système qui combine science-fiction et fantasy dans un univers riche et détaillé.",
      included: [
        "Règles de base gratuites",
        "Classes spatiales",
        "Système de vaisseaux"
      ],
      extensions: [
        {
          id: 70,
          name: "Starfinder: Core Rulebook",
          price: 59.99,
          type: "Livre complet",
          image: "/images/starfinder-core.jpg"
        }
      ],
      type: 'freemium'
    }
  };

  useEffect(() => {
    const data = universeData[id];
    if (data) {
      setUniverse(data);
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
    if (!universe) return 0;
    // Pour les éléments possédés, le prix de base est 0
    const basePrice = universe.type === 'owned' ? 0 : (universe.price || 0);
    const extensionsPrice = selectedExtensions.reduce((total, extId) => {
      const extension = universe.extensions.find(ext => ext.id === extId);
      return total + (extension ? extension.price : 0);
    }, 0);
    return Math.round((basePrice + extensionsPrice) * 100) / 100; // Arrondir à 2 décimales
  };

  const handleUseUniverse = () => {
    // Stocker l'univers sélectionné et retourner à la création de campagne
    const total = calculateTotal();
    const selectedData = {
      universe: universe,
      totalPrice: total,
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

  // Recalculer le total à chaque rendu pour assurer la mise à jour dynamique
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header unifié */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigate('/campaigns/create/universe')}
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
          <button onClick={() => navigate('/campaigns/create/universe')} className="hover:text-light transition-colors">
            Choix d'univers
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
            {universe.name}
          </h2>
          <p className="text-light/80 text-lg">{universe.publisher}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Image */}
          <div>
            <div className="aspect-[3/4] bg-light/10 rounded-lg flex items-center justify-center border border-light/20 p-4">
              <div className="w-full h-full bg-light/20 rounded-lg border border-white flex items-center justify-center">
                <div className="text-light/40 text-8xl font-bold opacity-50">IMG</div>
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
                {universe.extensions.map(extension => {
                  const isSelected = selectedExtensions.includes(extension.id);
                  return (
                    <div 
                      key={extension.id}
                      onClick={() => handleExtensionClick(extension)}
                      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 relative ${isSelected ? 'ring-2 ring-golden bg-golden/10' : 'hover:ring-1 hover:ring-light/30'}`}
                      style={{ backgroundColor: isSelected ? 'rgba(233, 189, 114, 0.1)' : 'rgba(13, 21, 26, 0.7)' }}
                    >
                      {/* Indicateur de sélection */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10">
                          <div className="w-6 h-6 bg-golden rounded-full flex items-center justify-center">
                            <span className="text-dark text-xs font-bold">✓</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="aspect-[4/3] bg-light/20 flex items-center justify-center p-3">
                        <div className="w-full h-full bg-light/30 rounded-lg border border-white flex items-center justify-center">
                          <div className="text-light/40 text-4xl font-bold opacity-50">IMG</div>
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

            {/* Prix et bouton - CALCUL DYNAMIQUE */}
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-light">
                {universe.type === 'owned' ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Déjà possédé"
                 ) :
                 universe.type === 'freemium' ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Gratuit avec achats facultatifs"
                 ) : 
                 universe.type === 'free' ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Gratuit"
                 ) : (
                   selectedExtensions.length > 0 ? `${total} €` : `${Math.round(universe.price * 100) / 100} €`
                 )}
                {selectedExtensions.length > 0 && (
                  <div className="text-lg text-light/70 mt-1">
                    {universe.type === 'owned' ? 
                      `${total}€ achats` :
                      universe.type === 'freemium' ? 
                        `Gratuit + ${total}€ achats` : 
                        universe.type === 'free' ? 
                          `${total}€ achats` : 
                          `${Math.round(universe.price * 100) / 100}€ base + ${Math.round((total - universe.price) * 100) / 100}€ achats`
                    }
                  </div>
                )}
              </div>
              
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