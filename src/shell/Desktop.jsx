import { useState, useEffect } from "react";
import { Wallpaper } from "./Wallpaper";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { DesktopIconGrid } from "./DesktopIconGrid";
import { WindowFrame } from "./WindowFrame";
import { Activities } from "./Activities";
import { ContextMenu } from "./ContextMenu";
import { BootScreen } from "./BootScreen";
import { LensingFilter } from "../components/glass/LensingFilter";
import { AppContent } from "../apps/registry";
import { useWindowStore } from "../store/windowStore";
import { useSettingsStore } from "../store/settingsStore";

export const Desktop = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [bootDone, setBootDone] = useState(() => {
    if (typeof sessionStorage === "undefined") return true;
    return sessionStorage.getItem("vishnu_os_booted") === "true";
  });

  const windows = useWindowStore((s) => s.windows);
  const focusedWindowId = useWindowStore((s) => s.focusedWindowId);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const completeBoot = useSettingsStore((s) => s.completeBoot);

  // Global Keyboard Shortcuts (Ctrl/Cmd+W, Ctrl/Cmd+M)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close focused window
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "w") {
        if (focusedWindowId) {
          e.preventDefault();
          closeWindow(focusedWindowId);
        }
      }
      // Minimize focused window
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
        if (focusedWindowId) {
          e.preventDefault();
          minimizeWindow(focusedWindowId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedWindowId, closeWindow, minimizeWindow]);

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type: "desktop",
    });
  };

  const handleOpenContextMenu = (e, type, target) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type,
      target,
    });
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      onContextMenu={handleDesktopContextMenu}
    >
      {/* SVG Lensing Filter Definition */}
      <LensingFilter />

      {/* Boot Screen */}
      {!bootDone && (
        <BootScreen
          onComplete={() => {
            setBootDone(true);
            completeBoot();
          }}
        />
      )}

      {/* Wallpaper Layer */}
      <Wallpaper />

      {/* Top Bar Navigation */}
      <TopBar />

      {/* Desktop Column Icons */}
      <DesktopIconGrid onOpenContextMenu={handleOpenContextMenu} />

      {/* Window Manager Layer */}
      <div className="absolute inset-0 pointer-events-none z-[100]">
        {windows.map((win) => (
          <div key={win.id} className="pointer-events-auto">
            <WindowFrame window={win}>
              <AppContent appId={win.appId} params={win.params} />
            </WindowFrame>
          </div>
        ))}
      </div>

      {/* Floating Bottom Dock */}
      <Dock onOpenContextMenu={handleOpenContextMenu} />

      {/* Activities / Launchpad Overlay */}
      <Activities />

      {/* Context Menus */}
      <ContextMenu menu={contextMenu} onClose={() => setContextMenu(null)} />
    </div>
  );
};
