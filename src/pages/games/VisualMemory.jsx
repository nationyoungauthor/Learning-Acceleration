import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const initialSubMessage = "Memorize the highlighted tiles, then select them after they disappear.\nEach level gets progressively harder with more tiles to remember.\nOne mistake and game over! How far can you go?";

const VisualMemory = () => {
  const [gameState, setGameState] = useState('menu'); // menu, showing, playing, transition, over
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('visualHighScore')) || 1);
  const [pattern, setPattern] = useState([]);
  const [clickedCorrect, setClickedCorrect] = useState([]);
  const [clickedWrong, setClickedWrong] = useState([]);
  const [gridSize, setGridSize] = useState(3);
  
  const [message, setMessage] = useState('Visual Memory');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  useEffect(() => {
    // Determine the highest reached level. 
    // Sequence memory maps score to level reached. Here `level` is the current attempt.
    // Let's set highScore to the highest level they completed.
    // If they fail at level 3, they completed level 2.
    // Wait, the visual memory game tracks the currently playing level, so highest level reached is fine.
    if (level > highScore && gameState !== 'menu') {
      setHighScore(level);
      localStorage.setItem('visualHighScore', level);
    }
  }, [level, highScore, gameState]);

  const getGridSize = (lvl) => {
    const tiles = lvl + 2;
    if (tiles <= 4) return 3;
    if (tiles <= 7) return 4;
    if (tiles <= 10) return 5;
    if (tiles <= 14) return 6;
    return 7;
  };

  const generatePattern = (lvl, size) => {
    const totalTiles = size * size;
    const numToSelect = lvl + 2;
    const newPattern = [];
    while (newPattern.length < numToSelect) {
      const randomIdx = Math.floor(Math.random() * totalTiles);
      if (!newPattern.includes(randomIdx)) {
        newPattern.push(randomIdx);
      }
    }
    return newPattern;
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (currentLevel) => {
    setGameState('showing');
    setClickedCorrect([]);
    setClickedWrong([]);
    setMessage("Watch the pattern");
    setSubMessage(`Level ${currentLevel}`);
    
    const size = getGridSize(currentLevel);
    setGridSize(size);
    const newPattern = generatePattern(currentLevel, size);
    setPattern(newPattern);
    
    const baseDuration = 1000;
    const scalingDuration = Math.min((currentLevel - 1) * 100, 1500);
    const showDuration = baseDuration + scalingDuration;

    setTimeout(() => {
      setGameState('playing');
      setMessage("Your Turn");
      setSubMessage("Recall the pattern");
    }, showDuration);
  };

  const handleTileClick = (index) => {
    if (gameState !== 'playing') return;
    if (clickedCorrect.includes(index) || clickedWrong.includes(index)) return;

    if (pattern.includes(index)) {
      const newCorrect = [...clickedCorrect, index];
      setClickedCorrect(newCorrect);
      
      if (newCorrect.length === pattern.length) {
        setGameState('transition');
        setMessage('Correct!');
        setSubMessage('Get ready for the next level...');
        setTimeout(() => {
          setLevel((prev) => {
            const nextLvl = prev + 1;
            startLevel(nextLvl);
            return nextLvl;
          });
        }, 1000);
      }
    } else {
      const newWrong = [...clickedWrong, index];
      setClickedWrong(newWrong);
      setGameState('transition');
      
      setTimeout(() => {
        setGameState('over');
        setMessage('Game Over');
        setSubMessage(`You reached Level ${level}\n\n${initialSubMessage}`);
      }, 1000);
    }
  };

  const renderGrid = () => {
    const totalTiles = gridSize * gridSize;
    const tiles = [];
    
    for (let i = 0; i < totalTiles; i++) {
        const isActuallyPattern = gameState === 'showing' && pattern.includes(i);
        const isRevealedPatternOnFail = gameState === 'transition' && clickedWrong.length > 0 && pattern.includes(i);
        const isCorrect = clickedCorrect.includes(i);
        const isWrong = clickedWrong.includes(i);
        
        let tileClass = "aspect-square rounded-xl transition-all duration-200 ease-in-out cursor-pointer ";
        
        if (isActuallyPattern || isCorrect || isRevealedPatternOnFail) {
            tileClass += "bg-zinc-900 opacity-90 scale-95 shadow-[0_0_40px_rgba(255,255,255,1)] z-10";
        } else if (isWrong) {
            tileClass += "bg-red-500 scale-95 shadow-[0_0_30px_rgba(239,68,68,0.8)] z-10 animate-pulse";
        } else {
            tileClass += "bg-[#6582bf] hover:bg-[#7b96ce] border-t border-white/20 shadow-inner";
        }
        
        // Disabled logic
        if (gameState !== 'playing' && gameState !== 'transition') {
           tileClass += " cursor-default pointer-events-none"; 
        }

        tiles.push(
            <button 
                key={i} 
                className={tileClass}
                onClick={() => handleTileClick(i)}
                aria-label={`Square ${i}`}
            ></button>
        );
    }

    return (
        <div 
            className="grid gap-2 w-full max-w-[240px] md:max-w-[360px] mb-4"
            style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` 
            }}
        >
            {tiles}
        </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      {/* Breadcrumbs */}
      <div className="w-full max-w-2xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">Visual Memory</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Level: {gameState === 'menu' ? '-' : level}</span>
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
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
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">{message}</h2>
           <p className="text-base md:text-lg text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
        </div>

        {/* Dynamic Grid */}
        {gameState !== 'menu' && renderGrid()}

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

export default VisualMemory;
