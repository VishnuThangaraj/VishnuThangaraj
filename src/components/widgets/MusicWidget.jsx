import React, { useState } from 'react';

const TRACKS = [
  {
    title: 'Peaceful Lofi',
    artist: 'Calm Study',
    cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=120&q=80',
    fallbackColor: '#8a7968',
  },
  {
    title: 'Sunset Waves',
    artist: 'Chillhop Beats',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&q=80',
    fallbackColor: '#d97736',
  },
  {
    title: 'Tokyo Midnight',
    artist: 'Lofi City',
    cover: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=120&q=80',
    fallbackColor: '#4f46e5',
  },
];

/**
 * Spotify Music Widget
 * Pixel-precise reproduction of reference/music.png
 */
const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(38); // 38% initial matching screenshot

  const currentTrack = TRACKS[trackIndex];

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div
      className="macos-widget-music"
      data-testid="music-widget"
      role="region"
      aria-label="Spotify Music Widget"
      style={{
        width: '190px',
        padding: '12px 14px 14px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.48)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '0.5px solid rgba(255, 255, 255, 0.65)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Header: Green badge + SPOTIFY MUSIC */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#1db954',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" fill="#000000" style={{ width: '10px', height: '10px' }}>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <span
          style={{
            fontSize: '10.5px',
            fontWeight: 700,
            color: '#1db954',
            letterSpacing: '0.4px',
          }}
        >
          SPOTIFY MUSIC
        </span>
      </div>

      {/* Track Info & Artwork */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Album Artwork */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            overflow: 'hidden',
            background: currentTrack.fallbackColor,
            flexShrink: 0,
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Title & Artist */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <span
            data-testid="music-track-title"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#1c1c1e',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentTrack.title}
          </span>
          <span
            data-testid="music-track-artist"
            style={{
              fontSize: '11px',
              color: '#636366',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentTrack.artist}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '3.5px',
          borderRadius: '2px',
          background: 'rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '2px',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      {/* Controls: Prev, Play/Pause, Next */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          marginTop: '2px',
        }}
      >
        {/* Previous Track */}
        <button
          type="button"
          onClick={prevTrack}
          aria-label="Previous Track"
          data-testid="music-prev-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: '#1c1c1e',
            outline: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" />
          </svg>
        </button>

        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          data-testid="music-play-btn"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#1db954',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(29, 185, 84, 0.35)',
            transition: 'transform 0.1s ease',
            outline: 'none',
          }}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="#000000" style={{ width: '13px', height: '13px' }}>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="#000000" style={{ width: '13px', height: '13px', marginLeft: '2px' }}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Next Track */}
        <button
          type="button"
          onClick={nextTrack}
          aria-label="Next Track"
          data-testid="music-next-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: '#1c1c1e',
            outline: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MusicWidget;
