import React, { useState } from 'react';
import {
  FaPlay, FaTrophy, FaLightbulb, FaBrain, FaListOl, FaBolt,
  FaKeyboard, FaCrosshairs, FaPuzzlePiece, FaPalette, FaStopwatch,
  FaClock, FaMousePointer, FaCircle, FaGraduationCap, FaChartLine,
  FaRobot, FaMagic, FaCheckCircle, FaStar, FaFire, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LuBookOpen, LuBrain, LuTarget, LuTrendingUp, LuZap, LuSearch, LuGraduationCap, LuPuzzle } from 'react-icons/lu';
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
    tagline: 'Early Foundations',
    badge: 'Foundation Stage • Level 1',
    level: 'Beginner',
    intensity: 'Gentle Pacing',
    icon: '🎨',
    desc: 'Simple patterns, counting shapes, and basic memory matching blocks to foster initial cognitive nodes.',
    skills: ['Visual Recognition', 'Simple Sorting', 'Basic Counting', 'Color Matching']
  },
  {
    group: 'Age 8-10',
    tagline: 'Speed & Recall',
    badge: 'Growth Stage • Level 2',
    level: 'Intermediate',
    intensity: 'Agile Challenges',
    icon: '⚡',
    desc: 'Rapid arithmetic, word memorization, sequence repeating, and spatial coordination workouts.',
    skills: ['Working Memory', 'Inhibitory Control', 'Basic Math Speed', 'Spatial Tracking']
  },
  {
    group: 'Age 11-13',
    tagline: 'Logic & Focus',
    badge: 'Acceleration Stage • Level 3',
    level: 'Advanced',
    intensity: 'Analytical Focus',
    icon: '🧩',
    desc: 'Abstract logic matrices, color interference tests (Stroop), and multi-step pattern matching.',
    skills: ['Pattern Logic', 'Attentional Focus', 'Deductive Speed', 'Rapid Processing']
  },
  {
    group: 'Age 14-18',
    tagline: 'Cognitive Core',
    badge: 'Mastery Stage • Level 4',
    level: 'High Intensity',
    intensity: 'Peak Performance',
    icon: '🚀',
    desc: 'Highly complex memory grids, perfect drawing precision, inverted physics coordination, and advanced reasoning.',
    skills: ['Complex Memory Spans', 'Advanced Reasoning', 'Motor Precision', 'Stress Processing']
  }
];

const quizCats = [
  {
    name: 'English',
    icon: '📖',
    topic: 'Grammar & Vocab',
    border: 'border-blue-100/90 hover:border-blue-300',
    iconBg: 'bg-blue-50 text-blue-600 shadow-[0_2px_0_#BFDBFE]',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Maths',
    icon: '📐',
    topic: 'Arithmetic & Logic',
    border: 'border-indigo-100/90 hover:border-indigo-300',
    iconBg: 'bg-indigo-50 text-indigo-600 shadow-[0_2px_0_#C7D2FE]',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    name: 'Science',
    icon: '🧪',
    topic: 'Physics & Biology',
    border: 'border-emerald-100/90 hover:border-emerald-300',
    iconBg: 'bg-emerald-50 text-emerald-600 shadow-[0_2px_0_#A7F3D0]',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    name: 'GK',
    icon: '🌍',
    topic: 'World & Current',
    border: 'border-amber-100/90 hover:border-amber-300',
    iconBg: 'bg-amber-50 text-amber-600 shadow-[0_2px_0_#FDE68A]',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    name: 'Logical Reasoning',
    icon: '🧠',
    topic: 'Puzzles & Logic',
    border: 'border-rose-100/90 hover:border-rose-300',
    iconBg: 'bg-rose-50 text-rose-600 shadow-[0_2px_0_#FECDD3]',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    name: 'History',
    icon: '🏺',
    topic: 'Eras & Milestones',
    border: 'border-orange-100/90 hover:border-orange-300',
    iconBg: 'bg-orange-50 text-orange-600 shadow-[0_2px_0_#FED7AA]',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200/80',
    gradient: 'from-orange-500 to-amber-600'
  },
  {
    name: 'Geography',
    icon: '🗺️',
    topic: 'Maps & Continents',
    border: 'border-cyan-100/90 hover:border-cyan-300',
    iconBg: 'bg-cyan-50 text-cyan-600 shadow-[0_2px_0_#A5F3FC]',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Computer',
    icon: '💻',
    topic: 'Coding & Systems',
    border: 'border-violet-100/90 hover:border-violet-300',
    iconBg: 'bg-violet-50 text-violet-600 shadow-[0_2px_0_#DDD6FE]',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200/80',
    gradient: 'from-violet-500 to-indigo-600'
  }
];

