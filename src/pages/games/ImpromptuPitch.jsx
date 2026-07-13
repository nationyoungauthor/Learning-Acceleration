import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaMicrophone, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const speechTranscripts = [
  {
    original: "So, basically, um, we should, like, invest in this project, you know, because it is, uh, highly profitable.",
    // List of words that are fillers and should be clicked to remove
    fillers: ["So,", "basically,", "um,", "like,", "you", "know,", "uh,"],
    cleaned: "We should invest in this project because it is highly profitable."
  },
  {
    original: "Actually, uh, I think that, like, climate change is, like, a major threat to our, basically, environment, you know.",
    fillers: ["Actually,", "uh,", "like,", "like,", "basically,", "you", "know."],
    cleaned: "I think that climate change is a major threat to our environment."
  },
  {
    original: "Um, so, I would like to say that, literally, public speaking is, uh, super important for, like, your career.",
    fillers: ["Um,", "so,", "literally,", "uh,", "like,"],
    cleaned: "I would like to say that public speaking is super important for your career."
  },
  {
    original: "So, you know, like, computers are, basically, getting, like, extremely fast and, uh, powerful.",
    fillers: ["So,", "you", "know,", "like,", "basically,", "like,", "uh,"],
    cleaned: "Computers are getting extremely fast and powerful."
  },
  {
    original: "Um, actually, you know, like, learning new skills is, uh, basically, the best way to, like, grow your mind.",
    fillers: ["Um,", "actually,", "you", "know,", "like,", "uh,", "basically,", "the", "best", "way", "to", "like,"],
    // Let's refine fillers to only be actual fillers to avoid user confusion
    fillers: ["Um,", "actually,", "you", "know,", "like,", "uh,", "basically,", "like,"],
    cleaned: "Learning new skills is the best way to grow your mind."
  }
];

const ImpromptuPitch = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('impromptuPitchHighScore')) || 0
  );

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  
  // Array of words for the current sentence
  const [words, setWords] = useState([]);
  // Indices of words that have been correctly clicked
  const [cleanedIndices, setCleanedIndices] = useState([]);
  
  const [message, setMessage] = useState('Filler Word Cleaner');
  const [subMessage, setSubMessage] = useState('Remove all filler words (like, um, uh, you know) to clean the speech transcript.');

  const timerRef = useRef();

  const setupSentence = (idx) => {
    if (idx >= speechTranscripts.length) {
      setGameState('over');
      return;
    }
    
    const sentence = speechTranscripts[idx];
    const tokens = sentence.original.split(' ');
    setWords(tokens);
    setCleanedIndices([]);
    
    setMessage('Clean the Transcript!');
    setSubMessage('Click on the filler words to make the speech clean and professional.');
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
    setSentenceIdx(0);
    setGameState('playing');
    setupSentence(0);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('over');
          setMessage('Game Over!');
          setSubMessage('Your speaking clarity session has ended.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleWordClick = (word, index) => {
    if (gameState !== 'playing') return;
    if (cleanedIndices.includes(index)) return; // already cleaned

    const currentSentence = speechTranscripts[sentenceIdx];
    const isFiller = currentSentence.fillers.includes(word);

    if (isFiller) {
      const nextCleaned = [...cleanedIndices, index];
      setCleanedIndices(nextCleaned);
      setScore(prev => prev + 50);

      // Check if all fillers in current sentence are cleaned
      const remainingFillers = words.filter((w, idx) => 
        currentSentence.fillers.includes(w) && !nextCleaned.includes(idx)
      );

      if (remainingFillers.length === 0) {
        // Round won! Show points and load next sentence after short delay
        setScore(prev => prev + 150);
        setTimeout(() => {
          const nextIdx = sentenceIdx + 1;
          setSentenceIdx(nextIdx);
          setupSentence(nextIdx);
        }, 600);
      }
    } else {
      // Incorrect click penalty: lose 3 seconds
      setTimeLeft(prev => Math.max(0, prev - 3));
      
      const el = document.getElementById(`word-${index}`);
      if (el) {
        el.classList.add('bg-red-500', 'text-white', 'border-red-500');
        setTimeout(() => {
          el.classList.remove('bg-red-500', 'text-white', 'border-red-500');
        }, 300);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'over') {
      clearInterval(timerRef.current);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('impromptuPitchHighScore', score.toString());
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
        <span className="text-[#0F172A] font-semibold">Impromptu Pitch</span>
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
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6 border border-violet-200">
              <FaMicrophone className="text-3xl" />
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
            
            {/* Top Stats */}
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

            {/* Clickable paragraph container */}
            <div className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-8 text-center flex flex-wrap gap-2 justify-center leading-relaxed">
              {words.map((word, idx) => {
                const isCleaned = cleanedIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    id={`word-${idx}`}
                    onClick={() => handleWordClick(word, idx)}
                    className={`cursor-pointer px-2.5 py-1 rounded-xl text-base font-bold transition-all border outline-none ${
                      isCleaned 
                        ? 'bg-slate-200 text-slate-400 line-through border-transparent pointer-events-none scale-95 opacity-50' 
                        : 'bg-white text-[#254f85] border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 active:scale-95'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 text-[11px] text-[#64748B] font-semibold text-center">
              Tip: Click filler words (like "um", "like", "so") to cross them out. Click standard words by mistake and lose -3s!
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

export default ImpromptuPitch;
