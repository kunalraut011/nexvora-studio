'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { marketNews, NewsItem } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Newspaper, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  ChevronRight,
  Info,
  Clock
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function NewsPage() {
  const router = useRouter();
  const [filterSentiment, setFilterSentiment] = useState<'all' | 'bullish' | 'bearish' | 'neutral'>('all');

  const filteredNews = marketNews.filter(n => 
    filterSentiment === 'all' || n.sentiment === filterSentiment
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">AI Financial Digest</h2>
          <p className="text-sm font-bold text-[#A1A1AA] mt-2">Aggregated macro-economic headlines and stock impact analysis.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 bg-[#161616] border border-white/10 rounded-[12px] p-1">
          {[
            { id: 'all', label: 'All News' },
            { id: 'bullish', label: 'Bullish' },
            { id: 'bearish', label: 'Bearish' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterSentiment(tab.id as any)}
              className={cn(
                "px-3 py-1.5 rounded-[8px] text-[10px] font-bold cursor-pointer",
                filterSentiment === tab.id ? "bg-primary text-white" : "text-[#A1A1AA] hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main News List (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {filteredNews.map((article) => {
            const isBullish = article.sentiment === 'bullish';
            const isBearish = article.sentiment === 'bearish';
            
            return (
              <Card 
                key={article.id}
                className={cn(
                  "border-l-4 relative",
                  isBullish ? "border-l-[#22C55E]" : isBearish ? "border-l-[#EF4444]" : "border-l-[#A1A1AA]"
                )}
              >
                {/* Meta row */}
                <div className="flex items-center justify-between text-[10px] font-bold text-[#A1A1AA]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.time}</span>
                    <span>•</span>
                    <span className="text-white">{article.source}</span>
                  </span>
                  
                  <Badge variant={isBullish ? 'success' : isBearish ? 'danger' : 'neutral'}>
                    {article.sentiment}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-white mt-3 leading-snug">{article.title}</h3>

                {/* Summary */}
                <p className="text-xs font-bold text-[#A1A1AA] leading-relaxed mt-2.5">{article.summary}</p>

                {/* Impact details section */}
                <div className="mt-5 p-3.5 bg-[#090909]/60 border-2 border-[rgba(255,255,255,0.06)] rounded-[14px]">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#F59E0B] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Valuation Impact (Score: {article.impactScore}/10)</span>
                  </div>
                  <p className="text-[11px] font-bold text-white leading-relaxed">{article.impactExplanation}</p>
                </div>

                {/* Related Stocks Footer */}
                <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {article.relatedStocks.map(symbol => (
                      <span
                        key={symbol}
                        onClick={() => router.push(`/stocks/${symbol}`)}
                        className="px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-extrabold text-[#A1A1AA] hover:text-white rounded-[6px] cursor-pointer"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-3 py-1 text-[10px] rounded-[8px]"
                    onClick={() => router.push(`/stocks/${article.relatedStocks[0]}`)}
                  >
                    View Asset
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

              </Card>
            );
          })}

          {filteredNews.length === 0 && (
            <Card className="py-12 text-center text-[#A1A1AA]">
              <Newspaper className="w-12 h-12 stroke-[1.5px] mx-auto text-[#A1A1AA]/30 mb-4" />
              <p className="text-sm font-bold">No digest entries match filter parameters.</p>
            </Card>
          )}
        </div>

        {/* Right Info Column (1 column) */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-white/5">
              <Info className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Digest Analytics</h3>
            </div>
            
            <div className="space-y-4 text-xs font-bold text-[#A1A1AA] leading-relaxed">
              <p>
                Our AI Financial digest aggregates reports from 20+ global broker houses and scrapes index boards in real-time.
              </p>
              <div>
                <h4 className="text-white">Sentiment Ratios:</h4>
                <div className="flex w-full h-2 rounded-[6px] overflow-hidden border border-white/10 mt-2">
                  <div className="bg-[#22C55E]" style={{ width: '50%' }} />
                  <div className="bg-[#A1A1AA]" style={{ width: '25%' }} />
                  <div className="bg-[#EF4444]" style={{ width: '25%' }} />
                </div>
                <div className="flex justify-between text-[8px] uppercase mt-1">
                  <span>Bullish (50%)</span>
                  <span>Neutral (25%)</span>
                  <span>Bearish (25%)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
