"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}