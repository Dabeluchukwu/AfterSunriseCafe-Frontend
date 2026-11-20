import FadeUp from "@/components/ui/FadeUp";
import MenuGrid from "@/components/menu/MenuGrid";

export const metadata = {
  title: "Menu — After Sunrise Bakery",
  description:
    "Browse our full menu of breads, cakes, pastries, cookies, and drinks. Baked fresh daily in Lagos.",
};

export default function MenuPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mt-2">
            Everything we bake
          </h1>
          <p className="mt-4 text-ink-muted">
            Filter by category to find your favourite. All items are baked fresh
            daily — call or WhatsApp us to place an order.
          </p>
        </FadeUp>

        <MenuGrid />
      </div>
    </div>
  );
}