import type { Metadata } from "next";
import { Anton, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./lib/cartContext";
import PageTransitionProvider from "./components/PageTransitionProvider";
import ConsoleLogger from "./components/ConsoleLogger";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grabfabs.in"),
  title: {
    default: "Grabfabs — Feel Good, On the Go Foods",
    template: "%s | Grabfabs",
  },
  description:
    "Grabfabs brings you Feel Good, On the Go foods for hustlers. Smart nutrition without the junk — muesli, peanut butter, energy bites, gluten-free bread, makhana and more.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${syne.variable} ${dmSans.variable} antialiased`}
    >
      <body className="overflow-x-hidden">
        <LenisProvider>
        <ConsoleLogger />
          <CartProvider>
            <PageTransitionProvider>
              <Navbar />
              {children}
              <Footer />
            </PageTransitionProvider>
          </CartProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
