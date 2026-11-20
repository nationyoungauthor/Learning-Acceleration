import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF,
  FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter,
  FaRocket, FaBrain, FaGamepad, FaAward, FaShieldAlt,
  FaArrowRight, FaCheckCircle
} from 'react-icons/fa';
import { LuSparkles, LuBrain, LuZap, LuTrophy, LuBookOpen } from 'react-icons/lu';

const Footer = () => {
  return (
    <footer className="relative z-20 mt-24 bg-gradient-to-b from-[#070F26] via-[#0B1A40] to-[#040918] text-slate-300 font-sans border-t-4 border-blue-600/90 shadow-[0_-12px_30px_rgba(2,6,23,0.3)]">

      {/* ========================================================================= */}
      {/* FLOATING TOP 3D CTA BANNER                                                */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-14 relative z-30">
        <div className="relative rounded-[28px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-10 border-2 border-blue-400/50 shadow-[0_10px_0_#1E3A8A,0_25px_50px_rgba(30,58,138,0.4)] flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Left CTA Text */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-2.5 shadow-2xs backdrop-blur-md">
              <LuSparkles className="text-amber-300" />
              <span>Accelerate Your Potential</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-poppins leading-tight">
              Ready to Supercharge Your Brain?
            </h3>
            <p className="text-blue-100/90 text-xs sm:text-sm mt-1.5 max-w-xl font-medium">
              Join thousands of young minds building lightning-fast memory, mathematical agility, and syllabus recall today.
            </p>
          </div>

          {/* Right 3D Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <Link
              to="/games"
              className="group cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#B45309] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_4px_0_#92400E,0_10px_20px_rgba(217,119,6,0.35)] active:translate-y-1 active:shadow-[0_1px_0_#92400E] transition-all"
            >
              <FaGamepad className="text-base text-slate-950" />
              <span>Start Brain Games</span>
              <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/quiz-zone"
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-1 active:shadow-none transition-all backdrop-blur-md"
            >
              <LuBookOpen className="text-base text-blue-200" />
              <span>Explore Quiz Zone</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN FOOTER GRID                                                          */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-6 lg:px-12 -mt-4 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Student Mission (Span 4) */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            {/* 3D Brand Badge */}
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-[0_4px_0_#1E40AF,0_8px_16px_rgba(37,99,235,0.25)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/gameImage/logo1.png"
                  alt="Learning Acceleration Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-none font-poppins">
                  LEARNING <span className="text-blue-400">ACCELERATION</span>
                </span>
                <span className="text-[10px] text-blue-200/80 font-bold uppercase tracking-widest mt-1">
                  Powered by <span className="text-white">Visdom Waves</span>
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-normal">
              A next-generation cognitive learning ecosystem calibrated for school students. Enhancing memory retention, calculation speed, and academic recall through science-backed game modules.
            </p>

            {/* 3D Quick Contact Cards */}
            <div className="space-y-2.5 pt-1">
              <a
                href="tel:+917997755155"
                className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white shadow-[0_2px_0_rgba(0,0,0,0.3)] transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">
                  <FaPhoneAlt />
                </div>
                <span className="font-bold">+91 79977 55155</span>
              </a>

              <br />

              <a
                href="mailto:info@visdomwaves.com"
                className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white shadow-[0_2px_0_rgba(0,0,0,0.3)] transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center text-xs">
                  <FaEnvelope />
                </div>
                <span className="font-bold">info@visdomwaves.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (Span 2) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-blue-500" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-blue-400 text-[10px]">▸</span> Home
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-blue-400 text-[10px]">▸</span> Brain Games
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30 font-black">50+</span>
                </Link>
              </li>
              <li>
                <Link to="/quiz-zone" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-blue-400 text-[10px]">▸</span> Quiz Zone
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-black">Adaptive</span>
                </Link>
              </li>
              <li>
                <Link to="/highscores" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-blue-400 text-[10px]">▸</span> Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-blue-400 text-[10px]">▸</span> Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-blue-400 text-[10px]">▸</span> About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Cognitive Skill Tracks (Span 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-indigo-500" />
              Cognitive Tracks
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link
                  to="/games"
                  state={{ category: 'Memory' }}
                  className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <span className="text-indigo-400 text-[10px]">▸</span> Working Memory &amp; Recall
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  state={{ category: 'Logic & Attention' }}
                  className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <span className="text-indigo-400 text-[10px]">▸</span> Focus &amp; Selective Attention
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  state={{ category: 'Logic & Attention' }}
                  className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <span className="text-indigo-400 text-[10px]">▸</span> Pattern Recognition &amp; Logic
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  state={{ category: 'Speed & Reflex' }}
                  className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <span className="text-indigo-400 text-[10px]">▸</span> Speed Math &amp; Reaction Time
                </Link>
              </li>
              <li>
                <Link
                  to="/assessment"
                  className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <span className="text-indigo-400 text-[10px]">▸</span> Cognitive IQ Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Support (Span 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-emerald-500" />
              Safety &amp; Support
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/contact" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-emerald-400 text-[10px]">▸</span> Contact Support
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-emerald-400 text-[10px]">▸</span> Student Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-emerald-400 text-[10px]">▸</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-300/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-emerald-400 text-[10px]">▸</span> Terms of Service
                </Link>
              </li>
            </ul>

            {/* 3D Student Safe Badge */}
            <div className="mt-2 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 shadow-[0_3px_0_rgba(16,185,129,0.2)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_2px_0_#065F46]">
                <FaShieldAlt />
              </div>
              <div className="text-[11px] leading-tight">
                <p className="font-black text-emerald-300">Student Safe Certified</p>
                <p className="text-slate-400 text-[10px]">Curated for ages 5 to 25</p>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3D SOCIAL ICONS & COPYRIGHT BAR                                           */}
        {/* ========================================================================= */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright Note */}
          <div className="text-xs text-slate-400 text-center md:text-left">
            <p>© {new Date().getFullYear()} <strong className="text-slate-200">Learning Acceleration</strong>. All rights reserved.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Powered by{' '}
              <a
                href="https://www.visdomwaves.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-bold underline decoration-blue-500/50 underline-offset-2 transition-colors"
              >
                Visdom Waves
              </a>
            </p>
          </div>

          {/* 3D Chunky Social Media Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="cursor-pointer w-10 h-10 rounded-xl bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-[#1877F2] text-slate-300 hover:text-white shadow-[0_3px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center text-sm"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="cursor-pointer w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 border border-white/10 hover:border-pink-500 text-slate-300 hover:text-white shadow-[0_3px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center text-sm"
            >
              <FaInstagram />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="cursor-pointer w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF0000] border border-white/10 hover:border-[#FF0000] text-slate-300 hover:text-white shadow-[0_3px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center text-sm"
            >
              <FaYoutube />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="cursor-pointer w-10 h-10 rounded-xl bg-white/5 hover:bg-[#0A66C2] border border-white/10 hover:border-[#0A66C2] text-slate-300 hover:text-white shadow-[0_3px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center text-sm"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="cursor-pointer w-10 h-10 rounded-xl bg-white/5 hover:bg-sky-500 border border-white/10 hover:border-sky-500 text-slate-300 hover:text-white shadow-[0_3px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center text-sm"
            >
              <FaTwitter />
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
