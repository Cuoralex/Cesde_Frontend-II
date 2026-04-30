/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, AlertTriangle, CheckCircle, Baby } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/Button";

const drugLimits = [
  { name: "Amikacina", maxDosePerKg: 15, maxAbsolute: 1500, unit: "mg", frequency: "c/24h" },
  { name: "Ampicilina", maxDosePerKg: 200, maxAbsolute: 12000, unit: "mg", frequency: "c/6h" },
  { name: "Ceftriaxona", maxDosePerKg: 100, maxAbsolute: 4000, unit: "mg", frequency: "c/12-24h" },
  { name: "Clindamicina", maxDosePerKg: 40, maxAbsolute: 2700, unit: "mg", frequency: "c/6-8h" },
  { name: "Gentamicina", maxDosePerKg: 7.5, maxAbsolute: 500, unit: "mg", frequency: "c/24h" },
  { name: "Meropenem", maxDosePerKg: 120, maxAbsolute: 6000, unit: "mg", frequency: "c/8h" },
  { name: "Vancomicina", maxDosePerKg: 60, maxAbsolute: 4000, unit: "mg", frequency: "c/6h" },
  { name: "Piperacilina/Tazo", maxDosePerKg: 300, maxAbsolute: 16000, unit: "mg", frequency: "c/6-8h" },
];

const PediatricCalculator = () => {
  const [selectedDrug, setSelectedDrug] = useState("");
  const [weight, setWeight] = useState("");
  const [prescribedDose, setPrescribedDose] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const drug = drugLimits.find((d) => d.name === selectedDrug);
    if (!drug || !weight || !prescribedDose) return;
    const w = parseFloat(weight);
    const prescribed = parseFloat(prescribedDose);
    const maxByWeight = drug.maxDosePerKg * w;
    const effectiveMax = Math.min(maxByWeight, drug.maxAbsolute);
    setResult({ 
      safe: prescribed <= effectiveMax, 
      maxByWeight, 
      maxAbsolute: drug.maxAbsolute, 
      prescribed, 
      drug 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Baby className="w-6 h-6 text-secondary" /> Calculadora de Seguridad Pediátrica
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Validación de dosis máximas por peso (mg/kg/día)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calculator className="w-4 h-4 text-secondary" /> Datos del Paciente
          </h3>

          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Antimicrobiano</Label>
              <Select value={selectedDrug} onValueChange={setSelectedDrug}>
                <SelectTrigger className="mt-1.5 bg-background">
                  <SelectValue placeholder="Seleccionar medicamento" />
                </SelectTrigger>
                <SelectContent>
                  {drugLimits.map((d) => (
                    <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Peso del paciente (kg)</Label>
              <Input 
                type="number" 
                placeholder="ej. 12.5" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                className="mt-1.5 bg-background" 
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Dosis prescrita total (mg/día)</Label>
              <Input 
                type="number" 
                placeholder="ej. 600" 
                value={prescribedDose} 
                onChange={(e) => setPrescribedDose(e.target.value)} 
                className="mt-1.5 bg-background" 
              />
            </div>
            <Button onClick={calculate} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Verificar Dosis
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {result ? (
            <div className={`rounded-xl p-6 border-2 ${result.safe ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
              <div className="flex items-center gap-3 mb-4">
                {result.safe ? (
                  <CheckCircle className="w-8 h-8 text-success" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-destructive animate-pulse-alert" />
                )}
                <div>
                  <h3 className={`text-lg font-bold ${result.safe ? "text-success" : "text-destructive"}`}>
                    {result.safe ? "DOSIS SEGURA" : "⚠ DOSIS EXCEDE LÍMITE"}
                  </h3>
                  <p className="text-xs text-muted-foreground">{result.drug.name} — {result.drug.frequency}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-lg bg-background/60">
                  <span className="text-xs text-muted-foreground">Dosis prescrita</span>
                  <span className="text-sm font-bold font-mono">{result.prescribed} {result.drug.unit}/día</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background/60">
                  <span className="text-xs text-muted-foreground">Máximo por peso ({result.drug.maxDosePerKg} {result.drug.unit}/kg/día)</span>
                  <span className="text-sm font-bold font-mono">{result.maxByWeight.toFixed(1)} {result.drug.unit}/día</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background/60">
                  <span className="text-xs text-muted-foreground">Máximo absoluto</span>
                  <span className="text-sm font-bold font-mono">{result.maxAbsolute} {result.drug.unit}/día</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center h-full text-center">
              <Calculator className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Selecciona un medicamento e ingresa los datos para validar la dosis</p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Tabla de Referencia — Dosis Máximas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-muted-foreground">Medicamento</th>
                <th className="text-right py-2 px-3 font-semibold text-muted-foreground">Dosis Máx (mg/kg/día)</th>
                <th className="text-right py-2 px-3 font-semibold text-muted-foreground">Máx Absoluto (mg)</th>
                <th className="text-left py-2 px-3 font-semibold text-muted-foreground">Frecuencia</th>
              </tr>
            </thead>
            <tbody>
              {drugLimits.map((d) => (
                <tr key={d.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2 px-3 font-medium">{d.name}</td>
                  <td className="text-right py-2 px-3 font-mono">{d.maxDosePerKg}</td>
                  <td className="text-right py-2 px-3 font-mono">{d.maxAbsolute.toLocaleString()}</td>
                  <td className="py-2 px-3">{d.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PediatricCalculator;