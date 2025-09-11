import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Bell, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const ExtensionDetails = () => {
  const { id, extensionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleReturnToUniverse = () => {
    navigate(`/campaigns/create/universe/${id}/details`);
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore */}
      <header className="flex items-center justify-between p-6 bg-primary-blue/90">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-4">
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/70">
          <button onClick={() => navigate('/campaigns')} className="hover:text-light transition-colors">
            Mes campagnes
          </button>
          <span>›</span>
          <button onClick={() => navigate('/campaigns/create')} className="hover:text-light transition-colors">
            Créer une campagne
          </button>
          <span>›</span>
          <button onClick={handleReturnToUniverse} className="hover:text-light transition-colors">
            Détails univers
          </button>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="text-center text-light">
          <h1 className="text-4xl font-bold eagle-lake-font mb-4">Extension Details</h1>
          <p className="text-light/80 mb-8">Page en cours de développement...</p>
          <p className="text-light/60 mb-8">
            Univers ID: {id} | Extension ID: {extensionId}
          </p>
          <button
            onClick={handleReturnToUniverse}
            className="bg-golden text-dark px-6 py-3 rounded-lg font-bold text-lg hover:bg-golden/80 transition-colors"
          >
            Retour aux détails de l'univers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionDetails;

