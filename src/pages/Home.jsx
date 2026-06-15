import React, { useState } from 'react';
import { 
  FaPlay, FaTrophy, FaLightbulb, FaBrain, FaListOl, FaBolt, 
  FaKeyboard, FaCrosshairs, FaPuzzlePiece, FaPalette, FaStopwatch, 
  FaClock, FaMousePointer, FaCircle, FaGraduationCap, FaChartLine, 
  FaRobot, FaMagic, FaCheckCircle, FaStar, FaFire 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'visual-memory',
    title: 'Visual Memory',
    path: '/games/visual-memory',
    icon: <FaLightbulb className="text-red-500 text-2xl" />,
    desc: 'Remember patterns of tiles and recall them with increasing difficulty levels.',
    img: '/gameImage/visualMemory.svg'
  },
  {
    id: 'number-memory',
    title: 'Number Memory',
    path: '/games/number-memory',
    icon: <span className="text-pink-500 font-bold text-2xl">1/9</span>,
    desc: 'Memorize and recall increasingly longer number sequences to test memory capacity.',
    img: '/gameImage/NumberMemory2.png'
  },
  {
    id: 'chimp-test',
    title: 'Chimp Test',
    path: '/games/chimp-test',
    icon: <FaBrain className="text-red-500 text-3xl drop-shadow-md" />,
    desc: 'Remember numbers and click them in ascending order briefly.',
    img: '/gameImage/chimpTest.png'
  },
  {
    id: 'pattern-logic',
    title: 'Pattern Logic',
    path: '/games/pattern-logic',
    icon: <FaBrain className="text-purple-500 text-2xl" />,
    desc: 'Find the next number in sequences by identifying underlying patterns.',
    img: '/gameImage/patternLogic.svg'
  },
  {
    id: 'speed-math',
    title: 'Speed Math',
    path: '/games/speed-math',
    icon: <FaKeyboard className="text-yellow-500 text-2xl" />,
    desc: 'Solve arithmetic problems as quickly as possible to improve mental calculation.',
    img: '/gameImage/speedMath.svg'
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    path: '/games/memory-match',
    icon: <FaPuzzlePiece className="text-purple-500 text-3xl drop-shadow-md" />,
    desc: 'Test your visual memory by matching pairs of icons in a grid layout.',
    img: '/gameImage/memoryMatch.png'
  }
];

const agePaths = [
  {
    group: 'Age 5-7',
    desc: 'Simple patterns, counting shapes, and basic memory matching blocks to foster initial cognitive nodes.',
    skills: ['Visual Recognition', 'Simple Sorting', 'Basic Counting', 'Color Matching']
  },
  {
    group: 'Age 8-10',
    desc: 'Rapid arithmetic, word memorization, sequence repeating, and spatial coordination workouts.',
    skills: ['Working Memory', 'Inhibitory Control', 'Basic Math Speed', 'Spatial Tracking']
  },
  {
    group: 'Age 11-13',
    desc: 'Abstract logic matrices, color interference tests (Stroop), and multi-step pattern matching.',
    skills: ['Pattern Logic', 'Attentional Focus', 'Deductive Speed', 'Rapid Processing']
  },
  {
    group: 'Age 14-18',
    desc: 'Highly complex memory grids, perfect drawing precision, inverted physics coordination, and advanced reasoning.',
    skills: ['Complex Memory Spans', 'Advanced Reasoning', 'Motor Precision', 'Stress Processing']
  }
];

