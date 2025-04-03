import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const { isAuthenticated, isLoading, isInitializing, user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user has admin role
  const isAdmin = user?.roles.includes("admin") || false;

  // Show notification if redirected due to auth
  useEffect(() => {
    if (!isLoading && !isInitializing && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    }
  }, [isLoading, isInitializing, isAuthenticated, toast]);

  if (isInitializing || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8 text-decofi-blue" />
        <span className="ml-2">Verifying your identity...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the login page, but save the current location so we can
    // redirect back after successful login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // If the route is admin-only and the user is not an admin
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has necessary permissions, show the route
  return <>{children}</>;
};

export default ProtectedRoute;
