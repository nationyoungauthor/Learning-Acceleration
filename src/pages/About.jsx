import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBrain, FaGraduationCap, FaRegCheckCircle, 
  FaLightbulb, FaBolt
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden pb-20 font-sans">
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16">
        {/* Breadcrumb banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
            <FaGraduationCap className="text-sm" />
            <span>Learning Science & Mission</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-display mb-6">
            Train Your Brain <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">
              Accelerate Your Learning
            </span>
          </h1>
          
          <p className="text-[#64748B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Cognitive acceleration is the process of improving key brain functions—like memory, logic patterns, and speed—to help students absorb and retain academic details more efficiently.
          </p>
        </div>

        {/* Science Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
              <FaLightbulb className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold font-display mb-3">1. Working Memory</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Working memory functions as the brain's "RAM." Exercises like sequence memory and grid recall help students store more information temporarily, directly improving reading comprehension and lecture retention.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
              <FaBrain className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold font-display mb-3">2. Logical Reasoning</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Identifying underlying structural patterns is core to mathematical and analytical problems. Training logical connections helps students process exam questions faster and solve abstract problems.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 mb-6">
              <FaBolt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold font-display mb-3">3. Perception & Speed</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Reaction time and inhibition training prepare the brain to filter out background noise. By training attention, students improve time management during tests and increase motor control.
            </p>
          </div>
        </div>

        {/* Big Science Section (Text + Interactive Cards feel) */}
        <div className="bg-white shadow-md border border-gray-100 rounded-[2.5rem] p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold font-display mb-6">Why Students Benefit Most</h2>
              <p className="text-[#64748B] text-sm md:text-base leading-relaxed mb-6">
                Unlike general cognitive platforms, Learning Acceleration is structured around academic applications. Training for just 10 minutes a day has been shown to:
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Enhance test-taking endurance and prevent fatigue",
                  "Improve numerical mental math speed and accuracy",
                  "Boost reading speed and vocabulary pattern recall",
                  "Heighten focus during long study blocks and lectures"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-[#64748B]">
                    <FaRegCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/" className="px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm text-center shadow-md transition-all">
                  Start Free Training
                </Link>
                <Link to="/login" className="px-6 py-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-gray-100 border border-gray-200 text-[#0F172A] font-bold text-sm text-center transition-all">
                  Join Community
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
                <div className="text-3xl font-black text-indigo-600 w-12 text-center">94%</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">Focus Retention Improvement</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">Students reported increased exam concentration after 2 weeks of training.</p>
                </div>
              </div>
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
                <div className="text-3xl font-black text-blue-600 w-12 text-center">15s</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">Faster Math Solve Time</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">Average improvement in rapid numeric problem calculation and deduction.</p>
                </div>
              </div>
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
                <div className="text-3xl font-black text-purple-600 w-12 text-center">2.1x</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">Pattern Sequence Recall</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">Double the capacity for visual layout memorization compared to control levels.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer banner */}
        <div className="text-center bg-blue-50 border border-blue-100 rounded-3xl p-8 max-w-3xl mx-auto shadow-sm">
          <h3 className="text-xl font-bold font-display mb-2 text-[#0F172A]">Empowering Student Success</h3>
          <p className="text-xs text-[#64748B] max-w-lg mx-auto leading-relaxed mb-4">
            We believe that mental training should be accessible and directly aligned with classroom learning. Join our community of active students accelerating their potential.
          </p>
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest">- Team Learning Acceleration -</span>
        </div>
      </div>
    </div>
  );
};

export default About;
