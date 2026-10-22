import React from 'react';
import Desktop from './components/Desktop';
import TopBar from './components/TopBar';
import Dock from './components/Dock';

const App = () => {
  return (
    <Desktop>
      <TopBar />
      {/* Desktop surface kept clean and empty as requested */}
      <Dock />
    </Desktop>
  );
};

export default App;
