/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Send } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const restrictedDrugs = [
  "Meropenem", "Vancomicina", "Linezolid", "Colistina", "Caspofungina",
  "Voriconazol", "Daptomicina", "Tigeciclina", "Ertapenem",
];

const RestrictedAntibiotics = () => {
  const [formData, setFormData] = useState({
    patient: "", 
    bed: "", 
    service: "", 
    drug: "", 
    indication: "", 
    cultures: "", 
    justification: "", 
    prescriber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Justificación registrada exitosamente", {
      description: `${formData.drug} para cama ${formData.bed}`,
    });
    setFormData({ 
      patient: "", 
      bed: "", 
      service: "", 
      drug: "", 
      indication: "", 
      cultures: "", 
      justification: "", 
      prescriber: "" 
    });
  };

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-destructive" /> Antibióticos Restringidos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Formulario de justificación médica obligatoria</p>
      </div>

      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass-card rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Nombre del Paciente</Label>
            <Input 
              value={formData.patient} 
              onChange={(e) => update("patient", e.target.value)} 
              placeholder="Apellido, Nombre" 
              className="mt-1.5 bg-background" 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Cama</Label>
              <Input 
                value={formData.bed} 
                onChange={(e) => update("bed", e.target.value)} 
                placeholder="UCI-12" 
                className="mt-1.5 bg-background" 
                required 
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Servicio</Label>
              <Select value={formData.service} onValueChange={(v) => update("service", v)}>
                <SelectTrigger className="mt-1.5 bg-background">
                  <SelectValue placeholder="Servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UCI">UCI</SelectItem>
                  <SelectItem value="Urgencias">Urgencias</SelectItem>
                  <SelectItem value="Pisos">Pisos</SelectItem>
                  <SelectItem value="Neonatos">Neonatos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Antimicrobiano Restringido</Label>
            <Select value={formData.drug} onValueChange={(v) => update("drug", v)}>
              <SelectTrigger className="mt-1.5 bg-background">
                <SelectValue placeholder="Seleccionar fármaco" />
              </SelectTrigger>
              <SelectContent>
                {restrictedDrugs.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Indicación / Diagnóstico CIE-10</Label>
            <Input 
              value={formData.indication} 
              onChange={(e) => update("indication", e.target.value)} 
              placeholder="ej. A41.9 Sepsis" 
              className="mt-1.5 bg-background" 
              required 
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground">Cultivos / Antibiograma</Label>
            <Textarea 
              value={formData.cultures} 
              onChange={(e) => update("cultures", e.target.value)} 
              placeholder="Resultados de cultivos y sensibilidad..." 
              className="mt-1.5 bg-background min-h-[80px]" 
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground">Justificación Clínica</Label>
            <Textarea 
              value={formData.justification} 
              onChange={(e) => update("justification", e.target.value)} 
              placeholder="Justificación detallada del uso del antimicrobiano restringido..." 
              className="mt-1.5 bg-background min-h-[100px]" 
              required 
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Médico Prescriptor</Label>
            <Input 
              value={formData.prescriber} 
              onChange={(e) => update("prescriber", e.target.value)} 
              placeholder="Dr. / Dra." 
              className="mt-1.5 bg-background" 
              required 
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
            <Send className="w-4 h-4" /> Enviar Justificación
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default RestrictedAntibiotics;