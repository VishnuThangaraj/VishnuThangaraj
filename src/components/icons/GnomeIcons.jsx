/**
 * GNOME / Yaru Symbolic & App Icons
 * Clean SVGs matching the visual language of R1–R5.
 */

export const FolderIcon = ({ emblem = null, size = 56, className = "" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back flap */}
        <path d="M6 16C6 13.7909 7.79086 12 10 12H24C26.2091 12 28 14 29 16L32 20H54C56.2091 20 58 21.7909 58 24V48C58 50.2091 56.2091 52 54 52H10C7.79086 52 6 50.2091 6 48V16Z" fill="#3d78c2" />
        {/* Front flap */}
        <path d="M6 23C6 20.7909 7.79086 19 10 19H54C56.2091 19 58 20.7909 58 23V48C58 50.2091 56.2091 52 54 52H10C7.79086 52 6 50.2091 6 48V23Z" fill="#5294e2" />
        {/* Subtle top rim highlight */}
        <path d="M10 20H54C55.6569 20 57 21.3431 57 23V24C57 22.3431 55.6569 21 54 21H10C8.34315 21 7 22.3431 7 24V23C7 21.3431 8.34315 20 10 20Z" fill="white" fillOpacity="0.25" />
      </svg>
      {emblem && (
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-white/90 dark:bg-[#2d2d2d] rounded-full p-0.5 shadow flex items-center justify-center">
          {emblem === "shortcut" && (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className="text-black dark:text-white">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {emblem === "download" && (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#5294e2]">
              <path d="M8 3V11M8 11L4 7M8 11L12 7M3 13H13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {emblem === "music" && (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className="text-[#5294e2]">
              <path d="M6 3V10.5C5.5 10.2 4.8 10 4 10C2.3 10 1 11.1 1 12.5C1 13.9 2.3 15 4 15C5.7 15 7 13.9 7 12.5V5H13V9.5C12.5 9.2 11.8 9 11 9C9.3 9 8 10.1 8 11.5C8 12.9 9.3 14 11 14C12.7 14 14 12.9 14 11.5V3H6Z" />
            </svg>
          )}
          {emblem === "person" && (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className="text-[#5294e2]">
              <circle cx="8" cy="5" r="3" />
              <path d="M2 14C2 11 5 10 8 10C11 10 14 11 14 14" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export const ShowAppsIcon = ({ size = 48, active = false, className = "" }) => (
  <div
    className={`flex items-center justify-center rounded-xl transition-colors duration-150 ${
      active ? "bg-white/20" : "hover:bg-white/10"
    } ${className}`}
    style={{ width: size, height: size }}
  >
    <div className="grid grid-cols-3 gap-1.5 w-6 h-6">
      {[...Array(9)].map((_, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/90" />
      ))}
    </div>
  </div>
);

export const NetworkSpeedIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="inline-block opacity-80">
    <path d="M4 2L1 5H3V11H5V5H7L4 2ZM12 14L15 11H13V5H11V11H9L12 14Z" />
  </svg>
);

export const WindowControlButtons = ({ onMinimize, onMaximize, onClose, isMaximized = false }) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onMinimize}
      className="w-4 h-4 rounded-full bg-[#3d3d40] hover:bg-[#525256] active:bg-[#68686d] flex items-center justify-center transition-colors text-white/70 hover:text-white"
      title="Minimize window"
      aria-label="Minimize window"
    >
      <span className="w-2 h-0.5 bg-current rounded-full" />
    </button>
    <button
      onClick={onMaximize}
      className="w-4 h-4 rounded-full bg-[#3d3d40] hover:bg-[#525256] active:bg-[#68686d] flex items-center justify-center transition-colors text-white/70 hover:text-white"
      title={isMaximized ? "Restore window" : "Maximize window"}
      aria-label={isMaximized ? "Restore window" : "Maximize window"}
    >
      <span className="w-2 h-2 border border-current rounded-[1px]" />
    </button>
    <button
      onClick={onClose}
      className="w-4 h-4 rounded-full bg-[#3d3d40] hover:bg-[#e03131] active:bg-[#c92a2a] flex items-center justify-center transition-colors text-white/70 hover:text-white group"
      title="Close window"
      aria-label="Close window"
    >
      <svg viewBox="0 0 12 12" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="2" y1="2" x2="10" y2="10" />
        <line x1="10" y1="2" x2="2" y2="10" />
      </svg>
    </button>
  </div>
);
