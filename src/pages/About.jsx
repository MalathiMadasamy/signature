import React from 'react';
import { ShieldCheck, Target, Building2, Scale, GraduationCap, Briefcase, FileCheck, CheckCircle2, Cpu } from 'lucide-react';

export default function About() {
  const applications = [
    { title: 'Banking & Finance', desc: 'Verify check endorsements and loan contract authorization signatures.', icon: Building2 },
    { title: 'Legal Documentation', desc: 'Screen affidavit contracts, legal deeds, and power of attorney documents.', icon: Scale },
    { title: 'Educational Institutions', desc: 'Authenticate student certificates, grade transcripts, and hall tickets.', icon: GraduationCap },
    { title: 'Business Documents', desc: 'Audit vendor agreements, corporate NDAs, and executive purchase orders.', icon: Briefcase },
    { title: 'Identity Verification', desc: 'Cross-examine passport signatures and national ID card biometrics.', icon: FileCheck },
    { title: 'Document Authentication', desc: 'Automate high-volume institutional paperwork screening.', icon: ShieldCheck }
  ];

  const objectives = [
    'Automate signature comparison through computer vision feature extraction.',
    'Reduce manual verification effort for high-volume paper documents.',
    'Detect significant signature differences and skilled forgery stroke tremors.',
    'Provide fast similarity analysis with transparent multi-factor factor scores.',
    'Support secure document verification while ensuring privacy and local compliance.'
  ];

  return (
    <div className="container max-w-7xl px-4 py-5 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>About DetectiSign System</span>
        </div>
        <h1 className="display-6 font-extrabold text-navy">About DetectiSign</h1>
        <p className="text-slate-600 text-base leading-relaxed">
          DetectiSign is an AI-powered signature verification system designed to assist users in comparing handwritten signatures using image processing and similarity analysis.
        </p>
      </div>

      {/* APPLICATIONS GRID */}
      <div className="space-y-4">
        <div className="border-bottom border-slate-200 pb-2">
          <h4 className="font-extrabold text-navy">Real-World Applications</h4>
          <p className="text-slate-500 text-xs">Industries and use-cases supported by DetectiSign screening</p>
        </div>

        <div className="row g-4">
          {applications.map((app, idx) => {
            const AppIcon = app.icon;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="card glass-card border-0 rounded-2xl p-4 h-100 space-y-2">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 d-inline-block">
                    <AppIcon size={22} />
                  </div>
                  <h6 className="font-bold text-navy text-base mb-1">{app.title}</h6>
                  <p className="text-slate-500 text-xs leading-relaxed mb-0">{app.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROJECT OBJECTIVES */}
      <div className="card glass-card border-0 rounded-2xl shadow-sm p-4 p-md-5 space-y-4">
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white">
            <Target size={24} />
          </div>
          <div>
            <h4 className="font-extrabold text-navy mb-0">Project Objectives</h4>
            <p className="text-slate-500 text-xs mb-0">Core academic & technical goals achieved in this project</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {objectives.map((obj, idx) => (
            <div key={idx} className="d-flex align-items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm font-medium">{obj}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
