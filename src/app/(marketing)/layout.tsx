// src/app/(marketing)/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/ui/Footer/Footer";
import { VideoPreloadProvider } from "@/contexts/VideoPreloadContent";
import Navbar from "@/components/ui/Nav/Nav";
import ChatBot from "@/components/ui/ChatBot";
import { ChatBotProvider } from "@/contexts/ChatBotContext";
import { LenisProvider } from "@/contexts/LenisContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cripto University",
  description: "Cripto University",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChatBotProvider>
          <Navbar />
          {children}
          <ChatBot />
          <Footer />
        </ChatBotProvider>
      </div>
    </LenisProvider>
  );
}
