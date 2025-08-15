"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BlurText from "../animated/BlurText";
import ShinyText from "@/components/animated/shinytext";
import TextType from "@/components/animated/textType";
import { useChatBot } from "@/contexts/ChatBotContext";
import BlofinModal from "../modals/blofinModal";
import Image from "next/image";
import Link from "next/link";
import StarBorder from "@/components/animated/starBorder";
import DarkVeil from "../animated/DarkVeil";
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
  const [isBlofinModalOpen, setIsBlofinModalOpen] = useState(false);
  const { openChat } = useChatBot();

  const handleBlofinClick = () => {
    setIsBlofinModalOpen(true);
  };

  const closeBlofinModal = () => {
    setIsBlofinModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen w-full  bg-black relative overflow-hidden pt-16 sm:pt-20 md:pt-0">
        {/* DarkVeil Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 z-5 bg-gradient-to-br from-blue-500/5 via-transparent to-amber-500/5" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* MAIN HERO STATE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-20 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-15 md:py-0 "
        >
          {/* Left Content */}
          <div className="flex-1 max-w-3xl space-y-6 sm:space-y-8 lg:pr-12 text-center  lg:text-left md:mt-50 lg:mt-0">
            <h1 className=" font-bold leading-tight font-oxanium">
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
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-aleo">
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
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 !place-self-center lg:!place-self-start font-aleo font-light"
                >
                  <span>¿Tienes dudas?</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Preguntale a criptobot
                  </span>
                </motion.button>
              </div>

              {/* Trust Indicator with Modal Trigger */}
              <p className="text-sm text-gray-400 font-aleo font-light">
                CriptoUniversity es 100% gratuito • Solo requiere una cuenta de
                blofin y una minima inversion en tu cuenta personal para que
                empieces a invertir{" "}
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

          {/* Right Side - Logo Shield */}
          <div className="flex-1 max-w-lg flex items-center justify-center mt-4 sm:mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <Image
                src="/image/Logos/LogoShield.png"
                alt="Cripto University Shield Logo"
                width={400}
                height={400}
                className="w-auto h-auto max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-contain"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

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
