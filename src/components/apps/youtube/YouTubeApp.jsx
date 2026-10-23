import React, { useState } from 'react';
import YouTubeHeader from './YouTubeHeader';
import YouTubePlayer from './YouTubePlayer';
import YouTubeSidebar from './YouTubeSidebar';
import { PRESET_VIDEOS, searchYouTubeVideos } from './youtubeData';

/**
 * Native YouTube Desktop Application
 * Matches reference/youtube-open.png & reference/youtube-result.png
 */
const YouTubeApp = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Search or Paste URL Execution
  const handleSearch = (query) => {
    // If the enter button is hit with no search letter query typed, show the funny dancing video
    const trimmed = query && typeof query === 'string' ? query.trim() : '';

    // Search or generate results matching the input query (or defaults to funny dancing video)
    const results = searchYouTubeVideos(trimmed);

    setSearchResults(results);
    setHasSearched(true);

    // The first video from the search result should be played
    if (results.length > 0) {
      setActiveVideo(results[0]);
    }
  };

  const handleSelectVideo = (video) => {
    setActiveVideo(video);
  };

  return (
    <div
      className="macos-youtube-app"
      data-testid="youtube-app"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Top Navigation & Search Bar */}
      <YouTubeHeader onSearch={handleSearch} />

      {/* Main Content Area: Left Player + Right Sidebar */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left Stage (Player or Empty State) */}
        <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
          <YouTubePlayer activeVideo={activeVideo} />
        </div>

        {/* Right Sidebar (Results or Placeholder) */}
        <YouTubeSidebar
          results={searchResults}
          activeVideoId={activeVideo?.id}
          onSelectVideo={handleSelectVideo}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  );
};

export default YouTubeApp;
