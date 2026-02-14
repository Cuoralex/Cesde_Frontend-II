import { StorageManager, Movement, User } from './storage';
import { ProductService } from './productService';

class MovementService {
  private storage: StorageManager;
  private productService: ProductService;

  constructor() {
    this.storage = StorageManager.getInstance();
    this.productService = new ProductService();
  }

  getAllMovements(): Movement[] {
    return this.storage.getMovements();
  }

  createMovement(
    productId: string,
    type: 'entrada' | 'salida',
    reason: 'compra' | 'venta' | 'perdida',
    quantity: number,
    user: User
  ): Movement | null {
    const product = this.productService.getProductById(productId);
    if (!product) return null;

    const quantityChange = type === 'entrada' ? quantity : -quantity;

    if (type === 'salida' && product.stock < quantity) {
      return null;
    }

    const success = this.productService.updateStock(productId, quantityChange);
    if (!success) return null;

    const movements = this.storage.getMovements();
    const newMovement: Movement = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      type,
      reason,
      quantity,
      date: new Date().toISOString(),
      userId: user.id,
      userName: user.fullName
    };

    movements.push(newMovement);
    this.storage.saveMovements(movements);
    return newMovement;
  }

  getMovementsByProduct(productId: string): Movement[] {
    const movements = this.storage.getMovements();
    return movements.filter(m => m.productId === productId);
  }

  getRecentMovements(limit: number = 10): Movement[] {
    const movements = this.storage.getMovements();
    return movements
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  getMovementStats() {
    const movements = this.storage.getMovements();
    const productMovements = new Map<string, number>();

    movements.forEach(m => {
      const count = productMovements.get(m.productId) || 0;
      productMovements.set(m.productId, count + 1);
    });

    const sortedProducts = Array.from(productMovements.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return sortedProducts.map(([productId, count]) => {
      const product = this.productService.getProductById(productId);
      return {
        productId,
        productName: product?.name || 'Desconocido',
        movementCount: count
      };
    });
  }
}

export { MovementService };
