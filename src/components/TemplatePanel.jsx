import React, { useState, useEffect, useRef } from 'react';
import TemplateTab from './TemplateTab';
import NewEventPanel from './NewEventPanel';
import ConsultationTemplatePanel from './ConsultationTemplatePanel';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Search, 
  Filter, 
  ArrowUpDown, 
  Copy, 
  Edit,
  Archive, 
  Plus,
  Star,
  X,
  ArrowLeft,
  Tag
} from 'lucide-react';

const TemplatePanel = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('templates'); // 'templates', 'new-event', ou 'consultation'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const panelRef = useRef(null);

  // États pour le menu d'insertion rapide avec /
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [slashMenuSearch, setSlashMenuSearch] = useState('');
  const [selectedSlashMenuItem, setSelectedSlashMenuItem] = useState(0);

  // États pour les notifications toast
  const [toast, setToast] = useState(null);

  // États pour le formulaire de nouvelle quête
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestCategory, setNewQuestCategory] = useState('');
  const [newQuestLocation, setNewQuestLocation] = useState('');
  const [newQuestStartPoint, setNewQuestStartPoint] = useState('');
  const [newQuestDestination, setNewQuestDestination] = useState('');
  const [newQuestSponsor, setNewQuestSponsor] = useState('');
  const [newQuestRewards, setNewQuestRewards] = useState('');
  const [newQuestDescription, setNewQuestDescription] = useState('');
  
  // États pour l'édition des quêtes
  const [editingQuestTitle, setEditingQuestTitle] = useState(null);
  const [editingQuestCount, setEditingQuestCount] = useState(null);

  // États pour l'édition du template marchand
  const [editingMerchantTemplate, setEditingMerchantTemplate] = useState(null);
  const [merchantTemplateData, setMerchantTemplateData] = useState({
    title: 'Nouvelle rencontre',
    content: 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
    npc: 'Marcus le Marchand',
    location: 'Marché local',
    inventory: []
  });

  // États pour la gestion de l'inventaire du marchand
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);
  const [newInventoryItem, setNewInventoryItem] = useState({ name: '', price: 0 });

  // États pour l'édition du template combat simple
  const [editingCombatTemplate, setEditingCombatTemplate] = useState(null);
  const [combatTemplateData, setCombatTemplateData] = useState({
    title: 'Combat simple',
    content: 'Une embuscade tendue par des brigands sur la route forestière. Les bandits, motivés par la cupidité, attaquent sans pitié avec leurs armes de fortune. Un combat rapide mais intense s\'engage.',
    enemies: [
      { name: 'Bandit', hp: 15, ac: 12, attack: '+3', damage: '1d6+1' },
      { name: 'Chef bandit', hp: 25, ac: 14, attack: '+5', damage: '1d8+2' }
    ],
    location: 'Route forestière',
    difficulty: 'Facile',
    rewards: '2d6 pièces d\'or, potion de soins mineure'
  });

  // Fonction pour afficher une notification toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fonction pour gérer la sélection et copie automatique
  const handleLineSelection = (elementType, elementId, elementName) => {
    // Copier automatiquement l'élément sélectionné
    copyElementLink(elementType, elementId, elementName);
  };

  // Éléments du menu d'insertion rapide pour le panel templates
  const slashMenuItems = [
    // Templates de base
    { id: 'slash-character', type: 'character', name: 'Personnage', icon: '👤', description: 'Créer un nouveau personnage', category: 'Templates' },
    { id: 'slash-object', type: 'object', name: 'Objet', icon: '⚔️', description: 'Créer un nouvel objet', category: 'Templates' },
    { id: 'slash-location', type: 'location', name: 'Lieu', icon: '🏰', description: 'Créer un nouveau lieu', category: 'Templates' },
    { id: 'slash-quest', type: 'quest', name: 'Quête', icon: '📜', description: 'Créer une nouvelle quête', category: 'Templates' },
    
    // Événements
    { id: 'slash-encounter', type: 'encounter', name: 'Rencontre', icon: '⚔️', description: 'Événement de combat', category: 'Événements' },
    { id: 'slash-trap', type: 'trap', name: 'Piège', icon: '🕳️', description: 'Danger caché', category: 'Événements' },
    { id: 'slash-puzzle', type: 'puzzle', name: 'Énigme', icon: '🧩', description: 'Défi intellectuel', category: 'Événements' },
    
    // Navigation
    { id: 'slash-consultation', type: 'consultation', name: 'Consultation', icon: '📖', description: 'Ouvrir la consultation', category: 'Navigation' },
    { id: 'slash-new-event', type: 'new-event', name: 'Nouvel événement', icon: '➕', description: 'Créer un nouvel événement', category: 'Navigation' },
    { id: 'slash-page', type: 'page', name: 'Page', icon: '📄', description: 'Insérer une mention de page', category: 'Navigation' },
    
    // Actions
    { id: 'slash-copy', type: 'copy', name: 'Copier', icon: '📋', description: 'Copier un élément', category: 'Actions' },
    { id: 'slash-paste', type: 'paste', name: 'Coller', icon: '📄', description: 'Coller un élément copié', category: 'Actions' }
  ];
  
  // Tags prédéfinis pour les objets (supprimés - seuls les tags personnalisés sont disponibles)
  const objectPredefinedTags = [];
  
  // États pour Personnages (similaires aux Objets)
  const [characterCategories, setCharacterCategories] = useState([
    {
      id: 'perso-aventuriers',
      title: 'Aventuriers',
      isExpanded: true,
      characters: [
        { id: 'char-1', name: 'Elandra', level: '5', class: 'Mage', tags: ['Quête', 'Arkanix'], isFavorite: true, isArchived: false, description: '' },
        { id: 'char-2', name: 'Thorin', level: '4', class: 'Guerrier', tags: ['Combat'], isFavorite: false, isArchived: false, description: '' },
        { id: 'char-3', name: 'Lyra', level: '3', class: 'Rôdeuse', tags: ['Exploration'], isFavorite: true, isArchived: false, description: '' },
        { id: 'char-4', name: 'Merric', level: '2', class: 'Voleur', tags: ['Social'], isFavorite: false, isArchived: true, description: '' }
      ]
    },
    {
      id: 'perso-allies',
      title: 'Alliés',
      isExpanded: true,
      characters: [
        { id: 'char-5', name: 'Seraphine', level: '6', class: 'Clerc', tags: ['Soins'], isFavorite: false, isArchived: false, description: '' },
        { id: 'char-6', name: 'Korgan', level: '5', class: 'Barbare', tags: ['Combat'], isFavorite: false, isArchived: false, description: '' },
        { id: 'char-7', name: 'Alistair', level: '4', class: 'Paladin', tags: ['Combat', 'Quête'], isFavorite: true, isArchived: false, description: '' },
        { id: 'char-8', name: 'Nymeria', level: '3', class: 'Druide', tags: ['Nature'], isFavorite: false, isArchived: true, description: '' }
      ]
    },
    {
      id: 'perso-adversaires',
      title: 'Adversaires',
      isExpanded: true,
      characters: [
        { id: 'char-9', name: 'Vargash', level: '7', class: 'Sorcier', tags: ['Boss'], isFavorite: false, isArchived: false, description: '' },
        { id: 'char-10', name: 'Kael', level: '5', class: 'Assassin', tags: ['Combat'], isFavorite: false, isArchived: false, description: '' },
        { id: 'char-11', name: 'Oona', level: '4', class: 'Chaman', tags: ['Totems'], isFavorite: true, isArchived: false, description: '' },
        { id: 'char-12', name: 'Darius', level: '6', class: 'Chevalier noir', tags: ['Combat'], isFavorite: false, isArchived: false, description: '' }
      ]
    }
  ]);
  const [characterSelectedFilter, setCharacterSelectedFilter] = useState('aucun');
  const [characterSelectedSort, setCharacterSelectedSort] = useState('aucun');
  const [characterShowSearchInput, setCharacterShowSearchInput] = useState(false);
  const [characterSearchTerm, setCharacterSearchTerm] = useState('');
  const [characterCurrentView, setCharacterCurrentView] = useState('characters'); // 'characters' | 'new-character' | 'consultation'
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterActiveTab, setCharacterActiveTab] = useState('biographie');
  
  // Formulaire Nouveau personnage
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterDescription, setNewCharacterDescription] = useState('');
  const [newCharacterCategory, setNewCharacterCategory] = useState('');
  const [newCharacterLevel, setNewCharacterLevel] = useState('');
  const [newCharacterClass, setNewCharacterClass] = useState('');
  const [newCharacterTags, setNewCharacterTags] = useState([]);
  const [newCharacterTag, setNewCharacterTag] = useState('');
  const [newCharacterAlignment, setNewCharacterAlignment] = useState('');
  const [newCharacterDivinity, setNewCharacterDivinity] = useState('');
  const [newCharacterFirstName, setNewCharacterFirstName] = useState('');
  const [newCharacterLastName, setNewCharacterLastName] = useState('');
  const [newCharacterSpecies, setNewCharacterSpecies] = useState('');
  const [newCharacterGender, setNewCharacterGender] = useState('');
  const [newCharacterAge, setNewCharacterAge] = useState('');
  const [newCharacterHeight, setNewCharacterHeight] = useState('');
  const [newCharacterJob, setNewCharacterJob] = useState('');
  const [newCharacterXP, setNewCharacterXP] = useState('');
  const [newCharacterAffiliations, setNewCharacterAffiliations] = useState('');
  const [selectedAttributionId, setSelectedAttributionId] = useState(null);
  
  // États pour la consultation de personnage
  const [consultationPrimaryStats, setConsultationPrimaryStats] = useState(() => {
    const saved = localStorage.getItem('lore-characters-primary-stats');
    return saved ? JSON.parse(saved) : {
      corps: 50,
      relationnel: 50,
      esprit: 50
    };
  });
  const [consultationSecondaryStats, setConsultationSecondaryStats] = useState(() => {
    const saved = localStorage.getItem('lore-characters-secondary-stats');
    return saved ? JSON.parse(saved) : {
      pvMax: 100,
      pvActuels: 100,
      resistance: 10,
      nbRecupJour: 3,
      nbRecupActuel: 3,
      valeurRecup: 10
    };
  });
  const [consultationSkills, setConsultationSkills] = useState(() => {
    const saved = localStorage.getItem('lore-characters-skills');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Combat', value: 5 },
      { id: 2, name: 'Magie', value: 3 },
      { id: 3, name: 'Discrétion', value: 7 },
      { id: 4, name: 'Persuasion', value: 4 }
    ];
  });
  const [consultationInventory, setConsultationInventory] = useState(() => {
    const saved = localStorage.getItem('lore-characters-inventory');
    return saved ? JSON.parse(saved) : [
      { id: 1, label: 'Épée longue', tags: ['arme', 'métal'], objectId: 'epee-longue' },
      { id: 2, label: 'Armure de cuir', tags: ['défense'], objectId: 'armure-cuir' },
      { id: 3, label: 'Potion de santé', tags: ['consommable', 'magie'], objectId: 'potion-sante' },
      { id: 4, label: 'Anneau de pouvoir', tags: ['magie'], objectId: 'anneau-pouvoir' }
    ];
  });
  
  // Edition de catégories et tags Personnages
  const [editingCharacterCategory, setEditingCharacterCategory] = useState(null);
  const [characterCategoryDropdownOpen, setCharacterCategoryDropdownOpen] = useState(null);
  const [editingCharacterTagsId, setEditingCharacterTagsId] = useState(null);
  const [editingCharacterTagInput, setEditingCharacterTagInput] = useState('');
  
  const AttributionList = () => {
    const entries = [
      { id: 'player-1', name: 'Elandra', avatar: '🧝‍♀️' },
      { id: 'player-2', name: 'Kael', avatar: '🧙‍♂️' },
      { id: 'player-3', name: 'Mira', avatar: '🏹' },
      { id: 'player-4', name: 'Thoren', avatar: '🛡️' },
      { id: 'player-5', name: 'Selwyn', avatar: '🗡️' },
      { id: 'player-6', name: 'Ilyana', avatar: '🔮' }
    ];

    return (
      <div className="space-y-3">
        {entries.map(entry => (
          <div key={entry.id} className="flex items-center justify-between bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">{entry.avatar}</div>
              <span className="text-[#552E1A]">{entry.name}</span>
            </div>
            <button
              onClick={() => setSelectedAttributionId(entry.id)}
              className="w-5 h-5 rounded-full border border-[#552E1A]/60 flex items-center justify-center"
              aria-pressed={selectedAttributionId === entry.id}
              title="Sélectionner"
            >
              {selectedAttributionId === entry.id ? (
                <span className="w-2.5 h-2.5 rounded-full bg-[#552E1A]"></span>
              ) : null}
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Utilitaires Personnages
  const getFilteredAndSortedCharacters = () => {
    let list = characterCategories.map(cat => ({ ...cat }));
    // Recherche
    if (characterSearchTerm.trim()) {
      const q = characterSearchTerm.toLowerCase();
      list = list
        .map(cat => ({
          ...cat,
          characters: cat.characters.filter(c =>
            c.name.toLowerCase().includes(q) ||
            (c.class || '').toLowerCase().includes(q) ||
            (c.tags || []).some(t => t.toLowerCase().includes(q))
          )
        }))
        .filter(cat => cat.characters.length > 0);
    }
    // Filtres favoris/archives
    if (characterSelectedFilter === 'favoris') {
      list = list.map(cat => ({
        ...cat,
        characters: cat.characters.filter(c => c.isFavorite && !c.isArchived)
      })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'archives') {
      list = list.map(cat => ({
        ...cat,
        characters: cat.characters.filter(c => c.isArchived)
      })).filter(cat => cat.characters.length > 0);
    }
    // Filtres supplémentaires
    if (characterSelectedFilter === 'haut-niveau') {
      list = list.map(cat => ({
        ...cat,
        characters: cat.characters.filter(c => parseInt(c.level || '0', 10) >= 5)
      })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'classe-combat') {
      const combatClasses = ['guerrier', 'barbare', 'paladin', 'rôdeur', 'rodeur', 'moine'];
      list = list.map(cat => ({
        ...cat,
        characters: cat.characters.filter(c => combatClasses.includes((c.class || '').toLowerCase()))
      })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'categorie-aventuriers') {
      list = list.map(cat => ({ ...cat, characters: cat.id === 'perso-aventuriers' ? cat.characters : [] })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'categorie-allies') {
      list = list.map(cat => ({ ...cat, characters: cat.id === 'perso-allies' ? cat.characters : [] })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'categorie-adversaires') {
      list = list.map(cat => ({ ...cat, characters: cat.id === 'perso-adversaires' ? cat.characters : [] })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter?.startsWith('classe-')) {
      const cls = characterSelectedFilter.replace('classe-', '').toLowerCase();
      list = list.map(cat => ({
        ...cat,
        characters: cat.characters.filter(c => (c.class || '').toLowerCase() === cls)
      })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter?.startsWith('tag-')) {
      const tag = characterSelectedFilter.replace('tag-', '').toLowerCase();
      list = list.map(cat => ({
        ...cat,
        characters: cat.characters.filter(c => (c.tags || []).some(t => t.toLowerCase() === tag))
      })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'niveau-1-3') {
      list = list.map(cat => ({ ...cat, characters: cat.characters.filter(c => { const n = parseInt(c.level || '0', 10); return n >= 1 && n <= 3; }) })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'niveau-4-6') {
      list = list.map(cat => ({ ...cat, characters: cat.characters.filter(c => { const n = parseInt(c.level || '0', 10); return n >= 4 && n <= 6; }) })).filter(cat => cat.characters.length > 0);
    } else if (characterSelectedFilter === 'niveau-7-plus') {
      list = list.map(cat => ({ ...cat, characters: cat.characters.filter(c => parseInt(c.level || '0', 10) >= 7) })).filter(cat => cat.characters.length > 0);
    }
    // Tri de base par nom
    if (characterSelectedSort === 'nom-asc') {
      list.forEach(cat => cat.characters.sort((a, b) => a.name.localeCompare(b.name)));
    } else if (characterSelectedSort === 'nom-desc') {
      list.forEach(cat => cat.characters.sort((a, b) => b.name.localeCompare(a.name)));
    } else if (characterSelectedSort === 'niveau-asc') {
      list.forEach(cat => cat.characters.sort((a, b) => (parseInt(a.level || '0', 10) - parseInt(b.level || '0', 10))));
    } else if (characterSelectedSort === 'niveau-desc') {
      list.forEach(cat => cat.characters.sort((a, b) => (parseInt(b.level || '0', 10) - parseInt(a.level || '0', 10))));
    }
    return list;
  };


  const addTagToCharacter = (categoryId, characterId, tag) => {
    const t = (tag || '').trim();
    if (!t) return;
    setCharacterCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        characters: cat.characters.map(ch => ch.id === characterId ? { ...ch, tags: Array.from(new Set([...(ch.tags || []), t])) } : ch)
      };
    }));
  };

  const removeTagFromCharacter = (categoryId, characterId, tag) => {
    if (!confirm(`Supprimer le tag "${tag}" ?`)) return;
    setCharacterCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        characters: cat.characters.map(ch => ch.id === characterId ? { ...ch, tags: (ch.tags || []).filter(t => t !== tag) } : ch)
      };
    }));
  };

  const openCharacterConsultation = (character) => {
    setSelectedCharacter(character);
    setCharacterCurrentView('consultation');
  };

  const createNewCharacter = () => {
    if (!newCharacterName.trim() || !newCharacterCategory) return;
    const character = {
      id: `char-${Date.now()}`,
      name: newCharacterName,
      description: newCharacterDescription,
      level: newCharacterLevel,
      class: newCharacterClass,
      tags: newCharacterTags.filter(t => t.trim() !== '')
    };
    setCharacterCategories(prev => prev.map(cat =>
      cat.id === newCharacterCategory ? { ...cat, characters: [...cat.characters, character] } : cat
    ));
    setSelectedCharacter(character);
    setCharacterCurrentView('consultation');
  };

  const cancelNewCharacter = () => {
    setNewCharacterName('');
    setNewCharacterDescription('');
    setNewCharacterCategory('');
    setNewCharacterLevel('');
    setNewCharacterClass('');
    setNewCharacterTags([]);
    setNewCharacterTag('');
    setSelectedCharacter(null);
    setCharacterCurrentView('characters');
  };

  const createNewCharacterCategory = () => {
    const categoryName = prompt('Nom de la nouvelle catégorie :');
    if (categoryName && categoryName.trim()) {
      const newCategory = {
        id: `perso-${Date.now()}`,
        title: categoryName.trim(),
        isExpanded: true,
        characters: []
      };
      setCharacterCategories(prev => [...prev, newCategory]);
    }
  };
  
  // États pour les sections collapsibles
  const [expandedSections, setExpandedSections] = useState(() => {
    const saved = localStorage.getItem('lore-templates-expanded-sections');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      'modeles-simples': true,
      'quete-principale': true,
      'cite-arcanix': true,
      'zilargo': true,
      'rencontres-aleatoires': true
    };
  });

  // États pour les filtres et recherche
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const saved = localStorage.getItem('lore-templates-selected-filter');
    return saved || 'aucun';
  });
  const [selectedSort, setSelectedSort] = useState(() => {
    const saved = localStorage.getItem('lore-templates-selected-sort');
    return saved || 'aucun';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  // États pour les fonctionnalités avancées
  const [categories, setCategories] = useState(() => {
    // Forcer la réinitialisation pour restaurer toutes les catégories
    localStorage.removeItem('lore-templates-categories');
    
    return [
      { id: 'modeles-simples', name: 'Modèles simples', isEditable: false, isArchived: false },
      { id: 'quete-principale', name: 'Quête principale', isEditable: true, isArchived: false },
      { id: 'zilargo', name: 'Zilargo', isEditable: true, isArchived: false },
      { id: 'rencontres-aleatoires', name: 'Rencontres aléatoires', isEditable: true, isArchived: false }
    ];
  });
  
  // Effet pour s'assurer que "Quête principale" est toujours présente
  useEffect(() => {
    setCategories(prev => {
      const hasQuetePrincipale = prev.some(cat => cat.id === 'quete-principale');
      if (!hasQuetePrincipale) {
        // Ajouter "Quête principale" si elle n'existe pas
        console.log('Restoration de "Quête principale"');
        return [...prev, { id: 'quete-principale', name: 'Quête principale', isEditable: true, isArchived: false }];
      }
      return prev;
    });
  }, []);

  // Effet pour forcer la restauration de "Quête principale" (temporaire)
  useEffect(() => {
    setCategories(prev => {
      const quetePrincipale = prev.find(cat => cat.id === 'quete-principale');
      if (!quetePrincipale) {
        console.log('Force restoration de "Quête principale"');
        return [...prev, { id: 'quete-principale', name: 'Quête principale', isEditable: true, isArchived: false }];
      }
      return prev;
    });
  }, []);

  // Effet pour nettoyer les doublons de templates
  useEffect(() => {
    setTemplates(prev => {
      // Supprimer les doublons basés sur l'ID
      const uniqueTemplates = prev.filter((template, index, self) => 
        index === self.findIndex(t => t.id === template.id)
      );
      
      // Si on a supprimé des doublons, retourner la liste nettoyée
      if (uniqueTemplates.length !== prev.length) {
        console.log('Doublons de templates supprimés');
        return uniqueTemplates;
      }
      
      return prev;
    });
  }, []);

  // Gérer les clics extérieurs pour fermer le panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Fonctions pour le menu d'insertion rapide
  const handleSlashCommand = (e) => {
    if (e.key === '/' && e.target.textContent === '') {
      e.preventDefault();
      setSlashMenuPosition({ x: e.clientX, y: e.clientY });
      setShowSlashMenu(true);
      setSlashMenuSearch('');
      setSelectedSlashMenuItem(0);
    }
  };

  const handleSlashMenuSelect = (item) => {
    if (item.type === 'consultation') {
      // Navigation vers la page de consultation générale selon l'onglet actif
      if (activeTab === 'characters') {
        setCharacterCurrentView('consultation');
      } else if (activeTab === 'objects') {
        setObjectCurrentView('consultation');
      } else if (activeTab === 'locations') {
        setLocationCurrentView('consultation');
      } else if (activeTab === 'quests') {
        setQuestCurrentView('consultation');
      }
      setShowSlashMenu(false);
    } else if (item.type === 'new-event') {
      setCurrentView('new-event');
      setShowSlashMenu(false);
    } else if (item.type === 'page') {
      // Insérer une mention de page dans le textarea
      insertPageMention();
      setShowSlashMenu(false);
    } else if (item.type === 'copy') {
      // Copier un élément (nécessite une sélection)
      console.log('Copier un élément - nécessite une sélection');
      setShowSlashMenu(false);
    } else if (item.type === 'paste') {
      // Coller un élément copié
      pasteElement();
      setShowSlashMenu(false);
    } else {
      // Créer un nouveau template
      createNewTemplate(item.type);
      setShowSlashMenu(false);
    }
  };

  // Fonction pour insérer une mention de page dans le textarea
  const insertPageMention = () => {
    // Trouver le textarea actif
    const activeTextarea = document.activeElement;
    if (activeTextarea && activeTextarea.tagName === 'TEXTAREA') {
      // Insérer une mention de page
      const pageMention = '[Page: Nom de la page]';
      const start = activeTextarea.selectionStart;
      const end = activeTextarea.selectionEnd;
      const text = activeTextarea.value;
      const newText = text.substring(0, start) + pageMention + text.substring(end);
      
      // Mettre à jour la valeur du textarea
      activeTextarea.value = newText;
      
      // Déclencher l'événement onChange
      const event = new Event('input', { bubbles: true });
      activeTextarea.dispatchEvent(event);
      
      // Repositionner le curseur après la mention
      const newPosition = start + pageMention.length;
      activeTextarea.setSelectionRange(newPosition, newPosition);
      activeTextarea.focus();
    }
  };

  // Fonction pour copier le lien d'un élément
  const copyElementLink = (elementType, elementId, elementName) => {
    const link = `${window.location.origin}/templates/${elementType}/${elementId}`;
    
    // Stocker l'élément copié pour le système de copier-coller
    const copiedElement = {
      type: elementType,
      id: elementId,
      name: elementName,
      link: link
    };
    localStorage.setItem('lore-copied-element', JSON.stringify(copiedElement));
    
    console.log('=== COPIE DÉBOGAGE ===');
    console.log('Élément copié:', copiedElement);
    console.log('Stocké dans localStorage:', localStorage.getItem('lore-copied-element'));
    
    // Essayer de copier dans le presse-papier (seulement le nom)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(elementName).then(() => {
        console.log(`Nom copié dans le presse-papier: ${elementName}`);
        showToast(`Lien de "${elementName}" copié !`, 'success');
      }).catch(err => {
        console.error('Erreur lors de la copie dans le presse-papier:', err);
        showToast(`Erreur lors de la copie du lien de "${elementName}"`, 'error');
      });
    } else {
      // Fallback si navigator.clipboard n'est pas disponible
      console.log(`Nom généré: ${elementName}`);
      showToast(`Lien de "${elementName}" généré (copiez manuellement)`, 'warning');
    }
  };

  // Fonction pour coller un élément copié
  const pasteElement = () => {
    console.log('=== COLLAGE DÉBOGAGE ===');
    const copiedElement = localStorage.getItem('lore-copied-element');
    console.log('Élément copié trouvé:', copiedElement);
    
    if (copiedElement) {
      try {
        const element = JSON.parse(copiedElement);
        console.log('Élément parsé:', element);
        
        const activeTextarea = document.activeElement;
        console.log('Textarea actif:', activeTextarea);
        console.log('Tag du textarea:', activeTextarea?.tagName);
        
        if (activeTextarea && activeTextarea.tagName === 'TEXTAREA') {
          // Insérer directement le nom de l'élément (sans format markdown)
          const mention = element.name;
          console.log('Mention à insérer:', mention);
          
          const start = activeTextarea.selectionStart;
          const end = activeTextarea.selectionEnd;
          const text = activeTextarea.value;
          const newText = text.substring(0, start) + mention + text.substring(end);
          
          console.log('Texte avant:', text);
          console.log('Texte après:', newText);
          
          activeTextarea.value = newText;
          const event = new Event('input', { bubbles: true });
          activeTextarea.dispatchEvent(event);
          
          const newPosition = start + mention.length;
          activeTextarea.setSelectionRange(newPosition, newPosition);
          activeTextarea.focus();
          
          // Stocker les informations du lien pour le rendu
          const linkInfo = {
            text: element.name,
            url: element.link,
            start: start,
            end: start + mention.length
          };
          
          // Stocker dans localStorage pour le dashboard
          const existingLinks = JSON.parse(localStorage.getItem('lore-dashboard-links') || '[]');
          existingLinks.push(linkInfo);
          localStorage.setItem('lore-dashboard-links', JSON.stringify(existingLinks));
          
          console.log('Lien stocké pour le dashboard:', linkInfo);
          showToast(`Élément "${element.name}" collé !`, 'success');
        } else {
          console.log('Aucun textarea actif trouvé');
          showToast('Veuillez cliquer dans un champ de texte avant de coller.', 'warning');
        }
      } catch (error) {
        console.error('Erreur lors du collage:', error);
        showToast('Erreur lors du collage de l\'élément.', 'error');
      }
    } else {
      console.log('Aucun élément copié trouvé dans localStorage');
      showToast('Aucun élément copié trouvé. Copiez d\'abord un élément avec le bouton "Copier le lien".', 'warning');
    }
  };

  // Fonction pour naviguer vers une page de consultation (utilisée pour l'insertion via menu /)
  const navigateToConsultationPage = (pageType, pageId) => {
    // Cette fonction est utilisée quand on insère une mention de page via le menu /
    // Par exemple, si on tape "/page" et qu'on sélectionne une page spécifique
    console.log(`Insertion de page via menu /: ${pageType} - ${pageId}`);
    // Ici vous pouvez ajouter la logique pour insérer une mention de page dans le textarea
    // ou créer un lien vers la page de consultation
  };

  const createNewTemplate = (type) => {
    // Logique pour créer un nouveau template selon le type
    console.log(`Création d'un nouveau template de type: ${type}`);
    // Ici vous pouvez ajouter la logique spécifique pour chaque type de template
  };

  // Filtrer les éléments du menu d'insertion rapide
  const filteredSlashItems = slashMenuItems.filter(item => 
    item.name.toLowerCase().includes(slashMenuSearch.toLowerCase()) ||
    item.description.toLowerCase().includes(slashMenuSearch.toLowerCase())
  );

  // Gestion des raccourcis clavier pour le menu d'insertion rapide
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showSlashMenu) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedSlashMenuItem(prev => Math.min(prev + 1, filteredSlashItems.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedSlashMenuItem(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredSlashItems[selectedSlashMenuItem]) {
            handleSlashMenuSelect(filteredSlashItems[selectedSlashMenuItem]);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowSlashMenu(false);
        } else if (e.key.length === 1) {
          // Ajouter le caractère à la recherche
          setSlashMenuSearch(prev => prev + e.key);
          setSelectedSlashMenuItem(0);
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          setSlashMenuSearch(prev => prev.slice(0, -1));
          setSelectedSlashMenuItem(0);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSlashMenu, selectedSlashMenuItem, filteredSlashItems]);
  
  const [templates, setTemplates] = useState(() => {
    // Forcer la réinitialisation pour restaurer tous les templates
    localStorage.removeItem('lore-templates-data');
    
    return [
      { id: 'combat-simple', name: 'Combat simple', category: 'modeles-simples', isEditable: true, isFavorite: false, isArchived: false },
      { id: 'marchand', name: 'Rencontre avec un\nmarchand', category: 'modeles-simples', isEditable: true, isFavorite: false, isArchived: false },
      { id: 'bataille-arcanix', name: 'Bataille d\'Arcanix', category: 'quete-principale', subcategory: 'cite-arcanix', isEditable: true, isFavorite: false, isArchived: false },
      { id: 'academie-mages', name: 'Arrivée à l\'Académie des mages', category: 'quete-principale', subcategory: 'cite-arcanix', isEditable: true, isFavorite: false, isArchived: false },
      { id: 'marchand-potions', name: 'Rencontre avec un marchand de potions', category: 'quete-principale', subcategory: 'cite-arcanix', isEditable: true, isFavorite: false, isArchived: false }
    ];
  });

  const [subcategories, setSubcategories] = useState(() => {
    const saved = localStorage.getItem('lore-templates-subcategories');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 'cite-arcanix', name: 'Cité d\'Arcanix', category: 'quete-principale', isEditable: true }
    ];
  });

  const [editingSubcategory, setEditingSubcategory] = useState(() => {
    const saved = localStorage.getItem('lore-templates-editing-subcategory');
    return saved ? JSON.parse(saved) : null;
  });

  const [editingCategory, setEditingCategory] = useState(() => {
    const saved = localStorage.getItem('lore-templates-editing-category');
    return saved ? JSON.parse(saved) : null;
  });

  // États pour la page Objets
  const [objectSelectedFilter, setObjectSelectedFilter] = useState('aucun');
  const [objectSelectedSort, setObjectSelectedSort] = useState('aucun');
  const [objectSearchTerm, setObjectSearchTerm] = useState('');
  const [objectShowSearchInput, setObjectShowSearchInput] = useState(false);
  const [editingObjectCategory, setEditingObjectCategory] = useState(null);
  const [objectCategoryDropdownOpen, setObjectCategoryDropdownOpen] = useState(null);
  const [objectCurrentView, setObjectCurrentView] = useState('objects'); // 'objects' ou 'new-object'
  const [selectedObject, setSelectedObject] = useState(null);
  
  // États pour le formulaire de création d'objet
  const [newObjectName, setNewObjectName] = useState('');
  const [newObjectDescription, setNewObjectDescription] = useState('');
  const [newObjectCategory, setNewObjectCategory] = useState('');
  const [newObjectLevel, setNewObjectLevel] = useState('');
  const [newObjectAlteration, setNewObjectAlteration] = useState('');
  const [newObjectTags, setNewObjectTags] = useState(['Tag', 'Tag', 'Tag', 'Tag', 'Tag']); // Tags par défaut comme dans l'image
  const [newObjectTag, setNewObjectTag] = useState('');

  // Effet pour ouvrir automatiquement les catégories lors de la recherche
  React.useEffect(() => {
    if (objectSearchTerm.trim()) {
      setObjectCategories(prev => prev.map(cat => ({ ...cat, isExpanded: true })));
    }
  }, [objectSearchTerm]);

  // Effet pour fermer le dropdown de catégorie quand on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (objectCategoryDropdownOpen && !event.target.closest('.relative')) {
        setObjectCategoryDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [objectCategoryDropdownOpen]);


  // Fonction pour créer une nouvelle catégorie d'objets
  const createNewObjectCategory = () => {
    const newCategory = {
      id: `category-${Date.now()}`,
      title: 'Nouvelle catégorie',
      isExpanded: true,
      objects: []
    };
    setObjectCategories(prev => [...prev, newCategory]);
    setEditingObjectCategory(newCategory.id);
  };

  // Fonctions pour la création d'objet
  const createNewObject = () => {
    if (!newObjectName.trim() || !newObjectCategory) return;
    
    const isEditing = selectedObject && objectCurrentView === 'new-object';
    
    const objectData = {
      id: isEditing ? selectedObject.id : `object-${Date.now()}`,
      name: newObjectName,
      description: newObjectDescription,
      level: newObjectLevel,
      alteration: newObjectAlteration,
      tags: newObjectTags.filter(tag => tag.trim() !== ''), // Filtrer les tags vides
      image: '/images/objects/placeholder.svg',
      type: 'objet',
      rarity: 'commun',
      categoryId: newObjectCategory
    };
    
    if (isEditing) {
      // Mettre à jour l'objet existant
      setObjectCategories(prev => prev.map(cat => {
        if (cat.id === newObjectCategory) {
          return {
            ...cat,
            objects: cat.objects.map(obj => 
              obj.id === selectedObject.id ? objectData : obj
            )
          };
        }
        return cat;
      }));
    } else {
      // Créer un nouvel objet
      setObjectCategories(prev => prev.map(cat => 
        cat.id === newObjectCategory 
          ? { ...cat, objects: [...cat.objects, objectData] }
          : cat
      ));
    }
    
    // Naviguer vers consultation d'objet
    setSelectedObject(objectData);
    setObjectCurrentView('consultation');
  };

  const cancelNewObject = () => {
    setNewObjectName('');
    setNewObjectDescription('');
    setNewObjectCategory('');
    setNewObjectLevel('');
    setNewObjectAlteration('');
    setNewObjectTags(['Tag', 'Tag', 'Tag', 'Tag', 'Tag']);
    setNewObjectTag('');
    setSelectedObject(null);
    setObjectCurrentView('objects');
  };

  const addObjectTag = () => {
    if (newObjectTag.trim() && !newObjectTags.includes(newObjectTag.trim())) {
      setNewObjectTags(prev => [...prev, newObjectTag.trim()]);
      setNewObjectTag('');
    }
  };

  const removeObjectTag = (tagToRemove) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le tag "${tagToRemove}" ?`)) {
      setNewObjectTags(prev => prev.filter(tag => tag !== tagToRemove));
    }
  };

  const togglePredefinedObjectTag = (tagName) => {
    setNewObjectTags(prev => {
      const exists = prev.includes(tagName);
      if (exists) {
        // Demander confirmation avant suppression
        if (confirm(`Êtes-vous sûr de vouloir supprimer le tag "${tagName}" ?`)) {
          return prev.filter(t => t !== tagName);
        }
        return prev; // Garder le tag si l'utilisateur annule
      }
      return [...prev, tagName];
    });
  };

  // Edition de tags sur les cartes objets (inline)
  const [editingObjectTagsId, setEditingObjectTagsId] = useState(null);
  const [editingObjectTagInput, setEditingObjectTagInput] = useState('');

  // Effet pour fermer l'édition des tags quand on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (editingObjectTagsId && !event.target.closest('.object-tags-editing')) {
        setEditingObjectTagsId(null);
        setEditingObjectTagInput('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingObjectTagsId]);
  const addTagToObject = (categoryId, objectId, tag) => {
    if (!tag.trim()) return;
    setObjectCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        objects: cat.objects.map(obj => obj.id === objectId
          ? { ...obj, tags: obj.tags.includes(tag.trim()) ? obj.tags : [...obj.tags, tag.trim()] }
          : obj)
      };
    }));
  };
  const removeTagFromObject = (categoryId, objectId, tagToRemove) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le tag "${tagToRemove}" ?`)) {
      setObjectCategories(prev => prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          objects: cat.objects.map(obj => obj.id === objectId
            ? { ...obj, tags: obj.tags.filter(t => t !== tagToRemove) }
            : obj)
        };
      }));
    }
  };

  // Fonction pour ouvrir la consultation d'objet (à implémenter plus tard)
  const openObjectConsultation = (object) => {
    setSelectedObject(object);
    setObjectCurrentView('consultation');
  };

  // Fonctions de filtrage et tri pour les objets
  const getFilteredAndSortedObjects = () => {
    let filteredCategories = [...objectCategories];

    // Filtrage par catégorie
    if (objectSelectedFilter !== 'aucun') {
      filteredCategories = filteredCategories.filter(category => {
        switch (objectSelectedFilter) {
          case 'armes':
            return category.id === 'armes';
          case 'armures':
            return category.id === 'armures';
          case 'objets-magiques':
            return category.id === 'objets-magiques';
          case 'consommables':
            return category.objects.some(obj => obj.type === 'potion' || obj.tags.includes('Consommable'));
          case 'rares':
            return category.objects.some(obj => obj.rarity === 'rare');
          case 'legendaires':
            return category.objects.some(obj => obj.rarity === 'legendaire');
          default:
            return true;
        }
      });
    }

    // Filtrage par recherche
    if (objectSearchTerm.trim()) {
      filteredCategories = filteredCategories.map(category => ({
        ...category,
        objects: category.objects.filter(obj => 
          obj.name.toLowerCase().includes(objectSearchTerm.toLowerCase()) ||
          obj.tags.some(tag => tag.toLowerCase().includes(objectSearchTerm.toLowerCase())) ||
          (obj.description && obj.description.toLowerCase().includes(objectSearchTerm.toLowerCase()))
        )
      })).filter(category => category.objects.length > 0);
    }

    // Tri des objets dans chaque catégorie
    filteredCategories = filteredCategories.map(category => ({
      ...category,
      objects: [...category.objects].sort((a, b) => {
        switch (objectSelectedSort) {
          case 'nom-asc':
            return a.name.localeCompare(b.name, 'fr');
          case 'nom-desc':
            return b.name.localeCompare(a.name, 'fr');
          case 'rarete-asc':
            const rarityOrder = { 'commun': 1, 'rare': 2, 'legendaire': 3 };
            return rarityOrder[a.rarity] - rarityOrder[b.rarity];
          case 'rarete-desc':
            const rarityOrderDesc = { 'commun': 1, 'rare': 2, 'legendaire': 3 };
            return rarityOrderDesc[b.rarity] - rarityOrderDesc[a.rarity];
          case 'type':
            return a.type.localeCompare(b.type, 'fr');
          default:
            return 0;
        }
      })
    }));

    return filteredCategories;
  };

  const [objectCategories, setObjectCategories] = useState([
    {
      id: 'armes',
      title: 'Armes',
      isExpanded: true,
      objects: [
        { 
          id: 'epee-longue', 
          name: 'Épée longue', 
          tags: ['Mêlée', 'Légendaire'], 
          image: null,
          type: 'arme',
          rarity: 'legendaire',
          description: 'Une épée longue légendaire'
        },
        { 
          id: 'arc-elfique', 
          name: 'Arc elfique', 
          tags: ['Distance', 'Magique'], 
          image: null,
          type: 'arme',
          rarity: 'rare',
          description: 'Un arc elfique magique'
        },
        { 
          id: 'dague-poison', 
          name: 'Dague empoisonnée', 
          tags: ['Mêlée', 'Poison'], 
          image: null,
          type: 'arme',
          rarity: 'rare',
          description: 'Une dague empoisonnée'
        },
        { 
          id: 'marteau-guerre', 
          name: 'Marteau de guerre', 
          tags: ['Mêlée', 'Lourd'], 
          image: null,
          type: 'arme',
          rarity: 'commun',
          description: 'Un marteau de guerre lourd'
        },
        { 
          id: 'baton-mage', 
          name: 'Bâton de mage', 
          tags: ['Magique', 'Focus'], 
          image: null,
          type: 'arme',
          rarity: 'rare',
          description: 'Un bâton de mage magique'
        },
        { 
          id: 'bouclier-dragon', 
          name: 'Bouclier de dragon', 
          tags: ['Défense', 'Rare'], 
          image: null,
          type: 'arme',
          rarity: 'legendaire',
          description: 'Un bouclier de dragon rare'
        }
      ]
    },
    {
      id: 'armures',
      title: 'Armures',
      isExpanded: true,
      objects: [
        { 
          id: 'armure-cuir', 
          name: 'Armure de cuir', 
          tags: ['Légère', 'Défense'], 
          image: null,
          type: 'armure',
          rarity: 'commun',
          description: 'Une armure de cuir légère'
        },
        { 
          id: 'cotte-maille', 
          name: 'Cotte de maille', 
          tags: ['Moyenne', 'Métal'], 
          image: null,
          type: 'armure',
          rarity: 'rare',
          description: 'Une cotte de maille résistante'
        },
        { 
          id: 'armure-plate', 
          name: 'Armure de plates', 
          tags: ['Lourde', 'Métal'], 
          image: null,
          type: 'armure',
          rarity: 'legendaire',
          description: 'Une armure de plates légendaire'
        }
      ]
    },
    {
      id: 'objets-magiques',
      title: 'Objets magiques',
      isExpanded: true,
      objects: [
        { 
          id: 'potion-sante', 
          name: 'Potion de santé', 
          tags: ['Consommable', 'Soin'], 
          image: null,
          type: 'potion',
          rarity: 'commun',
          description: 'Une potion qui restaure la santé'
        },
        { 
          id: 'anneau-pouvoir', 
          name: 'Anneau de pouvoir', 
          tags: ['Magique', 'Anneau'], 
          image: null,
          type: 'anneau',
          rarity: 'rare',
          description: 'Un anneau magique puissant'
        },
        { 
          id: 'amulette-protection', 
          name: 'Amulette de protection', 
          tags: ['Magique', 'Protection'], 
          image: null,
          type: 'amulette',
          rarity: 'legendaire',
          description: 'Une amulette de protection légendaire'
        }
      ]
    }
  ]);
  const [editingTemplate, setEditingTemplate] = useState(() => {
    const saved = localStorage.getItem('lore-templates-editing-template');
    return saved ? JSON.parse(saved) : null;
  });

  // Sauvegarde automatique des données
  useEffect(() => {
    localStorage.setItem('lore-characters-categories', JSON.stringify(characterCategories));
  }, [characterCategories]);

  useEffect(() => {
    localStorage.setItem('lore-characters-inventory', JSON.stringify(consultationInventory));
  }, [consultationInventory]);

  useEffect(() => {
    localStorage.setItem('lore-objects-categories', JSON.stringify(objectCategories));
  }, [objectCategories]);

  useEffect(() => {
    localStorage.setItem('lore-characters-primary-stats', JSON.stringify(consultationPrimaryStats));
  }, [consultationPrimaryStats]);

  useEffect(() => {
    localStorage.setItem('lore-characters-secondary-stats', JSON.stringify(consultationSecondaryStats));
  }, [consultationSecondaryStats]);

  useEffect(() => {
    localStorage.setItem('lore-characters-skills', JSON.stringify(consultationSkills));
  }, [consultationSkills]);
  
  // État pour les menus contextuels des catégories de templates
  const [openTemplateContextMenu, setOpenTemplateContextMenu] = useState(null);

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem('lore-templates-categories', JSON.stringify(categories));
  }, [categories]);

  // Effet pour fermer le menu contextuel des templates quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openTemplateContextMenu && !event.target.closest('.template-context-menu')) {
        setOpenTemplateContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openTemplateContextMenu]);

  useEffect(() => {
    localStorage.setItem('lore-templates-data', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('lore-templates-subcategories', JSON.stringify(subcategories));
  }, [subcategories]);

  useEffect(() => {
    localStorage.setItem('lore-templates-editing-subcategory', JSON.stringify(editingSubcategory));
  }, [editingSubcategory]);

  useEffect(() => {
    localStorage.setItem('lore-templates-editing-category', JSON.stringify(editingCategory));
  }, [editingCategory]);

  useEffect(() => {
    localStorage.setItem('lore-templates-editing-template', JSON.stringify(editingTemplate));
  }, [editingTemplate]);

  useEffect(() => {
    localStorage.setItem('lore-templates-expanded-sections', JSON.stringify(expandedSections));
  }, [expandedSections]);

  useEffect(() => {
    localStorage.setItem('lore-templates-selected-filter', selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    localStorage.setItem('lore-templates-selected-sort', selectedSort);
  }, [selectedSort]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Quand on ferme le panel, revenir à la vue templates
    if (isOpen) {
      setCurrentView('templates');
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Ouvrir automatiquement le panel quand on change d'onglet depuis une languette fermée
    if (!isOpen) {
      setIsOpen(true);
    }
    // S'assurer qu'on revient à la vue templates quand on change d'onglet
    setCurrentView('templates');
    // Réinitialiser les vues spécifiques à chaque onglet
    if (tabId === 'characters') {
      setCharacterCurrentView('characters');
      setSelectedCharacter(null);
    } else if (tabId === 'objects') {
      setObjectCurrentView('objects');
      setSelectedObject(null);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Fonctions pour les fonctionnalités avancées
  const addNewCategory = () => {
    const newCategory = {
      id: `category-${Date.now()}`,
      name: 'Nouvelle catégorie',
      isEditable: true
    };
    setCategories(prev => [...prev, newCategory]);
    setEditingCategory(newCategory.id);
    
    // Ajouter automatiquement la nouvelle catégorie aux sections étendues
    setExpandedSections(prev => ({
      ...prev,
      [newCategory.id]: true
    }));
  };

  const updateCategoryName = (categoryId, newName) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, name: newName } : cat
    ));
    setEditingCategory(null);
  };

  const updateSubcategoryName = (subcategoryId, newName) => {
    setSubcategories(prev => prev.map(sub => 
      sub.id === subcategoryId ? { ...sub, name: newName } : sub
    ));
    setEditingSubcategory(null);
  };

  const toggleFavorite = (templateId) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, isFavorite: !template.isFavorite } : template
    ));
  };

  const archiveTemplate = (templateId) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, isArchived: !template.isArchived } : template
    ));
  };

  const copyTemplateLink = async (templateId) => {
    const link = `${window.location.origin}/campaigns/default-campaign/template/${templateId}`;
    try {
      await navigator.clipboard.writeText(link);
      showToast('Lien copié ! Vous pouvez maintenant le coller sur le dashboard.', 'success');
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      showToast('Erreur lors de la copie du lien.', 'error');
    }
  };

  const createTemplate = (categoryId) => {
    // Redirection vers la page "Nouvel évènement"
    console.log(`Créer un template dans la catégorie: ${categoryId}`);
    setCurrentView('new-event');
    setIsOpen(true);
  };

  const editTemplate = (templateId) => {
    // Trouver le template et naviguer vers la consultation
    const template = templates.find(t => t.id === templateId);
    if (template) {
      handleConsultTemplate(template);
    }
  };

  const handleBackToTemplates = () => {
    setCurrentView('templates');
    setSelectedTemplate(null);
    setEditingMerchantTemplate(null);
    setEditingCombatTemplate(null);
  };

  const handleSaveMerchantTemplate = () => {
    // Sauvegarder les modifications du template marchand
    const updatedTemplate = {
      ...editingMerchantTemplate,
      name: merchantTemplateData.title,
      description: merchantTemplateData.content,
      location: merchantTemplateData.location,
      npc: merchantTemplateData.npc,
      inventory: merchantTemplateData.inventory,
      category: 'modeles-simples' // Conserver dans la catégorie modèles simples
    };
    
    setTemplates(prev => prev.map(template => 
      template.id === 'marchand' ? updatedTemplate : template
    ));
    
    setCurrentView('templates');
    setEditingMerchantTemplate(null);
    showToast('Template marchand mis à jour avec succès !');
  };

  // Fonctions pour la gestion de l'inventaire
  const handleAddInventoryItem = () => {
    if (newInventoryItem.name.trim()) {
      const newItem = {
        id: `item-${Date.now()}`,
        name: newInventoryItem.name.trim(),
        price: newInventoryItem.price || 0
      };
      setMerchantTemplateData(prev => ({
        ...prev,
        inventory: [...prev.inventory, newItem]
      }));
      setNewInventoryItem({ name: '', price: 0 });
    }
  };

  const handleDeleteInventoryItem = (itemId) => {
    setMerchantTemplateData(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== itemId)
    }));
  };

  const handleEditInventoryItem = (itemId, field, value) => {
    setMerchantTemplateData(prev => ({
      ...prev,
      inventory: prev.inventory.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleCancelMerchantEdit = () => {
    setCurrentView('templates');
    setEditingMerchantTemplate(null);
  };

  const handleSaveCombatTemplate = () => {
    // Sauvegarder les modifications du template combat
    const updatedTemplate = {
      ...editingCombatTemplate,
      name: combatTemplateData.title,
      description: combatTemplateData.content,
      location: combatTemplateData.location,
      difficulty: combatTemplateData.difficulty,
      enemies: combatTemplateData.enemies,
      rewards: combatTemplateData.rewards,
      category: 'modeles-simples' // Conserver dans la catégorie modèles simples
    };
    
    setTemplates(prev => prev.map(template => 
      template.id === 'combat-simple' ? updatedTemplate : template
    ));
    
    setCurrentView('templates');
    setEditingCombatTemplate(null);
    showToast('Template combat mis à jour avec succès !');
  };

  const handleCancelCombatEdit = () => {
    setCurrentView('templates');
    setEditingCombatTemplate(null);
  };

  // Fonctions pour la gestion des ennemis
  const handleAddEnemy = () => {
    const newEnemy = {
      name: 'Nouvel ennemi',
      hp: 10,
      ac: 10,
      attack: '+0',
      damage: '1d4'
    };
    setCombatTemplateData(prev => ({
      ...prev,
      enemies: [...prev.enemies, newEnemy]
    }));
  };

  const handleDeleteEnemy = (index) => {
    setCombatTemplateData(prev => ({
      ...prev,
      enemies: prev.enemies.filter((_, i) => i !== index)
    }));
  };

  const handleEditEnemy = (index, field, value) => {
    setCombatTemplateData(prev => ({
      ...prev,
      enemies: prev.enemies.map((enemy, i) => 
        i === index ? { ...enemy, [field]: value } : enemy
      )
    }));
  };

  const handleConsultTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentView('consultation');
  };

  const handleEditTemplate = (template) => {
    // Si c'est le template marchand, utiliser le formulaire spécifique
    if (template.id === 'marchand') {
      setEditingMerchantTemplate(template);
      setCurrentView('edit-merchant');
    } else if (template.id === 'combat-simple') {
      setEditingCombatTemplate(template);
      setCurrentView('edit-combat');
    } else {
      // Envoyer vers la page "Nouvel évènement" en mode modification
      console.log('Modification du template:', template);
      setSelectedTemplate(template);
      setCurrentView('new-event');
    }
  };

  // Fonction pour gérer les actions du menu contextuel des catégories de templates
  const handleTemplateContextMenuAction = (categoryId, action) => {
    switch (action) {
      case 'delete':
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
          // Supprimer la catégorie
          setCategories(prev => prev.filter(cat => cat.id !== categoryId));
          // Supprimer les templates associés à cette catégorie
          setTemplates(prev => prev.filter(template => template.category !== categoryId));
          // Supprimer les sous-catégories associées
          setSubcategories(prev => prev.filter(sub => sub.category !== categoryId));
          // Supprimer de expandedSections si présent
          setExpandedSections(prev => {
            const newState = { ...prev };
            delete newState[categoryId];
            return newState;
          });
          console.log(`Catégorie supprimée: ${categoryId}`);
        }
        break;
      case 'archive':
        // Archiver la catégorie
        console.log(`Tentative d'archivage de la catégorie: ${categoryId}`);
        setCategories(prev => {
          const updated = prev.map(cat => 
            cat.id === categoryId 
              ? { ...cat, isArchived: true }
              : cat
          );
          console.log('Catégories après archivage:', updated);
          return updated;
        });
        console.log(`Catégorie archivée: ${categoryId}`);
        break;
      default:
        break;
    }
    setOpenTemplateContextMenu(null);
  };

  const handleEventCreated = (eventData) => {
    if (eventData.isEdit) {
      // Modifier le template existant
      setTemplates(prev => prev.map(template => 
        template.id === eventData.id 
          ? {
              ...template,
              name: eventData.title,
              category: eventData.category,
              description: eventData.description,
              location: eventData.location,
              tags: eventData.tags,
              image: eventData.image,
              imagePreview: eventData.imagePreview
            }
          : template
      ));
    } else {
      // Ajouter le nouvel évènement à la liste des templates
      const newTemplate = {
        id: eventData.id,
        name: eventData.title,
        category: eventData.category,
        description: eventData.description,
        location: eventData.location,
        tags: eventData.tags,
        image: eventData.image,
        imagePreview: eventData.imagePreview,
        isEditable: true,
        isFavorite: false,
        isArchived: false,
        createdAt: eventData.createdAt
      };
      
      setTemplates(prev => [...prev, newTemplate]);
    }
  };

  // Fonction pour réinitialiser les données (utile pour le développement)
  const resetTemplatesData = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données des templates ?')) {
      localStorage.removeItem('lore-templates-categories');
      localStorage.removeItem('lore-templates-data');
      localStorage.removeItem('lore-templates-subcategories');
      localStorage.removeItem('lore-templates-expanded-sections');
      localStorage.removeItem('lore-templates-selected-filter');
      localStorage.removeItem('lore-templates-selected-sort');
      localStorage.removeItem('lore-templates-editing-category');
      localStorage.removeItem('lore-templates-editing-subcategory');
      localStorage.removeItem('lore-templates-editing-template');
      window.location.reload();
    }
  };

  // Options de filtres
  const filterOptions = [
    { value: 'aucun', label: 'Aucun filtre' },
    { value: 'type', label: 'Par type' },
    { value: 'categorie', label: 'Par catégorie' },
    { value: 'favoris', label: 'Favoris uniquement' },
    { value: 'archives', label: 'Éléments archivés' },
    { value: 'recent', label: 'Récents' },
    { value: 'utilise', label: 'Plus utilisés' }
  ];

  // Options de tri
  const sortOptions = [
    { value: 'aucun', label: 'Aucun tri' },
    { value: 'nom-asc', label: 'Nom A-Z' },
    { value: 'nom-desc', label: 'Nom Z-A' },
    { value: 'date-asc', label: 'Plus anciens' },
    { value: 'date-desc', label: 'Plus récents' },
    { value: 'utilise-desc', label: 'Plus utilisés' },
    { value: 'type', label: 'Par type' }
  ];

  const tabs = [
    {
      id: 'templates',
      title: 'Templates',
      icon: '📄',
      closedImage: '/images/templates/template-tab-closed.svg',
      openImage: '/images/templates/template-tab-open.svg',
      color: 'from-golden to-golden/70',
      content: (
        <div className="h-full flex flex-col pt-8 pr-6">
          {/* Barre d'outils - Fixe */}
          <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            {/* Filtre dropdown */}
            <div className="relative">
              <select 
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown size={16} className="text-white" />
              </div>
            </div>
            
            {/* Tri dropdown */}
            <div className="relative">
              <select 
                value={selectedSort} 
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown size={16} className="text-white" />
              </div>
            </div>
            
            {/* Bouton de recherche avec dropdown */}
            <div className="relative z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchInput(!showSearchInput);
                }}
                className="bg-[#552E1A] text-white p-2 rounded-lg border-none hover:bg-[#6B3A2A] transition-colors"
              >
                <Search size={16} />
              </button>
              
              {showSearchInput && (
                <div className="absolute top-full left-0 mt-2 bg-[#552E1A] rounded-lg p-2 shadow-lg z-20">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Rechercher..."
                      className="bg-transparent text-white pl-1 pr-1 py-1 text-sm border-none focus:outline-none placeholder-white/70 w-24"
                      autoFocus
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSearchInput(false);
                        setSearchTerm('');
                      }}
                      className="text-white hover:text-gray-300 transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contenu scrollable - Seulement les sections */}
          <div className="flex-1 space-y-4 overflow-y-auto min-h-0 pb-4">
            {/* Sections dynamiques basées sur les catégories */}
            {categories
              .filter(category => {
                // Filtrage par statut d'archivage
                if (selectedFilter === 'archives') {
                  // Pour les archives, afficher seulement les catégories qui ont des templates archivés
                  const hasArchivedTemplates = templates.some(template => 
                    template.category === category.id && template.isArchived
                  );
                  return hasArchivedTemplates;
                } else if (selectedFilter === 'favoris') {
                  // Pour les favoris, afficher seulement les catégories qui ont des templates favoris
                  const hasFavoriteTemplates = templates.some(template => 
                    template.category === category.id && template.isFavorite && !template.isArchived
                  );
                  return hasFavoriteTemplates;
                } else {
                  return !category.isArchived;
                }
              })
              .filter(category => {
                // Filtrage des catégories par recherche
                if (!searchTerm) return true;
                const searchLower = searchTerm.toLowerCase();
                
                // Recherche dans le nom de la catégorie
                if (category.name.toLowerCase().includes(searchLower)) return true;
                
                // Recherche dans les templates de cette catégorie
                const hasMatchingTemplates = templates.some(template => 
                template.category === category.id && 
                  template.name.toLowerCase().includes(searchLower)
                );
                
                return hasMatchingTemplates;
              })
              .map(category => {
                // Debug temporaire pour vérifier les templates archivés
                if (selectedFilter === 'archives') {
                  console.log(`Catégorie: ${category.name}, Templates archivés:`, 
                    templates.filter(t => t.category === category.id && t.isArchived));
                }
                
                const categoryTemplates = templates.filter(template => {
                  // Filtrage par statut
                  let matchesFilter = false;
                  
                  if (selectedFilter === 'aucun') {
                    matchesFilter = !template.isArchived;
                  } else if (selectedFilter === 'favoris') {
                    matchesFilter = template.isFavorite && !template.isArchived;
                  } else if (selectedFilter === 'archives') {
                    matchesFilter = template.isArchived;
                  } else if (selectedFilter === 'categorie') {
                    matchesFilter = !template.isArchived;
                  } else {
                    matchesFilter = !template.isArchived;
                  }
                  
                  // Filtrage par recherche
                  const matchesSearch = !searchTerm || 
                    template.name.toLowerCase().includes(searchTerm.toLowerCase());
                  
                  return template.category === category.id && matchesFilter && matchesSearch;
                });

              // Ne pas afficher la catégorie si elle n'a aucun template correspondant au filtre
              if (categoryTemplates.length === 0) {
                return null;
              }

              return (
                <div key={category.id} className="border border-[#552E1A]/30 rounded-lg bg-[#552E1A]/5">
                  <div className="w-full flex items-center justify-between p-3 bg-[#552E1A]/10 hover:bg-[#552E1A]/20 transition-colors">
                    <div className="flex items-start gap-2 flex-1">
                      {editingCategory === category.id ? (
                        <input
                          type="text"
                          defaultValue={category.name}
                          onBlur={(e) => updateCategoryName(category.id, e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              updateCategoryName(category.id, e.target.value);
                            }
                          }}
                          className="bg-transparent text-[#552E1A] font-semibold eagle-lake-font border-none focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <button 
                          className={`font-semibold text-[#552E1A] eagle-lake-font transition-colors bg-transparent border-none p-0 text-left ${
                            category.isEditable 
                              ? 'cursor-pointer hover:text-black' 
                              : 'cursor-default opacity-70'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (category.isEditable) {
                              setEditingCategory(category.id);
                            }
                          }}
                          disabled={!category.isEditable}
                        >
                          {category.name}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {category.isEditable && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            createTemplate(category.id);
                          }}
                          className="bg-golden text-[#552E1A] px-4 py-2 rounded text-sm font-medium hover:bg-golden/80 transition-colors"
                        >
                          Créer un template
                        </button>
                      )}
                      <button
                        onClick={() => toggleSection(category.id)}
                        className="p-1 hover:bg-[#552E1A]/10 rounded transition-colors"
                      >
                        {expandedSections[category.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      
                      {/* Menu contextuel */}
                      <div className="relative template-context-menu">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenTemplateContextMenu(openTemplateContextMenu === category.id ? null : category.id);
                          }}
                          className="p-1 hover:bg-[#552E1A]/10 rounded transition-colors"
                        >
                          <span className="text-[#552E1A] text-lg leading-none">⋮</span>
                        </button>
                        
                        {openTemplateContextMenu === category.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTemplateContextMenuAction(category.id, 'archive');
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-[#552E1A] hover:bg-[#552E1A]/10 transition-colors rounded-t-lg"
                            >
                              Archiver
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTemplateContextMenuAction(category.id, 'delete');
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                            >
                              Supprimer
                      </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedSections[category.id] && (
                    <div className="p-3 space-y-4">
                      {/* Sous-catégories */}
                      {subcategories
                        .filter(sub => sub.category === category.id)
                        .filter(subcategory => {
                          // Filtrage des sous-catégories par recherche
                          if (!searchTerm) return true;
                          const searchLower = searchTerm.toLowerCase();
                          
                          // Recherche dans le nom de la sous-catégorie
                          if (subcategory.name.toLowerCase().includes(searchLower)) return true;
                          
                          // Recherche dans les templates de cette sous-catégorie
                          const hasMatchingTemplates = categoryTemplates.some(template => 
                            template.subcategory === subcategory.id && 
                            template.name.toLowerCase().includes(searchLower)
                          );
                          
                          return hasMatchingTemplates;
                        })
                        .map(subcategory => {
                          const subcategoryTemplates = categoryTemplates.filter(t => t.subcategory === subcategory.id);
                          
                          return (
                            <div key={subcategory.id} className="border-l-2 border-golden pl-3">
                              <div className="flex items-center justify-between mb-2">
                                {editingSubcategory === subcategory.id ? (
                                  <input
                                    type="text"
                                    defaultValue={subcategory.name}
                                    onBlur={(e) => updateSubcategoryName(subcategory.id, e.target.value)}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        updateSubcategoryName(subcategory.id, e.target.value);
                                      }
                                    }}
                                    className="bg-transparent text-[#552E1A] font-medium eagle-lake-font border-none focus:outline-none"
                                    autoFocus
                                  />
                                ) : (
                                  <button 
                                    className={`font-medium text-[#552E1A] eagle-lake-font transition-colors bg-transparent border-none p-0 ${
                                      subcategory.isEditable 
                                        ? 'cursor-pointer hover:text-black' 
                                        : 'cursor-default opacity-70'
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      if (subcategory.isEditable) {
                                        setEditingSubcategory(subcategory.id);
                                      }
                                    }}
                                    disabled={!subcategory.isEditable}
                                  >
                                    {subcategory.name}
                                  </button>
                                )}
                                <button 
                                  onClick={() => createTemplate(category.id)}
                                  className="bg-golden text-[#552E1A] px-4 py-2 rounded text-sm font-medium hover:bg-golden/80 transition-colors"
                                >
                                  Créer un template
                                </button>
                              </div>
                              
                              <div className="space-y-2">
                                {subcategoryTemplates.length === 0 ? (
                                  <div className="text-[#552E1A]/60 text-sm">Aucun template</div>
                                ) : (
                                  subcategoryTemplates.map((template, index) => (
                                    <div key={template.id}>
                                      <div className="flex items-center justify-between p-2 hover:bg-[#552E1A]/5 rounded">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <button 
                                            onClick={() => toggleFavorite(template.id)}
                                            className={`transition-colors ${template.isFavorite ? 'text-golden' : 'text-black hover:text-golden'}`}
                                          >
                                            <Star size={14} fill={template.isFavorite ? '#D4AF37' : 'none'} stroke={template.isFavorite ? '#D4AF37' : 'currentColor'} />
                                          </button>
                                          <span 
                                            className={`text-[#552E1A] break-words whitespace-pre-line max-w-[300px] ${template.isEditable ? 'cursor-pointer hover:text-black transition-colors' : ''}`}
                                            onClick={() => template.isEditable && editTemplate(template.id)}
                                          >
                                            {template.name}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <button 
                                            onClick={() => archiveTemplate(template.id)}
                                            className="text-[#552E1A] hover:text-black transition-colors text-sm"
                                          >
                                            {template.isArchived ? 'Désarchiver' : 'Archiver'}
                                          </button>
                                          <button 
                                            onClick={() => copyTemplateLink(template.id)}
                                            className="text-[#552E1A] hover:text-black transition-colors"
                                          >
                                            <Copy size={16} />
                                          </button>
                                        </div>
                                      </div>
                                      {index < subcategoryTemplates.length - 1 && (
                                        <div className="border-t border-[#552E1A]/20 my-2"></div>
                                      )}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })}
                      
                      {/* Templates sans sous-catégorie */}
                      {categoryTemplates.filter(t => !t.subcategory).length > 0 && (
                        <div className="space-y-2">
                          {categoryTemplates
                            .filter(t => !t.subcategory)
                            .map((template, index) => (
                              <div key={template.id}>
                                <div className="flex items-center justify-between p-2 hover:bg-[#552E1A]/5 rounded">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <button 
                                      onClick={() => toggleFavorite(template.id)}
                                      className={`transition-colors ${template.isFavorite ? 'text-golden' : 'text-black hover:text-golden'}`}
                                    >
                                      <Star size={14} fill={template.isFavorite ? '#D4AF37' : 'none'} stroke={template.isFavorite ? '#D4AF37' : 'currentColor'} />
                                    </button>
                                    <span 
                                      className={`text-[#552E1A] break-words whitespace-pre-line max-w-[300px] ${template.isEditable ? 'cursor-pointer hover:text-black transition-colors' : ''}`}
                                      onClick={() => template.isEditable && editTemplate(template.id)}
                                    >
                                      {template.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => archiveTemplate(template.id)}
                                      className="text-[#552E1A] hover:text-black transition-colors text-sm"
                                    >
                                      {template.isArchived ? 'Désarchiver' : 'Archiver'}
                                    </button>
                                    <button 
                                      onClick={() => copyTemplateLink(template.id)}
                                      className="text-[#552E1A] hover:text-black transition-colors"
                                    >
                                      <Copy size={16} />
                                    </button>
                                  </div>
                                </div>
                                {index < categoryTemplates.filter(t => !t.subcategory).length - 1 && (
                                  <div className="border-t border-[#552E1A]/20 my-2"></div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                      
                      {/* Message si aucun template */}
                      {categoryTemplates.length === 0 && (
                        <div className="text-[#552E1A]/60 text-sm">Aucun template</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}


          </div>

          {/* Bouton fixe Nouvelle catégorie - Position fixe en bas à droite */}
          <div className="fixed bottom-12 right-6 z-50">
            <button 
              onClick={addNewCategory}
              className="bg-golden text-[#552E1A] py-3 px-4 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2 eagle-lake-font shadow-lg"
            >
              <Plus size={16} />
              Nouvelle catégorie
            </button>
          </div>

        </div>
      )
    },
    {
      id: 'quests',
      title: 'Quêtes',
      icon: '📜',
      closedImage: '/images/templates/quest-tab-closed.svg',
      openImage: '/images/templates/quest-tab-open.svg',
      color: 'from-blue-500 to-blue-600',
      content: (() => {
        // États locaux pour la page Quêtes
        const [questShowSearchInput, setQuestShowSearchInput] = React.useState(false);
        const [questSearchTerm, setQuestSearchTerm] = React.useState('');
        const [questSelectedFilter, setQuestSelectedFilter] = React.useState('aucun');
        const [questSelectedSort, setQuestSelectedSort] = React.useState('aucun');
        
        const [questTitles, setQuestTitles] = React.useState(() => {
          const saved = localStorage.getItem('lore-quests-titles');
          if (saved) {
            return JSON.parse(saved);
          }
          return {
            'histoire-principale': 'Histoire principale',
            'liberer-otages': 'Libérer les otages alliés'
          };
        });
        
        // États pour les catégories et quêtes dynamiques
        const [questCounts, setQuestCounts] = React.useState({
          'chasseurs': { current: 4, total: 4 },
          'mages': { current: 6, total: 6 }
        });
        
        const [categories, setCategories] = React.useState(() => {
          const saved = localStorage.getItem('lore-quests-categories');
          if (saved) {
            return JSON.parse(saved);
          }
          return [
          {
            id: 'histoire-principale',
            title: 'Histoire principale',
            type: 'category',
            progress: 50,
            isExpanded: true,
            quests: [
              {
                id: 'liberer-otages',
                title: 'Libérer les otages alliés',
                type: 'quest',
                progress: 100,
                isExpanded: true,
                sponsor: 'Nom du personnage',
                reward: 'Corne d\'abondance ; 1300 PO ; 4000 XP',
                description: 'Les Bastions de M\'ror sont attaqués par des Duergars à la solde d\'Orcus. Pour déstabiliser l\'armée naine, les Duergars ont pris en otage des alliés sur d\'autres fronts. Il faut récupérer les otages pour permettre la défense de la cité sans craindre d\'incident diplomatique en cas de dégât collatéral.',
                subQuests: [
                  { id: 'chasseurs', name: 'Libérer les chasseurs de la forêt écarlate', current: 4, total: 4 },
                  { id: 'mages', name: 'Sauver les mages d\'Arkanix', current: 6, total: 6 }
                ]
              }
            ]
          }
        ];
        });
        
        // États pour les dropdowns
        const [expandedQuests, setExpandedQuests] = React.useState(() => {
          const saved = localStorage.getItem('lore-quests-expanded-sections');
          if (saved) {
            return JSON.parse(saved);
          }
          return {
            'histoire-principale': true,
            'liberer-otages': true
          };
        });
        
        // États pour les menus contextuels
        const [openContextMenu, setOpenContextMenu] = React.useState(null);
        
        // État pour l'édition des noms d'objectifs
        const [editingObjectiveName, setEditingObjectiveName] = React.useState(null);
        
        // État pour l'édition du total des compteurs
        const [editingQuestTotal, setEditingQuestTotal] = React.useState(null);

        
        // Sauvegarde automatique des catégories de quêtes
        React.useEffect(() => {
          localStorage.setItem('lore-quests-categories', JSON.stringify(categories));
        }, [categories]);
        
        // Sauvegarde automatique des sections étendues des quêtes
        React.useEffect(() => {
          localStorage.setItem('lore-quests-expanded-sections', JSON.stringify(expandedQuests));
        }, [expandedQuests]);
        
        // Sauvegarde automatique des titres des quêtes
        React.useEffect(() => {
          localStorage.setItem('lore-quests-titles', JSON.stringify(questTitles));
        }, [questTitles]);
        
        // Fonction pour ouvrir la fiche du personnage
        const openCharacterSheet = (characterName) => {
          console.log(`Ouverture de la fiche du personnage: ${characterName}`);
          // TODO: Navigation vers la page de fiche de personnage
          // navigate(`/characters/${characterName}`);
        };
        
        // Fonction pour créer une nouvelle catégorie
        const createNewCategory = () => {
          const newCategoryId = `category-${Date.now()}`;
          const newCategory = {
            id: newCategoryId,
            title: 'Nouvelle catégorie',
            type: 'category',
            progress: 0,
            isExpanded: true,
            quests: []
          };
          
          setCategories(prev => [...prev, newCategory]);
          setExpandedQuests(prev => ({ ...prev, [newCategoryId]: true }));
          setQuestTitles(prev => ({ ...prev, [newCategoryId]: 'Nouvelle catégorie' }));
          
          console.log('Nouvelle catégorie créée:', newCategory);
        };
        
        // Fonctions pour le menu contextuel
        const handleContextMenuAction = (itemId, action) => {
          setOpenContextMenu(null);
          
          // Vérifier si c'est une sous-quête, une quête ou une catégorie
          const isSubQuest = categories.some(cat => 
            cat.quests.some(quest => 
              quest.subQuests && quest.subQuests.some(sub => sub.id === itemId)
            )
          );
          
          const isQuest = categories.some(cat => 
            cat.quests.some(quest => quest.id === itemId)
          );
          
          if (isSubQuest) {
            // Gestion des sous-quêtes
            switch (action) {
              case 'modify':
                // Ouvrir la page de création/modification de quête dans le panel
                setCurrentView('new-quest');
                break;
              case 'archive':
                console.log(`Archivage de la sous-quête: ${itemId}`);
                // TODO: Implémenter l'archivage
                break;
              case 'delete':
                if (confirm('Êtes-vous sûr de vouloir supprimer cette sous-quête ?')) {
                  setCategories(prev => prev.map(cat => ({
                    ...cat,
                    quests: cat.quests.map(quest => ({
                      ...quest,
                      subQuests: quest.subQuests ? quest.subQuests.filter(sub => sub.id !== itemId) : []
                    }))
                  })));
                  setExpandedQuests(prev => {
                    const newState = { ...prev };
                    delete newState[itemId];
                    return newState;
                  });
                  console.log(`Sous-quête supprimée: ${itemId}`);
                }
                break;
              default:
                break;
            }
          } else if (isQuest) {
            // Gestion des quêtes
            switch (action) {
              case 'modify':
                // Ouvrir la page de création/modification de quête dans le panel
                setCurrentView('new-quest');
                break;
              case 'archive':
                console.log(`Archivage de la quête: ${itemId}`);
                // TODO: Implémenter l'archivage
                break;
              case 'delete':
                if (confirm('Êtes-vous sûr de vouloir supprimer cette quête ?')) {
                  setCategories(prev => prev.map(cat => ({
                    ...cat,
                    quests: cat.quests.filter(quest => quest.id !== itemId)
                  })));
                  setExpandedQuests(prev => {
                    const newState = { ...prev };
                    delete newState[itemId];
                    return newState;
                  });
                  console.log(`Quête supprimée: ${itemId}`);
                }
                break;
              default:
                break;
            }
          } else {
            // Gestion des catégories
            switch (action) {
              case 'archive':
                console.log(`Archivage de la catégorie: ${itemId}`);
                // TODO: Implémenter l'archivage
                break;
              case 'delete':
                if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                  setCategories(prev => prev.filter(cat => cat.id !== itemId));
                  setExpandedQuests(prev => {
                    const newState = { ...prev };
                    delete newState[itemId];
                    return newState;
                  });
                  setQuestTitles(prev => {
                    const newState = { ...prev };
                    delete newState[itemId];
                    return newState;
                  });
                  console.log(`Catégorie supprimée: ${itemId}`);
                }
                break;
              default:
                break;
            }
          }
        };
        
        // Calcul du pourcentage d'une sous-quête basé sur ses objectifs
        const calculateSubQuestProgress = (subQuest) => {
          if (subQuest.current !== undefined && subQuest.total !== undefined) {
            return Math.round((subQuest.current / subQuest.total) * 100);
          }
          return 0;
        };
        
        // Calcul du pourcentage d'une quête basé sur ses sous-quêtes
        const calculateQuestProgress = (quest) => {
          if (quest.subQuests && quest.subQuests.length > 0) {
            const totalSubQuests = quest.subQuests.length;
            const completedSubQuests = quest.subQuests.filter(subQuest => {
              return calculateSubQuestProgress(subQuest) >= 100;
            }).length;
            return Math.round((completedSubQuests / totalSubQuests) * 100);
          }
          return quest.progress; // Retourner le progrès par défaut si pas de sous-quêtes
        };
        
        // Calcul du pourcentage d'une catégorie basé sur ses quêtes
        const calculateCategoryProgress = (category) => {
          if (category.quests && category.quests.length > 0) {
            const totalQuests = category.quests.length;
            const completedQuests = category.quests.filter(quest => {
              return calculateQuestProgress(quest) >= 100;
            }).length;
            return Math.round((completedQuests / totalQuests) * 100);
          }
          return category.progress; // Retourner le progrès par défaut si pas de quêtes
        };
        
        // Fonction pour obtenir la couleur basée sur le statut
        const getQuestStatusColor = (current, total) => {
          if (current >= total) return 'green';
          if (current > 0) return 'yellow';
          return 'red';
        };
        
        // Fonction pour obtenir la couleur de la barre de progression
        const getProgressBarColor = (current, total) => {
          const status = getQuestStatusColor(current, total);
          switch (status) {
            case 'green': return 'bg-green-500';
            case 'yellow': return 'bg-yellow-500';
            case 'red': return 'bg-red-500';
            default: return 'bg-golden';
          }
        };

        // Ajouter une nouvelle sous-quête à une quête existante
        const addSubQuestToQuest = (categoryId, questId) => {
          const newSubQuestId = `subquest-${Date.now()}`;
          const newSubQuest = { id: newSubQuestId, name: 'Nouvelle sous-quête', current: 0, total: 1 };
          setCategories(prev => prev.map(cat => 
            cat.id === categoryId
              ? { ...cat, quests: cat.quests.map(q => 
                  q.id === questId 
                    ? { ...q, subQuests: [...q.subQuests, newSubQuest] }
                    : q
                )}
              : cat
          ));
        };
        
        // Fonction pour toggle les dropdowns
        const toggleQuestDropdown = (questId) => {
          setExpandedQuests(prev => ({
            ...prev,
            [questId]: !prev[questId]
          }));
        };
        
        // Effet pour fermer le menu contextuel en cliquant ailleurs
        React.useEffect(() => {
          const handleClickOutside = (event) => {
            if (openContextMenu && !event.target.closest('.context-menu')) {
              setOpenContextMenu(null);
            }
          };
          
          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
        }, [openContextMenu]);

        // Gérer les filtres - fermer/ouvrir les dropdowns selon le filtre
        React.useEffect(() => {
          if (questSelectedFilter === 'principales') {
            // Fermer tous les dropdowns pour "Principales"
            setExpandedQuests({});
          } else if (questSelectedFilter === 'aucun') {
            // Ouvrir tous les dropdowns par défaut pour "Aucun"
            const defaultExpanded = {};
            categories.forEach(category => {
              defaultExpanded[category.id] = true;
              if (category.quests) {
                category.quests.forEach(quest => {
                  defaultExpanded[quest.id] = true;
                });
              }
            });
            setExpandedQuests(defaultExpanded);
          }
        }, [questSelectedFilter, categories]);
        
        // Fonction pour créer une nouvelle quête
        const createNewQuest = () => {
          const newQuest = {
            id: `quest-${Date.now()}`,
            title: newQuestTitle || 'Nouvelle quête',
            type: 'quest',
            progress: 0,
            isExpanded: true,
            sponsor: newQuestSponsor,
            reward: newQuestRewards,
            description: newQuestDescription,
            location: newQuestLocation,
            startPoint: newQuestStartPoint,
            destination: newQuestDestination,
            subQuests: []
          };
          
          // Ajouter la quête à la catégorie sélectionnée
          if (newQuestCategory) {
            setCategories(prev => prev.map(cat => 
              cat.id === newQuestCategory
                ? { 
                    ...cat, 
                    quests: [...(cat.quests || []), newQuest] 
                  }
                : cat
            ));
          }
          
          // Réinitialiser le formulaire
          setNewQuestTitle('');
          setNewQuestCategory('');
          setNewQuestLocation('');
          setNewQuestStartPoint('');
          setNewQuestDestination('');
          setNewQuestSponsor('');
          setNewQuestRewards('');
          setNewQuestDescription('');
          
          // Retourner à la page Quêtes
          setCurrentView('quests');
          
          console.log('Nouvelle quête créée:', newQuest);
        };
        
        // Fonction pour annuler la création
        const cancelNewQuest = () => {
          // Réinitialiser le formulaire
          setNewQuestTitle('');
          setNewQuestCategory('');
          setNewQuestLocation('');
          setNewQuestStartPoint('');
          setNewQuestDestination('');
          setNewQuestSponsor('');
          setNewQuestRewards('');
          setNewQuestDescription('');
          
          // Retourner à la page Quêtes
          setCurrentView('quests');
        };

        // Si on est en mode création de quête, afficher le formulaire
        if (currentView === 'new-quest') {
          return (
            <div className="h-full flex flex-col">
              {/* Header avec titre et bouton retour */}
              <div className="flex items-center gap-4 p-6 border-b border-[#552E1A]/20">
                <button
                  onClick={cancelNewQuest}
                  className="flex items-center justify-center w-8 h-8 bg-golden rounded-lg hover:bg-golden/80 transition-colors"
                >
                  <ChevronRight size={16} className="text-[#552E1A] rotate-180" />
                </button>
                <h1 className="text-2xl font-bold text-[#552E1A] eagle-lake-font">Nouvelle quête</h1>
              </div>

              {/* Formulaire */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {/* Champ titre */}
                <div>
                  <input
                    type="text"
                    value={newQuestTitle}
                    onChange={(e) => setNewQuestTitle(e.target.value)}
                    placeholder="Intitulé de la quête..."
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors"
                  />
                </div>

                {/* Champ catégorie */}
                <div className="relative">
                  <select
                    value={newQuestCategory}
                    onChange={(e) => setNewQuestCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#552E1A] pointer-events-none" />
                </div>

                {/* Champ lieu */}
                <div>
                  <input
                    type="text"
                    value={newQuestLocation}
                    onChange={(e) => setNewQuestLocation(e.target.value)}
                    placeholder="Lieu..."
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors"
                  />
                </div>

                {/* Champs localisation en 2 colonnes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      value={newQuestStartPoint}
                      onChange={(e) => setNewQuestStartPoint(e.target.value)}
                      placeholder="Point de départ..."
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newQuestDestination}
                      onChange={(e) => setNewQuestDestination(e.target.value)}
                      placeholder="Destination..."
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Champ commanditaire */}
                <div>
                  <input
                    type="text"
                    value={newQuestSponsor}
                    onChange={(e) => setNewQuestSponsor(e.target.value)}
                    placeholder="Commanditaire..."
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors"
                  />
                </div>

                {/* Section récompenses */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newQuestRewards}
                    onChange={(e) => setNewQuestRewards(e.target.value)}
                    placeholder="Récompenses..."
                    className="flex-1 px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] hover:bg-white/90 transition-colors"
                  >
                    Argent
                  </button>
                  <button
                    type="button"
                    className="px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] hover:bg-white/90 transition-colors"
                  >
                    Exp
                  </button>
                </div>

                {/* Champ description */}
                <div className="flex-1">
                  <textarea
                    value={newQuestDescription}
                    onChange={(e) => setNewQuestDescription(e.target.value)}
                    onKeyDown={handleSlashCommand}
                    placeholder="Description..."
                    rows={8}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors resize-none"
                  />
                </div>
              </div>

                {/* Boutons d'action */}
                <div className="flex justify-end gap-4 px-6 py-8 border-t border-[#552E1A]/20">
                  <button
                    onClick={cancelNewQuest}
                    className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={createNewQuest}
                    className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
                  >
                    Créer la quête
                  </button>
                </div>
            </div>
          );
        }

        return (
          <div className="h-full flex flex-col">
            {/* Barre d'outils */}
            <div className="flex items-center gap-3 p-4 border-b border-[#552E1A]/20">
              {/* Filtre dropdown */}
              <div className="relative">
                <select 
                  value={questSelectedFilter}
                  onChange={(e) => setQuestSelectedFilter(e.target.value)}
                  className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="aucun">Filtrer par Aucun</option>
                  <option value="en-cours">En cours</option>
                  <option value="terminees">Terminées</option>
                  <option value="non-commencees">Non commencées</option>
                  <option value="principales">Principales</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-white" />
                </div>
              </div>
              
              {/* Tri dropdown */}
              <div className="relative">
                <select 
                  value={questSelectedSort}
                  onChange={(e) => setQuestSelectedSort(e.target.value)}
                  className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="aucun">Tri Aucun</option>
                  <option value="nom-asc">Nom (A-Z)</option>
                  <option value="nom-desc">Nom (Z-A)</option>
                  <option value="progression-asc">Progression ↑</option>
                  <option value="progression-desc">Progression ↓</option>
                  <option value="date-creation">Date création</option>
                  <option value="priorite">Priorité</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-white" />
                </div>
              </div>
              
              {/* Bouton de recherche avec dropdown */}
              <div className="relative z-10">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuestShowSearchInput(!questShowSearchInput);
                  }}
                  className="bg-[#552E1A] text-white p-2 rounded-lg border-none hover:bg-[#6B3A2A] transition-colors"
                >
                  <Search size={16} />
                </button>
                
                {questShowSearchInput && (
                  <div className="absolute top-full left-0 mt-2 bg-[#552E1A] rounded-lg p-2 shadow-lg z-20">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={questSearchTerm}
                        onChange={(e) => setQuestSearchTerm(e.target.value)}
                        placeholder="Rechercher..."
                        className="bg-transparent text-white pl-1 pr-1 py-1 text-sm border-none focus:outline-none placeholder-white/70 w-24"
                        autoFocus
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuestShowSearchInput(false);
                          setQuestSearchTerm('');
                        }}
                        className="text-white hover:text-gray-300 transition-colors p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          {/* Contenu scrollable */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {categories
              .filter((category) => {
                // Filtrage par statut
                if (questSelectedFilter === 'en-cours') {
                  const progress = calculateCategoryProgress(category);
                  return progress > 0 && progress < 100;
                } else if (questSelectedFilter === 'terminees') {
                  const progress = calculateCategoryProgress(category);
                  return progress === 100;
                } else if (questSelectedFilter === 'non-commencees') {
                  const progress = calculateCategoryProgress(category);
                  return progress === 0;
                } else if (questSelectedFilter === 'principales') {
                  return true; // Toutes les catégories sont principales
                }
                return true; // Aucun filtre
              })
              .filter((category) => {
                // Filtrage par recherche
                if (!questSearchTerm) return true;
                const searchLower = questSearchTerm.toLowerCase();
                
                // Recherche dans le titre de la catégorie
                if (category.title.toLowerCase().includes(searchLower)) return true;
                
                // Recherche dans les quêtes
                if (category.quests) {
                  for (const quest of category.quests) {
                    if (quest.title.toLowerCase().includes(searchLower)) return true;
                    
                    // Recherche dans les sous-quêtes
                    if (quest.subQuests) {
                      for (const subQuest of quest.subQuests) {
                        if (subQuest.name.toLowerCase().includes(searchLower)) return true;
                      }
                    }
                  }
                }
                
                return false;
              })
              .map((category) => (
              <div key={category.id} className="border border-[#552E1A]/30 rounded-lg bg-[#552E1A]/5">
                <div className="w-full flex items-center justify-between p-3 bg-[#552E1A]/10 hover:bg-[#552E1A]/20 transition-colors">
                  <div className="flex items-center gap-3">
                    {editingQuestTitle === category.id ? (
                      <input
                        type="text"
                        defaultValue={questTitles[category.id] || category.title}
                        onBlur={(e) => {
                          setQuestTitles(prev => ({ ...prev, [category.id]: e.target.value }));
                          setEditingQuestTitle(null);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setQuestTitles(prev => ({ ...prev, [category.id]: e.target.value }));
                            setEditingQuestTitle(null);
                          }
                        }}
                        className="bg-transparent text-black font-semibold eagle-lake-font border-none focus:outline-none text-xl"
                        autoFocus
                      />
                    ) : (
                      <h3 
                        className="text-xl font-semibold text-[#552E1A] eagle-lake-font cursor-pointer hover:text-black transition-colors"
                        onClick={() => setEditingQuestTitle(category.id)}
                      >
                        {questTitles[category.id] || category.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#552E1A] font-medium">{calculateCategoryProgress(category)}%</span>
                    <button 
                      onClick={() => toggleQuestDropdown(category.id)}
                      className="text-[#552E1A] hover:text-black transition-colors"
                    >
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${expandedQuests[category.id] ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <div className="relative flex items-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenContextMenu(openContextMenu === category.id ? null : category.id);
                        }}
                        className="text-[#552E1A] hover:text-black transition-colors ml-2 flex items-center justify-center w-6 h-6"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                          <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                          <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                        </div>
                      </button>
                      
                      {openContextMenu === category.id && (
                        <div className="context-menu absolute right-0 top-full mt-2 bg-white border border-[#552E1A]/30 rounded-lg shadow-lg z-50 min-w-[120px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContextMenuAction(category.id, 'archive');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-[#552E1A] hover:bg-[#552E1A]/10 transition-colors first:rounded-t-lg"
                          >
                            Archiver
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContextMenuAction(category.id, 'delete');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors last:rounded-b-lg"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {expandedQuests[category.id] && (
                  <div className="p-3">
                    <div className="w-full bg-[#552E1A]/20 rounded-full h-2 mb-4">
                      <div className={`h-2 rounded-full ${getProgressBarColor(calculateCategoryProgress(category), 100)}`} style={{width: `${calculateCategoryProgress(category)}%`}}></div>
                    </div>
                    
                    {category.quests && category.quests.length > 0 && (
                      <div className="space-y-4">
                        {category.quests.map((quest) => (
                          <div key={quest.id} className="border border-[#552E1A]/30 rounded-lg bg-[#552E1A]/5 mt-4">
                            <div className="w-full flex items-center justify-between p-3 bg-[#552E1A]/10 hover:bg-[#552E1A]/20 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${getProgressBarColor(calculateQuestProgress(quest), 100)}`}></div>
                                {editingQuestTitle === quest.id ? (
                                  <input
                                    type="text"
                                    defaultValue={quest.title}
                                    onBlur={(e) => {
                                      setCategories(prev => prev.map(cat => 
                                        cat.id === category.id 
                                          ? { ...cat, quests: cat.quests.map(q => q.id === quest.id ? { ...q, title: e.target.value } : q) } 
                                          : cat
                                      ));
                                      setEditingQuestTitle(null);
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        setCategories(prev => prev.map(cat => 
                                          cat.id === category.id 
                                            ? { ...cat, quests: cat.quests.map(q => q.id === quest.id ? { ...q, title: e.target.value } : q) } 
                                            : cat
                                        ));
                                        setEditingQuestTitle(null);
                                      }
                                    }}
                                    className="bg-transparent text-black font-semibold eagle-lake-font border-none focus:outline-none text-lg"
                                    autoFocus
                                  />
                                ) : (
                                  <h4 
                                    className="text-lg font-semibold text-[#552E1A] eagle-lake-font cursor-pointer hover:text-black transition-colors"
                                    onClick={() => setEditingQuestTitle(quest.id)}
                                  >
                                    {quest.title}
                                  </h4>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#552E1A] font-medium">{calculateQuestProgress(quest)}%</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyElementLink('quest', quest.id, quest.title);
                                  }}
                                  className="transition-colors"
                                  style={{ color: 'rgb(85 46 26 / var(--tw-text-opacity, 1))' }}
                                  title="Copier le lien"
                                >
                                  <Copy size={16} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleQuestDropdown(quest.id);
                                  }}
                                  className="text-[#552E1A] hover:text-black transition-colors"
                                >
                                  <ChevronDown 
                                    size={16} 
                                    className={`transition-transform duration-200 ${expandedQuests[quest.id] ? 'rotate-180' : ''}`} 
                                  />
                                </button>
                                <div className="relative flex items-center">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenContextMenu(openContextMenu === quest.id ? null : quest.id);
                                    }}
                                    className="text-[#552E1A] hover:text-black transition-colors ml-2 flex items-center justify-center w-6 h-6"
                                  >
                                    <div className="flex flex-col gap-1">
                                      <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                                      <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                                      <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                                    </div>
                                  </button>
                                  
                                  {openContextMenu === quest.id && (
                                    <div className="context-menu absolute right-0 top-full mt-2 bg-white border border-[#552E1A]/30 rounded-lg shadow-lg z-50 min-w-[120px]">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleContextMenuAction(quest.id, 'modify');
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-[#552E1A] hover:bg-[#552E1A]/10 transition-colors first:rounded-t-lg"
                                      >
                                        Modifier
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleContextMenuAction(quest.id, 'archive');
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-[#552E1A] hover:bg-[#552E1A]/10 transition-colors"
                                      >
                                        Archiver
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleContextMenuAction(quest.id, 'delete');
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors last:rounded-b-lg"
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {expandedQuests[quest.id] && (
                              <div className="p-3">
                                <div className="w-full bg-[#552E1A]/20 rounded-full h-2 mb-4">
                                  <div className={`h-2 rounded-full ${getProgressBarColor(calculateQuestProgress(quest), 100)}`} style={{width: `${calculateQuestProgress(quest)}%`}}></div>
                                </div>

                                <div className="space-y-3 text-sm">
                                  <div>
                                    <span className="font-medium text-[#552E1A]">Commanditaire : </span>
                                    <span 
                                      className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors underline hover:no-underline"
                                      onClick={() => openCharacterSheet(quest.sponsor)}
                                    >
                                      {quest.sponsor}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-[#552E1A]">Récompense : </span>
                                    <span className="text-[#552E1A]/80">{quest.reward}</span>
                                  </div>
                                  <div className="text-[#552E1A]/80 leading-relaxed">
                                    {quest.description}
                                  </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                  {quest.subQuests.map((subQuest) => (
                                    <div key={subQuest.id} className={`flex items-center justify-between rounded-lg p-3 border transition-colors ${
                                      getQuestStatusColor(subQuest.current, subQuest.total) === 'green' 
                                        ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                                        : getQuestStatusColor(subQuest.current, subQuest.total) === 'yellow'
                                        ? 'bg-yellow-50 border-yellow-240 hover:bg-yellow-100'
                                        : 'bg-red-50 border-red-200 hover:bg-red-100'
                                    }`}>
                                      <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${
                                          getQuestStatusColor(subQuest.current, subQuest.total) === 'green' 
                                            ? 'bg-green-500' 
                                            : getQuestStatusColor(subQuest.current, subQuest.total) === 'yellow'
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                        }`}></div>
                                        <div className="flex-1">
                                          {editingObjectiveName === subQuest.id ? (
                                          <input
                                            type="text"
                                            defaultValue={subQuest.name}
                                            onBlur={(e) => {
                                              setCategories(prev => prev.map(cat => 
                                                cat.id === category.id 
                                                  ? { ...cat, quests: cat.quests.map(q => 
                                                      q.id === quest.id 
                                                        ? { ...q, subQuests: q.subQuests.map(sq => 
                                                            sq.id === subQuest.id ? { ...sq, name: e.target.value } : sq
                                                          )} 
                                                        : q
                                                    )} 
                                                  : cat
                                              ));
                                              setEditingObjectiveName(null);
                                            }}
                                            onKeyPress={(e) => {
                                              if (e.key === 'Enter') {
                                                setCategories(prev => prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? { ...cat, quests: cat.quests.map(q => 
                                                        q.id === quest.id 
                                                          ? { ...q, subQuests: q.subQuests.map(sq => 
                                                              sq.id === subQuest.id ? { ...sq, name: e.target.value } : sq
                                                            )} 
                                                          : q
                                                      )} 
                                                    : cat
                                                ));
                                                setEditingObjectiveName(null);
                                              }
                                            }}
                                            className="bg-transparent text-black font-medium border-none focus:outline-none text-[#552E1A]"
                                            autoFocus
                                          />
                                        ) : (
                                          <span 
                                            className="text-[#552E1A] font-medium cursor-pointer hover:text-black transition-colors"
                                            onClick={() => setEditingObjectiveName(subQuest.id)}
                                          >
                                            {subQuest.name}
                                          </span>
                                        )}
                                        
                                        {/* Barre de progression pour la sous-quête */}
                                        <div className="w-full bg-[#552E1A]/20 rounded-full h-1.5 mt-2">
                                          <div 
                                            className={`h-1.5 rounded-full ${getProgressBarColor(subQuest.current, subQuest.total)}`} 
                                            style={{width: `${(subQuest.current / subQuest.total) * 100}%`}}
                                          ></div>
                                        </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="flex items-center min-w-[50px] justify-end">
                                          {editingQuestCount === subQuest.id ? (
                                            <div className="flex items-center gap-1">
                                              <input
                                                type="number"
                                                defaultValue={subQuest.current}
                                                min="0"
                                                max={subQuest.total}
                                                onBlur={(e) => {
                                                  const newValue = Math.max(0, Math.min(parseInt(e.target.value) || 0, subQuest.total));
                                                  setCategories(prev => prev.map(cat => 
                                                    cat.id === category.id 
                                                      ? { ...cat, quests: cat.quests.map(q => 
                                                          q.id === quest.id 
                                                            ? { ...q, subQuests: q.subQuests.map(sq => 
                                                                sq.id === subQuest.id ? { ...sq, current: newValue } : sq
                                                              )} 
                                                            : q
                                                        )} 
                                                      : cat
                                                  ));
                                                  setEditingQuestCount(null);
                                                }}
                                                onKeyPress={(e) => {
                                                  if (e.key === 'Enter') {
                                                    const newValue = Math.max(0, Math.min(parseInt(e.target.value) || 0, subQuest.total));
                                                    setCategories(prev => prev.map(cat => 
                                                      cat.id === category.id 
                                                        ? { ...cat, quests: cat.quests.map(q => 
                                                            q.id === quest.id 
                                                              ? { ...q, subQuests: q.subQuests.map(sq => 
                                                                  sq.id === subQuest.id ? { ...sq, current: newValue } : sq
                                                                )} 
                                                              : q
                                                          )} 
                                                        : cat
                                                    ));
                                                    setEditingQuestCount(null);
                                                  }
                                                }}
                                                className="bg-white text-black text-center border border-[#552E1A]/30 rounded px-1 py-1 text-sm font-medium w-8 focus:outline-none focus:ring-2 focus:ring-golden/50"
                                                autoFocus
                                              />
                                              <span className="text-[#552E1A] font-medium">/ {subQuest.total}</span>
                                            </div>
                                          ) : editingQuestTotal === subQuest.id ? (
                                            <div className="flex items-center gap-1">
                                              <span className="text-[#552E1A] font-medium">{subQuest.current}</span>
                                              <span className="text-[#552E1A] font-medium">/</span>
                                              <input
                                                type="number"
                                                defaultValue={subQuest.total}
                                                min="1"
                                                onBlur={(e) => {
                                                  const newTotal = Math.max(1, parseInt(e.target.value) || 1);
                                                  const newCurrent = Math.min(subQuest.current, newTotal);
                                                  setCategories(prev => prev.map(cat => 
                                                    cat.id === category.id 
                                                      ? { ...cat, quests: cat.quests.map(q => 
                                                          q.id === quest.id 
                                                            ? { ...q, subQuests: q.subQuests.map(sq => 
                                                                sq.id === subQuest.id ? { ...sq, total: newTotal, current: newCurrent } : sq
                                                              )} 
                                                            : q
                                                        )} 
                                                      : cat
                                                  ));
                                                  setEditingQuestTotal(null);
                                                }}
                                                onKeyPress={(e) => {
                                                  if (e.key === 'Enter') {
                                                    const newTotal = Math.max(1, parseInt(e.target.value) || 1);
                                                    const newCurrent = Math.min(subQuest.current, newTotal);
                                                    setCategories(prev => prev.map(cat => 
                                                      cat.id === category.id 
                                                        ? { ...cat, quests: cat.quests.map(q => 
                                                            q.id === quest.id 
                                                              ? { ...q, subQuests: q.subQuests.map(sq => 
                                                                  sq.id === subQuest.id ? { ...sq, total: newTotal, current: newCurrent } : sq
                                                                )} 
                                                              : q
                                                          )} 
                                                        : cat
                                                    ));
                                                    setEditingQuestTotal(null);
                                                  }
                                                }}
                                                className="bg-white text-black text-center border border-[#552E1A]/30 rounded px-1 py-1 text-sm font-medium w-8 focus:outline-none focus:ring-2 focus:ring-golden/50"
                                                autoFocus
                                              />
                                            </div>
                                          ) : (
                                            <div className="flex items-center gap-1">
                                              <span 
                                                className={`font-medium text-right w-6 cursor-pointer hover:opacity-70 transition-opacity ${
                                                  getQuestStatusColor(subQuest.current, subQuest.total) === 'green' 
                                                    ? 'text-green-600' 
                                                    : getQuestStatusColor(subQuest.current, subQuest.total) === 'yellow'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-600'
                                                }`}
                                                onClick={() => setEditingQuestCount(subQuest.id)}
                                              >
                                                {subQuest.current}
                                              </span>
                                              <span className="text-[#552E1A] font-medium">/</span>
                                              <span 
                                                className="text-[#552E1A] font-medium cursor-pointer hover:text-black transition-colors"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setEditingQuestTotal(subQuest.id);
                                                }}
                                              >
                                                {subQuest.total}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                        <div className="relative flex items-center">
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenContextMenu(openContextMenu === subQuest.id ? null : subQuest.id);
                                            }}
                                            className="text-[#552E1A] hover:text-black transition-colors ml-2 flex items-center justify-center w-6 h-6"
                                          >
                                            <div className="flex flex-col gap-1">
                                              <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                                              <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                                              <div className="w-1 h-1 bg-[#552E1A] rounded-full"></div>
                                            </div>
                                          </button>
                                          
                                          {openContextMenu === subQuest.id && (
                                            <div className="context-menu absolute right-0 top-full mt-2 bg-white border border-[#552E1A]/30 rounded-lg shadow-lg z-50 min-w-[120px]">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleContextMenuAction(subQuest.id, 'delete');
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                                              >
                                                Supprimer
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="pt-2 flex justify-end">
                                    <button
                                      onClick={() => addSubQuestToQuest(category.id, quest.id)}
                                      className="mt-2 inline-flex items-center gap-2 text-[#552E1A] hover:text-black bg-[#552E1A]/10 hover:bg-[#552E1A]/20 border border-[#552E1A]/20 px-3 py-2 rounded transition-colors text-sm"
                                    >
                                      <Plus size={14} /> Ajouter une sous-quête
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {(!category.quests || category.quests.length === 0) && (
                      <div className="text-center py-8 text-[#552E1A]/60">
                        <p className="text-sm">Aucune quête pour le moment</p>
                        <p className="text-xs mt-1">Cliquez sur le titre pour l'éditer</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bouton fixe Nouvelle catégorie - Position fixe en bas à droite */}
          <div className="fixed bottom-12 right-6 z-50">
            <button 
              onClick={createNewCategory}
              className="bg-golden text-[#552E1A] py-3 px-4 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2 eagle-lake-font shadow-lg"
            >
              <Plus size={16} />
              Nouvelle catégorie
            </button>
          </div>
        </div>
        );
      })()
    },
    {
      id: 'characters',
      title: 'Personnages',
      icon: '👤',
      closedImage: '/images/templates/character-tab-closed.svg',
      openImage: '/images/templates/character-tab-open.svg',
      color: 'from-green-500 to-green-600',
      content: (
        <div className="h-full flex flex-col">
          {/* Barre d'outils - Affichée seulement pour la vue characters */}
          {characterCurrentView === 'characters' && (
            <div className="flex items-center gap-3 mb-6 flex-shrink-0">
              <div className="relative">
                <select 
                  value={characterSelectedFilter} 
                  onChange={(e) => setCharacterSelectedFilter(e.target.value)}
                  className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="aucun">Filtrer par Aucun</option>
                  <optgroup label="Catégorie">
                    <option value="categorie-aventuriers">Aventuriers</option>
                    <option value="categorie-allies">Alliés</option>
                    <option value="categorie-adversaires">Adversaires</option>
                  </optgroup>
                  <optgroup label="Classe">
                    <option value="classe-mage">Mage</option>
                    <option value="classe-guerrier">Guerrier</option>
                    <option value="classe-voleur">Voleur</option>
                    <option value="classe-clerc">Clerc</option>
                    <option value="classe-barbare">Barbare</option>
                    <option value="classe-paladin">Paladin</option>
                    <option value="classe-druide">Druide</option>
                    <option value="classe-assassin">Assassin</option>
                    <option value="classe-sorcier">Sorcier</option>
                  </optgroup>
                  <optgroup label="Niveau">
                    <option value="niveau-1-3">1-3</option>
                    <option value="niveau-4-6">4-6</option>
                    <option value="niveau-7-plus">7+</option>
                  </optgroup>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
              </div>
              <div className="relative">
                <select 
                  value={characterSelectedSort} 
                  onChange={(e) => setCharacterSelectedSort(e.target.value)}
                  className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="aucun">Tri Aucun</option>
                  <option value="nom-asc">Nom (A-Z)</option>
                  <option value="nom-desc">Nom (Z-A)</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
              </div>
              <div className="relative">
                <button
                  onClick={() => setCharacterShowSearchInput(!characterShowSearchInput)}
                  className="bg-[#552E1A] text-white p-2 rounded-lg hover:bg-[#6B3A2A] transition-colors"
                >
                  <Search size={16} />
                </button>
                {characterShowSearchInput && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <input
                      type="text"
                      value={characterSearchTerm}
                      onChange={(e) => setCharacterSearchTerm(e.target.value)}
                      placeholder="Rechercher..."
                      className="w-24 pl-1 pr-1 py-2 bg-white border border-[#552E1A]/30 rounded-lg text-[#552E1A] text-sm focus:outline-none focus:ring-2 focus:ring-golden/50"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contenu */}
          <div className="flex-1 overflow-y-auto pr-4">
            {characterCurrentView === 'characters' && getFilteredAndSortedCharacters().map(category => (
              <div key={category.id} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#552E1A] eagle-lake-font">{category.title}</h3>
                  <button 
                    onClick={() => setCharacterCurrentView('new-character')}
                    className="bg-golden text-[#552E1A] px-4 py-2 rounded-lg font-semibold hover:bg-golden/80 transition-colors eagle-lake-font"
                  >
                    Créer un personnage
                  </button>
                </div>
                {category.isExpanded && (
                  <div className="grid grid-cols-2 gap-4">
                    {category.characters.map(character => (
                        <div
                          key={character.id}
                          onClick={() => openCharacterConsultation(character)}
                          className="bg-white/70 border border-[#552E1A]/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                        {/* Zone image */}
                        <div className="relative aspect-[4/3] bg-gray-100 border border-[#552E1A]/30 rounded-lg m-2">
                          {/* Zone tags éditables (comme objets) */}
                          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                            <div
                              className="flex flex-wrap gap-1 justify-end max-w-[70%] cursor-text"
                              onClick={(e) => { e.stopPropagation(); setEditingCharacterTagsId(character.id); }}
                            >
                              {(character.tags || []).map((tag, index) => (
                                <span key={index} className="text-white px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1" style={{ backgroundColor: '#46718A' }}>
                                  {tag}
                                  {editingCharacterTagsId === character.id && (
                                    <button onClick={(e) => { e.stopPropagation(); removeTagFromCharacter(category.id, character.id, tag); }} className="hover:bg-red-500/80 rounded-full p-0.5 transition-colors group" title="Supprimer ce tag">
                                      <X size={10} className="text-white group-hover:text-red-100" />
                                    </button>
                                  )}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              {editingCharacterTagsId === character.id ? (
                                <>
                                  <input type="text" value={editingCharacterTagInput} onChange={(e) => setEditingCharacterTagInput(e.target.value)} placeholder="Ajouter un tag" className="bg-white/90 border border-[#552E1A]/30 rounded px-2 py-0.5 text-xs text-[#552E1A]" onKeyPress={(e) => { if (e.key === 'Enter') { addTagToCharacter(category.id, character.id, editingCharacterTagInput); setEditingCharacterTagInput(''); } }} />
                                  <button onClick={(e) => { e.stopPropagation(); addTagToCharacter(category.id, character.id, editingCharacterTagInput); setEditingCharacterTagInput(''); }} className="bg-[#552E1A] text-white px-2 py-0.5 rounded text-xs">Ajouter</button>
                                </>
                              ) : (
                                <button onClick={(e) => { e.stopPropagation(); setEditingCharacterTagsId(character.id); }} className="w-6 h-6 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors" title="Modifier les tags">
                                  <span className="text-[#552E1A] text-xs font-bold">+</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Footer */}
                        <div className="p-3 flex items-center justify-between">
                          <span className="text-left text-[#552E1A] font-medium">{character.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyElementLink('character', character.id, character.name);
                            }}
                            className="text-golden hover:text-golden/80 transition-colors"
                            title="Copier le lien"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Vue consultation personnage */}
            {characterCurrentView === 'consultation' && selectedCharacter && (
              <div className="max-w-7xl">
                {/* Header avec bouton retour et titre */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCharacterCurrentView('characters')}
                      className="flex items-center justify-center w-8 h-8 bg-golden rounded-lg hover:bg-golden/80 transition-colors"
                    >
                      <ChevronRight size={16} className="text-[#552E1A] rotate-180" />
                    </button>
                    <h1 className="text-2xl font-bold text-[#552E1A] eagle-lake-font">
                      {selectedCharacter.name}
                    </h1>
                  </div>
                  <button
                    onClick={() => copyElementLink('character', selectedCharacter.id, selectedCharacter.name)}
                    className="flex items-center gap-2 px-3 py-2 bg-golden/20 hover:bg-golden/30 text-golden rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                    <span className="text-sm font-medium">Copier le lien</span>
                  </button>
                </div>

                {/* Navigation par onglets */}
                <div className="flex border-b border-[#552E1A]/20 mb-4">
                  <button
                    onClick={() => setCharacterActiveTab('biographie')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      characterActiveTab === 'biographie'
                        ? 'text-[#552E1A] border-b-2 border-golden'
                        : 'text-[#552E1A]/60 hover:text-[#552E1A]'
                    }`}
                  >
                    Biographie
                  </button>
                  <button
                    onClick={() => setCharacterActiveTab('feuille')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      characterActiveTab === 'feuille'
                        ? 'text-[#552E1A] border-b-2 border-golden'
                        : 'text-[#552E1A]/60 hover:text-[#552E1A]'
                    }`}
                  >
                    Feuille de personnage
                  </button>
                  <button
                    onClick={() => setCharacterActiveTab('inventaire')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      characterActiveTab === 'inventaire'
                        ? 'text-[#552E1A] border-b-2 border-golden'
                        : 'text-[#552E1A]/60 hover:text-[#552E1A]'
                    }`}
                  >
                    Inventaire
                  </button>
                </div>

                {/* Contenu des onglets */}
                {characterActiveTab === 'biographie' && (
                  <>
                    {/* Section informations principales - Layout 2 colonnes */}
                    <div className="grid grid-cols-2 gap-8 mb-4">
                      {/* Colonne gauche - Métadonnées */}
                      <div className="space-y-4">
                        <div>
                          <span className="font-bold text-[#552E1A]">Classe : </span>
                          <span className="text-[#552E1A]">{selectedCharacter.class || 'Non définie'}</span>
                        </div>
                        <div className="flex gap-4 whitespace-nowrap">
                          <div>
                            <span className="font-bold text-[#552E1A]">Espèce : </span>
                            <span className="text-[#552E1A]">Humain</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#552E1A]">Genre : </span>
                            <span className="text-[#552E1A]">Sexe</span>
                          </div>
                        </div>
                        <div className="flex gap-4 whitespace-nowrap">
                          <div>
                            <span className="font-bold text-[#552E1A]">Âge : </span>
                            <span className="text-[#552E1A]">0 ans</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#552E1A]">Taille : </span>
                            <span className="text-[#552E1A]">0,00m</span>
                          </div>
                        </div>
                        <div className="flex gap-4 whitespace-nowrap">
                          <div>
                            <span className="font-bold text-[#552E1A]">Métier : </span>
                            <span className="text-[#552E1A]">Aventurier</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#552E1A]">Niveau : </span>
                            <span className="text-[#552E1A]">{selectedCharacter.level || '00'}</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-[#552E1A]">Expérience : </span>
                          <span className="text-[#552E1A]">0 XP</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#552E1A]">Alignement : </span>
                          <span className="text-[#552E1A]">Neutre</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#552E1A]">Divinité : </span>
                          <span className="text-[#552E1A]">Non définie</span>
                        </div>
                        <div className="flex gap-4 whitespace-nowrap">
                          <div>
                            <span className="font-bold text-[#552E1A]">Niveau : </span>
                            <span className="text-[#552E1A]">{selectedCharacter.level || '00'}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#552E1A]">Altération : </span>
                            <span className="text-[#552E1A]">+0</span>
                          </div>
                        </div>
                        <div className="flex gap-4 whitespace-nowrap">
                          <div>
                            <span className="font-bold text-[#552E1A]">Affiliations : </span>
                            <span className="text-[#552E1A]">Groupe ; Guilde ; Cour ; Culte</span>
                          </div>
                        </div>
                      </div>

                      {/* Colonne droite - Portrait */}
                      <div>
                        <div
                          className="w-full h-64 bg-gray-200 rounded-lg border border-[#552E1A]/20 flex items-center justify-center"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                              linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                              linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                            `,
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                          }}
                        >
                          <div className="text-[#552E1A]/60 text-center">
                            <div className="text-4xl mb-2">🧙‍♂️</div>
                            <p className="text-sm">Portrait du personnage</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section description/biographie */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-[#552E1A] mb-3 eagle-lake-font">
                        Description
                      </h3>
                      <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 h-32 overflow-y-auto">
                        <div className="text-[#552E1A] text-justify leading-relaxed">
                          {selectedCharacter.description || 'Alors que vous franchissez les dernières collines embrumées, vous apercevez au loin une silhouette encapuchonnée qui semble vous observer depuis les hauteurs. Cette figure mystérieuse, dont les traits restent cachés dans l\'ombre de sa capuche, émane une aura de sagesse ancienne et de pouvoir latent. Ses gestes sont mesurés, ses paroles rares mais toujours pertinentes. Ce personnage, bien qu\'énigmatique, semble détenir des connaissances précieuses sur les terres que vous traversez et les dangers qui vous attendent.'}
                        </div>
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-[#552E1A]/20">
                      <button
                        onClick={() => {
                          setNewCharacterName(selectedCharacter.name);
                          setNewCharacterDescription(selectedCharacter.description || '');
                          setNewCharacterCategory(selectedCharacter.categoryId || '');
                          setNewCharacterLevel(selectedCharacter.level || '');
                          setNewCharacterClass(selectedCharacter.class || '');
                          setNewCharacterTags(selectedCharacter.tags || []);
                          setNewCharacterTag('');
                          setCharacterCurrentView('new-character');
                        }}
                        className="bg-[#F5F1E8] text-[#552E1A] px-2 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium flex items-center gap-2 h-12"
                      >
                        <Edit size={16} />
                        Modifier
                      </button>
                      <button
                        onClick={() => {
                          setCharacterCurrentView('assign-character');
                        }}
                        className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium flex items-center gap-2 h-12"
                      >
                        <Star size={16} />
                        Attribuer
                      </button>
                      <button
                        onClick={async () => {
                          const link = `${window.location.origin}/campaigns/default-campaign/characters/${selectedCharacter.id}`;
                          try {
                            await navigator.clipboard.writeText(link);
                            showToast('Lien copié ! Vous pouvez maintenant le coller sur le dashboard.', 'success');
                          } catch (err) {
                            console.error('Erreur lors de la copie:', err);
                            showToast('Erreur lors de la copie du lien.', 'error');
                          }
                        }}
                        className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2 h-12 whitespace-nowrap"
                      >
                        <Copy size={16} />
                        Copier le lien
                      </button>
                    </div>
                  </>
                )}

                {characterActiveTab === 'feuille' && (
                  <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                    {/* Section Caractéristiques principales */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#552E1A] mb-4 eagle-lake-font">
                        Caractéristiques
                      </h3>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 text-center">
                          <h4 className="font-bold text-[#552E1A] mb-2">Corps</h4>
                          <div 
                            className="text-2xl font-bold text-[#552E1A] cursor-pointer hover:bg-[#E8E0D0] rounded px-2 py-1 transition-colors"
                            onClick={() => {
                              const newValue = prompt('Nouvelle valeur pour Corps (0-100):', consultationPrimaryStats.corps);
                              if (newValue !== null && !isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                                setConsultationPrimaryStats(prev => ({ ...prev, corps: parseInt(newValue) }));
                              }
                            }}
                          >
                            {consultationPrimaryStats.corps}%
                          </div>
                        </div>
                        <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 text-center">
                          <h4 className="font-bold text-[#552E1A] mb-2">Relationnel</h4>
                          <div 
                            className="text-2xl font-bold text-[#552E1A] cursor-pointer hover:bg-[#E8E0D0] rounded px-2 py-1 transition-colors"
                            onClick={() => {
                              const newValue = prompt('Nouvelle valeur pour Relationnel (0-100):', consultationPrimaryStats.relationnel);
                              if (newValue !== null && !isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                                setConsultationPrimaryStats(prev => ({ ...prev, relationnel: parseInt(newValue) }));
                              }
                            }}
                          >
                            {consultationPrimaryStats.relationnel}%
                          </div>
                        </div>
                        <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 text-center">
                          <h4 className="font-bold text-[#552E1A] mb-2">Esprit</h4>
                          <div 
                            className="text-2xl font-bold text-[#552E1A] cursor-pointer hover:bg-[#E8E0D0] rounded px-2 py-1 transition-colors"
                            onClick={() => {
                              const newValue = prompt('Nouvelle valeur pour Esprit (0-100):', consultationPrimaryStats.esprit);
                              if (newValue !== null && !isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                                setConsultationPrimaryStats(prev => ({ ...prev, esprit: parseInt(newValue) }));
                              }
                            }}
                          >
                            {consultationPrimaryStats.esprit}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Statistiques secondaires */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#552E1A] mb-4 eagle-lake-font">
                        Statistiques
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-1">PV max</label>
                            <input 
                              type="number" 
                              value={consultationSecondaryStats.pvMax} 
                              onChange={(e) => setConsultationSecondaryStats(prev => ({ ...prev, pvMax: parseInt(e.target.value) || 0 }))}
                              className="w-full h-10 bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-1">PV actuels</label>
                            <input 
                              type="number" 
                              value={consultationSecondaryStats.pvActuels} 
                              onChange={(e) => setConsultationSecondaryStats(prev => ({ ...prev, pvActuels: parseInt(e.target.value) || 0 }))}
                              className="w-full h-10 bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-1">Résistance</label>
                            <input 
                              type="number" 
                              value={consultationSecondaryStats.resistance} 
                              onChange={(e) => setConsultationSecondaryStats(prev => ({ ...prev, resistance: parseInt(e.target.value) || 0 }))}
                              className="w-full h-10 bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-1">Nb Récup./jour</label>
                            <input 
                              type="number" 
                              value={consultationSecondaryStats.nbRecupJour} 
                              onChange={(e) => setConsultationSecondaryStats(prev => ({ ...prev, nbRecupJour: parseInt(e.target.value) || 0 }))}
                              className="w-full h-10 bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-1">Nb Récup. actuel</label>
                            <input 
                              type="number" 
                              value={consultationSecondaryStats.nbRecupActuel} 
                              onChange={(e) => setConsultationSecondaryStats(prev => ({ ...prev, nbRecupActuel: parseInt(e.target.value) || 0 }))}
                              className="w-full h-10 bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-1">Valeur de récup.</label>
                            <input 
                              type="number" 
                              value={consultationSecondaryStats.valeurRecup} 
                              onChange={(e) => setConsultationSecondaryStats(prev => ({ ...prev, valeurRecup: parseInt(e.target.value) || 0 }))}
                              className="w-full h-10 bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Compétences */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-[#552E1A] eagle-lake-font">
                          Compétences
                        </h3>
                        <button
                          onClick={() => {
                            setConsultationSkills(prev => [...prev, { id: Date.now(), name: 'Nouvelle compétence', value: 0 }]);
                          }}
                          className="bg-golden text-[#552E1A] px-4 py-2 rounded-lg font-medium hover:bg-golden/80 transition-colors flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Ajouter une compétence
                        </button>
                      </div>
                      <div className="space-y-3">
                        {consultationSkills.map((skill, index) => (
                          <div key={skill.id} className="flex items-center justify-between bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-4">
                              <span className="text-[#552E1A] font-medium">{skill.name}</span>
                              <input
                                type="number"
                                value={skill.value}
                                onChange={(e) => {
                                  const newSkills = [...consultationSkills];
                                  newSkills[index].value = parseInt(e.target.value) || 0;
                                  setConsultationSkills(newSkills);
                                }}
                                className="w-16 h-8 bg-white border border-[#552E1A]/20 rounded px-2 text-[#552E1A] text-center focus:outline-none focus:ring-2 focus:ring-golden/50"
                                placeholder="+00"
                              />
                            </div>
                            <button
                              onClick={() => {
                                if (confirm('Supprimer cette compétence ?')) {
                                  setConsultationSkills(prev => prev.filter((_, i) => i !== index));
                                }
                              }}
                              className="w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                              title="Supprimer cette compétence"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {characterActiveTab === 'inventaire' && (
                  <div className="relative">
                    {/* Grille d'inventaire 2x2 */}
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      {consultationInventory.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            if (!item.objectId) return;
                            let found = null;
                            for (const cat of objectCategories) {
                              const o = (cat.objects || []).find(x => x.id === item.objectId);
                              if (o) { found = o; break; }
                            }
                            if (found) {
                              setSelectedObject(found);
                              setObjectCurrentView('consultation');
                              setActiveTab('objects');
                            }
                          }}
                          className="bg-white/70 border border-[#552E1A]/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          {/* Zone image style cartes Objets */}
                          <div className="relative aspect-[4/3] bg-gray-100 border border-[#552E1A]/30 rounded-lg m-2">
                            {/* Damier */}
                            <div
                              className="w-full h-full opacity-20 rounded-lg"
                              style={{
                                backgroundImage: `
                                  linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                  linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                  linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                  linear-gradient(-45deg, transparent 75%, #ccc 75%)
                                `,
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                              }}
                            />

                            {/* Tags (overlay, même fonctionnement) */}
                            <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                              <div className="flex flex-wrap gap-1 justify-end max-w-[70%]">
                                {item.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="text-white px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1"
                                    style={{ backgroundColor: '#46718A' }}
                                  >
                                    {tag}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('Supprimer ce tag ?')) {
                                          const newInventory = [...consultationInventory];
                                          newInventory[index].tags = newInventory[index].tags.filter((_, i) => i !== tagIndex);
                                          setConsultationInventory(newInventory);
                                        }
                                      }}
                                      className="hover:bg-red-500/80 rounded-full p-0.5 transition-colors group"
                                      title="Supprimer ce tag"
                                    >
                                      <X size={8} className="text-white group-hover:text-red-100" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newTag = prompt('Ajouter un tag:');
                                    if (newTag && newTag.trim()) {
                                      const newInventory = [...consultationInventory];
                                      newInventory[index].tags = [...newInventory[index].tags, newTag.trim()];
                                      setConsultationInventory(newInventory);
                                    }
                                  }}
                                  className="w-6 h-6 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                                  title="Ajouter un tag"
                                >
                                  <span className="text-[#552E1A] text-xs font-bold">+</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Footer comme cartes Objets */}
                          <div className="p-3 flex items-center justify-between">
                            <span className="text-left text-[#552E1A] font-medium">
                              {item.label}
                            </span>
                            <button
                              onClick={async () => {
                                const link = `${window.location.origin}/campaigns/default-campaign/characters/${selectedCharacter?.id || 'unknown'}#inventory-${item.id}`;
                                try {
                                  await navigator.clipboard.writeText(link);
                                  showToast('Lien copié ! Vous pouvez maintenant le coller sur le dashboard.', 'success');
                                } catch (err) {
                                  console.error('Erreur lors de la copie:', err);
                                  showToast('Erreur lors de la copie du lien.', 'error');
                                }
                              }}
                              className="w-6 h-6 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                              title="Copier le lien"
                            >
                              <Copy size={12} className="text-[#552E1A]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Bouton Ajouter un objet (fixe en bas à droite) */}
                    <button
                      onClick={() => {
                        const newId = `obj-${Date.now()}`;
                        const newObj = {
                          id: newId,
                          name: 'Nouvel objet',
                          tags: [],
                          image: null,
                          level: '00',
                          alteration: '+0'
                        };
                        // Ajoute l'objet à la 1ère catégorie Objets
                        setObjectCategories(prev => {
                          const copy = prev.map(c => ({ ...c, objects: [...c.objects] }));
                          if (copy.length > 0) {
                            copy[0].objects.push(newObj);
                          }
                          return copy;
                        });
                        // Crée un slot d'inventaire lié à cet objet
                        setConsultationInventory(prev => [...prev, { id: Date.now(), label: newObj.name, tags: [], objectId: newId }]);
                      }}
                      className="fixed bottom-24 right-6 bg-golden text-[#552E1A] px-4 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2 shadow-lg z-50"
                    >
                      <Plus size={16} />
                      Ajouter un objet
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Vue nouveau personnage */}
            {characterCurrentView === 'new-character' && (
              <div className="max-w-5xl">
                {/* Header avec bouton retour (style consultation objet) */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setCharacterCurrentView('characters')}
                    className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                  >
                    <ArrowLeft size={16} className="text-[#552E1A]" />
                  </button>
                  <h1 className="text-2xl font-bold text-[#552E1A] eagle-lake-font">
                    Nouveau personnage
                  </h1>
                </div>

                {/* Formulaire */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Colonne gauche - Formulaire */}
                  <div className="space-y-3">
                    {/* Catégorie */}
                    <div>
                      <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                        Catégorie
                      </label>
                      <select
                        value={newCharacterCategory}
                        onChange={(e) => setNewCharacterCategory(e.target.value)}
                        className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] focus:outline-none focus:ring-2 focus:ring-golden/50"
                        style={{ width: '218px' }}
                      >
                        <option value="">Sélection de catégorie</option>
                        {characterCategories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Identité: Prénom / Nom (2 colonnes) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="w-[100px]">
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Prénom</label>
                        <input type="text" value={newCharacterFirstName} onChange={(e) => setNewCharacterFirstName(e.target.value)} placeholder="Prénom" className="w-[100px] h-[42px] bg-[#F5F1E8] text-[#552E1A] px-4 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60" />
                      </div>
                      <div className="w-[100px]">
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Nom</label>
                        <input type="text" value={newCharacterLastName} onChange={(e) => setNewCharacterLastName(e.target.value)} placeholder="Nom" className="w-[100px] h-[42px] bg-[#F5F1E8] text-[#552E1A] px-4 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60" />
                      </div>
                    </div>

                    {/* Classe / Espèce (2 colonnes) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Classe</label>
                        <input type="text" value={newCharacterClass} onChange={(e) => setNewCharacterClass(e.target.value)} placeholder="Classe" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Espèce</label>
                        <input type="text" value={newCharacterSpecies} onChange={(e) => setNewCharacterSpecies(e.target.value)} placeholder="Espèce" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                    </div>

                    {/* Genre / Âge / Taille (3 colonnes) */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Genre</label>
                        <input type="text" value={newCharacterGender} onChange={(e) => setNewCharacterGender(e.target.value)} placeholder="Genre" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Âge</label>
                        <input type="text" value={newCharacterAge} onChange={(e) => setNewCharacterAge(e.target.value)} placeholder="Âge" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Taille</label>
                        <input type="text" value={newCharacterHeight} onChange={(e) => setNewCharacterHeight(e.target.value)} placeholder="Taille" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                    </div>

                    {/* Métier / Niveau / XP (3 colonnes) */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Métier</label>
                        <input type="text" value={newCharacterJob} onChange={(e) => setNewCharacterJob(e.target.value)} placeholder="Métier" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Niveau</label>
                        <input type="text" value={newCharacterLevel} onChange={(e) => setNewCharacterLevel(e.target.value)} placeholder="Niveau" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">XP</label>
                        <input type="text" value={newCharacterXP} onChange={(e) => setNewCharacterXP(e.target.value)} placeholder="XP" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                      </div>
                    </div>

                    {/* Affiliations - pleine largeur */}
                    <div>
                      <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Affiliations</label>
                      <input type="text" value={newCharacterAffiliations} onChange={(e) => setNewCharacterAffiliations(e.target.value)} placeholder="Affiliations" className="w-full h-[42px] bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg px-3 text-[#552E1A] placeholder-[#552E1A]/60 focus:outline-none focus:ring-2 focus:ring-golden/50" />
                    </div>
                  </div>

                  {/* Colonne droite - Zone d'image */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Portrait
                    </label>
                    <div
                      className="w-full h-64 bg-gray-200 rounded-lg border border-[#552E1A]/20 flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                          linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                          linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                      }}
                    >
                      <div className="text-[#552E1A]/60 text-center">
                        <div className="text-4xl mb-2">👤</div>
                        <p className="text-sm">Portrait du personnage</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description pleine largeur (comme Nouvel objet) */}
                <div className="mt-4 max-w-5xl">
                  <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">Description</label>
                  <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-3 max-h-24 overflow-y-auto">
                    <textarea
                      value={newCharacterDescription}
                      onChange={(e) => setNewCharacterDescription(e.target.value)}
                      onKeyDown={handleSlashCommand}
                      placeholder="Description du personnage..."
                      rows={3}
                      className="w-full bg-transparent text-[#552E1A] resize-none focus:outline-none placeholder-[#552E1A]/60"
                      style={{ minHeight: '70px' }}
                    />
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-[#552E1A]/20">
                  <button
                    onClick={cancelNewCharacter}
                    className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={createNewCharacter}
                    className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
                  >
                    Créer le personnage
                  </button>
                </div>
              </div>
            )}

            {/* Vue attribution de personnage */}
            {characterCurrentView === 'assign-character' && selectedCharacter && (
              <div className="max-w-3xl">
                {/* Header avec bouton retour et titre */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCharacterCurrentView('consultation')}
                      className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                    >
                      <ArrowLeft size={16} className="text-[#552E1A]" />
                    </button>
                    <h1 className="text-2xl font-bold text-[#552E1A] eagle-lake-font">
                      {selectedCharacter.name}
                    </h1>
                  </div>
                </div>

                {/* Sous-titre */}
                <h2 className="text-[#552E1A] font-medium mb-3 eagle-lake-font">Dans la partie</h2>

                {/* Liste de sélection */}
                <AttributionList />

                {/* Boutons d'action */}
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-[#552E1A]/20">
                  <button
                    onClick={() => setCharacterCurrentView('consultation')}
                    className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => setCharacterCurrentView('consultation')}
                    className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
                  >
                    Attribuer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bouton + flottant en bas à droite (style doré) */}
          {characterCurrentView === 'characters' && (
            <div className="fixed bottom-12 right-6 z-50">
              <button 
                onClick={() => createNewCharacterCategory()}
                className="bg-golden text-[#552E1A] py-3 px-4 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2 eagle-lake-font shadow-lg"
              >
                <Plus size={16} />
                Nouvelle catégorie
              </button>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'objects',
      title: 'Objets',
      icon: '⚔️',
      closedImage: '/images/templates/object-tab-closed.svg',
      openImage: '/images/templates/object-tab-open.svg',
      color: 'from-yellow-500 to-yellow-600',
      content: (
        <div className="h-full flex flex-col">
          {objectCurrentView === 'objects' ? (
            <>
              {/* Barre d'outils - Fixe */}
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            {/* Filtre dropdown */}
            <div className="relative">
              <select 
                value={objectSelectedFilter} 
                onChange={(e) => setObjectSelectedFilter(e.target.value)}
                className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="aucun">Filtrer par Aucun</option>
                <option value="armes">Armes</option>
                <option value="armures">Armures</option>
                <option value="objets-magiques">Objets magiques</option>
                <option value="consommables">Consommables</option>
                <option value="rares">Rares</option>
                <option value="legendaires">Légendaires</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
            </div>

            {/* Tri dropdown */}
            <div className="relative">
              <select 
                value={objectSelectedSort} 
                onChange={(e) => setObjectSelectedSort(e.target.value)}
                className="bg-[#552E1A] text-white px-3 py-2 pr-8 rounded-lg text-sm border-none hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="aucun">Tri Aucun</option>
                <option value="nom-asc">Nom (A-Z)</option>
                <option value="nom-desc">Nom (Z-A)</option>
                <option value="rarete-asc">Rareté ↑</option>
                <option value="rarete-desc">Rareté ↓</option>
                <option value="type">Par type</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
            </div>

            {/* Bouton recherche */}
            <div className="relative">
              <button
                onClick={() => setObjectShowSearchInput(!objectShowSearchInput)}
                className="bg-[#552E1A] text-white p-2 rounded-lg hover:bg-[#6B3A2A] transition-colors focus:outline-none focus:ring-2 focus:ring-golden/50"
              >
                <Search size={16} />
              </button>
              
              {/* Input de recherche */}
              {objectShowSearchInput && (
                <div className="absolute top-full right-0 mt-2 z-50">
                  <input
                    type="text"
                    value={objectSearchTerm}
                    onChange={(e) => setObjectSearchTerm(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-24 pl-1 pr-1 py-2 bg-white border border-[#552E1A]/30 rounded-lg text-[#552E1A] text-sm focus:outline-none focus:ring-2 focus:ring-golden/50"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto pr-4">
            {getFilteredAndSortedObjects().map(category => (
              <div key={category.id} className="mb-8">
                {/* Header de catégorie */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 relative">
                    {editingObjectCategory === category.id ? (
                      <input
                        type="text"
                        defaultValue={category.title}
                        onBlur={(e) => {
                          setObjectCategories(prev => prev.map(cat => 
                            cat.id === category.id ? { ...cat, title: e.target.value } : cat
                          ));
                          setEditingObjectCategory(null);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setObjectCategories(prev => prev.map(cat => 
                              cat.id === category.id ? { ...cat, title: e.target.value } : cat
                            ));
                            setEditingObjectCategory(null);
                          }
                        }}
                        className="text-xl font-bold text-[#552E1A] eagle-lake-font bg-transparent border-none focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 
                          className="text-xl font-bold text-[#552E1A] eagle-lake-font cursor-pointer hover:text-black transition-colors"
                          onClick={() => setEditingObjectCategory(category.id)}
                        >
                          {category.title}
                        </h3>
                        <button
                          onClick={() => setObjectCategoryDropdownOpen(
                            objectCategoryDropdownOpen === category.id ? null : category.id
                          )}
                          className="text-[#552E1A] cursor-pointer hover:text-black transition-colors"
                        >
                          <ChevronDown size={16} />
                        </button>
                        
                        {/* Dropdown de catégorie */}
                        {objectCategoryDropdownOpen === category.id && (
                          <div className="absolute left-0 top-full mt-2 bg-white border border-[#552E1A]/30 rounded-lg shadow-lg z-50 min-w-[160px]">
                            <button
                              onClick={() => {
                                setObjectCategories(prev => prev.map(cat => 
                                  cat.id === category.id 
                                    ? { ...cat, isExpanded: !cat.isExpanded }
                                    : cat
                                ));
                                setObjectCategoryDropdownOpen(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-[#552E1A] hover:bg-[#552E1A]/10 transition-colors first:rounded-t-lg"
                            >
                              {category.isExpanded ? 'Fermer la catégorie' : 'Ouvrir la catégorie'}
                            </button>
                            <button
                              onClick={() => {
                                setEditingObjectCategory(category.id);
                                setObjectCategoryDropdownOpen(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-[#552E1A] hover:bg-[#552E1A]/10 transition-colors"
                            >
                              Renommer la catégorie
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                                  setObjectCategories(prev => prev.filter(cat => cat.id !== category.id));
                                  setObjectCategoryDropdownOpen(null);
                                }
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors last:rounded-b-lg"
                            >
                              Supprimer la catégorie
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setObjectCurrentView('new-object')}
                      className="bg-golden text-[#552E1A] px-4 py-2 rounded-lg font-semibold hover:bg-golden/80 transition-colors eagle-lake-font"
                    >
                      Créer un objet
                    </button>
                  </div>
                </div>

                {/* Grille d'objets */}
                {category.isExpanded && (
                  <div className="grid grid-cols-2 gap-4">
                    {category.objects
                      .filter(object => {
                        if (!objectSearchTerm.trim()) return true;
                        const searchLower = objectSearchTerm.toLowerCase();
                        return object.name.toLowerCase().includes(searchLower) ||
                               object.tags.some(tag => tag.toLowerCase().includes(searchLower));
                      })
                      .map(object => (
                      <div
                        key={object.id}
                        onClick={() => openObjectConsultation(object)}
                        className="bg-white/70 border border-[#552E1A]/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        {/* Zone image */}
                        <div className="relative aspect-[4/3] bg-gray-100 border border-[#552E1A]/30 rounded-lg m-2">
                          {/* Pattern de damier transparent */}
                          <div 
                            className="w-full h-full opacity-20 rounded-lg"
                            style={{
                              backgroundImage: `
                                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                linear-gradient(-45deg, transparent 75%, #ccc 75%)
                              `,
                              backgroundSize: '20px 20px',
                              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                            }}
                          />
                          
                          {/* Tags (éditables) */}
                          <div className="absolute top-3 right-3 flex flex-col items-end gap-1 object-tags-editing">
                            <div
                              className="flex flex-wrap gap-1 justify-end max-w-[70%] cursor-text"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingObjectTagsId(object.id);
                              }}
                            >
                              {object.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-white px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1"
                                  style={{ backgroundColor: '#46718A' }}
                                >
                                  {tag}
                                  {editingObjectTagsId === object.id && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); removeTagFromObject(category.id, object.id, tag); }}
                                      className="hover:bg-red-500/80 rounded-full p-0.5 transition-colors group"
                                      title="Supprimer ce tag"
                                    >
                                      <X size={10} className="text-white group-hover:text-red-100" />
                                    </button>
                                  )}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              {editingObjectTagsId === object.id ? (
                                <>
                                  <input
                                    type="text"
                                    value={editingObjectTagInput}
                                    onChange={(e) => setEditingObjectTagInput(e.target.value)}
                                    placeholder="Ajouter un tag"
                                    className="bg-white/90 border border-[#552E1A]/30 rounded px-2 py-0.5 text-xs text-[#552E1A]"
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        addTagToObject(category.id, object.id, editingObjectTagInput);
                                        setEditingObjectTagInput('');
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={(e) => { e.stopPropagation(); addTagToObject(category.id, object.id, editingObjectTagInput); setEditingObjectTagInput(''); }}
                                    className="bg-[#552E1A] text-white px-2 py-0.5 rounded text-xs"
                                  >
                                    Ajouter
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setEditingObjectTagsId(object.id); }}
                                  className="w-6 h-6 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                                  title="Modifier les tags"
                                >
                                  <span className="text-[#552E1A] text-xs font-bold">+</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer de la carte */}
                        <div className="p-3 flex items-center justify-between">
                          <span className="text-left text-[#552E1A] font-medium">
                            {object.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyElementLink('object', object.id, object.name);
                              showToast(`Lien de "${object.name}" copié !`, 'success');
                            }}
                            className="w-6 h-6 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                            title="Copier le lien"
                          >
                            <Copy size={12} className="text-[#552E1A]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bouton fixe */}
          <div className="fixed bottom-12 right-6 z-50">
            <button 
              onClick={createNewObjectCategory}
              className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-golden/80 transition-colors eagle-lake-font flex items-center gap-2"
            >
              <Plus size={20} />
              Nouvelle catégorie
            </button>
          </div>

            </>
          ) : objectCurrentView === 'consultation' && selectedObject ? (
            <div className="h-full flex flex-col pt-6 pr-6">
              {/* Breadcrumb et bouton copier */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-[#552E1A]">
                  <button 
                    onClick={() => setObjectCurrentView('objects')}
                    className="hover:underline"
                  >
                    Objets
                  </button>
                  <ChevronRight size={14} className="text-[#552E1A]" />
                  <button 
                    onClick={() => {
                      setObjectCurrentView('objects');
                      // Optionnel: ouvrir automatiquement la catégorie
                      const category = objectCategories.find(cat => cat.id === selectedObject.categoryId);
                      if (category) {
                        setObjectCategories(prev => prev.map(cat => 
                          cat.id === category.id ? { ...cat, isExpanded: true } : cat
                        ));
                      }
                    }}
                    className="text-[#552E1A] font-medium hover:underline"
                  >
                    {objectCategories.find(cat => cat.id === selectedObject.categoryId)?.title || 'Catégorie'}
                  </button>
                  <ChevronRight size={14} className="text-[#552E1A]" />
                  <span className="text-golden font-medium underline">
                    {selectedObject.name}
                  </span>
                </div>
                <button
                  onClick={() => copyElementLink('object', selectedObject.id, selectedObject.name)}
                  className="flex items-center gap-2 px-3 py-2 bg-golden/20 hover:bg-golden/30 text-golden rounded-lg transition-colors"
                >
                  <Copy size={16} />
                  <span className="text-sm font-medium">Copier le lien</span>
                </button>
              </div>

              {/* En-tête avec bouton retour et titre */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setObjectCurrentView('objects')}
                    className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                  >
                    <ArrowLeft size={16} className="text-[#552E1A]" />
                  </button>
                  <h1 className="text-black text-2xl font-bold eagle-lake-font">{selectedObject.name}</h1>
                </div>
                {/* Bouton croix supprimé selon la demande */}
              </div>

              {/* Contenu principal */}
              <div className="flex-1 overflow-y-auto pr-4">
                <div className="max-w-5xl">
                  {/* Layout en 2 colonnes */}
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    {/* Colonne gauche - Métadonnées et description */}
                    <div className="space-y-6">
                      {/* Métadonnées */}
                      <div className="space-y-3">
                        <div>
                          <span className="font-bold text-[#552E1A]">Niveau : </span>
                          <span className="text-[#552E1A]">{selectedObject.level || '00'}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#552E1A]">Altération : </span>
                          <span className="text-[#552E1A]">{selectedObject.alteration || '+0'}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#552E1A]">Commanditaire : </span>
                          <span className="text-[#552E1A]">Nom du personnage</span>
                        </div>
                      </div>

                      {/* Section Tags */}
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {selectedObject.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                              style={{ backgroundColor: '#46718A' }}
                            >
                              <Tag size={12} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Section Description supprimée d'ici pour passer en pleine largeur */}
                    </div>

                    {/* Colonne droite - Image */}
                    <div>
                      <div 
                        className="w-full h-64 bg-gray-200 rounded-lg border border-[#552E1A]/20 flex items-center justify-center"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                          `,
                          backgroundSize: '20px 20px',
                          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                        }}
                      >
                        <div className="text-[#552E1A]/60 text-center">
                          <div className="text-4xl mb-2">🗡️</div>
                          <p className="text-sm">Image de l'objet</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description pleine largeur */}
                  <div className="mt-2">
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Description
                    </label>
                    <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 max-h-80 overflow-y-auto">
                      <div className="text-[#552E1A] whitespace-pre-wrap">
                        {selectedObject.description || 'Aucune description disponible.'}
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-[#552E1A]/20">
                    <button
                      onClick={() => {
                        setNewObjectName(selectedObject.name);
                        setNewObjectDescription(selectedObject.description || '');
                        setNewObjectCategory(selectedObject.categoryId || '');
                        setNewObjectLevel(selectedObject.level || '');
                        setNewObjectAlteration(selectedObject.alteration || '');
                        setNewObjectTags(selectedObject.tags || []);
                        setNewObjectTag('');
                        setObjectCurrentView('new-object');
                      }}
                      className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors flex items-center gap-2 font-medium"
                    >
                      <Edit size={16} />
                      Modifier
                    </button>
                    <button
                      onClick={async () => {
                        const link = `${window.location.origin}/campaigns/default-campaign/objects/${selectedObject.id}`;
                        try {
                          await navigator.clipboard.writeText(link);
                          showToast('Lien copié ! Vous pouvez maintenant le coller sur le dashboard.', 'success');
                        } catch (err) {
                          console.error('Erreur lors de la copie:', err);
                          showToast('Erreur lors de la copie du lien.', 'error');
                        }
                      }}
                      className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copier le lien
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Page de création d'objet - Structure exacte de NewEventPanel */
            <div className="h-full flex flex-col pt-6 pr-6">
              {/* Titre avec bouton retour */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={cancelNewObject}
                  className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
                >
                  <ArrowLeft size={16} className="text-[#552E1A]" />
                </button>
                <h1 className="text-black text-2xl font-bold eagle-lake-font">
                  Nouvel objet
                </h1>
              </div>

              {/* Formulaire */}
              <div className="flex-1 overflow-y-auto pb-12 max-h-[calc(100vh-300px)] pr-4">
                <div className="max-w-5xl">
                  {/* Section principale avec image à droite */}
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    {/* Colonne gauche - Champs de saisie */}
                    <div className="space-y-2">
                      {/* Champ catégorie */}
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                          Catégorie
                        </label>
                        <div className="relative">
                          <select
                            value={newObjectCategory}
                            onChange={(e) => setNewObjectCategory(e.target.value)}
                            className="w-[218px] h-[42px] bg-[#F5F1E8] text-[#552E1A] px-4 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer"
                          >
                            <option value="">Sélection de catégorie</option>
                            {objectCategories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.title}
                              </option>
                            ))}
                          </select>
                          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={20} className="text-[#552E1A]" />
                          </div>
                        </div>
                      </div>

                      {/* Champ nom */}
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                          Nom de l'objet
                        </label>
                        <input
                          type="text"
                          value={newObjectName}
                          onChange={(e) => setNewObjectName(e.target.value)}
                          placeholder="Nom de l'objet"
                          className="flex-1 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                        />
                      </div>

                      {/* Section Tags */}
                      <div>
                        <label className="block text-[#552E1A] font-medium mb-3 eagle-lake-font">
                          Tags
                        </label>
                        
                        {/* Tags personnalisés ajoutés */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {newObjectTags.map((tag, index) => (
                            <div
                              key={`custom-${index}`}
                              className="text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
                              style={{ backgroundColor: '#46718A', border: '1px solid #46718A' }}
                            >
                              <Tag size={12} />
                              {tag}
                              <button
                                onClick={() => removeObjectTag(tag)}
                                className="hover:bg-red-500/80 rounded-full p-0.5 transition-colors flex items-center justify-center group"
                                title="Supprimer ce tag"
                              >
                                <X size={12} className="text-white group-hover:text-red-100" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Ajouter un tag personnalisé */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newObjectTag}
                            onChange={(e) => setNewObjectTag(e.target.value)}
                            placeholder="Ajouter un tag"
                            className="flex-1 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addObjectTag();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={addObjectTag}
                            className="bg-[#552E1A] text-white px-4 py-2 rounded-lg font-medium"
                            style={{ 
                              zIndex: 9999, 
                              position: 'relative',
                              pointerEvents: 'auto',
                              cursor: 'pointer'
                            }}
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>

                      {/* Champ lieu */}
                      <div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                              Niveau
                            </label>
                            <input
                              type="text"
                              value={newObjectLevel}
                              onChange={(e) => setNewObjectLevel(e.target.value)}
                              placeholder="Niveau"
                              className="w-[98px] h-[48px] bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                              Altération
                            </label>
                            <input
                              type="text"
                              value={newObjectAlteration}
                              onChange={(e) => setNewObjectAlteration(e.target.value)}
                              placeholder="Altération"
                              className="w-[110px] h-[48px] bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Colonne droite - Upload d'image */}
                    <div>
                      <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                        Image de l'objet
                      </label>
                      <div className="relative">
                        <div className="cursor-pointer block w-full h-48 bg-[#F5F1E8] border-2 border-dashed border-[#552E1A]/30 rounded-lg flex items-center justify-center hover:border-[#552E1A]/50 transition-colors">
                          <div className="text-center">
                            <div className="text-[#552E1A]/60 text-sm mb-1">Cliquez pour ajouter une image</div>
                            <div className="text-[#552E1A]/40 text-xs">PNG, JPG, GIF jusqu'à 10MB</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Champ description - Pleine largeur */}
                  <div className="mb-6">
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Description
                    </label>
                    <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <textarea
                        value={newObjectDescription}
                        onChange={(e) => setNewObjectDescription(e.target.value)}
                        onKeyDown={handleSlashCommand}
                        placeholder="Description de l'objet..."
                        rows={8}
                        className="w-full bg-transparent text-[#552E1A] resize-none focus:outline-none placeholder-[#552E1A]/60"
                        style={{ minHeight: '200px' }}
                      />
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={cancelNewObject}
                      className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={createNewObject}
                      disabled={!newObjectName.trim() || !newObjectCategory}
                      className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Créer l'objet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  // Si on est en vue "new-event", afficher le composant NewEventPanel
  if (currentView === 'new-event') {
    return (
      <NewEventPanel 
        onBack={handleBackToTemplates}
        categories={categories}
        onEventCreated={handleEventCreated}
        templateToEdit={selectedTemplate}
      />
    );
  }

  // Si on est en vue "consultation", afficher le composant ConsultationTemplatePanel
  if (currentView === 'consultation' && selectedTemplate) {
    return (
      <ConsultationTemplatePanel 
        template={selectedTemplate}
        onBack={handleBackToTemplates}
        onEdit={handleEditTemplate}
        onCopyLink={() => copyTemplateLink(selectedTemplate.id)}
        tabs={tabs}
      />
    );
  }

  // Si on est en vue "edit-merchant", afficher le formulaire d'édition du template marchand
  if (currentView === 'edit-merchant' && editingMerchantTemplate) {
    return (
      <TemplateTab
        isOpen={true}
        onToggle={() => {}}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={tabs}
        backgroundImage="/images/templates/templates-background.svg"
        closedImage="/images/templates/template-tab-closed.svg"
        openImage="/images/templates/template-tab-open.svg"
      >
        <div className="h-full flex flex-col pt-6 pr-6">
          {/* Titre avec bouton retour */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleBackToTemplates}
              className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
            >
              <ArrowLeft size={16} className="text-[#552E1A]" />
            </button>
            <h1 className="text-black text-2xl font-bold eagle-lake-font">
              Modifier le template marchand
            </h1>
          </div>

          {/* Formulaire */}
          <div className="flex-1 overflow-y-auto pb-12 max-h-[calc(100vh-300px)] pr-4">
            <div className="max-w-5xl">
              {/* Section principale avec image à droite */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Colonne gauche - Champs de saisie */}
                <div className="space-y-6">
                  {/* Champ titre */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Titre de la rencontre
                    </label>
                    <input
                      type="text"
                      value={merchantTemplateData.title}
                      onChange={(e) => setMerchantTemplateData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Titre de la rencontre"
                      className="flex-1 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    />
                  </div>

                  {/* Champ PNJ */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Nom du PNJ
                    </label>
                    <input
                      type="text"
                      value={merchantTemplateData.npc}
                      onChange={(e) => setMerchantTemplateData(prev => ({ ...prev, npc: e.target.value }))}
                      placeholder="Nom du marchand"
                      className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    />
                  </div>

                  {/* Champ lieu */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Lieu
                    </label>
                    <input
                      type="text"
                      value={merchantTemplateData.location}
                      onChange={(e) => setMerchantTemplateData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Lieu de la rencontre"
                      className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    />
                  </div>
                </div>

                {/* Colonne droite - Image placeholder */}
                <div>
                  <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                    Image de la rencontre
                  </label>
                  <div className="relative">
                    <div className="cursor-pointer block w-full h-48 bg-[#F5F1E8] border-2 border-dashed border-[#552E1A]/30 rounded-lg flex items-center justify-center hover:border-[#552E1A]/50 transition-colors">
                      <div className="text-center">
                        <div className="text-[#552E1A]/60 text-sm mb-1">Image du marchand</div>
                        <div className="text-[#552E1A]/40 text-xs">PNG, JPG, GIF jusqu'à 10MB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Champ description */}
              <div className="mb-6">
                <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                  Description
                </label>
                <textarea
                  value={merchantTemplateData.content}
                  onChange={(e) => setMerchantTemplateData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Description de la rencontre avec le marchand..."
                  rows={4}
                  className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60 resize-none"
                />
              </div>

              {/* Section inventaire */}
              <div className="mb-6">
                <label className="block text-[#552E1A] font-medium mb-3 eagle-lake-font">
                  Inventaire du marchand
                </label>
                
                {/* Liste des objets existants */}
                <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 mb-4">
                  {merchantTemplateData.inventory.length > 0 ? (
                    <div className="space-y-2">
                      {merchantTemplateData.inventory.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-white/50 rounded">
                          <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleEditInventoryItem(item.id, 'name', e.target.value)}
                              className="w-full bg-transparent text-[#552E1A] font-medium border-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleEditInventoryItem(item.id, 'price', parseInt(e.target.value) || 0)}
                              className="w-20 bg-transparent text-[#552E1A] border-none focus:outline-none text-right"
                            />
                            <span className="text-[#552E1A]/80 text-sm">PO</span>
                          </div>
                          <button
                            onClick={() => handleDeleteInventoryItem(item.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            title="Supprimer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-[#552E1A]/60 py-4">
                      Aucun objet dans l'inventaire
                    </div>
                  )}
                </div>

                {/* Formulaire d'ajout d'objet */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newInventoryItem.name}
                    onChange={(e) => setNewInventoryItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nom de l'objet"
                    className="flex-1 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                  />
                  <input
                    type="number"
                    value={newInventoryItem.price}
                    onChange={(e) => setNewInventoryItem(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    placeholder="Prix"
                    className="w-24 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                  />
                  <span className="flex items-center text-[#552E1A]/80 text-sm">PO</span>
                  <button
                    onClick={handleAddInventoryItem}
                    disabled={!newInventoryItem.name.trim()}
                    className="bg-golden text-[#552E1A] px-4 py-2 rounded-lg font-medium hover:bg-golden/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelMerchantEdit}
                  className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveMerchantTemplate}
                  className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </TemplateTab>
    );
  }

  // Si on est en vue "edit-combat", afficher le formulaire d'édition du template combat
  if (currentView === 'edit-combat' && editingCombatTemplate) {
    return (
      <TemplateTab
        isOpen={true}
        onToggle={() => {}}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={tabs}
        backgroundImage="/images/templates/templates-background.svg"
        closedImage="/images/templates/template-tab-closed.svg"
        openImage="/images/templates/template-tab-open.svg"
      >
        <div className="h-full flex flex-col pt-6 pr-6">
          {/* Titre avec bouton retour */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleBackToTemplates}
              className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
            >
              <ArrowLeft size={16} className="text-[#552E1A]" />
            </button>
            <h1 className="text-black text-2xl font-bold eagle-lake-font">
              Modifier le template combat
            </h1>
          </div>

          {/* Formulaire */}
          <div className="flex-1 overflow-y-auto pb-12 max-h-[calc(100vh-300px)] pr-4">
            <div className="max-w-5xl">
              {/* Section principale avec image à droite */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Colonne gauche - Champs de saisie */}
                <div className="space-y-6">
                  {/* Champ titre */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Titre du combat
                    </label>
                    <input
                      type="text"
                      value={combatTemplateData.title}
                      onChange={(e) => setCombatTemplateData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Titre du combat"
                      className="flex-1 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    />
                  </div>

                  {/* Champ lieu */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Lieu
                    </label>
                    <input
                      type="text"
                      value={combatTemplateData.location}
                      onChange={(e) => setCombatTemplateData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Lieu du combat"
                      className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    />
                  </div>

                  {/* Champ difficulté */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Difficulté
                    </label>
                    <select
                      value={combatTemplateData.difficulty}
                      onChange={(e) => setCombatTemplateData(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50"
                    >
                      <option value="Facile">Facile</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Difficile">Difficile</option>
                      <option value="Très difficile">Très difficile</option>
                    </select>
                  </div>

                  {/* Champ récompenses */}
                  <div>
                    <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                      Récompenses
                    </label>
                    <input
                      type="text"
                      value={combatTemplateData.rewards}
                      onChange={(e) => setCombatTemplateData(prev => ({ ...prev, rewards: e.target.value }))}
                      placeholder="Récompenses du combat"
                      className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    />
                  </div>
                </div>

                {/* Colonne droite - Image placeholder */}
                <div>
                  <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                    Image du combat
                  </label>
                  <div className="relative">
                    <div className="cursor-pointer block w-full h-48 bg-[#F5F1E8] border-2 border-dashed border-[#552E1A]/30 rounded-lg flex items-center justify-center hover:border-[#552E1A]/50 transition-colors">
                      <div className="text-center">
                        <div className="text-[#552E1A]/60 text-sm mb-1">Image du combat</div>
                        <div className="text-[#552E1A]/40 text-xs">PNG, JPG, GIF jusqu'à 10MB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Champ description */}
              <div className="mb-6">
                <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                  Description
                </label>
                <textarea
                  value={combatTemplateData.content}
                  onChange={(e) => setCombatTemplateData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Description du combat..."
                  rows={4}
                  className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60 resize-none"
                />
              </div>

              {/* Section ennemis */}
              <div className="mb-6">
                <label className="block text-[#552E1A] font-medium mb-3 eagle-lake-font">
                  Ennemis
                </label>
                
                {/* Liste des ennemis existants */}
                <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4 mb-4">
                  {combatTemplateData.enemies.length > 0 ? (
                    <div className="space-y-3">
                      {combatTemplateData.enemies.map((enemy, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 p-3 bg-white/50 rounded">
                          <div>
                            <label className="block text-[#552E1A] text-sm font-medium mb-1">Nom</label>
                            <input
                              type="text"
                              value={enemy.name}
                              onChange={(e) => handleEditEnemy(index, 'name', e.target.value)}
                              className="w-full bg-transparent text-[#552E1A] border-none focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] text-sm font-medium mb-1">PV</label>
                            <input
                              type="number"
                              value={enemy.hp}
                              onChange={(e) => handleEditEnemy(index, 'hp', parseInt(e.target.value) || 0)}
                              className="w-full bg-transparent text-[#552E1A] border-none focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] text-sm font-medium mb-1">CA</label>
                            <input
                              type="number"
                              value={enemy.ac}
                              onChange={(e) => handleEditEnemy(index, 'ac', parseInt(e.target.value) || 0)}
                              className="w-full bg-transparent text-[#552E1A] border-none focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[#552E1A] text-sm font-medium mb-1">Attaque</label>
                            <input
                              type="text"
                              value={enemy.attack}
                              onChange={(e) => handleEditEnemy(index, 'attack', e.target.value)}
                              className="w-full bg-transparent text-[#552E1A] border-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="flex-1">
                              <label className="block text-[#552E1A] text-sm font-medium mb-1">Dégâts</label>
                              <input
                                type="text"
                                value={enemy.damage}
                                onChange={(e) => handleEditEnemy(index, 'damage', e.target.value)}
                                className="w-full bg-transparent text-[#552E1A] border-none focus:outline-none"
                              />
                            </div>
                            <button
                              onClick={() => handleDeleteEnemy(index)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              title="Supprimer"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-[#552E1A]/60 py-4">
                      Aucun ennemi défini
                    </div>
                  )}
                </div>

                {/* Bouton d'ajout d'ennemi */}
                <button
                  onClick={handleAddEnemy}
                  className="bg-golden text-[#552E1A] px-4 py-2 rounded-lg font-medium hover:bg-golden/80 transition-colors"
                >
                  Ajouter un ennemi
                </button>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelCombatEdit}
                  className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveCombatTemplate}
                  className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </TemplateTab>
    );
  }


  // Sinon, afficher la vue templates normale
  return (
    <TemplateTab
      isOpen={isOpen}
      onToggle={handleToggle}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      tabs={tabs}
      backgroundImage="/images/templates/templates-background.svg"
      closedImage={activeTabData?.closedImage}
      openImage={activeTabData?.openImage}
      panelRef={panelRef}
    >
      {activeTabData?.content}
      
      {/* Menu d'insertion rapide */}
      {showSlashMenu && (
        <div 
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-w-sm w-full"
          style={{ 
            left: Math.min(slashMenuPosition.x, window.innerWidth - 320),
            top: Math.min(slashMenuPosition.y, window.innerHeight - 400)
          }}
        >
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="Rechercher..."
              value={slashMenuSearch}
              onChange={(e) => setSlashMenuSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredSlashItems.map((item, index) => (
              <div
                key={item.id}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-gray-50 ${
                  index === selectedSlashMenuItem ? 'bg-golden/10 border-r-2 border-golden' : ''
                }`}
                onClick={() => handleSlashMenuSelect(item)}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            ))}
            {filteredSlashItems.length === 0 && (
              <div className="px-4 py-3 text-gray-500 text-center">
                Aucun élément trouvé
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[10000] animate-in slide-in-from-top-2 duration-300">
          <div className={`px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 max-w-sm ${
            toast.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-yellow-50 border-yellow-200 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              toast.type === 'success' 
                ? 'bg-green-500' 
                : toast.type === 'error'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </TemplateTab>
  );
};

export default TemplatePanel;