const platformStats = [
  {
    stat: '10,000+',
    title: 'Quiz Questions',
    desc: 'Adaptive questions across multiple subjects and difficulty levels.',
    badge: 'Adaptive Engine',
    icon: LuBookOpen,
    color: 'from-blue-600 to-cyan-500',
    iconGradient: 'from-blue-500 to-cyan-500',
    accentColor: '#2563EB',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200/80',
    glowColor: 'hover:border-blue-400 hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.22)]',
    tags: ['Multi-Subject', 'All Levels'],
    path: '/quiz-zone',
  },
  {
    stat: '50+',
    title: 'Brain Games',
    desc: 'Memory, focus, logic, reaction speed, and problem‑solving challenges.',
    badge: 'Cognitive Lab',
    icon: LuBrain,
    color: 'from-indigo-600 to-purple-600',
    iconGradient: 'from-indigo-500 to-purple-500',
    accentColor: '#6366F1',
    badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    glowColor: 'hover:border-indigo-400 hover:shadow-[0_22px_45px_-12px_rgba(99,102,241,0.22)]',
    tags: ['Memory & Focus', 'Reaction Speed'],
    path: '/games',
  },
  {
    stat: '15+',
    title: 'Learning Categories',
    desc: 'English, Maths, Science, GK, History, Reasoning, Computer & more.',
    badge: 'Curated Streams',
    icon: LuTarget,
    color: 'from-rose-500 to-amber-500',
    iconGradient: 'from-rose-500 to-amber-500',
    accentColor: '#F43F5E',
    badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200/80',
    glowColor: 'hover:border-rose-400 hover:shadow-[0_22px_45px_-12px_rgba(244,63,94,0.22)]',
    tags: ['STEM & GK', 'Reasoning & Tech'],
    path: '/quiz-zone',
  },
  {
    stat: 'Personalized',
    title: 'Progress Tracking',
    desc: 'Monitor IQ, memory, focus scores, streaks and achievements.',
    badge: 'Live Analytics',
    icon: LuTrendingUp,
    color: 'from-emerald-600 to-teal-500',
    iconGradient: 'from-emerald-500 to-teal-500',
    accentColor: '#10B981',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    glowColor: 'hover:border-emerald-400 hover:shadow-[0_22px_45px_-12px_rgba(16,185,129,0.22)]',
    tags: ['IQ Analytics', 'Daily Streaks'],
    path: '/dashboard',
  },
];

