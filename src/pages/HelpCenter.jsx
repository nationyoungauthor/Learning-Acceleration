import React from 'react';
import { FaSearch, FaBook, FaQuestionCircle, FaHeadset } from 'react-icons/fa';

const HelpCenter = () => {
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

      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full relative z-10 pt-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#254f85] mb-6">
            Help <span className="text-[#18609e]">Center</span>
          </h1>
          <p className="text-lg text-[#6495c6] max-w-2xl mx-auto">
            Find answers to common questions, explore our guides, or reach out to our support team.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-16">
          <input 
            type="text" 
            placeholder="Search for articles, guides, or FAQs..." 
            className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-white bg-white/70 backdrop-blur-md shadow-lg focus:outline-none focus:border-[#18609e] transition-all text-[#254f85] font-medium"
          />
          <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#6495c6] text-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaBook className="text-[#18609e] text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-[#254f85] mb-3">Guides</h3>
            <p className="text-sm text-[#6495c6]">Step-by-step tutorials to get the most out of your training.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaQuestionCircle className="text-[#18609e] text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-[#254f85] mb-3">FAQ</h3>
            <p className="text-sm text-[#6495c6]">Quick answers to the most commonly asked questions.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaHeadset className="text-[#18609e] text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-[#254f85] mb-3">Support</h3>
            <p className="text-sm text-[#6495c6]">Need more help? Our team is available 24/7.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
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
  );
};

export default HelpCenter;
