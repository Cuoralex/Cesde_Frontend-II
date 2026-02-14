import { useState } from 'react';
import { LogOut, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { AuthService } from '../auth';
import { InventoryView } from './employee/InventoryView';
import { RegisterMovementView } from './employee/RegisterMovementView';

interface EmployeeDashboardProps {
  onLogout: () => void;
}

type View = 'inventory' | 'entrada' | 'salida';

export function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  const [currentView, setCurrentView] = useState<View>('inventory');
  const authService = new AuthService();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const menuItems = [
    { id: 'inventory' as View, label: 'Inventario', icon: Package },
    { id: 'entrada' as View, label: 'Registrar Entrada', icon: TrendingUp },
    { id: 'salida' as View, label: 'Registrar Salida', icon: TrendingDown }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Inventarios</h1>
                <p className="text-xs text-gray-500">Panel Empleado</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentView === item.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1">
            {currentView === 'inventory' && <InventoryView />}
            {currentView === 'entrada' && <RegisterMovementView type="entrada" />}
            {currentView === 'salida' && <RegisterMovementView type="salida" />}
          </main>
        </div>
      </div>
    </div>
  );
}
