# 🎨 GUIDE DE COHÉRENCE VISUELLE - LORE

## 📝 **RÈGLES TYPOGRAPHIQUES**

### **Hiérarchie des titres :**

#### **H1 - Logo principal :**
- **Classe** : `font-eagle` (Eagle Lake)
- **Usage** : Logo "LORE" uniquement
- **Couleur** : `text-important` (avec ombre portée)

#### **H2 - Titres de section :**
- **Classe** : `calligraphy-font` (Lucida Calligraphy)
- **Usage** : "Mes campagnes", "Bienvenue sur le Dashboard"
- **Couleur** : `text-important` (avec ombre portée)

#### **H3 - Sous-titres :**
- **Classe** : `calligraphy-font` (Lucida Calligraphy)
- **Usage** : "Les Échos de Nerath", "Ajouter un joueur"
- **Couleur** : `text-golden` ou `text-important`

#### **H4 - Sous-sections :**
- **Classe** : `calligraphy-font` (Lucida Calligraphy)
- **Usage** : "Résumé", "Joueurs"
- **Couleur** : `text-important` (avec ombre portée)

---

## 🎨 **CHARTE GRAPHIQUE STRICTE**

### **Couleurs principales :**
- **Primary Blue** : `#46718A` - Backgrounds principaux
- **Golden** : `#E9BD72` - Accents, boutons, bordures
- **Text Light** : `#F0EAE1` - Textes sur fond sombre
- **Text Dark** : `#0D151A` - Textes sur fond clair

### **Variations d'opacité :**
- **High** : 100% - Textes importants
- **Medium** : 90% - Textes secondaires
- **Low** : 70% - Textes tertiaires

### **Classes de contraste :**
- **text-important** : Avec ombre portée pour les titres
- **text-light-high/medium/low** : Variations sur fond sombre
- **text-dark-high/medium/low** : Variations sur fond clair

---

## ✅ **CHECKLIST DE COHÉRENCE**

### **Typographie :**
- [ ] **Logo LORE** : `font-eagle` uniquement
- [ ] **Tous les H2** : `calligraphy-font`
- [ ] **Tous les H3** : `calligraphy-font`
- [ ] **Tous les H4** : `calligraphy-font`
- [ ] **Textes normaux** : `font-noto` (Noto Sans)

### **Couleurs :**
- [ ] **Backgrounds** : Primary Blue (#46718A) uniquement
- [ ] **Accents** : Golden (#E9BD72) uniquement
- [ ] **Textes sur fond sombre** : Text Light (#F0EAE1)
- [ ] **Textes sur fond clair** : Text Dark (#0D151A)
- [ ] **Pas d'autres couleurs** : Respect strict de la charte

### **Contraste :**
- [ ] **Titres importants** : `text-important` avec ombre
- [ ] **Sous-titres** : `calligraphy-font` avec bonne lisibilité
- [ ] **Textes secondaires** : Opacité appropriée
- [ ] **Boutons** : Contraste suffisant

---

## 🚫 **ERREURS À ÉVITER**

### **Typographie :**
- ❌ **Ne pas utiliser** `font-eagle` pour les sous-titres
- ❌ **Ne pas utiliser** `font-noto` pour les titres
- ❌ **Ne pas mélanger** les polices dans un même titre

### **Couleurs :**
- ❌ **Ne pas utiliser** d'autres couleurs que la charte
- ❌ **Ne pas utiliser** `text-white` ou `text-black`
- ❌ **Ne pas utiliser** `text-gray-*` ou `text-blue-*`

### **Contraste :**
- ❌ **Ne pas utiliser** `text-light` sur fond clair
- ❌ **Ne pas utiliser** `text-dark` sur fond sombre
- ❌ **Ne pas oublier** l'ombre portée sur les titres importants

---

## 🎯 **EXEMPLES CORRECTS**

### **Page d'authentification :**
```jsx
<h1 className="text-4xl font-bold text-important font-eagle">LORE</h1>
<h2 className="text-3xl font-bold text-important calligraphy-font">
  Prêt-e à commencer votre aventure ?
</h2>
```

### **Page Campaign Selection :**
```jsx
<h1 className="text-4xl font-bold text-important font-eagle">LORE</h1>
<h2 className="text-2xl font-bold text-important calligraphy-font">
  Mes campagnes
</h2>
<h3 className="text-4xl font-bold text-golden calligraphy-font">
  Les Échos de Nerath
</h3>
<h4 className="text-xl font-bold text-important calligraphy-font">
  Résumé
</h4>
```

### **Modal :**
```jsx
<h3 className="text-xl font-bold text-dark-high calligraphy-font">
  Ajouter un joueur
</h3>
```

---

## 🔍 **VÉRIFICATION FINALE**

### **Test de cohérence :**
1. **Ouvrir** l'application sur `http://localhost:3001/`
2. **Vérifier** que tous les titres utilisent la bonne police
3. **Vérifier** que toutes les couleurs respectent la charte
4. **Vérifier** que les contrastes sont parfaits
5. **Vérifier** que l'identité manuscrite est élégante

### **Résultat attendu :**
- ✅ **Identité visuelle** cohérente et professionnelle
- ✅ **Typographie** manuscrite élégante pour les sous-titres
- ✅ **Couleurs** strictement respectées
- ✅ **Contraste** parfait pour la lisibilité
- ✅ **Expérience utilisateur** harmonieuse

---

**🎨 L'application LORE doit avoir une identité visuelle parfaitement cohérente !**


