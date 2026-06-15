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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">5-Second Test</span>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl md:p-6 p-4 shadow-md flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex text-[#0F172A] flex-col font-bold self-start mt-2 md:mt-0 shadow-sm border border-gray-200">
               <span className="text-yellow-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore} pts</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-[#64748B] mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-display mb-3 text-[#0F172A] transition-opacity duration-300">{message}</h2>
           <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {gameState === 'playing' && (
          <div className="w-full max-w-sm flex flex-col items-center">
             <div className="text-5xl md:text-6xl font-black mb-8 tracking-widest text-center text-blue-600 drop-shadow-sm tabular-nums">
                {(time / 1000).toFixed(3)}
             </div>
             <button 
                onClick={stopTimer}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-12 py-4 transition-colors shadow-md active:scale-95 text-xl"
              >
                Stop
              </button>
          </div>
        )}

        {gameState === 'over' && (
          <div className="w-full max-w-sm flex flex-col items-center">
             <div className="text-5xl md:text-6xl font-black mb-4 tracking-widest text-center text-blue-600 drop-shadow-sm tabular-nums">
                {score} <span className="text-2xl text-[#64748B]">pts</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden relative shadow-inner">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full absolute left-1/2 -translate-x-1/2 transition-all duration-500" 
                  style={{ width: `${Math.max(2, (score / 1000) * 100)}%` }}
                ></div>
             </div>
          </div>
        )}

        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Play Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default FiveSecondTest;
