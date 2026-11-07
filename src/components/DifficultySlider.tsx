import { useGameStore } from '../store/gameStore';
import { getDifficultyConfig } from '../utils/difficulty';

interface DifficultySliderProps {
  isHost: boolean;
}

export function DifficultySlider({ isHost }: DifficultySliderProps) {
  const { difficultyLevel, setDifficultyLevel } = useGameStore();
  const config = getDifficultyConfig(difficultyLevel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isHost) {
      setDifficultyLevel(Number(e.target.value));
    }
  };

  // Determine color based on difficulty for visual feedback
  const getLabelColor = () => {
    if (config.level <= 2) return 'text-green-600 dark:text-green-400';
    if (config.level <= 6) return 'text-magic-600 dark:text-magic-400';
    if (config.level <= 10) return 'text-orange-600 dark:text-orange-400';
    return 'text-accent animate-pulse';
  };

  return (
    <div className={`w-full p-4 border-4 border-magic-900 dark:border-cosmic-800 bg-magic-50 dark:bg-cosmic-950 rounded-sm ${!isHost ? 'opacity-75' : ''}`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-pixel text-lg text-magic-900 dark:text-magic-100">
          PUZZLE COMPLEXITY
        </span>
        {!isHost && (
          <span className="font-pixel text-xs bg-magic-200 dark:bg-cosmic-800 text-magic-900 dark:text-magic-100 px-2 py-1 rounded-sm">
            HOST CONTROLLED
          </span>
        )}
      </div>

      {/* Slider */}
      <input
        type="range"
        min="1"
        max="12"
        step="1"
        value={difficultyLevel}
        onChange={handleChange}
        disabled={!isHost}
        className="retro-slider mb-6"
      />

      {/* Dynamic Feedback Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-pixel">
        <div className="text-center sm:text-left">
          <div className="text-3xl font-bold text-magic-900 dark:text-magic-100">
            {config.pieces} <span className="text-base font-normal">PIECES</span>
          </div>
          <div className="text-sm text-magic-600 dark:text-magic-400">
            Grid: {config.rows} × {config.cols}
          </div>
        </div>

        <div className={`text-2xl tracking-widest ${getLabelColor()}`}>
          ✦ {config.label} ✦
        </div>
      </div>

    </div>
  );
}