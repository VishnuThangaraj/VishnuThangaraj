import { useState, useRef } from "react";
import { AppIcon } from "../components/AppIcon";
import { useSettingsStore } from "../store/settingsStore";
import { useWindowStore } from "../store/windowStore";

const DOCK_APPS = [
  { id: "about", name: "About Me", icon: "User", color: "#60a5fa" },
  { id: "experience", name: "Experience", icon: "Briefcase", color: "#fbbf24" },
  { id: "projects", name: "Projects", icon: "Globe", color: "#34d399" },
  { id: "code", name: "Code Editor", icon: "Code2", color: "#818cf8" },
  { id: "terminal", name: "Terminal", icon: "Terminal", color: "#e2e8f0" },
  { id: "stack", name: "Tech Stack", icon: "Layers", color: "#2dd4bf" },
  { id: "notes", name: "Notes & Edu", icon: "BookOpen", color: "#c084fc" },
  { id: "contact", name: "Contact", icon: "Mail", color: "#f472b6" },
  { id: "resume", name: "Resume", icon: "FileText", color: "#fb7185" },
  { id: "settings", name: "Settings", icon: "Settings", color: "#94a3b8" },
];

export const Dock = ({ onOpenContextMenu }) => {
  const [bouncingAppId, setBouncingAppId] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredAppId, setHoveredAppId] = useState(null);
  const dockRef = useRef(null);

  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const theme = useSettingsStore((s) => s.theme);
  const tier = useSettingsStore((s) => s.tier);

  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);

  const runningAppIds = new Set(windows.map((w) => w.appId));

  const handleLaunch = (appId) => {
    if (!reducedMotion) {
      setBouncingAppId(appId);
      setTimeout(() => setBouncingAppId(null), 700);
    }
    openWindow(appId);
  };

  const getScaleForIndex = (index) => {
    if (reducedMotion || hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.35;
    if (distance === 1) return 1.18;
    if (distance === 2) return 1.06;
    return 1;
  };

  const isLight = theme === "light";

  return (
    <nav
      aria-label="Application Dock"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[1000] select-none"
    >
      <div
        ref={dockRef}
        onMouseLeave={() => {
          setHoveredIndex(null);
          setHoveredAppId(null);
        }}
        className={`flex items-end gap-1.5 px-3 py-2 rounded-2xl border shadow-2xl transition-all duration-200 backdrop-blur-2xl ${
          tier === "t0" || theme === "high-contrast"
            ? isLight
              ? "bg-white border-2 border-black"
              : "bg-black border-2 border-white"
            : isLight
            ? "bg-white/70 border-white/60 shadow-black/15"
            : "bg-[#161618]/70 border-white/20 shadow-black/60"
        }`}
        style={{
          boxShadow:
            tier !== "t0"
              ? isLight
                ? "inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 16px 36px -8px rgba(0, 0, 0, 0.2)"
                : "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 20px 40px -10px rgba(0, 0, 0, 0.6)"
              : undefined,
        }}
        role="toolbar"
        aria-label="Application Dock"
      >
        {/* Main App Icons */}
        {DOCK_APPS.map((app, idx) => {
          const isRunning = runningAppIds.has(app.id);
          const isBouncing = bouncingAppId === app.id;
          const scale = getScaleForIndex(idx);

          return (
            <DockIconItem
              key={app.id}
              app={app}
              scale={scale}
              isRunning={isRunning}
              isBouncing={isBouncing}
              onLaunch={() => handleLaunch(app.id)}
              onHover={() => {
                setHoveredIndex(idx);
                setHoveredAppId(app.id);
              }}
              onLeave={() => {
                setHoveredIndex(null);
                setHoveredAppId(null);
              }}
              isHovered={hoveredAppId === app.id}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onOpenContextMenu) {
                  onOpenContextMenu(e, "dock", app);
                }
              }}
            />
          );
        })}

        {/* Separator line */}
        <div className="w-[1px] h-9 mx-1 self-center bg-white/20" />

        {/* Trash Easter Egg (Index 10) */}
        <DockIconItem
          app={{
            id: "trash",
            name: "Trash (Empty)",
            icon: "Trash2",
            color: "#94a3b8",
          }}
          scale={getScaleForIndex(10)}
          isRunning={runningAppIds.has("trash")}
          isBouncing={bouncingAppId === "trash"}
          onLaunch={() => handleLaunch("trash")}
          onHover={() => {
            setHoveredIndex(10);
            setHoveredAppId("trash");
          }}
          onLeave={() => {
            setHoveredIndex(null);
            setHoveredAppId(null);
          }}
          isHovered={hoveredAppId === "trash"}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onOpenContextMenu) {
              onOpenContextMenu(e, "dock", { id: "trash", name: "Trash" });
            }
          }}
        />

        {/* App Grid / Activities button (Index 11) */}
        <DockIconItem
          app={{
            id: "activities",
            name: "Show Applications",
            icon: "Grid",
            color: "#f59e0b",
          }}
          scale={getScaleForIndex(11)}
          isRunning={false}
          isBouncing={false}
          onLaunch={toggleActivities}
          onHover={() => {
            setHoveredIndex(11);
            setHoveredAppId("activities");
          }}
          onLeave={() => {
            setHoveredIndex(null);
            setHoveredAppId(null);
          }}
          isHovered={hoveredAppId === "activities"}
        />
      </div>
    </nav>
  );
};

const DockIconItem = ({
  app,
  scale,
  isRunning,
  isBouncing,
  onLaunch,
  onHover,
  onLeave,
  isHovered,
  onContextMenu,
}) => {
  return (
    <div
      className="relative flex flex-col items-center justify-end group outline-none"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        transition: "transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Tooltip */}
      {isHovered && (
        <div
          className="absolute -top-9 px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-black/85 backdrop-blur-md border border-white/20 shadow-lg pointer-events-none whitespace-nowrap z-50 animate-in fade-in duration-100"
          role="tooltip"
        >
          {app.name}
        </div>
      )}

      {/* Button */}
      <button
        onClick={onLaunch}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        onContextMenu={onContextMenu}
        className={`w-11 h-11 rounded-xl flex items-center justify-center p-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
          isBouncing ? "animate-bounce" : ""
        }`}
        aria-label={app.name}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/30 border border-white/15 shadow-md hover:brightness-110 active:brightness-90 transition-all">
          <AppIcon name={app.icon} className="w-5 h-5" style={{ color: app.color }} />
        </div>
      </button>

      {/* Running indicator dot */}
      <div
        className={`w-1 h-1 rounded-full mt-0.5 transition-all ${
          isRunning ? "bg-amber-400 opacity-100 scale-100 shadow-[0_0_4px_#f59e0b]" : "opacity-0 scale-0"
        }`}
        aria-hidden="true"
      />
    </div>
  );
};
