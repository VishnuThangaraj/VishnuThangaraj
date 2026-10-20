import { useState, useEffect, useRef } from "react";
import { Search, X, Activity } from "lucide-react";
import { AppIcon } from "../components/AppIcon";
import { useWindowStore } from "../store/windowStore";

const ALL_APPS = [
  { id: "about", name: "About Me", icon: "User", color: "#60a5fa", desc: "Biography & overview" },
  { id: "experience", name: "Experience", icon: "Briefcase", color: "#fbbf24", desc: "SHNOOR Intl & IICT" },
  { id: "projects", name: "Projects", icon: "Globe", color: "#34d399", desc: "IronParadise & FizzType" },
  { id: "code", name: "Code Editor", icon: "Code2", color: "#818cf8", desc: "Source files & repos" },
  { id: "terminal", name: "Terminal", icon: "Terminal", color: "#e2e8f0", desc: "Interactive bash CLI" },
  { id: "stack", name: "Tech Stack", icon: "Layers", color: "#2dd4bf", desc: "Skills database & tools" },
  { id: "notes", name: "Notes & Edu", icon: "BookOpen", color: "#c084fc", desc: "MSc & BCA academic records" },
  { id: "contact", name: "Contact", icon: "Mail", color: "#f472b6", desc: "Email, GitHub, LinkedIn" },
  { id: "resume", name: "Resume", icon: "FileText", color: "#fb7185", desc: "Printable CV & highlights" },
  { id: "settings", name: "Settings", icon: "Settings", color: "#94a3b8", desc: "Theme, glass & controls" },
  { id: "trash", name: "Trash", icon: "Trash2", color: "#64748b", desc: "Easter egg" },
];

export const Activities = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const isActivitiesOpen = useWindowStore((s) => s.isActivitiesOpen);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    if (isActivitiesOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isActivitiesOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleActivities();
      } else if (e.key === "Escape" && isActivitiesOpen) {
        toggleActivities();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActivitiesOpen, toggleActivities]);

  if (!isActivitiesOpen) return null;

  const filteredApps = ALL_APPS.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[1300] bg-black/75 backdrop-blur-2xl flex flex-col items-center pt-16 px-6 pb-24 overflow-y-auto select-none animate-in fade-in duration-200"
      onClick={toggleActivities}
      role="dialog"
      aria-label="Activities Overview"
    >
      {/* Search Bar */}
      <div
        className="w-full max-w-xl mb-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-amber-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search apps, skills, experience, or projects..."
            className="w-full h-12 pl-12 pr-10 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm backdrop-blur-xl outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-2xl transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 p-1 rounded-full hover:bg-white/10 text-white/70"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Section 1: Active Window Tiles (Overview) ── */}
      {windows.length > 0 && !query && (
        <div
          className="w-full max-w-5xl mb-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3 px-1 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Windows ({windows.length})</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {windows.map((win) => (
              <div
                key={win.id}
                onClick={() => {
                  focusWindow(win.id);
                  toggleActivities();
                }}
                className="group relative rounded-xl border border-white/20 bg-black/40 hover:bg-black/60 backdrop-blur-xl p-3 cursor-pointer shadow-lg hover:shadow-2xl hover:border-amber-400/60 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white truncate max-w-[80%]">
                    <AppIcon name={win.icon} className="w-4 h-4 text-amber-400" />
                    <span className="truncate">{win.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                    className="p-1 rounded-lg hover:bg-red-500/30 text-white/60 hover:text-red-300 transition-colors"
                    title="Close Window"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center p-2 text-center text-xs text-gray-400">
                  <span className="font-mono text-[11px] opacity-75">Click to focus</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Section 2: Applications Grid ── */}
      <div
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4 px-1">
          {query ? `Search Results (${filteredApps.length})` : "Applications"}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                openWindow(app.id);
                toggleActivities();
              }}
              className="flex items-center gap-3.5 p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/15 active:scale-95 text-left transition-all backdrop-blur-md group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-black/40 border border-white/15 shadow-md group-hover:scale-105 transition-transform">
                <AppIcon name={app.icon} className="w-5 h-5" style={{ color: app.color }} />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                  {app.name}
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  {app.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
