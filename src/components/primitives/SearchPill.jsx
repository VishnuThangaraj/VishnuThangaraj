import { Search, X } from "lucide-react";

export const SearchPill = ({
  value = "",
  onChange,
  onClear,
  placeholder = "Type to search",
  className = "",
  autoFocus = false,
}) => {
  return (
    <div
      className={`relative flex items-center bg-[#3e4238] border border-white/10 rounded-full px-4 h-9 shadow-inner transition-all duration-150 focus-within:ring-2 focus-within:ring-[var(--accent)] ${className}`}
      style={{ width: "370px", height: "36px" }}
    >
      <Search className="w-4 h-4 text-white/60 mr-2 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-transparent text-sm text-white placeholder-white/50 focus:outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="text-white/60 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors ml-1"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
