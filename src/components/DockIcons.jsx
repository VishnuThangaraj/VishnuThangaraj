import React from 'react';

/**
 * High-Fidelity SVG Icon Suite for macOS Dock
 * Pixel-precise recreations matching reference/dock.png and reference/dock-hover.png
 */

// Common squircle clip & shadow filters
const Defs = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
    <defs>
      <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#eef4fa" />
        <stop offset="100%" stopColor="#cbd7e6" />
      </linearGradient>
      <linearGradient id="finderBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3ea6ff" />
        <stop offset="100%" stopColor="#0071e3" />
      </linearGradient>
      <linearGradient id="terminalBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#323236" />
        <stop offset="100%" stopColor="#18181a" />
      </linearGradient>
      <linearGradient id="contactsBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bd8954" />
        <stop offset="100%" stopColor="#8d592b" />
      </linearGradient>
      <linearGradient id="settingsBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8e8e93" />
        <stop offset="100%" stopColor="#636366" />
      </linearGradient>
      <linearGradient id="spotifyGreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#25ec68" />
        <stop offset="100%" stopColor="#1db954" />
      </linearGradient>
      <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4bb6ff" />
        <stop offset="100%" stopColor="#007aff" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60c0ff" />
        <stop offset="100%" stopColor="#0084ff" />
      </linearGradient>
      <linearGradient id="messagesGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4cd964" />
        <stop offset="100%" stopColor="#2ac04e" />
      </linearGradient>
      <filter id="iconShadow" x="-10%" y="-10%" width="120%" height="125%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.22" />
      </filter>
    </defs>
  </svg>
);

// 1. Finder Icon
export const FinderIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#ffffff" />
    {/* Left blue half */}
    <path
      d="M5 25C5 13.9543 13.9543 5 25 5H50V95H25C13.9543 95 5 86.0457 5 75V25Z"
      fill="url(#finderBlue)"
    />
    {/* Right light blue/white half */}
    <path
      d="M50 5H75C86.0457 5 95 13.9543 95 25V75C95 86.0457 86.0457 95 75 95H50V5Z"
      fill="url(#finderBg)"
    />
    {/* Eyes */}
    <circle cx="34" cy="42" r="3.8" fill="#133d73" />
    <circle cx="66" cy="42" r="3.8" fill="#133d73" />
    {/* Dividing nose line */}
    <path
      d="M50 18V48C50 51.5 45.5 53 45.5 55.5C45.5 58 50 59 50 63V72"
      stroke="#133d73"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Smiling mouth */}
    <path
      d="M26 62C28 73 38 78 50 78C62 78 72 73 74 62"
      stroke="#133d73"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// 2. Terminal Icon
export const TerminalIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}>
    {/* Squircle base */}
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#terminalBg)" stroke="#3a3a3e" strokeWidth="1" />
    {/* Top subtle gloss rim */}
    <path d="M7 25C7 15 15 7 25 7H75C85 7 93 15 93 25" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
    {/* Prompt command: > */}
    <path
      d="M22 32L38 48L22 64"
      stroke="#f5f5f7"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Prompt cursor: _ */}
    <line
      x1="45"
      y1="64"
      x2="68"
      y2="64"
      stroke="#f5f5f7"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

// 3. Photos Icon
export const PhotosIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
    <g transform="translate(50, 50)">
      {/* 8 rounded colorful petals */}
      {[
        { rot: 0, color: '#f35336' },
        { rot: 45, color: '#f78f1e' },
        { rot: 90, color: '#ffc800' },
        { rot: 135, color: '#54c738' },
        { rot: 180, color: '#16a6ef' },
        { rot: 225, color: '#5e5ce6' },
        { rot: 270, color: '#af52de' },
        { rot: 315, color: '#ff2d55' },
      ].map(({ rot, color }, idx) => (
        <path
          key={idx}
          d="M0 0 C-6 -8 -9 -18 0 -28 C9 -18 6 -8 0 0Z"
          fill={color}
          opacity="0.88"
          transform={`rotate(${rot})`}
          style={{ mixBlendMode: 'multiply' }}
        />
      ))}
    </g>
  </svg>
);

