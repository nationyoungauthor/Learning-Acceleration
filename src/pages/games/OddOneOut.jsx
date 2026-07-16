import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaEye } from 'react-icons/fa';

const symbolsPool = ['★', '▲', '●', '■', '◆', '✖', '✚', '♥', '✿', '✦', '▲', '▼', '◄', '►', '⬢', '⬡'];

const OddOneOut = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('oddOneOutHighScore')) || 0
  );

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gridSize, setGridSize] = useState(3);
  
  const [targetSymbol, setTargetSymbol] = useState('');
  const [distractorSymbol, setDistractorSymbol] = useState('');
  const [gridData, setGridData] = useState([]);
  const [targetIndex, setTargetIndex] = useState(-1);

  const [message, setMessage] = useState('Odd One Out');
  const [subMessage, setSubMessage] = useState('Spot the target symbol among the distractors before time runs out.');

  const timerRef = useRef();

  const generateGrid = (currentLevel) => {
    // Determine grid size based on level
    let size = 3;
    if (currentLevel >= 3 && currentLevel <= 4) size = 4;
    else if (currentLevel >= 5 && currentLevel <= 6) size = 5;
    else if (currentLevel >= 7 && currentLevel <= 8) size = 6;
    else if (currentLevel >= 9) size = 7;

    setGridSize(size);

    // Pick a random target and a different distractor from pool
    const shuffledPool = [...symbolsPool].sort(() => 0.5 - Math.random());
    const target = shuffledPool[0];
    const distractor = shuffledPool[1];

    setTargetSymbol(target);
    setDistractorSymbol(distractor);

    const totalCells = size * size;
    const randTargetIdx = Math.floor(Math.random() * totalCells);
    setTargetIndex(randTargetIdx);

    const data = Array.from({ length: totalCells }).map((_, idx) => 
      idx === randTargetIdx ? target : distractor
    );
    setGridData(data);

    setMessage(`Find the "${target}"!`);
    setSubMessage(`Look for the target symbol in the grid.`);
  };

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(45);
    setGameState('playing');
    generateGrid(1);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('over');
          setMessage('Game Over!');
          setSubMessage('Your observation session has ended.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTileClick = (index) => {
    if (gameState !== 'playing') return;

    if (index === targetIndex) {
      // Correct!
      setScore(prev => prev + 100);
      const nextLevel = level + 1;
      setLevel(nextLevel);
      generateGrid(nextLevel);
    } else {
      // Incorrect penalty: lose 3 seconds
      setTimeLeft(prev => Math.max(0, prev - 3));
      const container = document.getElementById('grid-container');
      if (container) {
        container.classList.add('border-red-500', 'bg-red-50');
        setTimeout(() => {
          container.classList.remove('border-red-500', 'bg-red-50');
        }, 300);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'over') {
      clearInterval(timerRef.current);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('oddOneOutHighScore', score.toString());
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
        <span className="text-[#0F172A] font-semibold">Odd One Out</span>
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
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200">
              <FaEye className="text-3xl" />
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
            <div className="mb-6 flex justify-between w-full max-w-sm items-center px-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#64748B] uppercase">Time Remaining</span>
                <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-[#254f85]'}`}>{timeLeft}s</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-[#64748B] uppercase">Score</span>
                <span className="text-2xl font-black text-blue-600">{score}</span>
              </div>
            </div>

            {/* Grid Container */}
            <div 
              id="grid-container"
              className="w-full max-w-[280px] aspect-square p-2 bg-slate-100 rounded-3xl grid gap-2 border border-slate-200 transition-all duration-300 shadow-inner"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
              }}
            >
              {gridData.map((symbol, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTileClick(idx)}
                  className="w-full h-full rounded-xl cursor-pointer hover:bg-slate-200 active:scale-95 transition-all bg-white border border-slate-200 text-[#254f85] font-black text-2xl flex items-center justify-center outline-none shadow-sm"
                >
                  {symbol}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-[11px] text-[#64748B] font-semibold text-center">
              Tip: Click the matching symbol shown in the header. Wrong clicks cost -3s!
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

export default OddOneOut;
