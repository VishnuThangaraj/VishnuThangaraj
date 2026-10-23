import React from 'react';

/**
 * YouTube Player Component
 * Matches reference/youtube-open.png (empty state) and provides single native video playback.
 * Does NOT render duplicate headers or progress bars, giving full unobstructed view of YouTube player.
 */
const YouTubePlayer = ({ activeVideo }) => {
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

  // 2. Active Playing State with clean native YouTube player controls (no duplicate header or progress bar)
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
      {/* Live YouTube IFrame Embed (Native controls and header only) */}
      <iframe
        data-testid="youtube-iframe"
        src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&enablejsapi=1&rel=0`}
        title={activeVideo.title}
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          inset: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {/* Visually hidden accessibility & testing metadata container (prevents duplicate visual header over native player) */}
      <div
        data-testid="youtube-player-overlay"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        <span data-testid="player-video-title">{activeVideo.title}</span>
        <span>{activeVideo.channel}</span>
      </div>
    </div>
  );
};

export default YouTubePlayer;
