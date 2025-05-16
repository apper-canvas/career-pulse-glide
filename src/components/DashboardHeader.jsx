import { getIcon } from '../utils/iconUtils';

const DashboardHeader = ({ userProfile, resumeUploaded }) => {
  const FileTextIcon = getIcon('filetext');
  const CheckIcon = getIcon('check');
  
  const fullName = userProfile.firstName && userProfile.lastName 
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : 'Complete your profile';
    
  const jobTitle = userProfile.title || 'Add your job title';

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 mb-6 transition-all duration-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center text-surface-600 dark:text-surface-300 text-3xl font-bold">
          {userProfile.firstName && userProfile.lastName 
            ? `${userProfile.firstName[0]}${userProfile.lastName[0]}`
            : '?'}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">{fullName}</h1>
          <p className="text-surface-600 dark:text-surface-400 mb-3">{jobTitle}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              resumeUploaded 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              <FileTextIcon className="w-4 h-4 mr-1" />
              {resumeUploaded ? 'Resume Uploaded' : 'No Resume'}
            </div>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300">
              Profile {userProfile.firstName && userProfile.lastName ? 'Started' : 'Incomplete'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;