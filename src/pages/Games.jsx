import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames = activeCategory === 'All' 
    ? allGames 
    : allGames.filter(game => game.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Brain Training <span className="text-[#2563EB]">Games</span>
          </h1>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto">
            Choose from our collection of scientifically designed games to improve your memory, focus, logical reasoning, and reflexes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-white text-[#64748B] border border-gray-200 hover:border-blue-200 hover:text-[#0F172A]'
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
              className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] leading-tight">{game.title}</h3>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{game.category}</span>
                  </div>
                </div>
                
                <p className="text-sm text-[#64748B] mb-6 flex-grow leading-relaxed">
                  {game.desc}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#2563EB] group-hover:text-white rounded-lg text-sm font-bold text-[#64748B] text-center transition-all border border-gray-200 group-hover:border-[#2563EB]">
                    Play Now
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">
            No games found for this category.
          </div>
        )}

      </div>
    </div>
  );
};

export default Games;
