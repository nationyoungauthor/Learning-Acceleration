import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaSmile, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const emotionsList = ['Happy', 'Sad', 'Angry', 'Surprised', 'Fear', 'Disgusted'];

const FaceSVG = ({ emotion }) => {
  let leftEyebrowPath = "M 65 75 Q 75 75 85 75";
  let rightEyebrowPath = "M 115 75 Q 125 75 135 75";
  
  let eyesElement = (
    <>
      <circle cx="75" cy="90" r="8" fill="#1E293B" />
      <circle cx="125" cy="90" r="8" fill="#1E293B" />
    </>
  );

  let mouthElement = (
    <path d="M 80 130 Q 100 130 120 130" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
  );

  switch (emotion) {
    case 'Happy':
      leftEyebrowPath = "M 60 70 Q 75 60 90 70";
      rightEyebrowPath = "M 110 70 Q 125 60 140 70";
      eyesElement = (
        <>
          <path d="M 65 92 Q 75 80 85 92" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 115 92 Q 125 80 135 92" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      );
      mouthElement = (
        <path d="M 70 120 Q 100 155 130 120" stroke="#1E293B" strokeWidth="5" fill="#FDA4AF" strokeLinecap="round" />
      );
      break;
    case 'Sad':
      leftEyebrowPath = "M 62 68 Q 75 74 88 78";
      rightEyebrowPath = "M 112 78 Q 125 74 138 68";
      eyesElement = (
        <>
          <circle cx="75" cy="92" r="8" fill="#1E293B" />
          <circle cx="125" cy="92" r="8" fill="#1E293B" />
          <circle cx="75" cy="108" r="4" fill="#38BDF8" className="animate-bounce" />
        </>
      );
      mouthElement = (
        <path d="M 80 140 Q 100 120 120 140" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
      );
      break;
    case 'Angry':
      leftEyebrowPath = "M 62 74 L 88 84";
      rightEyebrowPath = "M 112 84 L 138 74";
      eyesElement = (
        <>
          <path d="M 66 90 Q 75 85 84 90" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 116 90 Q 125 85 134 90" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      );
      mouthElement = (
        <path d="M 80 135 L 120 135" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
      );
      break;
    case 'Surprised':
      leftEyebrowPath = "M 60 62 Q 75 52 90 62";
      rightEyebrowPath = "M 110 62 Q 125 52 140 62";
      eyesElement = (
        <>
          <circle cx="75" cy="90" r="13" fill="white" stroke="#1E293B" strokeWidth="4" />
          <circle cx="75" cy="90" r="5" fill="#1E293B" />
          <circle cx="125" cy="90" r="13" fill="white" stroke="#1E293B" strokeWidth="4" />
          <circle cx="125" cy="90" r="5" fill="#1E293B" />
        </>
      );
      mouthElement = (
        <circle cx="100" cy="135" r="15" fill="#1E293B" />
      );
      break;
    case 'Fear':
      leftEyebrowPath = "M 62 65 Q 75 62 88 72";
      rightEyebrowPath = "M 112 72 Q 125 62 138 65";
      eyesElement = (
        <>
          <circle cx="75" cy="90" r="13" fill="white" stroke="#1E293B" strokeWidth="4" />
          <circle cx="75" cy="90" r="6" fill="#1E293B" />
          <circle cx="125" cy="90" r="13" fill="white" stroke="#1E293B" strokeWidth="4" />
          <circle cx="125" cy="90" r="6" fill="#1E293B" />
        </>
      );
      mouthElement = (
        <path d="M 85 130 Q 100 115 115 130 Q 115 145 100 145 Q 85 145 85 130" stroke="#1E293B" strokeWidth="5" fill="#CBD5E1" strokeLinecap="round" />
      );
      break;
    case 'Disgusted':
      leftEyebrowPath = "M 65 78 L 85 74";
      rightEyebrowPath = "M 115 74 L 135 78";
      eyesElement = (
        <>
          <path d="M 68 92 L 82 92" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <path d="M 118 92 L 132 92" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
        </>
      );
      mouthElement = (
        <path d="M 80 138 Q 100 120 120 138" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
      );
      break;
    default:
      break;
  }

  return (
    <svg width="150" height="150" viewBox="0 0 200 200" className="drop-shadow-md">
      <circle cx="100" cy="100" r="82" fill="#FDE047" stroke="#EAB308" strokeWidth="5" />
      <path d={leftEyebrowPath} stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d={rightEyebrowPath} stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g>{eyesElement}</g>
      <g>{mouthElement}</g>
    </svg>
  );
};

const EmotionReading = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('emotionReadingHighScore')) || 0
  );

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [activeEmotion, setActiveEmotion] = useState('Happy');
  const [selectedOption, setSelectedOption] = useState(null);

  const [message, setMessage] = useState('Emotion Reading');
  const [subMessage, setSubMessage] = useState('Read the avatar facial expression and choose the matching emotion.');

  const timerRef = useRef();

  const pickRandomEmotion = () => {
    const random = emotionsList[Math.floor(Math.random() * emotionsList.length)];
    setActiveEmotion(random);
    setSelectedOption(null);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
    setGameState('playing');
    setMessage('Identify the Expression!');
    setSubMessage('Match the buttons below to the face.');
    pickRandomEmotion();

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('over');
          setMessage('Game Over!');
          setSubMessage('Your emotional IQ session has ended.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOptionClick = (option) => {
    if (selectedOption !== null || gameState !== 'playing') return;
    setSelectedOption(option);

    if (option === activeEmotion) {
      setScore(prev => prev + 100);
      setTimeout(() => {
        pickRandomEmotion();
      }, 500);
    } else {
      setTimeLeft(prev => Math.max(0, prev - 3));
      setTimeout(() => {
        setSelectedOption(null);
      }, 500);
    }
  };

  useEffect(() => {
    if (gameState === 'over') {
      clearInterval(timerRef.current);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('emotionReadingHighScore', score.toString());
      }
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, score]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#F8FAFC] px-4 font-sans text-[#0F172A]">
      <div className="w-full max-w-3xl text-sm mb-6 text-[#64748B] flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <Link to="/games" className="hover:text-[#2563EB] transition-colors">Games</Link>
        <span>&gt;</span>
        <span className="text-[#0F172A] font-semibold">Emotion Reading</span>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl md:p-6 p-4 shadow-md flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 pb-10 min-h-[350px]">
        
        {/* Header Toolbar */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl flex text-[#0F172A] flex-col font-bold self-start mt-2 md:mt-0 shadow-sm border border-gray-200">
               <span className="text-yellow-600 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore} pts</span>
            </div>
            
            <div className="flex space-x-3 text-xl text-[#64748B] mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full hover:bg-gray-100 transition-all text-[#64748B] hover:text-[#2563EB] border border-gray-200">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Dynamic header info */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-display mb-3 text-[#0F172A] transition-opacity duration-300">{message}</h2>
           <p className="text-base md:text-xl text-[#64748B] font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md drop-shadow-sm">{subMessage}</p>
        </div>

        {/* State: MENU */}
        {gameState === 'menu' && (
          <div className="text-center w-full flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 mb-6 border border-pink-200">
              <FaSmile className="text-3xl" />
            </div>
            <button 
              onClick={startGame}
              className="cursor-pointer px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all outline-none border border-transparent"
            >
              Start Training
            </button>
          </div>
        )}

        {/* State: PLAYING */}
        {gameState === 'playing' && (
          <div className="w-full flex flex-col items-center">
            <div className="mb-6 flex justify-between w-full max-w-sm items-center px-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#64748B] uppercase">Time Remaining</span>
                <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-[#254f85]'}`}>{timeLeft}s</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-[#64748B] uppercase">Score</span>
                <span className="text-2xl font-black text-blue-600">{score}</span>
              </div>
            </div>

            <div className="mb-8 scale-110">
              <FaceSVG emotion={activeEmotion} />
            </div>

            {/* Options List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg mb-4">
              {emotionsList.map((option, index) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === activeEmotion;
                
                let buttonStyle = "bg-white text-[#254f85] border-slate-200 hover:border-blue-400 hover:bg-blue-50/50";
                let statusIcon = null;

                if (selectedOption !== null) {
                  if (isCorrectOption) {
                    buttonStyle = "bg-emerald-500 text-white border-emerald-500 shadow-md";
                    statusIcon = <FaCheckCircle className="text-white ml-1.5 text-base" />;
                  } else if (isSelected) {
                    buttonStyle = "bg-red-500 text-white border-red-500 shadow-md";
                    statusIcon = <FaTimesCircle className="text-white ml-1.5 text-base" />;
                  } else {
                    buttonStyle = "bg-white text-slate-400 border-slate-100 opacity-60 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={selectedOption !== null}
                    className={`cursor-pointer px-4 py-3 border-2 rounded-2xl font-bold transition-all text-sm text-center flex items-center justify-center ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {statusIcon}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 text-[11px] text-[#64748B] font-semibold text-center">
              Tip: Click the matching emotion. Wrong choices carry a -3s penalty!
            </div>
          </div>
        )}

        {/* State: OVER */}
        {gameState === 'over' && (
          <div className="w-full text-center flex flex-col items-center">
            <div className="text-6xl font-black text-[#2563EB] mb-8 drop-shadow-sm">
              {score} <span className="text-xl text-[#64748B]">pts</span>
            </div>

            <button
              onClick={startGame}
              className="cursor-pointer px-10 py-4 bg-[#2563EB] rounded-full text-xl font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all border border-transparent"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionReading;
