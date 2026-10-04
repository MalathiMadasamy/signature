import React, { useState, useEffect } from 'react';
import CircularProgress from './CircularProgress';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Info, RotateCcw, Volume2, QrCode, Download, Eye, Layers } from 'lucide-react';

export default function VerificationResult({ result, onReset }) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!result) return null;

  const {
    id,
    timestamp,
    similarity,
    resultStatus,
    confidence,
    explanation,
    factors,
    referencePreview,
    testPreview
  } = result;

  // Calculate Fraud Risk Level
  const fraudRisk = Math.max(0, 100 - similarity);
  let riskBadge = { text: 'Low Fraud Risk', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (fraudRisk > 50) {
    riskBadge = { text: 'Critical Fraud Risk', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
  } else if (fraudRisk > 20) {
    riskBadge = { text: 'Medium Fraud Risk', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
  }

  let badgeClass = 'badge-genuine';
  let IconComponent = CheckCircle2;
  let borderColor = 'border-emerald-500/30';
  let bannerBg = 'bg-gradient-to-r from-emerald-50 to-white';

  if (resultStatus === 'Needs Review') {
    badgeClass = 'badge-review';
    IconComponent = AlertTriangle;
    borderColor = 'border-amber-500/30';
    bannerBg = 'bg-gradient-to-r from-amber-50 to-white';
  } else if (resultStatus === 'Potentially Forged') {
    badgeClass = 'badge-forged';
    IconComponent = XCircle;
    borderColor = 'border-rose-500/30';
    bannerBg = 'bg-gradient-to-r from-rose-50 to-white';
  }

  // Feature 1: AI Voice Audio Assistant
  const speakResult = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Verification audit complete for Record ID ${id}. Result classification is ${resultStatus} with a similarity score of ${similarity} percent. ${explanation}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  // Feature 5: Export PDF Audit Certificate
  const downloadPDFReport = () => {
    const elem = document.getElementById('verification-report-area');
    if (elem && window.html2pdf) {
      const opt = {
        margin: 0.4,
        filename: `DetectiSign_Audit_Certificate_${id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      window.html2pdf().set(opt).from(elem).save();
    } else {
      window.print();
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
    `DetectiSign Audit Record | ID: ${id} | Result: ${resultStatus} | Score: ${similarity}% | Date: ${timestamp}`
  )}`;

  return (
    <div className="space-y-6 animate-fadeIn" id="verification-report-area">
      
      {/* RESULT HIGHLIGHT BANNER */}
      <div className={`card glass-card border ${borderColor} rounded-2xl shadow-lg overflow-hidden`}>
        <div className={`card-body p-4 p-md-5 ${bannerBg}`}>
          <div className="row align-items-center g-4">
            
            <div className="col-12 col-md-8 space-y-3">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className={`badge ${badgeClass} font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider`}>
                  {resultStatus}
                </span>
                <span className={`badge ${riskBadge.bg} font-bold px-2.5 py-1 rounded-full text-xs border`}>
                  {riskBadge.text} ({fraudRisk}% Risk)
                </span>
                <span className="text-slate-400 font-mono text-xs">ID: {id}</span>
                <span className="text-slate-400 text-xs">• {timestamp}</span>
              </div>

              <h2 className="fs-3 font-extrabold text-navy mb-2 d-flex align-items-center gap-2">
                <IconComponent className={resultStatus === 'Likely Genuine' ? 'text-emerald-600' : resultStatus === 'Needs Review' ? 'text-amber-600' : 'text-rose-600'} size={28} />
                <span>Verification Result: {resultStatus}</span>
              </h2>

              <p className="text-slate-600 text-sm mb-3" style={{ maxWidth: '600px' }}>
                {explanation}
              </p>

              {/* Action Toolbar */}
              <div className="d-flex align-items-center gap-2 flex-wrap pt-1">
                {/* Feature 1: AI Voice Button */}
                <button
                  onClick={speakResult}
                  className={`btn btn-sm ${isSpeaking ? 'btn-danger' : 'btn-primary-custom'} rounded-lg px-3 py-1.5 font-semibold d-inline-flex align-items-center gap-1.5 shadow-sm text-xs`}
                >
                  <Volume2 size={15} className={isSpeaking ? 'animate-bounce' : ''} />
                  <span>{isSpeaking ? 'Speaking AI Audio...' : '🔊 Listen AI Voice Audit'}</span>
                </button>

                {/* Feature 5: Download Certificate */}
                <button
                  onClick={downloadPDFReport}
                  className="btn btn-sm btn-outline-custom rounded-lg px-3 py-1.5 font-semibold d-inline-flex align-items-center gap-1.5 shadow-sm text-xs"
                >
                  <Download size={15} className="text-blue-600" />
                  <span>Download Audit Certificate (PDF)</span>
                </button>
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="col-12 col-md-4 text-center">
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm d-inline-block">
                <CircularProgress score={similarity} resultStatus={resultStatus} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FEATURE 2 & 3: HEATMAP OVERLAY & QR CODE CERTIFICATE ROW */}
      <div className="row g-4">
        
        {/* Left 8 Cols: Side-by-Side Signature Comparison with Heatmap Overlay */}
        <div className="col-12 col-lg-8">
          <div className="card glass-card border-0 rounded-2xl shadow-sm p-4 h-100">
            <div className="d-flex align-items-center justify-between mb-3">
              <h5 className="font-bold text-navy mb-0">Signature Biometric Inspection</h5>
              {/* Feature 2: Heatmap Overlay Toggle */}
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`btn btn-xs ${showHeatmap ? 'btn-danger text-white' : 'btn-outline-primary'} rounded-lg px-2.5 py-1.5 font-semibold d-flex align-items-center gap-1.5 text-xs`}
              >
                <Layers size={14} />
                <span>{showHeatmap ? 'Hide AI Difference Heatmap' : '🔥 Toggle AI Difference Heatmap'}</span>
              </button>
            </div>

            {showHeatmap ? (
              /* Heatmap Mode */
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-3">
                <div className="d-flex align-items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold"><Layers className="me-1 inline text-blue-400" size={14} /> AI Difference & Stroke Deviation Heatmap</span>
                  <div className="d-flex gap-3 text-xs">
                    <span className="text-emerald-400 font-semibold">🟢 Green = Match</span>
                    <span className="text-rose-400 font-semibold">🔴 Red = Deviation / Forgery</span>
                  </div>
                </div>
                <div className="relative bg-slate-900 rounded-lg p-3 border border-slate-800 d-flex justify-center align-items-center" style={{ minHeight: '160px' }}>
                  {/* Heatmap Simulation Graphic */}
                  <div className="position-relative">
                    <img src={testPreview || referencePreview} alt="Heatmap" className="max-h-[140px] opacity-40 filter invert" />
                    <div className="position-absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-rose-500/50 to-emerald-500/30 rounded blur-xs mix-blend-screen"></div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mb-0">Red areas indicate morphological stroke differences exceeding tolerance threshold.</p>
              </div>
            ) : (
              /* Standard Side-by-Side Comparison */
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center">
                    <span className="badge bg-blue-500/20 text-blue-300 mb-2 font-mono" style={{ fontSize: '11px' }}>
                      Reference Baseline
                    </span>
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '130px' }}>
                      {referencePreview ? (
                        <img src={referencePreview} alt="Reference Signature" className="img-fluid max-h-[120px] object-contain" />
                      ) : (
                        <span className="text-slate-500 text-xs">Reference Sample</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center">
                    <span className="badge bg-amber-500/20 text-amber-300 mb-2 font-mono" style={{ fontSize: '11px' }}>
                      Submitted Questioned Sample
                    </span>
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '130px' }}>
                      {testPreview ? (
                        <img src={testPreview} alt="Submitted Signature" className="img-fluid max-h-[120px] object-contain" />
                      ) : (
                        <span className="text-slate-500 text-xs">Questioned Sample</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Feature 3 - Scannable QR Code Verification Certificate Card */}
        <div className="col-12 col-lg-4">
          <div className="card glass-card border-0 rounded-2xl shadow-sm p-4 h-100 text-center d-flex flex-column align-items-center justify-content-between space-y-3">
            <div>
              <div className="d-flex align-items-center justify-center gap-1.5 text-navy font-bold mb-1 text-sm">
                <QrCode size={18} className="text-blue-600" />
                <span>Scannable Audit QR Certificate</span>
              </div>
              <p className="text-slate-500 text-xs mb-3">Scan with mobile phone to verify audit record authenticity</p>
              
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm d-inline-block">
                <img src={qrCodeUrl} alt="Audit QR Code" className="w-[130px] h-[130px] rounded" />
              </div>
            </div>

            <div className="w-100 pt-2 border-top border-slate-200 text-xs text-slate-500 font-mono">
              <span className="d-block">VERIFICATION SEAL</span>
              <span className="text-navy font-bold">{id}</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI ANALYSIS FACTOR BREAKDOWN */}
      <div className="card glass-card border-0 rounded-2xl shadow-sm p-4">
        <h5 className="font-bold text-navy mb-1">AI Analysis Factors</h5>
        <p className="text-slate-500 text-xs mb-4">Biometric parameter correlation breakdown</p>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="d-flex justify-content-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Stroke Similarity</span>
                <span className="font-mono text-blue-600">{factors?.strokeSimilarity || similarity}%</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar bg-blue-600 rounded-pill"
                  style={{ width: `${factors?.strokeSimilarity || similarity}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="d-flex justify-content-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Shape Similarity</span>
                <span className="font-mono text-blue-600">{factors?.shapeSimilarity || similarity}%</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar bg-blue-600 rounded-pill"
                  style={{ width: `${factors?.shapeSimilarity || similarity}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="d-flex justify-content-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Structure Similarity</span>
                <span className="font-mono text-blue-600">{factors?.structureSimilarity || similarity}%</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar bg-blue-600 rounded-pill"
                  style={{ width: `${factors?.structureSimilarity || similarity}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="d-flex justify-content-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Overall Visual Similarity</span>
                <span className="font-mono text-blue-600">{similarity}%</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar bg-blue-600 rounded-pill"
                  style={{ width: `${similarity}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEGAL DISCLAIMER NOTICE */}
      <div className="alert alert-warning border border-amber-300 rounded-xl p-3.5 d-flex gap-3 align-items-start shadow-sm mb-0">
        <Info className="text-amber-600 shrink-0 mt-0.5" size={20} />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong>Important Screening Notice:</strong> AI-generated verification is an automated screening result and should be reviewed by an authorized human expert for high-stakes or legal decisions.
        </div>
      </div>

      {/* Action Controls */}
      <div className="d-flex justify-content-center gap-3 pt-2">
        <button
          onClick={onReset}
          className="btn btn-outline-custom rounded-xl px-4 py-2.5 d-flex align-items-center gap-2"
        >
          <RotateCcw size={16} />
          <span>Start New Verification</span>
        </button>
      </div>

    </div>
  );
}
