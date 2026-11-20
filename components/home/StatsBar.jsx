import FadeUp from "@/components/ui/FadeUp";

const STATS = [
  { value: "10,000+", label: "Pastries Baked" },
  { value: "500+", label: "Happy Customers" },
  { value: "25+", label: "Menu Items" },
  { value: "8 yrs", label: "Of Baking" },
];

export default function StatsBar() {
  return (
    <section className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08}>
            <div className="font-display text-3xl sm:text-4xl font-bold">
              {s.value}
            </div>
            <div className="text-sm text-white/80 mt-1">{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}