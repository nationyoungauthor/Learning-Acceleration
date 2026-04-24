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

import './App.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#151a28]">
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
