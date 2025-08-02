"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BlurText from "../animated/BlurText";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LampUnderConstructionSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  floatingImageSrc?: string;
  floatingImageAlt?: string;
  showComingSoon?: boolean;
  onNotifyClick?: () => void;
}

const LampUnderConstructionSection: React.FC<
  LampUnderConstructionSectionProps
> = ({
  title = "Aqui se construye cripto university",
  subtitle = "Coming soon",
  description = "We're working hard to bring you something incredible. Stay tuned for updates and be the first to know when we launch.",
  floatingImageSrc = "/image/bgLogo.png",
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full">
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

      {/* Lamp Animation Elements */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black"></div>
      </div>

      {/* Content Container - positioned within the lamp light */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Floating Image Container - positioned first to be illuminated by lamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative mb-8"
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
              {/* Glow Effect Behind Image - enhanced by lamp light */}
              <div className="absolute inset-0 bg-cyan-400/30 blur-3xl rounded-full scale-150 opacity-80" />

              {/* Your Transparent Image */}
              <div className="relative z-10">
                <Image
                  src={floatingImageSrc}
                  alt={floatingImageAlt}
                  width={300}
                  height={300}
                  className="mx-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Main Title - positioned under the image in the lamp light */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <BlurText
                text={title}
                delay={50}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleTitleComplete}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-transparent leading-tight"
              />
            </motion.div>

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

          {/* Coming Soon Badge & CTA */}
          {showComingSoon && subtitleAnimationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-4 pt-6"
            >
              {/* Coming Soon Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2" />
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
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200 shadow-lg"
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
      </div>
    </div>
  );
};

export default LampUnderConstructionSection;
