import { profile } from "../data/profile";
import { Printer, FileText } from "lucide-react";

export const ResumeApp = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] select-text bg-[#232326]">
      {/* Action Toolbar */}
      <div className="h-11 px-4 border-b border-white/10 bg-black/30 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Vishnu_Thangaraj_Resume.pdf</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Document Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-2xl bg-white text-gray-900 rounded-xl shadow-2xl p-8 space-y-6 print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b border-gray-300 pb-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
              {profile.identity.name}
            </h1>
            <p className="text-sm font-semibold text-amber-700 mt-1">
              {profile.identity.title}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 mt-2 font-mono">
              <span>{profile.identity.location}</span>
              <span>•</span>
              <span>{profile.identity.github}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              {profile.identity.summary}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Work Experience
            </h2>
            <div className="space-y-3">
              {profile.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                    <span>
                      {exp.role} — <span className="text-amber-800">{exp.company}</span>
                    </span>
                    <span className="font-mono text-gray-600 text-[11px]">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs text-gray-700">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Key Projects
            </h2>
            <div className="space-y-3">
              {profile.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                    <span>{proj.name} ({proj.tagline})</span>
                    <span className="font-mono text-amber-800 text-[11px]">{proj.repo}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Technical Stack
            </h2>
            <div className="text-xs text-gray-700 space-y-1">
              {Object.entries(profile.skills).map(([category, items]) => (
                <div key={category}>
                  <span className="font-semibold text-gray-900">{category}: </span>
                  <span>{items.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Education & Honors
            </h2>
            <div className="space-y-2 text-xs text-gray-700">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    <strong>{edu.degree}</strong> ({edu.institution})
                  </span>
                  <span className="font-mono font-semibold">
                    CGPA: {edu.cgpa} ({edu.period})
                  </span>
                </div>
              ))}
              <div className="pt-1 text-gray-600">
                <strong>Honors: </strong>
                {profile.honors.map((h) => h.title).join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
