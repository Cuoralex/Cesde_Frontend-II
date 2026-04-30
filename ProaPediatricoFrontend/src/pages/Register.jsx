import { useState } from "react";
import { Activity, Lock, Mail, Eye, EyeOff, ShieldCheck, User, Stethoscope, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../hooks/useToast";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [service, setService] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Verifica que ambas contraseñas sean idénticas.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Contraseña demasiado corta",
        description: "Debe tener al menos 8 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Aceptación requerida",
        description: "Debes aceptar el aviso de confidencialidad clínica.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Solicitud enviada",
        description: "Tu cuenta será validada por el administrador PROA. Te notificaremos por correo institucional.",
      });
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(215_55%_28%)] to-[hsl(var(--secondary)/0.8)] p-4 py-10">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/0.15)] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(var(--clinical)/0.1)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(var(--secondary))] shadow-lg shadow-[hsl(var(--secondary)/0.3)] mb-4">
            <Activity className="w-8 h-8 text-[hsl(var(--secondary-foreground))]" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">
            Registro PROA Pediátrico
          </h1>
          <p className="text-sm text-primary-foreground/60 mt-1">
            Solicitud de acceso para personal clínico
          </p>
        </div>

        <Card className="border-0 shadow-2xl shadow-black/20 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">
                Tu cuenta requiere validación del administrador
              </span>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">
                  Nombre completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Dr(a). Nombre Apellido"
                    className="pl-10"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Correo institucional
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@hospital.gob.mx"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-foreground">
                    Rol clínico
                  </Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role" className="w-full">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-muted-foreground" />
                        <SelectValue placeholder="Selecciona" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infectologo">Infectólogo/a</SelectItem>
                      <SelectItem value="farmaceutico">Químico farmacéutico</SelectItem>
                      <SelectItem value="epidemiologo">Epidemiólogo/a</SelectItem>
                      <SelectItem value="pediatra">Pediatra</SelectItem>
                      <SelectItem value="enfermeria">Enfermería</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-foreground">
                    Servicio asignado
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="service"
                      type="text"
                      placeholder="UCIP, Oncología…"
                      className="pl-10"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repite la contraseña"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-input accent-[hsl(var(--secondary))]"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Acepto el aviso de confidencialidad clínica y me comprometo al manejo
                  responsable de la información de pacientes según el protocolo PROA.
                </span>
              </label>

              <Button
                type="submit"
                className="w-full h-11 text-sm font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Enviando solicitud…
                  </span>
                ) : (
                  "Solicitar acceso"
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-6">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-secondary hover:underline font-medium">
                Iniciar sesión
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-primary-foreground/40 mt-6">
          © 2026 Programa PROA · Hospital Pediátrico
        </p>
      </div>
    </div>
  );
}
