import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import StarRating from './StarRating';
import { getIcon } from '../utils/iconUtils.jsx';

// Mock company reviews data
const mockReviews = {
  "TechGrowth Inc.": [
    { id: 1, rating: 4.5, author: "John D.", position: "Software Engineer", reviewDate: "2023-01-15", comment: "Great work environment and culture. Management is supportive and the company offers good benefits.", pros: "Good benefits, supportive management", cons: "Can be high pressure at times", status: "approved" },
    { id: 2, rating: 3.0, author: "Sarah L.", position: "Product Manager", reviewDate: "2023-02-20", comment: "Mixed experience overall. The company has good intentions but sometimes lacks in execution.", pros: "Good learning opportunities", cons: "Communication issues between departments", status: "approved" }
  ],
  "CreativeMinds Studio": [
    { id: 3, rating: 5.0, author: "Mike P.", position: "Senior Designer", reviewDate: "2022-12-10", comment: "Absolutely the best place I've worked. Creative freedom, supportive team, and great clients.", pros: "Creative freedom, work-life balance", cons: "Sometimes tight deadlines", status: "approved" }
  ],
  "DataDriven Analytics": [
    { id: 4, rating: 4.0, author: "Emily R.", position: "Data Analyst", reviewDate: "2023-03-05", comment: "Challenging problems to solve and a team that values quality work. Good compensation and benefits.", pros: "Interesting projects, competitive salary", cons: "Can be isolating when working remotely", status: "approved" }
  ],
  "GrowthBoost Marketing": [
    { id: 5, rating: 2.5, author: "Kevin T.", position: "Digital Marketer", reviewDate: "2023-02-08", comment: "High turnover and unstable leadership. The company has potential but needs better direction.", pros: "Exposure to different projects", cons: "High turnover, unclear expectations", status: "approved" },
    { id: 6, rating: 3.5, author: "Lisa M.", position: "Content Strategist", reviewDate: "2023-01-25", comment: "Decent place to work but needs improvement in process and organization.", pros: "Flexible hours, creative freedom", cons: "Disorganized processes, last-minute changes", status: "approved" }
  ],
  "ServerStack Solutions": [
    { id: 7, rating: 4.0, author: "David K.", position: "DevOps Engineer", reviewDate: "2022-11-30", comment: "Solid technical environment with room to innovate. Good work-life balance.", pros: "Technical excellence, good mentorship", cons: "Some legacy systems to maintain", status: "approved" }
  ],
  "InnovateTech": [
    { id: 8, rating: 3.0, author: "Rachel W.", position: "UX Researcher", reviewDate: "2023-03-12", comment: "Great mission but execution could be better. The team is dedicated but sometimes lacks resources.", pros: "Meaningful work, smart colleagues", cons: "Resource constraints, shifting priorities", status: "approved" }
  ]
};

