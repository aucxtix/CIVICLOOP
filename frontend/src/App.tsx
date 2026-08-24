import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Layouts
import RootLayout from '@/components/layout/RootLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Public Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Portal Pages Placeholder
import CitizenDashboard from '@/pages/citizen/CitizenDashboard';
import ClassifyWastePage from '@/pages/citizen/ClassifyWastePage';
import ReportWastePage from '@/pages/citizen/ReportWastePage';
import MyReportsPage from '@/pages/citizen/MyReportsPage';
import WorkerDashboard from '@/pages/worker/WorkerDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Auto-generated Citizen Routes
import CollectionPointsPage from '@/pages/citizen/CollectionPointsPage';
import CollectionRequestPage from '@/pages/citizen/CollectionRequestPage';
import PickupSchedulePage from '@/pages/citizen/PickupSchedulePage';
import NotificationsPage from '@/pages/citizen/NotificationsPage';
import AnalyticsPage from '@/pages/citizen/AnalyticsPage';
import GreenPointsPage from '@/pages/citizen/GreenPointsPage';
import ProfilePage from '@/pages/citizen/ProfilePage';
import SettingsPage from '@/pages/citizen/SettingsPage';

// Auto-generated Worker Routes
import WorkerTasksPage from '@/pages/worker/WorkerTasksPage';
import WorkerHistoryPage from '@/pages/worker/WorkerHistoryPage';
import WorkerMapPage from '@/pages/worker/WorkerMapPage';
import WorkerVehicleNavigationPage from '@/pages/worker/WorkerVehicleNavigationPage';
import WorkerPerformancePage from '@/pages/worker/WorkerPerformancePage';
import WorkerProfilePage from '@/pages/worker/WorkerProfilePage';
import WorkerSettingsPage from '@/pages/worker/WorkerSettingsPage';

// Auto-generated Admin Routes
import AdminMapPage from '@/pages/admin/AdminMapPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';
import AdminTicketsPage from '@/pages/admin/AdminTicketsPage';
import AdminVehicleRegistryPage from '@/pages/admin/AdminVehicleRegistryPage';
import AdminWorkersPage from '@/pages/admin/AdminWorkersPage';
import AdminVerificationsPage from '@/pages/admin/AdminVerificationsPage';
import AdminHotspotsPage from '@/pages/admin/AdminHotspotsPage';
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage';
import AdminRewardsPage from '@/pages/admin/AdminRewardsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

// Auth Guard Placeholder
import ProtectedRoute from '@/components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* Other public routes */}
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Citizen Routes */}
            <Route path="/citizen" element={<DashboardLayout role="CITIZEN" />}>
              <Route index element={<CitizenDashboard />} />
              <Route path="classify" element={<ClassifyWastePage />} />
              <Route path="report" element={<ReportWastePage />} />
              <Route path="history" element={<MyReportsPage />} />
              <Route path="collection-points" element={<CollectionPointsPage />} />
              <Route path="request" element={<CollectionRequestPage />} />
              <Route path="schedule" element={<PickupSchedulePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="points" element={<GreenPointsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Worker Routes */}
            <Route path="/worker" element={<DashboardLayout role="WORKER" />}>
              <Route index element={<WorkerDashboard />} />
              <Route path="tasks" element={<WorkerTasksPage />} />
              <Route path="history" element={<WorkerHistoryPage />} />
              <Route path="vehicle" element={<WorkerVehicleNavigationPage />} />
              <Route path="map" element={<WorkerMapPage />} />
              <Route path="performance" element={<WorkerPerformancePage />} />
              <Route path="profile" element={<WorkerProfilePage />} />
              <Route path="settings" element={<WorkerSettingsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout role="ADMIN" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="map" element={<AdminMapPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="vehicles" element={<AdminVehicleRegistryPage />} />
              <Route path="tickets" element={<AdminTicketsPage />} />
              <Route path="workers" element={<AdminWorkersPage />} />
              <Route path="verifications" element={<AdminVerificationsPage />} />
              <Route path="hotspots" element={<AdminHotspotsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="rewards" element={<AdminRewardsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