const brainSkills = [
  {
    name: 'Memory',
    icon: LuBrain,
    desc: 'Improve recall ability, retention, and long‑term memory.',
    skills: ['Visual Recall', 'Short‑Term', 'Long‑Term'],
    percent: 92,
    accent: '#2563EB',
    gradient: 'from-blue-600 to-cyan-500',
    cardBg: 'bg-gradient-to-b from-[#EFF6FF] via-[#F6F9FF] to-[#E9F2FE]',
    cardBorder: 'border-blue-200/90',
    iconBg: 'bg-white text-blue-600 border border-blue-100 shadow-xs',
    glowColor: 'hover:border-blue-400 hover:shadow-[0_18px_30px_-10px_rgba(37,99,235,0.2)]',
    category: 'Memory',
  },
  {
    name: 'Focus',
    icon: LuTarget,
    desc: 'Enhance concentration and reduce distractions.',
    skills: ['Concentration', 'Attention Control', 'Mental Discipline'],
    percent: 88,
    accent: '#7C3AED',
    gradient: 'from-purple-600 to-indigo-600',
    cardBg: 'bg-gradient-to-b from-[#FAF5FF] via-[#FCF9FF] to-[#F3E8FF]',
    cardBorder: 'border-purple-200/90',
    iconBg: 'bg-white text-purple-600 border border-purple-100 shadow-xs',
    glowColor: 'hover:border-purple-400 hover:shadow-[0_18px_30px_-10px_rgba(124,58,237,0.2)]',
    category: 'Focus',
  },
  {
    name: 'Processing Speed',
    icon: LuZap,
    desc: 'Train faster information processing and reaction time.',
    skills: ['Fast Thinking', 'Quick Decisions', 'Reaction Time'],
    percent: 85,
    accent: '#D97706',
    gradient: 'from-amber-500 to-orange-500',
    cardBg: 'bg-gradient-to-b from-[#FFFBEB] via-[#FFFDF5] to-[#FEF3C7]',
    cardBorder: 'border-amber-200/90',
    iconBg: 'bg-white text-amber-500 border border-amber-100 shadow-xs',
    glowColor: 'hover:border-amber-400 hover:shadow-[0_18px_30px_-10px_rgba(245,158,11,0.2)]',
    category: 'Speed & Reflex',
  },
  {
    name: 'Observation',
    icon: LuSearch,
    desc: 'Develop attention to detail and pattern recognition.',
    skills: ['Pattern Recognition', 'Visual Analysis', 'Detail Focus'],
    percent: 90,
    accent: '#059669',
    gradient: 'from-emerald-500 to-teal-500',
    cardBg: 'bg-gradient-to-b from-[#ECFDF5] via-[#F4FDF9] to-[#D1FAE5]',
    cardBorder: 'border-emerald-200/90',
    iconBg: 'bg-white text-emerald-600 border border-emerald-100 shadow-xs',
    glowColor: 'hover:border-emerald-400 hover:shadow-[0_18px_30px_-10px_rgba(16,185,129,0.2)]',
    category: 'Logic & Attention',
  },
  {
    name: 'Learning Ability',
    icon: LuGraduationCap,
    desc: 'Boost learning efficiency and academic performance.',
    skills: ['Learning Speed', 'Info Retention', 'Academic Growth'],
    percent: 87,
    accent: '#4F46E5',
    gradient: 'from-indigo-600 to-blue-600',
    cardBg: 'bg-gradient-to-b from-[#EEF2FF] via-[#F5F7FF] to-[#E0E7FF]',
    cardBorder: 'border-indigo-200/90',
    iconBg: 'bg-white text-indigo-600 border border-indigo-100 shadow-xs',
    glowColor: 'hover:border-indigo-400 hover:shadow-[0_18px_30px_-10px_rgba(99,102,241,0.2)]',
    category: 'Memory',
  },
  {
    name: 'Problem Solving',
    icon: LuPuzzle,
    desc: 'Build logical reasoning and critical thinking.',
    skills: ['Critical Thinking', 'Logical Reasoning', 'Decision Making'],
    percent: 89,
    accent: '#E11D48',
    gradient: 'from-rose-500 to-pink-600',
    cardBg: 'bg-gradient-to-b from-[#FFF1F2] via-[#FFF7F8] to-[#FFE4E6]',
    cardBorder: 'border-rose-200/90',
    iconBg: 'bg-white text-rose-600 border border-rose-100 shadow-xs',
    glowColor: 'hover:border-rose-400 hover:shadow-[0_18px_30px_-10px_rgba(244,63,94,0.2)]',
    category: 'Logic & Attention',
  },
];

