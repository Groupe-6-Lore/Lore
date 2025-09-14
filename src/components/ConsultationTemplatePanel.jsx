import React, { useState } from 'react';
import TemplateTab from './TemplateTab';
import { ArrowLeft, Copy, Edit, ChevronRight } from 'lucide-react';

const ConsultationTemplatePanel = ({ 
  template, 
  onBack, 
  onEdit, 
  onCopyLink,
  tabs = []
}) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Toujours revenir à la page templates quand on change d'onglet
    onBack();
  };

  // Données de démonstration basées sur l'image
  const templateData = {
    id: template?.id || 'bataille-arcanix',
    name: template?.name || 'Bataille d\'Arcanix',
    category: template?.category || 'quete-principale',
    subcategory: template?.subcategory || 'cite-arcanix',
    location: 'Arcanix',
    sponsor: 'Nom du personnage',
    tags: [
      { name: 'Quête Principale', color: 'bg-primary-blue' },
      { name: 'Ville', color: 'bg-primary-blue' },
      { name: 'Magie', color: 'bg-primary-blue' },
      { name: 'Alliés', color: 'bg-primary-blue' }
    ],
    image: '/images/templates/arcanix-castle.jpg', // Image du château
    description: `Arcanix, la cité des mages, se dresse majestueusement sur les dernières collines embrumées de l'Est. Accrochée aux falaises comme un joyau précieux, elle brille de mille arcanes scintillantes qui dansent dans l'air du crépuscule.

Ses tours élancées, serties de runes lumineuses, percent les nuages bas et projettent des ombres mystérieuses sur les ponts de pierre suspendus qui relient les différents quartiers de la cité. Chaque pierre de ses murailles raconte une histoire millénaire, chaque fenêtre éclairée révèle un secret magique.

Au cœur de la cité, l'Académie des Mages domine l'horizon de sa silhouette imposante. Ses bibliothèques infinies renferment les connaissances les plus anciennes, tandis que ses laboratoires résonnent encore des expériences des plus grands sorciers de l'histoire.

Les rues pavées d'Arcanix bruissent d'activité magique. Les marchands vendent des ingrédients rares, les apprentis s'entraînent dans les cours intérieures, et les maîtres mages débattent de théories complexes dans les tavernes enfumées.

C'est ici que se jouera le destin de nombreux aventuriers, dans cette cité où la magie coule dans les veines mêmes de la pierre.`
  };


  const handleCopyLink = () => {
    // Utiliser la même fonction que dans la page templates
    onCopyLink();
  };

  const consultationContent = (
    <div className="h-full flex flex-col pt-6 pr-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#552E1A]/70 mb-4">
        <button 
          onClick={onBack}
          className="hover:text-[#552E1A] transition-colors"
        >
          Templates
        </button>
        <ChevronRight size={14} />
        <span className="text-[#552E1A]/70">Quête principale</span>
        <ChevronRight size={14} />
        <span className="text-[#552E1A] font-medium">{templateData.name}</span>
      </div>

      {/* Titre avec bouton retour */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-8 h-8 bg-golden rounded flex items-center justify-center hover:bg-golden/80 transition-colors"
        >
          <ArrowLeft size={16} className="text-[#552E1A]" />
        </button>
        <h1 className="text-black text-2xl font-bold eagle-lake-font">{templateData.name}</h1>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto pb-12 max-h-[calc(100vh-300px)]">
        <div className="max-w-5xl">
          {/* Section métadonnées - 2 colonnes */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Colonne gauche - Métadonnées */}
            <div className="space-y-6">
              {/* Lieu */}
              <div>
                <label className="block text-[#552E1A] font-bold mb-1 eagle-lake-font">
                  Lieu
                </label>
                <span className="text-[#552E1A]">{templateData.location}</span>
              </div>

              {/* Commanditaire */}
              <div>
                <label className="block text-[#552E1A] font-bold mb-1 eagle-lake-font">
                  Commanditaire
                </label>
                <span className="text-[#552E1A]">{templateData.sponsor}</span>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[#552E1A] font-bold mb-3 eagle-lake-font">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {templateData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite - Image */}
            <div>
              <div className="w-full h-64 bg-[#F5F1E8] border-2 border-dashed border-[#552E1A]/30 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={templateData.image}
                  alt={templateData.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback si l'image ne charge pas
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="hidden w-full h-full items-center justify-center text-[#552E1A]/60"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-lg mb-2">🏰</div>
                    <div className="text-sm">Image du château d'Arcanix</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section description */}
          <div className="mb-8">
            <label className="block text-[#552E1A] font-bold mb-3 eagle-lake-font">
              Description
            </label>
            <div className="bg-[#F5F1E8] p-4 rounded-lg border border-[#552E1A]/20 max-h-64 overflow-y-auto">
              <div className="text-[#552E1A] leading-relaxed whitespace-pre-line">
                {templateData.description}
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => onEdit(templateData)}
              className="bg-[#F5F1E8] text-[#552E1A] px-6 py-3 rounded-lg border border-[#552E1A]/20 hover:bg-[#E8E0D0] transition-colors font-medium flex items-center gap-2"
            >
              <Edit size={16} />
              Modifier
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-golden text-[#552E1A] px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors flex items-center gap-2"
            >
              <Copy size={16} />
              Copier le lien
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
      closedImage="/images/templates/template-tab-closed.svg"
      openImage="/images/templates/template-tab-open.svg"
    >
      {consultationContent}
    </TemplateTab>
  );
};

export default ConsultationTemplatePanel;