const quizCats = [
  { name: 'English', icon: '📖', color: 'text-blue-500 bg-blue-50 border-blue-100' },
  { name: 'Maths', icon: '📐', color: 'text-purple-500 bg-purple-50 border-purple-100' },
  { name: 'Science', icon: '🧪', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  { name: 'GK', icon: '🌍', color: 'text-amber-500 bg-amber-50 border-amber-100' },
  { name: 'Logical Reasoning', icon: '🧠', color: 'text-rose-500 bg-rose-50 border-rose-100' },
  { name: 'History', icon: '🏺', color: 'text-slate-500 bg-slate-50 border-slate-200/50' },
  { name: 'Geography', icon: '🗺️', color: 'text-cyan-500 bg-cyan-50 border-cyan-100' },
  { name: 'Computer', icon: '💻', color: 'text-pink-500 bg-pink-50 border-pink-100' }
];

const Home = () => {
  const [activeAgeTab, setActiveAgeTab] = useState(0);

  return (
    <div className="flex flex-col flex-grow bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-6 overflow-hidden bg-white border-b border-slate-100 py-16">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#2563EB]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#7C3AED]/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Tagline Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span>🧠 Learning Acceleration Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] mb-6 leading-tight max-w-3xl">
            Boost Memory, Focus & IQ Through <span className="text-[#2563EB]">Fun Brain Games</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-medium">
            Train your brain with scientifically designed memory games, logic challenges, speed tests and adaptive quizzes built for students.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <Link
              to="/games"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <FaPlay className="text-[10px]" />
              <span>Start Training</span>
            </Link>

            <Link
              to="/assessment"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-[#7C3AED] hover:border-[#7C3AED] font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <FaTrophy className="text-sm text-purple-500" />
              <span>Take Brain Assessment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-slate-50/50 border-b border-slate-100 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10,000+', desc: 'Questions' },
            { value: '50+', desc: 'Brain Games' },
            { value: '15', desc: 'Learning Categories' },
            { value: 'Personalized', desc: 'Progress Tracking' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm text-center">
              <span className="text-2xl font-black text-[#2563EB] block">{stat.value}</span>
              <span className="text-xs font-bold text-[#64748B] mt-1 block uppercase tracking-wider">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brain Skills Section */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Focus Core Brain Skills</h2>
          <p className="text-sm text-[#64748B] mt-2 max-w-md mx-auto">Discover the 6 cognitive node vectors trained by our adaptive platform.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {[
            { name: 'Memory', icon: '💾', desc: 'Information hold' },
            { name: 'Focus', icon: '🎯', desc: 'Concentration' },
            { name: 'Processing Speed', icon: '⚡', desc: 'Fast calculation' },
            { name: 'Observation', icon: '👁️', desc: 'Visual details' },
            { name: 'Learning Ability', icon: '🎓', desc: 'Information assimilation' },
            { name: 'Problem Solving', icon: '🧩', desc: 'Structural logic' }
          ].map((skill, idx) => (
            <div key={idx} className="bg-white border border-slate-100 hover:border-blue-200 p-5 rounded-3xl shadow-sm hover:shadow transition-all text-center flex flex-col items-center">
              <span className="text-3xl mb-3">{skill.icon}</span>
              <h4 className="text-sm font-bold text-[#0F172A] leading-tight mb-1">{skill.name}</h4>
              <span className="text-[10px] text-[#64748B] font-semibold">{skill.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Games Section */}
      <section id="games-section" className="py-16 px-6 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Featured Brain Games</h2>
            <p className="text-sm text-[#64748B] mt-1">Challenge your mind with scientific memory and logical matrices.</p>
          </div>
          <Link to="/games" className="text-sm font-bold text-[#2563EB] hover:underline flex items-center gap-1">
            <span>View All 50+ Games</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game, idx) => (
            <Link
              to={game.path}
              key={idx}
              className="group bg-white rounded-3xl border border-slate-100 hover:border-blue-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Area */}
              <div className="h-44 bg-slate-50 flex items-center justify-center overflow-hidden relative border-b border-slate-100">
                <img 
                  src={game.img} 
                  alt={game.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=400" }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shadow-inner">
                    {game.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{game.title}</h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                  {game.desc}
                </p>
                <div className="mt-auto">
                  <div className="w-full py-3 bg-slate-50 group-hover:bg-[#2563EB] group-hover:text-white rounded-xl text-xs font-bold text-slate-700 text-center transition-all border border-transparent shadow-sm">
                    Start Training
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Age-Based Learning Paths Section */}
      <section className="py-16 bg-slate-50/50 border-y border-slate-100 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Custom Age Learning Paths</h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-md mx-auto">Adaptive cognitive exercises calibrated specifically for each growth milestone.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left selector */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {agePaths.map((path, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAgeTab(idx)}
                  className={`w-full text-left p-4.5 rounded-2xl border font-bold text-sm transition-all flex justify-between items-center ${
                    activeAgeTab === idx 
                      ? 'border-[#2563EB] bg-white text-[#2563EB] shadow-sm' 
                      : 'border-transparent bg-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <span>{path.group}</span>
                  <span className={`w-2 h-2 rounded-full ${activeAgeTab === idx ? 'bg-[#2563EB]' : 'bg-transparent'}`}></span>
                </button>
              ))}
            </div>

            {/* Right card details */}
            <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm h-64 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">{agePaths[activeAgeTab].group} Cognitive Core</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                  {agePaths[activeAgeTab].desc}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Trained Skills</span>
                <div className="flex flex-wrap gap-2">
                  {agePaths[activeAgeTab].skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="inline-block text-[10px] font-bold px-3 py-1 bg-slate-50 border border-slate-200/60 rounded-full text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quiz Categories Section */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto w-full border-b border-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Quiz Zone Subjects</h2>
          <p className="text-sm text-[#64748B] mt-2 max-w-md mx-auto">Boost academic recall speed across core syllabus and reasoning areas.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quizCats.map((cat, idx) => (
            <Link 
              to="/quiz-zone"
              key={idx}
              className={`p-5 rounded-3xl border shadow-sm hover:shadow hover:scale-[1.01] transition-all flex items-center gap-3.5 group cursor-pointer ${cat.color}`}
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">{cat.icon}</span>
              <span className="text-xs font-bold text-[#0F172A]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Brain Assessment & Dashboard preview */}
      <section className="py-16 bg-white px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Assessment Info */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] text-xs font-semibold mb-4">
              <FaGraduationCap />
              <span>Diagnostic System</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Get Your Complete Cognitive Profile Breakdown
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6">
              Our 4-pillar assessment dashboard gauges memory retention thresholds, speed calculation index, pattern logic connectivity, and focus inhibition ranges.
            </p>
            
            <div className="space-y-3.5 mb-8">
              {[
                "10-minute diagnostic challenge",
                "Compares scores with peer age brackets",
                "Unlock customized study advice cards"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0F172A] font-semibold">
                  <FaCheckCircle className="text-emerald-500" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/assessment"
              className="inline-block px-7 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all"
            >
              Start Brain Assessment
            </Link>
          </div>

          {/* Dashboard Preview Widget */}
          <div className="bg-[#F8FAFC] border border-slate-200/50 p-6.5 rounded-3xl shadow-sm">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4">Workspace Preview</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-slate-400 block">IQ INDEX</span>
                <span className="text-xl font-black text-blue-600 mt-1 block">118</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-slate-400 block">MEMORY PROFILE</span>
                <span className="text-xl font-black text-purple-600 mt-1 block">82%</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                <span className="text-[8px] font-bold text-slate-400 block">ACCURACY</span>
                <span className="text-xs font-black text-[#10B981] mt-0.5 block">94%</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                <span className="text-[8px] font-bold text-slate-400 block">DAILY STREAK</span>
                <span className="text-xs font-black text-[#F59E0B] mt-0.5 block flex items-center justify-center gap-0.5">
                  <FaFire className="text-[10px]" />
                  <span>5 Days</span>
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                <span className="text-[8px] font-bold text-slate-400 block">GLOBAL RANK</span>
                <span className="text-xs font-black text-[#7C3AED] mt-0.5 block">#124</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* AI Features & Gamification Details Section */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">AI Cognitive Assistance</h2>
          <p className="text-sm text-[#64748B] mt-2">Personal tutor tools and progress prediction engines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg mb-4">
              <FaRobot />
            </div>
            <h4 className="font-bold text-[#0F172A] text-sm mb-2">AI Cognitive Tutor</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Ask your cognitive companion study strategies, mental memory methods, and pattern logic guidance.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center text-lg mb-4">
              <FaMagic />
            </div>
            <h4 className="font-bold text-[#0F172A] text-sm mb-2">AI Weakness Builder</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Generates custom subject questions and testing problems targeted specifically to strengthen your lower stats.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-4">
              <FaChartLine />
            </div>
            <h4 className="font-bold text-[#0F172A] text-sm mb-2">AI Performance Index</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Synthesizes real-time performance graphs and predicts study endurance indices for upcoming exams.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
