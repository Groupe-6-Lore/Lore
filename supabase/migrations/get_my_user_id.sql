-- Script simple pour récupérer votre user_id
-- Remplacez 'votre_email@exemple.com' par votre véritable email

SELECT 
  id as user_id,
  email,
  created_at
FROM auth.users 
WHERE email = 'votre_email@exemple.com';

-- Copiez le user_id et utilisez-le dans les autres scripts
