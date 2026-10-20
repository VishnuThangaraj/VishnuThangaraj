/**
 * VishnuOS Design System Tokens
 * Defines material tiers, themes, accents, spring physics, and layout dimensions.
 */

export const ACCENTS = {
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

export const GLASS_TIERS = {
  t0: {
    id: "t0",
    name: "Solid / High Contrast",
    description: "Opaque tinted surfaces, solid borders, zero blur. Ideal for battery saving or high contrast.",
  },
  t1: {
    id: "t1",
    name: "CSS Glass (Default)",
    description: "Backdrop blur, saturation, specular rim highlight, and adaptive shadows across all browsers.",
  },
  t2: {
    id: "t2",
    name: "Liquid Glass Lensing",
    description: "Chromium edge refraction lensing filter with specular reflection.",
  },
};

export const SPRINGS = {
  dock: {
    stiffness: 180,
    damping: 14,
    mass: 0.15,
  },
  window: {
    stiffness: 240,
    damping: 22,
    mass: 0.25,
  },
  sheet: {
    stiffness: 260,
    damping: 24,
    mass: 0.3,
  },
  fade: {
    duration: 180, // ms
  },
};

export const LAYOUT = {
  topbarHeight: 32,
  dockHeight: 64,
  minWindowWidth: 380,
  minWindowHeight: 280,
  defaultWindowWidth: 800,
  defaultWindowHeight: 520,
};
