import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaLightbulb, FaForward, FaHeart } from 'react-icons/fa';

const WORD_LIST = [
  'UPGRADE', 'LOGICAL', 'PATTERN', 'MEMORY', 'PUZZLE', 'ATTENTION', 'FOCUS', 'BRAIN',
  'COGNITIVE', 'RECALL', 'SCIENCE', 'TRAINING', 'NEURON', 'SYNAPSE', 'LEARNING',
  'ABILITY', 'COMPLEX', 'SKILL', 'SOLVE', 'THINK', 'SPEED', 'ACCURACY', 'REFLEX',
  'SYSTEM', 'PROCESS', 'METHOD', 'THEORY', 'CONCEPT', 'DESIGN', 'CREATE', 'IMPROVE'
];

const WordScramble = () => {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [wordsSolved, setWordsSolved] = useState(0);
  
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('wordScrambleHighScore')) || 0
  );
  
  const [message, setMessage] = useState('Word Scramble');
  const [subMessage, setSubMessage] = useState('Unscramble letters to form valid words. Test your vocabulary and pattern recognition skills.');
  const [feedback, setFeedback] = useState('');
  
  const inputRef = useRef(null);

  const shuffleWord = (word) => {
    let arr = word.split('');
    let currentIndex = arr.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    const result = arr.join('');
    if (result === word && word.length > 1) return shuffleWord(word);
    return result;
  };

  const nextWord = () => {
    const word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setCurrentWord(word);
    setScrambledWord(shuffleWord(word));
    setUserInput('');
    setFeedback('');
    if (inputRef.current) inputRef.current.focus();
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setWordsSolved(0);
    setGameState('playing');
    setMessage('Unscramble the word');
    setSubMessage('');
    nextWord();
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!userInput) return;
    
    if (userInput.toUpperCase() === currentWord) {
      const pts = 10 + streak * 2;
      const newScore = score + pts;
      setScore(newScore);
      setStreak(prev => prev + 1);
      setWordsSolved(prev => prev + 1);
      setFeedback(`+${pts} pts!`);
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('wordScrambleHighScore', newScore);
      }
      
      setTimeout(() => nextWord(), 800);
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
      setFeedback('Incorrect!');
      setUserInput('');
      
      if (lives <= 1) {
        setTimeout(() => {
          setGameState('over');
          setMessage('Game Over!');
          setSubMessage(`Final Score: ${score}\nWords Solved: ${wordsSolved}`);
        }, 800);
      }
    }
  };

  const handleHint = () => {
    if (score >= 5) {
      setScore(prev => prev - 5);
      for (let i = 0; i < currentWord.length; i++) {
        if (!userInput[i] || userInput[i].toUpperCase() !== currentWord[i]) {
          const newUserInput = userInput.slice(0, i) + currentWord[i];
          setUserInput(newUserInput);
          break;
        }
      }
      inputRef.current?.focus();
    } else {
      setFeedback('Not enough points (need 5)');
    }
  };

  const handleSkip = () => {
    setStreak(0);
    setLives(prev => prev - 1);
    if (lives <= 1) {
      setGameState('over');
      setMessage('Game Over!');
      setSubMessage(`Final Score: ${score}\nWords Solved: ${wordsSolved}`);
    } else {
      nextWord();
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, scrambledWord]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Word Scramble</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl md:p-6 p-4 shadow-md flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-sm border border-gray-200">
               <span className="text-lg text-[#0F172A]">Score: {gameState === 'menu' ? '-' : score}</span>
               <span className="text-yellow-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            {gameState === 'playing' && (
              <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-200 shadow-sm mt-2 md:mt-0">
                <span className="text-sm font-medium mr-1 text-[#64748B]">Lives:</span>
                {[...Array(3)].map((_, i) => (
                  <FaHeart key={i} className={`text-sm ${i < lives ? 'text-red-500' : 'text-gray-300'}`} />
                ))}
              </div>
            )}

            <div className="flex space-x-3 text-xl text-[#64748B] mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Text Area */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-display mb-3 text-[#0F172A] transition-opacity duration-300">{message}</h2>
           
           {gameState === 'playing' ? (
             <div className="flex justify-center gap-4 mb-2 text-sm md:text-base font-bold text-[#64748B]">
               <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200 shadow-sm">Words: {wordsSolved}</div>
               <div className="bg-orange-50 px-3 py-1 rounded-full border border-orange-200 shadow-sm text-orange-600">Streak: {streak} 🔥</div>
             </div>
           ) : (
             <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
           )}
        </div>

        {/* Game Area */}
        {gameState === 'playing' && (
          <div className="w-full max-w-md bg-gray-50 rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-200 text-center relative mt-4">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#0F172A] tracking-[0.3em] ml-2 drop-shadow-sm">
              {scrambledWord}
            </h2>
            
            <form onSubmit={handleInputSubmit} className="w-full relative mb-6">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                placeholder="YOUR ANSWER"
                className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-4 text-2xl font-bold text-center text-[#0F172A] focus:outline-none focus:border-blue-500 transition-colors shadow-inner placeholder-gray-400 uppercase"
                autoFocus
              />
              {feedback && (
                <div className={`absolute -bottom-6 left-0 right-0 text-sm font-bold ${feedback.includes('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  {feedback}
                </div>
              )}
            </form>
            
            <div className="flex justify-center gap-2 md:gap-4 mt-8">
              <button
                onClick={handleHint}
                type="button"
                className="flex items-center gap-1 md:gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 border border-blue-200 transition-colors text-sm md:text-base"
              >
                <FaLightbulb /> Hint
              </button>
              <button
                type="button"
                onClick={handleInputSubmit}
                className="flex-grow px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md text-sm md:text-base"
              >
                Submit
              </button>
              <button
                onClick={handleSkip}
                type="button"
                className="flex items-center gap-1 md:gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 border border-gray-200 transition-colors text-sm md:text-base"
              >
                Skip <FaForward />
              </button>
            </div>
          </div>
        )}

        {/* Play Button overlay if not playing */}
        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default WordScramble;
