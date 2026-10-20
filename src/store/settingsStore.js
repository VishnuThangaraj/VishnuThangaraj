import { createStore } from "./createStore";

const STORAGE_KEY = "vishnu_os_settings_v2";

function getSystemReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getSystemHighContrast() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-contrast: more)").matches;
}

function loadInitialSettings() {
  const defaults = {
    theme: getSystemHighContrast() ? "high-contrast" : "dark",
    accent: "amber", // Default accent per D6
    tier: getSystemHighContrast() ? "t0" : "t1",
    reducedMotion: getSystemReducedMotion(),
    reduceTransparency: getSystemHighContrast(),
    wallpaper: "mountain-dusk", // Default original wallpaper per D8
    mode: "desktop", // 'desktop' | 'phone' | 'classic'
    soundEnabled: false,
    bootCompleted: false,
  };

  if (typeof window === "undefined") return defaults;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch (e) {
    console.warn("Could not load stored settings, using defaults", e);
    return defaults;
  }
}

const initial = loadInitialSettings();

export const useSettingsStore = createStore((set, get) => ({
  ...initial,

  setTheme: (theme) => {
    set({ theme });
    applyDOMAttributes({ ...get(), theme });
    persist(get());
  },

  setAccent: (accent) => {
    set({ accent });
    applyDOMAttributes({ ...get(), accent });
    persist(get());
  },

  setTier: (tier) => {
    set({ tier });
    applyDOMAttributes({ ...get(), tier });
    persist(get());
  },

  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion });
    persist(get());
  },

  setReduceTransparency: (reduceTransparency) => {
    const nextTier = reduceTransparency ? "t0" : get().tier === "t0" ? "t1" : get().tier;
    set({ reduceTransparency, tier: nextTier });
    applyDOMAttributes({ ...get(), reduceTransparency, tier: nextTier });
    persist(get());
  },

  setWallpaper: (wallpaper) => {
    set({ wallpaper });
    persist(get());
  },

  setMode: (mode) => {
    set({ mode });
    persist(get());
  },

  setSoundEnabled: (soundEnabled) => {
    set({ soundEnabled });
    persist(get());
  },

  completeBoot: () => {
    set({ bootCompleted: true });
    try {
      sessionStorage.setItem("vishnu_os_booted", "true");
    } catch {
      // ignore
    }
  },

  resetSettings: () => {
    const defaults = {
      theme: "dark",
      accent: "amber",
      tier: "t1",
      reducedMotion: false,
      reduceTransparency: false,
      wallpaper: "mountain-dusk",
      mode: "desktop",
      soundEnabled: false,
    };
    set(defaults);
    applyDOMAttributes(defaults);
    persist(get());
  },
}));

function persist(state) {
  try {
    const toSave = {
      theme: state.theme,
      accent: state.accent,
      tier: state.tier,
      reducedMotion: state.reducedMotion,
      reduceTransparency: state.reduceTransparency,
      wallpaper: state.wallpaper,
      mode: state.mode,
      soundEnabled: state.soundEnabled,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn("Could not persist settings", e);
  }
}

export function applyDOMAttributes(state) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", state.theme);
  root.setAttribute("data-accent", state.accent);
  root.setAttribute("data-tier", state.tier);
  if (state.reduceTransparency) {
    root.setAttribute("data-reduce-transparency", "true");
  } else {
    root.removeAttribute("data-reduce-transparency");
  }
  if (state.reducedMotion) {
    root.setAttribute("data-reduced-motion", "true");
  } else {
    root.removeAttribute("data-reduced-motion");
  }
}

// Initial application
if (typeof document !== "undefined") {
  applyDOMAttributes(initial);
}
