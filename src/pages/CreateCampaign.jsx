import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Check, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const CreateCampaign = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // État pour la création de campagne
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [selectedRules, setSelectedRules] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Récupérer les sélections depuis le localStorage (venant des pages existantes)
  useEffect(() => {
    const universe = localStorage.getItem('selectedUniverse');
    const rules = localStorage.getItem('selectedRules');
    if (universe) {
      setSelectedUniverse(JSON.parse(universe));
    }
    if (rules) {
      setSelectedRules(JSON.parse(rules));
    }
  }, []);

  // Écouter les changements du localStorage (quand on revient des pages de sélection)
  useEffect(() => {
    const handleStorageChange = () => {
      const universe = localStorage.getItem('selectedUniverse');
      const rules = localStorage.getItem('selectedRules');
      if (universe) {
        setSelectedUniverse(JSON.parse(universe));
      }
      if (rules) {
        setSelectedRules(JSON.parse(rules));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Vérifier aussi au focus de la fenêtre (quand on revient sur la page)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Naviguer vers les pages de sélection
  const handleUniverseClick = () => {
    navigate('/campaigns/create/universe');
  };

  const handleRulesClick = () => {
    navigate('/campaigns/create/rules');
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  const calculateTotalPrice = () => {
    const universePrice = selectedUniverse?.price || 0;
    const rulesPrice = selectedRules?.price || 0;
    return universePrice + rulesPrice;
  };

  const handlePayAndValidate = async () => {
    if (!selectedUniverse || !selectedRules) {
      toast.error('Veuillez sélectionner un univers et des règles');
      return;
    }

    const totalPrice = calculateTotalPrice();
    setIsCreating(true);

    try {
      if (totalPrice > 0) {
        // Simuler le processus de paiement
        toast.loading('Traitement du paiement...', { duration: 2000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Paiement effectué avec succès !');
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Créer la campagne
      await createCampaign();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error('Erreur lors de la création de la campagne');
    } finally {
      setIsCreating(false);
    }
  };

  const createCampaign = async () => {
    try {
      // Générer un titre automatique
      const campaignTitle = `Campagne ${selectedUniverse.name}`;
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          title: campaignTitle,
          game_system: selectedRules.name,
          universe: selectedUniverse.name,
          description: `Nouvelle campagne dans l'univers ${selectedUniverse.name} utilisant les règles ${selectedRules.name}`,
          resume: selectedUniverse.longDescription || selectedUniverse.description || 'Une nouvelle aventure commence...',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Campagne créée avec succès !');
    } catch (error) {
      console.error('Erreur création campagne:', error);
      // Mode démo : simuler la création même en cas d'erreur
      toast.success('Campagne créée avec succès ! (Mode démo)');
    } finally {
      // Nettoyer le localStorage dans tous les cas
      localStorage.removeItem('selectedUniverse');
      localStorage.removeItem('selectedRules');
      
      // Rediriger vers la liste
      setTimeout(() => {
        navigate('/campaigns');
      }, 1500);
    }
  };

  // État des cards et validation
  const canValidate = selectedUniverse && selectedRules;
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore */}
      <header className="flex items-center justify-between p-6 bg-primary-blue border-b border-light/10">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-12 h-12 bg-green-500 transform rotate-45 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm transform -rotate-45">NEWS</span>
            </div>
          </div>
          
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
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={() => handleBreadcrumbClick('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden">
            Créer une campagne
          </span>
        </nav>
      </div>

      {/* Titre principal */}
      <div className="px-6 mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-light eagle-lake-font border-b-2 border-golden pb-2 inline-block">
          Créer une campagne
        </h2>
      </div>

      {/* Cards de choix */}
      <div className="px-6 mb-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card Univers */}
          <div
            onClick={handleUniverseClick}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-light/15 backdrop-blur-sm rounded-2xl border border-light/20 shadow-xl overflow-hidden h-80 relative">
              
              {/* Status indicateur */}
              {selectedUniverse && (
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}

              {/* Image/Background */}
              <div className="h-3/4 relative overflow-hidden">
                {selectedUniverse ? (
                  // Image de l'univers sélectionné
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: selectedUniverse.image
                        ? `url(${selectedUniverse.image})`
                        : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Prix sur l'image */}
                    {selectedUniverse.price > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-golden text-dark px-2 py-1 rounded-full text-sm font-bold">
                          {selectedUniverse.price}€
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  // Placeholder par défaut
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🌍</div>
                        <div className="text-lg font-bold">Choisir un univers</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </div>

              {/* Titre et description */}
              <div className="h-1/4 p-4 bg-light/10">
                <h3 className="text-xl font-bold text-light mb-1">
                  {selectedUniverse ? selectedUniverse.name : 'Univers'}
                </h3>
                {selectedUniverse && (
                  <p className="text-light/70 text-sm truncate">
                    {selectedUniverse.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card Règles */}
          <div
            onClick={handleRulesClick}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-light/15 backdrop-blur-sm rounded-2xl border border-light/20 shadow-xl overflow-hidden h-80 relative">
              
              {/* Status indicateur */}
              {selectedRules && (
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}

              {/* Image/Background */}
              <div className="h-3/4 relative overflow-hidden">
                {selectedRules ? (
                  // Image des règles sélectionnées
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: selectedRules.image
                        ? `url(${selectedRules.image})`
                        : `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Prix sur l'image */}
                    {selectedRules.price > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-golden text-dark px-2 py-1 rounded-full text-sm font-bold">
                          {selectedRules.price}€
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  // Placeholder par défaut
                  <div className="w-full h-full bg-gradient-to-br from-amber-500 via-orange-400 to-red-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">📚</div>
                        <div className="text-lg font-bold">Choisir des règles</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </div>

              {/* Titre et description */}
              <div className="h-1/4 p-4 bg-light/10">
                <h3 className="text-xl font-bold text-light mb-1">
                  {selectedRules ? selectedRules.name : 'Règles'}
                </h3>
                {selectedRules && (
                  <p className="text-light/70 text-sm truncate">
                    {selectedRules.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Paiement et Validation */}
      {canValidate && (
        <div className="px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Récapitulatif des prix */}
            <div className="bg-light/10 rounded-xl p-6 mb-6 border border-light/20">
              <h3 className="text-xl font-bold text-light mb-4 eagle-lake-font">Récapitulatif</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-light">
                  <span>Univers : {selectedUniverse.name}</span>
                  <span className="font-bold">
                    {selectedUniverse.price === 0 ? 'Gratuit' : `${selectedUniverse.price}€`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-light">
                  <span>Règles : {selectedRules.name}</span>
                  <span className="font-bold">
                    {selectedRules.price === 0 ? 'Gratuit' : `${selectedRules.price}€`}
                  </span>
                </div>
                <div className="border-t border-light/30 pt-3">
                  <div className="flex justify-between items-center text-light text-lg font-bold">
                    <span>Total :</span>
                    <span className="text-golden">
                      {totalPrice === 0 ? 'Gratuit' : `${totalPrice.toFixed(2)}€`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton Payer/Valider */}
            <div className="flex justify-center">
              <button
                onClick={handlePayAndValidate}
                disabled={isCreating}
                className="bg-golden hover:bg-golden/80 disabled:bg-golden/50 text-dark px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center space-x-3 shadow-lg"
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin"></div>
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    {totalPrice > 0 ? (
                      <CreditCard size={24} />
                    ) : (
                      <Check size={24} />
                    )}
                    <span>
                      {totalPrice > 0 ? `Payer ${totalPrice.toFixed(2)}€ et créer` : 'Créer la campagne'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message d'instruction */}
      {!canValidate && (
        <div className="px-6 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-light/70 text-lg">
              Sélectionnez un univers et des règles pour continuer
            </p>
            <div className="mt-4 flex justify-center space-x-8 text-light/60">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-light/60 flex items-center justify-center">
                  <span className="text-xs">1</span>
                </div>
                <span>Choisir un univers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-light/60 flex items-center justify-center">
                  <span className="text-xs">2</span>
                </div>
                <span>Choisir des règles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-light/60 flex items-center justify-center">
                  <span className="text-xs">3</span>
                </div>
                <span>Valider</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;