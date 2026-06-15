import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBrain, FaSlidersH, FaGraduationCap, FaCheckCircle, 
  FaPlay, FaRedo, FaInfoCircle 
} from 'react-icons/fa';

const BrainAssessment = () => {
  const [memory, setMemory] = useState(70);
  const [focus, setFocus] = useState(65);
  const [logic, setLogic] = useState(80);
  const [speed, setSpeed] = useState(60);
  const [savedResult, setSavedResult] = useState(false);

  const averageScore = Math.round((memory + focus + logic + speed) / 4);
  
  // Calculate simulated IQ Index based on average score (scale ~ 85 - 145)
  const iqIndex = Math.round(85 + (averageScore / 100) * 60);

  const getProfileName = (iq) => {
    if (iq >= 130) return "Analytical Visionary (Genius Profile)";
    if (iq >= 120) return "Rapid Strategist (Superior Profile)";
    if (iq >= 110) return "Balanced Connector (High Average Profile)";
    return "Persistent Builder (Average Profile)";
  };

  const getAcademicAdvice = () => {
    const weaknesses = [];
    if (memory < 70) weaknesses.push("Working memory capacity limit. Try chunking complex terms into acronyms.");
    if (focus < 70) weaknesses.push("Attentional control drifts. Study using silent study blocks or timed intervals.");
    if (logic < 70) weaknesses.push("Deductive puzzle speeds are slow. Practice pattern-based puzzles daily.");
    if (speed < 70) weaknesses.push("Visual motor perception delay. Try rapid arithmetic math drills.");

    if (weaknesses.length === 0) {
      return ["Awesome profile balance! Keep pushing your scores higher by doing hard level logic tests."];
    }
    return weaknesses;
  };

  const saveAssessment = () => {
    localStorage.setItem('iqTestHighScore', iqIndex);
    setSavedResult(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Assessment Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-4">
            <FaGraduationCap />
            <span>Brain Evaluation Portal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Cognitive Assessment <span className="text-[#2563EB]">Core</span>
          </h1>
          <p className="text-[#64748B] text-base max-w-xl mx-auto">
            Evaluate your core cognitive strengths. Drag the sliders to calculate your Brain Index and get personalized study recommendations.
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Sliders Container */}
          <div className="lg:col-span-3 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Configure Cognitive Pillars</h3>
              <p className="text-xs text-[#64748B] leading-relaxed mb-8">Set your current capabilities in these categories. Our system matches these with games metrics.</p>
            </div>

            <div className="space-y-6">
              {/* Memory Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">💾 Working Memory</span>
                  <span className="text-blue-600">{memory}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={memory} 
                  onChange={(e) => { setMemory(parseInt(e.target.value)); setSavedResult(false); }}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Focus Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">🎯 Attention & Focus</span>
                  <span className="text-purple-600">{focus}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={focus} 
                  onChange={(e) => { setFocus(parseInt(e.target.value)); setSavedResult(false); }}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Logic Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">🧩 Pattern Logic</span>
                  <span className="text-emerald-600">{logic}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={logic} 
                  onChange={(e) => { setLogic(parseInt(e.target.value)); setSavedResult(false); }}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">⚡ Reaction Speed</span>
                  <span className="text-rose-600">{speed}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={speed} 
                  onChange={(e) => { setSpeed(parseInt(e.target.value)); setSavedResult(false); }}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              {savedResult ? (
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 rounded-xl p-3 justify-center">
                  <FaCheckCircle />
                  <span>Evaluation Recorded to Profile Dashboard!</span>
                </div>
              ) : (
                <button
                  onClick={saveAssessment}
                  className="w-full py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  <span>Commit Brain Assessment</span>
                </button>
              )}
            </div>
          </div>

          {/* Brain Score Circular Widget */}
          <div className="lg:col-span-2 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between items-center text-center">
            <div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Overall Brain Index</h3>
              <p className="text-[10px] text-[#64748B] leading-none mb-6">Generated real-time analysis</p>
            </div>

            {/* Circular Gauge visualization */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {/* Outer circular gradient border indicator */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-slate-100" 
                style={{
                  backgroundImage: `conic-gradient(#2563EB ${averageScore}%, #f1f5f9 ${averageScore}%)`
                }}
              ></div>
              {/* Inner white circle masking */}
              <div className="absolute inset-[6px] bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-[#0F172A]">{iqIndex}</span>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">IQ INDEX</span>
              </div>
            </div>

            <div>
              <span className="inline-block text-[11px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-2">
                {getProfileName(iqIndex)}
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Strength Focus: {averageScore}% Index Quotient</p>
            </div>

            {/* Student study tips */}
            <div className="w-full border-t border-slate-100 pt-5 mt-6 text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                <FaInfoCircle />
                <span>AI Cognitive Coach Tips</span>
              </span>
              <ul className="space-y-2">
                {getAcademicAdvice().map((advice, idx) => (
                  <li key={idx} className="text-slate-600 text-[11px] leading-relaxed flex items-start gap-1.5">
                    <span className="text-blue-500 text-xs mt-0.5">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BrainAssessment;
