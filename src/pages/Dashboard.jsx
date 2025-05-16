import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIcon } from '../utils/iconUtils.jsx';
import ResumeUpload from '../components/ResumeUpload';
import UserProfileForm from '../components/UserProfileForm';
import JobPreferencesForm from '../components/JobPreferencesForm';
import DashboardHeader from '../components/DashboardHeader';
import Modal from '../components/Modal';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { toast } from 'react-toastify';
import { updateProfile, updateJobPreferences } from '../store/slices/userProfileSlice';
import { logout } from '../store/slices/authSlice';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTabFromURL = searchParams.get('activeTab');
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('resume');
  
  // Try to load resume from localStorage
  const [resumeFile, setResumeFile] = useState(() => {
    const savedResume = localStorage.getItem('userResume');
    return savedResume ? JSON.parse(savedResume) : null;
  });
  
  // Initialize userProfile with localStorage data or defaults
  const userProfileState = useSelector(state => state.userProfile);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  // Set userProfile from Redux state
  const userProfile = userProfileState.profile;
  
  // Set job preferences from Redux state
  const jobPreferences = userProfileState.jobPreferences;
  
  // Initialize job preferences defaults if needed
  // Default values (already handled in the Redux store):
  // {
  //   desiredTitle: '',
  //   desiredLocation: '',
  //   desiredIndustry: '',
  //   salaryExpectation: '',
  //   workType: 'Full-time', 
  //   remotePreference: 'Hybrid',
  //   relocationWillingness: false
  // }
  
  // Use activeTab from URL if available, otherwise use state
  useEffect(() => {
    if (activeTabFromURL) {
      setActiveTab(activeTabFromURL);
    }
  }, [activeTabFromURL]);
  
  const [showRegisterModal, setShowRegisterModal] = useState(searchParams.get('showRegister') === 'true');
  const [showLoginModal, setShowLoginModal] = useState(searchParams.get('showLogin') === 'true');
  const navigate = useNavigate();
  // Icons
  const UserIcon = getIcon('user');
  const FileIcon = getIcon('filebadge');
  const SettingsIcon = getIcon('settings');
  const AccountIcon = getIcon('user');
  const LockIcon = getIcon('lock');
  const UserPlusIcon = getIcon('userplus');

  const handleResumeUpload = (file) => {
    setResumeFile(file);
    // Save to localStorage
    localStorage.setItem('userResume', JSON.stringify(file));
    toast.success('Resume uploaded successfully!');
  };

  const handleResumeDelete = () => {
    setResumeFile(null);
    localStorage.removeItem('userResume');
    toast.info('Resume removed successfully.');
  };

  const handleProfileUpdate = (profileData) => {
    // Update profile in Redux store
    dispatch(updateProfile(profileData));
    // Save to localStorage for redundancy
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    toast.success('Profile updated successfully!');
  };

  const handlePreferencesUpdate = (preferencesData) => {
    // Update job preferences in Redux store
    dispatch(updateJobPreferences(preferencesData));
    // Save to localStorage for redundancy
    toast.success('Job preferences updated successfully!');
  };
  
  const openRegisterModal = () => {
    setShowRegisterModal(true);
    navigate('/dashboard?showRegister=true', { replace: true });
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    navigate('/dashboard', { replace: true });
  };
  
  const openLoginModal = () => {
    setShowLoginModal(true);
    navigate('/dashboard?showLogin=true', { replace: true });
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    navigate('/dashboard', { replace: true });
  };
  
  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader 
        userProfile={userProfile} 
        resumeUploaded={!!resumeFile} 
      />
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-surface-200 dark:border-surface-700 mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center ${
            activeTab === 'resume'
              ? 'border-b-2 border-primary text-primary dark:text-primary-light'
              : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveTab('resume')}
        >
          <FileIcon className="w-4 h-4 mr-2" />
          Resume
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center ${
            activeTab === 'profile'
              ? 'border-b-2 border-primary text-primary dark:text-primary-light'
              : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <UserIcon className="w-4 h-4 mr-2" />
          Profile Details
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center ${
            activeTab === 'preferences'
              ? 'border-b-2 border-primary text-primary dark:text-primary-light'
              : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveTab('preferences')}
        >
          <SettingsIcon className="w-4 h-4 mr-2" />
          Job Preferences
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center ${
            activeTab === 'account'
              ? 'border-b-2 border-primary text-primary dark:text-primary-light'
              : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveTab('account')}
        >
          <AccountIcon className="w-4 h-4 mr-2" />
          Account
        </button>
        {isAuthenticated && (
          <div className="ml-auto flex items-center">
            <div className="px-4 py-2 text-sm text-surface-600 dark:text-surface-400">
              Welcome, {user?.displayName || 'User'}
            </div>
            <button
              className="text-red-500 hover:text-red-600 px-3 py-2 text-sm flex items-center"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden transition-all duration-200">
        <div className="p-6">
          {activeTab === 'resume' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">Resume Management</h2>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                Upload your most up-to-date resume. Recruiters will see this when you apply for jobs.
                Supported formats: PDF, DOC, DOCX.
              </p>
              <ResumeUpload 
                currentResume={resumeFile}
                onResumeUpload={handleResumeUpload}
                onResumeDelete={handleResumeDelete}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">Profile Details</h2>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                Complete your profile to increase your chances of finding the perfect job.
                This information will be visible to potential employers.
              </p>
              <UserProfileForm 
                userProfile={userProfile}
                onProfileUpdate={handleProfileUpdate}
              />
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">Job Preferences</h2>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                Set your job preferences to help us find positions that match your career goals.
              </p>
              <JobPreferencesForm 
                preferences={jobPreferences}
                onPreferencesUpdate={handlePreferencesUpdate}
              />
            </div>
          )}
          
          {activeTab === 'account' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">Account Management</h2>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                {isAuthenticated ? 'Manage your account settings and preferences.' : 'Register for a new account or login to access all features.'}
              </p>
              
              {!isAuthenticated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-surface-800 p-6 rounded-xl border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center mb-4">
                    <UserPlusIcon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">New User?</h3>
                  </div>
                  <p className="mb-4 text-surface-600 dark:text-surface-400">
                    Create a new account to unlock all features and start managing your career journey.
                  </p>
                  <button 
                    onClick={openRegisterModal}
                    className="btn-primary w-full"
                  >
                    Register Now
                  </button>
                </div>
                
                <div className="bg-white dark:bg-surface-800 p-6 rounded-xl border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center mb-4">
                    <LockIcon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Already Registered?</h3>
                  </div>
                  <p className="mb-4 text-surface-600 dark:text-surface-400">
                    Sign in to your account to access your profile, resume, and job preferences.
                  </p>
                  <button 
                    onClick={openLoginModal}
                    className="btn-outline w-full border-primary text-primary hover:bg-primary/10"
                  >
                    Login
                  </button>
                </div>
              </div>
              ) : (
              <div className="space-y-6">
                <div className="bg-white dark:bg-surface-800 p-6 rounded-xl border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center mb-4">
                    <AccountIcon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Account Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-surface-500 dark:text-surface-400">Email: </span>
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <div>
                      <span className="text-surface-500 dark:text-surface-400">Name: </span>
                      <span className="font-medium">{user?.displayName || 'Not set'}</span>
                    </div>
                    <div>
                      <span className="text-surface-500 dark:text-surface-400">Account created: </span>
                      <span className="font-medium">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                    <button onClick={handleLogout} className="mt-4 btn-outline border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Register Modal */}
      <Modal isOpen={showRegisterModal} onClose={closeRegisterModal}>
        <RegisterForm onClose={closeRegisterModal} />
      </Modal>
      
      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={closeLoginModal}>
        <LoginForm onClose={closeLoginModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;