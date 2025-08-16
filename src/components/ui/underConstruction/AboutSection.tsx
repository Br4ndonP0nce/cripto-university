"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Award, TrendingUp } from "lucide-react";
import BlurText from "../animated/BlurText";
import StarBorder from "@/components/animated/starBorder";

interface AboutSectionProps {
  founderImageSrc?: string;
  onContactClick?: () => void;
  onFollowClick?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  founderImageSrc = "/image/Team/Santiago.jpg",
  onContactClick,
  onFollowClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 z-0 bg-black" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="relative z-20 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-12 xl:px-20 py-5 ">
        {/* Mobile Title - Shows first on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:hidden w-full text-center mb-8 order-1"
        >
          <h1 className="text-4xl sm:text-5xl font-oxanium font-bold leading-tight flex flex-col items-center gap-2">
            <span className="text-brand-amber">¿Qué es</span>
            <span className="text-white">CriptoUniversity?</span>
          </h1>
        </motion.div>

        {/* Left Side - Founder Profile Card - Shows second on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 max-w-lg mb-8 lg:mb-0 lg:pr-12 order-2 lg:order-1"
        >
          <div className="w-full max-w-md mx-auto">
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-lg shadow-black/20 overflow-hidden transition-all duration-700 hover:scale-[1.02]"
              whileHover={{ y: -5 }}
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <motion.div
                  className="aspect-square relative overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.7 }}
                >
                  <Image
                    src={founderImageSrc}
                    alt="Santiago Chávez"
                    fill
                    className="object-cover transition-transform duration-700"
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <h2 className="text-2xl font-oxanium font-bold text-white drop-shadow-lg">
                      Santiago Chávez
                    </h2>
                    <p className="text-brand-amber font-electrolize">
                      Fundador & CEO
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Profile Footer */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 transition-all duration-500 hover:scale-110">
                    <Image
                      src={founderImageSrc}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div className="transition-transform duration-500 hover:translate-x-1">
                    <div className="text-sm text-white font-electrolize">
                      @santichavez_
                    </div>
                    <div className="text-xs text-gray-400">
                      5+ años en crypto
                    </div>
                  </motion.div>
                </div>
                <motion.button
                  onClick={onFollowClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-amber text-black rounded-lg px-4 py-2 text-sm font-medium font-electrolize
                           transition-all duration-500 hover:bg-brand-amber/90 hover:shadow-lg"
                >
                  + Seguir
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Content - Shows third on mobile */}
        <div className="flex-1 max-w-3xl space-y-6 sm:space-y-8 lg:pl-12 text-center lg:text-left order-3 lg:order-2">
          {/* Desktop Title - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 hidden lg:block"
          >
            <h1 className="text-5xl lg:text-7xl font-oxanium font-bold leading-tight">
              <span className="text-brand-amber">¿Qué es</span> <br />
              <span className="text-white">CriptoUniversity?</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-aleo">
              La primera universidad cripto gratuita fundada por Santiago
              Chávez, reconocido influencer con años de trayectoria en el mundo
              crypto y empresarial. Aprende trading, únete a nuestra comunidad y
              recibe señales diarias.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-4"
          >
            <div className="flex justify-center lg:justify-start">
              <Link href="/join">
                <StarBorder
                  as="div"
                  className="inline-block"
                  color="gold"
                  speed="5s"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className=" text-lg font-semibold rounded-2xl font-aleo"
                  >
                    Únete Gratis →
                  </motion.button>
                </StarBorder>
              </Link>
            </div>

            {/* Trust Indicator */}
            <p className="text-sm text-gray-400 font-aleo font-light">
              Fundado por Santiago Chávez
            </p>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Ambient Effects */}
      <div className="absolute top-1/6 left-1/6 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/6 right-1/6 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl animate-pulse opacity-80"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl animate-pulse opacity-70"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/12 rounded-full blur-3xl animate-pulse opacity-75"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

export default AboutSection;
