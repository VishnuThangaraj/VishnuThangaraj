import React, { useState } from 'react';

/**
 * YouTube Window Header Bar
 * Pixel-precise reproduction of header in reference/youtube-open.png & reference/youtube-result.png
 */
const YouTubeHeader = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <header
      className="macos-youtube-header"
      data-testid="youtube-header"
      style={{
        height: '56px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Left: YouTube Brand Logo */}
      <div
        data-testid="youtube-logo"
        onClick={() => onSearch && onSearch('')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
        }}
      >
        {/* Red Icon with White Play Triangle */}
        <div
          style={{
            width: '28px',
            height: '20px',
            borderRadius: '6px',
            backgroundColor: '#ff0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: '12px', height: '12px', marginLeft: '1px' }} fill="#ffffff">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#0f0f0f',
            letterSpacing: '-0.5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          }}
        >
          YouTube
        </span>
      </div>

      {/* Center/Right: Search Pill Input Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '460px',
          maxWidth: '55%',
          height: '38px',
          borderRadius: '24px',
          border: '1px solid #d3d3d3',
          backgroundColor: '#ffffff',
          padding: '0 12px 0 18px',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <input
          type="text"
          data-testid="youtube-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={(e) => {
            const pastedText = e.clipboardData?.getData('text');
            if (pastedText && onSearch) {
              setQuery(pastedText.trim());
              onSearch(pastedText.trim());
            }
          }}
          placeholder="Search YouTube or paste URL..."
          aria-label="Search YouTube or paste URL"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '13.5px',
            color: '#0f0f0f',
            background: 'transparent',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        />

        <button
          type="submit"
          data-testid="youtube-search-submit"
          aria-label="Search"
          title="Search"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#555555',
            outline: 'none',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: '17px', height: '17px' }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </header>
  );
};

export default YouTubeHeader;
