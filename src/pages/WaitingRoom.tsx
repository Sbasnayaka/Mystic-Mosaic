import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { PixelButton } from '../components/PixelButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { Copy, Check, Users } from 'lucide-react';

export function WaitingRoom() {
  const { roomId, players, status, startGame, leaveRoom } = useGameStore();
  const { isDark, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  // The host is always the first player in the array
  const isHost = players[0]?.isHost;

  // Construct the shareable URL
  const shareUrl = roomId ? `${window.location.origin}/room/${roomId}` : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // If the room somehow became full, redirect to error screen (handled in App.tsx)
  if (status === 'full') {
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <div className="pixel-card max-w-md w-full text-center relative animate-float" style={{ animationDuration: '8s' }}>
        
        {/* Header */}
        <div className="mb-6">
          <p className="font-pixel text-sm text-magic-600 dark:text-accent mb-2 tracking-widest">
            ROOM ONLINE <span className="animate-blink">_</span>
          </p>
          <h2 className="font-pixel text-4xl text-magic-900 dark:text-magic-100 mb-4">
            {roomId}
          </h2>
          
          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 font-pixel text-lg px-4 py-3 
                       bg-magic-100 dark:bg-cosmic-800 text-magic-900 dark:text-magic-100 
                       border-4 border-magic-900 dark:border-cosmic-950 rounded-sm
                       active:translate-y-[2px] transition-all mb-6"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
            {copied ? 'LINK COPIED!' : 'COPY INVITATION LINK'}
          </button>
       5

        {/* Player List */}
        <div className="bg-magic-50 dark:bg-cosmic-950 border-4 border-magic-900 dark:border-cosmic-800 p-4 mb-6 rounded-sm">
          <div className="flex items-center justify-between mb-3 border-b-2 border-magic-200 dark:border-cosmic-800 pb-2">
            <span className="font-pixel text-magic-600 dark:text-accent flex items-center gap-2">
              <Users className="w-5 h-5" /> PLAYERS
            </span>
            <span className="font-pixel text-sm bg-accent text-white px-2 py-1 rounded-sm">
              {players.length} / 4
            </span>
          </div>
          
          <div className="space-y-2 text-left">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between font-body">
                <span className="text-magic-900 dark:text-magic-100">
                  {player.isHost ? '✨ ' : '○ '}{player.name}
                </span>
                {player.isHost && (
                  <span className="text-xs font-pixel bg-magic-200 dark:bg-cosmic-800 text-magic-900 dark:text-magic-100 px-2 py-1 rounded-sm">
                    HOST
                  </span>
                )}
              </div>
            ))}
            
            {/* Empty Slots */}
            {Array.from({ length: 4 - players.length }).map((_, i) => (
              <div key={`empty-${i}`} className="flex items-center justify-between font-body opacity-50">
                <span className="text-magic-400 dark:text-cosmic-800">○ Waiting...</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {isHost ? (
            <PixelButton variant="primary" onClick={startGame}>
              ✦ START PUZZLE
            </PixelButton>
          ) : (
            <div className="font-pixel text-xl text-magic-600 dark:text-accent animate-pulse">
              Waiting for host to start...
            </div>
          )}
          
          <button 
            onClick={leaveRoom}
            className="w-full font-pixel text-sm text-magic-600 dark:text-magic-400 hover:text-red-500 dark:hover:text-red-400 transition-colors mt-4"
          >
            LEAVE ROOM
          </button>
        </div>

      </div>
    </div>
    </div>
  );
}