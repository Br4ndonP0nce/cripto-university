"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  BookOpen,
  MessageCircle,
  Target,
} from "lucide-react";
import Link from "next/link";
import ShinyText from "@/components/animated/shinytext";
import StarBorder from "@/components/animated/starBorder";

interface Benefit {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  bgColor: string;
}

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  benefit: Benefit;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Acceso a comunidad privada (Telegram y Discord)",
    description:
      "Únete a nuestra comunidad privada en Discord y Telegram. Conecta con traders experimentados, comparte conocimientos y recibe apoyo en tiempo real.",
    gradient: "from-purple-500 to-blue-600",
    bgColor: "bg-purple-900/20",
  },
  {
    id: 2,
    icon: Users,
    title: "Entrevistas con expertos",
    description:
      "Entrevistas con top players en el mercado crypto que te ayudaran a seguir creciendo y aprendiendo. Conoce las estrategias de los mejores traders y aprende de sus experiencias.",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-900/20",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Señales de Trading",
    description:
      "Recibe señales diarias de trading analizadas por expertos. Mejora tus decisiones de inversión con datos confiables y análisis técnico profesional.",
    gradient: "from-green-500 to-teal-500",
    bgColor: "bg-green-900/20",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Sesiones en vivo",
    description:
      "Participa en sesiones en vivo semanales con traders profesionales. Aprende en tiempo real, haz preguntas y mejora tus habilidades de trading.",
    gradient: "from-green-500 to-teal-500",
    bgColor: "bg-green-900/20",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Copytrading",
    description:
      "Copia las operaciones de traders exitosos directamente en tu cuenta. Maximiza tus ganancias siguiendo a los mejores en tiempo real.",
    gradient: "from-green-500 to-teal-500",
    bgColor: "bg-green-900/20",
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Grupo de ayuda y soporte continuo",
    description:
      "Grupo de ayuda y soporte continuo para resolver tus dudas y mejorar tu experiencia de trading. Estamos aquí para apoyarte en cada paso de tu viaje.",
    gradient: "from-green-500 to-teal-500",
    bgColor: "bg-green-900/20",
  },
];

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative z-10 py-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <span className="text-sm lg:text-lg font-bold text-white">
                {String(benefit.id).padStart(2, "0")}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1" />
          </div>

          <p className="text-base lg:text-lg text-gray-300 leading-relaxed font-light">
            {benefit.description}
          </p>

          <Link href="/join" className="">
            <div className="flex items-center space-x-2 text-sm text-gray-400 hover:scale-102 hover:text-white/90 duration-300 font-aleo">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span>Unete gratis!</span>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black relative overflow-hidden"
      ref={containerRef}
    >
      {/* Updated background for #141b33 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#141b33",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Enhanced Visible Gradient Overlays for #141b33 Background */}
      {/* Focused top darkening - radial from top center to avoid corner darkening */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/60 from-0% via-black/20 via-30% to-transparent to-60%" />

      {/* Additional top center focus - radial gradient */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 z-10 bg-gradient-radial from-black/40 via-black/10 to-transparent opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at center top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
        }}
      />

      {/* Strong bottom darkening overlay - MIRRORED */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Primary blue-amber accent gradient - more visible */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-500/15 via-transparent to-amber-500/15" />

      {/* Side darkening for containment */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Additional depth layers */}

      {/* Enhanced Ambient Light Effects - More visible on #141b33 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-70" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse opacity-70"
        style={{ animationDelay: "3s" }}
      />

      {/* Central ambient glow - more prominent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/8 to-amber-500/8 rounded-full blur-3xl opacity-60" />

      {/* Additional corner darkening for dramatic effect */}

      <div className="relative z-20 max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-oxanium font-bold text-brand-amber leading-tight">
            Beneficios <span className="text-white bg-clip-text ">Únicos</span>
          </h2>
          <p className="text-lg text-gray-300 font-aleo font-light max-w-2xl mx-auto lg:mx-0">
            Descubre las ventajas que solo CriptoUniversity puede ofrecerte en
            tu camino hacia el dominio de las criptomonedas
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline dot with icon */}
              <div className="h-12 w-12 lg:h-14 lg:w-14 absolute left-3 md:left-3 rounded-full bg-black border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <item.benefit.icon className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
              </div>

              {/* Title for larger screens */}
              <div className="hidden md:block text-3xl md:pl-20 font-oxanium font-bold">
                <ShinyText text={item.title} speed={5} className="text-white" />
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Title for mobile */}
              <div className="md:hidden block text-2xl mb-6 text-left font-bold">
                <ShinyText text={item.title} speed={2} className="text-white" />
              </div>

              {/* Content */}
              <div className="text-gray-300 font-aleo">{item.content}</div>
            </div>
          </div>
        ))}

        {/* Animated timeline line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-cyan-400 from-[0%] via-[50%] rounded-full"
          />
        </div>

        {/* CTA Section - Connected to timeline */}
        <div className="relative w-full flex justify-center pt-20 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* CTA Button */}
            <Link href="/join" className="block">
              <StarBorder
                as="div"
                className="custom-class"
                color="gold"
                speed="5s"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group px-2 py-1 bg-gradient-to-r text-lg shadow-2xl overflow-hidden w-full"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <ShinyText
                      text="Unete gratis hoy!"
                      speed={2}
                      className="text-white text-2xl font-electrolize"
                    />
                    <motion.svg
                      className="w-5 h-5"
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              </StarBorder>
            </Link>

            {/* Supporting text below button */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-gray-400 text-xs md:sm mt-4 font-aleo font-light"
            >
              Sin tarjeta de crédito • Acceso inmediato • Comunidad exclusiva
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Create timeline data from benefits
const timelineData: TimelineEntry[] = benefits.map((benefit) => ({
  title: benefit.title,
  benefit: benefit,
  content: <BenefitCard benefit={benefit} />,
}));

const HorizontalBenefitsSection: React.FC = () => {
  return <Timeline data={timelineData} />;
};

export default HorizontalBenefitsSection;
