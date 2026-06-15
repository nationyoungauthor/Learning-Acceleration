import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBrain, FaTrophy, FaFire, FaGamepad, FaChartLine, 
  FaGraduationCap, FaChevronRight, FaClock, FaCheckCircle, 
  FaLightbulb, FaExchangeAlt 
} from 'react-icons/fa';

const scoreKeys = [
  // Memory
  { key: 'sequenceHighScore', title: 'Sequence Memory', category: 'Memory' },
  { key: 'visualHighScore', title: 'Visual Memory', category: 'Memory' },
  { key: 'wordHighScore', title: 'Word Memory', category: 'Memory' },
  { key: 'seenNumberHighScore', title: 'Seen Number Memory', category: 'Memory' },
  { key: 'numberSequenceHighScore', title: 'Number Sequence', category: 'Memory' },
  { key: 'numberHighScore', title: 'Number Memory', category: 'Memory' },
  { key: 'memoryMatchHighScore', title: 'Memory Match', category: 'Memory' },
  { key: 'colorMemoryHighScore', title: 'Color Memory', category: 'Memory' },
  { key: 'chimpTestHighScore', title: 'Chimp Test', category: 'Memory' },
  // Logic
  { key: 'patternLogicHighScore', title: 'Pattern Logic', category: 'Logic' },
  { key: 'stroopTestHighScore', title: 'Stroop Test', category: 'Logic' },
  { key: 'colorTargetHighScore', title: 'Color Target', category: 'Logic' },
  { key: 'oneToFiftyBestTime', title: 'One to Fifty', category: 'Logic', isTime: true },
  { key: 'wordScrambleHighScore', title: 'Word Scramble', category: 'Logic' },
  { key: 'speedMathHighScore', title: 'Speed Math', category: 'Logic' },
  // Perception
  { key: 'fiveSecondHighScore', title: '5-Second Test', category: 'Perception' },
  { key: 'timeEstimatorHighScore', title: 'Time Estimator', category: 'Perception' },
  { key: 'invertedMouseHighScore', title: 'Inverted Mouse', category: 'Perception' },
  { key: 'perfectCircleHighScore', title: 'Perfect Circle', category: 'Perception', isPercent: true }
];

