import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/providers/CartProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chigozie Media House | Premium Football News & Predictions",
  description: "Your ultimate destination for football news, transfer updates, and expert betting predictions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-black text-white`}
      >
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-[72px]">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
