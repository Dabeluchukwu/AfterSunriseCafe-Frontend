import FadeUp from "@/components/ui/FadeUp";
import Story from "@/components/about/Story";
import FounderCard from "@/components/about/FounderCard";
import Mvv from "@/components/about/Mvv";

export const metadata = {
  title: "About — After Sunrise Café",
  description:
    "The story behind After Sunrise Bakery — a Lagos bakery built on fresh ingredients, real craft, and a love for baking.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <FadeUp className="text-center max-w-2xl mx-auto">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            About Us
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mt-2">
            Baked with heart, since 2015
          </h1>
        </FadeUp>

        <Story />
        <FounderCard />

        <div>
          <FadeUp className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              What we stand for
            </h2>
          </FadeUp>
          <Mvv />
        </div>
      </div>
    </div>
  );
}