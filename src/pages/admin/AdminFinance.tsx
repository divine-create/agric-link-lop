import * as React from 'react';
import { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  CreditCard, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ChevronRight,
  Activity,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

const transactions = [
  { id: 'TX-8391', entity: 'Agrilink West', type: 'Wallet Funding', amount: '₦1,200,000', method: 'Bank Transfer', status: 'Completed', date: '2025-04-25 14:20' },
  { id: 'TX-8395', entity: 'Ibrahim Sanusi', type: 'Carrier Payout', amount: '₦45,200', method: 'Bank Payout', status: 'Processing', date: '2025-04-25 15:45' },
  { id: 'TX-8402', entity: 'Zest Fashion', type: 'Delivery Charge', amount: '₦12,400', method: 'Wallet Debit', status: 'Completed', date: '2025-04-25 16:10' },
  { id: 'TX-8410', entity: 'MediDeliver', type: 'Refund', amount: '₦8,500', method: 'Wallet Credit', status: 'Pending', date: '2025-04-25 17:00' },
];

export default function AdminFinanceManagement() {
  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight">Financial Core.</h1>
            <p className="font-sans text-on-surface/60 max-w-xl">Platform P&L, provider payout orchestration, and treasury management.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
               <FileText size={18} /> Tax Reports
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/20">
               <DollarSign size={18} /> Bulk Payouts
            </Button>
          </div>
        </header>

        {/* Financial KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Platform GMV', val: '₦142.8M', change: '+18%', trend: 'up', icon: BarChart3 },
             { label: 'Net Commission', val: '₦21.4M', change: '+12%', trend: 'up', icon: TrendingUp, color: 'text-emerald-500' },
             { label: 'Carrier Payouts', val: '₦114.2M', change: '+15%', trend: 'up', icon: Wallet },
             { label: 'VAT Liability', val: '₦7.2M', change: '+10%', trend: 'up', icon: FileText, color: 'text-secondary' },
           ].map((stat, i) => (
             <Card key={i} className="p-8 border-outline-variant/10 group hover:bg-surface-high transition-all">
                <div className="flex items-center gap-4 mb-4">
                   <div className={cn("p-3 bg-surface-highest rounded-xl group-hover:scale-110 transition-transform", stat.color || "text-primary")}>
                      <stat.icon size={24} />
                   </div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{stat.label}</p>
                </div>
                <div className="flex items-end gap-3">
                   <h3 className="font-display font-black text-3xl text-on-surface tracking-tighter">{stat.val}</h3>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 pb-1">
                      <ArrowUpRight size={12} />
                      {stat.change}
                   </div>
                </div>
             </Card>
           ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
           
           {/* Transaction Ledger */}
           <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                 <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em]">Transaction Ledger</h3>
                 <button className="text-primary text-xs font-bold hover:underline">View All History</button>
              </div>
              <Card className="overflow-hidden border-outline-variant/10">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                       <thead>
                          <tr className="border-b border-outline-variant/10 bg-surface-highest/30">
                             <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Reference</th>
                             <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Entity</th>
                             <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Amount</th>
                             <th className="text-left p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                             <th className="text-right p-6 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-outline-variant/5">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-surface-low transition-colors group">
                               <td className="p-6">
                                  <div className="space-y-1">
                                     <p className="font-bold text-on-surface">{tx.id}</p>
                                     <p className="text-[10px] text-on-surface/40 font-medium uppercase tracking-tight">{tx.type}</p>
                                  </div>
                               </td>
                               <td className="p-6 text-on-surface/70 font-medium">{tx.entity}</td>
                               <td className="p-6">
                                  <p className={cn(
                                     "font-display font-bold text-base",
                                     tx.type === 'Carrier Payout' ? "text-secondary" : "text-emerald-600"
                                  )}>{tx.type === 'Carrier Payout' ? `-${tx.amount}` : `+${tx.amount}`}</p>
                               </td>
                               <td className="p-6">
                                  <span className={cn(
                                     "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                     tx.status === 'Completed' ? "bg-emerald-100 text-emerald-700" :
                                     tx.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                                     "bg-yellow-100 text-yellow-700"
                                  )}>
                                     {tx.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                     {tx.status}
                                  </span>
                               </td>
                               <td className="p-6 text-right">
                                  <button className="p-2 text-on-surface/20 hover:text-on-surface transition-colors">
                                     <MoreVertical size={20} />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </Card>
           </div>

           {/* Treasury Side Profile */}
           <aside className="space-y-8">
              <Card className="p-8 bg-on-surface text-white adire-texture border-0 shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Platform Treasury</p>
                          <h3 className="font-display font-black text-4xl tracking-tighter">₦842,400,000</h3>
                       </div>
                       <div className="p-3 bg-white/10 rounded-2xl text-primary"><Activity size={24} /></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                       <div>
                          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">In-Transit Funds</p>
                          <p className="font-display font-bold text-xl">₦12.4M</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Pending Payouts</p>
                          <p className="font-display font-bold text-xl text-secondary">₦4.2M</p>
                       </div>
                    </div>

                    <Button className="w-full h-14 bg-white text-on-surface hover:bg-surface font-bold gap-2">
                       <CreditCard size={18} /> Treasury Controls <ChevronRight size={18} />
                    </Button>
                 </div>
              </Card>

              <Card className="p-8 space-y-6">
                 <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em]">Revenue Mix</h3>
                 <div className="space-y-6">
                    {[
                      { label: 'Commission (15%)', val: 75, color: 'bg-primary' },
                      { label: 'Platform Fees', val: 15, color: 'bg-secondary' },
                      { label: 'Surge Premium', val: 10, color: 'bg-on-surface' },
                    ].map((mix, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between text-xs font-bold">
                            <span className="text-on-surface/60">{mix.label}</span>
                            <span>{mix.val}%</span>
                         </div>
                         <div className="h-2 bg-surface-highest rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${mix.val}%` }}
                               className={cn("h-full", mix.color)}
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>
           </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
