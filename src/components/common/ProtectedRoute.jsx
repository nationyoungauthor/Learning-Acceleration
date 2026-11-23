import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verifying Student Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If not registered/logged in, redirect to Sign In page first
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
