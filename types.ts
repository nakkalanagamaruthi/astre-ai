
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  vrImageUrl: string;
  safetyScore: number;
  coordinates: [number, number];
  scamAlerts: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface TravelAlert {
  id: string;
  type: 'safety' | 'weather' | 'scam' | 'info';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface UserContext {
  location: string | null;
  budget: 'low' | 'medium' | 'high';
  interests: string[];
  currentTripId: string | null;
}
