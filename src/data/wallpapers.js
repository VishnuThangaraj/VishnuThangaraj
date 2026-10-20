/**
 * Wallpaper definitions — pure CSS gradients, zero external images.
 * Each wallpaper is a CSS `background` value applied to the desktop.
 */

export const wallpapers = [
  {
    id: "mountain-dusk",
    name: "Mountain Dusk",
    background: [
      /* Sky gradient — olive-golden dusk */
      "linear-gradient(180deg, #2c3a1e 0%, #4a5a2e 15%, #6b7a3e 30%, #8a9955 40%, #a8b468 50%, #7a9060 65%, #4a6848 80%, #2a3830 100%)",
    ].join(", "),
    /* Overlay layers for depth */
    layers: `
      radial-gradient(ellipse 120% 60% at 50% 45%, rgba(180, 160, 100, 0.15) 0%, transparent 70%),
      radial-gradient(ellipse 80% 40% at 50% 80%, rgba(100, 160, 170, 0.2) 0%, transparent 60%),
      linear-gradient(180deg, 
        #1a2612 0%, 
        #2c3a1e 8%,
        #3d4d28 16%,
        #586a38 24%,
        #6b7a3e 32%,
        #7d8d4a 40%,
        #8a9955 46%,
        #7a9060 54%,
        #6a8858 60%,
        #5a7a4f 66%,
        #4a6a46 72%,
        #3a5a3d 78%,
        #2d4a34 84%,
        #1f3a2b 92%,
        #152a22 100%
      )
    `,
  },
  {
    id: "deep-space",
    name: "Deep Space",
    background:
      "radial-gradient(ellipse at 20% 50%, #0a1628 0%, #050d1a 50%, #020810 100%)",
    layers: `
      radial-gradient(circle at 75% 25%, rgba(100, 100, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 25% 75%, rgba(100, 50, 150, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, #0a1628 0%, #050d1a 60%, #020810 100%)
    `,
  },
  {
    id: "aurora",
    name: "Northern Lights",
    background:
      "linear-gradient(170deg, #0a0a1a 0%, #0d1a2d 30%, #0a2a3a 50%, #0d1a2d 70%, #0a0a1a 100%)",
    layers: `
      radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0, 200, 150, 0.08) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 70% 30%, rgba(100, 0, 200, 0.06) 0%, transparent 70%),
      radial-gradient(ellipse 70% 30% at 50% 60%, rgba(0, 100, 200, 0.05) 0%, transparent 70%),
      linear-gradient(170deg, #0a0a1a 0%, #0d1a2d 30%, #0a2a3a 50%, #0d1a2d 70%, #0a0a1a 100%)
    `,
  },
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    background: "#1a1a1a",
    layers: `
      radial-gradient(ellipse at 50% 50%, rgba(40, 40, 40, 0.5) 0%, rgba(26, 26, 26, 1) 70%),
      linear-gradient(180deg, #1e1e1e 0%, #1a1a1a 100%)
    `,
  },
  {
    id: "sunset-horizon",
    name: "Sunset Horizon",
    background:
      "linear-gradient(180deg, #1a0a1e 0%, #2d1530 20%, #4a1a30 40%, #6a2a28 55%, #8a4a20 65%, #aa6a18 75%, #cc8a10 85%, #aa6a18 95%, #1a0a1e 100%)",
    layers: `
      radial-gradient(ellipse 100% 50% at 50% 65%, rgba(200, 120, 20, 0.15) 0%, transparent 70%),
      linear-gradient(180deg, #1a0a1e 0%, #2d1530 20%, #4a1a30 40%, #6a2a28 55%, #8a4a20 65%, #aa6a18 75%, #cc8a10 85%, #6a3a18 95%, #1a0a1e 100%)
    `,
  },
];

export const defaultWallpaper = wallpapers[0];
