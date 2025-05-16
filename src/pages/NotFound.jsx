import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils.jsx';

const NotFound = () => {
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="text-9xl font-bold text-surface-200 dark:text-surface-800">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-24 h-24 text-primary dark:text-primary-light" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;