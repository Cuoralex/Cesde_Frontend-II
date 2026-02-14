import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, CheckCircle, XCircle } from 'lucide-react';
import { ProductService } from '../../productService';
import { MovementService } from '../../movementService';
import { AuthService } from '../../auth';
import { Product } from '../../storage';

interface RegisterMovementViewProps {
  type: 'entrada' | 'salida';
}

export function RegisterMovementView({ type }: RegisterMovementViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState<'compra' | 'venta' | 'perdida'>('compra');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const productService = new ProductService();
  const movementService = new MovementService();
  const authService = new AuthService();

  useEffect(() => {
    setProducts(productService.getAllProducts());
    if (type === 'entrada') {
      setReason('compra');
    } else {
      setReason('venta');
    }
  }, [type]);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const user = authService.getCurrentUser();
    if (!user) {
      setMessage({ type: 'error', text: 'No se pudo identificar al usuario' });
      return;
    }

    if (!selectedProductId) {
      setMessage({ type: 'error', text: 'Selecciona un producto' });
      return;
    }

    if (quantity <= 0) {
      setMessage({ type: 'error', text: 'La cantidad debe ser mayor a 0' });
      return;
    }

    if (type === 'salida' && selectedProduct && quantity > selectedProduct.stock) {
      setMessage({ type: 'error', text: `Stock insuficiente. Disponible: ${selectedProduct.stock}` });
      return;
    }

    const movement = movementService.createMovement(
      selectedProductId,
      type,
      reason,
      quantity,
      user
    );

    if (movement) {
      setMessage({
        type: 'success',
        text: `${type === 'entrada' ? 'Entrada' : 'Salida'} registrada exitosamente`
      });
      setSelectedProductId('');
      setQuantity(1);
      setProducts(productService.getAllProducts());
    } else {
      setMessage({ type: 'error', text: 'Error al registrar el movimiento' });
    }
  };

  const Icon = type === 'entrada' ? TrendingUp : TrendingDown;
  const color = type === 'entrada' ? 'green' : 'red';

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Icon className={`w-8 h-8 text-${color}-600`} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Registrar {type === 'entrada' ? 'Entrada' : 'Salida'}
            </h2>
            <p className="text-sm text-gray-600">
              {type === 'entrada' ? 'Agregar productos al inventario' : 'Retirar productos del inventario'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Producto
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Stock: {product.stock}
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Información del Producto</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Categoría:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedProduct.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Stock Actual:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedProduct.stock}</span>
                </div>
                <div>
                  <span className="text-gray-600">Precio:</span>
                  <span className="ml-2 font-medium text-gray-900">${selectedProduct.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Stock Mínimo:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedProduct.minStock}</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="1"
              required
            />
            {selectedProduct && type === 'salida' && quantity > selectedProduct.stock && (
              <p className="mt-2 text-sm text-red-600">
                Stock insuficiente. Disponible: {selectedProduct.stock}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as 'compra' | 'venta' | 'perdida')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {type === 'entrada' ? (
                <option value="compra">Compra</option>
              ) : (
                <>
                  <option value="venta">Venta</option>
                  <option value="perdida">Pérdida</option>
                </>
              )}
            </select>
          </div>

          {message && (
            <div className={`flex items-center gap-2 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={`text-sm ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {message.text}
              </span>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-colors font-medium`}
          >
            Registrar {type === 'entrada' ? 'Entrada' : 'Salida'}
          </button>
        </div>
      </form>
    </div>
  );
}
