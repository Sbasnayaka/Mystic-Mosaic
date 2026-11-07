import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { RoomSetup } from './pages/RoomSetup';
import { WaitingRoom } from './pages/WaitingRoom';
import { RoomFull } from './pages/RoomFull';
import { useGameStore } from './store/gameStore';

function GameBoardPlaceholder() {
  const { leaveRoom } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-pixel text-2xl text-accent p-4 text-center">
      <p>✦ PHASE 6 & 7: DIFFICULTY & PUZZLE ENGINE COMING NEXT ✦</p>
      <button onClick={leaveRoom} className="pixel-btn text-base mt-4">
        ← Leave Room
      </button>
    </div>
  );
}

export default function App() {
  const { createRoom, joinRoom, roomId, status, leaveRoom } = useGameStore();

  const [view, setView] = useState<
    'landing' | 'setup' | 'waiting' | 'full' | 'playing'
  >('landing');

  // 1. Handle URL join ONCE on mount (guard against StrictMode double-run)
  useEffect(() => {
    const path = window.location.pathname;
    const roomMatch = path.match(/^\/room\/(.+)$/);
    if (!roomMatch) return;

    // Already joined (StrictMode double-effect guard)
    if (useGameStore.getState().roomId) return;

    const targetRoomId = roomMatch[1].toUpperCase();
    const success = joinRoom(targetRoomId);
    setView(success ? 'waiting' : 'full');
  }, [joinRoom]);

  // 2. Only status drives view now — NO image-driven switching
  useEffect(() => {
    if (status === 'full') setView('full');
    else if (status === 'playing') setView('playing');
  }, [status]);

  // 3. Create a room
  const handleCreateRoom = () => {
    const newRoomId = createRoom();          // returns 'MAGIC-XXXX'
    window.history.pushState({}, '', `/room/${newRoomId}`);
    setView('setup');
  };

  // 4. Join from landing page
  const handleJoinFromLanding = (inputCode: string) => {
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) return;

    window.history.pushState({}, '', `/room/${cleanCode}`);

    const success = joinRoom(cleanCode);
    setView(success ? 'waiting' : 'full');
  };

  // 5. Setup complete → go to lobby (only fires from the button)
  const handleSetupComplete = () => {
    setView('waiting');
  };

  // 6. Leave
  const handleLeave = () => {
    leaveRoom();
    window.history.pushState({}, '', '/');
    setView('landing');
  };

  return (
    <main className="min-h-screen bg-magic-50 dark:bg-cosmic-950 transition-colors duration-300">
      {view === 'landing' && (
        <LandingPage
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinFromLanding}
        />
      )}

      {view === 'setup' && <RoomSetup onProceed={handleSetupComplete} />}

      {view === 'waiting' && (
        <WaitingRoom onStartGame={() => setView('playing')} />
      )}

      {view === 'full' && <RoomFull />}

      {view === 'playing' && <GameBoardPlaceholder />}
    </main>
  );
}