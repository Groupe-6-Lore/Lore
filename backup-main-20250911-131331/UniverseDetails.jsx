import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UniverseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary-blue flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-light text-2xl mb-4 eagle-lake-font">
          Détails de l'univers #{id}
        </h1>
        <p className="text-light/80 mb-6">Page de détails - Coming Soon</p>
        <button
          onClick={() => navigate('/campaigns/create/universe')}
          className="bg-golden text-dark px-6 py-3 rounded-lg font-semibold hover:bg-golden/80 transition-colors"
        >
          Retour à la sélection
        </button>
      </div>
    </div>
  );
};

export default UniverseDetails;