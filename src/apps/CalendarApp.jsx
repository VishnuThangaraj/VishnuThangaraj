import { useState } from "react";
import { CalendarGrid } from "../components/primitives/CalendarGrid";
import { MapPin, Tag } from "lucide-react";

export const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 9, 20));

  return (
    <div className="flex h-full bg-[#1d1d20] text-white select-none">
      {/* ── Left Sidebar: Mini Calendar + Event Filters ── */}
      <div className="w-64 bg-[#29292d] p-4 border-r border-white/10 flex flex-col gap-4">
        <CalendarGrid onSelectDate={setSelectedDate} />

        <div className="pt-3 border-t border-white/10 text-xs">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-2">
            Calendars
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              <span>Career Milestones</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Academic Deadlines</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>Project Releases</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Content: Selected Day Events ── */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h1>
          <p className="text-xs text-white/60 mt-1">Schedule and timeline agenda</p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#29292d] border-l-4 border-[var(--accent)] shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-white">Full Stack & DevOps Engineering</h3>
              <span className="text-xs text-[var(--accent)] font-medium">All Day</span>
            </div>
            <p className="text-xs text-white/70 mb-3">
              Actively developing responsive web systems, CI/CD automated deployments, and Ollama ML models.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>India / Remote Worldwide</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Open for Opportunities</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#29292d] border-l-4 border-blue-400 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-white">SHNOOR International Sprint Delivery</h3>
              <span className="text-xs text-blue-400 font-medium">09:30 AM - 05:30 PM</span>
            </div>
            <p className="text-xs text-white/70">
              MERN stack feature integration and Jenkins Docker deployment review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
