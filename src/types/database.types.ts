export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'archived' | 'completed';
}

export interface Character {
  id: string;
  name: string;
  type: 'npc' | 'pc';
  race: string;
  class: string;
  level: number;
  description: string;
  campaign_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  campaign_id: string;
  created_at: string;
  updated_at: string;
  reward: string;
  giver_id: string; // Character ID of quest giver
}

export interface Document {
  id: string;
  title: string;
  type: 'rule' | 'note' | 'lore';
  content: string;
  campaign_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  file_path?: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  campaign_id: string;
  created_at: string;
  updated_at: string;
}



