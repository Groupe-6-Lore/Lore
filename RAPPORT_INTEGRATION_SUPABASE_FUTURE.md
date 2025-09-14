# RAPPORT - INTÉGRATION SUPABASE FUTURE

## ÉTAPE 6: INTÉGRATION SUPABASE FUTURE ✅

### ✅ Structure préparée

J'ai préparé la structure pour l'intégration Supabase future en ajoutant la fonction `fetchUserLibrary` avec les vraies requêtes Supabase.

### ✅ Fonction fetchUserLibrary ajoutée

```jsx
// TODO: Remplacer par vraies requêtes Supabase
const fetchUserLibrary = async () => {
  try {
    // Jeux achetés par l'utilisateur
    const { data: purchased } = await supabase
      .from('user_purchases')
      .select('universe_id')
      .eq('user_id', user.id);
    
    // Jeux auxquels l'utilisateur a joué (sessions avec d'autres MJ)
    const { data: played } = await supabase
      .from('game_sessions')
      .select('universe_id')
      .eq('player_id', user.id)
      .neq('dm_id', user.id);
    
    setUserLibrary(purchased.map(p => p.universe_id));
    setUserPlayedGames(played.map(p => p.universe_id));
  } catch (error) {
    console.error('Erreur chargement bibliothèque:', error);
  }
};
```

### ✅ Structure des tables Supabase

#### **1. Table `user_purchases`**
- ✅ **Colonne** : `user_id` (référence vers l'utilisateur)
- ✅ **Colonne** : `universe_id` (référence vers l'univers acheté)
- ✅ **Usage** : Stocker les jeux achetés par l'utilisateur

#### **2. Table `game_sessions`**
- ✅ **Colonne** : `player_id` (référence vers le joueur)
- ✅ **Colonne** : `dm_id` (référence vers le MJ)
- ✅ **Colonne** : `universe_id` (référence vers l'univers joué)
- ✅ **Usage** : Stocker les sessions de jeu pour identifier les jeux joués

### ✅ Logique de requêtes

#### **1. Jeux achetés**
```jsx
const { data: purchased } = await supabase
  .from('user_purchases')
  .select('universe_id')
  .eq('user_id', user.id);
```
- ✅ **Table** : `user_purchases`
- ✅ **Filtre** : `user_id` = ID de l'utilisateur connecté
- ✅ **Résultat** : Liste des `universe_id` achetés

#### **2. Jeux joués avec d'autres MJ**
```jsx
const { data: played } = await supabase
  .from('game_sessions')
  .select('universe_id')
  .eq('player_id', user.id)
  .neq('dm_id', user.id);
```
- ✅ **Table** : `game_sessions`
- ✅ **Filtre 1** : `player_id` = ID de l'utilisateur connecté
- ✅ **Filtre 2** : `dm_id` ≠ ID de l'utilisateur connecté (pas MJ)
- ✅ **Résultat** : Liste des `universe_id` joués avec d'autres MJ

### ✅ Gestion des erreurs

```jsx
try {
  // Requêtes Supabase
} catch (error) {
  console.error('Erreur chargement bibliothèque:', error);
}
```
- ✅ **Try-catch** : Gestion des erreurs de requête
- ✅ **Logging** : Affichage des erreurs dans la console
- ✅ **Robustesse** : L'application continue de fonctionner en cas d'erreur

### ✅ useEffect modifié

#### **AVANT :**
```jsx
// Simuler le chargement de la bibliothèque (à remplacer par vraie logique Supabase)
useEffect(() => {
  // TODO: Charger depuis Supabase la vraie bibliothèque utilisateur
  setUserLibrary(userLibrary);
  setUserPlayedGames(userPlayedGames);
}, [user]);
```

#### **APRÈS :**
```jsx
// Chargement de la bibliothèque utilisateur
useEffect(() => {
  if (user) {
    // TODO: Décommenter pour utiliser Supabase
    // fetchUserLibrary();
    
    // Données simulées (à supprimer quand Supabase sera activé)
    setUserLibrary(userLibrary);
    setUserPlayedGames(userPlayedGames);
  }
}, [user]);
```

### ✅ Avantages de cette approche

#### **1. Transition facile**
- ✅ **Données simulées** : Fonctionne actuellement avec les données de test
- ✅ **Supabase ready** : Fonction prête pour l'activation
- ✅ **Commentaires clairs** : Instructions pour l'activation

#### **2. Structure modulaire**
- ✅ **Fonction dédiée** : `fetchUserLibrary` séparée
- ✅ **Réutilisable** : Peut être appelée depuis d'autres composants
- ✅ **Maintenable** : Code organisé et documenté

#### **3. Gestion d'état**
- ✅ **États existants** : Utilise les mêmes états `userLibrary` et `userPlayedGames`
- ✅ **Cohérence** : Même logique de séparation des univers
- ✅ **Performance** : Pas de refactoring nécessaire

### ✅ Activation future

#### **Pour activer Supabase :**
1. ✅ **Décommenter** : `// fetchUserLibrary();`
2. ✅ **Commenter** : Les lignes de données simulées
3. ✅ **Importer** : Le client Supabase
4. ✅ **Configurer** : Les variables d'environnement

#### **Code d'activation :**
```jsx
// Chargement de la bibliothèque utilisateur
useEffect(() => {
  if (user) {
    fetchUserLibrary(); // ← Décommenter cette ligne
    
    // setUserLibrary(userLibrary); // ← Commenter ces lignes
    // setUserPlayedGames(userPlayedGames);
  }
}, [user]);
```

### ✅ Structure de base de données recommandée

#### **Table `user_purchases`**
```sql
CREATE TABLE user_purchases (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  universe_id INTEGER REFERENCES universes(id),
  purchase_date TIMESTAMP DEFAULT NOW(),
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **Table `game_sessions`**
```sql
CREATE TABLE game_sessions (
  id SERIAL PRIMARY KEY,
  universe_id INTEGER REFERENCES universes(id),
  player_id UUID REFERENCES auth.users(id),
  dm_id UUID REFERENCES auth.users(id),
  session_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### ✅ Vérifications effectuées

1. **Fonction ajoutée** : ✅ `fetchUserLibrary` implémentée
2. **Requêtes Supabase** : ✅ Structure des requêtes définie
3. **Gestion d'erreurs** : ✅ Try-catch ajouté
4. **useEffect modifié** : ✅ Logique de chargement mise à jour
5. **Linting** : ✅ Aucune erreur détectée

### ✅ Résultat

- ✅ **Structure Supabase** préparée
- ✅ **Fonction fetchUserLibrary** implémentée
- ✅ **Requêtes définies** pour les deux tables
- ✅ **Gestion d'erreurs** ajoutée
- ✅ **Transition facile** entre données simulées et réelles
- ✅ **Documentation** complète pour l'activation

**L'intégration Supabase future est maintenant préparée !** 🚀✨

### 📝 Note

Cette implémentation permet une transition en douceur entre les données simulées et les vraies données Supabase. Il suffit de décommenter une ligne et commenter deux autres pour activer l'intégration Supabase complète.



