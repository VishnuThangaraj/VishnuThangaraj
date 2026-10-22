import React from 'react';

/**
 * Desktop Component
 * Provides full-screen macOS desktop canvas.
 * Per specification: Desktop surface is kept clean and empty for future additions.
 */
const Desktop = ({ children, wallpaperUrl = '/wallpaper.webp' }) => {
  return (
    <main
      className="macos-desktop"
      style={{
        backgroundImage: `url(${wallpaperUrl}), linear-gradient(135deg, #e8dfcf 0%, #a4c9d8 40%, #7aa8bd 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-testid="macos-desktop"
      role="region"
      aria-label="macOS Desktop"
    >
      {/* Empty Desktop surface — User will add desktop items/windows later */}
      <div className="absolute inset-0 z-0 pointer-events-none" />

      {/* Render children (e.g. Dock, Modals, System UI) */}
      {children}
    </main>
  );
};

export default Desktop;
