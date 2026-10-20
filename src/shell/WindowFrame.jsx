import { AppIcon } from "../components/AppIcon";
import { WindowControlButtons } from "../components/icons/GnomeIcons";
import { useWindowDrag } from "./useWindowDrag";
import { useWindowStore } from "../store/windowStore";
import { useSettingsStore } from "../store/settingsStore";

export const WindowFrame = ({ window: win, children }) => {
  const { id, title, icon, bounds, isMaximized, isMinimized, focused, zIndex } = win;

  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const updateBounds = useWindowStore((s) => s.updateBounds);
  const snapWindow = useWindowStore((s) => s.snapWindow);

  const theme = useSettingsStore((s) => s.theme);
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

  return (
    <>
      {/* Snap Ghost Preview Overlay (GNOME style subtle accent tint) */}
      {snapGhost && (
        <div
          className="fixed z-[990] rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/15 backdrop-blur-sm transition-all duration-150 pointer-events-none"
          style={{
            top: 32,
            bottom: 88,
            left: snapGhost === "right" ? "50%" : 8,
            right: snapGhost === "left" ? "50%" : 8,
          }}
        />
      )}

      {/* Main Window Container (Adwaita Window Frame R5) */}
      <div
        id={`window-${id}`}
        role="dialog"
        aria-label={title}
        tabIndex={-1}
        onPointerDown={() => focusWindow(id)}
        className={`fixed flex flex-col rounded-xl overflow-hidden select-none transition-shadow duration-150 ${
          focused
            ? "shadow-2xl ring-1 ring-white/10"
            : "shadow-md opacity-95 ring-1 ring-white/5"
        } ${isDragging ? "opacity-90 transition-none" : ""}`}
        style={{
          left: bounds.x,
          top: bounds.y,
          width: bounds.width,
          height: bounds.height,
          zIndex,
          borderRadius: isMaximized ? 0 : "12px",
          backgroundColor: "var(--window-content-bg)",
          color: "var(--window-text)",
          border: isMaximized
            ? "none"
            : isLight
            ? "1px solid rgba(0, 0, 0, 0.12)"
            : "1px solid rgba(255, 255, 255, 0.10)",
        }}
      >
        {/* Integrated Adwaita Header Bar (R5) */}
        <div
          {...titleDragProps}
          onDoubleClick={() => maximizeWindow(id)}
          className="h-[47px] px-4 flex items-center justify-between cursor-grab active:cursor-grabbing border-b select-none transition-colors duration-150"
          style={{
            backgroundColor: "var(--window-header-bg)",
            borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
          }}
        >
          {/* Left: Window Icon and Title */}
          <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wide truncate max-w-[70%] pointer-events-none">
            <AppIcon name={icon} className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="truncate">{title}</span>
          </div>

          {/* Right: Circular Window Controls (Minimize, Maximize, Close - R5) */}
          <div className="flex items-center gap-2">
            <WindowControlButtons
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => maximizeWindow(id)}
              onClose={() => closeWindow(id)}
              isMaximized={isMaximized}
            />
          </div>
        </div>

        {/* Window Content Area */}
        <div className="flex-1 overflow-auto text-sm">
          {children}
        </div>

        {/* ── 8-way Invisible Resize Handles ── */}
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
