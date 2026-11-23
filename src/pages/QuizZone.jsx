import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaBook, FaCalculator, FaAtom, FaGlobe, FaHourglassHalf,
  FaHistory, FaLaptopCode, FaBrain, FaPlay, FaCheckCircle,
  FaTimesCircle, FaTrophy, FaArrowRight, FaRedo, FaFire,
  FaBolt, FaStar, FaLightbulb, FaClock, FaMedal, FaAward,
  FaCheck, FaTimes, FaUndo, FaShareAlt, FaQuestionCircle, FaGraduationCap
} from 'react-icons/fa';
import {
  LuTimer, LuZap, LuFlame, LuTrophy, LuSparkles, LuCheck,
  LuBookOpen, LuRotateCcw
} from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import { BANDS, BAND_CONFIG } from '../utils/learningBands';
import { getAdaptiveQuestions, getSyllabusDescription } from '../data/quizQuestionsByBand';

// 8 Full Categories with curriculum metadata
const categories = [
  {
    id: 'maths',
    name: 'Maths',
    icon: FaCalculator,
    categoryGroup: 'stem',
    desc: 'Arithmetic, logical sequences, geometry, and mental speed algebra.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#4F46E5',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#EEF2FF] via-[#F5F7FF] to-[#E0E7FF]',
      border: 'border-indigo-200 hover:border-indigo-400',
      shadow: 'shadow-[0_5px_0_#C7D2FE,0_12px_24px_rgba(79,70,229,0.08)] hover:shadow-[0_7px_0_#A5B4FC,0_18px_36px_rgba(79,70,229,0.18)]',
      iconTile: 'bg-indigo-600 text-white shadow-[0_3px_0_#3730A3]',
      tagBg: 'bg-white/90 text-indigo-900 border-indigo-200/80',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      btnGradient: 'bg-gradient-to-b from-[#4F46E5] to-[#3730A3] hover:from-[#6366F1] hover:to-[#4338CA]',
      btnShadow: 'shadow-[0_4px_0_#312E81,0_10px_20px_rgba(79,70,229,0.3)]',
    },
    tags: ['Sequences', 'Algebra', 'Speed Math'],
    xpReward: 100
  },
  {
    id: 'science',
    name: 'Science',
    icon: FaAtom,
    categoryGroup: 'stem',
    desc: 'Physics mechanics, space astronomy, chemical elements, and biology.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#059669',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#ECFDF5] via-[#F4FBF7] to-[#D1FAE5]',
      border: 'border-emerald-200 hover:border-emerald-400',
      shadow: 'shadow-[0_5px_0_#A7F3D0,0_12px_24px_rgba(16,185,129,0.08)] hover:shadow-[0_7px_0_#6EE7B7,0_18px_36px_rgba(16,185,129,0.18)]',
      iconTile: 'bg-emerald-600 text-white shadow-[0_3px_0_#065F46]',
      tagBg: 'bg-white/90 text-emerald-900 border-emerald-200/80',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btnGradient: 'bg-gradient-to-b from-[#059669] to-[#047857] hover:from-[#10B981] hover:to-[#059669]',
      btnShadow: 'shadow-[0_4px_0_#064E3B,0_10px_20px_rgba(16,185,129,0.3)]',
    },
    tags: ['Space', 'Chemicals', 'Human Body'],
    xpReward: 100
  },
  {
    id: 'english',
    name: 'English',
    icon: FaBook,
    categoryGroup: 'humanities',
    desc: 'Grammar mastery, contextual vocabulary, synonyms, and idioms.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#2563EB',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#EFF6FF] via-[#F6F9FF] to-[#DBEAFE]',
      border: 'border-blue-200 hover:border-blue-400',
      shadow: 'shadow-[0_5px_0_#BFDBFE,0_12px_24px_rgba(37,99,235,0.08)] hover:shadow-[0_7px_0_#93C5FD,0_18px_36px_rgba(37,99,235,0.18)]',
      iconTile: 'bg-blue-600 text-white shadow-[0_3px_0_#1E40AF]',
      tagBg: 'bg-white/90 text-blue-900 border-blue-200/80',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      btnGradient: 'bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB]',
      btnShadow: 'shadow-[0_4px_0_#1E3A8A,0_10px_20px_rgba(37,99,235,0.3)]',
    },
    tags: ['Grammar', 'Vocabulary', 'Idioms'],
    xpReward: 100
  },
  {
    id: 'gk',
    name: 'GK',
    icon: FaGlobe,
    categoryGroup: 'humanities',
    desc: 'Global current affairs, world geography, monuments, and world records.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#D97706',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#FFFBEB] via-[#FEFDF5] to-[#FEF3C7]',
      border: 'border-amber-200 hover:border-amber-400',
      shadow: 'shadow-[0_5px_0_#FDE68A,0_12px_24px_rgba(217,119,6,0.08)] hover:shadow-[0_7px_0_#FCD34D,0_18px_36px_rgba(217,119,6,0.18)]',
      iconTile: 'bg-amber-600 text-white shadow-[0_3px_0_#92400E]',
      tagBg: 'bg-white/90 text-amber-900 border-amber-200/80',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      btnGradient: 'bg-gradient-to-b from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706]',
      btnShadow: 'shadow-[0_4px_0_#78350F,0_10px_20px_rgba(217,119,6,0.3)]',
    },
    tags: ['World Records', 'Capitals', 'Heritage'],
    xpReward: 100
  },
  {
    id: 'logic',
    name: 'Logical Reasoning',
    icon: FaBrain,
    categoryGroup: 'logic',
    desc: 'Deductive puzzles, patterns, matrix relations, and number analogies.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#E11D48',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#FFF1F2] via-[#FFF7F8] to-[#FFE4E6]',
      border: 'border-rose-200 hover:border-rose-400',
      shadow: 'shadow-[0_5px_0_#FECDD3,0_12px_24px_rgba(225,29,72,0.08)] hover:shadow-[0_7px_0_#FDA4AF,0_18px_36px_rgba(225,29,72,0.18)]',
      iconTile: 'bg-rose-600 text-white shadow-[0_3px_0_#9F1239]',
      tagBg: 'bg-white/90 text-rose-900 border-rose-200/80',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      btnGradient: 'bg-gradient-to-b from-[#E11D48] to-[#BE123C] hover:from-[#F43F5E] hover:to-[#E11D48]',
      btnShadow: 'shadow-[0_4px_0_#881337,0_10px_20px_rgba(225,29,72,0.3)]',
    },
    tags: ['Number Series', 'Analogies', 'Matrices'],
    xpReward: 100
  },
  {
    id: 'history',
    name: 'History',
    icon: FaHistory,
    categoryGroup: 'humanities',
    desc: 'Ancient empires, world revolutions, inventions, and civil milestones.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#EA580C',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#FFF7ED] via-[#FFFAF5] to-[#FFEDD5]',
      border: 'border-orange-200 hover:border-orange-400',
      shadow: 'shadow-[0_5px_0_#FED7AA,0_12px_24px_rgba(234,88,12,0.08)] hover:shadow-[0_7px_0_#FDBA74,0_18px_36px_rgba(234,88,12,0.18)]',
      iconTile: 'bg-orange-600 text-white shadow-[0_3px_0_#9A3412]',
      tagBg: 'bg-white/90 text-orange-900 border-orange-200/80',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      btnGradient: 'bg-gradient-to-b from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C]',
      btnShadow: 'shadow-[0_4px_0_#7C2D12,0_10px_20px_rgba(234,88,12,0.3)]',
    },
    tags: ['Civilizations', 'World Wars', 'Pioneers'],
    xpReward: 100
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: FaGlobe,
    categoryGroup: 'humanities',
    desc: 'Continents, deep ocean trenches, mountain peaks, rivers, and maps.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#0891B2',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#ECFEFF] via-[#F4FCFD] to-[#CFFAFE]',
      border: 'border-cyan-200 hover:border-cyan-400',
      shadow: 'shadow-[0_5px_0_#A5F3FC,0_12px_24px_rgba(8,145,178,0.08)] hover:shadow-[0_7px_0_#67E8F9,0_18px_36px_rgba(8,145,178,0.18)]',
      iconTile: 'bg-cyan-600 text-white shadow-[0_3px_0_#155E75]',
      tagBg: 'bg-white/90 text-cyan-900 border-cyan-200/80',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      btnGradient: 'bg-gradient-to-b from-[#0891B2] to-[#0E7490] hover:from-[#06B6D4] hover:to-[#0891B2]',
      btnShadow: 'shadow-[0_4px_0_#164E63,0_10px_20px_rgba(8,145,178,0.3)]',
    },
    tags: ['Oceans', 'Mountains', 'Landforms'],
    xpReward: 100
  },
  {
    id: 'computer',
    name: 'Computer',
    icon: FaLaptopCode,
    categoryGroup: 'logic',
    desc: 'CPU architecture, binary codes, web networking, and coding logic.',
    badge: '5 Questions • 20s/Q',
    accentColor: '#9333EA',
    colorTheme: {
      cardBg: 'bg-gradient-to-b from-[#FAF5FF] via-[#FAF5FF] to-[#EDE9FE]',
      border: 'border-purple-200 hover:border-purple-400',
      shadow: 'shadow-[0_5px_0_#DDD6FE,0_12px_24px_rgba(147,51,234,0.08)] hover:shadow-[0_7px_0_#C4B5FD,0_18px_36px_rgba(147,51,234,0.18)]',
      iconTile: 'bg-purple-600 text-white shadow-[0_3px_0_#6B21A8]',
      tagBg: 'bg-white/90 text-purple-900 border-purple-200/80',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      btnGradient: 'bg-gradient-to-b from-[#9333EA] to-[#7E22CE] hover:from-[#A855F7] hover:to-[#9333EA]',
      btnShadow: 'shadow-[0_4px_0_#581C87,0_10px_20px_rgba(147,51,234,0.3)]',
    },
    tags: ['Binary', 'CPUs & RAM', 'Web Tech'],
    xpReward: 100
  }
];

