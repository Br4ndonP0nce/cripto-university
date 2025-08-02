// src/lib/utils/excelExport.ts - Updated for CriptoUniversity Students
import * as XLSX from 'xlsx';
import { Lead } from '@/lib/firebase/db';
import { toJsDate } from '@/lib/utils';

export interface StudentExportData {
  lead: Lead;
}

/**
 * Export students data to Excel with Blofin investment tracking
 */
export const exportStudentsToExcel = async (
  students: Lead[],
  filename?: string
): Promise<void> => {
  try {
    console.log('Preparing student export data...');

    // Prepare data for Excel
    const excelData = students.map((student) => {
      // Basic student data
      const baseData = {
        'Nombre': student.name,
        'Email': student.email,
        'Teléfono': student.phone,
        'País': student.country,
        'Estado': getStatusLabel(student.status),
        'Fecha de Registro': student.createdAt 
          ? formatDateForExcel(student.createdAt)
          : 'N/A',
        'Fuente': student.source || 'N/A',
      };

      // Blofin Investment Data
      const blofinData = {
        'Cuenta Blofin Creada': student.blofinAccountCreated ? 'Sí' : 'No',
        'Inversión Completada': student.blofinInvestmentCompleted ? 'Sí' : 'No',
        'Monto Inversión': student.blofinInvestmentAmount || '-',
        'Moneda Inversión': student.blofinInvestmentCurrency || '-',
        'Comprobante Subido': student.blofinProofUploaded ? 'Sí' : 'No',
      };

      // Course Access Data
      const accessData = {
        'Acceso Otorgado': student.accessGranted ? 'Sí' : 'No',
        'Fecha Inicio Acceso': student.accessStartDate 
          ? formatDateForExcel(student.accessStartDate) 
          : 'N/A',
        'Fecha Fin Acceso': student.accessEndDate 
          ? formatDateForExcel(student.accessEndDate) 
          : 'N/A',
        'Días Restantes Acceso': student.accessEndDate 
          ? getRemainingAccessDays(student) 
          : 'N/A',
        'Estado Acceso': getAccessStatusLabel(student),
      };

      // Community Access Data
      const communityData = {
        'Acceso Discord': student.communityAccess?.discord ? 'Sí' : 'No',
        'Acceso Telegram': student.communityAccess?.telegram ? 'Sí' : 'No',
        'Acceso WhatsApp': student.communityAccess?.whatsapp ? 'Sí' : 'No',
      };

      // Additional Data
      const additionalData = {
        'Notas': student.notes || '-',
        'Última Actualización': student.updatedAt 
          ? formatDateForExcel(student.updatedAt)
          : 'N/A',
      };

      return {
        ...baseData,
        ...blofinData,
        ...accessData,
        ...communityData,
        ...additionalData,
      };
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 20 }, // Nombre
      { wch: 25 }, // Email
      { wch: 15 }, // Teléfono
      { wch: 15 }, // País
      { wch: 18 }, // Estado
      { wch: 18 }, // Fecha de Registro
      { wch: 15 }, // Fuente
      { wch: 18 }, // Cuenta Blofin Creada
      { wch: 18 }, // Inversión Completada
      { wch: 15 }, // Monto Inversión
      { wch: 15 }, // Moneda Inversión
      { wch: 18 }, // Comprobante Subido
      { wch: 15 }, // Acceso Otorgado
      { wch: 18 }, // Fecha Inicio Acceso
      { wch: 18 }, // Fecha Fin Acceso
      { wch: 18 }, // Días Restantes Acceso
      { wch: 15 }, // Estado Acceso
      { wch: 15 }, // Acceso Discord
      { wch: 15 }, // Acceso Telegram
      { wch: 15 }, // Acceso WhatsApp
      { wch: 30 }, // Notas
      { wch: 18 }, // Última Actualización
    ];
    
    ws['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');

    // Create additional summary sheet
    const summaryData = createStudentSummaryData(students);
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    summaryWs['!cols'] = [{ wch: 30 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumen');

    // Create investment analysis sheet
    const investmentData = createInvestmentAnalysisData(students);
    const investmentWs = XLSX.utils.json_to_sheet(investmentData);
    investmentWs['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, investmentWs, 'Análisis Inversiones');

    // Generate filename
    const defaultFilename = `estudiantes_criptouniversity_${new Date().toISOString().slice(0, 10)}.xlsx`;
    const finalFilename = filename || defaultFilename;

    // Save file
    XLSX.writeFile(wb, finalFilename);
    
    console.log('Student export completed successfully!');
  } catch (error) {
    console.error('Error exporting students to Excel:', error);
    throw error;
  }
};

/**
 * Create summary statistics for students
 */
const createStudentSummaryData = (students: Lead[]) => {
  const total = students.length;
  const pendingCount = students.filter(s => s.status === 'student_pending').length;
  const activeCount = students.filter(s => s.status === 'student_active').length;
  const inactiveCount = students.filter(s => s.status === 'student_inactive').length;
  const rejectedCount = students.filter(s => s.status === 'rejected').length;

  const blofinAccountsCreated = students.filter(s => s.blofinAccountCreated).length;
  const investmentsCompleted = students.filter(s => s.blofinInvestmentCompleted).length;
  const accessGranted = students.filter(s => s.accessGranted).length;

  // Investment calculations
  const usdInvestments = students.filter(s => 
    s.blofinInvestmentCompleted && s.blofinInvestmentCurrency === 'USD'
  );
  const penInvestments = students.filter(s => 
    s.blofinInvestmentCompleted && s.blofinInvestmentCurrency === 'PEN'
  );

  const totalUSD = usdInvestments.reduce((sum, s) => sum + (s.blofinInvestmentAmount || 0), 0);
  const totalPEN = penInvestments.reduce((sum, s) => sum + (s.blofinInvestmentAmount || 0), 0);

  // Community access
  const discordAccess = students.filter(s => s.communityAccess?.discord).length;
  const telegramAccess = students.filter(s => s.communityAccess?.telegram).length;
  const whatsappAccess = students.filter(s => s.communityAccess?.whatsapp).length;

  // Countries
  const countries = [...new Set(students.map(s => s.country).filter(Boolean))];

  return [
    { 'Métrica': 'RESUMEN GENERAL', 'Valor': '', 'Detalle': '' },
    { 'Métrica': 'Total de Estudiantes', 'Valor': total, 'Detalle': 'Registros totales' },
    { 'Métrica': 'Estudiantes Pendientes', 'Valor': pendingCount, 'Detalle': `${((pendingCount/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Estudiantes Activos', 'Valor': activeCount, 'Detalle': `${((activeCount/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Estudiantes Inactivos', 'Valor': inactiveCount, 'Detalle': `${((inactiveCount/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Estudiantes Rechazados', 'Valor': rejectedCount, 'Detalle': `${((rejectedCount/total)*100).toFixed(1)}%` },
    { 'Métrica': '', 'Valor': '', 'Detalle': '' },
    
    { 'Métrica': 'PROGRESO BLOFIN', 'Valor': '', 'Detalle': '' },
    { 'Métrica': 'Cuentas Blofin Creadas', 'Valor': blofinAccountsCreated, 'Detalle': `${((blofinAccountsCreated/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Inversiones Completadas', 'Valor': investmentsCompleted, 'Detalle': `${((investmentsCompleted/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Tasa Cuenta → Inversión', 'Valor': `${blofinAccountsCreated > 0 ? ((investmentsCompleted/blofinAccountsCreated)*100).toFixed(1) : 0}%`, 'Detalle': 'Conversión' },
    { 'Métrica': '', 'Valor': '', 'Detalle': '' },
    
    { 'Métrica': 'INVERSIONES', 'Valor': '', 'Detalle': '' },
    { 'Métrica': 'Total Inversiones USD', 'Valor': `$${totalUSD.toLocaleString()}`, 'Detalle': `${usdInvestments.length} inversiones` },
    { 'Métrica': 'Total Inversiones PEN', 'Valor': `S/${totalPEN.toLocaleString()}`, 'Detalle': `${penInvestments.length} inversiones` },
    { 'Métrica': 'Promedio USD', 'Valor': usdInvestments.length > 0 ? `$${(totalUSD/usdInvestments.length).toFixed(0)}` : '$0', 'Detalle': 'Por inversión' },
    { 'Métrica': 'Promedio PEN', 'Valor': penInvestments.length > 0 ? `S/${(totalPEN/penInvestments.length).toFixed(0)}` : 'S/0', 'Detalle': 'Por inversión' },
    { 'Métrica': '', 'Valor': '', 'Detalle': '' },
    
    { 'Métrica': 'ACCESO AL CURSO', 'Valor': '', 'Detalle': '' },
    { 'Métrica': 'Acceso Otorgado', 'Valor': accessGranted, 'Detalle': `${((accessGranted/total)*100).toFixed(1)}%` },
    { 'Métrica': '', 'Valor': '', 'Detalle': '' },
    
    { 'Métrica': 'COMUNIDADES', 'Valor': '', 'Detalle': '' },
    { 'Métrica': 'Acceso Discord', 'Valor': discordAccess, 'Detalle': `${((discordAccess/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Acceso Telegram', 'Valor': telegramAccess, 'Detalle': `${((telegramAccess/total)*100).toFixed(1)}%` },
    { 'Métrica': 'Acceso WhatsApp', 'Valor': whatsappAccess, 'Detalle': `${((whatsappAccess/total)*100).toFixed(1)}%` },
    { 'Métrica': '', 'Valor': '', 'Detalle': '' },
    
    { 'Métrica': 'ALCANCE GEOGRÁFICO', 'Valor': '', 'Detalle': '' },
    { 'Métrica': 'Países Representados', 'Valor': countries.length, 'Detalle': countries.join(', ') },
  ];
};

/**
 * Create investment analysis data
 */
const createInvestmentAnalysisData = (students: Lead[]) => {
  const investmentsByCountry = students.reduce((acc, student) => {
    if (!student.blofinInvestmentCompleted || !student.country) return acc;
    
    const country = student.country;
    if (!acc[country]) {
      acc[country] = { usd: 0, pen: 0, count: 0 };
    }
    
    if (student.blofinInvestmentCurrency === 'USD') {
      acc[country].usd += student.blofinInvestmentAmount || 0;
    } else if (student.blofinInvestmentCurrency === 'PEN') {
      acc[country].pen += student.blofinInvestmentAmount || 0;
    }
    acc[country].count += 1;
    
    return acc;
  }, {} as Record<string, { usd: number; pen: number; count: number }>);

  const analysisData = [
    { 'País': 'RESUMEN POR PAÍS', 'Inversiones USD': '', 'Inversiones PEN': '', 'Total Estudiantes': '', 'Promedio USD': '', 'Promedio PEN': '' },
  ];

  Object.entries(investmentsByCountry).forEach(([country, data]) => {
    const avgUSD = data.usd > 0 ? (data.usd / data.count) : 0;
    const avgPEN = data.pen > 0 ? (data.pen / data.count) : 0;
    
    analysisData.push({
      'País': country,
      'Inversiones USD': data.usd > 0 ? `$${data.usd.toLocaleString()}` : '$0',
      'Inversiones PEN': data.pen > 0 ? `S/${data.pen.toLocaleString()}` : 'S/0',
      'Total Estudiantes': data.count.toString(),
      'Promedio USD': data.usd > 0 ? `$${avgUSD.toFixed(0)}` : '$0',
      'Promedio PEN': data.pen > 0 ? `S/${avgPEN.toFixed(0)}` : 'S/0',
    });
  });

  return analysisData;
};

/**
 * Helper functions
 */
const formatDateForExcel = (date: any): string => {
  const jsDate = toJsDate(date);
  if (!jsDate) return 'N/A';
  
  return jsDate.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusLabel = (status: Lead['status']): string => {
  switch (status) {
    case 'student_pending': return 'Estudiante Pendiente';
    case 'student_active': return 'Estudiante Activo';
    case 'student_inactive': return 'Estudiante Inactivo';
    case 'rejected': return 'Rechazado';
    default: return status;
  }
};

const getAccessStatusLabel = (student: Lead): string => {
  if (!student.accessGranted) return 'Sin Acceso';
  
  if (student.accessEndDate) {
    const now = new Date();
    const endDate = toJsDate(student.accessEndDate);
    if (!endDate) return 'Sin Acceso';
    return now > endDate ? 'Acceso Expirado' : 'Acceso Activo';
  }
  
  return 'Acceso Otorgado';
};

const getRemainingAccessDays = (student: Lead): number | string => {
  if (!student.accessEndDate) return 'N/A';
  
  const now = new Date();
  const endDate = toJsDate(student.accessEndDate);
  if (!endDate) return 'N/A';
  
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Export the function with the old name for backward compatibility
export const exportLeadsToExcel = exportStudentsToExcel;