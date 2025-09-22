import { createClient } from '@supabase/supabase-js'

// Configuration réelle via variables d'environnement Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseKey) {
  // Avertissement en développement si les variables manquent
  console.warn('[Supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquantes. Configurez votre fichier .env.')
}

// Créer le client Supabase réel
export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')