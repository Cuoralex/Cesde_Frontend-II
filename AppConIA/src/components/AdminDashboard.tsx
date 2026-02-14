import { useState } from 'react';
import { LogOut, Package, TrendingUp, History, FolderOpen, BarChart3 } from 'lucide-react';
import { AuthService } from '../auth';
import { ProductsView } from './admin/ProductsView';
import { CategoriesView } from './admin/CategoriesView';
import { MovementsView } from './admin/MovementsView';
import { StatisticsView } from './admin/StatisticsView';

interface AdminDashboardProps {
  onLogout: () => void;
}

type View = 'products' | 'categories' | 'movements' | 'statistics';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<View>('products');
  const authService = new AuthService();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const menuItems = [
    { id: 'products' as View, label: 'Productos', icon: Package },
    { id: 'categories' as View, label: 'Categorías', icon: FolderOpen },
    { id: 'movements' as View, label: 'Movimientos', icon: TrendingUp },
    { id: 'statistics' as View, label: 'Estadísticas', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Inventarios</h1>
                <p className="text-xs text-gray-500">Panel Administrador</p>
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
                        ? 'bg-blue-600 text-white'
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
            {currentView === 'products' && <ProductsView />}
            {currentView === 'categories' && <CategoriesView />}
            {currentView === 'movements' && <MovementsView />}
            {currentView === 'statistics' && <StatisticsView />}
          </main>
        </div>
      </div>
    </div>
  );
}
