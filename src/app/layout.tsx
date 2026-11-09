import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { WishlistProvider } from "@/lib/wishlist";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiabeticShop — Your One-Stop Diabetic Store",
  description:
    "Shop diabetic-friendly food and drinks with real nutrition facts. Filter by Halal, Kosher, Vegan, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
