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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Pattern Logic</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl md:p-6 p-4 shadow-md flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-sm border border-gray-200">
               <span className="text-lg text-[#0F172A]">Score: {gameState === 'menu' ? '-' : score}</span>
               <span className="text-yellow-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            {gameState === 'playing' && (
              <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-200 shadow-sm mt-2 md:mt-0">
                <span className="text-sm font-medium mr-1 text-[#64748B]">Lives:</span>
                {[...Array(3)].map((_, i) => (
                  <FaHeart key={i} className={`text-sm ${i < lives ? 'text-red-500' : 'text-gray-300'}`} />
                ))}
              </div>
            )}

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
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-display mb-3 text-[#0F172A] transition-opacity duration-300">{message}</h2>
           <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* Game Area */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 w-full">
              {sequence.map((num, i) => (
                <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 border border-gray-200 shadow-sm rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold text-[#0F172A]">
                  {num}
                </div>
              ))}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 border-2 border-blue-300 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold shadow-sm text-blue-700">
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
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xl font-bold text-center text-[#0F172A] focus:outline-none focus:border-blue-500 transition-colors shadow-inner placeholder-gray-400"
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
               className="mt-6 px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default PatternLogic;
