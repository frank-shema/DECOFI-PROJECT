
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { isAuthenticated, isInitializing, principal } = useAuth();
  const location = useLocation();

  // Admin check - this is a simple implementation. In production,
  // you would have a more robust way to check admin status.
  // Here, we're using a dummy admin principal for illustration
  const isAdmin = principal === 'rrkah-fqaaa-aaaaa-aaaaq-cai'; // Example admin principal
  
  if (isInitializing) {
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
