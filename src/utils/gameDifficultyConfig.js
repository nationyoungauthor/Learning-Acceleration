/**
 * Adaptive Game Difficulty System - Game-Specific Difficulty Configurations
 * Defines tailored parameters for all 24 brain training games across the 6 difficulty tiers:
 * Beginner, Easy, Intermediate, Moderate, Advanced, Expert.
 */

export const GAME_DIFFICULTY_MAP = {
  // 1. Sequence Memory
  'sequence-memory': {
    Beginner: {
      initialSequenceLength: 3,
      displaySpeed: 800,
      pauseTime: 350,
      speedIncrement: 15,
      targetScore: 4
    },
    Easy: {
      initialSequenceLength: 4,
      displaySpeed: 700,
      pauseTime: 300,
      speedIncrement: 20,
      targetScore: 5
    },
    Intermediate: {
      initialSequenceLength: 5,
      displaySpeed: 620,
      pauseTime: 260,
      speedIncrement: 25,
      targetScore: 6
    },
    Moderate: {
      initialSequenceLength: 6,
      displaySpeed: 540,
      pauseTime: 220,
      speedIncrement: 30,
      targetScore: 7
    },
    Advanced: {
      initialSequenceLength: 7,
      displaySpeed: 460,
      pauseTime: 180,
      speedIncrement: 35,
      targetScore: 9
    },
    Expert: {
      initialSequenceLength: 9,
      displaySpeed: 380,
      pauseTime: 140,
      speedIncrement: 40,
      targetScore: 12
    }
  },

  // 2. Visual Memory
  'visual-memory': {
    Beginner: {
      startingTiles: 3,
      baseGridSize: 3,
      showDuration: 1800,
      scalingDuration: 150,
      targetScore: 3
    },
    Easy: {
      startingTiles: 4,
      baseGridSize: 3,
      showDuration: 1400,
      scalingDuration: 120,
      targetScore: 4
    },
    Intermediate: {
      startingTiles: 5,
      baseGridSize: 4,
      showDuration: 1100,
      scalingDuration: 100,
      targetScore: 6
    },
    Moderate: {
      startingTiles: 7,
      baseGridSize: 4,
      showDuration: 900,
      scalingDuration: 80,
      targetScore: 8
    },
    Advanced: {
      startingTiles: 8,
      baseGridSize: 5,
      showDuration: 750,
      scalingDuration: 60,
      targetScore: 10
    },
    Expert: {
      startingTiles: 10,
      baseGridSize: 5,
      showDuration: 600,
      scalingDuration: 50,
      targetScore: 12
    }
  },

  // 3. Word Memory
  'word-memory': {
    Beginner: {
      maxWordLength: 4,
      lives: 4,
      seenProbability: 0.55,
      targetScore: 8
    },
    Easy: {
      maxWordLength: 5,
      lives: 3,
      seenProbability: 0.50,
      targetScore: 12
    },
    Intermediate: {
      maxWordLength: 7,
      lives: 3,
      seenProbability: 0.50,
      targetScore: 16
    },
    Moderate: {
      maxWordLength: 9,
      lives: 3,
      seenProbability: 0.48,
      targetScore: 22
    },
    Advanced: {
      maxWordLength: 12,
      lives: 2,
      seenProbability: 0.45,
      targetScore: 28
    },
    Expert: {
      maxWordLength: 15,
      lives: 2,
      seenProbability: 0.42,
      targetScore: 35
    }
  },

  // 4. Number Memory
  'number-memory': {
    Beginner: {
      startingDigits: 2,
      displayDurationBase: 2200,
      perDigitDuration: 600,
      targetScore: 3
    },
    Easy: {
      startingDigits: 3,
      displayDurationBase: 1800,
      perDigitDuration: 500,
      targetScore: 4
    },
    Intermediate: {
      startingDigits: 4,
      displayDurationBase: 1500,
      perDigitDuration: 400,
      targetScore: 5
    },
    Moderate: {
      startingDigits: 5,
      displayDurationBase: 1300,
      perDigitDuration: 350,
      targetScore: 7
    },
    Advanced: {
      startingDigits: 7,
      displayDurationBase: 1100,
      perDigitDuration: 300,
      targetScore: 9
    },
    Expert: {
      startingDigits: 9,
      displayDurationBase: 900,
      perDigitDuration: 250,
      targetScore: 12
    }
  },

  // 5. Chimp Test
  'chimp-test': {
    Beginner: {
      startingNumbers: 3,
      gridCells: 24,
      targetScore: 3
    },
    Easy: {
      startingNumbers: 4,
      gridCells: 32,
      targetScore: 4
    },
    Intermediate: {
      startingNumbers: 5,
      gridCells: 40,
      targetScore: 6
    },
    Moderate: {
      startingNumbers: 6,
      gridCells: 40,
      targetScore: 8
    },
    Advanced: {
      startingNumbers: 7,
      gridCells: 40,
      targetScore: 10
    },
    Expert: {
      startingNumbers: 9,
      gridCells: 40,
      targetScore: 13
    }
  },

  // 6. Memory Match
  'memory-match': {
    Beginner: {
      startingPairs: 2,
      mistakesAllowed: 4,
      previewTime: 2500,
      targetScore: 2
    },
    Easy: {
      startingPairs: 3,
      mistakesAllowed: 3,
      previewTime: 2000,
      targetScore: 3
    },
    Intermediate: {
      startingPairs: 4,
      mistakesAllowed: 3,
      previewTime: 1600,
      targetScore: 4
    },
    Moderate: {
      startingPairs: 5,
      mistakesAllowed: 2,
      previewTime: 1300,
      targetScore: 5
    },
    Advanced: {
      startingPairs: 6,
      mistakesAllowed: 2,
      previewTime: 1100,
      targetScore: 6
    },
    Expert: {
      startingPairs: 8,
      mistakesAllowed: 1,
      previewTime: 900,
      targetScore: 8
    }
  },

  // 7. Speed Math
  'speed-math': {
    Beginner: {
      maxNumber: 8,
      allowedOps: ['+'],
      lives: 4,
      targetScore: 6
    },
    Easy: {
      maxNumber: 15,
      allowedOps: ['+', '-'],
      lives: 3,
      targetScore: 10
    },
    Intermediate: {
      maxNumber: 25,
      allowedOps: ['+', '-', '*'],
      multMax: 6,
      lives: 3,
      targetScore: 14
    },
    Moderate: {
      maxNumber: 40,
      allowedOps: ['+', '-', '*'],
      multMax: 10,
      lives: 3,
      targetScore: 18
    },
    Advanced: {
      maxNumber: 60,
      allowedOps: ['+', '-', '*'],
      multMax: 12,
      lives: 2,
      targetScore: 24
    },
    Expert: {
      maxNumber: 100,
      allowedOps: ['+', '-', '*'],
      multMax: 15,
      lives: 2,
      targetScore: 30
    }
  },

  // 8. Stroop Test
  'stroop-test': {
    Beginner: {
      durationSeconds: 60,
      colorsCount: 3,
      mismatchRatio: 0.35,
      targetScore: 80
    },
    Easy: {
      durationSeconds: 60,
      colorsCount: 4,
      mismatchRatio: 0.50,
      targetScore: 110
    },
    Intermediate: {
      durationSeconds: 50,
      colorsCount: 5,
      mismatchRatio: 0.65,
      targetScore: 140
    },
    Moderate: {
      durationSeconds: 45,
      colorsCount: 6,
      mismatchRatio: 0.75,
      targetScore: 170
    },
    Advanced: {
      durationSeconds: 40,
      colorsCount: 6,
      mismatchRatio: 0.85,
      targetScore: 200
    },
    Expert: {
      durationSeconds: 30,
      colorsCount: 6,
      mismatchRatio: 0.95,
      targetScore: 230
    }
  },

  // 9. Color Memory
  'color-memory': {
    Beginner: {
      startingChoices: 3,
      colorDifference: 20,
      displayTime: 2200,
      targetScore: 3
    },
    Easy: {
      startingChoices: 4,
      colorDifference: 15,
      displayTime: 1800,
      targetScore: 4
    },
    Intermediate: {
      startingChoices: 4,
      colorDifference: 10,
      displayTime: 1400,
      targetScore: 6
    },
    Moderate: {
      startingChoices: 6,
      colorDifference: 8,
      displayTime: 1100,
      targetScore: 8
    },
    Advanced: {
      startingChoices: 6,
      colorDifference: 5,
      displayTime: 850,
      targetScore: 10
    },
    Expert: {
      startingChoices: 9,
      colorDifference: 3,
      displayTime: 650,
      targetScore: 13
    }
  },

  // 10. Color Target
  'color-target': {
    Beginner: {
      initialDots: 6,
      timeLimit: 12,
      targetRatio: 0.50,
      targetScore: 50
    },
    Easy: {
      initialDots: 8,
      timeLimit: 10,
      targetRatio: 0.40,
      targetScore: 80
    },
    Intermediate: {
      initialDots: 12,
      timeLimit: 8,
      targetRatio: 0.35,
      targetScore: 110
    },
    Moderate: {
      initialDots: 16,
      timeLimit: 7,
      targetRatio: 0.30,
      targetScore: 140
    },
    Advanced: {
      initialDots: 20,
      timeLimit: 6,
      targetRatio: 0.28,
      targetScore: 180
    },
    Expert: {
      initialDots: 24,
      timeLimit: 4,
      targetRatio: 0.25,
      targetScore: 230
    }
  },

  // 11. One To Fifty
  'one-to-fifty': {
    Beginner: {
      targetCount: 15,
      penaltyMs: 500,
      targetSeconds: 20
    },
    Easy: {
      targetCount: 20,
      penaltyMs: 700,
      targetSeconds: 28
    },
    Intermediate: {
      targetCount: 30,
      penaltyMs: 1000,
      targetSeconds: 42
    },
    Moderate: {
      targetCount: 40,
      penaltyMs: 1200,
      targetSeconds: 55
    },
    Advanced: {
      targetCount: 50,
      penaltyMs: 1500,
      targetSeconds: 65
    },
    Expert: {
      targetCount: 50,
      penaltyMs: 2000,
      targetSeconds: 50
    }
  },

  // 12. Odd One Out
  'odd-one-out': {
    Beginner: {
      initialGridSize: 3,
      timeLimit: 50,
      penaltySeconds: 2,
      targetScore: 400
    },
    Easy: {
      initialGridSize: 3,
      timeLimit: 45,
      penaltySeconds: 3,
      targetScore: 600
    },
    Intermediate: {
      initialGridSize: 4,
      timeLimit: 40,
      penaltySeconds: 3,
      targetScore: 800
    },
    Moderate: {
      initialGridSize: 5,
      timeLimit: 35,
      penaltySeconds: 4,
      targetScore: 1000
    },
    Advanced: {
      initialGridSize: 6,
      timeLimit: 30,
      penaltySeconds: 4,
      targetScore: 1300
    },
    Expert: {
      initialGridSize: 7,
      timeLimit: 25,
      penaltySeconds: 5,
      targetScore: 1600
    }
  },

  // 13. Pattern Logic
  'pattern-logic': {
    Beginner: {
      maxTypes: 1,
      lives: 4,
      targetScore: 4
    },
    Easy: {
      maxTypes: 2,
      lives: 3,
      targetScore: 6
    },
    Intermediate: {
      maxTypes: 3,
      lives: 3,
      targetScore: 8
    },
    Moderate: {
      maxTypes: 4,
      lives: 3,
      targetScore: 10
    },
    Advanced: {
      maxTypes: 5,
      lives: 2,
      targetScore: 12
    },
    Expert: {
      maxTypes: 5,
      lives: 2,
      targetScore: 15
    }
  },

  // 14. Seen Number Memory
  'seen-number-memory': {
    Beginner: {
      maxNumberRange: 100,
      strikes: 4,
      seenProbability: 0.55,
      targetScore: 8
    },
    Easy: {
      maxNumberRange: 300,
      strikes: 3,
      seenProbability: 0.50,
      targetScore: 12
    },
    Intermediate: {
      maxNumberRange: 600,
      strikes: 3,
      seenProbability: 0.50,
      targetScore: 18
    },
    Moderate: {
      maxNumberRange: 1000,
      strikes: 3,
      seenProbability: 0.48,
      targetScore: 24
    },
    Advanced: {
      maxNumberRange: 2000,
      strikes: 2,
      seenProbability: 0.45,
      targetScore: 30
    },
    Expert: {
      maxNumberRange: 5000,
      strikes: 2,
      seenProbability: 0.42,
      targetScore: 38
    }
  },

  // 15. Sum Finder
  'sum-finder': {
    Beginner: {
      maxCellVal: 5,
      minTerms: 2,
      maxTerms: 2,
      timeLimit: 60,
      targetScore: 400
    },
    Easy: {
      maxCellVal: 7,
      minTerms: 2,
      maxTerms: 3,
      timeLimit: 55,
      targetScore: 600
    },
    Intermediate: {
      maxCellVal: 9,
      minTerms: 2,
      maxTerms: 3,
      timeLimit: 50,
      targetScore: 900
    },
    Moderate: {
      maxCellVal: 12,
      minTerms: 2,
      maxTerms: 4,
      timeLimit: 45,
      targetScore: 1200
    },
    Advanced: {
      maxCellVal: 15,
      minTerms: 3,
      maxTerms: 4,
      timeLimit: 40,
      targetScore: 1500
    },
    Expert: {
      maxCellVal: 20,
      minTerms: 3,
      maxTerms: 5,
      timeLimit: 35,
      targetScore: 1900
    }
  },

  // 16. Time Estimator
  'time-estimator': {
    Beginner: {
      minTargetMs: 3000,
      maxTargetMs: 6000,
      toleranceMargin: 0.25,
      targetScore: 70
    },
    Easy: {
      minTargetMs: 3000,
      maxTargetMs: 8000,
      toleranceMargin: 0.20,
      targetScore: 75
    },
    Intermediate: {
      minTargetMs: 4000,
      maxTargetMs: 10000,
      toleranceMargin: 0.15,
      targetScore: 80
    },
    Moderate: {
      minTargetMs: 4000,
      maxTargetMs: 12000,
      toleranceMargin: 0.12,
      targetScore: 84
    },
    Advanced: {
      minTargetMs: 5000,
      maxTargetMs: 15000,
      toleranceMargin: 0.09,
      targetScore: 88
    },
    Expert: {
      minTargetMs: 5000,
      maxTargetMs: 18000,
      toleranceMargin: 0.06,
      targetScore: 92
    }
  },

  // 17. Word Scramble
  'word-scramble': {
    Beginner: {
      wordLengthMin: 3,
      wordLengthMax: 4,
      lives: 4,
      hintCost: 3,
      targetScore: 40
    },
    Easy: {
      wordLengthMin: 4,
      wordLengthMax: 5,
      lives: 3,
      hintCost: 4,
      targetScore: 60
    },
    Intermediate: {
      wordLengthMin: 5,
      wordLengthMax: 6,
      lives: 3,
      hintCost: 5,
      targetScore: 80
    },
    Moderate: {
      wordLengthMin: 6,
      wordLengthMax: 7,
      lives: 3,
      hintCost: 5,
      targetScore: 100
    },
    Advanced: {
      wordLengthMin: 7,
      wordLengthMax: 8,
      lives: 2,
      hintCost: 6,
      targetScore: 120
    },
    Expert: {
      wordLengthMin: 8,
      wordLengthMax: 10,
      lives: 2,
      hintCost: 7,
      targetScore: 150
    }
  },

  // 18. Number Sequence
  'number-sequence': {
    Beginner: {
      initialLength: 2,
      flashDuration: 550,
      intervalMs: 750,
      targetScore: 3
    },
    Easy: {
      initialLength: 3,
      flashDuration: 450,
      intervalMs: 650,
      targetScore: 4
    },
    Intermediate: {
      initialLength: 4,
      flashDuration: 400,
      intervalMs: 550,
      targetScore: 6
    },
    Moderate: {
      initialLength: 5,
      flashDuration: 350,
      intervalMs: 500,
      targetScore: 8
    },
    Advanced: {
      initialLength: 6,
      flashDuration: 300,
      intervalMs: 420,
      targetScore: 10
    },
    Expert: {
      initialLength: 7,
      flashDuration: 250,
      intervalMs: 350,
      targetScore: 12
    }
  },

  // 19. 5-Second Test
  '5-second-test': {
    Beginner: {
      toleranceMultiplier: 1.5,
      targetScore: 700
    },
    Easy: {
      toleranceMultiplier: 1.2,
      targetScore: 780
    },
    Intermediate: {
      toleranceMultiplier: 1.0,
      targetScore: 850
    },
    Moderate: {
      toleranceMultiplier: 0.9,
      targetScore: 900
    },
    Advanced: {
      toleranceMultiplier: 0.75,
      targetScore: 940
    },
    Expert: {
      toleranceMultiplier: 0.60,
      targetScore: 970
    }
  },

  // 20. Inverted Mouse
  'inverted-mouse': {
    Beginner: {
      timeLimit: 60,
      targetRadius: 28,
      targetScore: 10
    },
    Easy: {
      timeLimit: 60,
      targetRadius: 24,
      targetScore: 15
    },
    Intermediate: {
      timeLimit: 55,
      targetRadius: 20,
      targetScore: 20
    },
    Moderate: {
      timeLimit: 50,
      targetRadius: 18,
      targetScore: 25
    },
    Advanced: {
      timeLimit: 45,
      targetRadius: 16,
      targetScore: 30
    },
    Expert: {
      timeLimit: 40,
      targetRadius: 14,
      targetScore: 35
    }
  },

  // 21. Perfect Circle
  'perfect-circle': {
    Beginner: {
      minRadius: 15,
      errorScale: 1.1,
      targetScore: 65
    },
    Easy: {
      minRadius: 18,
      errorScale: 1.25,
      targetScore: 72
    },
    Intermediate: {
      minRadius: 20,
      errorScale: 1.5,
      targetScore: 80
    },
    Moderate: {
      minRadius: 22,
      errorScale: 1.7,
      targetScore: 85
    },
    Advanced: {
      minRadius: 25,
      errorScale: 1.9,
      targetScore: 90
    },
    Expert: {
      minRadius: 28,
      errorScale: 2.2,
      targetScore: 93
    }
  },

  // 22. Emotion Reading
  'emotion-reading': {
    Beginner: {
      timeLimit: 50,
      emotionsCount: 4,
      penaltySeconds: 2,
      targetScore: 500
    },
    Easy: {
      timeLimit: 45,
      emotionsCount: 5,
      penaltySeconds: 3,
      targetScore: 700
    },
    Intermediate: {
      timeLimit: 40,
      emotionsCount: 6,
      penaltySeconds: 3,
      targetScore: 900
    },
    Moderate: {
      timeLimit: 35,
      emotionsCount: 6,
      penaltySeconds: 4,
      targetScore: 1100
    },
    Advanced: {
      timeLimit: 30,
      emotionsCount: 6,
      penaltySeconds: 4,
      targetScore: 1300
    },
    Expert: {
      timeLimit: 25,
      emotionsCount: 6,
      penaltySeconds: 5,
      targetScore: 1500
    }
  },

  // 23. Impromptu Pitch
  'impromptu-pitch': {
    Beginner: {
      timeLimit: 55,
      penaltySeconds: 2,
      bonusPerSentence: 180,
      targetScore: 400
    },
    Easy: {
      timeLimit: 50,
      penaltySeconds: 2,
      bonusPerSentence: 160,
      targetScore: 600
    },
    Intermediate: {
      timeLimit: 45,
      penaltySeconds: 3,
      bonusPerSentence: 150,
      targetScore: 800
    },
    Moderate: {
      timeLimit: 40,
      penaltySeconds: 3,
      bonusPerSentence: 140,
      targetScore: 1000
    },
    Advanced: {
      timeLimit: 35,
      penaltySeconds: 4,
      bonusPerSentence: 120,
      targetScore: 1200
    },
    Expert: {
      timeLimit: 30,
      penaltySeconds: 4,
      bonusPerSentence: 100,
      targetScore: 1400
    }
  },

  // 24. Association Learning
  'association-learning': {
    Beginner: {
      basePairs: 3,
      baseStudyDuration: 14,
      optionCount: 3,
      targetScore: 400
    },
    Easy: {
      basePairs: 4,
      baseStudyDuration: 12,
      optionCount: 4,
      targetScore: 550
    },
    Intermediate: {
      basePairs: 5,
      baseStudyDuration: 11,
      optionCount: 4,
      targetScore: 700
    },
    Moderate: {
      basePairs: 6,
      baseStudyDuration: 10,
      optionCount: 4,
      targetScore: 850
    },
    Advanced: {
      basePairs: 7,
      baseStudyDuration: 9,
      optionCount: 4,
      targetScore: 1000
    },
    Expert: {
      basePairs: 8,
      baseStudyDuration: 8,
      optionCount: 4,
      targetScore: 1200
    }
  }
};

/**
 * Helper to fetch game difficulty parameters safely, falling back to 'Moderate' if undefined.
 */
export function getGameDifficultyConfig(gameId, difficulty = 'Moderate') {
  const gameConfigs = GAME_DIFFICULTY_MAP[gameId];
  if (!gameConfigs) {
    return {};
  }
  return gameConfigs[difficulty] || gameConfigs['Moderate'] || Object.values(gameConfigs)[0] || {};
}
