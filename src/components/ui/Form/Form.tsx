"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { addLead } from "@/lib/firebase/db";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DarkVeil from "../animated/DarkVeil";

import {
  validateEmail,
  validateName,
  validatePhone,
  generateWhatsAppLink,
  COUNTRY_VALIDATIONS,
} from "@/lib/utils/phonevalidationutils";

// Question types
type QuestionType = "text" | "email" | "phone" | "select";

interface Option {
  id: string;
  text: string;
  flag?: string;
}

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  description?: string;
  options?: Option[];
}

// Updated questions for CriptoUniversity registration
const questions: Question[] = [
  {
    id: "name",
    text: "¿Cuál es tu nombre?",
    type: "text",
    required: true,
    description:
      "Necesitamos tu nombre para personalizar tu experiencia de aprendizaje.",
  },
  {
    id: "email",
    text: "¿Cuál es tu mejor correo?",
    type: "email",
    required: true,
    description:
      "Para enviarte acceso a los cursos y actualizaciones importantes.",
  },
  {
    id: "phone",
    text: "¿Cuál es tu número de WhatsApp?",
    type: "phone",
    required: true,
    description: "Para contactarte y agregarte a la comunidad privada.",
  },
  {
    id: "country",
    text: "¿De qué país eres?",
    type: "select",
    required: true,
    description: "Para personalizar el contenido según tu región.",
    options: [
      { id: "mx", text: "México", flag: "🇲🇽" },
      { id: "ar", text: "Argentina", flag: "🇦🇷" },
      { id: "pe", text: "Perú", flag: "🇵🇪" },
      { id: "co", text: "Colombia", flag: "🇨🇴" },
      { id: "cl", text: "Chile", flag: "🇨🇱" },
      { id: "br", text: "Brasil", flag: "🇧🇷" },
      { id: "ec", text: "Ecuador", flag: "🇪🇨" },
      { id: "ve", text: "Venezuela", flag: "🇻🇪" },
      { id: "uy", text: "Uruguay", flag: "🇺🇾" },
      { id: "py", text: "Paraguay", flag: "🇵🇾" },
      { id: "bo", text: "Bolivia", flag: "🇧🇴" },
      { id: "cr", text: "Costa Rica", flag: "🇨🇷" },
      { id: "pa", text: "Panamá", flag: "🇵🇦" },
      { id: "gt", text: "Guatemala", flag: "🇬🇹" },
      { id: "sv", text: "El Salvador", flag: "🇸🇻" },
      { id: "hn", text: "Honduras", flag: "🇭🇳" },
      { id: "ni", text: "Nicaragua", flag: "🇳🇮" },
      { id: "do", text: "República Dominicana", flag: "🇩🇴" },
      { id: "cu", text: "Cuba", flag: "🇨🇺" },
      { id: "us", text: "Estados Unidos", flag: "🇺🇸" },
      { id: "ca", text: "Canadá", flag: "🇨🇦" },
      { id: "es", text: "España", flag: "🇪🇸" },
      { id: "other", text: "Otro país", flag: "🌍" },
    ],
  },
];

// Generate country codes from COUNTRY_VALIDATIONS
const countryCodes = COUNTRY_VALIDATIONS.filter((c) => c.code !== "+999")
  .sort((a, b) => {
    const latinAmericanCodes = [
      "+52",
      "+55",
      "+54",
      "+57",
      "+56",
      "+51",
      "+58",
      "+593",
      "+591",
      "+598",
      "+595",
      "+507",
      "+503",
      "+502",
      "+504",
      "+505",
      "+53",
      "+509",
    ];

    const aIsLA = latinAmericanCodes.includes(a.code);
    const bIsLA = latinAmericanCodes.includes(b.code);

    const isCaribbean = (country: string) =>
      [
        "Dominican Republic",
        "Puerto Rico",
        "Jamaica",
        "Trinidad and Tobago",
        "Barbados",
      ].includes(country);
    const isNorthAmerica = (country: string) =>
      ["United States", "Canada"].includes(country);

    if (a.code === "+1" && b.code === "+1") {
      if (isCaribbean(a.country) && !isCaribbean(b.country)) return -1;
      if (!isCaribbean(a.country) && isCaribbean(b.country)) return 1;
      if (isNorthAmerica(a.country) && !isNorthAmerica(b.country)) return -1;
      if (!isNorthAmerica(a.country) && isNorthAmerica(b.country)) return 1;
      return a.country.localeCompare(b.country);
    }

    if (aIsLA && !bIsLA && b.code !== "+1") return -1;
    if (!aIsLA && bIsLA && a.code !== "+1") return 1;

    if (a.code === "+1" && !bIsLA) return -1;
    if (b.code === "+1" && !aIsLA) return 1;

    return a.country.localeCompare(b.country);
  })
  .map((c) => ({ code: c.code, country: c.country }));

