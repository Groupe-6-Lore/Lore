import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Plus,
  X,
  Users,
  BookOpen,
  Newspaper,
  ChevronRight,
  Archive,
  Trash2,
  Moon,
  Star,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Bell,
  GripVertical,
  Edit2,
  Save,
  Search,
  Package,
  Coins,
  ExternalLink,
  Link,
  Image,
  Upload,
  FileText
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
// Import des composants de drag & drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';

const CampaignDashboard = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // États pour la gestion des données
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour l'interface utilisateur
  const [showHistoryMenu, setShowHistoryMenu] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);

  // États pour le drag & drop
  const [activeId, setActiveId] = useState(null);
  const [editingLine, setEditingLine] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [textLines, setTextLines] = useState([
    {
      id: 'line-1',
      content: 'Dans les terres brûles du Royaume de Cendres, où les volcans crachent leur colère depuis des siècles, une prophétie ancienne se réveille.',
      section: 'situation'
    },
    {
      id: 'line-2',
      content: 'Les héros, guidés par les signes des anciens, doivent découvrir la source de cette corruption avant que les forces des ténèbres ne réduisent en cendres tout ce qui reste de la civilisation.',
      section: 'situation'
    },
    {
      id: 'line-3',
      content: 'La session commence dans la taverne "Le Dragon de Bronze", au cœur de Pyros. Un messager essoufflé fait irruption, portant une missive scellée du Conseil des Flammes.',
      section: 'debut'
    },
    {
      id: 'merchant-card',
      content: 'merchant',
      section: 'merchant',
      type: 'card'
    }
  ]);

  // Données par défaut pour la démo
  const defaultCampaign = {
    id: 'default-campaign',
    title: 'Campagne du feu',
    game_system: 'Donjons & Dragons 5e',
    universe: 'Les Royaumes Fragmentés',
    date: '01/04/2025',
    queteMajeure: 'Récupérer la Flamme Éternelle',
    rencontre: {
      title: 'Rencontre avec un marchand',
      content: 'Gurdil Le Briant, un marchand nain aux yeux perçants, propose des armes enchantées contre des informations sur les tunnels volcaniques.',
      npc: 'Gurdil Le Briant'
    },
    quests: [
      { type: 'major', name: 'Major quest', progress: 50 },
      { type: 'minor', name: 'Minor quest', completed: 5, total: 5, status: 'completed' },
      { type: 'minor', name: 'Minor quest', completed: 2, total: 4, status: 'in_progress' },
      { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' }
    ]
  };

  // Données d'exemple pour les sessions historiques
  const historicalSessions = [
    {
      id: 'session-1',
      title: 'Session 1 - L\'arrivée à Pyros',
      date: '15/03/2025',
      duration: '4h 30min',
      players: ['Alice', 'Bob', 'Charlie', 'Diana'],
      summary: 'Les héros arrivent à Pyros et découvrent les premiers signes de corruption. Rencontre avec le capitaine Marcus.',
      status: 'completed'
    },
    {
      id: 'session-2',
      title: 'Session 2 - Les tunnels volcaniques',
      date: '22/03/2025',
      duration: '3h 45min',
      players: ['Alice', 'Bob', 'Charlie', 'Diana'],
      summary: 'Exploration des tunnels souterrains et découverte des créatures de magma. Combat épique contre un élémentaire de feu.',
      status: 'completed'
    },
    {
      id: 'session-3',
      title: 'Session 3 - Le sanctuaire perdu',
      date: '29/03/2025',
      duration: '5h 15min',
      players: ['Alice', 'Bob', 'Charlie', 'Diana'],
      summary: 'Découverte du sanctuaire perdu des anciens gardiens. Révélations sur la prophétie et les clés de la Flamme Éternelle.',
      status: 'in_progress'
    }
  ];

  // Inventaire du marchand
  const [merchantInventory, setMerchantInventory] = useState([
    { id: 1, name: 'Potion de soins', price: 50, description: 'Restaure 2d4+2 points de vie' },
    { id: 2, name: 'Épée enchantée', price: 150, description: 'Épée longue +1' },
    { id: 3, name: 'Anneau de protection', price: 200, description: '+1 à la classe d\'armure' }
  ]);
  
  // États pour l'édition du tableau
  const [editingTableField, setEditingTableField] = useState(null);
  const [editingTableValue, setEditingTableValue] = useState('');
  const [editingTotal, setEditingTotal] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  // Templates disponibles
  const availableTemplates = [
    { id: 'text', name: 'Texte', description: 'Bloc de texte simple', icon: <FileText size={16} />, type: 'block' },
    { id: 'heading1', name: 'Titre 1', description: 'Titre principal', icon: <span className="text-lg font-bold">H1</span>, type: 'block' },
    { id: 'heading2', name: 'Titre 2', description: 'Sous-titre', icon: <span className="text-base font-bold">H2</span>, type: 'block' },
    { id: 'heading3', name: 'Titre 3', description: 'Titre de section', icon: <span className="text-sm font-bold">H3</span>, type: 'block' },
    { id: 'bullet', name: 'Liste à puces', description: 'Liste avec des puces', icon: <span>•</span>, type: 'block' },
    { id: 'number', name: 'Liste numérotée', description: 'Liste avec des numéros', icon: <span>1.</span>, type: 'block' },
    { id: 'quote', name: 'Citation', description: 'Bloc de citation', icon: <span>"</span>, type: 'block' },
    { id: 'code', name: 'Code', description: 'Bloc de code', icon: <span>&lt;/&gt;</span>, type: 'block' },
    { id: 'divider', name: 'Séparateur', description: 'Ligne de séparation', icon: <span>---</span>, type: 'block' },
    { id: 'quest', name: 'Quête', type: 'Quête', description: 'Nouvelle quête', icon: <Target size={16} /> },
    { id: 'character', name: 'Personnage', type: 'Personnage', description: 'Nouveau personnage', icon: <Users size={16} /> },
    { id: 'location', name: 'Lieu', type: 'Lieu', description: 'Description d\'un lieu', icon: <Package size={16} /> },
    { id: 'item', name: 'Objet', type: 'Objet', description: 'Objet magique ou équipement', icon: <Package size={16} /> },
    { id: 'encounter', name: 'Rencontre', type: 'Combat', description: 'Rencontre de combat', icon: <Newspaper size={16} /> }
  ];

  const filteredTemplates = availableTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers pour le drag & drop des lignes de texte
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    const item = textLines.find(line => line.id === event.active.id);
    setDraggedItem(item);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      setTextLines((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      });
    }
    setActiveId(null);
    setDraggedItem(null);
  };

  // Handlers pour l'édition des lignes
  const handleLineEdit = (id, isEditing) => {
    setEditingLine(isEditing ? id : null);
  };

  const handleLineContentChange = (id, content) => {
    setTextLines(lines => lines.map(line => 
      line.id === id ? { ...line, content } : line
    ));
  };

  const handleLineDelete = (id) => {
    setTextLines(lines => lines.filter(line => line.id !== id));
  };

  const handleLineInsertAfter = (id, type) => {
    const newLine = {
      id: `line-${Date.now()}`,
      content: '',
      section: textLines.find(line => line.id === id)?.section || 'situation'
    };
    
    const index = textLines.findIndex(line => line.id === id);
    setTextLines(lines => [
      ...lines.slice(0, index + 1),
      newLine,
      ...lines.slice(index + 1)
    ]);
    setEditingLine(newLine.id);
  };

  const handleAddLineToSection = (section) => {
    const newLine = {
      id: `line-${Date.now()}`,
      content: '',
      section
    };
    setTextLines(lines => [...lines, newLine]);
    setEditingLine(newLine.id);
  };

  // Handlers pour les menus
  const handleHistoryToggle = () => {
    setShowHistoryMenu(!showHistoryMenu);
  };

  const handleSessionSelect = (sessionId) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleViewSelectedSessions = () => {
    console.log('Sessions sélectionnées:', selectedSessions);
    setShowHistoryMenu(false);
  };

  const handleInsertTemplate = (template) => {
    setShowInsertMenu(false);
    setShowContextMenu(false);
    toast.success(`Template "${template.name}" inséré !`);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleTemplateSelect = (template) => {
    if (template.type === 'block') {
      const newLine = {
        id: `line-${Date.now()}`,
        content: getTemplateContent(template.id),
        section: 'situation'
      };
      setTextLines(lines => [...lines, newLine]);
      setEditingLine(newLine.id);
    }
    setShowContextMenu(false);
  };

  const getTemplateContent = (templateId) => {
    switch (templateId) {
      case 'heading1': return '# ';
      case 'heading2': return '## ';
      case 'heading3': return '### ';
      case 'bullet': return '• ';
      case 'number': return '1. ';
      case 'quote': return '> ';
      case 'code': return '```\n\n```';
      case 'divider': return '---';
      default: return '';
    }
  };

  // Handlers pour l'inventaire du marchand
  const handleEditItem = (item) => {
    // Logique d'édition d'item
  };

  const handleDeleteItem = (itemId) => {
    setMerchantInventory(items => items.filter(item => item.id !== itemId));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'Nouvel objet',
      price: 0,
      description: 'Description de l\'objet'
    };
    setMerchantInventory(items => [...items, newItem]);
    // Mettre automatiquement en mode édition le nom du nouvel objet
    setTimeout(() => {
      setEditingTableField(`${newItem.id}-name`);
      setEditingTableValue('Nouvel objet');
    }, 100);
  };

  const getTotalValue = () => {
    return merchantInventory.reduce((total, item) => total + item.price, 0);
  };

  // Fonctions pour l'édition du tableau
  const handleEditTableField = (itemId, field, currentValue) => {
    setEditingTableField(`${itemId}-${field}`);
    setEditingTableValue(currentValue);
  };

  const handleSaveTableField = (itemId, field) => {
    setMerchantInventory(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, [field]: field === 'price' ? parseInt(editingTableValue) || 0 : editingTableValue }
          : item
      )
    );
    setEditingTableField(null);
    setEditingTableValue('');
  };

  const handleCancelTableEdit = () => {
    setEditingTableField(null);
    setEditingTableValue('');
  };

  // Fonctions pour l'édition du total
  const handleEditTotal = () => {
    setEditingTotal(true);
    setTotalValue(getTotalValue());
  };

  const handleSaveTotal = () => {
    // Le total est calculé automatiquement, donc on ne fait rien ici
    setEditingTotal(false);
  };

  const handleCancelTotalEdit = () => {
    setEditingTotal(false);
  };

  // Fonction pour rendre le texte avec les mentions
  const renderTextWithMentions = (text) => {
    if (!text) return '';
    
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.trim() === 'Quête majeure') {
        return (
          <button
            key={index}
            onClick={() => {
              navigate(`/campaigns/${campaignId}/quest/major`);
            }}
            className="text-golden hover:text-golden/80 underline decoration-golden decoration-2 underline-offset-2 transition-colors cursor-pointer font-medium"
          >
            {part}
          </button>
        );
      }
      return part;
    });
  };

  // Fonction pour obtenir la couleur des quêtes
  const getQuestColor = (quest) => {
    if (quest.status === 'completed') return 'bg-green-500';
    if (quest.status === 'in_progress') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Effet pour charger les données de la campagne
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCampaign(defaultCampaign);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  // Effet pour fermer les menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showContextMenu) {
        setShowContextMenu(false);
      }
      if (showHistoryMenu) {
        setShowHistoryMenu(false);
      }
      if (showHistoryDropdown) {
        setShowHistoryDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showContextMenu, showHistoryMenu, showHistoryDropdown]);

  // Composant pour les cartes draggables
  const DraggableCard = ({ id, type, onContextMenu, showContextMenu, contextMenuPosition, searchQuery, setSearchQuery, filteredTemplates, onTemplateSelect }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    if (type === 'merchant') {
      return (
        <div
          ref={setNodeRef}
          style={style}
          className="notion-block group relative"
        >
          {/* Drag Handle */}
          <div className="notion-drag-handle" {...attributes} {...listeners}>
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
            </div>
          </div>

          {/* Bouton d'insertion */}
          <div className="notion-insert-button">
            <Plus size={16} className="text-gray-400 hover:text-gray-600 transition-colors duration-150" />
          </div>

          {/* Contenu de la carte */}
          <div className="notion-content">
            {/* Effet glassmorphisme pour les templates */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
              <h3 className="text-xl font-bold text-light eagle-lake-font mb-4">{campaign?.rencontre.title}</h3>
            
            <div className="space-y-4">
              <p className="text-light leading-relaxed">{renderTextWithMentions(campaign?.rencontre.content)}</p>
              <div className="text-sm text-light/80 font-semibold">
                PNJ: {campaign?.rencontre.npc}
              </div>

              {/* Tableau d'inventaire - Style Notion */}
              <div className="bg-white/10 rounded-lg p-4 border border-light/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-light flex items-center">
                    <Package size={16} className="mr-2" />
                    Inventaire du marchand
                  </h4>
                  <div className="text-sm text-light/80 font-semibold">
                    Total: {editingTotal ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={totalValue}
                          onChange={(e) => setTotalValue(parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                          autoFocus
                        />
                        <span>pièces d'or</span>
                        <button
                          onClick={handleSaveTotal}
                          className="p-1 text-green-400 hover:text-green-300 transition-colors"
                          title="Sauvegarder"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          onClick={handleCancelTotalEdit}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Annuler"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleEditTotal}
                        className="hover:bg-light/10 p-1 rounded transition-colors"
                      >
                        {getTotalValue()} pièces d'or
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-light/20">
                  <div className="grid grid-cols-4 gap-4 p-3 bg-light/10 text-sm font-semibold text-light border-b border-light/20">
                    <div>Objet</div>
                    <div>Nom</div>
                    <div>Prix</div>
                    <div>Actions</div>
                  </div>
                  {merchantInventory.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-4 gap-4 p-3 border-b border-light/10 last:border-b-0">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="text-light font-medium">
                        {editingTableField === `${item.id}-name` ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editingTableValue}
                              onChange={(e) => setEditingTableValue(e.target.value)}
                              className="w-full px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveTableField(item.id, 'name')}
                              className="p-1 text-green-400 hover:text-green-300 transition-colors"
                              title="Sauvegarder"
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button
                              onClick={handleCancelTableEdit}
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                              title="Annuler"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditTableField(item.id, 'name', item.name)}
                            className="w-full text-left hover:bg-light/10 p-1 rounded transition-colors"
                          >
                            {item.name}
                          </button>
                        )}
                      </div>
                      <div className="text-light/80">
                        {editingTableField === `${item.id}-price` ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editingTableValue}
                              onChange={(e) => setEditingTableValue(e.target.value)}
                              className="w-full px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveTableField(item.id, 'price')}
                              className="p-1 text-green-400 hover:text-green-300 transition-colors"
                              title="Sauvegarder"
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button
                              onClick={handleCancelTableEdit}
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                              title="Annuler"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditTableField(item.id, 'price', item.price)}
                            className="w-full text-left hover:bg-light/10 p-1 rounded transition-colors"
                          >
                            {item.price} PO
                          </button>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddItem}
                  className="w-full mt-4 bg-golden hover:bg-golden/80 text-dark-blue py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-semibold"
                >
                  <Plus size={16} />
                  <span>Ajouter un objet</span>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Composant pour une ligne de texte avec drag & drop
  const DraggableTextLine = ({
    id,
    content,
    isEditing,
    onEdit,
    onDelete,
    onContentChange,
    onInsertAfter,
    onContextMenu,
    showContextMenu,
    contextMenuPosition,
    searchQuery,
    setSearchQuery,
    filteredTemplates,
    onTemplateSelect
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`notion-block group relative ${isDragging ? 'dragging' : ''}`}
        onContextMenu={onContextMenu}
      >
        {/* Drag Handle */}
        <div className="notion-drag-handle" {...attributes} {...listeners}>
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
            <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
          </div>
        </div>

        {/* Bouton d'insertion */}
        <div className="notion-insert-button" onClick={(e) => {
          e.stopPropagation();
          onContextMenu(e);
        }}>
          <Plus size={16} className="text-gray-400 hover:text-gray-600 transition-colors duration-150" />
        </div>

        {/* Contenu du bloc */}
        <div className="notion-content">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => onContentChange(id, e.target.value)}
                className="w-full p-2 border-none resize-none focus:outline-none text-gray-900 text-base leading-relaxed bg-transparent"
                rows={Math.max(1, content.split('\n').length)}
                autoFocus
                placeholder="Tapez votre contenu..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(id, false)}
                  className="px-3 py-2 bg-golden text-dark-blue rounded-lg text-sm font-semibold hover:bg-golden/80 transition-all duration-200 shadow-sm"
                >
                  <Save size={14} className="inline mr-1" />
                  Sauvegarder
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold hover:bg-red-500/30 hover:text-red-300 transition-all duration-200"
                >
                  <Trash2 size={14} className="inline mr-1" />
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="cursor-pointer hover:bg-gray-50/30 p-2 rounded transition-colors duration-200 min-h-[1.5rem]"
              onClick={() => onEdit(id, true)}
            >
              <div className="text-gray-900 leading-relaxed text-base whitespace-pre-wrap">
                {content || <span className="text-gray-400 italic">Cliquez pour éditer...</span>}
              </div>
            </div>
          )}
        </div>

        {/* Menu contextuel */}
        {showContextMenu && (
          <div
            className="context-menu"
            style={{
              left: contextMenuPosition.x,
              top: contextMenuPosition.y,
            }}
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Search size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un bloc ou template..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm border-none outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="px-2 py-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Blocs de base</div>
              </div>
              {filteredTemplates.filter(t => t.type === 'block').map((template) => (
                <button
                  key={template.id}
                  onClick={() => onTemplateSelect(template)}
                  className="context-menu-item"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-gray-400">{template.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-light text-xl">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-center text-light">
          <h1 className="text-2xl font-bold mb-4">Campagne non trouvée</h1>
          <button
            onClick={() => navigate('/campaigns')}
            className="bg-golden hover:bg-golden/80 text-dark-blue px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Retour aux campagnes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore fixe */}
      <header className="flex items-center justify-between p-6 bg-primary-blue border-b border-light/10">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-6">
          {/* Bouton News hexagonal vert */}
          <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
            <Newspaper size={20} />
          </button>
          
          {/* Bouton Notifications */}
          <button className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          
          {/* Bouton Paramètres */}
          <button className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={() => navigate('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden">
            {campaign?.title}
          </span>
        </nav>
      </div>

      {/* Titre principal */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-light eagle-lake-font border-b-2 border-golden pb-2 inline-block">
            {campaign?.title}
          </h2>
          
          {/* Boutons d'action */}
          <div className="flex items-center space-x-4">
            {/* Bouton Historique avec menu déroulant */}
            <div className="relative">
              <button
                onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                className="bg-light/20 hover:bg-light/30 text-light px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Archive size={16} />
                <span>Historique</span>
                <ChevronRight size={14} className={`transform transition-transform ${showHistoryDropdown ? 'rotate-90' : ''}`} />
              </button>
              
              {/* Menu déroulant */}
              {showHistoryDropdown && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sessions précédentes</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {[
                        { id: 1, date: '2024-01-15', title: 'Session 1 - Début de l\'aventure', status: 'completed' },
                        { id: 2, date: '2024-01-22', title: 'Session 2 - Rencontre avec le marchand', status: 'completed' },
                        { id: 3, date: '2024-01-29', title: 'Session 3 - Exploration des ruines', status: 'in_progress' },
                        { id: 4, date: '2024-02-05', title: 'Session 4 - Combat contre les gobelins', status: 'planned' }
                      ].map((session) => (
                        <div key={session.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedSessions.includes(session.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSessions([...selectedSessions, session.id]);
                              } else {
                                setSelectedSessions(selectedSessions.filter(id => id !== session.id));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{session.title}</div>
                            <div className="text-xs text-gray-500">{session.date}</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            session.status === 'completed' ? 'bg-green-100 text-green-800' :
                            session.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {session.status === 'completed' ? 'Terminée' :
                             session.status === 'in_progress' ? 'En cours' : 'Planifiée'}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => setSelectedSessions([])}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Tout désélectionner
                      </button>
                      <button
                        onClick={() => {
                          console.log('Sessions sélectionnées:', selectedSessions);
                          setShowHistoryDropdown(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Charger ({selectedSessions.length})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bouton Nouvelle partie */}
            <button className="bg-golden hover:bg-golden/80 text-dark-blue px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-bold">
              <Plus size={16} />
              <span>Nouvelle partie</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Zone centrale - 3 colonnes */}
          <div className="lg:col-span-3 space-y-8">
            {/* Informations de la campagne */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-light/80 text-lg">{campaign?.game_system} • {campaign?.universe}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-light">{campaign?.date}</div>
                </div>
              </div>
              
              {/* Séparateur */}
              <div className="border-t border-light/20"></div>
            </div>


            {/* Notes de campagne - Style Notion */}
            <div className="space-y-8">
              {/* Section Situation initiale */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-light calligraphy-font italic">Situation initiale</h3>
                <div className="pl-8">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={textLines.filter(line => line.section === 'situation').map(line => line.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-1">
                        <AnimatePresence>
                          {textLines.filter(line => line.section === 'situation').map((line) => (
                            <motion.div
                              key={line.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <DraggableTextLine
                                id={line.id}
                                content={line.content}
                                isEditing={editingLine === line.id}
                                onEdit={handleLineEdit}
                                onDelete={handleLineDelete}
                                onContentChange={handleLineContentChange}
                                onInsertAfter={handleLineInsertAfter}
                                onContextMenu={handleContextMenu}
                                showContextMenu={showContextMenu}
                                contextMenuPosition={contextMenuPosition}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                filteredTemplates={filteredTemplates}
                                onTemplateSelect={handleTemplateSelect}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </SortableContext>
                    <DragOverlay>
                      {draggedItem ? (
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-2xl border border-golden/30">
                          <div className="text-gray-900 text-sm">
                            {draggedItem.content || 'Élément en cours de déplacement...'}
                          </div>
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                </div>
              </div>

              {/* Section Début de la partie */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-light calligraphy-font italic">Début de la partie</h3>
                <div className="pl-8">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={textLines.filter(line => line.section === 'debut').map(line => line.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-1">
                        <AnimatePresence>
                          {textLines.filter(line => line.section === 'debut').map((line) => (
                            <motion.div
                              key={line.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <DraggableTextLine
                                id={line.id}
                                content={line.content}
                                isEditing={editingLine === line.id}
                                onEdit={handleLineEdit}
                                onDelete={handleLineDelete}
                                onContentChange={handleLineContentChange}
                                onInsertAfter={handleLineInsertAfter}
                                onContextMenu={handleContextMenu}
                                showContextMenu={showContextMenu}
                                contextMenuPosition={contextMenuPosition}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                filteredTemplates={filteredTemplates}
                                onTemplateSelect={handleTemplateSelect}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </SortableContext>
                    <DragOverlay>
                      {draggedItem ? (
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-2xl border border-golden/30">
                          <div className="text-gray-900 text-sm">
                            {draggedItem.content || 'Élément en cours de déplacement...'}
                          </div>
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                </div>
              </div>
            </div>

            {/* Quête majeure - Lien simple */}
            <div className="pl-8">
              <button 
                onClick={() => {
                  navigate(`/campaigns/${campaignId}/quest/major`);
                }}
                className="text-golden hover:text-golden/80 transition-colors flex items-center space-x-2 text-lg font-medium"
              >
                <Link size={18} />
                <span>{campaign?.queteMajeure}</span>
              </button>
            </div>

            {/* Cartes et templates - Style Notion */}
            <div className="pl-8 space-y-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={textLines.filter(line => line.section === 'merchant').map(line => line.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-1">
                    <AnimatePresence>
                      {textLines.filter(line => line.section === 'merchant').map((line) => (
                        <motion.div
                          key={line.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          {line.type === 'card' ? (
                            <DraggableCard
                              id={line.id}
                              type={line.content}
                              onContextMenu={handleContextMenu}
                              showContextMenu={showContextMenu}
                              contextMenuPosition={contextMenuPosition}
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              filteredTemplates={filteredTemplates}
                              onTemplateSelect={handleTemplateSelect}
                            />
                          ) : (
                            <DraggableTextLine
                              id={line.id}
                              content={line.content}
                              isEditing={editingLine === line.id}
                              onEdit={handleLineEdit}
                              onDelete={handleLineDelete}
                              onContentChange={handleLineContentChange}
                              onInsertAfter={handleLineInsertAfter}
                              onContextMenu={handleContextMenu}
                              showContextMenu={showContextMenu}
                              contextMenuPosition={contextMenuPosition}
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              filteredTemplates={filteredTemplates}
                              onTemplateSelect={handleTemplateSelect}
                            />
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </SortableContext>
                <DragOverlay>
                  {draggedItem ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-2xl border border-golden/30">
                      <div className="text-gray-900 text-sm">
                        {draggedItem.type === 'card' ? 'Carte en cours de déplacement...' : (draggedItem.content || 'Élément en cours de déplacement...')}
                      </div>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>

          {/* Sidebar droite - 1 colonne */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            {/* Image atmosphérique */}
            <div className="bg-light/15 backdrop-blur-sm rounded-2xl p-4 border border-light/20 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-primary-blue to-dark-blue rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-lg">
                <Moon size={48} className="text-light/60 mb-2" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/50 rounded-lg p-3 text-center">
                    <Upload size={24} className="text-light mx-auto mb-2" />
                    <div className="text-sm text-light">Cliquez pour importer</div>
                    <div className="text-xs text-light/80">JPG, PNG, GIF (max 5MB)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracker de quêtes */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
              <h3 className="text-lg font-bold text-light eagle-lake-font mb-4">Quêtes</h3>
              
              <div className="space-y-4">
                {/* Quête majeure */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-white font-medium">Major quest</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white">50%</span>
                      <ChevronRight size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>

                {/* Quêtes mineures */}
                {campaign?.quests.filter(q => q.type === 'minor').map((quest, index) => (
                  <div key={index} className="space-y-2 ml-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getQuestColor(quest)}`}></div>
                        <span className="text-white font-medium">Minor quest</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={quest.completed.toString().padStart(3, '0')}
                          className="w-12 h-6 bg-gray-700 text-white text-center text-xs rounded border-none"
                          readOnly
                        />
                        <span className="text-white">/{quest.total}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getQuestColor(quest)}`} 
                        style={{ width: `${(quest.completed / quest.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Historique */}
      {showHistoryMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Sessions historiques</h3>
                <button
                  onClick={() => setShowHistoryMenu(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {historicalSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedSessions.includes(session.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSessionSelect(session.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">{session.title}</h4>
                      <input
                        type="checkbox"
                        checked={selectedSessions.includes(session.id)}
                        onChange={() => handleSessionSelect(session.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span>📅 {session.date}</span>
                        <span>⏱️ {session.duration}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">
                          Joueurs: {session.players.join(', ')}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        session.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {session.status === 'completed' ? 'Terminée' : 'En cours'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-3">{session.summary}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  {selectedSessions.length} session(s) sélectionnée(s)
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedSessions([])}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Tout désélectionner
                  </button>
                  <button
                    onClick={handleViewSelectedSessions}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Voir les sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu contextuel d'insertion */}
      {showInsertMenu && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-96 max-h-96 overflow-hidden">
            {/* Header avec barre de recherche */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-3">
                <Search size={16} className="text-blue-600" />
                <input
                  type="text"
                  placeholder="Rechercher un template..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm border-none outline-none text-gray-900 bg-white"
                  autoFocus
                />
                <button
                  onClick={() => setShowInsertMenu(false)}
                  className="text-blue-600 hover:text-yellow-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Tapez @ dans le texte ou utilisez ce menu pour insérer des templates
              </div>
            </div>

            {/* Liste des templates */}
            <div className="max-h-64 overflow-y-auto">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleInsertTemplate(template)}
                    className="w-full text-left p-3 hover:bg-yellow-500/10 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{template.name}</div>
                        <div className="text-xs text-blue-600/70">{template.description}</div>
                      </div>
                      <div className="text-xs bg-yellow-500/20 text-blue-600 px-2 py-1 rounded font-medium">
                        {template.type}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-blue-600 text-sm font-medium">
                  Aucun template trouvé
                </div>
              )}
            </div>

            {/* Footer avec bouton de fermeture */}
            <div className="p-3 border-t border-gray-200 bg-yellow-500/5">
              <button
                onClick={() => setShowInsertMenu(false)}
                className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded text-sm transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDashboard;