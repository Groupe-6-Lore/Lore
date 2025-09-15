import React, { useState, useEffect } from 'react';
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
  Archive, 
  Plus,
  Star,
  X
} from 'lucide-react';

const TemplatePanel = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState('templates'); // 'templates', 'new-event', ou 'consultation'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
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
    setCurrentView('new-quest');
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
  };

  const handleConsultTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentView('consultation');
  };

  const handleEditTemplate = (template) => {
    // Envoyer vers la page "Nouvel évènement" en mode modification
    console.log('Modification du template:', template);
    setSelectedTemplate(template);
    setCurrentView('new-quest');
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
                const categoryTemplates = templates.filter(template => {
                  // Filtrage par statut
                  const matchesFilter = selectedFilter === 'aucun' ? !template.isArchived : 
                 (selectedFilter === 'favoris' && template.isFavorite) ||
                 (selectedFilter === 'archives' && template.isArchived) ||
                   (selectedFilter === 'categorie' && template.category === category.id);
                  
                  // Filtrage par recherche
                  const matchesSearch = !searchTerm || 
                    template.name.toLowerCase().includes(searchTerm.toLowerCase());
                  
                  return template.category === category.id && matchesFilter && matchesSearch;
                });

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
      content: (() => {
        // États locaux pour la page Quêtes
        const [questShowSearchInput, setQuestShowSearchInput] = React.useState(false);
        const [questSearchTerm, setQuestSearchTerm] = React.useState('');
        const [questSelectedFilter, setQuestSelectedFilter] = React.useState('aucun');
        const [questSelectedSort, setQuestSelectedSort] = React.useState('aucun');
        
        // États pour le formulaire de nouvelle quête
        const [newQuestTitle, setNewQuestTitle] = React.useState('');
        const [newQuestCategory, setNewQuestCategory] = React.useState('');
        const [newQuestLocation, setNewQuestLocation] = React.useState('');
        const [newQuestStartPoint, setNewQuestStartPoint] = React.useState('');
        const [newQuestDestination, setNewQuestDestination] = React.useState('');
        const [newQuestSponsor, setNewQuestSponsor] = React.useState('');
        const [newQuestRewards, setNewQuestRewards] = React.useState('');
        const [newQuestDescription, setNewQuestDescription] = React.useState('');
        
        // États pour l'édition des quêtes
        const [editingQuestTitle, setEditingQuestTitle] = React.useState(null);
        const [editingQuestCount, setEditingQuestCount] = React.useState(null);
        const [questTitles, setQuestTitles] = React.useState({
          'histoire-principale': 'Histoire principale',
          'liberer-otages': 'Libérer les otages alliés'
        });
        const [questCounts, setQuestCounts] = React.useState({
          'chasseurs': { current: 4, total: 4 },
          'mages': { current: 6, total: 6 }
        });
        
        // États pour les catégories et quêtes dynamiques
        const [categories, setCategories] = React.useState([
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
        ]);
        
        // États pour les dropdowns
        const [expandedQuests, setExpandedQuests] = React.useState({
          'histoire-principale': true,
          'liberer-otages': true
        });
        
        // États pour les menus contextuels
        const [openContextMenu, setOpenContextMenu] = React.useState(null);
        
        // État pour l'édition des noms d'objectifs
        const [editingObjectiveName, setEditingObjectiveName] = React.useState(null);
        
        // État pour l'édition du total des compteurs
        const [editingQuestTotal, setEditingQuestTotal] = React.useState(null);
        
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
                ? { ...cat, quests: [...cat.quests, newQuest] }
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
          setCurrentView('templates');
          
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
          setCurrentView('templates');
        };

        // Si on est en mode création de quête, afficher le formulaire
        if (currentView === 'new-quest') {
          return (
            <div className="h-full flex flex-col bg-gradient-to-br from-amber-50 to-orange-50">
              {/* Header avec titre et bouton retour */}
              <div className="flex items-center gap-4 p-6 border-b border-[#552E1A]/20 bg-white/50">
                <button
                  onClick={cancelNewQuest}
                  className="flex items-center justify-center w-8 h-8 bg-golden rounded-lg hover:bg-golden/80 transition-colors"
                >
                  <ChevronRight size={16} className="text-[#552E1A] rotate-180" />
                </button>
                <h1 className="text-2xl font-bold text-[#552E1A] eagle-lake-font">Nouvelle quête</h1>
              </div>

              {/* Formulaire */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                <div>
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
                    placeholder="Description..."
                    rows={8}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden/50 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4 p-6 border-t border-[#552E1A]/20 bg-white/50">
                <button
                  onClick={cancelNewQuest}
                  className="px-6 py-3 bg-white/70 border border-gray-200 rounded-lg text-[#552E1A] hover:bg-white/90 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={createNewQuest}
                  className="px-6 py-3 bg-golden text-white rounded-lg hover:bg-golden/80 transition-colors font-semibold"
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