// Complete verified question banks for ALL 8 subjects with hints & educational explanations
const quizQuestions = {
  Maths: [
    {
      q: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
      a: ["20", "24", "32", "64"],
      correct: 2,
      hint: "Notice that each number is multiplied by 2 to get the next one.",
      explanation: "Each number doubles: 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16, and 16 × 2 = 32."
    },
    {
      q: "If 3x + 5 = 20, what is the value of x?",
      a: ["3", "4", "5", "6"],
      correct: 2,
      hint: "First subtract 5 from 20, then divide the result by 3.",
      explanation: "Subtract 5: 3x = 15. Divide by 3: x = 15 / 3 = 5."
    },
    {
      q: "How many total degrees are in the interior angles of any triangle combined?",
      a: ["90°", "180°", "270°", "360°"],
      correct: 1,
      hint: "Half of a full 360-degree rotation.",
      explanation: "The interior angles of any planar triangle always add up to exactly 180 degrees."
    },
    {
      q: "What is 15% of 200?",
      a: ["20", "25", "30", "35"],
      correct: 2,
      hint: "Find 10% of 200 first (which is 20), then add half of that (10).",
      explanation: "15% × 200 = 0.15 × 200 = 30."
    },
    {
      q: "How many sides does a regular heptagon have?",
      a: ["6", "7", "8", "9"],
      correct: 1,
      hint: "Hexagon has 6 sides, Octagon has 8 sides. A heptagon sits right in between.",
      explanation: "A heptagon is a 7-sided polygon. (Prefix 'hepta' means seven)."
    }
  ],
  Science: [
    {
      q: "Which planet in our solar system is known as the 'Red Planet'?",
      a: ["Venus", "Jupiter", "Mars", "Saturn"],
      correct: 2,
      hint: "It has rusty iron oxide soil and two small moons named Phobos and Deimos.",
      explanation: "Mars appears reddish because its surface rocks and dust are rich in iron oxide (rust)."
    },
    {
      q: "What is the standard chemical formula for pure Water?",
      a: ["H2O", "O2", "CO2", "NaCl"],
      correct: 0,
      hint: "Two hydrogen atoms chemically bonded to one oxygen atom.",
      explanation: "Water is composed of two hydrogen atoms and one oxygen atom: H2O."
    },
    {
      q: "What essential gas do green plants absorb from the atmosphere during photosynthesis?",
      a: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1,
      hint: "Humans exhale this gas, and plants utilize it along with sunlight to create glucose.",
      explanation: "Plants absorb Carbon Dioxide (CO2) and release Oxygen (O2) as a byproduct."
    },
    {
      q: "What universal force keeps the Earth and planets in orbit around the Sun?",
      a: ["Electromagnetism", "Gravity", "Frictional Force", "Nuclear Force"],
      correct: 1,
      hint: "The same invisible attractive force that causes apples to fall to the ground.",
      explanation: "Gravity is the fundamental force of attraction between masses that maintains planetary orbits."
    },
    {
      q: "Which muscular organ functions as the central pump in the human circulatory system?",
      a: ["Brain", "Lungs", "Liver", "Heart"],
      correct: 3,
      hint: "It beats over 100,000 times a day to pump blood.",
      explanation: "The heart pumps oxygenated and deoxygenated blood through blood vessels throughout the body."
    }
  ],
  English: [
    {
      q: "What is the most accurate synonym for the word 'Accelerate'?",
      a: ["Slow Down", "Quicken", "Pause", "Delay"],
      correct: 1,
      hint: "Think of an accelerator pedal in a car.",
      explanation: "'Accelerate' means to increase in speed or rate, making 'Quicken' the closest synonym."
    },
    {
      q: "Which of the following is a collective noun?",
      a: ["Fleet", "Ocean", "Sailing", "Blue"],
      correct: 0,
      hint: "A noun used to name a whole group of people, animals, or ships.",
      explanation: "'Fleet' refers to a group of ships or vehicles operating under one command."
    },
    {
      q: "Identify the correctly spelled word below:",
      a: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
      correct: 0,
      hint: "Remember the rule: double 'c' and double 'm'.",
      explanation: "'Accommodate' is spelled with two 'c's and two 'm's."
    },
    {
      q: "What does the common English idiom 'Piece of cake' signify?",
      a: ["A bakery treat", "Very easy to accomplish", "Extremely expensive", "A dangerous puzzle"],
      correct: 1,
      hint: "When a test or chore felt completely effortless.",
      explanation: "'Piece of cake' is an idiom that describes a task as remarkably easy or straightforward."
    },
    {
      q: "What is the direct antonym (opposite) of the word 'Abundant'?",
      a: ["Plentiful", "Scarce", "Generous", "Infinite"],
      correct: 1,
      hint: "When resources are very rare or in severely short supply.",
      explanation: "'Abundant' means plentiful or overflowing; 'Scarce' means insufficient or rare."
    }
  ],
  GK: [
    {
      q: "Which is the largest and deepest ocean on Earth?",
      a: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3,
      hint: "It covers more than 30% of the entire Earth's surface and contains the Mariana Trench.",
      explanation: "The Pacific Ocean is the largest ocean, spanning over 165 million square kilometers."
    },
    {
      q: "What is the capital city of France?",
      a: ["Berlin", "London", "Madrid", "Paris"],
      correct: 3,
      hint: "Famous for the Eiffel Tower and the Louvre Museum.",
      explanation: "Paris has been the capital and cultural center of France for centuries."
    },
    {
      q: "Who painted the world-famous masterpiece portrait 'Mona Lisa'?",
      a: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correct: 1,
      hint: "An iconic Italian Renaissance polymath, engineer, and artist.",
      explanation: "Leonardo da Vinci painted the Mona Lisa in Florence in the early 16th century."
    },
    {
      q: "What is the highest mountain peak above sea level on Earth?",
      a: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
      correct: 2,
      hint: "Located in the Himalayas along the border of Nepal and China.",
      explanation: "Mount Everest reaches 8,848.86 meters (29,031.7 ft) above sea level."
    },
    {
      q: "What is the official currency of Japan?",
      a: ["Yuan", "Won", "Yen", "Ringgit"],
      correct: 2,
      hint: "Its currency symbol is ¥.",
      explanation: "The Yen (JPY) is the third most traded currency in the foreign exchange market."
    }
  ],
  "Logical Reasoning": [
    {
      q: "Complete the sequence pattern: 7, 10, 8, 11, 9, 12, ... What number comes next?",
      a: ["7", "10", "12", "13"],
      correct: 1,
      hint: "Notice the alternating pattern: add 3, then subtract 2.",
      explanation: "Pattern alternates: +3, -2, +3, -2, +3, -2. So 12 - 2 = 10."
    },
    {
      q: "Book is to Reading as Fork is to:",
      a: ["Drawing", "Eating", "Writing", "Cooking"],
      correct: 1,
      hint: "What action is a fork specifically designed to perform?",
      explanation: "A book is an instrument used for reading; a fork is an instrument used for eating."
    },
    {
      q: "If you walk North, turn 90° right, and then turn 90° right again, which direction are you facing?",
      a: ["North", "South", "East", "West"],
      correct: 1,
      hint: "North -> turning right once faces East. Turning right again faces the opposite of North.",
      explanation: "Starting North: 1st right turn faces East. 2nd right turn faces South."
    },
    {
      q: "If CAT is coded as 3120 (C=3, A=1, T=20), how is DOG coded?",
      a: ["4157", "4158", "3147", "4148"],
      correct: 0,
      hint: "Use each letter's numerical order in the English alphabet (A=1, B=2...).",
      explanation: "D is the 4th letter, O is the 15th, and G is the 7th. Together: 4157."
    },
    {
      q: "Which word does NOT logically belong with the other three?",
      a: ["Apple", "Banana", "Carrot", "Orange"],
      correct: 2,
      hint: "Three are classified as fruits, while one is a root vegetable.",
      explanation: "Carrot is a root vegetable; Apple, Banana, and Orange are all tree/plant fruits."
    }
  ],
  History: [
    {
      q: "Which ancient civilization engineered and constructed the Great Pyramids of Giza?",
      a: ["Romans", "Greeks", "Egyptians", "Mayans"],
      correct: 2,
      hint: "They flourished along the fertile banks of the River Nile.",
      explanation: "Ancient Egyptians built the Giza pyramids as monumental royal tombs for pharaohs."
    },
    {
      q: "In which year did World War II officially end?",
      a: ["1918", "1939", "1945", "1950"],
      correct: 2,
      hint: "The war lasted six years, beginning in 1939 and concluding in 1945.",
      explanation: "World War II concluded in 1945 following Allied victories in Europe and the Pacific."
    },
    {
      q: "Who delivered the historic 'I Have a Dream' civil rights address in Washington, D.C.?",
      a: ["Malcolm X", "Nelson Mandela", "Martin Luther King Jr.", "Abraham Lincoln"],
      correct: 2,
      hint: "Delivered from the steps of the Lincoln Memorial on August 28, 1963.",
      explanation: "Dr. Martin Luther King Jr. delivered this defining speech advocating for civil and economic rights."
    },
    {
      q: "Who introduced movable type printing press technology to Europe around 1440?",
      a: ["Johannes Gutenberg", "Isaac Newton", "Galileo Galilei", "Alexander Bell"],
      correct: 0,
      hint: "His printed Latin Bibles became the first mass-produced books in Europe.",
      explanation: "Johannes Gutenberg's printing press catalyzed the European Renaissance and the Scientific Revolution."
    },
    {
      q: "Which European explorer led the expedition that accomplished the first circumnavigation of the globe?",
      a: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "Marco Polo"],
      correct: 1,
      hint: "A strait at the tip of South America is named in his honor.",
      explanation: "Ferdinand Magellan's Spanish expedition (1519–1522) was the first to sail around the Earth."
    }
  ],
  Geography: [
    {
      q: "Which continent has the most countries and contains the Sahara Desert?",
      a: ["South America", "Africa", "Asia", "Australia"],
      correct: 1,
      hint: "It is the second-largest continent by both land area and population.",
      explanation: "Africa contains 54 sovereign nations and houses the expansive Sahara Desert."
    },
    {
      q: "Which river is widely recognized as the longest river in the world?",
      a: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
      correct: 1,
      hint: "It flows northward through northeastern Africa into the Mediterranean Sea.",
      explanation: "The Nile River stretches approximately 6,650 kilometers (4,132 miles)."
    },
    {
      q: "Which is the largest hot desert on Earth by land area?",
      a: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Arabian Desert"],
      correct: 2,
      hint: "It spans nearly the entire northern third of the African continent.",
      explanation: "The Sahara Desert spans approximately 9.2 million square kilometers."
    },
    {
      q: "The Mariana Trench, the deepest recorded point on Earth, is located in which ocean?",
      a: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Southern Ocean"],
      correct: 1,
      hint: "The world's largest ocean, situated east of the Mariana Islands.",
      explanation: "The Challenger Deep in the Mariana Trench reaches almost 11,000 meters in the Pacific Ocean."
    },
    {
      q: "Which nation spans across two continents and possesses the largest total land area in the world?",
      a: ["Canada", "China", "United States", "Russia"],
      correct: 3,
      hint: "It spans eleven time zones across Eastern Europe and Northern Asia.",
      explanation: "Russia spans over 17.1 million square kilometers across Europe and Asia."
    }
  ],
  Computer: [
    {
      q: "What does the computer hardware acronym 'CPU' stand for?",
      a: ["Central Processing Unit", "Computer Personal Unit", "Central Power User", "Core Program Utility"],
      correct: 0,
      hint: "Often referred to as the primary 'brain' of any computing device.",
      explanation: "The Central Processing Unit (CPU) executes instructions comprising a computer program."
    },
    {
      q: "Digital computers represent all data using binary code. Which two numbers form binary?",
      a: ["1 and 2", "0 and 1", "0 and 9", "1 and 10"],
      correct: 1,
      hint: "Corresponds to electrical transistors being turned OFF (0) or ON (1).",
      explanation: "Binary numeral systems use base-2 digits: only 0 and 1."
    },
    {
      q: "What does the abbreviation 'WWW' stand for in web browsing addresses?",
      a: ["World Wide Web", "World Wide Wireless", "Web Wide World", "World Web Wire"],
      correct: 0,
      hint: "Invented by British computer scientist Tim Berners-Lee in 1989.",
      explanation: "'World Wide Web' is an interconnected system of public web pages accessible via the Internet."
    },
    {
      q: "Which type of computer memory is volatile (erased immediately when power is turned off)?",
      a: ["ROM (Read-Only)", "Hard Disk Drive", "RAM (Random Access)", "USB Flash Drive"],
      correct: 2,
      hint: "It holds active apps and data currently in use for lightning-fast access.",
      explanation: "RAM is volatile memory; its contents disappear once the device is powered down."
    },
    {
      q: "Which of the following is a renowned high-level programming language used heavily in AI and Data Science?",
      a: ["HTML5", "Python", "USB 3.0", "PNG"],
      correct: 1,
      hint: "Named after the British comedy troupe Monty Python.",
      explanation: "Python is one of the most popular general-purpose coding languages globally."
    }
  ]
};

