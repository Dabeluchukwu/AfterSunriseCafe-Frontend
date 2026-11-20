const tones = {
  red: "bg-secondary-50 text-secondary border-secondary-100",
  pink: "bg-accent-50 text-accent-500 border-accent-100",
  gray: "bg-gray-50 text-ink-soft border-gray-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default function Badge({ children, tone = "gray", className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}