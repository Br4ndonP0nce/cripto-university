"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface GlobalPreloaderProps {
  onComplete?: () => void;
  isVisible?: boolean;
}

const GlobalPreloader: React.FC<GlobalPreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center px-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
      }}
    >
          {/* Dark White Dotted Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "#141b33",
              backgroundImage: `
                radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "30px 30px",
              backgroundPosition: "0 0",
            }}
          />

          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 z-5 bg-gradient-to-br from-blue-500/5 via-transparent to-amber-500/5" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          <div className="relative z-20 text-center">
            <Image
              src="/image/Logos/mainLogo.png"
              alt="Cripto University Logo"
              width={600}
              height={240}
              className="w-auto h-24 sm:h-32 lg:h-40 xl:h-48 object-contain mx-auto"
              priority
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-blue-400 text-lg font-medium tracking-wider uppercase font-oxanium"
            >
              Powered by Blofin
            </motion.p>
          </div>

          {/* Enhanced Ambient Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse opacity-60" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse opacity-60"
            style={{ animationDelay: "3s" }}
          />
    </motion.div>
  );
};

export default GlobalPreloader;