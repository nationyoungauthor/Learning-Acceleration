import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaHeart } from 'react-icons/fa';

const SpeedMath = () => {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState(0);
  
  const [userInput, setUserInput] = useState('');
  
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('speedMathHighScore')) || 0
  );
  
  const [message, setMessage] = useState('Speed Math');
  const [subMessage, setSubMessage] = useState('Solve arithmetic problems as quickly as possible. Use the on-screen numpad or your keyboard!');

  const generateProblem = (currentScore) => {
    let maxNum = 10 + Math.floor(currentScore / 5) * 5;
    const ops = ['+', '-', '*'];
    const opIndex = currentScore > 15 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2);
    const op = ops[opIndex];
    
    let n1, n2, ans;
    
    if (op === '+') {
      n1 = Math.floor(Math.random() * maxNum) + 1;
      n2 = Math.floor(Math.random() * maxNum) + 1;
      ans = n1 + n2;
    } else if (op === '-') {
      n1 = Math.floor(Math.random() * maxNum) + 5;
      n2 = Math.floor(Math.random() * n1); 
      ans = n1 - n2;
    } else {
      n1 = Math.floor(Math.random() * 12) + 1;
      n2 = Math.floor(Math.random() * 10) + 1;
      ans = n1 * n2;
    }
    
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setAnswer(ans);
    setUserInput('');
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('playing');
    setMessage('Solve This');
    setSubMessage('');
    generateProblem(0);
  };

  const handleSubmit = useCallback(() => {
    if (userInput === '') return;
    
    if (parseInt(userInput) === answer) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('speedMathHighScore', newScore);
      }
      generateProblem(newScore);
    } else {
      setUserInput('');
      setLives(prev => prev - 1);
      if (lives <= 1) {
        setGameState('over');
        setMessage('Game Over!');
        setSubMessage(`You solved ${score} problems.`);
      }
    }
  }, [userInput, answer, score, highScore, lives]);

  const handleNumpadClick = (val) => {
    if (gameState !== 'playing') return;
    if (val === 'C') {
      setUserInput('');
    } else if (val === '←') {
      setUserInput(prev => prev.slice(0, -1));
    } else {
      setUserInput(prev => {
        if (prev.length < 5) return prev + val;
        return prev;
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      
      if (e.key >= '0' && e.key <= '9') {
        handleNumpadClick(e.key);
      } else if (e.key === 'Backspace') {
        handleNumpadClick('←');
      } else if (e.key === 'Escape') {
        handleNumpadClick('C');
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleSubmit]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-black px-4  text-gray-100">
      {/* Breadcrumbs */}
      <div className="w-full max-w-2xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">Speed Math</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Score: {gameState === 'menu' ? '-' : score}</span>
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            
            {gameState === 'playing' && (
              <div className="bg-black px-4 py-2 rounded-xl flex text-gray-200 items-center gap-2 border border-white/5 shadow-lg mt-2 md:mt-0">
                <span className="text-sm font-medium mr-1 text-gray-300">Lives:</span>
                {[...Array(3)].map((_, i) => (
                  <FaHeart key={i} className={`text-sm ${i < lives ? 'text-red-500' : 'text-gray-400'}`} />
                ))}
              </div>
            )}

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

        {/* Game Area */}
        {gameState === 'playing' && (
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-black mb-6 tracking-widest text-center h-16 drop-shadow-md">
              {num1} <span className="text-blue-300">{operator === '*' ? '×' : operator}</span> {num2} = ?
            </div>
            
            <div className="flex gap-3 mb-6 w-full">
              <div className="flex-grow bg-[#172554] border-b-4 border-blue-400 rounded-xl px-4 py-3 text-3xl font-bold text-center text-white h-16 flex items-center justify-center shadow-inner">
                {userInput || <span className="text-gray-500">_ _ _</span>}
              </div>
              <button 
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl px-4 transition-colors shadow-lg active:scale-95 text-lg"
              >
                Submit
              </button>
            </div>
            
            {/* Numpad */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 w-full bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleNumpadClick(num.toString())}
                  className="bg-[#243b6e] hover:bg-[#2d4a8a] active:bg-blue-500 border-t border-white/10 rounded-xl h-14 md:h-16 text-2xl font-bold transition-all shadow-md active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleNumpadClick('0')}
                className="bg-[#243b6e] hover:bg-[#2d4a8a] active:bg-blue-500 border-t border-white/10 rounded-xl h-14 md:h-16 text-2xl font-bold transition-all shadow-md active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => handleNumpadClick('C')}
                className="bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 active:bg-red-500 active:text-white rounded-xl h-14 md:h-16 text-xl font-bold transition-all shadow-md active:scale-95"
              >
                C
              </button>
              <button
                onClick={() => handleNumpadClick('←')}
                className="bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 border border-yellow-500/30 active:bg-yellow-500 active:text-white rounded-xl h-14 md:h-16 text-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center"
              >
                ←
              </button>
            </div>
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

export default SpeedMath;
