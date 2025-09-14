# 🎲 GUIDE TEST FONCTIONNALITÉS AVANCÉES - LORE

## ✅ **TESTS DES FONCTIONNALITÉS AVANCÉES**

### **📁 Fichiers de test créés :**
- ✅ **test-fonctionnalites-avancees.html** : Tests complets des fonctionnalités
- ✅ **GUIDE_TEST_FONCTIONNALITES_AVANCEES.md** : Guide de test détaillé

---

## 🚀 **LANCEMENT DU SERVEUR**

### **1. ✅ Lancement de npm start :**

```bash
npm start
```

**Résultat attendu :**
- ✅ Serveur démarré sur un port disponible (3000, 3001, 3002, etc.)
- ✅ Message : "VITE v4.5.14 ready in XXX ms"
- ✅ URL locale : http://localhost:XXXX/
- ✅ Hot Module Replacement (HMR) activé

---

## 🧪 **TESTS DÉTAILLÉS**

### **1. ✅ Test de la séparation univers connus/inconnus**

#### **Objectif :**
Vérifier que les univers sont correctement séparés en deux sections.

#### **Étapes de test :**
1. **Accéder à la page** : `/campaigns/create/universe`
2. **Vérifier les sections** :
   - Section "Univers déjà possédés" (si des univers possédés existent)
   - Section "Autres univers" (univers gratuits et payants)
3. **Vérifier la logique** :
   - Univers avec `type: "Déjà possédé"` dans la première section
   - Univers avec `type: "Gratuit"` ou `type: "Payant"` dans la seconde section

#### **Résultats attendus :**
- ✅ **Section "Univers déjà possédés"** : D&D 5e, D&D Moderne
- ✅ **Section "Autres univers"** : Tous les autres univers
- ✅ **Affichage conditionnel** : Sections vides non affichées
- ✅ **Titres corrects** : "Univers déjà possédés" et "Autres univers"

#### **Tests à effectuer :**
- [ ] **Page 1** : Vérifier la séparation sur la première page
- [ ] **Page 2** : Vérifier la séparation sur la deuxième page
- [ ] **Filtres** : Tester avec différents filtres actifs
- [ ] **Recherche** : Tester avec des termes de recherche

### **2. ✅ Test des tags sur chaque carte**

#### **Objectif :**
Vérifier que les tags s'affichent correctement selon le type d'univers.

#### **Types de tags à vérifier :**

