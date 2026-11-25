import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  registerStudentApi,
  loginStudentApi,
  getUserProfileApi,
  saveGameProgressApi,
  saveQuizProgressApi,
  updateDifficultyApi
} from '../services/api';
import { getStudentLearningBand } from '../utils/learningBands';
import { getInitialDifficulty } from '../utils/difficultyConfig';

export const SCORE_KEY_MAP = {
  associationLearningHighScore: { gameId: 'association-learning', title: 'Association Learning' },
  chimpTestHighScore: { gameId: 'chimp-test', title: 'Chimp Test' },
  colorMemoryHighScore: { gameId: 'color-memory', title: 'Color Memory' },
  colorTargetHighScore: { gameId: 'color-target', title: 'Color Target' },
  emotionReadingHighScore: { gameId: 'emotion-reading', title: 'Emotion Reading' },
  fiveSecondHighScore: { gameId: '5-second-test', title: '5-Second Test' },
  impromptuPitchHighScore: { gameId: 'impromptu-pitch', title: 'Impromptu Pitch' },
  invertedMouseHighScore: { gameId: 'inverted-mouse', title: 'Inverted Mouse' },
  memoryMatchHighScore: { gameId: 'memory-match', title: 'Memory Match' },
  numberHighScore: { gameId: 'number-memory', title: 'Number Memory' },
  numberSequenceHighScore: { gameId: 'number-sequence', title: 'Number Sequence' },
  oddOneOutHighScore: { gameId: 'odd-one-out', title: 'Odd One Out' },
  oneToFiftyBestTime: { gameId: 'one-to-fifty', title: 'One to Fifty' },
  patternLogicHighScore: { gameId: 'pattern-logic', title: 'Pattern Logic' },
  perfectCircleHighScore: { gameId: 'perfect-circle', title: 'Perfect Circle' },
  seenNumberHighScore: { gameId: 'seen-number-memory', title: 'Seen Number Memory' },
  sequenceHighScore: { gameId: 'sequence-memory', title: 'Sequence Memory' },
  speedMathHighScore: { gameId: 'speed-math', title: 'Speed Math' },
  stroopTestHighScore: { gameId: 'stroop-test', title: 'Stroop Test' },
  sumFinderHighScore: { gameId: 'sum-finder', title: 'Sum Finder' },
  timeEstimatorHighScore: { gameId: 'time-estimator', title: 'Time Estimator' },
  visualHighScore: { gameId: 'visual-memory', title: 'Visual Memory' },
  wordHighScore: { gameId: 'word-memory', title: 'Word Memory' },
  wordScrambleHighScore: { gameId: 'word-scramble', title: 'Word Scramble' }
};

