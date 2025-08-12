"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalPreloader from "@/components/ui/GlobalPreloader";

interface PreloaderProviderProps {
  children: React.ReactNode;
}

const PreloaderProvider: React.FC<PreloaderProviderProps> = ({ children }) => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <>
      {/* Always show content */}
      {children}
      
      {/* Preloader overlay */}
      <AnimatePresence>
        {!preloaderComplete && (
          <GlobalPreloader onComplete={() => setPreloaderComplete(true)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PreloaderProvider;