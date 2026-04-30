import { Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/Button";
import { LogOut } from "lucide-react";

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="ml-64 min-h-screen">
        
        {/* 🔹 Header agregado */}
        <div className="border-b bg-card px-6 py-3 flex justify-between items-center">
          <span className="text-sm font-semibold">
            SISTEMA PROA
          </span>

          <div className="flex items-center gap-4">
            {/* Usuario */}
            <span className="text-xs text-muted-foreground">
              {user?.email || "Sin sesión"}
            </span>

            {/* Logout */}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AppLayout;
