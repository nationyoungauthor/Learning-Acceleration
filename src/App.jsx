import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

import IQTest from './pages/IQTest'
import Progress from './pages/Progress'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import QuizZone from './pages/QuizZone'
import BrainAssessment from './pages/BrainAssessment'

import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/highscores" element={<HighScores />} />
            <Route path="/games" element={<Games />} />

            <Route path="/login" element={<Login />} />
            <Route path="/games/sequence-memory" element={<SequenceMemory />} />
            <Route path="/games/visual-memory" element={<VisualMemory />} />
            <Route path="/games/word-memory" element={<WordMemory />} />
            <Route path="/games/seen-number-memory" element={<SeenNumberMemory />} />
            <Route path="/games/number-memory" element={<NumberMemory />} />
            <Route path="/games/number-sequence" element={<NumberSequence />} />
            <Route path="/games/memory-match" element={<MemoryMatch />} />
            <Route path="/games/color-memory" element={<ColorMemory />} />
            <Route path="/games/chimp-test" element={<ChimpTest />} />

            <Route path="/games/pattern-logic" element={<PatternLogic />} />
            <Route path="/games/stroop-test" element={<StroopTest />} />
            <Route path="/games/color-target" element={<ColorTarget />} />
            <Route path="/games/one-to-fifty" element={<OneToFifty />} />
            <Route path="/games/word-scramble" element={<WordScramble />} />
            <Route path="/games/speed-math" element={<SpeedMath />} />

            <Route path="/games/5-second-test" element={<FiveSecondTest />} />
            <Route path="/games/time-estimator" element={<TimeEstimator />} />
            <Route path="/games/inverted-mouse" element={<InvertedMouse />} />
            <Route path="/games/perfect-circle" element={<PerfectCircle />} />
            <Route path="/iq-test" element={<IQTest />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Login initialIsSignUp={true} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz-zone" element={<QuizZone />} />
            <Route path="/assessment" element={<BrainAssessment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
