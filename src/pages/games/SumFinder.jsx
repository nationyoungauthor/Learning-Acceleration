import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaCalculator } from 'react-icons/fa';

const SumFinder = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('sumFinderHighScore')) || 0
  );

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [grid, setGrid] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [targetSum, setTargetSum] = useState(0);
  const [currentSum, setCurrentSum] = useState(0);
  const [combo, setCombo] = useState(1);
  const lastMatchTime = useRef(0);

  const [message, setMessage] = useState('Sum Finder');
  const [subMessage, setSubMessage] = useState('Select grid numbers that sum up to the target value.');

  const timerRef = useRef();

  const generateGrid = () => {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      arr.push(Math.floor(Math.random() * 9) + 1);
    }
    return arr;
  };

  const pickTargetSum = (currentGrid) => {
    const gridCopy = [...currentGrid];
    const length = Math.floor(Math.random() * 3) + 2;
    let sum = 0;
    
    for (let i = 0; i < length; i++) {
      if (gridCopy.length === 0) break;
      const randIdx = Math.floor(Math.random() * gridCopy.length);
      sum += gridCopy.splice(randIdx, 1)[0];
    }
    
    return sum < 8 ? 12 : sum;
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setSelectedIndices([]);
    setCurrentSum(0);
    setCombo(1);
    lastMatchTime.current = performance.now();

    const initialGrid = generateGrid();
    setGrid(initialGrid);
    const target = pickTargetSum(initialGrid);
    setTargetSum(target);
    setGameState('playing');
    setMessage('Match the Target Sum!');
    setSubMessage(`Find numbers that add up to: ${target}`);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('over');
          setMessage('Game Over!');
          setSubMessage('Your training session has ended.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCellClick = (idx) => {
    if (gameState !== 'playing') return;

    if (selectedIndices.includes(idx)) {
      const updated = selectedIndices.filter(i => i !== idx);
      setSelectedIndices(updated);
      const sum = updated.reduce((acc, currentIdx) => acc + grid[currentIdx], 0);
      setCurrentSum(sum);
    } else {
      const updated = [...selectedIndices, idx];
      setSelectedIndices(updated);
      const sum = updated.reduce((acc, currentIdx) => acc + grid[currentIdx], 0);
      setCurrentSum(sum);

      if (sum === targetSum) {
        const now = performance.now();
        const diff = (now - lastMatchTime.current) / 1000;
        let nextCombo = 1;
        if (diff < 4) {
          nextCombo = Math.min(5, combo + 1);
        }
        setCombo(nextCombo);
        lastMatchTime.current = now;

        const points = targetSum * 10 * nextCombo;
        setScore(prev => prev + points);

        const updatedGrid = [...grid];
        updated.forEach(matchedIdx => {
          updatedGrid[matchedIdx] = Math.floor(Math.random() * 9) + 1;
        });

        updated.forEach(matchedIdx => {
          const el = document.getElementById(`cell-${matchedIdx}`);
          if (el) {
            el.classList.add('bg-emerald-400', 'text-white border-emerald-400');
          }
        });

        setTimeout(() => {
          setGrid(updatedGrid);
          setSelectedIndices([]);
          setCurrentSum(0);
          const nextTarget = pickTargetSum(updatedGrid);
          setTargetSum(nextTarget);
          setSubMessage(`Find numbers that add up to: ${nextTarget}`);
        }, 200);

      } else if (sum > targetSum) {
        updated.forEach(failedIdx => {
          const el = document.getElementById(`cell-${failedIdx}`);
          if (el) {
            el.classList.add('bg-red-400', 'text-white', 'border-red-400');
          }
        });

        setTimeout(() => {
          setSelectedIndices([]);
          setCurrentSum(0);
          setCombo(1);
          updated.forEach(failedIdx => {
            const el = document.getElementById(`cell-${failedIdx}`);
            if (el) {
              el.classList.remove('bg-red-400', 'text-white', 'border-red-400');
            }
          });
        }, 300);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'over') {
      clearInterval(timerRef.current);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('sumFinderHighScore', score.toString());
      }
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, score]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <Link to="/games" className="hover:text-[#2563EB] transition-colors">Games</Link>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Sum Finder</span>
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
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6 border border-orange-200">
              <FaCalculator className="text-3xl" />
            </div>
            <button 
              onClick={startGame}
              className="cursor-pointer px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
              Start Training
            </button>
          </div>
        )}

        {/* State: PLAYING */}
        {gameState === 'playing' && (
          <div className="w-full flex flex-col items-center">
            
            {/* Top Stats */}
            <div className="mb-6 flex justify-between w-full max-w-sm items-center px-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#64748B] uppercase">Time Remaining</span>
                <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-[#254f85]'}`}>{timeLeft}s</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-[#64748B] uppercase">Combo</span>
                <span className={`text-xl font-black bg-orange-50 border border-orange-200 text-orange-600 px-3 py-0.5 rounded-full ${combo > 1 ? 'scale-110 animate-bounce' : ''}`}>{combo}x</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-[#64748B] uppercase">Score</span>
                <span className="text-2xl font-black text-blue-600">{score}</span>
              </div>
            </div>

            {/* Current Selected display */}
            <div className="flex flex-col items-center mb-6 bg-slate-50 border border-slate-200 py-2.5 px-8 rounded-2xl w-full max-w-[280px] text-center">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-0.5">Selected Sum</span>
              <span className={`text-lg font-black ${currentSum > targetSum ? 'text-red-500' : currentSum === targetSum ? 'text-emerald-500' : 'text-blue-500'}`}>{currentSum} / {targetSum}</span>
            </div>

            {/* 4x4 Grid */}
            <div 
              className="w-full max-w-[280px] aspect-square p-2 bg-slate-100 rounded-3xl grid grid-cols-4 gap-2 border border-slate-200 shadow-inner"
            >
              {grid.map((num, idx) => {
                const isSelected = selectedIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    id={`cell-${idx}`}
                    onClick={() => handleCellClick(idx)}
                    className={`aspect-square w-full h-full rounded-xl cursor-pointer font-black text-xl flex items-center justify-center border transition-all duration-150 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-95' 
                        : 'bg-white border-slate-200 text-[#254f85] hover:border-blue-400 active:scale-95'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 text-[11px] text-[#64748B] font-semibold text-center">
              Quickly tap numbers that add up to the target number!
            </div>
          </div>
        )}

        {/* State: OVER */}
        {gameState === 'over' && (
          <div className="w-full text-center flex flex-col items-center">
            <div className="text-6xl font-black text-[#2563EB] mb-8 drop-shadow-sm">
              {score} <span className="text-xl text-[#64748B]">pts</span>
            </div>

            <button
              onClick={startGame}
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

export default SumFinder;
