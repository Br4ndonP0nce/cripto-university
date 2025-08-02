import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Quantico,
  Turret_Road,
  Oxanium,
  Electrolize,
  Zen_Dots,
} from "next/font/google";

import { LenisProvider } from "@/contexts/LenisContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quantico = Quantico({
  variable: "--font-quantico",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const turretRoad = Turret_Road({
  variable: "--font-turret-road",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const electrolize = Electrolize({
  variable: "--font-electrolize",
  subsets: ["latin"],
  weight: ["400"],
});

const zenDots = Zen_Dots({
  variable: "--font-zen-dots",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Cripto University",
  description: "Cripto University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quantico.variable} ${turretRoad.variable} ${oxanium.variable} ${electrolize.variable} ${zenDots.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
