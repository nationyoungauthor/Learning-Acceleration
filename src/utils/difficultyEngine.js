/**
 * Adaptive Game Difficulty Engine
 * Core intelligence responsible for:
 * - Determining initial difficulty
 * - Evaluating normalized performance per game
 * - Managing rolling performance windows
 * - Increasing / decreasing difficulty gradually within age/class safeguards
 */

import {
  DIFFICULTY_LEVELS,
  DIFFICULTY_BOUNDS,
  PERFORMANCE_THRESHOLDS,
  getInitialDifficulty
} from './difficultyConfig.js';
import { getGameDifficultyConfig } from './gameDifficultyConfig.js';

/**
 * Evaluate normalized performance (0 - 100) based on actual mechanics of the game.
 * @param {string} gameId
 * @param {string} difficulty
 * @param {Object} result - { score, accuracy, completionTime, mistakes }
 * @returns {number} Performance percentage between 0 and 100
 */
export function evaluatePerformance(gameId, difficulty, result) {
  const { score = 0, accuracy = 100, mistakes = 0 } = result || {};
  const config = getGameDifficultyConfig(gameId, difficulty);
  const targetScore = config.targetScore || 10;

  let performanceScore = 0;

  // Games that report explicit accuracy (Stroop, Emotion Reading, Quizzes)
  if (result.accuracy !== undefined && result.accuracy !== null && !isNaN(result.accuracy)) {
    const rawAcc = Math.max(0, Math.min(100, parseFloat(accuracy)));
    const scoreFactor = Math.min(1, score / Math.max(1, targetScore));
    // Blend accuracy (70%) and score achievement (30%)
    performanceScore = rawAcc * 0.7 + scoreFactor * 100 * 0.3;
  } else {
    // Score-based scaling relative to benchmark
    const ratio = score / Math.max(1, targetScore);
    performanceScore = Math.min(100, Math.max(0, ratio * 100));
  }

  // Deduct for excess mistakes if reported
  if (mistakes > 0) {
    const penalty = Math.min(30, mistakes * 10);
    performanceScore = Math.max(0, performanceScore - penalty);
  }

  return Math.round(performanceScore);
}

/**
 * Step difficulty up or down by 1 level
 */
export function stepDifficulty(currentLevel, direction = 1) {
  const currentIndex = DIFFICULTY_LEVELS.indexOf(currentLevel);
  if (currentIndex === -1) return currentLevel;
  const targetIndex = currentIndex + direction;
  if (targetIndex < 0 || targetIndex >= DIFFICULTY_LEVELS.length) {
    return currentLevel;
  }
  return DIFFICULTY_LEVELS[targetIndex];
}

/**
 * Check if diffA is higher than diffB
 */
export function isHigherDifficulty(diffA, diffB) {
  const idxA = DIFFICULTY_LEVELS.indexOf(diffA);
  const idxB = DIFFICULTY_LEVELS.indexOf(diffB);
  return idxA > idxB;
}

/**
 * Clamp difficulty within age/class boundary limits
 */
export function clampDifficultyToBounds(diff, assignedBase) {
  const bounds = DIFFICULTY_BOUNDS[assignedBase] || {
    min: 'Beginner',
    max: 'Expert'
  };
  const diffIdx = DIFFICULTY_LEVELS.indexOf(diff);
  const minIdx = DIFFICULTY_LEVELS.indexOf(bounds.min);
  const maxIdx = DIFFICULTY_LEVELS.indexOf(bounds.max);

  if (diffIdx < minIdx) return bounds.min;
  if (diffIdx > maxIdx) return bounds.max;
  return diff;
}

/**
 * Core adaptive evaluator:
 * Evaluates student's rolling window and adjusts difficulty gradually.
 */
