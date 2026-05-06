import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const initialSubMessage = "Watch the sequence of numbers and repeat it.\nOne more digit is added each round.";

const NumberSequence = () => {
  const [gameState, setGameState] = useState('menu'); // menu, showing, playing, transition, over
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('numberSequenceHighScore')) || 0);
  
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [activeKey, setActiveKey] = useState(null); // The key currently lighting up
  
  const [message, setMessage] = useState('Number Sequence');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (level - 1 > highScore && gameState !== 'menu') {
      const score = level - 1;
      setHighScore(score);
      localStorage.setItem('numberSequenceHighScore', score);
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

  const startGame = () => {
    setLevel(1);
    setSequence([]);
    startLevel(1, []);
  };

  const startLevel = (currentLevel, currentSeq) => {
    setGameState('showing');
    setUserStep(0);
    setActiveKey(null);
    setMessage("Watch carefully...");
    setSubMessage("");

    const newDigit = Math.floor(Math.random() * 9) + 1; // 1-9
    const newSeq = [...currentSeq, newDigit];
    setSequence(newSeq);

    // Play sequence
    let delay = 500;
    
    newSeq.forEach((digit, index) => {
        addTimeout(() => {
            setActiveKey(digit);
        }, delay);
        
        addTimeout(() => {
            setActiveKey(null);
        }, delay + 400); // 400ms flash duration
        
        delay += 600; // 600ms between flashes
    });

    addTimeout(() => {
        setGameState('playing');
        setMessage("Your Turn");
        setSubMessage("");
    }, delay);
  };

  const handleKeyClick = (digit) => {
      if (gameState !== 'playing') return;

      setActiveKey(digit);
      setTimeout(() => setActiveKey(null), 200);

      if (digit === sequence[userStep]) {
          const nextStep = userStep + 1;
          setUserStep(nextStep);

          if (nextStep === sequence.length) {
              setGameState('transition');
              setMessage("¡Correcto!");
              setSubMessage("");
              
              setTimeout(() => {
                  startLevel(level + 1, sequence);
                  setLevel(level + 1);
              }, 1500);
          }
      } else {
          setGameState('over');
          setMessage("Wrong Sequence");
          setSubMessage(`You reached level ${level}\n\n${initialSubMessage}`);
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
        <span className="text-gray-200">Number Sequence</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[450px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Level: {gameState === 'menu' ? '-' : level}</span>
               <span className="text-green-200 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
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
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-100 transition-opacity duration-300 ">
               {message}
           </h2>
           <p className="text-base md:text-xl text-gray-400 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Dots indicating sequence length */}
        {gameState !== 'menu' && gameState !== 'over' && (
            <div className="flex space-x-2 mb-8 h-4">
                {sequence.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx < userStep ? 'bg-zinc-900 shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-125' : 'bg-black/30'}`}
                    />
                ))}
            </div>
        )}

        {/* Keypad Area */}
        {(gameState === 'showing' || gameState === 'playing' || gameState === 'transition') && (
            <div className="flex flex-col items-center w-full max-w-[280px]">
                <div className="grid grid-cols-3 gap-3 w-full mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                        const isActive = activeKey === num;
                        return (
                            <button 
                                key={num}
                                onClick={() => handleKeyClick(num)}
                                disabled={gameState !== 'playing'}
                                className={`
                                    font-bold text-3xl py-6 rounded-xl border backdrop-blur-sm transition-all duration-150
                                    ${isActive 
                                        ? 'bg-zinc-900 text-emerald-600 border-white shadow-[0_0_20px_rgba(255,255,255,1)] scale-105' 
                                        : 'bg-black/20 text-white border-white/10 hover:bg-black/30 active:scale-95'}
                                    ${gameState !== 'playing' ? 'cursor-default' : 'cursor-pointer'}
                                `}
                            >
                                {num}
                            </button>
                        )
                    })}
                </div>
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

export default NumberSequence;
