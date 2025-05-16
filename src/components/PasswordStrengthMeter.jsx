import { useMemo } from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1; // Uppercase letters
    if (/[a-z]/.test(password)) score += 1; // Lowercase letters
    if (/[0-9]/.test(password)) score += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters
    
    return Math.min(score, 4); // Cap at 4
  };
  
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  
  const getStrengthLabel = (strength) => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };
  
  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <div className={`h-full ${getStrengthColor(strength)}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
      </div>
      <p className="text-xs mt-1 text-surface-600 dark:text-surface-400">Password strength: {getStrengthLabel(strength)}</p>
    </div>
  );
};

export default PasswordStrengthMeter;