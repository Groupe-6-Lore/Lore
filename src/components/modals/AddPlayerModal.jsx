import React, { useState } from 'react';
import { X, User, Gamepad2 } from 'lucide-react';
import { usePlayers } from '../../hooks/usePlayers';

const AddPlayerModal = ({ campaignId, onClose }) => {
  const { addPlayer, loading } = usePlayers();
  const [formData, setFormData] = useState({
    name: '',
    character_name: ''
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
      window.location.reload(); // Recharger pour voir le nouveau joueur
    } catch (error) {
      console.error('Erreur ajout joueur:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-primary-blue rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-golden/20">
        
        {/* Header style Lore */}
        <div className="flex items-center justify-between p-6 border-b border-light/20">
          <h3 className="text-xl font-bold text-light eagle-lake-font">Ajouter un joueur</h3>
          <button
            onClick={onClose}
            className="text-light/70 hover:text-light transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulaire style Lore */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-light mb-2">
              <User size={16} className="inline mr-2" />
              Nom du joueur
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Thomas"
              className="w-full px-4 py-3 rounded-lg bg-light/10 border border-light/20 text-light placeholder-light/50 focus:ring-2 focus:ring-golden focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light mb-2">
              <Gamepad2 size={16} className="inline mr-2" />
              Nom du personnage (optionnel)
            </label>
            <input
              type="text"
              name="character_name"
              value={formData.character_name}
              onChange={handleInputChange}
              placeholder="Vaelene"
              className="w-full px-4 py-3 rounded-lg bg-light/10 border border-light/20 text-light placeholder-light/50 focus:ring-2 focus:ring-golden focus:border-transparent transition-colors"
            />
          </div>

          {/* Boutons style Lore */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-light/30 rounded-lg text-light hover:bg-light/10 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name}
              className="flex-1 py-3 px-4 bg-golden text-dark font-semibold rounded-lg hover:bg-golden/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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