export interface User {
  id: string;
  username: string;
  points: number;
  completedChallenges: string[];
  avatar?: string;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Marker {
  id: string;
  latitude: number;
  longitude: number;
  description: string;
  type: 'trash' | 'recycling' | 'challenge';
  flags: string[];
  images: string[];
  createdAt: Date;
  createdBy: string;
  status: 'active' | 'completed';
}

export interface Challenge {
  id: string;
  markerId: string;
  points: number;
  description: string;
  type: 'cleanup' | 'recycling';
  flags: string[];
  status: 'active' | 'completed';
  deadline?: Date;
  requiredFlags: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}