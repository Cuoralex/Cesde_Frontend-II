/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, AlertTriangle } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

const mockPatients = [
  { id: 1, cama: "UCI-12", nombre: "García López, María", servicio: "UCI", antimicrobiano: "Meropenem", dosis: "1g", frecuencia: "c/8h", dias: 5, diagnostico: "Sepsis", estado: "alerta" },
  { id: 2, cama: "UCI-08", nombre: "Rodríguez P., Juan", servicio: "UCI", antimicrobiano: "Vancomicina", dosis: "1g", frecuencia: "c/12h", dias: 3, diagnostico: "NAC", estado: "activo" },
  { id: 3, cama: "P3-15", nombre: "Martínez S., Ana", servicio: "Pisos", antimicrobiano: "Ceftriaxona", dosis: "2g", frecuencia: "c/24h", dias: 7, diagnostico: "ITU", estado: "revision" },
  { id: 4, cama: "URG-02", nombre: "Hernández R., Carlos", servicio: "Urgencias", antimicrobiano: "Piperacilina/Tazo", dosis: "4.5g", frecuencia: "c/6h", dias: 2, diagnostico: "ITB", estado: "activo" },
  { id: 5, cama: "NEO-04", nombre: "López V., Sofía (RN)", servicio: "Neonatos", antimicrobiano: "Ampicilina", dosis: "50mg/kg", frecuencia: "c/12h", dias: 4, diagnostico: "Sepsis neonatal", estado: "alerta" },
];

const estadoBadge = {
  activo: "bg-success/10 text-success border-success/30",
  alerta: "bg-destructive/10 text-destructive border-destructive/30 animate-pulse-alert",
  revision: "bg-warning/10 text-warning-foreground border-warning/30",
};

const ClinicalRound = () => {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filtered = mockPatients.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) || 
                        p.cama.toLowerCase().includes(search.toLowerCase());
    const matchService = serviceFilter === "all" || p.servicio === serviceFilter;
    return matchSearch && matchService;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ronda Clínica</h1>
        <p className="text-sm text-muted-foreground mt-1">Formato de seguimiento de antimicrobianos</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass-card rounded-xl p-4 flex flex-wrap gap-3 items-center"
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar paciente o cama..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="pl-9 bg-background" 
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[150px] bg-background">
              <SelectValue placeholder="Servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="UCI">UCI</SelectItem>
              <SelectItem value="Urgencias">Urgencias</SelectItem>
              <SelectItem value="Pisos">Pisos</SelectItem>
              <SelectItem value="Neonatos">Neonatos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }} 
        className="glass-card rounded-xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-semibold">Cama</TableHead>
              <TableHead className="text-xs font-semibold">Paciente</TableHead>
              <TableHead className="text-xs font-semibold">Antimicrobiano</TableHead>
              <TableHead className="text-xs font-semibold">Dosis</TableHead>
              <TableHead className="text-xs font-semibold">Frec.</TableHead>
              <TableHead className="text-xs font-semibold">Días</TableHead>
              <TableHead className="text-xs font-semibold">Dx</TableHead>
              <TableHead className="text-xs font-semibold">Estado</TableHead>
              <TableHead className="text-xs font-semibold">Intervención</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-xs font-semibold">{p.cama}</TableCell>
                <TableCell className="text-sm font-medium">{p.nombre}</TableCell>
                <TableCell>
                  <span className="text-sm">{p.antimicrobiano}</span>
                  {["Meropenem", "Vancomicina"].includes(p.antimicrobiano) && (
                    <AlertTriangle className="inline w-3.5 h-3.5 ml-1.5 text-warning" />
                  )}
                </TableCell>
                <TableCell className="font-mono text-xs">{p.dosis}</TableCell>
                <TableCell className="text-xs">{p.frecuencia}</TableCell>
                <TableCell className="font-mono text-xs">{p.dias}</TableCell>
                <TableCell className="text-xs">{p.diagnostico}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] ${estadoBadge[p.estado]}`}>
                    {p.estado === "activo" ? "Activo" : p.estado === "alerta" ? "Alerta" : "Revisión"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 hover:bg-success/10 hover:text-success hover:border-success/30">Desescalar</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">Suspender</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 hover:bg-warning/10 hover:text-warning-foreground hover:border-warning/30">RAM</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default ClinicalRound;