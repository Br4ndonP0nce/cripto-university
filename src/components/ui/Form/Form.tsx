"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { addLead } from "@/lib/firebase/db";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  validateEmail,
  validateName,
  validatePhone,
  generateWhatsAppLink,
  COUNTRY_VALIDATIONS,
  PhoneValidationResult,
} from "@/lib/utils/phonevalidationutils";

// Question types
type QuestionType = "text" | "email" | "phone" | "select" | "textarea";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  description?: string;
  options?: Option[];
}

// Updated questions focused on business qualification
const questions: Question[] = [
  {
    id: "name",
    text: "¿Cuál es tu nombre?",
    type: "text",
    required: true,
  },
  {
    id: "email",
    text: "¿Cuál es tu mejor correo?",
    type: "email",
    required: true,
    description: "Para enviarte acceso y actualizaciones del sistema.",
  },
  {
    id: "phone",
    text: "¿Cuál es tu número de WhatsApp?",
    type: "phone",
    required: true,
    description: "Para contactarte de forma personalizada.",
  },
  {
    id: "business",
    text: "¿De qué va tu negocio?",
    type: "select",
    required: true,
    options: [
      {
        id: "agency",
        text: "Agencia de marketing digital / publicidad",
      },
      {
        id: "ecommerce",
        text: "E-commerce / Tienda online",
      },
      {
        id: "saas",
        text: "Software / SaaS / Tecnología",
      },
      {
        id: "consulting",
        text: "Consultoría / Servicios profesionales",
      },
      {
        id: "real_estate",
        text: "Bienes raíces / Inmobiliaria",
      },
      {
        id: "education",
        text: "Educación / Cursos online",
      },
      {
        id: "health",
        text: "Salud / Medicina / Wellness",
      },
      {
        id: "restaurant",
        text: "Restaurante / Comida",
      },
      {
        id: "retail",
        text: "Retail / Tienda física",
      },
      {
        id: "freelancer",
        text: "Freelancer / Profesional independiente",
      },
      {
        id: "startup",
        text: "Startup / Emprendimiento nuevo",
      },
      {
        id: "other",
        text: "Otro tipo de negocio",
      },
    ],
  },
  {
    id: "investment",
    text: "¿Cómo te suena tener acceso de por vida a la cantidad de forms que necesites y todo el sistema por $200 USD?",
    type: "select",
    required: true,
    description: "Acceso completo y permanente a nuestra plataforma.",
    options: [
      {
        id: "yes",
        text: "¡Claro! Cuento con la inversión",
      },
      {
        id: "maybe",
        text: "No cuento con la inversión pero puedo conseguirla",
      },
      {
        id: "no",
        text: "Definitivamente no cuento con la inversión",
      },
    ],
  },
  {
    id: "description",
    text: "Platícame un poco de lo que haces",
    type: "textarea",
    required: true,
    description:
      "Cuéntanos sobre tu negocio, tus objetivos y cómo planeas usar nuestro sistema.",
  },
];

// Guerrilla marketing messages for sonner notifications
const guerrillaMessages = [
  "Esta podría ser la experiencia para tus clientes y para ti... muy fácil, muy personalizable, 100% tuya",
  "Imagina tener este nivel de personalización en todos tus formularios",
  "Esto es solo una muestra de lo que puedes crear para tu negocio",
  "Formularios que convierten como este, ¿te imaginas el potencial?",
  "Cada pregunta optimizada para maximizar conversiones",
  "Tu marca, tu estilo, tus reglas. Así de simple",
  "Validaciones robustas, experiencia premium. Todo tuyo por $200",
  "¿Ya te imaginas esto con los colores y logo de tu empresa?",
  "Sistema completo, sin límites, sin mensualidades. Una sola vez",
  "Formularios que se sienten premium, porque tu negocio lo vale",
];

