import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import VerificationResult from '../components/VerificationResult';
import ProcessingPipeline from '../components/ProcessingPipeline';
import { verifySignature } from '../services/signatureService';
import { saveHistoryRecord } from '../services/historyService';
import { MOCK_SIGNATURES } from '../data/mockData';
import { Cpu, ShieldCheck, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function Verify() {
  const [referenceImg, setReferenceImg] = useState(null);
  const [testImg, setTestImg] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnalyze = async () => {
    if (!referenceImg || !testImg) {
      setErrorMsg('Please upload both a reference signature and a signature to verify.');
      return;
    }

    setErrorMsg('');
    setIsAnalyzing(true);
    setResult(null);

    const steps = [
      'Grayscale Conversion & Binarization...',
      'Applying Otsu Adaptive Thresholding...',
      'Centroid & Bounding Box Normalization...',
      'Extracting SSIM Feature Matrix...',
      'Generating Verification Classification...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStatus(steps[i]);
      await new Promise((r) => setTimeout(r, 400));
    }

    try {
      const verificationRecord = await verifySignature(referenceImg, testImg);
      saveHistoryRecord(verificationRecord);
      setResult(verificationRecord);
    } catch (e) {
      setErrorMsg('An error occurred during verification. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setReferenceImg(null);
    setTestImg(null);
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="container max-w-7xl px-4 py-5 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>Biometric AI Feature Comparison</span>
        </div>
        <h1 className="display-6 font-extrabold text-navy">AI Signature Verification</h1>
        <p className="text-slate-500 text-sm">
          Upload a trusted reference signature and the signature you want to verify.
        </p>
      </div>

      {/* ERROR ALERT */}
      {errorMsg && (
        <div className="alert alert-danger rounded-xl p-3 d-flex align-items-center gap-2 text-xs font-semibold max-w-xl mx-auto shadow-sm">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* INPUT UPLOAD CARDS */}
      <div className="row g-4">
        
        {/* CARD 1: REFERENCE SIGNATURE */}
        <div className="col-12 col-md-6">
          <ImageUploader
            title="Reference Signature"
            description="Upload a known genuine signature."
            badgeText="CARD 1 • Authentic Baseline"
            badgeBg="bg-emerald-500/10 text-emerald-600"
            imageSrc={referenceImg}
            onImageChange={(src) => setReferenceImg(src)}
            onRemoveImage={() => setReferenceImg(null)}
            onLoadSample={() => setReferenceImg(MOCK_SIGNATURES.referenceGenuine)}
            sampleLabel="Sample Genuine"
          />
        </div>

        {/* CARD 2: SIGNATURE TO VERIFY */}
        <div className="col-12 col-md-6">
          <ImageUploader
            title="Signature to Verify"
            description="Upload the signature that needs verification."
            badgeText="CARD 2 • Questioned Sample"
            badgeBg="bg-amber-500/10 text-amber-600"
            imageSrc={testImg}
            onImageChange={(src) => setTestImg(src)}
            onRemoveImage={() => setTestImg(null)}
            onLoadSample={() => setTestImg(MOCK_SIGNATURES.testGenuine)}
            sampleLabel="Sample Target"
          />
        </div>

      </div>

      {/* ANALYZE BUTTON BAR */}
      <div className="text-center pt-3">
        <button
          onClick={handleAnalyze}
          disabled={!referenceImg || !testImg || isAnalyzing}
          className="btn btn-primary-custom btn-lg rounded-xl px-5 py-3 font-bold d-inline-flex align-items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={20} className="animate-spin text-white" />
              <span>Analyzing signature...</span>
            </>
          ) : (
            <>
              <Cpu size={20} />
              <span>Analyze Signature</span>
            </>
          )}
        </button>
      </div>

      {/* LOADING ANIMATION CONTAINER */}
      {isAnalyzing && (
        <div className="card glass-card border-0 rounded-2xl p-4 text-center max-w-md mx-auto space-y-3 shadow-lg my-4">
          <div className="spinner-border text-blue-600 mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h6 className="font-bold text-navy mb-1">Analyzing signature...</h6>
          <p className="text-slate-400 font-mono text-xs mb-0">{analysisStatus}</p>
        </div>
      )}

      {/* RESULT SECTION */}
      {result && (
        <VerificationResult result={result} onReset={handleReset} />
      )}

      {/* EXPANDABLE PROCESSING PIPELINE */}
      <ProcessingPipeline />

    </div>
  );
}
