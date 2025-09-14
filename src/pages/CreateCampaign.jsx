import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronRight, ChevronLeft, Check, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const CreateCampaign = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // État pour la création de campagne
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [selectedRules, setSelectedRules] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // Nettoyer les sélections au démarrage (quand on vient de la page campagnes)
  useEffect(() => {
    // Vérifier si on vient de la page campagnes (pas de sélections précédentes)
    const hasExistingSelections = sessionStorage.getItem('selectedUniverse') || sessionStorage.getItem('selectedRules');
    
    if (!hasExistingSelections) {
      // Nettoyer les états si pas de sélections
      setSelectedUniverse(null);
      setSelectedRules(null);
      setIsValidated(false);
    } else {
      // Charger les sélections existantes
      const storedData = sessionStorage.getItem('selectedUniverse');
      if (storedData) {
        const universeData = JSON.parse(storedData);
        setSelectedUniverse(universeData);
      }
      const rules = sessionStorage.getItem('selectedRules');
      if (rules) {
        setSelectedRules(JSON.parse(rules));
      }
    }
  }, []);

  // Écouter les changements du sessionStorage (quand on revient des pages de sélection)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = sessionStorage.getItem('selectedUniverse');
      if (storedData) {
        const universeData = JSON.parse(storedData);
        setSelectedUniverse(universeData);
      }
      const rules = sessionStorage.getItem('selectedRules');
      if (rules) {
        setSelectedRules(JSON.parse(rules));
      }
    };

    // Charger les données immédiatement
    handleStorageChange();
    
    // Vérifier au focus de la fenêtre (quand on revient sur la page)
    window.addEventListener('focus', handleStorageChange);
    
    // Écouter les changements du sessionStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('focus', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Naviguer vers les pages de sélection
  const handleUniverseClick = () => {
    // Si pas validé, on peut changer d'univers
    if (!isValidated) {
      navigate('/campaigns/create/universe');
    }
  };

  const handleRulesClick = () => {
    // Si pas validé, on peut changer de règles
    if (!isValidated) {
      navigate('/campaigns/create/rules');
    }
  };

  // Fonction pour nettoyer les sélections (appelée depuis la page campagnes)
  const clearSelections = () => {
    setSelectedUniverse(null);
    setSelectedRules(null);
    setIsValidated(false);
    sessionStorage.removeItem('selectedUniverse');
    sessionStorage.removeItem('selectedRules');
    sessionStorage.removeItem('campaignTotalPrice');
    sessionStorage.removeItem('campaignData');
  };

  const handleValidate = () => {
    if (selectedUniverse && selectedRules) {
      setIsValidated(true);
      
      // Calculer le prix total
      const universePrice = selectedUniverse.type === 'owned' ? 0 : 
                           selectedUniverse.type === 'free' ? 0 :
                           selectedUniverse.type === 'freemium' ? 0 :
                           selectedUniverse.price || 0;
      
      const rulesPrice = selectedRules.type === 'owned' ? 0 :
                        selectedRules.type === 'free' ? 0 :
                        selectedRules.type === 'freemium' ? 0 :
                        selectedRules.price || 0;
      
      const extensionsPrice = (selectedUniverse.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0) +
                             (selectedRules.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0);
      
      const totalPrice = universePrice + rulesPrice + extensionsPrice;
      
      // Stocker le prix total pour la page de paiement
      sessionStorage.setItem('campaignTotalPrice', totalPrice.toString());
      sessionStorage.setItem('campaignData', JSON.stringify({
        universe: selectedUniverse,
        rules: selectedRules,
        totalPrice: totalPrice
      }));
      
      if (totalPrice > 0) {
        toast.success(`Choix validés ! Total à payer : ${Math.round(totalPrice * 100) / 100}€`);
      } else {
        toast.success('Choix validés ! Vous pouvez créer votre campagne gratuitement.');
      }
    } else {
      toast.error('Veuillez sélectionner un univers et des règles avant de valider.');
    }
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  const calculateTotalPrice = () => {
    if (!selectedUniverse || !selectedRules) return 0;
    
    const universePrice = selectedUniverse.type === 'owned' ? 0 : 
                         selectedUniverse.type === 'free' ? 0 :
                         selectedUniverse.type === 'freemium' ? 0 :
                         selectedUniverse.price || 0;
    
    const rulesPrice = selectedRules.type === 'owned' ? 0 :
                      selectedRules.type === 'free' ? 0 :
                      selectedRules.type === 'freemium' ? 0 :
                      selectedRules.price || 0;
    
    const extensionsPrice = (selectedUniverse.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0) +
                           (selectedRules.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0);
    
    return Math.round((universePrice + rulesPrice + extensionsPrice) * 100) / 100; // Arrondir à 2 décimales
  };

  const handlePayAndValidate = async () => {
    if (!selectedUniverse || !selectedRules) {
      toast.error('Veuillez sélectionner un univers et des règles');
      return;
    }

    const totalPrice = calculateTotalPrice();

    if (totalPrice > 0) {
      // Rediriger vers la page de paiement
      navigate('/campaigns/create/payment');
    } else {
      // Créer directement la campagne
      setIsCreating(true);
      try {
        await createCampaign();
      } catch (error) {
        console.error('Erreur lors de la création:', error);
        toast.error('Erreur lors de la création de la campagne');
      } finally {
        setIsCreating(false);
      }
    }
  };

  const createCampaign = async () => {
    try {
      // Générer un titre automatique
      const campaignTitle = `Campagne ${selectedUniverse.name}`;
      
      const campaignData = {
        id: `campaign-${Date.now()}`, // ID unique pour le mode démo
        user_id: user.id,
        title: campaignTitle,
        game_system: selectedRules.name,
        universe: selectedUniverse.name,
        description: `Nouvelle campagne dans l'univers ${selectedUniverse.name} utilisant les règles ${selectedRules.name}`,
        resume: selectedUniverse.description || 'Une nouvelle aventure commence...',
        status: 'active',
        total_price: totalPrice,
        universe_extensions: selectedUniverse.extensions || [],
        rules_extensions: selectedRules.extensions || [],
        players: [] // Liste vide de joueurs
      };
      
      // Mode démo : stocker la campagne dans localStorage
      const existingCampaigns = JSON.parse(localStorage.getItem('demoCampaigns') || '[]');
      existingCampaigns.push(campaignData);
      localStorage.setItem('demoCampaigns', JSON.stringify(existingCampaigns));

      toast.success('Campagne créée avec succès !');
    } catch (error) {
      console.error('Erreur création campagne:', error);
      toast.success('Campagne créée avec succès ! (Mode démo)');
    } finally {
      // Nettoyer le sessionStorage dans tous les cas
      sessionStorage.removeItem('selectedUniverse');
      sessionStorage.removeItem('selectedRules');
      sessionStorage.removeItem('campaignTotalPrice');
      sessionStorage.removeItem('campaignData');
      
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
      {/* Header unifié */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigate('/campaigns')}
      />

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
          {selectedUniverse ? (
            <div onClick={handleUniverseClick} className={`group transform transition-all duration-300 ${!isValidated ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'}`}>
              <div className={`bg-light rounded-2xl border border-golden/30 shadow-xl overflow-hidden h-80 relative ${isValidated ? 'ring-2 ring-golden' : ''}`}>
                
                {/* Status indicateur */}
                {selectedUniverse && (
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-golden rounded-full flex items-center justify-center">
                    <Check size={16} className="text-dark" />
                  </div>
                )}

                <div className="h-3/4 relative overflow-hidden">
                  {/* Image de l'univers sélectionné */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: selectedUniverse.image
                        ? `url(${selectedUniverse.image})`
                        : `linear-gradient(135deg, #64748b 0%, #1e293b 100%)`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                    
                    {/* Prix total sur l'image */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-golden text-dark px-2 py-1 rounded-full text-sm font-bold">
                        {(() => {
                          const universePrice = selectedUniverse.type === 'owned' ? 0 : 
                                               selectedUniverse.type === 'free' ? 0 :
                                               selectedUniverse.type === 'freemium' ? 0 :
                                               selectedUniverse.price || 0;
                          const extensionsPrice = (selectedUniverse.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0);
                          const totalPrice = universePrice + extensionsPrice;
                          
                          if (selectedUniverse.type === 'owned' && extensionsPrice === 0) {
                            return 'Possédé';
                          } else if (totalPrice === 0) {
                            return 'Gratuit';
                          } else if (selectedUniverse.type === 'owned' && extensionsPrice > 0) {
                            return `${Math.round(extensionsPrice * 100) / 100}€`;
                          } else {
                            return `${Math.round(totalPrice * 100) / 100}€`;
                          }
                        })()}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-2xl font-bold mb-2 text-center">{selectedUniverse.name}</div>
                      <div className="text-sm text-center">{selectedUniverse.publisher}</div>
                      {selectedUniverse.extensions.length > 0 && (
                        <div className="text-xs mt-2 bg-white/20 px-2 py-1 rounded">
                          + {selectedUniverse.extensions.length} extension(s)
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Titre et description */}
                <div className="h-1/4 p-4 bg-light">
                  <h3 className="text-xl font-bold text-primary-blue mb-1 flex items-center">
                    <span className="text-2xl mr-2">🌍</span>
                    {selectedUniverse ? selectedUniverse.name : 'Univers'}
                  </h3>
                  {selectedUniverse && (
                    <>
                      <p className="text-primary-blue/70 text-sm truncate">
                        {selectedUniverse.publisher}
                      </p>
                      {selectedUniverse.extensions && selectedUniverse.extensions.length > 0 && (
                        <div className="mt-2">
                          <span className="bg-golden/20 text-golden px-2 py-1 rounded-full text-xs font-medium">
                            + {selectedUniverse.extensions.length} extension{selectedUniverse.extensions.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Card univers normale si rien sélectionné
            <div onClick={handleUniverseClick} className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-light rounded-2xl border border-golden/30 shadow-xl overflow-hidden h-80">
                <div className="h-3/4 bg-gradient-to-br from-purple-500/80 to-pink-500/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🌍</div>
                      <div className="text-lg font-bold">Choisir un univers</div>
                    </div>
                  </div>
                </div>
                <div className="h-1/4 p-4 bg-light">
                  <h3 className="text-xl font-bold text-primary-blue flex items-center">
                    <span className="text-2xl mr-2">🌍</span>
                    Univers
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Card Règles */}
          <div
            onClick={handleRulesClick}
            className={`group transform transition-all duration-300 ${!isValidated ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'}`}
          >
            <div className={`bg-light rounded-2xl border border-golden/30 shadow-xl overflow-hidden h-80 relative ${isValidated ? 'ring-2 ring-golden' : ''}`}>
              
              {/* Status indicateur */}
              {selectedRules && (
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-golden rounded-full flex items-center justify-center">
                  <Check size={16} className="text-dark" />
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
                    
                    {/* Prix total sur l'image */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-golden text-dark px-2 py-1 rounded-full text-sm font-bold">
                        {(() => {
                          const rulesPrice = selectedRules.type === 'owned' ? 0 : 
                                            selectedRules.type === 'free' ? 0 :
                                            selectedRules.type === 'freemium' ? 0 :
                                            selectedRules.price || 0;
                          const extensionsPrice = (selectedRules.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0);
                          const totalPrice = rulesPrice + extensionsPrice;
                          
                          if (selectedRules.type === 'owned' && extensionsPrice === 0) {
                            return 'Possédé';
                          } else if (totalPrice === 0) {
                            return 'Gratuit';
                          } else if (selectedRules.type === 'owned' && extensionsPrice > 0) {
                            return `${Math.round(extensionsPrice * 100) / 100}€`;
                          } else {
                            return `${Math.round(totalPrice * 100) / 100}€`;
                          }
                        })()}
                      </span>
                    </div>
                    
                    {/* Titre, publisher et nombre d'extensions sur l'image */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-2xl font-bold mb-2 text-center">{selectedRules.name}</div>
                      <div className="text-sm text-center">{selectedRules.publisher}</div>
                      {selectedRules.extensions && selectedRules.extensions.length > 0 && (
                        <div className="text-xs mt-2 bg-white/20 px-2 py-1 rounded">
                          + {selectedRules.extensions.length} extension(s)
                        </div>
                      )}
                    </div>
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
              <div className="h-1/4 p-4 bg-light">
                <h3 className="text-xl font-bold text-primary-blue mb-1 flex items-center">
                  <span className="text-2xl mr-2">📚</span>
                  {selectedRules ? selectedRules.name : 'Règles'}
                </h3>
                {selectedRules && (
                  <>
                    <p className="text-primary-blue/70 text-sm truncate">
                      {selectedRules.publisher}
                    </p>
                    {selectedRules.extensions && selectedRules.extensions.length > 0 && (
                      <div className="mt-2">
                        <span className="bg-golden/20 text-golden px-2 py-1 rounded-full text-xs font-medium">
                          + {selectedRules.extensions.length} extension(s)
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Valider */}
      {selectedUniverse && selectedRules && !isValidated && (
        <div className="px-6 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={handleValidate}
              className="bg-golden hover:bg-golden/80 text-dark px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Valider mes choix
            </button>
          </div>
        </div>
      )}

      {/* Section Paiement et Validation */}
      {canValidate && isValidated && (
        <div className="px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Bouton Retour */}
            <div className="mb-6">
              <button
                onClick={() => setIsValidated(false)}
                className="bg-light/20 hover:bg-light/30 text-light px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <ChevronLeft size={20} className="mr-2" />
                Modifier mes choix
              </button>
            </div>

            {/* Récapitulatif des prix */}
            <div className="bg-light/10 rounded-xl p-6 mb-6 border border-light/20">
              <h3 className="text-xl font-bold text-light mb-4 eagle-lake-font">Récapitulatif</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-light">
                  <span>Univers : {selectedUniverse.name}</span>
                  <span className="font-bold">
                    {(() => {
                      const universePrice = selectedUniverse.type === 'owned' ? 0 : 
                                           selectedUniverse.type === 'free' ? 0 :
                                           selectedUniverse.type === 'freemium' ? 0 :
                                           selectedUniverse.price || 0;
                      const extensionsPrice = (selectedUniverse.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0);
                      
                      if (selectedUniverse.type === 'owned' && extensionsPrice === 0) {
                        return 'Déjà possédé';
                      } else if (selectedUniverse.type === 'owned' && extensionsPrice > 0) {
                        return 'Déjà possédé';
                      } else if (selectedUniverse.type === 'free' && extensionsPrice === 0) {
                        return 'Gratuit';
                      } else if (selectedUniverse.type === 'free' && extensionsPrice > 0) {
                        return 'Gratuit';
                      } else if (universePrice === 0 && extensionsPrice === 0) {
                        return 'Gratuit';
                      } else {
                        return `${Math.round(universePrice * 100) / 100}€`;
                      }
                    })()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-light">
                  <span>Règles : {selectedRules.name}</span>
                  <span className="font-bold">
                    {(() => {
                      const rulesPrice = selectedRules.type === 'owned' ? 0 : 
                                        selectedRules.type === 'free' ? 0 :
                                        selectedRules.type === 'freemium' ? 0 :
                                        selectedRules.price || 0;
                      const extensionsPrice = (selectedRules.extensions || []).reduce((total, ext) => total + (ext.price || 0), 0);
                      
                      if (selectedRules.type === 'owned' && extensionsPrice === 0) {
                        return 'Déjà possédé';
                      } else if (selectedRules.type === 'owned' && extensionsPrice > 0) {
                        return 'Déjà possédé';
                      } else if (selectedRules.type === 'free' && extensionsPrice === 0) {
                        return 'Gratuit';
                      } else if (selectedRules.type === 'free' && extensionsPrice > 0) {
                        return 'Gratuit';
                      } else if (rulesPrice === 0 && extensionsPrice === 0) {
                        return 'Gratuit';
                      } else {
                        return `${Math.round(rulesPrice * 100) / 100}€`;
                      }
                    })()}
                  </span>
                </div>
                {(selectedUniverse.extensions && selectedUniverse.extensions.length > 0) && (
                  <>
                    <div className="flex justify-between items-center text-light">
                      <span>
                        Achats facultatifs univers {selectedUniverse.type === 'free' ? '(univers gratuit)' : selectedUniverse.type === 'owned' ? '(univers possédé)' : ''} :
                      </span>
                      <span className="font-bold">
                        {Math.round(selectedUniverse.extensions.reduce((total, ext) => total + (ext.price || 0), 0) * 100) / 100}€
                      </span>
                    </div>
                    {selectedUniverse.extensions.map((ext, index) => (
                      <div key={index} className="flex justify-between items-center text-light/80 text-sm ml-4">
                        <span>• {ext.name}</span>
                        <span>{Math.round(ext.price * 100) / 100}€</span>
                      </div>
                    ))}
                  </>
                )}
                {(selectedRules.extensions && selectedRules.extensions.length > 0) && (
                  <>
                    <div className="flex justify-between items-center text-light">
                      <span>
                        Achats facultatifs règles {selectedRules.type === 'free' ? '(règles gratuites)' : selectedRules.type === 'owned' ? '(règles possédées)' : ''} :
                      </span>
                      <span className="font-bold">
                        {Math.round(selectedRules.extensions.reduce((total, ext) => total + (ext.price || 0), 0) * 100) / 100}€
                      </span>
                    </div>
                    {selectedRules.extensions.map((ext, index) => (
                      <div key={index} className="flex justify-between items-center text-light/80 text-sm ml-4">
                        <span>• {ext.name}</span>
                        <span>{Math.round(ext.price * 100) / 100}€</span>
                      </div>
                    ))}
                  </>
                )}
                <div className="border-t border-light/30 pt-3">
                  <div className="flex justify-between items-center text-light text-lg font-bold">
                    <span>Total :</span>
                    <span className="text-golden">
                      {totalPrice === 0 && selectedUniverse.type === 'owned' && selectedRules.type === 'owned' && 
                       (!selectedUniverse.extensions || selectedUniverse.extensions.length === 0) && 
                       (!selectedRules.extensions || selectedRules.extensions.length === 0) ? 'Déjà possédé' :
                       totalPrice === 0 ? 'Gratuit' : `${totalPrice.toFixed(2)}€`}
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
                      {totalPrice > 0 ? `Payer ${Math.round(totalPrice * 100) / 100}€ et créer` : 'Créer la campagne'}
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