'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { stocksDatabase, StockData } from '../../data/mockData';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  User as UserIcon, 
  Cpu, 
  TrendingUp, 
  TrendingDown, 
  Flame,
  Clock
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { 
    user, 
    logout, 
    notifications, 
    markNotificationsRead,
    recentSearches,
    addRecentSearch
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter stocks database based on query
  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : stocksDatabase.filter(stock => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.sector.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSelectSymbol = (symbol: string) => {
    addRecentSearch(symbol);
    setSearchQuery('');
    setShowSuggestions(false);
    router.push(`/stocks/${symbol}`);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Retrieve Indices to show live status
  const nifty = stocksDatabase.find(s => s.symbol === 'NIFTY');
  const nasdaq = stocksDatabase.find(s => s.symbol === 'NASDAQ');
  const sp500 = stocksDatabase.find(s => s.symbol === 'SP500');

  const renderIndex = (index?: StockData) => {
    if (!index) return null;
    const isUp = index.change >= 0;
    const Icon = isUp ? TrendingUp : TrendingDown;
    return (
      <div 
        key={index.symbol}
        onClick={() => router.push(`/stocks/${index.symbol}`)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#161616] border-2 border-[rgba(255,255,255,0.06)] rounded-[12px] cursor-pointer hover:border-[rgba(255,255,255,0.15)] transition-all"
      >
        <span className="text-[11px] font-extrabold text-white">{index.name.replace(' Index', '').replace(' Composite', '')}</span>
        <span className="text-[11px] font-bold font-mono">{index.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        <span className={cn(
          "flex items-center gap-0.5 text-[10px] font-extrabold font-mono",
          isUp ? "text-[#22C55E]" : "text-[#EF4444]"
        )}>
          <Icon className="w-3 h-3 stroke-[2.5px]" />
          {isUp ? '+' : ''}{index.changePercent.toFixed(2)}%
        </span>
      </div>
    );
  };

  return (
    <header className="sticky top-0 right-0 flex items-center justify-between w-full h-[76px] bg-[#090909]/95 backdrop-blur-md border-b-2 border-[rgba(255,255,255,0.12)] px-8 z-30">
      
      {/* Live Market Index Tape */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#EF4444]/15 border-2 border-[#EF4444]/30 rounded-[8px] text-[10px] font-extrabold text-[#EF4444] animate-pulse">
          <Flame className="w-3 h-3 fill-[#EF4444]" />
          <span>LIVE</span>
        </div>
        {renderIndex(nifty)}
        {renderIndex(nasdaq)}
        {renderIndex(sp500)}
      </div>

      {/* Mobile Indicator */}
      <div className="lg:hidden flex items-center">
        <span className="text-sm font-extrabold tracking-widest text-primary">AG</span>
      </div>

      {/* Navigation Controls (Search + Notifications + Profile) */}
      <div className="flex items-center gap-4">
        
        {/* Global Autocomplete Search Bar */}
        <div ref={searchRef} className="relative w-[280px] sm:w-[320px] md:w-[380px]">
          <div className="flex items-center w-full bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] px-3.5 py-1.5 focus-within:border-primary focus-within:shadow-[3px_3px_0px_0px_#7C3AED] transition-all">
            <Search className="w-4 h-4 text-[#A1A1AA] shrink-0" />
            <input
              type="text"
              placeholder="Search stocks, indices, crypto..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full bg-transparent border-0 text-white text-xs font-bold pl-2.5 focus:outline-none focus:ring-0 placeholder-[#A1A1AA]/50"
            />
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#090909] border border-white/20 rounded-[6px] text-[9px] text-[#A1A1AA] font-mono leading-none">
              /
            </kbd>
          </div>

          {/* Search Dropdown / Autocomplete Results */}
          {showSuggestions && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden z-50">
              
              {/* Recent Searches */}
              {searchQuery.trim() === '' && recentSearches.length > 0 && (
                <div className="p-3 border-b-2 border-[rgba(255,255,255,0.06)]">
                  <p className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#A1A1AA] uppercase mb-2 px-2">
                    <Clock className="w-3 h-3" />
                    <span>Recent Searches</span>
                  </p>
                  <div className="space-y-1">
                    {recentSearches.map((symbol) => {
                      const stock = stocksDatabase.find(s => s.symbol === symbol);
                      return (
                        <div
                          key={symbol}
                          onClick={() => handleSelectSymbol(symbol)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-[12px] hover:bg-white/5 cursor-pointer text-xs font-bold"
                        >
                          <span className="text-white">{symbol}</span>
                          <span className="text-[10px] text-[#A1A1AA] truncate max-w-[180px]">{stock?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Suggestions List */}
              {searchQuery.trim() !== '' && filteredSuggestions.length > 0 ? (
                <div className="p-2">
                  <p className="text-[10px] font-extrabold text-[#A1A1AA] uppercase mb-1.5 px-3 pt-1">Suggestions</p>
                  {filteredSuggestions.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => handleSelectSymbol(stock.symbol)}
                      className="flex items-center justify-between px-3 py-2 rounded-[12px] hover:bg-white/5 cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{stock.symbol}</p>
                        <p className="text-[10px] text-[#A1A1AA]">{stock.name}</p>
                      </div>
                      <span className="text-[10px] font-extrabold text-primary px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-[8px]">
                        {stock.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() !== '' ? (
                <div className="p-4 text-center text-[#A1A1AA] text-xs font-bold">
                  No matching assets found
                </div>
              ) : recentSearches.length === 0 ? (
                <div className="p-4 text-center text-[#A1A1AA] text-xs font-bold">
                  Type to start searching...
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Notifications Alert Center */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) markNotificationsRead();
            }}
            className="relative flex items-center justify-center w-10 h-10 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] hover:border-white transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 text-white stroke-[2.2px]" />
            {unreadCount > 0 && (
              <span className="absolute top-[-3px] right-[-3px] flex items-center justify-center w-5 h-5 bg-[#EF4444] border-2 border-white rounded-full text-[9px] font-extrabold text-white leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-[300px] bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden z-50">
              <div className="p-3.5 border-b-2 border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">Alerts Center</span>
                <span className="text-[9px] font-extrabold bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444] px-1.5 py-0.5 rounded-[6px]">
                  Real-time
                </span>
              </div>
              <div className="max-h-[250px] overflow-y-auto divide-y-2 divide-[rgba(255,255,255,0.04)]">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-white/25 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-primary">{notif.symbol}</span>
                        <span className="text-[8px] text-[#A1A1AA]">{notif.date}</span>
                      </div>
                      <p className="text-xs font-bold text-white mt-1">{notif.title}</p>
                      <p className="text-[10px] text-[#A1A1AA] mt-0.5 leading-snug">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-[#A1A1AA] text-xs font-bold">
                    No notifications triggered
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] hover:border-white transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-[12px] border border-white/20 text-[10px] font-bold text-white uppercase">
              {user?.name.substr(0, 2) || 'TR'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#A1A1AA]" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-[180px] bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden z-50">
              <div className="p-3 border-b-2 border-[rgba(255,255,255,0.06)]">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-[#A1A1AA] truncate">{user?.email}</p>
              </div>
              <div className="p-1.5 space-y-0.5">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    router.push('/settings');
                  }}
                  className="flex items-center gap-2 w-full px-2.5 py-1.5 text-xs font-bold text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-[12px] text-left"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    router.push('/login'); // If login exists
                  }}
                  className="flex items-center gap-2 w-full px-2.5 py-1.5 text-xs font-bold text-[#EF4444] hover:bg-[#EF4444]/10 rounded-[12px] text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
