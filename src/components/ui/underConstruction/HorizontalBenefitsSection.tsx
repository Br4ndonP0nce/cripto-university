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
      <div className="relative z-10 py-8 px-6 bg-white/8 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
              <span className="text-sm lg:text-xl font-bold text-white">
                {String(benefit.id).padStart(2, "0")}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-brand-amber/50 via-white/30 to-transparent flex-1" />
          </div>

          <p className="text-base lg:text-lg text-gray-200 leading-relaxed font-light">
            {benefit.description}
          </p>

          <Link href="/join" className="">
            <div className="flex items-center space-x-2 text-sm text-gray-300 hover:scale-105 hover:text-brand-amber transition-all duration-300 font-aleo">
              <div className="w-2 h-2 rounded-full bg-brand-amber/80" />
              <span>Únete gratis!</span>
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
      {/* Dark Background */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0 z-5 bg-gradient-to-br from-blue-500/8 via-transparent to-amber-500/8" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      {/* Enhanced Ambient Effects Galaxy */}
      <div className="absolute top-1/6 left-1/6 w-[700px] h-[700px] bg-blue-500/25 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/6 right-1/6 w-[700px] h-[700px] bg-amber-500/25 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-80"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/18 rounded-full blur-3xl animate-pulse opacity-70"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[650px] h-[650px] bg-emerald-500/15 rounded-full blur-3xl animate-pulse opacity-75"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-rose-500/12 rounded-full blur-3xl animate-pulse opacity-65"
        style={{ animationDelay: "5s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse opacity-70"
        style={{ animationDelay: "2.5s" }}
      />

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
              <div className="h-14 w-14 lg:h-16 lg:w-16 absolute left-3 md:left-3 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-purple-500/20">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <item.benefit.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
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
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-600 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] shadow-lg"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-purple-500 via-blue-500 to-cyan-400 from-[0%] via-[50%] rounded-full shadow-lg shadow-purple-500/50"
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
