-- ÉTAPE 2: TABLES SUPABASE REQUISES
-- Script exact selon les nouvelles consignes

-- Table campaigns
CREATE TABLE campaigns (
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

-- Table players
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  character_name TEXT,
  avatar_url TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active'
);

-- RLS Policies
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own campaigns" ON campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own campaigns" ON campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaigns" ON campaigns FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own campaigns" ON campaigns FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view players in their campaigns" ON players FOR SELECT USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = players.campaign_id AND campaigns.user_id = auth.uid())
);
CREATE POLICY "Users can manage players in their campaigns" ON players FOR ALL USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = players.campaign_id AND campaigns.user_id = auth.uid())
);
