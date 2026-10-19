import { PixelButton } from '../components/PixelButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { useGameStore } from '../store/gameStore';

export function RoomFull() {
  const { isDark, toggleTheme } = useTheme();
  const { leaveRoom } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <div className="pixel-card max-w-md w-full text-center">
        <div className="mb-6">
          <p className="font-pixel text-6xl mb-4">🚪</p>
          <h2 className="font-pixel text-3xl text-red-600 dark:text-red-400 mb-2">
            ROOM IS FULL
          </h2>
          <p className="font-body text-magic-600 dark:text-magic-200">
            This magical room has reached its maximum capacity of 4 players.
          </p>
        </div>

        <PixelButton variant="secondary" onClick={leaveRoom}>
          ← BACK TO HOME
        </PixelButton>
      </div>
    </div>
  );
}