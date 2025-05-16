import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
          {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="hidden md:block text-surface-700 dark:text-surface-300">
          {user?.displayName || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-md shadow-lg py-1 z-10 border border-surface-200 dark:border-surface-700">
          <div className="px-4 py-2 text-sm text-surface-700 dark:text-surface-300 border-b border-surface-200 dark:border-surface-700">
            <div className="font-medium">{user?.displayName || 'User'}</div>
            <div className="text-xs text-surface-500 dark:text-surface-400 truncate">{user?.email}</div>
          </div>
          <a href="/dashboard" className="block px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
            Dashboard
          </a>
          <a href="/dashboard?activeTab=profile" className="block px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
            Profile
          </a>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-surface-100 dark:hover:bg-surface-700">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;