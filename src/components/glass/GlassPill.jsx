import { GlassSurface } from "./GlassSurface";

export const GlassPill = ({
  children,
  className = "",
  interactive = true,
  ...props
}) => {
  return (
    <GlassSurface
      className={`rounded-full px-3 py-1 flex items-center gap-2 ${className}`}
      interactive={interactive}
      {...props}
    >
      {children}
    </GlassSurface>
  );
};
