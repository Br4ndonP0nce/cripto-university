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
        transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
      }}
    >
      {/* Violet Storm Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-20 text-center">
        <Image
          src="/image/Logos/preloadLogoHard.png"
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
          La primera universidad cripto 100% gratuita
        </motion.p>
      </div>
    </motion.div>
  );
};

export default GlobalPreloader;
