import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaStar, FaHeart, FaMoon, FaSun, FaCloud, FaBolt, FaLeaf, FaFire } from 'react-icons/fa';

const ICONS = [FaStar, FaHeart, FaMoon, FaSun, FaCloud, FaBolt, FaLeaf, FaFire];
const initialSubMessage = "Memorize the positions of the pairs and match them.";

const MemoryMatch = () => {
  const [gameState, setGameState] = useState('menu'); // menu, showing, playing, transition, over
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('memoryMatchHighScore')) || 0);
  
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 3;

  const [message, setMessage] = useState('Memory Match');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (level - 1 > highScore && gameState !== 'menu') {
      const score = level - 1;
      setHighScore(score);
      localStorage.setItem('memoryMatchHighScore', score);
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

  const generateCards = (currentLevel) => {
    // Determine grid size based on level
    // Level 1: 4 cards (2 pairs), Level 2: 8 cards (4 pairs), Level 3: 12 cards, Level 4+: 16 cards (8 pairs max)
    let pairCount = 2;
    if (currentLevel === 2) pairCount = 4;
    else if (currentLevel === 3) pairCount = 6;
    else if (currentLevel >= 4) pairCount = 8; // Max 8 pairs with our 8 icons

    const selectedIcons = ICONS.slice(0, pairCount);
    let newCards = [...selectedIcons, ...selectedIcons]; // Duplicate for pairs
    
    // Shuffle
    for (let i = newCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    return newCards.map((Icon, idx) => ({ id: idx, Icon }));
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (currentLevel) => {
    setGameState('showing');
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMistakes(0);
    setMessage("Memorize the pairs...");
    setSubMessage("");

    const newCards = generateCards(currentLevel);
    setCards(newCards);

    // Show all cards briefly
    const allIndices = newCards.map((_, idx) => idx);
    setFlippedIndices(allIndices);

    let displayTime = 1500 + (currentLevel * 500); // More time for higher levels
    if (displayTime > 4000) displayTime = 4000;

    addTimeout(() => {
        setFlippedIndices([]);
        setGameState('playing');
        setMessage("Your Turn");
        setSubMessage(`Mistakes allowed: ${maxMistakes}`);
    }, displayTime);
  };

  const handleCardClick = (index) => {
      if (gameState !== 'playing' || flippedIndices.includes(index) || matchedPairs.includes(index) || flippedIndices.length === 2) return;

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      if (newFlipped.length === 2) {
          const [firstIndex, secondIndex] = newFlipped;
          const firstCard = cards[firstIndex];
          const secondCard = cards[secondIndex];

          if (firstCard.Icon === secondCard.Icon) {
              // Match
              setMatchedPairs(prev => {
                  const newMatches = [...prev, firstIndex, secondIndex];
                  if (newMatches.length === cards.length) {
                      // Level Complete
                      setGameState('transition');
                      setMessage("¡Correcto!");
                      setSubMessage("");
                      
                      addTimeout(() => {
                          startLevel(level + 1);
                          setLevel(level + 1);
                      }, 1500);
                  }
                  return newMatches;
              });
              setFlippedIndices([]);
          } else {
              // No Match
              const newMistakes = mistakes + 1;
              setMistakes(newMistakes);
              setSubMessage(`Mistakes allowed: ${maxMistakes - newMistakes}`);

              if (newMistakes >= maxMistakes) {
                  setGameState('over');
                  setMessage("Game Over");
                  setSubMessage(`You reached level ${level}\n\n${initialSubMessage}`);
              }

              addTimeout(() => {
                  setFlippedIndices([]);
              }, 800);
          }
      }
  };

  // Determine grid columns
  const cols = cards.length <= 4 ? 2 : cards.length <= 8 ? 4 : 4;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <div className="w-full max-w-4xl text-sm mb-6 text-gray-600 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-purple-400 flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Memory Match</span>
      </div>

      {/* Main Game Card - Purple Theme */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#6b21a8] to-[#4c1d95] rounded-2xl md:p-6 p-4 shadow-2xl shadow-purple-900/40 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md border border-white/20 pb-10 min-h-[550px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black/20 px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/10 backdrop-blur-sm">
               <span className="text-lg">Level: {gameState === 'menu' ? '-' : level}</span>
               <span className="text-gray-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-purple-100 mt-2 md:mt-0">
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
           <p className="text-base md:text-xl text-purple-100 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Grid Area */}
        {(gameState === 'showing' || gameState === 'playing' || gameState === 'transition') && (
            <div className={`grid gap-3 w-full max-w-md ${cards.length <= 4 ? 'grid-cols-2 max-w-[200px]' : cards.length <= 12 ? 'grid-cols-4 max-w-[350px]' : 'grid-cols-4'}`}>
                {cards.map((card, idx) => {
                    const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(idx);
                    const Icon = card.Icon;
                    return (
                        <div 
                            key={idx}
                            onClick={() => handleCardClick(idx)}
                            className="relative w-full aspect-square cursor-pointer [perspective:1000px]"
                        >
                            <div className={`w-full h-full absolute transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                                {/* Front (Hidden) */}
                                <div className={`absolute w-full h-full rounded-xl bg-black/20 border border-white/10 backdrop-blur-sm flex items-center justify-center [backface-visibility:hidden] ${gameState === 'playing' ? 'hover:bg-black/30' : ''}`}>
                                    <span className="text-purple-300/30 text-2xl font-bold">?</span>
                                </div>
                                {/* Back (Revealed) */}
                                <div className="absolute w-full h-full rounded-xl bg-white text-purple-700 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.8)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                    <Icon className="text-3xl md:text-4xl" />
                                </div>
                            </div>
                        </div>
                    )
                })}
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

export default MemoryMatch;
