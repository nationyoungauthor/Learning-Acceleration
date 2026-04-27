import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Home from './pages/Home'

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

import './App.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#e8f9fd]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
