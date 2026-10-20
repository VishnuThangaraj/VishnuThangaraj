import { useState, useEffect, useRef } from "react";
import {
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  User,
  Globe,
  Briefcase,
  Layers,
  BookOpen,
  FileText,
  Terminal,
  ChevronDown,
} from "lucide-react";
import { NetworkSpeedIcon } from "../components/icons/GnomeIcons";
import { DateMenuPopover } from "./DateMenuPopover";
import { QuickSettingsPopover } from "./QuickSettingsPopover";
import { useSettingsStore } from "../store/settingsStore";
import { useWindowStore } from "../store/windowStore";

export const TopBar = () => {
  const [timeStr, setTimeStr] = useState("7:59 AM");
  const [dateStr, setDateStr] = useState("Tue Oct 20");
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(1);

  const placesRef = useRef(null);
  const dateMenuRef = useRef(null);
  const quickSettingsRef = useRef(null);

  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setMode = useSettingsStore((s) => s.setMode);

  const openWindow = useWindowStore((s) => s.openWindow);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);

  // Live Clock (minute tick, formatted like R1: "Tue Oct 20  7:59 AM")
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const dayNum = now.getDate();
      setDateStr(`${dayName} ${monthName} ${dayNum}`);

      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      setTimeStr(`${hours}:${minutesStr} ${ampm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menus on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (placesRef.current && !placesRef.current.contains(e.target)) {
        setIsPlacesOpen(false);
      }
      if (dateMenuRef.current && !dateMenuRef.current.contains(e.target)) {
        setIsDateMenuOpen(false);
      }
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(e.target)) {
        setIsQuickSettingsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsPlacesOpen(false);
        setIsDateMenuOpen(false);
        setIsQuickSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenApp = (appId, params = {}) => {
    openWindow(appId, params);
    setIsPlacesOpen(false);
  };

  const handleWorkspaceWheel = (e) => {
    if (e.deltaY > 0) {
      setActiveWorkspace((prev) => (prev < 3 ? prev + 1 : 1));
    } else {
      setActiveWorkspace((prev) => (prev > 1 ? prev - 1 : 3));
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-8 z-[1100] px-3 flex items-center justify-between text-xs select-none backdrop-blur-md transition-colors duration-200"
        style={{
          backgroundColor: "var(--topbar-bg)",
          color: "var(--topbar-text)",
        }}
        role="banner"
      >
        {/* ── Left Zone: Workspaces (dots/pill), Places, Network speed (R1) ── */}
        <div className="flex items-center gap-2">
          {/* Workspace Indicator (R1: dot, wide active pill, dot) */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
            onClick={toggleActivities}
            onWheel={handleWorkspaceWheel}
            title="Workspaces & Activities (Click to toggle, Scroll to switch)"
            aria-label="Workspaces"
          >
            {[1, 2, 3].map((ws) => (
              <button
                key={ws}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveWorkspace(ws);
                }}
                className={`transition-all duration-150 ${
                  activeWorkspace === ws
                    ? "w-7 h-2 rounded-full bg-white shadow-sm"
                    : "w-2 h-2 rounded-full bg-white/40 hover:bg-white/70"
                }`}
                title={`Workspace ${ws}`}
                aria-label={`Switch to workspace ${ws}`}
              />
            ))}
          </div>

          {/* Places Dropdown Menu */}
          <div className="relative" ref={placesRef}>
            <button
              onClick={() => setIsPlacesOpen(!isPlacesOpen)}
              className={`px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-colors font-medium ${
                isPlacesOpen ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/90"
              }`}
              aria-expanded={isPlacesOpen}
              aria-haspopup="true"
            >
              <span>Places</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isPlacesOpen && (
              <div
                className="absolute top-8 left-0 w-56 rounded-2xl py-2 shadow-2xl border border-white/10 z-[1200] animate-in fade-in duration-100"
                style={{ backgroundColor: "#36363a", color: "#ffffff" }}
                role="menu"
              >
                <div className="px-3.5 py-1 text-[10px] uppercase tracking-wider font-semibold opacity-50">
                  Places
                </div>
                <button
                  onClick={() => handleOpenApp("about")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => handleOpenApp("projects")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Projects</span>
                </button>
                <button
                  onClick={() => handleOpenApp("experience")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Experience</span>
                </button>
                <button
                  onClick={() => handleOpenApp("stack")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <Layers className="w-4 h-4 text-teal-400" />
                  <span>Technical Stack</span>
                </button>
                <button
                  onClick={() => handleOpenApp("notes")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Education & Notes</span>
                </button>
                <button
                  onClick={() => handleOpenApp("resume")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <FileText className="w-4 h-4 text-rose-400" />
                  <span>Documents (Resume)</span>
                </button>
                <div className="my-1.5 border-t border-white/10" />
                <button
                  onClick={() => handleOpenApp("terminal")}
                  className="w-full px-3.5 py-1.5 flex items-center gap-3 hover:bg-white/10 text-left transition-colors text-xs"
                  role="menuitem"
                >
                  <Terminal className="w-4 h-4 text-gray-300" />
                  <span>Terminal</span>
                </button>
              </div>
            )}
          </div>

          {/* Network Speed Readout (R1: ⇅ 8.8 KB/s) */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tabular-nums text-white/80">
            <NetworkSpeedIcon />
            <span>8.8 KB/s</span>
          </div>
        </div>

        {/* ── Center Zone: Live Date & Time with Open Highlight Pill (R1, R3) ── */}
        <div className="relative" ref={dateMenuRef}>
          <button
            onClick={() => {
              setIsDateMenuOpen(!isDateMenuOpen);
              setIsQuickSettingsOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-2 tabular-nums ${
              isDateMenuOpen
                ? "bg-white/20 text-white shadow-sm ring-1 ring-white/20"
                : "hover:bg-white/10 text-white/90"
            }`}
            aria-label={`Current date and time: ${dateStr} ${timeStr}`}
            aria-expanded={isDateMenuOpen}
          >
            <span>{dateStr}</span>
            <span className="font-semibold">{timeStr}</span>
          </button>
        </div>

        {/* ── Right Zone: Tray Icons & Quick Settings Pill (R1, R4) ── */}
        <div className="flex items-center gap-3">
          {/* Classic View Shortcut */}
          <button
            onClick={() => setMode("classic")}
            className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] bg-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/30 transition-colors border border-[var(--accent)]/40 font-medium"
            title="Switch to Linear / Classic Portfolio"
          >
            Classic View
          </button>

          {/* Quick Settings Pill (Wi-Fi, Volume, Battery 79%) */}
          <div className="relative" ref={quickSettingsRef}>
            <button
              onClick={() => {
                setIsQuickSettingsOpen(!isQuickSettingsOpen);
                setIsDateMenuOpen(false);
              }}
              className={`px-3 py-1 rounded-full flex items-center gap-2.5 transition-colors ${
                isQuickSettingsOpen
                  ? "bg-white/20 text-white ring-1 ring-white/20"
                  : "bg-white/10 hover:bg-white/15 text-white"
              }`}
              aria-label="Quick Settings"
              aria-expanded={isQuickSettingsOpen}
            >
              <Wifi className="w-3.5 h-3.5 text-white" />
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-white" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/70" />
              )}
              <div className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-mono tabular-nums font-medium">79%</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Popovers */}
      {isDateMenuOpen && (
        <DateMenuPopover onClose={() => setIsDateMenuOpen(false)} />
      )}
      {isQuickSettingsOpen && (
        <QuickSettingsPopover onClose={() => setIsQuickSettingsOpen(false)} />
      )}
    </>
  );
};
