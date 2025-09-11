import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Redirection automatique vers /campaigns
  useEffect(() => {
    navigate('/campaigns');
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary-blue/10">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-dark eagle-lake-font">
              Bienvenue sur le Dashboard, {user?.user_metadata?.username || 'Aventurier'} !
            </h1>
            
            {user && (
              <div className="mb-8">
                <p className="text-xl text-dark/70 mb-2">
                  Bonjour, <span className="font-semibold text-indigo-600">{user.email}</span>
                </p>
                <p className="text-sm text-dark/70">
                  Connecté depuis le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            )}
            
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
