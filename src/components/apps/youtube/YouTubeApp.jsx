import React, { useState } from 'react';
import YouTubeHeader from './YouTubeHeader';
import YouTubePlayer from './YouTubePlayer';
import YouTubeSidebar from './YouTubeSidebar';
import { PRESET_VIDEOS, extractYouTubeId } from './youtubeData';

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
    if (!query) return;

    // 1. Check if query is a direct YouTube URL or raw video ID
    const extractedId = extractYouTubeId(query);

    if (extractedId) {
      const pastedVideo = {
        id: `pasted-${extractedId}`,
        youtubeId: extractedId,
        title: `YouTube Video (${extractedId})`,
        channel: 'YouTube Video',
        duration: 'Playing',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=320&q=80',
      };

      setActiveVideo(pastedVideo);
      setSearchResults([pastedVideo, ...PRESET_VIDEOS]);
      setHasSearched(true);
      return;
    }

    // 2. Keyword Search: surfaces matching videos or reference catalog
    const lower = query.toLowerCase();
    const matched = PRESET_VIDEOS.filter(
      (v) =>
        v.title.toLowerCase().includes(lower) ||
        v.channel.toLowerCase().includes(lower) ||
        lower.includes('funny') ||
        lower.includes('comedy') ||
        lower.includes('video')
    );

    const finalResults = matched.length > 0 ? matched : PRESET_VIDEOS;

    setSearchResults(finalResults);
    setHasSearched(true);
    // Select first matched video as active (matching reference/youtube-result.png)
    setActiveVideo(finalResults[0]);
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
