/**
 * YouTube Mock Data & URL Parsing Utilities
 * Exact match with reference/youtube-result.png
 */

export const PRESET_VIDEOS = [
  {
    id: 'trending-funny-2026',
    youtubeId: 'dQw4w9WgXcQ', // Default video stream fallback
    title: 'Special Trending Funny Comedy Video 2026 😂Amazing Funny...',
    channel: 'ROMA FUN Tv',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80',
    duration: '15:54',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=320&q=80',
    views: '1.2M views',
  },
  {
    id: 'ziddi-horror-special',
    youtubeId: 'kJQP7kiw5Fk',
    title: '2 Ziddi Pregnant Bow Horror New Special...',
    channel: 'Fun Tv 24',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80',
    duration: '12:40',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&q=80',
    views: '840K views',
  },
  {
    id: 'try-not-to-laugh',
    youtubeId: 'L_LUpnjgPso',
    title: 'Try Not to Laugh 😆 Best Funny Videos...',
    channel: 'FantasyFun',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80',
    duration: '10:15',
    thumbnail: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=320&q=80',
    views: '2.4M views',
  },
  {
    id: 'top-5-funniest',
    youtubeId: 'fJ9rUzIMcZQ',
    title: 'Ranking Top 5 Funniest Moments On The...',
    channel: 'RankVault',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=64&q=80',
    duration: '08:30',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=320&q=80',
    views: '560K views',
  },
];

/**
 * Extracts a YouTube 11-character video ID from any valid YouTube URL
 */
export const extractYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;

  // Standard watch URLs: youtube.com/watch?v=ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Raw 11-char ID check
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
};
