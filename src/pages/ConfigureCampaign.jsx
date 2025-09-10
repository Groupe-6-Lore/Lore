import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfigureCampaign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedUniverse = location.state?.selectedUniverse;

  return (
    <div className="min-h-screen bg-primary-blue flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-light text-2xl mb-4 eagle-lake-font">
          Configuration de la campagne
        </h1>
        {selectedUniverse && (
          <p className="text-light/80 mb-6 noto-sans-font">
            Univers sélectionné : {selectedUniverse.title}
          </p>
        )}
        <p className="text-light/80 mb-6 noto-sans-font">Configuration finale - Coming Soon</p>
        <button
          onClick={() => navigate('/campaigns/create/universe')}
          className="bg-golden text-dark px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors noto-sans-font"
        >
          Retour à la sélection
        </button>
      </div>
    </div>
  );
};

export default ConfigureCampaign;