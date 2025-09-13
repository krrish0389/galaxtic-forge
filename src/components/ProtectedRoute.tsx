import React from 'react';
import { useAuth, UserRole } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles, 
  fallback 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: `This area is restricted to ${allowedRoles.join(', ')} users only.`,
        variant: "destructive"
      });
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-lg text-center border-destructive">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this area.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Required role: {allowedRoles.join(' or ')}
          </p>
          <p className="text-sm text-muted-foreground">
            Your role: {user.role}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};