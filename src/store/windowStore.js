import { createStore } from "./createStore";
import { LAYOUT } from "../theme/tokens";

const APP_METADATA = {
  about: { title: "About Vishnu", icon: "User", width: 780, height: 540 },
  experience: { title: "Work Experience", icon: "Briefcase", width: 740, height: 520 },
  projects: { title: "Projects Browser", icon: "Globe", width: 840, height: 560 },
  code: { title: "Code Editor", icon: "Code2", width: 820, height: 540 },
  terminal: { title: "Terminal — bash", icon: "Terminal", width: 720, height: 480 },
  stack: { title: "Technical Stack", icon: "Layers", width: 760, height: 520 },
  notes: { title: "Notes & Education", icon: "BookOpen", width: 680, height: 480 },
  contact: { title: "Contact Vishnu", icon: "Mail", width: 640, height: 460 },
  resume: { title: "Resume Viewer", icon: "FileText", width: 720, height: 580 },
  settings: { title: "System Settings", icon: "Settings", width: 660, height: 500 },
  trash: { title: "Trash", icon: "Trash2", width: 480, height: 340 },
};

function getViewportDimensions() {
  if (typeof window === "undefined") {
    return { width: 1440, height: 900 };
  }
  return {
    width: Math.max(800, window.innerWidth),
    height: Math.max(600, window.innerHeight),
  };
}

export function clampBounds(bounds, viewport = getViewportDimensions()) {
  const minWidth = LAYOUT.minWindowWidth;
  const minHeight = LAYOUT.minWindowHeight;
  const topOffset = LAYOUT.topbarHeight;
  const bottomOffset = LAYOUT.dockHeight + 16;

  const maxW = viewport.width;
  const maxH = viewport.height - topOffset - bottomOffset;

  const width = Math.max(minWidth, Math.min(bounds.width || 700, maxW));
  const height = Math.max(minHeight, Math.min(bounds.height || 500, maxH));

  const minX = 0;
  const maxX = Math.max(0, viewport.width - width);
  const minY = topOffset;
  const maxY = Math.max(topOffset, viewport.height - bottomOffset - height);

  const x = Math.max(minX, Math.min(bounds.x, maxX));
  const y = Math.max(minY, Math.min(bounds.y, maxY));

  return { x, y, width, height };
}

function calculateCascadePosition(index) {
  const step = 28;
  const count = index % 8;
  const x = 80 + count * step;
  const y = LAYOUT.topbarHeight + 40 + count * step;
  return { x, y };
}

