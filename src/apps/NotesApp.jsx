import { useState } from "react";
import { profile } from "../data/profile";
import { Award, GraduationCap, CheckCircle2 } from "lucide-react";

export const NotesApp = () => {
  const [activeNote, setActiveNote] = useState("education");

  return (
    <div className="flex h-full min-h-[440px] select-text">
      {/* Sidebar Notebooks */}
      <div className="w-56 border-r border-white/10 p-3 space-y-1.5 bg-black/10 shrink-0 select-none">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1">
          Notebooks
        </div>

        <button
          onClick={() => setActiveNote("education")}
          className={`w-full p-2.5 rounded-xl text-left transition-all ${
            activeNote === "education"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "hover:bg-white/5 text-gray-300"
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Formal Education</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1 truncate">
            MSc (9.5) & BCA (8.8) degrees
          </div>
        </button>

        <button
          onClick={() => setActiveNote("honors")}
          className={`w-full p-2.5 rounded-xl text-left transition-all ${
            activeNote === "honors"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "hover:bg-white/5 text-gray-300"
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Honors & Certs</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1 truncate">
            Proficiency Award, Udemy, SkillUp
          </div>
        </button>
      </div>

      {/* Note Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeNote === "education" ? (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Academic Degrees</span>
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Verified university degree history and academic performance.
              </p>
            </div>

            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-white">
                        {edu.degree}
                      </h2>
                      <div className="text-xs text-amber-300 font-medium mt-0.5">
                        {edu.institution}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        CGPA: {edu.cgpa}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono text-gray-400 bg-white/5 border border-white/10">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Certificates & Recognitions</span>
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Academic proficiency accolades and technical course certifications.
              </p>
            </div>

            <div className="space-y-3">
              {profile.honors.map((hon, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      {hon.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {hon.description}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/10 text-gray-300">
                      {hon.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
