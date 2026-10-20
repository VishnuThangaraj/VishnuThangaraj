import { GlassSurface } from "./GlassSurface";

export const GlassPanel = ({
  children,
  className = "",
  isFocused = true,
  ...props
}) => {
  // Performance rule 2: Inactive windows drop to cheaper material (T0 or subtle)
  const tier = isFocused ? undefined : "t0";

  return (
    <GlassSurface
      tier={tier}
      className={`overflow-hidden transition-shadow duration-200 ${
        isFocused ? "shadow-2xl" : "shadow-md opacity-95"
      } ${className}`}
      {...props}
    >
      {children}
    </GlassSurface>
  );
};
