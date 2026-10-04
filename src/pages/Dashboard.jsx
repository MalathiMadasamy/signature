import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/historyService';
import StatsCard from '../components/StatsCard';
import { LayoutDashboard, CheckCircle2, AlertTriangle, XCircle, BarChart3, PieChart, Activity, Clock } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 24,
    genuine: 15,
    review: 5,
    forged: 4,
    history: []
  });

  useEffect(() => {
    const data = getDashboardStats();
    setStats(data);
  }, []);

  const genuinePercent = Math.round((stats.genuine / (stats.total || 1)) * 100);
  const reviewPercent = Math.round((stats.review / (stats.total || 1)) * 100);
  const forgedPercent = Math.round((stats.forged / (stats.total || 1)) * 100);

  return (
    <div className="container max-w-7xl px-4 py-5 space-y-8">
      
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom border-slate-200 pb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="fs-3 font-extrabold text-navy mb-0">Analytics Dashboard</h1>
          </div>
          <p className="text-slate-500 text-xs mb-0">Overview of signature verification metrics, score distribution, and audit activity.</p>
        </div>
      </div>

      {/* STAT CARDS ROW */}
      <div className="row g-4">
        
        {/* Total Verifications */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatsCard
            icon={BarChart3}
            title="Total Verifications"
            value={stats.total}
            subtitle="Processed signature pairs"
            badgeText="All Time"
          />
        </div>

        {/* Likely Genuine */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatsCard
            icon={CheckCircle2}
            title="Likely Genuine"
            value={stats.genuine}
            subtitle={`${genuinePercent}% of total volume`}
            badgeText="Verified"
            badgeBg="bg-emerald-100 text-emerald-700"
          />
        </div>

        {/* Needs Review */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatsCard
            icon={AlertTriangle}
            title="Needs Review"
            value={stats.review}
            subtitle={`${reviewPercent}% of total volume`}
            badgeText="Partial Match"
            badgeBg="bg-amber-100 text-amber-700"
          />
        </div>

        {/* Potentially Forged */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatsCard
            icon={XCircle}
            title="Potentially Forged"
            value={stats.forged}
            subtitle={`${forgedPercent}% of total volume`}
            badgeText="High Risk"
            badgeBg="bg-rose-100 text-rose-700"
          />
        </div>

      </div>

      {/* CHARTS / DISTRIBUTION BREAKDOWN */}
      <div className="row g-4">
        
        {/* Left Column: Result Distribution Chart Bar */}
        <div className="col-12 col-lg-6">
          <div className="card glass-card border-0 rounded-2xl shadow-sm p-4 h-100 space-y-4">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="font-bold text-navy mb-0 d-flex align-items-center gap-2">
                <PieChart size={18} className="text-blue-600" />
                <span>Verification Result Distribution</span>
              </h5>
              <span className="badge bg-slate-100 text-slate-600 font-mono text-xs">Summary</span>
            </div>

            <div className="space-y-4 pt-2">
              {/* Genuine Bar */}
              <div className="space-y-1">
                <div className="d-flex justify-content-between text-xs font-semibold">
                  <span className="text-slate-700">Likely Genuine ({stats.genuine})</span>
                  <span className="font-mono text-emerald-600">{genuinePercent}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div
                    className="progress-bar bg-emerald-500 rounded-pill"
                    style={{ width: `${genuinePercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Needs Review Bar */}
              <div className="space-y-1">
                <div className="d-flex justify-content-between text-xs font-semibold">
                  <span className="text-slate-700">Needs Review ({stats.review})</span>
                  <span className="font-mono text-amber-600">{reviewPercent}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div
                    className="progress-bar bg-amber-500 rounded-pill"
                    style={{ width: `${reviewPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Potentially Forged Bar */}
              <div className="space-y-1">
                <div className="d-flex justify-content-between text-xs font-semibold">
                  <span className="text-slate-700">Potentially Forged ({stats.forged})</span>
                  <span className="font-mono text-rose-600">{forgedPercent}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div
                    className="progress-bar bg-rose-500 rounded-pill"
                    style={{ width: `${forgedPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Similarity Score Ranges */}
        <div className="col-12 col-lg-6">
          <div className="card glass-card border-0 rounded-2xl shadow-sm p-4 h-100 space-y-4">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="font-bold text-navy mb-0 d-flex align-items-center gap-2">
                <Activity size={18} className="text-blue-600" />
                <span>Similarity Score Ranges</span>
              </h5>
              <span className="badge bg-slate-100 text-slate-600 font-mono text-xs">Biometrics</span>
            </div>

            <div className="row g-3 pt-2">
              <div className="col-4 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="font-mono font-bold text-emerald-700 fs-4 d-block">80–100%</span>
                  <span className="text-slate-600 font-semibold" style={{ fontSize: '11px' }}>High Match</span>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-mono font-bold text-amber-700 fs-4 d-block">50–79%</span>
                  <span className="text-slate-600 font-semibold" style={{ fontSize: '11px' }}>Moderate</span>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="font-mono font-bold text-rose-700 fs-4 d-block">0–49%</span>
                  <span className="text-slate-600 font-semibold" style={{ fontSize: '11px' }}>Low Match</span>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed mb-0">
              System threshold criteria enforce conservative cut-offs to minimize false positive acceptance rates in sensitive financial and banking workflows.
            </p>

          </div>
        </div>

      </div>

      {/* RECENT ACTIVITY LOG */}
      <div className="card glass-card border-0 rounded-2xl shadow-sm p-4">
        <h5 className="font-bold text-navy mb-3 d-flex align-items-center gap-2">
          <Clock size={18} className="text-blue-600" />
          <span>Recent Verification Activity</span>
        </h5>

        <div className="space-y-3">
          {stats.history.slice(0, 5).map((h) => (
            <div key={h.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 d-flex align-items-center justify-between">
              <div className="d-flex align-items-center gap-3">
                <span className="font-mono font-bold text-navy text-xs">{h.id}</span>
                <span className="text-slate-400 text-xs d-none d-sm-inline">• {h.timestamp || h.date}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="font-mono font-bold text-blue-600 text-xs">{h.similarity}%</span>
                <span className={`badge ${
                  h.resultStatus === 'Likely Genuine' ? 'badge-genuine' : h.resultStatus === 'Needs Review' ? 'badge-review' : 'badge-forged'
                } font-bold px-2.5 py-1 rounded-full text-xs`}>
                  {h.resultStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
