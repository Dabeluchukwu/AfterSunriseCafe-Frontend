import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import MenuPreview from "@/components/home/MenuPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata = {
  title: "After Sunrise Café — Freshly Made, Just for You",
  description:
    "Artisan breads, cakes, pastries, and cookies baked fresh daily. Custom cakes, catering, and corporate orders. Call 07042660291 or WhatsApp 08088659045.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <MenuPreview />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}