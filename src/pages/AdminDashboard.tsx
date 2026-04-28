import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Users, 
  Truck, 
  Box, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Layers,
  MapPin,
  RefreshCw
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'users' | 'finance'>('overview');

  const stats = [
    { label: 'Global Throughput', val: '4,284 Tons', change: '+12.5%', trend: 'up', icon: Activity },
    { label: 'Active Corridors', val: '142 Nodes', change: '+8', trend: 'up', icon: Globe },
    { label: 'Carrier Mesh', val: '6,240', change: '+42', trend: 'up', icon: Truck },
    { label: 'Network Latency', val: '42ms', change: '-4ms', trend: 'down', icon: Zap },
  ];

  const maintenanceAlerts = [
    { hub: 'Lagos Island Hub A', issue: 'Fiber Degraded', severity: 'Critical', time: '14m ago' },
    { hub: 'Abuja Central Terminal', issue: 'High Occupancy', severity: 'Warning', time: '42m ago' },
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header Protocol */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Admin Control Plane.</h1>
            </div>
            <p className="font-sans text-on-surface/60 max-w-xl">Infrastructure-grade management for the West African Logistics Orchestration Platform.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <RefreshCw size={18} /> Resync Nodes
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/20">
               <ShieldCheck size={18} /> Security Audit
            </Button>
          </div>
        </header>

        {/* Global Telemetry */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, i) => (
             <Card key={i} className="p-8 group hover:bg-surface-high transition-all border-outline-variant/10 shadow-sm relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <stat.icon size={120} />
                </div>
                
                <div className="relative z-10 space-y-6">
                   <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <stat.icon size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                      <div className="flex items-end gap-3">
                        <h3 className="font-display font-black text-4xl text-on-surface tracking-tighter">{stat.val}</h3>
                        <div className={cn(
                          "flex items-center gap-1 text-[10px] font-bold pb-1",
                          stat.trend === 'up' ? "text-emerald-500" : "text-secondary"
                        )}>
                           {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                           {stat.change}
                        </div>
                      </div>
                   </div>
                </div>
             </Card>
           ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
           
           {/* Primary Management Region */}
           <div className="space-y-8">
              <div className="flex items-center gap-2 p-1 bg-surface-highest rounded-2xl w-fit">
                 {(['overview', 'nodes', 'users', 'finance'] as const).map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={cn(
                       "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                       activeTab === tab 
                        ? "bg-primary text-white shadow-lg shadow-primary/10" 
                        : "text-on-surface/40 hover:text-on-surface hover:bg-surface-container"
                     )}
                   >
                     {tab}
                   </button>
                 ))}
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-8">
                   {/* Corridor Health - Visualization Placeholder */}
                   <Card className="p-10 bg-on-surface text-white adire-texture overflow-hidden relative border-0">
                      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <Server className="text-primary" size={24} />
                              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Corridor Health Matrix</h3>
                           </div>
                           <p className="text-white/50 max-w-sm text-sm font-sans">Real-time status of the primary Lagos-Abuja-Kano infrastructure axis.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-12 border-l border-white/10 pl-10">
                           <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Average Uptime</p>
                              <p className="font-display font-black text-3xl">99.98%</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Sync Latency</p>
                              <p className="font-display font-black text-3xl text-emerald-400">Normal</p>
                           </div>
                        </div>
                      </div>
                      
                      {/* Mini Graph Placeholder */}
                      <div className="mt-12 h-20 w-full flex items-end gap-1 px-2">
                         {Array.from({ length: 48 }).map((_, i) => (
                           <div 
                              key={i} 
                              className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all cursor-pointer"
                              style={{ height: `${Math.random() * 100}%` }}
                           />
                         ))}
                      </div>
                   </Card>

                   {/* Recent Activity Table */}
                   <div className="space-y-4">
                      <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
                         System Logs & Events
                         <button className="text-primary font-bold hover:underline">View All</button>
                      </h3>
                      <Card className="overflow-hidden border-outline-variant/10">
                         <div className="divide-y divide-outline-variant/10">
                            {[
                              { event: 'New Business Node: Agrilink West', timestamp: '12m ago', type: 'System', status: 'Success' },
                              { event: 'Carrier Withdrawal Processed (₦840k)', timestamp: '24m ago', type: 'Finance', status: 'Success' },
                              { event: 'Corridor Handshake Timeout - Hub Lagos-B', timestamp: '42m ago', type: 'Network', status: 'Warning' },
                              { event: 'Security Protocol Upgrade - Phase 4', timestamp: '1h ago', type: 'Security', status: 'Success' },
                              { event: 'API Credential Rotation: GIG Logistics', timestamp: '2h ago', type: 'System', status: 'Success' },
                            ].map((log, i) => (
                              <div key={i} className="p-6 flex items-center justify-between hover:bg-surface-low transition-colors group">
                                 <div className="flex items-center gap-6">
                                    <div className={cn(
                                       "w-2 h-2 rounded-full",
                                       log.status === 'Success' ? "bg-emerald-500" : "bg-secondary"
                                    )}></div>
                                    <div>
                                       <p className="text-sm font-bold text-on-surface">{log.event}</p>
                                       <div className="flex items-center gap-3 mt-1">
                                          <span className="text-[10px] text-on-surface/40 font-bold uppercase tracking-widest">{log.type}</span>
                                          <span className="text-on-surface/10">•</span>
                                          <span className="text-[10px] text-on-surface/40 font-medium">{log.timestamp}</span>
                                       </div>
                                    </div>
                                 </div>
                                 <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">View Details</Button>
                              </div>
                            ))}
                         </div>
                      </Card>
                   </div>
                </div>
              )}
           </div>

           {/* Side Controls & Alerts */}
           <aside className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                   <AlertTriangle size={14} className="text-secondary" /> Critical Alerts
                </h3>
                <div className="space-y-3">
                   {maintenanceAlerts.map((alert, i) => (
                     <Card key={i} className="p-6 bg-secondary/5 border-secondary/20 space-y-3">
                        <div className="flex justify-between items-start">
                           <span className="px-2 py-0.5 bg-secondary text-white text-[9px] font-bold uppercase tracking-widest rounded-full">{alert.severity}</span>
                           <span className="text-[10px] text-on-surface/40 font-bold">{alert.time}</span>
                        </div>
                        <div>
                           <h4 className="font-display font-bold text-base leading-tight mb-1">{alert.hub}</h4>
                           <p className="text-xs text-on-surface/60 font-sans">{alert.issue}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full text-secondary hover:bg-secondary/5 h-10 border border-secondary/10">Dispatch Technician</Button>
                     </Card>
                   ))}
                </div>
              </div>

              <Card className="p-8 bg-surface-high space-y-8">
                 <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg">System Utilities</h3>
                    <p className="text-xs text-on-surface/50 leading-relaxed font-sans">Force propagation or manual node stabilization tools.</p>
                 </div>
                 
                 <div className="space-y-3">
                    <Button variant="secondary" size="md" className="w-full justify-start gap-4 h-14 bg-surface-highest">
                       <RefreshCw size={18} /> Propagate Global DNS
                    </Button>
                    <Button variant="secondary" size="md" className="w-full justify-start gap-4 h-14 bg-surface-highest">
                       <Layers size={18} /> Rebuild Mesh Map
                    </Button>
                    <Button variant="secondary" size="md" className="w-full justify-start gap-4 h-14 bg-surface-highest">
                       <MapPin size={18} /> Recalibrate Hub Nodes
                    </Button>
                 </div>
              </Card>

              {/* Network Load Indicator */}
              <Card className="p-8 bg-primary/5 border border-primary/10">
                 <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Network Load</h4>
                    <span className="text-xl font-display font-extrabold text-primary">82.4%</span>
                 </div>
                 <div className="w-full h-2.5 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '82.4%' }}
                       className="h-full bg-primary"
                    />
                 </div>
                 <p className="text-[10px] text-on-surface/40 mt-4 text-center font-bold uppercase tracking-widest">Efficiency Threshold: Nominal</p>
              </Card>
           </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
