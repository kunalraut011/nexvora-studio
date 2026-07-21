'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import { stocksDatabase, getAIAnalysis } from '../../../data/mockData';
import { StockChart } from '../../../components/StockChart';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Star, 
  Pin,
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Sparkles, 
  DollarSign, 
  Briefcase,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export default function StockProfilePage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const symbol = resolvedParams.symbol.toUpperCase();

  const { 
    portfolio, 
    buyStock, 
    sellStock, 
    watchlists, 
    activeWatchlist, 
    addToWatchlist, 
    removeFromWatchlist,
    pinnedStocks,
    togglePinStock,
    checkAlertTriggers
  } = useAppStore();

  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeQty, setTradeQty] = useState<number>(10);
  const [notification, setNotification] = useState<string | null>(null);

  // Find stock in database
  const stock = stocksDatabase.find(s => s.symbol === symbol) || stocksDatabase[0];
  const aiReport = getAIAnalysis(symbol);
  
  const isUp = stock.change >= 0;
  const isPinned = pinnedStocks.includes(stock.symbol);
  const watchlist = watchlists[activeWatchlist] || [];
  const isWatched = watchlist.includes(stock.symbol);

  // Calculate current holding details
  const holding = portfolio.holdings.find(h => h.symbol === stock.symbol);
  const currentCost = tradeQty * stock.price;

  const handleToggleWatchlist = () => {
    if (isWatched) {
      removeFromWatchlist(activeWatchlist, stock.symbol);
      showToast('Removed from Watchlist');
    } else {
      addToWatchlist(activeWatchlist, stock.symbol);
      showToast('Added to Watchlist');
    }
  };

  const handleTogglePin = () => {
    togglePinStock(stock.symbol);
    showToast(isPinned ? 'Unpinned Stock' : 'Pinned Stock');
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (tradeQty <= 0) return;

    if (tradeType === 'buy') {
      if (portfolio.cash < currentCost) {
        showToast('Insufficient cash reserves!');
        return;
      }
      buyStock(stock.symbol, tradeQty, stock.price);
      checkAlertTriggers(stock.symbol, stock.price);
      showToast(`Bought ${tradeQty} shares of ${stock.symbol}!`);
    } else {
      if (!holding || holding.qty < tradeQty) {
        showToast('Insufficient shares to sell!');
        return;
      }
      sellStock(stock.symbol, tradeQty, stock.price);
      checkAlertTriggers(stock.symbol, stock.price);
      showToast(`Sold ${tradeQty} shares of ${stock.symbol}!`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#161616] border-2 border-white rounded-[18px] px-5 py-3 shadow-[4px_4px_0px_0px_#7C3AED] animate-count">
          <p className="text-xs font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-warning" />
            <span>{notification}</span>
          </p>
        </div>
      )}

      {/* Header Info Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] p-6 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.06)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-white">{stock.symbol}</h2>
            <Badge variant="outline">{stock.sector}</Badge>
            <span className="text-xs font-bold text-[#A1A1AA]">{stock.name}</span>
          </div>
          
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl font-black font-mono text-white">${stock.price.toLocaleString()}</span>
            <span className={cn(
              "flex items-center gap-0.5 text-sm font-extrabold font-mono",
              isUp ? "text-[#22C55E]" : "text-[#EF4444]"
            )}>
              {isUp ? <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" /> : <ArrowDownRight className="w-4 h-4 stroke-[2.5px]" />}
              {isUp ? '+' : ''}{stock.change.toFixed(2)} ({isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleWatchlist}
            className={cn(
              "flex items-center justify-center w-11 h-11 border-2 rounded-[18px] transition-all cursor-pointer",
              isWatched 
                ? "bg-warning text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]" 
                : "bg-[#090909] text-[#A1A1AA] border-white/10 hover:border-white"
            )}
            title="Toggle Watchlist"
          >
            <Star className={cn("w-5 h-5", isWatched ? "fill-black" : "")} />
          </button>
          
          <button
            onClick={handleTogglePin}
            className={cn(
              "flex items-center justify-center w-11 h-11 border-2 rounded-[18px] transition-all cursor-pointer",
              isPinned 
                ? "bg-primary text-white border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[1px] active:translate-y-[1px]" 
                : "bg-[#090909] text-[#A1A1AA] border-white/10 hover:border-white"
            )}
            title="Pin to Dashboard"
          >
            <Pin className={cn("w-5 h-5 rotate-45", isPinned ? "fill-white" : "")} />
          </button>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Advanced Chart & Fundamentals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Chart */}
          <StockChart candles={stock.candles} symbol={stock.symbol} />

          {/* Fundamentals Data Table */}
          <Card>
            <div className="pb-3 border-b-2 border-[rgba(255,255,255,0.06)] mb-6">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Company Fundamentals</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
              {[
                { label: 'Market Cap', val: `$${(stock.marketCap / 1000).toFixed(2)}B` },
                { label: 'Enterprise Value', val: `$${(stock.enterpriseValue / 1000).toFixed(2)}B` },
                { label: 'Revenue', val: `$${(stock.revenue / 1000).toFixed(2)}B` },
                { label: 'Net Profit', val: `$${(stock.netProfit / 1000).toFixed(2)}B` },
                { label: 'P/E Ratio', val: `${stock.pe || 'N/A'}x` },
                { label: 'P/B Ratio', val: `${stock.pb || 'N/A'}x` },
                { label: 'ROE %', val: `${stock.roe || 'N/A'}%` },
                { label: 'ROCE %', val: `${stock.roce || 'N/A'}%` },
                { label: 'Debt to Equity', val: stock.debtToEquity || 'N/A' },
                { label: 'Dividend Yield', val: stock.dividendYield ? `${stock.dividendYield}%` : 'N/A' },
                { label: 'EPS (TTM)', val: `$${stock.eps}` },
                { label: 'Employees', val: stock.employees.toLocaleString() || 'N/A' }
              ].map((f) => (
                <div key={f.label} className="border-b border-white/5 pb-2">
                  <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{f.label}</p>
                  <p className="text-sm font-extrabold font-mono text-white mt-1">{f.val}</p>
                </div>
              ))}
            </div>

            {/* Holdings Structure */}
            <div className="mt-8 pt-6 border-t-2 border-[rgba(255,255,255,0.06)]">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-primary" />
                <span>Shareholding Pattern</span>
              </h4>
              
              <div className="flex w-full h-7 rounded-[10px] overflow-hidden border border-white/20">
                <div className="bg-primary flex items-center justify-center text-[9px] font-extrabold text-white" style={{ width: `${stock.holdings.promoters}%` }} title="Promoters">
                  {stock.holdings.promoters > 10 ? `${stock.holdings.promoters}%` : ''}
                </div>
                <div className="bg-[#22C55E] flex items-center justify-center text-[9px] font-extrabold text-white" style={{ width: `${stock.holdings.fii}%` }} title="FII">
                  {stock.holdings.fii > 10 ? `${stock.holdings.fii}%` : ''}
                </div>
                <div className="bg-[#F59E0B] flex items-center justify-center text-[9px] font-extrabold text-white" style={{ width: `${stock.holdings.dii}%` }} title="DII">
                  {stock.holdings.dii > 10 ? `${stock.holdings.dii}%` : ''}
                </div>
                <div className="bg-[#EF4444] flex items-center justify-center text-[9px] font-extrabold text-white" style={{ width: `${stock.holdings.public}%` }} title="Public">
                  {stock.holdings.public > 10 ? `${stock.holdings.public}%` : ''}
                </div>
              </div>

              {/* Holdings Legend */}
              <div className="flex flex-wrap gap-4 mt-3 text-[10px] font-bold text-[#A1A1AA]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-primary rounded-[4px]" /> Promoters ({stock.holdings.promoters}%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#22C55E] rounded-[4px]" /> Foreign Inst (FII) ({stock.holdings.fii}%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-[4px]" /> Domestic Inst (DII) ({stock.holdings.dii}%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#EF4444] rounded-[4px]" /> Retail Public ({stock.holdings.public}%)</span>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card>
            <h3 className="text-xs font-extrabold text-[#A1A1AA] uppercase tracking-wider mb-3">Corporate Profile</h3>
            <p className="text-xs font-bold text-white leading-relaxed">{stock.description}</p>
          </Card>

        </div>

        {/* AI report and Brokerage console */}
        <div className="space-y-6">
          
          {/* Simulated Trading Desk */}
          <Card className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>Simulated Order Desk</span>
            </h3>

            <form onSubmit={handleExecuteTrade} className="space-y-4">
              
              {/* Order toggles */}
              <div className="grid grid-cols-2 gap-2 bg-[#090909] border border-white/10 rounded-[12px] p-1">
                <button
                  type="button"
                  onClick={() => setTradeType('buy')}
                  className={cn(
                    "py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                    tradeType === 'buy' ? "bg-[#22C55E] text-white" : "text-[#A1A1AA]"
                  )}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('sell')}
                  className={cn(
                    "py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                    tradeType === 'sell' ? "bg-[#EF4444] text-white" : "text-[#A1A1AA]"
                  )}
                >
                  SELL
                </button>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Shares Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={tradeQty}
                  onChange={(e) => setTradeQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-bold font-mono focus:outline-none focus:border-primary text-white"
                />
              </div>

              {/* Stats */}
              <div className="space-y-2.5 bg-[#090909] border border-white/5 rounded-[16px] p-3 text-xs font-bold text-[#A1A1AA]">
                <div className="flex justify-between">
                  <span>Ticker price:</span>
                  <span className="font-mono text-white">${stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Cost:</span>
                  <span className="font-mono text-white">${currentCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2">
                  <span>Current Holding:</span>
                  <span className="font-mono text-white">{holding ? `${holding.qty} shares` : '0 shares'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cash Balance:</span>
                  <span className="font-mono text-white">${portfolio.cash.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant={tradeType === 'buy' ? 'success' : 'danger'}
                fullWidth
                size="md"
              >
                {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
              </Button>

            </form>
          </Card>

          {/* AI Analysis Report */}
          <Card className="border-l-4 border-l-primary relative">
            <div className="absolute top-6 right-6 text-primary">
              <Brain className="w-5 h-5" />
            </div>

            <div className="pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-warning" />
                <span>AI Technical Analysis</span>
              </h3>
            </div>

            {/* Overview Ratings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#A1A1AA] uppercase">System Rating</p>
                  <p className="text-base font-extrabold text-white mt-0.5">{aiReport.rating}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-[#A1A1AA] uppercase">Risk Level</p>
                  <span className={cn(
                    "inline-block text-[10px] font-extrabold px-2 py-0.5 border rounded-[6px] mt-0.5",
                    aiReport.riskLevel === 'Low' ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' :
                    aiReport.riskLevel === 'Medium' ? 'bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]' :
                    'bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]'
                  )}>
                    {aiReport.riskLevel}
                  </span>
                </div>
              </div>

              {/* Confidence Score Bar */}
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-[#A1A1AA]">Confidence Score</span>
                  <span className="font-mono text-white">{aiReport.confidenceScore}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${aiReport.confidenceScore}%` }} />
                </div>
              </div>

              {/* Targets */}
              <div className="grid grid-cols-3 gap-2 bg-[#090909] border border-white/5 rounded-[14px] p-3 text-center">
                <div>
                  <p className="text-[8px] font-bold text-[#A1A1AA] uppercase">Entry Target</p>
                  <p className="text-xs font-mono font-bold text-white mt-0.5">${aiReport.suggestedEntry.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-[#A1A1AA] uppercase">Stop Loss</p>
                  <p className="text-xs font-mono font-bold text-[#EF4444] mt-0.5">${aiReport.suggestedStoploss.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-[#A1A1AA] uppercase">Target Price</p>
                  <p className="text-xs font-mono font-bold text-[#22C55E] mt-0.5">${aiReport.suggestedTarget.toFixed(1)}</p>
                </div>
              </div>

              {/* Summary narratives */}
              <div className="space-y-3 pt-2 text-xs leading-relaxed">
                <div>
                  <h4 className="font-extrabold text-white">Technical Sentiment</h4>
                  <p className="text-[#A1A1AA] font-bold mt-0.5">{aiReport.technicalSummary}</p>
                </div>
                <div>
                  <h4 className="font-extrabold text-white">Fundamental View</h4>
                  <p className="text-[#A1A1AA] font-bold mt-0.5">{aiReport.fundamentalSummary}</p>
                </div>
                <div>
                  <h4 className="font-extrabold text-white">Long Term Narrative</h4>
                  <p className="text-[#A1A1AA] font-bold mt-0.5">{aiReport.longTermView}</p>
                </div>
              </div>

            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
