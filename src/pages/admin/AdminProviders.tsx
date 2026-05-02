import * as React from 'react';
import { useState } from 'react';
import { 
  Truck, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Download,
  ChevronRight,
  Plus,
  Star,
  MapPin,
  Activity,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const providers = [
  { id: 'PRO-7721', name: 'Ibrahim Sanusi', type: 'Individual', vehicle: 'Van', status: 'Online', verified: true, rating: 4.8, jobs: 1240 },
  { id: 'PRO-7745', name: 'Zest Logistics', type: 'Corporate', vehicle: 'Mixed Fleet', status: 'Offline', verified: true, rating: 4.9, jobs: 4200 },
  { id: 'PRO-7732', name: 'David Adebayo', type: 'Individual', vehicle: 'Bike', status: 'Under Review', verified: false, rating: 0, jobs: 0 },
  { id: 'PRO-7780', name: 'City Runners', type: 'Fleet', vehicle: 'Bikes', status: 'Banned', verified: true, rating: 3.2, jobs: 840 },
];

export default function AdminProviderManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Carrier Mesh.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Logistics provider registry, background checks, and performance tiering.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <Download size={18} /> Export Registry
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/20">
               <Plus size={18} /> Onboard Provider
            </Button>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Nodes', val: '6,240', icon: Truck },
             { label: 'Active Now', val: '4,102', icon: Activity, color: 'text-emerald-500' },
             { label: 'Compliance Pending', val: '42', icon: ShieldCheck, color: 'text-secondary' },
             { label: 'Avg Rating', val: '4.7', icon: Star, color: 'text-yellow-500' },
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

        {/* Filters and Table */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID, name, or plate number..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', 'Online', 'Offline', 'Under Review', 'Banned'].map((status) => (
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
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Carrier Node</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Tier / Type</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Performance</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Compliance</th>
                         <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-outline-variant/5">
                      {providers.filter(p => filter === 'All' || p.status === filter).map((provider) => (
                        <tr key={provider.id} className="hover:bg-surface-low transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center text-on-surface/30 group-hover:text-primary transition-colors">
                                    <Truck size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-on-surface">{provider.name}</p>
                                    <p className="text-[10px] text-on-surface/40 font-medium">ID: {provider.id} • {provider.vehicle}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="space-y-1">
                                 <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase tracking-widest">
                                    {provider.jobs > 1000 ? 'Elite' : provider.jobs > 100 ? 'Pro' : 'Junior'}
                                 </span>
                                 <p className="text-[10px] text-on-surface/40 font-medium uppercase tracking-tight">{provider.type}</p>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className={cn(
                                 "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                 provider.status === 'Online' ? "bg-emerald-100 text-emerald-700" :
                                 provider.status === 'Banned' ? "bg-red-100 text-red-700" :
                                 provider.status === 'Offline' ? "bg-surface-highest text-on-surface/40" :
                                 "bg-yellow-100 text-yellow-700"
                              )}>
                                 <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    provider.status === 'Online' ? "bg-emerald-500 animate-pulse" : 
                                    provider.status === 'Banned' ? "bg-red-500" : "bg-on-surface/20"
                                 )}></div>
                                 {provider.status}
                              </span>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-2">
                                 <div className="flex text-yellow-500">
                                    <Star size={12} fill="currentColor" />
                                 </div>
                                 <span className="font-bold text-on-surface">{provider.rating}</span>
                                 <span className="text-[10px] text-on-surface/40 font-medium">({provider.jobs} hauls)</span>
                              </div>
                           </td>
                           <td className="p-6">
                              {provider.verified ? (
                                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                                   <ShieldCheck size={14} /> Background OK
                                </div>
                              ) : (
                                <button className="text-secondary font-bold text-xs hover:underline flex items-center gap-1.5">
                                   <AlertCircle size={14} /> Review Docs
                                </button>
                              )}
                           </td>
                           <td className="p-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 <Button variant="ghost" size="sm" className="h-10 px-4 gap-2 hover:bg-primary/5 text-primary">
                                    Profile <ChevronRight size={14} />
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
      </div>
    </DashboardLayout>
  );
}