// Generate country codes from COUNTRY_VALIDATIONS (same as before)
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
const BusinessLeadForm: React.FC = () => {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Guerrilla marketing with Sonner
  const guerrillaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start guerrilla marketing notifications using Sonner
  useEffect(() => {
    const startGuerrillaMarketing = () => {
      const showRandomMessage = () => {
        if (!isSubmitted && !isSubmitting) {
          const randomMessage =
            guerrillaMessages[
              Math.floor(Math.random() * guerrillaMessages.length)
            ];
          toast(randomMessage, {
            duration: 4000,
            style: {
              background: "rgba(16, 185, 129, 0.9)",
              color: "white",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            },
            className: "border-emerald-500/30",
          });
        }
      };

      // Show first message after 5 seconds
      const initialTimer = setTimeout(() => {
        showRandomMessage();

        // Then show a message every 8 seconds
        guerrillaTimeoutRef.current = setInterval(showRandomMessage, 8000);
      }, 5000);

      return () => {
        clearTimeout(initialTimer);
        if (guerrillaTimeoutRef.current) {
          clearInterval(guerrillaTimeoutRef.current);
        }
      };
    };

    return startGuerrillaMarketing();
  }, [isSubmitted, isSubmitting]);

  // Clean up notifications on unmount
  useEffect(() => {
    return () => {
      if (guerrillaTimeoutRef.current) {
        clearInterval(guerrillaTimeoutRef.current);
      }
    };
  }, []);

  // Focus the input field when the question changes
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      } else if (textareaRef.current) {
        textareaRef.current.focus();
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    // Stop guerrilla marketing
    if (guerrillaTimeoutRef.current) {
      clearInterval(guerrillaTimeoutRef.current);
    }

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
      // Format the lead data for Firebase (updated fields)
      const leadData = {
        name: answers.name || "",
        email: answers.email || "",
        phone: answers.phone || "",
        role: answers.business_text || answers.business || "", // Using business instead of role
        level: "business", // Set default since we removed level question
        software: "system", // Set default since we removed software question
        clients: answers.description || "", // Using description for clients field
        investment: answers.investment_text || answers.investment || "",
        why: answers.description || "", // Using description for why field too
        status: "lead" as const,
      };

      // Add to Firestore
      const leadId = await addLead(leadData);
      console.log("Lead successfully added with ID:", leadId);

      setIsSubmitted(true);

      // Success toast
      toast.success("¡Formulario enviado exitosamente!", {
        description: "Nos pondremos en contacto contigo pronto.",
        duration: 5000,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        "Hubo un error al enviar el formulario. Por favor intenta de nuevo."
      );

      // Error toast
      toast.error("Error al enviar el formulario", {
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
              className="w-full bg-transparent border-0 border-b-2 border-emerald-500/30 focus:border-emerald-400 py-3 px-1 text-lg text-white transition-colors placeholder:text-gray-400 rounded-none focus-visible:ring-0"
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
                  ? "border-emerald-400 focus:border-emerald-300"
                  : emailValidation.state === "invalid"
                  ? "border-red-400 focus:border-red-300"
                  : "border-emerald-500/30 focus:border-emerald-400"
              } py-3 px-1 text-lg text-white transition-colors placeholder:text-gray-400 rounded-none focus-visible:ring-0`}
              placeholder="ejemplo@correo.com"
            />

            {emailValue && (
              <div className="mt-2 text-xs">
                {emailValidation.state === "valid" && (
                  <span className="text-emerald-400 flex items-center gap-1">
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
                  className="flex items-center bg-[#1a1a1a] border-emerald-500/30 text-white hover:bg-[#2a2a2a] min-w-[80px]"
                >
                  {selectedCode}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </Button>

                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] border border-emerald-500/30 rounded-md z-10 w-64">
                    <ScrollArea className="h-60">
                      {countryCodes.map((country, index) => (
                        <button
                          key={`${country.code}-${country.country}-${index}`}
                          type="button"
                          className="block w-full text-left px-3 py-2 hover:bg-emerald-500/20 text-white text-sm"
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
                          <span className="font-medium">{country.code}</span>{" "}
                          {country.country}
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
                className="flex-1 bg-transparent border-0 border-b-2 border-emerald-500/30 focus:border-emerald-400 py-3 px-1 text-lg text-white rounded-none focus-visible:ring-0 placeholder:text-gray-400"
                placeholder={currentCountryValidation?.example || "1234567890"}
                maxLength={currentCountryValidation?.maxLength || 15}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-400">
                <span className="text-orange-500 underline">
                  Asegurate de usar tu numero de whatsapp!
                </span>
                <br />
                {currentCountryValidation && (
                  <>
                    {nationalNumber.length >=
                      currentCountryValidation.minLength &&
                    nationalNumber.length <=
                      currentCountryValidation.maxLength &&
                    !phoneValidationError ? (
                      <span className="text-emerald-400">✅ Número válido</span>
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
        const isBusinessQuestion = question.id === "business";

        return (
          <div className="w-full">
            {isBusinessQuestion ? (
              <ScrollArea className="h-72 w-full border border-emerald-500/30 rounded-md">
                <div className="p-2 space-y-2">
                  {question.options?.map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id, option.text)}
                      variant="outline"
                      className={`w-full text-left justify-start h-auto p-3 ${
                        answers[question.id] === option.id
                          ? "bg-emerald-500/20 border-emerald-400 text-white"
                          : "bg-[#1a1a1a] border-emerald-500/30 text-white hover:bg-emerald-500/10"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${
                            answers[question.id] === option.id
                              ? "border-emerald-400 bg-emerald-400/20"
                              : "border-emerald-500/50"
                          }`}
                        >
                          {answers[question.id] === option.id && (
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          )}
                        </div>
                        <span className="text-sm">{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="w-full space-y-2">
                {question.options?.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id, option.text)}
                    variant="outline"
                    className={`w-full text-left justify-start h-auto p-3 ${
                      answers[question.id] === option.id
                        ? "bg-emerald-500/20 border-emerald-400 text-white"
                        : "bg-[#1a1a1a] border-emerald-500/30 text-white hover:bg-emerald-500/10"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          answers[question.id] === option.id
                            ? "border-emerald-400 bg-emerald-400/20"
                            : "border-emerald-500/50"
                        }`}
                      >
                        {answers[question.id] === option.id && (
                          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        )}
                      </div>
                      {option.text}
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="w-full">
            <Textarea
              ref={textareaRef}
              value={answers[question.id] || ""}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) return;
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNext();
                }
              }}
              rows={5}
              className="w-full bg-transparent border-2 border-emerald-500/30 focus:border-emerald-400 text-lg text-white resize-none placeholder:text-gray-400 focus-visible:ring-0"
              placeholder="Cuéntanos sobre tu negocio, tus objetivos y cómo planeas usar nuestro sistema..."
            />
            <p className="text-gray-400 text-xs mt-1">
              Presiona Shift + Enter para hacer un salto de línea
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // If the form is submitted, show success message with WhatsApp CTA
  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
        {/* Circuit Board - Dark Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
              radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
              radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
          }}
        />

        <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl p-8 max-w-md w-full text-center border border-emerald-500/30"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-3">
              ¡Gracias por aplicar!
            </h2>
            <p className="text-gray-300 mb-6">
              Hemos recibido tu solicitud. Nos pondremos en contacto contigo
              pronto para darte acceso a nuestro sistema.
            </p>

            {/* WhatsApp CTA Button */}
            {answers.phone && (
              <div className="mb-4">
                <Button
                  asChild
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <a
                    href={generateWhatsAppLink(
                      `Hola! soy ${answers.name}. Acabo de completar el formulario para el sistema de $200 USD y me gustaría conocer más detalles.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Hablar por WhatsApp para acceso inmediato
                  </a>
                </Button>
                <p className="text-gray-400 text-xs mt-2">
                  Te llevará a WhatsApp con un mensaje pre-escrito
                </p>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full border-emerald-500/30 text-black hover:bg-emerald-500/10 hover:text-white"
            >
              Volver al inicio
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
      {/* Circuit Board - Dark Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
            radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-8 flex justify-center items-center min-h-screen">
        <div className="w-full">
          {/* Progress bar */}
          <div className="w-full bg-emerald-500/20 rounded-full h-1 mb-8">
            <motion.div
              className="h-1 rounded-full bg-emerald-400"
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
                <div className="text-emerald-400 text-sm mb-2">
                  {currentQuestion + 1} → {questions.length}
                </div>

                {/* Question text */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-2">
                  {questions[currentQuestion].text}
                  {questions[currentQuestion].required && (
                    <span className="text-emerald-400">*</span>
                  )}
                </h2>

                {/* Question description */}
                {questions[currentQuestion].description && (
                  <p className="text-gray-400 text-sm mb-6">
                    {questions[currentQuestion].description}
                  </p>
                )}

                {/* Question input */}
                <div className="mt-6 w-full">{renderQuestion()}</div>

                {/* Error message */}
                {error && (
                  <div className="mt-3 text-red-300 text-sm bg-red-500/20 border border-red-500/30 rounded-md px-3 py-2">
                    {error}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-auto pt-8 flex justify-between w-full">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-1 ${
                      currentQuestion === 0
                        ? "opacity-0 pointer-events-none"
                        : "text-gray-400 hover:text-white hover:bg-emerald-500/10"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`flex items-center gap-1 ${
                      isSubmitting
                        ? "bg-emerald-700/50 text-white/70 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="w-4 h-4 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {currentQuestion === questions.length - 1
                            ? "Enviar"
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

          {/* Powered by */}
          <div className="absolute bottom-2 right-2 text-gray-500 text-xs">
            Powered by Tu Empresa • Full Send
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

export default BusinessLeadForm;
