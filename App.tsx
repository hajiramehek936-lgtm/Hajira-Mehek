
import React, { useState, useCallback } from 'react';
import type { Screen } from './types';
import IntroScreen from './components/IntroScreen';
import ChatScreen from './components/ChatScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('intro');

  const handleNavigateToChat = useCallback(() => {
    setScreen('chat');
  }, []);

  const handleNavigateToIntro = useCallback(() => {
    setScreen('intro');
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      {screen === 'intro' ? (
        <IntroScreen onNavigateToChat={handleNavigateToChat} />
      ) : (
        <ChatScreen onNavigateToIntro={handleNavigateToIntro} />
      )}
    </div>
  );
};

export default App;
