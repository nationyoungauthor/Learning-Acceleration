import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaClock } from 'react-icons/fa';

const COLORS = [
  { name: 'RED', hex: '#ef4444', class: 'bg-red-500 hover:bg-red-400' },
  { name: 'BLUE', hex: '#3b82f6', class: 'bg-blue-500 hover:bg-blue-400' },
  { name: 'GREEN', hex: '#22c55e', class: 'bg-green-500 hover:bg-green-400' },
  { name: 'YELLOW', hex: '#eab308', class: 'bg-yellow-500 hover:bg-yellow-400' },
  { name: 'PURPLE', hex: '#a855f7', class: 'bg-purple-500 hover:bg-purple-400' },
  { name: 'ORANGE', hex: '#f97316', class: 'bg-orange-500 hover:bg-orange-400' }
];

const StroopTest = () => {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [currentWord, setCurrentWord] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('stroopTestHighScore')) || 0
  );
  
  const [message, setMessage] = useState('Stroop Test');
  const [subMessage, setSubMessage] = useState('Test your inhibitory control by selecting the INK COLOR of the text, not the word itself.');

  const generateRound = useCallback(() => {
    const wordObj = COLORS[Math.floor(Math.random() * COLORS.length)];
    let colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    if (Math.random() < 0.7) {
      while (colorObj.name === wordObj.name) {
        colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
    }
    
    setCurrentWord(wordObj);
    setCurrentColor(colorObj);
  }, []);

  const startGame = () => {
    setScore(0);
    setRounds(0);
    setCorrect(0);
    setTimeLeft(60);
    setGameState('playing');
    setMessage('Select the INK COLOR');
    setSubMessage('');
    generateRound();
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const endGame = () => {
    setGameState('over');
    setMessage('Time\'s Up!');
    const acc = rounds === 0 ? 100 : Math.round((correct / rounds) * 100);
    setSubMessage(`Score: ${score}\nAccuracy: ${acc}% (${correct}/${rounds})`);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('stroopTestHighScore', score);
    }
  };

  const handleColorClick = (clickedColorName) => {
    if (gameState !== 'playing') return;
    setRounds(prev => prev + 1);
    
    if (clickedColorName === currentColor.name) {
      setScore(prev => prev + 10);
      setCorrect(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
    generateRound();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Stroop Test</span>
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
              <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-200 shadow-sm mt-2 md:mt-0 font-bold text-lg text-[#0F172A]">
                <FaClock className="text-blue-500" /> {timeLeft}s
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
           <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Game Area */}
        {gameState === 'playing' && currentWord && currentColor && (
          <div className="flex flex-col items-center w-full">
            <div className="mb-10 h-24 flex items-center justify-center bg-gray-50 w-full max-w-[80%] rounded-2xl shadow-inner border border-gray-200">
              <h2 
                className="text-5xl md:text-6xl font-black tracking-widest uppercase transition-colors duration-100 drop-shadow-sm"
                style={{ color: currentColor.hex }}
              >
                {currentWord.name}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-[400px]">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleColorClick(c.name)}
                  className={`${c.class} transition-all duration-150 py-4 px-2 rounded-xl font-bold text-white shadow-md hover:shadow-lg border border-transparent hover:-translate-y-1 text-sm md:text-base uppercase tracking-wider active:scale-95`}
                >
                  {c.name}
                </button>
              ))}
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

export default StroopTest;
