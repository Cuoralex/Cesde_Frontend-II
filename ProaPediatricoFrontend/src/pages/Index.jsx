import { useState } from "react";
import { Activity, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { users } from "../data/users";
import { Link } from "react-router-dom"; // 👈 asegúrate de tener esto arriba



export default function Login() {
  // 1. Definición de estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Hooks de navegación y contexto
  const navigate = useNavigate();
  const { login } = useAuth();

  // 3. Lógica de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        // 🔍 AQUÍ usas users (esto elimina el error)
        const userFound = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!userFound) {
          toast.error("Credenciales incorrectas");
          return;
        }

        login({
          documento: userFound.documento,
          email: userFound.email,
          name: userFound.name,
          role: userFound.role,
          hospital: userFound.hospital,
          lastLogin: new Date().toISOString()
        });

        toast.success("Bienvenido al sistema PROA");
        navigate("/dashboard");

      } catch (error) {
        console.error(error);
        toast.error("Error al iniciar sesión");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(215_55%_28%)] to-[hsl(var(--secondary)/0.8)] p-4">
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/0.15)] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(var(--clinical)/0.1)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(var(--secondary))] shadow-lg shadow-[hsl(var(--secondary)/0.3)] mb-4">
            <Activity className="w-8 h-8 text-[hsl(var(--secondary-foreground))]" />
          </div>

          <h1 className="text-2xl font-bold text-primary-foreground">
            PROA Pediátrico
          </h1>

          <p className="text-sm text-primary-foreground/60 mt-1">
            Sistema de Vigilancia Antimicrobiana
          </p>
        </div>

        <Card className="border-0 shadow-2xl shadow-black/20 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8">

            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">
                Acceso exclusivo — equipo médico autorizado
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* EMAIL */}
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

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
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
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* OPCIONES */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-input accent-[hsl(var(--secondary))]"
                  />
                  <span className="text-muted-foreground">
                    Recordar sesión
                  </span>
                </label>

                <button
                  type="button"
                  className="text-secondary hover:underline font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* BOTÓN */}
              <Button
                type="submit"
                className="w-full h-11 text-sm font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Verificando...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>
            
            <p className="text-sm text-center text-muted-foreground mt-6">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-secondary hover:underline font-medium">
                Regístrate
              </Link>
            </p>

            <p className="text-xs text-center text-muted-foreground mt-6">
              Si no tienes acceso, contacta al administrador PROA de tu hospital.
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