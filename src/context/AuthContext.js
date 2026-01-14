import { createContext, useContext, useState, useEffect } from 'react';
import {apiCall , API_CONFIG} from '../services/api'; // Adjust the import based on your project structure

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const API_URL = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN;
      
      const response = await apiCall('POST', API_URL, credentials);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      const userData = {
        id: data.id || data.user?.id,
        email: data.email || data.user?.email,
        name: data.name || data.user?.name,
        token: data.token || data.access_token,
      };
      
      sessionStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const API_URL = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SIGNUP;
      
      const response = await apiCall('POST', API_URL, userData);

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      return { success: true, data }; 
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const fetchUserProfile = async () => {
    try {
      const API_URL = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PROFILE;

      const response = await apiCall('GET', API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};