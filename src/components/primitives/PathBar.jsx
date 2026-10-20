import { Home, MoreVertical } from "lucide-react";

export const PathBar = ({ path = "Home", onSelect, className = "" }) => {
  const parts = path.split("/").filter(Boolean);

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-[#333336] dark:bg-[#38383c] border border-white/10 rounded-full px-3 py-1 text-xs text-white shadow-sm ${className}`}
    >
      <button
        onClick={() => onSelect && onSelect("Home")}
        className="flex items-center gap-1 hover:text-white/80 transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5 text-blue-400" />
        <span>Home</span>
      </button>

      {parts.length > 1 && (
        <>
          <span className="text-white/40">/</span>
          <span className="font-semibold text-white truncate max-w-[120px]">
            {parts[parts.length - 1]}
          </span>
        </>
      )}

      <button
        className="p-0.5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors ml-0.5"
        title="Path options"
        aria-label="Path options"
      >
        <MoreVertical className="w-3 h-3" />
      </button>
    </div>
  );
};
