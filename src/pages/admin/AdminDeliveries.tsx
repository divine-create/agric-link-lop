import * as React from 'react';
import { useState } from 'react';
import { 
  Box, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  AlertTriangle,
  ChevronRight,
  Activity,
  Navigation,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const orders = [
  { id: 'LOP-7721', business: 'Agrilink West', provider: 'Ibrahim S.', origin: 'Ikeja', destination: 'Lekki', status: 'In Transit', urgency: 'High', eta: '12 mins' },
  { id: 'LOP-7745', business: 'Zest Fashion', provider: 'Pending', origin: 'Surulere', destination: 'Victoria Island', status: 'Pending Assignment', urgency: 'Normal', eta: '--' },
  { id: 'LOP-7732', business: 'MediDeliver', provider: 'David A.', origin: 'Yaba', destination: 'Maryland', status: 'At Pickup', urgency: 'Critical', eta: '2 mins' },
  { id: 'LOP-7780', business: 'Individual', provider: 'City Runners', origin: 'Lekki', destination: 'Ajah', status: 'Delivered', urgency: 'Normal', eta: '0 mins' },
];

export default function AdminDeliveryOperations() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Dispatch Flow.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Real-time delivery orchestration, manual dispatching, and SLA monitoring.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <Activity size={18} /> Network Map
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/20">
               <Zap size={18} /> Manual Dispatch
            </Button>
          </div>
        </header>

        {/* Live Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Active Hauls', val: '142', icon: Box },
             { label: 'Unassigned', val: '8', icon: AlertTriangle, color: 'text-secondary' },
             { label: 'Avg ETA', val: '24m', icon: Clock },
             { label: 'SLA Success', val: '98.2%', icon: CheckCircle2, color: 'text-emerald-500' },
           ].map((stat, i) => (
             <Card key={i} className="p-8 border-outline-variant/10">
                <div className="flex items-center gap-4 mb-4">
                   <div className={cn("p-3 bg-surface-highest rounded-xl", stat.color || "text-primary")}>
                      <stat.icon size={24} />
                   </div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</p>
                </div>
                <h3 className="font-display font-black text-4xl text-on-surface tracking-tighter">{stat.val}</h3>
             </Card>
           ))}
        </section>

        {/* Orders Table */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input 
                type="text" 
                placeholder="Search by Order ID, Business, or Provider..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', 'In Transit', 'Pending Assignment', 'At Pickup', 'Delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                    filter === status
                      ? "bg-primary text-white"
                      : "bg-surface-high text-on-surface/40 hover:text-on-surface"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-outline-variant/10">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead>
                      <tr className="border-b border-outline-variant/10 bg-surface-highest/30">
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Order Node</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Corridor (O → D)</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Carrier</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Telemetry</th>
                         <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-outline-variant/5">
                      {orders.filter(o => filter === 'All' || o.status === filter).map((order) => (
                        <tr key={order.id} className="hover:bg-surface-low transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center text-on-surface/30 group-hover:text-primary transition-colors">
                                    <Box size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-on-surface">{order.id}</p>
                                    <p className="text-[10px] text-on-surface/40 font-medium">{order.business}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-3">
                                 <div className="text-xs font-bold text-on-surface">{order.origin}</div>
                                 <ArrowRight size={12} className="text-on-surface/20" />
                                 <div className="text-xs font-bold text-on-surface">{order.destination}</div>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-2">
                                 <Truck size={14} className="text-on-surface/30" />
                                 <span className={cn(
                                    "font-bold text-xs",
                                    order.provider === 'Pending' ? "text-secondary" : "text-on-surface"
                                 )}>{order.provider}</span>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className={cn(
                                 "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                 order.status === 'Delivered' ? "bg-emerald-100 text-emerald-700" :
                                 order.status === 'Pending Assignment' ? "bg-secondary/10 text-secondary" :
                                 "bg-primary/10 text-primary"
                              )}>
                                 {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : 
                                  order.status === 'Pending Assignment' ? <AlertTriangle size={12} /> : <Activity size={12} className="animate-pulse" />}
                                 {order.status}
                              </span>
                           </td>
                           <td className="p-6">
                              <div className="space-y-1">
                                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
                                    <Clock size={12} /> ETA: {order.eta}
                                 </div>
                                 <div className={cn(
                                    "text-[9px] font-bold uppercase tracking-[0.2em]",
                                    order.urgency === 'Critical' ? "text-secondary" : "text-primary"
                                 )}>{order.urgency} Urgency</div>
                              </div>
                           </td>
                           <td className="p-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 <Link to={`/track/${order.id}`}>
                                    <Button variant="ghost" size="sm" className="h-10 px-4 gap-2 hover:bg-primary/5 text-primary">
                                       Track <Navigation size={14} />
                                    </Button>
                                 </Link>
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
      </div>
    </DashboardLayout>
  );
}
