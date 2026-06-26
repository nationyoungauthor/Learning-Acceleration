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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center pt-24 pb-12 px-4">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none"></div>

      <div className="w-full max-w-3xl z-10 relative">

        {/* START SCREEN */}
        {gameState === 'start' && (
          <div className="text-center space-y-8 animate-in fade-in duration-700 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-3xl p-10 md:p-16 border border-slate-100">
            <div className="inline-flex p-5 rounded-3xl bg-blue-50 border border-blue-100 shadow-sm mb-4">
              <FaBrain className="text-6xl text-[#4281c7]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#254f85]">
              Ultimate IQ Challenge
            </h1>
            <p className="text-[#6495c6] text-lg max-w-xl mx-auto">
              Test your cognitive abilities across 100 mixed questions. Shuffled on every start to provide a unique challenge every time.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="p-3 rounded-xl bg-slate-50 border border-[#d8e6f3] text-xs font-semibold text-[#6495c6] shadow-sm">
                  Stage {index + 1}
                </div>
              ))}
            </div>
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-[#18609e] hover:bg-[#145084] text-white font-bold text-xl rounded-full transition-all hover:shadow-lg flex items-center gap-3 mx-auto shadow-[0_4px_14px_rgba(24,96,158,0.39)] cursor-pointer"
            >
              START TEST <FaArrowRight />
            </button>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'playing' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header Info */}
            <div className="flex justify-between items-end mb-2 px-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#4281c7] mb-1 block">Stage {currentLevelIndex + 1}</span>
                <h2 className="text-2xl font-bold text-[#254f85]">Cognitive Challenge</h2>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-[#6495c6]">Question</span>
                <div className="text-2xl font-black text-[#18609e]">{currentQuestionIndex + 1} <span className="text-[#a8c6e2]">/ {questionsPerStage}</span></div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#61b2e4] to-[#18609e] transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questionsPerStage) * 100}%` }}
              ></div>
            </div>

            {/* Question Card */}
            {currentQuestion && (
              <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] relative overflow-hidden group">
                {/* Timer Bar */}
                <div
                  className={`absolute top-0 left-0 h-1 transition-all duration-1000 linear ${timeLeft < 10 ? 'bg-red-400' : 'bg-[#61b2e4]'}`}
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>

                <h3 className="text-xl md:text-2xl font-medium text-[#254f85] leading-relaxed mb-8">
                  {currentQuestion.question}
                </h3>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswered}
                      className={`
                        cursor-pointer w-full p-5 rounded-2xl text-left transition-all flex items-center justify-between group/opt shadow-sm
                        ${!isAnswered ? 'bg-white hover:bg-blue-50 border border-[#d8e6f3] text-[#334155] hover:border-[#61b2e4]' : ''}
                        ${isAnswered && option === currentQuestion.answer ? 'bg-[#e0f2fe] border border-[#4281c7] text-[#18609e] shadow-md font-medium' : ''}
                        ${isAnswered && selectedOption === option && option !== currentQuestion.answer ? 'bg-red-50 border border-red-400 text-red-600 shadow-md font-medium' : ''}
                        ${isAnswered && option !== currentQuestion.answer && option !== selectedOption ? 'bg-slate-50 opacity-50 border border-[#d8e6f3] text-[#94a3b8]' : ''}
                      `}
                    >
                      <span className="text-lg">{option}</span>
                      {isAnswered && option === currentQuestion.answer && <FaCheckCircle className="text-[#4281c7] text-xl" />}
                      {isAnswered && selectedOption === option && option !== currentQuestion.answer && <FaTimesCircle className="text-red-500 text-xl" />}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="mt-8 flex justify-end animate-in fade-in slide-in-from-right-4 duration-300">
                    <button
                      onClick={handleNext}
                      className="cursor-pointer px-8 py-3 bg-[#18609e] text-white font-bold rounded-full hover:bg-[#145084] transition-colors flex items-center gap-2 shadow-[0_4px_14px_rgba(24,96,158,0.39)]"
                    >
                      {currentQuestionIndex < questionsPerStage - 1 ? 'Next Question' : 'Finish Stage'} <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <span className="text-xs text-[#6495c6] uppercase tracking-widest font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-[#d8e6f3]">
                Total Correct: {score}
              </span>
            </div>
          </div>
        )}

        {/* LEVEL SUMMARY SCREEN */}
        {gameState === 'levelSummary' && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-3xl p-10 border border-slate-100">
            <div className="inline-flex p-6 rounded-full bg-amber-50 border border-amber-200 text-amber-500 shadow-sm">
              <FaTrophy className="text-5xl" />
            </div>
            <div>
              <h2 className="text-4xl font-black mb-2 text-[#254f85]">Stage Complete!</h2>
              <p className="text-[#6495c6]">You've finished <span className="text-[#18609e] font-bold">Stage {currentLevelIndex + 1}</span>.</p>
            </div>

            <div className="bg-slate-50 border border-[#d8e6f3] shadow-inner rounded-3xl p-8 max-w-sm mx-auto">
              <div className="text-sm text-[#6495c6] uppercase font-bold tracking-widest mb-2">Stage Score</div>
              <div className="text-6xl font-black text-[#18609e]">{levelScores[currentLevelIndex]} <span className="text-2xl text-[#a8c6e2]">/ {questionsPerStage}</span></div>
            </div>

            <button
              onClick={nextLevel}
              className="cursor-pointer px-10 py-4 bg-[#18609e] hover:bg-[#145084] text-white font-bold text-xl rounded-full transition-all flex items-center gap-3 mx-auto shadow-[0_4px_14px_rgba(24,96,158,0.39)]"
            >
              {currentLevelIndex < stagesCount - 1 ? 'NEXT STAGE' : 'SEE FINAL RESULTS'} <FaArrowRight />
            </button>
          </div>
        )}

        {/* FINAL RESULT SCREEN */}
        {gameState === 'finalResult' && (
          <div className="text-center space-y-8 animate-in fade-in duration-1000 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-3xl p-10 md:p-14 border border-slate-100">
            <div className="relative inline-block mt-4">
              <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full"></div>
              <div className="relative bg-white border-[6px] border-[#4281c7] rounded-full w-48 h-48 flex flex-col items-center justify-center mx-auto shadow-2xl">
                <span className="text-sm text-[#6495c6] font-bold uppercase tracking-widest mb-1">Your IQ</span>
                <span className="text-6xl font-black text-[#18609e]">{calculateIQ()}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-4xl font-black text-[#254f85]">
                {getIQCategory(calculateIQ())}
              </h2>
              <p className="text-[#6495c6] text-lg max-w-md mx-auto">
                Impressive! You answered {score} out of 100 questions correctly across all cognitive domains.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-[#d8e6f3] shadow-sm">
                  <div className="text-[10px] text-[#6495c6] uppercase font-bold mb-1">Stage {i + 1}</div>
                  <div className="text-xl font-bold text-[#254f85]">{levelScores[i]}<span className="text-xs text-[#a8c6e2] ml-1">/ {questionsPerStage}</span></div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStart}
                className="cursor-pointer w-full md:w-auto px-8 py-4 bg-[#18609e] text-white font-bold rounded-full hover:bg-[#145084] shadow-[0_4px_14px_rgba(24,96,158,0.39)] transition-all flex items-center justify-center gap-2"
              >
                <FaRedo /> RETAKE TEST
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="cursor-pointer w-full md:w-auto px-8 py-4 bg-white text-[#18609e] font-bold rounded-full hover:bg-blue-50 transition-all border border-[#18609e]"
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
