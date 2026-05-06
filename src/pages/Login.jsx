import React from 'react';

const Login = () => {
  return (
    <div className="flex-grow w-full max-w-md mx-auto px-4 py-16 md:py-24 flex items-center justify-center min-h-[80vh]">
      <div className="bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-[2rem] p-8 md:p-10 border border-white w-full relative overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400 to-purple-300 opacity-20 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-gradient-to-tr from-blue-300 to-cyan-200 opacity-20 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-100 mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-zinc-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none shadow-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-zinc-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none shadow-sm" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-100 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
            </div>
            
            <button type="button" className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Sign In
            </button>
          </form>
          
          <p className="text-center text-gray-400 mt-8 font-medium">
            Don't have an account? <a href="#" className="text-indigo-600 font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
