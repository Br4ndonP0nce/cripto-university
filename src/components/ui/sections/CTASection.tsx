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
    line1: "Sigue explorando este demo",
    line2: "Da click en el botón de abajo",
    line3: "Para explorar el CRM ",
  },
  subheading = "Join thousands of developers already building the future of DeFi with Eco's powerful infrastructure.",
  primaryCTA = {
    text: "CRM",
    href: "/admin",
  },

  features = [
    "Integration in under 10 minutes",
    "Multi-chain compatibility",
    "Enterprise-grade security",
    "24/7 developer support",
  ],
  backgroundColor = "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
}: CTASectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to create dynamic effects
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
      className={`${backgroundColor}  relative overflow-hidden py-20 px-6`}
    >
      {/* Dynamic background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-purple-500/15 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-[60%] left-[20%] w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

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
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
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
                >
                  {heading.line3}
                </motion.span>
              </>
            )}
          </motion.h2>
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
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm font-bold">e</span>
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
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
