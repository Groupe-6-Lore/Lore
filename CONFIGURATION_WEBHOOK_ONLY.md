# Configuration Webhook N8N - Mode Webhook Uniquement

## ✅ Modifications effectuées

Le service IA a été **complètement refactorisé** pour utiliser **uniquement le webhook N8N** :

### **🗑️ Supprimé :**
- ❌ Toutes les sources locales (`sources` Map)
- ❌ Indexation des documents (`indexSources()`)
- ❌ Recherche locale (`findRelevantSources()`)
- ❌ Génération de réponse locale (`generateResponse()`)
- ❌ Simulation IA (`simulateAIResponse()`)
- ❌ Réponses de secours locales (`generateFallbackResponse()`)

### **✅ Ajouté :**
- ✅ **Webhook N8N uniquement** pour toutes les réponses
- ✅ **Contexte enrichi** envoyé au webhook (noms des univers, règles, etc.)
- ✅ **Gestion d'erreur robuste** pour le webhook
- ✅ **Statistiques simplifiées** (webhook uniquement)

## 🔧 Configuration requise

### 1. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine de votre projet :

```env
# Configuration N8N Webhook pour le service IA
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id

# Token d'autorisation optionnel pour N8N
VITE_N8N_TOKEN=your-auth-token-here
```

### 2. Remplacer les valeurs

- **`VITE_N8N_WEBHOOK_URL`** : Votre vraie URL de webhook N8N
- **`VITE_N8N_TOKEN`** : Votre token d'autorisation (optionnel)

### 3. Redémarrer le serveur

```bash
npm run dev
```

## 📡 Format des données envoyées au webhook

Le service envoie maintenant ce payload au webhook N8N :

```json
{
  "chatInput": "Question de l'utilisateur",
  "context": {
    "campaign": "id-campagne",
    "universe": "id-univers", 
    "rules": "id-regles",
    "campaignName": "Nom de la campagne",
    "universeName": "Nom de l'univers",
    "rulesName": "Nom du système de règles"
  }
}
```

## 🔄 Format de réponse attendu du webhook

Le webhook doit retourner un JSON avec :

```json
{
  "answer": "Réponse de l'IA",
  "sources": [
    {
      "id": "source-id",
      "title": "Titre de la source",
      "content": "Contenu de la source",
      "type": "document"
    }
  ],
  "keywords": ["mot1", "mot2", "mot3"]
}
```

## ⚠️ Important

- **Aucune source locale** n'est plus utilisée
- **Toutes les réponses** viennent du webhook N8N
- **Le contexte** (campagne, univers, règles) est envoyé au webhook
- **Gestion d'erreur** : Si le webhook échoue, l'utilisateur voit une erreur

## 🚀 Avantages

1. **Centralisé** : Toute la logique IA est dans N8N
2. **Flexible** : Vous pouvez changer la logique sans redéployer
3. **Puissant** : Accès à toutes les capacités de N8N
4. **Sécurisé** : Pas de logique IA exposée côté client
