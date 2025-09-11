import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const breadcrumbItems = [
    { label: 'Accueil', link: '/' },
    { label: 'Mes campagnes', link: '/campaigns' },
    { label: 'Créer une campagne', link: '/campaigns/create' }
  ];

  const handleUniverseClick = () => {
    setStep(2);
  };

  const handleRulesClick = () => {
    setStep(3);
  };

  return (
    <div className="page-background">
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Fil d'ariane */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Titre */}
        <h1 className="text-4xl text-center mt-16 mb-12 eagle-lake-font" style={{color: '#F0EAE1'}}>
          Créer une campagne
        </h1>

        {step === 1 && (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl mb-8 eagle-lake-font" style={{color: '#F0EAE1'}}>
              Choisissez votre univers et vos règles
            </h2>
            
            {/* Cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Carte Univers */}
              <div 
                className="w-80 h-96 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer overflow-hidden"
                onClick={handleUniverseClick}
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src="/images/universe-preview.jpg" 
                    alt="Univers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-24 flex items-center justify-center">
                  <h3 className="text-xl" style={{color: '#0D151A'}}>
                    Univers
                  </h3>
                </div>
              </div>

              {/* Carte Règles */}
              <div 
                className="w-80 h-96 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer overflow-hidden"
                onClick={handleRulesClick}
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src="/images/rules-preview.jpg" 
                    alt="Règles"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-24 flex items-center justify-center">
                  <h3 className="text-xl" style={{color: '#0D151A'}}>
                    Règles
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-3xl mb-8" style={{color: '#F0EAE1'}}>
              Sélection d'univers
            </h2>
            <p className="mb-8" style={{color: '#F0EAE1'}}>Étape 2 - Univers sélectionné</p>
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              style={{backgroundColor: '#46718A', color: '#F0EAE1'}}
            >
              Retour
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-3xl mb-8" style={{color: '#F0EAE1'}}>
              Sélection de règles
            </h2>
            <p className="mb-8" style={{color: '#F0EAE1'}}>Étape 3 - Règles sélectionnées</p>
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              style={{backgroundColor: '#46718A', color: '#F0EAE1'}}
            >
              Retour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}