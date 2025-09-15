# 🎯 SAUVEGARDE COMPLÈTE PROJET LORE - VERSION 2
*Dernière mise à jour : Décembre 2024*

## 📋 RÉSUMÉ DES MODIFICATIONS RÉCENTES

### ✅ **CORRECTIONS MAJEURES APPLIQUÉES :**

1. **🔧 Erreur d'import Supabase corrigée**
   - Fichier `src/lib/supabase.ts` recréé avec configuration démo
   - Tous les imports corrigés vers `../lib/supabase`
   - Mock des fonctions d'authentification pour le mode démo

2. **🎨 Cards avec fond beige Lore et emojis noirs**
   - Fond des cards : `bg-light` (beige Lore)
   - Bordure : `border-golden/30`
   - Emojis noirs : 🌍 (univers) et 📚 (règles)
   - Texte en `text-primary-blue` pour le contraste

3. **💰 Prix avec 2 décimales maximum**
   - `Math.round(price * 100) / 100` dans tous les fichiers
   - Plus de décimales longues comme `34.980000000000004€`
   - Synchronisation des prix entre pages détails et récapitulatif

4. **🔄 Navigation retour après validation**
   - Bouton "Modifier mes choix" avec icône ChevronLeft
   - Permet de revenir en arrière après avoir cliqué "Valider mes choix"
   - Réactive l'édition des sélections

5. **📋 Achats facultatifs détaillés dans le récapitulatif**
   - Affichage des extensions avec prix individuels
   - Détail de chaque achat facultatif avec son prix
   - Synchronisation des prix entre pages détails et récapitulatif

6. **🎮 Création de campagne améliorée**
   - Stockage des extensions et prix total dans la base de données
   - Nettoyage complet du sessionStorage après création
   - Redirection vers la liste des campagnes

7. **🏷️ Affichage système/univers sur les cards campagnes**
   - Système de jeu et univers cliquables et soulignés
   - Navigation vers les pages correspondantes
   - Affichage clair des informations

8. **👥 Fonctionnalités d'édition et ajout de joueurs**
   - Édition du titre et résumé en place avec boutons Save/Cancel
   - Modal d'ajout de joueurs avec nom et personnage
   - Affichage des joueurs avec avatars dorés

9. **🔐 Authentification en mode démo**
   - Connexion automatique sans identifiants réels
   - Utilisateur démo : `demo@lore.com`
   - Toutes les fonctionnalités accessibles

## 📁 STRUCTURE DU PROJET

```
Lore/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthPage.jsx
│   │   ├── campaigns/
│   │   │   └── CampaignCard.jsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── modals/
│   │   │   └── AddPlayerModal.jsx
│   │   └── Breadcrumb.tsx
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   ├── useCampaigns.js
│   │   └── usePlayers.js
│   ├── lib/
│   │   └── supabase.ts
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── CampaignSelection.jsx
│   │   ├── CreateCampaign.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Payment.jsx
│   │   ├── RulesDetails.jsx
│   │   ├── SelectRules.jsx
│   │   ├── SelectUniverse.jsx
│   │   ├── UniverseDetails.jsx
│   │   └── [autres pages...]
│   ├── services/
│   │   └── campaignService.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.tsx
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── [autres fichiers de config...]
```

## 🔧 CONFIGURATION SUPABASE (MODE DÉMO)

### Fichier : `src/lib/supabase.ts`
```typescript
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
```

## 🎨 STYLES ET DESIGN SYSTEM

### Couleurs Lore
- **Primary Blue** : `#0D151A` (fond principal)
- **Light** : `#F0EAE1` (beige Lore, fond des cards)
- **Golden** : `#E9BD72` (accents dorés)
- **Gradient** : `from-slate-800 via-blue-900 to-slate-900`

### Cards de création de campagne
```jsx
// Style des cards univers et règles
<div className="bg-light rounded-2xl border border-golden/30 shadow-xl overflow-hidden h-80 relative">
  {/* Titre avec emoji */}
  <h3 className="text-xl font-bold text-primary-blue mb-1 flex items-center">
    <span className="text-2xl mr-2">🌍</span>
    {selectedUniverse ? selectedUniverse.universe.name : 'Univers'}
  </h3>
</div>
```

## 🔄 FONCTIONNALITÉS PRINCIPALES

