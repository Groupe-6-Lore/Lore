import React, { useState } from 'react';
import { User, Mail, Calendar, MapPin, Globe, Shield, Bell, Palette, Save, Edit3, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SourcesModal from '../components/modals/SourcesModal';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profil');
  const [isEditing, setIsEditing] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'JeanDupont',
    email: 'knightnight@example.com',
    fullName: 'Jean Dupont',
    bio: 'Maître de jeu passionné depuis 5 ans. J\'aime créer des univers immersifs et des histoires captivantes.',
    location: 'Paris, France',
    website: 'https://knightnight-rpg.com',
    joinDate: '15 mars 2023',
    avatar: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showLocation: true
    },
    appearance: {
      theme: 'light',
      language: 'fr'
    }
  });

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'abonnement', label: 'Abonnement', icon: Mail },
    { id: 'stockage', label: 'Stockage', icon: Globe },
    { id: 'confidentialite', label: 'Confidentialité', icon: Shield }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Validation du mot de passe si modifié
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      alert('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    
    if (profileData.newPassword && profileData.newPassword.length < 6) {
      alert('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
    
    // Réinitialiser les champs de mot de passe
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulation de l'upload
      setProfileData(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file)
      }));
    }
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
                  if (tab.id === 'abonnement') {
                    navigate('/abonnement');
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
        <div className="max-w-4xl mx-auto">
          
          {/* Section Profil */}
          {activeTab === 'profil' && (
            <div className="space-y-8">
              
              {/* En-tête du profil */}
              <div className="bg-white/10 rounded-lg p-8 border border-golden/20">
                <div className="flex items-start space-x-6">
                  
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-golden rounded-full flex items-center justify-center text-dark text-2xl font-bold">
                      {profileData.avatar ? (
                        <img 
                          src={profileData.avatar} 
                          alt="Avatar" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        profileData.username?.[0]?.toUpperCase() || 'U'
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-golden text-dark p-2 rounded-full cursor-pointer hover:bg-golden/80 transition-colors">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Informations principales */}
                  <div className="flex-1">
                    <div className="mb-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={profileData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="text-2xl font-bold text-golden bg-transparent border-b border-golden/30 focus:border-golden focus:outline-none w-full"
                          />
                          <input
                            type="text"
                            value={profileData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className="bg-transparent text-golden px-0 py-1 text-sm font-medium border-b border-golden/30 focus:border-golden focus:outline-none placeholder-white w-full"
                            placeholder="Ex: MaîtreJean, DungeonMaster, LoreKeeper"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <h1 className="text-2xl font-bold text-golden">{profileData.fullName}</h1>
                          <span className="bg-golden/20 text-golden px-3 py-1 rounded-full text-sm font-medium">
                            @{profileData.username}
                          </span>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className="w-full text-golden/80 bg-transparent border border-golden/30 rounded-lg p-3 focus:border-golden focus:outline-none resize-none placeholder-white"
                          rows={3}
                          placeholder="Décrivez-vous..."
                        />
                    ) : (
                      <p className="text-golden/80 mb-4">{profileData.bio}</p>
                    )}

                    <div className="flex items-center space-x-6 text-sm text-golden/70">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Membre depuis {profileData.joinDate}</span>
                      </div>
                      {profileData.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} />
                          <span>{profileData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bouton d'édition */}
                  <div>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          <X size={16} className="inline mr-2" />
                          Annuler
                        </button>
                        <button
                          onClick={handleSave}
                          className="bg-golden hover:bg-golden/80 text-dark px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          <Save size={16} className="inline mr-2" />
                          Sauvegarder
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-golden hover:bg-golden/80 text-dark px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Edit3 size={16} className="inline mr-2" />
                        Modifier
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Informations personnelles */}
                <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                  <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                    <User size={20} className="mr-3" />
                    Informations personnelles
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-golden/80 text-sm font-medium mb-2">Nom d'utilisateur</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                          placeholder="Ex: MaîtreJean, DungeonMaster, LoreKeeper"
                        />
                      ) : (
                        <p className="text-golden">@{profileData.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-golden/80 text-sm font-medium mb-2">Adresse e-mail</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                        />
                      ) : (
                        <p className="text-golden">{profileData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-golden/80 text-sm font-medium mb-2">Localisation</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                          placeholder="Ville, Pays"
                        />
                      ) : (
                        <p className="text-golden">{profileData.location || 'Non renseigné'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-golden/80 text-sm font-medium mb-2">Site web</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                          placeholder="https://votre-site.com"
                        />
                      ) : (
                        <p className="text-golden">
                          {profileData.website ? (
                            <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {profileData.website}
                            </a>
                          ) : (
                            'Non renseigné'
                          )}
                        </p>
                      )}
                    </div>

                    {/* Section changement de mot de passe */}
                    {isEditing && (
                      <div className="mt-6 pt-6 border-t border-golden/20">
                        <h3 className="text-lg font-semibold text-golden mb-4">Changer le mot de passe</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-golden/80 text-sm font-medium mb-2">Mot de passe actuel</label>
                            <input
                              type="password"
                              value={profileData.currentPassword}
                              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                              className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                              placeholder="Entrez votre mot de passe actuel"
                            />
                          </div>

                          <div>
                            <label className="block text-golden/80 text-sm font-medium mb-2">Nouveau mot de passe</label>
                            <input
                              type="password"
                              value={profileData.newPassword}
                              onChange={(e) => handleInputChange('newPassword', e.target.value)}
                              className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                              placeholder="Entrez votre nouveau mot de passe"
                            />
                          </div>

                          <div>
                            <label className="block text-golden/80 text-sm font-medium mb-2">Confirmer le nouveau mot de passe</label>
                            <input
                              type="password"
                              value={profileData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className="w-full px-3 py-2 bg-white/20 border border-golden/30 rounded-lg text-golden focus:border-golden focus:outline-none placeholder-white"
                              placeholder="Confirmez votre nouveau mot de passe"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                  <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                    <Globe size={20} className="mr-3" />
                    Statistiques
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-golden/20">
                      <span className="text-golden/80">Campagnes créées</span>
                      <span className="text-golden font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-golden/20">
                      <span className="text-golden/80">Sessions jouées</span>
                      <span className="text-golden font-semibold">47</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-golden/20">
                      <span className="text-golden/80">Sources ajoutées</span>
                      <span className="text-golden font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-golden/80">Messages avec LoreI</span>
                      <span className="text-golden font-semibold">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Notifications */}
          {activeTab === 'confidentialite' && (
            <div className="space-y-8">
              
              {/* Notifications */}
              <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                  <Bell size={20} className="mr-3" />
                  Notifications
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-golden font-medium">Notifications par e-mail</p>
                      <p className="text-golden/70 text-sm">Recevez des mises à jour importantes par e-mail</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.email}
                        onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-golden font-medium">Notifications push</p>
                      <p className="text-golden/70 text-sm">Recevez des notifications sur votre appareil</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.push}
                        onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-golden font-medium">E-mails marketing</p>
                      <p className="text-golden/70 text-sm">Recevez des offres et des nouveautés</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.marketing}
                        onChange={(e) => handlePreferenceChange('notifications', 'marketing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Confidentialité */}
              <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                  <Shield size={20} className="mr-3" />
                  Confidentialité
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-golden font-medium">Profil public</p>
                      <p className="text-golden/70 text-sm">Votre profil est visible par les autres utilisateurs</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.privacy.profilePublic}
                        onChange={(e) => handlePreferenceChange('privacy', 'profilePublic', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-golden font-medium">Afficher l'e-mail</p>
                      <p className="text-golden/70 text-sm">Votre adresse e-mail est visible sur votre profil</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.privacy.showEmail}
                        onChange={(e) => handlePreferenceChange('privacy', 'showEmail', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-golden font-medium">Afficher la localisation</p>
                      <p className="text-golden/70 text-sm">Votre localisation est visible sur votre profil</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.privacy.showLocation}
                        onChange={(e) => handlePreferenceChange('privacy', 'showLocation', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Apparence */}
              <div className="bg-white/10 rounded-lg p-6 border border-golden/20">
                <h2 className="text-xl font-bold text-golden mb-6 flex items-center">
                  <Palette size={20} className="mr-3" />
                  Apparence
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-golden font-medium mb-2">Thème</label>
                    <select
                      value={preferences.appearance.theme}
                      onChange={(e) => handlePreferenceChange('appearance', 'theme', e.target.value)}
                      className="w-full pl-2 pr-8 py-2 bg-primary-blue border border-white rounded-lg text-white focus:border-golden focus:outline-none"
                    >
                      <option value="light" className="text-white bg-primary-blue">Clair</option>
                      <option value="dark" className="text-white bg-primary-blue">Sombre</option>
                      <option value="auto" className="text-white bg-primary-blue">Automatique</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-golden font-medium mb-2">Langue</label>
                    <select
                      value={preferences.appearance.language}
                      onChange={(e) => handlePreferenceChange('appearance', 'language', e.target.value)}
                      className="w-full pl-2 pr-8 py-2 bg-primary-blue border border-white rounded-lg text-white focus:border-golden focus:outline-none"
                    >
                      <option value="fr" className="text-white bg-primary-blue">Français</option>
                      <option value="en" className="text-white bg-primary-blue">English</option>
                      <option value="es" className="text-white bg-primary-blue">Español</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
    </div>
  );
};

export default Profile;
