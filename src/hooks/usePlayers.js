import { useState } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

export const usePlayers = () => {
  const [loading, setLoading] = useState(false);

  const addPlayer = async (campaignId, playerData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('players')
        .insert([{
          ...playerData,
          campaign_id: campaignId
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Joueur ajouté avec succès !');
      return data;
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du joueur');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removePlayer = async (playerId) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', playerId);

      if (error) throw error;
      
      toast.success('Joueur retiré avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la suppression du joueur');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addPlayer,
    removePlayer
  };
};