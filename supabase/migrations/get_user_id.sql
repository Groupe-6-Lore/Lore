-- Script pour récupérer votre user_id
-- Exécutez ce script dans l'éditeur SQL de Supabase pour obtenir votre user_id

SELECT 
  id as user_id,
  email,
  created_at
FROM auth.users 
WHERE email = 'VOTRE_EMAIL@exemple.com'; -- Remplacez par votre email

-- Une fois que vous avez votre user_id, utilisez-le dans le script add_test_data.sql

