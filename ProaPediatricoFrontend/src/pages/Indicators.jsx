/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const monthlyData = [
  { mes: "Ene", adecuado: 68, inadecuado: 32 },
  { mes: "Feb", adecuado: 72, inadecuado: 28 },
  { mes: "Mar", adecuado: 70, inadecuado: 30 },
  { mes: "Abr", adecuado: 74, inadecuado: 26 },
  { mes: "May", adecuado: 76, inadecuado: 24 },
  { mes: "Jun", adecuado: 74, inadecuado: 26 },
];

const interventionTrend = [
  { mes: "Ene", suspender: 12, desescalar: 18, escalar: 8, ram: 4 },
  { mes: "Feb", suspender: 10, desescalar: 22, escalar: 6, ram: 3 },
  { mes: "Mar", suspender: 14, desescalar: 20, escalar: 9, ram: 5 },
  { mes: "Abr", suspender: 8, desescalar: 25, escalar: 7, ram: 2 },
  { mes: "May", suspender: 11, desescalar: 28, escalar: 5, ram: 3 },
  { mes: "Jun", suspender: 9, desescalar: 30, escalar: 4, ram: 2 },
];

const serviceBreakdown = [
  { servicio: "UCI", total: 120, adecuado: 85, inadecuado: 35, intervenciones: 42 },
  { servicio: "Urgencias", total: 95, adecuado: 62, inadecuado: 33, intervenciones: 28 },
  { servicio: "Pisos", total: 78, adecuado: 65, inadecuado: 13, intervenciones: 15 },
  { servicio: "Neonatos", total: 45, adecuado: 32, inadecuado: 13, intervenciones: 18 },
];

const chartStyle = { 
  background: "hsl(var(--card))", 
  border: "1px solid hsl(var(--border))", 
  borderRadius: 8, 
  fontSize: 12 
};

const Indicators = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-secondary" /> Indicadores PROA
      </h1>
      <p className="text-sm text-muted-foreground mt-1">Consolidado mensual de uso de antimicrobianos e intervenciones</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">% Uso Adecuado vs Inadecuado (Mensual)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={chartStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="adecuado" name="Adecuado %" fill="hsl(152, 55%, 40%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inadecuado" name="Inadecuado %" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-secondary" /> Tendencia de Intervenciones
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={interventionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={chartStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="desescalar" name="Desescalar" stroke="hsl(152, 55%, 40%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="suspender" name="Suspender" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="escalar" name="Escalar" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="ram" name="RAM" stroke="hsl(210, 80%, 55%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Desglose por Servicio</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs">Servicio</th>
              <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs">Total Prescripciones</th>
              <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs">Adecuado</th>
              <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs">Inadecuado</th>
              <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs">% Adecuado</th>
              <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs">Intervenciones</th>
            </tr>
          </thead>
          <tbody>
            {serviceBreakdown.map((s) => (
              <tr key={s.servicio} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-semibold">{s.servicio}</td>
                <td className="text-right py-3 px-4 font-mono">{s.total}</td>
                <td className="text-right py-3 px-4 font-mono text-success">{s.adecuado}</td>
                <td className="text-right py-3 px-4 font-mono text-destructive">{s.inadecuado}</td>
                <td className="text-right py-3 px-4 font-mono font-bold">{((s.adecuado / s.total) * 100).toFixed(1)}%</td>
                <td className="text-right py-3 px-4 font-mono">{s.intervenciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
);

export default Indicators;