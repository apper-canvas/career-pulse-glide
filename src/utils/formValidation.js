/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * Validates a password's strength
 * @param {string} password - The password to validate
 * @returns {boolean} - Whether the password meets minimum requirements
 */
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return regex.test(password);
};

/**
 * Validates that a field has a value
 * @param {string} value - The value to check
 * @returns {boolean} - Whether the field has a value
 */
export const validateField = (value) => value !== undefined && value !== null && value.trim() !== '';