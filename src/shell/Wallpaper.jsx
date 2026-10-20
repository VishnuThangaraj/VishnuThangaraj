import { useSettingsStore } from "../store/settingsStore";
import { wallpapers } from "../data/wallpapers";

export const Wallpaper = () => {
  const currentId = useSettingsStore((s) => s.wallpaper);
  const theme = useSettingsStore((s) => s.theme);
  const isLight = theme === "light";

  if (currentId === "mountain-dusk") {
    // Original Vector Landscape per D8: Dusk sky, amber horizon glow, dark teal lake & mountains
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sky Gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? "#4a6338" : "#1a2512"} />
              <stop offset="28%" stopColor={isLight ? "#637d42" : "#2f3e1b"} />
              <stop offset="52%" stopColor={isLight ? "#8fa85c" : "#4c5d26"} />
              <stop offset="68%" stopColor={isLight ? "#d4b35e" : "#8a7530"} />
              <stop offset="78%" stopColor={isLight ? "#f0b848" : "#d98d28"} />
              <stop offset="84%" stopColor={isLight ? "#eb9538" : "#c2651b"} />
              <stop offset="100%" stopColor={isLight ? "#2a423d" : "#0d1f1e"} />
            </linearGradient>

            {/* Amber Horizon Radial Glow */}
            <radialGradient id="horizonGlow" cx="50%" cy="74%" r="60%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#92400e" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
            </radialGradient>

            {/* Lake Shimmer */}
            <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#18312d" />
              <stop offset="40%" stopColor="#102523" />
              <stop offset="100%" stopColor="#081413" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect width="1920" height="1080" fill="url(#skyGrad)" />

          {/* Horizon glow */}
          <rect width="1920" height="1080" fill="url(#horizonGlow)" />

          {/* Distant Mountain Range */}
          <path
            d="M0,740 L80,725 L190,705 L310,730 L450,695 L590,720 L720,680 L880,710 L1020,670 L1180,700 L1320,685 L1460,715 L1600,690 L1740,710 L1860,695 L1920,705 L1920,820 L0,820 Z"
            fill="#34432a"
            opacity="0.8"
          />

          {/* Midground Ridge */}
          <path
            d="M0,760 L120,740 L260,710 L400,750 L560,700 L710,740 L850,690 L980,730 L1150,675 L1290,720 L1440,685 L1580,730 L1720,705 L1840,740 L1920,725 L1920,840 L0,840 Z"
            fill="#213024"
            opacity="0.92"
          />

          {/* Foreground Mountain Silhouettes */}
          <path
            d="M0,790 L160,760 L320,810 L480,750 L640,790 L800,740 L960,780 L1120,735 L1280,770 L1440,730 L1620,775 L1800,745 L1920,765 L1920,850 L0,850 Z"
            fill="#14211b"
          />

          {/* Calm Lake in Dark Teal with Sunset Amber Reflection */}
          <rect y="820" width="1920" height="260" fill="url(#lakeGrad)" />

          {/* Water subtle light reflection streaks */}
          <ellipse cx="960" cy="845" rx="550" ry="12" fill="#d97706" opacity="0.18" />
          <ellipse cx="960" cy="875" rx="420" ry="10" fill="#f59e0b" opacity="0.12" />
          <ellipse cx="960" cy="915" rx="300" ry="8" fill="#f59e0b" opacity="0.08" />

          {/* Subtle vignette */}
          <rect
            width="1920"
            height="1080"
            fill="none"
            stroke="black"
            strokeWidth="80"
            opacity="0.15"
          />
        </svg>
      </div>
    );
  }

  // Alternate wallpaper from catalog
  const wp = wallpapers.find((w) => w.id === currentId) || wallpapers[0];
  return (
    <div
      className="absolute inset-0 w-full h-full select-none pointer-events-none z-0"
      style={{
        background: wp.background,
        backgroundImage: wp.layers,
      }}
    />
  );
};
