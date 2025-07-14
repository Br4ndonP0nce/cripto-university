"use client";

import React from "react";
import { motion } from "framer-motion";

interface EcoLandingPageProps {
  heading?: {
    line1: string;
    line2: string;
  };
  description?: string;
  ctaButton?: {
    text: string;
    href: string;
  };
}

const HeroSection = ({
  heading = {
    line1: "Guía Completa:",
    line2: "Automatiza Tus Leads en 3 Pasos",
  },
  description = "Creator-to-Creator: Te voy a enseñar exactamente cómo automatizar tu sistema de leads para generar +$47K adicionales este año. Tutorial paso a paso, sin fluff, directo al grano.",
  ctaButton = {
    text: "Ver la guía completa (5 min de lectura)",
    href: "#guia",
  },
}: EcoLandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      {/* Guide elements floating */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-lg bg-green-500/10 blur-2xl animate-pulse flex items-center justify-center">
        <span className="text-green-400 text-4xl">📊</span>
      </div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-lg bg-blue-600/10 blur-3xl animate-pulse flex items-center justify-center"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-blue-400 text-5xl">🎯</span>
      </div>
      <div
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-lg bg-purple-400/10 blur-2xl animate-pulse flex items-center justify-center"
        style={{ animationDelay: "2s" }}
      >
        <span className="text-purple-400 text-3xl">⚡</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto mt-20 mb-10">
          {/* Guide Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="inline-flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-6">
              <span className="text-green-300 text-sm font-medium mr-2">
                📚
              </span>
              <span className="text-green-300 text-sm font-medium">
                GUÍA GRATUITA
              </span>
              <span className="text-green-300 text-sm font-medium ml-2">
                • Creator-to-Creator
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heading.line1}
            </motion.h1>
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-light bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {heading.line2}
            </motion.h1>
          </motion.div>

          {/* Guide Preview */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex flex-wrap justify-center gap-6 text-center max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-[200px]">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white font-medium text-sm">PASO 1</div>
                <div className="text-white/60 text-xs">Califica tus leads</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-[200px]">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-white font-medium text-sm">PASO 2</div>
                <div className="text-white/60 text-xs">
                  Estructura tu pipeline
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-[200px]">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-white font-medium text-sm">PASO 3</div>
                <div className="text-white/60 text-xs">Automatiza todo</div>
              </div>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light max-w-4xl mx-auto">
              {description}
            </p>
          </motion.div>

          {/* What you'll learn preview */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-3xl mx-auto">
              <h3 className="text-white font-medium mb-4 text-lg">
                En esta guía vas a aprender:
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-left">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">
                    Cómo calificar leads automáticamente
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">
                    Pipeline visual con códigos de color
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">
                    Forms propios (adiós Typeform caro)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">
                    Sistema escalable para tu equipo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.a
              href={ctaButton.href}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-300 shadow-xl group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">📚</span>
                </div>
                {ctaButton.text}
                <motion.span
                  className="text-xl"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ↓
                </motion.span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.a>
          </motion.div>

          {/* Creator Credibility */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Brandon</div>
                <div className="text-white/60 text-sm">
                  System Architect • Creator
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              "He ayudado a 200+ creators a automatizar sus leads. Esta guía
              contiene exactamente los mismos pasos que uso para mis propios
              proyectos. No theory, only results."
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full mt-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
