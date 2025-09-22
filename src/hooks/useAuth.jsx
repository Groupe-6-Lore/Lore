import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Désactiver la vérification automatique de session
    // L'utilisateur doit se connecter manuellement
    setLoading(false);

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Ne pas se reconnecter automatiquement après déconnexion
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
          toast.success('Déconnexion réussie !');
          // Nettoyer les données locales
          localStorage.removeItem('allCampaigns');
          localStorage.removeItem('demoCampaigns');
          sessionStorage.clear();
          return;
        }
        
        // Pour les autres événements, mettre à jour l'utilisateur
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Notifications toast selon l'événement
        switch (event) {
          case 'SIGNED_IN':
            toast.success('Connexion réussie !');
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token rafraîchi');
            break;
          case 'USER_UPDATED':
            toast.success('Profil mis à jour !');
            break;
          default:
            break;
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, metadata = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Compte créé ! Vérifiez votre email pour confirmer votre compte.');
      } else {
        toast.success('Compte créé avec succès !');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      // Gestion des erreurs spécifiques
      if (error.message.includes('already registered')) {
        toast.error('Cette adresse email est déjà utilisée');
      } else if (error.message.includes('Invalid email')) {
        toast.error('Adresse email invalide');
      } else if (error.message.includes('Password should be at least')) {
        toast.error('Le mot de passe doit contenir au moins 6 caractères');
      } else {
        toast.error('Erreur lors de la création du compte');
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Connexion réussie !');
      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      
      // Gestion des erreurs spécifiques
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email ou mot de passe incorrect');
      } else if (error.message.includes('Email not confirmed')) {
        toast.error('Veuillez confirmer votre email avant de vous connecter');
      } else if (error.message.includes('Too many requests')) {
        toast.error('Trop de tentatives. Veuillez réessayer plus tard');
      } else {
        toast.error('Erreur lors de la connexion');
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Forcer la déconnexion complète
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Forcer la déconnexion côté client
      setUser(null);
      
      // Nettoyer toutes les données locales
      localStorage.removeItem('allCampaigns');
      localStorage.removeItem('demoCampaigns');
      sessionStorage.clear();
      
      // Nettoyer les cookies de session si nécessaire
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      
      toast.success('Déconnexion réussie !');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
