import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Package, Activity } from 'lucide-react';
import { ProductService } from '../../productService';
import { MovementService } from '../../movementService';
import { Product } from '../../storage';

export function StatisticsView() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [topMovements, setTopMovements] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalMovements, setTotalMovements] = useState(0);

  const productService = new ProductService();
  const movementService = new MovementService();

  useEffect(() => {
    setLowStockProducts(productService.getLowStockProducts());
    setTopMovements(movementService.getMovementStats());
    setTotalProducts(productService.getAllProducts().length);
    setTotalMovements(movementService.getAllMovements().length);
  }, []);

  const stats = [
    {
      label: 'Total Productos',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Productos Bajo Stock',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    },
    {
      label: 'Total Movimientos',
      value: totalMovements,
      icon: Activity,
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Productos con Bajo Stock</h3>
          </div>

          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">{product.stock}</p>
                    <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hay productos con bajo stock</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Productos con Más Movimientos</h3>
          </div>

          {topMovements.length > 0 ? (
            <div className="space-y-3">
              {topMovements.map((item, index) => (
                <div key={item.productId} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="font-medium text-gray-900">{item.productName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{item.movementCount}</p>
                    <p className="text-xs text-gray-500">movimientos</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hay datos de movimientos</p>
          )}
        </div>
      </div>
    </div>
  );
}
