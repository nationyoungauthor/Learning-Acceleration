import React, { useState, useRef } from 'react';
import { LuShieldCheck as ShieldCheck, LuSearch as Search, LuLock as Lock } from 'react-icons/lu';

const PrivacyPolicy = () => {
  const [showPolicy, setShowPolicy] = useState(false);
  const policyRef = useRef(null);

  const handleViewPolicy = () => {
    setShowPolicy(true);
    setTimeout(() => {
      policyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden text-[#334155] font-sans pb-16 pt-8">

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-10 lg:pt-16">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[70vh]">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-serif text-[#1e3a8a] mb-6 font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We are committed to protecting your personal information.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleViewPolicy}
                className="px-8 py-3 bg-[#5c6df5] text-white rounded-full font-medium shadow-lg shadow-indigo-200 hover:bg-[#4a58c7] hover:shadow-xl transition-all transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
              >
                More details
              </button>
              <button
                onClick={handleViewPolicy}
                className="px-8 py-3 bg-transparent text-[#5c6df5] border-2 border-[#5c6df5] rounded-full font-medium hover:bg-indigo-50 transition-all w-full sm:w-auto cursor-pointer"
              >
                View policy
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
                src="/gameImage/policy.jpg"
                alt="Privacy Policy Illustration"
                className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out border-[6px] border-white"
              />

              {/* Floating Element 1 */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-[30deg] group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-500 ease-out border border-slate-50 z-20">
                <span className="text-2xl">🔒</span>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center transform -rotate-12 group-hover:-rotate-[30deg] group-hover:translate-y-4 group-hover:scale-110 transition-all duration-500 ease-out border border-slate-50 z-20">
                <span className="text-xl">🛡️</span>
              </div>
            </div>
          </div>

        </div>

        {/* Expandable Policy Section */}
        {showPolicy && (
          <div ref={policyRef} className="mt-20 max-w-4xl mx-auto pb-12 transition-all duration-700 ease-in-out opacity-100 translate-y-0">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#254f85] mb-8 text-center">
                Full Privacy <span className="text-[#18609e]">Policy</span>
              </h2>

              <div className="space-y-6 text-[#6495c6] leading-relaxed">
                <p><strong>Effective Date:</strong> January 1, 2026</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">2. Use of Information</h3>
                <p>We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, and send related information.</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">3. Sharing of Information</h3>
                <p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including with third party service providers who need access to such information to carry out work on our behalf.</p>

                <h3 className="text-xl font-bold text-[#254f85] mt-8">4. Security</h3>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
