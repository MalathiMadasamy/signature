import React from 'react';

export default function CircularProgress({ score, resultStatus }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#10b981'; // Genuine
  if (resultStatus === 'Needs Review') color = '#f59e0b';
  if (resultStatus === 'Potentially Forged') color = '#ef4444';

  return (
    <div className="position-relative d-inline-flex align-items-center justify-content-center">
      <svg width="140" height="140" className="transform -rotate-90">
        {/* Background Track Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Animated Progress Arc */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      {/* Center Label */}
      <div className="position-absolute text-center">
        <span className="fs-2 font-extrabold text-navy font-mono d-block" style={{ lineHeight: '1' }}>
          {score}%
        </span>
        <span className="text-slate-400 font-semibold" style={{ fontSize: '10px', uppercase: 'true' }}>
          Similarity
        </span>
      </div>
    </div>
  );
}
