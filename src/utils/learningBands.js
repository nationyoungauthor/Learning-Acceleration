/**
 * Learning Acceleration - Age & Class-Based Brain Training & Adaptive Quiz Framework
 * Implements the official specification from Learning_Acceleration_Age_Class_Game_Quiz_Guide.pdf
 */

export const BANDS = {
  FOUNDATION: 'Foundation',
  EARLY_PRIMARY: 'Early Primary',
  PRIMARY: 'Primary',
  MIDDLE: 'Middle',
  SECONDARY: 'Secondary',
  SENIOR_SECONDARY: 'Senior Secondary',
  EXTENDED: 'Extended/Adult'
};

export const BAND_CONFIG = {
  [BANDS.FOUNDATION]: {
    name: BANDS.FOUNDATION,
    displayName: 'Foundation (Class 1–2)',
    classes: ['1', '2', 'Class 1', 'Class 2', 'Class 1st', 'Class 2nd', 'Grade 1', 'Grade 2'],
    typicalAge: [5, 6],
    ageRangeLabel: 'Ages 5–6',
    classRangeLabel: 'Class 1–2',
    gameDifficultyDesc: 'Very short rounds; visual/audio cues; simple 1-step patterns; low pressure.',
    quizDifficultyDesc: 'Basic counting, shapes, colors, everyday vocabulary, simple environment.',
    defaultDifficulty: 'Easy',
    recommendedGames: [
      'visual-memory',
      'color-memory',
      'memory-match',
      'number-memory',
      'sequence-memory',
      'color-target',
      '5-second-test'
    ],
    colorTheme: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pillBg: 'from-emerald-500 to-teal-600',
      accent: '#059669',
      border: 'border-emerald-200'
    }
  },
  [BANDS.EARLY_PRIMARY]: {
    name: BANDS.EARLY_PRIMARY,
    displayName: 'Early Primary (Class 3–4)',
    classes: ['3', '4', 'Class 3', 'Class 4', 'Class 3rd', 'Class 4th', 'Grade 3', 'Grade 4'],
    typicalAge: [7, 8],
    ageRangeLabel: 'Ages 7–8',
    classRangeLabel: 'Class 3–4',
    gameDifficultyDesc: 'Short sequences; matching; simple word and number memory; gentle speed.',
    quizDifficultyDesc: 'Addition/subtraction, basic science, English vocabulary/grammar, simple GK.',
    defaultDifficulty: 'Easy',
    recommendedGames: [
      'sequence-memory',
      'visual-memory',
      'word-memory',
      'number-memory',
      'memory-match',
      'color-memory',
      'number-sequence',
      'odd-one-out',
      'word-scramble',
      'color-target',
      'one-to-fifty'
    ],
    colorTheme: {
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      pillBg: 'from-cyan-500 to-blue-600',
      accent: '#0284C7',
      border: 'border-cyan-200'
    }
  },
  [BANDS.PRIMARY]: {
    name: BANDS.PRIMARY,
    displayName: 'Primary (Class 5–6)',
    classes: ['5', '6', 'Class 5', 'Class 6', 'Class 5th', 'Class 6th', 'Grade 5', 'Grade 6'],
    typicalAge: [9, 10],
    ageRangeLabel: 'Ages 9–10',
    classRangeLabel: 'Class 5–6',
    gameDifficultyDesc: 'Longer recall; 2-step patterns; moderate focus and logic; timed rounds optional.',
    quizDifficultyDesc: 'Multiplication/division, fractions intro, science concepts, reading comprehension, geography/history basics.',
    defaultDifficulty: 'Easy',
    recommendedGames: [
      'seen-number-memory',
      'number-memory',
      'number-sequence',
      'chimp-test',
      'pattern-logic',
      'stroop-test',
      'speed-math',
      'word-scramble',
      'association-learning',
      'sum-finder',
      'one-to-fifty',
      '5-second-test',
      'time-estimator'
    ],
    colorTheme: {
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      pillBg: 'from-blue-600 to-indigo-600',
      accent: '#2563EB',
      border: 'border-blue-200'
    }
  },
  [BANDS.MIDDLE]: {
    name: BANDS.MIDDLE,
    displayName: 'Middle (Class 7–8)',
    classes: ['7', '8', 'Class 7', 'Class 8', 'Class 7th', 'Class 8th', 'Grade 7', 'Grade 8'],
    typicalAge: [11, 12],
    ageRangeLabel: 'Ages 11–12',
    classRangeLabel: 'Class 7–8',
    gameDifficultyDesc: 'More complex patterns; multi-step logic; strategic memory; quicker rounds.',
    quizDifficultyDesc: 'Maths problem solving, science, grammar, reasoning, history/geography/computer basics.',
    defaultDifficulty: 'Standard',
    recommendedGames: [
      'chimp-test',
      'seen-number-memory',
      'number-sequence',
      'pattern-logic',
      'stroop-test',
      'one-to-fifty',
      'speed-math',
      'sum-finder',
      'association-learning',
      'word-scramble',
      'time-estimator',
      'perfect-circle',
      'inverted-mouse',
      'emotion-reading'
    ],
    colorTheme: {
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      pillBg: 'from-indigo-600 to-violet-600',
      accent: '#4F46E5',
      border: 'border-indigo-200'
    }
  },
  [BANDS.SECONDARY]: {
    name: BANDS.SECONDARY,
    displayName: 'Secondary (Class 9–10)',
    classes: ['9', '10', 'Class 9', 'Class 10', 'Class 9th', 'Class 10th', 'Grade 9', 'Grade 10'],
    typicalAge: [13, 14],
    ageRangeLabel: 'Ages 13–14',
    classRangeLabel: 'Class 9–10',
    gameDifficultyDesc: 'Harder Stroop/logic/sequence; sustained attention; mixed challenges.',
    quizDifficultyDesc: 'Algebra/geometry, physics/chemistry/biology foundations, analytical English, GK/current concepts.',
    defaultDifficulty: 'Standard',
    recommendedGames: [
      'chimp-test',
      'pattern-logic',
      'stroop-test',
      'speed-math',
      'sum-finder',
      'number-sequence',
      'one-to-fifty',
      'association-learning',
      'impromptu-pitch',
      'emotion-reading',
      'time-estimator',
      'perfect-circle',
      'inverted-mouse'
    ],
    colorTheme: {
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      pillBg: 'from-purple-600 to-fuchsia-600',
      accent: '#9333EA',
      border: 'border-purple-200'
    }
  },
  [BANDS.SENIOR_SECONDARY]: {
    name: BANDS.SENIOR_SECONDARY,
    displayName: 'Senior Secondary (Class 11–12)',
    classes: ['11', '12', 'Class 11', 'Class 12', 'Class 11th', 'Class 12th', 'Grade 11', 'Grade 12'],
    typicalAge: [15, 17],
    ageRangeLabel: 'Ages 15–17',
    classRangeLabel: 'Class 11–12',
    gameDifficultyDesc: 'Advanced difficulty; precision, longer challenges, adaptive levels.',
    quizDifficultyDesc: 'Class 11–12 subject depth; Maths, science, English, GK, logic, history/geography/computer.',
    defaultDifficulty: 'Challenge',
    recommendedGames: [
      'chimp-test',
      'pattern-logic',
      'stroop-test',
      'speed-math',
      'impromptu-pitch',
      'emotion-reading',
      'association-learning',
      'perfect-circle',
      'inverted-mouse',
      'time-estimator',
      'number-sequence',
      'sum-finder',
      'seen-number-memory',
      'word-memory',
      'one-to-fifty',
      'sequence-memory',
      'visual-memory',
      'number-memory',
      'memory-match',
      'color-memory',
      'word-scramble'
    ],
    colorTheme: {
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      pillBg: 'from-rose-600 to-red-600',
      accent: '#E11D48',
      border: 'border-rose-200'
    }
  },
  [BANDS.EXTENDED]: {
    name: BANDS.EXTENDED,
    displayName: 'Extended / Adult Track (Age 18–20)',
    classes: [
      '12+', 'Class 12 Completed', 'Class 12 Completed / Extended Track',
      'Extended Track', 'Non-School Track', 'Adult', 'College', 'Completed', 'None'
    ],
    typicalAge: [18, 20],
    ageRangeLabel: 'Ages 18–20',
    classRangeLabel: 'Class 12 Completed / Extended',
    gameDifficultyDesc: 'Advanced/Expert modes; longer tasks, personal bests, and challenge streaks.',
    quizDifficultyDesc: 'Advanced mixed quizzes, aptitude, reasoning, computer and general knowledge; not school-class curriculum.',
    defaultDifficulty: 'Challenge',
    recommendedGames: [
      'sequence-memory',
      'visual-memory',
      'word-memory',
      'seen-number-memory',
      'number-memory',
      'number-sequence',
      'memory-match',
      'color-memory',
      'chimp-test',
      'pattern-logic',
      'stroop-test',
      'color-target',
      'one-to-fifty',
      'word-scramble',
      'speed-math',
      '5-second-test',
      'time-estimator',
      'inverted-mouse',
      'perfect-circle',
      'association-learning',
      'odd-one-out',
      'sum-finder',
      'emotion-reading',
      'impromptu-pitch'
    ],
    colorTheme: {
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      pillBg: 'from-amber-600 to-orange-600',
      accent: '#D97706',
      border: 'border-amber-200'
    }
  }
};