const QuizZone = () => {
  const [searchParams] = useSearchParams();
  const { user, bandInfo, learningBand, recordQuizScore } = useAuth();

  // Active learning band (defaults to student's authenticated band or Middle)
  const [currentBand, setCurrentBand] = useState(learningBand || BANDS.MIDDLE);

  // Sync currentBand if student logs in / changes
  useEffect(() => {
    if (learningBand) {
      setCurrentBand(learningBand);
    }
  }, [learningBand]);

  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'stem', 'humanities', 'logic'
  const [activeQuestions, setActiveQuestions] = useState([]);

  // Quiz active progression states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Gamification & realism features
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreakInSession, setMaxStreakInSession] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Lifelines (1 use per quiz for realism)
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [timeBonusUsed, setTimeBonusUsed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // User persistent stats
  const [totalXp, setTotalXp] = useState(user?.xp || 240);
  const [userStreakDays, setUserStreakDays] = useState(user?.streak || 3);
  const [quizzesCompletedCount, setQuizzesCompletedCount] = useState(user?.quizProgress?.length || 6);

  // Answers record for detailed results review
  const [quizReviewHistory, setQuizReviewHistory] = useState([]);

  // Keep stats in sync with auth user
  useEffect(() => {
    if (user) {
      if (user.xp !== undefined) setTotalXp(user.xp);
      if (user.streak !== undefined) setUserStreakDays(user.streak);
      if (user.quizProgress) setQuizzesCompletedCount(user.quizProgress.length);
    } else {
      const savedXp = parseInt(localStorage.getItem('user_xp') || '240');
      const savedStreak = parseInt(localStorage.getItem('user_streak') || '3');
      const savedCount = parseInt(localStorage.getItem('quizzes_done') || '6');
      setTotalXp(savedXp);
      setUserStreakDays(savedStreak);
      setQuizzesCompletedCount(savedCount);
    }
  }, [user]);

  // Handle URL query parameter ?subject=...
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam && !selectedCategory) {
      const matched = categories.find(
        (c) =>
          c.id.toLowerCase() === subjectParam.toLowerCase() ||
          c.name.toLowerCase() === subjectParam.toLowerCase()
      );
      if (matched) {
        startQuiz(matched.name);
      }
    }
  }, [searchParams]);

  // Timer countdown hook
  useEffect(() => {
    let timer;
    if (selectedCategory && !isFinished && timerActive && timeLeft > 0 && !isAnswerSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswerSubmitted && selectedCategory && !isFinished) {
      // Auto submit with time out
      handleAnswerSubmit(-1); // -1 signifies timed out
    }
    return () => clearInterval(timer);
  }, [selectedCategory, isFinished, timerActive, timeLeft, isAnswerSubmitted]);

  // Start Quiz Handler with Band-Adaptive Questions
  const startQuiz = (categoryName, bandToUse = currentBand) => {
    const questions = getAdaptiveQuestions(categoryName, bandToUse) || quizQuestions[categoryName];

    if (!questions || questions.length === 0) {
      alert("This category quiz is loading. Please select another subject!");
      return;
    }

    setActiveQuestions(questions);
    setSelectedCategory(categoryName);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setXpGained(0);
    setTimeLeft(20);
    setTimerActive(true);
    setStreak(0);
    setMaxStreakInSession(0);
    setShowExplanation(false);
    setFiftyFiftyUsed(false);
    setHiddenOptions([]);
    setTimeBonusUsed(false);
    setHintUsed(false);
    setShowHint(false);
    setQuizReviewHistory([]);
  };

  // Option Click Handler
  const handleOptionSelect = (optionIndex) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(optionIndex);
  };

  // Submit Answer & Reveal Feedback
  const handleAnswerSubmit = (chosenIndex = selectedAnswer) => {
    if (isAnswerSubmitted || !activeQuestions || activeQuestions.length === 0) return;

    const currentQ = activeQuestions[currentQuestionIdx];
    if (!currentQ) return;
    const isCorrect = chosenIndex === currentQ.correct;

    setIsAnswerSubmitted(true);
    setTimerActive(false);
    setShowExplanation(true);

    let newStreak = streak;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreakInSession) {
        setMaxStreakInSession(newStreak);
      }
    } else {
      setStreak(0);
    }

    // Save history for final review
    setQuizReviewHistory((prev) => [
      ...prev,
      {
        question: currentQ.q,
        options: currentQ.a,
        userChoice: chosenIndex,
        correctChoice: currentQ.correct,
        isCorrect: isCorrect,
        explanation: currentQ.explanation
      }
    ]);
  };

  // Next Question / Finish Quiz
  const handleNextQuestion = () => {
    if (!activeQuestions || activeQuestions.length === 0) return;

    if (currentQuestionIdx + 1 < activeQuestions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShowExplanation(false);
      setShowHint(false);
      setHiddenOptions([]);
      setTimeLeft(20);
      setTimerActive(true);
    } else {
      // Quiz Finished
      const finalScore = score;
      const streakBonus = maxStreakInSession * 10;
      const calculatedXp = finalScore * 25 + streakBonus;
      const totalQ = activeQuestions.length;
      const accuracy = Math.round((finalScore / totalQ) * 100);

      setIsFinished(true);
      setXpGained(calculatedXp);

      // Save persistent stats in context & MongoDB
      recordQuizScore(selectedCategory, currentBand, finalScore, totalQ, accuracy);

      const newTotalXp = totalXp + calculatedXp;
      const newDoneCount = quizzesCompletedCount + 1;
      setTotalXp(newTotalXp);
      setQuizzesCompletedCount(newDoneCount);
      localStorage.setItem('user_xp', newTotalXp);
      localStorage.setItem('quizzes_done', newDoneCount);

      const currentStreak = parseInt(localStorage.getItem('user_streak') || '1');
      const updatedStreak = currentStreak + 1;
      setUserStreakDays(updatedStreak);
      localStorage.setItem('user_streak', updatedStreak);
    }
  };

  // Lifeline: 50:50
  const useFiftyFifty = () => {
    if (fiftyFiftyUsed || isAnswerSubmitted || !activeQuestions[currentQuestionIdx]) return;
    const currentQ = activeQuestions[currentQuestionIdx];
    const incorrectIndices = [0, 1, 2, 3].filter((idx) => idx !== currentQ.correct);
    const toHide = incorrectIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(toHide);
    setFiftyFiftyUsed(true);
  };

  // Lifeline: +15s Time Bonus
  const useTimeBonus = () => {
    if (timeBonusUsed || isAnswerSubmitted) return;
    setTimeLeft((prev) => prev + 15);
    setTimeBonusUsed(true);
  };

  // Lifeline: Hint
  const useHintLifeline = () => {
    if (hintUsed || isAnswerSubmitted) return;
    setShowHint(true);
    setHintUsed(true);
  };

  // Back to Subject Browser
  const resetToSubjects = () => {
    setSelectedCategory(null);
    setIsFinished(false);
    setTimerActive(false);
  };

  // Current question helper
  const currentQ = activeQuestions[currentQuestionIdx] || null;

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === 'all') return true;
    return cat.categoryGroup === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-4 sm:pt-6 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans text-slate-800">
      {/* Dynamic Background Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-blue-400/10 via-indigo-400/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ========================================================================= */}
        {/* VIEW 1: ACTIVE QUIZ WORKSPACE (When a category is active)                */}
        {/* ========================================================================= */}
        {selectedCategory ? (
          <div className="max-w-3xl mx-auto">
            {!isFinished ? (
              <div className="relative">
                {/* Upper Navigation & Stats Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-[0_4px_0_#E2E8F0,0_8px_16px_rgba(15,23,42,0.04)]">
                  {/* Back to Subjects */}
                  <button
                    onClick={resetToSubjects}
                    className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs shadow-xs active:translate-y-0.5 transition-all"
                  >
                    <LuRotateCcw className="text-sm" />
                    <span>Exit Quiz</span>
                  </button>

                  {/* Subject Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span>{selectedCategory} Mastery</span>
                  </div>

                  {/* Live Timer & Streak */}
                  <div className="flex items-center gap-3">
                    {/* Live Streak Counter */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold shadow-2xs">
                      <FaFire className="text-amber-500 animate-bounce text-sm" />
                      <span>{streak} Streak</span>
                    </div>

                    {/* Countdown Clock */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-black shadow-2xs transition-colors ${
                        timeLeft <= 5
                          ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <LuTimer className="text-sm" />
                      <span>{timeLeft}s</span>
                    </div>
                  </div>
                </div>

                {/* Main 3D Question Card */}
                <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-6 sm:p-9 shadow-[0_8px_0_#CBD5E1,0_20px_40px_rgba(15,23,42,0.07)] transition-all">
                  
                  {/* Syllabus / Band Context Line */}
                  <div className="mb-4 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-slate-500 font-medium">
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 mr-2">
                        {BAND_CONFIG[currentBand]?.name || currentBand}
                      </span>
                      <span>{getSyllabusDescription(selectedCategory, currentBand)}</span>
                    </div>
                  </div>

                  {/* Question Progress Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Question {currentQuestionIdx + 1} of {activeQuestions.length}
                    </span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      +{25} XP per correct
                    </span>
                  </div>

                  {/* 3D Progress Rail */}
                  <div className="w-full bg-slate-100 h-3 rounded-full mb-6 p-0.5 border border-slate-200 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 h-full rounded-full transition-all duration-300 shadow-sm"
                      style={{
                        width: `${((currentQuestionIdx + 1) / Math.max(1, activeQuestions.length)) * 100}%`
                      }}
                    />
                  </div>

                  {/* Student Lifelines / Power-ups Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider pl-1">
                      Power-Ups:
                    </span>
                    <div className="flex items-center gap-2">
                      {/* 50:50 Lifeline */}
                      <button
                        onClick={useFiftyFifty}
                        disabled={fiftyFiftyUsed || isAnswerSubmitted}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          fiftyFiftyUsed
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-[0_2px_0_#CBD5E1] active:translate-y-0.5'
                        }`}
                        title="Eliminate two wrong answers"
                      >
                        <LuZap className="text-xs text-indigo-600" />
                        <span>50:50 {fiftyFiftyUsed && '✓'}</span>
                      </button>

                      {/* +15s Time Lifeline */}
                      <button
                        onClick={useTimeBonus}
                        disabled={timeBonusUsed || isAnswerSubmitted}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          timeBonusUsed
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-[0_2px_0_#CBD5E1] active:translate-y-0.5'
                        }`}
                        title="Add 15 seconds to this question"
                      >
                        <FaClock className="text-xs text-emerald-600" />
                        <span>+15s {timeBonusUsed && '✓'}</span>
                      </button>

                      {/* Hint Lifeline */}
                      <button
                        onClick={useHintLifeline}
                        disabled={hintUsed || isAnswerSubmitted}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          hintUsed
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            : 'bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 shadow-[0_2px_0_#CBD5E1] active:translate-y-0.5'
                        }`}
                        title="Display an educational clue"
                      >
                        <FaQuestionCircle className="text-xs text-amber-600" />
                        <span>Hint {hintUsed && '✓'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Hint Banner (If activated) */}
                  {showHint && currentQ && (
                    <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-fadeIn">
                      <FaLightbulb className="text-amber-500 text-base shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-extrabold block text-amber-800">Study Clue:</strong>
                        <span>{currentQ.hint}</span>
                      </div>
                    </div>
                  )}

                  {/* The Question Text */}
                  {currentQ && (
                    <>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-900 tracking-tight mb-8 leading-snug">
                        {currentQ.q}
                      </h3>

                      {/* 3D Option Buttons Grid */}
                      <div className="space-y-3.5 mb-8">
                        {currentQ.a.map((option, idx) => {
                          const isHidden = hiddenOptions.includes(idx);
                          const isSelected = selectedAnswer === idx;
                          const isCorrect = idx === currentQ.correct;

                          // Style calculation based on quiz state
                          let buttonStyle = 'bg-white border-slate-200 text-slate-800 shadow-[0_4px_0_#CBD5E1] hover:border-blue-300 hover:shadow-[0_5px_0_#93C5FD] hover:-translate-y-0.5';
                          let letterTileStyle = 'bg-slate-100 text-slate-600 border-slate-200';

                          if (isHidden) {
                            buttonStyle = 'bg-slate-100 border-slate-200 text-slate-300 opacity-40 cursor-not-allowed shadow-none';
                            letterTileStyle = 'bg-slate-200 text-slate-400';
                          } else if (isAnswerSubmitted) {
                            if (isCorrect) {
                              buttonStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-[0_4px_0_#6EE7B7] translate-y-0.5 font-bold';
                              letterTileStyle = 'bg-emerald-600 text-white border-emerald-700';
                            } else if (isSelected && !isCorrect) {
                              buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900 shadow-[0_4px_0_#FDA4AF] translate-y-0.5 font-bold';
                              letterTileStyle = 'bg-rose-600 text-white border-rose-700';
                            } else {
                              buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 shadow-none opacity-60';
                            }
                          } else if (isSelected) {
                            buttonStyle = 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white shadow-[0_4px_0_#1E3A8A] translate-y-0.5';
                            letterTileStyle = 'bg-white/20 text-white border-white/40';
                          }

                          return (
                            <button
                              key={idx}
                              disabled={isHidden || isAnswerSubmitted}
                              onClick={() => handleOptionSelect(idx)}
                              className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer select-none active:translate-y-1 ${buttonStyle}`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                {/* Option Letter Tile */}
                                <span
                                  className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${letterTileStyle}`}
                                >
                                  {['A', 'B', 'C', 'D'][idx]}
                                </span>
                                <span className="truncate">{option}</span>
                              </div>

                              {/* Status Icon after submission */}
                              {isAnswerSubmitted && isCorrect && (
                                <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
                              )}
                              {isAnswerSubmitted && isSelected && !isCorrect && (
                                <FaTimesCircle className="text-rose-600 text-lg shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Educational Explanation Box (Shows after checking) */}
                      {showExplanation && (
                        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-xs animate-fadeIn">
                          <div className="flex items-center gap-2 mb-1.5">
                            <LuSparkles className="text-blue-600 text-base" />
                            <span className="text-xs font-black text-blue-900 uppercase tracking-wider">
                              Key Concept Takeaway
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                            {currentQ.explanation}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action Trigger Buttons Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-500">
                      {!isAnswerSubmitted ? (
                        <span>Select the best answer and click verify</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">Answer verified! Review and proceed</span>
                      )}
                    </div>

                    {!isAnswerSubmitted ? (
                      <button
                        onClick={() => handleAnswerSubmit()}
                        disabled={selectedAnswer === null}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 ${
                          selectedAnswer !== null
                            ? 'bg-gradient-to-b from-[#2F73F5] to-[#1E5AD6] hover:from-[#3D7DF7] hover:to-[#2563EB] text-white shadow-[0_5px_0_#1243A8,0_12px_24px_rgba(30,90,214,0.35)] active:translate-y-1 active:shadow-[0_2px_0_#1243A8] cursor-pointer'
                            : 'bg-slate-200 text-slate-400 border border-slate-300 shadow-none cursor-not-allowed'
                        }`}
                      >
                        <span>Check Answer</span>
                        <FaArrowRight className="text-xs" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-b from-[#2F73F5] to-[#1E5AD6] hover:from-[#3D7DF7] hover:to-[#2563EB] text-white font-black text-sm tracking-wide shadow-[0_5px_0_#1243A8,0_12px_24px_rgba(30,90,214,0.35)] active:translate-y-1 active:shadow-[0_2px_0_#1243A8] transition-all flex items-center justify-center gap-2.5"
                      >
                        <span>
                          {currentQuestionIdx + 1 < activeQuestions.length
                            ? 'Next Question'
                            : 'View Final Score'}
                        </span>
                        <FaArrowRight className="text-xs" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ) : (
              /* ========================================================================= */
              /* COMPLETED QUIZ SCORECARD & PERFORMANCE REVIEW                            */
              /* ========================================================================= */
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-10 shadow-[0_12px_0_#CBD5E1,0_24px_48px_rgba(15,23,42,0.08)] text-center animate-fadeIn">
                
                {/* 3D Trophy / Medal Banner */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-[0_6px_0_#B45309,0_12px_24px_rgba(245,158,11,0.35)] flex items-center justify-center text-4xl mx-auto mb-6 transform hover:scale-105 transition-transform">
                  <FaTrophy />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{BAND_CONFIG[currentBand]?.name || currentBand} Module Assessment Complete</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black font-poppins text-slate-900 tracking-tight mb-2">
                  {score === activeQuestions.length
                    ? 'Outstanding Mastery! 🏆'
                    : score >= 3
                    ? 'Great Performance! ⭐'
                    : 'Good Effort! Keep Practicing 💪'}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-8 font-medium">
                  You solved <strong className="text-blue-600">{score}</strong> out of{' '}
                  <strong className="text-slate-900">{activeQuestions.length}</strong> questions correctly in{' '}
                  <strong className="text-indigo-600">{selectedCategory}</strong> ({BAND_CONFIG[currentBand]?.name}).
                </p>

                {/* Score & XP Metrics 3D Blocks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto mb-8">
                  <div className="bg-blue-50/70 border border-blue-200/90 rounded-2xl p-4 text-center shadow-[0_3px_0_#BFDBFE]">
                    <span className="text-[10px] font-extrabold uppercase text-blue-500 tracking-wider block">Accuracy</span>
                    <span className="text-2xl font-black text-blue-700 mt-1 block">
                      {Math.round((score / Math.max(1, activeQuestions.length)) * 100)}%
                    </span>
                  </div>

                  <div className="bg-purple-50/70 border border-purple-200/90 rounded-2xl p-4 text-center shadow-[0_3px_0_#DDD6FE]">
                    <span className="text-[10px] font-extrabold uppercase text-purple-500 tracking-wider block">XP Awarded</span>
                    <span className="text-2xl font-black text-purple-700 mt-1 block">+{xpGained} XP</span>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 text-center shadow-[0_3px_0_#FDE68A]">
                    <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-wider block">Max Streak</span>
                    <span className="text-2xl font-black text-amber-700 mt-1 block">🔥 {maxStreakInSession}</span>
                  </div>

                  <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 text-center shadow-[0_3px_0_#A7F3D0]">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-500 tracking-wider block">Saved To</span>
                    <span className="text-base font-black text-emerald-700 mt-1.5 block">MongoDB Profile</span>
                  </div>
                </div>

                {/* Detailed Review Section */}
                <div className="text-left max-w-xl mx-auto mb-8">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <LuSparkles className="text-blue-600" />
                    <span>Review Questions & Answers</span>
                  </h4>
                  <div className="space-y-3">
                    {quizReviewHistory.map((item, rIdx) => (
                      <div
                        key={rIdx}
                        className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                          item.isCorrect
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/70 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-start gap-2 font-bold mb-1">
                          {item.isCorrect ? (
                            <FaCheckCircle className="text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <FaTimesCircle className="text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <span>{item.question}</span>
                        </div>
                        <div className="pl-5 text-slate-600 text-[11px] mt-1">
                          <strong>Your Answer:</strong> {item.userChoice >= 0 ? item.options[item.userChoice] : 'Timed Out'} |{' '}
                          <strong className="text-emerald-700">Correct:</strong> {item.options[item.correctChoice]}
                        </div>
                        <div className="pl-5 text-slate-500 text-[11px] mt-1 italic">
                          💡 {item.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => startQuiz(selectedCategory)}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-b from-[#2F73F5] to-[#1E5AD6] hover:from-[#3D7DF7] hover:to-[#2563EB] text-white font-extrabold text-sm shadow-[0_5px_0_#1243A8,0_10px_20px_rgba(30,90,214,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#1243A8] transition-all"
                  >
                    <FaRedo className="text-xs" />
                    <span>Retry Quiz</span>
                  </button>

                  <button
                    onClick={resetToSubjects}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-sm shadow-[0_4px_0_#E2E8F0] active:translate-y-1 active:shadow-[0_1px_0_#E2E8F0] transition-all"
                  >
                    <span>Browse All Subjects</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>

              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: SUBJECTS BROWSER (Category Selection with 3D Cards)               */
          /* ========================================================================= */
          <div>
            {/* High-Impact Student Landing Hero Showcase */}
            <div className="relative rounded-[32px] bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 border-2 border-blue-100/90 p-5 sm:p-8 lg:p-10 mb-8 shadow-[0_20px_45px_-12px_rgba(37,99,235,0.12),0_5px_0_#DBEAFE] overflow-hidden">
              
              {/* Ambient Glowing Background Elements */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-cyan-400/15 via-teal-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Center Header Details */}
              <div className="relative z-10 max-w-4xl mx-auto text-center mb-6 sm:mb-8">
                {/* Live Pulse Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/90 shadow-2xs mb-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  <LuSparkles className="text-sm text-blue-600" />
                  <span>Next-Gen Adaptive Assessment Lab</span>
                </div>

                {/* Grand Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-poppins leading-tight mb-2.5">
                  Adaptive Knowledge <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzes</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-4">
                  Gamified curriculum assessments, rapid speed drills, and instant educational explanations designed to sharpen memory, boost recall, and accelerate your academic test scores.
                </p>

                {/* Student Feature Highlights Row */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs">
                    <span className="text-amber-500">⚡</span> 20s Speed Rounds
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs">
                    <span className="text-blue-500">💡</span> 50:50 &amp; Study Clues
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs">
                    <span className="text-emerald-500">🎯</span> Instant Explanations
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs">
                    <span className="text-purple-500">🏆</span> XP Rewards &amp; Ranks
                  </span>
                </div>
              </div>

              {/* Informative & 3D Student Live Stats Dashboard */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
                
                {/* 1. Total XP Card */}
                <div className="group relative bg-gradient-to-b from-[#EFF6FF] via-[#F4F8FF] to-[#DBEAFE] rounded-2xl p-4 sm:p-5 border border-blue-200/90 shadow-[0_4px_0_#BFDBFE,0_10px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_6px_0_#93C5FD,0_16px_28px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white shadow-[0_3px_0_#1E40AF] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      <LuTrophy />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-2xs">
                      XP Rank
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider block">
                      Total Experience
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight block mt-0.5">
                      {totalXp} <span className="text-sm font-bold text-blue-600">XP</span>
                    </span>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-blue-200/70 flex items-center justify-between text-[11px] font-bold text-blue-800">
                    <span>Rank Status</span>
                    <span className="bg-white/90 px-2 py-0.5 rounded-md border border-blue-200">Level 2 Scholar</span>
                  </div>
                </div>

                {/* 2. Daily Streak Card */}
                <div className="group relative bg-gradient-to-b from-[#FFFBEB] via-[#FEFDF5] to-[#FEF3C7] rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-[0_4px_0_#FDE68A,0_10px_20px_rgba(217,119,6,0.06)] hover:shadow-[0_6px_0_#FCD34D,0_16px_28px_rgba(217,119,6,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500 text-white shadow-[0_3px_0_#B45309] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      <LuFlame className="animate-pulse" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white shadow-2xs">
                      Streak Active
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider block">
                      Study Consistency
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight block mt-0.5">
                      {userStreakDays} <span className="text-sm font-bold text-amber-600">Days 🔥</span>
                    </span>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-amber-200/70 flex items-center justify-between text-[11px] font-bold text-amber-800">
                    <span>Reward Multiplier</span>
                    <span className="bg-white/90 px-2 py-0.5 rounded-md border border-amber-200">2X Boost</span>
                  </div>
                </div>

                {/* 3. Completed Quizzes Card */}
                <div className="group relative bg-gradient-to-b from-[#FAF5FF] via-[#FAF5FF] to-[#EDE9FE] rounded-2xl p-4 sm:p-5 border border-purple-200/90 shadow-[0_4px_0_#DDD6FE,0_10px_20px_rgba(147,51,234,0.06)] hover:shadow-[0_6px_0_#C4B5FD,0_16px_28px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-purple-600 text-white shadow-[0_3px_0_#6B21A8] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      <LuZap />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-600 text-white shadow-2xs">
                      Curriculum
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-purple-600 uppercase tracking-wider block">
                      Quizzes Solved
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight block mt-0.5">
                      {quizzesCompletedCount} <span className="text-sm font-bold text-purple-600">Modules</span>
                    </span>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-purple-200/70 flex items-center justify-between text-[11px] font-bold text-purple-800">
                    <span>Accuracy Rate</span>
                    <span className="bg-white/90 px-2 py-0.5 rounded-md border border-purple-200">92% Avg</span>
                  </div>
                </div>

                {/* 4. Mastery Tier Card */}
                <div className="group relative bg-gradient-to-b from-[#ECFDF5] via-[#F4FBF7] to-[#D1FAE5] rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-[0_4px_0_#A7F3D0,0_10px_20px_rgba(16,185,129,0.06)] hover:shadow-[0_6px_0_#6EE7B7,0_16px_28px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white shadow-[0_3px_0_#065F46] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      <FaAward />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                      Global
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                      Global Standing
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight block mt-0.5">
                      Scholar <span className="text-sm font-bold text-emerald-600">II</span>
                    </span>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-emerald-200/70 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                    <span>Student Rank</span>
                    <span className="bg-white/90 px-2 py-0.5 rounded-md border border-emerald-200">Top 15%</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Daily Blitz Featured Challenge Card */}
            <div className="relative rounded-3xl p-6 sm:p-7 mb-10 overflow-hidden border-2 border-blue-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-[0_8px_0_#1E3A8A,0_20px_40px_rgba(37,99,235,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2.5">
                  <FaStar className="text-amber-300 text-xs" />
                  <span>Daily Brain Blitz • 2X XP Active</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-poppins tracking-tight mb-2">
                  Today's Rapid Cognitive Challenge
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
                  Boost your logical reaction speed with 5 high-speed cross-discipline questions. Complete before midnight for double streak multipliers!
                </p>
              </div>

              <button
                onClick={() => startQuiz('Logical Reasoning')}
                className="cursor-pointer shrink-0 px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-blue-700 font-black text-sm sm:text-base shadow-[0_4px_0_#CBD5E1,0_10px_20px_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-[0_1px_0_#CBD5E1] transition-all flex items-center gap-3 group"
              >
                <span>Launch Blitz Challenge</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Curriculum Band Selector Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-indigo-100 shadow-[0_4px_0_#EEF2FF,0_10px_20px_rgba(79,70,229,0.06)] mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaGraduationCap className="text-indigo-600 text-lg" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                      Adaptive Class Syllabus
                    </span>
                    {user && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 border border-indigo-200 text-indigo-800">
                        {user.class} • Age {user.age}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Currently Selected: <span className="text-indigo-600">{BAND_CONFIG[currentBand]?.name}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 ml-2">
                      ({BAND_CONFIG[currentBand]?.classes}, Age {BAND_CONFIG[currentBand]?.ageRange})
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Questions, syllabus topics, and difficulty automatically adapt to this band based on Section 4 of the guidelines.
                  </p>
                </div>

                {/* Band Selector Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  {Object.values(BANDS).map((b) => (
                    <button
                      key={b}
                      onClick={() => setCurrentBand(b)}
                      className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                        currentBand === b
                          ? 'bg-indigo-600 text-white shadow-[0_2px_0_#3730A3]'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {BAND_CONFIG[b]?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { id: 'all', label: 'All Subjects (8)' },
                { id: 'stem', label: 'STEM (Math & Science)' },
                { id: 'humanities', label: 'Humanities & GK' },
                { id: 'logic', label: 'Logic & Computing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`cursor-pointer px-4.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === tab.id
                      ? 'bg-blue-600 text-white shadow-[0_3px_0_#1E3A8A] translate-y-0'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_#E2E8F0] hover:-translate-y-0.5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3D Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((cat, idx) => {
                const Icon = cat.icon;
                const bandSyllabus = getSyllabusDescription(cat.name, currentBand);

                return (
                  <div
                    key={idx}
                    className={`group relative ${cat.colorTheme.cardBg} rounded-3xl p-6 sm:p-7 border ${cat.colorTheme.border} ${cat.colorTheme.shadow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                  >
                    {/* Top ambient glow */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/40 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-300" />

                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-13 h-13 rounded-2xl ${cat.colorTheme.iconTile} flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200`}
                        >
                          <Icon />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs ${cat.colorTheme.badgeBg}`}
                        >
                          +{cat.xpReward} XP
                        </span>
                      </div>

                      {/* Subject Name */}
                      <h3 className="text-xl font-black font-poppins text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {cat.name}
                      </h3>

                      {/* Band-tailored Syllabus Topic */}
                      <div className="text-[11px] bg-white/80 p-2.5 rounded-xl border border-slate-200/80 text-slate-700 font-medium mb-3 shadow-2xs">
                        <span className="font-extrabold text-indigo-700 block text-[10px] uppercase tracking-wider mb-0.5">
                          {BAND_CONFIG[currentBand]?.name} Syllabus:
                        </span>
                        <span>{bandSyllabus}</span>
                      </div>

                      {/* Micro Curriculum Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {cat.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-lg border ${cat.colorTheme.tagBg}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3D "Start Practice" Button */}
                    <button
                      onClick={() => startQuiz(cat.name, currentBand)}
                      className={`cursor-pointer w-full py-3.5 px-4 rounded-2xl text-white font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 active:translate-y-1 active:shadow-none ${cat.colorTheme.btnGradient} ${cat.colorTheme.btnShadow}`}
                    >
                      <FaPlay className="text-[10px]" />
                      <span>Start Practice</span>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default QuizZone;
