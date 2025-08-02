"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLead, updateLead, Lead } from "@/lib/firebase/db";
import StudentInfoComponent from "@/components/ui/admin/SalesInfoComponent";
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
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Clock,
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
      case "student_pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "student_active":
        return "bg-green-100 text-green-800 border-green-200";
      case "student_inactive":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: Lead["status"]) => {
    switch (status) {
      case "student_pending":
        return "Estudiante Pendiente";
      case "student_active":
        return "Estudiante Activo";
      case "student_inactive":
        return "Estudiante Inactivo";
      case "rejected":
        return "Rechazado";
      default:
        return status;
    }
  };

  // Get investment level analysis for Blofin
  const getBlofinAnalysis = (lead: Lead) => {
    if (lead.blofinInvestmentCompleted) {
      return {
        level: "Inversión Completada",
        description: `${lead.blofinInvestmentAmount} ${lead.blofinInvestmentCurrency} - Inversión verificada`,
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        priority: "✅ ACTIVO",
      };
    } else if (lead.blofinAccountCreated) {
      return {
        level: "Cuenta Creada",
        description:
          "Tiene cuenta en Blofin pero no ha completado inversión mínima",
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="h-4 w-4 text-yellow-600" />,
        priority: "⏳ PENDIENTE",
      };
    } else {
      return {
        level: "Sin Cuenta",
        description: "No ha creado cuenta en Blofin",
        color: "bg-blue-100 text-blue-800",
        icon: <XCircle className="h-4 w-4 text-blue-600" />,
        priority: "📝 REGISTRO PENDIENTE",
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

  const blofinAnalysis = getBlofinAnalysis(lead);

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
                    {getStatusLabel(lead.status)}
                  </Badge>
                  {/* Blofin Status Badge */}
                  <Badge className={blofinAnalysis.color}>
                    {blofinAnalysis.priority}
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
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{lead.country}</span>
                </div>
                {/* WhatsApp quick action */}
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                  <a
                    href={`https://wa.me/${lead.phone?.replace(
                      /[^\d]/g,
                      ""
                    )}?text=Hola ${
                      lead.name
                    }, te contacto desde el equipo de CriptoUniversity respecto a tu registro.`}
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
                  <span>Registro: {formatDate(lead.createdAt)}</span>
                </div>
                {lead.updatedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Actualizado: {formatDate(lead.updatedAt)}</span>
                  </div>
                )}
                {lead.accessStartDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span>
                      Acceso desde: {formatDate(lead.accessStartDate)}
                    </span>
                  </div>
                )}
                {lead.accessEndDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-red-500 mr-2" />
                    <span>Acceso hasta: {formatDate(lead.accessEndDate)}</span>
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
                  placeholder="Añadir notas sobre este estudiante..."
                />
              ) : (
                <p className="whitespace-pre-wrap">
                  {lead.notes || "No hay notas disponibles"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Estudiante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Country Information */}
            <div>
              <div className="text-sm text-gray-500 mb-1">País</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <div>
                  <div className="font-medium">{lead.country}</div>
                  {lead.registrationDate && (
                    <div className="text-xs text-gray-600">
                      Fecha de registro: {lead.registrationDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Blofin Investment Analysis */}
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Estado de Inversión Blofin
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {blofinAnalysis.icon}
                  <div>
                    <div className="font-medium">{blofinAnalysis.level}</div>
                    <div className="text-sm text-gray-600">
                      {blofinAnalysis.description}
                    </div>
                  </div>
                </div>
                <Badge className={blofinAnalysis.color}>
                  {blofinAnalysis.priority}
                </Badge>

                {/* Investment Details */}
                {lead.blofinInvestmentCompleted && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-green-800">
                      Inversión Completada
                    </div>
                    <div className="text-sm text-green-700">
                      Monto: {lead.blofinInvestmentAmount}{" "}
                      {lead.blofinInvestmentCurrency}
                    </div>
                    {lead.blofinProofUploaded && (
                      <div className="text-xs text-green-600 mt-1">
                        ✅ Comprobante subido
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Community Access */}
            {lead.communityAccess && (
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Acceso a Comunidades
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span className="text-sm">Discord:</span>
                    {lead.communityAccess.discord ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200"
                      >
                        ✅ Activo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        ❌ Inactivo
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span className="text-sm">Telegram:</span>
                    {lead.communityAccess.telegram ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200"
                      >
                        ✅ Activo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        ❌ Inactivo
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span className="text-sm">WhatsApp:</span>
                    {lead.communityAccess.whatsapp ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200"
                      >
                        ✅ Activo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        ❌ Inactivo
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Source Information */}
            {lead.source && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Fuente</div>
                <div className="font-medium">{lead.source}</div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Eliminar Estudiante
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Access Management Card - NEW */}
      {lead.accessGranted && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Gestión de Acceso al Curso
            </CardTitle>
            <CardDescription>
              Control del acceso del estudiante a los contenidos del curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 mb-1">
                  Estado de Acceso
                </div>
                <div className="font-medium text-green-800">Acceso Activo</div>
                <div className="text-sm text-green-700 mt-1">
                  Desde: {formatDate(lead.accessStartDate)}
                </div>
                <div className="text-sm text-green-700">
                  Hasta: {formatDate(lead.accessEndDate)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">
                  Acciones Disponibles
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    Extender Acceso
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Revocar Acceso
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <StudentInfoComponent
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
