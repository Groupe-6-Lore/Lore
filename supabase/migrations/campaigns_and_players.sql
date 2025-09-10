-- Add missing columns to existing campaigns table
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS game_system TEXT;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS universe TEXT;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS resume TEXT;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS last_session TIMESTAMP WITH TIME ZONE;

-- Update existing campaigns to have default values for new required columns
UPDATE campaigns SET game_system = 'D&D 5e' WHERE game_system IS NULL;
UPDATE campaigns SET universe = 'Forgotten Realms' WHERE universe IS NULL;

-- Make the new columns NOT NULL after setting defaults
ALTER TABLE campaigns ALTER COLUMN game_system SET NOT NULL;
ALTER TABLE campaigns ALTER COLUMN universe SET NOT NULL;

-- Table players (create only if it doesn't exist)
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

-- RLS Policies (campaigns already has RLS enabled from initial_schema.sql)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Players policies
CREATE POLICY "Users can view players in their campaigns" ON players FOR SELECT USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = players.campaign_id AND campaigns.user_id = auth.uid())
);
CREATE POLICY "Users can manage players in their campaigns" ON players FOR ALL USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = players.campaign_id AND campaigns.user_id = auth.uid())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_campaign_id ON players(campaign_id);
CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);
