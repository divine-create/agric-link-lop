import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Plus, 
  Search, 
  TrendingUp, 
  Clock, 
  Activity, 
  ShieldCheck,
  ChevronRight,
  Filter,
  MoreVertical
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function AdminRoutes() {
  const [activeTab, setActiveTab] = useState<'corridors' | 'nodes'>('corridors');

  const corridors = [
    { title: 'Lagos → Abuja', status: 'Optimal', throughput: '124 hauls/day', latency: '42ms', risk: 'Low', nodes: 8 },
    { title: 'Kano → Port Harcourt', status: 'Congested', throughput: '82 hauls/day', latency: '124ms', risk: 'Medium', nodes: 14 },
    { title: 'Ibadan → Lagos Hub', status: 'High Prio', throughput: '240 hauls/day', latency: '15ms', risk: 'Minimal', nodes: 4 },
  ];

  const nodes = [
    { name: 'Lagos Central Hub A-2', type: 'Primary Hub', status: 'Online', efficiency: '98.4%' },
    { name: 'Abuja Transit Terminal', type: 'Node', status: 'Online', efficiency: '97.2%' },
    { name: 'Onitsha Bridge Node', type: 'Relay', status: 'Warning', efficiency: '84.1%' },
    { name: 'Kano North Logistics', type: 'Primary Hub', status: 'Online', efficiency: '99.1%' },
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Page Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Network Topography</span>
                 <span className="text-xs font-bold text-on-surface/40 uppercase tracking-widest leading-none flex items-center gap-2">
                    <Activity size={14} className="text-emerald-500" /> All Nodes Active
                 </span>
              </div>
              <h1 className="font-display font-extrabold text-[40px] md:text-[56px] text-on-surface leading-tight tracking-tighter">Route & Destination.</h1>
              <p className="text-lg text-on-surface/50 max-w-xl font-sans font-medium">Manage your private corridor mesh and destination node network.</p>
           </div>
           <div className="flex gap-4">
              <Button variant="secondary" className="gap-2">Export Telemetry</Button>
              <Button className="gap-2"><Plus size={18} /> Add New Node</Button>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
           
           <div className="space-y-8">
              {/* Network Map Visual */}
              <Card className="p-0 overflow-hidden relative h-[400px] border-0 shadow-xl bg-surface-highest">
                 <div className="absolute inset-0 adire-texture opacity-[0.03] pointer-events-none" />
                 <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                    alt="Network Map" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
                 />
                 
                 {/* Simulated Node Markers */}
                 <div className="absolute inset-0 p-12">
                    <div className="relative w-full h-full">
                       {/* Connection Lines (Simulated) */}
                       <svg className="absolute inset-0 w-full h-full opacity-20 text-primary">
                          <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
                          <line x1="20%" y1="30%" x2="40%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
                       </svg>

                       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-[28%] left-[18%]">
                          <div className="p-2 bg-primary text-white rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform">
                             <MapPin size={20} />
                          </div>
                          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface px-3 py-1 rounded-lg shadow-sm border border-outline-variant/10">
                             <p className="text-[10px] font-bold">Lagos Hub</p>
                          </div>
                       </motion.div>

                       <div className="absolute top-[68%] left-[78%]">
                          <div className="p-2 bg-surface text-on-surface rounded-xl shadow-lg border border-outline-variant/20 cursor-pointer">
                             <Navigation size={20} className="text-secondary" />
                          </div>
                          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface px-3 py-1 rounded-lg shadow-sm border border-outline-variant/10">
                             <p className="text-[10px] font-bold">Abuja Node</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-6 left-6 p-4 bg-surface/80 backdrop-blur-md rounded-2xl border border-outline-variant/10 flex gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-primary rounded-full" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/60">Primary Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-secondary rounded-full" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/60">Transit Node</span>
                    </div>
                 </div>
              </Card>

              {/* Tabbed View */}
              <div className="space-y-6">
                 <div className="flex gap-8 border-b border-outline-variant/10 px-4">
                    <button 
                       onClick={() => setActiveTab('corridors')}
                       className={cn(
                          "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                          activeTab === 'corridors' ? "text-primary" : "text-on-surface/40 hover:text-on-surface"
                       )}
                    >
                       Active Corridors
                       {activeTab === 'corridors' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                    <button 
                       onClick={() => setActiveTab('nodes')}
                       className={cn(
                          "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                          activeTab === 'nodes' ? "text-primary" : "text-on-surface/40 hover:text-on-surface"
                       )}
                    >
                       Network Nodes
                       {activeTab === 'nodes' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                    {activeTab === 'corridors' ? (
                       corridors.map((c, i) => (
                          <Card key={i} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-surface-high transition-colors group">
                             <div className="flex items-center gap-6">
                                <div className="p-4 bg-surface-highest rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                   <Navigation size={24} />
                                </div>
                                <div>
                                   <h3 className="font-display font-bold text-2xl mb-1">{c.title}</h3>
                                   <div className="flex gap-4 text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">
                                      <span className="text-primary">{c.status}</span>
                                      <span>• {c.nodes} Active Nodes</span>
                                   </div>
                                </div>
                             </div>
                             <div className="flex gap-10 text-right">
                                <div>
                                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Throughput</p>
                                   <p className="font-display font-bold text-lg">{c.throughput}</p>
                                </div>
                                <div className="border-l border-outline-variant/10 pl-10">
                                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Risk</p>
                                   <p className={cn(
                                      "font-display font-bold text-lg",
                                      c.risk === 'Low' || c.risk === 'Minimal' ? "text-primary" : "text-secondary"
                                   )}>{c.risk}</p>
                                </div>
                             </div>
                          </Card>
                       ))
                    ) : (
                       nodes.map((n, i) => (
                          <Card key={i} className="p-8 flex items-center justify-between gap-8 hover:bg-surface-high transition-colors group">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-surface-highest rounded-xl flex items-center justify-center text-on-surface/40 group-hover:text-primary transition-colors">
                                   <MapPin size={24} />
                                </div>
                                <div>
                                   <h3 className="font-display font-bold text-xl mb-1">{n.name}</h3>
                                   <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">{n.type}</p>
                                </div>
                             </div>
                             <div className="flex gap-8 items-center">
                                <div className="text-right">
                                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Efficiency Rating</p>
                                   <p className="font-display font-bold text-lg">{n.efficiency}</p>
                                </div>
                                <div className={cn(
                                   "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-inner",
                                   n.status === 'Online' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                                )}>
                                   {n.status}
                                </div>
                                <button className="p-2 text-on-surface/20 hover:text-on-surface"><MoreVertical size={16} /></button>
                             </div>
                          </Card>
                       ))
                    )}
                 </div>
              </div>
           </div>

           <aside className="space-y-8">
              <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Network Insights</h3>
              <Card className="p-8 space-y-8">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <TrendingUp size={16} className="text-primary" />
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40">Growth Telemetry</h4>
                    </div>
                    <div className="p-6 bg-surface-low rounded-2xl border border-outline-variant/10 space-y-4">
                       <div>
                          <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">New Destinations (30d)</p>
                          <p className="font-display font-extrabold text-3xl text-on-surface">+12</p>
                       </div>
                       <div className="h-1 bg-surface-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '68%' }}></div>
                       </div>
                    </div>
                 </div>

                 <Card className="bg-primary/5 border-primary/10 p-6 space-y-4">
                    <ShieldCheck size={24} className="text-primary" />
                    <h4 className="font-display font-bold text-lg leading-tight">Optimized Mesh Active</h4>
                    <p className="text-xs text-on-surface/50 leading-relaxed font-sans font-medium">
                       Your corridor mesh is currently performing at 98.4% efficiency. No route diverts recommended.
                    </p>
                 </Card>

                 <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 flex items-center gap-2">
                       <Clock size={14} /> Latency Benchmarks
                    </h4>
                    <div className="space-y-4 bg-surface-highest p-4 rounded-xl font-mono text-[10px]">
                       <div className="flex justify-between">
                          <span className="text-on-surface/40">LAG-HUB → ABJ-NODE</span>
                          <span className="text-emerald-500 font-bold">42ms</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-on-surface/40">PH-HUB → KAN-HUB</span>
                          <span className="text-secondary font-bold">124ms</span>
                       </div>
                    </div>
                 </div>
              </Card>

              <Card className="bg-surface-container-high p-8 flex flex-col items-center gap-6 text-center border-0">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm"><Plus size={32} /></div>
                 <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg leading-tight">Request Infrastructure <br/> Hub Deployment</h3>
                    <p className="text-xs text-on-surface/50">Need a dedicated LOP hub at your warehouse? Speak with our topography engineers.</p>
                 </div>
                 <Button variant="secondary" size="sm" className="w-full">Consult Engineer</Button>
              </Card>
           </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
