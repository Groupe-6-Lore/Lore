-- ÉTAPE 10: DONNÉES DE TEST
-- Script pour créer des campagnes de test dans Supabase

-- 1. Récupérer votre user_id
-- Exécutez d'abord cette requête pour obtenir votre user_id :
-- SELECT id, email FROM auth.users WHERE email = 'votre_email@exemple.com';

-- 2. Insérer la campagne de test
-- Remplacez 'TON_USER_ID' par votre véritable user_id

INSERT INTO campaigns (user_id, title, game_system, universe, resume) VALUES 
(
  'TON_USER_ID', 
  'Les Échos de Nerath', 
  'DnD 4', 
  'DnD 4',
  'Depuis des siècles, les royaumes humains, elfes et nains survivent sous l''ombre de l''Obélisque Écarlate, un artefact ancien dont nul ne connaît l''origine.

Aujourd''hui, son sceau se fissure, libérant des légions corrompues qui avancent de ruine en ruine. Les héros devront rassembler des alliances fragiles, explorer des forteresses oubliées et défier des adversaires dont le nom seul fait trembler les bardes.

Chaque choix renforcera ou brisera le destin des Royaumes Fragmentés : les serments trahis forgeront l''histoire, et le sang versé nourrira l''aube incertaine d''une nouvelle ère.'
);

-- 3. Vérifier que la campagne a été créée
SELECT 
  id,
  title,
  game_system,
  universe,
  created_at
FROM campaigns 
WHERE user_id = 'TON_USER_ID'
ORDER BY created_at DESC;



