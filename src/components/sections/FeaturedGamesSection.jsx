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
    <section id="games-section" className="relative py-24 w-full z-10">
      <div className="px-6 lg:px-12 max-w-6xl mx-auto">
      
        {/* Heading */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-blue-50 text-[#18609e] border border-[#d8e6f3] px-3 py-1 rounded-full text-sm font-medium mb-2 shadow-sm">
              🎮 Brain Training Games
            </span>
            <h2 className="text-3xl font-extrabold text-[#254f85] tracking-tight">
              Train Your Brain Through Fun Challenges
            </h2>
            <p className="text-sm text-[#6495c6] mt-1">
              Improve memory, focus, logic, processing speed, and problem‑solving skills with interactive cognitive games designed for students.
            </p>
          </div>
          <Link
            to="/games"
            className="text-sm font-bold text-[#18609e] hover:underline flex items-center gap-1"
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
              className="group bg-white rounded-3xl border border-[#d8e6f3] hover:border-[#18609e] overflow-hidden shadow-[0_4px_20px_rgba(8,_112,_184,_0.05)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-44 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-[#d8e6f3]">
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
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100">
                      {game.icon || <FaRegClone className="text-gray-500" />}
                    </div>
                    <h3 className="text-base font-bold text-[#254f85]">{game.title}</h3>
                  </div>
                  <p className="text-xs text-[#6495c6] leading-relaxed mb-4">{game.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full shadow-sm"
                      style={{ backgroundColor: game.accent, color: '#ffffff' }}
                    >
                      {game.difficulty}
                    </span>
                    <span className="inline-block bg-slate-50 text-[#6495c6] border border-[#d8e6f3] px-2 py-0.5 text-xs rounded-full">
                      {game.skill}
                    </span>
                  </div>
                  <div className="text-sm text-[#254f85] font-medium mb-2">
                    Best Score: {game.bestScore != null ? `${game.bestScore}%` : '---'}
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="cursor-pointer w-full py-3 bg-slate-50 group-hover:bg-[#18609e] group-hover:text-white rounded-2xl text-xs font-bold text-[#6495c6] text-center transition-all border border-[#d8e6f3] group-hover:border-[#18609e] shadow-sm">
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