/**
 * 9 Standard Game Categories defined in Section 1 of the Guide
 */
export const GAME_CATEGORIES = [
  {
    id: 'memory-recall',
    name: 'Memory & Recall',
    skillFocus: 'Remember sequences, images, words, numbers and colors.',
    games: [
      'sequence-memory', 'visual-memory', 'word-memory',
      'seen-number-memory', 'number-memory', 'memory-match', 'color-memory'
    ]
  },
  {
    id: 'attention-focus',
    name: 'Attention & Focus',
    skillFocus: 'Focus, selective attention, quick visual scanning and response.',
    games: ['chimp-test', 'one-to-fifty', 'color-target', 'stroop-test', '5-second-test']
  },
  {
    id: 'logic-pattern',
    name: 'Logic & Pattern Recognition',
    skillFocus: 'Find rules, relationships, patterns and solve structured problems.',
    games: ['number-sequence', 'pattern-logic', 'odd-one-out', 'sum-finder']
  },
  {
    id: 'speed-calculation',
    name: 'Speed & Mental Calculation',
    skillFocus: 'Mental arithmetic and processing speed.',
    games: ['speed-math']
  },
  {
    id: 'language-vocabulary',
    name: 'Language & Vocabulary',
    skillFocus: 'Vocabulary, word relationships and flexible thinking.',
    games: ['word-scramble', 'association-learning']
  },
  {
    id: 'planning-motor',
    name: 'Planning & Motor Control',
    skillFocus: 'Coordination, controlled movement, planning and precision.',
    games: ['inverted-mouse', 'perfect-circle']
  },
  {
    id: 'estimation-time',
    name: 'Estimation & Time Awareness',
    skillFocus: 'Estimate duration and develop time sense.',
    games: ['time-estimator']
  },
  {
    id: 'emotion-social',
    name: 'Emotion & Social Understanding',
    skillFocus: 'Recognize facial/emotional cues and interpret social signals.',
    games: ['emotion-reading']
  },
  {
    id: 'creative-communication',
    name: 'Creative Thinking & Communication',
    skillFocus: 'Generate ideas, organize thoughts and express them clearly.',
    games: ['impromptu-pitch']
  }
];

