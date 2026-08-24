import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { 
  LogOut, Menu, LayoutDashboard, ScanLine, Clock, 
  Trash2, MapPin, Truck, Calendar, Bell, 
  BarChart2, Leaf, User, Settings, ShieldCheck, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  role: UserRole;
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const citizenLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { name: 'Classify Waste', icon: ScanLine, path: '/citizen/classify' },
    { name: 'History', icon: Clock, path: '/citizen/history' },
    { name: 'Report Garbage', icon: Trash2, path: '/citizen/report' },
    { name: 'Collection Points', icon: MapPin, path: '/citizen/collection-points' },
    { name: 'Collection Request', icon: Truck, path: '/citizen/request' },
    { name: 'Pickup Schedule', icon: Calendar, path: '/citizen/schedule' },
    { name: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { name: 'Analytics', icon: BarChart2, path: '/citizen/analytics' },
    { name: 'Green Points', icon: Leaf, path: '/citizen/points' },
    { name: 'Profile', icon: User, path: '/citizen/profile' },
    { name: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  const workerLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/worker' },
    { name: 'Active Tasks', icon: Truck, path: '/worker/tasks' },
    { name: 'History', icon: Clock, path: '/worker/history' },
    { name: 'Vehicle Nav', icon: Truck, path: '/worker/vehicle' },
    { name: 'Live Map', icon: MapPin, path: '/worker/map' },
    { name: 'Performance', icon: BarChart2, path: '/worker/performance' },
    { name: 'Profile', icon: User, path: '/worker/profile' },
    { name: 'Settings', icon: Settings, path: '/worker/settings' },
  ];

  const adminLinks = [
    { name: 'Command Center', icon: LayoutDashboard, path: '/admin' },
    { name: 'Live City Map', icon: MapPin, path: '/admin/map' },
    { name: 'Reports', icon: Trash2, path: '/admin/reports' },
    { name: 'Tickets', icon: ScanLine, path: '/admin/tickets' },
    { name: 'Workers', icon: User, path: '/admin/workers' },
    { name: 'Vehicle Registry', icon: Truck, path: '/admin/vehicles' },
    { name: 'Verifications', icon: ShieldCheck, path: '/admin/verifications' },
    { name: 'Hotspots', icon: AlertTriangle, path: '/admin/hotspots' },
    { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
    { name: 'Rewards', icon: Leaf, path: '/admin/rewards' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const links = role === 'CITIZEN' ? citizenLinks : role === 'WORKER' ? workerLinks : adminLinks;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 mb-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">CivicLoop</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
          <nav className="space-y-1 px-3">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r-full'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-background">
        {/* Top Header */}
        <header className="h-20 bg-transparent flex items-center justify-between px-6 lg:px-10 mt-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              Good morning, {user.name.split(' ')[0]}
              <span className="text-primary bg-primary/10 rounded-full p-1 inline-flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Let's keep your community cleaner today.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <ModeToggle />
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-background">
                2
              </span>
            </button>
            <div className="flex items-center gap-3 bg-card px-3 py-1.5 rounded-full shadow-sm border border-border cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium pr-1">{user.role === 'CITIZEN' ? 'Citizen' : user.role === 'WORKER' ? 'Worker' : 'Admin'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            {/* Quick Logout for now */}
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-red-500 hover:bg-accent ml-2">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
