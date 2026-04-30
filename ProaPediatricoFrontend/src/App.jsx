import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoutes"; 

// Páginas
import Login from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ClinicalRound from "./pages/ClinicalRound";
import Indicators from "./pages/Indicators";
import DataUpload from "./pages/DataUpload";
import RestrictedAntibiotics from "./pages/RestrictedAntibiotics";
import PediatricCalculator from "./pages/PediatricCalculator";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta de acceso público */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas Protegidas bajo el Layout */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Rutas hijas que se renderizan en el <Outlet /> del Layout */}
            <Route index element={<Dashboard />} />
            <Route path="ronda" element={<ClinicalRound />} />
            <Route path="indicadores" element={<Indicators />} />
            <Route path="carga" element={<DataUpload />} />
            <Route path="restringidos" element={<RestrictedAntibiotics />} />
            <Route path="calculadora" element={<PediatricCalculator />} />
          </Route>

          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;