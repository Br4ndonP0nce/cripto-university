"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  FileText,
  ArrowLeft,
  Scale,
  Users,
  Lock,
  ExternalLink,
  Info,
  CheckCircle,
} from "lucide-react";
import { date } from "zod/v4";

const DisclaimerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "terms" | "privacy" | "disclaimer"
  >("terms");
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 z-0 bg-black" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mt-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-6 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oxanium font-bold leading-tight">
            <span className="text-brand-amber">Términos</span>
            <br />
            <span className="text-white">Legales</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-aleo">
            Términos y condiciones, política de privacidad y disclaimer legal de
            CriptoUniversity
          </p>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-brand-amber hover:text-brand-amber/80 transition-colors duration-200 font-aleo"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-xl p-1">
            <button
              onClick={() => setActiveTab("terms")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "terms"
                  ? "bg-brand-amber text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Términos y Condiciones
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "privacy"
                  ? "bg-brand-amber text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Política de Privacidad
            </button>
            <button
              onClick={() => setActiveTab("disclaimer")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "disclaimer"
                  ? "bg-brand-amber text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Disclaimer Legal
            </button>
          </div>
        </motion.div>

        {/* TÉRMINOS Y CONDICIONES */}
        {activeTab === "terms" && (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-10 shadow-lg shadow-black/20 mb-12"
          >
            <div className="flex items-center space-x-3 mb-8">
              <FileText className="w-8 h-8 text-brand-amber" />
              <h2 className="text-3xl font-bold text-white font-oxanium">
                TÉRMINOS Y CONDICIONES DE USO
              </h2>
            </div>

            <div className="space-y-8 text-gray-300 font-aleo">
              <p className="text-sm text-gray-400">
                Última actualización: 18 de agosto de 2025
              </p>

              <p className="text-lg">
                Bienvenido a CriptoUniversity.com. Al acceder y utilizar este
                sitio web, aceptas los siguientes términos y condiciones. Te
                recomendamos leerlos detenidamente antes de utilizar nuestros
                servicios.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Objeto del Sitio
                  </h3>
                  <p>
                    CriptoUniversity.com es una plataforma de educación gratuita
                    enfocada en criptomonedas, trading y finanzas digitales.
                    Ofrecemos acceso a contenido educativo, sesiones en vivo,
                    señales de inversión y grupos privados, exclusivamente a
                    usuarios que cumplan los requisitos de activación
                    establecidos en este documento.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. Gratuidad y Condición de Acceso
                  </h3>
                  <div className="space-y-3">
                    <p>
                      El contenido de CriptoUniversity es 100% gratuito para
                      todos los usuarios registrados.
                    </p>
                    <p>
                      Para acceder al curso completo y a los grupos privados
                      (Telegram, Discord, etc.), el usuario deberá realizar una
                      inversión mínima de S/.100 soles o $30 USD en su propia
                      cuenta personal de Blofin.com, utilizando un enlace de
                      referido proporcionado por CriptoUniversity.
                    </p>
                    <p>
                      Este proceso es obligatorio para validar el compromiso del
                      usuario con su formación y asegurar el buen uso de los
                      recursos ofrecidos.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Modelo de Afiliación
                  </h3>
                  <p>
                    CriptoUniversity participa en programas de afiliación con
                    exchanges y plataformas cripto como Blofin.com, y puede
                    recibir comisiones por referidos. El usuario no paga ningún
                    costo adicional por registrarse en estas plataformas usando
                    nuestros enlaces.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Política de Privacidad y Uso de Datos
                  </h3>
                  <div className="space-y-3">
                    <p>
                      Los datos proporcionados por el usuario (nombre, correo,
                      número de WhatsApp, país) se almacenan con el único
                      propósito de:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Validar su inscripción</li>
                      <li>Comunicarse con el equipo de soporte</li>
                      <li>Ofrecer acceso al contenido exclusivo</li>
                    </ul>
                    <p>
                      CriptoUniversity no venderá ni compartirá esta información
                      con terceros no relacionados.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    5. No Asesoría Financiera
                  </h3>
                  <p>
                    Toda la información proporcionada en CriptoUniversity,
                    incluyendo cursos, señales, entrevistas y sesiones en vivo,
                    es con fines exclusivamente educativos. No somos asesores
                    financieros ni garantizamos rendimientos. Cualquier
                    inversión que realices es bajo tu propia responsabilidad.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    6. Responsabilidad del Usuario
                  </h3>
                  <div className="space-y-3">
                    <p>Es responsabilidad del usuario:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Usar los enlaces de afiliado correctos</li>
                      <li>
                        Enviar correctamente su comprobante de inversión al
                        canal oficial de validación (WhatsApp)
                      </li>
                      <li>
                        Cumplir con las normas de convivencia en las comunidades
                      </li>
                      <li>No compartir el acceso con terceros</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    7. Suspensión o Restricción de Acceso
                  </h3>
                  <div className="space-y-3">
                    <p>
                      Nos reservamos el derecho de restringir el acceso o
                      eliminar el acceso a cualquier usuario que:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        Use lenguaje ofensivo, fraudulento o spam en los canales
                      </li>
                      <li>
                        Comparta enlaces no autorizados o realice promoción de
                        terceros
                      </li>
                      <li>
                        Infrinja estos términos o genere daño a la comunidad
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    8. Modificaciones
                  </h3>
                  <p>
                    CriptoUniversity se reserva el derecho de actualizar estos
                    términos y condiciones en cualquier momento. Cualquier
                    cambio será publicado en esta misma página y entrará en
                    vigor de forma inmediata.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    9. Contacto
                  </h3>
                  <p>
                    Si tienes dudas, puedes escribirnos directamente a nuestro
                    canal oficial de WhatsApp, disponible en la web, o por
                    correo a:
                    <br />
                    📩 contacto@criptouniversity.com
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    10. Seguridad de la Información
                  </h3>
                  <div className="space-y-3">
                    <p>
                      La seguridad de tu información es nuestra prioridad. En
                      CriptoUniversity, implementamos medidas técnicas y
                      organizativas de alto nivel para proteger tus datos
                      personales frente a accesos no autorizados, pérdidas,
                      alteraciones o divulgaciones indebidas.
                    </p>
                    <p>
                      Nuestras bases de datos están respaldadas por
                      infraestructuras que cumplen con los más altos estándares
                      internacionales de seguridad, incluyendo:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Certificaciones ISO 27001, SOC 1, SOC 2 y SOC 3</li>
                      <li>
                        Cumplimiento con normativas globales de protección de
                        datos como el GDPR
                      </li>
                      <li>
                        Cumplimiento con HIPAA en caso de acuerdos de asociación
                        comercial (BAA)
                      </li>
                    </ul>
                    <p>
                      Puedes confiar en que tus datos están seguros con nosotros
                      y que serán utilizados exclusivamente para los fines
                      indicados en nuestra plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* POLÍTICA DE PRIVACIDAD */}
        {activeTab === "privacy" && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-10 shadow-lg shadow-black/20 mb-12"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Lock className="w-8 h-8 text-brand-amber" />
              <h2 className="text-3xl font-bold text-white font-oxanium">
                POLÍTICA DE PRIVACIDAD
              </h2>
            </div>

            <div className="space-y-8 text-gray-300 font-aleo">
              <p className="text-sm text-gray-400">
                Última actualización: 18 de agosto de 2025
              </p>

              <p className="text-lg">
                En CriptoUniversity.com, valoramos tu privacidad y nos
                comprometemos a proteger tu información personal. Esta Política
                de Privacidad describe cómo recopilamos, usamos, almacenamos y
                protegemos tus datos, y qué derechos tienes sobre ellos.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Información que recopilamos
                  </h3>
                  <div className="space-y-3">
                    <p>
                      Recopilamos los siguientes datos personales a través de
                      formularios en nuestro sitio web:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Nombre completo</li>
                      <li>Correo electrónico</li>
                      <li>Número de WhatsApp</li>
                      <li>País de residencia</li>
                    </ul>
                    <p>
                      Estos datos son ingresados voluntariamente por el usuario
                      al registrarse para acceder a nuestros cursos y
                      beneficios.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. Uso de la información
                  </h3>
                  <div className="space-y-3">
                    <p>Utilizamos tus datos personales para:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Validar tu registro como alumno</li>
                      <li>
                        Comunicarte novedades, actualizaciones o soporte
                        relacionado al curso
                      </li>
                      <li>
                        Proporcionarte acceso a nuestros grupos privados
                        (Telegram, Discord)
                      </li>
                      <li>
                        Garantizar el cumplimiento de los requisitos para
                        activar tu acceso
                      </li>
                      <li>
                        Contactarte para verificar tu depósito en plataformas
                        afiliadas como Blofin
                      </li>
                    </ul>
                    <p>
                      No vendemos, alquilamos ni compartimos tus datos
                      personales con terceros no relacionados.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Base legal para el tratamiento de tus datos
                  </h3>
                  <div className="space-y-3">
                    <p>El tratamiento de tus datos se basa en:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        Tu consentimiento explícito al completar nuestro
                        formulario
                      </li>
                      <li>
                        La necesidad de establecer una relación educativa y de
                        servicio contigo como usuario de nuestra plataforma
                      </li>
                    </ul>
                    <p>
                      Puedes retirar tu consentimiento en cualquier momento
                      escribiéndonos a contacto@criptouniversity.com
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Seguridad de tu información
                  </h3>
                  <div className="space-y-3">
                    <p>
                      La seguridad de tu información es nuestra prioridad.
                      Nuestras bases de datos están respaldadas por
                      infraestructuras que cumplen con altos estándares
                      internacionales, incluyendo:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Certificaciones ISO 27001, SOC 1, SOC 2 y SOC 3</li>
                      <li>
                        Cumplimiento con GDPR (Reglamento General de Protección
                        de Datos)
                      </li>
                      <li>
                        Cumplimiento con HIPAA, cuando se aplica mediante
                        acuerdo BAA
                      </li>
                    </ul>
                    <p>
                      Aplicamos medidas técnicas y organizativas para garantizar
                      la confidencialidad, integridad y disponibilidad de tus
                      datos.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    5. Retención de datos
                  </h3>
                  <p>
                    Tus datos serán almacenados durante el tiempo necesario para
                    los fines mencionados en esta política, o hasta que tú
                    solicites su eliminación.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    6. Servicios de terceros
                  </h3>
                  <p>
                    Trabajamos con plataformas como Blofin.com a través de
                    programas de afiliación. Al hacer clic en nuestros enlaces
                    de referido y registrarte en sus servicios, estarás sujeto a
                    las políticas de privacidad propias de dichos terceros. Te
                    recomendamos revisarlas directamente en sus sitios
                    oficiales.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    7. Tus derechos como usuario
                  </h3>
                  <div className="space-y-3">
                    <p>Tienes derecho a:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Acceder a tus datos personales</li>
                      <li>Rectificar información incorrecta</li>
                      <li>Solicitar la eliminación de tus datos</li>
                      <li>Oponerte al tratamiento de tus datos</li>
                      <li>Retirar tu consentimiento en cualquier momento</li>
                    </ul>
                    <p>
                      Puedes ejercer estos derechos escribiendo a:
                      contacto@criptouniversity.com
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    8. Uso de cookies
                  </h3>
                  <p>
                    Actualmente no utilizamos cookies en el sitio. Si en el
                    futuro se implementan, lo notificaremos de forma clara y
                    transparente, respetando tu consentimiento.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    9. Cambios en la política de privacidad
                  </h3>
                  <p>
                    CriptoUniversity puede modificar esta política en cualquier
                    momento. Te recomendamos revisarla periódicamente. Los
                    cambios serán efectivos desde su publicación en esta página.
                  </p>
                </div>

                <div className="border-l-4 border-brand-amber pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    10. Contacto
                  </h3>
                  <p>
                    Si tienes preguntas sobre esta Política de Privacidad o
                    sobre tus datos personales, puedes escribirnos a:
                    <br />
                    📩 contacto@criptouniversity.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* DISCLAIMER LEGAL */}
        {activeTab === "disclaimer" && (
          <motion.div
            key="disclaimer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-10 shadow-lg shadow-black/20 mb-12"
          >
            <div className="flex items-center space-x-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-brand-amber" />
              <h2 className="text-3xl font-bold text-white font-oxanium">
                DISCLAIMER LEGAL
              </h2>
            </div>

            <div className="space-y-6 text-gray-300 font-aleo text-lg leading-relaxed">
              <p>
                CriptoUniversity.com es una plataforma educativa gratuita. No
                somos una entidad financiera ni brindamos asesoría de inversión
                personalizada.
              </p>

              <p>
                Toda la información proporcionada en nuestros cursos, sesiones
                en vivo, grupos privados, señales o entrevistas tiene fines
                exclusivamente informativos y educativos. No garantizamos
                rendimientos, beneficios ni resultados específicos derivados del
                uso de nuestro contenido.
              </p>

              <p>
                Cada usuario es responsable de sus decisiones financieras y del
                uso de su capital en plataformas de terceros como Blofin.com o
                cualquier otro exchange vinculado.
              </p>

              <p>
                CriptoUniversity no recibe pagos directos de los usuarios. Toda
                inversión realizada se efectúa en cuentas personales,
                controladas única y exclusivamente por el usuario. Nuestra
                plataforma puede recibir comisiones por programas de afiliación
                con empresas del ecosistema cripto.
              </p>

              <p className="text-amber-400 font-semibold">
                Al registrarte y participar en CriptoUniversity, reconoces haber
                leído y aceptado este disclaimer, así como nuestros términos y
                condiciones y política de privacidad.
              </p>
            </div>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 text-center p-6 bg-white/5 backdrop-blur-sm rounded-3xl shadow-lg shadow-black/20"
        >
          <h3 className="text-lg font-semibold text-white mb-3 font-oxanium">
            ¿Preguntas sobre estos términos?
          </h3>
          <p className="text-gray-400 text-sm mb-4 font-aleo">
            Si tienes preguntas específicas sobre nuestros términos legales,
            puedes contactarnos:
          </p>
          <Link
            href="mailto:contacto@criptouniversity.com"
            className="inline-flex items-center space-x-2 text-brand-amber hover:text-brand-amber/80 transition-colors duration-200 font-aleo"
          >
            <span>contacto@criptouniversity.com</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-amber text-black font-bold rounded-2xl shadow-lg hover:shadow-brand-amber/25 transition-all duration-300 font-aleo"
            >
              Volver a CriptoUniversity
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced Ambient Effects */}
      <div className="absolute top-1/6 left-1/6 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/6 right-1/6 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl animate-pulse opacity-80"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl animate-pulse opacity-70"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/12 rounded-full blur-3xl animate-pulse opacity-75"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

export default DisclaimerPage;
