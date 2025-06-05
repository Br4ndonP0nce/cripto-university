// app/template/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react";

// Import components
import Preloader from "@/components/ui/Preloader/EnhancedPreloader";

import FeaturesSection from "@/components/ui/sections/FeaturesSection";
import { StatsSection } from "@/components/ui/sections/StatsSection";
import { TestimonialsSection } from "@/components/ui/sections/TestimonialsSection";
import PricingSection from "@/components/ui/sections/PricingSection";
import CTASection from "@/components/ui/sections/CTASection";
import HeroSection from "@/components/ui/Hero/Hero";

const RealEstateTemplate = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Preloader logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Toast manager

  // Data for sections
  const heroData = {
    title: `Construye el <span class="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">futuro</span> de tu inmobiliaria`,
    subtitle:
      "Plataforma completa con CRM inteligente, formularios de alta conversión e infraestructura en la nube de nivel empresarial",
    stats: [
      { value: 850, label: "Inmobiliarias", prefix: "+" },
      { value: 89, label: "Más Ventas", suffix: "%" },
      { value: 24, label: "Setup Completo", suffix: "hrs" },
    ],
  };

  const featuresData = {
    title: `Todo lo que necesitas para <span class="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">dominar</span> el mercado inmobiliario`,
    subtitle:
      "Herramientas de nivel empresarial diseñadas específicamente para inmobiliarias modernas",
    features: [
      {
        icon: Target,
        title: "CRM Inmobiliario Inteligente",
        description:
          "Gestión completa de leads con IA integrada para scoring automático y seguimiento personalizado",
        features: [
          "Lead scoring con IA",
          "Automatización de seguimiento",
          "Análisis predictivo",
          "Integración WhatsApp",
        ],
      },
      {
        icon: Zap,
        title: "Formularios de Alta Conversión",
        description:
          "Formularios adaptativos que se optimizan automáticamente para maximizar la captación de leads",
        features: [
          "Diseño adaptativo",
          "A/B testing automático",
          "Capturas progresivas",
          "Anti-spam avanzado",
        ],
      },
      {
        icon: Shield,
        title: "Infraestructura Premium",
        description:
          "Hosting escalable y bases de datos optimizadas con seguridad de nivel bancario",
        features: [
          "99.99% uptime SLA",
          "CDN global",
          "Backups automáticos",
          "SSL empresarial",
        ],
      },
    ],
  };

  const statsData = {
    title: "Resultados que hablan por sí solos",
    subtitle:
      "Inmobiliarias de todos los tamaños ven resultados desde el primer mes",
    stats: [
      { stat: "+189%", label: "Incremento en leads", icon: TrendingUp },
      { stat: "-67%", label: "Tiempo en tareas manuales", icon: Clock },
      { stat: "+245%", label: "ROI promedio", icon: BarChart3 },
      { stat: "99.99%", label: "Disponibilidad garantizada", icon: Shield },
    ],
  };

  const testimonialsData = [
    {
      quote:
        "Transformó completamente nuestra operación. En 3 meses aumentamos las ventas 150% y reducimos costos operativos significativamente.",
      name: "María Elena Rodríguez",
      role: "Directora General",
      company: "Inmobiliaria Premier México",
      rating: 5,
    },
    {
      quote:
        "La mejor inversión tecnológica que hemos hecho. El ROI se pagó solo en 2 meses y ahora generamos 3x más leads calificados.",
      name: "Carlos Mendoza",
      role: "CEO",
      company: "Grupo Inmobiliario del Valle",
      rating: 5,
    },
  ];

  const pricingData = {
    title: "Inversión que se paga sola",
    subtitle: "Comienza con 40% de descuento por tiempo limitado",
    originalPrice: "$4,999",
    currentPrice: "$2,999",
    currency: "MXN",
    period: "/mes",
    discountText: "40% de descuento • Primeros 50 clientes",
    features: [
      "CRM completo con IA integrada",
      "Formularios ilimitados optimizados",
      "Hosting premium con CDN global",
      "Soporte 24/7 en español",
      "Implementación y migración gratuita",
      "Capacitación completa del equipo",
      "Actualizaciones automáticas",
      "Garantía de satisfacción 60 días",
    ],
  };

  const ctaData = {
    title: "¿Listo para liderar el futuro inmobiliario?",
    subtitle:
      "Únete a las +850 inmobiliarias que ya están creciendo exponencialmente",
    ctaText: "Solicitar Demo Personalizado",
    urgencyText: `Solo quedan <span class="text-amber-400 font-bold">12 espacios</span> disponibles con el 40% de descuento`,
  };

  if (isLoading) {
    return <Preloader isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Stats Section */}
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default RealEstateTemplate;
