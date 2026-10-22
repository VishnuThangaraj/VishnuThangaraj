import React, { useState, useEffect } from 'react';

/**
 * Analog Clock Widget
 * Pixel-precise reproduction of reference/analog.png
 */
const AnalogClockWidget = ({ staticDate = null }) => {
  const [time, setTime] = useState(() => staticDate || new Date());

  useEffect(() => {
    if (staticDate) return;
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [staticDate]);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Rotation angles
  const secAngle = seconds * 6;
  const minAngle = minutes * 6 + (seconds / 60) * 6;
  const hrAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

  // Format date text e.g. "Oct 22"
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[time.getMonth()];
  const dayNum = time.getDate();
  const dateString = `${monthName} ${dayNum}`;

  return (
    <div
      className="macos-widget-clock"
      data-testid="analog-clock-widget"
      role="region"
      aria-label="Analog Clock Widget"
      style={{
        width: '215px',
        height: '215px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(205, 228, 242, 0.65) 100%)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '0.5px solid rgba(255, 255, 255, 0.75)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12), inset 0 0 0 0.5px rgba(255, 255, 255, 0.9)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Perimeter Ticks: 60 total (12 major, 48 minor) */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isMajor = i % 5 === 0;
          const angle = i * 6;
          return (
            <line
              key={i}
              x1="100"
              y1={isMajor ? '13' : '15'}
              x2="100"
              y2={isMajor ? '23' : '20'}
              stroke={isMajor ? '#1c1c1e' : '#8e8e93'}
              strokeWidth={isMajor ? '2.4' : '1.1'}
              strokeLinecap="round"
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}

        {/* Date and Timezone label below center */}
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill="#3a3a3c"
          fontSize="12.5"
          fontWeight="500"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        >
          {dateString}
        </text>
        <text
          x="100"
          y="139"
          textAnchor="middle"
          fill="#68686c"
          fontSize="10"
          fontWeight="400"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        >
          India (IST)
        </text>

        {/* Hour Hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="52"
          stroke="#1c1c1e"
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${hrAngle} 100 100)`}
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}
        />

        {/* Minute Hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="28"
          stroke="#1c1c1e"
          strokeWidth="3.8"
          strokeLinecap="round"
          transform={`rotate(${minAngle} 100 100)`}
          style={{ filter: 'drop-shadow(0 1.5px 3px rgba(0,0,0,0.25))' }}
        />

        {/* Second Hand (Orange with counterweight tail) */}
        <g transform={`rotate(${secAngle} 100 100)`}>
          <line
            x1="100"
            y1="120"
            x2="100"
            y2="18"
            stroke="#ff5e1a"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="4.5" fill="#ff5e1a" />
        </g>
      </svg>
    </div>
  );
};

export default AnalogClockWidget;
