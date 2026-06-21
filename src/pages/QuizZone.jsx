import React, { useState } from 'react';
import { 
  FaBook, FaCalculator, FaAtom, FaGlobe, FaHourglassHalf, 
  FaHistory, FaLaptopCode, FaBrain, FaPlay, FaCheckCircle, 
  FaTrophy, FaArrowRight 
} from 'react-icons/fa';

const categories = [
  { name: 'English', icon: <FaBook className="text-[#3b82f6]" />, desc: 'Grammar, vocabulary, and reading skills.', bg: 'bg-blue-50 border-[#d8e6f3] hover:border-blue-300' },
  { name: 'Maths', icon: <FaCalculator className="text-[#7c3aed]" />, desc: 'Arithmetic, logical puzzles, and geometry.', bg: 'bg-purple-50 border-[#d8e6f3] hover:border-purple-300' },
  { name: 'Science', icon: <FaAtom className="text-[#10b981]" />, desc: 'Physics, biology, chemistry, and space.', bg: 'bg-emerald-50 border-[#d8e6f3] hover:border-emerald-300' },
  { name: 'GK', icon: <FaGlobe className="text-[#f59e0b]" />, desc: 'General Knowledge and world awareness.', bg: 'bg-amber-50 border-[#d8e6f3] hover:border-amber-300' },
  { name: 'Logical Reasoning', icon: <FaBrain className="text-[#ef4444]" />, desc: 'Deductive puzzles, patterns, and logic sequences.', bg: 'bg-rose-50 border-[#d8e6f3] hover:border-rose-300' },
  { name: 'History', icon: <FaHistory className="text-[#64748b]" />, desc: 'Ancient civilizations, world history, and events.', bg: 'bg-slate-50 border-[#d8e6f3] hover:border-slate-300' },
  { name: 'Geography', icon: <FaGlobe className="text-[#06b6d4]" />, desc: 'Continents, capitals, landforms, and maps.', bg: 'bg-cyan-50 border-[#d8e6f3] hover:border-cyan-300' },
  { name: 'Computer', icon: <FaLaptopCode className="text-[#ec4899]" />, desc: 'Coding logic, internet terms, and operations.', bg: 'bg-pink-50 border-[#d8e6f3] hover:border-pink-300' }
];

const quizQuestions = {
  Maths: [
    { q: "What is the next number in the sequence: 2, 4, 8, 16, ...?", a: ["20", "24", "32", "64"], correct: 2 },
    { q: "If 3x + 5 = 20, what is the value of x?", a: ["3", "4", "5", "6"], correct: 2 },
    { q: "How many sides does a heptagon have?", a: ["6", "7", "8", "9"], correct: 1 }
  ],
  Science: [
    { q: "Which planet is known as the Red Planet?", a: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2 },
    { q: "What is the chemical symbol for Water?", a: ["H2O", "O2", "CO2", "H2"], correct: 0 },
    { q: "What gas do plants absorb from the atmosphere?", a: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 }
  ],
  English: [
    { q: "What is a synonym for 'Accelerate'?", a: ["Slowing", "Hurry", "Pause", "Delay"], correct: 1 },
    { q: "Which of the following is a noun?", a: ["Run", "Beautiful", "Smart", "School"], correct: 3 },
    { q: "Identify the correct spelling:", a: ["Recieve", "Receive", "Recievee", "Receve"], correct: 1 }
  ],
  GK: [
    { q: "Which is the largest ocean on Earth?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
    { q: "What is the capital of France?", a: ["Berlin", "London", "Madrid", "Paris"], correct: 3 },
    { q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], correct: 1 }
  ]
};

