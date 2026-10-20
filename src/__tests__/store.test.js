import { describe, it, expect, beforeEach } from "vitest";
import { useSettingsStore } from "../store/settingsStore";
import { useWindowStore, clampBounds } from "../store/windowStore";

describe("Settings Store", () => {
  beforeEach(() => {
    useSettingsStore.getState().resetSettings();
  });

  it("initializes with default values", () => {
    const s = useSettingsStore.getState();
    expect(s.theme).toBe("dark");
    expect(s.accent).toBe("olive");
    expect(s.tier).toBe("t1");
  });

  it("updates theme, accent, and tier", () => {
    const s = useSettingsStore.getState();
    s.setTheme("light");
    expect(useSettingsStore.getState().theme).toBe("light");

    s.setAccent("emerald");
    expect(useSettingsStore.getState().accent).toBe("emerald");

    s.setTier("t0");
    expect(useSettingsStore.getState().tier).toBe("t0");
  });

  it("handles reduced transparency by forcing T0 tier", () => {
    const s = useSettingsStore.getState();
    s.setReduceTransparency(true);
    expect(useSettingsStore.getState().tier).toBe("t0");

    s.setReduceTransparency(false);
    expect(useSettingsStore.getState().tier).toBe("t1");
  });
});

describe("Window Store and Manager", () => {
  beforeEach(() => {
    useWindowStore.getState().closeAll();
  });

  it("clamps window bounds correctly inside desktop area", () => {
    const viewport = { width: 1200, height: 800 };
    // Offscreen coordinates
    const clamped = clampBounds({ x: -100, y: -50, width: 2000, height: 2000 }, viewport);
    expect(clamped.x).toBeGreaterThanOrEqual(0);
    expect(clamped.y).toBeGreaterThanOrEqual(32); // topbar
    expect(clamped.width).toBeLessThanOrEqual(viewport.width);
  });

  it("opens, focuses, minimizes, restores, maximizes, and closes windows", () => {
    const ws = useWindowStore.getState();

    // 1. Open
    const id = ws.openWindow("about");
    let state = useWindowStore.getState();
    expect(state.windows.length).toBe(1);
    expect(state.focusedWindowId).toBe(id);
    expect(state.windows[0].focused).toBe(true);

    // 2. Open another
    const id2 = ws.openWindow("projects");
    state = useWindowStore.getState();
    expect(state.windows.length).toBe(2);
    expect(state.focusedWindowId).toBe(id2);
    expect(state.windows.find((w) => w.id === id).focused).toBe(false);

    // 3. Minimize
    ws.minimizeWindow(id2);
    state = useWindowStore.getState();
    expect(state.windows.find((w) => w.id === id2).isMinimized).toBe(true);
    expect(state.focusedWindowId).toBe(id); // passes focus back

    // 4. Restore
    ws.restoreWindow(id2);
    state = useWindowStore.getState();
    expect(state.windows.find((w) => w.id === id2).isMinimized).toBe(false);
    expect(state.focusedWindowId).toBe(id2);

    // 5. Maximize & Restore
    ws.maximizeWindow(id2);
    state = useWindowStore.getState();
    expect(state.windows.find((w) => w.id === id2).isMaximized).toBe(true);

    ws.maximizeWindow(id2);
    state = useWindowStore.getState();
    expect(state.windows.find((w) => w.id === id2).isMaximized).toBe(false);

    // 6. Snap
    ws.snapWindow(id2, "left");
    state = useWindowStore.getState();
    expect(state.windows.find((w) => w.id === id2).isSnapped).toBe(true);
    expect(state.windows.find((w) => w.id === id2).snapPosition).toBe("left");

    // 7. Close
    ws.closeWindow(id2);
    state = useWindowStore.getState();
    expect(state.windows.length).toBe(1);
    expect(state.focusedWindowId).toBe(id);
  });

  it("handles 100-operation random stress test without illegal state", () => {
    const ws = useWindowStore.getState();
    const apps = ["about", "projects", "experience", "terminal", "code", "stack"];
    const actions = ["open", "close", "minimize", "restore", "maximize", "focus", "snap"];

    for (let i = 0; i < 100; i++) {
      const act = actions[Math.floor(Math.random() * actions.length)];
      const current = useWindowStore.getState();

      if (act === "open" || current.windows.length === 0) {
        const app = apps[Math.floor(Math.random() * apps.length)];
        ws.openWindow(app);
      } else {
        const win = current.windows[Math.floor(Math.random() * current.windows.length)];
        if (act === "close") ws.closeWindow(win.id);
        else if (act === "minimize") ws.minimizeWindow(win.id);
        else if (act === "restore") ws.restoreWindow(win.id);
        else if (act === "maximize") ws.maximizeWindow(win.id);
        else if (act === "focus") ws.focusWindow(win.id);
        else if (act === "snap") ws.snapWindow(win.id, "right");
      }
    }

    const finalState = useWindowStore.getState();
    // Verify invariants:
    // No window has negative dimensions
    finalState.windows.forEach((w) => {
      expect(w.bounds.width).toBeGreaterThan(0);
      expect(w.bounds.height).toBeGreaterThan(0);
      expect(w.zIndex).toBeGreaterThan(0);
    });
  });
});
