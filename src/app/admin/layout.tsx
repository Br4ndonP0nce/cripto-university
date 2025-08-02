// src/app/admin/layout.tsx - Updated with RBAC
"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/ui/admin/DashboardLayout";
import { LenisProvider } from "@/contexts/LenisContext";
interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <LenisProvider>
      <AuthProvider>
        <ProtectedRoute requiredPermissions={["dashboard:read"]}>
          <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
      </AuthProvider>
    </LenisProvider>
  );
}
