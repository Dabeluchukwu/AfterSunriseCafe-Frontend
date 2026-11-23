import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartFAB from "@/components/menu/CartFAB";
import { CartProvider } from "@/context/CartContext";

export default function PublicLayout({ children }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CartFAB />
    </CartProvider>
  );
}