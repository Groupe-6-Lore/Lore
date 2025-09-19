import React, { useState } from 'react';
import { Shield, Users, CreditCard, HardDrive, Eye, EyeOff, Lock, Globe, Bell, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';

const Privacy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('confidentialite');
  const [showSources, setShowSources] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private', // 'public', 'private', 'friends'
    showEmail: false,
    showLastSeen: true,
    allowFriendRequests: true,
    allowMessages: 'friends', // 'everyone', 'friends', 'none'
    dataSharing: false,
    analytics: true,
    marketing: false,
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const tabs = [
    { id: 'profil', label: 'Profil', icon: Users },
    { id: 'abonnement', label: 'Abonnement', icon: CreditCard },
    { id: 'stockage', label: 'Stockage', icon: HardDrive },
    { id: 'confidentialite', label: 'Confidentialité', icon: Shield }
  ];

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleNotificationChange = (type, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Simulation de sauvegarde
    console.log('Paramètres de confidentialité sauvegardés:', privacySettings);
    alert('Paramètres de confidentialité sauvegardés avec succès !');
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      <Header onSourcesClick={() => setShowSources(true)} />
      
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
                  } else if (tab.id === 'stockage') {
                    navigate('/stockage');
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
        <div className="max-w-4xl mx-auto">
          
          {/* En-tête */}
          <div className="bg-white/10 rounded-lg p-8 border border-golden/20 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center">
                <Shield className="text-dark" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-golden mb-2">Confidentialité et Sécurité</h1>
                <p className="text-golden/80">Gérez vos paramètres de confidentialité et de sécurité</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* Section Visibilité du profil */}
            <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
              <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                <Eye className="mr-3" size={20} />
                Visibilité du profil
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-golden font-medium mb-3">Qui peut voir votre profil ?</label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={privacySettings.profileVisibility === 'public'}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="accent-golden"
                      />
                      <div>
                        <div className="text-golden font-medium">Public</div>
                        <div className="text-golden/70 text-sm">Tout le monde peut voir votre profil</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="friends"
                        checked={privacySettings.profileVisibility === 'friends'}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="accent-golden"
                      />
                      <div>
                        <div className="text-golden font-medium">Amis uniquement</div>
                        <div className="text-golden/70 text-sm">Seuls vos amis peuvent voir votre profil</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={privacySettings.profileVisibility === 'private'}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="accent-golden"
                      />
                      <div>
                        <div className="text-golden font-medium">Privé</div>
                        <div className="text-golden/70 text-sm">Votre profil est complètement privé</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={(e) => handleSettingChange('showEmail', e.target.checked)}
                      className="accent-golden"
                    />
                    <span className="text-golden">Afficher mon adresse email sur mon profil</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showLastSeen}
                      onChange={(e) => handleSettingChange('showLastSeen', e.target.checked)}
                      className="accent-golden"
                    />
                    <span className="text-golden">Afficher ma dernière connexion</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section Communications */}
            <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
              <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                <Users className="mr-3" size={20} />
                Communications
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-golden font-medium mb-3">Qui peut vous envoyer des demandes d'amitié ?</label>
                  <select 
                    value={privacySettings.allowFriendRequests ? 'everyone' : 'none'}
                    onChange={(e) => handleSettingChange('allowFriendRequests', e.target.value === 'everyone')}
                    className="bg-primary-blue border border-white rounded-lg pl-2 pr-8 py-2 text-white text-sm focus:border-golden focus:outline-none"
                  >
                    <option value="everyone" className="text-white bg-primary-blue">Tout le monde</option>
                    <option value="none" className="text-white bg-primary-blue">Personne</option>
                  </select>
                </div>

                <div>
                  <label className="block text-golden font-medium mb-3">Qui peut vous envoyer des messages ?</label>
                  <select 
                    value={privacySettings.allowMessages}
                    onChange={(e) => handleSettingChange('allowMessages', e.target.value)}
                    className="bg-primary-blue border border-white rounded-lg pl-2 pr-8 py-2 text-white text-sm focus:border-golden focus:outline-none"
                  >
                    <option value="everyone" className="text-white bg-primary-blue">Tout le monde</option>
                    <option value="friends" className="text-white bg-primary-blue">Amis uniquement</option>
                    <option value="none" className="text-white bg-primary-blue">Personne</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section Données et confidentialité */}
            <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
              <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                <Lock className="mr-3" size={20} />
                Données et confidentialité
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.dataSharing}
                      onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                      className="accent-golden"
                    />
                    <div>
                      <span className="text-golden font-medium">Partager mes données avec des partenaires</span>
                      <div className="text-golden/70 text-sm">Permettre le partage de données anonymisées pour améliorer les services</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.analytics}
                      onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                      className="accent-golden"
                    />
                    <div>
                      <span className="text-golden font-medium">Analytics et statistiques d'usage</span>
                      <div className="text-golden/70 text-sm">Collecter des données d'usage pour améliorer l'expérience</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.marketing}
                      onChange={(e) => handleSettingChange('marketing', e.target.checked)}
                      className="accent-golden"
                    />
                    <div>
                      <span className="text-golden font-medium">Recevoir des communications marketing</span>
                      <div className="text-golden/70 text-sm">Emails et notifications sur les nouveaux produits et offres</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section Notifications */}
            <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
              <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                <Bell className="mr-3" size={20} />
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      className="accent-golden"
                    />
                    <span className="text-golden">Notifications par email</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.notifications.push}
                      onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      className="accent-golden"
                    />
                    <span className="text-golden">Notifications push</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.notifications.sms}
                      onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                      className="accent-golden"
                    />
                    <span className="text-golden">Notifications SMS</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="bg-golden hover:bg-golden/80 text-dark px-6 py-3 rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                <Save size={18} />
                <span>Sauvegarder les paramètres</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
    </div>
  );
};

export default Privacy;
