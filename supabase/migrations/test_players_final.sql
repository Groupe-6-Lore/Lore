-- ÉTAPE 10: DONNÉES DE TEST - JOUEURS
-- Script pour ajouter des joueurs de test à la campagne

-- 1. Récupérer l'ID de votre campagne
-- Exécutez d'abord : SELECT id, title FROM campaigns WHERE user_id = 'TON_USER_ID';

-- 2. Insérer des joueurs de test
-- Remplacez 'CAMPAGNE_ID' par l'ID de votre campagne "Les Échos de Nerath"

INSERT INTO players (campaign_id, name, character_name, status) VALUES 
('CAMPAGNE_ID', 'Thomas', 'Vaelene', 'active'),
('CAMPAGNE_ID', 'Sarah', 'Thorin', 'active'),
('CAMPAGNE_ID', 'Marc', 'Elara', 'active'),
('CAMPAGNE_ID', 'Emma', 'Aragorn', 'active');

-- 3. Vérifier que les joueurs ont été ajoutés
SELECT 
  p.name as player_name,
  p.character_name,
  c.title as campaign_title,
  p.status
FROM players p
JOIN campaigns c ON p.campaign_id = c.id
WHERE c.user_id = 'TON_USER_ID'
ORDER BY c.title, p.name;



