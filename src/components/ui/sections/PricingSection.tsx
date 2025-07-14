"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GuideStep {
  number: string;
  title: string;
  description: string;
  steps: string[];
  complexity: "Medium" | "Hard" | "Expert";
  timeRequired: string;
  mockupType: "leads" | "dashboard" | "architecture";
}

interface GuidesSectionProps {
  mainHeading?: {
    line1: string;
    line2: string;
  };
  guides?: GuideStep[];
  backgroundColor?: string;
}

const defaultGuides: GuideStep[] = [
  {
    number: "01",
    title: "Asigna un Factor de Conversión a Tus Leads",
    description:
      "¿Cómo se ve un lead que compra vs uno que no? Aprende a identificar y clasificar automáticamente tus leads de mayor valor.",
    steps: [
      "Identifica patrones en leads que compraron vs los que no",
      "Asigna scores del 1-100 basado en respuestas del formulario",
      "Crea códigos de color: Verde (compra segura), Amarillo (seguimiento), Rojo (descarta)",
      "Automatiza la clasificación para que cada lead tenga su score al entrar",
    ],
    complexity: "Medium",
    timeRequired: "2-3 semanas",
    mockupType: "leads",
  },
  {
    number: "02",
    title: "Estructura Tus Datos de Manera Simple",
    description:
      "Arma tu pipeline de ventas con códigos de color y follow-ups personalizados según el tipo de lead. Haz que todo sea visual y fácil de entender.",
    steps: [
      "Diseña tu dashboard para ver todo de un vistazo",
      "Crea templates de follow-up para cada tipo de lead",
      "Configura notificaciones automáticas cuando un lead esté listo",
      "Estructura reportes que te digan exactamente qué está funcionando",
    ],
    complexity: "Hard",
    timeRequired: "4-6 semanas",
    mockupType: "dashboard",
  },
  {
    number: "03",
    title: "Haz Que Tus Leads Sean Escalables",
    description:
      "No deberías necesitar darle acceso a datos que tus closers no necesitan. Dale la información exacta que necesite para que haga lo que tú necesites.",
    steps: [
      "Crea niveles de acceso: Admin, Closer, Support",
      "Automatiza la asignación de leads según capacity del closer",
      "Configura formularios propios (adiós facturas de Typeform que suben)",
      "Integra pagos, acceso a cursos y follow-ups en un solo sistema",
    ],
    complexity: "Expert",
    timeRequired: "8-12 semanas",
    mockupType: "architecture",
  },
];

