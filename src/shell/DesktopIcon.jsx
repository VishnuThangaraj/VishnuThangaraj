import { useState } from "react";
import { AppIcon } from "../components/AppIcon";
import { ArrowUpRight } from "lucide-react";

export const DesktopIcon = ({
  icon,
  label,
  color = "#42a5f5",
  isShortcut = false,
  isSelected = false,
  onSelect,
  onOpen,
  onContextMenu,
}) => {
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      onOpen();
    } else {
      onSelect();
      const t = setTimeout(() => setClickTimeout(null), 300);
      setClickTimeout(t);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onKeyDown={handleKeyDown}
      onContextMenu={onContextMenu}
      className={`group relative flex flex-col items-center justify-center w-24 h-24 p-2 rounded-xl cursor-pointer transition-all outline-none select-none ${
        isSelected
          ? "bg-white/20 ring-1 ring-white/40 shadow-lg backdrop-blur-sm"
          : "hover:bg-white/10"
      }`}
    >
      {/* Icon with Liquid Glass badge */}
      <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-black/30 border border-white/20 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-transform">
        <AppIcon name={icon} className="w-6 h-6" style={{ color }} />

        {/* Shortcut arrow badge */}
        {isShortcut && (
          <div
            className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-black/70 border border-white/40 flex items-center justify-center text-white"
            title="Shortcut"
          >
            <ArrowUpRight className="w-2.5 h-2.5 text-amber-300" />
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className="mt-1.5 text-center text-xs font-medium text-white tracking-wide truncate max-w-[84px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
        title={label}
      >
        {label}
      </span>
    </div>
  );
};
