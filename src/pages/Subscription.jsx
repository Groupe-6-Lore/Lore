import React, { useState } from 'react';
import { Download, CreditCard, Star, Users, HardDrive, Shield, Settings, Plus, ShoppingCart, Check, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';
import PlayersModal from '../components/modals/PlayersModal';

const Subscription = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('abonnement');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false); // Simule un abonnement inactif par défaut
  const [userType, setUserType] = useState('free'); // 'free', 'subscribed', 'cancelled'
  const [showCheckout, setShowCheckout] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' ou 'yearly'
  const [showSubscriptionCheckout, setShowSubscriptionCheckout] = useState(false);
  const [invoices, setInvoices] = useState([
    { date: '15/08/2024', number: 'F093746199', total: '8,00 €' },
    { date: '15/07/2024', number: 'F273407179', total: '8,00 €' },
    { date: '15/06/2024', number: 'F191851059', total: '8,00 €' },
    { date: '15/05/2024', number: 'F801121302', total: '8,00 €' }
  ]);

  const tabs = [
    { id: 'profil', label: 'Profil', icon: Users },
    { id: 'abonnement', label: 'Abonnement', icon: CreditCard },
    { id: 'stockage', label: 'Stockage', icon: HardDrive },
    { id: 'confidentialite', label: 'Confidentialité', icon: Shield }
  ];

  const additionalServices = [
    { id: 1, name: 'Ajout de campagne', price: '1,90 € / campagne' },
    { id: 2, name: 'Kit de démarrage', price: '2,90 €' },
    { id: 3, name: 'Thèmes visuels premium', price: '4,90 €' },
    { id: 4, name: 'Espace de stockage additionnel', price: '2,90 € / 50 Mo' },
    { id: 5, name: 'Scénarios premium', price: '1,90 €' },
    { id: 6, name: 'Campagnes grande licence (Partenariat officiel)', price: '6,90 €' }
  ];


  const handleDownloadInvoice = (invoiceNumber) => {
    // Simulation du téléchargement
    console.log(`Téléchargement de la facture ${invoiceNumber}`);
    alert(`Le PDF de la facture ${invoiceNumber} va être téléchargé dans quelques instants.`);
    // Ici vous pourriez implémenter la logique de téléchargement réel
  };

  const addToCart = (service) => {
    setCart(prev => [...prev, service]);
    setShowCart(true);
  };

  const removeFromCart = (serviceId) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + price;
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setShowCart(false);
  };

  const handleCancelSubscription = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler votre abonnement ? Vous perdrez l\'accès à toutes les fonctionnalités premium.')) {
      setHasActiveSubscription(false);
      setUserType('cancelled');
      alert('Votre abonnement a été annulé. Il restera actif jusqu\'à la fin de la période de facturation.');
    }
  };

  const handleReactivateSubscription = () => {
    setHasActiveSubscription(true);
    alert('Votre abonnement a été réactivé !');
  };

  const handleSubscribe = (cycle) => {
    setBillingCycle(cycle);
    setShowSubscriptionCheckout(true);
  };

  const handleSubscriptionPayment = () => {
    const price = billingCycle === 'monthly' ? '8,00' : '72,00';
    addNewInvoice(price);
    setHasActiveSubscription(true);
    setUserType('subscribed');
    setShowSubscriptionCheckout(false);
    alert(`Abonnement ${billingCycle === 'monthly' ? 'mensuel' : 'annuel'} souscrit avec succès !`);
  };

  const generateInvoiceNumber = () => {
    return 'F' + Math.floor(Math.random() * 900000000) + 100000000;
  };

  const addNewInvoice = (total) => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR');
    const newInvoice = {
      date: dateStr,
      number: generateInvoiceNumber(),
      total: total + ' €'
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      <Header 
        onSourcesClick={() => setShowSources(true)}
        onPlayersClick={() => setShowPlayers(true)}
      />
      
      {/* Bouton Retour */}
      <div className="px-32 pt-6">
        <button
          onClick={() => navigate('/campaigns')}
          className="flex items-center space-x-2 text-golden hover:text-golden/80 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Retour</span>
        </button>
      </div>

      {/* Navigation par onglets */}
      <div className="px-32 py-6">
        <nav className="flex space-x-8 border-b border-light/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'profil') {
                    navigate('/profil');
                  } else if (tab.id === 'stockage') {
                    navigate('/stockage');
                  } else if (tab.id === 'confidentialite') {
                    navigate('/confidentialite');
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center space-x-2 pb-4 px-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-golden border-b-2 border-golden'
                    : 'text-light/70 hover:text-light'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="px-32 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Colonne gauche - Mon abonnement */}
          <div className="space-y-6">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-golden italic mb-6">Mon abonnement</h2>
              
              {/* Plan actuel */}
              <div className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                  <div>
                     <h3 className="text-xl font-bold text-golden">
                       {userType === 'free' ? 'Plan Gratuit' : 'Abonnement MJ'}
                     </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                         {userType === 'subscribed' && (
                           <div className="flex items-center space-x-2">
                             <span className="px-3 py-1 rounded-lg text-sm font-medium bg-golden text-dark">
                               {billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'}
                             </span>
                           </div>
                         )}
                      </div>
                       {userType !== 'free' && (
                         <div className="text-right">
                           <p className="text-primary-blue font-semibold">
                             {billingCycle === 'monthly' ? '8,00 € / mois' : '72,00 € / an'}
                           </p>
                           {billingCycle === 'yearly' && (
                             <p className="text-golden text-xs font-medium">-25% de réduction</p>
                           )}
                         </div>
                       )}
                    </div>
                  </div>
                  </div>
                   <div className="flex items-center space-x-2">
                     {userType === 'free' ? (
                       <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                         Gratuit
                       </span>
                     ) : userType === 'subscribed' ? (
                       <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                         Actif
                       </span>
                     ) : (
                       <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                         Annulé
                       </span>
                     )}
                   </div>
                </div>
                
                 <div className="space-y-3 mb-6">
                   {userType === 'free' ? (
                     <>
                       <div className="flex items-center space-x-3">
                         <div className="w-2 h-2 bg-golden rounded-full"></div>
                         <span className="text-golden">1 campagne gratuite</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <div className="w-2 h-2 bg-golden rounded-full"></div>
                         <span className="text-golden">100 Mo de stockage de sources</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <div className="w-2 h-2 bg-golden rounded-full"></div>
                         <span className="text-golden">Nombre de messages limité à LoreI</span>
                       </div>
                     </>
                   ) : (
                     <>
                       <div className="flex items-center space-x-3">
                         <div className="w-2 h-2 bg-golden rounded-full"></div>
                         <span className="text-golden">Campagnes illimitées</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <div className="w-2 h-2 bg-golden rounded-full"></div>
                         <span className="text-golden">Accès assistant MJ IA illimité</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <div className="w-2 h-2 bg-golden rounded-full"></div>
                         <span className="text-golden">Stockage 1 Go inclus</span>
                       </div>
                     </>
                   )}
                 </div>

                 {/* Boutons de gestion d'abonnement */}
                 <div className="flex flex-col space-y-3">
                   {userType === 'subscribed' ? (
                     <button
                       onClick={handleCancelSubscription}
                       className="bg-red-400 hover:bg-red-500 text-white px-3 py-1.5 rounded text-sm transition-colors"
                     >
                       Annuler l'abonnement
                     </button>
                   ) : userType === 'cancelled' ? (
                     <button
                       onClick={() => {
                         setUserType('subscribed');
                         setHasActiveSubscription(true);
                         alert('Votre abonnement a été réactivé !');
                       }}
                       className="bg-golden hover:bg-golden/80 text-dark px-4 py-2 rounded-lg transition-colors font-medium"
                     >
                       Réactiver l'abonnement
                     </button>
                   ) : (
                     <div className="space-y-3">
                       <div className="text-sm text-golden/80 mb-2">Choisissez votre abonnement :</div>
                       <div className="flex space-x-3">
                         <button
                           onClick={() => handleSubscribe('monthly')}
                           className="flex-1 bg-golden hover:bg-golden/80 text-dark px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                         >
                           <span>Souscrire - Mensuel</span>
                           <span className="text-sm">8,00 € / mois</span>
                         </button>
                         <button
                           onClick={() => handleSubscribe('yearly')}
                           className="flex-1 bg-golden hover:bg-golden/80 text-dark px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                         >
                           <span>Souscrire - Annuel</span>
                           <span className="text-sm">72,00 € / an</span>
                         </button>
                       </div>
                       <div className="text-xs text-golden text-center">
                         Économisez 25% avec l'abonnement annuel !
                       </div>
                     </div>
                   )}
                 </div>
              </div>

              {/* Services supplémentaires */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-golden">Services supplémentaires</h3>
                </div>
                <div className="space-y-3">
                  {additionalServices.map((service, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 bg-white/10 rounded-lg border border-golden/20">
                      <div className="flex-1">
                        <span className="text-golden font-medium">{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-primary-blue font-semibold">{service.price}</span>
                        <button
                          onClick={() => addToCart(service)}
                          className="bg-golden hover:bg-golden/80 text-dark px-3 py-1 rounded-lg transition-colors flex items-center space-x-1 text-sm font-medium"
                        >
                          <Plus size={14} />
                          <span>Ajouter</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Mes factures */}
          <div className="space-y-6">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-golden italic mb-4">Mes factures</h2>
              <p className="text-golden/80 mb-6">
                Consultez votre historique de facturation et téléchargez vos factures.
              </p>
              
              {/* Tableau des factures */}
              <div className="bg-white/80 rounded-lg overflow-hidden border border-black/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-golden/20">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-dark">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-dark">Numéro de facture</th>
                        <th className="text-right py-3 px-4 font-semibold text-dark">Total</th>
                        <th className="text-center py-3 px-4 font-semibold text-dark">Télécharger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice, index) => (
                        <tr key={index} className={`border-t border-black/10 ${
                          index % 2 === 0 ? 'bg-white/40' : 'bg-white/60'
                        }`}>
                          <td className="py-3 px-4 text-black">{invoice.date}</td>
                          <td className="py-3 px-4 text-black font-mono text-sm">{invoice.number}</td>
                          <td className="py-3 px-4 text-right text-black font-semibold">{invoice.total}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleDownloadInvoice(invoice.number)}
                              className="text-black hover:text-golden transition-colors p-2 hover:bg-golden/10 rounded-lg"
                              title="Télécharger la facture"
                            >
                              <Download size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panier flottant inspiré de Notion - Style minimaliste */}
      {showCart && cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-golden rounded-full"></div>
                <span className="text-black font-medium text-sm">{cart.length} article{cart.length > 1 ? 's' : ''}</span>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded transition-colors">
                  <div className="flex-1 min-w-0">
                    <span className="text-black text-sm truncate block">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <span className="text-black font-medium text-sm">{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-black font-medium">Total</span>
                <span className="text-black font-bold">{getTotalPrice()} €</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-golden hover:bg-golden/90 text-dark font-medium py-2.5 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
              >
                <span>Continuer</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page de récapitulatif et paiement - Style Notion */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Finaliser votre commande</h2>
                <p className="text-gray-500 text-sm mt-1">Récapitulatif et paiement</p>
              </div>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Récapitulatif des articles - Style Notion */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Articles sélectionnés</h3>
              <div className="space-y-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex-1">
                      <span className="text-gray-900 font-medium text-sm">{item.name}</span>
                    </div>
                    <span className="text-primary-blue font-semibold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total - Style Notion */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Total</span>
                <span className="text-primary-blue font-bold text-lg">{getTotalPrice()} €</span>
              </div>
            </div>

            {/* Informations de paiement - Style Notion */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Informations de paiement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Méthode de paiement</label>
                  <select className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors">
                    <option>Carte de crédit</option>
                    <option>PayPal</option>
                    <option>Virement bancaire</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Numéro de carte</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Date d'expiration</label>
                    <input 
                      type="text" 
                      placeholder="MM/AA"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Nom sur la carte</label>
                    <input 
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions et boutons - Style Notion */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-start space-x-3 mb-4">
                <input type="checkbox" className="mt-1 accent-golden" />
                <span className="text-gray-600 text-sm">
                  J'accepte les <a href="#" className="text-golden hover:underline">Conditions Générales de Vente</a> et la <a href="#" className="text-golden hover:underline">Politique de Confidentialité</a>
                </span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors font-medium text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    const total = getTotalPrice();
                    addNewInvoice(total);
                    alert('Paiement simulé avec succès !');
                    setCart([]);
                    setShowCheckout(false);
                  }}
                  className="flex-1 bg-golden hover:bg-golden/90 text-dark px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Payer {getTotalPrice()} €</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de paiement pour l'abonnement */}
      {showSubscriptionCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Finaliser votre abonnement</h2>
                <p className="text-gray-500 text-sm mt-1">Récapitulatif et paiement</p>
              </div>
              <button
                onClick={() => setShowSubscriptionCheckout(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Récapitulatif de l'abonnement */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Abonnement sélectionné</h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-900 font-medium text-sm">Abonnement MJ - {billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {billingCycle === 'monthly' ? 'Renouvellement mensuel' : 'Renouvellement annuel avec 25% de réduction'}
                    </div>
                  </div>
                  <span className="text-primary-blue font-semibold text-sm">
                    {billingCycle === 'monthly' ? '8,00 € / mois' : '72,00 € / an'}
                  </span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Total</span>
                <span className="text-primary-blue font-bold text-lg">
                  {billingCycle === 'monthly' ? '8,00 €' : '72,00 €'}
                </span>
              </div>
            </div>

            {/* Informations de paiement */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Informations de paiement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Méthode de paiement</label>
                  <select className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors">
                    <option>Carte de crédit</option>
                    <option>PayPal</option>
                    <option>Virement bancaire</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Numéro de carte</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Date d'expiration</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Nom sur la carte</label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-golden focus:ring-1 focus:ring-golden transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions et boutons */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-start space-x-3 mb-4">
                <input type="checkbox" className="mt-1 accent-golden" />
                <span className="text-gray-600 text-sm">
                  J'accepte les <a href="#" className="text-golden hover:underline">Conditions Générales de Vente</a> et la <a href="#" className="text-golden hover:underline">Politique de Confidentialité</a>
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSubscriptionCheckout(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors font-medium text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubscriptionPayment}
                  className="flex-1 bg-golden hover:bg-golden/90 text-dark px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Payer {billingCycle === 'monthly' ? '8,00 €' : '72,00 €'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />

      {/* Modal Players */}
      <PlayersModal isOpen={showPlayers} onClose={() => setShowPlayers(false)} />
    </div>
  );
};

export default Subscription;