export const useWindowStore = createStore((set, get) => ({
  windows: [],
  focusedWindowId: null,
  isActivitiesOpen: false,
  nextZIndex: 100,

  openWindow: (appId, params = {}) => {
    const state = get();
    // Close activities overview if open
    if (state.isActivitiesOpen) {
      set({ isActivitiesOpen: false });
    }

    // Check if app is already open
    const existingIndex = state.windows.findIndex((w) => w.appId === appId);
    if (existingIndex !== -1) {
      const existing = state.windows[existingIndex];
      const newWindows = [...state.windows];
      const nextZ = state.nextZIndex + 1;

      newWindows[existingIndex] = {
        ...existing,
        isMinimized: false,
        focused: true,
        zIndex: nextZ,
        params: { ...existing.params, ...params },
      };

      // Unfocus other windows
      for (let i = 0; i < newWindows.length; i++) {
        if (i !== existingIndex) {
          newWindows[i] = { ...newWindows[i], focused: false };
        }
      }

      set({
        windows: newWindows,
        focusedWindowId: existing.id,
        nextZIndex: nextZ,
      });

      syncHash(appId, params);
      return existing.id;
    }

    // New window
    const meta = APP_METADATA[appId] || {
      title: appId.charAt(0).toUpperCase() + appId.slice(1),
      icon: "Square",
      width: 700,
      height: 500,
    };

    const viewport = getViewportDimensions();
    const cascade = calculateCascadePosition(state.windows.length, viewport);
    const bounds = clampBounds({
      x: cascade.x,
      y: cascade.y,
      width: Math.min(meta.width, viewport.width - 40),
      height: Math.min(meta.height, viewport.height - LAYOUT.topbarHeight - LAYOUT.dockHeight - 40),
    }, viewport);

    const nextZ = state.nextZIndex + 1;
    const id = `${appId}-${Date.now()}`;

    const newWindow = {
      id,
      appId,
      title: meta.title,
      icon: meta.icon,
      zIndex: nextZ,
      state: "open",
      bounds,
      restoreBounds: { ...bounds },
      isMaximized: false,
      isMinimized: false,
      isSnapped: false,
      snapPosition: null,
      focused: true,
      params,
    };

    const unfocusedWindows = state.windows.map((w) => ({
      ...w,
      focused: false,
    }));

    set({
      windows: [...unfocusedWindows, newWindow],
      focusedWindowId: id,
      nextZIndex: nextZ,
    });

    syncHash(appId, params);
    return id;
  },

  closeWindow: (id) => {
    const state = get();
    const remaining = state.windows.filter((w) => w.id !== id);

    let nextFocusedId = null;

    if (remaining.length > 0) {
      // Focus window with highest zIndex among non-minimized
      const nonMinimized = remaining.filter((w) => !w.isMinimized);
      if (nonMinimized.length > 0) {
        const topWindow = nonMinimized.reduce((prev, curr) =>
          curr.zIndex > prev.zIndex ? curr : prev
        );
        nextFocusedId = topWindow.id;
      }
    }

    const updated = remaining.map((w) => ({
      ...w,
      focused: w.id === nextFocusedId,
    }));

    set({
      windows: updated,
      focusedWindowId: nextFocusedId,
    });

    if (!nextFocusedId) {
      clearHash();
    }
  },

  minimizeWindow: (id) => {
    const state = get();
    const target = state.windows.find((w) => w.id === id);
    if (!target) return;

    const remaining = state.windows.filter((w) => w.id !== id && !w.isMinimized);
    let nextFocusedId = null;
    if (remaining.length > 0) {
      const top = remaining.reduce((prev, curr) =>
        curr.zIndex > prev.zIndex ? curr : prev
      );
      nextFocusedId = top.id;
    }

    const updated = state.windows.map((w) => {
      if (w.id === id) {
        return { ...w, isMinimized: true, focused: false };
      }
      return { ...w, focused: w.id === nextFocusedId };
    });

    set({
      windows: updated,
      focusedWindowId: nextFocusedId,
    });
  },

  restoreWindow: (id) => {
    const state = get();
    const nextZ = state.nextZIndex + 1;
    const updated = state.windows.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          isMinimized: false,
          focused: true,
          zIndex: nextZ,
        };
      }
      return { ...w, focused: false };
    });

    set({
      windows: updated,
      focusedWindowId: id,
      nextZIndex: nextZ,
    });
  },

  focusWindow: (id) => {
    const state = get();
    const target = state.windows.find((w) => w.id === id);
    if (!target || target.focused) return;

    const nextZ = state.nextZIndex + 1;
    const updated = state.windows.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          isMinimized: false,
          focused: true,
          zIndex: nextZ,
        };
      }
      return { ...w, focused: false };
    });

    set({
      windows: updated,
      focusedWindowId: id,
      nextZIndex: nextZ,
    });

    syncHash(target.appId, target.params);
  },

  maximizeWindow: (id) => {
    const state = get();
    const target = state.windows.find((w) => w.id === id);
    if (!target) return;

    const viewport = getViewportDimensions();
    const isNowMaximized = !target.isMaximized;

    let newBounds;
    let restoreBounds = target.restoreBounds;

    if (isNowMaximized) {
      restoreBounds = { ...target.bounds };
      newBounds = {
        x: 0,
        y: LAYOUT.topbarHeight,
        width: viewport.width,
        height: viewport.height - LAYOUT.topbarHeight - LAYOUT.dockHeight - 8,
      };
    } else {
      newBounds = { ...target.restoreBounds };
    }

    const nextZ = state.nextZIndex + 1;
    const updated = state.windows.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          isMaximized: isNowMaximized,
          isSnapped: false,
          snapPosition: null,
          bounds: newBounds,
          restoreBounds,
          focused: true,
          zIndex: nextZ,
        };
      }
      return { ...w, focused: false };
    });

    set({
      windows: updated,
      focusedWindowId: id,
      nextZIndex: nextZ,
    });
  },

  snapWindow: (id, position) => {
    const state = get();
    const target = state.windows.find((w) => w.id === id);
    if (!target) return;

    const viewport = getViewportDimensions();
    const top = LAYOUT.topbarHeight;
    const availableH = viewport.height - top - LAYOUT.dockHeight - 8;
    const halfW = Math.floor(viewport.width / 2);
    const halfH = Math.floor(availableH / 2);

    let newBounds;
    if (position === "left") {
      newBounds = { x: 0, y: top, width: halfW, height: availableH };
    } else if (position === "right") {
      newBounds = { x: halfW, y: top, width: halfW, height: availableH };
    } else if (position === "top-left") {
      newBounds = { x: 0, y: top, width: halfW, height: halfH };
    } else if (position === "top-right") {
      newBounds = { x: halfW, y: top, width: halfW, height: halfH };
    } else {
      newBounds = target.restoreBounds;
    }

    const nextZ = state.nextZIndex + 1;
    const updated = state.windows.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          isSnapped: Boolean(position),
          snapPosition: position,
          isMaximized: false,
          bounds: newBounds,
          focused: true,
          zIndex: nextZ,
        };
      }
      return { ...w, focused: false };
    });

    set({
      windows: updated,
      focusedWindowId: id,
      nextZIndex: nextZ,
    });
  },

  updateBounds: (id, newBounds) => {
    const state = get();
    const viewport = getViewportDimensions();
    const clamped = clampBounds(newBounds, viewport);

    const updated = state.windows.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          bounds: clamped,
          restoreBounds: clamped,
          isMaximized: false,
          isSnapped: false,
          snapPosition: null,
        };
      }
      return w;
    });

    set({ windows: updated });
  },

  toggleActivities: () => {
    set((state) => ({ isActivitiesOpen: !state.isActivitiesOpen }));
  },

  closeAll: () => {
    set({ windows: [], focusedWindowId: null });
    clearHash();
  },
}));

function syncHash(appId, params) {
  if (typeof window === "undefined") return;
  if (params && params.itemId) {
    window.location.hash = `#/${appId}/${params.itemId}`;
  } else {
    window.location.hash = `#/${appId}`;
  }
}

function clearHash() {
  if (typeof window === "undefined") return;
  if (window.location.hash && !window.location.hash.includes("classic")) {
    history.replaceState(null, "", " ");
  }
}
