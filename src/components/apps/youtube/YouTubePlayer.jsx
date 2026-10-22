import React, { useState } from 'react';

/**
 * YouTube Player Component
 * Matches reference/youtube-open.png (empty state) and reference/youtube-result.png (video playback)
 */
const YouTubePlayer = ({ activeVideo }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // 1. Empty State matching reference/youtube-open.png
  if (!activeVideo) {
    return (
      <div
        className="macos-youtube-empty-player"
        data-testid="youtube-empty-player"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: '#717171',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Subtle dark YouTube play icon */}
        <div
          data-testid="youtube-empty-icon"
          style={{
            width: '68px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: '#1c1c1e',
            border: '1.5px solid #2c2c2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', marginLeft: '2px' }} fill="#505050">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>

        <span
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#888888',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        >
          Search for a video or paste a URL to start watching
        </span>
      </div>
    );
  }

  // 2. Active Playing State matching reference/youtube-result.png
  return (
    <div
      className="macos-youtube-active-player"
      data-testid="youtube-active-player"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Live YouTube IFrame Embed (or simulated background) */}
      <iframe
        data-testid="youtube-iframe"
        src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&enablejsapi=1&rel=0`}
        title={activeVideo.title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          inset: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* High-Fidelity Custom Overlay for test environments / reference HUD */}
      <div
        data-testid="youtube-player-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.85) 100%)',
          color: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {/* Top Header Overlay: Channel avatar + title + controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.8)',
              }}
            >
              ROMA
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                data-testid="player-video-title"
                style={{
                  fontSize: '14.5px',
                  fontWeight: 600,
                  maxWidth: '380px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                }}
              >
                {activeVideo.title}
              </span>
              <span style={{ fontSize: '11.5px', opacity: 0.85 }}>
                {activeVideo.channel}
              </span>
            </div>
          </div>

          {/* Top Right HUD Icons: Audio, CC, Settings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.9 }}>
            {/* Speaker icon */}
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            {/* CC icon */}
            <span style={{ border: '1.5px solid #ffffff', borderRadius: '3px', padding: '1px 3px', fontSize: '10px', fontWeight: 700 }}>
              CC
            </span>
            {/* Settings cog */}
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        </div>

        {/* Bottom Bar: Timeline Scrubber + Duration + Watermark */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Scrubber track */}
          <div style={{ width: '100%', height: '3.5px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px', position: 'relative' }}>
            <div style={{ width: '22%', height: '100%', backgroundColor: '#ff0000', borderRadius: '2px' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff0000', position: 'absolute', top: '-3px', left: '22%' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>0:01 / {activeVideo.duration || '15:54'}</span>
              <span style={{ opacity: 0.8 }}>🔗</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>More videos</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
                <div style={{ width: '14px', height: '10px', borderRadius: '2px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderBottom: '2px solid transparent', borderLeft: '4px solid #000000' }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '11px' }}>YouTube</span>
              </div>
              {/* Fullscreen icon */}
              <svg viewBox="0 0 24 24" style={{ width: '15px', height: '15px', opacity: 0.9 }} fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
