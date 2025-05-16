import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.jsx';
import StarRating from './StarRating';
import CompanyReviews from './CompanyReviews';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechGrowth Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    industry: "Technology",
    postedDate: "2023-05-15",
    description: "We're looking for a Senior Frontend Developer with expertise in React, TypeScript, and modern CSS frameworks to join our dynamic team.",
    requirements: "5+ years of experience with React, Proficiency in TypeScript, Experience with modern CSS frameworks",
    companyRating: 4.5,
    reviewCount: 7
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "CreativeMinds Studio",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    type: "Full-time",
    industry: "Design",
    postedDate: "2023-05-17",
    description: "Join our creative team to design beautiful, intuitive user interfaces for web and mobile applications.",
    requirements: "3+ years of UI/UX design experience, Proficiency with Figma and Adobe Creative Suite, Portfolio showcasing your work",
    companyRating: 5.0,
    reviewCount: 4
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataDriven Analytics",
    location: "Remote",
    salary: "$115,000 - $140,000",
    type: "Full-time",
    industry: "Data Science",
    postedDate: "2023-05-12",
    description: "Help us extract valuable insights from complex datasets and build predictive models to solve business problems.",
    requirements: "MS or PhD in a quantitative field, Experience with Python, R, and SQL, Knowledge of machine learning algorithms",
    companyRating: 4.0,
    reviewCount: 3
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthBoost Marketing",
    location: "Chicago, IL",
    salary: "$85,000 - $105,000",
    type: "Full-time",
    industry: "Marketing",
    postedDate: "2023-05-18",
    description: "Lead our marketing efforts to drive brand awareness, customer acquisition, and engagement across multiple channels.",
    requirements: "5+ years of marketing experience, Experience with digital marketing channels, Strong analytical skills",
    companyRating: 2.8,
    reviewCount: 9
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "ServerStack Solutions",
    location: "Seattle, WA",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    industry: "Technology",
    postedDate: "2023-05-10",
    description: "Design and implement scalable backend services and APIs for our cloud-based platform.",
    requirements: "Strong experience with Node.js or Python, Knowledge of database systems, Experience with AWS or GCP",
    companyRating: 4.2,
    reviewCount: 5
  },
  {
    id: 6,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    industry: "Product Management",
    postedDate: "2023-05-16",
    description: "Drive product strategy and roadmap for our SaaS platform, working closely with engineering, design, and marketing teams.",
    requirements: "3+ years of product management experience, Technical background preferred, Strong communication skills",
    companyRating: 3.5,
    reviewCount: 6
  }
];

// Mock filters configuration
const industryOptions = [
  "All Industries",
  "Technology",
  "Design",
  "Data Science",
  "Marketing",
  "Product Management",
  "Finance",
  "Healthcare"
];

const locationOptions = [
  "All Locations",
  "Remote",
  "San Francisco, CA",
  "New York, NY",
  "Seattle, WA",
  "Austin, TX",
  "Chicago, IL",
  "Boston, MA"
];

const jobTypeOptions = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];

const ratingOptions = [
  "All Ratings",
  "4.5 & Up",
  "4.0 & Up",
  "3.5 & Up",
  "3.0 & Up"
];

