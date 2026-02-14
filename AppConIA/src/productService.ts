import { StorageManager, Product } from './storage';

class ProductService {
  private storage: StorageManager;

  constructor() {
    this.storage = StorageManager.getInstance();
  }

  getAllProducts(): Product[] {
    return this.storage.getProducts();
  }

  getProductById(id: string): Product | undefined {
    const products = this.storage.getProducts();
    return products.find(p => p.id === id);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.storage.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    this.storage.saveProducts(products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | null {
    const products = this.storage.getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    this.storage.saveProducts(products);
    return products[index];
  }

  deleteProduct(id: string): boolean {
    const products = this.storage.getProducts();
    const filtered = products.filter(p => p.id !== id);

    if (filtered.length === products.length) return false;

    this.storage.saveProducts(filtered);
    return true;
  }

  updateStock(productId: string, quantity: number): boolean {
    const product = this.getProductById(productId);
    if (!product) return false;

    const newStock = product.stock + quantity;
    if (newStock < 0) return false;

    this.updateProduct(productId, { stock: newStock });
    return true;
  }

  getLowStockProducts(): Product[] {
    const products = this.storage.getProducts();
    return products.filter(p => p.stock <= p.minStock);
  }

  getProductsByCategory(category: string): Product[] {
    const products = this.storage.getProducts();
    return products.filter(p => p.category === category);
  }
}

export { ProductService };
