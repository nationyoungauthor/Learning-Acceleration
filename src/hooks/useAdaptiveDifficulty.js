import { useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getInitialDifficulty } from '../utils/difficultyConfig';
import { getGameDifficultyConfig } from '../utils/gameDifficultyConfig';
import { evaluateAdaptiveDifficulty } from '../utils/difficultyEngine';

/**
 * Custom React Hook: useAdaptiveDifficulty
 * Integrates any game with the centralized Adaptive Game Difficulty System.
 * 
 * @param {string} gameId - Unique canonical ID of the game (e.g. 'sequence-memory')
 * @param {string} gameTitle - Display title of the game
 * @returns {Object} Adaptive difficulty configuration, state, and recording helper
 */
export function useAdaptiveDifficulty(gameId, gameTitle) {
  const { user, recordGameScore } = useAuth();

  // 1. Retrieve student's age & class from existing profile and determine assigned difficulty
  const assignedDifficulty = useMemo(() => {
    if (user?.isLoggedIn && (user?.class || user?.age)) {
      return getInitialDifficulty(user.class, user.age);
    }
    return 'Moderate'; // Default fallback
  }, [user?.isLoggedIn, user?.class, user?.age]);

  // 2. Locate existing progress record for this game
  const gameProgress = useMemo(() => {
    if (!user?.gameProgress || !Array.isArray(user.gameProgress)) return null;
    return user.gameProgress.find(p => p.gameId === gameId) || null;
  }, [user?.gameProgress, gameId]);

  // 3. Resolve student's current active difficulty and highest difficulty achieved
  const currentDifficulty = useMemo(() => {
    if (gameProgress?.currentDifficulty) return gameProgress.currentDifficulty;
    if (gameProgress?.difficulty && ['Beginner', 'Easy', 'Intermediate', 'Moderate', 'Advanced', 'Expert'].includes(gameProgress.difficulty)) {
      return gameProgress.difficulty;
    }
    return assignedDifficulty;
  }, [gameProgress, assignedDifficulty]);

  const highestDifficulty = useMemo(() => {
    return gameProgress?.highestDifficulty || currentDifficulty;
  }, [gameProgress?.highestDifficulty, currentDifficulty]);

  // 4. Retrieve game-specific difficulty parameters
  const difficultyConfig = useMemo(() => {
    return getGameDifficultyConfig(gameId, currentDifficulty);
  }, [gameId, currentDifficulty]);

  // 5. Track & record game result with adaptive performance evaluation
  const recordResult = useCallback(async ({
    score = 0,
    accuracy = 100,
    completionTime = 0,
    mistakes = 0
  } = {}) => {
    const numScore = parseFloat(score) || 0;
    const numAccuracy = parseFloat(accuracy) || 100;
    const numTime = parseFloat(completionTime) || 0;
    const numMistakes = parseInt(mistakes, 10) || 0;

    const evalResult = evaluateAdaptiveDifficulty({
      gameId,
      assignedDifficulty,
      currentDifficulty,
      highestDifficulty,
      recentHistory: gameProgress?.recentScores || [],
      lastScore: numScore,
      accuracy: numAccuracy,
      mistakes: numMistakes,
      completionTime: numTime
    });

    if (recordGameScore && user?.isLoggedIn) {
      await recordGameScore(
        gameId,
        gameTitle || gameId,
        numScore,
        numAccuracy,
        numTime,
        {
          assignedDifficulty,
          currentDifficulty: evalResult.nextDifficulty,
          highestDifficulty: evalResult.nextHighestDifficulty,
          difficulty: evalResult.nextDifficulty,
          mistakes: numMistakes,
          recentScores: evalResult.updatedHistory
        }
      );
    }

    return evalResult;
  }, [gameId, gameTitle, assignedDifficulty, currentDifficulty, highestDifficulty, gameProgress, recordGameScore, user?.isLoggedIn]);

  return {
    isLoggedIn: Boolean(user?.isLoggedIn),
    studentAge: user?.age,
    studentClass: user?.class,
    assignedDifficulty,
    currentDifficulty,
    difficulty: currentDifficulty,
    highestDifficulty,
    difficultyConfig,
    recordResult,
    gameProgress,
    user
  };
}

export default useAdaptiveDifficulty;
