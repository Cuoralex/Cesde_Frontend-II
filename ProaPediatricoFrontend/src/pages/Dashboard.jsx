/* eslint-disable no-unused-vars */
import { Activity, Users, AlertTriangle, CheckCircle, TrendingUp, Pill } from "lucide-react";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { statsData, usageData, interventionData, recentAlerts } from "../services/dataService";

const alertStyles = {
  critical: "bg-destructive/10 border-destructive/30 text-destructive",
  warning: "bg-warning/10 border-warning/30 text-warning-foreground",
  success: "bg-success/10 border-success/30 text-success",
};

const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard PROA</h1>
      <p className="text-sm text-muted-foreground mt-1">Programa de Optimización de Antimicrobianos — Resumen operativo</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard icon={Users} title="Pacientes Activos" value={47} subtitle="Con antimicrobianos" variant="default" />
      <StatCard icon={CheckCircle} title="Uso Adecuado" value="74%" trend={{ value: 3.2, label: "vs mes anterior" }} variant="success" />
      <StatCard icon={AlertTriangle} title="Alertas Pendientes" value={8} subtitle="Requieren revisión" variant="warning" />
      <StatCard icon={Pill} title="ATB Restringidos" value={12} subtitle="Justificaciones activas" variant="critical" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Uso de Antimicrobianos por Servicio</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={usageData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="servicio" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="adecuado" name="Adecuado %" fill="hsl(152, 55%, 40%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inadecuado" name="Inadecuado %" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Intervenciones del Mes</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={interventionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
              {interventionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2">
          {interventionData.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4 text-secondary" /> Alertas Recientes
      </h3>
      <div className="space-y-2">
        {recentAlerts.map((alert, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${alertStyles[alert.type]}`}>
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold">{alert.patient}</p>
              <p className="text-xs opacity-80">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Dashboard;