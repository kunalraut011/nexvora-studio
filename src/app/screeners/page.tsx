'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { readyMadeScreeners, stocksDatabase, StockData } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  SlidersHorizontal, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Sliders,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function ScreenersPage() {
  const router = useRouter();
  const [selectedScreener, setSelectedScreener] = useState<string>(readyMadeScreeners[0].id);

  // Active Screener Config
  const activeScreener = readyMadeScreeners.find(s => s.id === selectedScreener) || readyMadeScreeners[0];

  // Retrieve stock entries for active screener
  const screenerStocks = stocksDatabase.filter(stock => 
    activeScreener.stocks.includes(stock.symbol)
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Market Screeners</h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Filter assets based on preset technical and fundamental metrics.</p>
      </div>

      {/* Screeners selectors layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Presets Sidebar List */}
        <div className="space-y-2 lg:col-span-1">
          <p className="text-[10px] font-extrabold text-[#A1A1AA] uppercase tracking-wider mb-3 px-1">Ready-made Screeners</p>
          {readyMadeScreeners.map((screener) => {
            const isActive = selectedScreener === screener.id;
            return (
              <button
                key={screener.id}
                onClick={() => setSelectedScreener(screener.id)}
                className={cn(
                  "w-full text-left p-3.5 border-2 rounded-[18px] text-xs font-bold transition-all cursor-pointer flex items-center justify-between",
                  isActive
                    ? "bg-primary border-white text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] -translate-x-[1px] -translate-y-[1px]"
                    : "bg-[#161616] border-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-white hover:border-[rgba(255,255,255,0.15)]"
                )}
              >
                <span>{screener.name}</span>
                <span className={cn(
                  "text-[9px] font-extrabold px-1.5 py-0.5 rounded-[6px] border leading-none",
                  isActive ? "bg-white/20 border-white/30 text-white" : "bg-[#090909] border-white/10 text-[#A1A1AA]"
                )}>
                  {screener.stocks.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Screener Output View */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Active Description */}
          <Card className="border-l-4 border-l-primary relative">
            <h3 className="text-sm font-extrabold text-white">{activeScreener.name}</h3>
            <p className="text-xs font-bold text-[#A1A1AA] leading-relaxed mt-2">{activeScreener.description}</p>
          </Card>

          {/* Table */}
          <Card className="overflow-hidden" hasPadding={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-[#A1A1AA] uppercase bg-[#090909]/20">
                    <th className="py-4.5 px-6">Asset</th>
                    <th className="py-4.5 px-4 text-right">Price</th>
                    <th className="py-4.5 px-4 text-right">Change %</th>
                    <th className="py-4.5 px-4 text-right">P/E</th>
                    <th className="py-4.5 px-4 text-right">ROE</th>
                    <th className="py-4.5 px-4 text-right">RSI (14)</th>
                    <th className="py-4.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-bold">
                  {screenerStocks.map((stock) => {
                    const isUp = stock.change >= 0;
                    const rsi = stock.candles[stock.candles.length - 1]?.indicators?.rsi14 || 50;
                    
                    return (
                      <tr 
                        key={stock.symbol}
                        onClick={() => router.push(`/stocks/${stock.symbol}`)}
                        className="hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <td className="py-4 px-6">
                          <span className="text-white block font-extrabold">{stock.symbol}</span>
                          <span className="text-[10px] text-[#A1A1AA] block mt-0.5 truncate max-w-[150px]">{stock.name}</span>
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-white">${stock.price.toFixed(2)}</td>
                        <td className={cn(
                          "py-4 px-4 text-right font-mono font-extrabold",
                          isUp ? "text-[#22C55E]" : "text-[#EF4444]"
                        )}>
                          {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-[#A1A1AA]">{stock.pe ? `${stock.pe}x` : 'N/A'}</td>
                        <td className="py-4 px-4 text-right font-mono text-[#A1A1AA]">{stock.roe ? `${stock.roe}%` : 'N/A'}</td>
                        <td className={cn(
                          "py-4 px-4 text-right font-mono font-extrabold",
                          rsi >= 70 ? "text-[#EF4444]" : rsi <= 35 ? "text-[#22C55E]" : "text-white"
                        )}>
                          {rsi.toFixed(1)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button variant="outline" size="sm" className="px-3.5 py-1.5 text-[10px] rounded-[10px]">
                            Analyze
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}

                  {screenerStocks.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#A1A1AA] font-bold">
                        No assets in screener registry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
