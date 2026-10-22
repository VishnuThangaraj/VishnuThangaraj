import React, { useState } from 'react';

const CITIES = [
  {
    name: 'CHENNAI',
    temp: '25°',
    condition: 'Clear Day',
    highLow: 'H:29° L:24°',
  },
  {
    name: 'NEW DELHI',
    temp: '29°',
    condition: 'Clear',
    highLow: 'H:41° L:27°',
  },
  {
    name: 'BENGALURU',
    temp: '23°',
    condition: 'Partly Cloudy',
    highLow: 'H:27° L:19°',
  },
  {
    name: 'MUMBAI',
    temp: '30°',
    condition: 'Sunny',
    highLow: 'H:33° L:26°',
  },
];

/**
 * Weather Widget
 * Pixel-precise reproduction of reference/weather.png and reference/widgets.png
 */
const WeatherWidget = ({ initialCityIndex = 0 }) => {
  const [cityIndex, setCityIndex] = useState(initialCityIndex);

  const current = CITIES[cityIndex];

  const handleNextCity = () => {
    setCityIndex((prev) => (prev + 1) % CITIES.length);
  };

  return (
    <div
      className="macos-widget-weather"
      data-testid="weather-widget"
      role="region"
      aria-label={`Weather Widget - ${current.name}`}
      onClick={handleNextCity}
      title="Click to toggle city"
      style={{
        width: '190px',
        height: '130px',
        padding: '12px 14px',
        borderRadius: '22px',
        background: 'linear-gradient(135deg, #f08b33 0%, #ea5f15 100%)',
        border: '0.5px solid rgba(255, 255, 255, 0.35)',
        boxShadow: '0 8px 24px rgba(234, 95, 21, 0.32), inset 0 0 0 0.5px rgba(255, 255, 255, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#ffffff',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {/* Top Header: Pin Icon + City */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '12px', height: '12px', flexShrink: 0 }}
          aria-hidden="true"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span
          data-testid="weather-city-name"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {current.name}
        </span>
      </div>

      {/* Main Temperature */}
      <div
        data-testid="weather-temp"
        style={{
          fontSize: '44px',
          fontWeight: 300,
          lineHeight: '1',
          margin: '2px 0 0 0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          letterSpacing: '-1px',
        }}
      >
        {current.temp}
      </div>

      {/* Bottom Row: Condition + High/Low on Left, Glowing Sun on Right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        {/* Condition details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span
            data-testid="weather-condition"
            style={{
              fontSize: '12.5px',
              fontWeight: 500,
              lineHeight: '1.2',
            }}
          >
            {current.condition}
          </span>
          <span
            data-testid="weather-highlow"
            style={{
              fontSize: '10.5px',
              fontWeight: 400,
              opacity: 0.9,
              lineHeight: '1.2',
            }}
          >
            {current.highLow}
          </span>
        </div>

        {/* Glowing Sun graphic matching reference/weather.png */}
        <div
          data-testid="weather-sun-icon"
          aria-hidden="true"
          style={{
            width: '42px',
            height: '42px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginBottom: '-2px',
            marginRight: '-2px',
          }}
        >
          {/* Corona halo ring */}
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 220, 40, 0.32)',
              boxShadow: '0 0 14px rgba(255, 210, 30, 0.65)',
            }}
          />
          {/* Inner bright yellow sun */}
          <div
            style={{
              position: 'relative',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffe53b 0%, #ffd000 100%)',
              boxShadow: '0 2px 6px rgba(220, 140, 0, 0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
