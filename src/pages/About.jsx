import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBrain, FaGraduationCap, FaRegCheckCircle, 
  FaLightbulb, FaBolt, FaPlay, FaRegClock, FaRegChartBar, FaRegEye
} from 'react-icons/fa';
import heroImage from '../assets/images/hero_bg.png';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-[#4b5563] font-sans relative overflow-hidden">
      
      {/* Background Shapes from website theme */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        
        {/* Top Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-4">About Us</h1>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            Learning Science & Mission - Empowering Student Success through cognitive acceleration and targeted brain training.
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="text-[#ffb900] text-xs font-bold uppercase tracking-wider mb-2 block">About LA</span>
            <h2 className="text-4xl md:text-[42px] font-bold text-[#1e1b4b] leading-tight mb-6">
              Train Your Brain,<br/> Accelerate Your Learning
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base">
              Cognitive acceleration is the process of improving key brain functions—like memory, logic patterns, and speed—to help students absorb and retain academic details more efficiently.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-block px-8 py-3.5 bg-[#ffb900] hover:bg-[#e6a600] text-white font-semibold rounded-full shadow-[0_8px_20px_-6px_rgba(255,185,0,0.5)] transition-all">
                Start Free Training
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-end">
             {/* Decorative box with image */}
             <div className="w-full max-w-[450px] h-[300px] bg-[#fdf2d2] rounded-lg relative p-4">
                <img 
                  src={heroImage} 
                  alt="Brain Training Hero" 
                  className="w-full h-full object-cover rounded shadow-xl"
                />
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-32 relative z-20">
          {[
            { value: '94%', label: 'Focus Retention', icon: FaBrain, highlighted: false },
            { value: '15s', label: 'Faster Math Solve', icon: FaBolt, highlighted: false },
            { value: '2.1x', label: 'Pattern Recall', icon: FaRegEye, highlighted: true },
            { value: '100%', label: 'Academic Focus', icon: FaGraduationCap, highlighted: false }
          ].map((stat, idx) => (
            <div key={idx} className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-2 ${stat.highlighted ? 'bg-[#1e1b4b] text-white shadow-[0_20px_40px_-10px_rgba(30,27,75,0.4)] scale-110 z-10' : 'bg-white text-[#1e1b4b] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]'}`}>
              <stat.icon className={`text-3xl mb-4 ${stat.highlighted ? 'text-blue-300' : 'text-[#ffb900]'}`} />
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</h3>
              <p className={`text-xs ${stat.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Feature Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Blob Image Placeholder */}
          <div className="relative flex justify-center items-center">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-[8px] border-white shadow-xl relative bg-white">
              {/* Floating Icons */}
              <div className="absolute -left-6 top-10 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-blue-500 animate-bounce z-20"><FaLightbulb /></div>
              <div className="absolute right-0 bottom-10 w-16 h-16 bg-white rounded-full shadow flex items-center justify-center text-[#ffb900] animate-bounce z-20" style={{animationDelay: '0.5s'}}><FaRegChartBar className="text-xl"/></div>
              
              {/* Image */}
              <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                <img 
                  src="/gameImage/colorMemory.png" 
                  alt="Color Memory Game" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] leading-tight mb-6">
              Why Students Benefit Most
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base">
              Unlike general cognitive platforms, Learning Acceleration is structured around academic applications. Training for just 10 minutes a day delivers measurable results.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Enhance test-taking endurance and prevent fatigue",
                "Improve numerical mental math speed and accuracy",
                "Boost reading speed and vocabulary pattern recall"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ffb900]/20 flex items-center justify-center flex-shrink-0">
                    <FaRegCheckCircle className="text-[#ffb900] text-xs" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/login" className="inline-block px-8 py-3.5 bg-[#ffb900] hover:bg-[#e6a600] text-white font-semibold rounded-full shadow-[0_8px_20px_-6px_rgba(255,185,0,0.5)] transition-all">
              Join Community
            </Link>
          </div>
        </div>

        {/* Feature Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] leading-tight mb-6">
              Awesome Science that Works for You!
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base">
              Working memory functions as the brain's "RAM." Exercises like sequence memory and grid recall help students store more information temporarily, directly improving reading comprehension.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Logical Reasoning structural pattern training",
                "Perception & Speed inhibition training",
                "Filter out background noise during tests"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ffb900]/20 flex items-center justify-center flex-shrink-0">
                    <FaRegCheckCircle className="text-[#ffb900] text-xs" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/" className="inline-block px-8 py-3.5 bg-[#ffb900] hover:bg-[#e6a600] text-white font-semibold rounded-full shadow-[0_8px_20px_-6px_rgba(255,185,0,0.5)] transition-all">
              Get Started Now
            </Link>
          </div>

          {/* Right Blob Image Placeholder */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-[40px] transform rotate-3 border-[8px] border-white shadow-xl relative">
              {/* Floating Icons */}
              <div className="absolute -left-6 top-10 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-indigo-500 animate-bounce z-20 transform -rotate-3"><FaBrain /></div>
              <div className="absolute -right-6 bottom-10 w-16 h-16 bg-white rounded-full shadow flex items-center justify-center text-indigo-500 animate-bounce z-20 transform -rotate-3" style={{animationDelay: '0.5s'}}><FaBolt /></div>
              
              {/* Image */}
              <div className="w-full h-full rounded-[32px] overflow-hidden relative z-10">
                <img 
                  src="/gameImage/memoryMatch.png" 
                  alt="Memory Match Game" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-[#ffb900] text-xs font-bold uppercase tracking-wider mb-2 block">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] leading-tight mb-6">
              Meet With Our Experts
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              We believe that mental training should be accessible and directly aligned with classroom learning. Join our community of active students accelerating their potential.
            </p>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
             {/* Team Member 1 (Highlighted) */}
             <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="h-32 bg-gray-200 w-full relative overflow-hidden">
                   {/* Avatar silhouette */}
                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-400 rounded-t-full"></div>
                   <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-400 rounded-full"></div>
                </div>
                <div className="bg-[#1e1b4b] p-3 text-center">
                   <h4 className="text-white text-sm font-bold">Dr. Robert Chen</h4>
                   <p className="text-blue-200 text-[10px] uppercase">Cognitive Doctor</p>
                </div>
             </div>

             {/* Team Member 2 */}
             <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                <div className="h-32 bg-gray-100 w-full relative overflow-hidden">
                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-300 rounded-t-full"></div>
                   <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
                <div className="bg-white p-3 text-center border-t border-gray-100">
                   <h4 className="text-[#1e1b4b] text-sm font-bold">Sarah Jenkins</h4>
                   <p className="text-gray-400 text-[10px] uppercase">Memory Trainer</p>
                </div>
             </div>

             {/* Team Member 3 */}
             <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all hidden sm:block">
                <div className="h-32 bg-gray-100 w-full relative overflow-hidden">
                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-300 rounded-t-full"></div>
                   <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
                <div className="bg-white p-3 text-center border-t border-gray-100">
                   <h4 className="text-[#1e1b4b] text-sm font-bold">Emily Carter</h4>
                   <p className="text-gray-400 text-[10px] uppercase">Lead Teacher</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
