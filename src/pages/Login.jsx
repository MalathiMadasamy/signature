import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginAsDemoUser } from '../services/authService';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    loginAsDemoUser();
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-md px-4 py-5 my-auto">
      <div className="card glass-card border-0 rounded-2xl shadow-xl p-4 p-sm-5 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-blue-600 text-white d-inline-block shadow-md mb-2">
            <ShieldCheck size={28} />
          </div>
          <h3 className="font-extrabold text-navy">Sign In to DetectiSign</h3>
          <p className="text-slate-500 text-xs">AI Biometric & Verification Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="form-label font-bold text-slate-700 text-xs">Email Address</label>
            <div className="position-relative">
              <Mail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-slate-400" size={16} />
              <input
                type="email"
                required
                className="form-control form-control-sm border-slate-300 ps-5 rounded-xl py-2.5 text-sm"
                placeholder="analyst@detectisign.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label font-bold text-slate-700 text-xs">Password</label>
            <div className="position-relative">
              <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-slate-400" size={16} />
              <input
                type="password"
                required
                className="form-control form-control-sm border-slate-300 ps-5 rounded-xl py-2.5 text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary-custom btn-lg w-100 rounded-xl font-bold d-flex align-items-center justify-center gap-2 py-2.5 text-sm"
          >
            <span>Login</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="position-relative text-center my-3">
          <hr className="border-slate-200" />
          <span className="position-absolute top-50 start-50 translate-middle px-2 bg-white text-slate-400 text-xs">OR</span>
        </div>

        {/* Continue as Demo User */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="btn btn-outline-custom w-100 rounded-xl font-bold d-flex align-items-center justify-center gap-2 py-2.5 text-sm"
        >
          <UserCheck size={18} className="text-blue-600" />
          <span>Continue as Demo User</span>
        </button>

      </div>
    </div>
  );
}
