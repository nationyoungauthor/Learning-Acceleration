import React, { useEffect, useState } from 'react';

/**
 * Simple circular progress component.
 * Props:
 *   - percentage (0-100)
 *   - size (diameter in px, default 80)
 *   - strokeWidth (default 8)
 *   - color (tailwind color class, e.g., 'text-[#2563EB]')
 */
const ProgressCircle = ({ percentage = 0, size = 80, strokeWidth = 8, color = '#2563EB' }) => {
  const [offset, setOffset] = useState(0);
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - percentage) / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <svg width={size} height={size} className="mx-auto">
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#E5E7EB"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        className="fill-current text-sm font-medium"
        style={{ fill: color }}
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default ProgressCircle;
