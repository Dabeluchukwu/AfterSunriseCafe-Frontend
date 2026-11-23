import { Geist, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "After Sunrise Café — Freshly Made, Just for You",
  description:
    "Artisan breads, cakes, pastries, and cookies baked fresh daily. Custom cakes, catering, and corporate orders. Call 07042660291 or WhatsApp 08088659045.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-primary text-ink antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#FFFFFF",
                color: "#1F2937",
                border: "1px solid #F9A8D4",
              },
              success: { iconTheme: { primary: "#DC2626", secondary: "#FFFFFF" } },
              error: { iconTheme: { primary: "#DC2626", secondary: "#FFFFFF" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}