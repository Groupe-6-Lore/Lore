# 🎲 GUIDE TEST COMPLET - PAGE SÉLECTION D'UNIVERS

## ✅ **TESTS À EFFECTUER POUR VALIDATION COMPLÈTE**

### **📁 Fichier testé :**
- ✅ **src/pages/SelectUniverse.jsx** : Page de sélection d'univers avec filtres et bibliothèque

---

## 🧪 **PLAN DE TEST COMPLET**

### **1. ✅ TEST DES FILTRES INDIVIDUELS**

#### **A. Filtres par thème :**
- [ ] **Fantasy** : Vérifier que seuls les univers Fantasy s'affichent
- [ ] **Science-fiction** : Vérifier que seuls les univers SF s'affichent
- [ ] **Horreur & Mystère** : Vérifier que seuls les univers d'horreur s'affichent
- [ ] **Historique & Réaliste** : Vérifier que seuls les univers historiques s'affichent
- [ ] **Comédie & Parodique** : Vérifier que seuls les univers comiques s'affichent
- [ ] **Autres** : Vérifier que seuls les univers "Autres" s'affichent

#### **B. Filtres par règles :**
- [ ] **Lidées** : Vérifier que seuls les univers avec règles "Lidées" s'affichent
- [ ] **Libres** : Vérifier que seuls les univers avec règles "Libres" s'affichent

#### **C. Filtres par prix :**
- [ ] **Gratuit** : Vérifier que seuls les univers gratuits s'affichent
- [ ] **Gratuit avec achats facultatifs** : Vérifier que seuls les univers avec achats facultatifs s'affichent
- [ ] **Payant** : Vérifier que seuls les univers payants s'affichent

#### **D. Filtres par difficulté :**
- [ ] **Débutant** : Vérifier que seuls les univers pour débutants s'affichent
- [ ] **Intermédiaire** : Vérifier que seuls les univers intermédiaires s'affichent
- [ ] **Expert** : Vérifier que seuls les univers pour experts s'affichent

### **2. ✅ TEST DES COMBINAISONS DE FILTRES**

#### **A. Combinaisons de 2 filtres :**
- [ ] **Fantasy + Gratuit** : Vérifier l'intersection des deux filtres
- [ ] **Science-fiction + Payant** : Vérifier l'intersection des deux filtres
- [ ] **Horreur + Expert** : Vérifier l'intersection des deux filtres
- [ ] **Historique + Intermédiaire** : Vérifier l'intersection des deux filtres

#### **B. Combinaisons de 3 filtres :**
- [ ] **Fantasy + Gratuit + Débutant** : Vérifier l'intersection des trois filtres
- [ ] **Science-fiction + Payant + Expert** : Vérifier l'intersection des trois filtres
- [ ] **Horreur + Gratuit + Intermédiaire** : Vérifier l'intersection des trois filtres

#### **C. Combinaisons de 4 filtres :**
- [ ] **Fantasy + Libres + Gratuit + Débutant** : Vérifier l'intersection des quatre filtres
- [ ] **Science-fiction + Lidées + Payant + Expert** : Vérifier l'intersection des quatre filtres

### **3. ✅ TEST DE LA RECHERCHE EN TEMPS RÉEL**

#### **A. Recherche par titre :**
- [ ] **"Dungeons"** : Vérifier que D&D 5e et D&D Moderne s'affichent
- [ ] **"Pathfinder"** : Vérifier que Pathfinder 2e s'affiche
- [ ] **"Cthulhu"** : Vérifier que L'Appel de Cthulhu s'affiche
- [ ] **"L5R"** : Vérifier que Legend of the Five Rings s'affiche

#### **B. Recherche par auteur :**
- [ ] **"Wizards"** : Vérifier que les jeux Wizards of the Coast s'affichent
- [ ] **"Chaosium"** : Vérifier que les jeux Chaosium s'affichent
- [ ] **"Free League"** : Vérifier que les jeux Free League s'affichent

#### **C. Recherche avec filtres actifs :**
- [ ] **"D&D" + Filtre Fantasy** : Vérifier que la recherche fonctionne avec les filtres
- [ ] **"Gratuit" + Filtre Gratuit** : Vérifier la cohérence des résultats

### **4. ✅ TEST DU TRI**

#### **A. Tri par popularité (défaut) :**
- [ ] Vérifier que les univers sont triés par popularité décroissante
- [ ] Vérifier que D&D 5e (95) est en premier
- [ ] Vérifier que L'Appel de Cthulhu (92) est en deuxième

#### **B. Tri alphabétique :**
- [ ] Vérifier que les univers sont triés par ordre alphabétique
- [ ] Vérifier que "Blades in the Dark" est en premier
- [ ] Vérifier que "Wanderhome" est en dernier

#### **C. Tri par prix croissant :**
- [ ] Vérifier que les univers gratuits sont en premier
- [ ] Vérifier que les univers payants sont triés par prix croissant
- [ ] Vérifier que "Lasers & Feelings" (gratuit) est en premier

