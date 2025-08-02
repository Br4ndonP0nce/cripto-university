// src/app/admin/stats/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { getLeads, Lead } from "@/lib/firebase/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  User,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Globe,
  CreditCard,
} from "lucide-react";

// Helper function to safely convert any timestamp-like value to a Date
function toJsDate(timestamp: any): Date | null {
  if (!timestamp) return null;

  if (timestamp instanceof Date) return timestamp;

  // Firestore Timestamp
  if (
    typeof timestamp === "object" &&
    "toDate" in timestamp &&
    typeof timestamp.toDate === "function"
  ) {
    return timestamp.toDate();
  }

  // Try to create a Date from the value
  try {
    return new Date(timestamp);
  } catch (e) {
    console.error("Failed to convert to date:", timestamp);
    return null;
  }
}

export default function StatsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState("all");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const fetchedLeads = await getLeads();
        setLeads(fetchedLeads);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Failed to load lead data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Filter leads based on selected time frame
  const getFilteredLeads = () => {
    if (timeFrame === "all") return leads;

    const now = new Date();
    const cutoffDate = new Date();

    switch (timeFrame) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return leads;
    }

    return leads.filter((lead) => {
      const leadDate = toJsDate(lead.createdAt);
      if (!leadDate) return false;
      return leadDate >= cutoffDate;
    });
  };

  // Prepare data for status distribution pie chart
  const getStatusDistribution = () => {
    const filteredLeads = getFilteredLeads();
    const statusCounts = {
      student_pending: 0,
      student_active: 0,
      student_inactive: 0,
      rejected: 0,
    };

    filteredLeads.forEach((lead) => {
      if (statusCounts.hasOwnProperty(lead.status)) {
        statusCounts[lead.status]++;
      }
    });

    return [
      {
        name: "Pendientes",
        value: statusCounts.student_pending,
        color: "#3B82F6",
      },
      { name: "Activos", value: statusCounts.student_active, color: "#10B981" },
      {
        name: "Inactivos",
        value: statusCounts.student_inactive,
        color: "#F59E0B",
      },
      { name: "Rechazados", value: statusCounts.rejected, color: "#EF4444" },
    ];
  };

  // Prepare data for conversion funnel chart
  const getConversionData = () => {
    const filteredLeads = getFilteredLeads();
    return [
      { name: "Registros", count: filteredLeads.length, color: "#3B82F6" },
      {
        name: "Con Cuenta Blofin",
        count: filteredLeads.filter((l) => l.blofinAccountCreated).length,
        color: "#F59E0B",
      },
      {
        name: "Inversión Completada",
        count: filteredLeads.filter((l) => l.blofinInvestmentCompleted).length,
        color: "#10B981",
      },
    ];
  };

  // Prepare data for time-based lead trend chart
  const getLeadTrends = () => {
    const filteredLeads = getFilteredLeads();
    const dateMap = new Map();

    filteredLeads.forEach((lead) => {
      const date = toJsDate(lead.createdAt);
      if (!date) return;

      const dateString = date.toISOString().split("T")[0];

      if (!dateMap.has(dateString)) {
        dateMap.set(dateString, { date: dateString, count: 0 });
      }

      const entry = dateMap.get(dateString);
      entry.count += 1;
    });

    return Array.from(dateMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  };

  // Get country distribution data
  const getCountryDistribution = () => {
    const filteredLeads = getFilteredLeads();
    const countryMap = new Map();

    filteredLeads.forEach((lead) => {
      const country = lead.country || "No especificado";
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });

    return Array.from(countryMap.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 countries
  };

  // Calculate investment metrics
  const getInvestmentMetrics = () => {
    const filteredLeads = getFilteredLeads();

    const totalInvestmentUSD = filteredLeads
      .filter(
        (l) =>
          l.blofinInvestmentCompleted && l.blofinInvestmentCurrency === "USD"
      )
      .reduce((sum, l) => sum + (l.blofinInvestmentAmount || 0), 0);

    const totalInvestmentPEN = filteredLeads
      .filter(
        (l) =>
          l.blofinInvestmentCompleted && l.blofinInvestmentCurrency === "PEN"
      )
      .reduce((sum, l) => sum + (l.blofinInvestmentAmount || 0), 0);

    const avgInvestmentUSD = filteredLeads
      .filter(
        (l) =>
          l.blofinInvestmentCompleted && l.blofinInvestmentCurrency === "USD"
      )
      .reduce(
        (avg, l, _, arr) => avg + (l.blofinInvestmentAmount || 0) / arr.length,
        0
      );

    const avgInvestmentPEN = filteredLeads
      .filter(
        (l) =>
          l.blofinInvestmentCompleted && l.blofinInvestmentCurrency === "PEN"
      )
      .reduce(
        (avg, l, _, arr) => avg + (l.blofinInvestmentAmount || 0) / arr.length,
        0
      );

    return {
      totalInvestmentUSD,
      totalInvestmentPEN,
      avgInvestmentUSD: avgInvestmentUSD || 0,
      avgInvestmentPEN: avgInvestmentPEN || 0,
    };
  };

  // Calculate some key metrics
  const getMetrics = () => {
    const filteredLeads = getFilteredLeads();
    const totalStudents = filteredLeads.length;
    const activeStudents = filteredLeads.filter(
      (l) => l.status === "student_active"
    ).length;
    const pendingStudents = filteredLeads.filter(
      (l) => l.status === "student_pending"
    ).length;
    const completedInvestments = filteredLeads.filter(
      (l) => l.blofinInvestmentCompleted
    ).length;
    const accountsCreated = filteredLeads.filter(
      (l) => l.blofinAccountCreated
    ).length;

    // Conversion rates
    const registrationToAccountRate =
      totalStudents > 0 ? (accountsCreated / totalStudents) * 100 : 0;
    const accountToInvestmentRate =
      accountsCreated > 0 ? (completedInvestments / accountsCreated) * 100 : 0;
    const overallConversionRate =
      totalStudents > 0 ? (activeStudents / totalStudents) * 100 : 0;

    // Investment metrics
    const investmentMetrics = getInvestmentMetrics();

    // Countries represented
    const countriesRepresented = new Set(
      filteredLeads.map((l) => l.country).filter(Boolean)
    ).size;

    return {
      totalStudents,
      activeStudents,
      pendingStudents,
      completedInvestments,
      accountsCreated,
      registrationToAccountRate,
      accountToInvestmentRate,
      overallConversionRate,
      countriesRepresented,
      ...investmentMetrics,
    };
  };

  const metrics = getMetrics();
  const statusDistribution = getStatusDistribution();
  const conversionData = getConversionData();
  const trendData = getLeadTrends();
  const countryData = getCountryDistribution();

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Estadísticas de CriptoUniversity</h1>

        <div>
          <Tabs defaultValue="all" onValueChange={setTimeFrame}>
            <TabsList>
              <TabsTrigger value="all">Todo</TabsTrigger>
              <TabsTrigger value="week">Última Semana</TabsTrigger>
              <TabsTrigger value="month">Último Mes</TabsTrigger>
              <TabsTrigger value="quarter">Último Trimestre</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Estudiantes
            </CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStudents}</div>
            <p className="text-xs text-gray-500">Registros totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Estudiantes Activos
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.activeStudents}
            </div>
            <p className="text-xs text-gray-500">
              {metrics.overallConversionRate.toFixed(1)}% de conversión total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inversiones Completadas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.completedInvestments}
            </div>
            <p className="text-xs text-gray-500">
              {metrics.accountToInvestmentRate.toFixed(1)}% de cuentas a
              inversión
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Países Representados
            </CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.countriesRepresented}
            </div>
            <p className="text-xs text-gray-500">Alcance internacional</p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inversiones USD
            </CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${metrics.totalInvestmentUSD.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              Promedio: ${metrics.avgInvestmentUSD.toFixed(0)} por estudiante
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inversiones PEN
            </CardTitle>
            <CreditCard className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              S/{metrics.totalInvestmentPEN.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              Promedio: S/{metrics.avgInvestmentPEN.toFixed(0)} por estudiante
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Status Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5" /> Distribución de Estados
            </CardTitle>
            <CardDescription>
              Distribución de estudiantes por estado actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" /> Embudo de Conversión
            </CardTitle>
            <CardDescription>
              Progreso de estudiantes a través del proceso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="count">
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Countries and Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Countries Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" /> Top Países por Registro
            </CardTitle>
            <CardDescription>
              Países con más estudiantes registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="country"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Registration Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Tendencia de Registros
            </CardTitle>
            <CardDescription>
              Evolución de registros de estudiantes a lo largo del tiempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Nuevos Registros"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Métricas de Conversión
          </CardTitle>
          <CardDescription>
            Análisis detallado del embudo de conversión de estudiantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {metrics.registrationToAccountRate.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-700">
                Registro → Cuenta Blofin
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {metrics.accountsCreated} de {metrics.totalStudents} registros
              </div>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {metrics.accountToInvestmentRate.toFixed(1)}%
              </div>
              <div className="text-sm text-yellow-700">Cuenta → Inversión</div>
              <div className="text-xs text-gray-600 mt-1">
                {metrics.completedInvestments} de {metrics.accountsCreated}{" "}
                cuentas
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {metrics.overallConversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-green-700">Conversión Total</div>
              <div className="text-xs text-gray-600 mt-1">
                {metrics.activeStudents} estudiantes activos
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
