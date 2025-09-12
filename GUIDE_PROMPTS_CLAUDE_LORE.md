# 🤖 GUIDE PROMPTS CLAUDE - PROJET LORE
**Date :** 11 Septembre 2025  
**Objectif :** Aider Claude à comprendre et modifier le projet Lore efficacement

---

## 📋 **CONTEXTE DU PROJET**

### **🎮 Application :** Lore - Gestionnaire de Campagnes JDR
- **Framework :** React + Vite
- **Styling :** Tailwind CSS avec design system personnalisé
- **Base de données :** Supabase
- **Authentification :** Supabase Auth
- **Navigation :** React Router DOM

### **🎯 Fonctionnalités principales :**
- ✅ **Authentification** (connexion/inscription)
- ✅ **Gestion des campagnes** (création, affichage, accès)
- ✅ **Sélection d'univers** (40 univers avec filtres et recherche)
- ✅ **Pages d'informations** détaillées pour chaque univers
- ✅ **Design responsive** mobile et desktop
- ✅ **Système de navigation** complet entre toutes les pages

---

## 🗂️ **STRUCTURE DES FICHIERS**

### **📁 Pages principales :**
```
src/pages/
├── CampaignSelection.jsx     # Page "Mes campagnes"
├── CreateCampaign.jsx        # Page de création de campagne
├── SelectUniverse.jsx        # Page sélection univers (40 univers) ⭐
├── UniverseInfo.jsx          # Page détails univers
├── UniverseDetails.jsx       # Page détails univers (placeholder)
├── ConfigureCampaign.jsx     # Page configuration finale
├── ExtensionDetails.jsx      # Page détails extensions
└── Dashboard.jsx             # Dashboard principal
```

### **📁 Composants :**
```
src/components/
├── auth/
│   └── AuthPage.jsx          # Page de connexion/inscription
└── modals/
    └── AddPlayerModal.jsx    # Modale ajout joueur
```

### **📁 Configuration :**
```
src/
├── App.jsx                   # Routes principales
├── hooks/
│   └── useAuth.jsx          # Hook d'authentification
├── lib/
│   └── supabase.js          # Configuration Supabase
├── utils/
│   └── supabase.js          # Utilitaires Supabase
└── styles/
    └── globals.css          # Styles Tailwind personnalisés ⭐
```

---

## 🎨 **DESIGN SYSTEM**

### **🎨 Couleurs principales :**
```css
:root {
  --primary-blue: #0D151A;    /* Bleu foncé principal */
  --light: #F0EAE1;           /* Beige clair */
  --golden: #E9BD72;          /* Or */
  --dark: #0D151A;            /* Noir */
  --slate: #64748B;           /* Gris ardoise */
  --amber: #F59E0B;           /* Ambre */
}
```

### **🔤 Typographies :**
- **`eagle-lake-font`** : Pour les titres principaux
- **`calligraphy-font`** : Pour les sous-titres
- **`noto-sans-font`** : Pour le texte courant

---

## 🎮 **DONNÉES DES 40 UNIVERS**

### **📊 Structure des données :**
```javascript
{
  id: 1,
  name: "Dungeons & Dragons 5e",
  description: "Manuel des joueurs - Système de jeu de rôle fantasy épique...",
  publisher: "Wizards of the Coast",
  price: 49.99,
  type: "paid", // "paid", "free", "freemium", "owned"
  isOwned: false,
  hasOptionalPurchases: false,
  themes: ["Fantasy"],
  rules: ["Libres"],
  difficulty: "Débutant",
  image: "/images/dnd5e.jpg",
  popularity: 95
}
```

### **📊 Répartition des univers :**
- **4 univers "Déjà possédé"** (type: "owned")
- **8 univers "Gratuit"** (type: "free", price: null)
- **28 univers "Payant"** (type: "paid", price: 25-60€)
- **0 univers "Freemium"** (type: "freemium") - Structure prête

---

## 🎯 **PAGE SELECTUNIVERSE.JSX - ÉTAT ACTUEL**

### **✅ Corrections récentes appliquées :**

**1. Structure HTML harmonisée :**
```jsx
const UniverseCard = ({ universe, onClick, isKnown = false }) => {
  return (
    <div className="universe-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      {/* Structure IDENTIQUE pour toutes les cartes */}
    </div>
  );
};
```

**2. Propriétés des données :**
- `universe.name` (au lieu de title)
- `universe.publisher` (au lieu de author)
- `universe.description` (au lieu de subtitle)