export function evaluateAdaptiveDifficulty({
  gameId,
  assignedDifficulty,
  currentDifficulty,
  highestDifficulty,
  recentHistory = [],
  lastScore = 0,
  accuracy = 100,
  mistakes = 0,
  completionTime = 0
}) {
  const baseDiff = assignedDifficulty || 'Moderate';
  const curDiff = currentDifficulty || baseDiff;
  const highDiff = highestDifficulty || curDiff;

  // 1. Calculate this attempt's normalized performance
  const performancePercent = evaluatePerformance(gameId, curDiff, {
    score: lastScore,
    accuracy,
    mistakes,
    completionTime
  });

  // 2. Append to rolling window (keep up to WINDOW_SIZE recent attempts)
  const currentAttemptRecord = {
    score: lastScore,
    accuracy,
    mistakes,
    completionTime,
    performance: performancePercent,
    difficulty: curDiff,
    date: new Date().toISOString()
  };

  const updatedHistory = [...(recentHistory || []), currentAttemptRecord].slice(
    -PERFORMANCE_THRESHOLDS.WINDOW_SIZE
  );

  // 3. Determine if we have sufficient window data to evaluate adjustment
  let nextDifficulty = curDiff;
  let reason = 'Maintained current difficulty';
  let adjusted = false;

  const windowCount = updatedHistory.length;
  const recentPerformances = updatedHistory.map((h) => h.performance ?? 75);
  const averagePerformance =
    recentPerformances.reduce((a, b) => a + b, 0) / windowCount;

  const bounds = DIFFICULTY_BOUNDS[baseDiff] || {
    min: 'Beginner',
    max: 'Expert'
  };

  // Case A: Upgrade condition
  // Consistently scoring >= 90% (average >= 90 across window, or last 2 attempts >= 92%)
  const isHighPerformance =
    (windowCount >= 2 && averagePerformance >= PERFORMANCE_THRESHOLDS.UPGRADE_SCORE) ||
    (windowCount >= 2 &&
      recentPerformances[recentPerformances.length - 1] >= 95 &&
      recentPerformances[recentPerformances.length - 2] >= 90);

  if (isHighPerformance) {
    const candidate = stepDifficulty(curDiff, 1);
    const clamped = clampDifficultyToBounds(candidate, baseDiff);
    if (clamped !== curDiff) {
      nextDifficulty = clamped;
      adjusted = true;
      reason = `Promoted to ${nextDifficulty} due to consistent high performance (${Math.round(averagePerformance)}%)`;
    } else {
      reason = `Reached upper age/class boundary for ${baseDiff} (${bounds.max})`;
    }
  }
  // Case B: Downgrade / Easing condition
  // Scoring < 60% across window, or 2 consecutive attempts with severe struggles (< 50%)
  else {
    const isLowPerformance =
      (windowCount >= 2 && averagePerformance < PERFORMANCE_THRESHOLDS.DOWNGRADE_SCORE) ||
      (windowCount >= 2 &&
        recentPerformances[recentPerformances.length - 1] < PERFORMANCE_THRESHOLDS.CONSECUTIVE_LOW_THRESHOLD &&
        recentPerformances[recentPerformances.length - 2] < PERFORMANCE_THRESHOLDS.CONSECUTIVE_LOW_THRESHOLD);

    if (isLowPerformance) {
      const candidate = stepDifficulty(curDiff, -1);
      const clamped = clampDifficultyToBounds(candidate, baseDiff);
      if (clamped !== curDiff) {
        nextDifficulty = clamped;
        adjusted = true;
        reason = `Adjusted to ${nextDifficulty} to match current learning pace (${Math.round(averagePerformance)}%)`;
      } else {
        reason = `Reached lower age/class boundary for ${baseDiff} (${bounds.min})`;
      }
    }
  }

  // 4. Update highest difficulty achieved
  let nextHighestDifficulty = highDiff;
  if (isHigherDifficulty(nextDifficulty, highDiff)) {
    nextHighestDifficulty = nextDifficulty;
  }

  return {
    nextDifficulty,
    nextHighestDifficulty,
    performancePercent,
    averagePerformance: Math.round(averagePerformance),
    updatedHistory,
    adjusted,
    reason
  };
}
