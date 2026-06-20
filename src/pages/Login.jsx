import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ initialIsSignUp = false }) => {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsSignUp(initialIsSignUp);
  }, [initialIsSignUp]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (isSignUp && !formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Add authentication logic here
      console.log('Form submitted', formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#61b2e4] rounded-br-[200px] rounded-tl-none rounded-tr-none rounded-bl-none z-0 transform -translate-x-20 -translate-y-20 opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2a68ad] rounded-tl-[300px] rounded-tr-none rounded-br-none rounded-bl-none z-0 transform translate-x-20 translate-y-20 opacity-90"></div>

      {/* Main Card */}
      <div className="bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] rounded-3xl w-full max-w-5xl flex z-10 overflow-hidden relative">
        
        {/* Left Panel - Illustration */}
        <div className="hidden lg:flex w-[55%] bg-blue-50/50 p-12 items-center justify-center relative">
          {/* Using a high-quality relevant placeholder illustration */}
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png" 
            alt="Login Concept" 
            className="w-full max-w-md object-contain z-10"
          />
          {/* Decorative clouds/shapes behind the image if needed */}
          <div className="absolute top-1/4 right-1/4 w-32 h-10 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[45%] p-10 md:p-14 flex flex-col justify-center bg-white z-10">
          <div className="max-w-md w-full mx-auto">
            
            {/* Headers */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-semibold text-[#254f85] tracking-tight mb-1">
                {isSignUp ? 'Create Account' : 'Welcome!'}
              </h1>
              <p className="text-[#6495c6] text-sm">
                {isSignUp ? 'Sign up to get started' : 'Sign in to your Account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isSignUp && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-[#a8c6e2]" />
                  </div>
                  <input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Full Name"
                    className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.fullName ? 'border-red-400' : 'border-[#d8e6f3]'} rounded-full text-sm text-[#334155] placeholder-[#a8c6e2] focus:outline-none focus:border-[#4281c7] focus:ring-1 focus:ring-[#4281c7] transition-all`}
                  />
                  {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-4 absolute -bottom-4">{errors.fullName}</p>}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-[#a8c6e2]" />
                </div>
                <input 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  type="email" 
                  placeholder="Email Address"
                  className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.email ? 'border-red-400' : 'border-[#d8e6f3]'} rounded-full text-sm text-[#334155] placeholder-[#a8c6e2] focus:outline-none focus:border-[#4281c7] focus:ring-1 focus:ring-[#4281c7] transition-all`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-4 absolute -bottom-4">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-[#a8c6e2]" />
                </div>
                <input 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full pl-11 pr-12 py-3 bg-white border ${errors.password ? 'border-red-400' : 'border-[#d8e6f3]'} rounded-full text-sm text-[#334155] placeholder-[#a8c6e2] focus:outline-none focus:border-[#4281c7] focus:ring-1 focus:ring-[#4281c7] transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#a8c6e2] hover:text-[#4281c7] cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-4 absolute -bottom-4">{errors.password}</p>}
              </div>

              {isSignUp && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-[#a8c6e2]" />
                  </div>
                  <input 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat Password"
                    className={`w-full pl-11 pr-12 py-3 bg-white border ${errors.confirmPassword ? 'border-red-400' : 'border-[#d8e6f3]'} rounded-full text-sm text-[#334155] placeholder-[#a8c6e2] focus:outline-none focus:border-[#4281c7] focus:ring-1 focus:ring-[#4281c7] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#a8c6e2] hover:text-[#4281c7] cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 ml-4 absolute -bottom-4">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Forgot Password */}
              {!isSignUp && (
                <div className="text-center pt-2">
                  <a href="#" className="text-xs font-semibold text-[#5c8ab8] hover:text-[#254f85] transition-colors">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Action Buttons (Sign In / Sign Up toggle and submit) */}
              <div className="flex gap-4 pt-6">
                <button 
                  type={!isSignUp ? "submit" : "button"}
                  onClick={isSignUp ? () => { setIsSignUp(false); setErrors({}); } : undefined}
                  className={`cursor-pointer flex-1 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                    !isSignUp 
                      ? 'bg-[#18609e] text-white shadow-[0_4px_14px_rgba(24,96,158,0.39)] hover:shadow-[0_6px_20px_rgba(24,96,158,0.23)] hover:bg-[#145084]' 
                      : 'bg-white border border-[#a8c6e2] text-[#18609e] hover:border-[#18609e] hover:bg-blue-50'
                  }`}
                >
                  SIGN IN
                </button>
                <button 
                  type={isSignUp ? "submit" : "button"}
                  onClick={!isSignUp ? () => { setIsSignUp(true); setErrors({}); } : undefined}
                  className={`cursor-pointer flex-1 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                    isSignUp 
                      ? 'bg-[#18609e] text-white shadow-[0_4px_14px_rgba(24,96,158,0.39)] hover:shadow-[0_6px_20px_rgba(24,96,158,0.23)] hover:bg-[#145084]' 
                      : 'bg-white border border-[#a8c6e2] text-[#18609e] hover:border-[#18609e] hover:bg-blue-50'
                  }`}
                >
                  SIGN UP
                </button>
              </div>

            </form>

            {/* Social Login */}
            <div className="mt-10">
              <div className="flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  OR LOGIN WITH
                </span>
              </div>
              
              <div className="flex justify-center gap-5 mt-5">
                <button type="button" className="cursor-pointer w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
                  <FaFacebookF className="text-[#1877F2]" size={16} />
                </button>
                <button type="button" className="cursor-pointer w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
                  <FcGoogle size={20} />
                </button>
                <button type="button" className="cursor-pointer w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
                  <FaLinkedinIn className="text-[#0A66C2]" size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
