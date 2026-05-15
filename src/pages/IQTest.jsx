import React, { useState, useEffect } from 'react';
import { FaBrain, FaArrowRight, FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo, FaForward } from 'react-icons/fa';
import { iqLevels } from '../data/iqQuestions';

const IQTest = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, levelSummary, finalResult
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [levelScores, setLevelScores] = useState({}); // { levelId: score }
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  // Shuffle utility
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const stagesCount = 10;
  const questionsPerStage = 10;

  const handleStart = () => {
    // 1. Flatten all questions
    const allQuestions = iqLevels.flatMap(level => level.questions);
    
    // 2. Shuffle questions
    const shuffled = shuffleArray(allQuestions).map(q => ({
      ...q,
      options: shuffleArray(q.options) // Also shuffle options
    }));

    setShuffledQuestions(shuffled);
    setGameState('playing');
    setCurrentLevelIndex(0);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLevelScores({});
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(30);
  };

  // Helper to get current stage questions
  const getCurrentStageQuestions = () => {
    const start = currentLevelIndex * questionsPerStage;
    return shuffledQuestions.slice(start, start + questionsPerStage);
  };

  const currentQuestion = shuffledQuestions[currentLevelIndex * questionsPerStage + currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && !isAnswered && currentQuestion) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(null); // Time's up
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, isAnswered, currentQuestionIndex, currentLevelIndex]);

  const handleAnswer = (option) => {
    if (isAnswered || !currentQuestion) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsPerStage - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      // Stage Complete
      const totalCorrectSoFar = score;
      const previousTotal = Object.values(levelScores).reduce((a, b) => a + b, 0);
      const stageScore = totalCorrectSoFar - previousTotal;
      
      setLevelScores({ ...levelScores, [currentLevelIndex]: stageScore });
      setGameState('levelSummary');
    }
  };

  const nextLevel = () => {
    if (currentLevelIndex < stagesCount - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setGameState('playing');
    } else {
      setGameState('finalResult');
    }
  };

  const calculateIQ = () => {
    return Math.round((score / 100) * 100 + 60);
  };

  const getIQCategory = (iq) => {
    if (iq >= 130) return "Genius";
    if (iq >= 120) return "Superior Intelligence";
    if (iq >= 110) return "High Average";
    if (iq >= 90) return "Average";
    return "Below Average";
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 flex flex-col items-center">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-3xl z-10">
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <div className="text-center space-y-8 animate-in fade-in duration-700">
            <div className="inline-flex p-5 rounded-3xl bg-green-500/10 border border-green-500/20 shadow-lg shadow-green-500/5 mb-4">
              <FaBrain className="text-6xl text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
              Ultimate IQ Challenge
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Test your cognitive abilities across 100 mixed questions. Shuffled on every start to provide a unique challenge every time.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-400">
                  Stage {index + 1}
                </div>
              ))}
            </div>
            <button 
              onClick={handleStart}
              className="px-10 py-4 bg-green-500 hover:bg-green-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-xl shadow-green-500/20"
            >
              START TEST <FaArrowRight />
            </button>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'playing' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header Info */}
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1 block">Stage {currentLevelIndex + 1}</span>
                <h2 className="text-2xl font-bold">Mixed Cognitive Challenge</h2>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-400">Question</span>
                <div className="text-2xl font-black text-white">{currentQuestionIndex + 1} <span className="text-gray-600">/ {questionsPerStage}</span></div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questionsPerStage) * 100}%` }}
              ></div>
            </div>

            {/* Question Card */}
            {currentQuestion && (
              <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden group">
                {/* Timer Bar */}
                <div 
                  className={`absolute top-0 left-0 h-1 bg-green-500/50 transition-all duration-1000 linear ${timeLeft < 10 ? 'bg-red-500' : ''}`}
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>

                <h3 className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  {currentQuestion.question}
                </h3>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswered}
                      className={`
                        w-full p-5 rounded-2xl text-left transition-all flex items-center justify-between group/opt
                        ${!isAnswered ? 'bg-white/5 hover:bg-white/10 border border-white/10' : ''}
                        ${isAnswered && option === currentQuestion.answer ? 'bg-green-500/20 border border-green-500/50 text-green-400' : ''}
                        ${isAnswered && selectedOption === option && option !== currentQuestion.answer ? 'bg-red-500/20 border border-red-500/50 text-red-400' : ''}
                        ${isAnswered && option !== currentQuestion.answer && option !== selectedOption ? 'bg-white/2 opacity-40 border border-transparent' : ''}
                      `}
                    >
                      <span className="text-lg">{option}</span>
                      {isAnswered && option === currentQuestion.answer && <FaCheckCircle className="text-green-500" />}
                      {isAnswered && selectedOption === option && option !== currentQuestion.answer && <FaTimesCircle className="text-red-500" />}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="mt-8 flex justify-end animate-in fade-in slide-in-from-right-4 duration-300">
                    <button 
                      onClick={handleNext}
                      className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      {currentQuestionIndex < questionsPerStage - 1 ? 'Next Question' : 'Finish Stage'} <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-center">
               <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Correct: {score}</span>
            </div>
          </div>
        )}

        {/* LEVEL SUMMARY SCREEN */}
        {gameState === 'levelSummary' && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="inline-flex p-6 rounded-full bg-green-500/20 border border-green-500/30 text-green-400">
              <FaTrophy className="text-5xl" />
            </div>
            <div>
              <h2 className="text-4xl font-black mb-2">Stage Complete!</h2>
              <p className="text-gray-400">You've finished <span className="text-white font-bold">Stage {currentLevelIndex + 1}</span>.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-sm mx-auto">
              <div className="text-sm text-gray-500 uppercase font-black tracking-widest mb-2">Stage Score</div>
              <div className="text-6xl font-black text-green-400">{levelScores[currentLevelIndex]} <span className="text-2xl text-gray-600">/ {questionsPerStage}</span></div>
            </div>

            <button 
              onClick={nextLevel}
              className="px-10 py-4 bg-green-500 hover:bg-green-400 text-black font-black text-xl rounded-2xl transition-all flex items-center gap-3 mx-auto shadow-xl shadow-green-500/20"
            >
              {currentLevelIndex < stagesCount - 1 ? 'NEXT STAGE' : 'SEE FINAL RESULTS'} <FaArrowRight />
            </button>
          </div>
        )}

        {/* FINAL RESULT SCREEN */}
        {gameState === 'finalResult' && (
          <div className="text-center space-y-8 animate-in fade-in duration-1000">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
               <div className="relative bg-black border-4 border-green-500 rounded-full w-48 h-48 flex flex-col items-center justify-center mx-auto shadow-2xl">
                  <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">Your IQ</span>
                  <span className="text-6xl font-black text-white">{calculateIQ()}</span>
               </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                {getIQCategory(calculateIQ())}
              </h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Impressive! You answered {score} out of 100 questions correctly across all cognitive domains.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
               {Array.from({ length: 10 }).map((_, i) => (
                 <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                   <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Stage {i + 1}</div>
                   <div className="text-xl font-bold">{levelScores[i]}<span className="text-xs text-gray-600 ml-1">/ {questionsPerStage}</span></div>
                 </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
              <button 
                onClick={handleStart}
                className="w-full md:w-auto px-8 py-4 bg-green-500 text-black font-black rounded-xl hover:bg-green-400 transition-all flex items-center justify-center gap-2"
              >
                <FaRedo /> RETAKE TEST
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full md:w-auto px-8 py-4 bg-white/10 text-white font-black rounded-xl hover:bg-white/20 transition-all border border-white/10"
              >
                BACK TO GAMES
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default IQTest;
