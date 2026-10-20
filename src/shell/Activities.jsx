import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { AppIcon } from "../components/AppIcon";
import { SearchPill } from "../components/primitives/SearchPill";
import { useWindowStore } from "../store/windowStore";

const GRID_APPS_PAGE_1 = [
  { id: "brave", name: "Brave", icon: "Globe", color: "#fb542b", category: "Web" },
  { id: "files", name: "Files", icon: "Folder", color: "#5294e2", category: "System" },
  { id: "thunderbird", name: "Thunderbird", icon: "Mail", color: "#3584e4", category: "Mail" },
  { id: "chrome", name: "Chrome", icon: "Globe", color: "#ea4335", category: "Web" },
  { id: "capture", name: "Document Viewer", icon: "FileText", color: "#f87171", category: "Office" },
  { id: "obsidian", name: "Obsidian", icon: "BookOpen", color: "#818cf8", category: "Notes" },
  { id: "terminal", name: "Terminal", icon: "Terminal", color: "#e2e8f0", category: "System" },
  { id: "mongodb", name: "MongoDB Compass", icon: "Database", color: "#10b981", category: "Development" },
  { id: "code", name: "VS Code", icon: "Code2", color: "#007acc", category: "Development" },
  { id: "whatsapp", name: "Contact / Chat", icon: "MessageCircle", color: "#25d366", category: "Communication" },

  // Row 2
  { id: "projects", name: "Projects Browser", icon: "Layers", color: "#34d399", category: "Portfolio" },
  { id: "experience", name: "Experience", icon: "Briefcase", color: "#fbbf24", category: "Portfolio" },
  { id: "stack", name: "Tech Stack", icon: "Server", color: "#2dd4bf", category: "Development" },
  { id: "notes", name: "Notes & Edu", icon: "BookOpen", color: "#c084fc", category: "Education" },
  { id: "settings", name: "Settings", icon: "Settings", color: "#94a3b8", category: "System" },
  { id: "calculator", name: "Calculator", icon: "Calculator", color: "#f97316", category: "Utilities" },
  { id: "calendar", name: "Calendar", icon: "Calendar", color: "#ef4444", category: "Productivity" },
  { id: "clocks", name: "Clocks", icon: "Clock", color: "#06b6d4", category: "Utilities" },
  { id: "system-monitor", name: "System Monitor", icon: "Activity", color: "#eab308", category: "System" },
  {
    id: "devtools-folder",
    name: "Developer Tools",
    isFolder: true,
    icons: ["Code2", "Terminal", "Database", "Layers"],
    category: "Folder",
  },

  // Row 3
  { id: "about", name: "About Vishnu", icon: "User", color: "#60a5fa", category: "Portfolio" },
  { id: "resume", name: "Resume", icon: "FileText", color: "#fb7185", category: "Portfolio" },
  { id: "ironparadise", name: "IronParadise", icon: "Dumbbell", color: "#f87171", category: "Projects" },
  { id: "fizztype", name: "FizzType", icon: "Keyboard", color: "#c084fc", category: "Projects" },
  { id: "trash", name: "Trash", icon: "Trash2", color: "#64748b", category: "System" },
  { id: "image-viewer", name: "Image Viewer", icon: "Image", color: "#38bdf8", category: "Graphics" },
  { id: "software", name: "App Center", icon: "ShoppingBag", color: "#a855f7", category: "System" },
  { id: "weather", name: "Weather", icon: "CloudSun", color: "#38bdf8", category: "Utilities" },
  { id: "music", name: "Music", icon: "Music", color: "#ec4899", category: "Media" },
  { id: "help", name: "Help", icon: "HelpCircle", color: "#94a3b8", category: "System" },
];

export const Activities = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // 0, 1, 2
  const [activeWorkspace, setActiveWorkspace] = useState(1);

  const isActivitiesOpen = useWindowStore((s) => s.isActivitiesOpen);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);
  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
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

  const filteredApps = query
    ? GRID_APPS_PAGE_1.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          a.id.toLowerCase().includes(query.toLowerCase())
      )
    : GRID_APPS_PAGE_1;

  const handleLaunch = (app) => {
    toggleActivities();
    if (app.id === "ironparadise" || app.id === "fizztype") {
      openWindow("projects", { itemId: app.id });
    } else {
      openWindow(app.id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1300] bg-black/60 backdrop-blur-2xl flex flex-col items-center pt-8 px-8 pb-24 overflow-hidden select-none animate-in fade-in duration-200"
      onClick={toggleActivities}
      role="dialog"
      aria-label="Activities Overview"
    >
      {/* ── Top Search Pill: Centered, 370×36px (R2) ── */}
      <div className="mb-6" onClick={(e) => e.stopPropagation()}>
        <SearchPill
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          placeholder="Type to search"
          autoFocus={true}
        />
      </div>

      {/* ── Workspace Strip: 3 Thumbnails (R2) ── */}
      {!query && (
        <div
          className="flex items-center justify-center gap-6 mb-8"
          onClick={(e) => e.stopPropagation()}
        >
          {[1, 2, 3].map((ws) => (
            <div
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`relative cursor-pointer rounded-xl overflow-hidden shadow-2xl transition-all duration-150 border-2 ${
                activeWorkspace === ws
                  ? "border-white ring-2 ring-white/30 scale-105"
                  : "border-white/20 opacity-75 hover:opacity-100"
              }`}
              style={{
                width: activeWorkspace === ws ? "270px" : "240px",
                height: activeWorkspace === ws ? "152px" : "135px",
                backgroundColor: "#252a1a",
              }}
            >
              {/* Thumbnail miniature preview */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#2c3a1e] to-[#152a22] flex items-center justify-center">
                <span className="text-xs text-white/50 font-medium">Workspace {ws}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── App Grid: 10 Columns × 3 Rows per page (R2) ── */}
      <div
        className="w-full max-w-[1500px] flex-1 flex items-center justify-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-x-4 gap-y-6 justify-items-center w-full">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleLaunch(app)}
              className="flex flex-col items-center justify-start w-28 group cursor-pointer"
            >
              {/* Icon Container (64×64 px) */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-150 group-hover:scale-105 group-hover:bg-white/10 group-active:scale-95">
                {app.isFolder ? (
                  /* 2×2 Folder tile preview (R2) */
                  <div className="w-14 h-14 rounded-2xl bg-[#36363a] border border-white/15 p-2 grid grid-cols-2 gap-1 items-center justify-items-center shadow-lg">
                    {app.icons.map((ic, idx) => (
                      <AppIcon key={idx} name={ic} className="w-4 h-4 text-white/80" />
                    ))}
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-md p-2">
                    <AppIcon name={app.icon} className="w-9 h-9" style={{ color: app.color }} />
                  </div>
                )}
              </div>

              {/* Label (Truncated / Ellipsized like R2) */}
              <span
                className="mt-1 text-center text-xs text-white/90 group-hover:text-white font-medium truncate w-full px-1"
                title={app.name}
              >
                {app.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow for Next Page (R2) */}
        {!query && (
          <button
            onClick={() => setCurrentPage((p) => (p + 1) % 3)}
            className="absolute right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shadow-lg transition-colors"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ── Page Indicator Dots (3 dots, R2) ── */}
      {!query && (
        <div className="flex items-center gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
          {[0, 1, 2].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-full transition-all ${
                currentPage === page
                  ? "w-2.5 h-2.5 bg-white scale-110"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to page ${page + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
