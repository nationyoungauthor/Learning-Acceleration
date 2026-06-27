import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaLightbulb, FaBrain, FaListOl, FaCrosshairs, FaPuzzlePiece, FaPalette, FaStopwatch, FaClock, FaMousePointer, FaCircle, FaChevronRight } from 'react-icons/fa';

const scoreData = [
  {
    category: "Memory Games",
    desc: "Test your recall and short-term memory",
    gradient: "from-blue-600 to-cyan-500",
    games: [
      { id: 'sequence', path: '/games/sequence-memory', title: 'Sequence Memory', key: 'sequenceHighScore', icon: FaLightbulb, color: 'text-purple-600', bg: 'bg-purple-100' },
      { id: 'visual', path: '/games/visual-memory', title: 'Visual Memory', key: 'visualHighScore', icon: FaLightbulb, color: 'text-red-500', bg: 'bg-red-100' },
      { id: 'word', path: '/games/word-memory', title: 'Word Memory', key: 'wordHighScore', icon: FaBrain, color: 'text-blue-600', bg: 'bg-blue-100' },
      { id: 'seenNumber', path: '/games/seen-number-memory', title: 'Number Memory', key: 'seenNumberHighScore', icon: FaBrain, color: 'text-blue-600', bg: 'bg-blue-100' },
      { id: 'numberSequence', path: '/games/number-sequence', title: 'Number Sequence', key: 'numberSequenceHighScore', icon: FaBrain, color: 'text-emerald-600', bg: 'bg-emerald-100' },
      { id: 'number', path: '/games/number-memory', title: 'Number Memory', key: 'numberHighScore', icon: FaBrain, color: 'text-pink-500', bg: 'bg-pink-100' },
      { id: 'memoryMatch', path: '/games/memory-match', title: 'Memory Match', key: 'memoryMatchHighScore', icon: FaPuzzlePiece, color: 'text-purple-600', bg: 'bg-purple-100' },
      { id: 'colorMemory', path: '/games/color-memory', title: 'Color Memory', key: 'colorMemoryHighScore', icon: FaPalette, color: 'text-pink-500', bg: 'bg-pink-100' },
      { id: 'chimpTest', path: '/games/chimp-test', title: 'Chimp Test', key: 'chimpTestHighScore', icon: FaBrain, color: 'text-red-500', bg: 'bg-red-100' },
    ]
  },
  {
    category: "Logic & Attention",
    desc: "Enhance problem-solving and focus",
    gradient: "from-purple-600 to-pink-500",
    games: [
      { id: 'patternLogic', path: '/games/pattern-logic', title: 'Pattern Logic', key: 'patternLogicHighScore', icon: FaBrain, color: 'text-purple-600', bg: 'bg-purple-100' },
      { id: 'stroopTest', path: '/games/stroop-test', title: 'Stroop Test', key: 'stroopTestHighScore', icon: FaBrain, color: 'text-blue-600', bg: 'bg-blue-100' },
      { id: 'colorTarget', path: '/games/color-target', title: 'Color Target', key: 'colorTargetHighScore', icon: FaCrosshairs, color: 'text-red-500', bg: 'bg-red-100' },
      { id: 'oneToFifty', path: '/games/one-to-fifty', title: 'One to Fifty', key: 'oneToFiftyBestTime', icon: FaListOl, color: 'text-orange-500', bg: 'bg-orange-100', unit: 's' },
      { id: 'wordScramble', path: '/games/word-scramble', title: 'Word Scramble', key: 'wordScrambleHighScore', icon: FaPuzzlePiece, color: 'text-indigo-600', bg: 'bg-indigo-100' },
      { id: 'speedMath', path: '/games/speed-math', title: 'Speed Math', key: 'speedMathHighScore', icon: FaBrain, color: 'text-yellow-600', bg: 'bg-yellow-100' }
    ]
  },
  {
    category: "Perception & Control",
    desc: "Train hand-eye coordination and precision",
    gradient: "from-teal-500 to-emerald-400",
    games: [
      { id: 'fiveSecond', path: '/games/5-second-test', title: '5-Second Test', key: 'fiveSecondHighScore', icon: FaStopwatch, color: 'text-cyan-600', bg: 'bg-cyan-100' },
      { id: 'timeEstimator', path: '/games/time-estimator', title: 'Time Estimator', key: 'timeEstimatorHighScore', icon: FaClock, color: 'text-amber-700', bg: 'bg-amber-100' },
      { id: 'invertedMouse', path: '/games/inverted-mouse', title: 'Inverted Mouse', key: 'invertedMouseHighScore', icon: FaMousePointer, color: 'text-cyan-600', bg: 'bg-cyan-100' },
      { id: 'perfectCircle', path: '/games/perfect-circle', title: 'Perfect Circle', key: 'perfectCircleHighScore', icon: FaCircle, color: 'text-indigo-500', bg: 'bg-indigo-100', unit: '%' }
    ]
  }
];

const HighScores = () => {
  const [scores, setScores] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedScores = {};
    scoreData.forEach(category => {
      category.games.forEach(game => {
        const val = localStorage.getItem(game.key);
        loadedScores[game.key] = val ? parseFloat(val) : 0;
      });
    });
    setScores(loadedScores);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-white overflow-hidden font-sans text-[#334155]">

      <div className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-50 mb-6 border border-[#d8e6f3] shadow-sm">
            <FaTrophy className="text-5xl md:text-6xl text-[#18609e]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-display mb-6 text-[#254f85]">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61b2e4] to-[#18609e]">Fame</span>
          </h1>
          <p className="text-[#6495c6] text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Your personal bests across all cognitive training exercises. Keep pushing your limits!
          </p>
        </div>

        <div className="space-y-24">
          {scoreData.map((category, idx) => (
            <div
              key={idx}
              className={`transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
            >
              <div className="mb-10 text-center md:text-left">
                <h2 className={`text-3xl md:text-5xl font-extrabold font-display mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                  {category.category}
                </h2>
                <p className="text-[#6495c6] text-lg md:text-xl font-medium">{category.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {category.games.map((game, gIdx) => {
                  const score = scores[game.key] || 0;
                  const hasScore = score > 0;
                  const Icon = game.icon;
                  return (
                    <div
                      key={gIdx}
                      className="group relative bg-white rounded-3xl p-6 border border-[#d8e6f3] transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_20px_rgba(8,_112,_184,_0.05)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <div className={`p-4 rounded-2xl ${game.bg} ${game.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            <Icon className="text-3xl" />
                          </div>
                          <h3 className="text-xl font-bold font-display text-[#254f85] leading-tight max-w-[120px]">{game.title}</h3>
                        </div>

                        {hasScore && (
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-[#6495c6] uppercase tracking-wider mb-1">Best Score</span>
                            <div className="flex items-baseline">
                              <span className={`text-3xl font-black ${game.color}`}>
                                {score}
                              </span>
                              {game.unit && <span className="text-[#6495c6] ml-1 font-bold text-lg">{game.unit}</span>}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#d8e6f3]">
                        {!hasScore ? (
                          <span className="text-gray-400 font-medium italic text-sm">Not played yet</span>
                        ) : (
                          <span className="text-emerald-500 font-bold text-sm flex items-center">
                            <FaTrophy className="mr-2" /> Recorded
                          </span>
                        )}

                        <Link
                          to={game.path}
                          className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-[#18609e] hover:text-white text-[#18609e] font-semibold text-sm transition-all border border-[#d8e6f3] hover:border-[#18609e]"
                        >
                          <span>{hasScore ? 'Play Again' : 'Try Now'}</span>
                          <FaChevronRight className="text-xs opacity-70 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighScores;
