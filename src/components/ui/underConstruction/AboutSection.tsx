"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Award, TrendingUp } from "lucide-react";
import BlurText from "../animated/BlurText";
import StarBorder from "@/components/animated/starBorder";
import { useLenis } from "@/contexts/LenisContext";
interface AboutSectionProps {
  founderImageSrc?: string;
  onContactClick?: () => void;
  onFollowClick?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  founderImageSrc = "/image/Team/SantiagoBW.jpg",
  onContactClick,
  onFollowClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollTo } = useLenis();

  const handleScrollToFAQ = () => {
    scrollTo("#FAQ", {
      offset: -100, // Adjust offset as needed
      duration: 1.5, // Smooth scroll duration
    });
  };
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden border-t border-white/10">
      {/* Dark Background */}
      <div className="absolute inset-0 z-0 bg-black" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="relative z-20 min-h-screen flex flex-col lg:flex-row lg:gap-20 items-center justify-center  px-4 sm:px-6 lg:px-12 xl:px-20 py-5 ">
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
            <h1 className="text-3xl lg:text-5xl font-oxanium font-bold leading-tight">
              <span className="text-brand-amber">¿Qué es</span> <br />
              <span className="text-white">CriptoUniversity?</span>
            </h1>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4"
          >
            {/* Opening Hook */}
            <div className="text-center lg:text-left">
              <p className="text-xl  md:text-2xl text-brand-amber font-bold leading-tight font-oxanium">
                CriptoUniversity no nació como un negocio.
              </p>
              <p className="text-xl  md:text-2xl text-white font-bold leading-tight font-oxanium">
                Nació como una reacción.
              </p>
            </div>

            {/* Problem Statement */}
            <p className="text-base text-md md:text-lg text-gray-300 leading-relaxed font-aleo">
              Una reacción al humo. A los cursos de $500 que no enseñan nada. A
              los "mentores" que nunca han invertido su propio dinero. A la
              desinformación que inunda redes y aleja a la gente de un mundo que
              sí puede cambiar vidas: el de las criptomonedas.
            </p>

            {/* Personal Introduction */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-amber/20 italic">
              <p className="text-base text-md md:text-lg text-gray-200 leading-relaxed font-aleo">
                <span className="text-brand-amber font-semibold ">
                  Yo soy Santiago Chávez Irus
                </span>
                , creador de contenido, emprendedor y el primer referente cripto
                en Perú. En redes me encuentras como{" "}
                <span className="text-brand-amber underline font-bold">
                  <a
                    href="https://www.tiktok.com/@santiagochavezirus"
                    rel="noreferrer"
                    target="_blank"
                  >
                    @santiagochavezirus
                  </a>
                </span>
                , donde he construido una comunidad de más de{" "}
                <span className="text-brand-amber font-semibold">
                  3 millones de personas
                </span>{" "}
                entre TikTok, Instagram y YouTube.
              </p>
            </div>

            {/* What CriptoUniversity Is */}
            <div className="border-l-4 border-brand-amber pl-4 sm:pl-6">
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-aleo">
                <span className="text-brand-amber font-semibold">
                  CriptoUniversity
                </span>{" "}
                es una plataforma 100% gratuita para enseñar a invertir desde
                cero. Con cursos por módulos, señales diarias, entrevistas
                exclusivas, sesiones en vivo, acceso a grupos privados y
                herramientas reales para avanzar.
              </p>
            </div>

            {/* Call to Movement */}
            <div className="text-center lg:text-left italic">
              <p className="text-lg sm:text-xl text-white font-semibold font-oxanium mb-2">
                Esta no es una promesa vacía.
              </p>
              <p className="text-lg sm:text-xl text-brand-amber font-semibold font-oxanium mb-2">
                Es un movimiento.
              </p>
              <p className="text-base sm:text-lg text-gray-300 font-aleo">
                Y tú puedes ser parte de él.
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start">
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

              <StarBorder
                as="div"
                className="inline-block"
                color="gold"
                speed="5s"
              >
                <motion.button
                  onClick={handleScrollToFAQ}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className=" text-lg font-semibold rounded-2xl font-aleo "
                >
                  Más Información →
                </motion.button>
              </StarBorder>
            </div>

            {/* Trust Indicator */}
            <p className="text-sm text-gray-400 font-aleo font-light">
              Fundado por Santiago Chávez
            </p>
          </motion.div>
        </div>
      </div>

      {/* Creators Section */}
      <div className="relative z-20 py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oxanium font-bold text-white mb-4">
            <span className="text-brand-amber">🌎</span> Nuestros Creadores y
            Líderes
          </h2>
          <div className="w-32 h-1 bg-brand-amber mx-auto rounded-full" />
        </motion.div>

        {/* First Creator Row - Card then Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col lg:flex-row lg:gap-12 gap-5 items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-3"
        >
          {/* Crypto Lucho Card */}
          <div className="flex-1 max-w-xs lg:max-w-sm">
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
                    src="/image/Team/lucho.jpg"
                    alt="Crypto Lucho"
                    fill
                    className="object-cover transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <h3 className="text-xl font-oxanium font-bold text-white drop-shadow-lg">
                      Crypto Lucho
                    </h3>
                  </div>
                </motion.div>
              </div>

              {/* Profile Footer */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 transition-all duration-500 hover:scale-110 bg-gradient-to-br from-brand-amber/50 to-purple-600/50 flex items-center justify-center">
                    <span className="text-xs">🇦🇷</span>
                  </div>
                  <motion.div className="transition-transform duration-500 hover:translate-x-1">
                    <div className="text-sm text-white font-electrolize">
                      @cryptoluchobtc
                    </div>
                    <div className="text-xs text-gray-400">
                      91K+ IG • 2.8M+ TikTok
                    </div>
                  </motion.div>
                </div>
                <motion.button
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

          {/* Crypto Lucho Description */}
          <div className="flex-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-amber/20">
              <p className="text-lg text-gray-200 leading-relaxed font-aleo">
                Con más de{" "}
                <span className="text-brand-amber font-semibold">
                  91,000 seguidores en Instagram
                </span>{" "}
                y{" "}
                <span className="text-brand-amber font-semibold">
                  2.8 millones en TikTok
                </span>
                , Crypto Lucho es uno de los creadores cripto más influyentes de
                Latinoamérica.
              </p>
            </div>
            <p className="text-base text-gray-300 leading-relaxed font-aleo">
              Desde Dubái, comparte contenido educativo y estratégico sobre
              Bitcoin, inversiones y tendencias del mercado. Forma parte del
              equipo fundador de CriptoUniversity como{" "}
              <span className="text-brand-amber font-semibold">
                líder regional
              </span>
              , ayudando a democratizar la educación financiera en español con
              su comunidad masiva y su visión global.
            </p>
          </div>
        </motion.div>

        {/* Second Creator Row - Text then Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col lg:flex-row-reverse lg:gap-12 gap-5 items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-3"
        >
          {/* Crypto Juancho Card */}
          <div className="flex-1 max-w-xs lg:max-w-sm">
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
                    src="/image/Team/juancho.jpg"
                    alt="Crypto Juancho"
                    fill
                    className="object-cover transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-oxanium font-bold text-white drop-shadow-lg">
                      Crypto Juancho
                    </h3>
                  </div>
                </motion.div>
              </div>

              {/* Profile Footer */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 transition-all duration-500 hover:scale-110 bg-gradient-to-br from-green-500/50 to-brand-amber/50 flex items-center justify-center">
                    <span className="text-xs">🇵🇪</span>
                  </div>
                  <motion.div className="transition-transform duration-500 hover:translate-x-1">
                    <div className="text-sm text-white font-electrolize">
                      @cryptojuanchos
                    </div>
                    <div className="text-xs text-gray-400">
                      1M+ TikTok • 17K+ IG
                    </div>
                  </motion.div>
                </div>
                <motion.button
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

          {/* Crypto Juancho Description */}
          <div className="flex-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-amber/20">
              <p className="text-lg text-gray-200 leading-relaxed font-aleo">
                Con más de{" "}
                <span className="text-brand-amber font-semibold">
                  1 millón de seguidores en TikTok
                </span>{" "}
                y{" "}
                <span className="text-brand-amber font-semibold">
                  17,000 en Instagram
                </span>
                , Crypto Juancho es uno de los referentes cripto más potentes de
                Perú.
              </p>
            </div>
            <p className="text-base text-gray-300 leading-relaxed font-aleo">
              Con un estilo directo y práctico, enseña cómo generar ingresos con
              criptomonedas a miles de personas, y ha liderado academias con
              cientos de alumnos. Ahora es parte del núcleo de CriptoUniversity,
              como{" "}
              <span className="text-brand-amber font-semibold">
                mentor y guía
              </span>
              , comprometido con formar una nueva generación de inversores en
              toda la región.
            </p>
          </div>
        </motion.div>
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
