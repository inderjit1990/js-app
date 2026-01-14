// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api',
  ENDPOINTS: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    LOGOUT: '/logout',
    PROFILE: '/profile',
  },
};

// API Helper Functions
export const apiCall = async (endpoint, options = {}) => {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const token = user.token;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};