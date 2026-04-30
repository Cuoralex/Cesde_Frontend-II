import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calculator, 
  ShieldAlert, 
  BarChart3, 
  Upload,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }, // Corregido a /dashboard para coincidir con tu login
  { to: "/ronda", icon: ClipboardList, label: "Ronda Clínica" },
  { to: "/calculadora", icon: Calculator, label: "Calculadora Pediátrica" },
  { to: "/restringidos", icon: ShieldAlert, label: "ATB Restringidos" },
  { to: "/indicadores", icon: BarChart3, label: "Indicadores" },
  { to: "/carga", icon: Upload, label: "Carga de Datos" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border shadow-lg">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg clinical-gradient">
          <Activity className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-sidebar-foreground tracking-tight">PROA</h1>
          <p className="text-[10px] text-sidebar-muted font-medium tracking-wider uppercase">Stewardship</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          // Comprobamos si la ruta actual coincide con el item
          const isActive = location.pathname === item.to;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border bg-sidebar/50">
        <p className="text-[10px] text-sidebar-muted text-center leading-tight">
          Programa de Optimización de Antimicrobianos
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;