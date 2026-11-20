import Link from "next/link";
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import {
  CONTACT,
  NAV_LINKS,
  PHONE_LINK,
  WHATSAPP_LINK,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            After Sunrise Bakery
          </h3>
          <p className="text-white/70 max-w-sm">
            Freshly baked breads, cakes, pastries, and cookies made with love
            every morning. Custom orders and catering available.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-accent">Explore</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/70 hover:text-accent transition-colors text-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-accent">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <HiPhone className="mt-0.5 shrink-0" />
              <a href={PHONE_LINK} className="hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <FaWhatsapp className="mt-0.5 shrink-0" />
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <HiMail className="mt-0.5 shrink-0" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white break-all">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <HiLocationMarker className="mt-0.5 shrink-0" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <HiClock className="mt-0.5 shrink-0" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-sm text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} After Sunrise Bakery. All rights reserved.</span>
          <span>Baked with ❤️ in Lagos</span>
        </div>
      </div>
    </footer>
  );
}