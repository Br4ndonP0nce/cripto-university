import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  updateLead,
  updateBlofinInvestment,
  updateCommunityAccess,
} from "@/lib/firebase/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserCheck,
  DollarSign,
  AlertCircle,
  Users,
  CheckCircle,
  Globe,
  MessageSquare,
  Clock,
  XCircle,
} from "lucide-react";

interface StudentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    id: string;
    name: string;
    email: string;
    country: string;
    status:
      | "student_pending"
      | "student_active"
      | "student_inactive"
      | "rejected";
    blofinAccountCreated?: boolean;
    blofinInvestmentCompleted?: boolean;
  };
  onSuccess: () => void;
}

export default function StudentStatusModal({
  isOpen,
  onClose,
  lead,
  onSuccess,
}: StudentStatusModalProps) {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "status" | "investment" | "community"
  >("status");

  // Status update form
  const [statusForm, setStatusForm] = useState<{
    newStatus:
      | "student_pending"
      | "student_active"
      | "student_inactive"
      | "rejected";
    notes: string;
    createBlofinAccount: boolean;
  }>({
    newStatus: lead.status,
    notes: "",
    createBlofinAccount: false,
  });

  // Investment form
  const [investmentForm, setInvestmentForm] = useState<{
    amount: string;
    currency: "USD" | "PEN";
    completed: boolean;
    notes: string;
  }>({
    amount: "",
    currency: "USD",
    completed: false,
    notes: "",
  });

  // Community access form
  const [communityForm, setCommunityForm] = useState<{
    discord: boolean;
    telegram: boolean;
    whatsapp: boolean;
    notes: string;
  }>({
    discord: false,
    telegram: false,
    whatsapp: false,
    notes: "",
  });

  React.useEffect(() => {
    if (isOpen) {
      setStatusForm({
        newStatus: lead.status,
        notes: "",
        createBlofinAccount: false,
      });
      setInvestmentForm({
        amount: "",
        currency: "USD",
        completed: false,
        notes: "",
      });
      setCommunityForm({
        discord: false,
        telegram: false,
        whatsapp: false,
        notes: "",
      });
      setError(null);
      setActiveTab("status");
    }
  }, [isOpen, lead]);

  const getStatusRecommendation = () => {
    if (lead.blofinInvestmentCompleted) {
      return {
        status: "student_active",
        message: "Estudiante completó inversión - Recomendado: Activar",
        color: "green",
      };
    } else if (lead.blofinAccountCreated) {
      return {
        status: "student_pending",
        message: "Estudiante creó cuenta - Esperando inversión",
        color: "yellow",
      };
    } else {
      return {
        status: "student_pending",
        message: "Estudiante nuevo - Necesita crear cuenta Blofin",
        color: "blue",
      };
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile) {
      setError("Usuario no autenticado");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Update lead status
      await updateLead(
        lead.id,
        {
          status: statusForm.newStatus,
          blofinAccountCreated:
            statusForm.createBlofinAccount || lead.blofinAccountCreated,
          notes: statusForm.notes || undefined,
        },
        userProfile.uid
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating student status:", err);
      setError(
        err instanceof Error ? err.message : "Error al actualizar estado"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInvestmentUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile || !investmentForm.amount) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    const amount = parseFloat(investmentForm.amount);
    const minAmount = investmentForm.currency === "USD" ? 30 : 100;

    if (amount < minAmount) {
      setError(
        `El monto mínimo es ${
          investmentForm.currency === "USD" ? "$30 USD" : "S/100 PEN"
        }`
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const investmentData = {
        amount,
        currency: investmentForm.currency,
        completed: investmentForm.completed,
      };

      await updateBlofinInvestment(lead.id, investmentData, userProfile.uid);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating investment:", err);
      setError(
        err instanceof Error ? err.message : "Error al actualizar inversión"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCommunityUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile) {
      setError("Usuario no autenticado");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Update each community access
      const updates = [];

      if (communityForm.discord) {
        updates.push(
          updateCommunityAccess(lead.id, "discord", true, userProfile.uid)
        );
      }
      if (communityForm.telegram) {
        updates.push(
          updateCommunityAccess(lead.id, "telegram", true, userProfile.uid)
        );
      }
      if (communityForm.whatsapp) {
        updates.push(
          updateCommunityAccess(lead.id, "whatsapp", true, userProfile.uid)
        );
      }

      await Promise.all(updates);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating community access:", err);
      setError(
        err instanceof Error ? err.message : "Error al actualizar acceso"
      );
    } finally {
      setLoading(false);
    }
  };

  const recommendation = getStatusRecommendation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserCheck className="mr-2 h-5 w-5 text-blue-600" />
            Gestionar Estudiante
          </DialogTitle>
          <DialogDescription>
            Actualizar información y estado de {lead.name}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md flex items-center text-sm">
            <AlertCircle className="mr-2 h-4 w-4" />
            {error}
          </div>
        )}

        {/* Student Analysis */}
        <div
          className={`p-3 rounded-md text-sm ${
            recommendation.color === "green"
              ? "bg-green-50 text-green-800"
              : recommendation.color === "yellow"
              ? "bg-yellow-50 text-yellow-800"
              : "bg-blue-50 text-blue-800"
          }`}
        >
          <p className="font-medium">Estado Actual:</p>
          <p className="mt-1 text-xs">
            País: {lead.country} | Estado: {lead.status}
          </p>
          <p className="mt-1 font-medium">{recommendation.message}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === "status"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Estado
          </button>
          <button
            onClick={() => setActiveTab("investment")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === "investment"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Inversión
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === "community"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Comunidad
          </button>
        </div>

        {/* Status Tab */}
        {activeTab === "status" && (
          <form onSubmit={handleStatusUpdate} className="space-y-4">
            <div>
              <Label htmlFor="newStatus">Nuevo Estado</Label>
              <Select
                value={statusForm.newStatus}
                onValueChange={(value: any) =>
                  setStatusForm({ ...statusForm, newStatus: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student_pending">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Estudiante Pendiente
                    </div>
                  </SelectItem>
                  <SelectItem value="student_active">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Estudiante Activo
                      {recommendation.status === "student_active" && (
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-1 rounded">
                          Recomendado
                        </span>
                      )}
                    </div>
                  </SelectItem>
                  <SelectItem value="student_inactive">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                      Estudiante Inactivo
                    </div>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <div className="flex items-center">
                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      Rechazado
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!lead.blofinAccountCreated && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="createBlofinAccount"
                  checked={statusForm.createBlofinAccount}
                  onCheckedChange={(checked) =>
                    setStatusForm({
                      ...statusForm,
                      createBlofinAccount: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="createBlofinAccount" className="text-sm">
                  Marcar cuenta Blofin como creada
                </Label>
              </div>
            )}

            <div>
              <Label htmlFor="statusNotes">Notas del Cambio</Label>
              <Textarea
                id="statusNotes"
                placeholder="Motivo del cambio de estado, observaciones..."
                value={statusForm.notes}
                onChange={(e) =>
                  setStatusForm({ ...statusForm, notes: e.target.value })
                }
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Actualizando..." : "Actualizar Estado"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* Investment Tab */}
        {activeTab === "investment" && (
          <form onSubmit={handleInvestmentUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invAmount">Monto de Inversión</Label>
                <Input
                  id="invAmount"
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
                />
              </div>

              <div>
                <Label htmlFor="invCurrency">Moneda</Label>
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
                    <SelectItem value="PEN">PEN (Mín: S/100)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="invCompleted"
                checked={investmentForm.completed}
                onCheckedChange={(checked) =>
                  setInvestmentForm({
                    ...investmentForm,
                    completed: checked as boolean,
                  })
                }
              />
              <Label htmlFor="invCompleted" className="text-sm">
                Marcar inversión como completada
              </Label>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <p className="font-medium">Información importante:</p>
              <p>
                • Al completar la inversión mínima, se otorgará acceso
                automáticamente
              </p>
              <p>• El estudiante recibirá acceso al curso por 120 días</p>
            </div>

            <div>
              <Label htmlFor="invNotes">Notas de la Inversión</Label>
              <Textarea
                id="invNotes"
                placeholder="Detalles sobre la inversión, método de pago..."
                value={investmentForm.notes}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    notes: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading || !investmentForm.amount}
              >
                {loading ? "Actualizando..." : "Actualizar Inversión"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* Community Tab */}
        {activeTab === "community" && (
          <form onSubmit={handleCommunityUpdate} className="space-y-4">
            <div className="space-y-3">
              <Label>Otorgar Acceso a Comunidades</Label>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="discordAccess"
                    checked={communityForm.discord}
                    onCheckedChange={(checked) =>
                      setCommunityForm({
                        ...communityForm,
                        discord: checked as boolean,
                      })
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                      <Label htmlFor="discordAccess" className="font-medium">
                        Discord
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comunidad principal de estudiantes
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="telegramAccess"
                    checked={communityForm.telegram}
                    onCheckedChange={(checked) =>
                      setCommunityForm({
                        ...communityForm,
                        telegram: checked as boolean,
                      })
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <Label htmlFor="telegramAccess" className="font-medium">
                        Telegram
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Grupo de avisos y notificaciones
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="whatsappAccess"
                    checked={communityForm.whatsapp}
                    onCheckedChange={(checked) =>
                      setCommunityForm({
                        ...communityForm,
                        whatsapp: checked as boolean,
                      })
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                      <Label htmlFor="whatsappAccess" className="font-medium">
                        WhatsApp
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Soporte directo y consultas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="communityNotes">Notas del Acceso</Label>
              <Textarea
                id="communityNotes"
                placeholder="Observaciones sobre el acceso a comunidades..."
                value={communityForm.notes}
                onChange={(e) =>
                  setCommunityForm({
                    ...communityForm,
                    notes: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-md">
              <p className="font-medium">Nota:</p>
              <p>
                • Solo selecciona las comunidades a las que quieres otorgar
                acceso
              </p>
              <p>
                • Para revocar acceso, usa la gestión individual en la pestaña
                principal
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={
                  loading ||
                  (!communityForm.discord &&
                    !communityForm.telegram &&
                    !communityForm.whatsapp)
                }
              >
                {loading ? "Actualizando..." : "Otorgar Acceso"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
