'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { stocksDatabase } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Star, 
  Trash2, 
  PlusCircle, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Search,
  Sparkles,
  Layers
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function WatchlistPage() {
  const router = useRouter();
  const { 
    watchlists, 
    activeWatchlist, 
    createWatchlist, 
    deleteWatchlist, 
    removeFromWatchlist,
    addToWatchlist
  } = useAppStore();

  const [newListName, setNewListName] = useState('');
  const [addSymbol, setAddSymbol] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  // Available watchlists
  const watchlistNames = Object.keys(watchlists);
  const activeList = watchlists[activeWatchlist] || [];

  // Stocks in active watchlist
  const watchedStocks = stocksDatabase.filter(stock => 
    activeList.includes(stock.symbol)
  );

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim() === '') return;
    createWatchlist(newListName.trim());
    setNewListName('');
    showToast(`Created watchlist "${newListName.trim()}"`);
  };

  const handleDeleteList = (name: string) => {
    if (confirm(`Are you sure you want to delete the watchlist "${name}"?`)) {
      deleteWatchlist(name);
      showToast(`Deleted watchlist "${name}"`);
    }
  };

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (addSymbol.trim() === '') return;
    const targetSymbol = addSymbol.toUpperCase();
    const stockExists = stocksDatabase.some(s => s.symbol === targetSymbol);

    if (!stockExists) {
      showToast('Symbol not found in database.');
      return;
    }

    addToWatchlist(activeWatchlist, targetSymbol);
    setAddSymbol('');
    showToast(`Added ${targetSymbol} to ${activeWatchlist}`);
  };

  const showToast = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Toast */}
      {success && (
        <div className="fixed top-6 right-6 z-50 bg-[#161616] border-2 border-white rounded-[18px] px-5 py-3 shadow-[4px_4px_0px_0px_#7C3AED] animate-count">
          <p className="text-xs font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-warning" />
            <span>{success}</span>
          </p>
        </div>
      )}

      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Market Watchlists</h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Organize and monitor groups of core equities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Watchlist selection pane */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Active Lists */}
          <Card>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">My Watchlists</h3>
            <div className="space-y-2">
              {watchlistNames.map(name => {
                const isActive = activeWatchlist === name;
                return (
                  <div
                    key={name}
                    className={cn(
                      "flex items-center justify-between p-3 border-2 rounded-[18px] text-xs font-bold transition-all cursor-pointer",
                      isActive
                        ? "bg-primary border-white text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                        : "bg-[#090909]/40 border-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-white"
                    )}
                    onClick={() => useAppStore.setState({ activeWatchlist: name })}
                  >
                    <span>{name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "text-[8px] px-1 rounded bg-[#090909]",
                        isActive ? "text-white" : "text-[#A1A1AA]"
                      )}>{watchlists[name].length}</span>
                      {name !== 'My Core' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(name);
                          }}
                          className="text-[#A1A1AA] hover:text-[#EF4444] p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Create new list form */}
          <Card className="border-2 border-[rgba(255,255,255,0.12)]">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">Create List</h3>
            <form onSubmit={handleCreateList} className="space-y-3">
              <input
                type="text"
                placeholder="List name..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full bg-[#090909] border-2 border-white/10 rounded-[12px] px-3.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-primary"
              />
              <Button type="submit" variant="primary" size="sm" fullWidth>
                Add Watchlist
              </Button>
            </form>
          </Card>

        </div>

        {/* Watchlist Stock List Details */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Quick add stock to active list */}
          <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-extrabold text-white">Active List: {activeWatchlist}</h3>
              <p className="text-xs text-[#A1A1AA] font-bold mt-1">Add equities to monitor their live returns.</p>
            </div>
            
            <form onSubmit={handleAddStock} className="flex gap-2 w-full sm:w-auto">
              <select
                value={addSymbol}
                onChange={(e) => setAddSymbol(e.target.value)}
                className="bg-[#090909] border-2 border-white/10 rounded-[12px] px-3.5 py-1.5 text-xs font-bold text-white focus:outline-none"
              >
                <option value="">Select Stock...</option>
                {stocksDatabase.map(s => (
                  <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name}</option>
                ))}
              </select>
              <Button type="submit" variant="success" size="sm">
                Add Asset
              </Button>
            </form>
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
                    <th className="py-4.5 px-4 text-right">Volume</th>
                    <th className="py-4.5 px-6 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-bold">
                  {watchedStocks.map((stock) => {
                    const isUp = stock.change >= 0;
                    const lastCandle = stock.candles[stock.candles.length - 1];
                    const vol = lastCandle ? lastCandle.volume : 0;
                    
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
                        <td className="py-4 px-4 text-right font-mono text-[#A1A1AA]">{(vol / 1000000).toFixed(2)}M</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWatchlist(activeWatchlist, stock.symbol);
                              showToast(`Removed ${stock.symbol} from ${activeWatchlist}`);
                            }}
                            className="text-[#A1A1AA] hover:text-[#EF4444] p-2 hover:bg-[#EF4444]/10 rounded-[10px] transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {watchedStocks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[#A1A1AA] font-bold">
                        No watchlisted assets in "{activeWatchlist}". Add some above!
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
