import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQ_QUESTIONS, getBotResponse } from '../services/chatbotService';

export default function AIChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am the DetectiSign AI Assistant. Ask me anything about handwritten signature verification, SSIM similarity scores, computer vision features, or forgery detection.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Bot Response
    setTimeout(() => {
      const botAnswer = getBotResponse(text);
      const botMsg = {
        sender: 'bot',
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="chatbot-panel bg-white border border-slate-200 shadow-2xl rounded-2xl d-flex flex-column">
      
      {/* Header */}
      <div className="bg-navy p-3 text-white d-flex align-items-center justify-between border-bottom border-slate-800">
        <div className="d-flex align-items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white d-flex align-items-center justify-center shadow-sm">
            <Bot size={20} />
          </div>
          <div>
            <h6 className="mb-0 font-bold text-white d-flex align-items-center gap-1.5" style={{ fontSize: '14px' }}>
              DetectiSign AI Assistant
              <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-normal" style={{ fontSize: '9px' }}>Online</span>
            </h6>
            <p className="mb-0 text-slate-400" style={{ fontSize: '11px' }}>Ask me about signature verification.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn btn-sm btn-link text-slate-400 hover:text-white p-1"
          aria-label="Close Chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-grow-1 p-3 overflow-y-auto bg-slate-50 d-flex flex-column gap-3" style={{ maxHeight: '340px' }}>
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex flex-column ${
              msg.sender === 'user' ? 'align-items-end' : 'align-items-start'
            }`}
          >
            <div
              className={`p-3 rounded-2xl shadow-sm text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}
              style={{ maxWidth: '85%', whitespace: 'pre-line', fontSize: '13px' }}
            >
              {msg.text}
            </div>
            <span className="text-slate-400 mt-1 px-1 font-mono" style={{ fontSize: '10px' }}>
              {msg.timestamp}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested FAQ Chips */}
      <div className="p-2 bg-slate-100 border-top border-slate-200 overflow-x-auto d-flex gap-1.5 whitespace-nowrap scrollbar-none" style={{ fontSize: '11px' }}>
        {FAQ_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="btn btn-xs bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-300 rounded-full px-2.5 py-1 shrink-0 font-medium transition-all"
            style={{ fontSize: '11px' }}
          >
            <HelpCircle size={11} className="me-1 text-blue-500 inline" />
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-2.5 bg-white border-top border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="d-flex align-items-center gap-2"
        >
          <input
            type="text"
            className="form-control form-control-sm border-slate-300 rounded-xl px-3 py-2 text-sm shadow-none focus:border-blue-500"
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="btn btn-sm btn-primary-custom rounded-xl px-3 py-2 d-flex align-items-center justify-center shrink-0"
          >
            <Send size={15} />
          </button>
        </form>
      </div>

    </div>
  );
}
