export default function StatCard({ icon: Icon, label, value, tone = "red" }) {
  const tones = {
    red: "bg-secondary-50 text-secondary",
    pink: "bg-accent-50 text-accent-500",
    ink: "bg-gray-100 text-ink",
  };
  return (
    <div className="bg-white rounded-card border border-gray-100 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${tones[tone]}`}>
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <div className="text-sm text-ink-muted">{label}</div>
        <div className="font-display text-2xl font-bold text-ink">{value}</div>
      </div>
    </div>
  );
}