import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${id ? `#${id}` : ''}`;
    }
  };

  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 text-[#64748B] text-sm py-16 mt-auto relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🧠</span>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  Learning Acceleration
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">
                  Train Your Brain Faster
                </span>
              </div>
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <a 
                  href="/#games-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('games-section');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Games
                </a>
              </li>
              <li>
                <Link to="/quiz-zone" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Quiz</Link>
              </li>
              <li>
                <Link to="/highscores" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Leaderboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">About</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brain Skills */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Brain Skills</h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="/#games-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('games-section');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Memory
                </a>
              </li>
              <li>
                <a 
                  href="/#logic-games-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('logic-games-section');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Focus
                </a>
              </li>
              <li>
                <a 
                  href="/#logic-games-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('logic-games-section');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Logic
                </a>
              </li>
              <li>
                <a 
                  href="/#perception-games-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('perception-games-section');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Speed
                </a>
              </li>
              <li>
                <Link to="/iq-test" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">IQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#contact" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Contact</a>
              </li>
              <li>
                <a href="#privacy" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#help" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">Help Center</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-medium">
          <p>© 2026 Learning Acceleration. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
