"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqData = [
    {
      question: "¿Qué es CriptoUniversity?",
      answer:
        "CriptoUniversity es una plataforma educativa gratuita donde aprenderás todo sobre criptomonedas e inversiones, desde cero. Accede a cursos en video, sesiones en vivo, señales diarias, entrevistas con expertos y mucho más.",
    },
    {
      question: "¿Tengo que pagar por el curso?",
      answer:
        "No. Todos los cursos y contenidos son totalmente gratuitos. Sin embargo, para acceder al contenido y a la comunidad privada, requerimos que hagas una inversión mínima de S/.100 o $30 USD en tu propia cuenta personal de Blofin, usando nuestro link exclusivo. No nos pagas a nosotros.",
    },
    {
      question: "¿Por qué piden una inversión mínima?",
      answer:
        "Porque queremos asegurarnos de que los estudiantes realmente se comprometan a invertir en su futuro. Esta pequeña inversión demuestra que estás listo para aplicar lo que aprendes y dar tu primer paso en el mundo cripto. Es tu dinero, en tu cuenta, bajo tu control.",
    },
    {
      question: "¿Qué es Blofin?",
      answer:
        "Blofin es un exchange global de criptomonedas, seguro, regulado y fácil de usar. CriptoUniversity está actualmente powered by Blofin, lo que significa que nuestra comunidad utiliza esta plataforma para invertir, hacer copytrading y acceder a señales diarias.",
    },
  ];

  return (
    <div className=" w-full bg-black relative overflow-hidden" id="FAQ">
      {/* Dark Background */}

      <div className="relative z-20  flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oxanium font-bold leading-tight">
            <span className="text-brand-amber">Preguntas</span>
            <br />
            <span className="text-white">Frecuentes</span>
          </h1>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg shadow-black/20">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-lg sm:text-xl font-semibold text-white hover:text-brand-amber transition-colors duration-300 font-oxanium py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base sm:text-lg leading-relaxed font-aleo pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Ambient Effects */}
      <div className="absolute top-1/6 left-1/6 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse duration-1000" />
    </div>
  );
};

export default FAQSection;
