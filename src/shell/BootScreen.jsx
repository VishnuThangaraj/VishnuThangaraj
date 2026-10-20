import { useState, useEffect } from "react";
import { useSettingsStore } from "../store/settingsStore";

export const BootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing VishnuOS kernel...");
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  useEffect(() => {
    // If reduced motion is requested or already booted this session, skip immediately
    const hasBooted =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("vishnu_os_booted") === "true";

    if (reducedMotion || hasBooted) {
      onComplete();
      return;
    }

    const steps = [
      { at: 200, pct: 25, msg: "Loading Liquid Glass material system..." },
      { at: 600, pct: 55, msg: "Mounting portfolio workspace..." },
      { at: 1100, pct: 85, msg: "Initializing window manager & dock..." },
      { at: 1600, pct: 100, msg: "Welcome to VishnuOS" },
    ];

    const timeouts = steps.map(({ at, pct, msg }) =>
      setTimeout(() => {
        setProgress(pct);
        setStatusText(msg);
      }, at)
    );

    const endTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimer);
    };
  }, [reducedMotion, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] bg-[#0a0f0d] flex flex-col items-center justify-center select-none cursor-pointer p-6"
      role="dialog"
      aria-label="Booting VishnuOS"
    >
      {/* OS Monogram Logo */}
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-[1px] shadow-2xl shadow-amber-500/20 mb-6 animate-pulse">
          <div className="w-full h-full rounded-[23px] bg-black/80 backdrop-blur-xl flex items-center justify-center">
            <span className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 font-mono">
              VO
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
          <span>VishnuOS</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
            v2.0
          </span>
        </h1>
        <p className="text-xs text-gray-400 font-mono mb-8">
          Full Stack Developer • DevOps • AI/ML
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-gray-400 font-mono h-4">{statusText}</p>

        <span className="absolute -bottom-16 text-[11px] text-gray-600 animate-pulse">
          Click or press any key to skip
        </span>
      </div>
    </div>
  );
};
