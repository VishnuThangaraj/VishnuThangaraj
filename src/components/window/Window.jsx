import React, { useState, useRef } from 'react';

/**
 * Reusable macOS Window Component
 * Authentic macOS window with draggable titlebar, pixel-perfect traffic lights
 * (close, minimize, maximize), edge-to-edge maximizing, and focus management.
 */
const Window = ({
  id,
  title,
  isOpen = false,
  isMinimized = false,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  defaultPosition = { x: 140, y: 65 },
  defaultSize = { width: 560, height: 480 },
  minWidth = 380,
  minHeight = 320,
  zIndex = 30,
  children,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  const windowRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, windowX: 0, windowY: 0 });

  // Handle Dragging via Title Bar
  const handleMouseDown = (e) => {
    // Only drag on left mouse button and not on control buttons or when maximized
    if (e.button !== 0 || e.target.closest('.macos-window-control-btn') || isMaximized) {
      return;
    }

    if (onFocus) onFocus();

    isDraggingRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      windowX: position.x,
      windowY: position.y,
    };

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = moveEvent.clientX - dragStartRef.current.mouseX;
      const deltaY = moveEvent.clientY - dragStartRef.current.mouseY;

      // Restrict dragging boundaries
      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 80, dragStartRef.current.windowX + deltaX)
      );
      // Top boundary: macOS TopBar is 28px height
      const newY = Math.max(
        28,
        Math.min(window.innerHeight - 80, dragStartRef.current.windowY + deltaY)
      );

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch Dragging Support
  const handleTouchStart = (e) => {
    if (e.target.closest('.macos-window-control-btn') || isMaximized) return;
    if (onFocus) onFocus();

    const touch = e.touches[0];
    isDraggingRef.current = true;
    dragStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      windowX: position.x,
      windowY: position.y,
    };

    const handleTouchMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const t = moveEvent.touches[0];
      const deltaX = t.clientX - dragStartRef.current.mouseX;
      const deltaY = t.clientY - dragStartRef.current.mouseY;

      const newX = Math.max(0, Math.min(window.innerWidth - 80, dragStartRef.current.windowX + deltaX));
      const newY = Math.max(28, Math.min(window.innerHeight - 80, dragStartRef.current.windowY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  // Toggle Maximize / Zoom
  const handleToggleMaximize = (e) => {
    if (e) e.stopPropagation();
    setIsMaximized((prev) => !prev);
    if (onMaximize) onMaximize(!isMaximized);
  };

  if (!isOpen || isMinimized) {
    return null;
  }

  // Maximized state covers the edges properly on top and sides, and rests above the Dock:
  // Top touches bottom of TopBar (top: 28px) flush, Left: 0, Right: 0, Width: 100vw, terminates above bottom Dock (height: calc(100vh - 112px))
  const currentStyle = isMaximized
    ? {
        position: 'fixed',
        top: '28px',
        left: '0px',
        right: '0px',
        width: '100vw',
        height: 'calc(100vh - 112px)',
        borderRadius: '0px 0px 12px 12px',
        zIndex,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.32)',
      }
    : {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        borderRadius: '12px',
        zIndex,
        boxShadow:
          '0 26px 70px rgba(0, 0, 0, 0.48), 0 0 0 0.5px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)',
      };

  return (
    <div
      ref={windowRef}
      className={`macos-window ${isMaximized ? 'maximized' : ''}`}
      data-testid={`macos-window-${id}`}
      role="dialog"
      aria-label={title}
      onMouseDown={() => onFocus && onFocus()}
      style={{
        ...currentStyle,
        background: '#1c1c1e',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        transition: isDraggingRef.current ? 'none' : 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Titlebar Header */}
      <div
        className="macos-window-titlebar"
        data-testid={`window-titlebar-${id}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={handleToggleMaximize}
        style={{
          height: '36px',
          background: 'linear-gradient(180deg, #ececec 0%, #dedede 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: isMaximized ? 'default' : 'grab',
          flexShrink: 0,
          padding: '0 12px',
        }}
      >
        {/* Authentic macOS Traffic Light Buttons */}
        <div
          className="macos-window-traffic-lights"
          onMouseEnter={() => setIsHoveringControls(true)}
          onMouseLeave={() => setIsHoveringControls(false)}
          style={{
            position: 'absolute',
            left: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Close (Red) */}
          <button
            type="button"
            className="macos-window-control-btn close"
            data-testid="window-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            aria-label="Close window"
            title="Close"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
              border: '0.5px solid rgba(0, 0, 0, 0.18)',
              boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              outline: 'none',
              transition: 'transform 0.08s ease, filter 0.08s ease',
            }}
          >
            <svg
              viewBox="0 0 10 10"
              style={{
                width: '6.5px',
                height: '6.5px',
                opacity: isHoveringControls ? 1 : 0,
                transition: 'opacity 0.12s ease-in-out',
              }}
            >
              <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Minimize (Yellow) */}
          <button
            type="button"
            className="macos-window-control-btn minimize"
            data-testid="window-minimize-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize();
            }}
            aria-label="Minimize window"
            title="Minimize"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
              border: '0.5px solid rgba(0, 0, 0, 0.18)',
              boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              outline: 'none',
              transition: 'transform 0.08s ease, filter 0.08s ease',
            }}
          >
            <svg
              viewBox="0 0 10 10"
              style={{
                width: '6.5px',
                height: '6.5px',
                opacity: isHoveringControls ? 1 : 0,
                transition: 'opacity 0.12s ease-in-out',
              }}
            >
              <line x1="2" y1="5" x2="8" y2="5" stroke="#5a3800" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Maximize / Zoom (Green) */}
          <button
            type="button"
            className="macos-window-control-btn maximize"
            data-testid="window-maximize-btn"
            onClick={handleToggleMaximize}
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            title={isMaximized ? 'Restore' : 'Maximize'}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#27c93f',
              border: '0.5px solid rgba(0, 0, 0, 0.18)',
              boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              outline: 'none',
              transition: 'transform 0.08s ease, filter 0.08s ease',
            }}
          >
            <svg
              viewBox="0 0 10 10"
              style={{
                width: '6.5px',
                height: '6.5px',
                opacity: isHoveringControls ? 1 : 0,
                transition: 'opacity 0.12s ease-in-out',
              }}
            >
              {isMaximized ? (
                // Inward arrows / restore icon
                <g fill="#004d00">
                  <polygon points="1,6.5 6.5,6.5 6.5,1" />
                  <polygon points="9,3.5 3.5,3.5 3.5,9" />
                </g>
              ) : (
                // Outward diagonal arrows / zoom icon
                <g fill="#004d00">
                  <polygon points="2.5,1 8,1 8,6.5" />
                  <polygon points="7.5,9 2,9 2,3.5" />
                </g>
              )}
            </svg>
          </button>
        </div>

        {/* Centered Window Title */}
        <span
          data-testid={`window-title-${id}`}
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#3a3a3c',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            pointerEvents: 'none',
          }}
        >
          {title}
        </span>
      </div>

      {/* Window Body / Application Content */}
      <div
        className="macos-window-content"
        data-testid={`window-content-${id}`}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
