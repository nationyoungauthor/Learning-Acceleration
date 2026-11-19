import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Register a new student
  const register = (data) => {
    try {
      const registeredList = JSON.parse(localStorage.getItem('registered_users') || '[]');
      
      const existingUser = registeredList.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );

      const studentProfile = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        age: data.age,
        class: data.class.trim(),
        password: data.password, // Stored for client simulation
        registeredAt: new Date().toISOString(),
        isLoggedIn: true
      };

      if (!existingUser) {
        registeredList.push(studentProfile);
      } else {
        // Update existing record
        const index = registeredList.findIndex(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );
        registeredList[index] = { ...existingUser, ...studentProfile };
      }

      localStorage.setItem('registered_users', JSON.stringify(registeredList));

      // Session without storing raw password in active user object
      const sessionData = {
        name: studentProfile.name,
        email: studentProfile.email,
        age: studentProfile.age,
        class: studentProfile.class,
        isLoggedIn: true
      };

      localStorage.setItem('user_session', JSON.stringify(sessionData));
      setUser(sessionData);

      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: 'Failed to save registration data' };
    }
  };

  // Sign In existing student
  const login = (email, password) => {
    try {
      const registeredList = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const cleanEmail = email.trim().toLowerCase();
      
      const foundUser = registeredList.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      // If registered before, check password
      if (foundUser && foundUser.password && foundUser.password !== password) {
        return { success: false, message: 'Invalid password. Please check and try again.' };
      }

      const sessionData = {
        name: foundUser ? foundUser.name : cleanEmail.split('@')[0],
        email: cleanEmail,
        age: foundUser ? foundUser.age : '12',
        class: foundUser ? foundUser.class : 'Student',
        isLoggedIn: true
      };

      localStorage.setItem('user_session', JSON.stringify(sessionData));
      setUser(sessionData);

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Sign in failed' };
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
