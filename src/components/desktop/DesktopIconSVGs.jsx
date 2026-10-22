import React from 'react';

/**
 * High-Fidelity SVG Icon Suite for macOS Home Screen
 * 1:1 reproductions matching reference/homescreen-icons.png
 */

// 1. YouTube Icon
export const YouTubeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
    {/* Red Screen */}
    <rect x="18" y="27" width="64" height="46" rx="14" fill="#ff0000" />
    {/* White Play Triangle */}
    <polygon points="44,38 44,62 63,50" fill="#ffffff" />
  </svg>
);

// 2. Vishnu GPT (OpenAI Swirl) Icon
export const VishnuGPTIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#10a37f" />
    <g transform="translate(50, 50) scale(1.15)">
      {/* 6 OpenAI Interlocking Petals */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path
          key={deg}
          d="M0 -5 C-1.5 -12, -7 -18, -14 -18 C-22 -18, -26 -11, -26 -2 C-26 2, -24 6, -21 9 L-14 13 L-14 3 C-14 -1, -11 -4, -7 -4 Z"
          fill="#ffffff"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
    </g>
  </svg>
);
export const SarthakGPTIcon = VishnuGPTIcon;

// 3. Figma Icon
export const FigmaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#2c2c2e" />
    <g transform="translate(26, 17)">
      {/* Top Left: Orange */}
      <path d="M0 12C0 5.37 5.37 0 12 0H24V24H12C5.37 24 0 18.63 0 12Z" fill="#F24E1E" />
      {/* Top Right: Salmon Peach */}
      <path d="M24 0H36C42.63 0 48 5.37 48 12C48 18.63 42.63 24 36 24H24V0Z" fill="#FF7262" />
      {/* Mid Left: Purple */}
      <path d="M0 36C0 29.37 5.37 24 12 24H24V48H12C5.37 48 0 42.63 0 36Z" fill="#A259FF" />
      {/* Mid Right: Cyan */}
      <circle cx="36" cy="36" r="12" fill="#1ABCFE" />
      {/* Bottom Left: Green */}
      <path d="M0 60C0 53.37 5.37 48 12 48H24V60C24 66.63 18.63 72 12 72C5.37 72 0 66.63 0 60Z" fill="#0ACF83" />
    </g>
  </svg>
);

// 4. Contact Me Icon (Leather Notebook with Silhouette & Tabs)
export const ContactMeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <defs>
      <linearGradient id="cmBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bd8954" />
        <stop offset="100%" stopColor="#8d592b" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#cmBg)" />
    {/* Index tabs on right side */}
    <rect x="87" y="24" width="7" height="11" rx="2" fill="#ff3b30" />
    <rect x="87" y="38" width="7" height="11" rx="2" fill="#ffcc00" />
    <rect x="87" y="52" width="7" height="11" rx="2" fill="#34c759" />
    <rect x="87" y="66" width="7" height="11" rx="2" fill="#007aff" />
    {/* Center Silhouette circle & user shape */}
    <circle cx="47" cy="50" r="28" fill="rgba(0,0,0,0.18)" />
    <circle cx="47" cy="42" r="11" fill="#54371b" />
    <path d="M26 69C26 57 35 55 47 55C59 55 68 57 68 69" fill="#54371b" />
  </svg>
);

// 5. Settings Icon (Dark Grey with Brushed Metal Gear)
export const SettingsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}>
    <defs>
      <linearGradient id="stBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8e8e93" />
        <stop offset="100%" stopColor="#636366" />
      </linearGradient>
      <linearGradient id="stGear" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f2f2f7" />
        <stop offset="100%" stopColor="#aeaeb2" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#stBg)" stroke="#48484a" strokeWidth="1" />
    <g transform="translate(50,50)">
      {/* 8 Gear Teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="-5.5"
          y="-31"
          width="11"
          height="14"
          rx="2.5"
          fill="url(#stGear)"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Outer Gear Wheel */}
      <circle cx="0" cy="0" r="25" fill="url(#stGear)" />
      {/* Intermediate Grooves */}
      <circle cx="0" cy="0" r="17" fill="#636366" />
      <circle cx="0" cy="0" r="12" fill="url(#stGear)" />
      {/* Center Shaft Hole */}
      <circle cx="0" cy="0" r="7" fill="#3a3a3c" />
    </g>
  </svg>
);

