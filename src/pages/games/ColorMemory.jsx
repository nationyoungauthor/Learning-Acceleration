import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const initialSubMessage = "Remember the color shown briefly.\nThen select it from similar shades.";

const ColorMemory = () => {
  const [gameState, setGameState] = useState('menu'); // menu, showing, playing, transition, over
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('colorMemoryHighScore')) || 0);
  
  const [targetColor, setTargetColor] = useState('');
  const [choices, setChoices] = useState([]);

  const [message, setMessage] = useState('Color Memory');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (level - 1 > highScore && gameState !== 'menu') {
      const score = level - 1;
      setHighScore(score);
      localStorage.setItem('colorMemoryHighScore', score);
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

  const generateColors = (currentLevel) => {
    // Generate base color
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
    const lightness = 40 + Math.floor(Math.random() * 20); // 40-60%

    const target = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Determine number of choices based on level
    let numChoices = 4;
    if (currentLevel > 3) numChoices = 6;
    if (currentLevel > 7) numChoices = 9;

    // Difficulty factor: lower is harder
    const diff = Math.max(2, 15 - Math.floor(currentLevel / 2));

    const options = [target];
    while (options.length < numChoices) {
        // Vary lightness or hue slightly
        const varyHue = Math.random() > 0.5;
        const offset = (Math.floor(Math.random() * diff) + 2) * (Math.random() > 0.5 ? 1 : -1);
        
        let newHue = hue;
        let newLightness = lightness;
        
        if (varyHue) {
            newHue = (hue + offset + 360) % 360;
        } else {
            newLightness = Math.max(10, Math.min(90, lightness + offset));
        }

        const newColor = `hsl(${newHue}, ${saturation}%, ${newLightness}%)`;
        if (!options.includes(newColor)) {
            options.push(newColor);
        }
    }

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return { target, options };
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (currentLevel) => {
    setGameState('showing');
    setMessage("Remember this color...");
    setSubMessage("");

    const { target, options } = generateColors(currentLevel);
    setTargetColor(target);
    setChoices(options);

    let displayTime = Math.max(800, 2000 - (currentLevel * 100)); // Gets faster

    addTimeout(() => {
        setGameState('playing');
        setMessage("Which one was it?");
    }, displayTime);
  };

  const handleColorClick = (color) => {
      if (gameState !== 'playing') return;

      if (color === targetColor) {
          // Correct
          setGameState('transition');
          setMessage("¡Correcto!");
          setSubMessage("");
          
          addTimeout(() => {
              startLevel(level + 1);
              setLevel(level + 1);
          }, 1000);
      } else {
          // Wrong
          setGameState('over');
          setMessage("Wrong Shade");
          setSubMessage(`You reached level ${level}\n\n${initialSubMessage}`);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <div className="w-full max-w-4xl text-sm mb-6 text-gray-600 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Color Memory</span>
      </div>

      {/* Main Game Card - Blue Theme */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] rounded-2xl md:p-6 p-4 shadow-2xl shadow-blue-900/40 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md border border-white/20 pb-10 min-h-[550px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black/20 px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/10 backdrop-blur-sm">
               <span className="text-lg">Level: {gameState === 'menu' ? '-' : level}</span>
               <span className="text-gray-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-blue-100 mt-2 md:mt-0">
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
           <p className="text-base md:text-xl text-blue-100 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Target Color Display */}
        {gameState === 'showing' && (
            <div 
                className="w-48 h-48 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-white/20 transition-all"
                style={{ backgroundColor: targetColor }}
            />
        )}

        {/* Choices Grid */}
        {(gameState === 'playing' || gameState === 'transition') && (
            <div className={`grid gap-4 w-full max-w-md ${choices.length <= 4 ? 'grid-cols-2 max-w-[280px]' : choices.length <= 6 ? 'grid-cols-3 max-w-[400px]' : 'grid-cols-3'}`}>
                {choices.map((color, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleColorClick(color)}
                        disabled={gameState !== 'playing'}
                        className={`w-full aspect-square rounded-2xl shadow-lg border-2 border-transparent transition-transform duration-200 
                            ${gameState === 'playing' ? 'hover:scale-105 hover:border-white/50 cursor-pointer' : 'cursor-default'}
                        `}
                        style={{ backgroundColor: color }}
                    />
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

export default ColorMemory;
