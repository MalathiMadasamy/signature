import React from 'react';

export default function StatsCard({ icon: Icon, title, value, subtitle, badgeText, badgeBg }) {
  return (
    <div className="card glass-card border-0 rounded-2xl shadow-sm h-100 p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 d-flex align-items-center justify-center">
          <Icon size={24} />
        </div>
        {badgeText && (
          <span className={`badge ${badgeBg || 'bg-blue-100 text-blue-700'} font-bold px-2.5 py-1 rounded-md text-xs`}>
            {badgeText}
          </span>
        )}
      </div>

      <h3 className="fs-2 font-extrabold text-navy font-mono mb-1">{value}</h3>
      <h6 className="font-bold text-slate-700 text-sm mb-1">{title}</h6>
      {subtitle && <p className="text-slate-400 text-xs mb-0">{subtitle}</p>}
    </div>
  );
}
