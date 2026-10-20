export const Slider = ({
  value = 50,
  min = 0,
  max = 100,
  onChange,
  iconLeft = null,
  iconRight = null,
  className = "",
  ariaLabel = "Slider",
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={`flex items-center gap-3 bg-[#424246] dark:bg-[#48484e] px-4 py-2.5 rounded-full ${className}`}>
      {iconLeft && <div className="text-white/80 flex-shrink-0">{iconLeft}</div>}
      <div className="relative flex-1 flex items-center h-5">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
          aria-label={ariaLabel}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {/* Track Background */}
        <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
          {/* Active Fill */}
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {/* Slider Knob */}
        <div
          className="absolute w-4 h-4 bg-white rounded-full shadow pointer-events-none transition-all duration-75 -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        />
      </div>
      {iconRight && <div className="text-white/80 flex-shrink-0">{iconRight}</div>}
    </div>
  );
};
