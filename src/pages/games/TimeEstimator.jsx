import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const TimeEstimator = () => {
  const [gameState, setGameState] = useState('menu'); // menu, ready, playing, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('timeEstimatorHighScore')) || 0
  );
  
  const [targetTime, setTargetTime] = useState(0);
  const [score, setScore] = useState(0);
  const startTimeRef = useRef(0);

  const [message, setMessage] = useState('Time Estimator');
  const [subMessage, setSubMessage] = useState('Estimate durations as accurately as possible without counting.');
  
  const generateTarget = () => {
    // Random target between 3.0 and 12.0 seconds
    const target = Math.floor(Math.random() * 9000) + 3000;
    setTargetTime(target);
  };

  const initGame = () => {
    generateTarget();
    setGameState('ready');
    setMessage('Get Ready');
  };

  const startGame = () => {
    setGameState('playing');
    setMessage('Estimating...');
    setSubMessage('Wait and click stop...');
    startTimeRef.current = performance.now();
  };

  const stopTimer = () => {
    const stoppedTime = performance.now();
    const elapsedTime = stoppedTime - startTimeRef.current;
    const diff = Math.abs(elapsedTime - targetTime);
    
    // Calculate score based on percentage error
    // If error is 0, score is 100. If error is 50% of target, score is 50.
    const errorPercentage = diff / targetTime;
    const calculatedScore = Math.max(0, Math.floor(100 - (errorPercentage * 100)));
    
    setScore(calculatedScore);

    if (calculatedScore > highScore) {
      setHighScore(calculatedScore);
      localStorage.setItem('timeEstimatorHighScore', calculatedScore.toString());
    }

    setGameState('over');
    setMessage('Keep Practicing!');
    
    let diffSeconds = (diff / 1000).toFixed(3);
    if (elapsedTime < targetTime) {
      setSubMessage(`You stopped at ${(elapsedTime / 1000).toFixed(3)}s - ${diffSeconds}s too early.`);
    } else {
      setSubMessage(`You stopped at ${(elapsedTime / 1000).toFixed(3)}s - ${diffSeconds}s too late.`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      <div className="w-full max-w-3xl text-sm mb-6 text-gray-600 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Time Estimator</span>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[400px]">
        
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#e8f9fd] px-4 py-2 rounded-xl flex text-gray-800 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore} pts</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-gray-300 mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-[#ff1e00] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-[#ff1e00] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-900 transition-opacity duration-300 font-serif">
             {gameState === 'ready' ? `Target: ${(targetTime/1000).toFixed(1)} Seconds` : message}
           </h2>
           <p className="text-base md:text-lg text-gray-600 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">
             {gameState === 'ready' ? 'Click start and stop when you think the time has passed.' : subMessage}
           </p>
        </div>

        {gameState === 'playing' && (
          <div className="w-full max-w-sm flex flex-col items-center">
             <div className="w-32 h-32 rounded-full border-8 border-orange-200 border-t-orange-500 animate-spin mb-8"></div>
             <button 
                onClick={stopTimer}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl px-12 py-4 transition-colors shadow-lg active:scale-95 text-xl"
              >
                Stop
              </button>
          </div>
        )}

        {gameState === 'over' && (
          <div className="w-full max-w-sm flex flex-col items-center">
             <div className="text-5xl md:text-6xl font-black mb-4 tracking-widest text-center text-orange-600 drop-shadow-md tabular-nums">
                {score} <span className="text-2xl text-gray-500">pts</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden relative">
                <div 
                  className="bg-orange-500 h-2.5 rounded-full absolute left-1/2 -translate-x-1/2 transition-all duration-500" 
                  style={{ width: `${Math.max(2, score)}%` }}
                ></div>
             </div>
          </div>
        )}

        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={initGame}
               className="mt-2 px-10 py-4 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Play Again' : 'Start Training'}
            </button>
        )}

        {gameState === 'ready' && (
            <button 
               onClick={startGame}
               className="mt-2 px-10 py-4 bg-blue-500 rounded-full text-xl font-bold text-white shadow-lg hover:bg-blue-600 hover:scale-105 transition-all outline-none border border-transparent"
            >
               Start Timer
            </button>
        )}
      </div>
    </div>
  );
};

export default TimeEstimator;
