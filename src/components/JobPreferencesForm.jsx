import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';

const JobPreferencesForm = ({ preferences, onPreferencesUpdate }) => {
  const [formData, setFormData] = useState(preferences);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock industry options
  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Non-profit",
    "Other"
  ];

  // Icons
  const BriefcaseIcon = getIcon('briefcase');
  const MapPinIcon = getIcon('mappin');
  const BuildingIcon = getIcon('building');
  const DollarSignIcon = getIcon('dollarsign');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onPreferencesUpdate(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label" htmlFor="desiredTitle">Desired Job Title</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BriefcaseIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="desiredTitle"
              name="desiredTitle"
              value={formData.desiredTitle}
              onChange={handleChange}
              className="input pl-10"
              placeholder="e.g. Frontend Developer"
            />
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="desiredLocation">Desired Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="desiredLocation"
              name="desiredLocation"
              value={formData.desiredLocation}
              onChange={handleChange}
              className="input pl-10"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="desiredIndustry">Desired Industry</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BuildingIcon className="h-5 w-5 text-surface-400" />
            </div>
            <select
              id="desiredIndustry"
              name="desiredIndustry"
              value={formData.desiredIndustry}
              onChange={handleChange}
              className="select pl-10"
            >
              <option value="" disabled>Select an industry</option>
              {industryOptions.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="salaryExpectation">Salary Expectation</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSignIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              id="salaryExpectation"
              name="salaryExpectation"
              value={formData.salaryExpectation}
              onChange={handleChange}
              className="input pl-10"
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>
        </div>
        
        <div>
          <label className="label" htmlFor="workType">Work Type</label>
          <select
            id="workType"
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            className="select"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>
        
        <div>
          <label className="label" htmlFor="remotePreference">Remote Work Preference</label>
          <select
            id="remotePreference"
            name="remotePreference"
            value={formData.remotePreference}
            onChange={handleChange}
            className="select"
          >
            <option value="On-site">On-site only</option>
            <option value="Remote">Remote only</option>
            <option value="Hybrid">Hybrid (mix of remote and on-site)</option>
            <option value="Flexible">Flexible (no preference)</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="relocationWillingness"
            checked={formData.relocationWillingness}
            onChange={handleChange}
            className="h-4 w-4 text-primary border-surface-300 rounded focus:ring-primary"
          />
          <span className="ml-2 text-surface-700 dark:text-surface-300">
            I am willing to relocate for the right opportunity
          </span>
        </label>
      </div>
      
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
};

export default JobPreferencesForm;