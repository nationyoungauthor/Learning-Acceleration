import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaGraduationCap, FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';

const wordPool = [
  { english: 'Book', foreign: 'Libri' },
  { english: 'Sun', foreign: 'Solis' },
  { english: 'Water', foreign: 'Aqua' },
  { english: 'Fire', foreign: 'Ignis' },
  { english: 'Apple', foreign: 'Mila' },
  { english: 'Dog', foreign: 'Kano' },
  { english: 'Cat', foreign: 'Felis' },
  { english: 'Bird', foreign: 'Avis' },
  { english: 'Tree', foreign: 'Arbor' },
  { english: 'Star', foreign: 'Astra' },
  { english: 'Wind', foreign: 'Venti' },
  { english: 'Moon', foreign: 'Luna' },
  { english: 'Gold', foreign: 'Auru' },
  { english: 'Silver', foreign: 'Plata' },
  { english: 'Iron', foreign: 'Ferro' },
  { english: 'River', foreign: 'Flumen' },
  { english: 'Mountain', foreign: 'Mons' },
  { english: 'Sea', foreign: 'Mare' }
];

const AssociationLearning = () => {
  const [gameState, setGameState] = useState('menu'); // menu, study, quiz, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('associationLearningHighScore')) || 0
  );
  
  const [level, setLevel] = useState(1);
  const [currentPairs, setCurrentPairs] = useState([]);
  const [studyTimeLeft, setStudyTimeLeft] = useState(12);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answersStatus, setAnswersStatus] = useState([]);
  const [score, setScore] = useState(0);
  const [studyProgress, setStudyProgress] = useState(100);

  const studyTimerRef = useRef();
  const startTimeRef = useRef();

  const [message, setMessage] = useState('Association Learning');
  const [subMessage, setSubMessage] = useState('Memorize foreign vocabulary word pairs, then test your active recall accuracy and speed.');

  const setupLevel = (lvl) => {
    const numPairs = 3 + lvl;
    const studyDuration = 9 + lvl * 3;
    
    const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numPairs);
    
    setCurrentPairs(selected);
    setStudyTimeLeft(studyDuration);
    setStudyProgress(100);
    
    const qList = selected.map(pair => {
      const poolWithoutCurrent = wordPool.filter(w => w.english !== pair.english);
      const wrongShuffled = poolWithoutCurrent.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [pair.english, ...wrongShuffled.map(w => w.english)].sort(() => 0.5 - Math.random());
      
      return {
        foreign: pair.foreign,
        correct: pair.english,
        options: options
      };
    });
    
    setQuestions(qList);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswersStatus([]);
  };

  const startTraining = () => {
    setLevel(1);
    setScore(0);
    setGameState('study');
    setMessage('Study Phase');
    setSubMessage('Memorize the word pairs before the timer runs out!');
    setupLevel(1);
  };

  useEffect(() => {
    if (gameState === 'study') {
      const duration = 9 + level * 3;
      studyTimerRef.current = setInterval(() => {
        setStudyTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(studyTimerRef.current);
            setGameState('quiz');
            setMessage('What does this word mean?');
            setSubMessage('');
            startTimeRef.current = performance.now();
            return 0;
          }
          const next = prev - 1;
          setStudyProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(studyTimerRef.current);
  }, [gameState, level]);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    
    const isCorrect = option === questions[currentQuestionIdx].correct;
    const nextStatus = isCorrect ? 'correct' : 'incorrect';
    setAnswersStatus(prev => [...prev, nextStatus]);

    if (isCorrect) {
      setScore(prev => prev + 150);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      if (level < 3) {
        setLevel(prev => prev + 1);
        setGameState('study');
        setMessage('Study Phase');
        setSubMessage('Memorize the word pairs before the timer runs out!');
        setupLevel(level + 1);
      } else {
        const totalDuration = (performance.now() - startTimeRef.current) / 1000;
        const finalScore = Math.max(0, score + Math.floor(100 - totalDuration) * 5);
        setScore(finalScore);
        
        if (finalScore > highScore) {
          setHighScore(finalScore);
          localStorage.setItem('associationLearningHighScore', finalScore.toString());
        }
        setGameState('over');
        setMessage('Training Complete!');
        setSubMessage('You have successfully tested your vocab associations.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <Link to="/games" className="hover:text-[#2563EB] transition-colors">Games</Link>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Association Learning</span>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl md:p-6 p-4 shadow-md flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Header Toolbar */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex text-[#0F172A] flex-col font-bold self-start mt-2 md:mt-0 shadow-sm border border-gray-200">
               <span className="text-yellow-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore} pts</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-[#64748B] mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Dynamic header info */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-display mb-3 text-[#0F172A] transition-opacity duration-300">{message}</h2>
           <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* State: MENU */}
        {gameState === 'menu' && (
          <div className="text-center w-full flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 border border-blue-200">
              <FaGraduationCap className="text-3xl" />
            </div>
            <button 
              onClick={startTraining}
              className="cursor-pointer px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
              Start Training
            </button>
          </div>
        )}

        {/* State: STUDY */}
        {gameState === 'study' && (
          <div className="w-full text-center">
            {/* Time Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 mb-8 max-w-md mx-auto relative overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${studyProgress}%` }}
              ></div>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-[#254f85]">{studyTimeLeft}s</span>
            </div>

            {/* Word Pairs Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {currentPairs.map((pair, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-blue-400 transition-colors">
                  <span className="text-xs font-bold text-[#6495c6] uppercase tracking-wider">English</span>
                  <span className="text-lg font-black text-[#254f85] mb-2">{pair.english}</span>
                  <div className="w-8 h-[1px] bg-slate-300 my-1"></div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mt-2">Foreign</span>
                  <span className="text-lg font-black text-blue-600">{pair.foreign}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State: QUIZ */}
        {gameState === 'quiz' && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-3xl p-6 text-center mb-8 shadow-sm">
              <span className="text-xs font-bold text-[#6495c6] uppercase tracking-wider block mb-1">Foreign Word</span>
              <span className="text-4xl font-extrabold text-[#254f85]">{questions[currentQuestionIdx].foreign}</span>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
              {questions[currentQuestionIdx].options.map((option, index) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === questions[currentQuestionIdx].correct;
                
                let buttonStyle = "bg-white text-[#254f85] border-slate-200 hover:border-blue-400 hover:bg-blue-50/50";
                let statusIcon = null;

                if (selectedOption !== null) {
                  if (isCorrectOption) {
                    buttonStyle = "bg-emerald-500 text-white border-emerald-500 shadow-md";
                    statusIcon = <FaCheckCircle className="text-white ml-2 text-lg" />;
                  } else if (isSelected) {
                    buttonStyle = "bg-red-500 text-white border-red-500 shadow-md";
                    statusIcon = <FaTimesCircle className="text-white ml-2 text-lg" />;
                  } else {
                    buttonStyle = "bg-white text-slate-400 border-slate-100 opacity-60 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={selectedOption !== null}
                    className={`cursor-pointer px-6 py-4 border-2 rounded-2xl font-bold transition-all text-center flex items-center justify-center ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {statusIcon}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {selectedOption !== null && (
              <button
                onClick={handleNextQuestion}
                className="cursor-pointer px-8 py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full font-bold shadow-md transition-all flex items-center gap-2 animate-bounce"
              >
                <span>{currentQuestionIdx === questions.length - 1 ? (level === 3 ? 'Finish Game' : 'Next Level') : 'Next Question'}</span>
                <FaArrowRight />
              </button>
            )}
          </div>
        )}

        {/* State: OVER */}
        {gameState === 'over' && (
          <div className="w-full text-center flex flex-col items-center">
            <div className="text-6xl font-black text-[#2563EB] mb-8 drop-shadow-sm">
              {score} <span className="text-xl text-[#64748B]">pts</span>
            </div>

            <button
              onClick={startTraining}
              className="cursor-pointer px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all border border-transparent"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociationLearning;
