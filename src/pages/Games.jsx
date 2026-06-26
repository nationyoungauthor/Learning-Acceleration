import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBrain, FaLightbulb, FaPuzzlePiece, FaKeyboard,
  FaStopwatch, FaMousePointer, FaCircle, FaListOl,
  FaBolt, FaCrosshairs, FaPalette, FaSortNumericDown,
  FaLanguage, FaMagic, FaMemory, FaFont, FaCheckSquare,
  FaClock, FaArrowsAlt
} from 'react-icons/fa';

const allGames = [
  // Memory
  { id: 'sequence-memory', title: 'Sequence Memory', path: '/games/sequence-memory', category: 'Memory', icon: <FaListOl className="text-blue-500 text-2xl" />, desc: 'Remember an increasingly long pattern of button presses.' },
  { id: 'visual-memory', title: 'Visual Memory', path: '/games/visual-memory', category: 'Memory', icon: <FaLightbulb className="text-yellow-500 text-2xl" />, desc: 'Remember patterns of tiles and recall them.' },
  { id: 'word-memory', title: 'Word Memory', path: '/games/word-memory', category: 'Memory', icon: <FaFont className="text-indigo-500 text-2xl" />, desc: 'Identify which words you have seen before and which are new.' },
  { id: 'seen-number-memory', title: 'Seen Number Memory', path: '/games/seen-number-memory', category: 'Memory', icon: <FaCheckSquare className="text-emerald-500 text-2xl" />, desc: 'Determine if you have seen a given number before.' },
  { id: 'number-memory', title: 'Number Memory', path: '/games/number-memory', category: 'Memory', icon: <span className="text-pink-500 font-bold text-2xl">1/9</span>, desc: 'Memorize and recall increasingly longer number sequences.' },
  { id: 'number-sequence', title: 'Number Sequence', path: '/games/number-sequence', category: 'Memory', icon: <FaSortNumericDown className="text-teal-500 text-2xl" />, desc: 'Remember the sequence of numbers shown briefly.' },
  { id: 'memory-match', title: 'Memory Match', path: '/games/memory-match', category: 'Memory', icon: <FaPuzzlePiece className="text-purple-500 text-2xl" />, desc: 'Test your visual memory by matching pairs of icons.' },
  { id: 'color-memory', title: 'Color Memory', path: '/games/color-memory', category: 'Memory', icon: <FaPalette className="text-red-500 text-2xl" />, desc: 'Remember the color and identify if it matches.' },
  { id: 'chimp-test', title: 'Chimp Test', path: '/games/chimp-test', category: 'Memory', icon: <FaBrain className="text-orange-500 text-2xl" />, desc: 'Remember numbers and click them in ascending order.' },

  // Logic & Attention
  { id: 'pattern-logic', title: 'Pattern Logic', path: '/games/pattern-logic', category: 'Logic & Attention', icon: <FaMagic className="text-purple-500 text-2xl" />, desc: 'Find the next number in sequences by identifying patterns.' },
  { id: 'stroop-test', title: 'Stroop Test', path: '/games/stroop-test', category: 'Logic & Attention', icon: <FaPalette className="text-red-500 text-2xl" />, desc: 'Identify the color of the text, not the word written.' },
  { id: 'color-target', title: 'Color Target', path: '/games/color-target', category: 'Logic & Attention', icon: <FaCrosshairs className="text-blue-500 text-2xl" />, desc: 'Click the target color as fast as you can.' },
  { id: 'one-to-fifty', title: 'One to Fifty', path: '/games/one-to-fifty', category: 'Logic & Attention', icon: <FaSortNumericDown className="text-emerald-500 text-2xl" />, desc: 'Click numbers 1 to 50 in order as quickly as possible.' },
  { id: 'word-scramble', title: 'Word Scramble', path: '/games/word-scramble', category: 'Logic & Attention', icon: <FaLanguage className="text-indigo-500 text-2xl" />, desc: 'Unscramble letters to form valid words.' },
  { id: 'speed-math', title: 'Speed Math', path: '/games/speed-math', category: 'Logic & Attention', icon: <FaKeyboard className="text-yellow-500 text-2xl" />, desc: 'Solve arithmetic problems as quickly as possible.' },

  // Speed & Reflex
  { id: '5-second-test', title: '5-Second Test', path: '/games/5-second-test', category: 'Speed & Reflex', icon: <FaStopwatch className="text-red-500 text-2xl" />, desc: 'Stop the timer at exactly 5 seconds.' },
  { id: 'time-estimator', title: 'Time Estimator', path: '/games/time-estimator', category: 'Speed & Reflex', icon: <FaClock className="text-orange-500 text-2xl" />, desc: 'Estimate durations accurately without counting.' },
  { id: 'inverted-mouse', title: 'Inverted Mouse', path: '/games/inverted-mouse', category: 'Speed & Reflex', icon: <FaMousePointer className="text-slate-500 text-2xl" />, desc: 'Move your cursor with fully reversed controls.' },
  { id: 'perfect-circle', title: 'Perfect Circle', path: '/games/perfect-circle', category: 'Speed & Reflex', icon: <FaCircle className="text-blue-400 text-2xl" />, desc: 'Draw the most perfect circle you can.' }
];

const categories = ['All', 'Memory', 'Logic & Attention', 'Speed & Reflex'];

const Games = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const filteredGames = activeCategory === 'All'
    ? allGames
    : allGames.filter(game => game.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden text-[#334155] font-sans pb-16 pt-8">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#254f85] mb-4">
            Brain Training <span className="text-[#18609e]">Games</span>
          </h1>
          <p className="text-base md:text-lg text-[#6495c6] max-w-2xl mx-auto">
            Choose from our collection of scientifically designed games to improve your memory, focus, logical reasoning, and reflexes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                  ? 'bg-[#18609e] text-white shadow-[0_4px_14px_rgba(24,96,158,0.39)]'
                  : 'bg-white text-[#6495c6] border border-[#d8e6f3] hover:border-[#61b2e4] hover:text-[#254f85]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <Link
              to={game.path}
              key={game.id}
              className="group bg-white rounded-3xl border border-[#d8e6f3] hover:border-[#18609e] overflow-hidden shadow-[0_4px_20px_rgba(8,_112,_184,_0.05)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 flex flex-col h-full z-10 relative"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#254f85] leading-tight">{game.title}</h3>
                    <span className="text-[10px] font-bold text-[#4281c7] uppercase tracking-wider">{game.category}</span>
                  </div>
                </div>

                <p className="text-sm text-[#6495c6] mb-6 flex-grow leading-relaxed">
                  {game.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="w-full py-2.5 bg-slate-50 group-hover:bg-[#18609e] group-hover:text-white rounded-2xl text-sm font-bold text-[#6495c6] text-center transition-all border border-[#d8e6f3] group-hover:border-[#18609e]">
                    Play Now
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20 text-[#6495c6]">
            No games found for this category.
          </div>
        )}

      </div>
    </div>
  );
};

export default Games;
