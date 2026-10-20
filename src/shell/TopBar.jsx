import { useState, useEffect, useRef } from "react";
import {
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  BatteryCharging,
  Settings,
  Folder,
  Sun,
  Moon,
  Activity,
  Layers,
  ChevronDown,
  Calendar as CalendarIcon,
  BookOpen,
  Briefcase,
  Globe,
  Terminal,
  FileText,
  User,
  Sliders,
} from "lucide-react";
import { useSettingsStore } from "../store/settingsStore";
import { useWindowStore } from "../store/windowStore";

export const TopBar = () => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [batteryInfo, setBatteryInfo] = useState(null);

  const placesRef = useRef(null);
  const calendarRef = useRef(null);
  const quickSettingsRef = useRef(null);

  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const setMode = useSettingsStore((s) => s.setMode);

  const openWindow = useWindowStore((s) => s.openWindow);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: "short", month: "short", day: "numeric" };
      setDateStr(now.toLocaleDateString("en-US", options));
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Network API detection (Task 2.2 / D11)
  useEffect(() => {
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const conn = navigator.connection;
      const updateNet = () => {
        if (conn && conn.downlink) {
          setNetworkInfo(`${conn.downlink} Mbps`);
        }
      };
      updateNet();
      conn?.addEventListener?.("change", updateNet);
      return () => conn?.removeEventListener?.("change", updateNet);
    }
  }, []);

  // Battery API detection (Task 2.2 / D11)
  useEffect(() => {
    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBat = () => {
          setBatteryInfo({
            level: Math.round(battery.level * 100),
            charging: battery.charging,
          });
        };
        updateBat();
        battery.addEventListener("levelchange", updateBat);
        battery.addEventListener("chargingchange", updateBat);
      }).catch(() => {
        // Battery API blocked or unavailable
      });
    }
  }, []);

  // Close menus on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (placesRef.current && !placesRef.current.contains(e.target)) {
        setIsPlacesOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(e.target)) {
        setIsQuickSettingsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsPlacesOpen(false);
        setIsCalendarOpen(false);
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

  const handleOpenApp = (appId) => {
    openWindow(appId);
    setIsPlacesOpen(false);
  };

  const isLight = theme === "light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-8 z-[1100] px-3 flex items-center justify-between text-xs select-none backdrop-blur-md transition-colors duration-200 border-b ${
        isLight
          ? "bg-white/80 text-gray-900 border-black/10"
          : "bg-black/60 text-gray-200 border-white/10"
      }`}
      role="banner"
    >
      {/* ── Left Area: Activities, Workspaces, Places, Network ── */}
      <div className="flex items-center gap-2">
        {/* Activities button */}
        <button
          onClick={toggleActivities}
          className="px-2 py-0.5 rounded font-medium hover:bg-white/15 active:bg-white/25 transition-colors flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-amber-400"
          title="Activities & Launchpad (Ctrl+K)"
        >
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Activities</span>
        </button>

        {/* Workspace dots (GNOME style) */}
        <div className="flex items-center gap-1 px-1 py-0.5" aria-label="Workspaces">
          {[1, 2, 3].map((ws) => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeWorkspace === ws
                  ? "bg-amber-400 scale-110 shadow-sm"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              title={`Workspace ${ws}`}
              aria-label={`Switch to workspace ${ws}`}
            />
          ))}
        </div>

        {/* Places Menu */}
        <div className="relative" ref={placesRef}>
          <button
            onClick={() => setIsPlacesOpen(!isPlacesOpen)}
            className="px-2 py-0.5 rounded flex items-center gap-1 hover:bg-white/15 active:bg-white/25 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
            aria-expanded={isPlacesOpen}
            aria-haspopup="true"
          >
            <Folder className="w-3.5 h-3.5 text-amber-300" />
            <span>Places</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {isPlacesOpen && (
            <div
              className={`absolute top-8 left-0 w-52 rounded-xl py-1.5 shadow-2xl border backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                isLight
                  ? "bg-white/90 border-gray-200 text-gray-900"
                  : "bg-[#1f1f23]/90 border-white/15 text-white"
              }`}
              role="menu"
            >
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold opacity-50">
                Navigation
              </div>
              <button
                onClick={() => handleOpenApp("about")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <User className="w-4 h-4 text-blue-400" />
                <span>Home (About Me)</span>
              </button>
              <button
                onClick={() => handleOpenApp("projects")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => handleOpenApp("experience")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Work Experience</span>
              </button>
              <button
                onClick={() => handleOpenApp("stack")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Technical Stack</span>
              </button>
              <button
                onClick={() => handleOpenApp("notes")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Education & Notes</span>
              </button>
              <button
                onClick={() => handleOpenApp("resume")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <FileText className="w-4 h-4 text-rose-400" />
                <span>Resume / Downloads</span>
              </button>
              <div className="my-1 border-t border-white/10" />
              <button
                onClick={() => handleOpenApp("terminal")}
                className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-amber-500/20 text-left transition-colors"
                role="menuitem"
              >
                <Terminal className="w-4 h-4 text-gray-300" />
                <span>Terminal</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Network status (shown only if available) */}
        {networkInfo && (
          <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] opacity-75 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{networkInfo}</span>
          </div>
        )}
      </div>

      {/* ── Centre Area: Live Clock & Date Popover ── */}
      <div className="relative" ref={calendarRef}>
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="px-2.5 py-0.5 rounded font-medium hover:bg-white/15 active:bg-white/25 transition-colors flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-amber-400"
          aria-label={`Current date and time: ${dateStr} ${timeStr}`}
        >
          <span>{dateStr}</span>
          <span className="font-semibold">{timeStr}</span>
        </button>

        {isCalendarOpen && (
          <div
            className={`absolute top-8 left-1/2 -translate-x-1/2 w-64 rounded-2xl p-4 shadow-2xl border backdrop-blur-xl z-50 text-center animate-in fade-in duration-150 ${
              isLight
                ? "bg-white/90 border-gray-200 text-gray-900"
                : "bg-[#1f1f23]/90 border-white/15 text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold mb-1">
              <CalendarIcon className="w-4 h-4" />
              <span>VishnuOS Calendar</span>
            </div>
            <div className="text-xl font-bold">{timeStr}</div>
            <div className="text-sm opacity-70 mb-3">{dateStr}</div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
              <div className="font-medium text-amber-300">Open for Opportunities</div>
              <div className="text-[11px] opacity-75 mt-0.5">
                Full Stack Developer | DevOps | AI/ML
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right Area: Classic View, Quick Settings Pill, Theme, Settings ── */}
      <div className="flex items-center gap-2">
        {/* Skip to Classic View (Accessible / Recruiter link) */}
        <button
          onClick={() => setMode("classic")}
          className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors border border-amber-500/30 font-medium"
          title="Switch to Linear / Classic Portfolio"
        >
          Classic View
        </button>

        {/* Quick-settings pill (Wi-Fi, Volume, Battery) */}
        <div className="relative" ref={quickSettingsRef}>
          <button
            onClick={() => setIsQuickSettingsOpen(!isQuickSettingsOpen)}
            className="px-2 py-0.5 rounded-full flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
            aria-label="Quick Settings"
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-gray-300" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-50" />
            )}
            {batteryInfo ? (
              <div className="flex items-center gap-1">
                {batteryInfo.charging ? (
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Battery className="w-3.5 h-3.5 text-gray-300" />
                )}
                <span className="text-[10px] font-mono">{batteryInfo.level}%</span>
              </div>
            ) : (
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          {isQuickSettingsOpen && (
            <div
              className={`absolute top-8 right-0 w-64 rounded-2xl p-3 shadow-2xl border backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                isLight
                  ? "bg-white/90 border-gray-200 text-gray-900"
                  : "bg-[#1f1f23]/90 border-white/15 text-white"
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2 px-1">
                Quick Settings
              </div>
              <div className="space-y-2">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs">Theme</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-1 rounded-lg hover:bg-white/15 transition-colors"
                      title="Toggle Dark/Light"
                    >
                      {theme === "dark" ? (
                        <Moon className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Sun className="w-4 h-4 text-amber-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sound Toggle */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs">Audio Effects</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      soundEnabled ? "bg-amber-500 text-black font-semibold" : "bg-white/10 opacity-70"
                    }`}
                  >
                    {soundEnabled ? "Enabled" : "Muted"}
                  </button>
                </div>

                {/* Settings App Launcher */}
                <button
                  onClick={() => {
                    openWindow("settings");
                    setIsQuickSettingsOpen(false);
                  }}
                  className="w-full py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>All System Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Direct Settings Gear Icon */}
        <button
          onClick={() => openWindow("settings")}
          className="p-1 rounded hover:bg-white/15 active:bg-white/25 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
          title="Open Settings"
          aria-label="Open Settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
