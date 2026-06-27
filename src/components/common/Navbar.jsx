import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
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
    return location.pathname === path;
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out transform ${
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0B1B3D] backdrop-blur-md border-b border-white/10 h-[70px] lg:h-20 flex items-center ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-full">
          <div className="flex items-center justify-between h-full w-full">
            
            {/* Logo Section (Left) */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2.5 group z-20">
                <img src="/gameImage/logo1.png" alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col">
                  <span className="text-lg lg:text-xl font-bold tracking-tight leading-none font-poppins">
                    <span className="text-white">Learning</span>
                    <span className="text-blue-400 ml-1">Acceleration</span>
                  </span>
                  <span className="text-[10px] text-blue-100/70 font-medium tracking-normal mt-1 leading-none transition-colors group-hover:text-white">
                    Powered by Visdomwaves Pvt. Limited
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Links (Center) - Desktop */}
            <div className="hidden lg:flex items-center h-full space-x-6 xl:space-x-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative flex items-center h-full text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-400'
                      : 'text-blue-50 hover:text-blue-300'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-400 rounded-t-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">

              <Link
                to="/signup"
                className="px-5 py-2 text-sm font-semibold border border-blue-400 text-blue-400 bg-transparent rounded-full hover:bg-blue-400/10 active:scale-95 transition-all duration-200"
              >
                Sign Up
              </Link>

              <Link
                to="/games"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Start Training
              </Link>

               {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative flex items-center justify-between w-16 h-8 bg-white/10 rounded-full p-1 border border-white/20 transition-colors duration-300 focus:outline-none mr-2 hover:bg-white/20"
                aria-label="Toggle Theme"
              >
                <span className="z-10 flex items-center justify-center w-1/2 h-full">
                  <FiSun className={`w-4 h-4 transition-colors duration-300 ${!isDarkMode ? 'text-[#0F172A]' : 'text-slate-300'}`} />
                </span>
                <span className="z-10 flex items-center justify-center w-1/2 h-full">
                  <FiMoon className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#0F172A]' : 'text-slate-300'}`} />
                </span>
                <div
                  className={`absolute left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    isDarkMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>

            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden flex items-center z-20">
              <button
                onClick={() => setIsOpen(true)}
                className="text-white hover:text-blue-300 focus:outline-none transition-colors p-2"
                aria-label="Open menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer (Slide-in from right) */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-full bg-gradient-to-b from-[#0F172A] to-[#1E3A8A] backdrop-blur-md shadow-2xl border-l border-white/10 z-50 p-6 flex flex-col transition-transform duration-300 ease-out transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <img src="/gameImage/logo1.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-sm font-bold text-white">Learning Acceleration</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-100/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col py-6 space-y-3 overflow-y-auto flex-grow">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-blue-300 bg-blue-900/40'
                  : 'text-blue-50 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Drawer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col space-y-3">
          
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 text-center text-sm font-semibold border border-blue-400 text-blue-400 rounded-full hover:bg-blue-400/10 transition-colors"
          >
            Sign Up
          </Link>

          <Link
            to="/games"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-center text-sm font-semibold text-white bg-blue-600 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:bg-blue-500 transition-colors"
          >
            Start Training
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
