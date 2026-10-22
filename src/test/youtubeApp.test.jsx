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
