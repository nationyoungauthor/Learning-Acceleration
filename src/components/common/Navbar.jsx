import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTrophy, FaBookOpen, FaBrain } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RiLoginBoxLine } from 'react-icons/ri';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 py-3 ${scrolled
        ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-white/5'
        : 'bg-black'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between w-full">

          {/* Logo & Branding */}
          <Link to="/" className="group flex flex-col items-start relative hover:cursor-pointer z-10 mr-8">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 transition-all duration-500">
              Learning Acceleration
            </h1>
            <div className="flex items-center mt-[1px] space-x-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.1em] text-gray-400">
                - Powered by <span className="text-indigo-400 font-bold ml-0.5">Visdomwaves</span>
              </span>
            </div>
          </Link>

          {/* Navigation Items (Right Side aligned like image) */}
          <div className="hidden md:flex items-center justify-end flex-grow space-x-6 z-10 pointer-events-auto">

            {/* Games Link (Solid Dark Grey Background) */}
            <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#252b36] hover:bg-[#2d3441] transition-colors border border-white/5 shadow-sm text-gray-200">
              <FaPlay className="text-[10px]" />
              <span className="text-sm font-semibold">Games</span>
            </Link>

            {/* High Scores */}
            <Link to="/" className="flex items-center space-x-2 px-2 py-2 text-gray-400 hover:text-white transition-colors group">
              <FaTrophy className="text-sm opacity-80 group-hover:opacity-100" />
              <span className="text-sm font-medium">High Scores</span>
            </Link>

            {/* Blog */}
            {/* <Link to="/" className="flex items-center space-x-2 px-2 py-2 text-gray-400 hover:text-white transition-colors group">
              <FaBookOpen className="text-sm opacity-80 group-hover:opacity-100" />
              <span className="text-sm font-medium">Blog</span>
            </Link> */}

            {/* IQ Test (Green Border and Text) */}
            <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#142d22] border border-[#1b4331] hover:bg-[#1b3d2e] transition-colors text-[#4dd383]">
              <FaBrain className="text-sm" />
              <span className="text-sm font-bold">IQ Test</span>
            </Link>

            {/* Login (Purple Gradient) */}
            <Link to="/login" className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#6b58ba] to-[#8063c4] hover:from-[#7565c9] hover:to-[#886dd1] transition-all shadow-[0_0_15px_rgba(107,88,186,0.3)] text-white hover:-translate-y-[1px]">
              <RiLoginBoxLine className="text-lg" />
              <span className="text-sm font-bold">Login</span>
            </Link>

          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white focus:outline-none transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
