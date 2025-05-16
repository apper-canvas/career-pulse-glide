import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const ResumeUpload = ({ currentResume, onResumeUpload, onResumeDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Icons
  const UploadIcon = getIcon('upload');
  const FileTextIcon = getIcon('filetext');
  const TrashIcon = getIcon('trash2');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndUploadFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndUploadFile(file);
    }
  };

  const validateAndUploadFile = (file) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }
    
    // Simulate upload
    setIsLoading(true);
    setTimeout(() => {
      onResumeUpload(file);
      setIsLoading(false);
    }, 1000);
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return '📄';
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return '📝';
    return '📄';
  };

  return (
    <div className="space-y-6">
      {!currentResume ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging 
              ? 'border-primary bg-primary/5 dark:border-primary-light dark:bg-primary-dark/10' 
              : 'border-surface-300 dark:border-surface-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadIcon className="w-12 h-12 mx-auto text-surface-400 mb-4" />
          <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">Drag & Drop your resume here</h3>
          <p className="text-surface-500 dark:text-surface-400 mb-4">or</p>
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          <button type="button" onClick={() => fileInputRef.current.click()} className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Browse Files'}
          </button>
          <p className="mt-4 text-sm text-surface-500 dark:text-surface-400">Supported formats: PDF, DOC, DOCX (Max: 5MB)</p>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{getFileIcon(currentResume.name)}</span>
              <div>
                <h4 className="font-medium text-surface-900 dark:text-white">{currentResume.name}</h4>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  {(currentResume.size / 1024 / 1024).toFixed(2)} MB • Uploaded {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={onResumeDelete}
              className="p-2 text-surface-500 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-400 transition-colors"
              aria-label="Delete resume"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={() => fileInputRef.current.click()} className="btn-outline">
              Replace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;