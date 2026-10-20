import { useState } from "react";
import { useSettingsStore } from "../store/settingsStore";
import { ACCENTS } from "../theme/tokens";
import {
  Sun,
  Moon,
  Eye,
  Info,
  Palette,
  Layout,
} from "lucide-react";

export const SettingsApp = () => {
  const [activeTab, setActiveTab] = useState("appearance");

  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const accent = useSettingsStore((s) => s.accent);
  const setAccent = useSettingsStore((s) => s.setAccent);

  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const setReducedMotion = useSettingsStore((s) => s.setReducedMotion);

  const nightLight = useSettingsStore((s) => s.nightLight);
  const setNightLight = useSettingsStore((s) => s.setNightLight);

  return (
    <div className="flex h-full select-none bg-[#1d1d20] text-white overflow-hidden">
      {/* ── Left Settings Navigation ── */}
      <div className="w-48 bg-[#29292d] p-3 border-r border-white/10 flex flex-col gap-1 text-xs">
        <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
          Settings
        </div>
        <button
          onClick={() => setActiveTab("appearance")}
          className={`w-full px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
            activeTab === "appearance"
              ? "bg-[var(--accent)] text-white font-medium"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Appearance</span>
        </button>
        <button
          onClick={() => setActiveTab("dock")}
          className={`w-full px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
            activeTab === "dock"
              ? "bg-[var(--accent)] text-white font-medium"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Dock & Shell</span>
        </button>
        <button
          onClick={() => setActiveTab("accessibility")}
          className={`w-full px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
            activeTab === "accessibility"
              ? "bg-[var(--accent)] text-white font-medium"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Accessibility</span>
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`w-full px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
            activeTab === "about"
              ? "bg-[var(--accent)] text-white font-medium"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>About VishnuOS</span>
        </button>
      </div>

      {/* ── Right Settings Content Panel ── */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {activeTab === "appearance" && (
          <>
            <div>
              <h2 className="text-lg font-bold">Appearance</h2>
              <p className="text-xs text-white/60">Manage color style, shell themes and accents.</p>
            </div>

            {/* Dark / Light Style */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-semibold text-white/70">Style Mode</label>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    theme === "dark"
                      ? "bg-[var(--accent)]/20 border-[var(--accent)] text-white shadow"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Moon className="w-5 h-5 text-[var(--accent)]" />
                  <span className="text-xs font-semibold">Dark (Default)</span>
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    theme === "light"
                      ? "bg-[var(--accent)]/20 border-[var(--accent)] text-white shadow"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold">Light</span>
                </button>
                <button
                  onClick={() => setTheme("high-contrast")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    theme === "high-contrast"
                      ? "bg-[var(--accent)]/20 border-[var(--accent)] text-white shadow"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-semibold">High Contrast</span>
                </button>
              </div>
            </div>

            {/* Accent Color Palette */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-semibold text-white/70">
                Accent Color (Canonical: GNOME Olive Green)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {Object.values(ACCENTS).map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setAccent(acc.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                      accent === acc.id
                        ? "bg-white/20 border-white text-white shadow-md ring-1 ring-white/30"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-inner"
                      style={{ backgroundColor: acc.primary }}
                    />
                    <span>{acc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Night Light Toggle */}
            <div className="flex items-center justify-between p-4 bg-[#29292d] rounded-2xl border border-white/5 max-w-lg">
              <div>
                <div className="text-sm font-semibold">Night Light</div>
                <div className="text-xs text-white/60">Tints the screen warmer for reduced eye fatigue.</div>
              </div>
              <button
                onClick={() => setNightLight(!nightLight)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  nightLight ? "bg-[var(--accent)] text-white" : "bg-white/10 text-white/70"
                }`}
              >
                {nightLight ? "Enabled" : "Disabled"}
              </button>
            </div>
          </>
        )}

        {activeTab === "dock" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold">Dock & Shell</h2>
              <p className="text-xs text-white/60">Floating dock geometry and top-bar appearance.</p>
            </div>

            <div className="p-4 bg-[#29292d] rounded-2xl border border-white/5 space-y-3 max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Dock Layout</div>
                  <div className="text-xs text-white/60">Floating bottom-centered dock (839×84 px).</div>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                  Fixed
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div>
                  <div className="text-sm font-semibold">Dock Magnification</div>
                  <div className="text-xs text-white/60">Disabled per canonical GNOME desktop specifications.</div>
                </div>
                <span className="text-xs text-white/50">Disabled</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "accessibility" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold">Accessibility</h2>
              <p className="text-xs text-white/60">Motion and contrast enhancements.</p>
            </div>

            <div className="p-4 bg-[#29292d] rounded-2xl border border-white/5 space-y-4 max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Reduced Motion</div>
                  <div className="text-xs text-white/60">Disables animations and transitions.</div>
                </div>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    reducedMotion ? "bg-[var(--accent)] text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  {reducedMotion ? "On" : "Off"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-4 max-w-lg">
            <div>
              <h2 className="text-lg font-bold">About VishnuOS</h2>
              <p className="text-xs text-white/60">System information, simulation disclosure and licenses.</p>
            </div>

            <div className="p-4 bg-[#29292d] rounded-2xl border border-white/5 space-y-2 text-xs leading-relaxed">
              <div className="text-sm font-bold text-white mb-1">VishnuOS v3.0</div>
              <p className="text-white/80">
                A faithful GNOME / Ubuntu inspired interactive portfolio designed and developed by{" "}
                <span className="font-semibold text-white">Vishnu Thangaraj</span>.
              </p>
              <div className="pt-2 border-t border-white/10 text-white/70 space-y-1">
                <div>• Architecture: React 19 + Tailwind CSS + Zustand</div>
                <div>• Typeface: Ubuntu Font Family (Ubuntu Font Licence v1.0)</div>
                <div>• Icons: Custom SVG Yaru-style symbolic icons</div>
              </div>
            </div>

            {/* Honest Simulation Disclosure (§5.6) */}
            <div className="p-4 bg-[#29292d] rounded-2xl border border-white/5 text-xs space-y-1.5">
              <div className="font-semibold text-white/90">System Simulation Disclosures:</div>
              <p className="text-white/70">
                - Wi-Fi, Dark Style, and Caffeine (Wake Lock) utilize real browser APIs.
              </p>
              <p className="text-white/70">
                - Bluetooth and Airplane mode are aesthetic toggles without physical hardware modification.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
