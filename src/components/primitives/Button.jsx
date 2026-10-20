export const Button = ({
  children,
  variant = "flat", // 'flat' | 'suggested' | 'destructive' | 'pill'
  size = "md", // 'sm' | 'md' | 'lg'
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-150 select-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs rounded-md",
    md: "px-3.5 py-1.5 text-sm rounded-lg",
    lg: "px-5 py-2.5 text-base rounded-xl",
  };

  const variantStyles = {
    flat: "bg-white/10 hover:bg-white/15 active:bg-white/20 text-white dark:text-white dark:bg-[#3d3d40] dark:hover:bg-[#4d4d52]",
    suggested: "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-sm",
    destructive: "bg-[#e03131] hover:bg-[#c92a2a] text-white",
    pill: "bg-white/10 hover:bg-white/15 text-white rounded-full px-4 py-1.5 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
