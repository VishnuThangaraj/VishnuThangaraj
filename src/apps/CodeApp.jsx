import { useState } from "react";
import { profile } from "../data/profile";
import { FileCode, FileText, Copy, Check, ChevronDown, Folder } from "lucide-react";

const CODE_FILES = {
  "profile.ts": {
    name: "profile.ts",
    lang: "typescript",
    icon: "FileCode",
    content: `/**
 * Single source of truth for portfolio content.
 * Vishnu Thangaraj — Full Stack Developer | DevOps | AI/ML
 */

export interface CandidateProfile {
  name: string;
  title: string;
  location: string;
  education: Array<{ degree: string; cgpa: string; period: string }>;
  experience: Array<{ company: string; role: string; period: string; tech: string[] }>;
  projects: Array<{ name: string; tagline: string; repo: string; tech: string[] }>;
}

export const profile: CandidateProfile = {
  name: "${profile.identity.name}",
  title: "${profile.identity.title}",
  location: "${profile.identity.location}",
  education: [
    { degree: "MSc Data Science", cgpa: "9.5", period: "2024 – 2026" },
    { degree: "BCA", cgpa: "8.8", period: "2021 – 2024" }
  ],
  experience: [
    {
      company: "SHNOOR International",
      role: "Software Engineer Intern",
      period: "Jul 2026 – Present",
      tech: ["React", "Node.js", "MongoDB", "TypeScript", "Docker", "Jenkins"]
    },
    {
      company: "IICT",
      role: "AI/ML Intern",
      period: "Jun – Jul 2026",
      tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn"]
    }
  ],
  projects: [
    {
      name: "IronParadise",
      tagline: "Gym ERP System with Ollama AI recommendations",
      repo: "https://github.com/VishnuThangaraj/IronParadise",
      tech: ["React", "TypeScript", "Node.js", "MongoDB", "Ollama", "Docker"]
    },
    {
      name: "FizzType",
      tagline: "Typing Analytics Platform with real-time accuracy",
      repo: "https://github.com/VishnuThangaraj/FizzType",
      tech: ["React", "Python", "Flask", "Docker", "Chart.js"]
    }
  ]
};`,
  },
  "README.md": {
    name: "README.md",
    lang: "markdown",
    icon: "FileText",
    content: `# VishnuOS Portfolio (v2.0)

> A modern Linux desktop OS portfolio rendered in macOS Tahoe Liquid Glass material.

## Developer Profile
- **Name**: Vishnu Thangaraj
- **Role**: Full Stack Developer | DevOps | AI/ML
- **MSc Data Science**: 9.5 CGPA
- **GitHub**: https://github.com/VishnuThangaraj

## Key Features
- **Desktop OS Architecture**: Window manager, floating dock with spring magnification, top bar.
- **Three Modes**: Desktop OS, Touch Phone mode, and Accessible Classic linear view.
- **Glass Material System**: T0 (Solid), T1 (CSS Glass), and T2 (Lensing Refraction).
- **Zero Gimmicks**: Every app is derived strictly from real resume data.`,
  },
};

export const CodeApp = () => {
  const [activeFile, setActiveFile] = useState("profile.ts");
  const [copied, setCopied] = useState(false);

  const file = CODE_FILES[activeFile];

  const handleCopy = () => {
    navigator.clipboard?.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = file.content.split("\n");

  return (
    <div className="flex h-full min-h-[460px] font-mono select-text bg-[#1e1e1e] text-gray-200">
      {/* File Explorer Sidebar */}
      <div className="w-56 border-r border-white/10 p-2 bg-[#181818] shrink-0 select-none text-xs">
        <div className="px-2 py-1 font-sans text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Folder className="w-3.5 h-3.5 text-amber-400" />
          <span>Explorer</span>
        </div>

        <div className="mt-2 space-y-0.5">
          <div className="px-2 py-1 text-gray-400 flex items-center gap-1 font-semibold text-[11px]">
            <ChevronDown className="w-3.5 h-3.5" />
            <span>src/data</span>
          </div>

          {Object.values(CODE_FILES).map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFile(f.name)}
              className={`w-full pl-6 pr-2 py-1.5 rounded flex items-center gap-2 text-left transition-colors ${
                activeFile === f.name
                  ? "bg-amber-500/20 text-amber-300 font-medium"
                  : "hover:bg-white/5 text-gray-400 hover:text-gray-200"
              }`}
            >
              {f.name.endsWith(".ts") ? (
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span className="truncate">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Header */}
        <div className="h-9 border-b border-white/10 bg-[#181818] flex items-center justify-between px-3 select-none">
          <div className="flex items-center gap-2 text-xs font-sans text-amber-300 bg-[#1e1e1e] px-3 py-1.5 border-t-2 border-amber-400">
            {file.name.endsWith(".ts") ? (
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>{file.name}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-sans text-gray-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="flex-1 p-4 overflow-auto text-xs leading-5">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="w-10 pr-4 text-right text-gray-600 select-none font-mono">
                    {idx + 1}
                  </td>
                  <td className="font-mono whitespace-pre text-gray-200">
                    {line}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