// 6. Resume Icon (PDF Document)
export const ResumeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    {/* White Paper Page with folded top-right corner */}
    <path
      d="M18 12C18 7.58 21.58 4 26 4H62L82 24V88C82 92.42 78.42 96 74 96H26C21.58 96 18 92.42 18 88V12Z"
      fill="#ffffff"
      stroke="rgba(0,0,0,0.12)"
      strokeWidth="1"
    />
    {/* Folded Corner Triangle */}
    <path d="M62 4V24H82Z" fill="#e5e5ea" />
    {/* PDF Symbol in Center */}
    <path
      d="M50 34C44 34 38 48 38 54C38 58 41 60 45 60C49 60 52 56 55 52C58 50 63 48 68 49C72 49 74 46 72 43C70 40 64 42 58 45C55 40 52 34 50 34Z"
      stroke="#d32f2f"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Red Bottom PDF Banner */}
    <rect x="14" y="68" width="72" height="22" rx="4" fill="#d32f2f" />
    <text
      x="50"
      y="84"
      fill="#ffffff"
      fontSize="13"
      fontWeight="900"
      fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
      textAnchor="middle"
      letterSpacing="1"
    >
      PDF
    </text>
  </svg>
);

// 7. Sky-Blue Folder Icon (Experience, About Me, Projects, Skills)
export const FolderIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <defs>
      <linearGradient id="fldBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4bb6ff" />
        <stop offset="100%" stopColor="#007aff" />
      </linearGradient>
      <linearGradient id="fldFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60c0ff" />
        <stop offset="100%" stopColor="#0084ff" />
      </linearGradient>
    </defs>
    {/* Back tab */}
    <path
      d="M10 26C10 21.58 13.58 18 18 18H40C43 18 45 20 48 23L53 28H82C86.42 28 90 31.58 90 36V76C90 80.42 86.42 84 82 84H18C13.58 84 10 80.42 10 76V26Z"
      fill="url(#fldBack)"
    />
    {/* Front folder pocket with 3D gradient */}
    <path
      d="M6 40C6 35.58 9.58 32 14 32H86C90.42 32 94 35.58 94 40V78C94 82.42 90.42 86 86 86H14C9.58 86 6 82.42 6 78V40Z"
      fill="url(#fldFront)"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1"
    />
  </svg>
);

// 8. Instagram Icon
export const InstagramIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <defs>
      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#igGrad)" />
    {/* Camera Outline */}
    <rect x="23" y="23" width="54" height="54" rx="15" fill="none" stroke="#ffffff" strokeWidth="5.5" />
    {/* Center Lens */}
    <circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" strokeWidth="5.5" />
    {/* Flash Dot */}
    <circle cx="65" cy="35" r="3.5" fill="#ffffff" />
  </svg>
);

// 9. Camera Icon
export const CameraIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}>
    <defs>
      <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0e0e0" />
        <stop offset="50%" stopColor="#c2c2c5" />
        <stop offset="100%" stopColor="#9a9a9e" />
      </linearGradient>
      <linearGradient id="camLens" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2c3e50" />
        <stop offset="100%" stopColor="#0a0f14" />
      </linearGradient>
    </defs>
    {/* Metallic Squircle Base */}
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#camBody)" stroke="#8e8e93" strokeWidth="1" />
    {/* Top viewfinder flash */}
    <rect x="22" y="16" width="16" height="7" rx="2.5" fill="#555558" />
    <circle cx="72" cy="20" r="3" fill="#ff3b30" />
    {/* Big Camera Lens */}
    <circle cx="50" cy="53" r="28" fill="#1c1c1e" stroke="#ffffff" strokeWidth="2.5" />
    <circle cx="50" cy="53" r="22" fill="url(#camLens)" />
    <circle cx="50" cy="53" r="14" fill="#111822" />
    {/* Glass Reflection Highlight */}
    <ellipse cx="44" cy="46" rx="6" ry="3" fill="rgba(255,255,255,0.45)" transform="rotate(-30 44 46)" />
  </svg>
);

