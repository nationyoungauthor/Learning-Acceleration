import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaCheck, FaTimes } from 'react-icons/fa';

const initialSubMessage = "Memorize the numbers you see. If you've seen the number before in this test, click SEEN. If it's a new number, click NEW.";

const SeenNumberMemory = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('seenNumberHighScore')) || 0);
  const [strikes, setStrikes] = useState(0);
  
  const [seenNumbers, setSeenNumbers] = useState(new Set());
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isSeen, setIsSeen] = useState(false); // true if the current number has been seen
  
  const [message, setMessage] = useState('Number Memory');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  useEffect(() => {
    if (score > highScore && gameState !== 'menu') {
      setHighScore(score);
      localStorage.setItem('seenNumberHighScore', score);
    }
  }, [score, highScore, gameState]);

  const generateNumber = () => {
    // Determine if we should show a seen number or a new number
    // 50% chance, unless we haven't seen any numbers yet
    if (seenNumbers.size > 0 && Math.random() < 0.5) {
        // Pick a random seen number
        const seenArray = Array.from(seenNumbers);
        const randomSeen = seenArray[Math.floor(Math.random() * seenArray.length)];
        setCurrentNumber(randomSeen);
        setIsSeen(true);
    } else {
        // Generate a new number
        let newNum;
        do {
            newNum = Math.floor(Math.random() * 1000) + 1; // 1 to 1000
        } while (seenNumbers.has(newNum));
        
        setCurrentNumber(newNum);
        setIsSeen(false);
    }
  };

  const startGame = () => {
    setScore(0);
    setStrikes(0);
    setSeenNumbers(new Set());
    setGameState('playing');
    setMessage('Have you seen this number before?');
    setSubMessage(`You have 3 strikes left.`);
    generateNumber();
  };

  const handleChoice = (userChoseSeen) => {
      if (gameState !== 'playing') return;

      if ((userChoseSeen && isSeen) || (!userChoseSeen && !isSeen)) {
          // Correct
          setScore(prev => prev + 1);
          
          if (!isSeen) {
              setSeenNumbers(prev => {
                  const newSet = new Set(prev);
                  newSet.add(currentNumber);
                  return newSet;
              });
          }
          generateNumber();
      } else {
          // Incorrect
          const newStrikes = strikes + 1;
          setStrikes(newStrikes);
          
          if (newStrikes >= 3) {
              setGameState('over');
              setMessage('Game Over');
              setSubMessage(`Score: ${score}\n\n${initialSubMessage}`);
          } else {
              setSubMessage(`Wrong! You have ${3 - newStrikes} strike${3 - newStrikes === 1 ? '' : 's'} left.`);
              
              if (!isSeen) {
                  setSeenNumbers(prev => {
                      const newSet = new Set(prev);
                      newSet.add(currentNumber);
                      return newSet;
                  });
              }
              generateNumber();
          }
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
        <span className="text-gray-800">Number Memory</span>
      </div>

      {/* Main Game Card - Blue/Purple Theme */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#4f46e5] to-[#312e81] rounded-2xl md:p-6 p-4 shadow-2xl shadow-indigo-900/40 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md border border-white/20 pb-10 min-h-[500px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black/20 px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/10 backdrop-blur-sm">
               <span className="text-lg">Score: {gameState === 'menu' ? '-' : score}</span>
               <span className="text-gray-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-indigo-100 mt-2 md:mt-0">
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
           <h2 className={`text-3xl md:text-5xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-900 transition-opacity duration-300 ${gameState === 'playing' ? 'text-2xl md:text-4xl font-serif' : 'font-serif'}`}>
               {message}
           </h2>
           <p className="text-base md:text-xl text-indigo-100 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Dynamic Content */}
        {gameState === 'playing' && (
            <div className="flex flex-col items-center">
                <div className="text-7xl md:text-8xl font-black text-[#60a5fa] drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] mb-12 font-mono">
                    {currentNumber}
                </div>
                
                <div className="flex space-x-6">
                    <button 
                        onClick={() => handleChoice(true)}
                        className="flex items-center space-x-2 bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all active:scale-95"
                    >
                        <FaCheck />
                        <span>SEEN</span>
                    </button>
                    <button 
                        onClick={() => handleChoice(false)}
                        className="flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all active:scale-95"
                    >
                        <FaTimes />
                        <span>NEW</span>
                    </button>
                </div>
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

export default SeenNumberMemory;
