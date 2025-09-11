-- ÉTAPE 10: DONNÉES DE TEST POUR LES CAMPAGNES
-- Ce script ajoute les colonnes manquantes et insère des campagnes de test

-- 1. Ajouter les colonnes manquantes à la table campaigns
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS game_system TEXT,
ADD COLUMN IF NOT EXISTS universe TEXT,
ADD COLUMN IF NOT EXISTS resume TEXT;

-- 2. Récupérer votre user_id (remplacez par votre email)
-- Exécutez d'abord cette requête pour obtenir votre user_id :
-- SELECT id, email FROM auth.users WHERE email = 'votre_email@exemple.com';

-- 3. Insérer les campagnes de test
-- Remplacez 'VOTRE_USER_ID_ICI' par votre véritable user_id

INSERT INTO campaigns (user_id, title, game_system, universe, resume, description) VALUES 
(
  'VOTRE_USER_ID_ICI', 
  'Les Échos de Nerath', 
  'DnD 4e', 
  'DnD 4e',
  'Depuis des siècles, les royaumes humains, elfes et nains survivent sous l''ombre de l''Obélisque Écarlate, un artefact ancien dont nul ne connaît l''origine.

Aujourd''hui, son sceau se fissure, libérant des légions corrompues qui avancent de ruine en ruine. Les héros devront rassembler des alliances fragiles, explorer des forteresses oubliées et défier des adversaires dont le nom seul fait trembler les bardes.

Chaque choix renforcera ou brisera le destin des Royaumes Fragmentés : les serments trahis forgeront l''histoire, et le sang versé nourrira l''aube incertaine d''une nouvelle ère.',
  'Une campagne épique dans l''univers de DnD 4e'
),
(
  'VOTRE_USER_ID_ICI',
  'L''Héritage des Dragons',
  'DnD 5e',
  'Forgotten Realms',
  'Dans les terres sauvages de la Côte des Épées, une ancienne prophétie se réveille. Les dragons, longtemps endormis, commencent à s''éveiller de leur sommeil millénaire.

Vos héros, réunis par le destin, devront parcourir des contrées dangereuses, affronter des créatures légendaires et découvrir les secrets d''un héritage oublié qui pourrait sauver ou condamner le monde entier.

Entre trahisons politiques et magie ancienne, chaque décision compte dans cette quête épique.',
  'Une aventure dans les Royaumes Oubliés'
),
(
  'VOTRE_USER_ID_ICI',
  'Les Ombres de Ravenloft',
  'DnD 5e',
  'Ravenloft',
  'Dans les brumes sombres de Ravenloft, où la terreur règne en maître, vos héros se retrouvent piégés dans un domaine maudit gouverné par des seigneurs vampires et des créatures de cauchemar.

Chaque pas dans ces terres maudites révèle de nouveaux mystères et dangers. Les murs eux-mêmes semblent vivants, et l''espoir devient une denrée rare dans ce royaume où la mort n''est que le début des tourments.

Pouvez-vous survivre aux horreurs de Ravenloft et trouver un moyen de fuir ce cauchemar éternel ?',
  'Une campagne horreur dans le Domaine de la Peur'
),
(
  'VOTRE_USER_ID_ICI',
  'La Guerre des Étoiles',
  'Star Wars RPG',
  'Star Wars',
  'Dans une galaxie lointaine, très lointaine, l''Empire Galactique étend son ombre tyrannique sur des milliers de mondes. Mais l''espoir renaît avec l''Alliance Rebelle qui lutte pour restaurer la liberté.

Vos héros, qu''ils soient Jedi, contrebandiers, ou soldats de l''Alliance, devront naviguer entre les étoiles, affronter les forces impériales et découvrir les secrets de la Force.

Entre batailles spatiales épiques et intrigues politiques, l''avenir de la galaxie est entre vos mains.',
  'Une campagne dans l''univers Star Wars'
),
(
  'VOTRE_USER_ID_ICI',
  'Cyberpunk 2077',
  'Cyberpunk RED',
  'Night City',
  'Bienvenue dans Night City, la métropole du futur où la technologie et l''humanité se mélangent dans un cocktail explosif. Les mégacorporations contrôlent tout, et seuls les plus audacieux survivent dans les rues sombres.

Vos personnages, cyberpunk, netrunners ou mercenaires, devront naviguer dans ce monde dangereux où chaque mission peut être la dernière. Entre implants cybernétiques et intrigues corporatives, la survie n''est jamais garantie.

Dans cette ville où les rêves se vendent et se trahissent, saurez-vous garder votre humanité ?',
  'Une campagne cyberpunk dans Night City'
);

-- 4. Vérifier que les données ont été insérées
SELECT 
  id,
  title,
  game_system,
  universe,
  created_at
FROM campaigns 
WHERE user_id = 'VOTRE_USER_ID_ICI'
ORDER BY created_at DESC;
