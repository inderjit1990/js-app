// Application Constants
export const APP_NAME = 'YourApp';

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MOBILE_REGEX: /^[0-9]{10}$/,
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  SIGNUP_SUCCESS: 'Account created successfully!',
  SIGNUP_FAILED: 'Signup failed. Please try again.',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_EMAIL: 'Please enter a valid email address',
};