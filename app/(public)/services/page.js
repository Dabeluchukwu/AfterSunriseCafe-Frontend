import FadeUp from "@/components/ui/FadeUp";
import ServiceList from "@/components/services/ServiceList";
import Button from "@/components/ui/Button";
import { WHATSAPP_LINK } from "@/lib/constants";

export const metadata = {
  title: "Services — After Sunrise Café",
  description:
    "Custom cakes, event catering, corporate orders, and curated pastry boxes in Lagos.",
};

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Services
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mt-2">
            More than just a bakery
          </h1>
          <p className="mt-4 text-ink-muted">
            From custom celebration cakes to corporate catering — we bring
            freshly baked happiness to every occasion.
          </p>
        </FadeUp>

        <ServiceList />

        <FadeUp className="mt-20 text-center">
          <p className="text-ink-soft mb-4">
            Have a custom request? Let's talk.
          </p>
          <Button href={WHATSAPP_LINK} variant="primary" size="lg">
            Chat with us on WhatsApp
          </Button>
        </FadeUp>
      </div>
    </div>
  );
}