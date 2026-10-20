import { CalendarGrid } from "../components/primitives/CalendarGrid";
import { Play, SkipBack, SkipForward, Bell, Globe } from "lucide-react";

export const DateMenuPopover = () => {
  return (
    <div
      className="fixed z-[1200] text-white shadow-2xl border border-white/10 overflow-hidden flex flex-row animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: "583px",
        top: "38px",
        width: "754px",
        height: "645px",
        borderRadius: "20px",
        backgroundColor: "#36363a",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Left Column: Notifications & Media (~350px) ── */}
      <div className="w-[350px] p-5 flex flex-col border-r border-white/10 overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <Bell className="w-4 h-4 text-white/70" />
            <span>Notifications</span>
          </div>
          <button className="text-xs text-white/60 hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-white/10">
            Clear
          </button>
        </div>

        {/* Media Player Card (R3) */}
        <div className="bg-[#54545a] p-3.5 rounded-xl border border-white/5 mb-4 shadow-sm">
          <div className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1">
            Media Player
          </div>
          <div className="text-sm font-bold truncate">FizzType Soundscapes</div>
          <div className="text-xs text-white/70 truncate mb-3">Vishnu Thangaraj — Coding Flow</div>
          <div className="flex items-center justify-center gap-6">
            <button className="text-white/70 hover:text-white transition-colors" aria-label="Previous">
              <SkipBack className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center justify-center transition-colors shadow" aria-label="Play">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors" aria-label="Next">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 flex-1 overflow-y-auto">
          <div className="bg-[#54545a] p-3 rounded-xl border border-white/5 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-white">SHNOOR International</span>
              <span className="text-[10px] text-white/50">10m ago</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Docker staging container deployed successfully. CI/CD pipeline verified.
            </p>
          </div>

          <div className="bg-[#54545a] p-3 rounded-xl border border-white/5 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-white">IronParadise ERP</span>
              <span className="text-[10px] text-white/50">1h ago</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Ollama AI workout model checkpoint ready for inference.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Column: Calendar, Today & World Clocks (~404px) ── */}
      <div className="flex-1 p-5 flex flex-col overflow-y-auto">
        {/* Date Header (R3) */}
        <div className="mb-4">
          <div className="text-xs text-white/60 font-medium">Tuesday</div>
          <div className="text-2xl font-bold tracking-tight">October 20 2026</div>
        </div>

        {/* Calendar Grid (R3) */}
        <div className="mb-4">
          <CalendarGrid />
        </div>

        {/* Today Card */}
        <div className="bg-[#54545a] p-3.5 rounded-xl border border-white/5 mb-3">
          <div className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1">
            Today
          </div>
          <div className="text-xs font-semibold text-white">Full Stack & DevOps Engineering</div>
          <div className="text-[11px] text-white/70">All Day • Open to opportunities</div>
        </div>

        {/* World Clocks Card (R3) */}
        <div className="bg-[#54545a] p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>World Clocks</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/90">Coimbatore, India</span>
              <span className="font-mono font-semibold">10:00 AM (IST)</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>St. Louis, MO (SHNOOR)</span>
              <span className="font-mono">11:30 PM (-10.5h)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
