import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormField from './FormField';

function LoginForm({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Login successful!");
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome Back</h2>
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
          className="btn-primary w-full flex justify-center"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Signing in...</span>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;