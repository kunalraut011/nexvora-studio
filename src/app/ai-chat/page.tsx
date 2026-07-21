'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Send, 
  Trash2, 
  Bot, 
  User as UserIcon,
  Sparkles,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AIChatPage() {
  const router = useRouter();
  const { chatMessages, sendChatMessage, clearChat } = useAppStore();
  const [inputMsg, setInputMsg] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMsg.trim() === '') return;
    sendChatMessage(inputMsg.trim());
    setInputMsg('');
  };

  const sampleQuestions = [
    { title: 'Should I buy Reliance?', desc: 'Technical buy ratings, entries, target & stop loss targets.' },
    { title: 'Compare Infosys vs TCS', desc: 'Financial valuation comparison, ROCE, and profit margins.' },
    { title: 'Explain PE Ratio', desc: 'Concept definition and real world application guides.' },
    { title: 'Best growth stocks', desc: 'Return of equity and EPS growth filters.' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] space-y-4 max-w-5xl mx-auto pb-6">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[rgba(255,255,255,0.06)] shrink-0">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5 uppercase tracking-tight">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <span>AI Co-Pilot</span>
          </h2>
          <p className="text-xs font-bold text-[#A1A1AA] mt-1.5">Deep-learning quantitative research co-pilot.</p>
        </div>
        <Button variant="dark" size="sm" onClick={clearChat} className="text-[#EF4444] border-[#EF4444]/15">
          <Trash2 className="w-3.5 h-3.5 mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Messages List Feed (Occupies 3 columns) */}
        <div className="lg:col-span-3 flex flex-col bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)] min-h-0 h-full">
          
          {/* Scrollable Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2 mb-4 scrollbar">
            {chatMessages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3.5",
                    isAssistant ? "justify-start" : "justify-end"
                  )}
                >
                  {isAssistant && (
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-[12px] border border-white/20 shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[85%] rounded-[18px] border-2 p-4 text-xs font-bold leading-relaxed shadow-[3px_3px_0px_0px]",
                      isAssistant
                        ? "bg-[#090909]/60 border-[rgba(255,255,255,0.06)] text-white shadow-[rgba(255,255,255,0.05)]"
                        : "bg-primary border-white text-white shadow-white"
                    )}
                  >
                    {/* Markdown Text Container */}
                    <div className="whitespace-pre-line prose prose-invert max-w-none">
                      {msg.content}
                    </div>

                    {/* Dynamic Chart Display (if present) */}
                    {msg.chartData && (
                      <div className="mt-4 p-3 bg-[#090909] border border-white/10 rounded-[12px]">
                        <p className="text-[10px] font-extrabold text-[#A1A1AA] uppercase tracking-wider mb-2">Revenue Mix Allocation</p>
                        <div className="space-y-2">
                          {msg.chartData.map(c => (
                            <div key={c.name}>
                              <div className="flex justify-between text-[9px] font-bold mb-0.5">
                                <span>{c.name}</span>
                                <span>{c.value}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: `${c.value}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dynamic stock links */}
                    {msg.stocks && msg.stocks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3.5 border-t border-white/10">
                        {msg.stocks.map(symbol => (
                          <span
                            key={symbol}
                            onClick={() => router.push(`/stocks/${symbol}`)}
                            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-[8px] text-[10px] uppercase cursor-pointer transition-all"
                          >
                            View {symbol}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-[12px] border border-white/20 shrink-0">
                      <UserIcon className="w-4 h-4 text-[#A1A1AA]" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleSendMessage} className="pt-4 border-t-2 border-[rgba(255,255,255,0.06)] shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] focus-within:border-primary focus-within:shadow-[3px_3px_0px_0px_#7C3AED] transition-all">
              <input
                type="text"
                placeholder="Ask your quantitative analyst..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-transparent border-0 text-white text-xs font-bold pl-1 focus:outline-none focus:ring-0 placeholder-[#A1A1AA]/50"
              />
              <button
                type="submit"
                disabled={inputMsg.trim() === ''}
                className="flex items-center justify-center w-8.5 h-8.5 rounded-[12px] bg-primary border border-white/30 hover:border-white text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>

        {/* Sidebar Info/Prompts Column (Occupies 1 column) */}
        <div className="hidden lg:block space-y-6">
          <Card>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span>Suggested Queries</span>
            </h3>

            <div className="space-y-3">
              {sampleQuestions.map((q) => (
                <div
                  key={q.title}
                  onClick={() => sendChatMessage(q.title)}
                  className="p-3 bg-[#090909]/40 border-2 border-[rgba(255,255,255,0.05)] hover:border-primary rounded-[16px] cursor-pointer transition-all"
                >
                  <p className="text-xs font-extrabold text-white flex items-center gap-1">
                    <span>{q.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-primary" />
                  </p>
                  <p className="text-[10px] text-[#A1A1AA] font-bold mt-1 leading-snug">{q.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">Model Parameters</h3>
            <p className="text-[10px] font-bold text-[#A1A1AA] leading-relaxed">
              Analyst models utilize multi-timeframe SMA crossovers, 14-day RSI oversold signals, and real-time financial reporting updates to compute directional biases.
            </p>
          </Card>
        </div>

      </div>

    </div>
  );
}