const GuidesSection = ({
  mainHeading = {
    line1: "Guía Completa:",
    line2: "Cómo Automatizar Tus Leads",
  },
  guides = defaultGuides,
  backgroundColor = "bg-gray-900",
}: GuidesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5],
    [0.4, 0.7, 1]
  );

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Hard":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Expert":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`${backgroundColor} min-h-screen relative overflow-hidden py-20 px-6`}
      id="tuto"
    >
      {/* Background effects */}
      <div className="absolute top-[15%] right-[5%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-[20%] left-[8%] w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main heading */}
        <motion.div
          className="text-center mb-24"
          style={{ opacity: headerOpacity }}
        >
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {mainHeading.line1}
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {mainHeading.line2}
            </span>
          </motion.h2>

          <motion.p
            className="text-white/70 text-xl mt-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Creator-to-Creator: Te voy a enseñar exactamente cómo lo hacemos.
            Paso a paso, sin fluff, directo al grano.
          </motion.p>
        </motion.div>

        {/* Guide steps */}
        <div className="space-y-24 md:space-y-32">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.number}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left side - Guide info */}
              <div className="lg:sticky lg:top-32">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-purple-400 tracking-wider">
                      PASO {guide.number}
                    </span>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getComplexityColor(
                        guide.complexity
                      )}`}
                    >
                      {guide.complexity}
                    </div>
                  </div>
                </motion.div>

                <motion.h3
                  className="text-4xl md:text-5xl font-light text-white mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {guide.title}
                </motion.h3>

                <motion.p
                  className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {guide.description}
                </motion.p>

                {/* Step-by-step breakdown */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white/50 text-sm font-medium mb-4 uppercase tracking-wider">
                    Pasos para implementar:
                  </h4>
                  <div className="space-y-3">
                    {guide.steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                          <span className="text-blue-400 text-xs font-bold">
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-white/80 text-sm leading-relaxed">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Complexity warning */}
                <motion.div
                  className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-lg">⚠️</span>
                    <div>
                      <h5 className="text-amber-300 font-medium text-sm">
                        Heads up:
                      </h5>
                      <p className="text-amber-200/80 text-sm">
                        {guide.complexity === "Expert"
                          ? "Este paso requiere conocimiento técnico avanzado y mucho tiempo. La mayoría de creators prefieren que alguien más lo haga."
                          : guide.complexity === "Hard"
                          ? "Vas a necesitar dedicar bastante tiempo y paciencia. No es imposible, pero sí complejo."
                          : "Factible, pero vas a necesitar organizarte bien y ser consistente."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Visual Example */}
              <motion.div
                className="space-y-6"
                data-system={guide.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* System Mockup */}
                {guide.mockupType === "leads" && (
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-3 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">
                          Lead Scoring Dashboard
                        </span>
                        <span className="text-white/60 text-xs">
                          Así se ve cuando está funcionando
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white text-sm font-medium">
                                Juan Pérez
                              </div>
                              <div className="text-white/60 text-xs">
                                Empresario • $1,300 budget
                              </div>
                            </div>
                            <div className="text-green-400 text-2xl font-bold">
                              92
                            </div>
                          </div>
                          <div className="text-green-400 text-xs">
                            ✅ Compra Segura - Contactar HOY
                          </div>
                        </div>

                        <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white text-sm font-medium">
                                María González
                              </div>
                              <div className="text-white/60 text-xs">
                                Freelancer • Interesada
                              </div>
                            </div>
                            <div className="text-yellow-400 text-2xl font-bold">
                              67
                            </div>
                          </div>
                          <div className="text-yellow-400 text-xs">
                            ⏱️ Seguimiento en 3 días
                          </div>
                        </div>

                        <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white text-sm font-medium">
                                Carlos López
                              </div>
                              <div className="text-white/60 text-xs">
                                Estudiante • Sin presupuesto
                              </div>
                            </div>
                            <div className="text-red-400 text-2xl font-bold">
                              23
                            </div>
                          </div>
                          <div className="text-red-400 text-xs">
                            ❌ No calificado - Nurturing
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {guide.mockupType === "dashboard" && (
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-3 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">
                          Pipeline Visual
                        </span>
                        <span className="text-white/60 text-xs">
                          Tu dashboard personalizado
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
                          <div className="text-2xl font-bold text-blue-400">
                            47
                          </div>
                          <div className="text-blue-300 text-xs">
                            Leads Nuevos
                          </div>
                        </div>
                        <div className="bg-yellow-500/20 rounded-lg p-4 text-center border border-yellow-500/30">
                          <div className="text-2xl font-bold text-yellow-400">
                            23
                          </div>
                          <div className="text-yellow-300 text-xs">
                            En Seguimiento
                          </div>
                        </div>
                        <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
                          <div className="text-2xl font-bold text-green-400">
                            12
                          </div>
                          <div className="text-green-300 text-xs">Ventas</div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-white/80 text-sm mb-3">
                          Templates de Follow-up Automáticos:
                        </div>
                        <div className="space-y-2">
                          <div className="text-green-400 text-xs">
                            ✅ VIP Track: "Hola Juan, vi que..."
                          </div>
                          <div className="text-yellow-400 text-xs">
                            ⏱️ Nurture Sequence: "María, te comparto..."
                          </div>
                          <div className="text-blue-400 text-xs">
                            📧 Educational: "Carlos, aquí tienes..."
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {guide.mockupType === "architecture" && (
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-3 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">
                          Sistema Completo
                        </span>
                        <span className="text-white/60 text-xs">
                          Todo integrado
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                          <span className="text-green-400">📝</span>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">
                              Formularios Propios
                            </div>
                            <div className="text-green-300 text-xs">
                              Sin facturas de Typeform que suben 📈
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
                          <span className="text-blue-400">🎯</span>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">
                              Asignación Automática
                            </div>
                            <div className="text-blue-300 text-xs">
                              Leads van al closer correcto
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-purple-500/20 rounded-lg p-3 border border-purple-500/30">
                          <span className="text-purple-400">💳</span>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">
                              Pagos + Acceso
                            </div>
                            <div className="text-purple-300 text-xs">
                              Todo automatizado
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-orange-500/20 rounded-lg p-3 border border-orange-500/30">
                          <span className="text-orange-400">👥</span>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">
                              Niveles de Acceso
                            </div>
                            <div className="text-orange-300 text-xs">
                              Admin • Closer • Support
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Complexity reality check */}
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-red-400 text-xl">😅</span>
                    <div>
                      <h4 className="text-red-300 font-medium text-sm mb-2">
                        Real Talk:
                      </h4>
                      <p className="text-red-200/80 text-sm leading-relaxed">
                        {index === 0
                          ? "Vas a necesitar analizar cientos de leads, hacer pruebas A/B, y ajustar los scores constantemente. Son semanas de trabajo."
                          : index === 1
                          ? "Crear templates personalizados, configurar automatizaciones, diseñar reportes... esto se pone técnico rápido."
                          : "Integrar pagos, gestión de acceso, niveles de usuarios, formularios custom... necesitas ser prácticamente un developer."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Reality Check + CTA */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-4">
                No manches... ¿En serio vas a hacer todo esto?
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Mira, sí se puede. Pero son{" "}
                <strong className="text-red-400">3-6 meses</strong> de trabajo
                técnico intenso. Mientras tú estás configurando webhooks, tu
                competencia está cerrando deals.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 text-2xl">💡</span>
                <div className="text-left">
                  <h4 className="text-amber-300 font-medium mb-2">
                    Creator-to-Creator Real Talk:
                  </h4>
                  <p className="text-amber-200/90 leading-relaxed">
                    "¿Por qué no haces lo que mejor haces (crear contenido) y
                    dejas que nosotros nos hagamos cargo de esto? En lugar de
                    romperte la cabeza 6 meses, tienes todo funcionando en 2
                    semanas."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/join"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Sí, mejor que lo hagan ustedes</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.button
                className="inline-flex items-center gap-3 bg-white/10 text-white px-6 py-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <span>No, prefiero hacerlo yo (masoquista 😅)</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default GuidesSection;
