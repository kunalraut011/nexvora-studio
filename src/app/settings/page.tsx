'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Settings as SettingsIcon, 
  Key, 
  User as UserIcon, 
  Shield, 
  Layers, 
  Link, 
  Check,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function SettingsPage() {
  const { 
    user, 
    login, 
    apiKey, 
    setApiKey, 
    brokerConnected, 
    connectBroker, 
    disconnectBroker 
  } = useAppStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [openAIKey, setOpenAIKey] = useState(apiKey || '');
  const [supabaseUrl, setSupabaseUrl] = useState('https://oqjchylwobplhsnwkyef.supabase.co');
  const [success, setSuccess] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name);
    showToast('Profile configuration updated!');
  };

  const handleSaveAPIKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(openAIKey);
    showToast('API credentials saved!');
  };

  const handleToggleBroker = () => {
    if (brokerConnected) {
      disconnectBroker();
      showToast('Disconnected from broker.');
    } else {
      connectBroker();
      showToast('Syncing with broker successful!');
    }
  };

  const showToast = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
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
        <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <span>Hub Settings</span>
        </h2>
        <p className="text-sm font-bold text-[#A1A1AA] mt-2">Configure system preferences, API credentials, and sync data layers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* User profile */}
        <Card className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5 flex items-center gap-1.5">
            <UserIcon className="w-4 h-4 text-primary" />
            <span>Profile Configuration</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Investor Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-bold focus:outline-none focus:border-primary text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-bold focus:outline-none focus:border-primary text-white"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth size="md">
              Update Profile
            </Button>
          </form>
        </Card>

        {/* Sync Integrations & Brokerage */}
        <div className="space-y-6">
          
          {/* Brokerage connection */}
          <Card>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Link className="w-4 h-4 text-primary" />
              <span>Broker Synchronization</span>
            </h3>
            <p className="text-xs font-bold text-[#A1A1AA] leading-relaxed mb-5">
              Sync simulated orders with real broker execution endpoints (Alpaca, Zerodha, or Interactive Brokers).
            </p>

            <div className="flex items-center justify-between p-4 bg-[#090909]/40 border-2 border-[rgba(255,255,255,0.05)] rounded-[18px]">
              <div>
                <p className="text-xs font-extrabold text-white">Alpaca/Zerodha Sync</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    brokerConnected ? "bg-[#22C55E] animate-pulse" : "bg-[#EF4444]"
                  )} />
                  <span className="text-[10px] font-bold text-[#A1A1AA]">{brokerConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>

              <Button
                variant={brokerConnected ? 'outline' : 'success'}
                size="sm"
                onClick={handleToggleBroker}
                className="text-xs px-4"
              >
                {brokerConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </Card>

          {/* Database keys */}
          <Card>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span>Security & Database Sync</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">Supabase URL</label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full bg-[#090909]/60 border-2 border-white/5 rounded-[12px] px-3.5 py-1.5 text-xs font-bold text-white/50 cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#A1A1AA]">
                <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Supabase Auth / Database linked to cloud store.</span>
              </div>
            </div>
          </Card>

        </div>

        {/* API Credentials */}
        <Card className="md:col-span-2">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-primary" />
            <span>Developer API Keys</span>
          </h3>
          <p className="text-xs font-bold text-[#A1A1AA] leading-relaxed mb-6">
            Input custom API credentials to unlock native live models (OpenAI API key used for advanced stock descriptions & reasoning).
          </p>

          <form onSubmit={handleSaveAPIKeys} className="space-y-4">
            <div>
              <label className="text-[10px] font-extrabold text-[#A1A1AA] uppercase block mb-1.5">OpenAI API Key (Secret)</label>
              <input
                type="password"
                placeholder="sk-proj-........................"
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
                className="w-full bg-[#090909] border-2 border-[rgba(255,255,255,0.12)] rounded-[12px] px-3.5 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md">
                Save Credentials
              </Button>
            </div>
          </form>
        </Card>

      </div>

    </div>
  );
}
