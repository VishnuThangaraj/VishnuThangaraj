import { useState } from "react";
import { profile } from "../data/profile";
import { User, Sparkles, MapPin, Cpu, Code, Server } from "lucide-react";
import { useWindowStore } from "../store/windowStore";

export const AboutApp = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="flex h-full min-h-[460px] select-text">
      {/* Sidebar (Places style) */}
      <div className="w-48 border-r border-white/10 p-3 space-y-1 bg-black/10 shrink-0 select-none">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1">
          Places
        </div>
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition-colors ${
            activeTab === "overview"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "hover:bg-white/5 text-gray-300"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("bio")}
          className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition-colors ${
            activeTab === "bio"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "hover:bg-white/5 text-gray-300"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Biography</span>
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition-colors ${
            activeTab === "specs"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "hover:bg-white/5 text-gray-300"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>System Specs</span>
        </button>

        <div className="pt-4 border-t border-white/10 mt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1">
            Shortcuts
          </div>
          <button
            onClick={() => openWindow("projects")}
            className="w-full px-2.5 py-1.5 rounded-xl text-left text-xs text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => openWindow("experience")}
            className="w-full px-2.5 py-1.5 rounded-xl text-left text-xs text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
          >
            <Server className="w-3.5 h-3.5 text-amber-400" />
            <span>Experience</span>
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header Hero */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-[1px] shadow-xl shrink-0">
                <div className="w-full h-full rounded-[15px] bg-black/80 flex items-center justify-center font-bold text-2xl text-amber-300 font-mono">
                  VT
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{profile.identity.name}</span>
                </h1>
                <p className="text-sm text-amber-400 font-medium">
                  {profile.identity.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {profile.identity.location}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Available for Roles</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-2xl font-bold text-amber-300">9.5</div>
                <div className="text-[11px] text-gray-400">MSc Data Science CGPA</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-2xl font-bold text-emerald-400">2+</div>
                <div className="text-[11px] text-gray-400">Industry Internships</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-[11px] text-gray-400">Production Code Focus</div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                Professional Summary
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed p-4 rounded-xl bg-white/5 border border-white/10">
                {profile.identity.summary}
              </p>
            </div>

            {/* Core Domain Badges */}
            <div className="space-y-2">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                Core Domains
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Full Stack Development (MERN)", "DevOps & CI/CD (Docker, Jenkins)", "AI/ML Engineering (TensorFlow, Ollama)", "System Design & REST APIs"].map((dom) => (
                  <span
                    key={dom}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  >
                    {dom}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bio" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h2 className="text-base font-bold text-white">Career Background</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Software engineer with specialized education in Data Science and hands-on experience building full-stack web applications and robust automated pipelines.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              At <strong>SHNOOR International</strong>, developed end-to-end full stack features using the MERN stack with TypeScript, along with Docker and Jenkins deployment pipelines.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              At <strong>IICT</strong>, researched and built machine learning models for classification and prediction tasks with Python, Scikit-learn, and TensorFlow.
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="space-y-3 font-mono text-xs animate-in fade-in duration-150">
            <h2 className="text-base font-sans font-bold text-white mb-2">VishnuOS Specifications</h2>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Operating System:</span>
                <span className="text-amber-300">VishnuOS v2.0 (Tahoe Liquid Glass)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kernel:</span>
                <span>React 19 Concurrent Root</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Window Manager:</span>
                <span>Zustand-powered Liquid Window Manager</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Styling Architecture:</span>
                <span>Tailwind CSS + SVG Lensing Material</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target Candidate:</span>
                <span className="text-emerald-400">Vishnu Thangaraj</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
