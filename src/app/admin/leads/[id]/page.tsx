"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLead, updateLead, Lead } from "@/lib/firebase/db";
import SalesInfoComponent from "@/components/ui/admin/SalesInfoComponent";
import LeadHistoryComponent from "@/components/ui/admin/LeadHistoryComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit2,
  Save,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Building,
  DollarSign,
  MessageSquare,
  Briefcase,
  CreditCard,
} from "lucide-react";

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<Partial<Lead>>({});
  const [error, setError] = useState<string | null>(null);

  const leadId = params.id as string;

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setIsLoading(true);
        const leadData = await getLead(leadId);
        setLead(leadData);
        setEditableData({
          name: leadData?.name,
          email: leadData?.email,
          phone: leadData?.phone,
          notes: leadData?.notes || "",
        });
      } catch (err) {
        console.error("Error fetching lead:", err);
        setError("Failed to load lead data");
      } finally {
        setIsLoading(false);
      }
    };

    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateLead(leadId, editableData);
      // Update local state with new data
      setLead((prev) => (prev ? { ...prev, ...editableData } : null));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating lead:", err);
      setError("Failed to update lead");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "lead":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "onboarding":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "sale":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // NEW: Get business type from role field
  const getBusinessTypeDetails = (role: string) => {
    const businessTypes: Record<
      string,
      { label: string; icon: React.ReactNode; color: string }
    > = {
      agency: {
        label: "Agencia de Marketing Digital",
        icon: <Briefcase className="h-4 w-4" />,
        color: "bg-purple-100 text-purple-800",
      },
      ecommerce: {
        label: "E-commerce / Tienda Online",
        icon: <Building className="h-4 w-4" />,
        color: "bg-blue-100 text-blue-800",
      },
      saas: {
        label: "Software / SaaS / Tecnología",
        icon: <CreditCard className="h-4 w-4" />,
        color: "bg-green-100 text-green-800",
      },
      consulting: {
        label: "Consultoría / Servicios Profesionales",
        icon: <Briefcase className="h-4 w-4" />,
        color: "bg-amber-100 text-amber-800",
      },
      real_estate: {
        label: "Bienes Raíces / Inmobiliaria",
        icon: <Building className="h-4 w-4" />,
        color: "bg-teal-100 text-teal-800",
      },
      education: {
        label: "Educación / Cursos Online",
        icon: <Building className="h-4 w-4" />,
        color: "bg-indigo-100 text-indigo-800",
      },
      health: {
        label: "Salud / Medicina / Wellness",
        icon: <Building className="h-4 w-4" />,
        color: "bg-red-100 text-red-800",
      },
      restaurant: {
        label: "Restaurante / Comida",
        icon: <Building className="h-4 w-4" />,
        color: "bg-orange-100 text-orange-800",
      },
      retail: {
        label: "Retail / Tienda Física",
        icon: <Building className="h-4 w-4" />,
        color: "bg-pink-100 text-pink-800",
      },
      freelancer: {
        label: "Freelancer / Profesional Independiente",
        icon: <Briefcase className="h-4 w-4" />,
        color: "bg-cyan-100 text-cyan-800",
      },
      startup: {
        label: "Startup / Emprendimiento Nuevo",
        icon: <Building className="h-4 w-4" />,
        color: "bg-violet-100 text-violet-800",
      },
      other: {
        label: "Otro Tipo de Negocio",
        icon: <Building className="h-4 w-4" />,
        color: "bg-gray-100 text-gray-800",
      },
    };

    return (
      businessTypes[role] || {
        label: role || "No especificado",
        icon: <Building className="h-4 w-4" />,
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  // NEW: Get investment level analysis for $200 system
  const getInvestmentAnalysis = (investment: string) => {
    if (
      investment.toLowerCase().includes("claro") ||
      investment.toLowerCase().includes("cuento con la inversión")
    ) {
      return {
        level: "Alto Potencial",
        description: "Cuenta con la inversión de $200 USD",
        color: "bg-red-100 text-red-800",
        icon: <DollarSign className="h-4 w-4 text-red-600" />,
        priority: "🔥 ALTA PRIORIDAD",
      };
    } else if (
      investment.toLowerCase().includes("puedo conseguirla") ||
      investment.toLowerCase().includes("puedo conseguir")
    ) {
      return {
        level: "Potencial Medio",
        description: "Puede conseguir la inversión de $200 USD",
        color: "bg-yellow-100 text-yellow-800",
        icon: <DollarSign className="h-4 w-4 text-yellow-600" />,
        priority: "🟡 PRIORIDAD MEDIA",
      };
    } else {
      return {
        level: "Bajo Potencial",
        description: "No cuenta con la inversión de $200 USD",
        color: "bg-blue-100 text-blue-800",
        icon: <DollarSign className="h-4 w-4 text-blue-600" />,
        priority: "❄️ PRIORIDAD BAJA",
      };
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="p-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error || "Lead no encontrado"}
        </div>
      </div>
    );
  }

  const businessDetails = getBusinessTypeDetails(lead.role);
  const investmentAnalysis = getInvestmentAnalysis(lead.investment);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/admin/leads")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Leads
        </Button>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Guardar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" /> Editar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{lead.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${getStatusColor(lead.status)}`}>
                    {lead.status === "lead"
                      ? "Nuevo Lead"
                      : lead.status === "onboarding"
                      ? "En Onboarding"
                      : lead.status === "sale"
                      ? "Venta Realizada"
                      : "Rechazado"}
                  </Badge>
                  {/* NEW: Investment Priority Badge */}
                  <Badge className={investmentAnalysis.color}>
                    {investmentAnalysis.priority}
                  </Badge>
                </div>
              </CardDescription>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-purple-700 text-white">
                {lead.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">
                  Información de Contacto
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editableData.email || ""}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          email: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {lead.email}
                    </a>
                  )}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editableData.phone || ""}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          phone: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <a href={`tel:${lead.phone}`} className="hover:underline">
                      {lead.phone}
                    </a>
                  )}
                </div>
                {/* NEW: WhatsApp quick action */}
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                  <a
                    href={`https://wa.me/${lead.phone?.replace(
                      /[^\d]/g,
                      ""
                    )}?text=Hola ${
                      lead.name
                    }, te contacto desde el equipo de Full Send respecto a tu consulta sobre nuestro sistema.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">Fechas</div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Creado: {formatDate(lead.createdAt)}</span>
                </div>
                {lead.updatedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Actualizado: {formatDate(lead.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm text-gray-500 mb-2">Notas</div>
              {isEditing ? (
                <textarea
                  value={editableData.notes || ""}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      notes: e.target.value,
                    })
                  }
                  className="w-full border rounded-md p-2 h-32 resize-none"
                  placeholder="Añadir notas sobre este lead..."
                />
              ) : (
                <p className="whitespace-pre-wrap">
                  {lead.notes || "No hay notas disponibles"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details sidebar - UPDATED */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Negocio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* NEW: Business Type */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Tipo de Negocio</div>
              <div className="flex items-center gap-2">
                {businessDetails.icon}
                <div>
                  <div className="font-medium">{businessDetails.label}</div>
                  <Badge className={`${businessDetails.color} text-xs mt-1`}>
                    {lead.role?.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* NEW: Investment Analysis for $200 system */}
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Capacidad de Inversión ($200 USD)
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {investmentAnalysis.icon}
                  <div>
                    <div className="font-medium">
                      {investmentAnalysis.level}
                    </div>
                    <div className="text-sm text-gray-600">
                      {investmentAnalysis.description}
                    </div>
                  </div>
                </div>
                <Badge className={investmentAnalysis.color}>
                  {investmentAnalysis.priority}
                </Badge>
                {/* Full investment text */}
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  "{lead.investment}"
                </div>
              </div>
            </div>

            {/* Legacy fields (kept for backward compatibility) */}
            {lead.level && lead.level !== "business" && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Nivel</div>
                <div className="font-medium">{lead.level}</div>
              </div>
            )}

            {lead.software && lead.software !== "system" && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Software</div>
                <div className="font-medium">{lead.software}</div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Eliminar Lead
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* NEW: Business Description Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Descripción del Negocio
          </CardTitle>
          <CardDescription>
            Detalles sobre el negocio y objetivos con el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="whitespace-pre-wrap text-gray-800">
              {lead.why ||
                lead.clients ||
                "No se proporcionó descripción del negocio"}
            </div>
          </div>
          {/* Show both fields if they're different */}
          {lead.why && lead.clients && lead.why !== lead.clients && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">
                Información adicional:
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="whitespace-pre-wrap text-gray-800">
                  {lead.clients}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <SalesInfoComponent
        lead={lead}
        isLoading={isLoading}
        onLeadUpdate={() => {
          // Optional: refetch lead if needed
        }}
      />
      <LeadHistoryComponent lead={lead} />
    </div>
  );
}
