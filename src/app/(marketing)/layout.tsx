// src/app/(marketing)/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { VideoPreloadProvider } from "@/contexts/VideoPreloadContent";
import Navbar from "@/components/ui/Nav/Nav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo Landing + CRM",
  description:
    "Demo de una landing page con un CRM integrado para capturar leads y gestionar clientes potenciales. Cloud+",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
      {children}
    </div>
  );
}
