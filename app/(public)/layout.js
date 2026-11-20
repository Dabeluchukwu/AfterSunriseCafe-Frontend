import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}