// 10. Terminal Icon
export const TerminalIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.22))' }}>
    <defs>
      <linearGradient id="termBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#323236" />
        <stop offset="100%" stopColor="#18181a" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#termBg)" stroke="#3a3a3e" strokeWidth="1" />
    {/* Prompt command: > */}
    <path d="M22 32L40 48L22 64" stroke="#f2f2f7" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Cursor: _ */}
    <line x1="48" y1="64" x2="72" y2="64" stroke="#f2f2f7" strokeWidth="5.5" strokeLinecap="round" />
  </svg>
);

// 11. GitHub Icon
export const GitHubIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#181717" stroke="#333336" strokeWidth="1" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 18C31.22 18 16 33.22 16 52C16 67.03 25.75 79.77 39.26 84.27C40.96 84.58 41.58 83.53 41.58 82.63C41.58 81.83 41.55 79.14 41.53 76.32C32.07 78.38 30.08 72.23 30.08 72.23C28.53 68.3 26.3 67.25 26.3 67.25C23.21 65.14 26.53 65.18 26.53 65.18C29.95 65.42 31.75 68.69 31.75 68.69C34.79 73.89 39.73 72.39 41.67 71.52C41.98 69.32 42.86 67.82 43.83 66.97C36.28 66.11 28.34 63.19 28.34 50.17C28.34 46.46 29.66 43.43 31.83 41.05C31.48 40.19 30.31 36.74 32.16 32.07C32.16 32.07 35.01 31.16 41.51 35.56C44.22 34.81 47.12 34.43 50.01 34.42C52.89 34.43 55.8 34.81 58.52 35.56C65.01 31.16 67.85 32.07 67.85 32.07C69.71 36.74 68.54 40.19 68.19 41.05C70.37 43.43 71.67 46.46 71.67 50.17C71.67 63.23 63.71 66.09 56.12 66.94C57.34 67.99 58.43 70.07 58.43 73.25C58.43 77.81 58.39 81.49 58.39 82.63C58.39 83.54 59 84.61 60.74 84.26C74.23 79.75 83.97 67.02 83.97 52C83.97 33.22 68.75 18 50 18Z"
      fill="#ffffff"
    />
  </svg>
);

// 12. Photos Icon
export const PhotosIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#ffffff" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
    <g transform="translate(50, 50) scale(1.05)">
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#ff3b30" opacity="0.85" />
      <ellipse cx="15" cy="-15" rx="8" ry="17" fill="#ff9500" opacity="0.85" transform="rotate(45 15 -15)" />
      <ellipse cx="21" cy="0" rx="8" ry="17" fill="#ffcc00" opacity="0.85" transform="rotate(90 21 0)" />
      <ellipse cx="15" cy="15" rx="8" ry="17" fill="#34c759" opacity="0.85" transform="rotate(135 15 15)" />
      <ellipse cx="0" cy="21" rx="8" ry="17" fill="#5ac8fa" opacity="0.85" transform="rotate(180 0 21)" />
      <ellipse cx="-15" cy="15" rx="8" ry="17" fill="#007aff" opacity="0.85" transform="rotate(225 -15 15)" />
      <ellipse cx="-21" cy="0" rx="8" ry="17" fill="#5856d6" opacity="0.85" transform="rotate(270 -21 0)" />
      <ellipse cx="-15" cy="-15" rx="8" ry="17" fill="#af52de" opacity="0.85" transform="rotate(315 -15 -15)" />
    </g>
  </svg>
);

