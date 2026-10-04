import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Verify from './pages/Verify';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { Bot } from 'lucide-react';

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-slate-50 text-slate-800">
        
        {/* Navigation Bar */}
        <Navbar onOpenChatbot={() => setIsChatbotOpen(true)} />

        {/* Main Route Body */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Chatbot Launcher Button (Bottom Right) */}
        {!isChatbotOpen && (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="chatbot-btn btn btn-primary-custom shadow-2xl d-flex align-items-center gap-2"
          >
            <Bot size={20} className="text-white animate-bounce" />
            <span>DetectiSign AI Assistant</span>
          </button>
        )}

        {/* AI Chatbot Floating Panel */}
        <AIChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

      </div>
    </Router>
  );
}