const aiFeatures = [
  {
    title: 'AI Cognitive Tutor',
    desc: 'Personalized feedback loops and adaptive learning paths tailored to your speed.',
    badge: 'Adaptive AI',
    icon: FaRobot,
    cardBg: 'bg-gradient-to-b from-[#EFF6FF] via-[#F4F8FF] to-[#DBEAFE]',
    cardBorder: 'border-blue-200/90 hover:border-blue-400',
    shadow: 'shadow-[0_5px_0_#BFDBFE,0_12px_24px_rgba(37,99,235,0.08)] hover:shadow-[0_7px_0_#93C5FD,0_18px_36px_rgba(37,99,235,0.16)]',
    iconBg: 'bg-white text-blue-600 border border-blue-200 shadow-[0_3px_0_#BFDBFE]',
    badgeStyle: 'bg-blue-600 text-white border border-blue-600 shadow-xs',
    titleColor: 'text-slate-900 group-hover:text-blue-700',
    tagStyle: 'bg-white/90 text-blue-900 border border-blue-200/80 shadow-2xs',
    divider: 'border-blue-200/70',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    tags: ['Dynamic Pacing', 'Weakness Detection', 'Instant Hints']
  },
  {
    title: 'Instant Analytics',
    desc: 'Visualize growth with real‑time performance charts and cognitive breakthrough tracking.',
    badge: 'Real-Time Data',
    icon: FaMagic,
    cardBg: 'bg-gradient-to-b from-[#FAF5FF] via-[#FAF5FF] to-[#EDE9FE]',
    cardBorder: 'border-purple-200/90 hover:border-purple-400',
    shadow: 'shadow-[0_5px_0_#DDD6FE,0_12px_24px_rgba(147,51,234,0.08)] hover:shadow-[0_7px_0_#C4B5FD,0_18px_36px_rgba(147,51,234,0.16)]',
    iconBg: 'bg-white text-purple-600 border border-purple-200 shadow-[0_3px_0_#DDD6FE]',
    badgeStyle: 'bg-purple-600 text-white border border-purple-600 shadow-xs',
    titleColor: 'text-slate-900 group-hover:text-purple-700',
    tagStyle: 'bg-white/90 text-purple-900 border border-purple-200/80 shadow-2xs',
    divider: 'border-purple-200/70',
    gradient: 'from-purple-600 via-indigo-600 to-pink-600',
    tags: ['Growth Charts', 'Skill Matrix', 'IQ Trajectory']
  },
  {
    title: 'Gamified Goals',
    desc: 'Unlock daily achievements, maintain streaks, and climb the global leaderboard ranks.',
    badge: 'Leaderboards',
    icon: FaChartLine,
    cardBg: 'bg-gradient-to-b from-[#F0FDF4] via-[#F4FBF7] to-[#D1FAE5]',
    cardBorder: 'border-emerald-200/90 hover:border-emerald-400',
    shadow: 'shadow-[0_5px_0_#A7F3D0,0_12px_24px_rgba(16,185,129,0.08)] hover:shadow-[0_7px_0_#6EE7B7,0_18px_36px_rgba(16,185,129,0.16)]',
    iconBg: 'bg-white text-emerald-600 border border-emerald-200 shadow-[0_3px_0_#A7F3D0]',
    badgeStyle: 'bg-emerald-600 text-white border border-emerald-600 shadow-xs',
    titleColor: 'text-slate-900 group-hover:text-emerald-700',
    tagStyle: 'bg-white/90 text-emerald-900 border border-emerald-200/80 shadow-2xs',
    divider: 'border-emerald-200/70',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    tags: ['Daily Streaks', 'XP Multipliers', 'Tier Badges']
  }
];

