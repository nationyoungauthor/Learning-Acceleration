import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaClock } from 'react-icons/fa';

const TARGET_COLORS = [
  { name: 'GREEN', hex: '#22c55e', bg: 'bg-green-500' },
  { name: 'RED', hex: '#ef4444', bg: 'bg-red-500' },
  { name: 'BLUE', hex: '#3b82f6', bg: 'bg-blue-500' }
];

const ColorTarget = () => {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetColor, setTargetColor] = useState(null);
  const [dots, setDots] = useState([]);
  
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('colorTargetHighScore')) || 0
  );
  
  const [message, setMessage] = useState('Color Target');
  const [subMessage, setSubMessage] = useState('Click all targets of the specified color as quickly as possible. Don\'t click the wrong colors!');

  const generateLevel = (currentLevel) => {
    const color = TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)];
    setTargetColor(color);
    
    const totalDots = 10 + Math.floor(currentLevel * 2);
    const targetCount = Math.floor(totalDots * 0.4); 
    
    let newDots = [];
    for (let i = 0; i < totalDots; i++) {
      const isTarget = i < targetCount;
      let dotColor = color;
      if (!isTarget) {
        do {
          dotColor = TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)];
        } while (dotColor.name === color.name);
      }
      
      newDots.push({
        id: i,
        color: dotColor,
        isTarget,
        x: Math.random() * 80 + 10, 
        y: Math.random() * 80 + 10,
        clicked: false,
        mistake: false
      });
    }
    
    newDots = newDots.sort(() => Math.random() - 0.5);
    setDots(newDots);
    setTimeLeft(Math.max(3, 10 - Math.floor(currentLevel / 3)));
  };

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setGameState('playing');
    setMessage('Find the targets!');
    setSubMessage('');
    generateLevel(1);
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'playing' && dots.length > 0) {
      const allTargetsClicked = dots.filter(d => d.isTarget).every(d => d.clicked);
      if (allTargetsClicked) {
        const newScore = score + 10 + timeLeft * 2;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('colorTargetHighScore', newScore);
        }
        setLevel(prev => prev + 1);
        generateLevel(level + 1);
      }
    }
  }, [dots]);

  const endGame = () => {
    setGameState('over');
    setMessage('Game Over!');
    setSubMessage(`You reached Level ${level} with a score of ${score}`);
  };

  const handleDotClick = (id) => {
    if (gameState !== 'playing') return;
    
    setDots(dots.map(dot => {
      if (dot.id === id) {
        if (!dot.isTarget) {
          endGame();
          return { ...dot, mistake: true };
        }
        return { ...dot, clicked: true };
      }
      return dot;
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      {/* Breadcrumbs */}
      <div className="w-full max-w-2xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">Color Target</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Level: {gameState === 'menu' ? '-' : level}</span>
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            {gameState === 'playing' && (
              <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 items-center gap-2 border border-white/5 shadow-lg mt-2 md:mt-0 font-bold text-lg text-gray-400">
                <FaClock /> {timeLeft}s
              </div>
            )}

            <div className="flex space-x-3 text-xl text-gray-300 mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-[#ff1e00] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-[#ff1e00] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Text Area */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">{message}</h2>
           
           {gameState === 'playing' && targetColor ? (
             <div className="flex items-center justify-center gap-3">
               <span className="text-xl font-bold">Target:</span>
               <span className="text-2xl font-black uppercase tracking-wider drop-shadow-md" style={{ color: targetColor.hex }}>
                 {targetColor.name}
               </span>
             </div>
           ) : (
             <p className="text-base md:text-lg text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
           )}
        </div>

        {/* Game Area */}
        {gameState === 'playing' && targetColor && (
          <div className="w-full max-w-[500px] aspect-[4/3] bg-black/20 rounded-2xl border border-white/10 shadow-inner relative overflow-hidden">
            {dots.map(dot => {
              if (dot.clicked) return null;
              return (
                <button
                  key={dot.id}
                  onClick={() => handleDotClick(dot.id)}
                  className={`absolute w-10 h-10 md:w-14 md:h-14 rounded-full ${dot.color.bg} shadow-lg border-t border-white/20 transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 active:scale-90 flex items-center justify-center`}
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                >
                  {dot.mistake && <div className="text-white font-bold text-2xl drop-shadow-md">✗</div>}
                </button>
              )
            })}
          </div>
        )}

        {/* Play Button overlay if not playing */}
        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-8 py-3 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default ColorTarget;
