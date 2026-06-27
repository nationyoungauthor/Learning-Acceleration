import React, { useState } from 'react';

const CSSPlant = () => (
  <div className="relative flex flex-col items-center ml-10 lg:ml-20">
    <div className="relative w-2 h-48 lg:h-56 bg-[#00b372] z-10 flex flex-col items-center justify-between py-6">
      <div className="absolute -top-8 w-12 h-12 lg:w-14 lg:h-14 bg-[#00b372] rounded-tl-[40px] rounded-br-[40px] transform rotate-45"></div>

      <div className="absolute top-4 -left-12 lg:-left-16 w-14 h-14 lg:w-16 lg:h-16 bg-[#1ce396] rounded-tl-[40px] rounded-br-[40px] transform -rotate-[20deg]"></div>
      <div className="absolute top-8 -right-12 lg:-right-16 w-14 h-14 lg:w-16 lg:h-16 bg-[#00b372] rounded-tr-[40px] rounded-bl-[40px] transform rotate-[20deg]"></div>

      <div className="absolute top-20 -left-12 lg:-left-16 w-16 h-16 lg:w-[72px] lg:h-[72px] bg-[#00b372] rounded-tl-[40px] rounded-br-[40px] transform -rotate-[20deg]"></div>
      <div className="absolute top-24 -right-12 lg:-right-16 w-16 h-16 lg:w-[72px] lg:h-[72px] bg-[#1ce396] rounded-tr-[40px] rounded-bl-[40px] transform rotate-[20deg]"></div>

      <div className="absolute top-36 -left-12 lg:-left-16 w-16 h-16 lg:w-[72px] lg:h-[72px] bg-[#1ce396] rounded-tl-[40px] rounded-br-[40px] transform -rotate-[20deg]"></div>
      <div className="absolute top-40 -right-12 lg:-right-16 w-16 h-16 lg:w-[72px] lg:h-[72px] bg-[#00b372] rounded-tr-[40px] rounded-bl-[40px] transform rotate-[20deg]"></div>
    </div>

    <div className="w-[100px] h-[60px] lg:w-[120px] lg:h-[70px] bg-[#363568] relative z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}></div>
    <div className="absolute bottom-[60px] lg:bottom-[70px] w-[110px] h-[12px] lg:w-[130px] lg:h-[14px] bg-[#363568] rounded-sm z-20"></div>
  </div>
);

const SmallPlant = () => (
  <div className="relative flex flex-col items-center transform scale-[0.4] lg:scale-50 -ml-10 lg:-ml-16 mb-2 lg:mb-4">
    <div className="relative w-1.5 h-32 bg-[#00b372] z-10 flex flex-col items-center justify-between py-2">
      <div className="absolute -top-6 w-8 h-8 bg-[#00b372] rounded-tl-full rounded-br-full transform rotate-45"></div>

      <div className="absolute top-2 -left-10 w-10 h-10 bg-[#1ce396] rounded-tl-full rounded-br-full transform -rotate-[20deg]"></div>
      <div className="absolute top-6 -right-10 w-10 h-10 bg-[#00b372] rounded-tr-full rounded-bl-full transform rotate-[20deg]"></div>

      <div className="absolute top-16 -left-10 w-12 h-12 bg-[#00b372] rounded-tl-full rounded-br-full transform -rotate-[20deg]"></div>
      <div className="absolute top-18 -right-10 w-12 h-12 bg-[#1ce396] rounded-tr-full rounded-bl-full transform rotate-[20deg]"></div>
    </div>

    <div className="w-[80px] h-[50px] bg-[#363568] relative z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}></div>
    <div className="absolute bottom-[50px] w-[90px] h-[10px] bg-[#363568] rounded-sm z-20"></div>
  </div>
);

