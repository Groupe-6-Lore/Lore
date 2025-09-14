import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TemplateTab = ({ 
  isOpen, 
  onToggle, 
  children, 
  backgroundImage,
  closedImage,
  openImage,
  activeTab,
  onTabChange,
  tabs = []
}) => {
  return (
    <>
      {/* Mode fermé - Tranche du livre (partie gauche du panel) */}
      {!isOpen && (
        <motion.div
          className="fixed right-0 top-[100px] h-[800px] w-[60px] z-50"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Arrière-plan de la tranche de livre */}
          <div className="absolute inset-0">
            <img 
              src="/images/templates/notebook-spine.svg" 
              alt="Notebook spine" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Image du panel (juste la partie gauche visible) */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/images/templates/templates-background.svg" 
              alt="Panel background" 
              className="w-[700px] h-[800px] object-cover"
              style={{ transform: 'translateX(-640px)' }}
            />
          </div>
          
          {/* Onglets colorés sur le côté gauche */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
            {tabs.map((tab, index) => (
              <motion.img
                key={tab.id}
                src={tab.closedImage}
                alt={`${tab.title} tab closed`}
                className="w-16 h-20 object-contain cursor-pointer relative z-10"
                onClick={() => {
                  if (tab.id === activeTab) {
                    onToggle(); // Ouvrir le panel
                  } else {
                    onTabChange(tab.id); // Changer d'onglet et ouvrir
                    if (!isOpen) {
                      onToggle(); // Ouvrir le panel seulement s'il est fermé
                    }
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onError={(e) => {
                  console.error('Erreur chargement image fermée:', tab.closedImage);
                  // Fallback avec un div coloré
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = `w-16 h-20 bg-gradient-to-br ${tab.color} flex items-center justify-center text-white text-xs font-bold cursor-pointer`;
                  fallback.innerHTML = `<div class="text-center"><div class="text-sm">${tab.icon}</div><div class="text-xs">${tab.title.toUpperCase()}</div></div>`;
                  fallback.onclick = () => {
                    if (tab.id === activeTab) {
                      onToggle();
                    } else {
                      onTabChange(tab.id);
                      onToggle();
                    }
                  };
                  e.target.parentNode.appendChild(fallback);
                }}
                onLoad={() => console.log('Image fermée chargée:', tab.closedImage)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Panel ouvert - Style livre avec onglets */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              x: 700 
            }}
            animate={{ 
              opacity: 1, 
              x: 0 
            }}
            exit={{ 
              opacity: 0, 
              x: 700 
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut" 
            }}
            className="fixed right-0 top-0 h-full w-[700px] z-[9999] flex"
          >
            {/* Onglets colorés sur le côté gauche */}
            <div className="flex flex-col justify-center gap-2 -ml-8">
              {tabs.map((tab) => (
                <motion.img
                  key={tab.id}
                  src={tab.openImage}
                  alt={`${tab.title} tab open`}
                  className={`w-36 h-40 object-contain cursor-pointer ${
                    tab.id === activeTab ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => {
                    if (tab.id === activeTab) {
                      onToggle(); // Fermer si on clique sur l'onglet actif
                    } else {
                      onTabChange(tab.id); // Changer d'onglet
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onError={(e) => {
                    console.error('Erreur chargement image ouverte:', tab.openImage);
                    // Fallback avec un div coloré
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = `w-16 h-20 bg-gradient-to-br ${tab.color} flex items-center justify-center text-white text-xs font-bold cursor-pointer`;
                    fallback.innerHTML = `<div class="text-center"><div class="text-sm">${tab.icon}</div><div class="text-xs">${tab.title.toUpperCase()}</div></div>`;
                    fallback.onclick = () => {
                      if (tab.id === activeTab) {
                        onToggle();
                      } else {
                        onTabChange(tab.id);
                      }
                    };
                    e.target.parentNode.appendChild(fallback);
                  }}
                  onLoad={() => console.log('Image ouverte chargée:', tab.openImage)}
                />
              ))}
            </div>

            {/* Panel principal - SVG */}
            <div className="flex-1 shadow-2xl relative overflow-hidden">
              {backgroundImage && (
                <img 
                  src={backgroundImage} 
                  alt="Panel background" 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
              {/* Contenu du livre - Templates */}
              <div className="absolute inset-0 z-10 p-6 pt-14 pb-6 overflow-hidden flex flex-col">
                <div className="text-black text-2xl font-bold mb-8 eagle-lake-font pl-16 flex-shrink-0">
                  {tabs.find(tab => tab.id === activeTab)?.title || 'Templates'}
                </div>
                <div className="flex-1 overflow-hidden">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TemplateTab;