#### **D. Tri par prix décroissant :**
- [ ] Vérifier que les univers payants sont triés par prix décroissant
- [ ] Vérifier que "D&D 5e" (49.99€) est en premier
- [ ] Vérifier que les univers gratuits sont en dernier

### **5. ✅ TEST DE LA PAGINATION**

#### **A. Navigation entre pages :**
- [ ] Vérifier que la pagination s'affiche quand il y a plus de 12 univers
- [ ] Cliquer sur "Suivant" : Vérifier le passage à la page 2
- [ ] Cliquer sur "Précédent" : Vérifier le retour à la page 1
- [ ] Cliquer sur un numéro de page : Vérifier le saut direct

#### **B. Pagination avec filtres :**
- [ ] Appliquer un filtre qui réduit les résultats : Vérifier que la pagination se met à jour
- [ ] Appliquer un filtre qui élimine tous les résultats : Vérifier qu'aucune pagination ne s'affiche
- [ ] Appliquer un filtre qui donne exactement 12 résultats : Vérifier qu'aucune pagination ne s'affiche

#### **C. Pagination avec recherche :**
- [ ] Rechercher "D&D" : Vérifier que la pagination se met à jour
- [ ] Rechercher un terme qui donne 1 résultat : Vérifier qu'aucune pagination ne s'affiche
- [ ] Rechercher un terme qui donne 25 résultats : Vérifier que 3 pages s'affichent

### **6. ✅ TEST DES EFFETS HOVER**

#### **A. Effets sur les cartes :**
- [ ] **Hover sur une carte** : Vérifier l'effet de scale (105%)
- [ ] **Hover sur une carte** : Vérifier l'augmentation de l'ombre
- [ ] **Hover sur une carte** : Vérifier l'overlay sombre sur l'image
- [ ] **Hover sur une carte** : Vérifier la transition fluide (300ms)

#### **B. Effets sur les boutons :**
- [ ] **Hover sur "En savoir plus"** : Vérifier le changement de couleur (golden)
- [ ] **Hover sur "Choisir cet univers"** : Vérifier le changement d'opacité (80%)
- [ ] **Hover sur les boutons** : Vérifier les transitions fluides

#### **C. Effets sur les éléments d'interface :**
- [ ] **Hover sur les filtres** : Vérifier les changements de couleur
- [ ] **Hover sur la pagination** : Vérifier les changements de couleur
- [ ] **Hover sur les icônes** : Vérifier les changements de couleur

### **7. ✅ TEST DE LA NAVIGATION**

#### **A. Navigation vers les détails :**
- [ ] Cliquer sur "En savoir plus sur cet univers" : Vérifier la navigation vers `/campaigns/create/universe/{id}/details`
- [ ] Vérifier que l'ID de l'univers est correct dans l'URL
- [ ] Vérifier que la page de détails s'affiche correctement
- [ ] Cliquer sur "Retour à la sélection" : Vérifier le retour à la page de sélection

#### **B. Navigation vers la configuration :**
- [ ] Cliquer sur "Choisir cet univers" : Vérifier la navigation vers `/campaigns/create/configure`
- [ ] Vérifier que l'univers sélectionné est passé en state
- [ ] Vérifier que la page de configuration s'affiche correctement
- [ ] Vérifier que le titre de l'univers sélectionné s'affiche
- [ ] Cliquer sur "Retour à la sélection" : Vérifier le retour à la page de sélection

#### **C. Navigation breadcrumb :**
- [ ] Cliquer sur "Mes campagnes" : Vérifier la navigation vers `/campaigns`
- [ ] Vérifier que le breadcrumb "Créer une campagne" est actif

### **8. ✅ TEST RESPONSIVE**

#### **A. Test sur mobile (320px-640px) :**
- [ ] **Grille** : Vérifier 1 colonne
- [ ] **Sidebar** : Vérifier qu'elle prend toute la largeur
- [ ] **Header** : Vérifier que le logo et les icônes sont plus petits
- [ ] **Recherche** : Vérifier qu'elle prend toute la largeur
- [ ] **Boutons** : Vérifier qu'ils sont empilés verticalement
- [ ] **Texte boutons** : Vérifier qu'ils sont courts ("En savoir plus", "Choisir")
- [ ] **Pagination** : Vérifier que les boutons sont plus petits

#### **B. Test sur tablet (640px-1024px) :**
- [ ] **Grille** : Vérifier 2 colonnes
- [ ] **Sidebar** : Vérifier qu'elle prend toute la largeur
- [ ] **Recherche** : Vérifier qu'elle prend toute la largeur
- [ ] **Boutons** : Vérifier qu'ils sont côte à côte
- [ ] **Texte boutons** : Vérifier qu'ils sont courts

#### **C. Test sur desktop (1024px+) :**
- [ ] **Grille** : Vérifier 3+ colonnes
- [ ] **Sidebar** : Vérifier qu'elle est sticky et à gauche
- [ ] **Header** : Vérifier que le logo et les icônes sont en taille normale
- [ ] **Recherche** : Vérifier qu'elle a une largeur fixe (320px)
- [ ] **Boutons** : Vérifier qu'ils sont côte à côte
- [ ] **Texte boutons** : Vérifier qu'ils sont longs ("En savoir plus sur cet univers", "Choisir cet univers")

