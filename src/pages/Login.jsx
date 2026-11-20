import React, { useState, useEffect } from 'react';
import {
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaCalendarAlt, FaGraduationCap, FaCheckCircle,
  FaArrowRight, FaBrain, FaBolt, FaStar, FaShieldAlt,
  FaChild, FaExclamationTriangle, FaTimes
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { LuSparkles, LuBrain, LuZap, LuTrophy, LuGraduationCap } from 'react-icons/lu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ initialIsSignUp = false }) => {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);

  // Exact fields requested by user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, register, login } = useAuth();

  const redirectTarget = location.state?.from?.pathname || '/';

  useEffect(() => {
    // If student is already logged in, redirect them to Home
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsSignUp(initialIsSignUp);
    setErrors({});
    setSubmitSuccess(false);
    setShowAgePopup(false);
  }, [initialIsSignUp]);

  const validate = () => {
    const newErrors = {};

    // Common: Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Common: Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // SignUp specific validations: name, age, class, confirmPassword
    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }

      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else {
        const ageNum = parseInt(formData.age, 10);
        if (isNaN(ageNum)) {
          newErrors.age = 'Enter a valid age';
        } else if (ageNum < 5) {
          newErrors.age = 'Minimum age requirement is 5 years';
          setShowAgePopup(true);
        } else if (ageNum > 25) {
          newErrors.age = 'Enter an age between 5 and 25';
        }
      }

      if (!formData.class.trim()) {
        newErrors.class = 'Class/Grade is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAgeBlur = () => {
    if (formData.age !== '') {
      const ageNum = parseInt(formData.age, 10);
      if (!isNaN(ageNum) && ageNum < 5) {
        setShowAgePopup(true);
        setErrors((prev) => ({ ...prev, age: 'Minimum age requirement is 5 years' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      if (isSignUp) {
        const res = await register(formData);
        if (!res.success) {
          setErrors({ general: res.message || 'Registration failed' });
          setIsSubmitting(false);
          return;
        }
      } else {
        const res = await login(formData.email, formData.password);
        if (!res.success) {
          setErrors({ password: res.message || 'Sign in failed' });
          setIsSubmitting(false);
          return;
        }
      }

      setSubmitSuccess(true);

      // Brief delay for feedback then redirect to Home (or target page)
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(redirectTarget, { replace: true });
      }, 900);
    } catch (err) {
      console.error(err);
      setErrors({ general: 'Something went wrong. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const switchMode = (mode) => {
    setIsSignUp(mode);
    setErrors({});
    setSubmitSuccess(false);
    setShowAgePopup(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans text-slate-800">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main 3D Card Container */}
      <div className="bg-white rounded-[32px] border-2 border-blue-100/90 shadow-[0_24px_60px_-12px_rgba(37,99,235,0.14),0_6px_0_#DBEAFE] w-full max-w-5xl flex flex-col lg:flex-row z-10 overflow-hidden relative">

        {/* ========================================================================= */}
        {/* LEFT PANEL: 3D Student Showcase & Value Propositions                      */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-[48%] bg-gradient-to-br from-[#EFF6FF] via-[#F4F8FF] to-[#DBEAFE] p-8 sm:p-12 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-blue-100 overflow-hidden">
          
          {/* Subtle Corner Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 text-blue-700 text-xs font-black uppercase tracking-wider mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <LuSparkles className="text-blue-600" />
              <span>Student Learning Acceleration</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-black font-poppins text-slate-900 tracking-tight leading-tight mb-4">
              Unlock Your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Cognitive Superpower</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
              Join thousands of students building rapid recall, mathematical intuition, and peak exam readiness through scientifically designed challenges.
            </p>

            {/* 3D Value Highlight Cards */}
            <div className="space-y-3.5 mb-8">
              <div className="bg-white/95 rounded-2xl p-4 border border-blue-200/80 shadow-[0_3px_0_#BFDBFE,0_6px_12px_rgba(37,99,235,0.04)] flex items-center gap-3.5 transform hover:-translate-y-0.5 transition-transform">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white shadow-[0_3px_0_#1E40AF] flex items-center justify-center text-xl shrink-0">
                  <LuBrain />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Adaptive Brain Games</h4>
                  <p className="text-xs text-slate-500 mt-0.5">50+ interactive challenges tailored to your age milestone</p>
                </div>
              </div>

              <div className="bg-white/95 rounded-2xl p-4 border border-indigo-200/80 shadow-[0_3px_0_#C7D2FE,0_6px_12px_rgba(79,70,229,0.04)] flex items-center gap-3.5 transform hover:-translate-y-0.5 transition-transform">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white shadow-[0_3px_0_#3730A3] flex items-center justify-center text-xl shrink-0">
                  <LuZap />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Smart Quiz Zone</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Curriculum-aligned speed drills with instant educational hints</p>
                </div>
              </div>

              <div className="bg-white/95 rounded-2xl p-4 border border-emerald-200/80 shadow-[0_3px_0_#A7F3D0,0_6px_12px_rgba(16,185,129,0.04)] flex items-center gap-3.5 transform hover:-translate-y-0.5 transition-transform">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white shadow-[0_3px_0_#065F46] flex items-center justify-center text-xl shrink-0">
                  <LuTrophy />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">XP &amp; Daily Streaks</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Climb leaderboards, earn scholar ranks, and win achievements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Metric Footer */}
          <div className="relative z-10 pt-4 border-t border-blue-200/80 flex items-center justify-between text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="flex text-amber-500 text-sm">
                {'★'.repeat(5)}
              </span>
              <span className="text-slate-800 font-extrabold">4.9 / 5</span>
            </div>
            <span className="text-blue-700 bg-white/90 px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
              10,000+ Young Learners
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANEL: 3D Form (Sign In & Sign Up with Exact Requested Fields)     */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-[52%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white z-10">
          <div className="max-w-md w-full mx-auto">

            {/* 3D Mode Toggle Tabs (Sign In vs Create Account) */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner mb-8">
              <button
                type="button"
                onClick={() => switchMode(false)}
                className={`cursor-pointer flex-1 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                  !isSignUp
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_0_#1E3A8A,0_8px_16px_rgba(37,99,235,0.3)] translate-y-0'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => switchMode(true)}
                className={`cursor-pointer flex-1 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                  isSignUp
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_0_#1E3A8A,0_8px_16px_rgba(37,99,235,0.3)] translate-y-0'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Header Titles */}
            <div className="text-left mb-6">
              <h1 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 tracking-tight">
                {isSignUp ? 'Create Student Account' : 'Welcome Back, Learner!'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {isSignUp
                  ? 'Fill out your school details to get personalized cognitive workouts'
                  : 'Enter your credentials to resume your training streak'}
              </p>
            </div>

            {/* General Error Notification */}
            {errors.general && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-3 animate-fadeIn">
                <FaExclamationTriangle className="text-rose-600 text-lg shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Success Notification */}
            {submitSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-3 animate-fadeIn">
                <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
                <span>
                  {isSignUp
                    ? 'Account created successfully! Welcome to Learning Acceleration! Redirecting to Home...'
                    : 'Sign in successful! Welcome back! Redirecting to Home...'}
                </span>
              </div>
            )}

            {/* The Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ----------------- SIGN UP ONLY: NAME ----------------- */}
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm font-bold bg-slate-50/70 border-2 ${
                        errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200/90'
                      } text-slate-800 placeholder-slate-400 shadow-[0_3px_0_#E2E8F0] focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_0_#93C5FD] transition-all`}
                    />
                  </div>
                  {errors.name && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.name}</p>}
                </div>
              )}

              {/* ----------------- COMMON: EMAIL ----------------- */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm font-bold bg-slate-50/70 border-2 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200/90'
                    } text-slate-800 placeholder-slate-400 shadow-[0_3px_0_#E2E8F0] focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_0_#93C5FD] transition-all`}
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.email}</p>}
              </div>

              {/* ----------------- SIGN UP ONLY: AGE & CLASS (2-Col Grid) ----------------- */}
              {isSignUp && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Age Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <FaCalendarAlt className="text-sm" />
                      </div>
                      <input
                        name="age"
                        type="number"
                        min="1"
                        max="25"
                        value={formData.age}
                        onChange={handleChange}
                        onBlur={handleAgeBlur}
                        placeholder="e.g. 12"
                        className={`w-full pl-11 pr-3 py-3 rounded-xl text-sm font-bold bg-slate-50/70 border-2 ${
                          errors.age ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200/90'
                        } text-slate-800 placeholder-slate-400 shadow-[0_3px_0_#E2E8F0] focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_0_#93C5FD] transition-all`}
                      />
                    </div>
                    {errors.age && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.age}</p>}
                  </div>

                  {/* Class Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Class / Grade <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <FaGraduationCap className="text-sm" />
                      </div>
                      <input
                        name="class"
                        type="text"
                        value={formData.class}
                        onChange={handleChange}
                        placeholder="e.g. Class 7th"
                        className={`w-full pl-11 pr-3 py-3 rounded-xl text-sm font-bold bg-slate-50/70 border-2 ${
                          errors.class ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200/90'
                        } text-slate-800 placeholder-slate-400 shadow-[0_3px_0_#E2E8F0] focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_0_#93C5FD] transition-all`}
                      />
                    </div>
                    {errors.class && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.class}</p>}
                  </div>
                </div>
              )}

              {/* ----------------- COMMON: PASSWORD ----------------- */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <FaLock className="text-sm" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 rounded-xl text-sm font-bold bg-slate-50/70 border-2 ${
                      errors.password ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200/90'
                    } text-slate-800 placeholder-slate-400 shadow-[0_3px_0_#E2E8F0] focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_0_#93C5FD] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.password}</p>}
              </div>

              {/* ----------------- SIGN UP ONLY: CONFIRM PASSWORD ----------------- */}
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <FaLock className="text-sm" />
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 py-3 rounded-xl text-sm font-bold bg-slate-50/70 border-2 ${
                        errors.confirmPassword ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200/90'
                      } text-slate-800 placeholder-slate-400 shadow-[0_3px_0_#E2E8F0] focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_0_#93C5FD] transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* 3D Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-4 px-6 rounded-2xl bg-gradient-to-b from-[#2F73F5] to-[#1E5AD6] hover:from-[#3D7DF7] hover:to-[#2563EB] text-white font-black text-sm tracking-wide shadow-[0_5px_0_#1243A8,0_12px_24px_rgba(30,90,214,0.35)] active:translate-y-1 active:shadow-[0_2px_0_#1243A8] transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-wait"
                >
                  <span>{isSubmitting ? 'Processing...' : isSignUp ? 'Create Student Account' : 'Sign In to Dashboard'}</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>

            </form>

            {/* Social Authentication */}
            <div className="mt-8">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest absolute">
                  Or Continue With
                </span>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="button"
                  title="Sign in with Google"
                  className="cursor-pointer w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-[0_3px_0_#E2E8F0,0_6px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_0_#CBD5E1] active:translate-y-0.5 transition-all flex items-center justify-center"
                >
                  <FcGoogle className="text-2xl" />
                </button>
                <button
                  type="button"
                  title="Sign in with Facebook"
                  className="cursor-pointer w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-[0_3px_0_#E2E8F0,0_6px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_0_#CBD5E1] active:translate-y-0.5 transition-all flex items-center justify-center text-[#1877F2]"
                >
                  <FaFacebookF className="text-lg" />
                </button>
                <button
                  type="button"
                  title="Sign in with Apple"
                  className="cursor-pointer w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-[0_3px_0_#E2E8F0,0_6px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_0_#CBD5E1] active:translate-y-0.5 transition-all flex items-center justify-center text-slate-900"
                >
                  <FaApple className="text-xl" />
                </button>
              </div>
            </div>

            {/* Bottom Switch Note */}
            <div className="text-center mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500">
                {isSignUp ? 'Already registered on the platform?' : "Don't have an account yet?"}{' '}
                <button
                  type="button"
                  onClick={() => switchMode(!isSignUp)}
                  className="cursor-pointer font-black text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors ml-1"
                >
                  {isSignUp ? 'Sign In' : 'Create Free Account'}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* 3D Underage Alert Modal Popup */}
      {showAgePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-amber-300 shadow-[0_24px_50px_rgba(245,158,11,0.25),0_8px_0_#F59E0B] p-6 sm:p-8 text-center overflow-hidden">
            
            {/* Top Ambient Glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowAgePopup(false)}
              className="cursor-pointer absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
              title="Close notification"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* 3D Floating Icon Tile */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 text-white flex items-center justify-center text-3xl shadow-[0_5px_0_#B45309] transform hover:scale-105 transition-transform">
              <FaChild />
            </div>

            {/* Notice Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-black uppercase tracking-wider mb-3">
              <FaExclamationTriangle className="text-amber-600 text-xs" />
              <span>Age Requirement Notice</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black font-poppins text-slate-900 tracking-tight mb-2">
              Age 5+ Required
            </h3>

            {/* Educational Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Students must be at least <strong className="text-slate-900 font-bold">5 years old</strong> to create an account. Our cognitive workouts, memory challenges, and adaptive quizzes are calibrated specifically for learners aged 5 and above.
            </p>

            {/* 3D Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAgePopup(false);
                  setFormData((prev) => ({ ...prev, age: '' }));
                }}
                className="cursor-pointer flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider shadow-[0_3px_0_#CBD5E1] active:translate-y-0.5 transition-all"
              >
                Change Age
              </button>

              <button
                type="button"
                onClick={() => setShowAgePopup(false)}
                className="cursor-pointer flex-1 py-3 px-5 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_4px_0_#B45309] active:translate-y-1 active:shadow-[0_1px_0_#B45309] transition-all"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
