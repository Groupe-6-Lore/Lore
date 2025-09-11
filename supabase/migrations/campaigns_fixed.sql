-- Script corrigé pour créer les tables campaigns et players avec RLS

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Users can view their own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can insert their own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update their own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete their own campaigns" ON campaigns;

DROP POLICY IF EXISTS "Users can view players in their campaigns" ON players;
DROP POLICY IF EXISTS "Users can manage players in their campaigns" ON players;

-- Table campaigns (création conditionnelle)
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  game_system TEXT NOT NULL,
  universe TEXT NOT NULL,
  description TEXT,
  resume TEXT,
  status TEXT DEFAULT 'active',
  last_session TIMESTAMP WITH TIME ZONE
);

-- Table players (création conditionnelle)
CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  character_name TEXT,
  avatar_url TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active'
);

-- Activer RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Politiques pour campaigns
CREATE POLICY "campaigns_select_policy" ON campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "campaigns_insert_policy" ON campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "campaigns_update_policy" ON campaigns FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "campaigns_delete_policy" ON campaigns FOR DELETE USING (auth.uid() = user_id);

-- Politiques pour players
CREATE POLICY "players_select_policy" ON players FOR SELECT USING (
  campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid())
);

CREATE POLICY "players_all_policy" ON players FOR ALL USING (
  campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid())
);
