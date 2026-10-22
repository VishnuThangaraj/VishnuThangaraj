import React from 'react';

/**
 * YouTube Search Results Sidebar Component
 * Matches reference/youtube-open.png (empty state) & reference/youtube-result.png (search results list)
 */
const YouTubeSidebar = ({
  results = [],
  activeVideoId = null,
  onSelectVideo,
  hasSearched = false,
}) => {
  // 1. Initial Empty State matching reference/youtube-open.png
  if (!hasSearched || results.length === 0) {
    return (
      <aside
        className="macos-youtube-sidebar empty"
        data-testid="youtube-sidebar-empty"
        style={{
          width: '320px',
          height: '100%',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '13.5px',
            color: '#8e8e93',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        >
          Your search results will appear here
        </span>
      </aside>
    );
  }

  // 2. Populated Search Results List matching reference/youtube-result.png
  return (
    <aside
      className="macos-youtube-sidebar results"
      data-testid="youtube-sidebar-results"
      style={{
        width: '320px',
        height: '100%',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e5e5e5',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        flexShrink: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Header Label: SEARCH RESULTS */}
      <div
        style={{
          padding: '14px 16px 8px',
          fontSize: '11px',
          fontWeight: 700,
          color: '#606060',
          letterSpacing: '0.6px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        SEARCH RESULTS
      </div>

      {/* Cards List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '0 8px 16px',
        }}
      >
        {results.map((video) => {
          const isActive = activeVideoId === video.id || activeVideoId === video.youtubeId;

          return (
            <div
              key={video.id}
              data-testid={`youtube-result-item-${video.id}`}
              onClick={() => onSelectVideo && onSelectVideo(video)}
              style={{
                display: 'flex',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '10px',
                backgroundColor: isActive ? '#fff5f5' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.12s ease',
              }}
            >
              {/* Thumbnail with centered play overlay */}
              <div
                style={{
                  width: '106px',
                  height: '60px',
                  borderRadius: '7px',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  backgroundColor: '#1f2937',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Play Triangle Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: '10px', height: '10px', marginLeft: '1px' }} fill="#000000">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title & Channel Subtitle */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <span
                  data-testid={`youtube-title-${video.id}`}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: '1.25',
                    color: isActive ? '#e62117' : '#0f0f0f',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  }}
                >
                  {video.title}
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    color: '#606060',
                    marginTop: '3px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {video.channel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default YouTubeSidebar;
