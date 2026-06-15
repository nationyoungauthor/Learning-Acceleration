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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Speed Math</span>
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
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-black mb-6 tracking-widest text-center h-16 text-[#0F172A]">
              {num1} <span className="text-blue-500">{operator === '*' ? '×' : operator}</span> {num2} = ?
            </div>
            
            <div className="flex gap-3 mb-6 w-full">
              <div className="flex-grow bg-gray-50 border-b-4 border-blue-500 rounded-xl px-4 py-3 text-3xl font-bold text-center text-[#0F172A] h-16 flex items-center justify-center shadow-inner">
                {userInput || <span className="text-gray-400">_ _ _</span>}
              </div>
              <button 
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4 transition-colors shadow-md active:scale-95 text-lg"
              >
                Submit
              </button>
            </div>
            
            {/* Numpad */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 w-full bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleNumpadClick(num.toString())}
                  className="bg-white hover:bg-gray-100 active:bg-blue-100 border border-gray-200 rounded-xl h-14 md:h-16 text-2xl font-bold text-[#0F172A] transition-all shadow-sm active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleNumpadClick('0')}
                className="bg-white hover:bg-gray-100 active:bg-blue-100 border border-gray-200 rounded-xl h-14 md:h-16 text-2xl font-bold text-[#0F172A] transition-all shadow-sm active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => handleNumpadClick('C')}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 active:bg-red-200 rounded-xl h-14 md:h-16 text-xl font-bold transition-all shadow-sm active:scale-95"
              >
                C
              </button>
              <button
                onClick={() => handleNumpadClick('←')}
                className="bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border border-yellow-200 active:bg-yellow-200 rounded-xl h-14 md:h-16 text-xl font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center"
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
               className="mt-6 px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default SpeedMath;
