/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, CheckCircle, Filter, Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";

const DataUpload = () => {
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const simulateUpload = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setUploaded(true);
      toast.success("Reporte procesado exitosamente", {
        description: "47 registros importados, 12 duplicados eliminados, 5 tópicos filtrados",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Upload className="w-6 h-6 text-secondary" /> Carga de Datos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Importación del Reporte ATB desde el sistema hospitalario</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-8">
        {!uploaded ? (
          <div className="flex flex-col items-center text-center">
            <div
              onClick={simulateUpload}
              className="w-full max-w-md border-2 border-dashed border-border rounded-xl p-10 cursor-pointer hover:border-secondary/50 hover:bg-accent/30 transition-all"
            >
              {processing ? (
                <div className="space-y-3">
                  <div className="w-10 h-10 border-3 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-medium text-foreground">Procesando reporte...</p>
                  <p className="text-xs text-muted-foreground">Filtrando tópicos, óticos y duplicados</p>
                </div>
              ) : (
                <>
                  <FileSpreadsheet className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Arrastra tu archivo CSV/Excel aquí</p>
                  <p className="text-xs text-muted-foreground mt-1">o haz clic para seleccionar</p>
                  <p className="text-[10px] text-muted-foreground mt-3">Formatos aceptados: .csv, .xlsx (Reporte ATB)</p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-semibold text-success">Importación Completada</p>
                <p className="text-xs text-muted-foreground">Reporte ATB — Marzo 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-foreground">47</p>
                <p className="text-xs text-muted-foreground">Registros importados</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-warning" />
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <p className="text-xs text-muted-foreground">Duplicados eliminados</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-secondary" />
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
                <p className="text-xs text-muted-foreground">Tópicos/óticos filtrados</p>
              </div>
            </div>

            <Button variant="outline" onClick={() => setUploaded(false)} className="mt-2">
              Cargar Nuevo Reporte
            </Button>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Filtros Automáticos Aplicados</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-success" /> Eliminación de medicamentos tópicos (cremas, ungüentos)</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-success" /> Eliminación de preparaciones óticas</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-success" /> Deduplicación por paciente + medicamento + fecha</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-success" /> Validación de campos obligatorios</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default DataUpload;