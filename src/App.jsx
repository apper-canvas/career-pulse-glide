import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [showLoginModal, setShowLoginModal] = useState(location.search.includes('showLogin=true'));

  const openLoginModal = () => {
    setShowLoginModal(true);
    navigate('?showLogin=true', { replace: true });
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors duration-300">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-primary-dark dark:text-primary-light font-bold text-xl md:text-2xl">CareerPulse</span>
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Home</a>
            <button 
              onClick={openLoginModal}
              className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light bg-transparent border-none p-0 cursor-pointer"
            >
              Login
            </button>
            <a href="/dashboard?showRegister=true" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Register</a>
            <a href="/dashboard" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Dashboard</a>
          </div>
          <div className="flex-1 md:flex-none"></div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-dark" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/login" element={<Navigate to="/dashboard?showLogin=true" replace />} />
          <Route path="/register" element={<Navigate to="/dashboard?showRegister=true" replace />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-white dark:bg-surface-800 py-6 mt-12 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <p className="text-center text-surface-500">© {new Date().getFullYear()} CareerPulse. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={closeLoginModal}>
        <LoginForm onClose={closeLoginModal} />
      </Modal>
    </div>
  );
}

export default App;