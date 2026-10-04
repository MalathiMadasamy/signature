import React from 'react';
import { getDashboardStats } from '../services/historyService';
import StatsCard from '../components/StatsCard';
import { ShieldCheck, Users, BarChart3, CheckCircle2, AlertTriangle, XCircle, Activity, Lock } from 'lucide-react';

export default function Admin() {
  const stats = getDashboardStats();

  return (
    <div className="container max-w-7xl px-4 py-5 space-y-8">
      
      {/* Header */}
      <div className="d-flex align-items-center justify-between border-bottom border-slate-200 pb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
              <ShieldCheck size={20} />
            </div>
            <h1 className="fs-3 font-extrabold text-navy mb-0">Admin & System Overview</h1>
          </div>
          <p className="text-slate-500 text-xs mb-0">Institutional system metrics, user count, and security screening activity.</p>
        </div>
        <span className="badge bg-slate-900 text-emerald-400 font-mono px-3 py-1.5 rounded-lg border border-slate-800">
          Admin Level 1 Access
        </span>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="row g-4">
        
        {/* Total Users */}
        <div className="col-12 col-sm-6 col-lg-4">
          <StatsCard
            icon={Users}
            title="Total Registered Users"
            value="128"
            subtitle="Active security analysts & examiners"
            badgeText="System Users"
          />
        </div>

        {/* Total Verifications */}
        <div className="col-12 col-sm-6 col-lg-4">
          <StatsCard
            icon={BarChart3}
            title="Total Verifications"
            value={stats.total}
            subtitle="Screened signature pairs"
            badgeText="Processed"
          />
        </div>

        {/* Genuine Results */}
        <div className="col-12 col-sm-6 col-lg-4">
          <StatsCard
            icon={CheckCircle2}
            title="Genuine Results"
            value={stats.genuine}
            subtitle="Authentic matches verified"
            badgeText="Low Risk"
            badgeBg="bg-emerald-100 text-emerald-700"
          />
        </div>

        {/* Review-Required Results */}
        <div className="col-12 col-sm-6 col-lg-4">
          <StatsCard
            icon={AlertTriangle}
            title="Review-Required Results"
            value={stats.review}
            subtitle="Partial matches flagged"
            badgeText="Medium Risk"
            badgeBg="bg-amber-100 text-amber-700"
          />
        </div>

        {/* Potentially Forged Results */}
        <div className="col-12 col-sm-6 col-lg-4">
          <StatsCard
            icon={XCircle}
            title="Potentially Forged Results"
            value={stats.forged}
            subtitle="Significant differences flagged"
            badgeText="High Risk"
            badgeBg="bg-rose-100 text-rose-700"
          />
        </div>

        {/* System Privacy Compliance */}
        <div className="col-12 col-sm-6 col-lg-4">
          <StatsCard
            icon={Lock}
            title="Privacy Compliance"
            value="100%"
            subtitle="Uploaded images isolated"
            badgeText="Encrypted"
          />
        </div>

      </div>

      {/* RECENT SYSTEM AUDIT FEED */}
      <div className="card glass-card border-0 rounded-2xl shadow-sm p-4">
        <h5 className="font-bold text-navy mb-3 d-flex align-items-center gap-2">
          <Activity size={18} className="text-blue-600" />
          <span>System Audit Log</span>
        </h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-sm">
            <thead className="table-light text-slate-500 text-xs font-mono">
              <tr>
                <th className="ps-3">Log ID</th>
                <th>User / Analyst</th>
                <th>Action</th>
                <th>Result</th>
                <th className="text-end pe-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.history.slice(0, 6).map((h, idx) => (
                <tr key={idx}>
                  <td className="ps-3 font-mono font-bold text-navy">{h.id}</td>
                  <td className="text-slate-600 text-xs">demo.evaluator@university.edu</td>
                  <td className="text-slate-700 font-medium text-xs">Signature Verification</td>
                  <td>
                    <span className={`badge ${
                      h.resultStatus === 'Likely Genuine' ? 'badge-genuine' : h.resultStatus === 'Needs Review' ? 'badge-review' : 'badge-forged'
                    } font-bold px-2 py-0.5 rounded text-xs`}>
                      {h.resultStatus}
                    </span>
                  </td>
                  <td className="text-end pe-3 text-slate-500 text-xs font-mono">{h.timestamp || h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