const Progress = () => {
  const [scores, setScores] = useState({});
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadedScores = {};
    scoreKeys.forEach(item => {
      const val = localStorage.getItem(item.key);
      if (val) {
        loadedScores[item.key] = parseFloat(val);
      }
    });
    setScores(loadedScores);
  }, []);

  // Compute mock learning stats based on scores
  const gamesPlayed = Object.keys(scores).length;
  const brainScore = gamesPlayed > 0 
    ? Math.min(850, 300 + gamesPlayed * 25 + Math.floor(Math.random() * 20)) 
    : 0;
  
  const dailyStreak = gamesPlayed > 0 ? 5 : 0;
  
  // Calculate category averages/completeness
  const memoryGames = scoreKeys.filter(g => g.category === 'Memory');
  const logicGames = scoreKeys.filter(g => g.category === 'Logic');
  const perceptionGames = scoreKeys.filter(g => g.category === 'Perception');

  const memoryPlayed = memoryGames.filter(g => scores[g.key] !== undefined).length;
  const logicPlayed = logicGames.filter(g => scores[g.key] !== undefined).length;
  const perceptionPlayed = perceptionGames.filter(g => scores[g.key] !== undefined).length;

  const getFilteredGames = () => {
    if (activeTab === 'all') return scoreKeys;
    return scoreKeys.filter(g => g.category.toLowerCase() === activeTab);
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-100 overflow-hidden pb-16">
      {/* Visual background accents */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
              <FaGraduationCap />
              <span>Student Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
              Your Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Progress</span>
            </h1>
            <p className="text-gray-400 text-base max-w-xl">
              Track your daily training metrics, see performance in cognitive areas, and level up your memory, speed, and logic.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/" className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-2">
              <FaGamepad />
              <span>Train More Games</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Brain Index Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#121620] to-[#0c0f16] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brain Fitness Score</p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {brainScore > 0 ? brainScore : '---'} <span className="text-xs text-gray-500 font-bold">/ 1000</span>
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <FaBrain className="text-2xl animate-pulse" />
              </div>
            </div>

            {/* Score gauge mock */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 font-semibold mb-2">
                <span>Novice (300)</span>
                <span>Expert (700)</span>
                <span>Genius (1000)</span>
              </div>
              <div className="w-full bg-[#1e2535] rounded-full h-3.5 overflow-hidden p-[2px]">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${brainScore > 0 ? (brainScore / 1000) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                {brainScore > 0 
                  ? `🔥 Awesome! Your cognitive profile is stronger than ${Math.min(99, Math.floor((brainScore/1000)*120))}% of peer students.`
                  : 'Start training to generate your customized Brain Fitness Score!'
                }
              </p>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className="bg-gradient-to-br from-[#121620] to-[#0c0f16] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Daily Streak</p>
                <h3 className="text-4xl font-black text-white mt-2 flex items-baseline">
                  {dailyStreak} <span className="text-lg font-bold text-orange-400 ml-1">Days</span>
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                <FaFire className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center space-x-1.5 mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <div 
                  key={day}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    day <= dailyStreak 
                      ? 'bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.4)]' 
                      : 'bg-[#1a202c] text-gray-600'
                  }`}
                >
                  {day === 7 ? 'S' : ['M', 'T', 'W', 'T', 'F', 'S'][day-1]}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Keep training daily to unlock study boosts.</p>
          </div>

          {/* Completed Exercises */}
          <div className="bg-gradient-to-br from-[#121620] to-[#0c0f16] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Skills</p>
                <h3 className="text-4xl font-black text-white mt-2">
                  {gamesPlayed} <span className="text-lg font-bold text-purple-400">/ {scoreKeys.length}</span>
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                <FaGamepad className="text-2xl" />
              </div>
            </div>
            <div className="w-full bg-[#1e2535] rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${(gamesPlayed / scoreKeys.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-5">Play all exercises to get full spatial tracking.</p>
          </div>
        </div>

        {/* Cognitive Profile Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Memory Pillar */}
          <div className="bg-[#11141c]/50 rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <FaLightbulb />
                </div>
                <h4 className="text-lg font-bold text-white">Working Memory</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Critical for holding information in mind during study sessions, problem solving, and reading comprehension.
              </p>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2 font-semibold">
                <span>Games Played</span>
                <span>{memoryPlayed} of {memoryGames.length}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(memoryPlayed / memoryGames.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Logic Pillar */}
          <div className="bg-[#11141c]/50 rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <FaBrain />
                </div>
                <h4 className="text-lg font-bold text-white">Logic & Reasoning</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Enhances math problem speed, pattern detection, vocabulary organization, and analytical thinking in tests.
              </p>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2 font-semibold">
                <span>Games Played</span>
                <span>{logicPlayed} of {logicGames.length}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(logicPlayed / logicGames.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Perception Pillar */}
          <div className="bg-[#11141c]/50 rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <FaChartLine />
                </div>
                <h4 className="text-lg font-bold text-white">Perception & Speed</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Trains time awareness, hand-eye motor execution, precision controls, and visual target tracking under pressure.
              </p>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2 font-semibold">
                <span>Games Played</span>
                <span>{perceptionPlayed} of {perceptionGames.length}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full" 
                  style={{ width: `${(perceptionPlayed / perceptionGames.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed High Scores List */}
        <div className="bg-[#0b0e14] border border-white/5 rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/5 mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Exercise History & Records</h3>
              <p className="text-sm text-gray-400 mt-1">Review personal bests across memory, logic, and perception games.</p>
            </div>
            <div className="flex bg-[#121622] p-1.5 rounded-xl border border-white/5 self-stretch md:self-auto">
              {['all', 'memory', 'logic', 'perception'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredGames().map((item, idx) => {
              const score = scores[item.key];
              const hasScore = score !== undefined;
              
              let scoreColor = "text-blue-400";
              let pillBg = "bg-blue-400/10 border-blue-400/20";
              if (item.category === "Logic") {
                scoreColor = "text-purple-400";
                pillBg = "bg-purple-400/10 border-purple-400/20";
              } else if (item.category === "Perception") {
                scoreColor = "text-teal-400";
                pillBg = "bg-teal-400/10 border-teal-400/20";
              }

              return (
                <div 
                  key={idx}
                  className="bg-[#121620]/60 hover:bg-[#121620] border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-all duration-300"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-2 h-10 rounded-full ${
                      item.category === 'Memory' ? 'bg-blue-500' : item.category === 'Logic' ? 'bg-purple-500' : 'bg-teal-500'
                    }`}></div>
                    <div>
                      <h5 className="font-bold text-white text-sm">{item.title}</h5>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 capitalize ${pillBg}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      {hasScore ? (
                        <div>
                          <span className={`text-base font-black ${scoreColor}`}>
                            {score}
                          </span>
                          {item.isTime && <span className="text-gray-500 text-xs font-bold ml-0.5">s</span>}
                          {item.isPercent && <span className="text-gray-500 text-xs font-bold ml-0.5">%</span>}
                        </div>
                      ) : (
                        <span className="text-gray-600 text-xs italic font-medium">No score</span>
                      )}
                    </div>
                    <Link 
                      to={scoreKeys.find(g => g.key === item.key) ? `/` : '/'}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                    >
                      <FaChevronRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
