import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';

const UserProfileForm = ({ userProfile, onProfileUpdate }) => {
  const [profile, setProfile] = useState(userProfile);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Icons
  const UserIcon = getIcon('user');
  const MailIcon = getIcon('mail');
  const PhoneIcon = getIcon('phone');
  const MapPinIcon = getIcon('mappin');
  const BriefcaseIcon = getIcon('briefcase');
  const BuildingIcon = getIcon('building');
  const GraduationCapIcon = getIcon('graduationcap');

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
    setTimeout(() => {
      onProfileUpdate(profile);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label" htmlFor="firstName">First Name</label>
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
          <label className="label" htmlFor="lastName">Last Name</label>
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
          <label className="label" htmlFor="email">Email</label>
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
      </div>
      
      <div>
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
      </div>
      
      <div>
        <label className="label" htmlFor="bio">Professional Summary</label>
        <textarea
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="input min-h-[120px]"
          placeholder="Write a brief professional summary"
        />
      </div>
      
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