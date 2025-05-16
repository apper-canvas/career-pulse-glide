import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';

const StarRating = ({ 
  rating = 0, 
  maxRating = 5,
  precision = 0.5,
  size = 'md',
  color = 'gold',
  interactive = false,
  onChange = () => {}
}) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);
  const StarIcon = getIcon('Star');

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  // Size classes for star icons
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Color classes for filled stars
  const colorClasses = {
    gold: 'text-yellow-400',
    primary: 'text-primary',
    secondary: 'text-secondary'
  };

  const handleClick = (value) => {
    if (!interactive) return;
    
    // Toggle between full and half stars
    if (precision === 0.5) {
      if (value === currentRating) {
        value -= 0.5;
      } else if (value - 0.5 === currentRating) {
        value = Math.floor(value);
      } else {
        value = Math.floor(value) + 0.5;
      }
    }
    
    setCurrentRating(value);
    onChange(value);
  };

  const handleMouseEnter = (value) => {
    if (!interactive) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const value = index + 1;
        const displayRating = hoverRating || currentRating;
        
        return (
          <div 
            key={index}
            className={`relative ${interactive ? 'cursor-pointer' : ''} ${sizeClasses[size]}`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background/Empty Star */}
            <StarIcon className={`absolute text-gray-300 dark:text-gray-600 ${sizeClasses[size]}`} />
            
            {/* Filled Star (full or partial) */}
            {displayRating >= value - 0.25 && (
              <div className="overflow-hidden" style={{ width: displayRating >= value ? '100%' : `${(displayRating % 1) * 100}%` }}>
                <StarIcon className={`${colorClasses[color]} ${sizeClasses[size]}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;