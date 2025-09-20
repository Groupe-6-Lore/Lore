import React, { useState } from 'react';
import TemplateTab from './TemplateTab';
import { ArrowLeft, Copy, Edit, ChevronRight, Package, Sword, Shield, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

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

  // Données spécifiques selon le type de template
  const getTemplateData = () => {
    if (template?.id === 'marchand') {
      return {
        id: 'marchand',
        name: 'Rencontre avec un marchand',
        category: 'modeles-simples',
        location: 'Marché local',
        npc: 'Marcus le Marchand',
        tags: [
          { name: 'Marchand', color: 'bg-blue-600' },
          { name: 'Commerce', color: 'bg-green-600' },
          { name: 'Social', color: 'bg-purple-600' }
        ],
        image: '/images/templates/merchant.jpg',
        description: 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
        inventory: [
          { id: 1, name: 'Potion de soins mineure', price: 25 },
          { id: 2, name: 'Parchemin de bouclier', price: 50 },
          { id: 3, name: 'Pierre de sort', price: 100 },
          { id: 4, name: 'Corde de soie', price: 10 },
          { id: 5, name: 'Torche éternelle', price: 15 }
        ]
      };
    } else if (template?.id === 'combat-simple') {
      return {
        id: 'combat-simple',
        name: 'Combat simple',
        category: 'modeles-simples',
        location: 'Route forestière',
        difficulty: 'Facile',
        rewards: '2d6 pièces d\'or, potion de soins mineure',
        tags: [
          { name: 'Combat', color: 'bg-red-600' },
          { name: 'Brigands', color: 'bg-orange-600' },
          { name: 'Route', color: 'bg-yellow-600' }
        ],
        image: '/images/templates/combat.jpg',
        description: 'Une embuscade tendue par des brigands sur la route forestière. Les bandits, motivés par la cupidité, attaquent sans pitié avec leurs armes de fortune. Un combat rapide mais intense s\'engage.',
        enemies: [
          { name: 'Bandit', hp: 15, ac: 12, attack: '+3', damage: '1d6+1' },
          { name: 'Chef bandit', hp: 25, ac: 14, attack: '+5', damage: '1d8+2' }
        ]
      };
    } else {
      // Template par défaut (Bataille d'Arcanix)
      return {
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
        image: '/images/templates/arcanix-castle.jpg',
        description: `Arcanix, la cité des mages, se dresse majestueusement sur les dernières collines embrumées de l'Est. Accrochée aux falaises comme un joyau précieux, elle brille de mille arcanes scintillantes qui dansent dans l'air du crépuscule.

Ses tours élancées, serties de runes lumineuses, percent les nuages bas et projettent des ombres mystérieuses sur les ponts de pierre suspendus qui relient les différents quartiers de la cité. Chaque pierre de ses murailles raconte une histoire millénaire, chaque fenêtre éclairée révèle un secret magique.

Au cœur de la cité, l'Académie des Mages domine l'horizon de sa silhouette imposante. Ses bibliothèques infinies renferment les connaissances les plus anciennes, tandis que ses laboratoires résonnent encore des expériences des plus grands sorciers de l'histoire.

Les rues pavées d'Arcanix bruissent d'activité magique. Les marchands vendent des ingrédients rares, les apprentis s'entraînent dans les cours intérieures, et les maîtres mages débattent de théories complexes dans les tavernes enfumées.

C'est ici que se jouera le destin de nombreux aventuriers, dans cette cité où la magie coule dans les veines mêmes de la pierre.`
      };
    }
  };

  const templateData = getTemplateData();


  const handleCopyLink = () => {
    // Si c'est le template marchand, copier un texte spécial pour la détection
    if (template?.id === 'marchand') {
      const copyText = 'Rencontre avec un marchand - consultation';
      navigator.clipboard.writeText(copyText).then(() => {
        // Afficher une notification de succès
        console.log('Texte copié pour le template marchand:', copyText);
        toast.success('Lien copié ! Vous pouvez maintenant le coller dans le dashboard.');
      }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        toast.error('Erreur lors de la copie du lien');
      });
    } else if (template?.id === 'combat-simple') {
      // Si c'est le template combat, copier un texte spécial pour la détection
      const copyText = 'Combat simple - consultation';
      navigator.clipboard.writeText(copyText).then(() => {
        // Afficher une notification de succès
        console.log('Texte copié pour le template combat:', copyText);
        toast.success('Lien copié ! Vous pouvez maintenant le coller dans le dashboard.');
      }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        toast.error('Erreur lors de la copie du lien');
      });
    } else {
      // Utiliser la même fonction que dans la page templates pour les autres templates
      onCopyLink();
    }
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

              {/* PNJ (pour marchand) */}
              {templateData.npc && (
                <div>
                  <label className="block text-[#552E1A] font-bold mb-1 eagle-lake-font">
                    PNJ
                  </label>
                  <span className="text-[#552E1A]">{templateData.npc}</span>
                </div>
              )}

              {/* Difficulté (pour combat) */}
              {templateData.difficulty && (
                <div>
                  <label className="block text-[#552E1A] font-bold mb-1 eagle-lake-font">
                    Difficulté
                  </label>
                  <span className="text-[#552E1A]">{templateData.difficulty}</span>
                </div>
              )}

              {/* Récompenses (pour combat) */}
              {templateData.rewards && (
                <div>
                  <label className="block text-[#552E1A] font-bold mb-1 eagle-lake-font">
                    Récompenses
                  </label>
                  <span className="text-[#552E1A]">{templateData.rewards}</span>
                </div>
              )}

              {/* Commanditaire (pour quêtes) */}
              {templateData.sponsor && (
                <div>
                  <label className="block text-[#552E1A] font-bold mb-1 eagle-lake-font">
                    Commanditaire
                  </label>
                  <span className="text-[#552E1A]">{templateData.sponsor}</span>
                </div>
              )}

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

          {/* Section inventaire du marchand */}
          {templateData.inventory && (
            <div className="mb-8">
              <label className="block text-[#552E1A] font-bold mb-3 eagle-lake-font flex items-center gap-2">
                <Package size={20} />
                Inventaire du marchand
              </label>
              <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4">
                <div className="space-y-2">
                  {templateData.inventory.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-white/50 rounded">
                      <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="text-[#552E1A] font-medium flex-1">
                        {item.name}
                      </div>
                      <div className="text-[#552E1A]/80">
                        {item.price} PO
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-[#552E1A]/20">
                  <div className="text-sm text-[#552E1A]/80 font-semibold text-right">
                    Total: {templateData.inventory.reduce((sum, item) => sum + item.price, 0)} pièces d'or
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section ennemis du combat */}
          {templateData.enemies && (
            <div className="mb-8">
              <label className="block text-[#552E1A] font-bold mb-3 eagle-lake-font flex items-center gap-2">
                <Sword size={20} />
                Ennemis
              </label>
              <div className="bg-[#F5F1E8] border border-[#552E1A]/20 rounded-lg p-4">
                <div className="space-y-3">
                  {templateData.enemies.map((enemy, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3 p-3 bg-white/50 rounded">
                      <div>
                        <label className="block text-[#552E1A] text-sm font-medium mb-1">Nom</label>
                        <div className="text-[#552E1A] font-semibold">{enemy.name}</div>
                      </div>
                      <div>
                        <label className="block text-[#552E1A] text-sm font-medium mb-1 flex items-center gap-1">
                          <Heart size={12} />
                          PV
                        </label>
                        <div className="text-[#552E1A]">{enemy.hp}</div>
                      </div>
                      <div>
                        <label className="block text-[#552E1A] text-sm font-medium mb-1 flex items-center gap-1">
                          <Shield size={12} />
                          CA
                        </label>
                        <div className="text-[#552E1A]">{enemy.ac}</div>
                      </div>
                      <div>
                        <label className="block text-[#552E1A] text-sm font-medium mb-1">Attaque</label>
                        <div className="text-[#552E1A]">{enemy.attack}</div>
                      </div>
                      <div>
                        <label className="block text-[#552E1A] text-sm font-medium mb-1">Dégâts</label>
                        <div className="text-[#552E1A]">{enemy.damage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
