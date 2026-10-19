import { PixelButton } from '../components/PixelButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

interface LandingPageProps {
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
}

export function LandingPage({ onCreateRoom, onJoinRoom }: LandingPageProps) {
  const { isDark, toggleTheme } = useTheme();
  const [joinInput, setJoinInput] = useState('');

  const handleJoinClick = () => {
    if (joinInput.trim()) {
      onJoinRoom(joinInput); // Pass the code up to App.tsx
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-sm animate-float opacity-50" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-magic-400 rounded-sm animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-magic-600 rounded-sm animate-float opacity-60" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content Card */}
      <div 
        className="pixel-card max-w-md w-full text-center relative z-10" 
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        
        {/* Retro Header */}
        <div className="mb-6 border-b-4 border-magic-200 dark:border-cosmic-800 pb-4">
          <p className="font-pixel text-sm text-magic-600 dark:text-accent mb-2 tracking-widest">
            SYSTEM READY <span className="animate-blink">_</span>
          </p>
          <h1 className="font-pixel text-5xl md:text-6xl text-magic-900 dark:text-magic-100 leading-tight">
            MYSTIC<br />
            <span className="text-accent">MOSAIC</span>
          </h1>
          <p className="font-body text-magic-600 dark:text-magic-200 mt-4 text-lg">
            Turn a memory into a puzzle.<br />
            Make it. Share it. Solve it together.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {/* Primary Action */}
          <PixelButton variant="primary" onClick={onCreateRoom}>
            ✦ Create a Puzzle Room
          </PixelButton>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-magic-300 dark:border-cosmic-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-cosmic-900 font-pixel text-magic-600 dark:text-accent">
                OR JOIN EXISTING
              </span>
            </div>
          </div>

          {/* Join Input & Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="ROOM CODE (e.g., MAGIC-7F3K)"
              value={joinInput}
              onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleJoinClick()}
              className="flex-1 font-pixel text-lg px-4 py-3 bg-magic-50 dark:bg-cosmic-950 
                         border-4 border-magic-900 dark:border-cosmic-800 rounded-sm 
                         placeholder-magic-400 dark:placeholder-cosmic-800
                         focus:outline-none focus:border-accent transition-colors uppercase"
              maxLength={12}
            />
            <PixelButton 
              variant="secondary" 
              onClick={handleJoinClick}
              disabled={!joinInput.trim()}
            >
              JOIN
            </PixelButton>
          </div>
        </div>

        {/* Footer Status */}
        <div className="mt-8 pt-4 border-t-4 border-magic-200 dark:border-cosmic-800">
          <p className="font-pixel text-xs text-magic-400 dark:text-cosmic-800">
            NO ACCOUNT REQUIRED • 100% FREE • PEER-TO-PEER
          </p>
        </div>
      </div>
    </div>
  );
}