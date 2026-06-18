import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaCheckCircle, FaFire } from 'react-icons/fa';

const BrainDashboardSection = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* Assessment Info */}
      <div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
          Get Your Complete Cognitive Profile Breakdown
        </h2>
        <p className="text-sm text-[#64748B] leading-relaxed mb-6">
          Our 4-pillar assessment dashboard gauges memory retention thresholds, speed calculation index, pattern logic connectivity, and focus inhibition ranges.
        </p>
        <div className="space-y-3.5 mb-8">
          {[
            "10-minute diagnostic challenge",
            "Compares scores with peer age brackets",
            "Unlock customized study advice cards",
          ].map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-base text-[#0F172A] font-semibold">
              <FaCheckCircle className="text-emerald-500" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
        <Link
          to="/assessment"
          className="inline-block px-7 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all"
        >
          Start Brain Assessment
        </Link>
      </div>

      {/* Dashboard Preview Widget */}
      <div className="bg-gradient-to-r from-white to-gray-50 border border-slate-200/50 p-6.5 rounded-3xl shadow-lg">
        <h4 className="font-bold text-lg text-[#4F46E5] uppercase tracking-widest mb-4">Workspace Preview</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4">
            <span className="text-sm font-bold text-indigo-600 block">IQ INDEX</span>
            <span className="text-xl font-black text-blue-600 mt-1 block">118</span>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <span className="text-sm font-bold text-pink-600 block">MEMORY PROFILE</span>
            <span className="text-xl font-black text-purple-600 mt-1 block">82%</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:shadow-lg transition-shadow">
            <span className="text-sm font-bold text-indigo-600 block">ACCURACY</span>
            <span className="text-base font-black text-green-600 mt-1 block">94%</span>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:shadow-lg transition-shadow">
            <span className="text-sm font-bold text-orange-600 block">DAILY STREAK</span>
            <span className="text-base font-black text-orange-600 mt-1 block flex items-center justify-center gap-0.5">
              <FaFire className="text-base" />
              <span>5 Days</span>
            </span>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:shadow-lg transition-shadow">
            <span className="text-sm font-bold text-purple-600 block">GLOBAL RANK</span>
            <span className="text-base font-black text-purple-800 mt-1 block">#124</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainDashboardSection;