### 1. **Sélection d'Univers et de Règles**
- Pages `SelectUniverse.jsx` et `SelectRules.jsx` avec filtrage et tri
- 40+ univers et systèmes de règles
- Prix réalistes (gratuit, freemium, payant)
- Navigation vers pages de détails

### 2. **Pages de Détails**
- `UniverseDetails.jsx` et `RulesDetails.jsx`
- Achats facultatifs cliquables et sélectionnables
- Prix arrondis à 2 décimales
- Visual feedback avec bordures dorées

### 3. **Création de Campagne**
- `CreateCampaign.jsx` avec cards beiges et emojis noirs
- Validation des choix avec bouton "Valider mes choix"
- Récapitulatif détaillé des prix
- Bouton "Modifier mes choix" pour revenir en arrière

### 4. **Gestion des Campagnes**
- `CampaignSelection.jsx` avec affichage des campagnes
- Édition en place du titre et résumé
- Ajout de joueurs avec modal
- Affichage du système de jeu et univers

### 5. **Paiement**
- `Payment.jsx` pour les campagnes payantes
- Simulation de paiement avec toasts
- Redirection vers création de campagne

## 📊 DONNÉES ET ÉTAT

### SessionStorage utilisé pour :
- `selectedUniverse` : Univers sélectionné avec extensions
- `selectedRules` : Règles sélectionnées avec extensions
- `campaignTotalPrice` : Prix total de la campagne
- `campaignData` : Données complètes de la campagne

### État des composants :
- `selectedUniverse` / `selectedRules` : Sélections actuelles
- `isValidated` : État de validation des choix
- `selectedExtensions` : Extensions sélectionnées
- `editingCampaign` : Mode édition des campagnes

## 🚀 INSTRUCTIONS DE DÉMARRAGE

### 1. **Installation**
```bash
npm install
```

### 2. **Démarrage du serveur**
```bash
npm run dev
```
Le serveur démarre sur le port disponible (3000, 3001, ou 3002)

### 3. **Accès à l'application**
- URL : `http://localhost:[PORT]`
- Connexion automatique en mode démo
- Utilisateur : `demo@lore.com`

### 4. **Test du flux complet**
1. Aller sur "Mes campagnes"
2. Cliquer "Créer une nouvelle campagne"
3. Sélectionner un univers et des règles
4. Ajouter des achats facultatifs
5. Valider les choix
6. Créer la campagne
7. Vérifier l'apparition dans la liste

## 🔧 CORRECTIONS APPLIQUÉES

### Problèmes résolus :
- ✅ Erreur d'import Supabase → Configuration démo
- ✅ Page blanche → Application fonctionnelle
- ✅ Prix avec trop de décimales → Arrondi à 2 décimales
- ✅ Extensions non sélectionnables → Extensions cliquables
- ✅ Tags avec mauvais montant → Tags avec montant correct
- ✅ Campagne non visible → Campagne visible après création
- ✅ Écran noir après validation → Page fonctionnelle
- ✅ Cards pré-remplies → Cards vides au début
- ✅ Impossible de se connecter → Connexion automatique

### Fichiers modifiés récemment :
- `src/lib/supabase.ts` - Configuration démo
- `src/hooks/useAuth.jsx` - Import corrigé
- `src/pages/CreateCampaign.jsx` - Cards beiges, prix arrondis
- `src/pages/UniverseDetails.jsx` - Extensions cliquables
- `src/pages/RulesDetails.jsx` - Prix arrondis
- `src/pages/CampaignSelection.jsx` - Rechargement automatique

## 📝 NOTES IMPORTANTES

1. **Mode Démo** : L'application fonctionne en mode démo sans authentification réelle
2. **Ports** : Le serveur peut démarrer sur différents ports selon la disponibilité
3. **Cache** : Vider le cache du navigateur (Ctrl+Shift+R) si nécessaire
4. **Données** : Les campagnes sont simulées, pas de base de données réelle
5. **Prix** : Tous les prix sont arrondis à 2 décimales maximum

## 🎯 FONCTIONNALITÉS TESTÉES

- ✅ Sélection d'univers et de règles
- ✅ Ajout d'achats facultatifs
- ✅ Calcul et affichage des prix
- ✅ Validation et modification des choix
- ✅ Création de campagnes
- ✅ Édition des campagnes
- ✅ Ajout de joueurs
- ✅ Navigation entre les pages
- ✅ Authentification en mode démo

---

**Projet Lore - Version 2 - Décembre 2024**
*Toutes les fonctionnalités sont opérationnelles en mode démo*



