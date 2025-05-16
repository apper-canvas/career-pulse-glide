import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

function Login({ darkMode }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Sign in to your account</p>
        </div>
        <LoginForm onClose={() => navigate('/dashboard')} />

        <div className="text-center mt-6">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Looking for job opportunities? <Link to="/" className="text-primary-600 hover:underline">Browse jobs</Link>
          </p>
        </div>
      </div>
      
      <SocialLoginButtons />
    </div>
  );
}

export default Login;