const CompanyReviews = ({ companyName, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    author: '',
    position: '',
    comment: '',
    pros: '',
    cons: ''
  });
  const [loading, setLoading] = useState(true);
  
  // Get icons
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');

  // Load reviews for the company
  useEffect(() => {
    const loadReviews = () => {
      setLoading(true);
      setTimeout(() => {
        const companyReviews = mockReviews[companyName] || [];
        setReviews(companyReviews);
        
        // Calculate average rating
        if (companyReviews.length > 0) {
          const sum = companyReviews.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(sum / companyReviews.length);
        } else {
          setAverageRating(0);
        }
        
        setLoading(false);
      }, 500);
    };
    
    loadReviews();
  }, [companyName]);

  // Sort reviews based on selected sort option
  useEffect(() => {
    let sortedReviews = [...reviews];
    
    switch (sortBy) {
      case 'newest':
        sortedReviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
        break;
      case 'oldest':
        sortedReviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
        break;
      case 'highest':
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    
    setReviews(sortedReviews);
  }, [sortBy]);

  // Handle input change for new review
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle rating change for new review
  const handleRatingChange = (value) => {
    setNewReview(prev => ({
      ...prev,
      rating: value
    }));
  };

  // Submit new review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    // Validate form
    if (newReview.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    
    if (!newReview.author.trim()) {
      toast.error("Please provide your name");
      return;
    }
    
    if (!newReview.comment.trim()) {
      toast.error("Please provide review comments");
      return;
    }
    
    // Simulate API call to submit review
    setLoading(true);
    
    setTimeout(() => {
      const newReviewObject = {
        id: Date.now(),
        ...newReview,
        reviewDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      // Add to reviews (in a real app, this would be done after API confirmation)
      setReviews(prev => [newReviewObject, ...prev]);
      
      // Recalculate average
      const newTotal = reviews.reduce((acc, review) => acc + review.rating, 0) + newReviewObject.rating;
      setAverageRating(newTotal / (reviews.length + 1));
      
      setLoading(false);
      setShowAddReview(false);
      setNewReview({
        rating: 0,
        author: '',
        position: '',
        comment: '',
        pros: '',
        cons: ''
      });
      
      toast.success("Your review has been submitted successfully and is pending moderation");
    }, 800);
  };

  return (
    <div className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
            Company Reviews
          </h4>
          <div className="flex items-center">
            <StarRating rating={averageRating} size="md" />
            <span className="ml-2 text-surface-800 dark:text-surface-200 font-medium">
              {averageRating.toFixed(1)}
            </span>
            <span className="ml-2 text-surface-500 dark:text-surface-400">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
        
        <button 
          className="btn-primary mt-3 sm:mt-0"
          onClick={() => setShowAddReview(true)}
        >
          Write a Review
        </button>
      </div>
      
      {/* Review sorting */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-surface-600 dark:text-surface-400">
          Showing {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </div>
        
        <select 
          className="select text-sm py-1 px-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-4">
        {loading && reviews.length === 0 ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
            <p className="text-surface-600 dark:text-surface-400">No reviews for this company yet. Be the first to write one!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-surface-50 dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="ml-2 font-medium text-surface-800 dark:text-surface-200">{review.author}</span>
                </div>
                <span className="text-sm text-surface-500 dark:text-surface-400">{new Date(review.reviewDate).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-300 mb-2">{review.position}</p>
              <p className="text-surface-700 dark:text-surface-300 mb-3">{review.comment}</p>
              
              {(review.pros || review.cons) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {review.pros && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                      <p className="font-medium text-green-700 dark:text-green-400">Pros:</p>
                      <p className="text-green-600 dark:text-green-300">{review.pros}</p>
                    </div>
                  )}
                  {review.cons && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      <p className="font-medium text-red-700 dark:text-red-400">Cons:</p>
                      <p className="text-red-600 dark:text-red-300">{review.cons}</p>
                    </div>
                  )}
                </div>
              )}
              
              {review.status === 'pending' && (
                <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400 italic">
                  This review is pending moderation
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Add Review Form Modal */}
      <AnimatePresence>
        {showAddReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-md"
            >
              <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Write a Review</h3>
                <button
                  onClick={() => setShowAddReview(false)}
                  className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitReview} className="p-4">
                <div className="mb-4">
                  <label className="label">Your Rating</label>
                  <div className="mt-1">
                    <StarRating 
                      rating={newReview.rating} 
                      size="lg" 
                      interactive 
                      onChange={handleRatingChange} 
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="label" htmlFor="author">Your Name</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={newReview.author}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label" htmlFor="position">Your Position</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={newReview.position}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="E.g., Software Engineer, Designer, etc."
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label" htmlFor="comment">Your Review</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    className="input min-h-[100px]"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label" htmlFor="pros">Pros (optional)</label>
                  <textarea
                    id="pros"
                    name="pros"
                    value={newReview.pros}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="What did you like about working here?"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="label" htmlFor="cons">Cons (optional)</label>
                  <textarea
                    id="cons"
                    name="cons"
                    value={newReview.cons}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="What could be improved?"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
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
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyReviews;