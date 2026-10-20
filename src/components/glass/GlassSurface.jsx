import { useSettingsStore } from "../../store/settingsStore";

/**
 * Tiered Liquid Glass surface:
 * T0: Solid (high contrast, zero blur, strong border)
 * T1: CSS Glass (backdrop blur, saturate, specular rim highlight, soft shadow)
 * T2: Lensing (T1 + SVG displacement refraction)
 */
export const GlassSurface = ({
  children,
  className = "",
  style = {},
  tier: propTier,
  interactive = false,
  role,
  tabIndex,
  onClick,
  onKeyDown,
  ...rest
}) => {
  const currentTier = useSettingsStore((s) => s.tier);
  const theme = useSettingsStore((s) => s.theme);
  const reduceTransparency = useSettingsStore((s) => s.reduceTransparency);

  const activeTier = propTier || (reduceTransparency ? "t0" : currentTier);
  const isLight = theme === "light";
  const isHighContrast = theme === "high-contrast";

  let tierClasses;
  let tierStyle = {};

  if (activeTier === "t0" || isHighContrast) {
    // T0: Solid
    tierClasses = isLight
      ? "bg-[#f5f5f7] border-2 border-black/30 shadow-md text-gray-900"
      : "bg-[#18181b] border-2 border-white/30 shadow-lg text-white";
  } else if (activeTier === "t2") {
    // T2: Liquid Glass Lensing
    tierClasses = isLight
      ? "bg-white/70 backdrop-blur-2xl backdrop-saturate-200 border border-white/60 shadow-xl text-gray-900"
      : "bg-black/50 backdrop-blur-2xl backdrop-saturate-200 border border-white/20 shadow-2xl text-white";
    tierStyle = {
      backdropFilter: "blur(24px) saturate(200%) brightness(110%)",
      WebkitBackdropFilter: "blur(24px) saturate(200%) brightness(110%)",
      boxShadow: isLight
        ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05), 0 16px 36px -8px rgba(0, 0, 0, 0.2)"
        : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.55)",
    };
  } else {
    // T1: Standard CSS Glass (Default)
    tierClasses = isLight
      ? "bg-white/65 backdrop-blur-xl backdrop-saturate-150 border border-white/50 shadow-lg text-gray-900"
      : "bg-[#1c1c1e]/75 backdrop-blur-xl backdrop-saturate-150 border border-white/15 shadow-xl text-white";
    tierStyle = {
      backdropFilter: "blur(18px) saturate(180%)",
      WebkitBackdropFilter: "blur(18px) saturate(180%)",
      boxShadow: isLight
        ? "inset 0 1px 0.5px rgba(255, 255, 255, 0.8), 0 12px 30px -6px rgba(0, 0, 0, 0.15)"
        : "inset 0 1px 0.5px rgba(255, 255, 255, 0.2), 0 16px 32px -6px rgba(0, 0, 0, 0.45)",
    };
  }

  const interactiveClasses = interactive
    ? "transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
    : "";

  return (
    <div
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`relative rounded-2xl ${tierClasses} ${interactiveClasses} ${className}`}
      style={{ ...tierStyle, ...style }}
      {...rest}
    >
      {/* Specular sheen gradient overlay */}
      {activeTier !== "t0" && !isHighContrast && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40 bg-gradient-to-b from-white/20 via-transparent to-black/10"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
