import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBrain, FaTrophy, FaFire, FaGamepad, FaChartLine, 
  FaGraduationCap, FaChevronRight, FaClock, FaCheckCircle, 
  FaLightbulb, FaExchangeAlt, FaEye, FaSmile, FaMicrophone, FaCalculator
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
  { key: 'perfectCircleHighScore', title: 'Perfect Circle', category: 'Perception', isPercent: true },
  // New Skills
  { key: 'associationLearningHighScore', title: 'Association Learning', category: 'Learning' },
  { key: 'oddOneOutHighScore', title: 'Odd One Out', category: 'Observation' },
  { key: 'sumFinderHighScore', title: 'Sum Finder', category: 'Problem Solving' },
  { key: 'emotionReadingHighScore', title: 'Emotion Reading', category: 'Emotional' },
  { key: 'impromptuPitchHighScore', title: 'Impromptu Pitch', category: 'Public Speaking' }
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
  const learningGames = scoreKeys.filter(g => g.category === 'Learning');
  const observationGames = scoreKeys.filter(g => g.category === 'Observation');
  const problemSolvingGames = scoreKeys.filter(g => g.category === 'Problem Solving');
  const emotionalGames = scoreKeys.filter(g => g.category === 'Emotional');
  const publicSpeakingGames = scoreKeys.filter(g => g.category === 'Public Speaking');

  const memoryPlayed = memoryGames.filter(g => scores[g.key] !== undefined).length;
  const logicPlayed = logicGames.filter(g => scores[g.key] !== undefined).length;
  const perceptionPlayed = perceptionGames.filter(g => scores[g.key] !== undefined).length;
  const learningPlayed = learningGames.filter(g => scores[g.key] !== undefined).length;
  const observationPlayed = observationGames.filter(g => scores[g.key] !== undefined).length;
  const problemSolvingPlayed = problemSolvingGames.filter(g => scores[g.key] !== undefined).length;
  const emotionalPlayed = emotionalGames.filter(g => scores[g.key] !== undefined).length;
  const publicSpeakingPlayed = publicSpeakingGames.filter(g => scores[g.key] !== undefined).length;

  const breakdownPillars = [
    {
      title: "Working Memory",
      desc: "Critical for holding information in mind during study sessions, problem solving, and reading comprehension.",
      played: memoryPlayed,
      total: memoryGames.length,
      color: "bg-blue-500",
      bg: "bg-blue-500/10 text-blue-400",
      icon: <FaLightbulb />
    },
    {
      title: "Logic & Reasoning",
      desc: "Enhances math problem speed, pattern detection, vocabulary organization, and analytical thinking in tests.",
      played: logicPlayed,
      total: logicGames.length,
      color: "bg-purple-500",
      bg: "bg-purple-500/10 text-purple-400",
      icon: <FaBrain />
    },
    {
      title: "Perception & Speed",
      desc: "Trains time awareness, hand-eye motor execution, precision controls, and visual target tracking under pressure.",
      played: perceptionPlayed,
      total: perceptionGames.length,
      color: "bg-teal-500",
      bg: "bg-teal-500/10 text-teal-400",
      icon: <FaChartLine />
    },
    {
      title: "Learning Skill",
      desc: "Improves active recall, semantic associations, speed reading, and knowledge retention efficiency.",
      played: learningPlayed,
      total: learningGames.length,
      color: "bg-blue-600",
      bg: "bg-blue-600/10 text-blue-400",
      icon: <FaGraduationCap />
    },
    {
      title: "Observation Skill",
      desc: "Enhances visual acuity, search efficiency, spatial awareness, and identification of subtle details.",
      played: observationPlayed,
      total: observationGames.length,
      color: "bg-emerald-500",
      bg: "bg-emerald-500/10 text-emerald-400",
      icon: <FaEye />
    },
    {
      title: "Problem Solving",
      desc: "Strengthens analytical pathfinding, equation solving, mental arithmetic, and logical puzzle reasoning.",
      played: problemSolvingPlayed,
      total: problemSolvingGames.length,
      color: "bg-orange-500",
      bg: "bg-orange-500/10 text-orange-400",
      icon: <FaCalculator />
    },
    {
      title: "Emotional Skill",
      desc: "Develops empathetic comprehension, facial cues reading, social communication, and situational reactivity.",
      played: emotionalPlayed,
      total: emotionalGames.length,
      color: "bg-pink-500",
      bg: "bg-pink-500/10 text-pink-400",
      icon: <FaSmile />
    },
    {
      title: "Public Speaking",
      desc: "Optimizes presentation timing, structural rhetorical flow, filler word minimization, and impromptu pitch.",
      played: publicSpeakingPlayed,
      total: publicSpeakingGames.length,
      color: "bg-violet-500",
      bg: "bg-violet-500/10 text-violet-400",
      icon: <FaMicrophone />
    }
  ];

  const getFilteredGames = () => {
    if (activeTab === 'all') return scoreKeys;
    return scoreKeys.filter(g => g.category.toLowerCase() === activeTab);
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-800 overflow-hidden pb-16">

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-semibold mb-4">
              <FaGraduationCap />
              <span>Student Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#254f85] mb-2 font-display">
              Your Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Progress</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl">
              Track your daily training metrics, see performance in cognitive areas, and level up your memory, speed, and logic.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/games" className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-2">
              <FaGamepad />
              <span>Train More Games</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Brain Index Card */}
          <div className="md:col-span-2 bg-[#F8FAFC] border border-[#d8e6f3] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Brain Fitness Score</p>
                <h3 className="text-3xl font-black text-[#254f85] mt-1 font-display">
                  {brainScore > 0 ? brainScore : '---'} <span className="text-xs text-gray-400 font-bold">/ 1000</span>
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
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
              <div className="w-full bg-[#E2E8F0] rounded-full h-3.5 overflow-hidden p-[2px]">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${brainScore > 0 ? (brainScore / 1000) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                {brainScore > 0 
                  ? `🔥 Awesome! Your cognitive profile is stronger than ${Math.min(99, Math.floor((brainScore/1000)*120))}% of peer students.`
                  : 'Start training to generate your customized Brain Fitness Score!'
                }
              </p>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className="bg-[#F8FAFC] border border-[#d8e6f3] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Daily Streak</p>
                <h3 className="text-4xl font-black text-[#254f85] mt-2 flex items-baseline font-display">
                  {dailyStreak} <span className="text-lg font-bold text-orange-500 ml-1">Days</span>
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                <FaFire className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center space-x-1.5 mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <div 
                  key={day}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    day <= dailyStreak 
                      ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {day === 7 ? 'S' : ['M', 'T', 'W', 'T', 'F', 'S'][day-1]}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Keep training daily to unlock study boosts.</p>
          </div>

          {/* Completed Exercises */}
          <div className="bg-[#F8FAFC] border border-[#d8e6f3] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Skills</p>
                <h3 className="text-4xl font-black text-[#254f85] mt-2 font-display">
                  {gamesPlayed} <span className="text-lg font-bold text-purple-500">/ {scoreKeys.length}</span>
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                <FaGamepad className="text-2xl" />
              </div>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${(gamesPlayed / scoreKeys.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-5">Play all exercises to get full spatial tracking.</p>
          </div>
        </div>

        {/* Cognitive Profile Breakdown */}
        <h3 className="text-2xl font-bold text-[#254f85] mb-6 font-display">Cognitive Pillar Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {breakdownPillars.map((pillar, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#d8e6f3] hover:border-[#61b2e4] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(8,_112,_184,_0.03)] hover:shadow-[0_20px_40px_rgba(8,_112,_184,_0.08)]">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${pillar.bg}`}>
                    {pillar.icon}
                  </div>
                  <h4 className="text-base font-bold text-[#254f85] font-display">{pillar.title}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-2 font-bold">
                  <span>Exercises Played</span>
                  <span className="text-[#18609e]">{pillar.played} of {pillar.total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`${pillar.color} h-1.5 rounded-full`} 
                    style={{ width: `${pillar.total > 0 ? (pillar.played / pillar.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed High Scores List */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-[2rem] p-6 md:p-8 shadow-xl">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between pb-6 border-b border-[#334155] mb-6 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white font-display">Exercise History & Records</h3>
              <p className="text-sm text-slate-400 mt-1">Review personal bests across cognitive and soft-skills games.</p>
            </div>
            <div className="flex flex-wrap bg-[#0f172a] p-1.5 rounded-xl border border-[#334155] self-stretch xl:self-auto gap-1">
              {['all', 'memory', 'logic', 'perception', 'learning', 'observation', 'problem solving', 'emotional', 'public speaking'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
              let pillBg = "bg-blue-500/10 border-blue-500/20 text-blue-400";
              if (item.category === "Logic") {
                scoreColor = "text-purple-400";
                pillBg = "bg-purple-400/10 border-purple-400/20 text-purple-400";
              } else if (item.category === "Perception") {
                scoreColor = "text-teal-400";
                pillBg = "bg-teal-400/10 border-teal-400/20 text-teal-400";
              } else if (item.category === "Learning") {
                scoreColor = "text-sky-400";
                pillBg = "bg-sky-400/10 border-sky-400/20 text-sky-400";
              } else if (item.category === "Observation") {
                scoreColor = "text-emerald-400";
                pillBg = "bg-emerald-400/10 border-emerald-400/20 text-emerald-400";
              } else if (item.category === "Problem Solving") {
                scoreColor = "text-orange-400";
                pillBg = "bg-orange-400/10 border-orange-400/20 text-orange-400";
              } else if (item.category === "Emotional") {
                scoreColor = "text-pink-400";
                pillBg = "bg-pink-400/10 border-pink-400/20 text-pink-400";
              } else if (item.category === "Public Speaking") {
                scoreColor = "text-violet-400";
                pillBg = "bg-violet-400/10 border-violet-400/20 text-violet-400";
              }

              return (
                <div 
                  key={idx}
                  className="bg-[#0f172a]/60 hover:bg-[#0f172a] border border-[#334155] rounded-2xl p-4 flex items-center justify-between transition-all duration-300"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-2 h-10 rounded-full ${
                      item.category === 'Memory' ? 'bg-blue-500' : 
                      item.category === 'Logic' ? 'bg-purple-500' : 
                      item.category === 'Perception' ? 'bg-teal-500' :
                      item.category === 'Learning' ? 'bg-sky-500' :
                      item.category === 'Observation' ? 'bg-emerald-500' :
                      item.category === 'Problem Solving' ? 'bg-orange-500' :
                      item.category === 'Emotional' ? 'bg-pink-500' :
                      'bg-violet-500'
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
                          {item.isTime && <span className="text-slate-500 text-xs font-bold ml-0.5">s</span>}
                          {item.isPercent && <span className="text-slate-500 text-xs font-bold ml-0.5">%</span>}
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs italic font-medium">No score</span>
                      )}
                    </div>
                    <Link 
                      to="/games"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
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
