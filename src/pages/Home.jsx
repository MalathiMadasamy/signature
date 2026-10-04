import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Award, Lock, FileCheck, Cpu, CheckCircle2, UploadCloud, Search, Sparkles } from 'lucide-react';
import StatsCard from '../components/StatsCard';

export default function Home() {
  const steps = [
    {
      step: '01',
      title: 'Upload Reference Signature',
      desc: 'User uploads a known authentic reference signature of the account holder.',
      icon: UploadCloud
    },
    {
      step: '02',
      title: 'Upload Signature to Verify',
      desc: 'User uploads the questioned signature that needs verification.',
      icon: FileCheck
    },
    {
      step: '03',
      title: 'AI Comparison',
      desc: 'The system preprocesses both images, extracts SSIM matrices, and compares features.',
      icon: Cpu
    },
    {
      step: '04',
      title: 'Verification Result',
      desc: 'Displays similarity score percentage and classifies result with confidence level.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-hero text-white py-5 py-md-6 px-3 px-sm-4 rounded-3xl mx-3 mx-sm-4 mt-4 shadow-2xl relative overflow-hidden">
        <div className="container max-w-7xl relative z-10">
          <div className="row align-items-center g-5">
            
            <div className="col-12 col-lg-7 space-y-4">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <ShieldCheck size={16} className="text-blue-400" />
                <span>AI Security & Biometric Verification System</span>
              </div>

              <h1 className="display-4 font-extrabold text-white tracking-tight leading-tight">
                Verify Signatures with <span className="text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text">AI Precision</span>
              </h1>

              <p className="fs-5 text-slate-300 leading-relaxed max-w-2xl font-normal">
                DetectiSign uses AI-powered image analysis to compare handwritten signatures and identify whether a submitted signature matches a trusted reference.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 pt-2">
                <Link to="/verify" className="btn btn-primary-custom btn-lg rounded-xl d-flex align-items-center justify-center gap-2">
                  <span>Verify a Signature</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#how-it-works" className="btn btn-outline-light btn-lg rounded-xl font-semibold">
                  How It Works
                </a>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="col-12 col-lg-5 text-center">
              <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md space-y-4">
                <div className="d-flex align-items-center justify-between border-b border-slate-800 pb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-mono text-emerald-400">AI Engine Active</span>
                  </div>
                  <span className="badge bg-blue-500/20 text-blue-300 font-mono text-xs">SSIM v2.4</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 block font-mono">Sample Match Inspection</span>
                  <div className="h-[120px] bg-slate-900 rounded-xl d-flex align-items-center justify-center border border-slate-800">
                    <div className="text-emerald-400 font-mono text-sm d-flex align-items-center gap-2">
                      <CheckCircle2 size={24} />
                      <span className="fs-4 font-bold">94.8% Match</span>
                    </div>
                  </div>
                  <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs">LIKELY GENUINE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS & HIGHLIGHT CARDS */}
      <section className="container max-w-7xl px-4">
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <StatsCard
              icon={Cpu}
              title="AI-Based Verification"
              value="99.2%"
              subtitle="Structural feature accuracy"
              badgeText="Automated"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <StatsCard
              icon={Zap}
              title="Fast Comparison"
              value="< 2.5s"
              subtitle="Instant biometrics analysis"
              badgeText="Real-time"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <StatsCard
              icon={Award}
              title="Similarity Analysis"
              value="5 Factors"
              subtitle="SSIM, stroke & centroid metrics"
              badgeText="Multi-factor"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <StatsCard
              icon={Lock}
              title="Secure Processing"
              value="100%"
              subtitle="Local privacy compliance"
              badgeText="Protected"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="container max-w-7xl px-4 py-6">
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-2">
          <span className="badge bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            Verification Process
          </span>
          <h2 className="fs-2 font-extrabold text-navy">How DetectiSign Works</h2>
          <p className="text-slate-500 text-sm">
            Our 4-step computer vision process ensures accurate similarity screening in seconds.
          </p>
        </div>

        <div className="row g-4">
          {steps.map((s, idx) => {
            const StepIcon = s.icon;
            return (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="card glass-card border-0 rounded-2xl p-4 h-100 d-flex flex-column justify-content-between relative overflow-hidden group">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="fs-4 font-extrabold font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                        {s.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                        <StepIcon size={22} />
                      </div>
                    </div>
                    <h5 className="font-bold text-navy text-base mb-2">{s.title}</h5>
                    <p className="text-slate-500 text-xs leading-relaxed mb-0">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <Link to="/verify" className="btn btn-primary-custom btn-lg rounded-xl inline-flex align-items-center gap-2">
            <span>Start Signature Verification</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
