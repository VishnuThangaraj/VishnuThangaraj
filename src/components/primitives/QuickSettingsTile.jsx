import { ChevronRight } from "lucide-react";

export const QuickSettingsTile = ({
  icon,
  title,
  subtitle = null,
  active = false,
  onClick,
  onSubmenuClick = null,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center h-12 rounded-xl transition-all select-none overflow-hidden ${
        active
          ? "bg-[var(--accent)] text-white shadow-sm"
          : "bg-[#54545a] hover:bg-[#62626a] text-white/90"
      } ${className}`}
      style={{ width: "180px", height: "48px" }}
    >
      {/* Main tile action */}
      <button
        onClick={onClick}
        className="flex-1 flex items-center gap-3 px-3.5 h-full text-left overflow-hidden focus:outline-none"
      >
        <div className="flex-shrink-0 text-white">{icon}</div>
        <div className="truncate min-w-0">
          <div className="text-xs font-semibold leading-tight truncate">{title}</div>
          {subtitle && (
            <div className="text-[10px] text-white/70 leading-tight truncate">{subtitle}</div>
          )}
        </div>
      </button>

      {/* Submenu arrow segment if tile has a nested menu */}
      {onSubmenuClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSubmenuClick();
          }}
          className="w-8 h-full flex items-center justify-center border-l border-white/10 hover:bg-white/10 transition-colors focus:outline-none"
          title={`${title} settings`}
          aria-label={`${title} settings`}
        >
          <ChevronRight className="w-3.5 h-3.5 text-white/80" />
        </button>
      )}
    </div>
  );
};
