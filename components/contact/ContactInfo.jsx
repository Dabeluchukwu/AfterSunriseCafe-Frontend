import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  CONTACT,
  PHONE_LINK,
  WHATSAPP_LINK,
} from "@/lib/constants";

const ITEMS = [
  { icon: FiPhone, label: "Phone", value: CONTACT.phoneDisplay, href: PHONE_LINK },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: WHATSAPP_LINK,
    external: true,
  },
  { icon: FiMail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: FiMapPin, label: "Address", value: CONTACT.address },
  { icon: FiClock, label: "Hours", value: CONTACT.hours },
];

export default function ContactInfo() {
  return (
    <div>
      <span className="text-secondary font-medium text-sm uppercase tracking-wider">
        Contact
      </span>
      <h2 className="font-display text-3xl font-bold text-ink mt-2 mb-6">
        Get in touch
      </h2>
      <p className="text-ink-soft mb-8">
        We'd love to hear from you. Reach out for orders, custom cakes, catering,
        or just to say hi.
      </p>

      <ul className="space-y-5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className="w-11 h-11 rounded-full bg-secondary-50 text-secondary flex items-center justify-center shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <div className="text-sm text-ink-muted">{item.label}</div>
                <div className="font-medium text-ink">{item.value}</div>
              </div>
            </>
          );

          return (
            <li key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                >
                  {content}
                </a>
              ) : (
                <div className="flex items-start gap-4">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}