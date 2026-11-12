import React, { useEffect, useState } from 'react';

/**
 * Modern circular progress gauge component.
 * Props:
 *   - percentage (0-100)
 *   - size (diameter in px, default 68)
 *   - strokeWidth (default 6)
 *   - color (hex color, e.g., '#2563EB')
 */
const ProgressCircle = ({ percentage = 0, size = 68, strokeWidth = 6, color = '#2563EB' }) => {
  const [offset, setOffset] = useState(0);
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - percentage) / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center my-0.5">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.65}
        />
        {/* Animated Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      {/* Centered Percentage Score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-none font-poppins">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
