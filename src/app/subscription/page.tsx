'use client';

import React, { useState } from 'react';
import { useAppStore, SubscriptionTier } from '../../store/useAppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Check, 
  Sparkles, 
  Crown, 
  Zap,
  Star,
  Activity,
  Award
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function SubscriptionPage() {
  const { subscription, setSubscription } = useAppStore();
  const [success, setSuccess] = useState<string | null>(null);

  const handleSelectPlan = (tier: SubscriptionTier) => {
    setSubscription(tier);
    setSuccess(`Successfully switched to ${tier.toUpperCase()} Plan!`);
    setTimeout(() => setSuccess(null), 3000);
  };

  const plans = [
    {
      id: 'free' as SubscriptionTier,
      name: 'Free Tier',
      price: '$0',
      period: 'forever',
      desc: 'Essential tools for casual investors testing the market.',
      badge: 'Basic',
      badgeColor: 'neutral' as any,
      shadowColor: 'default' as any,
      icon: Activity,
      features: [
        '5 Stock Searches daily',
        'Basic AI summaries (Static)',
        '1 Watchlist',
        'Standard stock candle charts',
        'Delayed indicator updates (15m)'
      ]
    },
    {
      id: 'pro' as SubscriptionTier,
      name: 'Pro Trader',
      price: '$29',
      period: 'monthly',
      desc: 'Our most popular plan. Dynamic AI co-pilot models and custom screeners.',
      badge: 'Popular',
      badgeColor: 'primary' as any,
      shadowColor: 'primary' as any,
      icon: Zap,
      features: [
        'Unlimited stock & index searches',
        'Unlimited AI chat co-pilot prompts',
        'Unlimited Watchlists & pins',
        'Simulated Order desk access',
        'Real-time alerts (Price, volume, RSI)',
        'Advanced technical indicator overlays'
      ]
    },
    {
      id: 'premium' as SubscriptionTier,
      name: 'Alpha Quant',
      price: '$79',
      period: 'monthly',
      desc: 'Priority query bandwidth and quantitative allocation models.',
      badge: 'Elite',
      badgeColor: 'success' as any,
      shadowColor: 'success' as any,
      icon: Crown,
      features: [
        'Everything in Pro tier',
        'Priority quantitative models response',
        'AI Portfolio Allocation Advisor',
        'FII/DII institutional block alerts',
        'Custom alerts webhooks integrations',
        '24/7 Priority support hotline'
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
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
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Upgrade Your Edge</h2>
        <p className="text-sm font-bold text-[#A1A1AA]">
          Gain institutional-grade indicators, unlimited AI queries, and model allocation advise.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {plans.map((plan) => {
          const isActive = subscription === plan.id;
          const PlanIcon = plan.icon;
          
          return (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col justify-between relative",
                isActive ? "border-2 border-white shadow-[6px_6px_0px_0px_#7C3AED]" : ""
              )}
            >
              {/* Active check indicator */}
              {isActive && (
                <div className="absolute top-[-12px] left-6 bg-primary border-2 border-white rounded-[8px] px-3.5 py-1 text-[9px] font-extrabold uppercase text-white tracking-widest shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  Active Subscription
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-[12px] bg-[#090909] border border-white/10 text-primary">
                    <PlanIcon className="w-5 h-5" />
                  </div>
                  <Badge variant={plan.badgeColor}>{plan.badge}</Badge>
                </div>

                <h3 className="text-lg font-black text-white">{plan.name}</h3>
                
                {/* Price block */}
                <div className="flex items-baseline mt-4 mb-2">
                  <span className="text-4xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-xs font-bold text-[#A1A1AA] ml-1.5">/ {plan.period}</span>
                </div>
                
                <p className="text-xs font-bold text-[#A1A1AA] leading-relaxed mb-6 border-b border-white/5 pb-4">
                  {plan.desc}
                </p>

                {/* Features checklist */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-xs font-bold text-[#A1A1AA]">
                      <div className="flex items-center justify-center w-4 h-4 rounded-[4px] bg-[#161616] border border-white/20 text-[#22C55E] shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3px]" />
                      </div>
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                variant={isActive ? 'dark' : plan.id === 'premium' ? 'success' : 'primary'}
                fullWidth
                size="md"
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isActive}
              >
                {isActive ? 'Current Plan' : 'Activate Plan'}
              </Button>

            </Card>
          );
        })}
      </div>

    </div>
  );
}
