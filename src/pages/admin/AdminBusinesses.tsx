import * as React from 'react';
import { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Download,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const businesses = [
  { id: 'BUS-1021', name: 'Agrilink West', category: 'Agriculture', status: 'Active', verified: true, balance: '₦2,450,000', joined: '2025-01-12' },
  { id: 'BUS-1024', name: 'Zest Fashion', category: 'E-commerce', status: 'Pending Approval', verified: false, balance: '₦0', joined: '2025-04-20' },
  { id: 'BUS-1030', name: 'MediDeliver', category: 'Healthcare', status: 'Suspended', verified: true, balance: '₦120,400', joined: '2025-02-15' },
  { id: 'BUS-1035', name: 'Green Produce Ltd', category: 'Agriculture', status: 'Active', verified: true, balance: '₦840,000', joined: '2025-03-01' },
];

export default function AdminBusinessManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Entity Registry.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Business client onboarding, KYB verification, and custom rate management.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <Download size={18} /> Export Registry
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/20">
               <Plus size={18} /> Add Business
            </Button>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Total Entities', val: '1,240', icon: Building2 },
             { label: 'Pending KYB', val: '12', icon: ShieldCheck, color: 'text-secondary' },
             { label: 'Active Capital', val: '₦84.2M', icon: FileText },
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
                placeholder="Search by ID, name, or RC number..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Active', 'Pending Approval', 'Suspended'].map((status) => (
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
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Business Entity</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Category</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">KYB</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Wallet</th>
                         <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-outline-variant/5">
                      {businesses.filter(b => filter === 'All' || b.status === filter).map((biz) => (
                        <tr key={biz.id} className="hover:bg-surface-low transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center text-on-surface/30 group-hover:text-primary transition-colors">
                                    <Building2 size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-on-surface">{biz.name}</p>
                                    <p className="text-[10px] text-on-surface/40 font-medium">ID: {biz.id} • Joined {biz.joined}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className="px-2 py-1 bg-surface-highest rounded text-xs font-bold text-on-surface/60">{biz.category}</span>
                           </td>
                           <td className="p-6">
                              <span className={cn(
                                 "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                 biz.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                                 biz.status === 'Suspended' ? "bg-red-100 text-red-700" :
                                 "bg-yellow-100 text-yellow-700"
                              )}>
                                 {biz.status === 'Active' ? <CheckCircle2 size={12} /> : 
                                  biz.status === 'Suspended' ? <XCircle size={12} /> : <Clock size={12} />}
                                 {biz.status}
                              </span>
                           </td>
                           <td className="p-6">
                              {biz.verified ? (
                                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                                   <ShieldCheck size={14} /> Verified
                                </div>
                              ) : (
                                <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1.5">
                                   <FileText size={14} /> Review KYB
                                </button>
                              )}
                           </td>
                           <td className="p-6">
                              <p className="font-display font-bold text-on-surface">{biz.balance}</p>
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
      </div>
    </DashboardLayout>
  );
}
