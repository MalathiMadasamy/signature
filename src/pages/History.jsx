import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../services/historyService';
import { History as HistoryIcon, Trash2, CheckCircle2, AlertTriangle, XCircle, Search, ExternalLink } from 'lucide-react';

export default function History() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all verification history records?')) {
      const updated = clearHistory();
      setRecords(updated);
    }
  };

  const filteredRecords = records.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.resultStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date.includes(searchTerm)
  );

  return (
    <div className="container max-w-7xl px-4 py-5 space-y-6">
      
      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 border-bottom border-slate-200 pb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <HistoryIcon size={20} />
            </div>
            <h1 className="fs-3 font-extrabold text-navy mb-0">Verification History</h1>
          </div>
          <p className="text-slate-500 text-xs mb-0">Audit log of previous signature similarity screenings saved in LocalStorage.</p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {records.length > 0 && (
            <button
              onClick={handleClear}
              className="btn btn-outline-danger btn-sm rounded-lg d-flex align-items-center gap-1.5 px-3 py-2 font-semibold"
            >
              <Trash2 size={15} />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="row g-3 align-items-center">
        <div className="col-12 col-md-6">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-slate-400" size={16} />
            <input
              type="text"
              className="form-control form-control-sm border-slate-300 ps-5 rounded-xl py-2 text-xs"
              placeholder="Search by ID, Status, or Date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Records Table */}
      {filteredRecords.length > 0 ? (
        <div className="card glass-card border-0 rounded-2xl shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-sm">
              <thead className="table-light text-slate-500 text-xs text-uppercase tracking-wider font-mono">
                <tr>
                  <th className="ps-4">Verification ID</th>
                  <th>Date & Time</th>
                  <th>Similarity Score</th>
                  <th>Result Status</th>
                  <th>Confidence</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((r) => {
                  let badgeBg = 'badge-genuine';
                  if (r.resultStatus === 'Needs Review') badgeBg = 'badge-review';
                  if (r.resultStatus === 'Potentially Forged') badgeBg = 'badge-forged';

                  return (
                    <tr key={r.id} className="cursor-pointer">
                      <td className="ps-4 font-mono font-bold text-navy">{r.id}</td>
                      <td className="text-slate-500 text-xs">{r.timestamp || r.date}</td>
                      <td>
                        <span className="font-mono font-bold text-blue-600">{r.similarity}%</span>
                      </td>
                      <td>
                        <span className={`badge ${badgeBg} font-bold px-2.5 py-1 rounded-full text-xs`}>
                          {r.resultStatus}
                        </span>
                      </td>
                      <td className="text-slate-600 text-xs">{r.confidence}</td>
                      <td className="text-end pe-4">
                        <button
                          onClick={() => setSelectedRecord(r)}
                          className="btn btn-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-lg px-2.5 py-1 font-semibold d-inline-flex align-items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          <span>View Detail</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card glass-card border-0 rounded-2xl p-5 text-center space-y-3">
          <HistoryIcon size={36} className="text-slate-300 mx-auto" />
          <h6 className="font-bold text-navy">No History Records Found</h6>
          <p className="text-slate-400 text-xs">Run a signature verification test to populate audit history records.</p>
        </div>
      )}

      {/* Detail Modal / Overlay */}
      {selectedRecord && (
        <div className="position-fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 d-flex align-items-center justify-content-center p-3">
          <div className="bg-white rounded-2xl p-4 max-w-lg w-100 shadow-2xl space-y-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
              <h5 className="font-bold text-navy mb-0">Record Detail: {selectedRecord.id}</h5>
              <button
                onClick={() => setSelectedRecord(null)}
                className="btn btn-sm btn-link text-slate-400 hover:text-slate-700 p-0 text-decoration-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Timestamp:</strong> {selectedRecord.timestamp || selectedRecord.date}</p>
              <p><strong>Similarity Score:</strong> {selectedRecord.similarity}%</p>
              <p><strong>Result Classification:</strong> {selectedRecord.resultStatus}</p>
              <p><strong>Confidence Rating:</strong> {selectedRecord.confidence}</p>
              <p className="text-slate-600"><strong>AI Explanation:</strong> {selectedRecord.explanation}</p>
            </div>

            <div className="text-end pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="btn btn-sm btn-secondary rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
