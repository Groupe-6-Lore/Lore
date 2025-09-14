import React, { useState } from 'react';
import TemplateTab from './TemplateTab';
import { 
  ChevronDown, 
  X,
  Tag,
  ArrowLeft
} from 'lucide-react';

const NewEventPanel = ({ onBack, categories }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  // Tags prédéfinis
  const predefinedTags = [
    { id: 'combat', name: 'Combat', color: 'bg-blue-600' },
    { id: 'social', name: 'Social', color: 'bg-green-600' },
    { id: 'exploration', name: 'Exploration', color: 'bg-purple-600' },
    { id: 'mystere', name: 'Mystère', color: 'bg-red-600' },
    { id: 'magie', name: 'Magie', color: 'bg-yellow-600' }
  ];

  const handleTagSelect = (tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagId) => {
    setSelectedTags(selectedTags.filter(t => t.id !== tagId));
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !selectedTags.find(t => t.name.toLowerCase() === newTag.toLowerCase())) {
      const customTag = {
        id: `custom-${Date.now()}`,
        name: newTag.trim(),
        color: 'bg-[#552E1A]'
      };
      setSelectedTags([...selectedTags, customTag]);
      setNewTag('');
    }
  };

  const handleCreateEvent = () => {
    const eventData = {
      id: `event-${Date.now()}`,
      title: eventTitle,
      description: eventDescription,
      category: selectedCategory,
      location: eventLocation,
      tags: selectedTags,
      createdAt: new Date().toISOString()
    };
    
    console.log('Nouvel évènement créé:', eventData);
    // TODO: Sauvegarder l'évènement et rediriger
    onBack();
  };

  const handleCancel = () => {
    onBack();
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Si on clique sur templates, revenir au panel principal (page Templates)
    // Si on clique sur une autre languette, revenir au panel principal aussi
    onBack();
  };

  const tabs = [
    {
      id: 'templates',
      title: 'Templates',
      icon: '📄',
      closedImage: '/images/templates/template-tab-closed.svg',
      openImage: '/images/templates/template-tab-open.svg',
      color: 'from-golden to-golden/70'
    },
    {
      id: 'quests',
      title: 'Quêtes',
      icon: '📜',
      closedImage: '/images/templates/quest-tab-closed.svg',
      openImage: '/images/templates/quest-tab-open.svg',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'characters',
      title: 'Personnages',
      icon: '👤',
      closedImage: '/images/templates/character-tab-closed.svg',
      openImage: '/images/templates/character-tab-open.svg',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'objects',
      title: 'Objets',
      icon: '⚔️',
      closedImage: '/images/templates/object-tab-closed.svg',
      openImage: '/images/templates/object-tab-open.svg',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const newEventContent = (
        <div className="h-full flex flex-col pl-20 pt-6 pr-6">
          {/* Titre avec bouton retour */}
          <div className="flex items-center gap-3 mb-6 pl-16">
            <button
              onClick={onBack}
              className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
            >
              <ArrowLeft size={16} className="text-[#552E1A]" />
            </button>
            <h1 className="text-black text-2xl font-bold eagle-lake-font">Nouvel évènement</h1>
          </div>

          {/* Formulaire */}
          <div className="flex-1 overflow-y-auto pl-16 pb-12 max-h-[calc(100vh-300px)]">
            <div className="max-w-2xl space-y-6">
              
              {/* Champ catégorie */}
              <div>
                <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                  Catégorie
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionner une catégorie...</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={20} className="text-[#552E1A]" />
                  </div>
                </div>
              </div>

              {/* Champ titre */}
              <div>
                <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                  Titre de l'évènement
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Titre de l'évènement"
                  className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                />
              </div>

              {/* Section Tags */}
              <div>
                <label className="block text-[#552E1A] font-medium mb-3 eagle-lake-font">
                  Tags
                </label>
                
                {/* Tags existants */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {predefinedTags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagSelect(tag)}
                      className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-1`}
                    >
                      <Tag size={12} />
                      {tag.name}
                    </button>
                  ))}
                </div>

                {/* Tags sélectionnés */}
                {selectedTags.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[#552E1A]/70 text-sm mb-2">Tags sélectionnés :</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <div
                          key={tag.id}
                          className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
                        >
                          <Tag size={12} />
                          {tag.name}
                          <button
                            onClick={() => handleTagRemove(tag.id)}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ajouter un tag personnalisé */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Ajouter un tag personnalisé..."
                    className="flex-1 bg-[#F5F1E8] text-[#552E1A] px-4 py-2 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCustomTag();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddCustomTag}
                    className="bg-[#552E1A] text-white px-4 py-2 rounded-lg hover:bg-[#6B3A2A] transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Champ lieu */}
              <div>
                <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                  Lieu
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Lieu..."
                  className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60"
                />
              </div>

              {/* Champ description */}
              <div>
                <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                  Description
                </label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Description de l'évènement..."
                  rows={4}
                  className="w-full bg-[#F5F1E8] text-[#552E1A] px-4 py-3 rounded-lg border border-[#552E1A]/20 focus:outline-none focus:ring-2 focus:ring-golden/50 placeholder-[#552E1A]/60 resize-none"
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={handleCancel}
                  className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateEvent}
                  disabled={!eventTitle.trim() || !selectedCategory}
                  className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed eagle-lake-font"
                >
                  Créer l'évènement
                </button>
              </div>
            </div>
          </div>
        </div>
  );

  return (
    <TemplateTab
      isOpen={isOpen}
      onToggle={handleToggle}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      tabs={tabs}
      backgroundImage="/images/templates/templates-background.svg"
      closedImage={tabs.find(tab => tab.id === activeTab)?.closedImage}
      openImage={tabs.find(tab => tab.id === activeTab)?.openImage}
    >
      {newEventContent}
    </TemplateTab>
  );
};

export default NewEventPanel;
