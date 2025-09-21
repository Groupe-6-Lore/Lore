# Configuration des Variables d'Environnement

## Problème identifié
L'erreur sur votre site vient du fait que la variable d'environnement `VITE_N8N_WEBHOOK_URL` est manquante.

## Solution

### 1. Créer le fichier .env
Créez un fichier `.env` à la racine de votre projet avec le contenu suivant :

```env
# Configuration N8N Webhook pour le service IA
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id

# Token d'autorisation optionnel pour N8N
# VITE_N8N_TOKEN=your-auth-token-here

# Configuration Supabase (si utilisé)
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Remplacer les valeurs
- Remplacez `https://your-n8n-instance.com/webhook/your-webhook-id` par votre vraie URL de webhook N8N
- Si vous avez un token d'autorisation, décommentez et remplissez `VITE_N8N_TOKEN`

### 3. Redémarrer le serveur
Après avoir créé le fichier `.env`, redémarrez votre serveur de développement :
```bash
npm run dev
```

## Alternative temporaire
Si vous n'avez pas encore configuré N8N, vous pouvez temporairement désactiver le chatbot en commentant son utilisation dans les composants.
