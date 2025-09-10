# 🎲 GUIDE DES VARIANTES DE DÉS 20 - LORE

## 📋 **VARIANTES DISPONIBLES**

### **🎲 Dé vert (par défaut)**
```jsx
<button className="dice-d20 eagle-lake-font">
  News
</button>
```
- **Usage** : Bouton News, actions générales
- **Couleur** : Vert JDR classique
- **Contexte** : Interface principale

### **🔴 Dé rouge (alertes)**
```jsx
<button className="dice-d20 dice-d20-red eagle-lake-font">
  Alert
</button>
```
- **Usage** : Alertes, erreurs, actions critiques
- **Couleur** : Rouge vif (#ef4444 → #b91c1c)
- **Contexte** : Notifications importantes

### **🔵 Dé bleu (informations)**
```jsx
<button className="dice-d20 dice-d20-blue eagle-lake-font">
  Info
</button>
```
- **Usage** : Informations, aide, détails
- **Couleur** : Bleu professionnel (#3b82f6 → #1d4ed8)
- **Contexte** : Aide et documentation

### **🟡 Dé doré (récompenses)**
```jsx
<button className="dice-d20 dice-d20-golden eagle-lake-font">
  Reward
</button>
```
- **Usage** : Récompenses, succès, actions premium
- **Couleur** : Doré élégant (#E9BD72 → #b8941f)
- **Contexte** : Récompenses et accomplissements

---

## 🎨 **UTILISATION DES VARIANTES**

### **Structure de base :**
```jsx
<button 
  className="dice-d20 [VARIANTE] eagle-lake-font"
  onClick={() => console.log('Action clicked!')}
  title="Description de l'action"
>
  Texte
</button>
```

### **Exemples d'utilisation :**

#### **Bouton d'alerte :**
```jsx
<button 
  className="dice-d20 dice-d20-red eagle-lake-font"
  onClick={() => handleAlert()}
  title="Alerte importante"
>
  !
</button>
```

#### **Bouton d'information :**
```jsx
<button 
  className="dice-d20 dice-d20-blue eagle-lake-font dice-d20-text"
  onClick={() => showHelp()}
  title="Aide et informations"
>
  Sources
</button>
```

#### **Bouton de récompense :**
```jsx
<button 
  className="dice-d20 dice-d20-golden eagle-lake-font dice-d20-text"
  onClick={() => claimReward()}
  title="Réclamer votre récompense"
>
  Joueurs
</button>
```

---

## 🎯 **CAS D'USAGE RECOMMANDÉS**

### **Dé vert (par défaut) :**
- ✅ Bouton "News" principal
- ✅ Actualités et nouveautés
- ✅ Actions de navigation générale
- ✅ Interface principale

### **Dé rouge :**
- ❌ **Non utilisé pour l'instant**
- 🔮 Réservé pour futures fonctionnalités
- 🔮 Alertes et notifications critiques

### **Dé bleu :**
- ✅ **Sources et références**
- ✅ Documentation JDR
- ✅ Ressources de jeu
- ✅ Bibliothèque de règles

### **Dé doré :**
- ✅ **Gestion des joueurs**
- ✅ Interface joueurs
- ✅ Profils et personnages
- ✅ Fonctionnalités premium

---

## 🔧 **CUSTOMISATION AVANCÉE**

### **Ajouter une nouvelle variante :**
```css
/* Dé violet (pour les actions spéciales) */
.dice-d20-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}
```

### **Utilisation :**
```jsx
<button className="dice-d20 dice-d20-purple eagle-lake-font">
  Special
</button>
```

---

## 📱 **RESPONSIVE DESIGN**

Toutes les variantes héritent automatiquement des optimisations responsive :
- ✅ **Desktop** : Taille normale (80x80px)
- ✅ **Tablet** : Espacement réduit
- ✅ **Mobile** : Espacement minimal
- ✅ **Animations** : Hover et focus optimisés

---

## 🎨 **COULEURS DE LA CHARTE**

### **Cohérence avec Lore :**
- ✅ **Dé vert** : S'harmonise avec l'interface
- ✅ **Dé doré** : Utilise la couleur accent de Lore (#E9BD72)
- ✅ **Dé bleu** : Complète la palette principale
- ✅ **Dé rouge** : Contraste pour les alertes

---

## 🚀 **INTÉGRATION**

### **Dans Campaign Selection :**
Les trois dés sont maintenant implémentés avec leurs fonctions spécifiques :

```jsx
{/* Dé doré - Joueurs */}
<button 
  className="dice-d20 dice-d20-golden eagle-lake-font dice-d20-text"
  onClick={handleNavigateToPlayers}
  title="Gérer les joueurs"
>
  Joueurs
</button>

{/* Dé bleu - Sources */}
<button 
  className="dice-d20 dice-d20-blue eagle-lake-font dice-d20-text"
  onClick={handleNavigateToSources}
  title="Sources et références"
>
  Sources
</button>

{/* Dé vert - News */}
<button 
  className="dice-d20 eagle-lake-font"
  onClick={handleNavigateToNews}
  title="Actualités et nouveautés de Lore"
>
  News
</button>
```

### **Dans d'autres pages :**
Ajoutez les classes CSS dans le fichier de la page et utilisez la structure HTML appropriée.

---

**🎲 Les variantes de dés 20 sont maintenant disponibles pour enrichir l'interface de Lore !**
