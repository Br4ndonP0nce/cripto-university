"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import BlurText from "../animated/BlurText";
import ShinyText from "@/components/animated/shinytext";
import TextType from "@/components/animated/textType";
import { useChatBot } from "@/contexts/ChatBotContext";
import BlofinModal from "../modals/blofinModal";
import Image from "next/image";
import Link from "next/link";
import StarBorder from "@/components/animated/starBorder";
interface CriptoUniversityHeroProps {
  founderImageSrc?: string;
  onRegisterClick?: () => void;
  onWhatsAppClick?: () => void;
  stats?: {
    activeStudents: number;
    videoHours: number;
    dailySignals: number;
    teachers: string;
  };
}

const CriptoUniversityHero: React.FC<CriptoUniversityHeroProps> = ({
  founderImageSrc = "/image/santiago-chavez.jpg",
  onRegisterClick,
  onWhatsAppClick,
  stats = {
    activeStudents: 1200,
    videoHours: 50,
    dailySignals: 5,
    teachers: "+12",
  },
}) => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [isBlofinModalOpen, setIsBlofinModalOpen] = useState(false);
  const { openChat } = useChatBot();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderComplete(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleBlofinClick = () => {
    setIsBlofinModalOpen(true);
  };

  const closeBlofinModal = () => {
    setIsBlofinModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen w-full  bg-black relative overflow-hidden pt-16 sm:pt-20 md:pt-0">
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

        <AnimatePresence mode="wait">
          {!preloaderComplete ? (
            // PRELOADER STATE
            <motion.div
              key="preloader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -50 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-50 min-h-screen flex items-center justify-center px-4"
            >
              <div className="text-center">
                <ShinyText
                  text="CriptoUniversity"
                  speed={1.8}
                  className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
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
            </motion.div>
          ) : (
            // MAIN HERO STATE
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-20 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-12 xl:px-20 py-15 sm:py-12"
            >
              {/* Left Content */}
              <div className="flex-1 max-w-3xl space-y-6 sm:space-y-8 lg:pr-12 text-center  lg:text-left md:mt-50 lg:mt-0">
                {/* Main Headline */}
                <h1 className=" font-bold leading-tight font-oxanium">
                  <span className="text-brand-amber text-5xl lg:text-7xl">
                    CriptoUniversity:
                  </span>{" "}
                  <br />
                  <TextType
                    as="span"
                    text="La primera universidad cripto gratuita"
                    typingSpeed={35}
                    showCursor={true}
                    className="text-white text-3xl  md:text-4xl"
                    loop={false}
                  />
                </h1>

                {/* Value Proposition */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-electrolize">
                  Aprende, invierte y crece con los mejores.{" "}
                  <span className="text-brand-amber font-semibold">
                    Cursos gratuitos + comunidad privada + señales diarias
                  </span>
                </p>

                {/* CTA Section */}
                <div className="space-y-6">
                  {/* Primary CTA */}
                  <div className="flex flex-col justify-center md:justify-start lg:justify-start gap-y-6">
                    <div className="flex items-center justify-center lg:justify-start gap-5">
                      <Link href="/join">
                        <StarBorder
                          as="div" // Changed from button to div
                          className="custom-class"
                          color="gold"
                          speed="5s"
                        >
                          <motion.button
                            onClick={onRegisterClick}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-2 py-2  font-bold text-lg rounded-2xl shadow-2xl   duration-300"
                          >
                            Inscríbete Gratis →
                          </motion.button>
                        </StarBorder>
                      </Link>
                    </div>
                    {/* Secondary CTA */}
                    <motion.button
                      onClick={openChat}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 !place-self-center md:!place-self-start"
                    >
                      <span>¿Tienes dudas?</span>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Preguntale a criptobot
                      </span>
                    </motion.button>
                  </div>

                  {/* Trust Indicator with Modal Trigger */}
                  <p className="text-sm text-gray-400">
                    CriptoUniversity es 100% gratuito • Solo requiere una cuenta
                    de blofin y una minima inversion en tu cuenta personal para
                    que empieces a invertir{" "}
                    <a href="#">
                      <span className="text-brand-amber/80 ">obtenla aqui</span>
                    </a>{" "}
                    <br />
                    <motion.button
                      onClick={handleBlofinClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors duration-200"
                    >
                      ¿Que es blofin?
                    </motion.button>
                  </p>
                </div>
              </div>

              {/* Right Side - Founder + Stats */}
              <div className="flex-1 max-w-lg space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-0 font-electrolize">
                {/* Founder Image */}

                {/* Live Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      number: `${stats.activeStudents}+`,
                      label: "Estudiantes Activos",
                      color: "white",
                    },
                    {
                      number: `${stats.videoHours}h`,
                      label: "Contenido en Video",
                      color: "white",
                    },
                    {
                      number: `${stats.dailySignals}`,
                      label: "Señales Diarias",
                      color: "white",
                    },
                    {
                      number: stats.teachers,
                      label: "Maestros en trading",
                      color: "white",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className={`bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/60 hover:border-${stat.color}-400/40 transition-all duration-300 text-center`}
                    >
                      <div
                        className={`text-xl sm:text-2xl font-bold text-white`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-xs text-white mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Powered by Blofin */}
                <motion.div
                  className="text-center p-3 sm:p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-600/30 cursor-pointer"
                  onClick={handleBlofinClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-gray-400 text-sm mb-2">Powered by</p>
                  <p className="text-blue-400 font-bold text-lg">Blofin</p>
                  <p className="text-xs text-gray-500">
                    Plataforma de trading profesional
                  </p>
                  <p className="text-xs text-blue-400 mt-1">¿Qué es esto? →</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Ambient Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse opacity-60" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Blofin Modal */}
      <BlofinModal isOpen={isBlofinModalOpen} onClose={closeBlofinModal} />
    </>
  );
};

export default CriptoUniversityHero;
