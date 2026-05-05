import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy } from 'react-icons/fa';

const PerfectCircle = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [highScore, setHighScore] = useState(
    parseFloat(localStorage.getItem('perfectCircleHighScore')) || 0
  );
  
  const [score, setScore] = useState(0);
  
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const pointsRef = useRef([]);

  const [message, setMessage] = useState('Perfect Circle');
  const [subMessage, setSubMessage] = useState('Draw the most perfect circle you can! Test your hand stability and precision. The game measures how circular your drawing is.');

  const startGame = () => {
    setScore(0);
    setGameState('playing');
    setMessage('Draw a Circle');
    setSubMessage('Start drawing anywhere in the box.');
    pointsRef.current = [];
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && canvasRef.current) {
      const canvas = canvasRef.current;
      // Make it visually 400x400 but internally higher res if needed. Let's just do 400x400
      canvas.width = 400;
      canvas.height = 400;
      
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = '#4facfe'; // nice blue
      context.lineWidth = 6;
      contextRef.current = context;
    }
  }, [gameState]);

  const startDrawing = ({ nativeEvent }) => {
    if (gameState !== 'playing') return;
    
    // Support both mouse and touch
    let offsetX, offsetY;
    if (nativeEvent.touches) {
      const bcr = nativeEvent.target.getBoundingClientRect();
      offsetX = nativeEvent.touches[0].clientX - bcr.x;
      offsetY = nativeEvent.touches[0].clientY - bcr.y;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    pointsRef.current = [{ x: offsetX, y: offsetY }];
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || gameState !== 'playing') return;
    
    // Prevent scrolling when drawing on touch devices
    if (nativeEvent.cancelable) nativeEvent.preventDefault();

    let offsetX, offsetY;
    if (nativeEvent.touches) {
      const bcr = nativeEvent.target.getBoundingClientRect();
      offsetX = nativeEvent.touches[0].clientX - bcr.x;
      offsetY = nativeEvent.touches[0].clientY - bcr.y;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    pointsRef.current.push({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    evaluateCircle();
  };

  const evaluateCircle = () => {
    const points = pointsRef.current;
    if (points.length < 20) {
      setGameState('over');
      setMessage('Too short!');
      setSubMessage('Please draw a complete circle.');
      setScore(0);
      return;
    }

    // Calculate centroid
    let sumX = 0, sumY = 0;
    for (let p of points) {
      sumX += p.x;
      sumY += p.y;
    }
    const cx = sumX / points.length;
    const cy = sumY / points.length;

    // Calculate average radius
    let sumR = 0;
    const radii = points.map(p => {
      const r = Math.hypot(p.x - cx, p.y - cy);
      sumR += r;
      return r;
    });
    const avgR = sumR / points.length;

    if (avgR < 20) {
      setGameState('over');
      setMessage('Too small!');
      setSubMessage('Please draw a larger circle.');
      setScore(0);
      return;
    }

    // Check if closed (first point and last point distance should be reasonably close compared to radius)
    const firstP = points[0];
    const lastP = points[points.length - 1];
    const closingDist = Math.hypot(firstP.x - lastP.x, firstP.y - lastP.y);
    
    if (closingDist > avgR * 0.7) {
      setGameState('over');
      setMessage('Not closed!');
      setSubMessage('Make sure to connect the ends of your circle.');
      setScore(0);
      return;
    }

    // Calculate standard deviation of radii
    let varianceSum = 0;
    for (let r of radii) {
      varianceSum += Math.abs(r - avgR);
    }
    const avgDeviation = varianceSum / points.length;

    // Deviation ratio
    const deviationRatio = avgDeviation / avgR;
    
    // Perfection score (if deviation is 0, score is 100. If deviation is 0.2 (20% avg error), score is 80)
    // Scale it slightly so humanly possible circles can get 90+
    // E.g. deviation ratio * 1.5. So 10% error -> 15% reduction -> 85% score.
    let perfection = 100 - (deviationRatio * 150);
    perfection = Math.max(0, Math.min(100, perfection));
    
    const finalScore = parseFloat(perfection.toFixed(1));
    setScore(finalScore);

    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('perfectCircleHighScore', finalScore.toString());
    }

    setGameState('over');
    if (finalScore > 90) {
      setMessage('Excellent!');
    } else if (finalScore > 75) {
      setMessage('Good Job!');
    } else {
      setMessage('Keep Practicing!');
    }
    setSubMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#e8f9fd] px-4 font-sans text-gray-900">
      <div className="w-full max-w-3xl text-sm mb-6 text-gray-600 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#ff1e00] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-800">Perfect Circle</span>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl md:p-6 p-4 shadow-2xl shadow-gray-200/80 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[400px]">
        
        <div className="w-full flex justify-between absolute top-4 left-0 px-6 z-10 pointer-events-none">
            <div className="bg-[#e8f9fd] px-4 py-2 rounded-xl flex text-gray-800 flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5 pointer-events-auto">
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore.toFixed(1)}%</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-gray-300 mt-2 md:mt-0 pointer-events-auto">
               <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-[#ff1e00] border border-gray-200" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-[#ff1e00] border border-gray-200" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        <div className="text-center mt-[80px] md:mt-[70px] mb-4 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-gray-900 transition-opacity duration-300 font-serif">{message}</h2>
           <p className="text-base md:text-lg text-gray-600 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
        </div>

        {gameState === 'playing' && (
          <div className="w-full flex justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="bg-[#f8fafc] rounded-xl border border-blue-200 shadow-inner touch-none cursor-crosshair"
              style={{ width: '400px', height: '400px' }}
            />
          </div>
        )}

        {gameState === 'over' && (
          <div className="w-full max-w-sm flex flex-col items-center mt-4">
             <div className="text-6xl md:text-7xl font-black mb-4 tracking-widest text-center text-blue-500 drop-shadow-md tabular-nums">
                {score.toFixed(1)}<span className="text-4xl text-blue-300">%</span>
             </div>
             
             {/* Visual Progress Bar */}
             <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden relative shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-[#00f2fe] h-3 rounded-full absolute left-0 transition-all duration-1000 ease-out" 
                  style={{ width: `${score}%` }}
                ></div>
             </div>
          </div>
        )}

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

export default PerfectCircle;
