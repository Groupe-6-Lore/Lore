import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export const useCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          players (
            id,
            name,
            character_name,
            avatar_url,
            status
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des campagnes');
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          ...campaignData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setCampaigns(prev => [data, ...prev]);
      toast.success('Campagne créée avec succès !');
      return data;
    } catch (error) {
      toast.error('Erreur lors de la création de la campagne');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  return {
    campaigns,
    loading,
    fetchCampaigns,
    createCampaign
  };
};