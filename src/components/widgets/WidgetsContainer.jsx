import React from 'react';
import AnalogClockWidget from './AnalogClockWidget';
import MusicWidget from './MusicWidget';
import WeatherWidget from './WeatherWidget';
import CalendarWidget from './CalendarWidget';

/**
 * Desktop Widgets Container
 * Pixel-precise reproduction of layout in reference/widgets.png
 * Positioned on the upper-right section of the macOS desktop.
 */
const WidgetsContainer = () => {
  return (
    <div
      className="macos-widgets-container"
      data-testid="widgets-container"
      style={{
        position: 'absolute',
        top: '42px',
        right: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '18px',
        zIndex: 10,
        pointerEvents: 'auto',
      }}
    >
      {/* Left Item: Circular Analog Clock */}
      <div style={{ flexShrink: 0, marginTop: '2px' }}>
        <AnalogClockWidget />
      </div>

      {/* Right Column: Stack of Music, Weather, and Calendar cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          flexShrink: 0,
        }}
      >
        <MusicWidget />
        <WeatherWidget />
        <CalendarWidget />
      </div>
    </div>
  );
};

export default WidgetsContainer;
