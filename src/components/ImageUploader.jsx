import React, { useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Sparkles } from 'lucide-react';

export default function ImageUploader({
  title,
  description,
  badgeText,
  badgeBg,
  imageSrc,
  onImageChange,
  onRemoveImage,
  onLoadSample,
  sampleLabel
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, JPEG, SVG).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onImageChange(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="card glass-card border-0 rounded-2xl shadow-sm h-100 d-flex flex-column justify-content-between">
      <div className="card-body p-4 d-flex flex-column">
        
        {/* Card Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className={`badge ${badgeBg || 'bg-blue-500/10 text-blue-600'} font-bold px-2.5 py-1 rounded-md`} style={{ fontSize: '11px' }}>
              {badgeText}
            </span>
          </div>
        </div>

        <h5 className="card-title font-extrabold text-navy mb-1">{title}</h5>
        <p className="card-text text-slate-500 text-xs mb-4">{description}</p>

        {/* Upload Zone / Image Preview */}
        {!imageSrc ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-4 text-center cursor-pointer transition-all d-flex flex-column align-items-center justify-content-center flex-grow-1"
            style={{ minHeight: '210px' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="d-none"
              onChange={handleFileSelect}
            />
            <div className="p-3 rounded-circle bg-blue-100 text-blue-600 mb-3">
              <UploadCloud size={28} />
            </div>
            <p className="font-bold text-slate-800 text-sm mb-1">
              Drag & Drop or <span className="text-blue-600 underline">Browse</span>
            </p>
            <p className="text-slate-400 text-xs mb-0">Supported formats: PNG, JPG, JPEG, SVG (Max 5MB)</p>
          </div>
        ) : (
          <div className="position-relative bg-slate-900 rounded-2xl p-3 border border-slate-200 d-flex flex-column align-items-center justify-content-center flex-grow-1" style={{ minHeight: '210px' }}>
            <img
              src={imageSrc}
              alt={title}
              className="img-fluid rounded object-contain"
              style={{ maxHeight: '160px' }}
            />
            
            {/* Control Actions Overlay */}
            <div className="d-flex gap-2 mt-3 w-100 justify-content-center">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="btn btn-sm btn-light border text-slate-700 font-semibold rounded-lg d-flex align-items-center gap-1.5 shadow-sm"
                style={{ fontSize: '12px' }}
              >
                <RefreshCw size={13} />
                <span>Replace</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="d-none"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={onRemoveImage}
                className="btn btn-sm btn-outline-danger font-semibold rounded-lg d-flex align-items-center gap-1.5 shadow-sm"
                style={{ fontSize: '12px' }}
              >
                <X size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer Quick Sample Loader */}
      {onLoadSample && (
        <div className="card-footer bg-slate-50 border-top border-slate-200 p-3 rounded-b-2xl d-flex align-items-center justify-content-between">
          <span className="text-slate-500 text-xs">Quick Demo Sample:</span>
          <button
            type="button"
            onClick={onLoadSample}
            className="btn btn-xs bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1 text-xs font-semibold d-flex align-items-center gap-1 shadow-2xs"
          >
            <Sparkles size={12} className="text-amber-500" />
            <span>{sampleLabel || 'Load Sample'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
