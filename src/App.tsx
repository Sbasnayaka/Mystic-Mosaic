import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { WaitingRoom } from './pages/WaitingRoom';
import { RoomFull } from './pages/RoomFull';
import { useGameStore } from './store/gameStore';

// Temporary placeholder for the next phase
function GameSetup() {
  const { leaveRoom } = useGameStore();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-pixel text-2xl text-accent p-4 text-center">
      <p>✦ PHASE 5 & 6: IMAGE UPLOAD & DIFFICULTY COMING NEXT ✦</p>
      <button onClick={leaveRoom} className="pixel-btn text-base mt-4">
        ← Leave Room
      </button>
    </div>
  );
}

export default function App() {
  const { createRoom, joinRoom, roomId, status, leaveRoom } = useGameStore();
  const [view, setView] = useState<'landing' | 'waiting' | 'full' | 'setup'>('landing');

  // 1. Check URL on initial load to see if we should auto-join a room
  useEffect(() => {
    const path = window.location.pathname;
    const roomMatch = path.match(/^\/room\/(.+)$/);

    if (roomMatch) {
      const targetRoomId = roomMatch[1].toUpperCase();
      // Attempt to join. If it fails (e.g., full), the store handles it.
      // For now, we simulate a join. In Phase 8, this will be a real PeerJS connection.
      const success = joinRoom(targetRoomId);
      if (success) {
        setView('waiting');
      } else {
        setView('full');
      }
    }
  }, [joinRoom]);

  // 2. Sync view with store status
  useEffect(() => {
    if (status === 'full') setView('full');
    else if (status === 'playing') setView('setup'); // Will become GameBoard later
    else if (roomId && status === 'waiting') setView('waiting');
    else if (!roomId) setView('landing');
  }, [roomId, status]);

  // 3. Action Handlers
  const handleCreateRoom = () => {
    const newRoomId = createRoom();
    // Update the browser URL without reloading the page
    window.history.pushState({}, '', `/room/${newRoomId}`);
    setView('waiting');
  };

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

  const handleLeave = () => {
    leaveRoom();
    window.history.pushState({}, '', '/'); // Reset URL to home
    setView('landing');
  };

  return (
    <main className="min-h-screen bg-magic-50 dark:bg-cosmic-950 transition-colors duration-300">
      {view === 'landing' && (
        <LandingPage 
          onCreateRoom={handleCreateRoom} 
          onJoinRoom={(code?: string) => {
             if (code) handleJoinFromLanding(code);
             else {
               // If they clicked "Join" without typing, we can show a prompt or just focus the input
               // For simplicity, we'll let the LandingPage handle the input state and pass it here
             }
          }} 
        />
      )}
      
      {/* We need to slightly adjust LandingPage to pass the input code. 
          See the note below on how to update LandingPage.tsx */}
      
      {view === 'waiting' && <WaitingRoom />}
      {view === 'full' && <RoomFull />}
      {view === 'setup' && <GameSetup />}
    </main>
  );
}