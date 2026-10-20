import { useState } from "react";
import { profile } from "../data/profile";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  ExternalLink,
  Dumbbell,
  Keyboard,
  CheckCircle,
} from "lucide-react";
import { GithubIcon as Github } from "../components/AppIcon";

export const ProjectsApp = ({ params = {} }) => {
  const [activeProjectId, setActiveProjectId] = useState(
    params.itemId || "ironparadise"
  );

  const projects = profile.projects;
  const activeProj =
    projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <div className="flex flex-col h-full min-h-[500px] select-text">
      {/* ── Browser Header & Tabs ── */}
      <div className="border-b border-white/10 bg-black/20 select-none">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-3 pt-2">
          {projects.map((proj) => {
            const isActive = activeProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs font-medium transition-all max-w-[200px] truncate ${
                  isActive
                    ? "bg-[#1f1f23] text-[var(--accent)] border-t border-x border-white/15"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {proj.id === "ironparadise" ? (
                  <Dumbbell className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Keyboard className="w-3.5 h-3.5 text-purple-400" />
                )}
                <span className="truncate">{proj.name}</span>
              </button>
            );
          })}
        </div>

        {/* Browser Navigation & URL Bar */}
        <div className="px-3 py-2 flex items-center gap-2 bg-[#1f1f23] border-t border-white/10">
          <div className="flex items-center gap-1 text-gray-400">
            <button className="p-1 rounded hover:bg-white/10 disabled:opacity-30">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 disabled:opacity-30">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded hover:bg-white/10">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-gray-300">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-500">https://</span>
            <span className="text-white">vishnu.dev/projects/{activeProj.id}</span>
          </div>

          {/* External Github Link */}
          <a
            href={activeProj.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 text-[var(--accent)] border border-[var(--accent)]/30 text-xs font-medium transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Project Hero Card */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{activeProj.name}</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Featured Project
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--accent)] mt-1">
                {activeProj.tagline}
              </p>
            </div>

            <a
              href={activeProj.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-[var(--accent)]/20 w-fit"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            {activeProj.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
            Architecture & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeProj.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {activeProj.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
