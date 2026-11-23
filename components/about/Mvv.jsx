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
    // Added relative and overflow-hidden to contain the blur blobs
    <div className="relative overflow-hidden py-10">
      
      {/* Decorative background blobs to make the glass effect visible */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-300/30 rounded-full blur-3xl -z-10" />

      <div className="grid gap-6 relative z-10">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <FadeUp key={p.title} delay={i * 0.1}>
              {/* Glassmorphic Card */}
              <div className="bg-white/60 backdrop-blur-lg rounded-card p-8 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col sm:flex-row gap-6 items-start transition-transform hover:-translate-y-1">
                
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary text-white shadow-md shrink-0">
                  <Icon size={26} />
                </div>
                
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">
                    {p.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{p.text}</p>
                </div>
                
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  );
}