const Home = () => {
  const [activeAgeTab, setActiveAgeTab] = useState(0);

  return (
    <div className="flex flex-col flex-grow bg-white relative overflow-hidden text-[#334155] font-sans pb-0">


      <div className="relative z-10">
        {/* Hero Section */}
        <HeroFuturistic />

        {/* Statistics Section - Redesigned Special Section */}
        <section className="relative py-16 sm:py-20 bg-transparent px-4 sm:px-6 lg:px-12 overflow-hidden">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
            <div className="w-[750px] h-[350px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-teal-400/10 rounded-full blur-3xl transform -translate-y-16" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Platform Excellence &amp; Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-poppins">
              Trusted By <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">Thousands</span> of Young Learners
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Helping students improve memory, focus, IQ, logical thinking, and learning speed through engaging brain games and adaptive quizzes.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {platformStats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`group relative bg-white/95 rounded-[28px] p-7 sm:p-8 border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden ${item.glowColor}`}
                >
                  {/* Subtle top corner ambient glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div>
                    {/* Top Row: 3D-styled Icon Box + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.iconGradient} p-0.5 shadow-md shadow-blue-500/15 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                          <Icon className="w-7 h-7" style={{ color: item.accentColor }} />
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-xs ${item.badgeStyle}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Stat Number */}
                    <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.stat}
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom: Micro Feature Tags & Explore Arrow */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/70 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0 ml-2">
                      <FaArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Bottom Animated Gradient Accent Rail */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Brain Skills Section - Redesigned Special Section */}
        <section className="relative py-12 sm:py-16 bg-transparent px-4 sm:px-6 lg:px-12 overflow-hidden">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
            <div className="w-[750px] h-[350px] bg-gradient-to-r from-purple-400/10 via-indigo-400/10 to-blue-400/10 rounded-full blur-3xl transform translate-y-8" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>Cognitive Mastery Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-poppins">
              Train Every Part of <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Your Brain</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Strengthen memory, focus, logical thinking, processing speed, and learning ability through scientifically designed brain‑training activities.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {brainSkills.map((skill, idx) => {
              const SkillIcon = skill.icon;
              return (
                <div
                  key={idx}
                  className={`group relative ${skill.cardBg} ${skill.cardBorder} rounded-[22px] p-5 sm:p-6 border shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden text-center ${skill.glowColor}`}
                >
                  {/* Subtle top corner ambient glow */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/40 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-300" />

                  <div>
                    {/* Centered Compact Icon Tile */}
                    <div className="flex justify-center mb-3">
                      <div className={`w-11 h-11 rounded-xl ${skill.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <SkillIcon className="w-5 h-5" style={{ color: skill.accent }} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal max-w-xs mx-auto">
                      {skill.desc}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                      {skill.skills.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold text-slate-700 bg-white/80 border border-white/80 px-2.5 py-0.5 rounded-full shadow-2xs group-hover:bg-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress Circle & Explore Button */}
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex flex-col items-center">
                    <ProgressCircle percentage={skill.percent} color={skill.accent} size={68} strokeWidth={6} />

                    <Link
                      to="/games"
                      state={{ category: skill.category }}
                      className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 w-auto"
                    >
                      <span>Explore Training</span>
                      <FaArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>

                  {/* Bottom Animated Gradient Accent Rail */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Games Section */}
        <FeaturedGamesSection games={games} />

        {/* Age-Based Learning Paths Section */}
        <section className="relative py-12 lg:py-16 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent px-6 lg:px-12 overflow-hidden">
          {/* Subtle ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-400/5 via-indigo-400/5 to-purple-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="relative max-w-4xl mx-auto text-center mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <LuGraduationCap className="text-base text-blue-600" />
                <span>Personalized Milestone Development</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-poppins">
                Custom Age <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Learning Paths</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Adaptive cognitive exercises calibrated specifically for each growth milestone.
              </p>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              {/* Left Column: 3D Selector Tabs */}
              <div className="lg:col-span-5 flex flex-col gap-2.5 justify-center">
                {agePaths.map((path, idx) => {
                  const isActive = activeAgeTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveAgeTab(idx)}
                      className={`group relative w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 via-[#2563EB] to-indigo-600 border-blue-500/30 text-white shadow-[0_4px_0_#1E3A8A,0_10px_20px_-3px_rgba(37,99,235,0.4)] translate-y-0 active:translate-y-1 active:shadow-[0_1px_0_#1E3A8A]'
                          : 'bg-white border-slate-200/80 text-slate-700 shadow-[0_3px_0_#E2E8F0,0_4px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_0_#CBD5E1,0_8px_16px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:border-blue-300 active:translate-y-1 active:shadow-[0_1px_0_#E2E8F0]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* 3D Icon Tile */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-105 ${
                            isActive
                              ? 'bg-white/20 backdrop-blur-md border border-white/30 shadow-inner'
                              : 'bg-slate-50 border border-slate-200/80 shadow-[0_2px_0_#E2E8F0]'
                          }`}
                        >
                          <span>{path.icon}</span>
                        </div>

                        {/* Text Details */}
                        <div className="min-w-0">
                          <div
                            className={`text-sm sm:text-base font-extrabold tracking-tight leading-snug ${
                              isActive ? 'text-white' : 'text-slate-800 group-hover:text-blue-600'
                            }`}
                          >
                            {path.group}
                          </div>
                          <div
                            className={`text-[11px] font-semibold truncate ${
                              isActive ? 'text-blue-100' : 'text-slate-500'
                            }`}
                          >
                            {path.tagline}
                          </div>
                        </div>
                      </div>

                      {/* Right Indicator / Arrow */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                        }`}
                      >
                        <FaArrowRight className={`text-[10px] transition-transform ${isActive ? 'translate-x-0' : '-translate-x-0.5 group-hover:translate-x-0'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: 3D Showcase Detail Card */}
              <div className="lg:col-span-7 flex">
                <div className="w-full relative bg-white rounded-2xl sm:rounded-3xl border-2 border-blue-100/90 p-5 sm:p-7 shadow-[0_16px_36px_-10px_rgba(37,99,235,0.1),0_4px_0_#DBEAFE] flex flex-col justify-between overflow-hidden">
                  {/* Subtle Background Glows */}
                  <div className="absolute -right-16 -top-16 w-44 h-44 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-44 h-44 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_4px_0_#1E3A8A,0_8px_16px_rgba(37,99,235,0.25)] flex items-center justify-center text-xl">
                        <span>{agePaths[activeAgeTab].icon}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        <span>{agePaths[activeAgeTab].badge}</span>
                      </div>
                    </div>

                    {/* Stage Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-900 tracking-tight mb-1.5">
                      {agePaths[activeAgeTab].group} Cognitive Core
                    </h3>

                    {/* Stage Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {agePaths[activeAgeTab].desc}
                    </p>

                    {/* Milestone Highlights / Key Pillars */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-4">
                      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-2 sm:p-2.5 text-center shadow-[0_2px_0_#E2E8F0]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended</span>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5 block">{agePaths[activeAgeTab].group}</span>
                      </div>
                      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-2 sm:p-2.5 text-center shadow-[0_2px_0_#E2E8F0]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Level</span>
                        <span className="text-xs sm:text-sm font-extrabold text-blue-600 mt-0.5 block">{agePaths[activeAgeTab].level}</span>
                      </div>
                      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-2 sm:p-2.5 text-center shadow-[0_2px_0_#E2E8F0]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Intensity</span>
                        <span className="text-xs sm:text-sm font-extrabold text-indigo-600 mt-0.5 block">{agePaths[activeAgeTab].intensity}</span>
                      </div>
                    </div>

                    {/* Separator Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

                    {/* Trained Skills */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        <LuBrain className="text-blue-500 text-xs" />
                        <span>Trained Cognitive Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {agePaths[activeAgeTab].skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-[0_2px_0_#CBD5E1] hover:border-blue-300 hover:text-blue-600 hover:shadow-[0_3px_0_#93C5FD] hover:-translate-y-0.5 transition-all cursor-default"
                          >
                            <FaCheckCircle className="text-emerald-500 text-[10px] shrink-0" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: 3D CTA Buttons */}
                  <div className="relative z-10 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      to="/games"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#2F73F5] to-[#1E5AD6] hover:from-[#3D7DF7] hover:to-[#2563EB] text-white font-extrabold text-xs sm:text-sm shadow-[0_4px_0_#1243A8,0_10px_20px_rgba(30,90,214,0.3)] active:translate-y-1 active:shadow-[0_1px_0_#1243A8] transition-all group"
                    >
                      <span>Start {agePaths[activeAgeTab].group} Path</span>
                      <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/quiz-zone"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 font-bold text-xs sm:text-sm shadow-[0_3px_0_#E2E8F0,0_4px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_3px_0_#CBD5E1] active:translate-y-1 active:shadow-[0_1px_0_#E2E8F0] transition-all"
                    >
                      <span>Explore Quizzes</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Quiz Categories Section */}
        <section className="relative py-16 sm:py-20 bg-transparent px-6 lg:px-12 overflow-hidden">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
            <div className="w-[750px] h-[350px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-full blur-3xl transform translate-y-6" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <LuBookOpen className="text-base text-blue-600" />
              <span>Adaptive Syllabus Quizzes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-poppins">
              Quiz Zone <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Subjects</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Boost academic recall speed across core syllabus and reasoning areas.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {quizCats.map((cat, idx) => (
              <Link
                to="/quiz-zone"
                key={idx}
                className={`group relative bg-white ${cat.border} rounded-2xl p-5 border shadow-[0_4px_0_#E2E8F0,0_8px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_6px_0_#CBD5E1,0_14px_28px_rgba(15,23,42,0.06)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_0_#CBD5E1] transition-all duration-200 flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  {/* Top: 3D Icon Tile + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200`}>
                      <span>{cat.icon}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cat.badgeBg}`}>
                      {cat.topic}
                    </span>
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Adaptive Recall &amp; Speed
                  </p>
                </div>

                {/* Bottom: Action Trigger */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                    Start Practice
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Animated Accent Rail */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Link>
            ))}
          </div>

          {/* Bottom Explore CTA Button */}
          <div className="text-center mt-12">
            <Link
              to="/quiz-zone"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-b from-[#2F73F5] to-[#1E5AD6] hover:from-[#3D7DF7] hover:to-[#2563EB] text-white font-extrabold text-sm sm:text-base shadow-[0_5px_0_#1243A8,0_12px_24px_rgba(30,90,214,0.35)] active:translate-y-1 active:shadow-[0_2px_0_#1243A8] transition-all group"
            >
              <span>Explore All Quiz Categories</span>
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Brain Assessment & Dashboard preview */}
        <BrainDashboardSection />

        {/* AI Features & Gamification Details Section */}
        <section className="relative py-16 sm:py-24 bg-transparent px-4 sm:px-6 lg:px-12 overflow-hidden z-10">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
            <div className="w-[850px] h-[380px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-teal-400/10 rounded-full blur-3xl transform translate-y-6" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <FaRobot className="text-base text-indigo-600" />
              <span>Next-Gen Intelligent Mentorship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-poppins">
              AI Cognitive <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Assistance</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Intelligent tutoring, targeted weakness building, and performance analytics to accelerate your learning journey.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {aiFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`group relative ${feat.cardBg} rounded-[26px] p-7 sm:p-8 border ${feat.cardBorder} ${feat.shadow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Subtle top corner ambient glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div>
                    {/* Top Row: 3D-styled Icon Box + Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl ${feat.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-2 transition-transform duration-200`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${feat.badgeStyle}`}>
                        {feat.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-extrabold ${feat.titleColor} transition-colors duration-200`}>
                      {feat.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Micro Feature Tags */}
                  <div className={`mt-6 pt-4 border-t ${feat.divider} flex flex-wrap gap-1.5`}>
                    {feat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-lg transition-colors ${feat.tagStyle}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Animated Gradient Accent Rail */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
