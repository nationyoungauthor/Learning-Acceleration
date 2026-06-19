import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTrophy } from 'react-icons/fa';

// ─── Neural Network Canvas ─────────────────────────────────────────────────────
const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let nodes = [];
    const NODE_COUNT = 80;
    const MAX_DIST = 160;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,179,237,${0.4 + glow * 0.5})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,179,237,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
};

// ─── Scan Line Effect ──────────────────────────────────────────────────────────
const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
    <div className="scan-line" />
  </div>
);

// ─── Animated Word ─────────────────────────────────────────────────────────────
const AnimatedWord = ({ word, delay, visible, accent }) => (
  <span
    className={`inline-block transition-all duration-700 ${visible
      ? 'opacity-100 translate-y-0 blur-0'
      : 'opacity-0 translate-y-8 blur-sm'
      }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {accent ? (
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
        {word}
      </span>
    ) : (
      word
    )}
  </span>
);

// ─── Main Hero Component ───────────────────────────────────────────────────────
const HeroFuturistic = () => {
  const [ready, setReady] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const title1 = ['Boost', 'Memory,'];
  const title2 = ['Focus', '&', 'IQ'];
  const title3 = ['Through', 'Fun', 'Brain', 'Games'];
  const accentWords = new Set(['Focus', 'IQ', 'Brain', 'Games']);

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 100);
    const t2 = setTimeout(() => setBtnVisible(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const allWords = [...title1, ...title2, ...title3];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-center items-center bg-[#020817]"
    >
      {/* Neural network background */}
      <NeuralCanvas />

      {/* Scan line */}
      <ScanLine />

      {/* Radial glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/6 blur-[80px] pointer-events-none" />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Corner brackets (futuristic HUD feel) */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-blue-500/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-blue-500/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-blue-500/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-blue-500/30 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">


        {/* Title row 1 */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {title1.map((w, i) => (
              <AnimatedWord
                key={w}
                word={w}
                delay={i * 120}
                visible={ready}
                accent={accentWords.has(w)}
              />
            ))}
          </div>

          {/* Title row 2 — accented */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
            {title2.map((w, i) => (
              <AnimatedWord
                key={w}
                word={w}
                delay={title1.length * 120 + i * 120}
                visible={ready}
                accent={accentWords.has(w)}
              />
            ))}
          </div>

          {/* Title row 3 */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
            {title3.map((w, i) => (
              <AnimatedWord
                key={w}
                word={w}
                delay={(title1.length + title2.length) * 120 + i * 120}
                visible={ready}
                accent={accentWords.has(w)}
              />
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-slate-400 text-base md:text-lg leading-relaxed mt-8 mb-10 max-w-2xl font-medium transition-all duration-1000 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '900ms' }}
        >
          Train your brain with scientifically designed memory games, logic
          challenges, speed tests and adaptive quizzes — built for students.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 ${btnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <Link
            to="/games"
            className="group relative px-8 py-4 rounded-2xl font-bold text-sm text-white overflow-hidden shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300" />
            <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <span className="relative flex items-center gap-2">
              <FaPlay className="text-[10px]" />
              Start Training
            </span>
          </Link>

          <Link
            to="/assessment"
            className="px-8 py-4 rounded-2xl font-bold text-sm text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500/60 bg-slate-900/60 backdrop-blur-md shadow-inner transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <FaTrophy className="text-yellow-400 text-sm" />
            Take Brain Assessment
          </Link>
        </div>

        {/* Stats strip */}
        <div
          className={`flex flex-wrap justify-center gap-8 mt-14 transition-all duration-700 ${btnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          {[
            { value: '50+', label: 'Brain Games' },
            { value: '10K+', label: 'Questions' },
            { value: '6', label: 'Cognitive Skills' },
            { value: '100%', label: 'Free to Start' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300">
                {s.value}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFuturistic;
