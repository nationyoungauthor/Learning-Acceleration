import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden text-[#334155] font-sans pb-16 pt-8">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] z-0 transform -translate-x-20 -translate-y-20 opacity-80 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] z-0 transform translate-x-20 translate-y-20 opacity-90 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full relative z-10 pt-10">
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 transform transition-all duration-500 hover:shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#254f85] mb-6 text-center">
            Contact <span className="text-[#18609e]">Us</span>
          </h1>
          <p className="text-lg text-[#6495c6] text-center mb-10">
            We'd love to hear from you. Please reach out with any questions, feedback, or support requests.
          </p>

          <form className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#254f85]">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#18609e] focus:ring-2 focus:ring-[#18609e]/20 transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#254f85]">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#18609e] focus:ring-2 focus:ring-[#18609e]/20 transition-all" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#254f85]">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#18609e] focus:ring-2 focus:ring-[#18609e]/20 transition-all" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#254f85]">Message</label>
              <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#18609e] focus:ring-2 focus:ring-[#18609e]/20 transition-all resize-none" placeholder="How can we help you?"></textarea>
            </div>

            <button type="button" className="w-full py-4 bg-[#18609e] text-white rounded-xl font-bold text-lg hover:bg-[#254f85] transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
