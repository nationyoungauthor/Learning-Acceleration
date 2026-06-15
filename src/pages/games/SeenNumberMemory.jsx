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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Number Memory</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl md:p-6 p-4 shadow-md flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-sm border border-gray-200">
               <span className="text-lg">Score: {gameState === 'menu' ? '-' : score}</span>
               <span className="text-yellow-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
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

        {/* Text Area */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className={`text-3xl md:text-5xl font-extrabold tracking-wide font-display mb-3 text-[#0F172A] transition-opacity duration-300 ${gameState === 'playing' ? 'text-2xl md:text-4xl ' : ''}`}>
               {message}
           </h2>
           <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Dynamic Content */}
        {gameState === 'playing' && (
            <div className="flex flex-col items-center">
                <div className="text-7xl md:text-8xl font-black text-[#2563EB] drop-shadow-sm mb-12 ">
                    {currentNumber}
                </div>
                
                <div className="flex space-x-6">
                    <button 
                        onClick={() => handleChoice(true)}
                        className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                        <FaCheck />
                        <span>SEEN</span>
                    </button>
                    <button 
                        onClick={() => handleChoice(false)}
                        className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-md hover:shadow-lg transition-all active:scale-95"
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
               className="mt-6 px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default SeenNumberMemory;
