import { ImageUploader } from '../components/ImageUploader';
import { PixelButton } from '../components/PixelButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { useGameStore } from '../store/gameStore';
import { ArrowRight } from 'lucide-react';

interface RoomSetupProps {
  onProceed: () => void;
}

export function RoomSetup({ onProceed }: RoomSetupProps) {
  const { isDark, toggleTheme } = useTheme();
  const { image, leaveRoom } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <div className="pixel-card max-w-2xl w-full text-center relative">
        
        {/* Header */}
        <div className="mb-6">
          <p className="font-pixel text-sm text-magic-600 dark:text-accent mb-2 tracking-widest">
            PUZZLE ENGINE INITIALIZING <span className="animate-blink">_</span>
          </p>
          <h2 className="font-pixel text-3xl md:text-4xl text-magic-900 dark:text-magic-100">
            Choose Your Memory
          </h2>
        </div>

        {/* Uploader */}
        <div className="mb-8">
          <ImageUploader />
        </div>

        {/* Prompt */}
        {image && (
          <div className="mb-8 animate-float" style={{ animationDuration: '4s' }}>
            <p className="font-pixel text-xl text-accent">
              ✦ Ready to turn this into a puzzle? ✦
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={leaveRoom}
            className="font-pixel text-magic-600 dark:text-magic-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            CANCEL
          </button>
          
          <PixelButton 
            variant="primary" 
            onClick={onProceed}
            disabled={!image}
            className={!image ? 'opacity-50 cursor-not-allowed' : ''}
          >
            CONTINUE TO SETTINGS <ArrowRight className="inline w-5 h-5 ml-2" />
          </PixelButton>
        </div>

      </div>
    </div>
  );
}