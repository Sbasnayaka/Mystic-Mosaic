import { create } from 'zustand';

export type Player = { 
  id: string; 
  name: string; 
  isHost: boolean; 
};

export type GameStatus = 'waiting' | 'playing' | 'completed' | 'full';

interface GameState {
  roomId: string | null;
  players: Player[];
  status: GameStatus;
  
  // Actions
  createRoom: () => string;
  joinRoom: (roomId: string, playerName?: string) => boolean; // Returns true if successful, false if full
  leaveRoom: () => void;
  startGame: () => void;
  setFull: () => void;
}

// Helper to generate a random 4-character alphanumeric string
const generateId = () => Math.random().toString(36).substring(2, 6).toUpperCase();

export const useGameStore = create<GameState>((set, get) => ({
  roomId: null,
  players: [],
  status: 'waiting',

  createRoom: () => {
    const newRoomId = `MAGIC-${generateId()}`;
    // Generate a temporary anonymous ID for the host
    const hostId = `host-${generateId()}`;
    
    set({
      roomId: newRoomId,
      players: [{ id: hostId, name: 'Host (You)', isHost: true }],
      status: 'waiting',
    });
    
    return newRoomId;
  },

  joinRoom: (roomId, playerName) => {
    const { players } = get();
    
    // STRICT RULE: Maximum 4 players
    if (players.length >= 4) {
      set({ status: 'full' });
      return false;
    }

    const newPlayer = {
      id: `player-${generateId()}`,
      name: playerName || `Player ${players.length + 1}`,
      isHost: false,
    };

    set((state) => ({
      roomId,
      players: [...state.players, newPlayer],
      status: 'waiting',
    }));
    
    return true;
  },

  leaveRoom: () => set({ roomId: null, players: [], status: 'waiting' }),

  startGame: () => set({ status: 'playing' }),

  setFull: () => set({ status: 'full' }),
}));