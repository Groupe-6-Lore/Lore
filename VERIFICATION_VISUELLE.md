# 🎨 GUIDE DE VÉRIFICATION VISUELLE - LORE

## 📋 CHECKLIST DE VÉRIFICATION

### 🌐 **Accès à l'application**
- [ ] Ouvrir `http://localhost:3001/` dans le navigateur
- [ ] Vérifier que l'application se charge correctement

---

## 🔐 **PAGE D'AUTHENTIFICATION** (`/`)

### **Typographie :**
- [ ] **Logo "LORE"** : Police Eagle Lake (gras, grand)
- [ ] **Titre principal** : Police Eagle Lake (gras, grand)
- [ ] **Description** : Police Noto Sans (normal)

### **Couleurs :**
- [ ] **Background** : Primary Blue (#46718A) avec transparence
- [ ] **Logo "LORE"** : Text Light (#F0EAE1)
- [ ] **Titre principal** : Text Light (#F0EAE1)
- [ ] **Description** : Text Light avec opacité (#F0EAE1/80)
- [ ] **Bouton principal** : Golden (#E9BD72) avec hover Golden/90
- [ ] **Liens** : Golden (#E9BD72) avec hover Golden/80

### **Interactions :**
- [ ] **Hover sur boutons** : Transition fluide vers Golden/90
- [ ] **Hover sur liens** : Transition vers Golden/80
- [ ] **Focus sur inputs** : Ring bleu standard

---

## 🏠 **PAGE DASHBOARD** (`/dashboard`)

### **Typographie :**
- [ ] **Titre "Bienvenue sur le Dashboard"** : Calligraphy Font

### **Couleurs :**
- [ ] **Background** : Primary Blue/10 (#46718A avec 10% opacité)
- [ ] **Titre** : Text Dark (#0D151A)
- [ ] **Textes** : Text Dark/70 (#0D151A avec 70% opacité)
- [ ] **Spinner** : Golden (#E9BD72)

### **Comportement :**
- [ ] **Redirection automatique** : Vers `/campaigns` après 1-2 secondes

---

## 🎲 **PAGE CAMPAIGN SELECTION** (`/campaigns`)

### **Typographie :**
- [ ] **Logo "LORE"** : Calligraphy Font
- [ ] **Titre "Mes campagnes"** : Calligraphy Font
- [ ] **Titre de campagne** : Calligraphy Font
- [ ] **Sous-titre "Résumé"** : Calligraphy Font
- [ ] **Sous-titre "Joueurs"** : Calligraphy Font

### **Couleurs :**
- [ ] **Background** : Primary Blue (#46718A) avec transparence
- [ ] **Logo "LORE"** : Text Light (#F0EAE1)
- [ ] **Titre "Mes campagnes"** : Text Light (#F0EAE1) avec bordure Golden
- [ ] **Bouton News hexagonal** : Golden (#E9BD72) avec hover
- [ ] **Titre de campagne** : Golden (#E9BD72)
- [ ] **Sous-titres** : Text Light (#F0EAE1)
- [ ] **Textes** : Text Light/90 (#F0EAE1 avec 90% opacité)
- [ ] **Boutons "Accéder"** : Golden (#E9BD72) avec hover Golden/90
- [ ] **Bouton "Créer une nouvelle campagne"** : Golden (#E9BD72) avec hover Golden/90
- [ ] **Avatars joueurs** : Golden (#E9BD72)

### **Interactions :**
- [ ] **Hover sur boutons** : Transition fluide
- [ ] **Hover sur liens système/univers** : Transition vers Golden
- [ ] **Bouton News hexagonal** : Animation de rotation et scale

---

## 👤 **MODAL ADD PLAYER**

### **Typographie :**
- [ ] **Titre "Ajouter un joueur"** : Eagle Lake (gras)

### **Couleurs :**
- [ ] **Titre** : Text Dark (#0D151A)
- [ ] **Labels** : Text Dark/80 (#0D151A avec 80% opacité)
- [ ] **Bouton "Annuler"** : Text Dark/80 (#0D151A avec 80% opacité)
- [ ] **Bouton "Ajouter le joueur"** : Golden (#E9BD72) avec hover Golden/90

### **Interactions :**
- [ ] **Hover sur bouton principal** : Transition vers Golden/90
- [ ] **Focus sur inputs** : Ring bleu standard

---

## 🔔 **NOTIFICATIONS TOAST**

### **Couleurs :**
- [ ] **Toast par défaut** : Background Primary Blue (#46718A), texte Text Light (#F0EAE1), bordure Golden (#E9BD72)
- [ ] **Toast de succès** : Background Golden (#E9BD72), texte Text Dark (#0D151A)
- [ ] **Toast d'erreur** : Background Text Dark (#0D151A), texte Text Light (#F0EAE1)

### **Comportement :**
- [ ] **Position** : Top-right
- [ ] **Durée** : 4 secondes par défaut, 3 secondes pour succès, 5 secondes pour erreur
- [ ] **Animation** : Apparition/disparition fluide

---

## 🧪 **TESTS FONCTIONNELS**

### **Authentification :**
- [ ] **Inscription** : Créer un nouveau compte
- [ ] **Connexion** : Se connecter avec un compte existant
- [ ] **Déconnexion** : Se déconnecter

### **Campagnes :**
- [ ] **Création** : Créer une nouvelle campagne
- [ ] **Affichage** : Voir les campagnes existantes
- [ ] **Navigation** : Cliquer sur "Accéder à la campagne"

### **Joueurs :**
- [ ] **Ajout** : Ajouter un nouveau joueur via la modal
- [ ] **Affichage** : Voir les joueurs dans la liste

---

## 🎯 **POINTS D'ATTENTION**

### **Cohérence visuelle :**
- [ ] Tous les sous-titres utilisent la police Calligraphy
- [ ] Toutes les couleurs respectent la charte graphique
- [ ] Les transitions sont fluides partout
- [ ] Les hover effects fonctionnent correctement

### **Responsive :**
- [ ] Test sur différentes tailles d'écran
- [ ] Vérification sur mobile/tablet

### **Performance :**
- [ ] Chargement rapide des pages
- [ ] Animations fluides
- [ ] Pas d'erreurs dans la console

---

## ✅ **VALIDATION FINALE**

- [ ] **Typographie** : Tous les sous-titres en Calligraphy Font
- [ ] **Couleurs** : Charte graphique respectée partout
- [ ] **Interactions** : Hover effects fonctionnels
- [ ] **Cohérence** : Design uniforme sur toute l'application
- [ ] **Fonctionnalités** : Toutes les fonctionnalités opérationnelles

---

## 🚨 **PROBLÈMES DÉTECTÉS**

*À remplir en cas de problème détecté :*

- [ ] Problème 1 : ________________
- [ ] Problème 2 : ________________
- [ ] Problème 3 : ________________

---

**🎉 Si tous les éléments sont validés, l'application est prête !**
