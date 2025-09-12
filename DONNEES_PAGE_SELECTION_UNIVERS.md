# DONNÉES PAGE SÉLECTION D'UNIVERS - PROJET LORE

## 📋 CONTEXTE GÉNÉRAL

**Fichier principal :** `src/pages/SelectUniverse.jsx`
**Route :** `/campaigns/create/universe`
**Serveur :** `http://localhost:3000/`

## 🎨 DESIGN SYSTEM LORE

### Couleurs principales :
- **Golden (Doré) :** `#E9BD72`
- **Primary Blue :** `#0D151A` 
- **Light :** `#F0EAE1`
- **Fond cartes :** `rgba(13, 21, 26, 0.7)`

### Background gradient :
```css
background: "from-slate-800 via-blue-900 to-slate-900"
```

## 🎮 STRUCTURE DES DONNÉES

### 1. Section "Univers déjà connus" (knownUniverses)
**4 jeux dans cette section, UN SEUL réellement possédé :**

```javascript
const knownUniverses = [
  {
    id: 'known-1',
    name: 'Dungeons & Dragons 5e',
    publisher: 'Wizards of the Coast',
    description: 'Manuel des joueurs - Système de jeu de rôle fantasy épique',
    themes: ['Fantasy'],
    rules: ['Libres'],
    difficulty: 'Débutant',
    price: 49.99,
    isOwned: true // SEUL RÉELLEMENT POSSÉDÉ
  },
  {
    id: 'known-2',
    name: 'Symbaroum Core Rulebook',
    publisher: 'Free League Publishing',
    description: 'Dark fantasy dans un monde mystérieux où la magie corrompt',
    themes: ['Fantasy'],
    rules: ['Libres'],
    difficulty: 'Intermédiaire',
    price: 45.99,
    isOwned: false // Pas réellement possédé
  },
  {
    id: 'known-3',
    name: 'Fate Core System',
    publisher: 'Evil Hat Productions',
    description: 'Système générique narratif flexible',
    themes: ['Générique'],
    rules: ['Libres'],
    difficulty: 'Intermédiaire',
    price: null,
    isOwned: false // Pas réellement possédé
  },
  {
    id: 'known-4',
    name: 'L\'Appel de Cthulhu - 7e Edition',
    publisher: 'Chaosium et Sans-Détour',
    description: 'Horreur cosmique et mystère dans les années 1920',
    themes: ['Horreur & Mystère'],
    rules: ['Libres'],
    difficulty: 'Expert',
    price: null,
    isOwned: false // Pas réellement possédé
  }
];
```

### 2. Section "Tous les univers" (allUniverses)
**40+ jeux avec 2 nouveaux ajoutés :**

```javascript
// Exemples de la structure complète
{ 
  id: 1, 
  name: "Dungeons & Dragons 5e", 
  description: "Manuel des joueurs - Système de jeu de rôle fantasy épique avec des règles complètes pour créer des aventures", 
  publisher: "Wizards of the Coast", 
  price: 49.99, 
  type: "paid", 
  themes: ["Fantasy"], 
  rules: ["Libres"], 
  difficulty: "Débutant", 
  image: "/images/dnd5e.jpg", 
  popularity: 95 
}

// 2 nouveaux jeux ajoutés :
{
  id: 'symbaroum-core',
  name: 'Symbaroum Core Rulebook',
  publisher: 'Free League Publishing',
  description: 'Système de jeu de rôle dark fantasy dans un monde mystérieux où la magie corrompt et transforme tout ce qu\'elle touche.',
  themes: ['Fantasy', 'Sombre'],
  rules: ['Libres'],
  difficulty: 'Intermédiaire',
  price: 45.99,
  type: 'owned',
  isOwned: true,
  image: '/images/symbaroum.jpg',
  popularity: 78
},
{
  id: 'fate-core',
  name: 'Fate Core System',
  publisher: 'Evil Hat Productions',
  description: 'Système générique narratif extrêmement flexible permettant de créer vos propres aventures dans n\'importe quel univers imaginable.',
    themes: ['Générique'],
  rules: ['Libres'],
  difficulty: 'Intermédiaire',
  price: null,
  type: 'owned',
  isOwned: true,
  image: '/images/fate-core.jpg',
  popularity: 82
}
```

