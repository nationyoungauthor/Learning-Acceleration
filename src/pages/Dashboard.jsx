import React, { useState, useEffect } from 'react';
import {
  FaBrain, FaTrophy, FaFire, FaGamepad, FaChartLine,
  FaGraduationCap, FaRobot, FaMagic, FaSlidersH, FaMedal,
  FaPaperPlane, FaSpinner, FaLock, FaUserGraduate
} from 'react-icons/fa';

const Dashboard = () => {
  const [activeAiTab, setActiveAiTab] = useState('tutor');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: "Hello! I am your AI Cognitive Companion. Ask me how to accelerate your memory or understand pattern reasoning!" }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Custom generator states
  const [genSubject, setGenSubject] = useState('Maths');
  const [genDifficulty, setGenDifficulty] = useState('Medium');
  const [generatedQuest, setGeneratedQuest] = useState(null);

  // Load localStorage variables
  const [userXp, setUserXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setUserXp(parseInt(localStorage.getItem('user_xp') || '240'));
    setStreak(parseInt(localStorage.getItem('user_streak') || '5'));
  }, []);

  // Compute values
  const userLevel = Math.floor(userXp / 100) + 1;
  const nextLevelXp = (userLevel) * 100;
  const currentLevelXp = (userLevel - 1) * 100;
  const levelProgress = ((userXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  // AI chat handler
  const sendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setAiLoading(true);

    setTimeout(() => {
      let aiResponse = "Interesting! To build stronger memory associations, try connecting new words with colorful visual images in your mind. This is called the 'Loci Method'.";
      if (chatInput.toLowerCase().includes('focus') || chatInput.toLowerCase().includes('attention')) {
        aiResponse = "To boost focus during long studies, use the Pomodoro technique: 25 minutes of high-intensity concentration followed by a 5-minute cognitive break.";
      } else if (chatInput.toLowerCase().includes('iq') || chatInput.toLowerCase().includes('logic')) {
        aiResponse = "IQ represents adaptive logic. Doing pattern matrices and number sequences pushes your spatial logic circuits to re-wire for faster problem solving.";
      } else if (chatInput.toLowerCase().includes('math') || chatInput.toLowerCase().includes('maths')) {
        aiResponse = "Mental calculations improve numerical focus. Regular speed drills establish faster pathways between auditory and visual recall nodes.";
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setAiLoading(false);
    }, 1000);
  };

  // AI Generator Handler
  const generateQuestion = () => {
    setAiLoading(true);
    setTimeout(() => {
      const questions = {
        Maths: "If two train lines intersect at a 45-degree angle, what is the supplementary angle of their path?",
        Science: "Why is water expanding when freezing unlike other liquids, and what bond structure dictates this?",
        English: "Identify the coordinate conjunction in this compound sentence: 'She wanted to play brain games, yet she had to finish biology homework.'"
      };
      setGeneratedQuest(questions[genSubject] || "Calculate the spatial matrix ratio: 4, 9, 25, 49, X. What is X?");
      setAiLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-12 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#18609e] to-[#4281c7] rounded-2xl flex items-center justify-center text-white text-2xl shadow-md">
              <FaUserGraduate />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-[#254f85] tracking-tight">Student Workspace</h1>
              <p className="text-[#6495c6] text-xs font-semibold mt-1">Accelerating cognitive learning pathways daily.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-[#d8e6f3] shadow-sm">
            <div className="flex items-center space-x-1 px-3 py-1.5 bg-amber-50 text-[#F59E0B] rounded-xl text-xs font-bold border border-amber-100">
              <FaFire />
              <span>{streak} Day Streak</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-[#18609e] rounded-xl text-xs font-bold border border-[#d8e6f3]">
              <FaTrophy />
              <span>Rank #124</span>
            </div>
          </div>
        </div>

        {/* Top Analytics Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-10">
          {[
            { label: 'IQ Index', value: '118', change: 'Genius Level', color: 'text-[#18609e]', bg: 'bg-blue-50 border-[#d8e6f3]' },
            { label: 'Memory Score', value: '82%', change: '+4% this week', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
            { label: 'Accuracy Rate', value: '94%', change: 'Near Perfect', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
            { label: 'Focus Score', value: '78', change: 'High Concentration', color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
            { label: 'Level', value: `Lv. ${userLevel}`, change: `${userXp} XP Points`, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
            { label: 'Daily Rank', value: 'Top 5%', change: 'Top Tier Student', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' }
          ].map((widget, idx) => (
            <div key={idx} className={`bg-white border border-[#d8e6f3] p-5 rounded-3xl shadow-[0_4px_20px_rgba(8,_112,_184,_0.05)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 flex flex-col justify-between`}>
              <span className="text-[10px] font-bold text-[#6495c6] uppercase tracking-wider">{widget.label}</span>
              <div className="my-3">
                <span className={`text-2xl font-black ${widget.color}`}>{widget.value}</span>
              </div>
              <span className="text-[10px] font-bold text-[#4281c7]">{widget.change}</span>
            </div>
          ))}
        </div>

        {/* Middle Section: Gamification & Stats details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* XP Progress & Level Details */}
          <div className="bg-white border border-[#d8e6f3] p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#254f85] mb-2">XP Progression</h3>
              <p className="text-xs text-[#6495c6] leading-relaxed mb-6">Complete quizzes and play memory games to gain XP and rise in rankings.</p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#6495c6] mb-2">
                <span>Level {userLevel}</span>
                <span>{userXp} / {nextLevelXp} XP</span>
              </div>
              <div className="w-full bg-[#d8e6f3] h-3 rounded-full overflow-hidden p-[2px] shadow-inner">
                <div
                  className="bg-gradient-to-r from-[#61b2e4] to-[#18609e] h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="border-t border-[#d8e6f3] pt-6 mt-6">
              <span className="text-xs font-bold text-[#254f85] uppercase tracking-wider block mb-3">Earned Badges</span>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#18609e] flex items-center justify-center text-sm shadow-sm border border-[#d8e6f3]" title="Memory Master">
                  <FaMedal />
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm shadow-sm border border-purple-200" title="Math Wizard">
                  <FaMagic />
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-[#F59E0B] flex items-center justify-center text-sm shadow-sm border border-amber-200" title="Active Streak">
                  <FaFire />
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shadow-sm border border-emerald-200" title="IQ Qualified">
                  <FaBrain />
                </div>
              </div>
            </div>
          </div>

          {/* AI Features Preview Module */}
          <div className="lg:col-span-2 bg-white border border-[#d8e6f3] p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#d8e6f3] mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#254f85] flex items-center gap-2">
                  <FaRobot className="text-[#18609e]" />
                  <span>AI Learning Core</span>
                </h3>
                <p className="text-xs text-[#6495c6] mt-0.5">Custom tutoring, question builders, and metrics.</p>
              </div>

              <div className="flex bg-slate-50 p-1 rounded-xl border border-[#d8e6f3]">
                {[
                  { id: 'tutor', name: 'AI Tutor', icon: <FaRobot /> },
                  { id: 'generator', name: 'Generator', icon: <FaMagic /> },
                  { id: 'analysis', name: 'Analysis', icon: <FaChartLine /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAiTab(tab.id)}
                    className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all capitalize ${activeAiTab === tab.id
                        ? 'bg-[#18609e] text-white shadow'
                        : 'text-[#6495c6] hover:text-[#254f85]'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Tutor Chat Tab */}
            {activeAiTab === 'tutor' && (
              <div className="flex flex-col h-64 justify-between bg-slate-50 rounded-2xl p-4 border border-[#d8e6f3]">
                <div className="overflow-y-auto space-y-3.5 pr-2 max-h-[190px] flex-grow text-xs">
                  {chatHistory.map((chat, idx) => (
                    <div key={idx} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-medium leading-relaxed ${chat.sender === 'user'
                          ? 'bg-[#18609e] text-white rounded-tr-none'
                          : 'bg-white text-[#334155] border border-[#d8e6f3] rounded-tl-none shadow-sm'
                        }`}>
                        {chat.text}
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#d8e6f3] text-[#6495c6] rounded-2xl px-4 py-2.5 rounded-tl-none shadow-sm flex items-center gap-2">
                        <FaSpinner className="animate-spin text-[#61b2e4]" />
                        <span>AI Tutor is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={sendChat} className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about spatial logic or study curves..."
                    className="flex-grow bg-white border border-[#d8e6f3] px-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#61b2e4] text-[#334155]"
                  />
                  <button type="submit" className="cursor-pointer p-2.5 bg-[#18609e] hover:bg-[#145084] text-white rounded-xl shadow transition-colors">
                    <FaPaperPlane className="text-xs" />
                  </button>
                </form>
              </div>
            )}

            {/* AI Question Generator Tab */}
            {activeAiTab === 'generator' && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-[#d8e6f3] h-64 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#6495c6] uppercase tracking-widest mb-1.5">Subject</label>
                    <select
                      value={genSubject}
                      onChange={(e) => setGenSubject(e.target.value)}
                      className="cursor-pointer w-full px-3 py-2 text-xs text-[#334155] bg-white border border-[#d8e6f3] rounded-xl outline-none"
                    >
                      <option>Maths</option>
                      <option>Science</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#6495c6] uppercase tracking-widest mb-1.5">Age Focus</label>
                    <select
                      value={genDifficulty}
                      onChange={(e) => setGenDifficulty(e.target.value)}
                      className="cursor-pointer w-full px-3 py-2 text-xs text-[#334155] bg-white border border-[#d8e6f3] rounded-xl outline-none"
                    >
                      <option>Easy (Age 5-7)</option>
                      <option>Medium (Age 8-13)</option>
                      <option>Hard (Age 14-18)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white border border-[#d8e6f3] rounded-xl p-3.5 my-3 flex-grow overflow-y-auto max-h-[85px] flex items-center justify-center">
                  {aiLoading ? (
                    <div className="flex items-center gap-2 text-xs text-[#6495c6]">
                      <FaSpinner className="animate-spin text-[#61b2e4]" />
                      <span>Synthesizing custom questions...</span>
                    </div>
                  ) : (
                    <p className="text-xs font-semibold text-[#254f85] text-center italic">
                      {generatedQuest || "Select details and press synthesize below to generate your custom weakness quiz."}
                    </p>
                  )}
                </div>

                <button
                  onClick={generateQuestion}
                  className="cursor-pointer w-full py-3 bg-[#18609e] hover:bg-[#145084] text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FaMagic />
                  <span>Synthesize AI Question</span>
                </button>
              </div>
            )}

            {/* AI Performance Analysis Tab */}
            {activeAiTab === 'analysis' && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-[#d8e6f3] h-64 flex flex-col justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#254f85] mb-3">Cognitive Node Analytics</h4>
                  <p className="text-[#6495c6] text-[11px] leading-relaxed mb-4">AI analysis predicts your working memory retains verbal cues better than visual arrays. Speed math processing has improved by 14% over the last 5 days.</p>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-[#6495c6] mb-1">
                      <span>Visual Retentiveness</span>
                      <span>Strong (78%)</span>
                    </div>
                    <div className="w-full bg-[#d8e6f3] h-1.5 rounded-full shadow-inner">
                      <div className="bg-[#18609e] h-1.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-[#6495c6] mb-1">
                      <span>Auditory Buffer</span>
                      <span>Optimal (85%)</span>
                    </div>
                    <div className="w-full bg-[#d8e6f3] h-1.5 rounded-full shadow-inner">
                      <div className="bg-[#61b2e4] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
