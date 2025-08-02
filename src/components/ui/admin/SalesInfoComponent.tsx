import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Lead,
  updateBlofinInvestment,
  updateCommunityAccess,
} from "@/lib/firebase/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  Upload,
  Eye,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Users,
  Building,
  Globe,
  PlayCircle,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface StudentInfoComponentProps {
  lead: Lead | null;
  onLeadUpdate?: () => void;
  isLoading?: boolean;
}

export default function StudentInfoComponent({
  lead,
  onLeadUpdate,
  isLoading = false,
}: StudentInfoComponentProps) {
  const { userProfile, hasPermission } = useAuth();
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [investmentForm, setInvestmentForm] = useState({
    amount: "",
    currency: "USD" as "USD" | "PEN",
    completed: false,
  });

  const [communityForm, setCommunityForm] = useState({
    type: "discord" as "discord" | "telegram" | "whatsapp",
    granted: true,
  });

  // Utility function to safely convert any date format to JavaScript Date
  const toJsDate = (date: any): Date | null => {
    if (!date) return null;

    if (typeof date === "object" && date !== null && "toDate" in date) {
      // Firestore Timestamp
      return date.toDate();
    } else if (date instanceof Date) {
      // JavaScript Date
      return date;
    } else {
      // String or number timestamp
      const jsDate = new Date(date);
      return isNaN(jsDate.getTime()) ? null : jsDate;
    }
  };

  const canManageStudent = () => {
    if (!userProfile) return false;

    // Super admin and admin can always manage
    if (userProfile.role === "super_admin" || userProfile.role === "admin") {
      return true;
    }

    // CRM users can manage students
    if (userProfile.role === "crm_user") {
      return true;
    }

    return false;
  };

  const handleUpdateInvestment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lead || !userProfile || !investmentForm.amount) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      setUpdating(true);
      setError(null);

      const investmentData = {
        amount: parseFloat(investmentForm.amount),
        currency: investmentForm.currency,
        completed: investmentForm.completed,
      };

      await updateBlofinInvestment(lead.id!, investmentData, userProfile.uid);

      // Reset form and close modal
      setInvestmentForm({ amount: "", currency: "USD", completed: false });
      setShowInvestmentModal(false);

      if (onLeadUpdate) onLeadUpdate();
    } catch (error) {
      console.error("Error updating investment:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update investment"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateCommunityAccess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lead || !userProfile) {
      setError("Error en la configuración");
      return;
    }

    try {
      setUpdating(true);
      setError(null);

      await updateCommunityAccess(
        lead.id!,
        communityForm.type,
        communityForm.granted,
        userProfile.uid
      );

      // Close modal
      setShowCommunityModal(false);

      if (onLeadUpdate) onLeadUpdate();
    } catch (error) {
      console.error("Error updating community access:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update community access"
      );
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (date: any): string => {
    const jsDate = toJsDate(date);
    if (!jsDate) return "N/A";

    return jsDate.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStudentProgress = () => {
    if (!lead) return 0;

    let progress = 0;

    // Registration completed (always 25% since we have the lead)
    progress += 25;

    // Blofin account created
    if (lead.blofinAccountCreated) progress += 25;

    // Investment completed
    if (lead.blofinInvestmentCompleted) progress += 25;

    // Access granted
    if (lead.accessGranted) progress += 25;

    return progress;
  };

  const getAccessStatus = () => {
    if (!lead) return null;

    if (!lead.accessGranted) return "pending";

    if (lead.accessEndDate) {
      const endDate = toJsDate(lead.accessEndDate);
      if (endDate) {
        const now = new Date();
        return now > endDate ? "expired" : "active";
      }
    }

    return "granted_no_date";
  };

  const getRemainingDays = () => {
    if (!lead?.accessEndDate) return null;

    const endDate = toJsDate(lead.accessEndDate);
    if (!endDate) return null;

    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getAccessStatusBadge = () => {
    const status = getAccessStatus();
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">Acceso Activo</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Pendiente de Acceso
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800">Acceso Expirado</Badge>
        );
      case "granted_no_date":
        return (
          <Badge className="bg-blue-100 text-blue-800">Acceso Otorgado</Badge>
        );
      default:
        return null;
    }
  };

  const getMinimumInvestment = (currency: "USD" | "PEN") => {
    return currency === "USD" ? 30 : 100;
  };

  // Show loading state if parent is still loading the lead
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            <span className="ml-2">Cargando información...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Early return if lead doesn't exist
  if (!lead) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Student Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              Progreso del Estudiante
            </div>
            {getAccessStatusBadge()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Progreso de Incorporación</Label>
              <span className="text-sm font-medium">
                {getStudentProgress()}% completado
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getStudentProgress()}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs text-center mt-2">
              <div
                className={
                  lead ? "text-green-600 font-medium" : "text-gray-400"
                }
              >
                ✓ Registro
              </div>
              <div
                className={
                  lead.blofinAccountCreated
                    ? "text-green-600 font-medium"
                    : "text-gray-400"
                }
              >
                {lead.blofinAccountCreated ? "✓" : "○"} Cuenta Blofin
              </div>
              <div
                className={
                  lead.blofinInvestmentCompleted
                    ? "text-green-600 font-medium"
                    : "text-gray-400"
                }
              >
                {lead.blofinInvestmentCompleted ? "✓" : "○"} Inversión
              </div>
              <div
                className={
                  lead.accessGranted
                    ? "text-green-600 font-medium"
                    : "text-gray-400"
                }
              >
                {lead.accessGranted ? "✓" : "○"} Acceso
              </div>
            </div>
          </div>

          {/* Student Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Estado</Label>
                <p className="font-medium">
                  {lead.status === "student_pending" && "Estudiante Pendiente"}
                  {lead.status === "student_active" && "Estudiante Activo"}
                  {lead.status === "student_inactive" && "Estudiante Inactivo"}
                  {lead.status === "rejected" && "Rechazado"}
                </p>
              </div>

              <div>
                <Label className="text-sm text-gray-500">País</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <p className="font-medium">{lead.country}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">
                  Fecha de Registro
                </Label>
                <p className="font-medium">{formatDate(lead.createdAt)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Cuenta Blofin</Label>
                <div className="flex items-center space-x-2">
                  {lead.blofinAccountCreated ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                  <p className="font-medium">
                    {lead.blofinAccountCreated ? "Creada" : "Pendiente"}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">
                  Inversión en Blofin
                </Label>
                <div className="flex items-center space-x-2">
                  {lead.blofinInvestmentCompleted ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium">
                      {lead.blofinInvestmentCompleted
                        ? "Completada"
                        : "Pendiente"}
                    </p>
                    {lead.blofinInvestmentCompleted && (
                      <p className="text-sm text-gray-600">
                        {lead.blofinInvestmentAmount}{" "}
                        {lead.blofinInvestmentCurrency}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {lead.accessStartDate && (
                <div>
                  <Label className="text-sm text-gray-500">
                    Acceso al Curso
                  </Label>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Inicio: {formatDate(lead.accessStartDate)}
                    </p>
                    {lead.accessEndDate && (
                      <p className="text-sm text-gray-600">
                        {getAccessStatus() === "active"
                          ? `Faltan ${getRemainingDays()} días`
                          : `Expiró: ${formatDate(lead.accessEndDate)}`}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blofin Investment Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-green-600" />
              Gestión de Inversión Blofin
            </div>
            {canManageStudent() && (
              <Dialog
                open={showInvestmentModal}
                onOpenChange={setShowInvestmentModal}
              >
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Actualizar Inversión
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Actualizar Inversión Blofin</DialogTitle>
                    <DialogDescription>
                      Registra o actualiza la inversión de {lead.name} en Blofin
                    </DialogDescription>
                  </DialogHeader>

                  {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md flex items-center text-sm">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleUpdateInvestment} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount">Monto</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={investmentForm.amount}
                          onChange={(e) =>
                            setInvestmentForm({
                              ...investmentForm,
                              amount: e.target.value,
                            })
                          }
                          placeholder="0.00"
                          required
                          disabled={updating}
                        />
                      </div>

                      <div>
                        <Label htmlFor="currency">Moneda</Label>
                        <Select
                          value={investmentForm.currency}
                          onValueChange={(value: "USD" | "PEN") =>
                            setInvestmentForm({
                              ...investmentForm,
                              currency: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD (Mín: $30)</SelectItem>
                            <SelectItem value="PEN">
                              PEN (Mín: S/100)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="completed"
                        checked={investmentForm.completed}
                        onChange={(e) =>
                          setInvestmentForm({
                            ...investmentForm,
                            completed: e.target.checked,
                          })
                        }
                        disabled={updating}
                      />
                      <Label htmlFor="completed">Marcar como completada</Label>
                    </div>

                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                      <p className="font-medium">Requisitos mínimos:</p>
                      <p>• USD: $30 mínimo</p>
                      <p>• PEN: S/100 mínimo</p>
                      <p>
                        • Al completar la inversión mínima, se otorgará acceso
                        automáticamente
                      </p>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowInvestmentModal(false);
                          setInvestmentForm({
                            amount: "",
                            currency: "USD",
                            completed: false,
                          });
                          setError(null);
                        }}
                        disabled={updating}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={updating || !investmentForm.amount}
                      >
                        {updating ? "Actualizando..." : "Actualizar Inversión"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!lead.blofinInvestmentCompleted ? (
            <div className="text-center py-6 text-gray-500">
              <DollarSign className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>
                {lead.blofinAccountCreated
                  ? "Cuenta creada - Esperando inversión mínima"
                  : "No ha creado cuenta en Blofin"}
              </p>
              <p className="text-sm mt-1">
                Mínimo requerido: $30 USD o S/100 PEN
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800">
                      Inversión Completada
                    </div>
                    <div className="text-sm text-green-700">
                      {lead.blofinInvestmentAmount}{" "}
                      {lead.blofinInvestmentCurrency}
                    </div>
                    {lead.blofinProofUploaded && (
                      <div className="text-xs text-green-600 mt-1">
                        ✅ Comprobante verificado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Access Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              Acceso a Comunidades
            </div>
            {canManageStudent() && (
              <Dialog
                open={showCommunityModal}
                onOpenChange={setShowCommunityModal}
              >
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Gestionar Acceso
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Gestionar Acceso a Comunidades</DialogTitle>
                    <DialogDescription>
                      Otorgar o revocar acceso a las comunidades de {lead.name}
                    </DialogDescription>
                  </DialogHeader>

                  {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md flex items-center text-sm">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={handleUpdateCommunityAccess}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="communityType">Tipo de Comunidad</Label>
                      <Select
                        value={communityForm.type}
                        onValueChange={(
                          value: "discord" | "telegram" | "whatsapp"
                        ) =>
                          setCommunityForm({
                            ...communityForm,
                            type: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discord">Discord</SelectItem>
                          <SelectItem value="telegram">Telegram</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="accessType">Acción</Label>
                      <Select
                        value={communityForm.granted ? "grant" : "revoke"}
                        onValueChange={(value) =>
                          setCommunityForm({
                            ...communityForm,
                            granted: value === "grant",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grant">Otorgar Acceso</SelectItem>
                          <SelectItem value="revoke">Revocar Acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowCommunityModal(false);
                          setError(null);
                        }}
                        disabled={updating}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={updating}>
                        {updating ? "Actualizando..." : "Actualizar Acceso"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Discord</span>
                </div>
                {lead.communityAccess?.discord ? (
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">
                    Inactivo
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Comunidad principal de estudiantes
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Telegram</span>
                </div>
                {lead.communityAccess?.telegram ? (
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">
                    Inactivo
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Grupo de avisos y notificaciones
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span className="font-medium">WhatsApp</span>
                </div>
                {lead.communityAccess?.whatsapp ? (
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">
                    Inactivo
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Soporte directo y consultas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Access Management */}
      {lead.accessGranted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-green-600" />
              Acceso al Curso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 mb-1">
                  Estado de Acceso
                </div>
                <div className="font-medium text-green-800">
                  {getAccessStatus() === "active"
                    ? "Acceso Activo"
                    : getAccessStatus() === "expired"
                    ? "Acceso Expirado"
                    : "Acceso Otorgado"}
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Desde: {formatDate(lead.accessStartDate)}
                </div>
                {lead.accessEndDate && (
                  <div className="text-sm text-green-700">
                    Hasta: {formatDate(lead.accessEndDate)}
                  </div>
                )}
                {getRemainingDays() !== null &&
                  getAccessStatus() === "active" && (
                    <div className="text-sm font-medium text-green-800 mt-2">
                      Faltan {getRemainingDays()} días
                    </div>
                  )}
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">
                  Contenido Disponible
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <BookOpen className="h-3 w-3 mr-2 text-blue-500" />
                    <span>8 Cursos completos</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <PlayCircle className="h-3 w-3 mr-2 text-blue-500" />
                    <span>150+ Lecciones en video</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-3 w-3 mr-2 text-blue-500" />
                    <span>Acceso a comunidades</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {hasPermission("active_members:read") && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Gestión de Miembros Activos</div>
                  <div className="text-sm text-gray-500">
                    Ver y gestionar todos los estudiantes activos
                  </div>
                </div>
              </div>
              <Button variant="outline" asChild>
                <a href="/admin/activos">Ver Todos los Activos</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
