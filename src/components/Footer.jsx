import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileCheck, Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-400 py-5 mt-auto border-top border-dark border-opacity-25">
      <div className="container max-w-7xl">
        <div className="row g-4">
          
          {/* Col 1: Brand & Purpose */}
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white d-flex align-items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <span className="fs-5 font-extrabold text-white tracking-tight">DetectiSign</span>
            </div>
            <p className="small text-slate-400 mb-3" style={{ maxWidth: '380px' }}>
              DetectiSign uses advanced computer vision and morphological AI image analysis to compare handwritten signatures, identify subtle structural deviations, and flag potential forgery risks.
            </p>
            <div className="d-flex align-items-center gap-2 text-xs text-slate-400">
              <Lock size={14} className="text-emerald-400" />
              <span>Secure Local Data Processing & Privacy Compliant</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="col-6 col-md-3">
            <h6 className="text-white font-bold mb-3">System Modules</h6>
            <ul className="list-unstyled small space-y-2">
              <li className="mb-2"><Link to="/verify" className="text-slate-400 text-decoration-none hover:text-white">Signature Verification</Link></li>
              <li className="mb-2"><Link to="/history" className="text-slate-400 text-decoration-none hover:text-white">Verification History</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-slate-400 text-decoration-none hover:text-white">Analytics Dashboard</Link></li>
              <li className="mb-2"><Link to="/about" className="text-slate-400 text-decoration-none hover:text-white">System Architecture</Link></li>
            </ul>
          </div>

          {/* Col 3: Academic / Enterprise Disclaimer */}
          <div className="col-6 col-md-4">
            <h6 className="text-white font-bold mb-3">Academic & Legal Notice</h6>
            <p className="small text-slate-400 mb-2">
              DetectiSign is an AI-powered automated screening system. Results are probabilistic similarity indicators designed to assist document examiners and should be reviewed by authorized human experts for legal decisions.
            </p>
            <span className="badge bg-slate-800 text-slate-300 font-mono" style={{ fontSize: '11px' }}>
              Final Year CSE/AI Project System
            </span>
          </div>

        </div>

        <hr className="my-4 border-slate-800" />

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between small text-slate-400 gap-2">
          <div>&copy; 2026 DetectiSign AI Platform. All rights reserved.</div>
          <div className="d-flex gap-3">
            <Link to="/about" className="text-slate-400 text-decoration-none hover:text-white">Privacy Policy</Link>
            <Link to="/about" className="text-slate-400 text-decoration-none hover:text-white">Terms of Screening</Link>
            <Link to="/about" className="text-slate-400 text-decoration-none hover:text-white">Documentation</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
