import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const RootLayout = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    if (user.role === 'CITIZEN') return <Navigate to="/citizen" replace />;
    if (user.role === 'WORKER') return <Navigate to="/worker" replace />;
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="CivicLoop Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight">CivicLoop</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm font-medium hover:text-primary">Home</a>
            <a href="/about" className="text-sm font-medium hover:text-primary">About</a>
            <a href="/login" className="text-sm font-medium hover:text-primary">Login</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
