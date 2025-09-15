import React, { useState, useEffect } from 'react';
import TemplateTab from './TemplateTab';
import { 
  ChevronDown, 
  X,
  Tag,
  ArrowLeft
} from 'lucide-react';

const NewEventPanel = ({ onBack, categories, onEventCreated, templateToEdit = null }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Initialiser les champs si on est en mode modification
  useEffect(() => {
    if (templateToEdit) {
      setSelectedCategory(templateToEdit.category || '');
      setEventTitle(templateToEdit.name || '');
      setEventDescription(templateToEdit.description || '');
      setEventLocation(templateToEdit.location || '');
      setSelectedTags(templateToEdit.tags || []);
      if (templateToEdit.imagePreview) {
        setImagePreview(templateToEdit.imagePreview);
      }
    }
  }, [templateToEdit]);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEventImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEventImage(null);
    setImagePreview(null);
  };

  const handleCreateEvent = () => {
    const eventData = {
      id: templateToEdit ? templateToEdit.id : `event-${Date.now()}`,
      title: eventTitle,
      description: eventDescription,
      category: selectedCategory,
      location: eventLocation,
      tags: selectedTags,
      image: eventImage,
      imagePreview: imagePreview,
      createdAt: templateToEdit ? templateToEdit.createdAt : new Date().toISOString(),
      isEdit: !!templateToEdit
    };
    
    console.log(templateToEdit ? 'Évènement modifié:' : 'Nouvel évènement créé:', eventData);
    
    // Appeler la fonction pour ajouter l'évènement à la page templates
    if (onEventCreated) {
      onEventCreated(eventData);
    }
    
    // Retourner à la page templates
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
        <div className="h-full flex flex-col pt-6 pr-6">
          {/* Titre avec bouton retour */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={onBack}
              className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
            >
              <ArrowLeft size={16} className="text-[#552E1A]" />
            </button>
            <h1 className="text-black text-2xl font-bold eagle-lake-font">
              {templateToEdit ? 'Modifier l\'évènement' : 'Nouvel évènement'}
            </h1>
          </div>

          {/* Formulaire */}
          <div className="flex-1 overflow-y-auto pb-12 max-h-[calc(100vh-300px)]">
            <div className="max-w-5xl">
              {/* Section principale avec image à droite */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Colonne gauche - Champs de saisie */}
                <div className="space-y-6">
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
                        <option value="">Sélection de catégorie</option>
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
                      {predefinedTags.map(tag => {
                        const isSelected = selectedTags.find(t => t.id === tag.id);
                        return (
                          <button
                            key={tag.id}
                            onClick={() => handleTagSelect(tag)}
                            disabled={isSelected}
                            className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-1 ${isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <Tag size={12} />
                            {tag.name}
                            {isSelected && <span className="ml-1">✓</span>}
                          </button>
                        );
                      })}
                      {/* Tags personnalisés ajoutés */}
                      {selectedTags.filter(tag => tag.id.startsWith('custom-')).map(tag => (
                        <div
                          key={tag.id}
                          className="text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
                          style={{ 
                            backgroundColor: '#552E1A',
                            border: '1px solid #552E1A'
                          }}
                        >
                          <Tag size={12} />
                          {tag.name}
                          <button
                            onClick={() => handleTagRemove(tag.id)}
                            className="hover:bg-white/30 rounded-full p-0.5 transition-colors flex items-center justify-center"
                            title="Supprimer ce tag"
                          >
                            <X size={12} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>


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
                        type="button"
                        onClick={handleAddCustomTag}
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
                </div>

                {/* Colonne droite - Upload d'image */}
                <div>
                  <label className="block text-[#552E1A] font-medium mb-2 eagle-lake-font">
                    Image de l'évènement
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer block w-full h-48 bg-[#F5F1E8] border-2 border-dashed border-[#552E1A]/30 rounded-lg flex items-center justify-center hover:border-[#552E1A]/50 transition-colors"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-[#552E1A]/60 text-sm mb-1">Cliquez pour ajouter une image</div>
                          <div className="text-[#552E1A]/40 text-xs">PNG, JPG, GIF jusqu'à 10MB</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Champ description */}
              <div className="mb-6">
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
              <div className="flex justify-end gap-4">
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
                  {templateToEdit ? 'Modifier l\'évènement' : 'Créer l\'évènement'}
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
