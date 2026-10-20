import { useState } from "react";
import { profile } from "../data/profile";
import { AppIcon } from "../components/AppIcon";
import { AppContent } from "../apps/registry";
import { useSettingsStore } from "../store/settingsStore";
import { Wifi, Battery, ChevronLeft, X, Laptop } from "lucide-react";

const PHONE_APPS = [
  { id: "about", name: "About Me", icon: "User", color: "#60a5fa" },
  { id: "experience", name: "Experience", icon: "Briefcase", color: "#fbbf24" },
  { id: "projects", name: "Projects", icon: "Globe", color: "#34d399" },
  { id: "code", name: "Code", icon: "Code2", color: "#818cf8" },
  { id: "terminal", name: "Terminal", icon: "Terminal", color: "#e2e8f0" },
  { id: "stack", name: "Stack", icon: "Layers", color: "#2dd4bf" },
  { id: "notes", name: "Education", icon: "BookOpen", color: "#c084fc" },
  { id: "contact", name: "Contact", icon: "Mail", color: "#f472b6" },
  { id: "resume", name: "Resume", icon: "FileText", color: "#fb7185" },
  { id: "settings", name: "Settings", icon: "Settings", color: "#94a3b8" },
];

const PINNED_DOCK_APPS = [
  { id: "about", icon: "User", color: "#60a5fa" },
  { id: "projects", icon: "Globe", color: "#34d399" },
  { id: "terminal", icon: "Terminal", color: "#e2e8f0" },
  { id: "contact", icon: "Mail", color: "#f472b6" },
];

export const PhoneMode = () => {
  const [activeAppId, setActiveAppId] = useState(null);
  const [appParams, setAppParams] = useState({});

  const setMode = useSettingsStore((s) => s.setMode);

  const handleOpenApp = (id, params = {}) => {
    setActiveAppId(id);
    setAppParams(params);
  };

  const handleCloseApp = () => {
    setActiveAppId(null);
    setAppParams({});
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0d1f1e] overflow-hidden flex flex-col justify-between text-white select-none">
      {/* ── Status Bar ── */}
      <div className="h-10 px-5 flex items-center justify-between text-xs font-medium z-30 select-none backdrop-blur-md bg-black/30 border-b border-white/10">
        <span className="font-semibold font-mono">
          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
        </span>

        <div className="flex items-center gap-2">
          {/* Switch to Desktop OS button */}
          <button
            onClick={() => setMode("desktop")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30 text-[10px] font-medium"
            title="Switch to Desktop OS view"
          >
            <Laptop className="w-3 h-3" />
            <span>Desktop</span>
          </button>
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* ── Home Screen App Grid ── */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Candidate Widget */}
        <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center font-bold text-lg text-black font-mono">
              VT
            </div>
            <div>
              <div className="text-sm font-bold text-white">{profile.identity.name}</div>
              <div className="text-xs text-amber-300">{profile.identity.title}</div>
            </div>
          </div>
          <p className="text-xs text-gray-300 mt-2.5 leading-relaxed line-clamp-2">
            {profile.identity.summary}
          </p>
        </div>

        {/* App Icons Grid */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-3">
          {PHONE_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => handleOpenApp(app.id)}
              className="flex flex-col items-center group outline-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/20 shadow-lg flex items-center justify-center group-active:scale-95 transition-transform backdrop-blur-md">
                <AppIcon name={app.icon} className="w-7 h-7" style={{ color: app.color }} />
              </div>
              <span className="text-[11px] font-medium text-white/90 mt-1.5 truncate max-w-[64px]">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom Pinned Phone Dock ── */}
      <div className="p-4 z-20">
        <div className="h-16 px-4 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/20 flex items-center justify-around shadow-2xl">
          {PINNED_DOCK_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => handleOpenApp(app.id)}
              className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center active:scale-90 transition-transform"
            >
              <AppIcon name={app.icon} className="w-5 h-5" style={{ color: app.color }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Full-Screen App Sheet Modal (Task 5.3) ── */}
      {activeAppId && (
        <div className="fixed inset-0 z-50 bg-[#18181b] flex flex-col animate-in slide-in-from-bottom duration-200">
          {/* Sheet Top Bar */}
          <div className="h-12 px-4 border-b border-white/10 bg-black/40 flex items-center justify-between select-none shrink-0">
            <button
              onClick={handleCloseApp}
              className="flex items-center gap-1 text-xs text-amber-400 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-xs font-bold text-white capitalize">
              {activeAppId}
            </span>

            <button
              onClick={handleCloseApp}
              className="p-1 rounded-full bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sheet Content */}
          <div className="flex-1 overflow-y-auto">
            <AppContent appId={activeAppId} params={appParams} />
          </div>
        </div>
      )}
    </div>
  );
};
