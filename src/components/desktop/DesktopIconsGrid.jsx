import React, { useState, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import { DESKTOP_ICONS } from './desktopIconsData';

/**
 * Desktop Icons Grid Component
 * Renders 19 macOS desktop icons in a 5-column layout matching reference/homescreen-icons.png.
 */
const DesktopIconsGrid = ({ icons = DESKTOP_ICONS, onOpenIcon }) => {
  const [selectedId, setSelectedId] = useState(null);

  // Click outside listener to deselect active icon
  useEffect(() => {
    const handleWindowClick = () => {
      setSelectedId(null);
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const handleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedId(id);
  };

  const handleOpen = (id, e) => {
    if (onOpenIcon) {
      onOpenIcon(id, e);
    }
  };

  return (
    <div
      className="macos-desktop-icons-grid"
      data-testid="desktop-icons-grid"
      role="region"
      aria-label="Desktop Icons Grid"
      style={{
        position: 'absolute',
        top: '46px',
        left: '36px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 74px)',
        columnGap: '32px',
        rowGap: '26px',
        zIndex: 10,
        pointerEvents: 'auto',
      }}
    >
      {icons.map((item) => (
        <DesktopIcon
          key={item.id}
          iconData={item}
          isSelected={selectedId === item.id}
          onSelect={handleSelect}
          onOpen={handleOpen}
        />
      ))}
    </div>
  );
};

export default DesktopIconsGrid;
