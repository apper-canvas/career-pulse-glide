import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    // Only show toast and set redirect if not authenticated
    if (!isAuthenticated) {
      // Show notification that user needs to login
      toast.info('Please login to access this page', {
        toastId: 'login-required',
      });
      
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect to home with login modal open
    return <Navigate to="/?showLogin=true" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;