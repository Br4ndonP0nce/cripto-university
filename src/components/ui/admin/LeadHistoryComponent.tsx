import React, { useState, useEffect } from "react";
import { Lead } from "@/lib/firebase/db";
import { getUserProfile } from "@/lib/firebase/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  User,
  Clock,
  ArrowRight,
  DollarSign,
  CheckCircle,
  XCircle,
  RefreshCw,
  UserCheck,
  UserX,
  UserPlus,
  AlertCircle,
} from "lucide-react";

interface LeadHistoryProps {
  lead: Lead;
}

interface HistoryEntryWithUser {
  id: string;
  previousStatus: Lead["status"];
  newStatus: Lead["status"];
  details: string;
  performedBy: string;
  performedAt: Date;
  userName?: string;
}

export default function LeadHistoryComponent({ lead }: LeadHistoryProps) {
  const [historyWithUsers, setHistoryWithUsers] = useState<
    HistoryEntryWithUser[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lead?.statusHistory) {
      loadHistoryWithUserData();
    } else {
      setLoading(false);
    }
  }, [lead?.statusHistory]);

  const loadHistoryWithUserData = async () => {
    try {
      setLoading(true);

      const history = lead.statusHistory || [];
      const enrichedHistory: HistoryEntryWithUser[] = [];

      for (const entry of history) {
        let userName = "Usuario Desconocido";

        // Get user name for performedBy
        try {
          const userProfile = await getUserProfile(entry.performedBy);
          userName =
            userProfile?.displayName ||
            userProfile?.email ||
            "Usuario Desconocido";
        } catch (err) {
          console.warn(`Could not load user ${entry.performedBy}:`, err);
        }

        enrichedHistory.push({
          ...entry,
          performedAt:
            entry.performedAt instanceof Date
              ? entry.performedAt
              : typeof entry.performedAt === "object" &&
                "toDate" in entry.performedAt
              ? entry.performedAt.toDate()
              : new Date(entry.performedAt),
          userName,
        });
      }

      // Sort by date (newest first)
      enrichedHistory.sort(
        (a, b) => b.performedAt.getTime() - a.performedAt.getTime()
      );

      setHistoryWithUsers(enrichedHistory);
    } catch (error) {
      console.error("Error loading history with user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Lead["status"]) => {
    switch (status) {
      case "student_pending":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "student_active":
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case "student_inactive":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "rejected":
        return <UserX className="h-4 w-4 text-red-500" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-500" />;
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

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "student_pending":
        return "bg-blue-100 text-blue-800";
      case "student_active":
        return "bg-green-100 text-green-800";
      case "student_inactive":
        return "bg-amber-100 text-amber-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionIcon = (details: string) => {
    const lowerDetails = details.toLowerCase();

    if (lowerDetails.includes("inversión") || lowerDetails.includes("blofin")) {
      return <DollarSign className="h-4 w-4 text-green-600" />;
    }
    if (lowerDetails.includes("acceso") && lowerDetails.includes("granted")) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    if (lowerDetails.includes("acceso") && lowerDetails.includes("revoked")) {
      return <XCircle className="h-4 w-4 text-red-600" />;
    }
    if (
      lowerDetails.includes("comunidad") ||
      lowerDetails.includes("discord") ||
      lowerDetails.includes("telegram")
    ) {
      return <User className="h-4 w-4 text-purple-600" />;
    }

    return <RefreshCw className="h-4 w-4 text-gray-500" />;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
            <span className="ml-2 text-sm">Cargando historial...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!historyWithUsers.length) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            Historial del Estudiante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No hay historial de cambios disponible.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" />
          Historial del Estudiante ({historyWithUsers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyWithUsers.map((entry, index) => (
            <div
              key={entry.id}
              className="flex items-start space-x-4 p-4 border rounded-lg bg-gray-50"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                  {getStatusIcon(entry.newStatus)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge
                    className={getStatusColor(entry.previousStatus)}
                    variant="outline"
                  >
                    {getStatusLabel(entry.previousStatus)}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <Badge className={getStatusColor(entry.newStatus)}>
                    {getStatusLabel(entry.newStatus)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    {getActionIcon(entry.details)}
                    <p className="text-sm text-gray-900 flex-1">
                      {entry.details}
                    </p>
                  </div>

                  <div className="flex items-center text-xs text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>Por: {entry.userName}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(entry.performedAt)}</span>
                    </div>
                  </div>

                  {/* Investment Information - Parse from details if available */}
                  {entry.details.toLowerCase().includes("inversión") && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Información de Inversión
                        </span>
                      </div>
                      <div className="text-xs text-green-700">
                        <div>{entry.details}</div>
                      </div>
                    </div>
                  )}

                  {/* Special indicators for important events */}
                  {entry.details.toLowerCase().includes("acceso granted") && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">
                          Acceso al curso otorgado
                        </span>
                      </div>
                    </div>
                  )}

                  {entry.details.toLowerCase().includes("comunidad") && (
                    <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded-md">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-medium text-purple-800">
                          Cambio en acceso a comunidad
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {index === 0 && (
                <div className="flex-shrink-0">
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    Más Reciente
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
