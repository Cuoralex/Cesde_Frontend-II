export const statsData = [
  {
    title: "Pacientes Activos",
    value: 47,
    subtitle: "Con antimicrobianos",
    variant: "default"
  },
  {
    title: "Uso Adecuado",
    value: "74%",
    trend: { value: 3.2, label: "vs mes anterior" },
    variant: "success"
  },
  {
    title: "Alertas Pendientes",
    value: 8,
    subtitle: "Requieren revisión",
    variant: "warning"
  },
  {
    title: "ATB Restringidos",
    value: 12,
    subtitle: "Justificaciones activas",
    variant: "critical"
  }
];

export const usageData = [
  { servicio: "UCI", adecuado: 78, inadecuado: 22 },
  { servicio: "Urgencias", adecuado: 65, inadecuado: 35 },
  { servicio: "Pisos", adecuado: 82, inadecuado: 18 },
  { servicio: "Neonatos", adecuado: 71, inadecuado: 29 },
];

export const interventionData = [
  { name: "Desescalar", value: 42, color: "hsl(152, 55%, 40%)" },
  { name: "Suspender", value: 28, color: "hsl(0, 72%, 51%)" },
  { name: "Escalar", value: 18, color: "hsl(38, 92%, 50%)" },
  { name: "RAM", value: 12, color: "hsl(210, 80%, 55%)" },
];

export const recentAlerts = [
  { patient: "Cama 12 - UCI", message: "Dosis excedida", type: "critical" },
  { patient: "Cama 5 - Pisos", message: "Sin justificación", type: "warning" },
  { patient: "Cama 8 - Urgencias", message: "Desescalonamiento", type: "success" },
];
