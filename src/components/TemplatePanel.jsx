import React, { useState, useEffect } from 'react';
import TemplateTab from './TemplateTab';
import NewEventPanel from './NewEventPanel';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Copy, 
  Archive, 
  Plus,
  Star,
  X
} from 'lucide-react';

const TemplatePanel = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState('templates'); // 'templates' ou 'new-event'
  
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
    const saved = localStorage.getItem('lore-templates-categories');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 'modeles-simples', name: 'Modèles simples', isEditable: false },
      { id: 'quete-principale', name: 'Quête principale', isEditable: true },
      { id: 'zilargo', name: 'Zilargo', isEditable: true },
      { id: 'rencontres-aleatoires', name: 'Rencontres aléatoires', isEditable: true }
    ];
  });
  
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('lore-templates-data');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 'combat-simple', name: 'Combat simple', category: 'modeles-simples', isEditable: false, isFavorite: false, isArchived: false },
      { id: 'marchand', name: 'Rencontre avec un\nmarchand', category: 'modeles-simples', isEditable: false, isFavorite: false, isArchived: false },
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
  const [editingTemplate, setEditingTemplate] = useState(() => {
    const saved = localStorage.getItem('lore-templates-editing-template');
    return saved ? JSON.parse(saved) : null;
  });
  const [copyNotification, setCopyNotification] = useState(null);

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem('lore-templates-categories', JSON.stringify(categories));
  }, [categories]);

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
      setCopyNotification('Lien copié ! Vous pouvez maintenant le coller sur le dashboard.');
      setTimeout(() => setCopyNotification(null), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      setCopyNotification('Erreur lors de la copie du lien.');
      setTimeout(() => setCopyNotification(null), 3000);
    }
  };

  const createTemplate = (categoryId) => {
    // Redirection vers la page "Nouvel évènement"
    console.log(`Créer un template dans la catégorie: ${categoryId}`);
    setCurrentView('new-event');
    setIsOpen(true);
  };

  const editTemplate = (templateId) => {
    // Redirection vers la page "Consultation"
    console.log(`Éditer le template: ${templateId}`);
    // TODO: Implémenter la navigation vers la page de consultation
  };

  const handleBackToTemplates = () => {
    setCurrentView('templates');
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
        <div className="h-full flex flex-col pl-20 pt-8 pr-6">
          {/* Barre d'outils - Fixe */}
          <div className="flex items-center gap-3 mb-6 flex-shrink-0 pl-16">
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
            
            {/* Bouton de recherche */}
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
                      className="bg-transparent text-white px-2 py-1 text-sm border-none focus:outline-none placeholder-white/70 w-32"
                      autoFocus
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSearchInput(false);
                        setSearchTerm('');
                      }}
                      className="text-white hover:text-black transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contenu scrollable - Seulement les sections */}
          <div className="flex-1 space-y-4 overflow-y-auto min-h-0 pl-16 pb-4">
            {/* Sections dynamiques basées sur les catégories */}
            {categories.map(category => {
              const categoryTemplates = templates.filter(template => 
                template.category === category.id && 
                (selectedFilter === 'aucun' || 
                 (selectedFilter === 'favoris' && template.isFavorite) ||
                 (selectedFilter === 'archives' && template.isArchived) ||
                 (selectedFilter === 'categorie' && template.category === category.id))
              );

              if (selectedFilter === 'archives' && !categoryTemplates.some(t => t.isArchived)) {
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
                          className="bg-golden text-[#552E1A] px-3 py-1 rounded text-sm font-medium hover:bg-golden/80 transition-colors"
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
                    </div>
                  </div>
                  
                  {expandedSections[category.id] && (
                    <div className="p-3 space-y-4">
                      {/* Sous-catégories */}
                      {subcategories
                        .filter(sub => sub.category === category.id)
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
                                  className="bg-golden text-[#552E1A] px-3 py-1 rounded text-sm font-medium hover:bg-golden/80 transition-colors"
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
                                            className={`text-[#552E1A] break-words whitespace-pre-line max-w-[200px] ${template.isEditable ? 'cursor-pointer hover:text-black transition-colors' : ''}`}
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
                                      className={`text-[#552E1A] break-words whitespace-pre-line max-w-[200px] ${template.isEditable ? 'cursor-pointer hover:text-black transition-colors' : ''}`}
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

          {/* Notification de copie */}
          {copyNotification && (
            <div className="fixed top-4 right-4 z-50 bg-[#552E1A] text-white px-4 py-2 rounded-lg shadow-lg eagle-lake-font text-sm">
              {copyNotification}
            </div>
          )}
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
      content: <div className="text-center text-blue-400/60">Contenu à définir</div>
    },
    {
      id: 'characters',
      title: 'Personnages',
      icon: '👤',
      closedImage: '/images/templates/character-tab-closed.svg',
      openImage: '/images/templates/character-tab-open.svg',
      color: 'from-green-500 to-green-600',
      content: <div className="text-center text-green-400/60">Contenu à définir</div>
    },
    {
      id: 'objects',
      title: 'Objets',
      icon: '⚔️',
      closedImage: '/images/templates/object-tab-closed.svg',
      openImage: '/images/templates/object-tab-open.svg',
      color: 'from-yellow-500 to-yellow-600',
      content: <div className="text-center text-yellow-400/60">Contenu à définir</div>
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  // Si on est en vue "new-event", afficher le composant NewEventPanel
  if (currentView === 'new-event') {
    return (
      <NewEventPanel 
        onBack={handleBackToTemplates}
        categories={categories}
      />
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
    >
      {activeTabData?.content}
    </TemplateTab>
  );
};

export default TemplatePanel;