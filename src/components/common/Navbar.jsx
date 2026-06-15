import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove handleGamesScroll since we now have a dedicated page
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Brain Games', path: '/games' },
    { name: 'Quiz Zone', path: '/quiz-zone' },
    { name: 'Leaderboard', path: '/highscores' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        scrolled || isOpen
          ? 'shadow-md border-b border-gray-100 py-3'
          : 'border-b border-gray-100 py-4'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between w-full">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center space-x-2.5 group z-20">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🧠</span>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
              Learning Acceleration
            </span>
          </Link>

          {/* Menu (Center) - Desktop */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={item.onClick}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'text-[#2563EB] bg-blue-50/70'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className={`text-sm font-bold transition-all px-3 py-2 rounded-lg ${
                isActive('/login') ? 'text-[#2563EB]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Login
            </Link>
            
            <Link
              to="/signup"
              className={`text-sm font-bold transition-all px-3 py-2 rounded-lg ${
                isActive('/signup') ? 'text-[#2563EB]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Sign Up
            </Link>

            <Link
              to="/games"
              className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5"
            >
              Start Training
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="lg:hidden flex items-center z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0F172A] hover:text-[#2563EB] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden z-10 ${
          isOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0 border-none'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-[#0F172A] hover:text-[#2563EB] text-base font-bold py-2 border-b border-gray-100"
          >
            Home
          </Link>
          <Link
            to="/games"
            onClick={() => setIsOpen(false)}
            className="text-[#0F172A] hover:text-[#2563EB] text-base font-bold py-2 border-b border-gray-100"
          >
            Games
          </Link>
          <Link
            to="/quiz-zone"
            onClick={() => setIsOpen(false)}
            className="text-[#0F172A] hover:text-[#2563EB] text-base font-bold py-2 border-b border-gray-100"
          >
            Quiz Zone
          </Link>
          <Link
            to="/highscores"
            onClick={() => setIsOpen(false)}
            className="text-[#0F172A] hover:text-[#2563EB] text-base font-bold py-2 border-b border-gray-100"
          >
            Leaderboard
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="text-[#0F172A] hover:text-[#2563EB] text-base font-bold py-2 border-b border-gray-100"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-[#0F172A] hover:text-[#2563EB] text-base font-bold py-2 border-b border-gray-100"
          >
            About
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="text-[#2563EB] hover:text-blue-700 text-base font-bold py-2"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
