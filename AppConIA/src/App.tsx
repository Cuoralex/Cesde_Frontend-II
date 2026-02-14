import { useState, useEffect } from 'react';
import { AuthService } from './auth';
import { LoginPage } from './src/components/LoginPage';
import { AdminDashboard } from './src/components/AdminDashboard';
import { EmployeeDashboard } from './src/components/EmployeeDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'empleado' | null>(null);

  const authService = new AuthService();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
  }, []);

  const handleLogin = () => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (userRole === 'empleado') {
    return <EmployeeDashboard onLogout={handleLogout} />;
  }

  return null;
}

export default App;
