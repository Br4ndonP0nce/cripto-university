"use client";

import React from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  isLoading: boolean;
  loadingText?: string;
  backgroundColor?: string;
}

const Preloader = ({
  isLoading,
  loadingText = "Construyendo tu futuro...",
  backgroundColor = "bg-white",
}: PreloaderProps) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-0 ${backgroundColor} z-50 flex items-center justify-center`}
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Eco Logo Spinner */}
        <motion.div
          className="relative w-20 h-20 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-2 border-gray-200 rounded-full"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full" />
          </motion.div>

          {/* Inner Eco Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-lg font-bold">e</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-gray-600 text-lg font-light tracking-wide">
            {loadingText}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Optional Progress Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
