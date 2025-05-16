import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import MainFeature from '../components/MainFeature';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { getIcon } from '../utils/iconUtils';

const Home = ({ darkMode }) => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleShowTips = () => {
    setShowInterview(true);
    scrollToSection('interview-tips');
    toast.info("Interview tips loaded successfully!");
  };

  const handleHideTips = () => {
    setShowInterview(false);
  };

  useEffect(() => {
    // Check if there's a showLogin param in the URL
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('showLogin') === 'true') {
      setShowLogin(true);
      setShowRegister(false);
      scrollToSection('login-section');
    }
  }, [location]);
  
  const scrollToSection = (id) => {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const BriefcaseIcon = getIcon('Briefcase');
  const TrendingUpIcon = getIcon('TrendingUp');
  const ClockIcon = getIcon('Clock');
  const BellIcon = getIcon('Bell');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary-dark/10 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-surface-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Advance Your Career with <span className="text-primary dark:text-primary-light">CareerPulse</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your personalized job search platform to discover opportunities, track applications, and prepare for interviews.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#job-search" className="btn-primary">
                <BriefcaseIcon className="w-5 h-5 mr-2" />
                Start Job Search
              </a>
              <button 
                onClick={() => {
                  setShowRegister(true);
                  if (showLogin) {
                    setShowLogin(false);
                  }
                  scrollToSection('register-section');
                }}
                className="btn-primary"
              >
                Register Now
              </button>
              <button 
                onClick={() => {
                  setShowLogin(true);
                  if (showRegister) {
                    setShowRegister(false);
                  }
                  scrollToSection('login-section');
                }}
                className="btn-outline"
              >
                Login
              </button>
              <button 
                onClick={handleShowTips}
                className="btn-outline"
              >
                <TrendingUpIcon className="w-5 h-5 mr-2" />
                Interview Tips
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-surface-900 dark:text-white">
            Why Choose <span className="text-primary dark:text-primary-light">CareerPulse</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 hover:shadow-lg dark:hover:border-primary-dark/50 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary-dark/10 mb-4">
                <BriefcaseIcon className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">Advanced Job Search</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Filter jobs by location, industry, and job title to find the perfect match for your skills and preferences.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg dark:hover:border-primary-dark/50 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary-dark/10 mb-4">
                <ClockIcon className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">Application Tracking</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Upload your resume and track your application status throughout the hiring process.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg dark:hover:border-primary-dark/50 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary-dark/10 mb-4">
                <BellIcon className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">Job Alerts</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Set up personalized notifications based on your job preferences and never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration Section (Conditionally Rendered) */}
      {showRegister && (
        <motion.section 
          id="register-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-10 md:py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <RegisterForm onClose={() => setShowRegister(false)} />
            </div>
          </div>
        </motion.section>
      )}
      
      {/* Login Section (Conditionally Rendered) */}
      {showLogin && (
        <motion.section 
          id="login-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-10 md:py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <LoginForm onClose={() => setShowLogin(false)} />
            </div>
          </div>
        </motion.section>
      )}

      {/* Main Feature - Job Search */}
      <section id="job-search" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <MainFeature darkMode={darkMode} />
        </div>
      </section>

      {/* Interview Tips Section (Conditionally Rendered) */}
      {showInterview && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          id="interview-tips"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-10 md:py-16 bg-surface-100 dark:bg-surface-800/50"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
                Interview Preparation Tips
              </h2>
              <button 
                onClick={handleHideTips}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                aria-label="Close interview tips"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white">Before the Interview</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-light mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Research the company thoroughly, including its mission, values, products/services, and recent news.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-light mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Review the job description and prepare examples that demonstrate your relevant skills and experience.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-light mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Practice common interview questions and prepare concise, structured answers using the STAR method.</span>
                  </li>
                </ul>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white">During the Interview</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-light mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Make a positive first impression with professional attire, good posture, and a confident handshake.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-light mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Listen actively to questions and provide relevant, specific examples from your experience.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-light mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Ask thoughtful questions about the role, team, and company culture at the end of the interview.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* Login Link Section */}
      <section className="py-8 bg-surface-50 dark:bg-surface-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-surface-600 dark:text-surface-400">
            Already have an account? <button 
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
                scrollToSection('login-section');
              }}
              className="text-primary hover:underline">Login here</button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;