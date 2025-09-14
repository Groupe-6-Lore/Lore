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
      {/* Languettes fermées - Position fixe sur le bord droit */}
      {!isOpen && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                if (tab.id === activeTab) {
                  onToggle(); // Ouvrir le panel
                } else {
                  onTabChange(tab.id); // Changer d'onglet et ouvrir
                  onToggle();
                }
              }}
              className="w-16 h-20 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={tab.closedImage} 
                alt={`${tab.title} tab closed`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error('Erreur chargement image fermée:', tab.closedImage);
                  // Fallback avec un div coloré
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = `w-full h-full bg-gradient-to-br ${tab.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`;
                  fallback.innerHTML = `<div class="text-center"><div class="text-lg">${tab.icon}</div><div class="text-xs">${tab.title.toUpperCase()}</div></div>`;
                  e.target.parentNode.appendChild(fallback);
                }}
                onLoad={() => console.log('Image fermée chargée:', tab.closedImage)}
              />
            </motion.button>
          ))}
        </div>
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
            <div className="flex flex-col justify-center gap-2 p-2">
              {tabs.map((tab) => (
                <motion.img
                  key={tab.id}
                  src={tab.openImage}
                  alt={`${tab.title} tab open`}
                  className={`w-16 h-20 object-contain cursor-pointer ${
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
              <div className="relative z-10 h-full p-6 overflow-y-auto">
                <div className="text-golden text-xl font-bold mb-6">
                  {tabs.find(tab => tab.id === activeTab)?.title || 'Templates'} disponibles
                </div>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TemplateTab;
