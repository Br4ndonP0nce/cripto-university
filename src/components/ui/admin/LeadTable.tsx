// src/components/ui/admin/LeadTable.tsx - Updated for CriptoUniversity
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Lead,
  updateLead,
  updateBlofinInvestment,
  updateCommunityAccess,
} from "@/lib/firebase/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MoreVertical,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Edit2,
  FileText,
  Lock,
  Flag,
  MessageCircle,
  CreditCard,
  ExternalLink,
} from "lucide-react";

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: Lead["status"]) => void;
}

export default function LeadTable({ leads, onStatusChange }: LeadTableProps) {
  const { hasPermission, userProfile } = useAuth();
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>(
    {}
  );

  // Handle actual database status updates
  const handleStatusChange = async (
    leadId: string,
    newStatus: Lead["status"]
  ) => {
    if (!userProfile || updatingStatus[leadId]) return;

    try {
      setUpdatingStatus((prev) => ({ ...prev, [leadId]: true }));

      // Update in database
      await updateLead(leadId, { status: newStatus }, userProfile.uid);

      // Update local state through parent component
      onStatusChange(leadId, newStatus);
    } catch (error) {
      console.error("Error updating lead status:", error);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [leadId]: false }));
    }
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "student_pending":
        return "bg-amber-100 text-amber-800";
      case "student_active":
        return "bg-green-100 text-green-800";
      case "student_inactive":
        return "bg-gray-100 text-gray-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Lead["status"]) => {
    switch (status) {
      case "student_pending":
        return <Clock className="h-3 w-3" />;
      case "student_active":
        return <CheckCircle className="h-3 w-3" />;
      case "student_inactive":
        return <User className="h-3 w-3" />;
      case "rejected":
        return <XCircle className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getStatusLabel = (status: Lead["status"]) => {
    switch (status) {
      case "student_pending":
        return "Pendiente";
      case "student_active":
        return "Activo";
      case "student_inactive":
        return "Inactivo";
      case "rejected":
        return "Rechazado";
      default:
        return status;
    }
  };

  const getBlofinStatus = (lead: Lead) => {
    if (lead.blofinInvestmentCompleted) {
      return {
        status: "completed",
        label: "✅ Completada",
        color: "bg-green-100 text-green-800",
        amount: `${lead.blofinInvestmentAmount || 0} ${
          lead.blofinInvestmentCurrency || "USD"
        }`,
      };
    } else if (lead.blofinAccountCreated) {
      return {
        status: "account_created",
        label: "🔗 Cuenta Creada",
        color: "bg-blue-100 text-blue-800",
        amount: "Pendiente inversión",
      };
    } else {
      return {
        status: "pending",
        label: "⏳ Pendiente",
        color: "bg-gray-100 text-gray-800",
        amount: "Sin cuenta",
      };
    }
  };

  const getAccessStatus = (lead: Lead) => {
    if (!lead.accessGranted) {
      return {
        status: "no_access",
        label: "Sin Acceso",
        color: "bg-gray-100 text-gray-800",
      };
    }

    if (lead.accessEndDate) {
      const endDate = lead.accessEndDate.toDate
        ? lead.accessEndDate.toDate()
        : new Date(lead.accessEndDate.toDate());
      const now = new Date();
      const daysLeft = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft > 0) {
        return {
          status: "active",
          label: `Activo (${daysLeft}d)`,
          color: "bg-green-100 text-green-800",
        };
      } else {
        return {
          status: "expired",
          label: "Expirado",
          color: "bg-red-100 text-red-800",
        };
      }
    }

    return {
      status: "active",
      label: "Acceso Otorgado",
      color: "bg-green-100 text-green-800",
    };
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("es-MX", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getCountryFlag = (country: string) => {
    const countryFlags: Record<string, string> = {
      mx: "🇲🇽",
      ar: "🇦🇷",
      pe: "🇵🇪",
      co: "🇨🇴",
      cl: "🇨🇱",
      br: "🇧🇷",
      ec: "🇪🇨",
      ve: "🇻🇪",
      uy: "🇺🇾",
      py: "🇵🇾",
      bo: "🇧🇴",
      cr: "🇨🇷",
      pa: "🇵🇦",
      gt: "🇬🇹",
      sv: "🇸🇻",
      hn: "🇭🇳",
      ni: "🇳🇮",
      do: "🇩🇴",
      cu: "🇨🇺",
      us: "🇺🇸",
      ca: "🇨🇦",
      es: "🇪🇸",
      other: "🌍",
    };
    return countryFlags[country] || "🌍";
  };

  const getCountryName = (country: string) => {
    const countryNames: Record<string, string> = {
      mx: "México",
      ar: "Argentina",
      pe: "Perú",
      co: "Colombia",
      cl: "Chile",
      br: "Brasil",
      ec: "Ecuador",
      ve: "Venezuela",
      uy: "Uruguay",
      py: "Paraguay",
      bo: "Bolivia",
      cr: "Costa Rica",
      pa: "Panamá",
      gt: "Guatemala",
      sv: "El Salvador",
      hn: "Honduras",
      ni: "Nicaragua",
      do: "República Dominicana",
      cu: "Cuba",
      us: "Estados Unidos",
      ca: "Canadá",
      es: "España",
      other: "Otro país",
    };
    return countryNames[country] || country;
  };

  /**
   * Determine which status transitions are allowed based on current status
   */
  const getAllowedStatusTransitions = (
    currentStatus: Lead["status"]
  ): Lead["status"][] => {
    switch (currentStatus) {
      case "student_pending":
        return ["student_active", "student_inactive", "rejected"];
      case "student_active":
        return ["student_inactive"];
      case "student_inactive":
        return ["student_active", "rejected"];
      case "rejected":
        return ["student_pending"];
      default:
        return [];
    }
  };

  /**
   * Check if any status changes are allowed for this lead
   */
  const canChangeStatus = (lead: Lead): boolean => {
    // Check if user has permission
    if (!hasPermission("leads:write")) return false;

    // Check if there are any allowed transitions
    return getAllowedStatusTransitions(lead.status).length > 0;
  };

  const generateWhatsAppLink = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const message = `¡Hola ${name}! Te contacto desde CriptoUniversity. ¿Cómo podemos ayudarte con tu proceso de registro y acceso a los cursos?`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Estado Blofin</TableHead>
              <TableHead>Acceso Curso</TableHead>
              <TableHead>Registrado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => {
              const allowedTransitions = getAllowedStatusTransitions(
                lead.status
              );
              const blofinStatus = getBlofinStatus(lead);
              const accessStatus = getAccessStatus(lead);

              return (
                <TableRow
                  key={lead.id}
                  className={`hover:bg-gray-50 ${
                    updatingStatus[lead.id!] ? "opacity-50" : ""
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-brand-amber/20 text-brand-amber text-xs">
                          {lead.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{lead.name}</div>
                        <div className="text-xs text-gray-500">
                          {lead.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getStatusColor(
                          lead.status
                        )} flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(lead.status)}
                        {getStatusLabel(lead.status)}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getCountryFlag(lead.country)}
                      </span>
                      <div>
                        <div className="text-sm font-medium">
                          {getCountryName(lead.country)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lead.country?.toUpperCase() || "N/A"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={`${blofinStatus.color} text-xs`}>
                        {blofinStatus.label}
                      </Badge>
                      <div className="text-xs text-gray-600">
                        {blofinStatus.amount}
                      </div>
                      {lead.blofinProofUploaded && (
                        <div className="text-xs text-green-600">
                          📄 Comprobante subido
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={`${accessStatus.color} text-xs`}>
                        {accessStatus.label}
                      </Badge>
                      {lead.communityAccess && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {lead.communityAccess.discord && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                              Discord
                            </span>
                          )}
                          {lead.communityAccess.telegram && (
                            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                              Telegram
                            </span>
                          )}
                          {lead.communityAccess.whatsapp && (
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-1 rounded">
                              WhatsApp
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs text-gray-500">
                      {formatDate(lead.createdAt)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* View Button */}
                      <Button size="sm" variant="ghost" asChild>
                        <a href={`/admin/leads/${lead.id}`}>
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>

                      {/* WhatsApp Button */}
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={generateWhatsAppLink(lead.phone, lead.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4 text-green-600" />
                        </a>
                      </Button>

                      {/* Actions Dropdown */}
                      {hasPermission("leads:write") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* Status Change Options */}
                            {canChangeStatus(lead) &&
                              allowedTransitions.length > 0 && (
                                <>
                                  {allowedTransitions.map((targetStatus) => {
                                    const getStatusActionData = (
                                      status: Lead["status"]
                                    ) => {
                                      switch (status) {
                                        case "student_pending":
                                          return {
                                            icon: Clock,
                                            label: "Marcar como Pendiente",
                                            color: "text-amber-600",
                                          };
                                        case "student_active":
                                          return {
                                            icon: CheckCircle,
                                            label: "Activar Estudiante",
                                            color: "text-green-600",
                                          };
                                        case "student_inactive":
                                          return {
                                            icon: User,
                                            label: "Marcar como Inactivo",
                                            color: "text-gray-600",
                                          };
                                        case "rejected":
                                          return {
                                            icon: XCircle,
                                            label: "Rechazar",
                                            color: "text-red-600",
                                          };
                                        default:
                                          return {
                                            icon: User,
                                            label: status,
                                            color: "text-gray-600",
                                          };
                                      }
                                    };

                                    const actionData =
                                      getStatusActionData(targetStatus);
                                    const IconComponent = actionData.icon;

                                    return (
                                      <DropdownMenuItem
                                        key={targetStatus}
                                        onClick={() =>
                                          handleStatusChange(
                                            lead.id!,
                                            targetStatus
                                          )
                                        }
                                        className={`flex items-center ${actionData.color}`}
                                        disabled={updatingStatus[lead.id!]}
                                      >
                                        <IconComponent className="mr-2 h-4 w-4" />
                                        {updatingStatus[lead.id!]
                                          ? "Actualizando..."
                                          : actionData.label}
                                      </DropdownMenuItem>
                                    );
                                  })}
                                  <DropdownMenuSeparator />
                                </>
                              )}

                            {/* Blofin Actions */}
                            <DropdownMenuItem
                              onClick={() => {
                                // TODO: Open Blofin investment modal
                                console.log(
                                  "Update Blofin investment for:",
                                  lead.id
                                );
                              }}
                              className="flex items-center text-blue-600"
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Actualizar Inversión Blofin
                            </DropdownMenuItem>

                            {/* Community Access */}
                            <DropdownMenuItem
                              onClick={() => {
                                // TODO: Open community access modal
                                console.log(
                                  "Manage community access for:",
                                  lead.id
                                );
                              }}
                              className="flex items-center text-purple-600"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Gestionar Acceso Comunidad
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Edit Notes */}
                            <DropdownMenuItem asChild>
                              <a
                                href={`/admin/leads/${lead.id}`}
                                className="flex items-center"
                              >
                                <Edit2 className="mr-2 h-4 w-4 text-gray-600" />
                                Editar Notas
                              </a>
                            </DropdownMenuItem>

                            {/* View Details */}
                            <DropdownMenuItem asChild>
                              <a
                                href={`/admin/leads/${lead.id}`}
                                className="flex items-center"
                              >
                                <FileText className="mr-2 h-4 w-4 text-gray-600" />
                                Ver Detalles
                              </a>
                            </DropdownMenuItem>

                            {/* Blofin Link */}
                            <DropdownMenuItem asChild>
                              <a
                                href="https://partner.blofin.com/d/criptouniversity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <ExternalLink className="mr-2 h-4 w-4 text-blue-600" />
                                Link Blofin
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {leads.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay estudiantes
          </h3>
          <p className="text-gray-500">
            Los estudiantes aparecerán aquí una vez que se registren.
          </p>
        </div>
      )}
    </>
  );
}
