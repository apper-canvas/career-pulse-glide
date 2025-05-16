import { useState } from 'react';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import ResumeUpload from '../components/ResumeUpload';
import UserProfileForm from '../components/UserProfileForm';
import JobPreferencesForm from '../components/JobPreferencesForm';
import DashboardHeader from '../components/DashboardHeader';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('resume');
  
  // Try to load resume from localStorage
  const [resumeFile, setResumeFile] = useState(() => {
    const savedResume = localStorage.getItem('userResume');
    return savedResume ? JSON.parse(savedResume) : null;
  });
  
  // Initialize userProfile with localStorage data or defaults
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      // Personal Information
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      
      // Professional Information
      headline: '',
      title: '',
      company: '',
      yearsOfExperience: '',
      education: '',
      skills: [],
      bio: '',
      website: '',
      certifications: '',
      languages: '',
      
      // Social Links
      socialLinks: {
        linkedIn: '',
        github: ''
      }
    };
  });
  const [jobPreferences, setJobPreferences] = useState({
    desiredTitle: '',
    desiredLocation: '',
    desiredIndustry: '',
    salaryExpectation: '',
    workType: 'Full-time',
    remotePreference: 'Hybrid',
    relocationWillingness: false
  });

  // Icons
  const UserIcon = getIcon('user');
  const FileIcon = getIcon('filebadge');
  const SettingsIcon = getIcon('settings');

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
    setUserProfile(profileData);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    toast.success('Profile updated successfully!');
  };

  const handlePreferencesUpdate = (preferencesData) => {
    setJobPreferences(preferencesData);
    toast.success('Job preferences updated successfully!');
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;