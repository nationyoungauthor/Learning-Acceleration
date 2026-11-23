import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Centered Main Authentication Content (No top header bar) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative z-10 w-full">
        {children || <Outlet />}
      </main>

      {/* Minimal Distraction-Free Authentication Footer */}
      <footer className="w-full relative z-20 py-4 px-4 sm:px-8 border-t border-blue-100/80 bg-white/60 backdrop-blur-xs text-xs text-slate-500 font-medium">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} Learning Acceleration. Powered by <strong className="text-slate-800 font-bold">Visdom Waves</strong>. All rights reserved.
          </span>
          <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
            <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-blue-600 transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
