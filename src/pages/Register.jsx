import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/RegisterForm';

const Register = ({ darkMode }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Candidate Registration</h1>
        <RegisterForm onClose={() => navigate('/dashboard')} />
        
        <div className="mt-8 text-center text-surface-600 dark:text-surface-400">
          <p>By registering, you'll get access to:</p>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg mx-auto text-left list-disc list-inside">
            <li>Personalized job recommendations</li>
            <li>Application tracking system</li>
            <li>Resume builder tools</li>
            <li>Job alerts for new opportunities</li>
            <li>Interview preparation resources</li>
            <li>Career development insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;