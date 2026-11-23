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
          {/* <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2 mb-4">
            It started with one loaf
          </h2> */}
          <p className="text-ink-soft mb-4">
            After Sunrise Café began in 2024 as a student’s little venture into
            making money through small chops. What started as a simple business
            gradually grew into a genuine love for the art of food creation.
          </p>
          <p className="text-ink-soft mb-4">
            As we gained experience, we discovered the joy of experimenting with
            flavours, creating unique combinations, and turning simple
            ingredients into exciting food experiences. This curiosity led to
            the birth of our infusion products.
          </p>
          <p className="text-ink-soft mb-4">
            Today, we have brought joy to over 50 homes, and we continue to
            evolve, experiment, and refresh our menu to serve you better.
          </p>
          <p className="text-ink-soft">
            At After Sunrise Café, we pride ourselves on quality, creativity,
            and the intentionality behind every product we make.
          </p>
        </div>
      </div>
    </FadeUp>
  );
}
