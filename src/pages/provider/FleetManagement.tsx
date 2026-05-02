import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Ban, 
  CheckCircle2, 
  DollarSign, 
  Wallet, 
  Download,
  MapPin,
  Star,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Activity,
  Plus,
  X,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const fleetDrivers = [
  { 
    id: 'DRV-001', 
    name: 'Ibrahim Sanusi', 
    status: 'Active', 
    assignedClient: 'Agrilink West', 
    assignedZone: 'Ikeja Corridor', 
    earnings: '₦120,000', 
    deliveries: 45, 
    rating: 4.8, 
    onTime: '98%',
    pendingPayout: '₦12,000',
    vehicle: 'Van'
  },
  { 
    id: 'DRV-002', 
    name: 'David Adebayo', 
    status: 'Active', 
    assignedClient: 'Zest Fashion', 
    assignedZone: 'Lekki Node', 
    earnings: '₦95,000', 
    deliveries: 38, 
    rating: 4.7, 
    onTime: '96%',
    pendingPayout: '₦9,500',
    vehicle: 'Bike'
  },
  { 
    id: 'DRV-003', 
    name: 'Mike Johnson', 
    status: 'Offline', 
    assignedClient: 'Unassigned', 
    assignedZone: 'Unassigned', 
    earnings: '₦45,000', 
    deliveries: 18, 
    rating: 4.2, 
    onTime: '89%',
    pendingPayout: '₦0',
    vehicle: 'Truck'
  },
  { 
    id: 'DRV-004', 
    name: 'Sarah Wilson', 
    status: 'Active', 
    assignedClient: 'Unassigned', 
    assignedZone: 'Ikeja Corridor', 
    earnings: '₦78,000', 
    deliveries: 32, 
    rating: 4.9, 
    onTime: '99%',
    pendingPayout: '₦7,800',
    vehicle: 'Bike'
  },
];

