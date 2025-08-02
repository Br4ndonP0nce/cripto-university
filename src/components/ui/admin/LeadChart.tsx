// src/components/ui/admin/LeadChart.tsx - Updated for CriptoUniversity
"use client";

import React, { useMemo } from "react";
import { Lead } from "@/lib/firebase/db";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface LeadChartProps {
  leads: Lead[];
  chartType?: "pie" | "bar";
}

const LeadChart: React.FC<LeadChartProps> = ({ leads, chartType = "pie" }) => {
  // Transform leads data into chart format
  const chartData = useMemo(() => {
    const statusCounts = {
      student_pending: 0,
      student_active: 0,
      student_inactive: 0,
      rejected: 0,
    };

    leads.forEach((lead) => {
      if (lead.status in statusCounts) {
        statusCounts[lead.status as keyof typeof statusCounts]++;
      }
    });

    // Create data array with proper labels
    const data = [
      {
        name: "Pendientes",
        value: statusCounts.student_pending,
        color: "#F59E0B",
        fullName: "Estudiantes Pendientes",
      },
      {
        name: "Activos",
        value: statusCounts.student_active,
        color: "#10B981",
        fullName: "Estudiantes Activos",
      },
      {
        name: "Inactivos",
        value: statusCounts.student_inactive,
        color: "#6B7280",
        fullName: "Estudiantes Inactivos",
      },
      {
        name: "Rechazados",
        value: statusCounts.rejected,
        color: "#EF4444",
        fullName: "Estudiantes Rechazados",
      },
    ].filter((item) => item.value > 0); // Only include entries with values > 0

    return data;
  }, [leads]);

  // Country distribution data
  const countryData = useMemo(() => {
    const countryCounts: Record<string, number> = {};

    leads.forEach((lead) => {
      const country = lead.country || "other";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const countryNames: Record<string, string> = {
      mx: "México",
      ar: "Argentina",
      pe: "Perú",
      co: "Colombia",
      cl: "Chile",
      br: "Brasil",
      ec: "Ecuador",
      ve: "Venezuela",
      other: "Otros",
    };

    return Object.entries(countryCounts)
      .map(([country, count]) => ({
        name: countryNames[country] || country,
        value: count,
        country: country,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 countries
  }, [leads]);

  // Custom label function for pie chart
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
  }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices < 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${value}`}
      </text>
    );
  };

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage =
        leads.length > 0 ? Math.round((data.value / leads.length) * 100) : 0;

      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-900">{`${
            data.payload.fullName || data.name
          }`}</p>
          <p className="text-sm text-gray-600">{`Cantidad: ${data.value}`}</p>
          <p className="text-sm text-gray-600">{`Porcentaje: ${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Handle empty states
  if (leads.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500 text-lg">No hay datos para mostrar</p>
          <p className="text-gray-400 text-sm">
            Los estudiantes aparecerán aquí cuando se registren
          </p>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">
          No hay datos suficientes para mostrar el gráfico
        </p>
      </div>
    );
  }

  // Single data point display
  if (chartData.length === 1) {
    const singleData = chartData[0];
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: singleData.color }}
        >
          <span className="text-white font-bold text-xl">
            {singleData.value}
          </span>
        </div>
        <p className="text-gray-700 font-medium">{singleData.fullName}</p>
        <p className="text-gray-500 text-sm">100% del total</p>
      </div>
    );
  }

  // Render pie chart
  if (chartType === "pie") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // Render bar chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LeadChart;
