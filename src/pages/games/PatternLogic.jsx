import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaHeart } from 'react-icons/fa';

const PatternLogic = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [sequence, setSequence] = useState([]);
  const [answer, setAnswer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('patternLogicHighScore')) || 0
  );
  
  const [message, setMessage] = useState('Pattern Logic');
  const [subMessage, setSubMessage] = useState('Find the next number in sequences by identifying underlying patterns.');

  const inputRef = useRef(null);

  const generateSequence = (level) => {
    let type = Math.floor(Math.random() * 3);
    if (level > 5) type = Math.floor(Math.random() * 4);
    if (level > 10) type = Math.floor(Math.random() * 5);
    
    let seq = [];
    let ans = 0;
    
    switch (type) {
      case 0: // arithmetic
        const diff = Math.floor(Math.random() * 10) + 1 + Math.floor(level / 2);
        const start = Math.floor(Math.random() * 20);
        for (let i = 0; i < 4; i++) seq.push(start + i * diff);
        ans = start + 4 * diff;
        break;
      case 1: // geometric
        const ratio = Math.floor(Math.random() * 3) + 2;
        const gStart = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < 4; i++) seq.push(gStart * Math.pow(ratio, i));
        ans = gStart * Math.pow(ratio, 4);
        break;
      case 2: // squares/cubes
        const sStart = Math.floor(Math.random() * 10) + 1;
        const power = Math.random() > 0.8 && level > 5 ? 3 : 2;
        for (let i = 0; i < 4; i++) seq.push(Math.pow(sStart + i, power));
        ans = Math.pow(sStart + 4, power);
        break;
      case 3: // fibonacci-like
        let a = Math.floor(Math.random() * 5) + 1;
        let b = Math.floor(Math.random() * 5) + 1;
        seq.push(a);
        seq.push(b);
        for (let i = 2; i < 4; i++) {
          let next = a + b;
          seq.push(next);
          a = b;
          b = next;
        }
        ans = a + b;
        break;
      case 4: // alternating diff
        let altStart = Math.floor(Math.random() * 10) + 1;
        let diff1 = Math.floor(Math.random() * 5) + 1;
        let diff2 = Math.floor(Math.random() * 5) + 1;
        let current = altStart;
        for (let i = 0; i < 4; i++) {
          seq.push(current);
          current += (i % 2 === 0 ? diff1 : diff2);
        }
        ans = current;
        break;
      default:
        seq = [1, 2, 3, 4];
        ans = 5;
    }
    
    setSequence(seq);
    setAnswer(ans.toString());
    setUserInput('');
  };

  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, sequence]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('playing');
    setMessage('Find the Next Number');
    setSubMessage('Type your answer and press enter.');
    generateSequence(1);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!userInput) return;
    
    if (userInput.trim() === answer) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('patternLogicHighScore', newScore);
      }
      generateSequence(newScore + 1);
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setUserInput('');
      } else {
        setGameState('over');
        setMessage('Game Over');
        setSubMessage(`You reached a score of ${score}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-gray-600 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Pattern Logic</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[400px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#e8f9fd] px-4 py-2 rounded-xl flex text-gray-800 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Score: {gameState === 'menu' ? '-' : score}</span>
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            {gameState === 'playing' && (
              <div className="bg-[#e8f9fd] px-4 py-2 rounded-xl flex text-gray-800 items-center gap-2 border border-white/5 shadow-lg mt-2 md:mt-0">
                <span className="text-sm font-medium mr-1 text-gray-300">Lives:</span>
                {[...Array(3)].map((_, i) => (
                  <FaHeart key={i} className={`text-sm ${i < lives ? 'text-red-500' : 'text-gray-600'}`} />
                ))}
              </div>
            )}

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
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-900 transition-opacity duration-300 font-serif">{message}</h2>
           <p className="text-base md:text-lg text-gray-600 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
        </div>

        {/* Game Area */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 w-full">
              {sequence.map((num, i) => (
                <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-[#6552bf] border-t border-white/20 shadow-inner rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold">
                  {num}
                </div>
              ))}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-400 border-2 border-white/50 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)] text-white">
                ?
              </div>
            </div>

            <form onSubmit={handleInputSubmit} className="w-full max-w-[200px] relative group">
              <input
                ref={inputRef}
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Answer"
                className="w-full bg-[#352a6d] border border-white/20 rounded-xl px-4 py-3 text-xl font-bold text-center text-white focus:outline-none focus:border-white/60 transition-colors shadow-inner placeholder-purple-300"
                autoFocus
              />
              <button type="submit" className="hidden">Submit</button>
            </form>
          </div>
        )}

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

export default PatternLogic;
