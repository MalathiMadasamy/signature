import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Bot, Menu, X, User, LogOut, LayoutDashboard, History, CheckCircle2, Info } from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';

export default function Navbar({ onOpenChatbot }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Verify Signature', path: '/verify' },
    { name: 'History', path: '/history' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navy sticky-top py-2 border-bottom border-dark border-opacity-25 shadow-sm">
      <div className="container-fluid max-w-7xl px-3 px-sm-4">
        
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex items-center gap-2 font-extrabold tracking-tight">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 d-flex align-items-center justify-content-center shadow-sm">
            <ShieldCheck className="text-white" size={22} />
          </div>
          <div>
            <span className="fs-4 font-bold text-white tracking-tight">Detecti<span className="text-blue-400">Sign</span></span>
            <span className="badge bg-blue-500/20 text-blue-300 border border-blue-400/30 ms-2 uppercase tracking-widest" style={{ fontSize: '10px' }}>AI Sec</span>
          </div>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-toggler border-0 p-2 text-slate-300 shadow-none d-lg-none"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop & Collapsible Mobile Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2 py-2 py-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600/30 text-white font-semibold border-b-2 border-blue-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {currentUser && (
              <li className="nav-item d-lg-none">
                <NavLink
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link px-3 py-2 text-slate-300 hover:text-white"
                >
                  Admin Panel
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right Controls */}
          <div className="d-flex align-items-center gap-3 pt-2 pt-lg-0 border-top border-dark border-opacity-25 border-lg-0">
            
            {/* AI Assistant Trigger Button */}
            <button
              onClick={onOpenChatbot}
              className="btn btn-sm bg-indigo-600/20 text-indigo-200 hover:bg-indigo-600/30 border border-indigo-400/30 rounded-lg d-flex align-items-center gap-2 px-3 py-2 font-semibold transition-all"
            >
              <Bot size={18} className="text-indigo-400 animate-pulse" />
              <span>AI Assistant</span>
            </button>

            {/* Auth Button */}
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/admin" className="btn btn-sm btn-outline-light d-none d-lg-flex align-items-center gap-1 rounded-lg">
                  <User size={15} />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-danger text-white d-flex align-items-center gap-1 rounded-lg px-3 py-2"
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span className="d-lg-none">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary-custom rounded-lg px-3.5 py-2">
                Sign In / Demo
              </Link>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}
