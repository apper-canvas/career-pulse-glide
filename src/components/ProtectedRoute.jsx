import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Show notification that user needs to login
    toast.info('Please login to access this page', {
      toastId: 'login-required',
    });
    
    // Redirect to home with login modal open
    return <Navigate to="/?showLogin=true" replace />;
  }
  return children;
};

export default ProtectedRoute;