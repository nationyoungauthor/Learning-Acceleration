import React, { useState, useEffect } from 'react';

const Login = ({ initialIsSignUp = false }) => {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);

  // Sync state if prop changes
  useEffect(() => {
    setIsSignUp(initialIsSignUp);
  }, [initialIsSignUp]);

  return (
    <div className="flex-grow w-full max-w-lg mx-auto px-6 py-16 md:py-24 flex items-center justify-center min-h-[85vh] relative z-10 bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] rounded-3xl p-8 md:p-12 border border-slate-100 w-full relative overflow-hidden transition-all duration-500">
        
        <div className="relative z-10">
          
          {/* Form Tabs Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 mb-8">
            <button 
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                !isSignUp 
                  ? 'bg-[#2563EB] text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button 
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                isSignUp 
                  ? 'bg-[#2563EB] text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {isSignUp ? 'Join Learning Acceleration' : 'Welcome Back'}
            </h1>
            <p className="text-[#64748B] text-sm mt-2 font-medium">
              {isSignUp 
                ? 'Create a student training account to track progress and stats.' 
                : 'Enter your credentials to resume your brain exercises.'}
            </p>
          </div>
          
          <form className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm shadow-sm" 
                  placeholder="Alex Mercer" 
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm shadow-sm" 
                placeholder="you@school.edu" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm shadow-sm" 
                placeholder="••••••••" 
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm shadow-sm" 
                  placeholder="••••••••" 
                />
              </div>
            )}
            
            {!isSignUp && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer group">
                  <input type="checkbox" className="w-4.5 h-4.5 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors">Forgot password?</a>
              </div>
            )}
            
            <button 
              type="button" 
              className="w-full py-4 mt-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-0.5 focus:outline-none"
            >
              {isSignUp ? 'Create Student Account' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center text-slate-500 text-xs mt-8 font-medium">
            {isSignUp ? (
              <>
                Already have a student account?{' '}
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 font-bold hover:underline bg-transparent border-none outline-none cursor-pointer"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New to Learning Acceleration?{' '}
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 font-bold hover:underline bg-transparent border-none outline-none cursor-pointer"
                >
                  Create account
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
