import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import FadeUp from "@/components/ui/FadeUp";

export default function FounderCard() {
  return (
    <FadeUp>
      <div className="bg-accent-50 rounded-card p-8 md:p-12 max-w-3xl mx-auto text-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 border-4 border-white shadow-sm">
          <Image
            src="/ChidaluImage.PNG"
            alt="Founder of After Sunrise Bakery"
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <FaQuoteLeft className="text-accent mx-auto mb-4" size={22} />
        <p className="text-ink-soft italic max-w-xl mx-auto">
          "To love is to be intentional, and intentionality takes time. Every product deserves thought, care, and purpose. That’s why every creation is thoughtfully curated to connect with our customers’ emotions and make their moments more special. 
          At After Sunrise, love is in the details."
        </p>
        <div className="mt-5">
          <div className="font-display font-semibold text-lg text-ink">
            The Founder
          </div>
          <div className="text-sm text-ink-muted">After Sunrise Café </div>
        </div>
      </div>
    </FadeUp>
  );
}