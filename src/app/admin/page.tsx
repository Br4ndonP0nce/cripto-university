// src/app/admin/page.tsx - Updated Dashboard for CriptoUniversity
"use client";

import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { useAuth } from "@/hooks/useAuth";
import { getLeads, Lead, getDashboardStats } from "@/lib/firebase/db";

import LeadStatusCard from "@/components/ui/admin/LeadStatusCard";
import LeadTable from "@/components/ui/admin/LeadTable";
import LeadChart from "@/components/ui/admin/LeadChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  TrendingUp,
  Users,
  DollarSign,
  GraduationCap,
} from "lucide-react";

export default function AdminDashboard() {
  const { userProfile, hasPermission } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch students data if user has permission
  useEffect(() => {
    const fetchData = async () => {
      if (!hasPermission("leads:read")) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [fetchedLeads, dashboardStats] = await Promise.all([
          getLeads(),
          getDashboardStats(),
        ]);
        setLeads(fetchedLeads);
        setStats(dashboardStats);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasPermission]);

  return (
    <ProtectedRoute requiredPermissions={["dashboard:read"]}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard CriptoUniversity</h1>
            <p className="text-gray-600">
              Bienvenido, {userProfile?.displayName || userProfile?.email}
            </p>
          </div>

          {/* Role indicator */}
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gray-500" />
            <Badge variant="outline" className="capitalize">
              {userProfile?.role?.replace("_", " ")}
            </Badge>
          </div>
        </div>

        {/* Permission-based content */}
        <PermissionGate
          permissions={["leads:read"]}
          fallback={
            <Card className="mb-8">
              <CardContent className="flex items-center justify-center h-32">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Necesitas acceso de estudiantes para ver estadísticas
                  </p>
                </div>
              </CardContent>
            </Card>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-amber"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <LeadStatusCard
                  title="Total Estudiantes"
                  count={stats?.total || 0}
                  icon="users"
                  color="blue"
                />
                <LeadStatusCard
                  title="Estudiantes Activos"
                  count={stats?.active || 0}
                  icon="check-circle"
                  color="green"
                />
                <LeadStatusCard
                  title="Pendientes"
                  count={stats?.pending || 0}
                  icon="refresh-cw"
                  color="amber"
                />
                <LeadStatusCard
                  title="Inversiones Completadas"
                  count={stats?.investmentsCompleted || 0}
                  subtitle={`${(
                    stats?.totalInvestmentUSD || 0
                  ).toLocaleString()} USD`}
                  icon="dollar-sign"
                  color="purple"
                />
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Cuentas Blofin Creadas
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {stats?.blofinAccountsCreated || 0}
                        </p>
                      </div>
                      <GraduationCap className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Países Representados
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {stats?.countriesRepresented || 0}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Registros Recientes (24h)
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                          {stats?.recentRegistrations || 0}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts - Only show if user has stats access */}
              <PermissionGate permissions={["stats:read"]}>
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                  <h2 className="text-lg font-medium mb-4">
                    Estado de Estudiantes
                  </h2>
                  <div className="h-64">
                    <LeadChart leads={leads} />
                  </div>
                </div>
              </PermissionGate>

              {/* Recent Students Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-medium">Estudiantes Recientes</h2>
                </div>
                <LeadTable
                  leads={leads.slice(0, 5)}
                  onStatusChange={() => {
                    // Refresh students after status change
                    if (hasPermission("leads:read")) {
                      getLeads().then(setLeads);
                      getDashboardStats().then(setStats);
                    }
                  }}
                />
              </div>
            </>
          )}
        </PermissionGate>

        {/* Quick Actions based on permissions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PermissionGate permissions={["leads:write"]}>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => (window.location.href = "/admin/leads")}
            >
              <CardContent className="flex items-center p-4">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-medium">Gestionar Estudiantes</h3>
                  <p className="text-sm text-gray-600">
                    Ver y editar estudiantes
                  </p>
                </div>
              </CardContent>
            </Card>
          </PermissionGate>

          <PermissionGate permissions={["stats:read"]}>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => (window.location.href = "/admin/stats")}
            >
              <CardContent className="flex items-center p-4">
                <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h3 className="font-medium">Ver Analíticas</h3>
                  <p className="text-sm text-gray-600">
                    Estadísticas detalladas
                  </p>
                </div>
              </CardContent>
            </Card>
          </PermissionGate>

          <PermissionGate permissions={["content:read"]}>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => (window.location.href = "/admin/content")}
            >
              <CardContent className="flex items-center p-4">
                <GraduationCap className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <h3 className="font-medium">Gestión de Contenido</h3>
                  <p className="text-sm text-gray-600">
                    Editar contenido del sitio
                  </p>
                </div>
              </CardContent>
            </Card>
          </PermissionGate>
        </div>
      </div>
    </ProtectedRoute>
  );
}
