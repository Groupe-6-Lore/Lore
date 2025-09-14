import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ArrowLeft, CreditCard, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('campaignData');
    const storedPrice = sessionStorage.getItem('campaignTotalPrice');
    
    if (storedData && storedPrice) {
      setCampaignData(JSON.parse(storedData));
      setTotalPrice(parseFloat(storedPrice));
    } else {
      navigate('/campaigns/create');
    }
  }, [navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simuler le processus de paiement
      toast.loading('Traitement du paiement...', { duration: 2000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Créer la campagne après paiement
      await createCampaign();
      
      toast.success('Paiement effectué avec succès !');
      
      // Nettoyer le sessionStorage
      sessionStorage.removeItem('campaignData');
      sessionStorage.removeItem('campaignTotalPrice');
      
      // Rediriger vers les campagnes
      navigate('/campaigns');
      
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      toast.error('Erreur lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  const createCampaign = async () => {
    try {
      const campaignTitle = `Campagne ${campaignData.universe.universe.name}`;
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          title: campaignTitle,
          game_system: campaignData.rules.name,
          universe: campaignData.universe.universe.name,
          description: `Nouvelle campagne dans l'univers ${campaignData.universe.universe.name} utilisant les règles ${campaignData.rules.name}`,
          resume: campaignData.universe.universe.description || 'Une nouvelle aventure commence...',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      
    } catch (error) {
      console.error('Erreur création campagne:', error);
      // Mode démo : simuler la création même en cas d'erreur
    }
  };

  if (!campaignData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header unifié */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigate('/campaigns/create')}
        className="bg-primary-blue/90"
      />

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
          <span className="text-light">Paiement</span>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-light mb-4 eagle-lake-font">Finaliser votre commande</h2>
          <p className="text-light/80">Confirmez votre achat pour créer votre campagne</p>
        </div>

        {/* Récapitulatif */}
        <div className="bg-light/10 rounded-xl p-6 mb-8 border border-light/20">
          <h3 className="text-xl font-bold text-light mb-4 eagle-lake-font">Récapitulatif de votre commande</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-light">
              <span>Univers : {campaignData.universe.universe.name}</span>
              <span className="font-bold">
                {campaignData.universe.universe.type === 'owned' ? 'Déjà possédé' :
                 campaignData.universe.universe.type === 'free' ? 'Gratuit' :
                 campaignData.universe.universe.type === 'freemium' ? 'Gratuit' :
                 campaignData.universe.universe.price === 0 ? 'Gratuit' : `${campaignData.universe.universe.price}€`}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-light">
              <span>Règles : {campaignData.rules.name}</span>
              <span className="font-bold">
                {campaignData.rules.type === 'owned' ? 'Déjà possédé' :
                 campaignData.rules.type === 'free' ? 'Gratuit' :
                 campaignData.rules.type === 'freemium' ? 'Gratuit' :
                 campaignData.rules.price === 0 ? 'Gratuit' : `${campaignData.rules.price}€`}
              </span>
            </div>
            
            {(campaignData.universe.extensions && campaignData.universe.extensions.length > 0) && (
              <div className="flex justify-between items-center text-light">
                <span>Extensions univers :</span>
                <span className="font-bold">
                  {campaignData.universe.extensions.reduce((total, ext) => total + (ext.price || 0), 0)}€
                </span>
              </div>
            )}
            
            {(campaignData.rules.extensions && campaignData.rules.extensions.length > 0) && (
              <div className="flex justify-between items-center text-light">
                <span>Extensions règles :</span>
                <span className="font-bold">
                  {campaignData.rules.extensions.reduce((total, ext) => total + (ext.price || 0), 0)}€
                </span>
              </div>
            )}
            
            <div className="border-t border-light/30 pt-4">
              <div className="flex justify-between items-center text-light text-xl font-bold">
                <span>Total à payer :</span>
                <span className="text-golden text-2xl">
                  {totalPrice.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informations de paiement */}
        <div className="bg-light/10 rounded-xl p-6 mb-8 border border-light/20">
          <h3 className="text-xl font-bold text-light mb-4 eagle-lake-font">Informations de paiement</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-light">
              <CreditCard size={24} className="text-golden" />
              <span>Mode démo - Paiement simulé</span>
            </div>
            <p className="text-light/70 text-sm">
              Dans un environnement de production, vous seriez redirigé vers un système de paiement sécurisé.
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/campaigns/create')}
            className="bg-white/10 hover:bg-white/20 text-light px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Retour
          </button>
          
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="bg-golden hover:bg-golden/80 disabled:bg-golden/50 text-dark px-8 py-3 rounded-lg font-bold text-lg transition-colors flex items-center space-x-3 shadow-lg"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin"></div>
                <span>Traitement...</span>
              </>
            ) : (
              <>
                <CreditCard size={24} />
                <span>Payer {totalPrice.toFixed(2)}€</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;


