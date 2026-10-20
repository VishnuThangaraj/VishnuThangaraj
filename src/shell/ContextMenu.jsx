import { useEffect } from "react";
import {
  ExternalLink,
  Terminal,
  Settings,
  Image,
  Layers,
  X,
  Minimize2,
  Copy,
  Info,
} from "lucide-react";
import { useWindowStore } from "../store/windowStore";
import { useSettingsStore } from "../store/settingsStore";

export const ContextMenu = ({ menu, onClose }) => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleActivities = useWindowStore((s) => s.toggleActivities);
  const windows = useWindowStore((s) => s.windows);
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!menu) return null;

  const { x, y, type, target } = menu;
  const isLight = theme === "light";

  // Prevent menu overflowing viewport
  const menuW = 200;
  const menuH = 180;
  const posX = Math.min(x, window.innerWidth - menuW - 10);
  const posY = Math.min(y, window.innerHeight - menuH - 10);

  const targetWindow = target
    ? windows.find((w) => w.appId === (target.appId || target.id))
    : null;

  return (
    <div
      className="fixed inset-0 z-[1200]"
      onClick={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div
        className={`absolute w-52 rounded-xl py-1.5 shadow-2xl border backdrop-blur-2xl text-xs z-50 animate-in fade-in zoom-in-95 duration-100 ${
          isLight
            ? "bg-white/90 border-gray-300 text-gray-900 shadow-black/20"
            : "bg-[#1f1f23]/90 border-white/20 text-white shadow-black/60"
        }`}
        style={{ left: posX, top: posY }}
        onClick={(e) => e.stopPropagation()}
        role="menu"
      >
        {type === "desktop" && (
          <>
            <div className="px-3 py-1 font-semibold opacity-50 uppercase text-[10px] tracking-wider">
              Desktop
            </div>
            <button
              onClick={() => {
                openWindow("settings");
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors"
            >
              <Image className="w-3.5 h-3.5 text-amber-400" />
              <span>Change Wallpaper...</span>
            </button>
            <button
              onClick={() => {
                openWindow("terminal");
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open in Terminal</span>
            </button>
            <button
              onClick={() => {
                toggleActivities();
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Show Applications</span>
            </button>
            <div className="my-1 border-t border-white/10" />
            <button
              onClick={() => {
                openWindow("settings");
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-gray-300" />
              <span>System Settings</span>
            </button>
            <button
              onClick={() => {
                openWindow("about");
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>About VishnuOS</span>
            </button>
          </>
        )}

        {type === "icon" && target && (
          <>
            <div className="px-3 py-1 font-semibold opacity-50 uppercase text-[10px] tracking-wider truncate">
              {target.label || target.name}
            </div>
            <button
              onClick={() => {
                openWindow(target.appId || target.id, target.params);
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors font-medium text-amber-400"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open</span>
            </button>
            <button
              onClick={() => {
                const url = `${window.location.origin}/#/${target.appId || target.id}`;
                navigator.clipboard?.writeText(url);
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-white/10 text-left transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-blue-400" />
              <span>Copy Link</span>
            </button>
          </>
        )}

        {type === "dock" && target && (
          <>
            <div className="px-3 py-1 font-semibold opacity-50 uppercase text-[10px] tracking-wider truncate">
              {target.name}
            </div>
            <button
              onClick={() => {
                openWindow(target.id);
                onClose();
              }}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-amber-500/20 text-left transition-colors font-medium text-amber-400"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{targetWindow ? "Bring to Front" : "Open"}</span>
            </button>
            {targetWindow && (
              <>
                <button
                  onClick={() => {
                    minimizeWindow(targetWindow.id);
                    onClose();
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-white/10 text-left transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Minimize</span>
                </button>
                <div className="my-1 border-t border-white/10" />
                <button
                  onClick={() => {
                    closeWindow(targetWindow.id);
                    onClose();
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-red-500/20 text-red-400 text-left transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Quit</span>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
