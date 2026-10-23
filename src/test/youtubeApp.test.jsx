import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import YouTubeApp from '../components/apps/youtube/YouTubeApp';
import { extractYouTubeId, PRESET_VIDEOS } from '../components/apps/youtube/youtubeData';

describe('Phase 10: Native YouTube Application', () => {
  describe('Task 10.1: URL Parser & Data Architecture', () => {
    it('correctly extracts video IDs from various YouTube URL formats', () => {
      expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
      expect(extractYouTubeId('https://youtu.be/kJQP7kiw5Fk')).toBe('kJQP7kiw5Fk');
      expect(extractYouTubeId('https://www.youtube.com/embed/L_LUpnjgPso')).toBe('L_LUpnjgPso');
      expect(extractYouTubeId('fJ9rUzIMcZQ')).toBe('fJ9rUzIMcZQ');
      expect(extractYouTubeId('invalid-url-string')).toBeNull();
    });

    it('contains all 4 preset videos matching reference/youtube-result.png', () => {
      expect(PRESET_VIDEOS.length).toBe(4);
      expect(PRESET_VIDEOS[0].title).toContain('Special Trending Funny Comedy Video 2026');
      expect(PRESET_VIDEOS[0].channel).toBe('ROMA FUN Tv');
      expect(PRESET_VIDEOS[1].title).toContain('2 Ziddi Pregnant Bow');
      expect(PRESET_VIDEOS[2].title).toContain('Try Not to Laugh');
      expect(PRESET_VIDEOS[3].title).toContain('Ranking Top 5 Funniest');
    });
  });

  describe('Task 10.2 & 10.3: Initial Open State (reference/youtube-open.png)', () => {
    it('renders header, empty stage prompt, and empty sidebar placeholder', () => {
      render(<YouTubeApp />);

      // Header & Brand
      expect(screen.getByTestId('youtube-header')).toBeTruthy();
      expect(screen.getByTestId('youtube-logo')).toBeTruthy();
      expect(screen.getByPlaceholderText('Search YouTube or paste URL...')).toBeTruthy();

      // Left Player Empty State
      expect(screen.getByTestId('youtube-empty-player')).toBeTruthy();
      expect(screen.getByText('Search for a video or paste a URL to start watching')).toBeTruthy();

      // Right Sidebar Empty State
      expect(screen.getByTestId('youtube-sidebar-empty')).toBeTruthy();
      expect(screen.getByText('Your search results will appear here')).toBeTruthy();
    });
  });

  describe('Task 10.4: Search Execution & Results State (reference/youtube-result.png)', () => {
    it('searches for query and displays results list with active video playing', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');
      const searchSubmit = screen.getByTestId('youtube-search-submit');

      // Enter query "funny video" matching reference
      fireEvent.change(searchInput, { target: { value: 'funny video' } });
      fireEvent.click(searchSubmit);

      // Search results sidebar appears
      expect(screen.getByTestId('youtube-sidebar-results')).toBeTruthy();
      expect(screen.getByText('SEARCH RESULTS')).toBeTruthy();

      // All 4 video cards rendered
      expect(screen.getByTestId('youtube-result-item-trending-funny-2026')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-ziddi-horror-special')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-try-not-to-laugh')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-top-5-funniest')).toBeTruthy();

      // First video is active and playing in player
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('player-video-title').textContent).toContain('Special Trending Funny Comedy Video 2026');
    });

    it('shows and plays the funny dancing video when Enter is pressed with no search letter query typed', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');

      // Initially empty player
      expect(screen.getByTestId('youtube-empty-player')).toBeTruthy();

      // Hit enter with NO search query typed
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      // Player becomes active and plays the funny dancing video
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('player-video-title').textContent).toContain('Funny Dancing Video');

      // 15 results rendered in sidebar
      expect(screen.getByTestId('youtube-sidebar-results')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-trending-funny-2026')).toBeTruthy();
    });

    it('shows and plays the funny dancing video when submit button is clicked with empty query', () => {
      render(<YouTubeApp />);

      const searchSubmit = screen.getByTestId('youtube-search-submit');

      // Click search submit button with empty query
      fireEvent.click(searchSubmit);

      // Player becomes active and plays the funny dancing video
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('player-video-title').textContent).toContain('Funny Dancing Video');
    });

    it('switches active video when clicking another card in the sidebar', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');
      fireEvent.change(searchInput, { target: { value: 'comedy' } });
      fireEvent.submit(searchInput);

      // Click second video card
      const secondVideoCard = screen.getByTestId('youtube-result-item-ziddi-horror-special');
      fireEvent.click(secondVideoCard);

      // Active player switches to second video
      expect(screen.getByTestId('player-video-title').textContent).toContain('2 Ziddi Pregnant Bow');
    });

    it('shows results matching search query input and plays the first video automatically', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');
      const searchSubmit = screen.getByTestId('youtube-search-submit');

      // Search for custom keyword "React Tutorial"
      fireEvent.change(searchInput, { target: { value: 'React Tutorial' } });
      fireEvent.click(searchSubmit);

      // Sidebar results contain search query
      expect(screen.getByTestId('youtube-sidebar-results')).toBeTruthy();
      expect(screen.getByText('SEARCH RESULTS')).toBeTruthy();

      // Check first result title contains "React"
      const firstResultTitle = screen.getAllByText(/React/i)[0];
      expect(firstResultTitle).toBeTruthy();

      // First video from search results is automatically active in player
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('player-video-title').textContent).toContain('React');
    });

    it('generates dynamic search results for any arbitrary query and plays the first video', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');

      // Search for custom query "Interstellar Soundtrack"
      fireEvent.change(searchInput, { target: { value: 'Interstellar Soundtrack' } });
      fireEvent.submit(searchInput);

      // Active player displays the first generated result for this input
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('player-video-title').textContent).toContain('Interstellar Soundtrack');
    });

    it('searches for tamil song and returns 15 relevant results with first video playing', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');
      const searchSubmit = screen.getByTestId('youtube-search-submit');

      // Search for "tamil song" matching user request in line 140 of prompt.md
      fireEvent.change(searchInput, { target: { value: 'tamil song' } });
      fireEvent.click(searchSubmit);

      // Sidebar results display 15 results
      expect(screen.getByTestId('youtube-sidebar-results')).toBeTruthy();
      expect(screen.getByText('SEARCH RESULTS')).toBeTruthy();
      expect(screen.getByText('15 results')).toBeTruthy();

      // Check first video is Arabic Kuthu
      expect(screen.getByTestId('youtube-result-item-tamil-1')).toBeTruthy();
      expect(screen.getByTestId('youtube-title-tamil-1').textContent).toContain('Arabic Kuthu');

      // Check first video thumbnail is authentic YouTube thumbnail
      const thumbImg = screen.getByTestId('youtube-thumb-tamil-1');
      expect(thumbImg.getAttribute('src')).toContain('KUN5Uf9mObQ/hqdefault.jpg');

      // First video is automatically playing in the active player with real video ID
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('player-video-title').textContent).toContain('Arabic Kuthu');
      const playerIframe = screen.getByTestId('youtube-iframe');
      expect(playerIframe.getAttribute('src')).toContain('KUN5Uf9mObQ');

      // Multiple other Tamil songs are available in the 15 results (e.g. Rowdy Baby, Vaathi Coming, Hukum)
      expect(screen.getByTestId('youtube-result-item-tamil-2')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-tamil-3')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-tamil-6')).toBeTruthy();
      expect(screen.getByTestId('youtube-result-item-tamil-15')).toBeTruthy();
    });

    it('ensures video player does not render duplicate fake progress bar', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');
      fireEvent.change(searchInput, { target: { value: 'tamil song' } });
      fireEvent.submit(searchInput);

      // The active player is rendered with iframe
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      expect(screen.getByTestId('youtube-iframe')).toBeTruthy();

      // The player overlay should only have top banner and NO fake static scrubber track
      const overlay = screen.getByTestId('youtube-player-overlay');
      expect(overlay.textContent).not.toContain('0:01 /');
    });

    it('plays video directly when a valid YouTube URL is pasted', () => {
      render(<YouTubeApp />);

      const searchInput = screen.getByTestId('youtube-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      });
      fireEvent.submit(searchInput);

      // Player becomes active
      expect(screen.getByTestId('youtube-active-player')).toBeTruthy();
      const iframe = screen.getByTestId('youtube-iframe');
      expect(iframe.getAttribute('src')).toContain('dQw4w9WgXcQ');
    });
  });

  describe('Task 10.5: Desktop Window Integration', () => {
    it('launches YouTube window when YouTube icon on desktop is clicked', () => {
      render(<App />);

      // Initially closed
      expect(screen.queryByTestId('macos-window-youtube')).toBeNull();

      // Click YouTube desktop icon
      const ytIcon = screen.getByTestId('desktop-icon-youtube');
      fireEvent.click(ytIcon);

      // Window is now open
      expect(screen.getByTestId('macos-window-youtube')).toBeTruthy();
      expect(screen.getByTestId('window-title-youtube').textContent).toBe('Youtube');
      expect(screen.getByTestId('youtube-app')).toBeTruthy();

      // Close YouTube window
      const closeBtn = screen.getAllByTestId('window-close-btn')[0];
      fireEvent.click(closeBtn);
      expect(screen.queryByTestId('macos-window-youtube')).toBeNull();
    });
  });
});