const MainFeature = ({ darkMode }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: "All Locations",
    industry: "All Industries",
    jobType: "All Types",
    rating: "All Ratings"
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [applicationStatus, setApplicationStatus] = useState({});

  // Icons
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const BriefcaseIcon = getIcon('Briefcase');
  const FilterIcon = getIcon('SlidersHorizontal');
  const XIcon = getIcon('X');
  const UploadIcon = getIcon('Upload');
  const BuildingIcon = getIcon('Building2');
  const DollarSignIcon = getIcon('DollarSign');
  const CalendarIcon = getIcon('Calendar');
  const CheckIcon = getIcon('Check');
  const StarIcon = getIcon('Star');

  // Simulate loading jobs from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter jobs based on search query and filters
  useEffect(() => {
    let results = [...jobs];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    // Apply location filter
    if (filters.location !== "All Locations") {
      results = results.filter(job => job.location === filters.location);
    }
    
    // Apply industry filter
    if (filters.industry !== "All Industries") {
      results = results.filter(job => job.industry === filters.industry);
    }
    
    // Apply job type filter
    if (filters.jobType !== "All Types") {
      results = results.filter(job => job.type === filters.jobType);
    }

    // Apply rating filter
    if (filters.rating !== "All Ratings") {
      let minRating = 0;
      
      switch (filters.rating) {
        case "4.5 & Up":
          minRating = 4.5;
          break;
        case "4.0 & Up":
          minRating = 4.0;
          break;
        case "3.5 & Up":
          minRating = 3.5;
          break;
        case "3.0 & Up":
          minRating = 3.0;
          break;
      }
      
      results = results.filter(job => job.companyRating >= minRating);
    }
    
    setFilteredJobs(results);
  }, [searchQuery, filters, jobs]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  // Select a job to view details
  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setActiveTab('details');
  };

  // Close job details
  const handleCloseJobDetails = () => {
    setSelectedJob(null);
    setActiveTab('details');
    setResumeFile(null);
  };

  // Handle resume upload
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF or Word document");
        e.target.value = null;
      }
    }
  };

  // Handle job application
  const handleApply = (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }
    
    // Simulate API call to submit application
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setApplicationStatus(prev => ({
        ...prev,
        [selectedJob.id]: 'applied'
      }));
      
      toast.success("Application submitted successfully!");
      setSelectedJob(null);
      setResumeFile(null);
    }, 1500);
  };

  // Loading skeleton
  if (loading && jobs.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            <div className="h-10 w-48 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
          </h2>
          <div className="w-full md:w-64 h-12 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card p-4 h-64 animate-pulse">
              <div className="h-8 w-3/4 bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
              <div className="h-10 w-full bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
              <div className="h-8 w-3/4 bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
              <div className="h-10 w-full bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
              <div className="h-8 w-3/4 bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
              <div className="h-10 w-full bg-surface-200 dark:bg-surface-700 rounded"></div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-7 w-3/4 bg-surface-200 dark:bg-surface-700 rounded mb-3"></div>
                  <div className="h-5 w-1/2 bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="h-6 w-24 bg-surface-200 dark:bg-surface-700 rounded"></div>
                    <div className="h-6 w-32 bg-surface-200 dark:bg-surface-700 rounded"></div>
                    <div className="h-6 w-20 bg-surface-200 dark:bg-surface-700 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-surface-200 dark:bg-surface-700 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-surface-200 dark:bg-surface-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-surface-900 dark:text-white">
          Find Your Next Opportunity
        </h2>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearch}
            className="input pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block md:col-span-1">
          <div className="card p-5">
            <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Filters</h3>
            
            <div className="mb-4">
              <label className="label">Location</label>
              <select 
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="select"
              >
                {locationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="label">Industry</label>
              <select 
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="select"
              >
                {industryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="label">Job Type</label>
              <select 
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
                className="select"
              >
                {jobTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="label">Company Rating</label>
              <select 
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="select"
              >
                {ratingOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            
            <button 
              onClick={() => {
                setFilters({
                  location: "All Locations",
                  jobType: "All Types",
                  rating: "All Ratings",
                });
                setSearchQuery('');
              }}
              className="btn-outline w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Filters Button - Mobile */}
        <div className="md:hidden mb-4">
          <button 
            onClick={toggleFilters}
            className="btn-outline w-full flex items-center justify-center"
          >
            <FilterIcon className="w-5 h-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {/* Filters - Mobile */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mb-4"
            >
              <div className="card p-5">
                <div className="mb-4">
                  <label className="label">Location</label>
                  <select 
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="select"
                  >
                    {locationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="label">Industry</label>
                  <select 
                    value={filters.industry}
                    onChange={(e) => handleFilterChange('industry', e.target.value)}
                    className="select"
                  >
                    {industryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="label">Job Type</label>
                  <select 
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                    className="select"
                  >
                    {jobTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="label">Company Rating</label>
                  <select 
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="select"
                  >
                    {ratingOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button 
                  onClick={() => {
                    setFilters({
                      location: "All Locations",
                      industry: "All Industries",
                      jobType: "All Types",
                      rating: "All Ratings"
                    });
                    setSearchQuery('');
                  }}
                  className="btn-outline w-full"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Job Listings */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="card p-8 text-center">
              <svg className="mx-auto h-16 w-16 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-surface-900 dark:text-white">No jobs found</h3>
              <p className="mt-2 text-surface-500 dark:text-surface-400">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setFilters({
                    location: "All Locations",
                    industry: "All Industries",
                    jobType: "All Types"
                  });
                  setSearchQuery('');
                }}
                className="mt-4 btn-primary"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
            >
              {filteredJobs.map(job => (
                <motion.div 
                  key={job.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className={`card p-5 transition-all duration-300 cursor-pointer ${applicationStatus[job.id] ? 'border-l-4 border-l-green-500' : ''}`}
                  onClick={() => handleSelectJob(job)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-surface-500 dark:text-surface-400">
                          {job.company}
                        </p>
                        <div className="flex items-center">
                          <StarRating rating={job.companyRating} size="sm" /> 
                          <span className="ml-1 text-xs text-surface-500 dark:text-surface-400">({job.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                    {applicationStatus[job.id] && (
                      <div className="mt-2 md:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckIcon className="w-3 h-3 mr-1" />
                        Applied
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300">
                      <MapPinIcon className="w-3 h-3 mr-1" />
                      {job.location}
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300">
                      <BriefcaseIcon className="w-3 h-3 mr-1" />
                      {job.type}
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-dark dark:bg-primary-dark/10 dark:text-primary-light">
                      {job.industry}
                    </div>
                  </div>
                  
                  <p className="mt-3 text-surface-600 dark:text-surface-300 line-clamp-2">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden"
            >
              <div className="sticky top-0 z-10 bg-white dark:bg-surface-800 flex justify-between items-center p-5 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-xl font-bold text-surface-900 dark:text-white">{selectedJob.title}</h3>
                <button
                  onClick={handleCloseJobDetails}
                  className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                  aria-label="Close details"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Tab Navigation */}
              <div className="sticky top-[80px] z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
                <div className="flex">
                  <button 
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'details' ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-400 hover:text-primary'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Job Details
                  </button>
                  <button 
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-400 hover:text-primary'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Company Reviews
                  </button>
                </div>
              </div>
              
              <div className="p-5 overflow-y-auto max-h-[calc(90vh-130px)]">
                {activeTab === 'details' ? (
                  <>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                    <div className="flex items-center mb-2">
                      <BuildingIcon className="w-5 h-5 text-surface-500 mr-2" />
                      <span className="text-lg font-medium text-surface-900 dark:text-white">{selectedJob.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2">
                    <div className="w-full sm:w-1/2 flex items-center text-surface-600 dark:text-surface-300">
                      <MapPinIcon className="w-4 h-4 mr-2 text-surface-500" />
                      <span>{selectedJob.location}</span>
                    </div>
                    
                    <div className="w-full sm:w-1/2 flex items-center text-surface-600 dark:text-surface-300">
                      <DollarSignIcon className="w-4 h-4 mr-2 text-surface-500" />
                      <span>{selectedJob.salary}</span>
                    </div>
                    
                    <div className="w-full sm:w-1/2 flex items-center text-surface-600 dark:text-surface-300">
                      <BriefcaseIcon className="w-4 h-4 mr-2 text-surface-500" />
                      <span>{selectedJob.type}</span>
                    </div>
                    
                    <div className="w-full sm:w-1/2 flex items-center text-surface-600 dark:text-surface-300">
                      <CalendarIcon className="w-4 h-4 mr-2 text-surface-500" />
                      <span>Posted: {new Date(selectedJob.postedDate).toLocaleDateString()}</span>
                    </div>

                    <div className="w-full mt-2 flex items-center text-surface-600 dark:text-surface-300">
                      <StarIcon className="w-4 h-4 mr-2 text-surface-500" />
                      <span>Company Rating: <StarRating rating={selectedJob.companyRating} size="sm" /> <span className="ml-2">({selectedJob.reviewCount} reviews)</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-surface-900 dark:text-white">Job Description</h4>
                  <p className="text-surface-600 dark:text-surface-300 whitespace-pre-line">
                    {selectedJob.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-surface-900 dark:text-white">Requirements</h4>
                  <ul className="list-disc pl-5 text-surface-600 dark:text-surface-300 space-y-1">
                    {selectedJob.requirements.split(',').map((req, index) => (
                      <li key={index}>{req.trim()}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
                  <h4 className="text-lg font-semibold mb-3 text-surface-900 dark:text-white">
                    Apply for this position
                  </h4>
                  
                  {applicationStatus[selectedJob.id] ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4 flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">Application Submitted</p>
                        <p className="text-green-600 dark:text-green-400 text-sm">Your application has been successfully submitted.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleApply}>
                      <div className="mb-4">
                        <label className="label">Upload Your Resume (PDF or Word)</label>
                        <div className="relative">
                          <input
                            type="file"
                            id="resume"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                          />
                          <label
                            htmlFor="resume"
                            className={`
                              flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg cursor-pointer
                              ${resumeFile ? 'border-primary/70 dark:border-primary-light/70 bg-primary/5 dark:bg-primary-dark/10' : 'border-surface-300 dark:border-surface-600 hover:border-primary/70 dark:hover:border-primary-light/70'}
                              transition-all duration-200
                            `}
                          >
                            {resumeFile ? (
                              <div className="flex items-center">
                                <CheckIcon className="w-5 h-5 text-primary dark:text-primary-light mr-2" />
                                <span className="text-surface-800 dark:text-surface-200">{resumeFile.name}</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <UploadIcon className="w-5 h-5 text-surface-500 mr-2" />
                                <span className="text-surface-600 dark:text-surface-400">Click to upload your resume</span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleCloseJobDetails}
                          className="btn-outline mr-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                              Processing...
                            </>
                          ) : (
                            'Submit Application'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                </>
                ) : (
                  <CompanyReviews companyName={selectedJob.company} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;