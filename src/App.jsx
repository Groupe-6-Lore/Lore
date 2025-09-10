import React from 'react';
import './styles/globals.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './pages/Dashboard';
import CampaignSelection from './pages/CampaignSelection';
import CreateCampaign from './pages/CreateCampaign';
import SelectUniverse from './pages/SelectUniverse';
import UniverseDetails from './pages/UniverseDetails';
import ConfigureCampaign from './pages/ConfigureCampaign';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-blue/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-dark/70">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-blue/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-dark/70">Chargement...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique - AuthPage */}
          <Route path="/" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />
          
          {/* Route protégée - Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Route protégée - Campaign Selection */}
          <Route path="/campaigns" element={
            <ProtectedRoute>
              <CampaignSelection />
            </ProtectedRoute>
          } />
          
          {/* Route protégée - Create Campaign */}
          <Route 
            path="/campaigns/create" 
            element={
              <ProtectedRoute>
                <CreateCampaign />
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée - Select Universe */}
          <Route 
            path="/campaigns/create/universe" 
            element={
              <ProtectedRoute>
                <SelectUniverse />
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée - Universe Details */}
          <Route 
            path="/campaigns/create/universe/:id/details" 
            element={
              <ProtectedRoute>
                <UniverseDetails />
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée - Configure Campaign */}
          <Route 
            path="/campaigns/create/configure" 
            element={
              <ProtectedRoute>
                <ConfigureCampaign />
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée - Players */}
          <Route path="/players" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90 flex items-center justify-center">
                <div className="text-center text-light">
                  <h1 className="text-4xl font-bold eagle-lake-font mb-4">Gestion des Joueurs</h1>
                  <p className="text-light/80">Page en cours de développement...</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Route protégée - Sources */}
          <Route path="/sources" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90 flex items-center justify-center">
                <div className="text-center text-light">
                  <h1 className="text-4xl font-bold eagle-lake-font mb-4">Sources et Références</h1>
                  <p className="text-light/80">Page en cours de développement...</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Route protégée - News */}
          <Route path="/news" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90 flex items-center justify-center">
                <div className="text-center text-light">
                  <h1 className="text-4xl font-bold eagle-lake-font mb-4">Actualités</h1>
                  <p className="text-light/80">Page en cours de développement...</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#46718A',
              color: '#F0EAE1',
              border: '1px solid #E9BD72',
            },
            success: {
              style: {
                background: '#E9BD72',
                color: '#0D151A',
              },
            },
            error: {
              style: {
                background: '#0D151A',
                color: '#F0EAE1',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;