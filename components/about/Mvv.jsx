import { HiOutlineSparkles, HiOutlineEye, HiOutlineHeart } from "react-icons/hi";
import FadeUp from "@/components/ui/FadeUp";

const PILLARS = [
  {
    icon: HiOutlineSparkles,
    title: "Our Mission",
    text: "Our mission is to make After Sunrise Café a household name synonymous with joy, peace, and relaxation. We want to be part of your happiest moments, your much-needed breaks, and your quiet moments of solitude. Whether it’s you, your Bible, and After Sunrise, a movie night, or simply a moment to unwind, we want to make those moments a little more special. Think After Sunrise Café. Think comfort. Think peace. Think joy.",
  },
  {
    icon: HiOutlineEye,
    title: "Our Vision",
    text: "To become a world-leading café brand at the intersection of human connection, emotion, and technology. We envision a globally recognised brand with a presence across Africa and beyond, leveraging technology to make After Sunrise accessible to anyone, anywhere, regardless of geographical boundaries. Our goal is to make After Sunrise Café a household name, deeply woven into people’s everyday lives and experiences. Connecting people through technology, one experience at a time.",
  },
  {
    icon: HiOutlineHeart,
    title: "Our Values",
    text: "The intentionality of God.",
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