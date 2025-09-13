import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import JudgeDashboard from "./pages/JudgeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route component to handle role-based redirection
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'participant':
      return <Navigate to="/participant" replace />;
    case 'sponsor':
      return <Navigate to="/sponsor" replace />;
    case 'judge':
      return <Navigate to="/judge" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route 
        path="/login" 
        element={user ? <RoleBasedRedirect /> : <Login />} 
      />
      
      {/* Root route - redirect based on auth status */}
      <Route 
        path="/" 
        element={user ? <RoleBasedRedirect /> : <Navigate to="/login" replace />} 
      />
      
      {/* Protected role-based routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/participant" 
        element={
          <ProtectedRoute allowedRoles={['participant']}>
            <ParticipantDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/sponsor" 
        element={
          <ProtectedRoute allowedRoles={['sponsor']}>
            <SponsorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/judge" 
        element={
          <ProtectedRoute allowedRoles={['judge']}>
            <JudgeDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
