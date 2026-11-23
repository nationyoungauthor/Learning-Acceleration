import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBrain, FaLightbulb, FaPuzzlePiece, FaKeyboard,
  FaStopwatch, FaMousePointer, FaCircle, FaListOl,
  FaCrosshairs, FaPalette, FaSortNumericDown,
  FaLanguage, FaMagic, FaCheckSquare,
  FaClock, FaGraduationCap, FaEye, FaCalculator,
  FaSmile, FaMicrophone, FaStar, FaFilter, FaCheckCircle, FaSlidersH
} from 'react-icons/fa';
import { LuSparkles, LuBrain } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import {
  BANDS,
  BAND_CONFIG,
  GAME_CATEGORIES,
  ALL_GAMES_METADATA
} from '../utils/learningBands';

const ICON_MAP = {
  FaListOl: <FaListOl className="text-blue-500 text-2xl" />,
  FaLightbulb: <FaLightbulb className="text-yellow-500 text-2xl" />,
  FaFont: <span className="text-indigo-500 font-bold text-2xl">Aa</span>,
  FaCheckSquare: <FaCheckSquare className="text-emerald-500 text-2xl" />,
  FaSortNumericDown: <FaSortNumericDown className="text-pink-500 text-2xl" />,
  FaPuzzlePiece: <FaPuzzlePiece className="text-purple-500 text-2xl" />,
  FaPalette: <FaPalette className="text-red-500 text-2xl" />,
  FaBrain: <FaBrain className="text-orange-500 text-2xl" />,
  FaCrosshairs: <FaCrosshairs className="text-blue-500 text-2xl" />,
  FaStopwatch: <FaStopwatch className="text-rose-500 text-2xl" />,
  FaMagic: <FaMagic className="text-purple-500 text-2xl" />,
  FaEye: <FaEye className="text-emerald-600 text-2xl" />,
  FaCalculator: <FaCalculator className="text-orange-600 text-2xl" />,
  FaKeyboard: <FaKeyboard className="text-yellow-500 text-2xl" />,
  FaLanguage: <FaLanguage className="text-indigo-500 text-2xl" />,
  FaGraduationCap: <FaGraduationCap className="text-blue-600 text-2xl" />,
  FaMousePointer: <FaMousePointer className="text-slate-500 text-2xl" />,
  FaCircle: <FaCircle className="text-blue-400 text-2xl" />,
  FaClock: <FaClock className="text-orange-500 text-2xl" />,
  FaSmile: <FaSmile className="text-pink-600 text-2xl" />,
  FaMicrophone: <FaMicrophone className="text-violet-600 text-2xl" />
};

const Games = () => {
  const location = useLocation();
  const { user, bandInfo, learningBand, updateDifficulty } = useAuth();

  const [filterMode, setFilterMode] = useState('recommended'); // 'recommended' | 'all'
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const currentBandConfig = bandInfo.config;
  const currentDifficulty = user?.difficultyPreference || currentBandConfig.defaultDifficulty || 'Easy';

  // Base list of games depending on filter mode
  const baseGames = filterMode === 'recommended'
    ? bandInfo.recommendedGames
    : ALL_GAMES_METADATA;

  // Category filtered list
  const filteredGames = activeCategory === 'All'
    ? baseGames
    : baseGames.filter(game => game.category === activeCategory);

  const categoryNames = ['All', ...GAME_CATEGORIES.map(c => c.name)];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] relative overflow-hidden text-slate-800 font-sans pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 space-y-8">

        {/* Header & Band Information Card */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-[0_10px_30px_rgba(37,99,235,0.06),0_4px_0_#DBEAFE] p-6 sm:p-8 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider mb-3 border border-blue-200 shadow-2xs">
              <LuSparkles />
              <span>{currentBandConfig.displayName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-slate-900 tracking-tight leading-tight">
              Brain Training <span className="text-blue-600">Games</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-xl">
              {currentBandConfig.gameDifficultyDesc}
            </p>
          </div>

          {/* Difficulty & Scope Switchers */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
            {/* Filter Scope (Recommended vs All) */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setFilterMode('recommended')}
                className={`cursor-pointer px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex-1 sm:flex-initial ${
                  filterMode === 'recommended'
                    ? 'bg-blue-600 text-white shadow-[0_2px_0_#1E40AF]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Recommended ({bandInfo.recommendedGames.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`cursor-pointer px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex-1 sm:flex-initial ${
                  filterMode === 'all'
                    ? 'bg-blue-600 text-white shadow-[0_2px_0_#1E40AF]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (24)
              </button>
            </div>

            {/* Difficulty Level Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner w-full sm:w-auto">
              {['Easy', 'Standard', 'Challenge'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => updateDifficulty(d)}
                  className={`cursor-pointer px-3 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex-1 sm:flex-initial ${
                    currentDifficulty === d
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-[0_2px_0_#3730A3]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 9 Category Filters */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-[0_3px_0_#1E40AF]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => {
            const isRecommended = game.bands.includes(learningBand);
            const personalBest = user?.personalBests?.[game.id] || 0;
            const iconElement = ICON_MAP[game.iconName] || <FaBrain className="text-blue-500 text-2xl" />;

            return (
              <Link
                to={game.path}
                key={game.id}
                className="group bg-white rounded-3xl border-2 border-slate-200/90 hover:border-blue-400 overflow-hidden shadow-[0_6px_0_#E2E8F0] hover:shadow-[0_8px_0_#93C5FD,0_16px_30px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-6 z-10 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                      {iconElement}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {isRecommended && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-2xs">
                          <FaCheckCircle />
                          <span>Band Match</span>
                        </span>
                      )}
                      {personalBest > 0 && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 shadow-2xs">
                          <FaStar className="text-amber-500 text-[10px]" />
                          <span>PB: {personalBest}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-black font-poppins text-slate-900 group-hover:text-blue-600 transition-colors">
                    {game.title}
                  </h3>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mt-0.5">
                    {game.category}
                  </span>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed line-clamp-2">
                    {game.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 group-hover:underline">
                    Play Now →
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    Mode: {currentDifficulty}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Games;
