import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVolumeUp, FaExpand, FaTrophy, FaCheck, FaTimes } from 'react-icons/fa';

const DICTIONARY = [
  "time", "year", "people", "way", "day", "man", "thing", "woman", "life", "child", 
  "world", "school", "state", "family", "student", "group", "country", "problem", "hand", "part", 
  "place", "case", "week", "company", "system", "program", "question", "work", "government", "number", 
  "night", "point", "home", "water", "room", "mother", "area", "money", "story", "fact", 
  "month", "lot", "right", "study", "book", "eye", "job", "word", "business", "issue", 
  "side", "kind", "head", "house", "service", "friend", "father", "power", "hour", "game", 
  "line", "end", "member", "law", "car", "city", "community", "name", "president", "team", 
  "minute", "idea", "kid", "body", "information", "back", "parent", "face", "others", "level", 
  "office", "door", "health", "person", "art", "war", "history", "party", "result", "change", 
  "morning", "reason", "research", "girl", "guy", "moment", "air", "teacher", "force", "education",
  "foot", "boy", "age", "policy", "process", "music", "market", "sense", "nation", "plan",
  "college", "interest", "death", "experience", "effect", "use", "class", "control", "care", "field",
  "development", "role", "effort", "rate", "heart", "drug", "show", "leader", "light", "voice",
  "wife", "police", "mind", "step", "record", "paper", "action", "model", "nature", "matter",
  "center", "couple", "site", "project", "event", "star", "court", "base", "space", "ground",
  "tree", "wall", "bank", "track", "animal", "board", "road", "stone", "window", "rule"
];

const initialSubMessage = "Remember a list of words and identify them among distractors.\n\nThe words come one by one. If you've seen the word before, click SEEN. If it's a new word, click NEW. You have 3 strikes.";

