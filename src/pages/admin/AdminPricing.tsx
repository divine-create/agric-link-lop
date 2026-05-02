import * as React from 'react';
import { useState } from 'react';
import { 
  MapPin, 
  Search, 
  MoreVertical, 
  Plus, 
  Map, 
  DollarSign, 
  TrendingUp, 
  Layers, 
  Edit3, 
  Trash2, 
  ChevronRight,
  Zap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const zones = [
  { id: 'ZN-001', name: 'Lagos Core (Tier 1)', baseFee: '₦1,200', perKm: '₦150', providers: 1240, status: 'Active' },
  { id: 'ZN-002', name: 'Abuja Central', baseFee: '₦1,500', perKm: '₦180', providers: 840, status: 'Active' },
  { id: 'ZN-003', name: 'Rural North Corridor', baseFee: '₦2,500', perKm: '₦220', providers: 120, status: 'Restricted' },
  { id: 'ZN-004', name: 'Port Harcourt Industrial', baseFee: '₦1,800', perKm: '₦200', providers: 450, status: 'Active' },
];

export default function AdminPricingZones() {
  const [search, setSearch] = useState('');

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Economic Mesh.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Geographic zone definitions, base fee orchestration, and dynamic surge rules.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <Map size={18} /> Zone Builder
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/20">
               <Plus size={18} /> Define New Zone
            </Button>
          </div>
        </header>

        {/* Pricing Strategy Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Card className="p-8 space-y-6 border-outline-variant/10 bg-primary/5">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary text-white rounded-lg"><Zap size={20} /></div>
                 <h3 className="font-display font-bold text-xl">Surge Protocol</h3>
              </div>
              <p className="text-sm text-on-surface/60 leading-relaxed font-sans">Dynamic multipliers currently active in **4 zones** due to high demand/low node density.</p>
              <div className="flex items-center justify-between pt-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Current Multiplier</span>
                 <span className="font-display font-black text-2xl text-primary">1.4x - 2.2x</span>
              </div>
              <Button variant="secondary" className="w-full">Manage Surge Rules</Button>
           </Card>

           <Card className="p-8 space-y-6 border-outline-variant/10">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-secondary text-white rounded-lg"><Layers size={20} /></div>
                 <h3 className="font-display font-bold text-xl">Service Fees</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Standard Express', fee: '+15%' },
                   { label: 'Cold-Chain Logistics', fee: '₦2,500 flat' },
                   { label: 'Heavy/Bulk Cargo', fee: 'Variable' },
                 ].map((fee, i) => (
                   <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-on-surface/60 font-medium">{fee.label}</span>
                      <span className="font-bold text-on-surface">{fee.fee}</span>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-primary hover:bg-primary/5">Edit Service Tiers</Button>
           </Card>

           <Card className="p-8 space-y-6 border-outline-variant/10">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-on-surface text-white rounded-lg"><ShieldCheck size={20} /></div>
                 <h3 className="font-display font-bold text-xl">Tax & Compliance</h3>
              </div>
              <p className="text-sm text-on-surface/60 leading-relaxed font-sans">Nigeria Federal VAT (7.5%) is automatically applied to all non-exempt orchestrations.</p>
              <div className="pt-2">
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-on-surface/40 mb-1">
                    <span>Tax Status</span>
                    <span className="text-emerald-500">Active</span>
                 </div>
                 <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full"></div>
                 </div>
              </div>
              <Button variant="ghost" className="w-full text-on-surface/40 hover:text-on-surface">View Tax Ledger</Button>
           </Card>
        </section>

        {/* Zones Table */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input 
                type="text" 
                placeholder="Search zones by name or ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>
          </div>

          <Card className="overflow-hidden border-outline-variant/10">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead>
                      <tr className="border-b border-outline-variant/10 bg-surface-highest/30">
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Zone Entity</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Base Fee</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">KM Rate</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Node Density</th>
                         <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                         <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-outline-variant/5">
                      {zones.map((zone) => (
                        <tr key={zone.id} className="hover:bg-surface-low transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center text-on-surface/30 group-hover:text-primary transition-colors">
                                    <MapPin size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-on-surface">{zone.name}</p>
                                    <p className="text-[10px] text-on-surface/40 font-medium">ID: {zone.id}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <p className="font-display font-bold text-on-surface">{zone.baseFee}</p>
                           </td>
                           <td className="p-6">
                              <p className="font-display font-bold text-on-surface">{zone.perKm}</p>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-2">
                                 <span className="font-bold text-on-surface">{zone.providers}</span>
                                 <span className="text-[10px] text-on-surface/40 font-medium">Nodes</span>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className={cn(
                                 "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                 zone.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                              )}>
                                 {zone.status === 'Active' ? <CheckCircle2 size={12} /> : <Trash2 size={12} />}
                                 {zone.status}
                              </span>
                           </td>
                           <td className="p-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 <Button variant="ghost" size="sm" className="h-10 px-4 gap-2 hover:bg-primary/5 text-primary">
                                    Edit <Edit3 size={14} />
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
