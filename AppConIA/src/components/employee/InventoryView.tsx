import { useState, useEffect } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { ProductService } from '../../productService';
import { CategoryService } from '../../categoryService';
import { Product } from '../../storage';

export function InventoryView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const productService = new ProductService();
  const categoryService = new CategoryService();

  useEffect(() => {
    setProducts(productService.getAllProducts());
    const cats = categoryService.getAllCategories();
    setCategories(cats.map(c => c.name));
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Inventario Disponible</h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
              </div>
              {product.stock <= product.minStock && (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
            </div>

            <p className="text-sm text-gray-600 mb-3">{product.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Categoría:</span>
                <span className="font-medium text-gray-900">{product.category}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stock:</span>
                <span className={`font-bold ${
                  product.stock <= product.minStock ? 'text-red-600' : 'text-green-600'
                }`}>
                  {product.stock} unidades
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Precio:</span>
                <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
              </div>

              {product.stock <= product.minStock && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  Stock bajo (Min: {product.minStock})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
}
