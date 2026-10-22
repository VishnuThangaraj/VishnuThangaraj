import React from 'react';
import Desktop from './components/Desktop';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import WidgetsContainer from './components/widgets/WidgetsContainer';

const App = () => {
  return (
    <Desktop>
      <TopBar />
      <WidgetsContainer />
      {/* Desktop surface kept clean and empty as requested */}
      <Dock />
    </Desktop>
  );
};

export default App;
