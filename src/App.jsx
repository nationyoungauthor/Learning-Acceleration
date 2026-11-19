import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import ScrollToTop from './components/common/ScrollToTop'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Home from './pages/Home'
import HighScores from './pages/HighScores'
import Games from './pages/Games'

import Login from './pages/Login'
import SequenceMemory from './pages/games/SequenceMemory'
import VisualMemory from './pages/games/VisualMemory'
import WordMemory from './pages/games/WordMemory'
import SeenNumberMemory from './pages/games/SeenNumberMemory'
import NumberMemory from './pages/games/NumberMemory'
import NumberSequence from './pages/games/NumberSequence'
import MemoryMatch from './pages/games/MemoryMatch'
import ColorMemory from './pages/games/ColorMemory'
import ChimpTest from './pages/games/ChimpTest'

import PatternLogic from './pages/games/PatternLogic'
import StroopTest from './pages/games/StroopTest'
import ColorTarget from './pages/games/ColorTarget'
import OneToFifty from './pages/games/OneToFifty'
import WordScramble from './pages/games/WordScramble'
import SpeedMath from './pages/games/SpeedMath'

import FiveSecondTest from './pages/games/FiveSecondTest'
import TimeEstimator from './pages/games/TimeEstimator'
import InvertedMouse from './pages/games/InvertedMouse'
import PerfectCircle from './pages/games/PerfectCircle'

import AssociationLearning from './pages/games/AssociationLearning'
import OddOneOut from './pages/games/OddOneOut'
import SumFinder from './pages/games/SumFinder'
import EmotionReading from './pages/games/EmotionReading'
import ImpromptuPitch from './pages/games/ImpromptuPitch'

import IQTest from './pages/IQTest'
import Progress from './pages/Progress'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import QuizZone from './pages/QuizZone'
import BrainAssessment from './pages/BrainAssessment'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import HelpCenter from './pages/HelpCenter'

import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Authentication Pages */}
              <Route path="/login" element={<Login initialIsSignUp={false} />} />
              <Route path="/signup" element={<Login initialIsSignUp={true} />} />

              {/* Core Landing & Protected Pages: User must register/sign in first */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/highscores"
                element={
                  <ProtectedRoute>
                    <HighScores />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/games"
                element={
                  <ProtectedRoute>
                    <Games />
                  </ProtectedRoute>
                }
              />

              {/* Games Routes */}
              <Route path="/games/sequence-memory" element={<ProtectedRoute><SequenceMemory /></ProtectedRoute>} />
              <Route path="/games/visual-memory" element={<ProtectedRoute><VisualMemory /></ProtectedRoute>} />
              <Route path="/games/word-memory" element={<ProtectedRoute><WordMemory /></ProtectedRoute>} />
              <Route path="/games/seen-number-memory" element={<ProtectedRoute><SeenNumberMemory /></ProtectedRoute>} />
              <Route path="/games/number-memory" element={<ProtectedRoute><NumberMemory /></ProtectedRoute>} />
              <Route path="/games/number-sequence" element={<ProtectedRoute><NumberSequence /></ProtectedRoute>} />
              <Route path="/games/memory-match" element={<ProtectedRoute><MemoryMatch /></ProtectedRoute>} />
              <Route path="/games/color-memory" element={<ProtectedRoute><ColorMemory /></ProtectedRoute>} />
              <Route path="/games/chimp-test" element={<ProtectedRoute><ChimpTest /></ProtectedRoute>} />

              <Route path="/games/pattern-logic" element={<ProtectedRoute><PatternLogic /></ProtectedRoute>} />
              <Route path="/games/stroop-test" element={<ProtectedRoute><StroopTest /></ProtectedRoute>} />
              <Route path="/games/color-target" element={<ProtectedRoute><ColorTarget /></ProtectedRoute>} />
              <Route path="/games/one-to-fifty" element={<ProtectedRoute><OneToFifty /></ProtectedRoute>} />
              <Route path="/games/word-scramble" element={<ProtectedRoute><WordScramble /></ProtectedRoute>} />
              <Route path="/games/speed-math" element={<ProtectedRoute><SpeedMath /></ProtectedRoute>} />

              <Route path="/games/5-second-test" element={<ProtectedRoute><FiveSecondTest /></ProtectedRoute>} />
              <Route path="/games/time-estimator" element={<ProtectedRoute><TimeEstimator /></ProtectedRoute>} />
              <Route path="/games/inverted-mouse" element={<ProtectedRoute><InvertedMouse /></ProtectedRoute>} />
              <Route path="/games/perfect-circle" element={<ProtectedRoute><PerfectCircle /></ProtectedRoute>} />
              <Route path="/games/association-learning" element={<ProtectedRoute><AssociationLearning /></ProtectedRoute>} />
              <Route path="/games/odd-one-out" element={<ProtectedRoute><OddOneOut /></ProtectedRoute>} />
              <Route path="/games/sum-finder" element={<ProtectedRoute><SumFinder /></ProtectedRoute>} />
              <Route path="/games/emotion-reading" element={<ProtectedRoute><EmotionReading /></ProtectedRoute>} />
              <Route path="/games/impromptu-pitch" element={<ProtectedRoute><ImpromptuPitch /></ProtectedRoute>} />

              {/* Learning & Analytics Pages */}
              <Route path="/iq-test" element={<ProtectedRoute><IQTest /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/quiz-zone" element={<ProtectedRoute><QuizZone /></ProtectedRoute>} />
              <Route path="/assessment" element={<ProtectedRoute><BrainAssessment /></ProtectedRoute>} />

              {/* Informational Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/help" element={<HelpCenter />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
