import { supabase } from './supabase';

export async function testSupabaseConnection() {
  try {
    // Tente de récupérer les campagnes (retournera un tableau vide si pas de données)
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Erreur de connexion à Supabase:', error.message);
      return false;
    }

    console.log('Connexion à Supabase réussie !');
    console.log('Données récupérées:', data);
    return true;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return false;
  }
}





