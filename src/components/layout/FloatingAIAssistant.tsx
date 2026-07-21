'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button as NeoButton } from '../ui/Button';
import { 
  Sparkles, 
  X, 
  Send, 
  Trash2, 
  Bot, 
  User as UserIcon,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const FloatingAIAssistant: React.FC = () => {
  const { chatMessages, sendChatMessage, clearChat } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMsg.trim() === '') return;
    sendChatMessage(inputMsg.trim());
    setInputMsg('');
  };

  const sampleQuestions = [
    'Should I buy Reliance?',
    'Compare Infosys vs TCS',
    'Explain PE Ratio'
  ];

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-primary text-white border-2 border-white rounded-full shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer group"
        title="Ask AI Assistant"
      >
        <Sparkles className="w-6 h-6 stroke-[2px] group-hover:rotate-12 transition-transform" />
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setIsOpen(false)} />

          {/* Drawer Container */}
          <div className="w-[420px] max-w-full h-full bg-[#090909] border-l-2 border-[rgba(255,255,255,0.12)] shadow-[-6px_0px_0px_0px_rgba(124,58,237,0.3)] flex flex-col p-6 transition-all duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 bg-primary border-2 border-white rounded-[12px]">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">AI Co-Pilot</h3>
                  <span className="text-[10px] text-[#A1A1AA] font-bold">Trading & Research Assistant</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title="Clear history"
                  className="p-1.5 rounded-[8px] bg-[#161616] border border-white/10 text-[#A1A1AA] hover:text-[#EF4444] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-[8px] bg-[#161616] border border-white/10 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {chatMessages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      isAssistant ? "justify-start" : "justify-end"
                    )}
                  >
                    {isAssistant && (
                      <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-[10px] border border-white/20 shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-[18px] border-2 p-3.5 text-xs font-bold leading-relaxed",
                        isAssistant
                          ? "bg-[#161616] border-[rgba(255,255,255,0.08)] text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.06)]"
                          : "bg-primary border-white text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                      )}
                    >
                      {/* Markdown rendering simplified */}
                      <div className="whitespace-pre-line">
                        {msg.content}
                      </div>

                      {/* Display stocks links if any */}
                      {msg.stocks && msg.stocks.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/15">
                          {msg.stocks.map(symbol => (
                            <span
                              key={symbol}
                              onClick={() => {
                                setIsOpen(false);
                                window.location.href = `/stocks/${symbol}`;
                              }}
                              className="px-2 py-0.5 rounded-[6px] bg-white/10 border border-white/25 text-[9px] font-extrabold uppercase hover:bg-white/20 cursor-pointer"
                            >
                              View {symbol}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {!isAssistant && (
                      <div className="flex items-center justify-center w-7 h-7 bg-white/10 rounded-[10px] border border-white/20 shrink-0">
                        <UserIcon className="w-4 h-4 text-[#A1A1AA]" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Helper */}
            {chatMessages.length <= 1 && (
              <div className="pb-3 px-1">
                <p className="text-[10px] font-extrabold text-[#A1A1AA] uppercase mb-1.5">Try asking:</p>
                <div className="space-y-1">
                  {sampleQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendChatMessage(q)}
                      className="block w-full text-left px-3 py-2 rounded-[12px] bg-[#161616] border border-white/10 text-[10px] text-[#A1A1AA] hover:text-white hover:border-white transition-all cursor-pointer truncate"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input Box */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t-2 border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] focus-within:border-primary focus-within:shadow-[3px_3px_0px_0px_#7C3AED] transition-all">
                <input
                  type="text"
                  placeholder="Ask anything about stocks..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-transparent border-0 text-white text-xs font-bold pl-1 focus:outline-none focus:ring-0 placeholder-[#A1A1AA]/50"
                />
                <button
                  type="submit"
                  disabled={inputMsg.trim() === ''}
                  className="flex items-center justify-center w-8 h-8 rounded-[12px] bg-primary border border-white/30 hover:border-white text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
