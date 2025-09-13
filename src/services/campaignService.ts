import { supabase } from '../lib/supabase';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'archived' | 'completed';
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCampaignData {
  title: string;
  description: string;
  status?: 'active' | 'archived' | 'completed';
}

export const campaignService = {
  // Récupérer toutes les campagnes de l'utilisateur
  async getAllCampaigns(): Promise<Campaign[]> {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des campagnes:', error);
      throw error;
    }

    return data || [];
  },

  // Récupérer une campagne par son ID
  async getCampaignById(id: string): Promise<Campaign | null> {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de la campagne:', error);
      throw error;
    }

    return data;
  },

  // Créer une nouvelle campagne
  async createCampaign(campaignData: CreateCampaignData): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([
        {
          ...campaignData,
          status: campaignData.status || 'active',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la création de la campagne:', error);
      throw error;
    }

    return data;
  },

  // Mettre à jour une campagne
  async updateCampaign(id: string, campaignData: Partial<CreateCampaignData>): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .update(campaignData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour de la campagne:', error);
      throw error;
    }

    return data;
  },

  // Supprimer une campagne
  async deleteCampaign(id: string): Promise<void> {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression de la campagne:', error);
      throw error;
    }
  }
};




