import React, { useState } from 'react';
import {
  FaPlay, FaTrophy, FaLightbulb, FaBrain, FaListOl, FaBolt,
  FaKeyboard, FaCrosshairs, FaPuzzlePiece, FaPalette, FaStopwatch,
  FaClock, FaMousePointer, FaCircle, FaGraduationCap, FaChartLine,
  FaRobot, FaMagic, FaCheckCircle, FaStar, FaFire, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FeaturedGamesSection from '../components/sections/FeaturedGamesSection';
import BrainDashboardSection from '../components/sections/BrainDashboardSection';

import HeroFuturistic from '../components/ui/HeroFuturistic';
import ProgressCircle from '../components/ProgressCircle';

const games = [
  {
    id: 'visual-memory',
    title: 'Visual Memory',
    path: '/games/visual-memory',
    icon: <FaLightbulb className="text-red-500 text-2xl" />,
    desc: 'Remember patterns of tiles and recall them with increasing difficulty levels.',
    img: '/gameImage/visualMemory.svg',
    category: 'Memory Training',
    difficulty: 'Beginner',
    skill: 'Memory',
    accent: '#2563EB',
    bestScore: null,
  },
  {
    id: 'number-memory',
    title: 'Number Memory',
    path: '/games/number-memory',
    icon: <span className="text-pink-500 font-bold text-2xl">1/9</span>,
    desc: 'Memorize and recall increasingly longer number sequences to test memory capacity.',
    img: '/gameImage/NumberMemory2.png',
    category: 'Memory Training',
    difficulty: 'Intermediate',
    skill: 'Memory',
    accent: '#4F46E5',
    bestScore: null,
  },
  {
    id: 'chimp-test',
    title: 'Chimp Test',
    path: '/games/chimp-test',
    icon: <FaBrain className="text-purple-500 text-2xl" />,
    desc: 'Challenge short-term memory and concentration with numbered sequences.',
    img: '/gameImage/chimpTest.svg',
    category: 'Cognitive Training',
    difficulty: 'Advanced',
    skill: 'Focus & Memory',
    accent: '#7C3AED',
    bestScore: null,
  },
  {
    id: 'pattern-logic',
    title: 'Pattern Logic',
    path: '/games/pattern-logic',
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
    <div className="flex flex-col flex-grow bg-slate-50 relative overflow-hidden text-[#334155] font-sans pb-0">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none"></div>

      <div className="relative z-10">
      {/* Hero Section */}
      <HeroFuturistic />

      {/* Statistics Section */}
      <section className="relative py-12 bg-transparent px-6 lg:px-12">

        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-64 h-64 text-[#E5E7EB] -top-12 left-1/2 -translate-x-1/2 opacity-30" fill="none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Trusted By Thousands of Young Learners
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
            Helping students improve memory, focus, IQ, logical thinking, and learning speed through engaging brain games and adaptive quizzes.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="text-5xl mb-4">📚</div>
            <span className="block text-3xl font-bold text-[#2563EB]">10,000+</span>
            <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Quiz Questions</h3>
            <p className="mt-2 text-sm text-[#64748B]">
              Adaptive questions across multiple subjects and difficulty levels.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="text-5xl mb-4">🧠</div>
            <span className="block text-3xl font-bold text-[#2563EB]">50+</span>
            <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Brain Games</h3>
            <p className="mt-2 text-sm text-[#64748B]">
              Memory, focus, logic, reaction speed, and problem‑solving challenges.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="text-5xl mb-4">🎯</div>
            <span className="block text-3xl font-bold text-[#2563EB]">15+</span>
            <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Learning Categories</h3>
            <p className="mt-2 text-sm text-[#64748B]">
              English, Maths, Science, GK, History, Reasoning, Computer &amp; more.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="text-5xl mb-4">📈</div>
            <span className="block text-3xl font-bold text-[#2563EB]">Personalized</span>
            <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Progress Tracking</h3>
            <p className="mt-2 text-sm text-[#64748B]">
              Monitor IQ, memory, focus scores, streaks and achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Brain Skills Section */}
      <section className="relative py-12 bg-transparent px-6 lg:px-12">
        {/* Decorative floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-64 h-64 text-[#E5E7EB] -top-12 left-1/2 -translate-x-1/2 opacity-30" fill="none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto text-center mb-12">
          <span className="inline-block mb-2 text-3xl">🧠</span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Train Every Part of Your Brain
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
            Strengthen memory, focus, logical thinking, processing speed, and learning ability through scientifically designed brain‑training activities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Memory',
              icon: '🧠',
              desc: 'Improve recall ability, retention, and long‑term memory.',
              skills: ['Visual Recall', 'Short‑Term', 'Long‑Term'],
              percent: 92,
              accent: '#2563EB',
            },
            {
              name: 'Focus',
              icon: '🎯',
              desc: 'Enhance concentration and reduce distractions.',
              skills: ['Concentration', 'Attention Control', 'Mental Discipline'],
              percent: 88,
              accent: '#7C3AED',
            },
            {
              name: 'Processing Speed',
              icon: '⚡',
              desc: 'Train faster information processing and reaction time.',
              skills: ['Fast Thinking', 'Quick Decisions', 'Reaction Time'],
              percent: 85,
              accent: '#F59E0B',
            },
            {
              name: 'Observation',
              icon: '🔍',
              desc: 'Develop attention to detail and pattern recognition.',
              skills: ['Pattern Recognition', 'Visual Analysis', 'Detail Focus'],
              percent: 90,
              accent: '#10B981',
            },
            {
              name: 'Learning Ability',
              icon: '📚',
              desc: 'Boost learning efficiency and academic performance.',
              skills: ['Learning Speed', 'Info Retention', 'Academic Growth'],
              percent: 87,
              accent: '#6366F1',
            },
            {
              name: 'Problem Solving',
              icon: '🧩',
              desc: 'Build logical reasoning and critical thinking.',
              skills: ['Critical Thinking', 'Logical Reasoning', 'Decision Making'],
              percent: 89,
              accent: '#F43F5E',
            },
          ].map((skill, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]"
            >
              <div className="text-5xl mb-4">{skill.icon}</div>
              <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">{skill.name}</h3>
              <p className="mt-2 text-sm text-[#64748B]">{skill.desc}</p>
              <div className="flex justify-center gap-2 my-3">
                {skill.skills.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-[#64748B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ProgressCircle percentage={skill.percent} color={skill.accent} />
              <Link to="/games" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2563EB] hover:underline cursor-pointer">
                Explore Training <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Games Section */}
      <FeaturedGamesSection games={games} />

      {/* Age-Based Learning Paths Section */}
      <section className="relative py-24 bg-transparent px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-4">
            <h2 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Custom Age Learning Paths</h2>
            <p className="text-base text-[#64748B] mt-2 max-w-md mx-auto">Adaptive cognitive exercises calibrated specifically for each growth milestone.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left selector */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {agePaths.map((path, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAgeTab(idx)}
                  className={`w-full text-left p-4.5 rounded-2xl border font-bold text-sm transition-all flex justify-between items-center ${activeAgeTab === idx
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
            <div className="lg:col-span-3 bg-[#F0F9FF] border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
              <div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{agePaths[activeAgeTab].group} Cognitive Core</h3>
                <p className="text-base text-[#64748B] leading-relaxed mb-6">
                  {agePaths[activeAgeTab].desc}
                </p>
              </div>

              <div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Trained Skills</span>
                <div className="flex flex-wrap gap-2">
                  {agePaths[activeAgeTab].skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-block text-sm px-3 py-1 bg-[#FAF5FF] border-2 border-[#E2E8F0] rounded-full text-black shadow-md"
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
      <section className="relative py-12 bg-transparent px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Quiz Zone Subjects
          </h2>
          <p className="text-base text-[#64748B] mt-4 max-w-2xl mx-auto">
            Boost academic recall speed across core syllabus and reasoning areas.
          </p>
        </div>


        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {quizCats.map((cat, idx) => (
            <Link
              to="/quiz-zone"
              key={idx}
              className={`bg-[#F0F9FF] border border-[#E2E8F0] rounded-[12px] p-4 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB] ${cat.color}`}
            >
              <span className="text-xl group-hover:rotate-12 transition-transform" style={{ color: cat.color.split(' ')[0].replace('text-', '') }}>{cat.icon}</span>
              <span className="text-base text-[#0F172A] mt-2 block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Brain Assessment & Dashboard preview */}
      <BrainDashboardSection />

      {/* AI Features & Gamification Details Section */}
      <section className="relative pt-8 pb-8 mb-12 bg-transparent z-10">
        <div className="text-center mb-5">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-10">
            AI Cognitive Assistance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intelligent tutoring, targeted weakness building, and performance analytics to accelerate your learning journey.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <FaRobot className="text-blue-600 text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">AI Cognitive Tutor</h4>
            <p className="text-base text-gray-600">
              Personalized feedback loops and adaptive learning paths tailored to your speed.
            </p>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
              <FaMagic className="text-purple-600 text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Instant Analytics</h4>
            
            <p className="text-base text-gray-600">
              Visualize growth with real‑time performance charts and cognitive breakthrough tracking.
            </p>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
              <FaChartLine className="text-emerald-600 text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Gamified Goals</h4>
            <p className="text-base text-gray-600">
              Unlock daily achievements, maintain streaks, and climb the global leaderboard ranks.
            </p>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
};

export default Home;