const CSSClock = () => (
  <div className="absolute top-10 right-[10%] lg:right-[15%] w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 border-4 border-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(239,68,68,0.5)] opacity-100 z-10 hover:scale-110 transition-transform">
    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full absolute z-10 shadow-sm"></div>
    <div className="absolute w-[2px] lg:w-[3px] h-7 lg:h-9 bg-white bottom-1/2 left-1/2 transform -translate-x-1/2 origin-bottom rotate-[60deg] shadow-sm rounded-t-full"></div>
    <div className="absolute w-[2px] lg:w-[3px] h-5 lg:h-7 bg-white bottom-1/2 left-1/2 transform -translate-x-1/2 origin-bottom -rotate-[30deg] shadow-sm rounded-t-full"></div>

    <div className="absolute w-[2px] lg:w-[3px] h-2 lg:h-3 bg-white/90 top-1.5 lg:top-2 left-1/2 transform -translate-x-1/2 rounded-full"></div>
    <div className="absolute w-[2px] lg:w-[3px] h-2 lg:h-3 bg-white/90 bottom-1.5 lg:bottom-2 left-1/2 transform -translate-x-1/2 rounded-full"></div>
    <div className="absolute w-2 lg:w-3 h-[2px] lg:h-[3px] bg-white/90 left-1.5 lg:left-2 top-1/2 transform -translate-y-1/2 rounded-full"></div>
    <div className="absolute w-2 lg:w-3 h-[2px] lg:h-[3px] bg-white/90 right-1.5 lg:right-2 top-1/2 transform -translate-y-1/2 rounded-full"></div>
  </div>
);

const FloatingShapes = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {/* Left shapes */}
    <div className="hidden md:flex absolute top-40 left-[10%] flex-col gap-3 opacity-60">
      <div className="w-20 h-6 lg:w-24 lg:h-8 bg-white/80 rounded-sm"></div>
      <div className="w-28 h-6 lg:w-36 lg:h-8 bg-white/80 rounded-sm ml-12"></div>
    </div>
    {/* Right shapes */}
    <div className="hidden md:flex absolute top-64 right-[8%] flex-col gap-2 opacity-60">
      <div className="w-10 h-12 lg:w-12 lg:h-16 bg-white/80 rounded-sm ml-12 lg:ml-16"></div>
      <div className="w-20 h-5 lg:w-24 lg:h-6 bg-white/80 rounded-sm"></div>
      <div className="w-14 h-6 lg:w-16 lg:h-8 bg-white/80 rounded-sm ml-8"></div>
    </div>
  </div>
);