/**
 * Clean canonical game catalog with complete category, band, and route metadata
 */
export const ALL_GAMES_METADATA = [
  // 1. Memory & Recall
  {
    id: 'sequence-memory',
    title: 'Sequence Memory',
    path: '/games/sequence-memory',
    category: 'Memory & Recall',
    iconName: 'FaListOl',
    color: '#3B82F6',
    desc: 'Remember an increasingly long pattern of button presses.',
    bands: [BANDS.FOUNDATION, BANDS.EARLY_PRIMARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'visual-memory',
    title: 'Visual Memory',
    path: '/games/visual-memory',
    category: 'Memory & Recall',
    iconName: 'FaLightbulb',
    color: '#EAB308',
    desc: 'Remember patterns of tiles and recall them precisely.',
    bands: [BANDS.FOUNDATION, BANDS.EARLY_PRIMARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'word-memory',
    title: 'Word Memory',
    path: '/games/word-memory',
    category: 'Memory & Recall',
    iconName: 'FaFont',
    color: '#6366F1',
    desc: 'Identify which words you have seen before and which are new.',
    bands: [BANDS.EARLY_PRIMARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'seen-number-memory',
    title: 'Seen Number Memory',
    path: '/games/seen-number-memory',
    category: 'Memory & Recall',
    iconName: 'FaCheckSquare',
    color: '#10B981',
    desc: 'Determine if you have seen a given number earlier.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'number-memory',
    title: 'Number Memory',
    path: '/games/number-memory',
    category: 'Memory & Recall',
    iconName: 'FaSortNumericDown',
    color: '#EC4899',
    desc: 'Memorize and recall increasingly longer number sequences.',
    bands: [BANDS.FOUNDATION, BANDS.EARLY_PRIMARY, BANDS.PRIMARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    path: '/games/memory-match',
    category: 'Memory & Recall',
    iconName: 'FaPuzzlePiece',
    color: '#A855F7',
    desc: 'Test your visual recall by matching pairs of hidden icons.',
    bands: [BANDS.FOUNDATION, BANDS.EARLY_PRIMARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'color-memory',
    title: 'Color Memory',
    path: '/games/color-memory',
    category: 'Memory & Recall',
    iconName: 'FaPalette',
    color: '#EF4444',
    desc: 'Remember the previous color and identify if the new one matches.',
    bands: [BANDS.FOUNDATION, BANDS.EARLY_PRIMARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 2. Attention & Focus
  {
    id: 'chimp-test',
    title: 'Chimp Test',
    path: '/games/chimp-test',
    category: 'Attention & Focus',
    iconName: 'FaBrain',
    color: '#F97316',
    desc: 'Remember numbers and click them in ascending order once hidden.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'one-to-fifty',
    title: 'One to Fifty',
    path: '/games/one-to-fifty',
    category: 'Attention & Focus',
    iconName: 'FaSortNumericDown',
    color: '#10B981',
    desc: 'Click numbers 1 through 50 in order as quickly as possible.',
    bands: [BANDS.EARLY_PRIMARY, BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'color-target',
    title: 'Color Target',
    path: '/games/color-target',
    category: 'Attention & Focus',
    iconName: 'FaCrosshairs',
    color: '#3B82F6',
    desc: 'Click the targeted color as fast as possible upon prompt.',
    bands: [BANDS.FOUNDATION, BANDS.EARLY_PRIMARY, BANDS.EXTENDED]
  },
  {
    id: 'stroop-test',
    title: 'Stroop Test',
    path: '/games/stroop-test',
    category: 'Attention & Focus',
    iconName: 'FaPalette',
    color: '#EF4444',
    desc: 'Identify the ink color of the text, ignoring the word written.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: '5-second-test',
    title: '5-Second Test',
    path: '/games/5-second-test',
    category: 'Attention & Focus',
    iconName: 'FaStopwatch',
    color: '#F43F5E',
    desc: 'Train motor precision by stopping the timer at exactly 5 seconds.',
    bands: [BANDS.FOUNDATION, BANDS.PRIMARY, BANDS.EXTENDED]
  },

  // 3. Logic & Pattern Recognition
  {
    id: 'number-sequence',
    title: 'Number Sequence',
    path: '/games/number-sequence',
    category: 'Logic & Pattern Recognition',
    iconName: 'FaSortNumericDown',
    color: '#14B8A6',
    desc: 'Find sequence patterns and predict next numerical values.',
    bands: [BANDS.EARLY_PRIMARY, BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'pattern-logic',
    title: 'Pattern Logic',
    path: '/games/pattern-logic',
    category: 'Logic & Pattern Recognition',
    iconName: 'FaMagic',
    color: '#8B5CF6',
    desc: 'Detect hidden matrix relationships and solve structured spatial rules.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    path: '/games/odd-one-out',
    category: 'Logic & Pattern Recognition',
    iconName: 'FaEye',
    color: '#059669',
    desc: 'Spot the anomalous visual element under ticking time pressure.',
    bands: [BANDS.EARLY_PRIMARY, BANDS.EXTENDED]
  },
  {
    id: 'sum-finder',
    title: 'Sum Finder',
    path: '/games/sum-finder',
    category: 'Logic & Pattern Recognition',
    iconName: 'FaCalculator',
    color: '#EA580C',
    desc: 'Select grid cells that dynamically add up to a requested sum.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 4. Speed & Mental Calculation
  {
    id: 'speed-math',
    title: 'Speed Math',
    path: '/games/speed-math',
    category: 'Speed & Mental Calculation',
    iconName: 'FaKeyboard',
    color: '#F59E0B',
    desc: 'Rapid arithmetic processing drills for maximum mental speed.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 5. Language & Vocabulary
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    path: '/games/word-scramble',
    category: 'Language & Vocabulary',
    iconName: 'FaLanguage',
    color: '#6366F1',
    desc: 'Re-order anagrams and letters to discover correct vocabulary words.',
    bands: [BANDS.EARLY_PRIMARY, BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'association-learning',
    title: 'Association Learning',
    path: '/games/association-learning',
    category: 'Language & Vocabulary',
    iconName: 'FaGraduationCap',
    color: '#2563EB',
    desc: 'Memorize paired concepts and build rapid mnemonic links.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 6. Planning & Motor Control
  {
    id: 'inverted-mouse',
    title: 'Inverted Mouse',
    path: '/games/inverted-mouse',
    category: 'Planning & Motor Control',
    iconName: 'FaMousePointer',
    color: '#64748B',
    desc: 'Navigate tricky mazes with reversed spatial coordinates.',
    bands: [BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },
  {
    id: 'perfect-circle',
    title: 'Perfect Circle',
    path: '/games/perfect-circle',
    category: 'Planning & Motor Control',
    iconName: 'FaCircle',
    color: '#38BDF8',
    desc: 'Draw a freehand circle and measure geometric smoothness & precision.',
    bands: [BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 7. Estimation & Time Awareness
  {
    id: 'time-estimator',
    title: 'Time Estimator',
    path: '/games/time-estimator',
    category: 'Estimation & Time Awareness',
    iconName: 'FaClock',
    color: '#F97316',
    desc: 'Calibrate your internal biological clock by timing silent intervals.',
    bands: [BANDS.PRIMARY, BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 8. Emotion & Social Understanding
  {
    id: 'emotion-reading',
    title: 'Emotion Reading',
    path: '/games/emotion-reading',
    category: 'Emotion & Social Understanding',
    iconName: 'FaSmile',
    color: '#DB2777',
    desc: 'Decode subtle facial expressions, micro-signals, and social moods.',
    bands: [BANDS.MIDDLE, BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  },

  // 9. Creative Thinking & Communication
  {
    id: 'impromptu-pitch',
    title: 'Impromptu Pitch',
    path: '/games/impromptu-pitch',
    category: 'Creative Thinking & Communication',
    iconName: 'FaMicrophone',
    color: '#7C3AED',
    desc: 'Structure spontaneous speaking frameworks and eliminate filler words.',
    bands: [BANDS.SECONDARY, BANDS.SENIOR_SECONDARY, BANDS.EXTENDED]
  }
];

/**
 * Standard class options list for registration & profile selection
 */
export const CLASS_OPTIONS = [
  { value: 'Class 1', label: 'Class 1 (Age ~5–6)', band: BANDS.FOUNDATION },
  { value: 'Class 2', label: 'Class 2 (Age ~5–6)', band: BANDS.FOUNDATION },
  { value: 'Class 3', label: 'Class 3 (Age ~7–8)', band: BANDS.EARLY_PRIMARY },
  { value: 'Class 4', label: 'Class 4 (Age ~7–8)', band: BANDS.EARLY_PRIMARY },
  { value: 'Class 5', label: 'Class 5 (Age ~9–10)', band: BANDS.PRIMARY },
  { value: 'Class 6', label: 'Class 6 (Age ~9–10)', band: BANDS.PRIMARY },
  { value: 'Class 7', label: 'Class 7 (Age ~11–12)', band: BANDS.MIDDLE },
  { value: 'Class 8', label: 'Class 8 (Age ~11–12)', band: BANDS.MIDDLE },
  { value: 'Class 9', label: 'Class 9 (Age ~13–14)', band: BANDS.SECONDARY },
  { value: 'Class 10', label: 'Class 10 (Age ~13–14)', band: BANDS.SECONDARY },
  { value: 'Class 11', label: 'Class 11 (Age ~15–17)', band: BANDS.SENIOR_SECONDARY },
  { value: 'Class 12', label: 'Class 12 (Age ~15–17)', band: BANDS.SENIOR_SECONDARY },
  { value: 'Class 12 Completed / Extended Track', label: 'Class 12 Completed / Extended Track (Age 18–20)', band: BANDS.EXTENDED }
];

/**
 * Extract numerical or normalized class identifier from any student class string
 * Handles formats: "Class 7", "7th", "Grade 7", "Class 12 Completed", etc.
 */
export function normalizeStudentClass(classInput) {
  if (!classInput) return 'Class 7';
  const str = String(classInput).trim().toLowerCase();

  if (
    str.includes('completed') ||
    str.includes('extended') ||
    str.includes('adult') ||
    str.includes('12+') ||
    str.includes('college')
  ) {
    return 'Class 12 Completed / Extended Track';
  }

  // Extract digits
  const match = str.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    if (num >= 1 && num <= 12) {
      return `Class ${num}`;
    }
  }

  return 'Class 7';
}

/**
 * Get all recommended game metadata objects for a given learning band
 * @param {string} band - One of BANDS
 * @returns {Array<Object>}
 */
export function getRecommendedGamesForBand(band) {
  return ALL_GAMES_METADATA.filter(game => game.bands.includes(band));
}

/**
 * Determine recommended learning band using Class as primary signal and Age as secondary check.
 * Strictly adheres to Section 2 & 6 of the Guide.
 * 
 * @param {string|number} studentClass - Student's declared school class
 * @param {number} studentAge - Student's age (between 5 and 20)
 * @returns {Object} Complete band resolution details
 */
export function getStudentLearningBand(studentClass, studentAge) {
  const normClass = normalizeStudentClass(studentClass);
  const age = parseInt(studentAge, 10) || 12;

  let resolvedBand = BANDS.MIDDLE;

  // Primary signal: School Class
  if (normClass.includes('Completed') || normClass.includes('Extended')) {
    resolvedBand = BANDS.EXTENDED;
  } else {
    const digitMatch = normClass.match(/\d+/);
    const classNum = digitMatch ? parseInt(digitMatch[0], 10) : 7;

    if (classNum <= 2) {
      resolvedBand = BANDS.FOUNDATION;
    } else if (classNum <= 4) {
      resolvedBand = BANDS.EARLY_PRIMARY;
    } else if (classNum <= 6) {
      resolvedBand = BANDS.PRIMARY;
    } else if (classNum <= 8) {
      resolvedBand = BANDS.MIDDLE;
    } else if (classNum <= 10) {
      resolvedBand = BANDS.SECONDARY;
    } else if (classNum <= 12) {
      resolvedBand = BANDS.SENIOR_SECONDARY;
    }
  }

  // Age override safeguard for 18-20 non-school track if class is not specified or completed
  if (age >= 18 && (!studentClass || normClass.includes('Completed') || normClass.includes('Extended'))) {
    resolvedBand = BANDS.EXTENDED;
  }

  const bandConfig = BAND_CONFIG[resolvedBand];

  // Secondary check: Age vs typical class band check
  const [minAge, maxAge] = bandConfig.typicalAge;
  const isMismatch = age < minAge || age > maxAge;

  let mismatchMessage = null;
  if (isMismatch) {
    mismatchMessage = `Your age and class are a little different from the usual range. Continue with ${normClass} content?`;
  }

  // Filter recommended games for this band
  const recommendedGames = ALL_GAMES_METADATA.filter(game =>
    game.bands.includes(resolvedBand)
  );

  return {
    band: resolvedBand,
    config: bandConfig,
    studentClass: normClass,
    studentAge: age,
    isMismatch,
    isMismatched: isMismatch,
    mismatchMessage,
    warningMessage: mismatchMessage,
    recommendedGames,
    recommendedGameIds: bandConfig.recommendedGames,
    defaultDifficulty: bandConfig.defaultDifficulty
  };
}
