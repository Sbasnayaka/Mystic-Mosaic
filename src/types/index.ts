export type PlayerRole = 'host' | 'player';

export interface Player {
  id: string;
  name: string; // e.g., "Player 01" or custom nickname
  role: PlayerRole;
  joinedAt: number;
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DifficultyConfig {
  level: DifficultyLevel;
  rows: number;
  cols: number;
  totalPieces: number;
  label: string; // e.g., "EASY", "MAGIC MASTER"
  enableRotation: boolean;
}

export interface PuzzlePiece {
  id: string;
  correctRow: number;
  correctCol: number;
  currentX: number;
  currentY: number;
  rotation: number; // 0, 90, 180, 270
  isPlaced: boolean;
  ownerId: string | null; // Who is currently dragging it (for conflict resolution)
  edges: {
    top: 'flat' | 'tab' | 'blank';
    right: 'flat' | 'tab' | 'blank';
    bottom: 'flat' | 'tab' | 'blank';
    left: 'flat' | 'tab' | 'blank';
  };
}

export type GameStatus = 'lobby' | 'playing' | 'completed';

export interface RoomState {
  roomId: string;
  hostId: string;
  players: Player[];
  imageDataUrl: string | null; // Base64 or Object URL for ephemeral handling
  difficulty: DifficultyConfig;
  status: GameStatus;
  startTime: number | null; // Timestamp for synchronized timer
  elapsedTime: number; // In seconds
}