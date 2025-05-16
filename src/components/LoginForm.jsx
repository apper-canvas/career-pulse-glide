import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormField from './FormField';
import SocialLoginButtons from './SocialLoginButtons';
import { login } from '../store/slices/authSlice';

function LoginForm({ onClose = () => {} }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(state => state.auth);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const resultAction = await dispatch(login({
          email: formData.email,
          password: formData.password
        }));
        
        if (login.fulfilled.match(resultAction)) {
          toast.success("Login successful! Welcome back.", {
            onClose: () => {
              onClose();
              navigate('/dashboard');
            }
          });
        } else if (login.rejected.match(resultAction)) {
          toast.error(resultAction.payload || "Login failed. Please check your credentials.");
        }
      } catch (err) {
        toast.error("An error occurred during login. Please try again.");
        console.error("Login error:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Sign In</h2>
          <p className="mt-1 text-surface-600 dark:text-surface-400">Sign in to your account</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          aria-label="Close login form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          required
        />
        
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
          required
        />
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
          error={errors.password}
          required
        />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="rounded border-surface-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-surface-600 dark:text-surface-400">Remember me</span>
          </label>
          
          <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light">
            Forgot password?
          </a>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex justify-center items-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
      
      <SocialLoginButtons />
      
      <div className="text-center text-sm text-surface-600 dark:text-surface-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light" onClick={onClose}>
          Register here
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;