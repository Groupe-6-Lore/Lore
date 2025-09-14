# 🤖 GUIDE CHATBOT IA - LORE

## 📋 **VUE D'ENSEMBLE**

Le chatbot IA "Lore IA" est un assistant intelligent intégré au dashboard de campagne qui répond aux questions des utilisateurs en se basant sur les sources et références de leur univers de jeu de rôle et système de règles.

---

## 🎨 **DESIGN ET INTERFACE**

### **Panel fermé**
- **Position** : Côté gauche de l'écran, centré verticalement
- **Apparence** : Panel vertical étroit avec coins arrondis
- **Couleur** : Dégradé bleu-gris avec effet 3D
- **Texte** : "LORE IA" en doré, orienté verticalement
- **Animation** : Point lumineux pulsant pour indiquer la disponibilité

### **Panel ouvert**
- **Largeur** : 384px (w-96)
- **Fond** : Texture obsidienne bleu foncé avec dégradés
- **Bordure** : Encadré doré avec runes décoratives
- **Runes** : Symboles vikings (ᚱᚢᚾᛖ, ᛗᚨᚷᛁ) sur les bords
- **Texture** : Motifs radiaux bleus pour l'effet obsidienne

---

## 🏗️ **ARCHITECTURE TECHNIQUE**

### **Composants principaux**

#### **1. ChatbotPanel.jsx**
```javascript
// Interface utilisateur du chatbot
- État ouvert/fermé
- Zone de messages scrollables
- Champ de saisie avec bouton d'envoi
- Affichage du contexte de campagne
- Gestion des réponses IA
```

#### **2. aiService.js**
```javascript
// Service de traitement IA
- Indexation des sources
- Extraction de mots-clés
- Recherche de sources pertinentes
- Génération de réponses contextuelles
- Gestion des erreurs
```

### **Intégration dans CampaignDashboard**
```javascript
// Bouton d'activation dans la sidebar gauche
<button onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
  <MessageCircle />
  <span>Lore IA</span>
</button>

// Panel du chatbot
<ChatbotPanel 
  isOpen={isChatbotOpen}
  onClose={() => setIsChatbotOpen(false)}
  campaign={campaign}
  universe={campaign?.univers}
  rules={campaign?.regles}
/>
```

---

## 🧠 **LOGIQUE IA**

### **Traitement des questions**

#### **1. Extraction de mots-clés**
```javascript
extractKeywords(question) {
  const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'mais', 'donc', 'or', 'ni', 'car'];
  const words = question.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  return [...new Set(words)]; // Supprimer les doublons
}
```

#### **2. Recherche de sources pertinentes**
```javascript
findRelevantSources(keywords) {
  const relevantSources = [];
  
  for (const [id, source] of this.sources) {
    let score = 0;
    
    keywords.forEach(keyword => {
      // Recherche dans le titre (score +3)
      if (source.title.toLowerCase().includes(keyword)) {
        score += 3;
      }
      
      // Recherche dans le contenu (score +1)
      if (source.content.toLowerCase().includes(keyword)) {
        score += 1;
      }
      
      // Recherche dans les tags (score +2)
      source.tags.forEach(tag => {
        if (tag.toLowerCase().includes(keyword)) {
          score += 2;
        }
      });
    });
    
    if (score > 0) {
      relevantSources.push({ ...source, id, score });
    }
  }
  
  return relevantSources.sort((a, b) => b.score - a.score).slice(0, 5);
}
```

#### **3. Génération de réponses**
```javascript
async generateResponse(question, sources) {
  if (sources.length === 0) {
    return this.generateFallbackResponse(question);
  }

  const context = this.buildContext(sources);
  return this.simulateAIResponse(question, context, sources);
}
```

---

## 📚 **GESTION DES SOURCES**

### **Types de sources supportés**

#### **1. Sources de règles**
```javascript
{
  type: 'rule',
  title: 'Combat - Actions de base',
  content: 'Les actions de combat incluent...',
  category: 'combat',
  tags: ['combat', 'actions', 'règles']
}
```

#### **2. Sources d'univers**
```javascript
{
  type: 'universe',
  title: 'Histoire du Royaume de Cendres',
  content: 'Le Royaume de Cendres fut fondé...',
  category: 'histoire',
  tags: ['histoire', 'royaume', 'cendres']
}
```

#### **3. Sources de campagne**
```javascript
{
  type: 'campaign',
  title: 'Notes de session 1',
  content: 'Les joueurs ont découvert...',
  category: 'session',
  tags: ['session', 'joueurs', 'découverte']
}
```

### **Indexation automatique**
```javascript
indexSources() {
  this.sources.clear();
  
  // Indexer les documents de règles
  if (this.context.rules?.documents) {
    this.context.rules.documents.forEach(doc => {
      this.sources.set(doc.id, {
        type: 'rule',
        title: doc.title,
        content: doc.content,
        category: doc.category,
        tags: doc.tags || []
      });
    });
  }
  
  // Indexer les documents d'univers
  if (this.context.universe?.documents) {
    this.context.universe.documents.forEach(doc => {
      this.sources.set(doc.id, {
        type: 'universe',
        title: doc.title,
        content: doc.content,
        category: doc.category,
        tags: doc.tags || []
      });
    });
  }
}
```

