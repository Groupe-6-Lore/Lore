import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Download, Share2, Heart, BookOpen, Users, Clock, Tag } from 'lucide-react';
import Header from '../components/Header';

const UniverseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [universe, setUniverse] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

  const universeData = {
    // Univers Fantasy
    1: {
      id: 1,
      name: "Forgotten Realms",
      publisher: "Wizards of the Coast",
      price: 0,
      type: "owned",
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Forgotten Realms est l'univers fantasy le plus célèbre et le plus développé de Dungeons & Dragons. Centré sur le continent de Faerûn, il offre un monde riche et détaillé avec des centaines de lieux, personnages et histoires. Des villes légendaires comme Waterdeep et Baldur's Gate aux régions sauvages comme la Forêt de Cormyr, Forgotten Realms propose un cadre épique pour toutes sortes d'aventures fantasy. L'univers inclut des dieux puissants, des organisations secrètes, des royaumes en guerre et des mystères anciens qui attendent d'être découverts.",
      included: [
        "Carte de Faerûn",
        "Guide des royaumes",
        "Personnages légendaires",
        "Organisations et guildes",
        "Histoire détaillée",
        "Lieux emblématiques"
      ],
      features: [
        "Monde vaste et détaillé",
        "Histoire riche et complexe",
        "Personnages iconiques",
        "Organisations politiques",
        "Magie et artefacts",
        "Conflits épiques"
      ],
      extensions: [
        {
          id: 1,
          name: "Waterdeep: Dragon Heist",
          price: 29.99,
          type: "Aventure",
          image: "/images/waterdeep-dragon-heist.jpg"
        },
        {
          id: 2,
          name: "Baldur's Gate: Descent into Avernus",
          price: 29.99,
          type: "Aventure",
          image: "/images/baldurs-gate-avernus.jpg"
        },
        {
          id: 3,
          name: "Sword Coast Adventurer's Guide",
          price: 49.99,
          type: "Guide",
          image: "/images/sword-coast-guide.jpg"
        },
        {
          id: 4,
          name: "Volo's Guide to Monsters",
          price: 49.99,
          type: "Bestiaire",
          image: "/images/volos-guide.jpg"
        },
        {
          id: 5,
          name: "Tasha's Cauldron of Everything",
          price: 49.99,
          type: "Supplément",
          image: "/images/tashas-cauldron.jpg"
        }
      ],
      image: "/images/forgotten-realms.jpg"
    },
    2: {
      id: 2,
      name: "Eberron",
      publisher: "Wizards of the Coast",
      price: 0,
      type: "owned",
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Eberron est un univers steampunk fantasy unique qui mélange magie et technologie. Dans ce monde, la magie est utilisée comme une force industrielle, créant des trains magiques, des vaisseaux volants et des villes flottantes. L'univers explore des thèmes de guerre, d'espionnage et de mystère dans un cadre où la technologie magique a transformé la société. Les maisons dragonmark, les warforged et les continents mystérieux créent un cadre riche pour des aventures variées.",
      included: [
        "Guide d'Eberron",
        "Races et classes",
        "Organisations",
        "Technologie magique",
        "Maisons dragonmark",
        "Continents et géographie"
      ],
      extensions: [
        {
          id: 5,
          name: "Rising from the Last War",
          price: 49.99,
          type: "Guide",
          image: "/images/eberron-rising.jpg"
        },
        {
          id: 6,
          name: "Exploring Eberron",
          price: 39.99,
          type: "Supplément",
          image: "/images/exploring-eberron.jpg"
        },
        {
          id: 7,
          name: "Eberron: Oracle of War",
          price: 29.99,
          type: "Aventure",
          image: "/images/oracle-war.jpg"
        }
      ],
      image: "/images/eberron.jpg"
    },
    3: {
      id: 3,
      name: "Ravenloft",
      publisher: "Wizards of the Coast",
      price: 0,
      type: "free",
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Ravenloft est le domaine de l'horreur gothique dans D&D. Un monde de ténèbres où des seigneurs vampires, des liches et d'autres créatures maléfiques règnent sur des domaines isolés. Chaque domaine a ses propres règles et horreurs, créant une expérience d'horreur psychologique et gothique unique. L'univers explore les thèmes de la corruption, de la damnation et de la lutte contre les ténèbres.",
      included: [
        "Domaines de Ravenloft",
        "Seigneurs des ténèbres",
        "Règles d'horreur",
        "Créatures gothiques",
        "Atmosphère sombre",
        "Mystères et secrets"
      ],
      extensions: [
        {
          id: 8,
          name: "Van Richten's Guide to Ravenloft",
          price: 49.99,
          type: "Guide",
          image: "/images/van-richtens-guide.jpg"
        },
        {
          id: 9,
          name: "Curse of Strahd",
          price: 49.99,
          type: "Aventure",
          image: "/images/curse-strahd.jpg"
        },
        {
          id: 10,
          name: "House of Lament",
          price: 24.99,
          type: "Aventure",
          image: "/images/house-lament.jpg"
        }
      ],
      image: "/images/ravenloft.jpg"
    },
    4: {
      id: 4,
      name: "Planescape",
      publisher: "Wizards of the Coast",
      price: 0,
      type: "free",
      tags: ["Fantasy", "Libres", "Expert"],
      description: "Planescape explore le multivers cosmique de D&D avec Sigil, la Cité des Portes. Cet univers unique mélange philosophie, cosmologie et aventure dans un cadre où les croyances façonnent la réalité. Les factions philosophiques, les plans d'existence et les portails dimensionnels créent un cadre riche pour des aventures épiques et métaphysiques.",
      included: [
        "Guide de Sigil",
        "Factions philosophiques",
        "Plans d'existence",
        "Portails dimensionnels",
        "Créatures planaires",
        "Philosophie et cosmologie"
      ],
      extensions: [
        {
          id: 11,
          name: "Planescape: Adventures in the Multiverse",
          price: 49.99,
          type: "Guide",
          image: "/images/planescape-multiverse.jpg"
        },
        {
          id: 12,
          name: "Sigil and the Outlands",
          price: 39.99,
          type: "Supplément",
          image: "/images/sigil-outlands.jpg"
        }
      ],
      image: "/images/planescape.jpg"
    },
    5: {
      id: 5,
      name: "Dark Sun",
      publisher: "Wizards of the Coast",
      price: 0,
      type: "free",
      tags: ["Fantasy", "Libres", "Expert"],
      description: "Dark Sun présente Athas, un monde désertique post-apocalyptique où la magie a détruit l'environnement. Dans ce monde brutal, l'eau est rare, les métaux précieux, et la survie est un défi constant. Les sorciers-rois tyranniques, les créatures mutées et l'écologie unique créent un cadre sombre et unique pour des aventures de survie et de rébellion.",
      included: [
        "Guide d'Athas",
        "Races adaptées au désert",
        "Classes de survie",
        "Magie destructrice",
        "Créatures du désert",
        "Écologie unique"
      ],
      extensions: [
        {
          id: 13,
          name: "Dark Sun Campaign Setting",
          price: 49.99,
          type: "Guide",
          image: "/images/dark-sun-setting.jpg"
        },
        {
          id: 14,
          name: "Athas: The Tyrant Lands",
          price: 34.99,
          type: "Supplément",
          image: "/images/athas-tyrant.jpg"
        }
      ],
      image: "/images/dark-sun.jpg"
    },
    6: {
      id: 6,
      name: "Spelljammer",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Spelljammer combine fantasy et science-fiction avec des voyages spatiaux magiques. Les vaisseaux magiques naviguent dans le phlogiston, explorant des systèmes solaires entiers. Les neogi, les illithids et les créatures spatiales créent un cadre unique pour des aventures d'exploration interplanétaire.",
      included: [
        "Vaisseaux magiques",
        "Systèmes solaires",
        "Créatures spatiales",
        "Navigation phlogiston",
        "Races spatiales",
        "Exploration interplanétaire"
      ],
      extensions: [
        {
          id: 15,
          name: "Spelljammer: Adventures in Space",
          price: 49.99,
          type: "Guide",
          image: "/images/spelljammer-space.jpg"
        },
        {
          id: 16,
          name: "Light of Xaryxis",
          price: 39.99,
          type: "Aventure",
          image: "/images/light-xaryxis.jpg"
        }
      ],
      image: "/images/spelljammer.jpg",
      type: 'free'
    },
    7: {
      id: 7,
      name: "Golarion",
      publisher: "Paizo Publishing",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Golarion est l'univers officiel de Pathfinder, un monde riche et détaillé avec des continents variés et des cultures distinctes. De Varisia aux terres sauvages de Numeria, Golarion offre un cadre épique pour toutes sortes d'aventures fantasy avec une attention particulière portée à l'histoire et à la géographie.",
      included: [
        "Carte de Golarion",
        "Continents et royaumes",
        "Cultures et civilisations",
        "Histoire détaillée",
        "Lieux emblématiques",
        "Organisations et guildes"
      ],
      extensions: [
        {
          id: 17,
          name: "Inner Sea World Guide",
          price: 0,
          type: "Guide",
          image: "/images/inner-sea-guide.jpg"
        },
        {
          id: 18,
          name: "Lost Omens: World Guide",
          price: 44.99,
          type: "Supplément",
          image: "/images/lost-omens-world.jpg"
        },
        {
          id: 19,
          name: "Kingmaker Adventure Path",
          price: 59.99,
          type: "Aventure",
          image: "/images/kingmaker.jpg"
        }
      ],
      image: "/images/golarion.jpg",
      type: 'free'
    },
    8: {
      id: 8,
      name: "Symbaroum",
      publisher: "Free League Publishing",
      price: 45.99,
      tags: ["Fantasy", "Payant", "Intermédiaire"],
      description: "Symbaroum présente Ambria et la forêt maudite de Davokar, un univers dark fantasy où la magie corrompt. Les aventuriers explorent des ruines anciennes au péril de leur âme, découvrant des secrets maudits et des trésors dangereux. L'univers explore les thèmes de la corruption, de la décadence et du prix de la connaissance.",
      included: [
        "Guide d'Ambria",
        "Forêt de Davokar",
        "Races et cultures",
        "Magie corrompue",
        "Créatures sombres",
        "Ruines anciennes"
      ],
      extensions: [
        {
          id: 20,
          name: "Advanced Player's Guide",
          price: 29.99,
          type: "Supplément",
          image: "/images/symbaroum-apg.jpg"
        },
        {
          id: 21,
          name: "Throne of Thorns Campaign",
          price: 49.99,
          type: "Aventure",
          image: "/images/throne-thorns.jpg"
        },
        {
          id: 22,
          name: "Symbaroum: Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/symbaroum-core.jpg"
        }
      ],
      image: "/images/symbaroum.jpg",
      type: 'paid'
    },
    9: {
      id: 9,
      name: "Midgard",
      publisher: "Kobold Press",
      price: 0,
      tags: ["Fantasy", "Libres", "Intermédiaire"],
      description: "Midgard est un univers fantasy européen qui s'inspire de la mythologie réelle. Les dieux nordiques, les créatures du folklore et les cultures historiques créent un cadre riche et authentique pour des aventures fantasy avec une touche d'historicité et de mythologie.",
      included: [
        "Cultures européennes",
        "Mythologie nordique",
        "Créatures du folklore",
        "Dieux et divinités",
        "Géographie historique",
        "Traditions et légendes"
      ],
      extensions: [
        {
          id: 23,
          name: "Midgard Worldbook",
          price: 0,
          type: "Guide",
          image: "/images/midgard-worldbook.jpg"
        },
        {
          id: 24,
          name: "Southlands Campaign Setting",
          price: 39.99,
          type: "Supplément",
          image: "/images/southlands.jpg"
        }
      ],
      image: "/images/midgard.jpg",
      type: 'free'
    },
    10: {
      id: 10,
      name: "Theros",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Theros s'inspire de la mythologie grecque pour créer un univers fantasy épique. Les dieux grecs, les héros légendaires et les créatures mythologiques créent un cadre riche pour des aventures épiques et héroïques dans un monde où les dieux interviennent directement dans les affaires mortelles.",
      included: [
        "Mythologie grecque",
        "Dieux et divinités",
        "Héros légendaires",
        "Créatures mythologiques",
        "Cités-États",
        "Aventures épiques"
      ],
      extensions: [
        {
          id: 25,
          name: "Mythic Odysseys of Theros",
          price: 0,
          type: "Guide",
          image: "/images/mythic-odysseys.jpg"
        },
        {
          id: 26,
          name: "No Silent Secret",
          price: 24.99,
          type: "Aventure",
          image: "/images/no-silent-secret.jpg"
        }
      ],
      image: "/images/theros.jpg",
      type: 'free'
    },
    11: {
      id: 11,
      name: "Star Wars",
      publisher: "Fantasy Flight Games",
      price: 0,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "La galaxie lointaine de Star Wars offre un univers riche pour des aventures d'exploration, d'espionnage et d'héroïsme. De Coruscant aux confins de l'espace, l'univers Star Wars propose des planètes variées, des espèces multiples et des conflits épiques entre la lumière et les ténèbres.",
      included: [
        "Galaxie explorable",
        "Espèces multiples",
        "Technologies avancées",
        "Force et Jedi",
        "Planètes iconiques",
        "Vaisseaux spatiaux"
      ],
      features: [
        "Galaxie vaste et diversifiée",
        "Conflit Force vs Ténèbres",
        "Technologies futuristes",
        "Espèces et cultures variées",
        "Vaisseaux et véhicules",
        "Organisations politiques"
      ],
      extensions: [
        {
          id: 27,
          name: "Edge of the Empire",
          price: 29.99,
          type: "Aventure",
          image: "/images/edge-empire.jpg"
        },
        {
          id: 28,
          name: "Age of Rebellion",
          price: 29.99,
          type: "Aventure",
          image: "/images/age-rebellion.jpg"
        },
        {
          id: 29,
          name: "Force and Destiny",
          price: 29.99,
          type: "Aventure",
          image: "/images/force-destiny.jpg"
        }
      ],
      image: "/images/star-wars.jpg"
    },
    12: {
      id: 12,
      name: "Star Trek",
      publisher: "Modiphius Entertainment",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "L'univers de Star Trek présente la Fédération des Planètes Unies et son exploration spatiale. L'univers explore les thèmes de l'exploration, de la diplomatie et de la découverte dans un futur optimiste où l'humanité a surmonté ses conflits.",
      included: [
        "Fédération des Planètes",
        "Vaisseaux spatiaux",
        "Espèces multiples",
        "Technologies avancées",
        "Exploration spatiale",
        "Diplomatie interstellaire"
      ],
      extensions: [
        {
          id: 30,
          name: "Star Trek Adventures Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/star-trek-core.jpg"
        },
        {
          id: 31,
          name: "These Are the Voyages",
          price: 34.99,
          type: "Aventure",
          image: "/images/these-are-voyages.jpg"
        }
      ],
      image: "/images/star-trek.jpg",
      type: 'free'
    },
    13: {
      id: 13,
      name: "Warhammer 40K",
      publisher: "Games Workshop",
      price: 0,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "Warhammer 40K présente un futur sombre et brutal où l'Imperium de l'Humanité lutte pour sa survie. L'univers explore les thèmes de la guerre, de la corruption et de la lutte contre les forces du Chaos dans un cadre grimdark unique.",
      included: [
        "Imperium de l'Humanité",
        "Space Marines",
        "Forces du Chaos",
        "Technologies gothiques",
        "Guerres interstellaires",
        "Religions impériales"
      ],
      extensions: [
        {
          id: 32,
          name: "Wrath & Glory Core Rulebook",
          price: 49.99,
          type: "Guide",
          image: "/images/wrath-glory.jpg"
        },
        {
          id: 33,
          name: "Dark Tides",
          price: 29.99,
          type: "Aventure",
          image: "/images/dark-tides.jpg"
        }
      ],
      image: "/images/warhammer-40k.jpg"
    },
    14: {
      id: 14,
      name: "Shadowrun",
      publisher: "Catalyst Game Labs",
      price: 0,
      tags: ["Science-fiction", "Libres", "Expert"],
      description: "Shadowrun combine cyberpunk et fantasy dans un monde où la magie a réapparu. Les runners, mercenaires cybernétiques, naviguent dans un monde de corporations puissantes, de magie et de technologie avancée.",
      included: [
        "Monde cyberpunk-fantasy",
        "Runners et mercenaires",
        "Corporations puissantes",
        "Magie et technologie",
        "Cybernétique",
        "Métahumains"
      ],
      extensions: [
        {
          id: 34,
          name: "Shadowrun: Sixth World Core Rulebook",
          price: 49.99,
          type: "Guide",
          image: "/images/shadowrun-core.jpg"
        },
        {
          id: 35,
          name: "Seattle Sprawl",
          price: 34.99,
          type: "Supplément",
          image: "/images/seattle-sprawl.jpg"
        }
      ],
      image: "/images/shadowrun.jpg"
    },
    15: {
      id: 15,
      name: "Numenera",
      publisher: "Monte Cook Games",
      price: 45,
      tags: ["Science-fiction", "Payant", "Intermédiaire"],
      description: "Numenera se déroule sur Terre dans le Neuvième Monde, un futur lointain où les civilisations précédentes ont laissé des technologies mystérieuses. Les explorateurs découvrent des artefacts anciens et des mystères cosmiques.",
      included: [
        "Terre du Neuvième Monde",
        "Technologies anciennes",
        "Artefacts mystérieux",
        "Créatures étranges",
        "Exploration",
        "Mystères cosmiques"
      ],
      extensions: [
        {
          id: 36,
          name: "The Strange",
          price: 34.99,
          type: "Supplément",
          image: "/images/strange.jpg"
        },
        {
          id: 37,
          name: "Numenera: Discovery",
          price: 0,
          type: "Guide",
          image: "/images/numenera-discovery.jpg"
        },
        {
          id: 38,
          name: "Numenera: Destiny",
          price: 0,
          type: "Guide",
          image: "/images/numenera-destiny.jpg"
        }
      ],
      image: "/images/numenera.jpg",
      type: 'paid'
    },
    16: {
      id: 16,
      name: "Cyberpunk RED",
      publisher: "R. Talsorian Games",
      price: 60,
      tags: ["Science-fiction", "Payant", "Expert"],
      description: "Cyberpunk RED se déroule dans Nuit City en 2045, un monde dystopique où les corporations règnent et les netrunners naviguent dans le cyberspace. L'univers explore les thèmes de la technologie, de la rébellion et de la survie urbaine.",
      included: [
        "Nuit City 2045",
        "Corporations",
        "Netrunners",
        "Cyberspace",
        "Technologies cybernétiques",
        "Survie urbaine"
      ],
      features: [
        "Monde cyberpunk dystopique",
        "Corporations omnipuissantes",
        "Cybernétique et implants",
        "Cyberspace et hacking",
        "Survie urbaine",
        "Rébellion et contre-culture"
      ],
      extensions: [
        {
          id: 39,
          name: "Cyberpunk RED Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/cyberpunk-red-core.jpg"
        },
        {
          id: 40,
          name: "Black Chrome",
          price: 39.99,
          type: "Supplément",
          image: "/images/black-chrome.jpg"
        }
      ],
      image: "/images/cyberpunk-red.jpg",
      type: 'paid'
    },
    17: {
      id: 17,
      name: "Traveller",
      publisher: "Mongoose Publishing",
      price: 50,
      tags: ["Science-fiction", "Payant", "Expert"],
      description: "Traveller propose l'exploration spatiale et le commerce interstellaire dans un univers riche et détaillé. Les joueurs peuvent être marchands, explorateurs ou mercenaires dans une galaxie vaste et dangereuse.",
      included: [
        "Exploration spatiale",
        "Commerce interstellaire",
        "Vaisseaux spatiaux",
        "Planètes variées",
        "Système de carrière",
        "Génération de mondes"
      ],
      extensions: [
        {
          id: 41,
          name: "Traveller Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/traveller-core.jpg"
        },
        {
          id: 42,
          name: "High Guard",
          price: 34.99,
          type: "Supplément",
          image: "/images/high-guard.jpg"
        }
      ],
      image: "/images/traveller.jpg",
      type: 'paid'
    },
    18: {
      id: 18,
      name: "Alien",
      publisher: "Free League Publishing",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "L'univers d'Alien présente l'horreur spatiale avec les Xenomorphes et les corporations interstellaires. L'univers explore les thèmes de l'isolement, de la survie et de l'horreur cosmique dans l'espace.",
      included: [
        "Horreur spatiale",
        "Xenomorphes",
        "Corporations interstellaires",
        "Vaisseaux spatiaux",
        "Survie",
        "Isolation"
      ],
      extensions: [
        {
          id: 43,
          name: "Alien RPG Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/alien-core.jpg"
        },
        {
          id: 44,
          name: "Destroyer of Worlds",
          price: 29.99,
          type: "Aventure",
          image: "/images/destroyer-worlds.jpg"
        }
      ],
      image: "/images/alien.jpg",
      type: 'free'
    },
    19: {
      id: 19,
      name: "Blade Runner",
      publisher: "Free League Publishing",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "Blade Runner se déroule dans Los Angeles 2037, un monde cyberpunk où les réplicants et les détectives naviguent dans une société dystopique. L'univers explore les thèmes de l'humanité, de la technologie et de l'identité.",
      included: [
        "Los Angeles 2037",
        "Réplicants",
        "Détectives",
        "Société dystopique",
        "Technologies avancées",
        "Questions d'identité"
      ],
      extensions: [
        {
          id: 45,
          name: "Blade Runner RPG Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/blade-runner-core.jpg"
        },
        {
          id: 46,
          name: "Fiery Angels",
          price: 24.99,
          type: "Aventure",
          image: "/images/fiery-angels.jpg"
        }
      ],
      image: "/images/blade-runner.jpg",
      type: 'free'
    },
    20: {
      id: 20,
      name: "The Expanse",
      publisher: "Green Ronin Publishing",
      price: 0,
      tags: ["Science-fiction", "Libres", "Intermédiaire"],
      description: "The Expanse se déroule dans un système solaire colonisé avec des tensions politiques entre la Terre, Mars et la Ceinture. L'univers explore les thèmes de la politique, de la survie et de l'exploration spatiale.",
      included: [
        "Système solaire colonisé",
        "Tensions politiques",
        "Terre, Mars, Ceinture",
        "Technologies réalistes",
        "Survie spatiale",
        "Exploration"
      ],
      extensions: [
        {
          id: 47,
          name: "The Expanse RPG Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/expanse-core.jpg"
        },
        {
          id: 48,
          name: "Abzu's Bounty",
          price: 29.99,
          type: "Aventure",
          image: "/images/abzu-bounty.jpg"
        }
      ],
      image: "/images/expanse.jpg",
      type: 'free'
    },
    21: {
      id: 21,
      name: "Cthulhu Mythos",
      publisher: "Chaosium",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "L'univers de Cthulhu explore l'horreur cosmique avec les Grands Anciens et les mystères indicibles. Les investigateurs découvrent des vérités terrifiantes sur la nature de la réalité et l'insignifiance de l'humanité face aux forces cosmiques.",
      included: [
        "Grands Anciens",
        "Horreur cosmique",
        "Investigation",
        "Mystères indicibles",
        "Culte et rituels",
        "Sanité mentale"
      ],
      extensions: [
        {
          id: 49,
          name: "Call of Cthulhu Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/call-cthulhu-core.jpg"
        },
        {
          id: 50,
          name: "Masks of Nyarlathotep",
          price: 59.99,
          type: "Aventure",
          image: "/images/masks-nyarlathotep.jpg"
        }
      ],
      image: "/images/cthulhu-mythos.jpg",
      type: 'free'
    },
    22: {
      id: 22,
      name: "World of Darkness",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Le Monde des Ténèbres présente un monde moderne sombre où vampires, loups-garous et autres créatures surnaturelles vivent dans l'ombre. L'univers explore les thèmes de la corruption, de la survie et de la lutte contre la nature bestiale.",
      included: [
        "Monde moderne sombre",
        "Créatures surnaturelles",
        "Sociétés secrètes",
        "Horreur urbaine",
        "Pouvoirs surnaturels",
        "Lutte intérieure"
      ],
      extensions: [
        {
          id: 51,
          name: "World of Darkness Core Rulebook",
          price: 49.99,
          type: "Guide",
          image: "/images/world-darkness-core.jpg"
        },
        {
          id: 52,
          name: "Vampire: The Masquerade",
          price: 34.99,
          type: "Supplément",
          image: "/images/vampire-masquerade.jpg"
        }
      ],
      image: "/images/world-darkness.jpg"
    },
    23: {
      id: 23,
      name: "Delta Green",
      publisher: "Arc Dream Publishing",
      price: 60,
      tags: ["Horreur & Mystère", "Payant", "Expert"],
      description: "Delta Green présente des agents gouvernementaux qui luttent contre l'horreur cosmique dans le monde moderne. L'univers explore les thèmes de la conspiration, de l'horreur et de la lutte contre des forces indicibles.",
      included: [
        "Agents gouvernementaux",
        "Horreur cosmique moderne",
        "Conspirations",
        "Organisations secrètes",
        "Technologies avancées",
        "Lutte contre l'indicible"
      ],
      extensions: [
        {
          id: 53,
          name: "Delta Green Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/delta-green-core.jpg"
        },
        {
          id: 54,
          name: "Impossible Landscapes",
          price: 49.99,
          type: "Aventure",
          image: "/images/impossible-landscapes.jpg"
        }
      ],
      image: "/images/delta-green.jpg",
      type: 'paid'
    },
    24: {
      id: 24,
      name: "Call of Cthulhu",
      publisher: "Chaosium",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Call of Cthulhu se déroule dans les années 1920 et explore l'horreur cosmique avec des investigateurs qui découvrent des mystères terrifiants. L'univers explore les thèmes de l'investigation, de la découverte et de la folie.",
      included: [
        "Années 1920",
        "Investigation",
        "Horreur cosmique",
        "Mystères terrifiants",
        "Folie et sanité",
        "Culte et rituels"
      ],
      extensions: [
        {
          id: 55,
          name: "Call of Cthulhu Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/call-cthulhu-core.jpg"
        },
        {
          id: 56,
          name: "The Haunting",
          price: 14.99,
          type: "Aventure",
          image: "/images/haunting.jpg"
        }
      ],
      image: "/images/call-cthulhu.jpg",
      type: 'free'
    },
    25: {
      id: 25,
      name: "Vampire: The Masquerade",
      publisher: "White Wolf",
      price: 55,
      tags: ["Horreur & Mystère", "Payant", "Intermédiaire"],
      description: "Vampire: The Masquerade présente des vampires dans le monde moderne qui doivent maintenir le secret de leur existence. L'univers explore les thèmes de la survie, de la politique et de la lutte contre la nature vampirique.",
      included: [
        "Vampires modernes",
        "Le Masquerade",
        "Clans vampiriques",
        "Politique nocturne",
        "Pouvoirs vampiriques",
        "Lutte contre la soif"
      ],
      extensions: [
        {
          id: 57,
          name: "Vampire: The Masquerade Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/vampire-masquerade-core.jpg"
        },
        {
          id: 58,
          name: "Camarilla",
          price: 34.99,
          type: "Supplément",
          image: "/images/camarilla.jpg"
        }
      ],
      image: "/images/vampire-masquerade.jpg",
      type: 'paid'
    },
    26: {
      id: 26,
      name: "Werewolf: The Apocalypse",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Werewolf: The Apocalypse présente des loup-garous protecteurs de Gaïa dans un monde moderne corrompu. Les Garous luttent contre la corruption de la Wyrm et défendent les esprits de la nature. L'univers explore les thèmes de la nature, de la spiritualité et de la lutte contre la corruption.",
      included: [
        "Loup-garous protecteurs",
        "Spiritualité animiste",
        "Lutte contre la Wyrm",
        "Tribus et auspices",
        "Rites et cérémonies",
        "Protection de Gaïa"
      ],
      features: [
        "Spiritualité animiste",
        "Protection de la nature",
        "Lutte contre la corruption",
        "Tribus variées",
        "Rites et cérémonies",
        "Connexion à Gaïa"
      ],
      extensions: [
        {
          id: 59,
          name: "Werewolf: The Apocalypse Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/werewolf-apocalypse-core.jpg"
        },
        {
          id: 60,
          name: "Tribes of the Moon",
          price: 34.99,
          type: "Supplément",
          image: "/images/tribes-moon.jpg"
        }
      ],
      image: "/images/werewolf-apocalypse.jpg",
      type: 'free'
    },
    27: {
      id: 27,
      name: "Mage: The Ascension",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "Mage: The Ascension présente des mages dans la guerre de l'Ascension, où la réalité est façonnée par la volonté et la croyance. Les mages luttent pour définir la nature de la réalité elle-même. L'univers explore les thèmes de la magie, de la réalité et de la transcendance.",
      included: [
        "Mages et traditions",
        "Guerre de l'Ascension",
        "Réalité façonnable",
        "Paradigmes magiques",
        "Technocratie",
        "Transcendance"
      ],
      features: [
        "Réalité façonnable",
        "Paradigmes magiques",
        "Guerre de l'Ascension",
        "Technocratie",
        "Traditions mystiques",
        "Transcendance"
      ],
      extensions: [
        {
          id: 61,
          name: "Mage: The Ascension Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/mage-ascension-core.jpg"
        },
        {
          id: 62,
          name: "Tradition Books",
          price: 29.99,
          type: "Supplément",
          image: "/images/tradition-books.jpg"
        }
      ],
      image: "/images/mage-ascension.jpg",
      type: 'free'
    },
    28: {
      id: 28,
      name: "Unknown Armies",
      publisher: "Atlas Games",
      price: 40,
      tags: ["Horreur & Mystère", "Payant", "Intermédiaire"],
      description: "Unknown Armies présente l'horreur urbaine moderne avec magie occulte. Les personnages découvrent des cultes secrets, des rituels dangereux et des vérités terrifiantes sur le monde. L'univers explore les thèmes de l'occultisme, de la folie et de la découverte.",
      included: [
        "Horreur urbaine moderne",
        "Magie occulte",
        "Cultes secrets",
        "Rituels dangereux",
        "Vérités terrifiantes",
        "Folie et découverte"
      ],
      extensions: [
        {
          id: 63,
          name: "Unknown Armies Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/unknown-armies-core.jpg"
        },
        {
          id: 64,
          name: "Postmodern Magick",
          price: 34.99,
          type: "Supplément",
          image: "/images/postmodern-magick.jpg"
        }
      ],
      image: "/images/unknown-armies.jpg",
      type: 'paid'
    },
    29: {
      id: 29,
      name: "Over the Edge",
      publisher: "Atlas Games",
      price: 35,
      tags: ["Science-fiction", "Payant", "Intermédiaire"],
      description: "Over the Edge se déroule sur l'île d'Al Amarja, un lieu de tous les possibles où la réalité est flexible et étrange. Les personnages découvrent des secrets bizarres et des vérités impossibles. L'univers explore les thèmes de la réalité, de l'étrangeté et de la découverte.",
      included: [
        "Île d'Al Amarja",
        "Réalité flexible",
        "Secrets bizarres",
        "Vérités impossibles",
        "Étrangeté",
        "Découverte"
      ],
      extensions: [
        {
          id: 65,
          name: "Over the Edge Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/over-edge-core.jpg"
        },
        {
          id: 66,
          name: "Al Amarja Sourcebook",
          price: 29.99,
          type: "Supplément",
          image: "/images/al-amarja-sourcebook.jpg"
        }
      ],
      image: "/images/over-edge.jpg",
      type: 'paid'
    },
    30: {
      id: 30,
      name: "Bluebeard's Bride",
      publisher: "Magpie Games",
      price: 45,
      tags: ["Horreur & Mystère", "Payant", "Expert"],
      description: "Bluebeard's Bride présente l'horreur gothique et psychologique basée sur le conte de Barbe Bleue. Les personnages explorent un manoir mystérieux et découvrent des secrets terrifiants. L'univers explore les thèmes de l'horreur, de la psychologie et de la découverte.",
      included: [
        "Horreur gothique",
        "Psychologie",
        "Conte de Barbe Bleue",
        "Manoir mystérieux",
        "Secrets terrifiants",
        "Découverte"
      ],
      extensions: [
        {
          id: 67,
          name: "Bluebeard's Bride Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/bluebeard-bride-core.jpg"
        },
        {
          id: 68,
          name: "The Book of Rooms",
          price: 24.99,
          type: "Supplément",
          image: "/images/book-rooms.jpg"
        }
      ],
      image: "/images/bluebeard-bride.jpg",
      type: 'paid'
    },
    31: {
      id: 31,
      name: "Legend of the Five Rings",
      publisher: "Edge Studio",
      price: 49,
      tags: ["Historique & Réaliste", "Payant", "Expert"],
      description: "Legend of the Five Rings présente le Japon fantastique avec samouraïs et clans. L'univers explore l'honneur, la loyauté et les conflits entre clans dans un cadre inspiré du Japon féodal. Les personnages naviguent dans un monde de politique complexe et de traditions strictes.",
      included: [
        "Japon fantastique",
        "Samouraïs et clans",
        "Honneur et loyauté",
        "Conflits entre clans",
        "Politique complexe",
        "Traditions strictes"
      ],
      extensions: [
        {
          id: 69,
          name: "Legend of the Five Rings Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/l5r-core.jpg"
        },
        {
          id: 70,
          name: "Emerald Empire",
          price: 39.99,
          type: "Supplément",
          image: "/images/emerald-empire.jpg"
        }
      ],
      image: "/images/l5r.jpg",
      type: 'paid'
    },
    32: {
      id: 32,
      name: "Pendragon",
      publisher: "Chaosium",
      price: 50,
      tags: ["Historique & Réaliste", "Payant", "Expert"],
      description: "Pendragon présente la légende arthurienne et la chevalerie. Les personnages vivent des générations de chevaliers dans le monde d'Arthur et de Camelot. L'univers explore les thèmes de l'honneur, de la chevalerie et de la légende arthurienne.",
      included: [
        "Légende arthurienne",
        "Chevalerie",
        "Générations de chevaliers",
        "Monde d'Arthur",
        "Camelot",
        "Honneur et chevalerie"
      ],
      extensions: [
        {
          id: 71,
          name: "Pendragon Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/pendragon-core.jpg"
        },
        {
          id: 72,
          name: "The Great Pendragon Campaign",
          price: 49.99,
          type: "Aventure",
          image: "/images/great-pendragon-campaign.jpg"
        }
      ],
      image: "/images/pendragon.jpg",
      type: 'paid'
    },
    33: {
      id: 33,
      name: "Ars Magica",
      publisher: "Atlas Games",
      price: 55,
      tags: ["Fantasy", "Payant", "Expert"],
      description: "Ars Magica présente l'Europe médiévale avec magie hermétique. Les personnages sont des mages dans un monde où la magie est réelle mais secrète. L'univers explore les thèmes de la magie, de l'hermétisme et du Moyen Âge.",
      included: [
        "Europe médiévale",
        "Magie hermétique",
        "Mages",
        "Magie réelle",
        "Secrets",
        "Moyen Âge"
      ],
      extensions: [
        {
          id: 73,
          name: "Ars Magica Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/ars-magica-core.jpg"
        },
        {
          id: 74,
          name: "Houses of Hermes",
          price: 34.99,
          type: "Supplément",
          image: "/images/houses-hermes.jpg"
        }
      ],
      image: "/images/ars-magica.jpg",
      type: 'paid'
    },
    34: {
      id: 34,
      name: "RuneQuest",
      publisher: "Chaosium",
      price: 45,
      tags: ["Fantasy", "Payant", "Expert"],
      description: "RuneQuest présente Glorantha avec dieux et magie runique. L'univers explore un monde riche avec des dieux actifs et une magie basée sur les runes. Les personnages naviguent dans un monde de mythologie et de magie.",
      included: [
        "Glorantha",
        "Dieux actifs",
        "Magie runique",
        "Monde riche",
        "Mythologie",
        "Magie"
      ],
      extensions: [
        {
          id: 75,
          name: "RuneQuest Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/runequest-core.jpg"
        },
        {
          id: 76,
          name: "Glorantha Sourcebook",
          price: 39.99,
          type: "Supplément",
          image: "/images/glorantha-sourcebook.jpg"
        }
      ],
      image: "/images/runequest.jpg",
      type: 'paid'
    },
    35: {
      id: 35,
      name: "GURPS",
      publisher: "Steve Jackson Games",
      price: 0,
      tags: ["Générique", "Libres", "Expert"],
      description: "GURPS est un système générique pour tous les univers. Le système peut être adapté à n'importe quel genre et univers. L'univers explore la flexibilité et l'adaptabilité du système de jeu.",
      included: [
        "Système générique",
        "Tous les univers",
        "Adaptabilité",
        "Flexibilité",
        "Système de jeu",
        "Genres variés"
      ],
      extensions: [
        {
          id: 77,
          name: "GURPS Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/gurps-core.jpg"
        },
        {
          id: 78,
          name: "GURPS Fantasy",
          price: 29.99,
          type: "Supplément",
          image: "/images/gurps-fantasy.jpg"
        }
      ],
      image: "/images/gurps.jpg",
      type: 'free'
    },
    36: {
      id: 36,
      name: "Savage Worlds",
      publisher: "Pinnacle Entertainment",
      price: 30,
      tags: ["Générique", "Payant", "Intermédiaire"],
      description: "Savage Worlds est un système rapide pour tous les genres. Le système privilégie la rapidité et l'action. L'univers explore la simplicité et l'efficacité du système de jeu.",
      included: [
        "Système rapide",
        "Tous les genres",
        "Rapidité",
        "Action",
        "Simplicité",
        "Efficacité"
      ],
      extensions: [
        {
          id: 79,
          name: "Savage Worlds Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/savage-worlds-core.jpg"
        },
        {
          id: 80,
          name: "Savage Worlds Fantasy",
          price: 24.99,
          type: "Supplément",
          image: "/images/savage-worlds-fantasy.jpg"
        }
      ],
      image: "/images/savage-worlds.jpg",
      type: 'paid'
    },
    37: {
      id: 37,
      name: "Fate Core",
      publisher: "Evil Hat Productions",
      price: 0,
      tags: ["Générique", "Libres", "Intermédiaire"],
      description: "Fate Core est un système narratif flexible. Le système privilégie la narration et la flexibilité. L'univers explore la créativité et l'adaptabilité du système de jeu.",
      included: [
        "Système narratif",
        "Flexibilité",
        "Narration",
        "Créativité",
        "Adaptabilité",
        "Système de jeu"
      ],
      extensions: [
        {
          id: 81,
          name: "Fate Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/fate-core-rulebook.jpg"
        },
        {
          id: 82,
          name: "Fate System Toolkit",
          price: 24.99,
          type: "Supplément",
          image: "/images/fate-system-toolkit.jpg"
        }
      ],
      image: "/images/fate-core.jpg",
      type: 'free'
    },
    38: {
      id: 38,
      name: "Paranoia",
      publisher: "Mongoose Publishing",
      price: 0,
      tags: ["Comédie & Parodique", "Libres", "Débutant"],
      description: "Paranoia présente Alpha Complex dystopique et paranoïaque. L'univers explore l'absurdité et la paranoïa dans un monde dystopique. Les personnages naviguent dans un monde de bureaucratie et de paranoïa.",
      included: [
        "Alpha Complex",
        "Dystopique",
        "Paranoïaque",
        "Absurdité",
        "Paranoïa",
        "Bureaucratie"
      ],
      extensions: [
        {
          id: 83,
          name: "Paranoia Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/paranoia-core.jpg"
        },
        {
          id: 84,
          name: "Paranoia: Red Clearance",
          price: 29.99,
          type: "Supplément",
          image: "/images/paranoia-red-clearance.jpg"
        }
      ],
      image: "/images/paranoia.jpg",
      type: 'free'
    },
    39: {
      id: 39,
      name: "Toon",
      publisher: "Steve Jackson Games",
      price: 25,
      tags: ["Comédie & Parodique", "Payant", "Débutant"],
      description: "Toon présente un univers cartoon et comique. L'univers explore l'humour et la comédie dans un monde cartoon. Les personnages naviguent dans un monde de gags et de comédie.",
      included: [
        "Univers cartoon",
        "Comique",
        "Humour",
        "Comédie",
        "Monde cartoon",
        "Gags"
      ],
      extensions: [
        {
          id: 85,
          name: "Toon Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/toon-core.jpg"
        },
        {
          id: 86,
          name: "Tooniversal Tour Guide",
          price: 24.99,
          type: "Supplément",
          image: "/images/tooniversal-tour-guide.jpg"
        }
      ],
      image: "/images/toon.jpg",
      type: 'paid'
    },
    40: {
      id: 40,
      name: "Mythras",
      publisher: "The Design Mechanism",
      price: 40,
      tags: ["Fantasy", "Payant", "Expert"],
      description: "Mythras présente un fantasy réaliste et détaillé. L'univers explore le réalisme et le détail dans un monde fantasy. Les personnages naviguent dans un monde de réalisme et de détail.",
      included: [
        "Fantasy réaliste",
        "Détaillé",
        "Réalisme",
        "Détail",
        "Monde fantasy",
        "Réalisme"
      ],
      extensions: [
        {
          id: 87,
          name: "Mythras Core Rulebook",
          price: 0,
          type: "Guide",
          image: "/images/mythras-core.jpg"
        },
        {
          id: 88,
          name: "Mythras Companion",
          price: 34.99,
          type: "Supplément",
          image: "/images/mythras-companion.jpg"
        }
      ],
      image: "/images/mythras.jpg",
      type: 'paid'
    },
    
    // Univers connus
    'known-1': {
      id: 'known-1',
      name: "Forgotten Realms",
      publisher: "Wizards of the Coast",
      price: 0,
      tags: ["Fantasy", "Libres", "Débutant"],
      description: "Forgotten Realms est l'univers fantasy le plus célèbre et le plus développé de Dungeons & Dragons. Centré sur le continent de Faerûn, il offre un monde riche et détaillé avec des centaines de lieux, personnages et histoires. Des villes légendaires comme Waterdeep et Baldur's Gate aux régions sauvages comme la Forêt de Cormyr, Forgotten Realms propose un cadre épique pour toutes sortes d'aventures fantasy.",
      included: [
        "Carte de Faerûn",
        "Guide des royaumes",
        "Personnages légendaires",
        "Organisations et guildes"
      ],
      extensions: [
        {
          id: 101,
          name: "Waterdeep: Dragon Heist",
          price: 29.99,
          type: "Aventure",
          image: "/images/waterdeep-dragon-heist.jpg"
        },
        {
          id: 102,
          name: "Sword Coast Adventurer's Guide",
          price: 49.99,
          type: "Guide",
          image: "/images/sword-coast-guide.jpg"
        },
        {
          id: 103,
          name: "Tasha's Cauldron of Everything",
          price: 49.99,
          type: "Supplément",
          image: "/images/tashas-cauldron.jpg"
        }
      ],
      image: "/images/forgotten-realms.jpg"
    },
    'known-2': {
      id: 'known-2',
      name: "Star Wars",
      publisher: "Fantasy Flight Games",
      price: 0,
      tags: ["Science-fiction", "Libres", "Débutant"],
      description: "La galaxie lointaine de Star Wars offre un univers riche pour des aventures d'exploration, d'espionnage et d'héroïsme. De Coruscant aux confins de l'espace, l'univers Star Wars propose des planètes variées, des espèces multiples et des conflits épiques entre la lumière et les ténèbres.",
      included: [
        "Galaxie explorable",
        "Espèces multiples",
        "Technologies avancées",
        "Force et Jedi"
      ],
      extensions: [
        {
          id: 104,
          name: "Edge of the Empire",
          price: 29.99,
          type: "Aventure",
          image: "/images/edge-empire.jpg"
        },
        {
          id: 105,
          name: "Age of Rebellion",
          price: 29.99,
          type: "Aventure",
          image: "/images/age-rebellion.jpg"
        },
        {
          id: 106,
          name: "Force and Destiny",
          price: 29.99,
          type: "Aventure",
          image: "/images/force-destiny.jpg"
        }
      ],
      image: "/images/star-wars.jpg"
    },
    'known-3': {
      id: 'known-3',
      name: "World of Darkness",
      publisher: "White Wolf",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Intermédiaire"],
      description: "Le Monde des Ténèbres présente un monde moderne sombre où vampires, loups-garous et autres créatures surnaturelles vivent dans l'ombre. L'univers explore les thèmes de la corruption, de la survie et de la lutte contre la nature bestiale.",
      included: [
        "Monde moderne sombre",
        "Créatures surnaturelles",
        "Sociétés secrètes",
        "Horreur urbaine"
      ],
      extensions: [
        {
          id: 107,
          name: "World of Darkness Core Rulebook",
          price: 49.99,
          type: "Guide",
          image: "/images/world-darkness-core.jpg"
        },
        {
          id: 108,
          name: "Vampire: The Masquerade",
          price: 34.99,
          type: "Supplément",
          image: "/images/vampire-masquerade.jpg"
        }
      ],
      image: "/images/world-darkness.jpg"
    },
    'known-4': {
      id: 'known-4',
      name: "Cthulhu Mythos",
      publisher: "Chaosium",
      price: 0,
      tags: ["Horreur & Mystère", "Libres", "Expert"],
      description: "L'univers de Cthulhu explore l'horreur cosmique avec les Grands Anciens et les mystères indicibles. Les investigateurs découvrent des vérités terrifiantes sur la nature de la réalité et l'insignifiance de l'humanité face aux forces cosmiques.",
      included: [
        "Grands Anciens",
        "Horreur cosmique",
        "Investigation",
        "Mystères indicibles"
      ],
      extensions: [
        {
          id: 109,
          name: "Call of Cthulhu Core Rulebook",
          price: 49.99,
          type: "Guide",
          image: "/images/call-cthulhu-core.jpg"
        },
        {
          id: 110,
          name: "Masks of Nyarlathotep",
          price: 59.99,
          type: "Aventure",
          image: "/images/masks-nyarlathotep.jpg"
        }
      ],
      image: "/images/cthulhu-mythos.jpg"
    }
  };

  const handleExtensionToggle = (extensionId) => {
    setSelectedExtensions(prev => 
      prev.includes(extensionId) 
        ? prev.filter(id => id !== extensionId)
        : [...prev, extensionId]
    );
  };

  const handleExtensionClick = (extension) => {
    handleExtensionToggle(extension.id);
  };

  const calculateTotal = () => {
    if (!universe) return 0;
    // Pour les éléments possédés, le prix de base est 0
    const basePrice = universe.type === 'owned' ? 0 : (universe.price || 0);
    const extensionsPrice = selectedExtensions.reduce((total, extId) => {
      const extension = universe.extensions.find(ext => ext.id === extId);
      return total + (extension ? extension.price : 0);
    }, 0);
    return Math.round((basePrice + extensionsPrice) * 100) / 100; // ✅ Arrondi à 2 décimales
  };

  const handleUseUniverse = () => {
    // Stocker l'univers sélectionné et retourner à la création de campagne
    const selectedData = {
      id: universe.id,
      name: universe.name,
      publisher: universe.publisher,
      price: universe.price,
      type: universe.type,
      image: universe.image,
      description: universe.description,
      totalPrice: total,
      extensions: selectedExtensions.map(extId => 
        universe.extensions.find(ext => ext.id === extId)
      ).filter(Boolean)
    };
    sessionStorage.setItem('selectedUniverse', JSON.stringify(selectedData));
    navigate('/campaigns/create');
  };

  useEffect(() => {
    console.log('🔍 UniverseDetails useEffect - ID reçu:', id);
    console.log('🔍 Type de ID:', typeof id);
    
    const data = universeData[id];
    console.log('🔍 Données trouvées:', data);
    
    if (data) {
      console.log('✅ Univers trouvé, chargement des données');
      setUniverse(data);
    } else {
      console.error('❌ Univers non trouvé avec ID:', id);
      console.log('🔍 IDs disponibles:', Object.keys(universeData));
      // Rediriger vers la page de sélection si l'univers n'existe pas
      navigate('/campaigns/create/universe');
    }
  }, [id, navigate]);

  if (!universe) {
    return (
      <div className="min-h-screen bg-primary-blue">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-light text-xl">Univers non trouvé</div>
        </div>
      </div>
    );
  }

  // Recalculer le total à chaque rendu pour assurer la mise à jour dynamique
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-primary-blue">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-12">
      {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-light/80 mb-6">
          <button 
            onClick={() => navigate('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
          <span>›</span>
          <button 
            onClick={() => navigate('/campaigns/create')}
            className="hover:text-light transition-colors"
          >
            Créer une campagne
          </button>
          <span>›</span>
          <button 
            onClick={() => navigate('/campaigns/create/universe')}
            className="hover:text-light transition-colors"
          >
            Choix d'univers
          </button>
          <span>›</span>
          <span className="text-light">Détails</span>
      </div>

        {/* Titre et éditeur */}
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
              <div className="border border-white w-full h-full bg-cover bg-center rounded" 
                   style={{ backgroundImage: `url(${universe.image})` }}>
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
                    <span key={index} className="bg-golden text-dark px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-light/90 leading-relaxed text-sm">{universe.description}</p>
            </div>

            {/* Section Contenu inclus */}
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

            {/* Section Caractéristiques de l'univers */}
            {universe.features && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Caractéristiques de l'univers</h4>
                <ul className="space-y-2">
                  {universe.features.map((feature, index) => (
                    <li key={index} className="text-light/80 flex items-start text-sm">
                      <span className="text-golden mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section Suppléments facultatifs */}
            {universe.extensions && universe.extensions.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-light eagle-lake-font mb-4">Achats facultatifs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {universe.extensions.map(extension => {
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
                {universe.type === 'owned' ? (
                   selectedExtensions.length > 0 ? `${total} €` : "Déjà possédé"
                ) : (
                  total > 0 ? `${total} €` : "Gratuit"
                )}
                  </div>
              <button
                onClick={handleUseUniverse}
                className="bg-golden hover:bg-golden/80 text-dark-blue px-8 py-3 rounded-lg font-bold transition-colors"
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
