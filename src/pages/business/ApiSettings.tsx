import * as React from 'react';
import { useState } from 'react';
import { 
  Key, 
  Globe, 
  ShieldCheck, 
  RefreshCw, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Code,
  Zap,
  Activity,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function ApiSettings() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const webhooks = [
    { id: 'WH-1', url: 'https://api.agrilink.ng/webhooks/lop', events: ['delivery.created', 'delivery.completed'], status: 'Active' },
    { id: 'WH-2', url: 'https://erp.internal.systems/hooks', events: ['delivery.failed'], status: 'Failing' },
  ];

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1200px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="space-y-4">
          <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">API Infrastructure.</h1>
          <p className="font-sans text-on-surface/60 max-w-2xl text-lg">Integrate LOP directly into your supply chain. Generate secure keys and configure real-time event webhooks.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          
          <div className="space-y-10">
            {/* API Keys Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Key size={16} /> Production Credentials
                </h3>
                <Button variant="ghost" size="sm" className="text-primary font-bold gap-2">
                  <RefreshCw size={14} /> Rotate Keys
                </Button>
              </div>
              
              <Card className="p-8 space-y-8 bg-surface-low border-outline-variant/10 shadow-none">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Public API Key</label>
                  <div className="flex gap-2">
                    <code className="flex-1 p-4 bg-surface-highest rounded-xl font-mono text-sm text-on-surface flex items-center overflow-x-auto whitespace-nowrap">
                      pk_live_51PqR...v0X8
                    </code>
                    <Button variant="secondary" onClick={() => copyToClipboard('pk_live_51PqR...v0X8', 'public')} className="px-4">
                      {copiedKey === 'public' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Secret API Key</label>
                    <button 
                      onClick={() => setShowSecret(!showSecret)}
                      className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                    >
                      {showSecret ? 'Hide Secret' : 'Reveal Secret'}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <code className="flex-1 p-4 bg-surface-highest rounded-xl font-mono text-sm text-on-surface flex items-center overflow-x-auto whitespace-nowrap">
                      {showSecret ? 'sk_live_94jf...K92L' : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <Button variant="secondary" onClick={() => copyToClipboard('sk_live_94jf...K92L', 'secret')} className="px-4">
                      {copiedKey === 'secret' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </Button>
                  </div>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-2">
                    <Lock size={12} /> Never share your secret key in client-side code.
                  </p>
                </div>
              </Card>
            </section>

            {/* Webhooks Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap size={16} /> Event Webhooks
                </h3>
                <Button className="gap-2">
                  <Plus size={18} /> Add Endpoint
                </Button>
              </div>

              <div className="space-y-4">
                {webhooks.map((hook) => (
                  <Card key={hook.id} className="p-6 border-outline-variant/10 hover:bg-surface-low transition-colors group">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <code className="text-sm font-bold text-on-surface truncate">{hook.url}</code>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                            hook.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          )}>{hook.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hook.events.map(event => (
                            <span key={event} className="px-2 py-1 bg-surface-highest rounded text-[10px] font-medium text-on-surface/60">
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0"><Activity size={18} /></Button>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-secondary hover:bg-secondary/5"><Trash2 size={18} /></Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <Card className="p-8 space-y-6 border-0 bg-on-surface text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary text-white rounded-lg"><Code size={20} /></div>
                  <h3 className="font-display font-bold text-xl">Developer Portal</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed font-sans">Access comprehensive documentation, SDKs, and a sandbox environment for testing.</p>
                <div className="space-y-3 pt-2">
                  <a href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                    <span className="text-sm font-bold">API Documentation</span>
                    <ExternalLink size={16} className="text-white/20 group-hover:text-primary transition-colors" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                    <span className="text-sm font-bold">Sandbox Environment</span>
                    <ExternalLink size={16} className="text-white/20 group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Globe size={150} />
              </div>
            </Card>

            <Card className="p-8 space-y-4 border-outline-variant/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Usage Statistics</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface/60">API Requests</span>
                    <span>42,840 / 50k</span>
                  </div>
                  <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-on-surface/40">Success Rate</span>
                  <span className="text-emerald-500">99.98%</span>
                </div>
              </div>
            </Card>
          </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
