import React from 'react';
import { FaPlay, FaTrophy, FaLightbulb, FaBrain, FaListOl, FaThLarge, FaBolt, FaKeyboard, FaCrosshairs } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'sequence-memory',
    title: 'Sequence Memory',
    path: '/games/sequence-memory',
    icon: <FaLightbulb className="text-purple-400 text-2xl" />,
    desc: 'Memorize and repeat increasingly complex sequences to test your short-term memory capacity.',
    img: '/gameImage/sequenceMemory.png'
  },
  {
    id: 'visual-memory',
    title: 'Visual Memory',
    path: '/games/visual-memory',
    icon: <FaLightbulb className="text-red-400 text-2xl" />,
    desc: 'Remember patterns of tiles and recall them with increasing difficulty levels.',
    img: '/gameImage/visualMemory.png'
  },
  {
    id: 'word-memory',
    title: 'Word Memory',
    path: '/games/word-memory',
    icon: <span className="text-blue-400 font-bold text-2xl font-serif">A</span>,
    desc: 'Remember a list of words and identify them among distractors.',
    img: '/gameImage/wordMemory.png'
  },
  {
    id: 'seen-number-memory',
    title: 'Number Memory',
    path: '/games/seen-number-memory',
    icon: <span className="text-blue-400 font-bold text-2xl">1/9</span>,
    desc: 'Remember which numbers you have seen before and which are new.',
    img: '/gameImage/NumberMemory1.png'
  },
  {
    id: 'number-sequence',
    title: 'Number Sequence',
    path: '/games/number-sequence',
    icon: <span className="text-green-400 font-bold text-2xl">1/9</span>,
    desc: 'Watch a growing sequence of numbers and repeat it in order. One more digit is added each round.',
    img: '/gameImage/NumberSequence.png'
  },
  {
    id: 'number-memory',
    title: 'Number Memory',
    path: '/games/number-memory',
    icon: <span className="text-pink-400 font-bold text-2xl">1/9</span>,
    desc: 'Memorize and recall increasingly longer number sequences to test your short-term memory capacity.',
    img: '/gameImage/NumberMemory2.png'
  },
];

const Home = () => {
  return (
    <div className="flex flex-col flex-grow bg-[#151a28]">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 overflow-hidden group">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/9e/c6/c9/9ec6c945af9bdbd5080689d7f12c8cbb.jpg"
            alt="Abstract colorful background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay with animated colorful gradient */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-transparent to-pink-900/30 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-10">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 transform transition-all duration-700 hover:scale-[1.02] cursor-default">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#f093fb] drop-shadow-[0_0_15px_rgba(79,172,254,0.4)]">
              Learning
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f093fb] via-[#f5576c] to-[#ff9a9e] drop-shadow-[0_0_15px_rgba(245,87,108,0.4)]">
              Acceleration
            </span>
          </h1>

          {/* Subtitle text */}
          <p className="text-[#e2e8f0] text-lg md:text-2xl font-medium leading-relaxed mb-10 max-w-3xl text-center drop-shadow-md">
            Boost your brain power with fun and interactive games. <span className="text-[#00f2fe] font-medium">Crafted to improve memory,</span> focus, and thinking speed, our activities are science-based,
            <span className="text-[#f5576c] font-medium"> with many free options and advanced premium features available</span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 w-full mb-10 mt-10">
            <button className="group flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-black text-lg hover:from-[#3fe7f5] hover:to-[#6bb1f5] shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:shadow-[0_0_30px_rgba(0,242,254,0.8)] transition-all hover:-translate-y-1.5 focus:outline-none">
              <FaPlay className="text-sm group-hover:scale-125 transition-transform" />
              <span>Start Training</span>
            </button>

            <button className="group flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4 rounded-full bg-black/30 backdrop-blur-md border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-bold text-lg shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-1.5 focus:outline-none">
              <FaTrophy className="text-lg opacity-90 text-[#f5576c] group-hover:scale-125 group-hover:rotate-[15deg] transition-transform" />
              <span>Compare to others</span>
            </button>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Memory Games <span className="text-gray-500 font-medium text-2xl">({games.length})</span></h2>
             <p className="text-xl text-gray-400 max-w-2xl">
               Test and improve your working memory, visual recall, and pattern recognition.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <Link 
               to={game.path} 
               key={index}
               className="group flex flex-col bg-[#1c2333] hover:bg-[#242c40] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Card Image Area */}
              <div className="h-48 w-full relative flex items-center justify-center overflow-hidden bg-[#0c101a]">
                 <img src={game.img} alt={game.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1c2333] to-transparent opacity-80"></div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow">
                 <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#2a364f] flex items-center justify-center shadow-inner group-hover:bg-[#344365] transition-colors">
                       {game.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white ml-5 tracking-wide">{game.title}</h3>
                 </div>
                 
                 <p className="text-gray-400 text-lg leading-relaxed flex-grow text-left">
                    {game.desc}
                 </p>
                 
                 <button className="mt-8 w-full py-4 rounded-2xl bg-[#2a364f] group-hover:bg-white/10 text-white font-bold text-lg transition-all border border-transparent group-hover:border-white/20">
                    Start Training
                 </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
