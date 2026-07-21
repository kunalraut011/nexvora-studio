'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stocksDatabase, StockData } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Cpu,
  Layers,
  CircleDollarSign
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function StocksCatalogPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'stock' | 'crypto' | 'index' | 'commodity'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'symbol' | 'price' | 'change' | 'mcap'>('symbol');

  // Filter list
  const filteredStocks = stocksDatabase.filter((stock) => {
    const matchesTab = activeTab === 'all' || stock.type === activeTab;
    const matchesSearch = stock.symbol.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          stock.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          stock.sector.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sort list
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change') return b.changePercent - a.changePercent;
    if (sortBy === 'mcap') return b.marketCap - a.marketCap;
    return a.symbol.localeCompare(b.symbol); // Default alphabetical
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Market Directory</h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Explore technical valuations and company directories.</p>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] p-4">
        
        {/* Search */}
        <div className="relative w-full md:w-[280px]">
          <div className="flex items-center w-full bg-[#090909] border-2 border-white/10 rounded-[12px] px-3.5 py-1.5 focus-within:border-primary">
            <Search className="w-4 h-4 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-transparent border-0 text-white text-xs font-bold pl-2 focus:outline-none placeholder-[#A1A1AA]/50 w-full"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1.5 bg-[#090909] border border-white/10 rounded-[12px] p-1 overflow-x-auto">
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'stock', label: 'Equities' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'index', label: 'Indices' },
            { id: 'commodity', label: 'Commodities' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-3 py-1.5 rounded-[8px] text-[10px] font-bold shrink-0 cursor-pointer",
                activeTab === tab.id ? "bg-primary text-white" : "text-[#A1A1AA] hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sorters */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span className="text-[10px] font-extrabold text-[#A1A1AA] uppercase">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#090909] border border-white/10 rounded-[12px] text-[10px] font-bold text-white px-2.5 py-1.5 focus:outline-none"
          >
            <option value="symbol">Symbol</option>
            <option value="price">Price</option>
            <option value="change">Daily Change</option>
            <option value="mcap">Market Cap</option>
          </select>
        </div>

      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedStocks.map((stock) => {
          const isUp = stock.change >= 0;
          return (
            <Card
              key={stock.symbol}
              interactive
              hoverShadowVariant={isUp ? 'success' : 'danger'}
              onClick={() => router.push(`/stocks/${stock.symbol}`)}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{stock.symbol}</h3>
                    <p className="text-[10px] font-bold text-[#A1A1AA] truncate mt-0.5 max-w-[140px]">{stock.name}</p>
                  </div>
                  <Badge variant={
                    stock.type === 'crypto' ? 'primary' :
                    stock.type === 'index' ? 'success' :
                    stock.type === 'commodity' ? 'warning' : 'outline'
                  }>
                    {stock.type}
                  </Badge>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-xl font-black font-mono text-white">${stock.price.toLocaleString()}</span>
                  <span className={cn(
                    "flex items-center text-[10px] font-extrabold font-mono",
                    isUp ? "text-[#22C55E]" : "text-[#EF4444]"
                  )}>
                    {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Mini details footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-[#A1A1AA]">
                <span>Mcap: {stock.marketCap > 0 ? `$${(stock.marketCap / 1000).toFixed(1)}B` : 'N/A'}</span>
                <span>P/E: {stock.pe > 0 ? `${stock.pe}x` : 'N/A'}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {sortedStocks.length === 0 && (
        <Card className="p-12 text-center text-[#A1A1AA]">
          <Layers className="w-12 h-12 stroke-[1.5px] mx-auto text-[#A1A1AA]/30 mb-4" />
          <p className="text-sm font-bold">No assets found matching parameters.</p>
        </Card>
      )}

    </div>
  );
}