// 13. Global Chat / Messages Icon
export const GlobalChatIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <defs>
      <linearGradient id="gcGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4cd964" />
        <stop offset="100%" stopColor="#2ac04e" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#gcGrad)" />
    {/* Crisp White Speech Bubble with bottom left tail */}
    <path
      d="M50 22C33.43 22 20 33.43 20 47.5C20 54.34 23.14 60.59 28.27 65.23C27.42 68.64 25.18 73.18 22.37 75.98C22.04 76.31 22.25 76.88 22.71 76.92C27.48 77.34 33.72 75.46 38.31 71.93C42 72.88 45.92 73.4 50 73.4C66.57 73.4 80 61.97 80 47.9C80 33.83 66.57 22 50 22Z"
      fill="#ffffff"
    />
  </svg>
);

// 14. Spotify Icon
export const SpotifyIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#121212" stroke="#282828" strokeWidth="1" />
    {/* Green circle */}
    <circle cx="50" cy="50" r="32" fill="#1ed760" />
    {/* Sound waves in black */}
    <path d="M31 43C42 39 58 39 69 44" stroke="#121212" strokeWidth="5.5" strokeLinecap="round" fill="none" />
    <path d="M34 51C43 47 56 47 66 52" stroke="#121212" strokeWidth="4.8" strokeLinecap="round" fill="none" />
    <path d="M37 59C45 55 54 56 62 60" stroke="#121212" strokeWidth="4.2" strokeLinecap="round" fill="none" />
  </svg>
);

// 15. WhatsApp Icon
export const WhatsAppIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#25d366" />
    {/* White Chat Bubble */}
    <path
      d="M50 20C33.43 20 20 33.43 20 50C20 55.77 21.64 61.16 24.48 65.73L21.5 78.5L34.62 75.6C39.04 78.04 44.35 79.5 50 79.5C66.57 79.5 80 66.07 80 50C80 33.93 66.57 20 50 20Z"
      fill="#ffffff"
    />
    {/* Green Phone Handset */}
    <path
      d="M39 34C37.5 34 35.8 35 35 36.8C33.6 39.8 34.5 45.4 39.5 52.4C44.5 59.4 50 63.2 54 63.8C56 64 58 62.8 59.5 61C60.5 59.8 61.2 58.6 60.5 57.5L56.5 52.5C55.7 51.5 54.4 51.7 53.5 52.4L51.5 54.2C50.8 54.7 49.8 54.5 49 54C46.8 52.6 44.4 50.2 43 48C42.5 47.2 42.3 46.2 42.8 45.5L44.6 43.5C45.3 42.6 45.5 41.3 44.5 40.5L39.5 34.5C39.4 34.2 39.2 34 39 34Z"
      fill="#25d366"
    />
  </svg>
);

// 16. LinkedIn Icon
export const LinkedInIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="#0077b5" />
    <g fill="#ffffff">
      {/* 'i' dot & stem */}
      <circle cx="34" cy="34" r="5" />
      <rect x="29" y="43" width="10" height="28" rx="2" />
      {/* 'n' shape */}
      <path d="M48 43H57V48.5C59 45 63 42 69 42C78 42 81 48 81 57V71H71V58C71 53 69 50 65 50C61 50 58 53 58 58V71H48V43Z" />
    </g>
  </svg>
);

/**
 * Icon Resolver Component
 */
export const DesktopIconRenderer = ({ icon }) => {
  switch (icon) {
    case 'youtube':
      return <YouTubeIcon />;
    case 'vishnu-gpt':
    case 'sarthak-gpt':
      return <VishnuGPTIcon />;
    case 'figma':
      return <FigmaIcon />;
    case 'contact-me':
      return <ContactMeIcon />;
    case 'settings':
      return <SettingsIcon />;
    case 'resume':
      return <ResumeIcon />;
    case 'folder':
      return <FolderIcon />;
    case 'instagram':
      return <InstagramIcon />;
    case 'camera':
      return <CameraIcon />;
    case 'terminal':
      return <TerminalIcon />;
    case 'github':
      return <GitHubIcon />;
    case 'photos':
      return <PhotosIcon />;
    case 'global-chat':
      return <GlobalChatIcon />;
    case 'spotify':
      return <SpotifyIcon />;
    case 'whatsapp':
      return <WhatsAppIcon />;
    case 'linkedin':
      return <LinkedInIcon />;
    default:
      return <FolderIcon />;
  }
};

export default DesktopIconRenderer;
