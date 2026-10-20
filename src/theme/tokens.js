/**
 * VishnuOS Design System Tokens (Workflow v3 Reference-Fidelity)
 * Canonical GNOME / Ubuntu design tokens extracted from references R1–R5.
 */

export const ACCENTS = {
  olive: {
    id: "olive",
    name: "GNOME Olive Green",
    primary: "#4b8501",
    hover: "#669727",
    soft: "rgba(75, 133, 1, 0.20)",
    border: "rgba(75, 133, 1, 0.4)",
    glow: "rgba(75, 133, 1, 0.3)",
    textOnAccent: "#ffffff",
  },
  amber: {
    id: "amber",
    name: "Warm Amber",
    primary: "#f59e0b",
    hover: "#d97706",
    soft: "rgba(245, 158, 11, 0.18)",
    border: "rgba(245, 158, 11, 0.4)",
    glow: "rgba(245, 158, 11, 0.3)",
    textOnAccent: "#000000",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Green",
    primary: "#10b981",
    hover: "#059669",
    soft: "rgba(16, 185, 129, 0.18)",
    border: "rgba(16, 185, 129, 0.4)",
    glow: "rgba(16, 185, 129, 0.3)",
    textOnAccent: "#ffffff",
  },
  teal: {
    id: "teal",
    name: "Electric Teal",
    primary: "#14b8a6",
    hover: "#0d9488",
    soft: "rgba(20, 184, 166, 0.18)",
    border: "rgba(20, 184, 166, 0.4)",
    glow: "rgba(20, 184, 166, 0.3)",
    textOnAccent: "#ffffff",
  },
  blue: {
    id: "blue",
    name: "Sky Blue",
    primary: "#3b82f6",
    hover: "#2563eb",
    soft: "rgba(59, 130, 246, 0.18)",
    border: "rgba(59, 130, 246, 0.4)",
    glow: "rgba(59, 130, 246, 0.3)",
    textOnAccent: "#ffffff",
  },
  purple: {
    id: "purple",
    name: "Amethyst Purple",
    primary: "#8b5cf6",
    hover: "#7c3aed",
    soft: "rgba(139, 92, 246, 0.18)",
    border: "rgba(139, 92, 246, 0.4)",
    glow: "rgba(139, 92, 246, 0.3)",
    textOnAccent: "#ffffff",
  },
  rose: {
    id: "rose",
    name: "Sunset Rose",
    primary: "#f43f5e",
    hover: "#e11d48",
    soft: "rgba(244, 63, 94, 0.18)",
    border: "rgba(244, 63, 94, 0.4)",
    glow: "rgba(244, 63, 94, 0.3)",
    textOnAccent: "#ffffff",
  },
};

export const SURFACES = {
  dark: {
    topbar: "rgba(25, 29, 17, 0.95)",
    topbarPill: "rgba(255, 255, 255, 0.15)",
    dock: "#171a18",
    dockBorder: "rgba(255, 255, 255, 0.08)",
    popover: "#36363a",
    popoverCard: "#54545a",
    windowHeader: "#1d1d20",
    windowSidebar: "#393939",
    windowContent: "#1d1d20",
    searchPill: "#3e4238",
    textPrimary: "#ffffff",
    textSecondary: "#b0b0b0",
    textDim: "#808080",
    folderBlue: "#5294e2",
  },
  light: {
    topbar: "rgba(240, 240, 240, 0.95)",
    topbarPill: "rgba(0, 0, 0, 0.08)",
    dock: "#f0f0f2",
    dockBorder: "rgba(0, 0, 0, 0.10)",
    popover: "#f6f6f8",
    popoverCard: "#ffffff",
    windowHeader: "#fafafc",
    windowSidebar: "#ebebed",
    windowContent: "#ffffff",
    searchPill: "#e4e4e6",
    textPrimary: "#1a1a1a",
    textSecondary: "#5c5c5c",
    textDim: "#8c8c8c",
    folderBlue: "#3584e4",
  },
};

export const RADIUS = {
  none: 0,
  sm: 6,
  md: 8,
  card: 12,
  window: 12,
  popover: 20,
  quickSettings: 22,
  dock: 20,
  searchPill: 18,
  pill: 9999,
};

export const MOTION = {
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  durationQuick: 150,
  durationNormal: 200,
  durationModerate: 250,
  reduced: {
    durationQuick: 0,
    durationNormal: 0,
    durationModerate: 0,
  },
};

export const LAYOUT = {
  topbarHeight: 32,
  dockHeight: 84,
  dockWidth: 839,
  dockBottomMargin: 4,
  dockRadius: 20,
  minWindowWidth: 380,
  minWindowHeight: 280,
  defaultWindowWidth: 890,
  defaultWindowHeight: 550,
  desktopIconColumnX: 64,
  desktopIconPitchY: 120,
  desktopIconSize: 56,
};

// Legacy compatibility stubs for previous tests
export const GLASS_TIERS = {
  t0: { id: "t0", name: "Solid / High Contrast" },
  t1: { id: "t1", name: "Flat GNOME (Default)" },
  t2: { id: "t2", name: "GNOME Translucent" },
};

export const SPRINGS = {
  dock: { stiffness: 180, damping: 14, mass: 0.15 },
  window: { stiffness: 240, damping: 22, mass: 0.25 },
  sheet: { stiffness: 260, damping: 24, mass: 0.3 },
  fade: { duration: 180 },
};
