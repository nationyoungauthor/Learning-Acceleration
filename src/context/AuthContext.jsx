import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerStudentApi, loginStudentApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_session');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading session:', e);
    } finally {
      setLoading(false);
    }

    // Sync across tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'user_session') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Register a new student via MongoDB Backend API
  const register = async (data) => {
    try {
      const apiRes = await registerStudentApi(data);

      if (apiRes.success && apiRes.user) {
        // Successfully saved in MongoDB database!
        const sessionData = {
          id: apiRes.user.id || apiRes.user._id,
          name: apiRes.user.name,
          email: apiRes.user.email,
          age: apiRes.user.age,
          class: apiRes.user.class,
          isLoggedIn: true
        };

        localStorage.setItem('user_session', JSON.stringify(sessionData));
        setUser(sessionData);

        return { success: true, message: apiRes.message };
      }

      // If backend responded with an error (e.g., email already exists)
      if (!apiRes.success && !apiRes.isNetworkError) {
        return { success: false, message: apiRes.message };
      }

      // If network error occurred (backend server is not running on port 5000)
      if (apiRes.isNetworkError) {
        // Fallback to local storage with warning, or inform user
        const sessionData = {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          age: data.age,
          class: data.class.trim(),
          isLoggedIn: true
        };
        localStorage.setItem('user_session', JSON.stringify(sessionData));
        setUser(sessionData);

        return {
          success: true,
          warning: 'Saved locally. Please start the backend on port 5000 to sync to MongoDB Atlas.'
        };
      }

      return { success: false, message: apiRes.message || 'Registration failed' };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: err.message || 'Failed to complete registration' };
    }
  };

  // Sign In student via MongoDB Backend API
  const login = async (email, password) => {
    try {
      const apiRes = await loginStudentApi(email, password);

      if (apiRes.success && apiRes.user) {
        // Verified from MongoDB database!
        const sessionData = {
          id: apiRes.user.id || apiRes.user._id,
          name: apiRes.user.name,
          email: apiRes.user.email,
          age: apiRes.user.age,
          class: apiRes.user.class,
          isLoggedIn: true
        };

        localStorage.setItem('user_session', JSON.stringify(sessionData));
        setUser(sessionData);

        return { success: true, message: apiRes.message };
      }

      if (!apiRes.success && !apiRes.isNetworkError) {
        return { success: false, message: apiRes.message };
      }

      // Fallback for offline local dev mode
      if (apiRes.isNetworkError) {
        const sessionData = {
          name: email.split('@')[0],
          email: email.trim().toLowerCase(),
          class: 'Student',
          isLoggedIn: true
        };
        localStorage.setItem('user_session', JSON.stringify(sessionData));
        setUser(sessionData);
        return { success: true };
      }

      return { success: false, message: apiRes.message || 'Sign in failed' };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: err.message || 'Sign in failed' };
    }
  };

  // Logout student
  const logout = () => {
    try {
      localStorage.removeItem('user_session');
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user && user.isLoggedIn),
    loading,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
