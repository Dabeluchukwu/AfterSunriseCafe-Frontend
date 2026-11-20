import { HiSparkles, HiClock, HiHeart } from "react-icons/hi";
import FadeUp from "@/components/ui/FadeUp";

const FEATURES = [
  {
    icon: HiSparkles,
    title: "Real Ingredients",
    text: "No shortcuts, no preservatives — butter, flour, eggs, and real vanilla in every bake.",
  },
  {
    icon: HiClock,
    title: "Baked Fresh Daily",
    text: "Our ovens fire before sunrise so you always get the freshest batch of the day.",
  },
  {
    icon: HiHeart,
    title: "Made With Love",
    text: "Every cake and pastry is hand-finished by our bakers — because care is an ingredient.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Why choose us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2">
            More than a bakery
          </h2>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="bg-white rounded-card p-8 h-full text-center shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-50 text-secondary mb-5">
                    <Icon size={30} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">
                    {f.title}
                  </h3>
                  <p className="text-ink-muted">{f.text}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}