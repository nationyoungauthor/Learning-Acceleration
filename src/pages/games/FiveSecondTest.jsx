import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const FiveSecondTest = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('fiveSecondHighScore')) || 0
  );
  
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [diff, setDiff] = useState(0);
  
  const requestRef = useRef();
  const startTimeRef = useRef();

  const [message, setMessage] = useState('5-Second Test');
  const [subMessage, setSubMessage] = useState('Stop the timer exactly at 5 seconds to test your time perception accuracy.');

  const updateTimer = (currentTime) => {
    if (!startTimeRef.current) startTimeRef.current = currentTime;
    const elapsedTime = currentTime - startTimeRef.current;
    setTime(elapsedTime);
    requestRef.current = requestAnimationFrame(updateTimer);
  };

  const startGame = () => {
    setTime(0);
    setScore(0);
    setDiff(0);
    setGameState('playing');
    setMessage('Stop at 5 Seconds!');
    setSubMessage('');
    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(updateTimer);
  };

  const stopTimer = () => {
    cancelAnimationFrame(requestRef.current);
    const stoppedTime = time;
    const timeDifference = Math.abs(stoppedTime - 5000);
    setDiff(timeDifference);
    
    // Calculate score: Max 1000 points. Lose 1 point per millisecond off.
    let calculatedScore = Math.max(0, 1000 - Math.floor(timeDifference));
    setScore(calculatedScore);

    if (calculatedScore > highScore) {
      setHighScore(calculatedScore);
      localStorage.setItem('fiveSecondHighScore', calculatedScore.toString());
    }

    setGameState('over');
    setMessage('Keep Practicing!');
    
    let diffSeconds = (timeDifference / 1000).toFixed(3);
    if (stoppedTime < 5000) {
      setSubMessage(`You stopped at ${(stoppedTime / 1000).toFixed(3)}s\n${diffSeconds}s too early.`);
    } else {
      setSubMessage(`You stopped at ${(stoppedTime / 1000).toFixed(3)}s\n${diffSeconds}s too late.`);
    }
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      <div className="w-full max-w-2xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">5-Second Test</span>
      </div>

      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore} pts</span>
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

        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">{message}</h2>
           <p className="text-base md:text-lg text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
        </div>

        {gameState === 'playing' && (
          <div className="w-full max-w-sm flex flex-col items-center">
             <div className="text-5xl md:text-6xl font-black mb-8 tracking-widest text-center text-blue-600 drop-shadow-md tabular-nums">
                {(time / 1000).toFixed(3)}
             </div>
             <button 
                onClick={stopTimer}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl px-12 py-4 transition-colors shadow-lg active:scale-95 text-xl"
              >
                Stop
              </button>
          </div>
        )}

        {gameState === 'over' && (
          <div className="w-full max-w-sm flex flex-col items-center">
             <div className="text-5xl md:text-6xl font-black mb-4 tracking-widest text-center text-blue-600 drop-shadow-md tabular-nums">
                {score} <span className="text-2xl text-gray-500">pts</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden relative">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full absolute left-1/2 -translate-x-1/2 transition-all duration-500" 
                  style={{ width: `${Math.max(2, (score / 1000) * 100)}%` }}
                ></div>
             </div>
          </div>
        )}

        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-2 px-10 py-4 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Play Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default FiveSecondTest;