**Tag "Gratuit" :**
- **Couleur** : Vert (#28a745)
- **Texte** : "Gratuit"
- **Univers** : Lasers & Feelings, Dungeon World, Lady Blackbird, etc.

**Tag "Déjà possédé" :**
- **Couleur** : Doré (#E9BD72)
- **Texte** : "Déjà possédé"
- **Univers** : D&D 5e, D&D Moderne

**Tag "Payant" :**
- **Couleur** : Noir (#0D151A)
- **Texte** : Prix en euros (ex: "49€", "40€")
- **Univers** : L5R, Pathfinder, Vampire, etc.

#### **Tests à effectuer :**
- [ ] **Affichage** : Tous les tags visibles
- [ ] **Couleurs** : Couleurs correctes selon le type
- [ ] **Position** : Tags en haut à gauche de chaque carte
- [ ] **Responsive** : Tags adaptés aux différentes tailles d'écran
- [ ] **Animation** : Effet de hover sur les tags

### **3. ✅ Test des filtres avec nouvelles données**

#### **Objectif :**
Vérifier que tous les filtres fonctionnent avec les 32 univers.

#### **Filtres par thème :**
- **Fantasy** : D&D 5e, Pathfinder, Forbidden Lands, etc.
- **Science-fiction** : Lasers & Feelings, Pax Ethica, Lady Blackbird
- **Horreur & Mystère** : Cthulhu, Vampire, Horror in Arkham
- **Autres** : Blades in the Dark, Aria, Microscope

#### **Filtres par prix :**
- **Gratuit** : Univers avec `type: "Gratuit"`
- **Gratuit avec achats facultatifs** : Nouveau type ajouté
- **Payant** : Univers avec `type: "Payant"`

#### **Filtres par difficulté :**
- **Débutant** : D&D 5e, Lasers & Feelings, Lady Blackbird
- **Intermédiaire** : Pathfinder, Blades in the Dark, Forbidden Lands
- **Expert** : L5R, Pax Ethica, Horror in Arkham

#### **Tests à effectuer :**
- [ ] **Filtres individuels** : Tester chaque filtre séparément
- [ ] **Combinaisons** : Tester plusieurs filtres simultanément
- [ ] **Reset** : Vérifier que les filtres se réinitialisent
- [ ] **Compteurs** : Vérifier le nombre d'univers filtrés
- [ ] **Pagination** : Vérifier que la pagination fonctionne avec les filtres

### **4. ✅ Test de navigation vers page d'informations**

#### **Objectif :**
Vérifier que le clic sur "En savoir plus" navigue correctement.

#### **Étapes de test :**
1. **Cliquer sur "En savoir plus"** sur n'importe quelle carte
2. **Vérifier l'URL** : `/campaigns/create/universe/:id/details`
3. **Vérifier la page** : Page UniverseDetails s'affiche
4. **Vérifier l'ID** : L'ID de l'univers est correct dans l'URL
5. **Tester le retour** : Bouton "Retour à la sélection"

#### **Tests à effectuer :**
- [ ] **Navigation** : URL correcte avec l'ID de l'univers
- [ ] **Page de destination** : UniverseDetails s'affiche
- [ ] **Données** : Informations de l'univers affichées
- [ ] **Retour** : Navigation de retour fonctionnelle
- [ ] **État** : L'état de la page précédente préservé

### **5. ✅ Test des types de prix**

#### **Objectif :**
Vérifier que tous les types de prix s'affichent correctement.

#### **Types de prix à tester :**

**Gratuit :**
- **Affichage** : Tag vert "Gratuit"
- **Univers** : Lasers & Feelings, Dungeon World, Lady Blackbird, Microscope
- **Prix** : `price: null`

**Payant :**
- **Affichage** : Tag noir avec le prix
- **Univers** : L5R (49€), Pathfinder (40€), Vampire (55€), etc.
- **Prix** : `price: number`

**Déjà possédé :**
- **Affichage** : Tag doré "Déjà possédé"
- **Univers** : D&D 5e, D&D Moderne
- **Prix** : Peut avoir un prix ou être null

#### **Tests à effectuer :**
- [ ] **Affichage** : Tous les types de prix visibles
- [ ] **Couleurs** : Couleurs correctes pour chaque type
- [ ] **Prix** : Montants affichés correctement
- [ ] **Filtrage** : Filtres par prix fonctionnels
- [ ] **Tri** : Tri par prix croissant/décroissant

### **6. ✅ Test de la pagination avec séparation**

#### **Objectif :**
Vérifier que la pagination fonctionne avec la séparation des univers.

#### **Logique de pagination :**
1. **Pagination d'abord** : 12 univers par page
2. **Séparation après** : Univers possédés et autres séparés
3. **Affichage conditionnel** : Sections vides non affichées

#### **Tests à effectuer :**
- [ ] **Page 1** : 12 univers (2 possédés + 10 autres)
- [ ] **Page 2** : 12 univers (0 possédés + 12 autres)
- [ ] **Page 3** : 8 univers (0 possédés + 8 autres)
- [ ] **Navigation** : Boutons Précédent/Suivant
- [ ] **Numéros** : Boutons de numéros de page
- [ ] **État actif** : Page courante mise en évidence
- [ ] **Boutons désactivés** : Précédent sur page 1, Suivant sur dernière page

### **7. ✅ Test responsive mobile**

#### **Objectif :**
Vérifier que l'interface s'adapte correctement aux écrans mobiles.

#### **Éléments à tester :**

**Sidebar :**
- **Mobile** : Pleine largeur, position normale
- **Desktop** : Largeur fixe (320px), position sticky
- **Collapsible** : Peut être masquée sur mobile

**Grille :**
- **Mobile** : 1 colonne
- **Tablet** : 2 colonnes
- **Desktop** : 3-6 colonnes selon la taille

**Pagination :**
- **Mobile** : Boutons adaptés au tactile
- **Desktop** : Boutons avec hover effects
- **Responsive** : Taille adaptée à l'écran

#### **Tests à effectuer :**
- [ ] **Sidebar mobile** : Pleine largeur, espacement correct
- [ ] **Grille mobile** : 1 colonne, cartes adaptées
- [ ] **Pagination mobile** : Boutons tactiles, espacement
- [ ] **Navigation mobile** : Menus et boutons accessibles
- [ ] **Touch** : Interactions tactiles fluides

### **8. ✅ Test des couleurs**

#### **Objectif :**
Vérifier que les couleurs correspondent à la charte graphique.

#### **Couleurs à vérifier :**

**Fond des cartes :**
- **Couleur** : #EEE1CB (beige clair)
- **Élément** : Background des UniverseCard

**Texte des cartes :**
- **Couleur** : #0D151A (noir)
- **Élément** : Titres, sous-titres, auteurs

**Tags :**
- **Gratuit** : #28a745 (vert)
- **Déjà possédé** : #E9BD72 (doré)
- **Payant** : #0D151A (noir)

**Éléments d'interface :**
- **Fond principal** : #46718A (bleu)
- **Texte principal** : #F0EAE1 (beige clair)
- **Accents** : #E9BD72 (doré)

#### **Tests à effectuer :**
- [ ] **Fond des cartes** : #EEE1CB visible
- [ ] **Texte des cartes** : #0D151A (noir) lisible
- [ ] **Contraste** : Bon contraste pour la lisibilité
- [ ] **Cohérence** : Couleurs uniformes sur toutes les cartes
- [ ] **Accessibilité** : Contraste suffisant pour l'accessibilité

---

## 📱 **TESTS RESPONSIVE DÉTAILLÉS**

### **Breakpoints à tester :**

**Mobile (320px - 639px) :**
- **Grille** : 1 colonne
- **Sidebar** : Pleine largeur, position normale
- **Pagination** : Boutons tactiles
- **Tags** : Taille adaptée

**Tablet (640px - 1023px) :**
- **Grille** : 2 colonnes
- **Sidebar** : Largeur fixe, position sticky
- **Pagination** : Boutons avec hover
- **Tags** : Taille normale

**Desktop (1024px+) :**
- **Grille** : 3-6 colonnes selon la taille
- **Sidebar** : Largeur fixe, position sticky
- **Pagination** : Boutons avec animations
- **Tags** : Taille normale avec hover effects

---

## 🎯 **CRITÈRES DE SUCCÈS**

### **Tests obligatoires :**
- ✅ **Séparation** : Univers possédés et autres séparés
- ✅ **Tags** : Tous les tags affichés avec les bonnes couleurs
- ✅ **Filtres** : Tous les filtres fonctionnels
- ✅ **Navigation** : Clic sur "En savoir plus" fonctionne
- ✅ **Prix** : Tous les types de prix affichés
- ✅ **Pagination** : Pagination avec séparation fonctionnelle
- ✅ **Mobile** : Interface responsive
- ✅ **Couleurs** : Couleurs de la charte graphique

### **Tests optionnels :**
- ✅ **Performance** : Chargement rapide
- ✅ **Accessibilité** : Navigation clavier
- ✅ **Animations** : Effets de hover fluides
- ✅ **Erreurs** : Aucune erreur dans la console

---

## 🚨 **PROBLÈMES COURANTS ET SOLUTIONS**

### **Problème : Séparation ne fonctionne pas**
**Solution :** Vérifier la logique de filtrage dans `SelectUniverse.jsx`

### **Problème : Tags ne s'affichent pas**
**Solution :** Vérifier les classes CSS et la logique conditionnelle

### **Problème : Filtres ne fonctionnent pas**
**Solution :** Vérifier la logique de filtrage et les données

### **Problème : Navigation ne fonctionne pas**
**Solution :** Vérifier les routes dans `App.jsx` et la navigation

### **Problème : Pagination incorrecte**
**Solution :** Vérifier la logique de pagination et de séparation

### **Problème : Responsive cassé**
**Solution :** Vérifier les classes Tailwind CSS

### **Problème : Couleurs incorrectes**
**Solution :** Vérifier les classes CSS et la charte graphique

---

## 📝 **RAPPORT DE TEST**

### **Template de rapport :**

```
=== RAPPORT DE TEST FONCTIONNALITÉS AVANCÉES ===

Date : [DATE]
Version : [VERSION]
Testeur : [NOM]

1. SÉPARATION UNIVERS CONNUS/INCONNUS
   - ✅/❌ Section "Univers déjà possédés" affichée
   - ✅/❌ Section "Autres univers" affichée
   - ✅/❌ Logique de séparation correcte
   - ✅/❌ Affichage conditionnel fonctionnel

2. TAGS SUR CHAQUE CARTE
   - ✅/❌ Tags "Gratuit" (vert) affichés
   - ✅/❌ Tags "Déjà possédé" (doré) affichés
   - ✅/❌ Tags "Payant" (noir) affichés
   - ✅/❌ Couleurs correctes

3. FILTRES AVEC NOUVELLES DONNÉES
   - ✅/❌ Filtres par thème fonctionnels
   - ✅/❌ Filtres par prix fonctionnels
   - ✅/❌ Filtres par difficulté fonctionnels
   - ✅/❌ Combinaisons de filtres fonctionnelles

4. NAVIGATION VERS PAGE D'INFORMATIONS
   - ✅/❌ Clic sur "En savoir plus" fonctionne
   - ✅/❌ URL correcte avec ID
   - ✅/❌ Page UniverseDetails s'affiche
   - ✅/❌ Retour fonctionnel

5. TYPES DE PRIX
   - ✅/❌ Type "Gratuit" affiché
   - ✅/❌ Type "Payant" avec prix affiché
   - ✅/❌ Type "Déjà possédé" affiché
   - ✅/❌ Prix corrects

6. PAGINATION AVEC SÉPARATION
   - ✅/❌ Pagination fonctionnelle
   - ✅/❌ Séparation maintenue
   - ✅/❌ Navigation Précédent/Suivant
   - ✅/❌ Numéros de page

7. RESPONSIVE MOBILE
   - ✅/❌ Sidebar adaptée
   - ✅/❌ Grille 1 colonne
   - ✅/❌ Pagination adaptée
   - ✅/❌ Touch-friendly

8. COULEURS
   - ✅/❌ Fond cartes #EEE1CB
   - ✅/❌ Texte cartes #0D151A
   - ✅/❌ Tags avec bonnes couleurs
   - ✅/❌ Contraste suffisant

RÉSULTAT GLOBAL : ✅/❌ SUCCÈS/ÉCHEC
```

---

**🎲 TESTS DES FONCTIONNALITÉS AVANCÉES PRÊTS !**

### **Instructions :**
1. **Lancez npm start**
2. **Accédez à http://localhost:XXXX/**
3. **Naviguez vers /campaigns/create/universe**
4. **Effectuez tous les tests listés**
5. **Remplissez le rapport de test**

**✨ Toutes les fonctionnalités avancées de LORE sont maintenant testables !**



