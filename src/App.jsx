import React, { useState } from 'react';
import Desktop from './components/Desktop';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import WidgetsContainer from './components/widgets/WidgetsContainer';
import DesktopIconsGrid from './components/desktop/DesktopIconsGrid';
import Window from './components/window/Window';
import CameraApp from './components/apps/CameraApp';
import YouTubeApp from './components/apps/youtube/YouTubeApp';

const App = () => {
  const [windows, setWindows] = useState({
    camera: { isOpen: false, isMinimized: false, zIndex: 30 },
    youtube: { isOpen: false, isMinimized: false, zIndex: 30 },
  });

  const handleOpenApp = (id) => {
    if (id === 'linkedin') {
      window.open('https://www.linkedin.com/in/vishnuthangaraj', '_blank', 'noopener,noreferrer');
      return;
    }

    if (id === 'github') {
      window.open('https://github.com/VishnuThangaraj', '_blank', 'noopener,noreferrer');
      return;
    }

    if (id === 'camera') {
      setWindows((prev) => ({
        ...prev,
        camera: { isOpen: true, isMinimized: false, zIndex: 35 },
      }));
      return;
    }

    if (id === 'youtube') {
      setWindows((prev) => ({
        ...prev,
        youtube: { isOpen: true, isMinimized: false, zIndex: 35 },
      }));
      return;
    }
  };

  const handleCloseWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const handleMinimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  };

  const handleFocusWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: 35 },
    }));
  };

  return (
    <Desktop>
      <TopBar />
      <DesktopIconsGrid onOpenIcon={handleOpenApp} />
      <WidgetsContainer />

      {/* Common Window System: Camera Window */}
      <Window
        id="camera"
        title="Camera"
        isOpen={windows.camera.isOpen}
        isMinimized={windows.camera.isMinimized}
        onClose={() => handleCloseWindow('camera')}
        onMinimize={() => handleMinimizeWindow('camera')}
        onFocus={() => handleFocusWindow('camera')}
        defaultPosition={{ x: 180, y: 70 }}
        defaultSize={{ width: 560, height: 480 }}
        zIndex={windows.camera.zIndex}
      >
        <CameraApp />
      </Window>

      {/* Common Window System: YouTube Window */}
      <Window
        id="youtube"
        title="Youtube"
        isOpen={windows.youtube.isOpen}
        isMinimized={windows.youtube.isMinimized}
        onClose={() => handleCloseWindow('youtube')}
        onMinimize={() => handleMinimizeWindow('youtube')}
        onFocus={() => handleFocusWindow('youtube')}
        defaultPosition={{ x: 80, y: 55 }}
        defaultSize={{ width: 880, height: 530 }}
        zIndex={windows.youtube.zIndex}
      >
        <YouTubeApp />
      </Window>

      <Dock onAppClick={handleOpenApp} />
    </Desktop>
  );
};

export default App;
