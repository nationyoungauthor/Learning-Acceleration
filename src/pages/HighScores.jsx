import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaLightbulb, FaBrain, FaListOl, FaCrosshairs, FaPuzzlePiece, FaPalette, FaStopwatch, FaClock, FaMousePointer, FaCircle, FaChevronRight } from 'react-icons/fa';

const scoreData = [
  {
    category: "Memory Games",
    desc: "Test your recall and short-term memory",
    gradient: "from-blue-600 to-cyan-500",
    games: [
      { id: 'sequence', path: '/games/sequence-memory', title: 'Sequence Memory', key: 'sequenceHighScore', icon: FaLightbulb, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { id: 'visual', path: '/games/visual-memory', title: 'Visual Memory', key: 'visualHighScore', icon: FaLightbulb, color: 'text-red-400', bg: 'bg-red-400/10' },
      { id: 'word', path: '/games/word-memory', title: 'Word Memory', key: 'wordHighScore', icon: FaBrain, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { id: 'seenNumber', path: '/games/seen-number-memory', title: 'Number Memory', key: 'seenNumberHighScore', icon: FaBrain, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { id: 'numberSequence', path: '/games/number-sequence', title: 'Number Sequence', key: 'numberSequenceHighScore', icon: FaBrain, color: 'text-green-400', bg: 'bg-green-400/10' },
      { id: 'number', path: '/games/number-memory', title: 'Number Memory', key: 'numberHighScore', icon: FaBrain, color: 'text-pink-400', bg: 'bg-pink-400/10' },
      { id: 'memoryMatch', path: '/games/memory-match', title: 'Memory Match', key: 'memoryMatchHighScore', icon: FaPuzzlePiece, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { id: 'colorMemory', path: '/games/color-memory', title: 'Color Memory', key: 'colorMemoryHighScore', icon: FaPalette, color: 'text-pink-400', bg: 'bg-pink-400/10' },
      { id: 'chimpTest', path: '/games/chimp-test', title: 'Chimp Test', key: 'chimpTestHighScore', icon: FaBrain, color: 'text-red-400', bg: 'bg-red-400/10' },
    ]
  },
  {
    category: "Logic & Attention",
    desc: "Enhance problem-solving and focus",
    gradient: "from-purple-600 to-pink-500",
    games: [
      { id: 'patternLogic', path: '/games/pattern-logic', title: 'Pattern Logic', key: 'patternLogicHighScore', icon: FaBrain, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { id: 'stroopTest', path: '/games/stroop-test', title: 'Stroop Test', key: 'stroopTestHighScore', icon: FaBrain, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { id: 'colorTarget', path: '/games/color-target', title: 'Color Target', key: 'colorTargetHighScore', icon: FaCrosshairs, color: 'text-red-400', bg: 'bg-red-400/10' },
      { id: 'oneToFifty', path: '/games/one-to-fifty', title: 'One to Fifty', key: 'oneToFiftyBestTime', icon: FaListOl, color: 'text-orange-400', bg: 'bg-orange-400/10', unit: 's' },
      { id: 'wordScramble', path: '/games/word-scramble', title: 'Word Scramble', key: 'wordScrambleHighScore', icon: FaPuzzlePiece, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
      { id: 'speedMath', path: '/games/speed-math', title: 'Speed Math', key: 'speedMathHighScore', icon: FaBrain, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
    ]
  },
  {
    category: "Perception & Control",
    desc: "Train hand-eye coordination and precision",
    gradient: "from-teal-500 to-emerald-400",
    games: [
      { id: 'fiveSecond', path: '/games/5-second-test', title: '5-Second Test', key: 'fiveSecondHighScore', icon: FaStopwatch, color: 'text-[#00f2fe]', bg: 'bg-[#00f2fe]/10' },
      { id: 'timeEstimator', path: '/games/time-estimator', title: 'Time Estimator', key: 'timeEstimatorHighScore', icon: FaClock, color: 'text-[#8B4513]', bg: 'bg-[#8B4513]/10' },
      { id: 'invertedMouse', path: '/games/inverted-mouse', title: 'Inverted Mouse', key: 'invertedMouseHighScore', icon: FaMousePointer, color: 'text-[#00f2fe]', bg: 'bg-[#00f2fe]/10' },
      { id: 'perfectCircle', path: '/games/perfect-circle', title: 'Perfect Circle', key: 'perfectCircleHighScore', icon: FaCircle, color: 'text-[#8e98ff]', bg: 'bg-[#8e98ff]/10', unit: '%' }
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
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden">
      {/* Background from Home.jsx for consistency */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://i.pinimg.com/1200x/9e/c6/c9/9ec6c945af9bdbd5080689d7f12c8cbb.jpg"
          alt="Abstract colorful background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-transparent to-pink-900/20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-yellow-400/10 mb-6 border border-yellow-400/20 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
            <FaTrophy className="text-5xl md:text-6xl text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Fame</span></h1>
          <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
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
                <h2 className={`text-3xl md:text-5xl font-extrabold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                  {category.category}
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-medium">{category.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {category.games.map((game, gIdx) => {
                  const score = scores[game.key] || 0;
                  const hasScore = score > 0;
                  const Icon = game.icon;
                  return (
                    <div 
                      key={gIdx} 
                      className="group relative bg-[#151a25]/80 backdrop-blur-md rounded-3xl p-1 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative bg-[#0c1017] rounded-[22px] h-full p-6 flex flex-col justify-between border border-white/5 z-10 flex-grow">
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center space-x-4">
                            <div className={`p-4 rounded-2xl ${game.bg} ${game.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                              <Icon className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors leading-tight max-w-[120px]">{game.title}</h3>
                          </div>
                          
                          {hasScore && (
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Best Score</span>
                              <div className="flex items-baseline">
                                <span className={`text-3xl font-black ${game.color} drop-shadow-md`}>
                                  {score}
                                </span>
                                {game.unit && <span className="text-gray-400 ml-1 font-bold text-lg">{game.unit}</span>}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                          {!hasScore ? (
                            <span className="text-gray-600 font-medium italic text-sm">Not played yet</span>
                          ) : (
                            <span className="text-green-500/80 font-bold text-sm flex items-center">
                              <FaTrophy className="mr-2" /> Recorded
                            </span>
                          )}
                          
                          <Link 
                            to={game.path}
                            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all border border-white/10 hover:border-white/30"
                          >
                            <span>{hasScore ? 'Play Again' : 'Try Now'}</span>
                            <FaChevronRight className="text-xs opacity-70 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
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
