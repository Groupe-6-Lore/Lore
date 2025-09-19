import React, { useState } from 'react';
import { HardDrive, Upload, Download, Trash2, FileText, Image, File, AlertTriangle, CheckCircle, Plus, X, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';

const Storage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stockage');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [storageUsage, setStorageUsage] = useState({
    used: 85, // Mo utilisés
    total: 100, // Mo total (plan gratuit)
    percentage: 85
  });
  const [purchasedStorage, setPurchasedStorage] = useState(0); // Stockage acheté en plus

  const tabs = [
    { id: 'profil', label: 'Profil', icon: HardDrive },
    { id: 'abonnement', label: 'Abonnement', icon: HardDrive },
    { id: 'stockage', label: 'Stockage', icon: HardDrive },
    { id: 'confidentialite', label: 'Confidentialité', icon: HardDrive }
  ];

  const storageProduct = {
    id: 'storage-200',
    name: 'Stockage 200 Mo',
    storage: '200 Mo',
    price: '10,00 €',
    description: 'Ajoutez 200 Mo supplémentaires à votre stockage'
  };

  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Règles_D&D_5e.pdf',
      type: 'pdf',
      size: 2.3, // en Mo
      date: '15/01/2025',
      category: 'Règles'
    },
    {
      id: 2,
      name: 'Carte_Taverne.jpg',
      type: 'image',
      size: 1.8, // en Mo
      date: '14/01/2025',
      category: 'Cartes'
    },
    {
      id: 3,
      name: 'Fiche_Personnage.docx',
      type: 'document',
      size: 0.5, // en Mo
      date: '13/01/2025',
      category: 'Personnages'
    },
    {
      id: 4,
      name: 'Scénario_Aventure.pdf',
      type: 'pdf',
      size: 3.2, // en Mo
      date: '12/01/2025',
      category: 'Scénarios'
    }
  ]);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-500" size={20} />;
      case 'image':
        return <Image className="text-blue-500" size={20} />;
      case 'document':
        return <File className="text-green-500" size={20} />;
      default:
        return <File className="text-gray-500" size={20} />;
    }
  };

  // Calculer le stockage utilisé en temps réel
  const calculateStorageUsed = () => {
    const totalUsed = files.reduce((sum, file) => sum + file.size, 0);
    const totalStorage = 100 + purchasedStorage; // 100 Mo gratuit + stockage acheté
    const percentage = Math.min((totalUsed / totalStorage) * 100, 100);
    
    return {
      used: Math.round(totalUsed * 10) / 10, // Arrondi à 1 décimale
      total: totalStorage,
      percentage: Math.round(percentage * 10) / 10
    };
  };

  const currentStorage = calculateStorageUsed();

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    // Simulation de l'upload - ajouter les fichiers
    const uploadedFiles = newFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'document',
      size: Math.round((file.size / (1024 * 1024)) * 10) / 10, // Convertir en Mo
      date: new Date().toLocaleDateString('fr-FR'),
      category: 'Autres'
    }));
    
    setFiles(prev => [...prev, ...uploadedFiles]);
    console.log('Fichiers ajoutés:', uploadedFiles);
  };

  const handleDeleteFile = (fileId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setFiles(prev => prev.filter(file => file.id !== fileId));
      console.log('Fichier supprimé:', fileId);
    }
  };

  const handleDownloadFile = (fileName) => {
    alert(`Le fichier "${fileName}" va être téléchargé dans quelques instants.`);
    console.log('Téléchargement du fichier:', fileName);
  };

  const handlePurchaseStorage = () => {
    setShowPurchaseModal(true);
  };

  const handlePurchaseConfirm = () => {
    setShowPurchaseModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    setPurchasedStorage(prev => prev + 200); // Ajouter 200 Mo
    setShowPaymentModal(false);
    alert('Stockage de 200 Mo ajouté avec succès !');
  };

  const getStorageColor = () => {
    if (currentStorage.percentage >= 90) return 'bg-red-500';
    if (currentStorage.percentage >= 75) return 'bg-yellow-500';
    return 'bg-golden';
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      <Header onSourcesClick={() => setShowSources(true)} />
      
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
                  } else if (tab.id === 'abonnement') {
                    navigate('/abonnement');
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
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête avec utilisation du stockage */}
          <div className="bg-white/10 rounded-lg p-8 border border-golden/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-golden mb-2">Mon Stockage</h1>
                <p className="text-golden/80">Gérez vos documents et sources de campagne</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-golden">
                  {currentStorage.used} Mo / {currentStorage.total} Mo
                </div>
                <div className="text-sm text-golden/70">
                  {currentStorage.percentage}% utilisé
                </div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-golden/80">Utilisation du stockage</span>
                {currentStorage.percentage >= 90 && (
                  <span className="text-sm text-red-400 flex items-center">
                    <AlertTriangle size={16} className="mr-1" />
                    Stockage presque plein
                  </span>
                )}
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${getStorageColor()}`}
                  style={{ width: `${currentStorage.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center space-x-4">
              <label className="bg-golden hover:bg-golden/80 text-dark px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center space-x-2">
                <Upload size={18} />
                <span>Ajouter des fichiers</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setShowPurchaseModal(true)}
                className="bg-primary-blue hover:bg-primary-blue/80 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Étendre mon stockage</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Colonne gauche - Fichiers */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-golden">Mes fichiers</h2>
                   <div className="flex items-center space-x-2">
                     <select className="bg-primary-blue border border-white rounded-lg pl-2 pr-8 py-1 text-white text-sm focus:border-golden focus:outline-none">
                       <option className="text-white bg-primary-blue">Tous les fichiers</option>
                       <option className="text-white bg-primary-blue">Règles</option>
                       <option className="text-white bg-primary-blue">Cartes</option>
                       <option className="text-white bg-primary-blue">Personnages</option>
                       <option className="text-white bg-primary-blue">Scénarios</option>
                     </select>
                   </div>
                </div>

                {/* Liste des fichiers */}
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-golden/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type)}
                        <div>
                          <div className="text-golden font-medium">{file.name}</div>
                          <div className="text-golden/70 text-sm">
                            {file.size} Mo • {file.date} • {file.category}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleDownloadFile(file.name)}
                          className="text-golden/70 hover:text-golden p-2 transition-colors"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-400 hover:text-red-300 p-2 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite - Stockage */}
            <div className="space-y-6">
              
              {/* Plan actuel */}
              <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                <h3 className="text-lg font-bold text-golden mb-4">Stockage actuel</h3>
                <div className="text-center">
                  <div className="w-16 h-16 bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <HardDrive className="text-dark" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-golden mb-2">
                    {100 + purchasedStorage} Mo total
                  </h4>
                  <p className="text-golden/80 mb-4">
                    100 Mo gratuit{purchasedStorage > 0 && ` + ${purchasedStorage} Mo acheté${purchasedStorage > 200 ? 's' : ''}`}
                  </p>
                  <div className="text-sm text-golden/70">
                    {currentStorage.used} Mo utilisés
                  </div>
                </div>
              </div>

              {/* Produit de stockage */}
              <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                <h3 className="text-lg font-bold text-golden mb-4">Étendre le stockage</h3>
                <div className="p-4 rounded-lg border border-golden bg-golden/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-golden">{storageProduct.name}</h4>
                    <span className="text-golden font-semibold">{storageProduct.price}</span>
                  </div>
                  <p className="text-golden/80 text-sm mb-3">{storageProduct.description}</p>
                  <div className="text-golden/70 text-xs mb-4">
                    • Achetable plusieurs fois
                    • Ajoute 200 Mo à chaque achat
                    • Stockage permanent
                  </div>
                  <button
                    onClick={handlePurchaseStorage}
                    className="w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium bg-golden hover:bg-golden/80 text-dark"
                  >
                    Acheter du stockage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'achat de stockage */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
               <div>
                 <h2 className="text-xl font-semibold text-gray-900">Étendre votre stockage</h2>
                 <p className="text-gray-500 text-sm mt-1">Ajoutez 200 Mo supplémentaires à votre stockage</p>
               </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Produit dans la modal */}
            <div className="mb-6">
              <div className="p-4 rounded-lg border border-golden bg-golden/10">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-bold text-gray-900">{storageProduct.name}</h4>
                   <span className="text-black font-semibold">{storageProduct.price}</span>
                 </div>
                <p className="text-gray-600 text-sm mb-3">{storageProduct.description}</p>
                <ul className="text-gray-600 text-xs space-y-1">
                  <li className="flex items-center">
                    <CheckCircle size={12} className="mr-2 text-green-500" />
                    Achetable plusieurs fois
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={12} className="mr-2 text-green-500" />
                    Ajoute 200 Mo à chaque achat
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={12} className="mr-2 text-green-500" />
                    Stockage permanent
                  </li>
                </ul>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors font-medium text-sm"
              >
                Annuler
              </button>
               <button
                 onClick={handlePurchaseConfirm}
                 className="flex-1 bg-golden hover:bg-golden/90 text-dark px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm"
               >
                 <ShoppingCart size={16} />
                 <span>Continuer vers le paiement</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de paiement pour le stockage */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Finaliser votre achat</h2>
                <p className="text-gray-500 text-sm mt-1">Récapitulatif et paiement</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Récapitulatif de l'achat */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Article sélectionné</h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-900 font-medium text-sm">{storageProduct.name}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      Ajoute 200 Mo supplémentaires à votre stockage
                    </div>
                  </div>
                  <span className="text-black font-semibold text-sm">{storageProduct.price}</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Total</span>
                <span className="text-black font-bold text-lg">{storageProduct.price}</span>
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
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors font-medium text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={handlePaymentConfirm}
                  className="flex-1 bg-golden hover:bg-golden/90 text-dark px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Payer {storageProduct.price}</span>
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
    </div>
  );
};

export default Storage;
