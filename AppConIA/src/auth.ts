import { StorageManager, User } from './storage';

class AuthService {
  private storage: StorageManager;

  constructor() {
    this.storage = StorageManager.getInstance();
  }

  login(username: string, password: string): User | null {
    const users = this.storage.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      this.storage.setCurrentUser(user);
      return user;
    }

    return null;
  }

  logout(): void {
    this.storage.setCurrentUser(null);
  }

  getCurrentUser(): User | null {
    return this.storage.getCurrentUser();
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isEmpleado(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'empleado';
  }
}

export { AuthService };
