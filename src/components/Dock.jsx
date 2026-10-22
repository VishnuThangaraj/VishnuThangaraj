import React, { useState, useRef, useCallback, useEffect } from 'react';
import Defs, { DOCK_APPS } from './DockIcons';
import DockTooltip from './DockTooltip';
import { calculateDockScale } from '../utils/dockPhysics';

/**
 * macOS Floating Dock Component
 * Matching reference/dock.png (rest state) and reference/dock-hover.png (magnified state with tooltip)
 */
const Dock = ({ apps = DOCK_APPS, onAppClick, baseIconSize = 52, maxScale = 1.45 }) => {
  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const [scales, setScales] = useState(() => apps.map(() => 1.0));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, visible: false });
  const [isHovered, setIsHovered] = useState(false);

  // Initialize icon refs array
  useEffect(() => {
    iconRefs.current = iconRefs.current.slice(0, apps.length);
  }, [apps.length]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!dockRef.current) return;
      const dockRect = dockRef.current.getBoundingClientRect();
      const mouseX = e.clientX;

      let minDistance = Infinity;
      let closestIdx = null;
      let closestCenter = 0;

      const newScales = apps.map((_, index) => {
        const el = iconRefs.current[index];
        if (!el) return 1.0;

        const rect = el.getBoundingClientRect();
        const iconCenter = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - iconCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = index;
          closestCenter = iconCenter - dockRect.left;
        }

        return calculateDockScale(distance, maxScale, 135);
      });

      setScales(newScales);
      setHoveredIndex(closestIdx);
      setIsHovered(true);

      if (closestIdx !== null) {
        setTooltipPos({ left: closestCenter, visible: true });
      }
    },
    [apps, maxScale]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setHoveredIndex(null);
    setScales(apps.map(() => 1.0));
    setTooltipPos((prev) => ({ ...prev, visible: false }));
  }, [apps]);

  const activeApp = hoveredIndex !== null ? apps[hoveredIndex] : null;

  return (
    <>
      <Defs />
      <nav
        className="macos-dock-wrapper"
        data-testid="macos-dock"
        aria-label="Applications Dock"
      >
        <div
          ref={dockRef}
          className="macos-dock-container"
          role="toolbar"
          aria-label="Application Dock"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={handleMouseLeave}
          style={{
            paddingBottom: '8px',
            paddingTop: isHovered ? '10px' : '6px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {/* Tooltip Badge matching reference/dock-hover.png */}
          <DockTooltip
            title={activeApp ? activeApp.name : ''}
            left={tooltipPos.left}
            isVisible={tooltipPos.visible}
          />

          {apps.map((app, index) => {
            const IconComponent = app.icon;
            const scale = scales[index] || 1.0;
            const extraMargin = (scale - 1.0) * 8; // subtle neighbor pushing

            return (
              <button
                key={app.id}
                ref={(el) => (iconRefs.current[index] = el)}
                type="button"
                className="macos-dock-item"
                data-testid={`dock-item-${app.id}`}
                aria-label={app.name}
                onClick={() => onAppClick && onAppClick(app.id)}
                style={{
                  width: `${baseIconSize}px`,
                  height: `${baseIconSize}px`,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: `0 ${extraMargin}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  outline: 'none',
                  transformOrigin: 'bottom center',
                  transform: `scale(${scale})`,
                  transition: isHovered
                    ? 'transform 0.08s cubic-bezier(0.2, 0, 0, 1), margin 0.08s cubic-bezier(0.2, 0, 0, 1)'
                    : 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1), margin 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
                  position: 'relative',
                  willChange: 'transform',
                }}
              >
                <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <IconComponent />
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Dock;
