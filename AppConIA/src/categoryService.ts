import { StorageManager, Category } from './storage';

class CategoryService {
  private storage: StorageManager;

  constructor() {
    this.storage = StorageManager.getInstance();
  }

  getAllCategories(): Category[] {
    return this.storage.getCategories();
  }

  createCategory(name: string, description: string): Category {
    const categories = this.storage.getCategories();
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      description
    };
    categories.push(newCategory);
    this.storage.saveCategories(categories);
    return newCategory;
  }

  updateCategory(id: string, name: string, description: string): Category | null {
    const categories = this.storage.getCategories();
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) return null;

    categories[index] = { id, name, description };
    this.storage.saveCategories(categories);
    return categories[index];
  }

  deleteCategory(id: string): boolean {
    const categories = this.storage.getCategories();
    const filtered = categories.filter(c => c.id !== id);

    if (filtered.length === categories.length) return false;

    this.storage.saveCategories(filtered);
    return true;
  }
}

export { CategoryService };
