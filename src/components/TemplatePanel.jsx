import React, { useState } from 'react';
import TemplateTab from './TemplateTab';

const TemplatePanel = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    {
      id: 'templates',
      title: 'Templates',
      icon: '📄',
      closedImage: '/images/templates/template-tab-closed.svg',
      openImage: '/images/templates/template-tab-open.svg',
      color: 'from-golden to-golden/70',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-golden/20 hover:border-golden/40 transition-colors cursor-pointer">
            <div className="text-golden text-lg mb-2">👤</div>
            <div className="text-light font-semibold">Personnage</div>
            <div className="text-light/60 text-sm">Créer un personnage</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-golden/20 hover:border-golden/40 transition-colors cursor-pointer">
            <div className="text-golden text-lg mb-2">🏰</div>
            <div className="text-light font-semibold">Lieu</div>
            <div className="text-light/60 text-sm">Créer un lieu</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-golden/20 hover:border-golden/40 transition-colors cursor-pointer">
            <div className="text-golden text-lg mb-2">⚔️</div>
            <div className="text-light font-semibold">Objet</div>
            <div className="text-light/60 text-sm">Créer un objet</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-golden/20 hover:border-golden/40 transition-colors cursor-pointer">
            <div className="text-golden text-lg mb-2">📜</div>
            <div className="text-light font-semibold">Quête</div>
            <div className="text-light/60 text-sm">Créer une quête</div>
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
      content: (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="text-blue-400 text-lg mb-2">🎯</div>
            <div className="text-light font-semibold">Quête Principale</div>
            <div className="text-light/60 text-sm">Arc narratif principal</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="text-blue-400 text-lg mb-2">⚡</div>
            <div className="text-light font-semibold">Quête Secondaire</div>
            <div className="text-light/60 text-sm">Mission optionnelle</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="text-blue-400 text-lg mb-2">🏆</div>
            <div className="text-light font-semibold">Quête d'Exploration</div>
            <div className="text-light/60 text-sm">Découvrir de nouveaux lieux</div>
          </div>
        </div>
      )
    },
    {
      id: 'characters',
      title: 'Personnages',
      icon: '👤',
      closedImage: '/images/templates/character-tab-closed.svg',
      openImage: '/images/templates/character-tab-open.svg',
      color: 'from-green-500 to-green-600',
      content: (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer">
            <div className="text-green-400 text-lg mb-2">👑</div>
            <div className="text-light font-semibold">PNJ Important</div>
            <div className="text-light/60 text-sm">Personnage clé de l'histoire</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer">
            <div className="text-green-400 text-lg mb-2">🏪</div>
            <div className="text-light font-semibold">Marchand</div>
            <div className="text-light/60 text-sm">Vendeur d'objets</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer">
            <div className="text-green-400 text-lg mb-2">⚔️</div>
            <div className="text-light font-semibold">Adversaire</div>
            <div className="text-light/60 text-sm">Ennemi à affronter</div>
          </div>
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
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors cursor-pointer">
            <div className="text-yellow-400 text-lg mb-2">⚔️</div>
            <div className="text-light font-semibold">Arme Magique</div>
            <div className="text-light/60 text-sm">Arme avec propriétés spéciales</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors cursor-pointer">
            <div className="text-yellow-400 text-lg mb-2">💎</div>
            <div className="text-light font-semibold">Objet Rare</div>
            <div className="text-light/60 text-sm">Artéfact précieux</div>
          </div>
          <div className="bg-dark-blue/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors cursor-pointer">
            <div className="text-yellow-400 text-lg mb-2">🧙‍♂️</div>
            <div className="text-light font-semibold">Objet Magique</div>
            <div className="text-light/60 text-sm">Objet avec pouvoirs</div>
          </div>
        </div>
      )
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

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