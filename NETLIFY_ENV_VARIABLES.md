# Variables d'environnement pour Netlify

## Problème
L'erreur `VITE_N8N_WEBHOOK_URL manquant` sur Netlify indique que les variables d'environnement ne sont pas configurées dans Netlify.

## Solution
Configurer les variables d'environnement dans l'interface Netlify.

## Variables à ajouter dans Netlify

### 1. Webhook N8N (OBLIGATOIRE)
- **Key** : `VITE_N8N_WEBHOOK_URL`
- **Value** : `https://lorehetic.app.n8n.cloud/webhook/b0023ec5-bfd0-4fb8-ae20-73cb5fa3d489`

### 2. Token N8N (OPTIONNEL)
- **Key** : `VITE_N8N_TOKEN`
- **Value** : `votre-token-si-vous-en-avez-un`

### 3. Supabase URL
- **Key** : `VITE_SUPABASE_URL`
- **Value** : `https://beywnoejybmflodwfyfh.supabase.co`

### 4. Supabase Anon Key
- **Key** : `VITE_SUPABASE_ANON_KEY`
- **Value** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleXdub2VqeWJtZmxvZHdmeWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzU2MTEsImV4cCI6MjA3MjkxMTYxMX0.16m5Rd76S00tXDXM_MB5hGp2ECcY`

## Étapes dans Netlify

1. Aller sur [netlify.com](https://netlify.com)
2. Sélectionner votre site
3. **Site settings** → **Environment variables**
4. Cliquer sur **"Add variable"**
5. Ajouter chaque variable avec sa clé et sa valeur
6. **Save** les modifications
7. **Deploy site** pour redéployer avec les nouvelles variables

## Vérification

Après le redéploiement, le chatbot devrait fonctionner sans l'erreur `VITE_N8N_WEBHOOK_URL manquant`.

## Note importante

Les fichiers `.env.local` ne sont PAS déployés sur Netlify. Il faut toujours configurer les variables d'environnement directement dans l'interface Netlify.
