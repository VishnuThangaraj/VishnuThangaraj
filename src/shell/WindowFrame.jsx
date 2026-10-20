import { AppIcon } from "../components/AppIcon";
import { useWindowDrag } from "./useWindowDrag";
import { useWindowStore } from "../store/windowStore";
import { useSettingsStore } from "../store/settingsStore";
import { Minus, Square, X, RotateCcw } from "lucide-react";

export const WindowFrame = ({ window, children }) => {
  const { id, title, icon, bounds, isMaximized, isMinimized, focused, zIndex } = window;

  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const updateBounds = useWindowStore((s) => s.updateBounds);
  const snapWindow = useWindowStore((s) => s.snapWindow);

  const theme = useSettingsStore((s) => s.theme);
  const tier = useSettingsStore((s) => s.tier);
  const isLight = theme === "light";

  const { isDragging, snapGhost, titleDragProps, getResizeProps } =
    useWindowDrag({
      windowId: id,
      bounds,
      isMaximized,
      onUpdateBounds: updateBounds,
      onSnap: (winId, pos) => {
        if (pos === "maximize") maximizeWindow(winId);
        else snapWindow(winId, pos);
      },
      onFocus: () => focusWindow(id),
    });

  if (isMinimized) return null;

  // Material selection: focused window gets glass; inactive drops to cheaper material
  const isGlass = tier !== "t0" && theme !== "high-contrast" && focused;

  return (
    <>
      {/* Snap Ghost Preview Overlay */}
      {snapGhost && (
        <div
          className={`fixed z-[990] rounded-2xl border-2 border-amber-400/80 bg-amber-400/20 backdrop-blur-sm transition-all duration-150 pointer-events-none animate-pulse`}
          style={{
            top: 32,
            bottom: 72,
            left: snapGhost === "right" ? "50%" : 8,
            right: snapGhost === "left" ? "50%" : 8,
          }}
        />
      )}

      {/* Main Window Container */}
      <div
        id={`window-${id}`}
        role="dialog"
        aria-label={title}
        tabIndex={-1}
        onPointerDown={() => focusWindow(id)}
        className={`fixed flex flex-col rounded-2xl overflow-hidden transition-shadow duration-200 select-none ${
          focused
            ? "shadow-2xl ring-1 ring-white/20"
            : "shadow-md opacity-95 ring-1 ring-white/10"
        } ${isDragging ? "opacity-90 transition-none" : ""}`}
        style={{
          left: bounds.x,
          top: bounds.y,
          width: bounds.width,
          height: bounds.height,
          zIndex,
          transformOrigin: "bottom center",
          background: isLight ? "#fbfbfe" : "#18181b",
          border: isLight
            ? "1px solid rgba(0, 0, 0, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Window Title Bar */}
        <div
          {...titleDragProps}
          onDoubleClick={() => maximizeWindow(id)}
          className={`h-10 px-3 flex items-center justify-between cursor-grab active:cursor-grabbing border-b select-none transition-colors duration-150 ${
            isGlass
              ? isLight
                ? "bg-white/80 backdrop-blur-xl border-black/10 text-gray-900"
                : "bg-[#202024]/85 backdrop-blur-xl border-white/10 text-white"
              : isLight
              ? "bg-[#eaeaea] border-black/10 text-gray-900"
              : "bg-[#222226] border-white/10 text-white"
          }`}
          style={{
            boxShadow: isGlass
              ? "inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              : undefined,
          }}
        >
          {/* Traffic Light Controls */}
          <div className="flex items-center gap-2 group/dots">
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#ef5350] hover:bg-[#c62828] active:scale-90 flex items-center justify-center text-black/70 transition-transform"
              title="Close (Ctrl+W)"
              aria-label="Close window"
            >
              <X className="w-2.5 h-2.5 opacity-0 group-hover/dots:opacity-100 transition-opacity" />
            </button>

            {/* Minimize */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#ffa726] hover:bg-[#e65100] active:scale-90 flex items-center justify-center text-black/70 transition-transform"
              title="Minimize (Ctrl+M)"
              aria-label="Minimize window"
            >
              <Minus className="w-2.5 h-2.5 opacity-0 group-hover/dots:opacity-100 transition-opacity" />
            </button>

            {/* Maximize / Restore */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(id);
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#66bb6a] hover:bg-[#2e7d32] active:scale-90 flex items-center justify-center text-black/70 transition-transform"
              title={isMaximized ? "Restore window" : "Maximize window"}
              aria-label={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? (
                <RotateCcw className="w-2 h-2 opacity-0 group-hover/dots:opacity-100 transition-opacity" />
              ) : (
                <Square className="w-2 h-2 opacity-0 group-hover/dots:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Title and Icon */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide truncate max-w-[60%] pointer-events-none">
            <AppIcon name={icon} className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{title}</span>
          </div>

          {/* Right Spacer for balance */}
          <div className="w-12" />
        </div>

        {/* Window Content Area */}
        <div
          className={`flex-1 overflow-auto text-sm ${
            isLight ? "bg-[#fbfbfe] text-gray-900" : "bg-[#18181b] text-gray-100"
          }`}
        >
          {children}
        </div>

        {/* ── 8-way Resize Handles ── */}
        {!isMaximized && (
          <>
            <div
              {...getResizeProps("n")}
              className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize z-20"
            />
            <div
              {...getResizeProps("s")}
              className="absolute bottom-0 left-2 right-2 h-1.5 cursor-ns-resize z-20"
            />
            <div
              {...getResizeProps("w")}
              className="absolute left-0 top-2 bottom-2 w-1.5 cursor-ew-resize z-20"
            />
            <div
              {...getResizeProps("e")}
              className="absolute right-0 top-2 bottom-2 w-1.5 cursor-ew-resize z-20"
            />
            <div
              {...getResizeProps("nw")}
              className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-20"
            />
            <div
              {...getResizeProps("ne")}
              className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-20"
            />
            <div
              {...getResizeProps("sw")}
              className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-20"
            />
            <div
              {...getResizeProps("se")}
              className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-20"
            />
          </>
        )}
      </div>
    </>
  );
};