#### **D. Test sur large desktop (1280px+) :**
- [ ] **Grille** : Vérifier 4+ colonnes
- [ ] **Espacement** : Vérifier que l'espacement est optimal

#### **E. Test sur extra large (1536px+) :**
- [ ] **Grille** : Vérifier 6 colonnes
- [ ] **Espacement** : Vérifier l'utilisation optimale de l'espace

---

## 📊 **DONNÉES DE TEST ATTENDUES**

### **Univers par thème :**
- **Fantasy** : 8 univers (D&D 5e, D&D Moderne, L'Univers Héroïque, Pathfinder 2e, Dungeon World, Blades in the Dark, The One Ring, Wanderhome)
- **Science-fiction** : 4 univers (Lasers & Feelings, Star Wars, Cyberpunk Red, Traveller)
- **Horreur & Mystère** : 3 univers (L'Appel de Cthulhu, Vampire: The Masquerade, Delta Green)
- **Historique & Réaliste** : 2 univers (Legend of the Five Rings, Call of Cthulhu)
- **Comédie & Parodique** : 2 univers (Paranoia, Toon)
- **Autres** : 5 univers (Fate Core, Savage Worlds, GURPS, Monster of the Week, Apocalypse World)

### **Univers par prix :**
- **Gratuit** : 8 univers
- **Gratuit avec achats facultatifs** : 8 univers
- **Payant** : 8 univers

### **Univers par difficulté :**
- **Débutant** : 8 univers
- **Intermédiaire** : 8 univers
- **Expert** : 8 univers

### **Univers par règles :**
- **Lidées** : 8 univers
- **Libres** : 16 univers

---

## 🚨 **POINTS DE VIGILANCE**

### **1. Performance :**
- [ ] Vérifier que les filtres se mettent à jour en temps réel
- [ ] Vérifier que la recherche ne lag pas
- [ ] Vérifier que les transitions sont fluides

### **2. Accessibilité :**
- [ ] Vérifier que les filtres sont accessibles au clavier
- [ ] Vérifier que les boutons ont des labels appropriés
- [ ] Vérifier que les contrastes sont suffisants

### **3. Cohérence :**
- [ ] Vérifier que les filtres se réinitialisent correctement
- [ ] Vérifier que la pagination se remet à 1 lors des changements
- [ ] Vérifier que les résultats sont cohérents

### **4. Navigation :**
- [ ] Vérifier que les URLs sont correctes
- [ ] Vérifier que le state est passé correctement
- [ ] Vérifier que le retour fonctionne

---

## 📝 **RAPPORT DE TEST**

### **Résultats attendus :**
- [ ] **Filtres individuels** : 100% fonctionnels
- [ ] **Combinaisons de filtres** : 100% fonctionnelles
- [ ] **Recherche en temps réel** : 100% fonctionnelle
- [ ] **Tri** : 100% fonctionnel
- [ ] **Pagination** : 100% fonctionnelle
- [ ] **Effets hover** : 100% fonctionnels
- [ ] **Navigation** : 100% fonctionnelle
- [ ] **Responsive** : 100% fonctionnel

### **Problèmes identifiés :**
- [ ] Aucun problème identifié
- [ ] Problème 1 : [Description]
- [ ] Problème 2 : [Description]
- [ ] Problème 3 : [Description]

### **Améliorations suggérées :**
- [ ] Aucune amélioration nécessaire
- [ ] Amélioration 1 : [Description]
- [ ] Amélioration 2 : [Description]
- [ ] Amélioration 3 : [Description]

---

## 🎯 **VALIDATION FINALE**

### **Critères de validation :**
- [ ] **Fonctionnalité** : Toutes les fonctionnalités marchent
- [ ] **Performance** : Interface fluide et réactive
- [ ] **Responsive** : Fonctionne sur tous les appareils
- [ ] **Navigation** : Navigation intuitive et cohérente
- [ ] **UX** : Expérience utilisateur agréable
- [ ] **Accessibilité** : Accessible à tous les utilisateurs

### **Statut final :**
- [ ] ✅ **VALIDÉ** : Tous les tests passent
- [ ] ❌ **NON VALIDÉ** : Des problèmes ont été identifiés
- [ ] ⚠️ **PARTIELLEMENT VALIDÉ** : Quelques problèmes mineurs

---

**🎲 GUIDE DE TEST COMPLET PRÊT !**

### **Instructions :**
1. **Lancer l'application** : `npm run dev`
2. **Naviguer vers** : `/campaigns/create/universe`
3. **Suivre le plan de test** : Tester chaque fonctionnalité
4. **Documenter les résultats** : Noter les problèmes et améliorations
5. **Valider la qualité** : S'assurer que tout fonctionne parfaitement

**✨ La page de sélection d'univers est maintenant prête pour les tests complets !**


