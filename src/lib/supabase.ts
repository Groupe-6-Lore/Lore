import { createClient } from '@supabase/supabase-js'

// Configuration temporaire pour le développement
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)