'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { stocksDatabase } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Bell, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  PlusCircle, 
  Clock, 
  AlertTriangle,
  Flame,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AlertsPage() {
  const { 
    alerts, 
    notifications, 
    createAlert, 
    deleteAlert, 
    toggleAlertActive 
  } = useAppStore();

  const [symbol, setSymbol] = useState('TSLA');
  const [alertType, setAlertType] = useState<'price_above' | 'price_below' | 'volume_above'>('price_above');
  const [triggerValue, setTriggerValue] = useState<number>(260.00);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmitAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (triggerValue <= 0) return;
    
    createAlert(symbol, alertType as any, triggerValue);
    setSuccessMsg('Monitoring rule created!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Price Alerts</h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Configure automated triggers on equity valuations and metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form (1 column) */}
        <div className="space-y-6">
          <Card className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5 flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-primary" />
              <span>Create Trigger Rule</span>
            </h3>

            {successMsg && (
              <div className="mb-4 bg-accent/20 border-2 border-accent text-accent px-4 py-2.5 rounded-[12px] text-xs font-bold animate-pulse">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmitAlert} className="space-y-4">
              
              {/* Asset Select */}
              <div>
                <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Target Asset</label>
                <select
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-primary"
                >
                  {stocksDatabase.map(s => (
                    <option key={s.symbol} value={s.symbol}>
                      {s.symbol} ({s.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Trigger Condition */}
              <div>
                <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Condition</label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value as any)}
                  className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-primary"
                >
                  <option value="price_above">Price Crosses Above ($)</option>
                  <option value="price_below">Price Crosses Below ($)</option>
                </select>
              </div>

              {/* Value */}
              <div>
                <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Threshold Value</label>
                <input
                  type="number"
                  step="0.01"
                  value={triggerValue}
                  onChange={(e) => setTriggerValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-bold font-mono focus:outline-none focus:border-primary text-white"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth size="md">
                Deploy Trigger Rule
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Column: Active and Log lists (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Rules Card */}
          <Card>
            <div className="pb-3 border-b-2 border-[rgba(255,255,255,0.06)] mb-4 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-primary" />
                <span>Active Rules</span>
              </h3>
              <Badge variant="neutral">{alerts.length} Rules</Badge>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3.5 bg-[#090909]/40 border-2 border-[rgba(255,255,255,0.05)] rounded-[18px]">
                  <div>
                    <span className="text-xs font-extrabold text-white">{alert.symbol}</span>
                    <span className="text-[10px] text-[#A1A1AA] font-bold ml-2">
                      {alert.type.replace('_', ' ')} ${alert.value.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAlertActive(alert.id)}
                      className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                      title={alert.active ? "Deactivate" : "Activate"}
                    >
                      {alert.active ? (
                        <ToggleRight className="w-6 h-6 text-[#22C55E]" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="text-[#A1A1AA] hover:text-[#EF4444] transition-colors cursor-pointer p-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {alerts.length === 0 && (
                <p className="text-xs font-bold text-center text-[#A1A1AA] py-8">No active rules configured.</p>
              )}
            </div>
          </Card>

          {/* Triggered Logs Card */}
          <Card>
            <div className="pb-3 border-b-2 border-[rgba(255,255,255,0.06)] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Trigger Log History</h3>
            </div>

            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3.5 bg-[#EF4444]/5 border-2 border-[#EF4444]/20 rounded-[18px] flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-[#EF4444]/15 border border-[#EF4444]/35 text-[#EF4444] shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#EF4444]">{notif.symbol}</span>
                      <span className="text-[9px] text-[#A1A1AA] font-mono">{notif.date}</span>
                    </div>
                    <p className="text-xs font-extrabold text-white mt-1">{notif.title}</p>
                    <p className="text-[10px] font-bold text-[#A1A1AA] mt-0.5 leading-snug">{notif.message}</p>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <p className="text-xs font-bold text-center text-[#A1A1AA] py-8">No alert histories logged.</p>
              )}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
