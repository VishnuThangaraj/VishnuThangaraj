import { useSettingsStore } from "../store/settingsStore";
import { wallpapers } from "../data/wallpapers";
import { ACCENTS, GLASS_TIERS } from "../theme/tokens";
import {
  Settings,
  Sun,
  Moon,
  Sparkles,
  Image,
  Eye,
  RotateCcw,
  Info,
} from "lucide-react";

export const SettingsApp = () => {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const accent = useSettingsStore((s) => s.accent);
  const setAccent = useSettingsStore((s) => s.setAccent);

  const tier = useSettingsStore((s) => s.tier);
  const setTier = useSettingsStore((s) => s.setTier);

  const wallpaper = useSettingsStore((s) => s.wallpaper);
  const setWallpaper = useSettingsStore((s) => s.setWallpaper);

  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const setReducedMotion = useSettingsStore((s) => s.setReducedMotion);

  const reduceTransparency = useSettingsStore((s) => s.reduceTransparency);
  const setReduceTransparency = useSettingsStore((s) => s.setReduceTransparency);

  const resetSettings = useSettingsStore((s) => s.resetSettings);

  return (
    <div className="flex flex-col h-full min-h-[460px] p-6 overflow-y-auto select-none space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <span>System Settings</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Customize material rendering, themes, accents, and accessibility preferences.
          </p>
        </div>

        <button
          onClick={resetSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors border border-white/10"
          title="Reset to Defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* ── 1. Appearance & Theme ── */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
          <Moon className="w-4 h-4 text-amber-400" />
          <span>Appearance & Color Theme</span>
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "dark", label: "Dark (Default)", icon: Moon },
            { id: "light", label: "Light", icon: Sun },
            { id: "high-contrast", label: "High Contrast (WCAG AAA)", icon: Eye },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTheme(item.id)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                theme === item.id
                  ? "bg-amber-500/20 border-amber-400 text-white shadow-lg"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. Accent Color Palette (Default: Warm Amber per D6) ── */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
          Accent Color (Default: Warm Amber)
        </h2>
        <div className="flex flex-wrap gap-3">
          {Object.values(ACCENTS).map((acc) => (
            <button
              key={acc.id}
              onClick={() => setAccent(acc.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                accent === acc.id
                  ? "border-white bg-white/20 text-white shadow-md scale-105"
                  : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full shadow-sm"
                style={{ backgroundColor: acc.primary }}
              />
              <span className="text-xs font-medium">{acc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. Liquid Glass Material Tier (Section 4.2) ── */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Liquid Glass Material Engine</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.values(GLASS_TIERS).map((t) => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                tier === t.id
                  ? "bg-amber-500/20 border-amber-400 text-white shadow-lg"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <div className="text-xs font-bold text-amber-300">{t.name}</div>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                {t.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Wallpaper Selection ── */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
          <Image className="w-4 h-4 text-emerald-400" />
          <span>Desktop Wallpaper</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.id)}
              className={`group flex flex-col rounded-xl overflow-hidden border transition-all ${
                wallpaper === wp.id
                  ? "border-amber-400 ring-2 ring-amber-400/50 scale-105 shadow-xl"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div
                className="h-16 w-full"
                style={{
                  background: wp.background,
                  backgroundImage: wp.layers,
                }}
              />
              <div className="p-2 text-center text-xs font-medium text-white bg-black/60 backdrop-blur-sm truncate">
                {wp.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. Accessibility & Motion Toggles ── */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-blue-400" />
          <span>Accessibility & Effects</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Reduce Motion */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Reduce Motion</div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                Disable dock magnification, spring physics, and bounce animations
              </div>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          {/* Reduce Transparency */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Reduce Transparency</div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                Switch to solid opaque surfaces (forces Material Tier T0)
              </div>
            </div>
            <input
              type="checkbox"
              checked={reduceTransparency}
              onChange={(e) => setReduceTransparency(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ── 6. System Info Card ── */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0" />
        <div className="text-xs text-gray-300 space-y-0.5">
          <div className="font-bold text-white">VishnuOS v2.0 (Tahoe Liquid Edition)</div>
          <div className="font-mono text-[11px] text-gray-400">
            Engineered with React 19 • Tailwind CSS • Vite • Vitest • Zero External Tracking
          </div>
        </div>
      </div>
    </div>
  );
};
