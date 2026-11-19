import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiUserPlus, FiLogOut, FiLogIn, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Brain Games', path: '/games' },
    { name: 'Quiz Zone', path: '/quiz-zone' },
    { name: 'Learning Paths', path: '/highscores' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Utility Bar (Dark Blue) */}
      <div className="bg-[#18429B] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-xs font-medium">
            <a
              href="tel:+917997755155"
              className="flex items-center space-x-1.5 hover:text-blue-200 transition-colors"
            >
              <FaPhoneAlt className="text-amber-400 w-3 h-3" />
              <span>+91 79977 55155</span>
            </a>
            <span className="text-blue-300/60">•</span>
            <a
              href="mailto:info@visdomwaves.com"
              className="flex items-center space-x-1.5 hover:text-blue-200 transition-colors"
            >
              <FiMail className="w-3.5 h-3.5 text-blue-200" />
              <span>info@visdomwaves.com</span>
            </a>
          </div>

          {/* Right: Social Media Icons */}
          <div className="hidden sm:flex items-center space-x-3 text-white/90">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <FaFacebookF className="w-3 h-3" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <FaInstagram className="w-3 h-3" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <FaYoutube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <FaLinkedinIn className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar (Light Blue) */}
      <nav
        className={`w-full bg-[#EAF2FE] backdrop-blur-md border-b border-blue-100 transition-all duration-300 ${
          scrolled ? 'shadow-md py-2.5' : 'py-3 sm:py-3.5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Side: Website Name & Logo in 3D White Pill Container */}
            <Link
              to="/"
              className="bg-white rounded-full py-1.5 px-3.5 sm:px-4 border border-blue-100 shadow-[0_2px_0_#BFDBFE,0_4px_8px_rgba(37,99,235,0.06),inset_0_1px_1px_white] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#93C5FD,0_8px_16px_rgba(37,99,235,0.12),inset_0_1px_1px_white] transition-all duration-200 flex items-center space-x-3 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-blue-50/60 p-1 flex-shrink-0">
                <img
                  src="/gameImage/logo1.png"
                  alt="Learning Acceleration Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-extrabold tracking-tight leading-none font-poppins text-slate-900">
                  LEARNING <span className="text-blue-600">ACCELERATION</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium leading-none mt-1">
                  Powered by <span className="text-blue-600 font-semibold">Visdom Waves</span>
                </span>
              </div>
            </Link>

            {/* Middle Section: Navigation Items with 3D Hover Effect */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative text-sm font-bold px-4 py-2 rounded-xl transition-all duration-200 select-none ${
                      active
                        ? 'bg-gradient-to-b from-white to-[#F0F5FF] text-blue-600 border border-blue-200/90 shadow-[0_3px_0_#93C5FD,0_4px_8px_rgba(37,99,235,0.1),inset_0_1px_1px_white] hover:-translate-y-1 hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-700 hover:text-white hover:border-blue-600 hover:shadow-[0_5px_0_#1E40AF,0_10px_20px_rgba(37,99,235,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] active:translate-y-0.5 active:shadow-[0_1px_0_#1E40AF]'
                        : 'text-slate-700 border border-transparent hover:text-white hover:-translate-y-1 hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-700 hover:border-blue-600 hover:shadow-[0_5px_0_#1E40AF,0_10px_20px_rgba(37,99,235,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] active:translate-y-0.5 active:shadow-[0_1px_0_#1E40AF]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side: Auth State Dependent Controls */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Student Profile Pill */}
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 shadow-[0_2px_0_#BFDBFE] hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-extrabold text-slate-900 leading-none">
                        {user?.name || 'Student'}
                      </span>
                      <span className="text-[10px] text-blue-600 font-bold leading-none mt-0.5">
                        {user?.class || 'Class 7th'}
                      </span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="cursor-pointer flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-full shadow-[0_2px_0_#FECDD3] active:translate-y-0.5 transition-all"
                    title="Sign Out"
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-[0_2px_0_#E2E8F0] active:translate-y-0.5 transition-all select-none"
                  >
                    <FiLogIn className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    to="/signup"
                    className="group flex items-center space-x-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-500 rounded-full shadow-[0_3px_0_#1E40AF,0_4px_10px_rgba(37,99,235,0.35)] hover:-translate-y-1 hover:from-blue-400 hover:to-blue-600 active:translate-y-0.5 active:shadow-[0_1px_0_#1E40AF] transition-all duration-200 select-none"
                  >
                    <FiUserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="text-slate-700 hover:text-blue-600 p-2 rounded-xl bg-white/70 hover:bg-white border border-blue-100 shadow-sm focus:outline-none transition-all"
                aria-label="Open navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-full bg-[#EAF2FE] shadow-2xl border-l border-blue-100 z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-blue-200/60">
            <div className="flex items-center space-x-2.5">
              <img src="/gameImage/logo1.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold text-slate-900">Learning Acceleration</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-white/60 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links with 3D Hover Effect */}
          <div className="flex flex-col py-5 space-y-2.5">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold py-2.5 px-3.5 rounded-xl transition-all ${
                    active
                      ? 'bg-gradient-to-b from-white to-[#F0F5FF] text-blue-600 shadow-[0_2px_0_#93C5FD] border border-blue-200/80 hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-700 hover:text-white'
                      : 'text-slate-800 hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-700 hover:text-white hover:shadow-[0_3px_0_#1E40AF]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-blue-200/60 flex flex-col space-y-2.5">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2.5 p-3 rounded-2xl bg-white border border-blue-200/80 shadow-[0_2px_0_#BFDBFE]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-extrabold text-slate-900 leading-none">
                      {user?.name || 'Student'}
                    </span>
                    <span className="text-xs text-blue-600 font-bold leading-none mt-1">
                      {user?.class || 'Class 7th'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="cursor-pointer flex items-center justify-center space-x-2 w-full py-2.5 text-sm font-bold text-rose-600 bg-white border border-rose-200 rounded-full shadow-[0_2px_0_#FECDD3] active:translate-y-0.5 transition-all"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-full shadow-[0_2px_0_#E2E8F0] active:translate-y-0.5 transition-all"
                >
                  <FiLogIn className="w-4 h-4 text-slate-500" />
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-center space-x-2 w-full py-2.5 text-sm font-bold text-white bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-[0_3px_0_#1E40AF] active:translate-y-0.5 transition-all"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Drawer Bottom Info */}
        <div className="pt-4 border-t border-blue-200/60 text-xs text-slate-600 space-y-2">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-amber-500 w-3 h-3" />
            <span>+91 79977 55155</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMail className="text-blue-500 w-3.5 h-3.5" />
            <span>info@visdomwaves.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