## 🎯 COMPOSANT UNIVERSE CARD

### Structure actuelle :
```javascript
const UniverseCard = ({ universe, onClick, isKnown = false }) => {
  return (
    <div 
      onClick={() => onClick(universe.id)}
      className={`universe-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${isKnown ? 'border-l-4 border-green-500' : ''}`}
      style={{ backgroundColor: 'rgba(13, 21, 26, 0.7)' }}
    >
      {/* Zone image avec background pattern Lore */}
      <div className="universe-image-container relative h-48 overflow-hidden">
        {/* Background pattern SVG */}
        <div className="w-full h-full bg-white opacity-70 flex items-center justify-center"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '30px 30px'
             }}>
        </div>
        
        {/* Tags repositionnés sur l'image */}
        <div className="absolute top-2 right-2 z-10 universe-tags-container">
          <div className="flex flex-wrap gap-1 justify-end">
            {/* Badge "Possédé" - Pour section univers connus OU si réellement possédé */}
            {(isKnown || universe.isOwned) && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Possédé
              </span>
            )}
            
            {/* Tags thèmes - Doré Lore */}
            {universe.themes?.map((theme, index) => (
              <span key={`theme-${index}`} className="bg-[#E9BD72] text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {theme}
              </span>
            ))}
            
            {/* Tags règles - Bleu */}
            {universe.rules?.map((rule, index) => (
              <span key={`rule-${index}`} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {rule}
              </span>
            ))}
            
            {/* Tag difficulté - Violet */}
            {universe.difficulty && (
              <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                {universe.difficulty}
              </span>
            )}
            
            {/* Tag gratuit avec achats facultatifs - Orange */}
            {universe.hasOptionalPurchases && universe.price === null && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Achats optionnels
              </span>
            )}
            
            {/* Tag gratuit - Vert (seulement si pas déjà possédé et pas freemium) */}
            {universe.price === null && !isKnown && !universe.hasOptionalPurchases && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm whitespace-nowrap">
                Gratuit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contenu avec classes Lore originales */}
      <div className="universe-card-content p-4 flex flex-col h-40">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{universe.name}</h3>
        <p className="text-sm text-white/70 mb-2">{universe.publisher}</p>
        
        {/* Description */}
        <p className="universe-description text-xs text-white/60 flex-grow mb-2 line-clamp-2">
          {universe.description}
        </p>
        
        {/* Séparateur et prix */}
        <div className="universe-separator-section border-t border-white/20 pt-2 mt-auto">
          <div className="universe-price-row flex items-center justify-between">
            <div className="universe-price-content">
              <div className="universe-price-text font-semibold text-white text-sm">
                {isKnown ? "Déjà possédé" : 
                 universe.isOwned ? "Déjà possédé" : 
                 universe.type === 'freemium' ? "Gratuit avec achats facultatifs" :
                 universe.price === null ? "Gratuit" : `${universe.price} €`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## 🎨 CSS SPÉCIFIQUE

### Classes CSS Lore principales :
```css
/* Container principal de la carte */
.universe-card {
  min-height: 400px !important;
  max-width: 300px !important;
  width: 100% !important;
  display: flex;
  flex-direction: column;
}

.universe-image-container {
  height: 224px !important; /* h-56 */
}

.universe-card-content {
  height: 176px !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 1rem;
  flex-grow: 1;
}

/* Tags avec retour à la ligne */
.universe-tags-container {
  max-width: calc(100% - 32px);
  word-wrap: break-word;
}

.universe-tags-container .flex {
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
  gap: 0.25rem !important;
}

