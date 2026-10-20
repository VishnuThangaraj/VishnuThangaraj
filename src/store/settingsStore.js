import { createStore } from "./createStore";
import { ACCENTS } from "../theme/tokens";

const STORAGE_KEY = "vishnu_os_settings_v3";

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
    accent: "olive", // Default canonical GNOME Olive Green per D6
    tier: "t1",
    reducedMotion: getSystemReducedMotion(),
    reduceTransparency: getSystemHighContrast(),
    wallpaper: "default-gnome",
    mode: "desktop", // 'desktop' | 'phone' | 'classic'
    shellStyle: "follow-theme", // 'follow-theme' | 'gnome-dark'
    nightLight: false,
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

  toggleDarkStyle: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(nextTheme);
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

  setShellStyle: (shellStyle) => {
    set({ shellStyle });
    applyDOMAttributes({ ...get(), shellStyle });
    persist(get());
  },

  setNightLight: (nightLight) => {
    set({ nightLight });
    applyDOMAttributes({ ...get(), nightLight });
    persist(get());
  },

  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion });
    applyDOMAttributes({ ...get(), reducedMotion });
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
      accent: "olive",
      tier: "t1",
      reducedMotion: false,
      reduceTransparency: false,
      wallpaper: "default-gnome",
      mode: "desktop",
      shellStyle: "follow-theme",
      nightLight: false,
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
      shellStyle: state.shellStyle,
      nightLight: state.nightLight,
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
  root.setAttribute("data-theme", state.theme || "dark");
  root.setAttribute("data-accent", state.accent || "olive");
  root.setAttribute("data-tier", state.tier || "t1");
  root.setAttribute("data-shell-style", state.shellStyle || "follow-theme");

  const accentObj = ACCENTS[state.accent] || ACCENTS.olive;
  if (accentObj) {
    root.style.setProperty("--accent", accentObj.primary);
    root.style.setProperty("--accent-hover", accentObj.hover);
    root.style.setProperty("--accent-soft", accentObj.soft);
    root.style.setProperty("--accent-border", accentObj.border);
    root.style.setProperty("--accent-text", accentObj.textOnAccent || "#ffffff");
  }

  if (state.nightLight) {
    root.setAttribute("data-night-light", "true");
  } else {
    root.removeAttribute("data-night-light");
  }

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
