import { FaStar, FaQuoteLeft } from "react-icons/fa";
import FadeUp from "@/components/ui/FadeUp";

const TESTIMONIALS = [
  {
    name: "Amaka O.",
    role: "Lekki, Lagos",
    text: "The birthday cake I ordered for my daughter was absolutely perfect — moist, rich, and beautifully decorated. Everyone asked where I got it!",
  },
  {
    name: "Chinedu A.",
    role: "Victoria Island",
    text: "Their bread is the freshest in Lagos, full stop. I pick up a loaf every Saturday morning and it never disappoints.",
  },
  {
    name: "Bisi F.",
    role: "Ikoyi",
    text: "Ordered pastries for a corporate event — delivered on time and everyone loved them. After Sunrise is now my go-to for office orders.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2">
            What our customers say
          </h2>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div className="bg-white rounded-card p-7 border border-gray-100 h-full flex flex-col">
                <FaQuoteLeft className="text-accent mb-4" size={24} />
                <p className="text-ink-soft flex-1">{t.text}</p>
                <div className="mt-5 flex items-center gap-1 text-secondary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <FaStar key={k} size={14} />
                  ))}
                </div>
                <div className="mt-2">
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="text-sm text-ink-muted">{t.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}