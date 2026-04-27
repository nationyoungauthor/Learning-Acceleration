import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const initialSubMessage = "Click the numbers in ascending order.\nWhen you click 1, the rest will hide.";

const ChimpTest = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, hidden, transition, over
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('chimpTestHighScore')) || 0);
  
  const [tiles, setTiles] = useState([]);
  const [expectedNum, setExpectedNum] = useState(1);

  const [message, setMessage] = useState('Chimp Test');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (level - 1 > highScore && gameState !== 'menu') {
      const score = level - 1;
      setHighScore(score);
      localStorage.setItem('chimpTestHighScore', score);
    }
  }, [level, highScore, gameState]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutRefs.current.push(id);
      return id;
  };

  const generateTiles = (currentLevel) => {
      const numTiles = currentLevel + 3; // Starts at 4
      const gridCells = 40; // 5x8 grid
      
      const availableIndices = Array.from({ length: gridCells }, (_, i) => i);
      const selectedIndices = [];
      
      for (let i = 0; i < numTiles; i++) {
          const randIdx = Math.floor(Math.random() * availableIndices.length);
          selectedIndices.push(availableIndices[randIdx]);
          availableIndices.splice(randIdx, 1);
      }

      const newTiles = Array.from({ length: gridCells }, (_, i) => null);
      selectedIndices.forEach((gridIdx, i) => {
          newTiles[gridIdx] = {
              val: i + 1,
              isClicked: false
          };
      });

      return { newTiles, totalNumbers: numTiles };
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (currentLevel) => {
    setGameState('playing');
    setExpectedNum(1);
    setMessage("Find number 1");
    setSubMessage("");

    const { newTiles } = generateTiles(currentLevel);
    setTiles(newTiles);
  };

  const handleTileClick = (index) => {
      if ((gameState !== 'playing' && gameState !== 'hidden') || !tiles[index] || tiles[index].isClicked) return;

      const tile = tiles[index];

      if (tile.val === expectedNum) {
          // Correct
          const newTiles = [...tiles];
          newTiles[index] = { ...tile, isClicked: true };
          setTiles(newTiles);

          const totalNumbers = level + 3;

          if (expectedNum === 1) {
              setGameState('hidden');
              setMessage("Keep going...");
          }

          if (expectedNum === totalNumbers) {
              // Level complete
              setGameState('transition');
              setMessage("¡Correcto!");
              setSubMessage("");
              
              addTimeout(() => {
                  startLevel(level + 1);
                  setLevel(level + 1);
              }, 1000);
          } else {
              setExpectedNum(expectedNum + 1);
          }
      } else {
          // Wrong
          // Reveal everything
          setGameState('over');
          setMessage("Wrong Order");
          setSubMessage(`You clicked ${tile.val} instead of ${expectedNum}.\nYou reached level ${level}\n\n${initialSubMessage}`);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <div className="w-full max-w-4xl text-sm mb-6 text-gray-600 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-red-400 flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Chimp Test</span>
      </div>

      {/* Main Game Card - Red Theme */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#dc2626] to-[#991b1b] rounded-2xl md:p-6 p-4 shadow-2xl shadow-red-900/40 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md border border-white/20 pb-10 min-h-[550px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black/20 px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/10 backdrop-blur-sm">
               <span className="text-lg">Numbers: {gameState === 'menu' ? '-' : level + 3}</span>
               <span className="text-gray-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-red-100 mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40 transition-all hover:text-white backdrop-blur-sm" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40 transition-all hover:text-white backdrop-blur-sm" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Text Area */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-900 transition-opacity duration-300 font-serif">
               {message}
           </h2>
           <p className="text-base md:text-xl text-red-100 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Grid Area */}
        {(gameState === 'playing' || gameState === 'hidden' || gameState === 'transition' || gameState === 'over') && (
            <div className="grid grid-cols-8 grid-rows-5 gap-1 md:gap-2 w-full max-w-2xl bg-black/10 p-2 md:p-4 rounded-xl border border-white/10">
                {tiles.map((tile, idx) => (
                    <div 
                        key={idx}
                        onClick={() => handleTileClick(idx)}
                        className={`aspect-square w-full rounded-md transition-all duration-150 flex items-center justify-center font-bold text-xl md:text-3xl
                            ${!tile ? 'invisible' : ''}
                            ${tile && tile.isClicked ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
                            ${tile && !tile.isClicked && (gameState === 'hidden' || gameState === 'transition') ? 'bg-white cursor-pointer hover:bg-gray-200 hover:scale-105 shadow-md' : ''}
                            ${tile && !tile.isClicked && gameState === 'playing' ? 'bg-white text-red-700 cursor-pointer hover:bg-gray-200 hover:scale-105 shadow-md border-b-4 border-red-900/20' : ''}
                            ${tile && !tile.isClicked && gameState === 'over' ? (tile.val === expectedNum ? 'bg-green-500 text-white' : 'bg-red-500 text-white border-2 border-white') : ''}
                        `}
                    >
                        {/* Show numbers if not hidden, or if game is over so user sees where they failed */}
                        {tile && (!tile.isClicked && (gameState === 'playing' || gameState === 'over')) ? tile.val : ''}
                    </div>
                ))}
            </div>
        )}

        {/* Play Button overlay if not playing */}
        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-10 py-4 bg-white/20 backdrop-blur-md rounded-full text-2xl font-black text-white shadow-xl hover:bg-white/30 hover:scale-105 transition-all outline-none border-2 border-white/50 hover:border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default ChimpTest;
