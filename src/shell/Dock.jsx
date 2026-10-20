import { useState, useRef } from "react";
import { AppIcon } from "../components/AppIcon";
import { ShowAppsIcon } from "../components/icons/GnomeIcons";
import { useWindowStore } from "../store/windowStore";

const DOCK_APPS = [
  { id: "about", name: "Home", icon: "User", color: "#60a5fa" },
  { id: "projects", name: "Projects", icon: "Globe", color: "#34d399" },
  { id: "experience", name: "Experience", icon: "Briefcase", color: "#fbbf24" },
  { id: "code", name: "Code Editor", icon: "Code2", color: "#818cf8" },
  { id: "terminal", name: "Terminal", icon: "Terminal", color: "#e2e8f0" },
  { id: "stack", name: "Tech Stack", icon: "Layers", color: "#2dd4bf" },
  { id: "notes", name: "Notes & Edu", icon: "BookOpen", color: "#c084fc" },
  { id: "contact", name: "Contact", icon: "Mail", color: "#f472b6" },
  { id: "resume", name: "Resume", icon: "FileText", color: "#fb7185" },
  { id: "settings", name: "Settings", icon: "Settings", color: "#94a3b8" },
];

export const Dock = () => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const dockRef = useRef(null);

  const isActivitiesOpen = useWindowStore((s) => s.isActivitiesOpen);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);

  const windows = useWindowStore((s) => s.windows);
  const focusedWindowId = useWindowStore((s) => s.focusedWindowId);
  const openWindow = useWindowStore((s) => s.openWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);

  const runningAppIds = new Set(windows.map((w) => w.appId));

  const handleAppClick = (appId) => {
    const existingWindows = windows.filter((w) => w.appId === appId);
    if (existingWindows.length === 0) {
      openWindow(appId);
    } else {
      const activeWin = existingWindows[0];
      if (activeWin.isMinimized) {
        restoreWindow(activeWin.id);
        focusWindow(activeWin.id);
      } else if (focusedWindowId === activeWin.id) {
        minimizeWindow(activeWin.id);
      } else {
        focusWindow(activeWin.id);
      }
    }
  };

  return (
    <nav
      aria-label="Application Dock"
      className="fixed bottom-[4px] left-1/2 -translate-x-1/2 z-[1000] select-none"
    >
      <div
        ref={dockRef}
        onMouseLeave={() => setHoveredApp(null)}
        className="flex items-center gap-2 px-3 py-2 shadow-2xl border transition-all duration-150"
        style={{
          width: "839px",
          height: "84px",
          borderRadius: "20px",
          backgroundColor: "var(--dock-bg)",
          borderColor: "var(--dock-border)",
        }}
        role="toolbar"
        aria-label="Application Dock"
      >
        {/* Main Dock Apps */}
        <div className="flex-1 flex items-center justify-around">
          {DOCK_APPS.map((app) => {
            const isRunning = runningAppIds.has(app.id);

            return (
              <div
                key={app.id}
                className="relative flex flex-col items-center justify-center cursor-pointer group"
                style={{ width: "48px", height: "64px" }}
                onClick={() => handleAppClick(app.id)}
                onMouseEnter={() => setHoveredApp(app.name)}
                title={app.name}
              >
                {/* App Icon (48×48 px, No magnification) */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5 transition-colors duration-150 group-hover:bg-white/10 group-active:bg-white/20">
                  <AppIcon name={app.icon} className="w-9 h-9" style={{ color: app.color }} />
                </div>

                {/* Canonical Olive-Green Running Dot Indicator (R5) */}
                <div className="h-2 flex items-center justify-center mt-1">
                  {isRunning && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-sm"
                      title="Running application"
                    />
                  )}
                </div>

                {/* GNOME Tooltip */}
                {hoveredApp === app.name && (
                  <div className="absolute -top-9 px-2.5 py-1 bg-[#1d1d20] border border-white/15 text-white text-[11px] font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50">
                    {app.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vertical Separator */}
        <div className="w-[1px] h-10 bg-white/10 my-auto" />

        {/* Trash & Show Apps */}
        <div className="flex items-center gap-1 px-1">
          {/* Trash */}
          <div
            className="relative flex flex-col items-center justify-center cursor-pointer group"
            style={{ width: "48px", height: "64px" }}
            onClick={() => handleAppClick("trash")}
            onMouseEnter={() => setHoveredApp("Trash")}
            title="Trash"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5 transition-colors duration-150 group-hover:bg-white/10">
              <AppIcon name="Trash2" className="w-9 h-9 text-gray-400" />
            </div>
            <div className="h-2" />
            {hoveredApp === "Trash" && (
              <div className="absolute -top-9 px-2.5 py-1 bg-[#1d1d20] border border-white/15 text-white text-[11px] font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50">
                Trash
              </div>
            )}
          </div>

          {/* Show Apps (Overview toggle) */}
          <div
            className="relative flex flex-col items-center justify-center cursor-pointer group"
            style={{ width: "48px", height: "64px" }}
            onClick={toggleActivities}
            onMouseEnter={() => setHoveredApp("Show Apps")}
            title="Show Apps"
          >
            <ShowAppsIcon size={48} active={isActivitiesOpen} />
            <div className="h-2" />
            {hoveredApp === "Show Apps" && (
              <div className="absolute -top-9 px-2.5 py-1 bg-[#1d1d20] border border-white/15 text-white text-[11px] font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50">
                Show Apps
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
