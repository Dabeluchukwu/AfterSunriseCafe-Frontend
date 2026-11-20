import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FadeUp from "@/components/ui/FadeUp";
import Button from "@/components/ui/Button";
import {
  CONTACT,
  PHONE_LINK,
  WHATSAPP_LINK,
} from "@/lib/constants";

export default function CtaBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="bg-secondary rounded-card p-10 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/20" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-accent/10" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Ready to order something delicious?
              </h2>
              <p className="mt-3 text-white/90 max-w-xl mx-auto">
                Call, WhatsApp, or email us to place a custom order. We deliver
                across Lagos.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={WHATSAPP_LINK} variant="secondary" size="lg" className="bg-white text-secondary hover:bg-accent-50">
                  <FaWhatsapp /> WhatsApp us
                </Button>
                <Button href={PHONE_LINK} variant="dark" size="lg" className="bg-ink text-white hover:bg-ink-soft">
                  <FiPhone /> {CONTACT.phoneDisplay}
                </Button>
                <Button href={`mailto:${CONTACT.email}`} variant="dark" size="lg" className="bg-ink text-white hover:bg-ink-soft">
                  <FiMail /> Email us
                </Button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}