import React from 'react';
import Desktop from './components/Desktop';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import WidgetsContainer from './components/widgets/WidgetsContainer';
import DesktopIconsGrid from './components/desktop/DesktopIconsGrid';

const App = () => {
  return (
    <Desktop>
      <TopBar />
      <DesktopIconsGrid />
      <WidgetsContainer />
      <Dock />
    </Desktop>
  );
};

export default App;
