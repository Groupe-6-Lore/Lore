# Instructions pour créer les données de test

## Étape 1 : Se connecter à l'application
1. Ouvrez http://localhost:3001
2. Créez un compte ou connectez-vous
3. Notez votre user_id (visible dans les outils de développement)

## Étape 2 : Ajouter la campagne dans Supabase
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez le projet Lore
3. Allez dans Table Editor > campaigns
4. Cliquez sur "Insert" > "Insert row"
5. Remplissez avec ces données EXACTES :

### Campagne "Les Échos de Nerath"
- **user_id** : Votre user_id (copié depuis l'app)
- **title** : `Les Échos de Nerath`
- **game_system** : `DnD 4`
- **universe** : `DnD 4`
- **resume** : 
```
Depuis des siècles, les royaumes humains, elfes et nains survivent sous l'ombre de l'Obélisque Écarlate, un artefact ancien dont nul ne connaît l'origine.

Aujourd'hui, son sceau se fissure, libérant des légions corrompues qui avancent de ruine en ruine. Les héros devront rassembler des alliances fragiles, explorer des forteresses oubliées et défier des adversaires dont le nom seul fait trembler les bardes.

Chaque choix renforcera ou brisera le destin des Royaumes Fragmentés : les serments trahis forgeront l'histoire, et le sang versé nourrira l'aube incertaine d'une nouvelle ère.
```

## Étape 3 : Ajouter les joueurs
1. Notez l'ID de la campagne créée
2. Allez dans Table Editor > players
3. Cliquez sur "Insert" > "Insert row"
4. Ajoutez ces 4 joueurs :

### Joueur 1
- **campaign_id** : ID de la campagne
- **name** : `Anas`
- **character_name** : `Kriks`

### Joueur 2
- **campaign_id** : ID de la campagne
- **name** : `Thomas`
- **character_name** : `Vaelene`

### Joueur 3
- **campaign_id** : ID de la campagne
- **name** : `Chris`
- **character_name** : `Tardek`

### Joueur 4
- **campaign_id** : ID de la campagne
- **name** : `Rick`
- **character_name** : `Gora`

## Étape 4 : Tester l'application
1. Retournez sur http://localhost:3001
2. Connectez-vous
3. Vous devriez voir la campagne "Les Échos de Nerath" avec les 4 joueurs
