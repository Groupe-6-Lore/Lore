import { createClient } from '@supabase/supabase-js'

// Configuration pour le mode démo (sans authentification réelle)
const supabaseUrl = 'https://demo.supabase.co'
const supabaseKey = 'demo-key'

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Mock des fonctions d'authentification pour le mode démo
export const mockAuth = {
  getSession: async () => ({
    data: { session: null },
    error: null
  }),
  signInWithPassword: async () => ({
    data: { 
      user: { 
        id: 'demo-user',
        email: 'demo@lore.com',
        user_metadata: { username: 'Demo User' }
      } 
    },
    error: null
  }),
  signUp: async () => ({
    data: { 
      user: { 
        id: 'demo-user',
        email: 'demo@lore.com',
        user_metadata: { username: 'Demo User' }
      } 
    },
    error: null
  }),
  signOut: async () => ({
    error: null
  }),
  onAuthStateChange: (callback) => {
    // Simuler une connexion automatique en mode démo
    setTimeout(() => {
      callback('SIGNED_IN', {
        user: { 
          id: 'demo-user',
          email: 'demo@lore.com',
          user_metadata: { username: 'Demo User' }
        }
      })
    }, 1000)
    
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
}

// Remplacer les méthodes d'authentification par les mocks
supabase.auth.getSession = mockAuth.getSession
supabase.auth.signInWithPassword = mockAuth.signInWithPassword
supabase.auth.signUp = mockAuth.signUp
supabase.auth.signOut = mockAuth.signOut
supabase.auth.onAuthStateChange = mockAuth.onAuthStateChange