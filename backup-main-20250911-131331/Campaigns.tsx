import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns';

export default function CampaignCreate() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'choice' | 'details'>('choice');
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [selectedRules, setSelectedRules] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[url('/images/fantasy-bg.jpg')] bg-cover bg-center">
      {/* Navigation fil d'ariane */}
      <div className="bg-black/30 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/campaigns" className="hover:text-gray-300">Mes campagnes</Link>
          <span className="text-gray-400">/</span>
          <span>Créer une campagne</span>
        </div>
      </div>

      {/* Titre principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-medieval text-white mb-12">Créer une campagne</h1>

        {/* Cartes de sélection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Carte Univers */}
          <div 
            className={`bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl transition-transform hover:scale-105 cursor-pointer
              ${selectedUniverse ? 'ring-4 ring-primary-500' : ''}
            `}
            onClick={() => setSelectedUniverse('fantasy')}
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img 
                src="/images/universe-preview.jpg" 
                alt="Univers Fantasy"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-medieval text-center text-gray-900">Univers</h2>
          </div>

          {/* Carte Règles */}
          <div 
            className={`bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl transition-transform hover:scale-105 cursor-pointer
              ${selectedRules ? 'ring-4 ring-primary-500' : ''}
            `}
            onClick={() => setSelectedRules('dnd5e')}
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img 
                src="/images/rules-preview.jpg" 
                alt="Règles"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-medieval text-center text-gray-900">Règles</h2>
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => navigate('/campaigns')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => setStep('details')}
            disabled={!selectedUniverse || !selectedRules}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}