// 4. Contacts / Profile Icon (displays "Contact Me" tooltip on hover)
export const ContactsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
    {/* Index tabs on right side */}
    <rect x="80" y="22" width="10" height="12" rx="3" fill="#ff3b30" />
    <rect x="80" y="38" width="10" height="12" rx="3" fill="#ff9500" />
    <rect x="80" y="54" width="10" height="12" rx="3" fill="#34c759" />
    <rect x="80" y="70" width="10" height="12" rx="3" fill="#007aff" />

    {/* Leather address book body */}
    <rect x="8" y="6" width="78" height="88" rx="16" fill="url(#contactsBg)" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

    {/* Spine stitching on left */}
    <line x1="16" y1="12" x2="16" y2="88" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Silhouette circle badge */}
    <circle cx="49" cy="50" r="23" stroke="#663e18" strokeWidth="2.5" fill="none" opacity="0.65" />
    {/* Head */}
    <circle cx="49" cy="43" r="8" fill="#663e18" opacity="0.75" />
    {/* Shoulders */}
    <path
      d="M34 64C34 55 40 54 49 54C58 54 64 55 64 64"
      fill="#663e18"
      opacity="0.75"
    />
  </svg>
);

// 5. System Settings Icon
export const SettingsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#settingsBg)" stroke="#4a4a4e" strokeWidth="1" />
    <g transform="translate(50, 50)">
      {/* Outer gear teeth */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <rect
          key={deg}
          x="-3"
          y="-30"
          width="6"
          height="8"
          rx="1.5"
          fill="#313134"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Outer gear rim */}
      <circle cx="0" cy="0" r="25" fill="#313134" />
      <circle cx="0" cy="0" r="20" fill="#48484a" />
      {/* Inner gear circle with spokes */}
      <circle cx="0" cy="0" r="14" fill="#313134" />
      <circle cx="0" cy="0" r="7" fill="#636366" />
      <circle cx="0" cy="0" r="3" fill="#2c2c2e" />
    </g>
  </svg>
);

// 6. Spotify Icon
export const SpotifyIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#121212" stroke="#282828" strokeWidth="1" />
    {/* Spotify Green Circle */}
    <circle cx="50" cy="50" r="32" fill="url(#spotifyGreen)" />
    {/* 3 sound waves */}
    <path
      d="M32 42C44 38 58 39 68 45"
      stroke="#121212"
      strokeWidth="4.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M34 50C44 47 55 48 65 53"
      stroke="#121212"
      strokeWidth="3.6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M37 58C45 55 54 56 62 60"
      stroke="#121212"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// 7. Folder Icon (Files/Projects)
export const FolderIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>
    {/* Back tab */}
    <path
      d="M10 24C10 18.5 14.5 14 20 14H40C44 14 47 16 49 19L53 25H80C85.5 25 90 29.5 90 35V76C90 81.5 85.5 86 80 86H20C14.5 86 10 81.5 10 76V24Z"
      fill="url(#folderBack)"
    />
    {/* Front pocket flap */}
    <path
      d="M8 36C8 31 12 27 17 27H83C88 27 92 31 92 36V78C92 83.5 87.5 88 82 88H18C12.5 88 8 83.5 8 78V36Z"
      fill="url(#folderFront)"
    />
    {/* Embossed top rim of folder front */}
    <path
      d="M10 32C10 30 12 28.5 15 28.5H85C88 28.5 90 30 90 32"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

// 8. Messages Icon
export const MessagesIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
    {/* Bright green squircle */}
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#messagesGreen)" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
    {/* White speech bubble */}
    <path
      d="M50 25C34.5 25 22 35.5 22 48.5C22 55.5 25.8 61.8 31.8 66C31.5 69.5 29.5 73.5 26.5 76C26 76.5 26.2 77.2 26.8 77.4C27.2 77.5 27.6 77.5 28 77.4C34 75.5 39 72.5 41.5 70.8C44.2 71.6 47 72 50 72C65.5 72 78 61.5 78 48.5C78 35.5 65.5 25 50 25Z"
      fill="#ffffff"
    />
  </svg>
);

export const DOCK_APPS = [
  { id: 'finder', name: 'Finder', icon: FinderIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'photos', name: 'Photos', icon: PhotosIcon },
  { id: 'contacts', name: 'Contact Me', icon: ContactsIcon }, // Specifically "Contact Me" matching dock-hover.png!
  { id: 'settings', name: 'System Settings', icon: SettingsIcon },
  { id: 'spotify', name: 'Spotify', icon: SpotifyIcon },
  { id: 'folder', name: 'Projects', icon: FolderIcon },
  { id: 'messages', name: 'Messages', icon: MessagesIcon },
];

export default Defs;