---

## 🎯 **FONCTIONNALITÉS**

### **Interface utilisateur**

#### **Header**
- Titre "Lore IA" avec icône Sparkles
- Bouton de fermeture (X)
- Design cohérent avec le thème obsidienne

#### **Contexte de campagne**
- Affichage du nom de la campagne
- Univers sélectionné
- Système de règles utilisé
- Mise à jour automatique

#### **Zone de conversation**
- Messages scrollables
- Distinction visuelle utilisateur/IA
- Affichage des sources utilisées
- Timestamps des messages
- Animation de chargement

#### **Zone de saisie**
- Champ de texte avec placeholder
- Bouton d'envoi avec icône Send
- Support de la touche Entrée
- Désactivation pendant le chargement

### **Traitement des questions**

#### **Réponses contextuelles**
- Basées sur les sources disponibles
- Références aux documents utilisés
- Adaptation au contexte de campagne
- Gestion des cas sans sources

#### **Affichage des sources**
- Liste des sources pertinentes
- Type de source (règles, univers, campagne)
- Limitation à 3 sources principales
- Score de pertinence

---

## 🔧 **CONFIGURATION**

### **Initialisation du service**
```javascript
// Dans ChatbotPanel.jsx
useEffect(() => {
  if (campaign && universe && rules) {
    aiService.initializeContext(campaign, universe, rules);
  }
}, [campaign, universe, rules]);
```

### **Ajout de sources**
```javascript
// Ajouter une nouvelle source
const sourceId = aiService.addSource({
  type: 'custom',
  title: 'Mon document',
  content: 'Contenu du document...',
  category: 'custom',
  tags: ['tag1', 'tag2']
});
```

### **Statistiques**
```javascript
// Obtenir les statistiques
const stats = aiService.getStats();
console.log(stats);
// {
//   totalSources: 15,
//   sourcesByType: { rule: 8, universe: 5, campaign: 2 },
//   context: { hasCampaign: true, hasUniverse: true, hasRules: true, documentsCount: 0 }
// }
```

---

## 🚀 **ÉVOLUTIONS FUTURES**

### **Intégration API IA réelle**
- Remplacement de `simulateAIResponse` par une vraie API
- Support de modèles comme GPT, Claude, ou Llama
- Gestion des tokens et limites d'usage
- Cache des réponses pour optimiser les performances

### **Améliorations de l'interface**
- Suggestions de questions
- Historique des conversations
- Export des conversations
- Mode sombre/clair
- Personnalisation des couleurs

### **Fonctionnalités avancées**
- Recherche sémantique
- Analyse de sentiment
- Génération de contenu
- Traduction automatique
- Intégration avec d'autres outils

### **Gestion des sources**
- Import de documents PDF
- OCR pour les images
- Synchronisation cloud
- Versioning des sources
- Collaboration en temps réel

---

## 📝 **EXEMPLES D'UTILISATION**

### **Questions sur les règles**
```
Utilisateur: "Comment fonctionne le système de combat ?"
IA: "Basé sur les sources de votre univers 'Fantasy Medieval', voici ce que je peux vous dire :

**Combat - Actions de base**
Les actions de combat incluent l'attaque, la défense, le mouvement et les actions spéciales...

Sources utilisées :
• Combat - Actions de base (rule)
• Système de combat avancé (rule)"
```

### **Questions sur l'univers**
```
Utilisateur: "Quelle est l'histoire du Royaume de Cendres ?"
IA: "D'après les documents de votre campagne 'L'Éveil des Dragons', je peux vous expliquer que :

**Histoire du Royaume de Cendres**
Le Royaume de Cendres fut fondé il y a 500 ans par le roi Aethon...

Sources utilisées :
• Histoire du Royaume de Cendres (universe)
• Géographie - Terres brûlées (universe)"
```

### **Questions sans sources**
```
Utilisateur: "Comment créer un personnage ?"
IA: "Je n'ai pas trouvé d'informations spécifiques sur 'créer un personnage' dans les sources de votre univers. Pouvez-vous me donner plus de détails ?"
```

---

## 🛠️ **DÉPANNAGE**

### **Problèmes courants**

#### **Le chatbot ne répond pas**
- Vérifier que les sources sont bien indexées
- Contrôler la console pour les erreurs
- S'assurer que le contexte est initialisé

#### **Réponses génériques**
- Vérifier la qualité des sources
- Améliorer les tags des documents
- Ajouter plus de contenu contextuel

#### **Interface ne s'affiche pas**
- Vérifier l'import du composant
- Contrôler les styles Tailwind
- S'assurer que l'état est correct

### **Logs de débogage**
```javascript
// Activer les logs détaillés
console.log('Sources indexées:', aiService.getAllSources());
console.log('Statistiques:', aiService.getStats());
console.log('Contexte:', aiService.context);
```

---

*Guide créé le 11 Janvier 2025 - Version 1.0*
*Chatbot IA LORE - Assistant intelligent pour JDR*
