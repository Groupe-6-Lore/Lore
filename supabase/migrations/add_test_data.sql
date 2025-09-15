-- Ajouter les colonnes manquantes à la table campaigns
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS game_system TEXT,
ADD COLUMN IF NOT EXISTS universe TEXT,
ADD COLUMN IF NOT EXISTS resume TEXT;

-- Insérer des campagnes de test
-- Remplacez 'VOTRE_USER_ID' par votre véritable user_id de Supabase
INSERT INTO campaigns (user_id, title, game_system, universe, resume, description) VALUES 
(
  'VOTRE_USER_ID', 
  'Les Échos de Nerath', 
  'DnD 4', 
  'DnD 4',
  'Depuis des siècles, les royaumes humains, elfes et nains survivent sous l''ombre de l''Obélisque Écarlate, un artefact ancien dont nul ne connaît l''origine.

Aujourd''hui, son sceau se fissure, libérant des légions corrompues qui avancent de ruine en ruine. Les héros devront rassembler des alliances fragiles, explorer des forteresses oubliées et défier des adversaires dont le nom seul fait trembler les bardes.

Chaque choix renforcera ou brisera le destin des Royaumes Fragmentés : les serments trahis forgeront l''histoire, et le sang versé nourrira l''aube incertaine d''une nouvelle ère.',
  'Une campagne épique dans l''univers de DnD 4e'
),
(
  'VOTRE_USER_ID',
  'L''Héritage des Dragons',
  'DnD 5e',
  'Forgotten Realms',
  'Dans les terres sauvages de la Côte des Épées, une ancienne prophétie se réveille. Les dragons, longtemps endormis, commencent à s''éveiller de leur sommeil millénaire.

Vos héros, réunis par le destin, devront parcourir des contrées dangereuses, affronter des créatures légendaires et découvrir les secrets d''un héritage oublié qui pourrait sauver ou condamner le monde entier.

Entre trahisons politiques et magie ancienne, chaque décision compte dans cette quête épique.',
  'Une aventure dans les Royaumes Oubliés'
),
(
  'VOTRE_USER_ID',
  'Les Ombres de Ravenloft',
  'DnD 5e',
  'Ravenloft',
  'Dans les brumes sombres de Ravenloft, où la terreur règne en maître, vos héros se retrouvent piégés dans un domaine maudit gouverné par des seigneurs vampires et des créatures de cauchemar.

Chaque pas dans ces terres maudites révèle de nouveaux mystères et dangers. Les murs eux-mêmes semblent vivants, et l''espoir devient une denrée rare dans ce royaume où la mort n''est que le début des tourments.

Pouvez-vous survivre aux horreurs de Ravenloft et trouver un moyen de fuir ce cauchemar éternel ?',
  'Une campagne horreur dans le Domaine de la Peur'
);




