import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Key, 
  Shield, 
  Smartphone, 
  Zap, 
  CreditCard,
  LogOut,
  Camera,
  ExternalLink,
  ChevronRight,
  Plus,
  Settings
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Infrastructure Profile', icon: User },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Signal Settings', icon: Bell },
    { id: 'integrations', label: 'API & Integrations', icon: Zap },
    { id: 'billing', label: 'Settlement Account', icon: CreditCard },
  ];

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Header Section */}
        <section>
          <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">Control Plane.</h1>
          <p className="font-sans text-on-surface/60">Configure your platform nodes, security barriers, and infrastructure integrations.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="space-y-2">
            <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-4 mb-4">Configuration Tiers</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-sans font-bold text-sm",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-on-surface/50 hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
                {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            ))}
            
            <div className="pt-8 mt-8 border-t border-outline-variant/10">
               <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-secondary hover:bg-secondary/5 font-sans font-bold text-sm transition-all">
                 <LogOut size={20} />
                 <span>Terminate Session</span>
               </button>
            </div>
          </aside>

          {/* Settings Content */}
          <div className="space-y-8">
            
            {activeTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Profile Header */}
                <Card className="p-8 bg-surface-low overflow-hidden relative border-0">
                  <div className="absolute top-0 right-0 p-8 text-on-surface/5">
                    <User size={160} strokeWidth={1} />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                       <div className="w-32 h-32 rounded-[2.5rem] bg-surface-container border-4 border-surface shadow-xl overflow-hidden flex items-center justify-center">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
                       </div>
                       <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                         <Camera size={18} />
                       </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="font-display font-bold text-3xl mb-2 text-on-surface">Emeka Onu</h2>
                      <p className="text-on-surface/60 mb-6 max-w-sm">Senior Logistics Coordinator at Agrilink Africa. Node verified since 2024.</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="px-4 py-2 bg-primary/10 rounded-full flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Business Console</span>
                        </div>
                        <div className="px-4 py-2 bg-secondary/10 rounded-full flex items-center gap-2">
                           <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Tier 02 Access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Form Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Public Hub Name</label>
                    <input type="text" defaultValue="Emeka Onu" className="w-full bg-surface-low border-outline-variant/20 rounded-2xl p-4 font-sans font-medium focus:ring-primary/20 text-on-surface" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">System Primary Email</label>
                    <input type="email" defaultValue="emeka.onu@agrilink.io" className="w-full bg-surface-low border-outline-variant/20 rounded-2xl p-4 font-sans font-medium focus:ring-primary/20 text-on-surface" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Node Phone</label>
                    <input type="text" defaultValue="+234 812 345 6789" className="w-full bg-surface-low border-outline-variant/20 rounded-2xl p-4 font-sans font-medium focus:ring-primary/20 text-on-surface" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Timezone Sync</label>
                    <select className="w-full bg-surface-low border-outline-variant/20 rounded-2xl p-4 font-sans font-medium focus:ring-primary/20 text-on-surface">
                      <option>West Africa Time (UTC+1)</option>
                      <option>Greenwich Mean Time (UTC+0)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/5">
                  <Button variant="secondary" size="md">Discard Shifts</Button>
                  <Button variant="primary" size="md">Apply Configurations</Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between px-2">
                  <h2 className="font-display font-bold text-2xl">Infrastructure Webhooks</h2>
                  <Button variant="secondary" size="sm" className="gap-2"><Plus size={16} /> New Endpoint</Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'National Dispatch Sync', url: 'https://api.agrilink.io/v1/lop/webhook', status: 'Active', latency: '42ms' },
                    { name: 'Customer Notifications', url: 'https://hooks.slack.com/services/T0123/B0124', status: 'Active', latency: '124ms' },
                  ].map((hook, idx) => (
                    <Card key={idx} className="p-6 bg-surface-low flex flex-col md:flex-row items-center gap-6 group">
                      <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <Zap size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-display font-bold text-lg">{hook.name}</h4>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-widest rounded-full">{hook.status}</span>
                        </div>
                        <p className="text-xs text-on-surface/40 font-mono truncate">{hook.url}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">P99 Latency</p>
                        <p className="text-sm font-bold text-primary">{hook.latency}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="bg-primary-container text-white p-10 adire-texture overflow-hidden relative border-0">
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-md">
                      <h3 className="font-display font-bold text-2xl mb-4">API Infrastructure Keys</h3>
                      <p className="text-sm opacity-70 leading-relaxed mb-8">Your secret keys are the foundation of your node's authentication. Protect them like physical assets.</p>
                      <Button variant="primary" className="bg-white text-primary-container hover:bg-surface-container-high transition-all">Generate New Production Key</Button>
                    </div>
                    <div className="shrink-0 p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                       <Key size={64} className="opacity-50" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab !== 'profile' && activeTab !== 'integrations' && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-surface-highest rounded-full flex items-center justify-center text-on-surface/10">
                  <Settings size={48} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-on-surface mb-2">{tabs.find(t => t.id === activeTab)?.label} Configuration</h3>
                  <p className="text-on-surface/40 max-w-sm mx-auto leading-relaxed">This section of the control plane is currently optimized for internal beta access. Detailed settings will materialize in the next infrastructure update.</p>
                </div>
                <Button variant="secondary">Go back to Profile</Button>
              </div>
            )}

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

