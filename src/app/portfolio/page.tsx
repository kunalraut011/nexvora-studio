'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { stocksDatabase } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Briefcase, 
  Trash2, 
  History, 
  TrendingUp, 
  RefreshCw,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function PortfolioPage() {
  const router = useRouter();
  const { portfolio, buyStock, sellStock, resetPortfolio } = useAppStore();
  const [notification, setNotification] = useState<string | null>(null);

  // Dynamic Portfolio Calculations
  const getHoldingsDetails = () => {
    let investedCapital = 0;
    let currentHoldingsValue = 0;

    const details = portfolio.holdings.map(holding => {
      const stock = stocksDatabase.find(s => s.symbol === holding.symbol);
      const currentPrice = stock ? stock.price : holding.avgPrice;
      const cost = holding.qty * holding.avgPrice;
      const value = holding.qty * currentPrice;
      const pnl = value - cost;
      const pnlPercent = cost === 0 ? 0 : (pnl / cost) * 100;
      
      investedCapital += cost;
      currentHoldingsValue += value;

      return {
        ...holding,
        name: stock ? stock.name : 'Unknown Asset',
        currentPrice,
        cost,
        value,
        pnl,
        pnlPercent,
        sector: stock ? stock.sector : 'Other'
      };
    });

    const netAssetValue = currentHoldingsValue + portfolio.cash;
    const overallPnL = currentHoldingsValue - investedCapital;
    const overallPnLPercent = investedCapital === 0 ? 0 : (overallPnL / investedCapital) * 100;

    return {
      holdings: details,
      investedCapital,
      currentHoldingsValue,
      netAssetValue,
      overallPnL,
      overallPnLPercent
    };
  };

  const {
    holdings,
    investedCapital,
    currentHoldingsValue,
    netAssetValue,
    overallPnL,
    overallPnLPercent
  } = getHoldingsDetails();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your simulated portfolio? You will start fresh with $100,000 cash balance.')) {
      resetPortfolio();
      showToast('Portfolio reset successfully!');
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Pie chart calculation
  const sectorAllocations = () => {
    const sectors: Record<string, number> = {};
    holdings.forEach(h => {
      sectors[h.sector] = (sectors[h.sector] || 0) + h.value;
    });

    if (holdings.length === 0) {
      return [{ name: 'Cash Reserve', value: 100 }];
    }

    const data = Object.keys(sectors).map(name => ({
      name,
      value: parseFloat(((sectors[name] / currentHoldingsValue) * 100).toFixed(1))
    }));

    return data;
  };

  const allocationData = sectorAllocations();
  const COLORS = ['#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#14B8A6'];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#161616] border-2 border-white rounded-[18px] px-5 py-3 shadow-[4px_4px_0px_0px_#7C3AED] animate-count">
          <p className="text-xs font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-warning" />
            <span>{notification}</span>
          </p>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Simulated Portfolio</h2>
          <p className="text-sm font-bold text-[#A1A1AA] mt-2">Manage simulated holdings and model allocations.</p>
        </div>
        <div>
          <Button variant="dark" size="sm" onClick={handleReset} className="text-[#EF4444] border-[#EF4444]/20 hover:border-[#EF4444] hover:shadow-[3px_3px_0px_0px_rgba(239,68,68,0.2)]">
            <Trash2 className="w-4 h-4 mr-2" />
            Reset Portfolio
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Net Asset Value (NAV)</p>
          <p className="text-2xl font-black font-mono text-white mt-3">
            ${netAssetValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>

        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Invested Capital</p>
          <p className="text-2xl font-black font-mono text-white mt-3">
            ${investedCapital.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>

        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Unrealized P&L</p>
          <div className="flex items-baseline gap-2 mt-3">
            <span className={cn(
              "text-2xl font-black font-mono",
              overallPnL >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
            )}>
              {overallPnL >= 0 ? '+' : ''}${overallPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={cn(
              "text-xs font-extrabold font-mono",
              overallPnL >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
            )}>
              ({overallPnL >= 0 ? '+' : ''}{overallPnLPercent.toFixed(2)}%)
            </span>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Simulated Cash</p>
          <p className="text-2xl font-black font-mono text-white mt-3">
            ${portfolio.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      {/* Secondary split panel: Allocation & Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Holdings Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden" hasPadding={false}>
            <div className="p-6 border-b-2 border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>Active Holdings</span>
              </h3>
              <Badge variant="success">{holdings.length} Positions</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-[#A1A1AA] uppercase bg-[#090909]/20">
                    <th className="py-4.5 px-6">Asset</th>
                    <th className="py-4.5 px-4 text-right">Quantity</th>
                    <th className="py-4.5 px-4 text-right">Buy Avg</th>
                    <th className="py-4.5 px-4 text-right">Current</th>
                    <th className="py-4.5 px-4 text-right">Total Value</th>
                    <th className="py-4.5 px-6 text-right">Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-bold">
                  {holdings.map((h) => (
                    <tr 
                      key={h.symbol}
                      onClick={() => router.push(`/stocks/${h.symbol}`)}
                      className="hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="py-4.5 px-6">
                        <span className="text-white block font-extrabold">{h.symbol}</span>
                        <span className="text-[10px] text-[#A1A1AA] truncate block max-w-[150px] font-bold mt-0.5">{h.name}</span>
                      </td>
                      <td className="py-4.5 px-4 text-right font-mono text-white">{h.qty}</td>
                      <td className="py-4.5 px-4 text-right font-mono text-[#A1A1AA]">${h.avgPrice.toFixed(2)}</td>
                      <td className="py-4.5 px-4 text-right font-mono text-white">${h.currentPrice.toFixed(2)}</td>
                      <td className="py-4.5 px-4 text-right font-mono text-white">${h.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className={cn(
                        "py-4.5 px-6 text-right font-mono font-extrabold",
                        h.pnl >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                      )}>
                        <span>{h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)}</span>
                        <span className="block text-[10px] font-bold mt-0.5">{h.pnl >= 0 ? '+' : ''}{h.pnlPercent.toFixed(2)}%</span>
                      </td>
                    </tr>
                  ))}

                  {holdings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[#A1A1AA] font-bold">
                        No active simulated holdings. Click on the Stock Directory to place a buy order.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Transaction History log */}
          <Card>
            <div className="pb-4 border-b-2 border-[rgba(255,255,255,0.06)] mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Transaction Log</h3>
            </div>

            <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
              {portfolio.transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-[#090909]/40 border border-white/5 rounded-[12px]">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[9px] font-extrabold px-2 py-0.5 rounded-[6px] uppercase leading-none border",
                      tx.type === 'buy' ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]'
                    )}>
                      {tx.type}
                    </span>
                    <div>
                      <span className="text-xs font-extrabold text-white">{tx.symbol}</span>
                      <span className="text-[10px] text-[#A1A1AA] font-bold ml-2">Qty: {tx.qty} shares @ ${tx.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A1A1AA]">{tx.date}</span>
                </div>
              ))}

              {portfolio.transactions.length === 0 && (
                <p className="text-xs text-center text-[#A1A1AA] font-bold py-6">No transactions logged yet.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Right side: Sector allocation & AI suggestions */}
        <div className="space-y-6">
          {/* Allocation card */}
          <Card>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Portfolio Weightings</h3>
            
            {holdings.length > 0 ? (
              <>
                <div className="h-[200px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#161616', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
                        itemStyle={{ color: 'white', fontWeight: 'bold', fontSize: '11px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 mt-4">
                  {allocationData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-[4px]" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-white truncate max-w-[130px]">{item.name}</span>
                      </div>
                      <span className="font-mono text-[#A1A1AA]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs font-bold text-center text-[#A1A1AA] py-12">No weightings calculated.</p>
            )}
          </Card>

          {/* AI Allocation Advice */}
          <Card className="border-l-4 border-l-primary relative">
            <div className="absolute top-6 right-6 text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>

            <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5 mb-4">
              <PlusCircle className="w-4 h-4 text-warning" />
              <span>AI Allocation Advisor</span>
            </h3>

            <div className="space-y-3.5 text-xs text-[#A1A1AA] font-bold leading-relaxed">
              <p>
                Your portfolio currently exhibits a <strong className="text-white">Cash reserve of {(portfolio.cash / netAssetValue * 100).toFixed(0)}%</strong>. Under current inflationary indexes, holding &gt; 30% cash yields negative real returns.
              </p>
              <p>
                <strong>Recommendation:</strong> Consider scaling into <strong className="text-[#22C55E]">NVIDIA (NVDA)</strong> or defensive compounders like <strong className="text-white">TCS</strong> during range consolidation tests. Avoid cryptos (BTC/ETH) unless allocations represent &lt; 5% of overall equity exposures to cushion volatility.
              </p>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
