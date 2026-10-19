import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';

// Temporary placeholder component for the next phases
function CreateRoomFlow() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-pixel text-2xl text-accent p-4 text-center">
      <p>✦ PHASE 4: CREATE ROOM FLOW COMING NEXT ✦</p>
      <button 
        onClick={() => window.location.reload()} 
        className="pixel-btn text-base mt-4"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default function App() {
  // Simple state to manage which "screen" the user is on.
  // In Phase 4, we will upgrade this to use actual URL routing (e.g., /room/ABCD12)
  // so links can be shared with friends.
  const [currentView, setCurrentView] = useState<'landing' | 'create' | 'join'>('landing');

  const handleCreateRoom = () => {
    setCurrentView('create');
  };

  const handleJoinRoom = () => {
    setCurrentView('join');
  };

  return (
    <main className="min-h-screen bg-magic-50 dark:bg-cosmic-950 transition-colors duration-300">
      {/* Render Landing Page if user is on the home screen */}
      {currentView === 'landing' && (
        <LandingPage 
          onCreateRoom={handleCreateRoom} 
          onJoinRoom={handleJoinRoom} 
        />
      )}
      
      {/* Render placeholder screens for Create/Join (to be built in Phase 4) */}
      {currentView === 'create' && <CreateRoomFlow />}
      {currentView === 'join' && <CreateRoomFlow />}
    </main>
  );
}