'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../utils/cn';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Activity, 
  Star, 
  Briefcase, 
  SlidersHorizontal, 
  Brain, 
  Newspaper, 
  Bell, 
  MessageSquareCode, 
  Settings, 
  CreditCard,
  Crown
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const subscription = useAppStore((state) => state.subscription);
  const user = useAppStore((state) => state.user);

  const navigationItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Markets', href: '/markets', icon: TrendingUp },
    { name: 'Stocks', href: '/stocks', icon: Activity },
    { name: 'Watchlist', href: '/watchlist', icon: Star },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { name: 'Screeners', href: '/screeners', icon: SlidersHorizontal },
    { name: 'AI Analysis', href: '/ai-analysis', icon: Brain },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'AI Chat', href: '/ai-chat', icon: MessageSquareCode },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Subscription', href: '/subscription', icon: CreditCard }
  ];

  return (
    <aside className="sticky top-0 left-0 flex flex-col w-[260px] h-screen bg-[#090909] border-r-2 border-[rgba(255,255,255,0.12)] p-6 shrink-0 z-40">
      {/* Brand Logo Container */}
      <div className="flex items-center gap-3 mb-8 px-2 py-3 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] shadow-[3px_3px_0px_0px_rgba(124,58,237,1)]">
        <div className="flex items-center justify-center w-9 h-9 bg-primary border-2 border-white rounded-[12px]">
          <Brain className="w-5 h-5 text-white stroke-[2px]" />
        </div>
        <div>
          <h1 className="text-md font-extrabold tracking-tight text-white leading-none">ANTIGRAVITY</h1>
          <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Research Hub</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navigationItems.map((item) => {
          // Check if active or subpath is active
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3.5 px-4 py-3 rounded-[18px] border-2 text-sm font-bold transition-all duration-150',
                isActive
                  ? 'bg-primary text-white border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-transparent text-[#A1A1AA] border-transparent hover:text-white hover:bg-white/5'
              )}
            >
              <div className={cn(
                'flex items-center justify-center p-1 rounded-[8px]',
                isActive ? 'bg-white/20' : 'bg-white/5 border border-white/10'
              )}>
                <Icon className="w-4 h-4 stroke-[2px]" />
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Premium Billing Panel */}
      <div className="mt-auto pt-6 border-t-2 border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3 p-3 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px]">
          <div className="flex items-center justify-center w-10 h-10 rounded-[14px] bg-primary/20 border-2 border-primary/30">
            {subscription !== 'free' ? (
              <Crown className="w-5 h-5 text-warning stroke-[2px]" />
            ) : (
              <div className="text-sm font-extrabold text-primary">TR</div>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate leading-tight">
              {user ? user.name : 'Guest Investor'}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={cn(
                'text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-[6px] border leading-none',
                subscription === 'premium' ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]' :
                subscription === 'pro' ? 'bg-primary/20 border-primary text-primary' :
                'bg-[#A1A1AA]/20 border-[#A1A1AA] text-[#A1A1AA]'
              )}>
                {subscription}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