**3. CSS d'alignement parfait :**
```css
.universe-card {
  min-height: 380px;
  display: flex;
  flex-direction: column;
}

.universe-description {
  margin-bottom: 1.5rem !important;
  flex-grow: 1;
  min-height: 2.5rem;
}

.universe-separator-section {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.75rem;
  margin-top: auto; /* Pousse automatiquement vers le bas */
}

.universe-price-row {
  min-height: 24px; /* HAUTEUR FIXE POUR MÊME NIVEAU */
}
```

---

## 🚀 **PROMPTS CLAUDE EFFICACES**

### **📝 Pour modifier la page SelectUniverse :**

```
"Dans le projet Lore, je veux modifier la page SelectUniverse.jsx :

CONTEXTE :
- Fichier : src/pages/SelectUniverse.jsx
- Composant principal : UniverseCard
- 40 univers avec données : name, publisher, description, price, type
- CSS d'alignement : universe-card, universe-description, universe-separator-section

MODIFICATION DEMANDÉE :
[Votre modification ici]

CONTRAINTES :
- Garder l'alignement parfait des cartes
- Respecter le design system (couleurs golden, primary-blue, light)
- Maintenir la structure responsive (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Préserver les classes CSS d'alignement existantes"
```

### **📝 Pour ajouter des fonctionnalités :**

```
"Dans le projet Lore, je veux ajouter une fonctionnalité :

CONTEXTE :
- Application React + Vite + Tailwind CSS
- Design system : couleurs golden (#E9BD72), primary-blue (#0D151A), light (#F0EAE1)
- Structure : src/pages/, src/components/, src/styles/globals.css
- Serveur : npm run dev sur port 3001

FONCTIONNALITÉ :
[Votre fonctionnalité ici]

EXIGENCES :
- Respecter le design system existant
- Maintenir la cohérence visuelle
- Ajouter les styles dans globals.css si nécessaire
- Tester la responsivité mobile/desktop"
```

### **📝 Pour corriger des problèmes :**

```
"Dans le projet Lore, j'ai un problème :

CONTEXTE :
- Serveur actif sur http://localhost:3001
- Page concernée : [nom de la page]
- Fichier : [chemin du fichier]

PROBLÈME :
[Description du problème]

INFORMATIONS UTILES :
- Design system : golden, primary-blue, light
- Structure responsive : grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- CSS personnalisé dans src/styles/globals.css
- Données des univers : name, publisher, description, price, type"
```

---

## 🔧 **COMMANDES UTILES**

### **🚀 Démarrage du serveur :**
```bash
npm run dev
# Serveur sur http://localhost:3000 ou 3001
```

### **📁 Fichiers importants à connaître :**
- `src/pages/SelectUniverse.jsx` - Page principale avec 40 univers
- `src/styles/globals.css` - Styles Tailwind personnalisés
- `src/App.jsx` - Routes de navigation
- `SAUVEGARDE_COMPLETE_PROJET_LORE.md` - Sauvegarde complète

### **🎯 URLs de test :**
- **Page principale :** `http://localhost:3001`
- **Sélection univers :** `http://localhost:3001/campaigns/create/universe`
- **Mes campagnes :** `http://localhost:3001/campaigns`

---

## 📋 **CHECKLIST POUR CLAUDE**

### **✅ Avant de modifier :**
- [ ] Lire le fichier concerné
- [ ] Comprendre la structure des données
- [ ] Vérifier les classes CSS existantes
- [ ] Respecter le design system

### **✅ Pendant la modification :**
- [ ] Garder l'alignement des cartes
- [ ] Maintenir la responsivité
- [ ] Utiliser les couleurs du design system
- [ ] Tester sur mobile/desktop

### **✅ Après la modification :**
- [ ] Vérifier que le serveur fonctionne
- [ ] Tester l'alignement visuel
- [ ] Vérifier la responsivité
- [ ] Mettre à jour la sauvegarde si nécessaire

---

## 🎉 **ÉTAT ACTUEL DU PROJET**

**✅ Fonctionnalités opérationnelles :**
- **40 cartes d'univers** toutes fonctionnelles
- **Pagination** : 12 items par page (4 pages total)
- **Filtres** : Thèmes, règles, prix, difficulté
- **Recherche** : Par nom et éditeur
- **Tri** : Popularité, alphabétique, prix
- **Responsive** : 1-4 colonnes selon la taille d'écran
- **Alignement parfait** : Séparateur et prix à la même hauteur

**✅ Serveur fonctionnel :**
- **Port** : 3001 (ou 3000 si disponible)
- **Commande** : `npm run dev`
- **URL** : `http://localhost:3001/campaigns/create/universe`

**Le projet est prêt pour la production !** 🎉
