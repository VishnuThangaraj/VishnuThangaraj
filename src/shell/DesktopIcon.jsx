import { useState } from "react";
import { FolderIcon } from "../components/icons/GnomeIcons";
import { AppIcon } from "../components/AppIcon";

export const DesktopIcon = ({
  icon,
  label,
  color = "#5294e2",
  isShortcut = false,
  isFolder = true,
  emblem = null,
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
      className={`group relative flex flex-col items-center justify-start w-[88px] min-h-[104px] p-2 rounded-xl cursor-pointer transition-colors duration-150 outline-none select-none ${
        isSelected
          ? "bg-[var(--accent)]/35 ring-1 ring-[var(--accent)] text-white shadow-md"
          : "hover:bg-white/10 text-white/95"
      }`}
    >
      {/* Icon Area */}
      <div className="w-14 h-14 flex items-center justify-center">
        {isFolder ? (
          <FolderIcon size={56} emblem={isShortcut ? "shortcut" : emblem} />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 shadow">
            <AppIcon name={icon} className="w-8 h-8" style={{ color }} />
          </div>
        )}
      </div>

      {/* Label: 2-line wrapped & ellipsized with subtle text drop-shadow (R1) */}
      <span
        className="mt-1 text-center text-xs font-normal text-white leading-tight line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] px-1"
        title={label}
      >
        {label}
      </span>
    </div>
  );
};
