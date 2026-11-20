import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import MenuPreview from "@/components/home/MenuPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata = {
  title: "After Sunrise Bakery — Freshly Baked, Every Day",
  description:
    "Artisan breads, custom cakes, pastries, and cookies baked fresh daily in Lagos. Call 07042660291 or WhatsApp 08088659045 to order.",
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