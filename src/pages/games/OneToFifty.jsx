import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaStar, FaClock } from 'react-icons/fa';

const OneToFifty = () => {
  const [gameState, setGameState] = useState('menu'); 
  const [grid, setGrid] = useState(Array(25).fill(0));
  const [currentNum, setCurrentNum] = useState(1);
  const [time, setTime] = useState(0);
  const [wrongClick, setWrongClick] = useState(null);
  
  const [bestTime, setBestTime] = useState(
    parseFloat(localStorage.getItem('oneToFiftyBestTime')) || 0
  );
  
  const [message, setMessage] = useState('One to Fifty');
  const [subMessage, setSubMessage] = useState('Click the numbers from 1 to 50 in order as fast as you can. Wrong clicks add a penalty!');

  const initGrid = () => {
    let nums = Array.from({ length: 25 }, (_, i) => i + 1);
    nums.sort(() => Math.random() - 0.5);
    setGrid(nums);
  };

  const startGame = () => {
    setCurrentNum(1);
    setTime(0);
    initGrid();
    setGameState('playing');
    setMessage('');
    setSubMessage('');
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTime((prev) => prev + 10); 
      }, 10);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleCellClick = (index, value) => {
    if (gameState !== 'playing') return;
    if (value === 0) return; 

    if (value === currentNum) {
      const nextNum = currentNum + 1;
      setCurrentNum(nextNum);
      
      const newGrid = [...grid];
      if (currentNum <= 25) {
        newGrid[index] = currentNum + 25;
      } else {
        newGrid[index] = 0; 
      }
      setGrid(newGrid);

      if (nextNum > 50) {
        endGame();
      }
    } else {
      setWrongClick(index);
      setTimeout(() => setWrongClick(null), 200);
      setTime(prev => prev + 1000); 
    }
  };

  const endGame = () => {
    setGameState('over');
    const finalTime = time / 1000;
    setMessage('Finished!');
    setSubMessage(`Your Time: ${finalTime.toFixed(3)}s`);
    if (bestTime === 0 || finalTime < bestTime) {
      setBestTime(finalTime);
      localStorage.setItem('oneToFiftyBestTime', finalTime);
    }
  };

  const formatTime = (ms) => {
    return (ms / 1000).toFixed(3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      {/* Breadcrumbs */}
      <div className="w-full max-w-2xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">One to Fifty</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-sm flex items-center text-yellow-400"><FaStar className="mr-1"/> Best: {bestTime > 0 ? `${bestTime}s` : '--'}</span>
               {gameState === 'playing' && <span className="text-lg">Next: {currentNum <= 50 ? currentNum : 'Done'}</span>}
            </div>
            
            {gameState === 'playing' && (
              <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 items-center gap-2 border border-white/5 shadow-lg mt-2 md:mt-0  font-bold text-lg text-gray-400">
                <FaClock /> {formatTime(time)}s
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
        {(gameState === 'menu' || gameState === 'over') && (
          <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
             <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">{message}</h2>
             <p className="text-base md:text-lg text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
          </div>
        )}

        {/* Game Area */}
        {gameState === 'playing' && (
          <div className="mt-20 mb-4 w-full max-w-[320px] md:max-w-[400px] aspect-square bg-[#6b4218]/50 p-3 md:p-4 rounded-2xl border border-white/10 shadow-inner">
            <div className="grid grid-cols-5 gap-2 w-full h-full">
              {grid.map((num, i) => (
                <button
                  key={i}
                  onClick={() => handleCellClick(i, num)}
                  disabled={num === 0}
                  className={`
                    w-full h-full rounded-xl flex items-center justify-center font-bold text-xl md:text-2xl transition-all duration-100 border-t border-white/20 shadow-md
                    ${num === 0 ? 'opacity-0 cursor-default' : 'hover:scale-105 active:scale-95'}
                    ${num === currentNum ? 'bg-orange-400 text-white border-white/40' : num > 25 ? 'bg-[#523212] text-gray-400 border-white/5' : 'bg-[#7a4c1c] text-white'}
                    ${wrongClick === i ? 'bg-red-500 !scale-90 animate-pulse' : ''}
                  `}
                >
                  {num !== 0 ? num : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Play Button overlay if not playing */}
        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-8 py-3 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Game'}
            </button>
        )}
      </div>
    </div>
  );
};

export default OneToFifty;
