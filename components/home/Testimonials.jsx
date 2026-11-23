import { FaStar, FaQuoteLeft } from "react-icons/fa";
import FadeUp from "@/components/ui/FadeUp";

const TESTIMONIALS = [
  {
    name: "Chubi",
    role: "Onitsha, Anambra state.",
    text: "Your samosas are divine.",
  },
  {
    name: "Danny",
    role: "Ago, Lagos State.",
    text: "Got small chops for my mother and she absolutely loved it.",
  },
  {
    name: "Chinny",
    role: "Igbariam, Anambra state.",
    text: "I just found my pastry spot. You’ve earned yourself a customer.",
  },
   {
    name: "Mmesoma E.",
    role: "Awka Anambra State.",
    text: "I love it .",
  },
   {
    name: "Jennifer S.",
    role: "Oshodi, lagos state.",
    text: "I ordered the puff puff fusion and I love it. ",
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