/* Espacement description */
.universe-description {
  margin-bottom: 0.5rem !important;
}

/* Distinction univers connus */
.universe-card.border-l-4 {
  border-left-width: 4px !important;
  border-left-color: #10b981 !important;
}

/* Grille responsive */
.universes-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  gap: 1.5rem !important;
}
```

## 🔧 LOGIQUE D'AFFICHAGE

### Tags sur l'image :
- **Badge "Possédé"** : Affiché SEULEMENT si `universe.isOwned === true`
- **Tags thèmes** : Doré Lore (`#E9BD72`)
- **Tags règles** : Bleu (`blue-500`)
- **Tag difficulté** : Violet (`purple-500`)
- **Tag gratuit** : Vert (seulement si `price === null` ET pas dans section connus)

### Prix :
- **"Déjà possédé"** : Si `universe.isOwned === true`
- **"Gratuit"** : Si `universe.price === null` ET pas possédé
- **Prix en euros** : Si `universe.price` existe ET pas possédé

### Indicateurs visuels :
- **Border gauche verte** : Pour tous les jeux de la section "Univers déjà connus" (`isKnown={true}`)
- **Badge "Possédé"** : Seulement pour les jeux réellement possédés (`isOwned: true`)

## 📱 RESPONSIVE

### Grilles :
- **Desktop** : 4 colonnes (`lg:grid-cols-4`)
- **Tablet** : 2 colonnes (`md:grid-cols-2`)
- **Mobile** : 1 colonne (`grid-cols-1`)

### Hauteurs adaptatives :
- **Desktop** : 400px min-height
- **Tablet** : 100px content height
- **Mobile** : 88px content height

## 🎯 ÉTAT ACTUEL

### ✅ Fonctionnalités implémentées :
- Section "Univers déjà connus" avec 4 jeux
- UN SEUL jeu réellement possédé (D&D 5e)
- Tags repositionnés sur l'image avec couleurs différenciées
- Design system Lore préservé
- Background pattern SVG subtil
- Indicateurs visuels pour univers connus
- Prix intelligent basé sur `isOwned`
- Grille responsive optimisée

### 🔧 Console.log pour débogage :
```javascript
console.log("Premier univers:", allUniverses[0]);
console.log("Univers connus:", knownUniverses);
console.log("Universe reçu:", universe);
```

## 📝 MODIFICATIONS RÉCENTES

### ✅ Corrections appliquées :

1. **Suppression plateformes non-JDR :**
   - ❌ Roll20 (id: 41) - Supprimé
   - ❌ Foundry VTT (id: 43) - Supprimé
   - ❌ D&D Beyond (id: 42) - Supprimé

2. **Ajout vrais JDR freemium :**
   - ✅ Pathfinder 2e (Version de base) (id: 44)
   - ✅ Starfinder (Règles de base) (id: 45)

3. **Filtres thèmes nettoyés :**
   - ❌ "Sombre" - Supprimé des filtres et des données
   - ❌ "Narratif" - Supprimé des filtres et des données
   - ❌ "Numérique" - Supprimé des filtres et des données
   - ✅ "Générique" - Déplacé avant "Autres"

4. **Logique d'affichage corrigée :**
   - ✅ Section "Univers déjà connus" masquée lors de la recherche
   - ✅ Tag "Possédé" affiché pour toutes les cartes de la section univers connus
   - ✅ Tag "Achats optionnels" (orange) pour jeux freemium
   - ✅ Tri par prix corrigé (jeux possédés ne sont plus en première position)

5. **Configuration Supabase :**
   - ✅ Fichier `src/lib/supabase.ts` recréé avec configuration temporaire

## 🚀 SERVEUR

**URL :** `http://localhost:3000/campaigns/create/universe`
**Commande :** `npm run dev`
**HMR :** Actif (Hot Module Replacement)

---

**Ce fichier contient toutes les données nécessaires pour comprendre et modifier la page sélection d'univers du projet Lore.**
