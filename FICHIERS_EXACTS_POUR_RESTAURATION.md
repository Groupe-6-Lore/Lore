# 📁 FICHIERS EXACTS POUR RESTAURATION

## 🎯 INSTRUCTIONS
Copiez chaque fichier dans le bon dossier avec le contenu exact ci-dessous.

---

## 📄 src/App.jsx
```javascript
import React from 'react';
import './styles/globals.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './pages/Dashboard';
import CampaignSelection from './pages/CampaignSelection';
import SelectUniverse from './pages/SelectUniverse';
import UniverseDetails from './pages/UniverseDetails';
import UniverseInfo from './pages/UniverseInfo';
import ExtensionDetails from './pages/ExtensionDetails';
import ConfigureCampaign from './pages/ConfigureCampaign';
import CreateCampaign from './pages/CreateCampaign';

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
          <Route path="/campaigns/create" element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          } />
          
          {/* Route protégée - Universe Selection */}
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
            path="/campaigns/create/universe/:id/info" 
            element={
              <ProtectedRoute>
                <UniverseInfo />
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée - Extension Details */}
          <Route 
            path="/campaigns/create/universe/:id/extension/:extensionId" 
            element={
              <ProtectedRoute>
                <ExtensionDetails />
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
          
          {/* Route protégée - Universe Page */}
          <Route 
            path="/universes/:universe" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90 flex items-center justify-center">
                  <div className="text-center text-light">
                    <h1 className="text-4xl font-bold eagle-lake-font mb-4">Page Univers</h1>
                    <p className="text-light/80">Page en cours de développement...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée - System Page */}
          <Route 
            path="/systems/:system" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90 flex items-center justify-center">
                  <div className="text-center text-light">
                    <h1 className="text-4xl font-bold eagle-lake-font mb-4">Page Système</h1>
                    <p className="text-light/80">Page en cours de développement...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
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
```

---

## 📄 src/styles/globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Eagle+Lake&family=Calligraffitti&family=Noto+Sans:wght@400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-blue: #0D151A;
  --light: #F0EAE1;
  --golden: #E9BD72;
  --dark: #0D151A;
  --slate: #64748B;
  --amber: #F59E0B;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans', sans-serif;
  background-color: var(--primary-blue);
  color: var(--light);
  line-height: 1.6;
}

.eagle-lake-font {
  font-family: 'Eagle Lake', cursive;
}

.calligraphy-font {
  font-family: 'Calligraffitti', cursive;
}

.noto-sans-font {
  font-family: 'Noto Sans', sans-serif;
}

/* Couleurs personnalisées */
.bg-primary-blue { background-color: var(--primary-blue); }
.bg-light { background-color: var(--light); }
.bg-golden { background-color: var(--golden); }
.bg-dark { background-color: var(--dark); }
.bg-slate { background-color: var(--slate); }
.bg-amber { background-color: var(--amber); }

.text-primary-blue { color: var(--primary-blue); }
.text-light { color: var(--light); }
.text-golden { color: var(--golden); }
.text-dark { color: var(--dark); }
.text-slate { color: var(--slate); }
.text-amber { color: var(--amber); }

.border-primary-blue { border-color: var(--primary-blue); }
.border-light { border-color: var(--light); }
.border-golden { border-color: var(--golden); }
.border-dark { border-color: var(--dark); }
.border-slate { border-color: var(--slate); }
.border-amber { border-color: var(--amber); }

/* Utilitaires pour les cartes */
.universe-card {
  transition: all 0.3s ease;
}

.universe-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.universe-image-container {
  position: relative;
  overflow: hidden;
}

.universe-tags {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}

.universe-tag {
  background-color: var(--golden);
  color: var(--dark);
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

.universe-card-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 160px;
}

.universe-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
  line-height: 1.4;
  min-height: 2.5rem;
  flex-grow: 1;
}

.universe-separator-section {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.75rem;
  margin-top: auto;
  min-height: 48px;
}

.universe-price-row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 48px;
}

.universe-price-content {
  text-align: right;
}

.universe-price-text {
  font-weight: 600;
  color: white;
  font-size: 0.875rem;
  line-height: 1.5;
}

