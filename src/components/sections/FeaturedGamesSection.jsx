import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegClone, FaArrowRight } from 'react-icons/fa';

/**
 * Featured Games Section – modern, high-impact card-based layout.
 * Props:
 *   games: Array of game objects with keys:
 *     id, title, path, icon, desc, img, category, difficulty, skill, accent, bestScore
 */
const FeaturedGamesSection = ({ games }) => {
  return (
    <section id="games-section" className="relative py-16 sm:py-20 w-full z-10 overflow-hidden">
      {/* Subtle Ambient Background Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[850px] h-[400px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-full blur-3xl transform translate-y-8" />
      </div>

      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Interactive Cognitive Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-poppins">
              Train Your Brain Through{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fun Challenges
              </span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Improve memory, focus, logic, processing speed, and problem‑solving skills with
              interactive cognitive games designed for students.
            </p>
          </div>

          <Link
            to="/games"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-blue-600 bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white border border-blue-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex-shrink-0 self-start md:self-auto"
          >
            <span>View All 50+ Games</span>
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {games.map((game) => (
            <Link
              to={game.path}
              key={game.id}
              className="group relative bg-white/95 rounded-[26px] border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] hover:border-blue-400 hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Top Banner Image with Floating Badges */}
              <div className="h-48 sm:h-52 w-full overflow-hidden relative bg-slate-100 rounded-t-[26px] border-b border-slate-100">
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                {/* Subtle Gradient Shadow on bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-black/10 pointer-events-none" />

                {/* Category Badge (Top Left) */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-white/60">
                  {game.category || 'Cognitive Training'}
                </span>

                {/* Difficulty Badge (Top Right) */}
                <span
                  className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: game.accent || '#2563EB' }}
                >
                  {game.difficulty || 'All Levels'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  {/* Title & Icon Row */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 flex-shrink-0">
                      {game.icon || <FaRegClone className="text-blue-500 text-xl" />}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 font-poppins">
                      {game.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-normal">
                    {game.desc ||
                      'Challenge your cognitive skills and accelerate your learning speed with this interactive brain game.'}
                  </p>

                  {/* Skill Badge & Best Score Row */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full">
                      {game.skill || 'Cognitive'}
                    </span>
                    <div className="text-xs font-bold text-slate-500">
                      Best:{' '}
                      <span className="text-slate-900 font-extrabold">
                        {game.bestScore != null ? `${game.bestScore}%` : '---'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Play Button */}
                <div className="mt-5 w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200/90 shadow-2xs group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
                  <span>Play Now</span>
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>

              {/* Bottom Animated Gradient Accent Rail */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: game.accent
                    ? `linear-gradient(90deg, ${game.accent}, #6366F1)`
                    : 'linear-gradient(90deg, #2563EB, #6366F1)',
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGamesSection;