const WordMemory = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('wordHighScore')) || 0);
  const [lives, setLives] = useState(3);
  
  const [seenWords, setSeenWords] = useState(new Set());
  const [currentWord, setCurrentWord] = useState('');
  
  const [message, setMessage] = useState('Word Memory');
  const [subMessage, setSubMessage] = useState(initialSubMessage);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('wordHighScore', score);
    }
  }, [score, highScore]);

  const selectNextWord = (currentSeenSet) => {
    // 50% chance to show a seen word (if any exist), 50% chance to show a new word
    // Actually, sometimes it's 30/70. Let's do 50/50.
    const showSeen = currentSeenSet.size > 0 && Math.random() > 0.5;
    
    if (showSeen) {
      const seenArray = Array.from(currentSeenSet);
      const randomIdx = Math.floor(Math.random() * seenArray.length);
      setCurrentWord(seenArray[randomIdx]);
    } else {
      // Find a word not in seenWords
      let newWord = '';
      let attempts = 0;
      while (attempts < 100) { // arbitrary limit to prevent infinite loops if dict is exhausted
        const randomIdx = Math.floor(Math.random() * DICTIONARY.length);
        const candidate = DICTIONARY[randomIdx];
        if (!currentSeenSet.has(candidate)) {
          newWord = candidate;
          break;
        }
        attempts++;
      }
      
      // If we somehow exhausted the dictionary, just pick any word
      if (!newWord) {
        newWord = DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
      }
      
      setCurrentWord(newWord);
    }
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setSeenWords(new Set());
    setGameState('playing');
    setMessage('Have you seen this word before?');
    setSubMessage('You have 3 strikes left');
    selectNextWord(new Set());
  };

  const wrapGameOver = (finalScore) => {
    setGameState('over');
    setMessage('Game Over');
    setSubMessage(`You reached a score of ${finalScore}\n\n${initialSubMessage}`);
  };

  const handleGuess = (guessIsSeen) => {
    if (gameState !== 'playing') return;

    const isActuallySeen = seenWords.has(currentWord);
    
    if (guessIsSeen === isActuallySeen) {
      // Correct!
      const newScore = score + 1;
      setScore(newScore);
      
      // Add current word to seen words
      const newSeenSet = new Set(seenWords);
      newSeenSet.add(currentWord);
      setSeenWords(newSeenSet);
      
      selectNextWord(newSeenSet);
    } else {
      // Wrong!
      const nextLives = lives - 1;
      setLives(nextLives);
      
      if (nextLives > 0) {
        setSubMessage(`You have ${nextLives} ${nextLives === 1 ? 'strike' : 'strikes'} left`);
        
        // Still add it so they don't get punished twice if it shows up again
        const newSeenSet = new Set(seenWords);
        newSeenSet.add(currentWord);
        setSeenWords(newSeenSet);
        
        selectNextWord(newSeenSet);
      } else {
        wrapGameOver(score);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-[100px])] py-8 bg-[#151a28] px-4 font-sans text-white">
      {/* Breadcrumbs */}
      <div className="w-full max-w-3xl text-sm mb-6 text-gray-400 flex items-center space-x-2 mt-12 md:mt-0">
        <Link to="/" className="hover:text-blue-400 flex items-center transition-colors"><FaHome className="mr-1"/> Home</Link>
        <span>&gt;</span>
        <span>Games</span>
        <span>&gt;</span>
        <span className="text-gray-200">Word Memory</span>
      </div>

      {/* Main Game Card */}
      <div className="w-full max-w-2xl bg-[#3b5998] rounded-2xl md:p-6 p-4 shadow-2xl shadow-blue-900/50 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md border border-white/5 pb-10 min-h-[400px]">
        
        {/* Top Bar inside Card */}
        <div className="w-full flex justify-between absolute top-4 left-0 px-6">
            <div className="bg-[#24355c] px-4 py-2 rounded-xl flex flex-col font-bold self-start mt-2 md:mt-0 shadow-lg border border-white/5">
               <span className="text-lg">Score: {score}</span>
               <span className="text-yellow-400 text-sm flex items-center"><FaTrophy className="mr-1"/> Best: {highScore}</span>
            </div>
            <div className="flex space-x-3 text-xl text-gray-300 mt-2 md:mt-0">
               <button className="w-12 h-12 flex items-center justify-center bg-[#2a4073] rounded-full hover:bg-[#1f2f54] transition-all hover:text-white" title="Toggle Sound">
                  <FaVolumeUp />
               </button>
               <button className="w-12 h-12 flex items-center justify-center bg-[#2a4073] rounded-full hover:bg-[#1f2f54] transition-all hover:text-white" title="Fullscreen">
                  <FaExpand />
               </button>
            </div>
        </div>

        {/* Text Area */}
        <div className="text-center mt-[80px] md:mt-[70px] mb-6 min-h-[70px] px-2 md:px-12 w-full">
           <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3 drop-shadow-md text-white transition-opacity duration-300 font-serif">{message}</h2>
           <p className="text-base md:text-lg text-blue-200 font-medium whitespace-pre-line leading-relaxed mx-auto max-w-md">{subMessage}</p>
        </div>

        {/* Dynamic Card/Interaction Area */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center w-full mt-4 mb-4 min-h-[150px]">
            <div className="text-5xl md:text-6xl font-black mb-12 tracking-wide break-all max-w-[90%] text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
               {currentWord}
            </div>

            <div className="flex gap-4 sm:gap-6 mt-auto">
               <button 
                  onClick={() => handleGuess(true)}
                  className="flex items-center gap-2 px-8 md:px-10 py-4 bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold rounded-xl text-xl shadow-[0_0_20px_rgba(231,76,60,0.5)] transform hover:scale-105 transition-all"
               >
                  <FaCheck /> SEEN
               </button>
               <button 
                  onClick={() => handleGuess(false)}
                  className="flex items-center gap-2 px-8 md:px-10 py-4 bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold rounded-xl text-xl shadow-[0_0_20px_rgba(46,204,113,0.5)] transform hover:scale-105 transition-all"
               >
                  <FaTimes /> NEW
               </button>
            </div>
            
            {/* Dots underneath for lives (matching screenshot's vague dots or maybe those were lives?) Let's show strikes as dots */}
            <div className="flex gap-3 mt-8">
               {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < lives ? 'bg-white/70' : 'bg-black/30 shadow-inner'}`}></div>
               ))}
            </div>
          </div>
        )}

        {/* Play Button overlay if not playing */}
        {(gameState === 'menu' || gameState === 'over') && (
            <button 
               onClick={startGame}
               className="mt-6 px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full text-xl font-bold text-white shadow-xl hover:bg-white/30 hover:scale-105 transition-all outline-none border border-white/30 hover:border-white/60"
            >
               {gameState === 'over' ? 'Try Again' : 'Start Training'}
            </button>
        )}
      </div>
    </div>
  );
};

export default WordMemory;
