import React, { useState, useRef } from 'react';

const Terms = () => {
  const [showTerms, setShowTerms] = useState(false);
  const termsRef = useRef(null);

  const handleViewTerms = () => {
    setShowTerms(true);
    setTimeout(() => {
      termsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

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
              Terms & Conditions
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              By accessing and using our brain training services, you accept and agree to be bound by the terms and provision of this agreement. Please read carefully.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleViewTerms}
                className="px-8 py-3 bg-[#5c6df5] text-white rounded-full font-medium shadow-lg shadow-indigo-200 hover:bg-[#4a58c7] hover:shadow-xl transition-all transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
              >
                More details
              </button>
              <button
                onClick={handleViewTerms}
                className="px-8 py-3 bg-transparent text-[#5c6df5] border-2 border-[#5c6df5] rounded-full font-medium hover:bg-indigo-50 transition-all w-full sm:w-auto cursor-pointer"
              >
                View terms
              </button>
            </div>

            <p className="mt-16 text-xs text-slate-400 font-medium uppercase tracking-widest">
              All rights reserved
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
                src="/gameImage/terms&condition.jpg"
                alt="Terms Illustration"
                className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out border-[6px] border-white"
              />

              {/* Floating Element 1 */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-[30deg] group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-500 ease-out border border-slate-50 z-20">
                <span className="text-2xl">📝</span>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:-rotate-[30deg] group-hover:translate-y-4 group-hover:scale-110 transition-all duration-500 ease-out border border-slate-50 z-20">
                <span className="text-xl">⚖️</span>
              </div>
            </div>
          </div>

        </div>

        {/* Expandable Policy Section */}
        {showTerms && (
          <div ref={termsRef} className="mt-20 max-w-4xl mx-auto pb-12 transition-all duration-700 ease-in-out opacity-100 translate-y-0">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#254f85] mb-8 text-center">
                Terms & <span className="text-[#18609e]">Conditions</span>
              </h2>

              <div className="space-y-6 text-[#6495c6] leading-relaxed">
                <p><strong>Last Updated:</strong> January 1, 2026</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">1. Acceptance of Terms</h3>
                <p>By accessing and using our brain training services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">2. Description of Service</h3>
                <p>We provide users with access to a rich collection of resources, including various games, metrics, educational content, and personalized training plans intended to enhance cognitive functions.</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">3. User Conduct</h3>
                <p>You agree to use our services only for lawful purposes. You are prohibited from violating or attempting to violate the security of the services, including accessing data not intended for such user or logging onto a server or an account which the user is not authorized to access.</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">4. Modifications to Service</h3>
                <p>We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terms;
