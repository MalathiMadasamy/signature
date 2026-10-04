import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Sliders, Eye, Layers, Scale, Sparkles, Binary } from 'lucide-react';

export default function ProcessingPipeline() {
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    { num: '01', title: 'Original Image', icon: Eye, desc: 'High-resolution image ingestion of reference & target signatures.' },
    { num: '02', title: 'Grayscale Conversion', icon: Binary, desc: 'Luminance mapping Y = 0.299R + 0.587G + 0.114B to discard chromatic noise.' },
    { num: '03', title: 'Noise Reduction', icon: Sliders, desc: 'Gaussian blur filter & Otsu thresholding to strip paper texture.' },
    { num: '04', title: 'Signature Extraction', icon: Layers, desc: 'Bounding box crop & centroid (center of mass) alignment.' },
    { num: '05', title: 'Feature Analysis', icon: Cpu, desc: 'Extraction of SSIM matrix, stroke width density, and contour aspect ratio.' },
    { num: '06', title: 'Similarity Comparison', icon: Scale, desc: 'Multi-factor weighted correlation distance scoring.' },
    { num: '07', title: 'Verification Result', icon: Sparkles, desc: 'Threshold categorization: Likely Genuine, Needs Review, or Potentially Forged.' }
  ];

  return (
    <div className="card glass-card border border-slate-200 rounded-2xl shadow-sm overflow-hidden my-4">
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="card-header bg-slate-50 border-0 p-4 w-100 text-start d-flex align-items-center justify-content-between cursor-pointer"
      >
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white d-flex align-items-center justify-center">
            <Cpu size={20} />
          </div>
          <div>
            <h5 className="mb-0 font-extrabold text-navy text-base">View AI Processing Pipeline</h5>
            <p className="mb-0 text-slate-500 text-xs">Conceptual computer vision & feature extraction workflow for academic demo</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 text-blue-600 font-semibold text-xs">
          <span>{isExpanded ? 'Hide Pipeline' : 'Expand Pipeline'}</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isExpanded && (
        <div className="card-body p-4 bg-white border-top border-slate-200">
          <div className="row g-3">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 h-100 d-flex flex-column justify-content-between hover:border-blue-300 transition-all">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="badge bg-blue-100 text-blue-700 font-mono" style={{ fontSize: '11px' }}>
                          Step {step.num}
                        </span>
                        <StepIcon size={18} className="text-blue-600" />
                      </div>
                      <h6 className="font-bold text-navy text-sm mb-1">{step.title}</h6>
                      <p className="text-slate-500 text-xs mb-0 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
