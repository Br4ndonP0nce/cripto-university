"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CTASectionProps {
  heading?: {
    line1: string;
    line2: string;
    line3?: string;
  };
  subheading?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  features?: string[];
  backgroundColor?: string;
}

const CTASection = ({
  heading = {
    line1: "¿Ya viste qué tan",
    line2: "complicado es esto?",
    line3: "Seamos honestos...",
  },
  subheading = "Creator-to-Creator: Acabas de ver una guía que te tomaría 3-6 meses implementar correctamente. Mientras tú estás configurando webhooks, tu competencia está cerrando deals. ¿Por qué no haces lo que mejor sabes hacer y dejas que nosotros nos encarguemos?",
  primaryCTA = {
    text: "Sí, mejor que ustedes lo hagan",
    href: "/join",
  },

  features = [
    "Todo el sistema funcionando en 2 semanas",
    "Forms propios (adiós facturas de Typeform)",
    "Configuración + implementación + seguimiento",
    "Te enfocas en crear, nosotros en automatizar",
  ],
  backgroundColor = "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
}: CTASectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0.8]
  );
  const ctaScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);

  return (
    <div
      ref={sectionRef}
      className={`${backgroundColor} relative overflow-hidden py-20 px-6`}
    >
      {/* Dynamic background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-red-500/15 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-[60%] left-[20%] w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main heading with dynamic positioning */}
        <motion.div
          className="text-center mb-16"
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight mb-8"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {heading.line1}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent"
            >
              {heading.line2}
            </motion.span>
            {heading.line3 && (
              <>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl lg:text-7xl text-white/80"
                >
                  {heading.line3}
                </motion.span>
              </>
            )}
          </motion.h2>

          {/* Reality Check */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">😅</span>
                <div>
                  <h3 className="text-red-300 font-bold text-xl mb-4">
                    Hagamos cuentas reales:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="text-white font-medium mb-3">
                        Si lo haces tú mismo:
                      </h4>
                      <ul className="space-y-2 text-red-200">
                        <li>⏰ 3-6 meses de tu tiempo</li>
                        <li>🧠 Aprender 15+ herramientas técnicas</li>
                        <li>😤 Frustraciones cuando algo no funciona</li>
                        <li>💸 Oportunidad perdida mientras configuras</li>
                        <li>😴 Noches sin dormir debuggeando</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">
                        Si nosotros lo hacemos:
                      </h4>
                      <ul className="space-y-2 text-green-200">
                        <li>⚡ 2 semanas y está funcionando</li>
                        <li>🎯 Tú sigues creando contenido</li>
                        <li>😌 Duermes tranquilo sabiendo que funciona</li>
                        <li>
                          📈 Empiezas a generar más revenue inmediatamente
                        </li>
                        <li>🤝 Support cuando lo necesites</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            {subheading}
          </motion.p>
        </motion.div>

        {/* What you get when we do it */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Cuando nosotros lo hacemos, obtienes:
          </h3>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div className="text-white/90 leading-relaxed">{feature}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Choice */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Tienes 2 opciones:
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Option 1: DIY */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <h4 className="text-red-300 font-bold text-lg mb-4">
                  🔨 Opción 1: Hazlo Tú
                </h4>
                <ul className="text-red-200 text-sm space-y-2 mb-4">
                  <li>• 3-6 meses de trabajo intenso</li>
                  <li>• Aprender webhooks, APIs, automatizaciones</li>
                  <li>• Debuggear cuando algo falle</li>
                  <li>• Perder leads mientras configuras</li>
                </ul>
                <div className="text-red-300 font-medium">
                  Costo real: $47K+ en oportunidad perdida
                </div>
              </div>

              {/* Option 2: We do it */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-green-300 font-bold text-lg mb-4">
                  🚀 Opción 2: Nosotros Lo Hacemos
                </h4>
                <ul className="text-green-200 text-sm space-y-2 mb-4">
                  <li>• 2 semanas y está funcionando</li>
                  <li>• Tú sigues haciendo lo que mejor sabes</li>
                  <li>• Sistema probado y optimizado</li>
                  <li>• Empiezas a ganar inmediatamente</li>
                </ul>
                <div className="text-green-300 font-medium">
                  ROI: +156% revenue promedio
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          style={{ scale: ctaScale }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        >
          {/* Primary CTA */}
          <motion.a
            href={primaryCTA.href}
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">🙋‍♂️</span>
              </div>
              {primaryCTA.text}
              <motion.span
                className="text-2xl"
                animate={{ x: [0, 6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.button
            className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-5 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>No, prefiero sufrir 6 meses 😅</span>
          </motion.button>
        </motion.div>

        {/* Final Brandon message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">Brandon</div>
                <div className="text-white/60 text-sm">
                  Creator • System Architect
                </div>
              </div>
            </div>

            <blockquote className="text-white/90 text-xl leading-relaxed italic mb-6">
              "Mira, puedes hacerlo tú mismo. Tienes la guía completa arriba.
              Pero después de 6 meses configurando sistemas para otros creators,
              te puedo decir que el 95% prefiere enfocarse en lo que saben hacer
              bien y dejar que alguien más se encargue de la parte técnica. Tu
              call."
            </blockquote>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>200+ creators ya automatizados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Promedio: +156% revenue increase</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Setup en 2 semanas vs 6 meses DIY</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final creator-to-creator message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 text-lg max-w-3xl mx-auto">
            Creator-to-Creator: Tu tiempo vale más que configurar webhooks. Tu
            visión merece infraestructura que la sostenga.
            <br />
            <span className="text-white/70 font-medium">
              Tú creas, nosotros automatizamos.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