const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden text-[#334155] font-sans">
      <CSSClock />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20 pt-16 flex flex-col items-center flex-1">

        {/* Header */}
        <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight text-blue-500 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-sm md:text-[15px] text-slate-600 text-center mb-12 leading-relaxed">
          Please feel free to talk to us if you have any questions.<br />
          We endeavour to answer within 24 hours.
        </p>

        {/* Layout Container */}
        <div className="flex w-full justify-center md:justify-between items-end relative flex-1 pb-16 px-0 md:px-4">

          {/* Left Side: Bench & People */}
          <div className="hidden md:flex flex-col justify-end items-center w-[30%] h-full relative z-10 pb-4">
            <div className="relative w-56 lg:w-64 h-40 flex items-end ml-auto mr-4 lg:mr-10">
              {/* Bench */}
              <div className="w-full h-4 lg:h-5 bg-white rounded-md shadow-sm relative z-10"></div>
              <div className="absolute bottom-[-20px] lg:bottom-[-24px] left-8 w-3 lg:w-4 h-5 lg:h-6 bg-white shadow-sm z-0"></div>
              <div className="absolute bottom-[-20px] lg:bottom-[-24px] right-8 w-3 lg:w-4 h-5 lg:h-6 bg-white shadow-sm z-0"></div>

              {/* Briefcase */}
              <div className="absolute bottom-4 lg:bottom-5 left-4 w-10 h-8 lg:w-12 lg:h-10 bg-[#363568] rounded-sm flex flex-col items-center justify-start z-20 border-b-2 border-r-2 border-[#1c1a3b]">
                <div className="w-3 lg:w-4 h-2 border-t-2 border-l-2 border-r-2 border-[#eab308] rounded-t-sm absolute -top-[6px]"></div>
                <div className="w-1.5 lg:w-2 h-1 lg:h-1.5 bg-[#eab308] mt-[4px] lg:mt-[6px] rounded-sm"></div>
              </div>

              {/* People abstract shapes */}
              <div className="absolute bottom-4 lg:bottom-5 left-16 lg:left-20 flex items-end">
                {/* Man */}
                <div className="relative flex flex-col items-center mr-2">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#1e293b] rounded-full mb-1 ml-4"></div>
                  <div className="w-12 h-14 lg:w-14 lg:h-16 bg-[#00df8a] rounded-t-2xl rounded-br-2xl transform -skew-x-6"></div>
                  <div className="flex gap-1 mt-0">
                    <div className="w-4 h-12 lg:w-5 lg:h-14 bg-[#8b5a2b]"></div>
                    <div className="w-4 h-12 lg:w-5 lg:h-14 bg-[#8b5a2b]"></div>
                  </div>
                  {/* White shoes */}
                  <div className="flex gap-1 mt-0">
                    <div className="w-4 h-1.5 lg:w-5 lg:h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-4 h-1.5 lg:w-5 lg:h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                {/* Woman */}
                <div className="relative flex flex-col items-center -ml-4 z-20">
                  <div className="w-5 h-5 lg:w-7 lg:h-7 bg-[#1e293b] rounded-full mb-1"></div>
                  <div className="w-10 h-12 lg:w-12 lg:h-14 bg-[#ff4d6d] rounded-t-2xl transform skew-x-3"></div>
                  <div className="flex gap-0 mt-0 transform -skew-x-6 ml-2">
                    <div className="w-4 h-10 lg:w-5 lg:h-12 bg-[#1e293b]"></div>
                    <div className="w-4 h-10 lg:w-5 lg:h-12 bg-[#1e293b]"></div>
                  </div>
                  <div className="flex gap-0 mt-0 ml-2">
                    <div className="w-5 h-1.5 lg:w-6 lg:h-2 bg-[#333] rounded-full -ml-1"></div>
                    <div className="w-5 h-1.5 lg:w-6 lg:h-2 bg-[#333] rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Form */}
          <form
            className="space-y-5 w-full max-w-[440px] z-20 bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100"
            onSubmit={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Send a Message</h3>
              <p className="text-sm text-slate-500 mt-1">We'd love to hear from you!</p>
            </div>

            <div>
              <input type="text" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:border-[#00df8a] focus:ring-4 focus:ring-[#00df8a]/10 transition-all text-[15px] text-slate-700 placeholder-slate-400" placeholder="Your Name" />
            </div>

            <div>
              <input type="email" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:border-[#00df8a] focus:ring-4 focus:ring-[#00df8a]/10 transition-all text-[15px] text-slate-700 placeholder-slate-400" placeholder="Email Address" />
            </div>

            <div>
              <textarea rows="4" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:border-[#00df8a] focus:ring-4 focus:ring-[#00df8a]/10 transition-all resize-none text-[15px] text-slate-700 placeholder-slate-400" placeholder="How can we help?"></textarea>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">
              <button type="button" className="cursor-pointer w-full py-[14px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold text-[15px] transition-all hover:-translate-y-0.5">
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer w-full py-[14px] bg-[#1ddb91] hover:bg-[#15c581] text-white rounded-xl font-semibold text-[15px] transition-all shadow-[0_8px_20px_-6px_rgba(29,219,145,0.4)] hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Right Side: Plants */}
          <div className="hidden md:flex flex-row items-end justify-start w-[30%] h-full relative z-10 pl-4 lg:pl-10 pb-2">
            <CSSPlant />
            <SmallPlant />
          </div>

        </div>
      </div>

      {/* Celebration Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1e1b4b]/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden text-center transform scale-100">
            {/* Background decorations */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1ddb91]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>

            <div className="w-24 h-24 bg-gradient-to-br from-[#1ddb91] to-[#00b372] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_-10px_rgba(29,219,145,0.8)] relative">
              <span className="text-5xl animate-bounce">🎉</span>
            </div>

            <h3 className="text-3xl font-bold text-slate-800 mb-3">Message Sent!</h3>
            <p className="text-slate-500 mb-8 text-[15px] leading-relaxed relative z-10">
              Yay! Your message has been sent successfully. We will get back to you within 24 hours.
            </p>

            <button
              onClick={() => {
                setShowModal(false);
                window.location.reload();
              }}
              className="w-full py-4 bg-[#1e1b4b] hover:bg-[#2d2966] text-white rounded-xl font-bold text-lg transition-all shadow-lg relative z-10"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Contact;