// Global interceptor so any game's high score is captured and synced to the database
if (typeof window !== 'undefined' && !window.__la_score_interceptor_set) {
  window.__la_score_interceptor_set = true;
  const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
  window.localStorage.setItem = function(key, value) {
    originalSetItem(key, value);
    if (SCORE_KEY_MAP[key]) {
      window.dispatchEvent(
        new CustomEvent('learning_acceleration_score_event', {
          detail: { ...SCORE_KEY_MAP[key], score: value }
        })
      );
    }
  };
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Sync across tabs/windows
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_session');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading session:', e);
    } finally {
      setLoading(false);
    }

    const handleStorageChange = (e) => {
      if (e.key === 'user_session') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Compute student's verified learning band details
  const bandInfo = useMemo(() => {
    if (!user || !user.isLoggedIn) {
      return getStudentLearningBand('Class 7', 12);
    }
    return getStudentLearningBand(user.class, user.age);
  }, [user]);

  // Persist session changes helper
  const saveSession = useCallback((updatedUser) => {
    try {
      localStorage.setItem('user_session', JSON.stringify(updatedUser));
      // Also sync user_xp and user_streak for legacy components
      if (updatedUser.xp !== undefined) localStorage.setItem('user_xp', String(updatedUser.xp));
      if (updatedUser.streak !== undefined) localStorage.setItem('user_streak', String(updatedUser.streak));
    } catch (e) {
      console.error('Error saving session:', e);
    }
    setUser(updatedUser);
  }, []);

  // Refresh profile from MongoDB
  const refreshProfile = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await getUserProfileApi(user.id);
      if (res.success && res.user) {
        const u = res.user;
        const updated = {
          ...user,
          name: u.name,
          email: u.email,
          age: u.age,
          class: u.class,
          learningBand: u.learningBand,
          difficultyPreference: u.difficultyPreference,
          xp: u.xp,
          streak: u.streak,
          personalBests: u.personalBests || {},
          gameProgress: u.gameProgress || [],
          quizProgress: u.quizProgress || []
        };
        saveSession(updated);
      }
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  }, [user, saveSession]);

  // Register a new student via Live MongoDB Backend API
  const register = async (data) => {
    try {
      const apiRes = await registerStudentApi(data);

      if (apiRes.success && apiRes.user) {
        const u = apiRes.user;
        const resolvedBand = u.learningBand || getStudentLearningBand(u.class, u.age).band;

        const sessionData = {
          id: u.id || u._id,
          name: u.name,
          email: u.email,
          age: u.age,
          class: u.class,
          learningBand: resolvedBand,
          difficultyPreference: u.difficultyPreference || 'Easy',
          xp: u.xp || 100,
          streak: u.streak || 1,
          personalBests: u.personalBests || {},
          gameProgress: u.gameProgress || [],
          quizProgress: u.quizProgress || [],
          isLoggedIn: true
        };

        saveSession(sessionData);
        return { success: true, message: apiRes.message, user: sessionData };
      }

      return {
        success: false,
        message: apiRes.message || 'Registration failed in database'
      };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: err.message || 'Failed to complete registration' };
    }
  };

  // Sign In student via Live MongoDB Backend API
  const login = async (email, password) => {
    try {
      const apiRes = await loginStudentApi(email, password);

      if (apiRes.success && apiRes.user) {
        const u = apiRes.user;
        const resolvedBand = u.learningBand || getStudentLearningBand(u.class, u.age).band;

        const sessionData = {
          id: u.id || u._id,
          name: u.name,
          email: u.email,
          age: u.age,
          class: u.class,
          learningBand: resolvedBand,
          difficultyPreference: u.difficultyPreference || 'Easy',
          xp: u.xp !== undefined ? u.xp : 100,
          streak: u.streak !== undefined ? u.streak : 1,
          personalBests: u.personalBests || {},
          gameProgress: u.gameProgress || [],
          quizProgress: u.quizProgress || [],
          isLoggedIn: true
        };

        saveSession(sessionData);
        return { success: true, message: apiRes.message, user: sessionData };
      }

      return {
        success: false,
        message: apiRes.message || 'Invalid email or password'
      };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: err.message || 'Sign in failed' };
    }
  };

  // Update Difficulty preference
  const updateDifficulty = async (difficulty) => {
    if (!['Easy', 'Standard', 'Challenge'].includes(difficulty)) return;
    
    // Optimistic local update
    const updated = { ...user, difficultyPreference: difficulty };
    saveSession(updated);

    if (user?.id) {
      try {
        await updateDifficultyApi(user.id, difficulty);
      } catch (err) {
        console.error('Error updating difficulty in DB:', err);
      }
    }
  };

  // Record brain game score & personal best with adaptive difficulty tracking
  const recordGameScore = async (gameId, gameTitle, score, accuracy = 100, completionTime = 0, meta = {}) => {
    if (!user) return;

    const numScore = parseFloat(score) || 0;
    const currentBest = user.personalBests?.[gameId] || 0;
    const isNewBest = numScore > currentBest;
    const newBest = Math.max(currentBest, numScore);

    const xpEarned = isNewBest ? 60 : 30;
    const updatedBests = { ...(user.personalBests || {}), [gameId]: newBest };
    const updatedXp = (user.xp || 0) + xpEarned;

    const existingProgressIndex = (user.gameProgress || []).findIndex(p => p.gameId === gameId);
    let newProgressList = [...(user.gameProgress || [])];

    const assignedDiff = meta.assignedDifficulty || (user.class || user.age ? getInitialDifficulty(user.class, user.age) : 'Moderate');
    const curDiff = meta.currentDifficulty || meta.difficulty || (existingProgressIndex > -1 ? newProgressList[existingProgressIndex].currentDifficulty || newProgressList[existingProgressIndex].difficulty : assignedDiff);
    const highestDiff = meta.highestDifficulty || (existingProgressIndex > -1 ? newProgressList[existingProgressIndex].highestDifficulty || curDiff : curDiff);
    const mistakesCount = meta.mistakes !== undefined ? meta.mistakes : (existingProgressIndex > -1 ? newProgressList[existingProgressIndex].mistakes || 0 : 0);
    const recentScoresList = meta.recentScores || (existingProgressIndex > -1 ? newProgressList[existingProgressIndex].recentScores || [] : []);

    if (existingProgressIndex > -1) {
      const prev = newProgressList[existingProgressIndex];
      newProgressList[existingProgressIndex] = {
        ...prev,
        attempts: (prev.attempts || 1) + 1,
        bestScore: newBest,
        lastScore: numScore,
        accuracy: parseFloat(accuracy) || 100,
        completionTime: parseFloat(completionTime) || 0,
        difficulty: curDiff,
        assignedDifficulty: assignedDiff,
        currentDifficulty: curDiff,
        highestDifficulty: highestDiff,
        mistakes: mistakesCount,
        recentScores: recentScoresList,
        lastPlayed: new Date().toISOString()
      };
    } else {
      newProgressList.push({
        gameId,
        gameTitle: gameTitle || gameId,
        difficulty: curDiff,
        assignedDifficulty: assignedDiff,
        currentDifficulty: curDiff,
        highestDifficulty: highestDiff,
        attempts: 1,
        bestScore: numScore,
        lastScore: numScore,
        accuracy: parseFloat(accuracy) || 100,
        completionTime: parseFloat(completionTime) || 0,
        mistakes: mistakesCount,
        recentScores: recentScoresList,
        lastPlayed: new Date().toISOString()
      });
    }

    const updatedUser = {
      ...user,
      xp: updatedXp,
      personalBests: updatedBests,
      gameProgress: newProgressList
    };

    saveSession(updatedUser);

    // Sync to MongoDB backend
    if (user.id) {
      try {
        await saveGameProgressApi({
          userId: user.id,
          gameId,
          gameTitle,
          score: numScore,
          accuracy,
          completionTime,
          difficulty: curDiff,
          assignedDifficulty: assignedDiff,
          currentDifficulty: curDiff,
          highestDifficulty: highestDiff,
          mistakes: mistakesCount,
          recentScores: recentScoresList
        });
      } catch (err) {
        console.error('Error syncing game progress to backend:', err);
      }
    }
  };

  // Record adaptive quiz score
  const recordQuizScore = async (subject, band, score, totalQuestions = 5, accuracy = 100) => {
    if (!user) return;

    const numScore = parseFloat(score) || 0;
    const xpGain = Math.round(numScore * 25);
    const updatedXp = (user.xp || 0) + xpGain;

    const existingIndex = (user.quizProgress || []).findIndex(q => q.subject?.toLowerCase() === subject?.toLowerCase());
    let newQuizList = [...(user.quizProgress || [])];

    if (existingIndex > -1) {
      const prev = newQuizList[existingIndex];
      newQuizList[existingIndex] = {
        ...prev,
        quizzesTaken: (prev.quizzesTaken || 1) + 1,
        bestScore: Math.max(prev.bestScore || 0, numScore),
        lastScore: numScore,
        accuracy,
        lastAttempt: new Date().toISOString()
      };
    } else {
      newQuizList.push({
        subject,
        band: band || user.learningBand,
        difficulty: user.difficultyPreference || 'Easy',
        quizzesTaken: 1,
        bestScore: numScore,
        lastScore: numScore,
        accuracy,
        lastAttempt: new Date().toISOString()
      });
    }

    const updatedUser = {
      ...user,
      xp: updatedXp,
      quizProgress: newQuizList
    };

    saveSession(updatedUser);

    if (user.id) {
      try {
        await saveQuizProgressApi({
          userId: user.id,
          subject,
          band: band || user.learningBand,
          score: numScore,
          totalQuestions,
          accuracy,
          difficulty: user.difficultyPreference || 'Easy'
        });
      } catch (err) {
        console.error('Error syncing quiz progress to backend:', err);
      }
    }
  };

  // Listen for game score events emitted by localStorage.setItem in any of the 24 games
  useEffect(() => {
    const handleScoreEvent = (e) => {
      const { gameId, title, score } = e.detail || {};
      if (gameId && score !== undefined && user?.isLoggedIn) {
        recordGameScore(gameId, title, score);
      }
    };

    window.addEventListener('learning_acceleration_score_event', handleScoreEvent);
    return () => window.removeEventListener('learning_acceleration_score_event', handleScoreEvent);
  }, [user]);

  // Hydrate game high scores from database personal bests into localStorage on login
  useEffect(() => {
    if (user?.personalBests) {
      Object.entries(SCORE_KEY_MAP).forEach(([scoreKey, { gameId }]) => {
        const val = user.personalBests[gameId];
        if (val !== undefined && val !== null) {
          try {
            const originalSetItem = Object.getPrototypeOf(localStorage).setItem;
            originalSetItem.call(localStorage, scoreKey, String(val));
          } catch {
            // ignore
          }
        }
      });
    }
  }, [user?.id]);

  // Logout student
  const logout = () => {
    try {
      localStorage.removeItem('user_session');
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
  };

  const value = {
    user,
    bandInfo,
    learningBand: bandInfo.band,
    isAuthenticated: Boolean(user && user.isLoggedIn),
    loading,
    register,
    login,
    logout,
    updateDifficulty,
    recordGameScore,
    recordQuizScore,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
