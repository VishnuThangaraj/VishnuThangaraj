import React from 'react';
import DesktopIconRenderer from './DesktopIconSVGs';

/**
 * Desktop Icon Component
 * Authentic macOS desktop icon with squircle geometry, selection highlight,
 * and text drop-shadow for high legibility against wallpapers.
 */
const DesktopIcon = ({
  iconData,
  isSelected = false,
  onSelect,
  onOpen,
}) => {
  const { id, title, icon } = iconData;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(id, e);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (onOpen) {
      onOpen(id, e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      if (onOpen) onOpen(id, e);
    } else if (e.key === ' ') {
      e.stopPropagation();
      if (onSelect) onSelect(id, e);
    }
  };

  return (
    <div
      className={`macos-desktop-icon ${isSelected ? 'selected' : ''}`}
      data-testid={`desktop-icon-${id}`}
      role="button"
      tabIndex={0}
      aria-label={title}
      aria-selected={isSelected}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '74px',
        cursor: 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        outline: 'none',
        gap: '4px',
        padding: '3px',
        borderRadius: '6px',
        transition: 'transform 0.12s ease',
      }}
    >
      {/* 58px Squircle Icon Container */}
      <div
        style={{
          width: '58px',
          height: '58px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isSelected ? 'brightness(0.88) contrast(1.1)' : 'none',
          transition: 'filter 0.1s ease',
        }}
      >
        <DesktopIconRenderer icon={icon} />
      </div>

      {/* Desktop Icon Label with authentic macOS drop shadow or selection pill */}
      <div
        data-testid={`desktop-icon-label-${id}`}
        style={{
          maxWidth: '80px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '1.25',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          color: '#ffffff',
          borderRadius: '4px',
          padding: '1px 5px',
          backgroundColor: isSelected ? 'rgba(0, 122, 255, 0.85)' : 'transparent',
          textShadow: isSelected
            ? 'none'
            : '0 1px 3px rgba(0, 0, 0, 0.85), 0 0 5px rgba(0, 0, 0, 0.65)',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          pointerEvents: 'none',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default DesktopIcon;
