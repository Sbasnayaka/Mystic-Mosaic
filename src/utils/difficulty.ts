export interface DifficultyConfig {
  level: number;
  rows: number;
  cols: number;
  pieces: number;
  label: string;
}

// Strict mapping from Level 1 (9 pieces) to Level 12 (360 pieces)
export const DIFFICULTY_LEVELS: DifficultyConfig[] = [
  { level: 1, rows: 3, cols: 3, pieces: 9, label: 'EASY' },
  { level: 2, rows: 4, cols: 4, pieces: 16, label: 'EASY' },
  { level: 3, rows: 5, cols: 5, pieces: 25, label: 'NORMAL' },
  { level: 4, rows: 6, cols: 6, pieces: 36, label: 'NORMAL' },
  { level: 5, rows: 7, cols: 7, pieces: 49, label: 'MEDIUM' },
  { level: 6, rows: 8, cols: 8, pieces: 64, label: 'MEDIUM' },
  { level: 7, rows: 10, cols: 10, pieces: 100, label: 'HARD' },
  { level: 8, rows: 12, cols: 12, pieces: 144, label: 'HARD' },
  { level: 9, rows: 14, cols: 14, pieces: 196, label: 'EXPERT' },
  { level: 10, rows: 16, cols: 16, pieces: 256, label: 'EXPERT' },
  { level: 11, rows: 15, cols: 20, pieces: 300, label: 'MAGIC MASTER' },
  { level: 12, rows: 18, cols: 20, pieces: 360, label: 'MAGIC MASTER' },
];

// Helper to get config by level (defaults to level 6 if invalid)
export const getDifficultyConfig = (level: number): DifficultyConfig => {
  return DIFFICULTY_LEVELS.find(d => d.level === level) || DIFFICULTY_LEVELS[5];
};