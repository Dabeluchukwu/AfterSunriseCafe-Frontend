import { HiOutlineSparkles, HiOutlineEye, HiOutlineHeart } from "react-icons/hi";
import FadeUp from "@/components/ui/FadeUp";

const PILLARS = [
  {
    icon: HiOutlineSparkles,
    title: "Our Mission",
    text: "To bring the joy of fresh, honest baking to every home and table in Lagos — one loaf, one cake, one pastry at a time.",
  },
  {
    icon: HiOutlineEye,
    title: "Our Vision",
    text: "To become the most trusted name in Lagos baking — known for consistency, craft, and the kind of flavour that makes you come back.",
  },
  {
    icon: HiOutlineHeart,
    title: "Our Values",
    text: "Integrity in our ingredients. Care in our craft. Warmth in every interaction. And always — fresh, never frozen.",
  },
];

export default function Mvv() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PILLARS.map((p, i) => {
        const Icon = p.icon;
        return (
          <FadeUp key={p.title} delay={i * 0.1}>
            <div className="bg-white rounded-card p-8 border border-gray-100 h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary-50 text-secondary mb-4">
                <Icon size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                {p.title}
              </h3>
              <p className="text-ink-soft">{p.text}</p>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}