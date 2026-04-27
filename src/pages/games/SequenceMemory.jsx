import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const SequenceMemory = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('sequenceHighScore')) || 0);
  const [activeSquare, setActiveSquare] = useState(null);
  const [message, setMessage] = useState("Sequence Memory");
  const [subMessage, setSubMessage] = useState("Train Your Brain");
  const [gameOver, setGameOver] = useState(false);
  const [wrongSquare, setWrongSquare] = useState(null);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('sequenceHighScore', score);
    }
  }, [score, highScore]);

  // When sequence changes (level up), play it
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);


  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setIsPlaying(true);
    setGameOver(false);
    setMessage("Get Ready...");
    setSubMessage("Watch the sequence");
    
    // Start after a small delay
    setTimeout(() => {
      addNewStep([]);
    }, 1000);
  };

  const addNewStep = (currentSeq) => {
    const nextStep = Math.floor(Math.random() * 9);
    setSequence([...currentSeq, nextStep]);
  };

  const timerRef = useRef([]);

  const playSequence = async () => {
    setShowSequence(true);
    setMessage("Watch the pattern");
    setSubMessage(`Level ${sequence.length}`);
    setPlayerSequence([]);
    
    // Clear any existing timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    let delay = 0;
    const speed = Math.max(200, 700 - sequence.length * 30); // Speed up as levels increase
    const pause = Math.max(100, 300 - sequence.length * 15);

    // Initial pause before starting sequence
    await new Promise(resolve => setTimeout(resolve, 800));

    for (let i = 0; i < sequence.length; i++) {
        await new Promise(resolve => {
            const timer = setTimeout(() => {
                setActiveSquare(sequence[i]);
                resolve();
            }, delay);
            timerRef.current.push(timer);
        });

        await new Promise(resolve => {
            const timer = setTimeout(() => {
                setActiveSquare(null);
                resolve();
            }, speed);
            timerRef.current.push(timer);
        });

        await new Promise(resolve => {
            const timer = setTimeout(resolve, pause);
            timerRef.current.push(timer);
        });
    }

    setShowSequence(false);
    setMessage("Your Turn");
    setSubMessage("Repeat the sequence");
  };


  const handleSquareClick = (index) => {
    if (!isPlaying || showSequence || gameOver) return;

    // Flash clicked square
    setActiveSquare(index);
    setTimeout(() => setActiveSquare(null), 150);

    const expectedIndex = sequence[playerSequence.length];

    if (index === expectedIndex) {
      // Good click
      const newPlayerSequence = [...playerSequence, index];
      setPlayerSequence(newPlayerSequence);

      if (newPlayerSequence.length === sequence.length) {
        // Level complete
        setScore(sequence.length);
        setShowSequence(true); // Disable input
        setMessage("Correct!");
        setSubMessage("Get ready for the next level...");
        setTimeout(() => {
          addNewStep(sequence);
        }, 1000);
      }
    } else {
      // Wrong click
      setGameOver(true);
      setIsPlaying(false);
      setWrongSquare(index);
      setMessage("Game Over");
      setSubMessage(`You reached Level ${sequence.length}`);
      setTimeout(() => setWrongSquare(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-gray-600 flex items-center space-x-2">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Sequence Memory</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[400px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#e8f9fd] px-4 py-2 rounded-xl flex text-gray-800 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Score: {score}</span>
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            <div className="flex space-x-3 text-xl text-gray-300 mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-[#ff1e00] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-[#ff1e00] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Text Area */}
        <div className="text-center mt-[70px] mb-6 min-h-[70px]">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-2 drop-shadow-md text-gray-900 transition-opacity duration-300 font-serif">{message}</h2>
           <p className="text-lg md:text-xl text-gray-600 font-medium">{subMessage}</p>
        </div>

        {/* 3x3 Grid */}
        {(isPlaying || gameOver) && (
        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-[240px] md:max-w-[300px] w-full mb-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <button
                   key={index}
                   onClick={() => handleSquareClick(index)}
                   aria-label={`Square ${index}`}
                   className={`
                      aspect-square rounded-2xl transition-all duration-200 ease-in-out cursor-pointer
                      ${activeSquare === index ? 'bg-white opacity-90 scale-95 shadow-[0_0_40px_rgba(255,255,255,1)] z-10' : 
                        wrongSquare === index ? 'bg-red-500 scale-95 shadow-[0_0_30px_rgba(239,68,68,0.8)] z-10 animate-pulse' : 
                        'bg-[#6582bf] hover:bg-[#7b96ce] border-t border-white/20 shadow-inner'}
                      ${(showSequence || !isPlaying) && !gameOver ? 'cursor-default pointer-events-none' : ''}
                   `}
                >
                </button>
            ))}
        </div>
        )}

        {/* Play Button overlay if not playing */}
        {!isPlaying && (
            <button 
               onClick={startGame}
               className="mt-6 px-8 py-3 bg-[#ff1e00] rounded-full text-xl font-bold text-white shadow-lg hover:bg-[#e61b00] hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameOver ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default SequenceMemory;
