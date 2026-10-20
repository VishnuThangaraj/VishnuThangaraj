import { useState } from "react";
import { profile } from "../data/profile";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const ExperienceApp = ({ params = {} }) => {
  const [selectedRole, setSelectedRole] = useState(params.itemId || "shnoor");

  const roles = profile.experience;
  const activeExp = roles.find((r) => r.id === selectedRole) || roles[0];

  return (
    <div className="flex h-full min-h-[440px] select-text">
      {/* Role list sidebar */}
      <div className="w-64 border-r border-white/10 p-3 space-y-2 bg-black/10 shrink-0 select-none">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1">
          Positions ({roles.length})
        </div>
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`w-full p-2.5 rounded-xl text-left transition-all ${
              selectedRole === role.id
                ? "bg-amber-500/20 border border-amber-500/40 text-white shadow-md"
                : "hover:bg-white/5 text-gray-300 border border-transparent"
            }`}
          >
            <div className="text-xs font-semibold truncate text-amber-300">
              {role.company}
            </div>
            <div className="text-[11px] text-gray-400 truncate mt-0.5">
              {role.role}
            </div>
            <div className="text-[10px] text-gray-500 mt-1 font-mono">
              {role.period}
            </div>
          </button>
        ))}
      </div>

      {/* Role details pane */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Header */}
          <div className="border-b border-white/10 pb-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <span>{activeExp.role}</span>
            </h1>
            <div className="text-base text-amber-300 font-semibold mt-1">
              {activeExp.company}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {activeExp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {activeExp.location}
              </span>
            </div>
          </div>

          {/* Key Deliverables & Bullets */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
              Key Contributions & Responsibilities
            </h2>
            <div className="space-y-2.5">
              {activeExp.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack tags */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
              Technologies Utilized
            </h2>
            <div className="flex flex-wrap gap-2">
              {activeExp.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
