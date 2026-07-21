'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stocksDatabase, getAIAnalysis } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  BrainCircuit, 
  Sparkles, 
  ChevronRight, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AIAnalysisCatalog() {
  const router = useRouter();
  const [filterRating, setFilterRating] = useState<'all' | 'buy' | 'hold' | 'sell'>('all');

  const stocks = stocksDatabase.filter(s => s.type === 'stock');

  const analyzedStocks = stocks.map(stock => {
    const analysis = getAIAnalysis(stock.symbol);
    return {
      ...stock,
      analysis
    };
  });

  const filteredAnalysis = analyzedStocks.filter((stock) => {
    if (filterRating === 'buy') return stock.analysis.rating.includes('Buy');
    if (filterRating === 'hold') return stock.analysis.rating.includes('Hold');
    if (filterRating === 'sell') return stock.analysis.rating.includes('Sell') || stock.analysis.rating.includes('Underperform');
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <span>Quantitative AI Ratings</span>
          </h2>
          <p className="text-sm font-bold text-[#A1A1AA] mt-2">AI-driven valuation metrics and directional targets.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-1.5 bg-[#161616] border border-white/10 rounded-[12px] p-1">
          {[
            { id: 'all', label: 'All Ratings' },
            { id: 'buy', label: 'Buy/Strong Buy' },
            { id: 'hold', label: 'Hold' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRating(tab.id as any)}
              className={cn(
                "px-3 py-1.5 rounded-[8px] text-[10px] font-bold cursor-pointer",
                filterRating === tab.id ? "bg-primary text-white" : "text-[#A1A1AA] hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAnalysis.map((stock) => {
          const isBuy = stock.analysis.rating.includes('Buy');
          const isSell = stock.analysis.rating.includes('Sell') || stock.analysis.rating.includes('Underperform');
          
          return (
            <Card
              key={stock.symbol}
              interactive
              hoverShadowVariant="primary"
              onClick={() => router.push(`/stocks/${stock.symbol}`)}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div>
                    <span className="text-sm font-extrabold text-white">{stock.symbol}</span>
                    <span className="text-[10px] text-[#A1A1AA] font-bold ml-2">{stock.name}</span>
                  </div>
                  
                  <Badge variant={isBuy ? 'success' : isSell ? 'danger' : 'warning'}>
                    {stock.analysis.rating}
                  </Badge>
                </div>

                {/* Sentiment & Confidence */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-bold">
                  <div>
                    <span className="text-[#A1A1AA] block text-[9px] uppercase">Confidence Score</span>
                    <span className="text-white mt-0.5 block font-mono">{stock.analysis.confidenceScore}%</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block text-[9px] uppercase">Risk Category</span>
                    <span className={cn(
                      "mt-0.5 inline-block text-[9px] px-1.5 py-0.2 border rounded-[4px] leading-none",
                      stock.analysis.riskLevel === 'Low' ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' :
                      stock.analysis.riskLevel === 'Medium' ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B]' :
                      'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'
                    )}>{stock.analysis.riskLevel}</span>
                  </div>
                </div>

                {/* Summary narrative snippet */}
                <div className="space-y-2 mt-4 text-xs text-[#A1A1AA] font-bold leading-relaxed">
                  <p className="line-clamp-2">
                    <strong className="text-white">Technical:</strong> {stock.analysis.technicalSummary}
                  </p>
                  <p className="line-clamp-2">
                    <strong className="text-white">Narrative:</strong> {stock.analysis.longTermView}
                  </p>
                </div>
              </div>

              {/* Price targets summary row */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-4 text-[10px] font-bold">
                  <div>
                    <span className="text-[#A1A1AA] block uppercase text-[8px]">Entry Target</span>
                    <span className="text-white font-mono mt-0.5 block">${stock.analysis.suggestedEntry}</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block uppercase text-[8px]">Take Profit</span>
                    <span className="text-[#22C55E] font-mono mt-0.5 block">${stock.analysis.suggestedTarget}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="px-3.5 py-1.5 text-[10px] rounded-[10px]">
                  Full Analysis
                  <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>

            </Card>
          );
        })}
      </div>

    </div>
  );
}
