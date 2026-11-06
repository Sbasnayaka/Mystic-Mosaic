
import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { RoomSetup } from './pages/RoomSetup';
import { WaitingRoom } from './pages/WaitingRoom';
import { RoomFull } from './pages/RoomFull';
import { useGameStore } from './store/gameStore';

// Temporary placeholder for Phase 6/7
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
  const {
    createRoom,
    joinRoom,
    roomId,
    status,
    image,
    leaveRoom,
  } = useGameStore();

  // Views
  const [view, setView] = useState<
    'landing' | 'setup' | 'waiting' | 'full' | 'playing'
  >('landing');

  // 1. Check URL on initial load
  useEffect(() => {
    const path = window.location.pathname;
    const roomMatch = path.match(/^\/room\/(.+)$/);

    if (roomMatch) {
      const targetRoomId = roomMatch[1].toUpperCase();
      const success = joinRoom(targetRoomId);

      if (success) {
        // Joining players skip image setup
        setView('waiting');
      } else {
        setView('full');
      }
    }
  }, [joinRoom]);

  // 2. Sync view with store status
  useEffect(() => {
    if (status === 'full') {
      setView('full');
    } else if (status === 'playing') {
      setView('playing');
    } else if (roomId && status === 'waiting') {
      // Host uploads an image before entering the waiting room
      setView(image ? 'waiting' : 'setup');
    } else if (!roomId) {
      setView('landing');
    }
  }, [roomId, status, image]);

  // 3. Create a room
  const handleCreateRoom = () => {
    createRoom();

    // Temporary setup URL
    window.history.pushState({}, '', '/room/SETUP');

    setView('setup');
  };

  // 4. Join a room from landing page
  const handleJoinFromLanding = (inputCode: string) => {
    const cleanCode = inputCode.trim().toUpperCase();

    if (!cleanCode) return;

    window.history.pushState({}, '', `/room/${cleanCode}`);

    const success = joinRoom(cleanCode);

    if (success) {
      setView('waiting');
    } else {
      setView('full');
    }
  };

  // 5. Complete room setup
  const handleSetupComplete = () => {
    // Host has uploaded an image
    // Move to waiting room to share the room link
    window.history.pushState({}, '', `/room/${roomId}`);

    setView('waiting');
  };

  // 6. Leave room
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

      {view === 'setup' && (
        <RoomSetup onProceed={handleSetupComplete} />
      )}

      {view === 'waiting' && (
        <WaitingRoom onStartGame={() => setView('playing')} />
      )}

      {view === 'full' && <RoomFull />}

      {view === 'playing' && <GameBoardPlaceholder />}

    </main>
  );
}
