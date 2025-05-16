import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';

const UserProfileForm = ({ userProfile, onProfileUpdate }) => {
  const [profile, setProfile] = useState(() => {
    // Try to load from localStorage first
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : userProfile;
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  // Icons
  const UserIcon = getIcon('user');
  const MailIcon = getIcon('mail');
  const PhoneIcon = getIcon('phone');
  const MapPinIcon = getIcon('mappin');
  const BriefcaseIcon = getIcon('briefcase');
  const BuildingIcon = getIcon('building');
  const GraduationCapIcon = getIcon('graduationcap');
  const GlobeIcon = getIcon('globe');
  const FileTextIcon = getIcon('filetext');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setProfile(prev => ({
      ...prev,
      skills
    }));
  };

  // Handle change for nested objects like socialLinks
  const handleNestedChange = (parent, field, value) => {
    setProfile(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.firstName) newErrors.firstName = 'First name is required';
    if (!profile.lastName) newErrors.lastName = 'Last name is required';
    
    if (!profile.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (profile.phone && !/^\+?[0-9\s-()]{10,15}$/.test(profile.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (profile.yearsOfExperience && isNaN(profile.yearsOfExperience)) {
      newErrors.yearsOfExperience = 'Years of experience must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      // Update the state in parent component
      onProfileUpdate(profile);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Tabs */}
      <div className="flex flex-wrap border-b border-surface-200 dark:border-surface-700 mb-6">
        <button
          type="button"
          className={`px-6 py-3 font-medium text-sm flex items-center ${
            activeSection === 'personal'
              ? 'border-b-2 border-primary text-primary dark:text-primary-light'
              : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveSection('personal')}
        >
          <UserIcon className="w-4 h-4 mr-2" />
          Personal Information
        </button>
        <button
          type="button"
          className={`px-6 py-3 font-medium text-sm flex items-center ${
            activeSection === 'professional'
              ? 'border-b-2 border-primary text-primary dark:text-primary-light'
              : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveSection('professional')}
        >
          <BriefcaseIcon className="w-4 h-4 mr-2" />
          Professional Details
        </button>
      </div>

      {activeSection === 'personal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className={`input pl-10 ${errors.firstName ? 'border-red-500 dark:border-red-500' : ''}`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="label" htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </label>
         <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className={`input pl-10 ${errors.lastName ? 'border-red-500 dark:border-red-500' : ''}`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
        </div>
        
        <div>
          <label className="label" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
         <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className={`input pl-10 ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label className="label" htmlFor="phone">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className={`input pl-10 ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="label" htmlFor="location">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="input pl-10"
              placeholder="City, State, Country"
            />
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={profile.dateOfBirth || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>
      )}

      {activeSection === 'professional' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label" htmlFor="headline">Professional Headline</label>
              <input
                type="text"
                id="headline"
                name="headline"
                value={profile.headline || ''}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Experienced Web Developer | React Specialist"
              />
              <p className="mt-1 text-xs text-surface-500">A brief professional headline that appears at the top of your profile</p>
            </div>

            <div>
              <label className="label" htmlFor="website">Personal Website</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GlobeIcon className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profile.website || ''}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label" htmlFor="title">Current Job Title</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BriefcaseIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={profile.title}
              onChange={handleChange}
              className="input pl-10"
              placeholder="e.g. Frontend Developer"
            />
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="company">Current Company</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BuildingIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="company"
              name="company"
              value={profile.company}
              onChange={handleChange}
              className="input pl-10"
              placeholder="Company name"
            />
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="yearsOfExperience">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={profile.yearsOfExperience}
            onChange={handleChange}
            className={`input ${errors.yearsOfExperience ? 'border-red-500 dark:border-red-500' : ''}`}
            placeholder="e.g. 5"
            min="0"
            max="50"
          />
          {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsOfExperience}</p>}
        </div>
        
         <div>
          <label className="label" htmlFor="education">Highest Education</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GraduationCapIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="education"
              name="education"
              value={profile.education}
              onChange={handleChange}
              className="input pl-10"
              placeholder="e.g. Bachelor's in Computer Science"
            />
          </div>
        </div>

          <div>
            <label className="label" htmlFor="certifications">Certifications</label>
            <textarea
              id="certifications"
              name="certifications"
              value={profile.certifications || ''}
              onChange={handleChange}
              className="input min-h-[80px]"
              placeholder="e.g. AWS Certified Developer, Google Cloud Professional"
            />
            <p className="mt-1 text-xs text-surface-500">List your professional certifications (one per line)</p>
          </div>

          <div>
            <label className="label" htmlFor="languages">Languages</label>
            <textarea
              id="languages"
              name="languages"
              value={profile.languages || ''}
              onChange={handleChange}
              className="input min-h-[80px]"
              placeholder="e.g. English (Fluent), Spanish (Intermediate)"
            />
            <p className="mt-1 text-xs text-surface-500">List languages you speak and proficiency level</p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="label" htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={profile.skills.join(', ')}
            onChange={handleSkillsChange}
            className="input"
            placeholder="e.g. JavaScript, React, Node.js"
          />
          <p className="mt-1 text-xs text-surface-500">List your key technical and professional skills</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-surface-800 dark:text-surface-200">Social Profiles</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label" htmlFor="linkedIn">LinkedIn URL</label>
              <input
                type="url"
                id="linkedIn"
                name="linkedIn"
                value={profile.socialLinks?.linkedIn || ''}
                onChange={(e) => handleNestedChange('socialLinks', 'linkedIn', e.target.value)}
                className="input"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            
            <div>
              <label className="label" htmlFor="github">GitHub URL</label>
              <input
                type="url"
                id="github"
                name="github"
                value={profile.socialLinks?.github || ''}
                onChange={(e) => handleNestedChange('socialLinks', 'github', e.target.value)}
                className="input"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
        <div>
        </div>
          <label className="label" htmlFor="bio">Professional Summary</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="input min-h-[120px]"
            placeholder="Write a brief professional summary"
          />
          <p className="mt-1 text-xs text-surface-500">
            Provide a summary of your professional experience, goals, and strengths. 
            This will be visible to recruiters.
          </p>
        </div>
        </div>
      </div>
      )}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;