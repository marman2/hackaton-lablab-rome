import { create } from 'zustand';
import { User, Marker, ChatMessage, Challenge } from '../types';
import { calculateLevel, getNextLevelPoints } from '../utils/levels';
import { checkBadgeEligibility } from '../utils/badges';

interface Store {
  currentUser: User | null;
  markers: Marker[];
  messages: ChatMessage[];
  challenges: Challenge[];
  addMarker: (marker: Partial<Marker>) => void;
  addMessage: (message: ChatMessage) => void;
  completeChallenge: (challengeId: string) => void;
  getNearestMarkers: (lat: number, lng: number, flags?: string[]) => Marker[];
  createChallenge: (challenge: Partial<Challenge>) => void;
  login: (username: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  currentUser: null,
  markers: [],
  messages: [],
  challenges: [],

  login: (username: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      points: 0,
      completedChallenges: [],
      level: 1,
      badges: []
    };
    set({ currentUser: newUser });
  },

  addMarker: (marker: Partial<Marker>) => {
    const newMarker: Marker = {
      id: Date.now().toString(),
      latitude: marker.latitude!,
      longitude: marker.longitude!,
      description: marker.description!,
      type: marker.type || 'trash',
      flags: marker.flags || [],
      images: marker.images || [],
      createdAt: new Date(),
      createdBy: get().currentUser?.username || 'Anonymous',
      status: 'active'
    };
    set((state) => ({ markers: [...state.markers, newMarker] }));
  },

  addMessage: (message: ChatMessage) =>
    set((state) => ({ messages: [...state.messages, message] })),

  completeChallenge: (challengeId: string) => {
    set((state) => {
      if (!state.currentUser) return state;

      const challenge = state.challenges.find(c => c.id === challengeId);
      if (!challenge) return state;

      const updatedUser = {
        ...state.currentUser,
        points: state.currentUser.points + (challenge.points || 50),
        completedChallenges: [...state.currentUser.completedChallenges, challengeId],
        level: calculateLevel(state.currentUser.points + (challenge.points || 50))
      };

      const newBadges = checkBadgeEligibility(updatedUser);
      updatedUser.badges = [...updatedUser.badges, ...newBadges];

      return {
        ...state,
        currentUser: updatedUser,
        challenges: state.challenges.map(c =>
          c.id === challengeId ? { ...c, status: 'completed' } : c
        )
      };
    });
  },

  getNearestMarkers: (lat: number, lng: number, flags?: string[]) => {
    const markers = get().markers;
    return markers
      .filter(marker => 
        !flags || flags.some(flag => marker.flags.includes(flag))
      )
      .map(marker => ({
        ...marker,
        distance: calculateDistance(lat, lng, marker.latitude, marker.longitude)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  },

  createChallenge: (challenge: Partial<Challenge>) => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      markerId: challenge.markerId!,
      points: challenge.points || 50,
      description: challenge.description!,
      type: challenge.type || 'cleanup',
      flags: challenge.flags || [],
      status: 'active',
      requiredFlags: challenge.requiredFlags || []
    };
    set((state) => ({ challenges: [...state.challenges, newChallenge] }));
  }
}));

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}