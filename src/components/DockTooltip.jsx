import React from 'react';

/**
 * macOS Dock Tooltip Component matching reference/dock-hover.png
 * Renders a crisp white rounded badge above the active hovered icon.
 */
const DockTooltip = ({ title, left, isVisible }) => {
  if (!isVisible || !title) return null;

  return (
    <div
      className="macos-dock-tooltip"
      data-testid="dock-tooltip"
      role="tooltip"
      style={{
        left: `${left}px`,
        bottom: 'calc(100% + 14px)',
      }}
    >
      {title}
    </div>
  );
};

export default DockTooltip;
