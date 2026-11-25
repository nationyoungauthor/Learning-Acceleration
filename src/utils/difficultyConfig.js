/**
 * Adaptive Game Difficulty System - Difficulty Configuration
 * Defines supported difficulty levels, class/age mappings, safeguards, and performance thresholds.
 */

export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Easy',
  'Intermediate',
  'Moderate',
  'Advanced',
  'Expert'
];

/**
 * Class to Difficulty mapping defined in the requirements:
 * Class 1–2: Beginner
 * Class 3–4: Easy
 * Class 5–6: Intermediate
 * Class 7–8: Moderate
 * Class 9–10: Advanced
 * Class 11–12: Expert
 */
export const CLASS_TO_DIFFICULTY = {
  1: 'Beginner',
  2: 'Beginner',
  3: 'Easy',
  4: 'Easy',
  5: 'Intermediate',
  6: 'Intermediate',
  7: 'Moderate',
  8: 'Moderate',
  9: 'Advanced',
  10: 'Advanced',
  11: 'Expert',
  12: 'Expert'
};

/**
 * Typical chronological age mapping corresponding to cognitive milestones
 */
export const AGE_TO_DIFFICULTY_RANGES = [
  { minAge: 5, maxAge: 7, difficulty: 'Beginner' },
  { minAge: 8, maxAge: 9, difficulty: 'Easy' },
  { minAge: 10, maxAge: 11, difficulty: 'Intermediate' },
  { minAge: 12, maxAge: 13, difficulty: 'Moderate' },
  { minAge: 14, maxAge: 15, difficulty: 'Advanced' },
  { minAge: 16, maxAge: 25, difficulty: 'Expert' }
];

/**
 * Student Difficulty Boundaries:
 * Prevents performance adjustments from pushing a student out of appropriate age/class boundaries.
 */
export const DIFFICULTY_BOUNDS = {
  Beginner: { min: 'Beginner', max: 'Easy' },
  Easy: { min: 'Beginner', max: 'Intermediate' },
  Intermediate: { min: 'Easy', max: 'Moderate' },
  Moderate: { min: 'Intermediate', max: 'Advanced' },
  Advanced: { min: 'Moderate', max: 'Expert' },
  Expert: { min: 'Advanced', max: 'Expert' }
};

/**
 * Performance evaluation thresholds:
 * - Consistent scores >= 90%: increase difficulty gradually
 * - Scores 60%–89%: maintain current difficulty
 * - Scores < 60%: reduce difficulty gradually
 */
export const PERFORMANCE_THRESHOLDS = {
  UPGRADE_SCORE: 90,
  DOWNGRADE_SCORE: 60,
  WINDOW_SIZE: 3,
  CONSECUTIVE_LOW_THRESHOLD: 50,
  CONSECUTIVE_LOW_COUNT: 2
};

/**
 * Parse numeric class identifier from standard student class strings:
 * e.g., "Class 1", "Class 5th", "5", "Grade 10", "Class 12 Completed / Extended Track"
 */
export function parseClassNumber(studentClass) {
  if (!studentClass) return 7;
  const str = String(studentClass).toLowerCase().trim();
  if (
    str.includes('completed') ||
    str.includes('extended') ||
    str.includes('adult') ||
    str.includes('12+') ||
    str.includes('college')
  ) {
    return 12;
  }
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 7;
}

/**
 * Determine difficulty level corresponding strictly to age
 */
export function getDifficultyFromAge(age) {
  const numAge = parseInt(age, 10);
  if (isNaN(numAge)) return 'Moderate';
  for (const range of AGE_TO_DIFFICULTY_RANGES) {
    if (numAge >= range.minAge && numAge <= range.maxAge) {
      return range.difficulty;
    }
  }
  if (numAge < 5) return 'Beginner';
  return 'Expert';
}

/**
 * Sensible Age + Class validation strategy:
 * Class is the primary curriculum indicator.
 * If age and class differ by <= 1 difficulty level, class level is assigned.
 * If there is a larger discrepancy, smoothly balance towards age (+/- 1 step from class).
 */
export function getInitialDifficulty(studentClass, studentAge) {
  const classNum = parseClassNumber(studentClass);
  const classClamped = Math.max(1, Math.min(12, classNum));
  const classDiff = CLASS_TO_DIFFICULTY[classClamped] || 'Moderate';

  const ageNum = parseInt(studentAge, 10);
  if (isNaN(ageNum)) {
    return classDiff;
  }

  const ageDiff = getDifficultyFromAge(ageNum);

  const classIndex = DIFFICULTY_LEVELS.indexOf(classDiff);
  const ageIndex = DIFFICULTY_LEVELS.indexOf(ageDiff);

  if (Math.abs(classIndex - ageIndex) <= 1) {
    return classDiff;
  }

  // Adjust 1 step towards age to provide a comfortable, non-frustrating starting point
  const adjustedIndex = classIndex + (ageIndex > classIndex ? 1 : -1);
  return DIFFICULTY_LEVELS[adjustedIndex] || classDiff;
}
