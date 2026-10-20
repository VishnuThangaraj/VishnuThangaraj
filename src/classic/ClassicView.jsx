import { profile } from "../data/profile";
import { useSettingsStore } from "../store/settingsStore";
import {
  Laptop,
  Briefcase,
  Globe,
  Code,
  GraduationCap,
  Award,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "../components/AppIcon";

export const ClassicView = () => {
  const setMode = useSettingsStore((s) => s.setMode);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 font-sans selection:bg-amber-500/30 selection:text-white">
      {/* Skip Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-black focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* ── Sticky Top Navigation ── */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base text-white tracking-tight">
            {profile.identity.name}
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Portfolio
          </span>
        </div>

        <nav aria-label="Page navigation" className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-300">
          <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-amber-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-amber-400 transition-colors">Skills</a>
          <a href="#education" className="hover:text-amber-400 transition-colors">Education</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
        </nav>

        <button
          onClick={() => setMode("desktop")}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors shadow-md shadow-amber-500/20"
          title="Switch to Interactive Desktop OS Mode"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Launch Desktop OS</span>
        </button>
      </header>

      {/* ── Main Linear Content ── */}
      <main id="main-content" className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* 1. Hero / About Section */}
        <section id="about" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.identity.name}
              </h1>
              <p className="text-lg text-amber-400 font-semibold mt-1">
                {profile.identity.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {profile.identity.location}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Available for Opportunities</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={profile.identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-blue-400 border border-white/10 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.identity.email || "vishnu.thangaraj.dev@gmail.com"}`}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-colors shadow-md"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <p className="text-base text-gray-300 leading-relaxed">
            {profile.identity.summary}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl font-bold text-amber-400">9.5</div>
              <div className="text-xs text-gray-400 mt-0.5">MSc Data Science CGPA</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl font-bold text-emerald-400">2+</div>
              <div className="text-xs text-gray-400 mt-0.5">Industry Roles</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-blue-400">Full Stack</div>
              <div className="text-xs text-gray-400 mt-0.5">MERN • DevOps • AI/ML</div>
            </div>
          </div>
        </section>

        {/* 2. Work Experience */}
        <section id="experience" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-semibold text-amber-300">{exp.company}</div>
                  </div>
                  <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {exp.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-emerald-400/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{proj.name}</h3>
                    <a
                      href={proj.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400">{proj.tagline}</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{proj.description}</p>

                  <div className="pt-2 space-y-1.5">
                    {proj.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Technical Skills */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Code className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(profile.skills).map(([cat, items]) => (
              <div key={cat} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Education & Honors */}
        <section id="education" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Education & Honors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-sm font-bold text-white">{edu.degree}</div>
                <div className="text-xs text-gray-400">{edu.institution}</div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    CGPA: {edu.cgpa}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Honors & Certifications</span>
            </div>
            <div className="space-y-1.5 text-xs text-gray-300">
              {profile.honors.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="font-semibold text-white">{h.title}</span>
                  <span className="text-gray-400">— {h.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Contact */}
        <section id="contact" className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-black/40 to-black/60 border border-amber-500/30 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            Available for software engineering, DevOps, and machine learning opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={`mailto:${profile.identity.email || "vishnu.thangaraj.dev@gmail.com"}`}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
            <a
              href={profile.identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-2 transition-colors border border-white/10"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-blue-400 font-medium text-xs flex items-center gap-2 transition-colors border border-white/10"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
        © 2026 Vishnu Thangaraj • Built with VishnuOS Desktop Shell Architecture
      </footer>
    </div>
  );
};
