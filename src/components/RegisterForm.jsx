import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormField from './FormField';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { validateEmail, validatePassword, validateField } from '../utils/formValidation';
import SocialLoginButtons from './SocialLoginButtons';
import { register } from '../store/slices/authSlice';

const RegisterForm = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    currentJobTitle: '',
    yearsOfExperience: '',
    industry: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, isLoading } = useSelector(state => state.auth);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Media',
    'Construction',
    'Transportation',
    'Hospitality',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Personal details validation
    if (!validateField(formData.firstName)) newErrors.firstName = 'First name is required';
    if (!validateField(formData.lastName)) newErrors.lastName = 'Last name is required';
    if (!validateField(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validateField(formData.phone)) newErrors.phone = 'Phone number is required';
    
    // Professional details validation
    if (!validateField(formData.currentJobTitle)) newErrors.currentJobTitle = 'Current job title is required';
    if (!validateField(formData.yearsOfExperience)) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    } else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Please enter a valid number';
    }
    
    if (!validateField(formData.industry)) newErrors.industry = 'Please select an industry';
    
    // Password validation
    if (!validateField(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with a mix of letters, numbers, and symbols';
    }
    
    if (!validateField(formData.confirmPassword)) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const resultAction = await dispatch(register(formData));

      if (register.fulfilled.match(resultAction)) {
        toast.success('Registration successful! Welcome to CareerPulse.', {
          onClose: () => {
            onClose();
            navigate('/dashboard');
          }
        });

        // Save professional info to profile state
        // This would normally be handled by a separate API call
        // but we're handling it here for this implementation
        localStorage.setItem('userProfessionalInfo', JSON.stringify({
          currentJobTitle: formData.currentJobTitle,
          yearsOfExperience: formData.yearsOfExperience,
          industry: formData.industry
        }));
      } else if (register.rejected.match(resultAction)) {
        toast.error(resultAction.payload || 'Registration failed. Please try again.');
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary dark:text-primary-light">Candidate Registration</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
          aria-label="Close registration form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary-light">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            
            <FormField
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
            
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary-light">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Current Job Title"
              name="currentJobTitle"
              type="text"
              value={formData.currentJobTitle}
              onChange={handleChange}
              error={errors.currentJobTitle}
              required
            />
            
            <FormField
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              min="0"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              error={errors.yearsOfExperience}
              required
            />
            
            <div className="md:col-span-2">
              <label htmlFor="industry" className="label">Industry</label>
              <select
                id="industry"
                name="industry"
                className={`select w-full ${errors.industry ? 'border-red-500' : ''}`}
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select an industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary-light">Account Credentials</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`input pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-surface-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-surface-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              
              {formData.password && (
                <PasswordStrengthMeter password={formData.password} />
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`input pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-surface-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-surface-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 mb-4 rounded-md text-sm">
            {error}
          </div>
        )}

        </div>
        
        <div className="mb-8">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-surface-700 dark:text-surface-300">
                I accept the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
              {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary px-6 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Complete Registration'}
          </button>
        </div>
      </form>

      <SocialLoginButtons />

      <div className="text-center text-sm mt-6 text-surface-600 dark:text-surface-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light" onClick={onClose}>
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;