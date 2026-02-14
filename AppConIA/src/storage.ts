interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'empleado';
  fullName: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  createdAt: string;
}

interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: 'entrada' | 'salida';
  reason: 'compra' | 'venta' | 'perdida';
  quantity: number;
  date: string;
  userId: string;
  userName: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

class StorageManager {
  private static instance: StorageManager;

  private constructor() {
    this.initializeDefaultData();
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private initializeDefaultData(): void {
    if (!localStorage.getItem('users')) {
      const defaultUsers: User[] = [
        {
          id: '1',
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          fullName: 'Administrador'
        },
        {
          id: '2',
          username: 'empleado',
          password: 'emp123',
          role: 'empleado',
          fullName: 'Empleado General'
        }
      ];
      this.saveUsers(defaultUsers);
    }

    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify([]));
    }

    if (!localStorage.getItem('movements')) {
      localStorage.setItem('movements', JSON.stringify([]));
    }

    if (!localStorage.getItem('categories')) {
      const defaultCategories: Category[] = [
        { id: '1', name: 'Electrónica', description: 'Productos electrónicos' },
        { id: '2', name: 'Alimentos', description: 'Productos alimenticios' },
        { id: '3', name: 'Ropa', description: 'Prendas de vestir' },
        { id: '4', name: 'Hogar', description: 'Artículos para el hogar' }
      ];
      this.saveCategories(defaultCategories);
    }
  }

  getUsers(): User[] {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getProducts(): Product[] {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : [];
  }

  saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getMovements(): Movement[] {
    const data = localStorage.getItem('movements');
    return data ? JSON.parse(data) : [];
  }

  saveMovements(movements: Movement[]): void {
    localStorage.setItem('movements', JSON.stringify(movements));
  }

  getCategories(): Category[] {
    const data = localStorage.getItem('categories');
    return data ? JSON.parse(data) : [];
  }

  saveCategories(categories: Category[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  clearAll(): void {
    localStorage.clear();
    this.initializeDefaultData();
  }
}

export { StorageManager };
export type { User, Product, Movement, Category };
