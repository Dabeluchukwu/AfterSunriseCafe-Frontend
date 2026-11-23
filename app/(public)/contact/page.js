import FadeUp from "@/components/ui/FadeUp";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact — After Sunrise Café",
  description:
    "Get in touch with After Sunrise Bakery. Call 07042660291, WhatsApp 08088659045, or send us a message.",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">
            Let's talk
          </h1>
          <p className="mt-4 text-ink-muted">
            Questions, orders, or custom requests — we're one message away.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <FadeUp>
            <ContactInfo />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="bg-white rounded-card border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-ink mb-5">
                Send us a message
              </h3>
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}