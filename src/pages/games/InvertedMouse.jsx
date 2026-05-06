import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const InvertedMouse = () => {
  const [gameState, setGameState] = useState('menu');
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('invertedMouseHighScore')) || 0
  );
  
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [cursorPos, setCursorPos] = useState({ x: 250, y: 200 });
  const [targetPos, setTargetPos] = useState({ x: 250, y: 200 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const [message, setMessage] = useState('Inverted Mouse');
  const [subMessage, setSubMessage] = useState('Move your cursor to the target with fully reversed controls. Hover each numbered circle to score as many points as possible in 60 seconds.');

  const spawnTarget = useCallback(() => {
    // Container is 500x400 roughly, let's keep targets within safe bounds (50px margin)
    const x = Math.floor(Math.random() * 400) + 50;
    const y = Math.floor(Math.random() * 300) + 50;
    setTargetPos({ x, y });
    setIsHovering(false);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameState('playing');
    setMessage('Hover the target!');
    setSubMessage('');
    spawnTarget();
    setCursorPos({ x: 250, y: 200 });
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    setGameState('over');
    setMessage('Time Up!');
    setSubMessage(`You collected ${score} targets.`);
  };

  // We need to use a ref to get the latest score inside the interval or use functional updates.
  // We are using functional updates for timeLeft, and score is updated on mouse move.

  const handleMouseMove = (e) => {
    if (gameState !== 'playing' || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Invert the coordinates
    let invX = centerX - (mouseX - centerX);
    let invY = centerY - (mouseY - centerY);

    // Keep inverted cursor within bounds
    invX = Math.max(0, Math.min(invX, rect.width));
    invY = Math.max(0, Math.min(invY, rect.height));

    setCursorPos({ x: invX, y: invY });

    // Check collision with target (target radius is 20px)
    const dist = Math.hypot(invX - targetPos.x, invY - targetPos.y);
    if (dist < 20) {
      if (!isHovering) {
        setIsHovering(true);
        // Collect target
        setScore(s => {
          const newScore = s + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('invertedMouseHighScore', newScore.toString());
          }
          return newScore;
        });
        spawnTarget();
      }
    } else {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      <div className="w-full max-w-2xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">Inverted Mouse</span>
      </div>

      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               {gameState === 'playing' ? (
                 <span className="text-lg">Score: {score}</span>
               ) : (
                 <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
               )}
            </div>
            
            <div className="flex space-x-3 text-xl text-gray-300 mt-2 md:mt-0">
               {gameState === 'playing' && (
                 <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold flex items-center mr-2 shadow-sm border border-red-200">
                    {timeLeft}s
                 </div>
               )}
               <button className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-[#ff1e00] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-[#ff1e00] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        <div className="text-center mt-[80px] md:mt-[70px] mb-4 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">{message}</h2>
           <p className="text-base md:text-lg text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
        </div>

        {gameState === 'playing' && (
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="w-full max-w-[500px] h-[400px] bg-[#0f172a] rounded-xl border-4 border-slate-700 relative overflow-hidden cursor-none shadow-inner mx-auto touch-none"
          >
             {/* Target Circle */}
             <div 
               className="absolute w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.6)] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
               style={{ left: targetPos.x, top: targetPos.y }}
             >
                <span className="text-slate-900 font-bold text-lg">{score + 1}</span>
             </div>
             
             {/* Inverted Custom Cursor */}
             <div 
               className="absolute w-4 h-4 bg-zinc-900 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-10"
               style={{ left: cursorPos.x, top: cursorPos.y }}
             >
                <div className="absolute top-1/2 left-1/2 w-8 h-8 border-2 border-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
             </div>
          </div>
        )}

        {gameState === 'over' && (
          <div className="w-full max-w-sm flex flex-col items-center mt-4">
             <div className="text-5xl md:text-6xl font-black mb-4 tracking-widest text-center text-teal-600 drop-shadow-md">
                {score} <span className="text-2xl text-gray-500">targets</span>
             </div>
          </div>
        )}

        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-10 py-4 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Play Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default InvertedMouse;
