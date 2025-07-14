"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealSectionProps {
  mainHeading?: {
    line1: string;
    line2: string;
    line3: string;
  };
  sectionTag?: string;
  cardContent?: {
    title: string;
    description: string;
  };
  backgroundColor?: string;
}

const FeaturesSection = ({
  mainHeading = {
    line1: "Antes de automatizar tus leads,",
    line2: "necesitas dominar estos",
    line3: "3 fundamentos esenciales",
  },

  backgroundColor = "bg-gray-50",
}: ScrollRevealSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to opacity values
  const mainTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [0.3, 0.6, 1]
  );

  return (
    <div
      ref={sectionRef}
      className={`${backgroundColor} min-h-screen relative overflow-hidden py-20 px-6`}
      id="guia"
    >
      {/* Background decorative elements */}
      <div className="absolute top-[20%] left-[5%] w-96 h-96 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-purple-200/15 blur-3xl" />

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main heading with scroll-triggered opacity */}
        <motion.div
          className="text-center mb-20"
          style={{ opacity: mainTextOpacity }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {mainHeading.line1}
            <br />
            {mainHeading.line2}
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              {mainHeading.line3}
            </span>
          </motion.h2>
        </motion.div>

        {/* Educational Foundation Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            {
              number: "01",
              icon: "🎯",
              title: "Lead Scoring Psychology",
              desc: "¿Por qué Juan compra y María no? Entender los patterns de comportamiento es la base de todo sistema de leads exitoso.",
              timeToLearn: "2-3 días para dominar",
              difficulty: "Fácil",
              difficultyColor: "text-green-600",
            },
            {
              number: "02",
              icon: "📊",
              title: "Pipeline Architecture",
              desc: "Cómo estructurar visualmente tu flujo de leads para que cualquier persona de tu equipo pueda entender y actuar.",
              timeToLearn: "1 semana para implementar",
              difficulty: "Medio",
              difficultyColor: "text-yellow-600",
            },
            {
              number: "03",
              icon: "⚡",
              title: "Automation Mindset",
              desc: "El pensamiento sistemático que separa a los creators que escalan de los que siguen haciendo todo manual.",
              timeToLearn: "2-3 semanas para cambiar chip",
              difficulty: "Medio",
              difficultyColor: "text-yellow-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-medium">
                    FUNDAMENTO {item.number}
                  </div>
                  <div
                    className={`text-sm font-medium ${item.difficultyColor}`}
                  >
                    {item.difficulty}
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="text-gray-500 text-xs font-medium">
                  ⏱️ {item.timeToLearn}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reality Check Section */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-2xl font-bold text-gray-900">
                Reality Check
              </h3>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong>Creator-to-Creator Real Talk:</strong> Estos fundamentos
              son relativamente fáciles de entender... pero implementarlos
              correctamente es donde la cosa se pone complicada.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white rounded-lg p-6 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Lo que SÍ es fácil:
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Entender la teoría del lead scoring</li>
                  <li>• Visualizar cómo debería verse tu pipeline</li>
                  <li>• Identificar qué quieres automatizar</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  Lo que SÍ está cabróN:
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Configurar los webhooks y las integraciones</li>
                  <li>• Crear los formularios custom y las secuencias</li>
                  <li>• Debuggear cuando algo no funciona</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview of What's Coming */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para el tutorial completo?
            </h3>
            <p className="text-xl leading-relaxed mb-6 text-blue-100">
              Ahora que entiendes los fundamentos, te voy a mostrar exactamente
              cómo implementar cada paso. Te advierto: vas a ver por qué la
              mayoría prefiere que alguien más lo haga.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-sm">📋 Paso 1: Lead Scoring Setup</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-sm">🎨 Paso 2: Pipeline Design</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-sm">⚙️ Paso 3: Full Automation</span>
              </div>
            </div>

            <motion.a
              href="#tuto"
              className="inline-flex items-center gap-3 bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Ver tutorial completo</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ↓
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
