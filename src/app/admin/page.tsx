'use client';

import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  DollarSign, 
  Settings2, 
  LineChart as LineIcon, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminPage() {
  // Feature Flags Simulation
  const [flags, setFlags] = useState({
    enableDeepSearch: true,
    enableBrokerTrades: false,
    alphaSignalModels: true,
    priorityBandwidth: true
  });

  const toggleFlag = (flagName: keyof typeof flags) => {
    setFlags(prev => ({
      ...prev,
      [flagName]: !prev[flagName]
    }));
  };

  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15400 },
    { month: 'Mar', revenue: 21000 },
    { month: 'Apr', revenue: 29800 },
    { month: 'May', revenue: 38200 },
    { month: 'Jun', revenue: 45210 }
  ];

  const simulatedUsers = [
    { email: ' Raut@antigravity.ai', name: 'Tushar Raut', tier: 'premium', status: 'active', joins: '2026-06-02' },
    { email: 'sarah@stripe.com', name: 'Sarah Miller', tier: 'pro', status: 'active', joins: '2026-06-15' },
    { email: 'alex@koyfin.com', name: 'Alex Peterson', tier: 'free', status: 'active', joins: '2026-06-28' },
    { email: 'dev@vercel.app', name: 'Vercel Builder', tier: 'pro', status: 'active', joins: '2026-07-02' },
    { email: 'guest@raycast.com', name: 'Raycast User', tier: 'free', status: 'inactive', joins: '2026-07-10' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2">
          <Settings2 className="w-8 h-8 text-primary" />
          <span>Admin Controls</span>
        </h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Monitor subscription revenue, ARR analytics, user registries, and deploy feature flags.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Annual Run Rate (ARR)</p>
          <h3 className="text-2xl font-black font-mono text-white mt-3">$542,520</h3>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#22C55E] font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.4% MoM growth</span>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Active Customers</p>
          <h3 className="text-2xl font-black font-mono text-white mt-3">2,145</h3>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#A1A1AA] font-bold">
            <span>ARR Churn:</span>
            <span className="text-white font-mono">1.1%</span>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Monthly Revenue</p>
          <h3 className="text-2xl font-black font-mono text-white mt-3">$45,210</h3>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-primary font-bold">
            <span>ARR Run-rate</span>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Queries Logged</p>
          <h3 className="text-2xl font-black font-mono text-white mt-3">82,410 / day</h3>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#22C55E] font-bold">
            <span>SLA:</span>
            <span className="text-white font-mono">99.98%</span>
          </div>
        </Card>
      </div>

      {/* Primary Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Double-Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Revenue Chart */}
          <Card>
            <div className="pb-3 border-b border-white/5 mb-4 flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">ARR Growth Trend</h3>
              <Badge variant="success">Jun Peak</Badge>
            </div>
            
            <div className="h-[220px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 'bold' }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }}
                    orientation="right"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#161616', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
                    itemStyle={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                    labelStyle={{ fontSize: 9, color: '#A1A1AA' }}
                  />
                  <Bar dataKey="revenue" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* User Registry List */}
          <Card className="overflow-hidden" hasPadding={false}>
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">User Registries</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-bold">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-bold text-[#A1A1AA] uppercase bg-[#090909]/20">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-4">Billing Plan</th>
                    <th className="py-4 px-4">Sign Up</th>
                    <th className="py-4 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {simulatedUsers.map((u) => (
                    <tr key={u.email} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-6">
                        <span className="text-white block font-extrabold">{u.name}</span>
                        <span className="text-[10px] text-[#A1A1AA] block mt-0.5">{u.email}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono uppercase">
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-[5px] border leading-none font-bold",
                          u.tier === 'premium' ? 'bg-[#EF4444]/15 border-[#EF4444]/30 text-[#EF4444]' :
                          u.tier === 'pro' ? 'bg-primary/15 border-primary/30 text-primary' :
                          'bg-[#A1A1AA]/15 border-[#A1A1AA]/30 text-[#A1A1AA]'
                        )}>{u.tier}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#A1A1AA] font-mono">{u.joins}</td>
                      <td className="py-3.5 px-6 text-right">
                        <Badge variant={u.status === 'active' ? 'success' : 'neutral'}>
                          {u.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        {/* Right Single-Column (Feature flags) */}
        <div className="space-y-6">
          <Card className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
              <span>Feature Flags</span>
            </h3>

            <div className="space-y-4">
              {[
                { key: 'enableDeepSearch' as const, label: 'Deep AI Search Model', desc: 'Allows recursive search engines queries.' },
                { key: 'enableBrokerTrades' as const, label: 'Live Broker Sync API', desc: 'Toggles trade order sync execution.' },
                { key: 'alphaSignalModels' as const, label: 'Alpha Signal Generators', desc: 'Activates high-tier quant recommendations.' },
                { key: 'priorityBandwidth' as const, label: 'High Priority Bandwidth', desc: 'Allocates compute slots to Pro users.' }
              ].map((flag) => (
                <div key={flag.key} className="flex items-start justify-between gap-4 p-3 bg-[#090909]/40 border border-white/5 rounded-[16px]">
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{flag.label}</h4>
                    <p className="text-[10px] text-[#A1A1AA] font-bold mt-1 leading-snug">{flag.desc}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleFlag(flag.key)}
                    className="shrink-0 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                  >
                    {flags[flag.key] ? (
                      <ToggleRight className="w-7.5 h-7.5 text-[#22C55E]" />
                    ) : (
                      <ToggleLeft className="w-7.5 h-7.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
