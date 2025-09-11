-- Création de la table universes pour la sélection d'univers
-- Cette migration crée une table universes avec toutes les colonnes nécessaires

-- Créer la table universes
CREATE TABLE IF NOT EXISTS universes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    author TEXT NOT NULL,
    price DECIMAL(10,2) NULL, -- NULL pour gratuit/freemium/owned
    type TEXT NOT NULL CHECK (type IN ('owned', 'free', 'freemium', 'paid')),
    themes TEXT[] NOT NULL, -- Array de thèmes
    rules TEXT[] NOT NULL, -- Array de règles
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Débutant', 'Intermédiaire', 'Expert')),
    image TEXT, -- Chemin vers l'image
    popularity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Créer des index pour les performances
CREATE INDEX IF NOT EXISTS idx_universes_type ON universes(type);
CREATE INDEX IF NOT EXISTS idx_universes_themes ON universes USING GIN(themes);
CREATE INDEX IF NOT EXISTS idx_universes_rules ON universes USING GIN(rules);
CREATE INDEX IF NOT EXISTS idx_universes_difficulty ON universes(difficulty);
CREATE INDEX IF NOT EXISTS idx_universes_popularity ON universes(popularity);

-- Activer RLS (Row Level Security)
ALTER TABLE universes ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture à tous les utilisateurs authentifiés
CREATE POLICY "Authenticated users can view universes" ON universes
    FOR SELECT USING (auth.role() = 'authenticated');

