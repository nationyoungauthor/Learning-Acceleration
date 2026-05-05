import React from 'react';
import { FaPlay, FaTrophy, FaLightbulb, FaBrain, FaListOl, FaThLarge, FaBolt, FaKeyboard, FaCrosshairs, FaPuzzlePiece, FaPalette, FaStopwatch, FaClock, FaMousePointer, FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'sequence-memory',
    title: 'Sequence Memory',
    path: '/games/sequence-memory',
    icon: <FaLightbulb className="text-purple-400 text-2xl" />,
    desc: 'Memorize and repeat increasingly complex sequences to test your short-term memory capacity.',
    img: '/gameImage/sequenceMemory.svg'
  },
  {
    id: 'visual-memory',
    title: 'Visual Memory',
    path: '/games/visual-memory',
    icon: <FaLightbulb className="text-red-400 text-2xl" />,
    desc: 'Remember patterns of tiles and recall them with increasing difficulty levels.',
    img: '/gameImage/visualMemory.svg'
  },
  {
    id: 'word-memory',
    title: 'Word Memory',
    path: '/games/word-memory',
    icon: <span className="text-blue-400 font-bold text-2xl font-serif">A</span>,
    desc: 'Remember a list of words and identify them among distractors.',
    img: '/gameImage/wordMemory.svg'
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
  {
    id: 'memory-match',
    title: 'Memory Match',
    path: '/games/memory-match',
    icon: <FaPuzzlePiece className="text-purple-400 text-3xl drop-shadow-md" />,
    desc: 'Test your visual memory by matching pairs of icons in a grid',
    img: '/gameImage/memoryMatch.png'
  },
  {
    id: 'color-memory',
    title: 'Color Memory',
    path: '/games/color-memory',
    icon: <FaPalette className="text-pink-400 text-3xl drop-shadow-md" />,
    desc: 'Test your short-term memory by remembering and selecting a color you saw briefly. Can you tell similar shades apart?',
    img: '/gameImage/colorMemory.png'
  },
  {
    id: 'chimp-test',
    title: 'Chimp Test',
    path: '/games/chimp-test',
    icon: <FaBrain className="text-red-400 text-3xl drop-shadow-md" />,
    desc: 'Remember numbers and click them in ascending order! Numbers appear briefly, then disappear. Can you remember the sequence?',
    img: '/gameImage/chimpTest.png'
  },

];

const logicGames = [
  {
    id: 'pattern-logic',
    title: 'Pattern Logic',
    path: '/games/pattern-logic',
    icon: <FaBrain className="text-purple-400 text-2xl" />,
    desc: 'Find the next number in sequences by identifying underlying patterns.',
    img: '/gameImage/patternLogic.svg'
  },
  {
    id: 'stroop-test',
    title: 'Stroop Test',
    path: '/games/stroop-test',
    icon: <FaBrain className="text-blue-400 text-2xl" />,
    desc: 'Test your inhibitory control by naming the color of text when the word says something different. A classic cognitive psychology challenge!',
    img: '/gameImage/stroopTest.svg'
  },
  {
    id: 'color-target',
    title: 'Color Target',
    path: '/games/color-target',
    icon: <FaCrosshairs className="text-red-400 text-2xl" />,
    desc: 'Click only the correctly colored targets while avoiding distractors.',
    img: '/gameImage/colorTarget.svg'
  },
  {
    id: 'one-to-fifty',
    title: 'One to Fifty',
    path: '/games/one-to-fifty',
    icon: <FaListOl className="text-orange-400 text-2xl" />,
    desc: 'Click numbers in ascending order as quickly as possible to test your visual scanning.',
    img: '/gameImage/oneToFifty.svg'
  },
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    path: '/games/word-scramble',
    icon: <FaPuzzlePiece className="text-indigo-400 text-2xl" />,
    desc: 'Unscramble letters to form valid words. Test your vocabulary and pattern recognition skills.',
    img: '/gameImage/wordScramble.svg'
  },
  {
    id: 'speed-math',
    title: 'Speed Math',
    path: '/games/speed-math',
    icon: <FaKeyboard className="text-yellow-400 text-2xl" />,
    desc: 'Solve arithmetic problems as quickly as possible to improve mental calculation skills.',
    img: '/gameImage/speedMath.svg'
  }
];

