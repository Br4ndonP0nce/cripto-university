"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BlurText from "../animated/BlurText";
import Image from "next/image";

interface UnderConstructionHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  floatingImageSrc?: string;
  floatingImageAlt?: string;
  showComingSoon?: boolean;
  onNotifyClick?: () => void;
}

const UnderConstructionHero: React.FC<UnderConstructionHeroProps> = ({
  title = "Aqui se construye cripto university",
  subtitle = "Coming soon",
  description = "We're working hard to bring you something incredible. Stay tuned for updates and be the first to know when we launch.",
  floatingImageSrc = "/image/bgLogo.png", // Replace with your image path
  floatingImageAlt = "Coming Soon",
  showComingSoon = true,
  onNotifyClick,
}) => {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [subtitleAnimationComplete, setSubtitleAnimationComplete] =
    useState(false);

  const handleTitleComplete = () => {
    setTitleAnimationComplete(true);
  };

  const handleSubtitleComplete = () => {
    setSubtitleAnimationComplete(true);
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Dark White Dotted Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Gradient Overlay for Better Text Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Content Container */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Main Content Wrapper */}
        <div className="max-w-4xl mx-auto text-center space-y-8 ">
          {/* Main Title */}
          <div className="space-y-4">
            <BlurText
              text={title}
              delay={50}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleTitleComplete}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight "
            />

            {/* Subtitle - appears after title */}
            {titleAnimationComplete && (
              <BlurText
                text={subtitle}
                delay={80}
                animateBy="words"
                direction="bottom"
                onAnimationComplete={handleSubtitleComplete}
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light"
              />
            )}
          </div>

          {/* Floating Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{
              opacity: titleAnimationComplete ? 1 : 0,
              scale: titleAnimationComplete ? 1 : 0.8,
              y: titleAnimationComplete ? 0 : 50,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative py-12"
          >
            {/* Floating Animation Wrapper */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow Effect Behind Image */}
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 opacity-60" />

              {/* Your Transparent Image */}
              <div className="relative z-10">
                <Image
                  src={floatingImageSrc}
                  alt={floatingImageAlt}
                  width={400}
                  height={400}
                  className="mx-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Description - appears after subtitle */}

          {/* Coming Soon Badge & CTA */}
          {showComingSoon && subtitleAnimationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              {/* Coming Soon Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                <span className="text-sm text-white font-medium">
                  Coming Soon
                </span>
              </div>

              {/* Notify Button */}
              {onNotifyClick && (
                <motion.button
                  onClick={onNotifyClick}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                >
                  Get Notified
                  <motion.svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.button>
              )}
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        {subtitleAnimationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          ></motion.div>
        )}
      </div>
    </div>
  );
};

export default UnderConstructionHero;
