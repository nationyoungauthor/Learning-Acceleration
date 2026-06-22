import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden text-[#334155] font-sans pb-16 pt-8">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full relative z-10 pt-10">
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 transform transition-all duration-500">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#254f85] mb-8 text-center">
            Privacy <span className="text-[#18609e]">Policy</span>
          </h1>
          
          <div className="space-y-6 text-[#6495c6] leading-relaxed">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">2. Use of Information</h2>
            <p>We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, and send related information.</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">3. Sharing of Information</h2>
            <p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including with third party service providers who need access to such information to carry out work on our behalf.</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">4. Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