export default function FleetManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const totalFleetEarnings = '₦338,000';
  const fleetWalletBalance = '₦150,000';
  const totalPendingPayouts = '₦29,300';

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Fleet Control.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Manage your carrier nodes, driver performance, and settlement distribution.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <Download size={18} /> Export Telemetry
            </Button>
            <Button onClick={() => setShowAddModal(true)} className="gap-2 shadow-2xl shadow-primary/20">
               <UserPlus size={18} /> Onboard Driver
            </Button>
          </div>
        </header>

        {/* Fleet KPI Mesh */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Carrier Nodes', val: '24', icon: Users, change: '+2 this week' },
             { label: 'Active Density', val: '18', icon: Activity, color: 'text-emerald-500', change: '75% utilization' },
             { label: 'Fleet GMV', val: totalFleetEarnings, icon: TrendingUp, change: '+12% vs last month' },
           ].map((stat, i) => (
             <Card key={i} className="p-8 border-outline-variant/10">
                <div className="flex items-center gap-4 mb-4">
                   <div className={cn("p-3 bg-surface-highest rounded-xl", stat.color || "text-primary")}>
                      <stat.icon size={24} />
                   </div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</p>
                </div>
                <h3 className="font-display font-black text-4xl text-on-surface tracking-tighter mb-1">{stat.val}</h3>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{stat.change}</p>
             </Card>
           ))}

           <Card className="p-8 bg-on-surface text-white adire-texture border-0 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6 opacity-60">
                    <Wallet size={20} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Fleet Wallet</p>
                 </div>
                 <h3 className="font-display font-black text-4xl tracking-tighter">{fleetWalletBalance}</h3>
                 <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                    {totalPendingPayouts} Pending
                 </div>
              </div>
           </Card>
        </section>

        {/* Driver Management Grid */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input 
                type="text" 
                placeholder="Search driver by name, ID or vehicle..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', 'Active', 'Offline', 'Suspended'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                    filter === s
                      ? "bg-primary text-white"
                      : "bg-surface-high text-on-surface/40 hover:text-on-surface"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-outline-variant/10">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead>
                      <tr className="border-b border-outline-variant/10 bg-surface-highest/30">
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Driver Node</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Deployment</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Performance</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Earnings</th>
                         <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-outline-variant/5">
                      {fleetDrivers.map((driver) => (
                        <tr key={driver.id} className="hover:bg-surface-low transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-surface-highest flex items-center justify-center text-on-surface/30 group-hover:text-primary transition-colors">
                                    <Users size={24} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-on-surface">{driver.name}</p>
                                    <p className="text-[10px] text-on-surface/40 font-medium uppercase tracking-tight">ID: {driver.id} • {driver.vehicle}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className={cn(
                                 "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                 driver.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                                 driver.status === 'Suspended' ? "bg-red-100 text-red-700" :
                                 "bg-surface-highest text-on-surface/40"
                              )}>
                                 <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    driver.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-on-surface/20"
                                 )}></div>
                                 {driver.status}
                              </span>
                           </td>
                           <td className="p-6">
                              <div className="space-y-1">
                                 <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                                    <Building2 size={12} className="text-on-surface/30" /> {driver.assignedClient}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] font-medium text-on-surface/40 uppercase tracking-widest">
                                    <MapPin size={10} /> {driver.assignedZone}
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <Star size={12} fill="currentColor" /> {driver.rating}
                                 </div>
                                 <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{driver.deliveries} Hauls</span>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="space-y-0.5">
                                 <p className="font-display font-bold text-on-surface text-base">{driver.earnings}</p>
                                 <p className="text-[9px] font-bold text-secondary uppercase tracking-widest">{driver.pendingPayout} Pending</p>
                              </div>
                           </td>
                           <td className="p-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 <Button variant="ghost" size="sm" className="h-10 px-4 gap-2 hover:bg-primary/5 text-primary">
                                    Manage <ChevronRight size={14} />
                                 </Button>
                                 <button className="p-2 text-on-surface/20 hover:text-on-surface transition-colors">
                                    <MoreVertical size={20} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
        </div>

        {/* Payout Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
           <section className="space-y-6">
              <div className="flex justify-between items-end px-2">
                 <div>
                    <h2 className="font-display font-bold text-2xl">Pending Settlements</h2>
                    <p className="text-sm text-on-surface/40">Verified earnings awaiting distribution to carrier nodes.</p>
                 </div>
                 <Button className="gap-2">Process All Payouts <ChevronRight size={16} /></Button>
              </div>
              <div className="space-y-3">
                 {fleetDrivers.filter(d => d.pendingPayout !== '₦0').map((d) => (
                   <Card key={d.id} className="p-6 flex items-center justify-between group hover:bg-surface-high transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                            <DollarSign size={20} />
                         </div>
                         <div>
                            <p className="font-bold text-on-surface">{d.name}</p>
                            <p className="text-[10px] text-on-surface/40 font-bold uppercase tracking-widest">{d.id} • {d.vehicle}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className="font-display font-black text-xl text-on-surface">{d.pendingPayout}</p>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Verified</p>
                         </div>
                         <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Pay Now</Button>
                      </div>
                   </Card>
                 ))}
              </div>
           </section>

           <aside className="space-y-8">
              <Card className="p-8 space-y-6 border-outline-variant/10">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-primary" /> Compliance Status
                 </h4>
                 <div className="space-y-6">
                    {[
                      { label: 'Documentation', val: 92, color: 'bg-primary' },
                      { label: 'Insurance Node', val: 100, color: 'bg-emerald-500' },
                      { label: 'Background Checks', val: 85, color: 'bg-secondary' },
                    ].map((c, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between text-xs font-bold">
                            <span className="text-on-surface/60">{c.label}</span>
                            <span>{c.val}%</span>
                         </div>
                         <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${c.val}%` }} className={cn("h-full", c.color)} />
                         </div>
                      </div>
                    ))}
                 </div>
                 <Button variant="ghost" className="w-full text-primary hover:bg-primary/5 text-xs font-bold uppercase tracking-widest">Review All Documents</Button>
              </Card>

              <Card className="p-8 bg-surface-highest/50 border-0 flex flex-col items-center gap-6 text-center">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <UserPlus size={32} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg leading-tight">Scale Your Fleet</h3>
                    <p className="text-xs text-on-surface/50">Need more vehicle capacity? Access our subsidized carrier node financing.</p>
                 </div>
                 <Button variant="secondary" size="sm" className="w-full">Explore Financing</Button>
              </Card>
           </aside>
        </div>

        {/* Modals */}
        <AnimatePresence>
           {showAddModal && (
             <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-surface rounded-[2rem] p-10 max-w-lg w-full shadow-2xl border border-outline-variant/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none"><UserPlus size={160} /></div>
                   
                   <div className="flex items-center justify-between mb-10 relative z-10">
                      <div>
                        <h2 className="font-display font-black text-3xl text-on-surface tracking-tighter">Onboard Node.</h2>
                        <p className="text-sm text-on-surface/40">Initialize a new carrier node into your fleet.</p>
                      </div>
                      <button onClick={() => setShowAddModal(false)} className="p-2 text-on-surface/40 hover:text-on-surface transition-colors"><X size={24} /></button>
                   </div>

                   <div className="space-y-6 relative z-10">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 px-2">Driver Identity</label>
                         <input type="text" placeholder="Full legal name" className="w-full px-5 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-sans" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 px-2">Vehicle Node</label>
                            <select className="w-full px-5 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-sans appearance-none">
                               <option>Bike</option>
                               <option>Van</option>
                               <option>Truck</option>
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 px-2">Gov ID / NIN</label>
                            <input type="text" placeholder="Digits only" className="w-full px-5 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-sans" />
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4 mt-12 relative z-10">
                      <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1 h-14">Cancel</Button>
                      <Button onClick={() => setShowAddModal(false)} className="flex-1 h-14 gap-2 shadow-xl shadow-primary/20">Initialize Node <ChevronRight size={18} /></Button>
                   </div>
                </motion.div>
             </div>
           )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
