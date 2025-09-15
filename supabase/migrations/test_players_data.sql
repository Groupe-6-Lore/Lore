-- ÉTAPE 10: DONNÉES DE TEST POUR LES JOUEURS
-- Ce script ajoute des joueurs de test aux campagnes

-- 1. Vérifier que la table players existe et a la bonne structure
-- Si elle n'existe pas, créez-la d'abord avec le script campaigns_and_players.sql

-- 2. Récupérer les IDs des campagnes créées
-- Exécutez d'abord : SELECT id, title FROM campaigns WHERE user_id = 'VOTRE_USER_ID_ICI';

-- 3. Insérer des joueurs de test
-- Remplacez 'CAMPAGNE_ID_1', 'CAMPAGNE_ID_2', etc. par les vrais IDs de vos campagnes

INSERT INTO players (campaign_id, name, character_name, status) VALUES 
-- Joueurs pour "Les Échos de Nerath"
('CAMPAGNE_ID_1', 'Thomas', 'Vaelene', 'active'),
('CAMPAGNE_ID_1', 'Sarah', 'Thorin', 'active'),
('CAMPAGNE_ID_1', 'Marc', 'Elara', 'active'),

-- Joueurs pour "L'Héritage des Dragons"
('CAMPAGNE_ID_2', 'Emma', 'Aragorn', 'active'),
('CAMPAGNE_ID_2', 'Lucas', 'Legolas', 'active'),
('CAMPAGNE_ID_2', 'Chloé', 'Gimli', 'active'),
('CAMPAGNE_ID_2', 'Alex', 'Gandalf', 'active'),

-- Joueurs pour "Les Ombres de Ravenloft"
('CAMPAGNE_ID_3', 'Sophie', 'Van Helsing', 'active'),
('CAMPAGNE_ID_3', 'Nicolas', 'Dracula', 'active'),

-- Joueurs pour "La Guerre des Étoiles"
('CAMPAGNE_ID_4', 'Pierre', 'Luke Skywalker', 'active'),
('CAMPAGNE_ID_4', 'Marie', 'Princesse Leia', 'active'),
('CAMPAGNE_ID_4', 'Antoine', 'Han Solo', 'active'),
('CAMPAGNE_ID_4', 'Julie', 'Chewbacca', 'active'),
('CAMPAGNE_ID_4', 'David', 'Obi-Wan Kenobi', 'active'),

-- Joueurs pour "Cyberpunk 2077"
('CAMPAGNE_ID_5', 'Camille', 'V', 'active'),
('CAMPAGNE_ID_5', 'Romain', 'Johnny Silverhand', 'active'),
('CAMPAGNE_ID_5', 'Léa', 'Panam Palmer', 'active');

-- 4. Vérifier que les joueurs ont été ajoutés
SELECT 
  p.name as player_name,
  p.character_name,
  c.title as campaign_title,
  p.status
FROM players p
JOIN campaigns c ON p.campaign_id = c.id
WHERE c.user_id = 'VOTRE_USER_ID_ICI'
ORDER BY c.title, p.name;