const perceptionGames = [
  {
    id: '5-second-test',
    title: '5-Second Test',
    path: '/games/5-second-test',
    icon: <FaStopwatch className="text-[#00f2fe] text-2xl" />,
    desc: 'Stop the timer exactly at 5 seconds to test your time perception accuracy.',
    img: '/gameImage/5secondTest.png'
  },
  {
    id: 'time-estimator',
    title: 'Time Estimator',
    path: '/games/time-estimator',
    icon: <FaClock className="text-[#8B4513] text-2xl" />,
    desc: 'Estimate durations as accurately as possible without counting.',
    img: '/gameImage/timeEstimator.png'
  },
  {
    id: 'inverted-mouse',
    title: 'Inverted Mouse',
    path: '/games/inverted-mouse',
    icon: <FaMousePointer className="text-[#00f2fe] text-2xl" />,
    desc: 'Move your cursor to the target with fully reversed controls. Hover each numbered circle to score as many points as possible in 60 seconds.',
    img: '/gameImage/invertedMouse.png'
  },
  {
    id: 'perfect-circle',
    title: 'Perfect Circle',
    path: '/games/perfect-circle',
    icon: <FaCircle className="text-[#8e98ff] text-2xl" />,
    desc: 'Draw the most perfect circle you can! Test your hand stability and precision. The game measures how circular your drawing is in real-time.',
    img: '/gameImage/perfectCircle.png'
  }
];

const Home = () => {
  return (
    <div className="flex flex-col flex-grow bg-[#e8f9fd]">

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
            <button
              onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-black text-lg hover:from-[#3fe7f5] hover:to-[#6bb1f5] shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:shadow-[0_0_30px_rgba(0,242,254,0.8)] transition-all hover:-translate-y-1.5 focus:outline-none"
            >
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
      <section id="games-section" className="py-10 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Memory Games <span className="text-gray-500 font-medium text-2xl">({games.length})</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl">
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

      {/* Logic & Attention Games Section */}
      <section id="logic-games-section" className="py-10 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Logic & Attention <span className="text-gray-500 font-medium text-2xl">({logicGames.length})</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Enhance problem-solving, pattern recognition, and cognitive control.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logicGames.map((game, index) => (
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

              {/* Card Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-[#2a3449] rounded-2xl group-hover:bg-[#34405a] transition-colors duration-300">
                    {game.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{game.title}</h3>
                </div>
                <p className="text-gray-400 text-base leading-relaxed mb-8 flex-grow">
                  {game.desc}
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center justify-center w-full px-6 py-3 border border-white/10 rounded-xl text-sm font-semibold text-white bg-[#2a3449] hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-sm group-hover:shadow-blue-500/25">
                    Start Training
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Perception & Control Games Section */}
      <section id="perception-games-section" className="py-10 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Perception & Control <span className="text-gray-500 font-medium text-2xl">({perceptionGames.length})</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Train your time perception, motor precision, and hand-eye coordination
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perceptionGames.map((game, index) => (
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

              {/* Card Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-[#2a3449] rounded-2xl group-hover:bg-[#34405a] transition-colors duration-300">
                    {game.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{game.title}</h3>
                </div>
                <p className="text-gray-400 text-base leading-relaxed mb-8 flex-grow">
                  {game.desc}
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center justify-center w-full px-6 py-3 border border-white/10 rounded-xl text-sm font-semibold text-white bg-[#2a3449] hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-sm group-hover:shadow-blue-500/25">
                    Start Training
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
