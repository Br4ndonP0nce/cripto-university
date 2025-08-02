"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  DollarSign,
  Users,
  ExternalLink,
  CheckCircle,
  Info,
  ArrowLeft,
  Scale,
  FileText,
  TrendingUp,
} from "lucide-react";

const DisclaimerPage: React.FC = () => {
  const disclaimerSections = [
    {
      id: "payments",
      icon: DollarSign,
      title: "Política de Pagos",
      color: "green",
      content: [
        "CriptoUniversity NO recibe pagos directos de los usuarios por nuestros servicios educativos.",
        "Toda inversión y depósito se realiza exclusivamente en las cuentas personales del usuario en plataformas de terceros.",
        "Los usuarios mantienen control total y absoluto sobre sus fondos en todo momento.",
        "Nunca solicitamos transferencias directas a cuentas de CriptoUniversity.",
      ],
    },
    {
      id: "investments",
      icon: TrendingUp,
      title: "Control de Inversiones",
      color: "blue",
      content: [
        "Todas las inversiones se realizan en cuentas personales del usuario bajo su propio control.",
        "CriptoUniversity no tiene acceso, no maneja, ni administra los fondos de los usuarios.",
        "Cada usuario es responsable de sus propias decisiones de inversión.",
        "Las plataformas de trading son servicios de terceros independientes a CriptoUniversity.",
      ],
    },
    {
      id: "affiliations",
      icon: Users,
      title: "Afiliaciones y Comisiones",
      color: "purple",
      content: [
        "CriptoUniversity es afiliado oficial de diversas plataformas de trading de criptomonedas.",
        "Ganamos comisiones por referidos cuando los usuarios se registran a través de nuestros enlaces.",
        "Estas comisiones no representan costo adicional para el usuario.",
        "Las comisiones son pagadas directamente por las plataformas de trading, no por los usuarios.",
        "Esta es nuestra única fuente de ingresos y nos permite mantener el contenido educativo gratuito.",
      ],
    },
    {
      id: "advisory",
      icon: AlertTriangle,
      title: "Asesoría Financiera",
      color: "amber",
      content: [
        "CriptoUniversity NO ofrece asesoría financiera personalizada.",
        "Todo nuestro contenido es exclusivamente educativo e informativo.",
        "No proporcionamos recomendaciones de inversión específicas para situaciones individuales.",
        "Los usuarios deben consultar con asesores financieros licenciados para consejos personalizados.",
        "Las señales de trading son para propósitos educativos y no constituyen asesoría financiera.",
      ],
    },
    {
      id: "risks",
      icon: Shield,
      title: "Advertencias de Riesgo",
      color: "red",
      content: [
        "El trading de criptomonedas conlleva riesgos significativos de pérdida financiera.",
        "Los precios de las criptomonedas son altamente volátiles y pueden fluctuar drásticamente.",
        "Nunca invierta más de lo que puede permitirse perder completamente.",
        "El rendimiento pasado no garantiza resultados futuros.",
        "Todas las inversiones en criptomonedas deben considerarse de alto riesgo.",
      ],
    },
    {
      id: "responsibility",
      icon: Scale,
      title: "Responsabilidad del Usuario",
      color: "indigo",
      content: [
        "Cada usuario es totalmente responsable de sus decisiones de inversión.",
        "CriptoUniversity no se hace responsable por pérdidas financieras de los usuarios.",
        "Los usuarios deben realizar su propia investigación antes de invertir.",
        "Es responsabilidad del usuario verificar la legalidad del trading de criptos en su jurisdicción.",
        "Los usuarios deben cumplir con todas las regulaciones fiscales aplicables.",
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Dark Dotted Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mt-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Disclaimer Legal
            </h1>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Información legal importante sobre CriptoUniversity, nuestros
            servicios y responsabilidades.
          </p>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            <Info className="w-4 h-4" />
            <span className="font-semibold text-sm">Última actualización</span>
          </div>
          <p className="text-gray-300 text-sm">
            Este documento fue actualizado por última vez el{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            . Nos reservamos el derecho de modificar estos términos en cualquier
            momento.
          </p>
        </motion.div>

        {/* Disclaimer Sections */}
        <div className="space-y-8">
          {disclaimerSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-${section.color}-500/5 border border-${section.color}-400/20 rounded-2xl p-6 lg:p-8`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 bg-${section.color}-500 rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <section.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl font-bold text-white">
                    {section.title}
                  </h2>

                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle
                          className={`w-4 h-4 text-${section.color}-400 flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-gray-300 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 lg:p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/20 rounded-2xl"
        >
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Aviso Importante</h3>
              <p className="text-gray-300 leading-relaxed">
                Al utilizar los servicios de CriptoUniversity, usted acepta y
                comprende todos los términos establecidos en este disclaimer. Si
                no está de acuerdo con algún punto, le recomendamos no utilizar
                nuestros servicios. Para cualquier duda legal específica,
                consulte con un abogado especializado en su jurisdicción.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact for Legal Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 text-center p-6 bg-white/5 border border-white/10 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-3">
            ¿Preguntas Legales?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Si tiene preguntas específicas sobre este disclaimer, puede
            contactarnos:
          </p>
          <Link
            href="mailto:correo@criptouniversity.com"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <span>correo@criptouniversity.com</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Volver a CriptoUniversity
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
