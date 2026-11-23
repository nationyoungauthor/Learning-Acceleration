import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBrain, FaTrophy, FaFire, FaGamepad, FaChartLine,
  FaGraduationCap, FaRobot, FaMagic, FaSlidersH, FaMedal,
  FaPaperPlane, FaSpinner, FaLock, FaUserGraduate, FaInfoCircle,
  FaStar, FaCheckCircle, FaClock, FaArrowRight, FaLayerGroup,
  FaLightbulb, FaCalculator, FaAtom, FaBook, FaGlobe, FaLaptopCode
} from 'react-icons/fa';
import { LuSparkles, LuBrain, LuZap, LuTrophy, LuFlame, LuShieldCheck } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import {
  BANDS,
  BAND_CONFIG,
  GAME_CATEGORIES,
  ALL_GAMES_METADATA
} from '../utils/learningBands';
import { SYLLABUS_BY_BAND } from '../data/quizQuestionsByBand';

const QUIZ_SUBJECTS = [
  { id: 'maths', name: 'Maths', icon: FaCalculator, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
  { id: 'science', name: 'Science', icon: FaAtom, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  { id: 'english', name: 'English', icon: FaBook, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  { id: 'gk', name: 'GK', icon: FaGlobe, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  { id: 'logic', name: 'Logical Reasoning', icon: FaBrain, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' },
  { id: 'computer', name: 'Computer', icon: FaLaptopCode, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-200' }
];

const Dashboard = () => {
  const { user, bandInfo, learningBand, updateDifficulty } = useAuth();

  const [activeCategoryTab, setActiveCategoryTab] = useState('All');
  const [activeAiTab, setActiveAiTab] = useState('tutor');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: `Hello ${user?.name || 'Learner'}! I am your AI Cognitive Companion. Your current curriculum is calibrated for ${bandInfo.config.displayName}. Ask me any question or study strategy!` }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Mismatch confirmation state
  const [dismissMismatch, setDismissMismatch] = useState(false);

  // Custom question generator states
  const [genSubject, setGenSubject] = useState('Maths');
  const [genDifficulty, setGenDifficulty] = useState(user?.difficultyPreference || 'Easy');
  const [generatedQuest, setGeneratedQuest] = useState(null);

  const studentName = user?.name || 'Student';
  const studentClass = user?.class || 'Class 7';
  const studentAge = user?.age || 12;
  const currentBandConfig = bandInfo.config;
  const currentDifficulty = user?.difficultyPreference || currentBandConfig.defaultDifficulty || 'Easy';

  // Gamification metrics
  const userXp = user?.xp || parseInt(localStorage.getItem('user_xp') || '250', 10);
  const streak = user?.streak || parseInt(localStorage.getItem('user_streak') || '3', 10);
  const userLevel = Math.floor(userXp / 100) + 1;
  const nextLevelXp = userLevel * 100;
  const currentLevelXp = (userLevel - 1) * 100;
  const levelProgress = Math.min(100, Math.max(0, ((userXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100));

  // Games filtered for this student's band
  const recommendedGames = bandInfo.recommendedGames;

  // Filter by category
  const displayedGames = activeCategoryTab === 'All'
    ? recommendedGames
    : recommendedGames.filter(g => g.category === activeCategoryTab);

  // AI chat handler
  const sendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setAiLoading(true);

    setTimeout(() => {
      let aiResponse = `Great question for ${bandInfo.config.displayName}! To build stronger recall, try connecting new concepts with vivid physical anchors.`;
      if (chatInput.toLowerCase().includes('focus') || chatInput.toLowerCase().includes('attention')) {
        aiResponse = "To improve sustained focus, use the 20-20 rule: 20 minutes of high concentration on brain challenges followed by 20 seconds of looking at a distant object.";
      } else if (chatInput.toLowerCase().includes('math') || chatInput.toLowerCase().includes('speed')) {
        aiResponse = "Mental calculation speed grows with short daily drills in Speed Math and Sum Finder. Aim for consistency over perfection.";
      } else if (chatInput.toLowerCase().includes('quiz') || chatInput.toLowerCase().includes('science')) {
        aiResponse = `For your current class (${studentClass}), our quiz questions are aligned directly with your curriculum topics. Check out the Knowledge Quiz section below!`;
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setAiLoading(false);
    }, 800);
  };

  // AI Generator Handler
  const generateQuestion = () => {
    setAiLoading(true);
    setTimeout(() => {
      const questions = {
        Maths: `[${currentBandConfig.displayName}] Solve: What is the perimeter of a rectangle with length 12cm and width 7cm?`,
        Science: `[${currentBandConfig.displayName}] Which organ in the human body filters toxins from blood?`,
        English: `[${currentBandConfig.displayName}] Identify the adverb in: "The swift runner finished the race remarkably fast."`
      };
      setGeneratedQuest(questions[genSubject] || `[${currentBandConfig.displayName}] Solve the spatial pattern: 3, 7, 15, 31, X. What is X?`);
      setAiLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10 px-4 sm:px-6 lg:px-10 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ========================================================================= */}
        {/* 1. STUDENT WELCOME & LEARNING BAND HERO BANNER                            */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-[0_10px_30px_rgba(37,99,235,0.06),0_4px_0_#DBEAFE] p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle Corner Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            {/* Student Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center text-3xl sm:text-4xl shadow-[0_4px_0_#1E3A8A] shrink-0">
                <FaUserGraduate />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                    {studentClass}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Age {studentAge} yrs
                  </span>
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${currentBandConfig.colorTheme.badgeBg} border shadow-2xs flex items-center gap-1`}>
                    <LuSparkles />
                    <span>{currentBandConfig.displayName}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-poppins text-slate-900 tracking-tight leading-tight">
                  Welcome back, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{studentName}!</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
                  {currentBandConfig.gameDifficultyDesc}
                </p>
              </div>
            </div>

            {/* Quick Stats Pills */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex-1 sm:flex-initial flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 shadow-[0_2px_0_#FDE68A]">
                <FaFire className="text-amber-500 text-lg animate-bounce" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">Streak</div>
                  <div className="text-sm font-extrabold leading-none">{streak} Days</div>
                </div>
              </div>

              <div className="flex-1 sm:flex-initial flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 shadow-[0_2px_0_#BFDBFE]">
                <FaTrophy className="text-blue-600 text-lg" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">Total XP</div>
                  <div className="text-sm font-extrabold leading-none">{userXp} XP</div>
                </div>
              </div>

              <div className="flex-1 sm:flex-initial flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-[0_2px_0_#A7F3D0]">
                <FaMedal className="text-emerald-600 text-lg" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Level</div>
                  <div className="text-sm font-extrabold leading-none">Lv. {userLevel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mismatch Confirmation Banner (if age and class do not match typical band) */}
          {bandInfo.isMismatch && !dismissMismatch && (
            <div className="mt-6 pt-5 border-t border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-amber-50/90 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <FaInfoCircle className="text-amber-600 text-base shrink-0 mt-0.5" />
                <span>
                  {bandInfo.mismatchMessage}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setDismissMismatch(true)}
                  className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs active:translate-y-0.5 transition-all"
                >
                  Continue with {studentClass}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. ADAPTIVE DIFFICULTY CONTROL & XP PROGRESSION BAR                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Difficulty Selector */}
          <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_6px_0_#E2E8F0] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FaSlidersH className="text-blue-600" />
                  <span>Adaptive Challenge Level</span>
                </span>
                <span className="text-[11px] font-bold text-blue-600">
                  {currentDifficulty} Mode
                </span>
              </div>
              <h3 className="text-lg font-black font-poppins text-slate-900 leading-tight">
                Difficulty Selection
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Calibrated for {currentBandConfig.displayName}. Starts at {currentBandConfig.defaultDifficulty} and adapts as your performance grows.
              </p>
            </div>

            {/* 3-Pill Interactive Switcher */}
            <div className="mt-5 flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
              {['Easy', 'Standard', 'Challenge'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => updateDifficulty(diff)}
                  className={`cursor-pointer flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                    currentDifficulty === diff
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_3px_0_#1E3A8A] translate-y-0'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* XP Progress Bar Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_6px_0_#E2E8F0] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Scholar XP Milestone
                </span>
                <span className="text-xs font-black text-blue-600">
                  {userXp} / {nextLevelXp} XP ({Math.round(levelProgress)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                <div className="text-[10px] font-black uppercase text-slate-400">Current Band</div>
                <div className="text-xs font-black text-slate-800 mt-0.5 truncate">{learningBand}</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                <div className="text-[10px] font-black uppercase text-slate-400">Recommended Games</div>
                <div className="text-xs font-black text-blue-600 mt-0.5">{recommendedGames.length} Challenges</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                <div className="text-[10px] font-black uppercase text-slate-400">Adaptive Subjects</div>
                <div className="text-xs font-black text-emerald-600 mt-0.5">8 Curriculums</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                <div className="text-[10px] font-black uppercase text-slate-400">Accuracy Avg</div>
                <div className="text-xs font-black text-amber-600 mt-0.5">92% Precision</div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. RECOMMENDED BRAIN TRAINING GAMES FOR THIS STUDENT'S BAND               */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
                <LuBrain />
                <span>Personalized Cognitive Training</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 tracking-tight">
                Recommended Brain Games for {currentBandConfig.displayName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Showing {recommendedGames.length} scientifically calibrated games for your cognitive age and class milestone.
              </p>
            </div>

            <Link
              to="/games"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 text-xs font-black text-slate-700 hover:text-blue-600 shadow-[0_2px_0_#E2E8F0] active:translate-y-0.5 transition-all shrink-0 self-start sm:self-auto"
            >
              <span>View All {recommendedGames.length} Band Games</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {/* 9 Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategoryTab('All')}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategoryTab === 'All'
                  ? 'bg-blue-600 text-white shadow-[0_3px_0_#1E40AF]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Recommended ({recommendedGames.length})
            </button>
            {GAME_CATEGORIES.map(cat => {
              const count = recommendedGames.filter(g => g.category === cat.name).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryTab(cat.name)}
                  className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategoryTab === cat.name
                      ? 'bg-blue-600 text-white shadow-[0_3px_0_#1E40AF]'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedGames.map((game) => {
              const personalBest = user?.personalBests?.[game.id] || 0;
              return (
                <Link
                  key={game.id}
                  to={game.path}
                  className="group bg-white rounded-3xl border-2 border-slate-200/90 hover:border-blue-400 shadow-[0_6px_0_#E2E8F0] hover:shadow-[0_8px_0_#93C5FD,0_16px_30px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-5 relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {game.category}
                      </span>
                      {personalBest > 0 && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                          <FaStar className="text-amber-500" />
                          <span>PB: {personalBest}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black font-poppins text-slate-900 group-hover:text-blue-600 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed line-clamp-2">
                      {game.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-blue-600 group-hover:underline">
                      Play Challenge →
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Band: {learningBand}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. ADAPTIVE KNOWLEDGE QUIZ SECTION                                        */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider mb-2 border border-indigo-200">
              <LuTrophy />
              <span>Adaptive School Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 tracking-tight">
              Adaptive Knowledge Quizzes ({currentBandConfig.displayName})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Subject questions, syllabus scope, and difficulty change automatically according to your class band.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUIZ_SUBJECTS.map((sub) => {
              const syllabus = SYLLABUS_BY_BAND[learningBand]?.[sub.name] || 'Core curriculum problem solving and analytical speed drills.';
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.id}
                  to={`/quiz-zone?subject=${sub.name}&band=${encodeURIComponent(learningBand)}`}
                  className={`bg-white rounded-3xl border-2 border-slate-200/90 hover:border-indigo-400 shadow-[0_6px_0_#E2E8F0] hover:shadow-[0_8px_0_#C7D2FE,0_16px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-200 p-5 flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-2xl ${sub.bg} flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className={sub.color} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        5 Questions • 20s
                      </span>
                    </div>

                    <h3 className="text-base font-black font-poppins text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {sub.name} Quiz
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      <strong className="text-slate-700">Syllabus:</strong> {syllabus}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-600 group-hover:underline">
                      Start Band Quiz →
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Difficulty: {currentDifficulty}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. AI COGNITIVE TUTOR & QUESTION SYNTHESIZER MODULE                       */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_6px_0_#E2E8F0] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-4">
            <div>
              <h3 className="text-lg font-black font-poppins text-slate-900 flex items-center gap-2">
                <FaRobot className="text-blue-600" />
                <span>AI Cognitive Tutor &amp; Study Assistant</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Calibrated to answer curriculum doubts and memory training inquiries for {currentBandConfig.displayName}.
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {[
                { id: 'tutor', name: 'AI Tutor', icon: <FaRobot /> },
                { id: 'generator', name: 'Question Maker', icon: <FaMagic /> },
                { id: 'analysis', name: 'Analysis', icon: <FaChartLine /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAiTab(tab.id)}
                  className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                    activeAiTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Tutor Chat Tab */}
          {activeAiTab === 'tutor' && (
            <div className="flex flex-col h-64 justify-between bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <div className="overflow-y-auto space-y-3.5 pr-2 max-h-[190px] flex-grow text-xs">
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-medium leading-relaxed ${
                      chat.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                    }`}>
                      {chat.text}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl px-4 py-2.5 rounded-tl-none shadow-2xs flex items-center gap-2">
                      <FaSpinner className="animate-spin text-blue-600" />
                      <span>AI Cognitive Companion is synthesizing an explanation...</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={sendChat} className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Ask a question tailored for ${currentBandConfig.displayName}...`}
                  className="flex-grow bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                />
                <button type="submit" className="cursor-pointer p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors">
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </div>
          )}

          {/* AI Question Generator Tab */}
          {activeAiTab === 'generator' && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-64 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={genSubject}
                    onChange={(e) => setGenSubject(e.target.value)}
                    className="cursor-pointer w-full px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl outline-none"
                  >
                    <option>Maths</option>
                    <option>Science</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Target Band</label>
                  <input
                    type="text"
                    disabled
                    value={currentBandConfig.displayName}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3.5 my-3 flex-grow overflow-y-auto max-h-[85px] flex items-center justify-center">
                {aiLoading ? (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaSpinner className="animate-spin text-blue-600" />
                    <span>Synthesizing custom band question...</span>
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-slate-800 text-center italic">
                    {generatedQuest || "Select subject and click synthesize to create a tailored question."}
                  </p>
                )}
              </div>

              <button
                onClick={generateQuestion}
                className="cursor-pointer w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <FaMagic />
                <span>Synthesize Band Question</span>
              </button>
            </div>
          )}

          {/* AI Performance Analysis Tab */}
          {activeAiTab === 'analysis' && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-64 flex flex-col justify-between text-xs">
              <div>
                <h4 className="font-extrabold text-slate-900 mb-2">Cognitive Band Analytics</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Student is progressing well in {currentBandConfig.displayName}. Visual recall and pattern detection have shown steady improvements across recent attempts.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span>Working Memory Retention</span>
                    <span>Optimal (82%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span>Problem Solving Accuracy</span>
                    <span>94% Success Rate</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
