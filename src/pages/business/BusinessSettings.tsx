import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  User, 
  Shield, 
  Bell, 
  Zap, 
  CreditCard,
  LogOut,
  Camera,
  ChevronRight,
  Plus,
  Settings
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function BusinessSettings() {
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
        <section>
          <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">Control Plane.</h1>
          <p className="font-sans text-on-surface/60">Configure your platform nodes, security barriers, and infrastructure integrations.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
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

          <div className="space-y-8">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <Card className="p-8 bg-surface-low border-0">
                  <div className="flex items-center gap-10">
                    <div className="relative group">
                       <div className="w-32 h-32 rounded-[2.5rem] bg-surface-container overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
                       </div>
                       <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                         <Camera size={18} />
                       </button>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display font-bold text-3xl mb-2 text-on-surface">Emeka Onu</h2>
                      <p className="text-on-surface/60 mb-6 max-w-sm text-sm">Senior Logistics Coordinator at Agrilink Africa. Node verified since 2024.</p>
                      <div className="flex gap-4">
                        <div className="px-4 py-2 bg-primary/10 rounded-full flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" /> Business Console
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['Public Hub Name', 'System Primary Email', 'Node Phone'].map((label, i) => (
                    <div key={i} className="space-y-4">
                      <label className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">{label}</label>
                      <input type="text" className="w-full bg-surface-low border border-outline-variant/20 rounded-2xl p-4 font-sans font-medium focus:ring-primary/20 text-on-surface" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab !== 'profile' && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-surface-highest rounded-full flex items-center justify-center text-on-surface/10">
                  <Settings size={48} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-on-surface mb-2">{tabs.find(t => t.id === activeTab)?.label}</h3>
                  <p className="text-on-surface/40 max-w-sm mx-auto leading-relaxed text-sm">This section of the control plane is currently under maintenance. Detailed settings will materialize in the next infrastructure update.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