-- Insérer les données d'exemple (les 40 univers du frontend)
INSERT INTO universes (title, subtitle, author, price, type, themes, rules, difficulty, image, popularity) VALUES
('Dungeons & Dragons 5e', 'Manuel des joueurs', 'Wizards of the Coast', NULL, 'owned', ARRAY['Fantasy'], ARRAY['Libres'], 'Débutant', '/images/dnd5e.jpg', 95),
('Donjons & Dragons de l''Ère Moderne', 'Livre de règles', 'Wizards of the Coast', NULL, 'owned', ARRAY['Fantasy'], ARRAY['Libres'], 'Débutant', '/images/dnd-modern.jpg', 88),
('L''Univers Héroïque 2e Edition', 'Livre principal', 'Free League', NULL, 'free', ARRAY['Fantasy'], ARRAY['Libres'], 'Intermédiaire', '/images/heroic-universe.jpg', 75),
('L''Appel de Cthulhu - 7e Edition', 'Livre de base', 'Chaosium et Sans-Détour', NULL, 'free', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Expert', '/images/cthulhu.jpg', 92),
('Roll20 Universe', 'Plateforme en ligne', 'Roll20', NULL, 'freemium', ARRAY['Autres'], ARRAY['Libres'], 'Débutant', '/images/roll20.jpg', 60),
('Pathfinder 2e', 'Livre de base', 'Paizo', 40, 'paid', ARRAY['Fantasy'], ARRAY['Libres'], 'Intermédiaire', '/images/pathfinder.jpg', 85),
('Lasers & Feelings', 'Jeu narratif', 'John Harper', NULL, 'free', ARRAY['Science-fiction'], ARRAY['Libres'], 'Débutant', '/images/lasers-feelings.jpg', 60),
('Dungeon World', 'Règles narratives', 'Sage Kobold', NULL, 'free', ARRAY['Fantasy'], ARRAY['Libres'], 'Intermédiaire', '/images/dungeon-world.jpg', 80),
('Vampire: The Masquerade', '5e édition', 'White Wolf', 55, 'paid', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Intermédiaire', '/images/vampire.jpg', 78),
('Cyberpunk RED', 'Livre de base', 'R. Talsorian Games', 60, 'paid', ARRAY['Science-fiction'], ARRAY['Libres'], 'Expert', '/images/cyberpunk.jpg', 82),
('Fiasco', 'Jeu de rôle narratif', 'Bully Pulpit Games', NULL, 'free', ARRAY['Comédie & Parodique'], ARRAY['Libres'], 'Débutant', '/images/fiasco.jpg', 65),
('Blades in the Dark', 'Jeu de rôle urbain', 'John Harper', NULL, 'free', ARRAY['Autres'], ARRAY['Libres'], 'Intermédiaire', '/images/blades.jpg', 85),
('Call of Cthulhu', '7e édition', 'Chaosium', NULL, 'free', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Expert', '/images/call-cthulhu.jpg', 90),
('Numenera', 'Discovery & Destiny', 'Monte Cook Games', 45, 'paid', ARRAY['Science-fiction'], ARRAY['Libres'], 'Intermédiaire', '/images/numenera.jpg', 72),
('Apocalypse World', '2e édition', 'D. Vincent Baker', 35, 'paid', ARRAY['Science-fiction'], ARRAY['Libres'], 'Intermédiaire', '/images/apocalypse-world.jpg', 85),
('Monsterhearts', 'Jeu de monstres adolescents', 'Avery Alder', 25, 'paid', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Débutant', '/images/monsterhearts.jpg', 68),
('Masks: A New Generation', 'Super-héros adolescents', 'Brendan Conway', 30, 'paid', ARRAY['Science-fiction'], ARRAY['Libres'], 'Débutant', '/images/masks.jpg', 75),
('The Sprawl', 'Cyberpunk narratif', 'Hamish Cameron', 40, 'paid', ARRAY['Science-fiction'], ARRAY['Libres'], 'Intermédiaire', '/images/the-sprawl.jpg', 70),
('Urban Shadows', 'Horreur urbaine', 'Andrew Medeiros', 35, 'paid', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Intermédiaire', '/images/urban-shadows.jpg', 73),
('Fellowship', 'Fantasy épique', 'Jacob Randolph', 30, 'paid', ARRAY['Fantasy'], ARRAY['Libres'], 'Débutant', '/images/fellowship.jpg', 77),
('The Veil', 'Cyberpunk transhumaniste', 'Samjoko Publishing', 25, 'paid', ARRAY['Science-fiction'], ARRAY['Libres'], 'Expert', '/images/the-veil.jpg', 62),
('Bluebeard''s Bride', 'Horreur gothique', 'Marissa Kelly', 45, 'paid', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Expert', '/images/bluebeards-bride.jpg', 58),
('Dream Askew', 'Post-apocalyptique queer', 'Avery Alder', NULL, 'free', ARRAY['Science-fiction'], ARRAY['Libres'], 'Intermédiaire', '/images/dream-askew.jpg', 55),
('Wanderhome', 'Fantasy pastoral', 'Jay Dragon', 35, 'paid', ARRAY['Fantasy'], ARRAY['Liées'], 'Débutant', '/images/wanderhome.jpg', 82),
('Thirsty Sword Lesbians', 'Fantasy queer', 'April Kit Walsh', 30, 'paid', ARRAY['Fantasy'], ARRAY['Liées'], 'Débutant', '/images/thirsty-sword.jpg', 75),
('Neverland', 'Jeux narratifs', 'Scott Malthouse', 38, 'paid', ARRAY['Fantasy'], ARRAY['Libres'], 'Débutant', '/images/neverland.jpg', 65),
('Pax Ethica', 'Science-fiction', 'Scott Malthouse', 24, 'paid', ARRAY['Science-fiction'], ARRAY['Liées'], 'Expert', '/images/pax-ethica.jpg', 45),
('Lady Blackbird', 'Jeu narratif', 'John Harper', NULL, 'free', ARRAY['Science-fiction'], ARRAY['Libres'], 'Débutant', '/images/lady-blackbird.jpg', 70),
('Aria', 'Système générique', 'Last Unicorn / Elder Craft', 60, 'paid', ARRAY['Autres'], ARRAY['Liées'], 'Expert', '/images/aria.jpg', 40),
('Microscope', 'Création d''histoire collaborative', 'Ben Robbins', NULL, 'free', ARRAY['Autres'], ARRAY['Libres'], 'Intermédiaire', '/images/microscope.jpg', 55),
('Forbidden Lands', 'Exploration et survie', 'Tomas Härenstam', 42, 'paid', ARRAY['Fantasy'], ARRAY['Liées'], 'Intermédiaire', '/images/forbidden-lands.jpg', 72),
('Horror in Arkham', 'Horreur cosmique', 'Chaosium', 35, 'paid', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Expert', '/images/horror-arkham.jpg', 78),
('Warhammer Fantasy Roleplay', '4e édition', 'Cubicle 7', 45, 'paid', ARRAY['Fantasy'], ARRAY['Liées'], 'Expert', '/images/warhammer-fantasy.jpg', 78),
('Shadowrun', '6e édition', 'Catalyst Game Labs', 50, 'paid', ARRAY['Science-fiction'], ARRAY['Liées'], 'Expert', '/images/shadowrun.jpg', 72),
('World of Darkness', 'Système de base', 'White Wolf', 35, 'paid', ARRAY['Horreur & Mystère'], ARRAY['Liées'], 'Intermédiaire', '/images/world-of-darkness.jpg', 85),
('GURPS', 'Système générique', 'Steve Jackson Games', 40, 'paid', ARRAY['Autres'], ARRAY['Liées'], 'Expert', '/images/gurps.jpg', 68),
('Honey Heist', 'Jeu narratif court', 'Grant Howitt', NULL, 'free', ARRAY['Comédie & Parodique'], ARRAY['Libres'], 'Débutant', '/images/honey-heist.jpg', 55),
('The Quiet Year', 'Construction de communauté', 'Avery Alder', NULL, 'free', ARRAY['Autres'], ARRAY['Libres'], 'Intermédiaire', '/images/quiet-year.jpg', 62),
('Dread', 'Horreur avec Jenga', 'Rafael Chandler', NULL, 'free', ARRAY['Horreur & Mystère'], ARRAY['Libres'], 'Débutant', '/images/dread.jpg', 58),
('Mutant: Year Zero', 'Post-apocalyptique', 'Free League Publishing', 45, 'paid', ARRAY['Science-fiction'], ARRAY['Liées'], 'Intermédiaire', '/images/mutant-year-zero.jpg', 85);

-- Créer une fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer un trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_universes_updated_at 
    BEFORE UPDATE ON universes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