const QuizZone = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const startQuiz = (category) => {
    if (!quizQuestions[category]) {
      alert("This category quiz is coming soon! Try English, Maths, Science or GK.");
      return;
    }
    setSelectedCategory(category);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    setXpGained(0);
  };

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    const questions = quizQuestions[selectedCategory];
    const isCorrect = selectedAnswer === questions[currentQuestionIdx].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      const calculatedXp = finalScore * 20;
      setIsFinished(true);
      setXpGained(calculatedXp);
      
      // Save streak / high scores locally
      const currentXp = parseInt(localStorage.getItem('user_xp') || '0');
      localStorage.setItem('user_xp', currentXp + calculatedXp);
      const currentStreak = parseInt(localStorage.getItem('user_streak') || '0');
      localStorage.setItem('user_streak', Math.max(1, currentStreak + 1));
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Banner Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#18609e] text-xs font-semibold mb-4 shadow-sm">
            <FaHourglassHalf className="animate-spin" />
            <span>Smart Quiz Zone</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#254f85] tracking-tight mb-4">
            Adaptive Knowledge <span className="text-[#18609e]">Quizzes</span>
          </h1>
          <p className="text-[#6495c6] text-base md:text-lg max-w-2xl mx-auto">
            Test your speed, knowledge, and problem-solving. Choose a subject and accelerate your learning score.
          </p>
        </div>

        {/* If quiz is active */}
        {selectedCategory ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]">
            {!isFinished ? (
              <div>
                {/* Header info */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-[#18609e] uppercase tracking-wider">{selectedCategory} Quiz</span>
                  <span className="text-xs font-bold text-[#6495c6]">
                    Question {currentQuestionIdx + 1} of {quizQuestions[selectedCategory].length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#d8e6f3] h-2 rounded-full mb-8 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-[#61b2e4] to-[#18609e] h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / quizQuestions[selectedCategory].length) * 100}%` }}
                  ></div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-[#254f85] mb-8 leading-normal">
                  {quizQuestions[selectedCategory][currentQuestionIdx].q}
                </h3>

                {/* Answers Grid */}
                <div className="space-y-4 mb-8">
                  {quizQuestions[selectedCategory][currentQuestionIdx].a.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerClick(idx)}
                      className={`cursor-pointer w-full text-left px-6 py-4.5 rounded-2xl border font-semibold text-sm transition-all duration-200 ${
                        selectedAnswer === idx 
                          ? 'border-[#18609e] bg-[#e0f2fe] text-[#18609e] shadow-md' 
                          : 'border-[#d8e6f3] bg-white text-[#334155] hover:bg-blue-50 hover:border-[#61b2e4]'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-100 text-[#6495c6] text-center text-xs font-bold mr-3.5 leading-6 align-middle">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span className="align-middle">{option}</span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3.5 rounded-full text-sm font-bold shadow-[0_4px_14px_rgba(24,96,158,0.39)] transition-all flex items-center gap-2 ${
                      selectedAnswer !== null 
                        ? 'bg-[#18609e] hover:bg-[#145084] text-white cursor-pointer hover:-translate-y-0.5' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-[#d8e6f3]'
                    }`}
                  >
                    <span>Next Question</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ) : (
              /* Completed View */
              <div className="text-center py-6">
                <div className="inline-flex p-4 bg-blue-50 rounded-full text-[#18609e] border border-blue-100 mb-6 animate-bounce shadow-sm">
                  <FaTrophy className="text-5xl" />
                </div>
                <h3 className="text-3xl font-black text-[#254f85] mb-2">Quiz Completed!</h3>
                <p className="text-[#6495c6] text-sm mb-6">
                  You scored <span className="text-[#18609e] font-bold">{score} / {quizQuestions[selectedCategory].length}</span> in {selectedCategory}.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                  <div className="bg-slate-50 border border-[#d8e6f3] rounded-2xl p-4 shadow-inner">
                    <p className="text-[10px] uppercase font-bold text-[#6495c6] tracking-wider">XP Earned</p>
                    <span className="text-2xl font-black text-[#7c3aed] mt-1 block">+{xpGained} XP</span>
                  </div>
                  <div className="bg-slate-50 border border-[#d8e6f3] rounded-2xl p-4 shadow-inner">
                    <p className="text-[10px] uppercase font-bold text-[#6495c6] tracking-wider">Daily Streak</p>
                    <span className="text-2xl font-black text-[#f59e0b] mt-1 block">Level Up!</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => startQuiz(selectedCategory)}
                    className="cursor-pointer px-6 py-3.5 rounded-full shadow-[0_4px_14px_rgba(24,96,158,0.39)] bg-[#18609e] hover:bg-[#145084] text-white font-bold text-sm transition-all"
                  >
                    Retry Quiz
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="cursor-pointer px-6 py-3.5 rounded-full bg-white border border-[#18609e] text-[#18609e] font-bold text-sm transition-all hover:bg-blue-50"
                  >
                    Back to Subjects
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Grid list of categories */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className={`group bg-white rounded-3xl border border-[#d8e6f3] p-6 shadow-[0_4px_20px_rgba(8,_112,_184,_0.05)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 flex flex-col justify-between overflow-hidden relative z-10 ${cat.bg}`}
              >
                <div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-xl mb-5 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#254f85] mb-2">{cat.name}</h3>
                  <p className="text-xs text-[#6495c6] leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>
                
                <button
                  onClick={() => startQuiz(cat.name)}
                  className="cursor-pointer w-full py-3.5 bg-white hover:bg-[#18609e] hover:text-white border border-[#d8e6f3] hover:border-[#18609e] rounded-2xl text-xs font-bold text-[#334155] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaPlay className="text-[9px]" />
                  <span>Start Practice</span>
                </button>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default QuizZone;