// Main component
const CriptoUniversityForm: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [selectedCode, setSelectedCode] = useState("+52"); // Default to Mexico
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneValidationError, setPhoneValidationError] = useState<
    string | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus the input field when the question changes
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  }, [currentQuestion]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Validation function for current question
  const validateCurrentQuestion = (): string | null => {
    const currentQ = questions[currentQuestion];
    const currentValue = answers[currentQ.id];

    if (currentQ.required && (!currentValue || currentValue === "")) {
      return "Este campo es obligatorio";
    }

    if (currentValue) {
      switch (currentQ.type) {
        case "email":
          if (!validateEmail(currentValue)) {
            return "Por favor ingresa un correo electrónico válido";
          }
          break;
        case "phone":
          const phoneValidation = validatePhone(currentValue, selectedCode);
          if (!phoneValidation.isValid) {
            return phoneValidation.error || "Número de teléfono inválido";
          }
          break;
        case "text":
          if (currentQ.id === "name" && !validateName(currentValue)) {
            return "El nombre debe tener al menos 2 caracteres";
          }
          break;
      }
    }

    return null;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: e.target.value,
    });
    setError(null);
    setPhoneValidationError(null);
  };

  // Handle option selection
  const handleOptionSelect = (optionId: string, optionText: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: optionId,
      [`${questions[currentQuestion].id}_text`]: optionText,
    });
    setError(null);

    // Auto-advance to next question after selection
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  // Handle phone input with enhanced validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");

    const countryValidation = COUNTRY_VALIDATIONS.find(
      (c) => c.code === selectedCode
    );

    if (countryValidation && value.length <= countryValidation.maxLength) {
      const fullNumber = `${selectedCode} ${value}`;
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: fullNumber,
      });

      if (value.length >= countryValidation.minLength) {
        const validation = validatePhone(value, selectedCode);
        if (!validation.isValid) {
          setPhoneValidationError(validation.error || null);
        } else {
          setPhoneValidationError(null);
        }
      } else {
        setPhoneValidationError(null);
      }
    }

    setError(null);
  };

  // Navigate to next question
  const handleNext = () => {
    const validationError = validateCurrentQuestion();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  // Navigate to previous question
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all required fields
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const value = answers[question.id];

      if (question.required && (!value || value === "")) {
        setError(`Por favor responde la pregunta: ${question.text}`);
        setCurrentQuestion(i);
        setIsSubmitting(false);
        return;
      }

      // Additional validation for specific fields
      if (value) {
        switch (question.type) {
          case "email":
            if (!validateEmail(value)) {
              setError("Por favor ingresa un correo electrónico válido");
              setCurrentQuestion(i);
              setIsSubmitting(false);
              return;
            }
            break;
          case "phone":
            const phoneValidation = validatePhone(value, selectedCode);
            if (!phoneValidation.isValid) {
              setError(phoneValidation.error || "Número de teléfono inválido");
              setCurrentQuestion(i);
              setIsSubmitting(false);
              return;
            }
            break;
          case "text":
            if (question.id === "name" && !validateName(value)) {
              setError("El nombre debe tener al menos 2 caracteres");
              setCurrentQuestion(i);
              setIsSubmitting(false);
              return;
            }
            break;
        }
      }
    }

    try {
      // Format the lead data for Firebase
      const leadData = {
        name: answers.name || "",
        email: answers.email || "",
        phone: answers.phone || "",
        country: answers.country_text || answers.country || "",
        status: "student_pending" as const,
        registrationDate: new Date().toISOString(),
        source: "criptouniversity_form",
      };

      // Add to Firestore
      const leadId = await addLead(leadData);
      console.log("Student successfully registered with ID:", leadId);

      // Send data to n8n webhook via proxy
      try {
        const webhookResponse = await fetch("/api/n8n-proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: answers.phone || "",
            name: answers.name || "",
            email: answers.email || "",
            country: answers.country_text || answers.country || "",
            leadId: leadId,
            timestamp: new Date().toISOString(),
            source: "criptouniversity_form",
          }),
        });

        const webhookData = await webhookResponse.json();
        console.log("Webhook response:", webhookData);

        if (webhookResponse.ok) {
          console.log("Successfully sent data to n8n webhook");
        } else {
          console.warn(
            "Failed to send data to n8n webhook:",
            webhookResponse.status,
            webhookData
          );
        }
      } catch (webhookError) {
        console.error("Error sending to n8n webhook:", webhookError);
        // Don't fail the whole submission if webhook fails
      }

      setIsSubmitted(true);

      // Success toast
      toast.success("¡Registro exitoso!", {
        description:
          "Bienvenido a CriptoUniversity. Sigue los pasos para activar tu acceso.",
        duration: 5000,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        "Hubo un error al procesar tu registro. Por favor intenta de nuevo."
      );

      // Error toast
      toast.error("Error en el registro", {
        description: "Por favor intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle key press to submit on Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  // Render the current question
  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case "text":
        return (
          <div className="w-full">
            <Input
              ref={inputRef}
              type="text"
              value={answers[question.id] || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-0 border-b-2 border-brand-amber/30 focus:border-brand-amber py-3 px-1 text-lg text-white transition-colors placeholder:text-gray-400 rounded-none focus-visible:ring-0"
              placeholder={
                question.id === "name"
                  ? "Tu nombre completo"
                  : "Escribe tu respuesta"
              }
            />
          </div>
        );

      case "email":
        const emailValue = answers[question.id] || "";

        const getEmailValidationState = (email: string) => {
          if (!email) return { state: "empty", message: "" };

          const trimmed = email.trim();
          if (!trimmed.includes("@")) {
            return {
              state: "incomplete",
              message: "Formato de correo inválido",
            };
          }

          const parts = trimmed.split("@");
          if (parts.length !== 2) {
            return {
              state: "invalid",
              message: "Formato de correo inválido",
            };
          }

          const [localPart, domainPart] = parts;
          if (!localPart) {
            return {
              state: "incomplete",
              message: "",
            };
          }

          if (!domainPart) {
            return {
              state: "incomplete",
              message: "",
            };
          }

          if (!domainPart.includes(".")) {
            return {
              state: "incomplete",
              message: "",
            };
          }

          const domainParts = domainPart.split(".");
          const tld = domainParts[domainParts.length - 1];
          if (!tld || tld.length < 2) {
            return {
              state: "incomplete",
              message: "",
            };
          }

          if (/^\d+$/.test(tld)) {
            return {
              state: "invalid",
              message: "",
            };
          }

          if (validateEmail(trimmed)) {
            return { state: "valid", message: "Correo válido" };
          }

          return { state: "invalid", message: "Formato de correo inválido" };
        };

        const emailValidation = getEmailValidationState(emailValue);

        return (
          <div className="w-full">
            <Input
              ref={inputRef}
              type="email"
              value={emailValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full bg-transparent border-0 border-b-2 ${
                emailValidation.state === "valid"
                  ? "border-brand-amber focus:border-brand-amber/80"
                  : emailValidation.state === "invalid"
                  ? "border-red-400 focus:border-red-300"
                  : "border-brand-amber/30 focus:border-brand-amber"
              } py-3 px-1 text-lg text-white transition-colors placeholder:text-gray-400 rounded-none focus-visible:ring-0`}
              placeholder="ejemplo@correo.com"
            />

            {emailValue && (
              <div className="mt-2 text-xs">
                {emailValidation.state === "valid" && (
                  <span className="text-brand-amber flex items-center gap-1">
                    <span>✅</span> {emailValidation.message}
                  </span>
                )}
                {emailValidation.state === "incomplete" && (
                  <span className="text-yellow-400 flex items-center gap-1">
                    <span>⚠️</span> {emailValidation.message}
                  </span>
                )}
                {emailValidation.state === "invalid" && (
                  <span className="text-red-400 flex items-center gap-1">
                    <span>❌</span> {emailValidation.message}
                  </span>
                )}
              </div>
            )}

            <div className="text-xs text-gray-400 mt-1">
              Ejemplo: usuario@dominio.com
            </div>
          </div>
        );

      case "phone":
        const phoneValue = answers[question.id] || "";
        const nationalNumber = phoneValue.includes(selectedCode)
          ? phoneValue.replace(`${selectedCode} `, "").replace(/\D/g, "")
          : phoneValue.replace(/\D/g, "");

        const currentCountryValidation = COUNTRY_VALIDATIONS.find(
          (c) => c.code === selectedCode
        );

        return (
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 min-w-[70px] text-sm transition-all duration-200"
                >
                  {selectedCode}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </Button>

                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-md z-10 w-48 shadow-lg">
                    <ScrollArea className="h-40">
                      {countryCodes.map((country, index) => (
                        <button
                          key={`${country.code}-${country.country}-${index}`}
                          type="button"
                          className="block w-full text-left px-2 py-1.5 hover:bg-white/10 text-white text-xs transition-colors duration-200"
                          onClick={() => {
                            setSelectedCode(country.code);
                            setShowCountryDropdown(false);
                            setPhoneValidationError(null);
                            if (nationalNumber) {
                              setAnswers({
                                ...answers,
                                [questions[currentQuestion]
                                  .id]: `${country.code} ${nationalNumber}`,
                              });
                            }
                          }}
                        >
                          <span className="font-medium text-xs">
                            {country.code}
                          </span>
                          <span className="ml-1 text-xs truncate">
                            {country.country}
                          </span>
                        </button>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </div>

              <Input
                ref={inputRef}
                type="tel"
                value={nationalNumber}
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-0 border-b-2 border-brand-amber/30 focus:border-brand-amber py-3 px-1 text-lg text-white rounded-none focus-visible:ring-0 placeholder:text-gray-400"
                placeholder={currentCountryValidation?.example || "1234567890"}
                maxLength={currentCountryValidation?.maxLength || 15}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-400">
                <span className="text-brand-amber underline">
                  ¡Asegúrate de usar tu número de WhatsApp!
                </span>
                <br />
                {currentCountryValidation && (
                  <>
                    {nationalNumber.length >=
                      currentCountryValidation.minLength &&
                    nationalNumber.length <=
                      currentCountryValidation.maxLength &&
                    !phoneValidationError ? (
                      <span className="text-brand-amber">✅ Número válido</span>
                    ) : nationalNumber.length > 0 ? (
                      <span>
                        {nationalNumber.length}/
                        {currentCountryValidation.minLength}
                        {currentCountryValidation.minLength !==
                        currentCountryValidation.maxLength
                          ? `-${currentCountryValidation.maxLength}`
                          : ""}{" "}
                      </span>
                    ) : (
                      <span>
                        {currentCountryValidation.minLength}
                        {currentCountryValidation.minLength !==
                        currentCountryValidation.maxLength
                          ? `-${currentCountryValidation.maxLength}`
                          : ""}{" "}
                      </span>
                    )}
                  </>
                )}
              </div>

              {phoneValidationError && (
                <div className="text-xs text-red-300">
                  {phoneValidationError}
                </div>
              )}
            </div>

            {currentCountryValidation && (
              <div className="text-xs text-gray-400 mt-1">
                Ejemplo móvil: {selectedCode} {currentCountryValidation.example}
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <div className="w-full">
            <ScrollArea className="h-60 w-full border border-white/20 rounded-md bg-black/30 backdrop-blur-sm">
              <div className="p-1 space-y-1">
                {question.options?.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id, option.text)}
                    variant="outline"
                    className={`w-full text-left justify-start h-auto p-2 ${
                      answers[question.id] === option.id
                        ? "bg-brand-amber/20 border-brand-amber text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    } transition-all duration-200`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 w-3 h-3 rounded-full border flex items-center justify-center mr-2 ${
                          answers[question.id] === option.id
                            ? "border-brand-amber bg-brand-amber/20"
                            : "border-brand-amber/50"
                        }`}
                      >
                        {answers[question.id] === option.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-amber"></div>
                        )}
                      </div>
                      {option.flag && (
                        <span className="mr-1 text-sm">{option.flag}</span>
                      )}
                      <span className="text-xs">{option.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      default:
        return null;
    }
  };

  // If the form is submitted, show success message with Blofin investment steps
  if (isSubmitted) {
    const whatsappMessage = `¡Hola! Soy ${answers.name}. Acabo de registrarme en CriptoUniversity y he realizado la inversión mínima en Blofin. Adjunto mi comprobante para activar mi acceso completo a los cursos y la comunidad privada. ¡Gracias!`;

    return (
      <div className="min-h-screen w-full bg-black relative text-white">
        {/* DarkVeil Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>

        <div className="relative z-20 flex justify-center items-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/8 backdrop-blur-md rounded-xl p-4 max-w-lg w-full text-center border border-white/20 shadow-2xl shadow-black/50"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-12 h-12 bg-brand-amber rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <span className="text-xl">✅</span>
            </motion.div>

            <h2 className="text-xl font-oxanium font-bold text-white mb-3">
              ¡Gracias por registrarte!
            </h2>

            <div className="text-left bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 mb-4">
              <h3 className="text-sm font-bold text-blue-400 mb-2 font-oxanium">
                📈 Para activar acceso:
              </h3>

              <div className="space-y-2 text-gray-300 font-electrolize text-xs">
                <p>
                  <span className="text-white font-semibold">1.</span> Invierte{" "}
                  <span className="text-brand-amber font-bold">
                    S/.100 o $30
                  </span>{" "}
                  en Blofin
                </p>
                <p>
                  <span className="text-white font-semibold">2.</span> Usa
                  nuestro{" "}
                  <span className="text-brand-amber font-bold">
                    link exclusivo
                  </span>
                </p>
                <p>
                  <span className="text-white font-semibold">3.</span> Envía{" "}
                  <span className="text-brand-amber font-bold">
                    comprobante
                  </span>{" "}
                  por WhatsApp
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 font-electrolize"
              >
                <a
                  href="https://partner.blofin.com/d/criptouniversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 text-xs"
                >
                  🔗 Crear cuenta Blofin
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>

              <Button
                asChild
                className="w-full bg-brand-amber hover:bg-brand-amber/90 text-black text-sm py-2 font-electrolize font-bold"
              >
                <a
                  href={generateWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 text-xs"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Enviar comprobante
                </a>
              </Button>
            </div>

            <div className="mt-3 text-xs text-gray-400 font-electrolize">
              <p className="mb-1">Acceso inmediato a:</p>
              <div className="text-left space-y-0.5">
                <p>📚 Curso crypto • 💬 Comunidad</p>
                <p>📊 Señales • 🎥 Sesiones en vivo</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full mt-3 border-white/30 text-black hover:bg-white/10 font-electrolize text-xs py-1.5"
            >
              Volver al inicio
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black relative text-white">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* Main container */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 py-8 flex justify-center items-center min-h-screen">
        <div className="w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-oxanium font-bold text-brand-amber mb-2">
              Únete a CriptoUniversity
            </h1>
            <p className="text-gray-300 font-electrolize">
              La primera universidad cripto 100% gratuita de Latinoamérica
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-full bg-brand-amber/20 rounded-full h-1 mb-8">
            <motion.div
              className="h-1 rounded-full bg-brand-amber"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question container */}
          <div className="relative h-[500px] sm:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-start"
              >
                {/* Question counter */}
                <div className="text-brand-amber text-sm mb-2 font-electrolize">
                  {currentQuestion + 1} → {questions.length}
                </div>

                {/* Question text */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-2 font-oxanium">
                  {questions[currentQuestion].text}
                  {questions[currentQuestion].required && (
                    <span className="text-brand-amber">*</span>
                  )}
                </h2>

                {/* Question description */}
                {questions[currentQuestion].description && (
                  <p className="text-gray-400 text-sm mb-6 font-electrolize">
                    {questions[currentQuestion].description}
                  </p>
                )}

                {/* Question input */}
                <div className="mt-6 w-full">{renderQuestion()}</div>

                {/* Error message */}
                {error && (
                  <div className="mt-3 text-red-300 text-sm bg-red-500/20 border border-red-500/30 rounded-md px-3 py-2 font-electrolize">
                    {error}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-auto pt-8 flex justify-between w-full">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-1 font-electrolize ${
                      currentQuestion === 0
                        ? "opacity-0 pointer-events-none"
                        : "text-gray-400 hover:text-white hover:bg-brand-amber/10"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`flex items-center gap-1 font-electrolize font-bold ${
                      isSubmitting
                        ? "bg-brand-amber/50 text-black/70 cursor-not-allowed"
                        : "bg-brand-amber text-black hover:bg-brand-amber/90"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="w-4 h-4 animate-spin" />
                        <span>Registrando...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {currentQuestion === questions.length - 1
                            ? "Registrarme"
                            : "Siguiente"}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-xs font-electrolize">
            Powered by CriptoUniversity • Santiago Chávez
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const Spinner = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
);

export default CriptoUniversityForm;
