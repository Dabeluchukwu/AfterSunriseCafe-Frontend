import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";

export default function Story() {
  return (
    <FadeUp>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-72 md:h-96 rounded-card overflow-hidden shadow-sm">
          <Image
            src="/BakeryAbout.png"
            alt="Breads and pastries at After Sunrise Bakery"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Story
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2 mb-4">
            It started with one loaf
          </h2>
          <p className="text-ink-soft mb-4">
            After Sunrise Bakery began in a small kitchen with a single
            sourdough starter and a simple belief: that fresh, honest bread
            shouldn't be a luxury. What started as a hobby — baking for
            friends, family, and neighbours — quickly grew into the bakery we
            are today.
          </p>
          <p className="text-ink-soft mb-4">
            Every morning, before the sun is fully up, our bakers start mixing,
            kneading, and shaping. By the time you walk in (or your delivery
            arrives), everything is fresh out of the oven.
          </p>
          <p className="text-ink-soft">
            We use real ingredients — real butter, real eggs, real vanilla.
            Nothing artificial, nothing frozen. That's a promise we've kept
            since day one.
          </p>
        </div>
      </div>
    </FadeUp>
  );
}