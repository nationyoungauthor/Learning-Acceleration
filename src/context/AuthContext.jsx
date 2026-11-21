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

  // Register a new student via Live MongoDB Backend API
  const register = async (data) => {
    try {
      const apiRes = await registerStudentApi(data);

      if (apiRes.success && apiRes.user) {
        // Successfully saved in live MongoDB Atlas database!
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

      // Return real backend/database error message to the student
      return {
        success: false,
        message: apiRes.message || 'Registration failed in database'
      };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: err.message || 'Failed to complete registration' };
    }
  };

  // Sign In student via Live MongoDB Backend API
  const login = async (email, password) => {
    try {
      const apiRes = await loginStudentApi(email, password);

      if (apiRes.success && apiRes.user) {
        // Verified from live MongoDB Atlas database!
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

      return {
        success: false,
        message: apiRes.message || 'Invalid email or password'
      };
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
