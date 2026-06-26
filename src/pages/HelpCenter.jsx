import React, { useRef } from 'react';
import { FaSearch, FaBook, FaQuestionCircle, FaHeadset } from 'react-icons/fa';

const HelpCenter = () => {
  const supportRef = useRef(null);

  const handleViewSupport = () => {
    supportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const faqs = [
    { q: "How do I start training?", a: "Navigate to the Games section and select any game that targets the skill you want to improve." },
    { q: "Are the games scientifically proven?", a: "Our games are based on well-established cognitive tasks used in psychological research to assess and train mental skills." },
    { q: "How is my score calculated?", a: "Scores are calculated based on your accuracy, speed, and the difficulty level you achieve during the game." },
    { q: "Can I reset my progress?", a: "Yes, you can reset your progress by navigating to the Settings page in your Dashboard." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden text-[#334155] font-sans pb-16 pt-8">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-10 lg:pt-16">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[70vh]">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-serif text-[#1e3a8a] mb-6 font-semibold tracking-tight">
              Help Center
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Find answers to common questions, explore our guides, or reach out to our support team. We're here to help you accelerate your learning.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleViewSupport}
                className="px-8 py-3 bg-[#5c6df5] text-white rounded-full font-medium shadow-lg shadow-indigo-200 hover:bg-[#4a58c7] hover:shadow-xl transition-all transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
              >
                Browse topics
              </button>
            </div>

            <p className="mt-16 text-xs text-slate-400 font-medium uppercase tracking-widest">
              Always here to help
            </p>
          </div>

          {/* Right Content - Illustration Image */}
          <div className="flex-1 relative w-full max-w-lg mx-auto mt-12 lg:mt-0 flex items-center justify-center group">
            <div className="relative w-[85%] aspect-square flex items-center justify-center">
              {/* Decorative Background Blobs */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-30 transform group-hover:scale-110 group-hover:opacity-50 transition-all duration-700"></div>

              {/* Glassmorphism Backing Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-white/60 to-white/20 rounded-[3rem] backdrop-blur-md border border-white/60 shadow-2xl transform rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-700"></div>

              {/* The Image */}
              <img
                src="/gameImage/help-center.jpg"
                alt="Help Center Illustration"
                className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out border-[6px] border-white"
              />

              {/* Floating Element 1 */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-[30deg] group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-500 ease-out border border-slate-50 z-20">
                <span className="text-2xl">🎧</span>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:-rotate-[30deg] group-hover:translate-y-4 group-hover:scale-110 transition-all duration-500 ease-out border border-slate-50 z-20">
                <span className="text-xl">💡</span>
              </div>
            </div>
          </div>

        </div>

        {/* Support Section */}
        <div ref={supportRef} className="mt-20 max-w-5xl mx-auto pb-12 transition-all duration-700 ease-in-out">

          <div className="relative max-w-2xl mx-auto mb-16">
            <input
              type="text"
              placeholder="Search for articles, guides, or FAQs..."
              className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-white bg-white/70 backdrop-blur-md shadow-lg focus:outline-none focus:border-[#18609e] transition-all text-[#254f85] font-medium"
            />
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#6495c6] text-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaBook className="text-[#18609e] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#254f85] mb-3">Guides</h3>
              <p className="text-sm text-[#6495c6]">Step-by-step tutorials to get the most out of your training.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaQuestionCircle className="text-[#18609e] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#254f85] mb-3">FAQ</h3>
              <p className="text-sm text-[#6495c6]">Quick answers to the most commonly asked questions.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaHeadset className="text-[#18609e] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#254f85] mb-3">Support</h3>
              <p className="text-sm text-[#6495c6]">Need more help? Our team is available 24/7.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#254f85] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h4 className="text-lg font-bold text-[#18609e] mb-2">{faq.q}</h4>
                  <p className="text-[#6495c6] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
