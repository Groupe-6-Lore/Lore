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
  signInWithPassword: async () => {
    // Simuler une connexion réussie
    const user = { 
      id: 'demo-user',
      email: 'demo@lore.com',
      user_metadata: { username: 'Demo User' }
    };
    
    // Déclencher l'événement de connexion après un court délai
    setTimeout(() => {
      // Trouver le callback d'onAuthStateChange et l'appeler
      if (window.authStateCallback) {
        window.authStateCallback('SIGNED_IN', { user });
      }
    }, 100);
    
    return {
      data: { user },
      error: null
    };
  },
  signUp: async () => {
    // Simuler une inscription réussie
    const user = { 
      id: 'demo-user',
      email: 'demo@lore.com',
      user_metadata: { username: 'Demo User' }
    };
    
    // Déclencher l'événement de connexion après un court délai
    setTimeout(() => {
      // Trouver le callback d'onAuthStateChange et l'appeler
      if (window.authStateCallback) {
        window.authStateCallback('SIGNED_IN', { user });
      }
    }, 100);
    
    return {
      data: { user },
      error: null
    };
  },
  signOut: async () => ({
    error: null
  }),
  onAuthStateChange: (callback) => {
    // Stocker le callback globalement pour que les mocks puissent l'utiliser
    window.authStateCallback = callback;
    
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
}

// Remplacer les méthodes d'authentification par les mocks
supabase.auth.getSession = mockAuth.getSession
supabase.auth.signInWithPassword = mockAuth.signInWithPassword
supabase.auth.signUp = mockAuth.signUp
supabase.auth.signOut = mockAuth.signOut
supabase.auth.onAuthStateChange = mockAuth.onAuthStateChange