.universe-price-subtext {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
}

/* Utilitaires pour le texte */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Responsive */
@media (max-width: 640px) {
  .universe-card-content {
    height: 140px;
  }
  
  .universe-description {
    min-height: 2rem;
  }
  
  .universe-separator-section {
    min-height: 40px;
  }
  
  .universe-price-row {
    min-height: 40px;
  }
}

/* Styles pour les inputs de recherche */
.search-input {
  font-family: 'Noto Sans', sans-serif;
}

/* Styles pour les boutons */
.btn-primary {
  background-color: var(--golden);
  color: var(--dark);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: rgba(233, 189, 114, 0.8);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: rgba(240, 234, 225, 0.15);
  color: var(--light);
  border: 1px solid rgba(240, 234, 225, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: rgba(240, 234, 225, 0.25);
  border-color: rgba(240, 234, 225, 0.5);
}

/* Styles pour les modales */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--primary-blue);
  border: 1px solid var(--golden);
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

/* Styles pour les notifications toast */
.toast-success {
  background-color: var(--golden) !important;
  color: var(--dark) !important;
}

.toast-error {
  background-color: var(--dark) !important;
  color: var(--light) !important;
}

/* Styles pour les scrollbars */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(240, 234, 225, 0.1);
}

::-webkit-scrollbar-thumb {
  background: var(--golden);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(233, 189, 114, 0.8);
}

/* Styles pour les focus */
.focus-ring:focus {
  outline: none;
  ring: 2px;
  ring-color: var(--golden);
  ring-offset: 2px;
  ring-offset-color: var(--primary-blue);
}

/* Styles pour les transitions */
.transition-all {
  transition: all 0.3s ease;
}

.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}

/* Styles pour les ombres */
.shadow-lore {
  box-shadow: 0 10px 25px rgba(13, 21, 26, 0.3);
}

.shadow-lore-lg {
  box-shadow: 0 20px 40px rgba(13, 21, 26, 0.4);
}

/* Styles pour les gradients */
.gradient-lore {
  background: linear-gradient(135deg, var(--primary-blue) 0%, #1a2332 100%);
}

.gradient-golden {
  background: linear-gradient(135deg, var(--golden) 0%, #d4a574 100%);
}

/* Styles pour les bordures */
.border-lore {
  border: 1px solid rgba(240, 234, 225, 0.2);
}

.border-golden {
  border: 1px solid var(--golden);
}

/* Styles pour les backgrounds */
.bg-lore {
  background-color: rgba(240, 234, 225, 0.1);
}

.bg-lore-dark {
  background-color: rgba(13, 21, 26, 0.8);
}

/* Styles pour les textes */
.text-lore {
  color: var(--light);
}

.text-lore-muted {
  color: rgba(240, 234, 225, 0.7);
}

.text-lore-subtle {
  color: rgba(240, 234, 225, 0.5);
}
```

---

## 🎯 PROMPT POUR CLAUDE

**Copiez ce prompt exact pour restaurer votre projet :**

```
Je veux restaurer mon projet Lore complet. Voici la sauvegarde complète :

[COLLER LE CONTENU DE SAUVEGARDE_COMPLETE_PROJET_LORE.md]

Peux-tu me recréer exactement ce projet avec :
1. Tous les fichiers dans la bonne structure
2. Les 40 univers avec toutes leurs données
3. Le design system complet (couleurs, polices)
4. Toutes les routes de navigation
5. Le flux complet de création de campagne
6. La page /campaigns avec le design d'il y a 3h

Commence par créer la structure de base et les fichiers principaux.
```

---

## ✅ CHECKLIST DE RESTAURATION

- [ ] Créer projet React + Vite
- [ ] Installer dépendances (React Router, Supabase, Tailwind, etc.)
- [ ] Configurer Tailwind avec couleurs personnalisées
- [ ] Créer structure de dossiers
- [ ] Copier tous les fichiers avec contenu exact
- [ ] Configurer Supabase
- [ ] Tester le flux complet
- [ ] Vérifier responsive design
- [ ] Tester les 40 univers
- [ ] Vérifier navigation entre pages

**Votre projet est maintenant entièrement sauvegardé ! 🎉**
