'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { stocksDatabase, StockData } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  Coins,
  Gem,
  LineChart as LineIcon
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function MarketsOverviewPage() {
  const router = useRouter();

  // Retrieve different asset classes
  const indices = stocksDatabase.filter(s => s.type === 'index');
  const cryptos = stocksDatabase.filter(s => s.type === 'crypto');
  const commodities = stocksDatabase.filter(s => s.type === 'commodity');

  const renderMarketCard = (item: StockData) => {
    const isUp = item.change >= 0;
    const Icon = isUp ? ArrowUpRight : ArrowDownRight;
    const SparklineColor = isUp ? '#22C55E' : '#EF4444';
    
    // Map candles to simple sparkline array
    const sparklineData = item.candles.slice(-20).map(c => ({ value: c.close }));

    return (
      <Card
        key={item.symbol}
        interactive
        hoverShadowVariant={isUp ? 'success' : 'danger'}
        onClick={() => router.push(`/stocks/${item.symbol}`)}
        className="flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-white/5 mb-4">
            <div>
              <span className="text-xs font-extrabold text-[#A1A1AA] uppercase tracking-wider">{item.type}</span>
              <h3 className="text-sm font-extrabold text-white mt-0.5">{item.name}</h3>
            </div>
            <span className="text-xs font-extrabold font-mono text-white/50">{item.symbol}</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-white">
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={cn(
              "flex items-center gap-0.5 text-xs font-extrabold font-mono",
              isUp ? "text-[#22C55E]" : "text-[#EF4444]"
            )}>
              <Icon className="w-3.5 h-3.5 stroke-[2.5px]" />
              {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Sparkline (Recharts AreaChart) */}
        <div className="h-16 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={SparklineColor}
                strokeWidth={2}
                fillOpacity={0.1}
                fill={SparklineColor}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Market Overview</h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Monitor indices, crypto trends, and global commodity rates.</p>
      </div>

      {/* Index benchmarks */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider">
          <Globe className="w-4 h-4 text-primary" />
          <span>Equities Benchmarks</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {indices.map(renderMarketCard)}
        </div>
      </div>

      {/* Cryptocurrencies */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider">
          <Coins className="w-4 h-4 text-primary" />
          <span>Digital Currencies</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cryptos.map(renderMarketCard)}
        </div>
      </div>

      {/* Commodities */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider">
          <Gem className="w-4 h-4 text-primary" />
          <span>Precious Metals</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commodities.map(renderMarketCard)}
        </div>
      </div>

    </div>
  );
}
