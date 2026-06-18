import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegClone } from 'react-icons/fa';

/**
 * Featured Games Section – premium, card‑based layout.
 * Props:
 *   games: Array of game objects with keys:
 *     id, title, path, icon, desc, img, category, difficulty, skill, accent, bestScore
 */
const FeaturedGamesSection = ({ games }) => {
  return (
    <section id="games-section" className="bg-gradient-to-r from-indigo-50 via-white to-slate-50 py-24 w-full overflow-hidden rounded-xl shadow-lg">
  <div className="px-6 lg:px-12 max-w-6xl mx-auto">
    {/* Heading */}
  
      {/* Heading */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
            🎮 Brain Training Games
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Train Your Brain Through Fun Challenges
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Improve memory, focus, logic, processing speed, and problem‑solving skills with interactive cognitive games designed for students.
          </p>
        </div>
        <Link
          to="/games"
          className="text-sm font-bold text-[#2563EB] hover:underline flex items-center gap-1"
        >
          <span>View All 50+ Games</span>
          <span>→</span>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            to={game.path}
            key={game.id}
            className="group bg-white rounded-3xl border border-slate-100 hover:border-[#2563EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="h-44 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
              <img
                src={game.img}
                alt={game.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=400';
                }}
              />
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shadow-inner">
                    {game.icon || <FaRegClone className="text-gray-500" />}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{game.title}</h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">{game.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="px-2 py-0.5 text-xs font-medium rounded-full"
                    style={{ backgroundColor: game.accent, color: '#ffffff' }}
                  >
                    {game.difficulty}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 text-xs rounded-full">
                    {game.skill}
                  </span>
                </div>
                <div className="text-sm text-[#0F172A] font-medium mb-2">
                  Best Score: {game.bestScore != null ? `${game.bestScore}%` : '---'}
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full py-3 bg-slate-50 group-hover:bg-[#2563EB] group-hover:text-white rounded-xl text-xs font-bold text-slate-700 text-center transition-all border border-transparent shadow-sm">
                  Play Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </section>
  );
};

export default FeaturedGamesSection;
