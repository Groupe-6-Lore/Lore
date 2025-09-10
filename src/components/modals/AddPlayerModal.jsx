import React, { useState } from 'react';
import { X, User, Gamepad2 } from 'lucide-react';
import { usePlayers } from '../../hooks/usePlayers';

const AddPlayerModal = ({ campaignId, onClose }) => {
  const { addPlayer, loading } = usePlayers();
  const [formData, setFormData] = useState({
    name: '',
    character_name: '',
    avatar_url: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlayer(campaignId, formData);
      onClose();
      // Recharger la page pour voir le nouveau joueur
      window.location.reload();
    } catch (error) {
      console.error('Erreur ajout joueur:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-dark eagle-lake-font">Ajouter un joueur</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Nom du joueur */}
          <div>
            <label className="block text-sm font-medium text-dark-medium mb-2">
              <User size={16} className="inline mr-2" />
              Nom du joueur
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Thomas"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          {/* Nom du personnage */}
          <div>
            <label className="block text-sm font-medium text-dark-medium mb-2">
              <Gamepad2 size={16} className="inline mr-2" />
              Nom du personnage (optionnel)
            </label>
            <input
              type="text"
              name="character_name"
              value={formData.character_name}
              onChange={handleInputChange}
              placeholder="Vaelene"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* URL Avatar */}
          <div>
            <label className="block text-sm font-medium text-dark-medium mb-2">
              URL de l'avatar (optionnel)
            </label>
            <input
              type="url"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleInputChange}
              placeholder="https://exemple.com/avatar.jpg"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Boutons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-dark-medium font-medium hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-golden to-golden text-white font-semibold rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ajout...' : 'Ajouter le joueur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayerModal;