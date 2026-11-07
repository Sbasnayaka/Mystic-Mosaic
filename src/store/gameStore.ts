
import { create } from 'zustand';
import { getDifficultyConfig, type DifficultyConfig } from '../utils/difficulty';

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

  // Image storage
  image: string | null;
  setImage: (imageData: string) => void;
  clearImage: () => void;

  // Difficulty settings
  difficultyLevel: number;
  setDifficultyLevel: (level: number) => void;
  getCurrentDifficulty: () => DifficultyConfig;

  // Actions
  createRoom: () => string;
  joinRoom: (roomId: string, playerName?: string) => boolean;
  leaveRoom: () => void;
  startGame: () => void;
  setFull: () => void;
}

// Helper to generate a random 4-character alphanumeric string
const generateId = () =>
  Math.random().toString(36).substring(2, 6).toUpperCase();

export const useGameStore = create<GameState>((set, get) => ({
  roomId: null,
  players: [],
  status: 'waiting',

  // Image state
  image: null,

  // Difficulty state (Level 6 = 64 pieces)
  difficultyLevel: 6,

  // Create a new game room
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

  // Join an existing game room
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

  // Save the processed image
  setImage: (imageData) => set({ image: imageData }),

  // Clear the stored image
  clearImage: () => set({ image: null }),

  // Update the selected difficulty level
  setDifficultyLevel: (level) => set({ difficultyLevel: level }),

  // Get the configuration for the current difficulty
  getCurrentDifficulty: () => {
    const { difficultyLevel } = get();
    return getDifficultyConfig(difficultyLevel);
  },

  // Leave room
  leaveRoom: () =>
    set({ roomId: null, players: [], status: 'waiting' }),

  // Start game
  startGame: () => set({ status: 'playing' }),

  // Mark room as full
  setFull: () => set({ status: 'full' }),
}));
