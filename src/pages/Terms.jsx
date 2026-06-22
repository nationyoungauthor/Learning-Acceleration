import React from 'react';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden text-[#334155] font-sans pb-16 pt-8">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full relative z-10 pt-10">
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 transform transition-all duration-500">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#254f85] mb-8 text-center">
            Terms & <span className="text-[#18609e]">Conditions</span>
          </h1>
          
          <div className="space-y-6 text-[#6495c6] leading-relaxed">
            <p><strong>Last Updated:</strong> January 1, 2026</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">1. Acceptance of Terms</h2>
            <p>By accessing and using our brain training services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">2. Description of Service</h2>
            <p>We provide users with access to a rich collection of resources, including various games, metrics, educational content, and personalized training plans intended to enhance cognitive functions.</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">3. User Conduct</h2>
            <p>You agree to use our services only for lawful purposes. You are prohibited from violating or attempting to violate the security of the services, including accessing data not intended for such user or logging onto a server or an account which the user is not authorized to access.</p>
            
            <h2 className="text-2xl font-bold text-[#254f85] mt-8">4. Modifications to Service</h2>
            <p>We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
