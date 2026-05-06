import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaBackspace } from 'react-icons/fa';

const initialSubMessage = "The average person can remember 7 numbers at once.\nCan you do more?";

const NumberMemory = () => {
  const [gameState, setGameState] = useState('menu'); // menu, showing, input, transition, over
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('numberHighScore')) || 0);
  
  const [targetNumber, setTargetNumber] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [progress, setProgress] = useState(100);
  
  const [message, setMessage] = useState('Number Memory');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  const progressInterval = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (level - 1 > highScore && gameState !== 'menu') {
      const score = level - 1;
      setHighScore(score);
      localStorage.setItem('numberHighScore', score);
    }
  }, [level, highScore, gameState]);

  useEffect(() => {
    return () => {
      clearInterval(progressInterval.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const generateNumber = (currentLevel) => {
    let numStr = '';
    for (let i = 0; i < currentLevel; i++) {
        numStr += Math.floor(Math.random() * 10).toString();
    }
    return numStr;
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (currentLevel) => {
    setGameState('showing');
    setUserAnswer('');
    setProgress(100);
    
    const newNum = generateNumber(currentLevel);
    setTargetNumber(newNum);
    setMessage(newNum);
    setSubMessage("");

    const showDuration = 1500 + (currentLevel * 500); 
    const intervalMs = 20;
    const decreaseAmount = (100 / (showDuration / intervalMs));

    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressInterval.current);
          return 0;
        }
        return prev - decreaseAmount;
      });
    }, intervalMs);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clearInterval(progressInterval.current);
      setGameState('input');
      setMessage("What was the number?");
      setSubMessage("Press Enter to submit");
      setTimeout(() => {
          document.getElementById('number-input')?.focus();
      }, 100);
    }, showDuration);
  };

  const handleKeyPress = (e) => {
      if (e.key === 'Enter' && userAnswer.length > 0) {
          handleSubmit();
      }
  };

  const handleNumpadClick = (val) => {
      if (gameState !== 'input') return;
      if (val === 'back') {
          setUserAnswer(prev => prev.slice(0, -1));
      } else {
          setUserAnswer(prev => prev + val);
      }
  };

  const handleSubmit = () => {
      if (userAnswer === targetNumber) {
          setGameState('transition');
          setMessage("Number");
          setSubMessage(targetNumber);
          
          setTimeout(() => {
              startLevel(level + 1);
              setLevel(level + 1);
          }, 1500);
      } else {
          setGameState('over');
          setMessage("Number");
          setSubMessage(`Target: ${targetNumber}\nYour Answer: ${userAnswer}`);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">Number Memory</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Level: {gameState === 'menu' ? '-' : level}</span>
               <span className="text-pink-200 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
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
           <h2 className="text-4xl md:text-6xl font-extrabold tracking-widest mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">
               {gameState === 'showing' ? targetNumber : message}
           </h2>
           <p className="text-base md:text-xl text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Progress Bar (Only during 'showing') */}
        {gameState === 'showing' && (
            <div className="w-full max-w-md h-3 bg-black/20 rounded-full overflow-hidden mt-8 border border-white/10 shadow-inner">
                <div 
                    className="h-full bg-zinc-900 transition-all duration-75 ease-linear rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        )}

        {/* Input Area (Only during 'input') */}
        {gameState === 'input' && (
            <div className="flex flex-col items-center w-full max-w-sm mt-4">
                <input 
                    id="number-input"
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full bg-black/20 border-b-4 border-white/50 focus:border-white text-center text-4xl text-white  py-4 outline-none transition-colors mb-8 shadow-inner"
                    autoFocus
                    autoComplete="off"
                />
                
                {/* On-screen Numpad */}
                <div className="grid grid-cols-3 gap-3 w-full mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button 
                            key={num}
                            onClick={() => handleNumpadClick(num.toString())}
                            className="bg-black/20 hover:bg-black/40 text-white font-bold text-2xl py-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all active:scale-95"
                        >
                            {num}
                        </button>
                    ))}
                    <button 
                        onClick={() => handleNumpadClick('back')}
                        className="bg-red-500/30 hover:bg-red-500/50 text-white font-bold text-xl py-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all active:scale-95 flex items-center justify-center"
                    >
                        <FaBackspace />
                    </button>
                    <button 
                        onClick={() => handleNumpadClick('0')}
                        className="bg-black/20 hover:bg-black/40 text-white font-bold text-2xl py-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all active:scale-95"
                    >
                        0
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={userAnswer.length === 0}
                        className={`font-bold text-xl py-4 rounded-xl border border-white/20 backdrop-blur-sm transition-all active:scale-95 ${userAnswer.length > 0 ? 'bg-zinc-900 text-pink-700 hover:bg-pink-100 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-white/30 text-white/50 cursor-not-allowed'}`}
                    >
                        OK
                    </button>
                </div>
            </div>
        )}

        {/* Transition / Correct Indicator */}
        {gameState === 'transition' && (
             <div className="mt-8 px-12 py-4 bg-zinc-900 text-pink-600 rounded-full text-2xl font-black shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-bounce">
                CORRECT
             </div>
        )}

        {/* Play Button overlay if not playing */}
        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-10 py-4 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default NumberMemory;
