import * as React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, Banknote, History, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function IndividualWallet() {
  const transactions = [
    { id: 'TX-9021', type: 'Delivery Payment', amount: '- ₦12,400', date: 'Oct 23, 2026', status: 'Completed' },
    { id: 'TX-9015', type: 'Wallet Top-up', amount: '+ ₦50,000', date: 'Oct 21, 2026', status: 'Completed' },
    { id: 'TX-9012', type: 'Refund', amount: '+ ₦4,500', date: 'Oct 20, 2026', status: 'Completed' },
  ];

  return (
    <DashboardLayout userType="individual">
      <div className="max-w-[1100px] mx-auto space-y-10">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">My Wallet.</h1>
            <p className="font-sans text-on-surface/60">Manage your credits and payment history.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link to="/topup" className="flex-1 md:flex-none">
              <Button className="w-full gap-2">
                <Plus size={18} /> Top up Wallet
              </Button>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-8 bg-primary text-white adire-texture relative overflow-hidden group border-0 shadow-2xl">
             <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-4">Available Balance</p>
               <h2 className="font-display font-extrabold text-5xl mb-8">₦42,600</h2>
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/80 bg-white/10 w-fit px-3 py-1 rounded-full">
                  <Zap size={14} /> Local Credits
               </div>
             </div>
          </Card>

          <Card className="p-8 space-y-6">
             <div className="flex items-center justify-between">
                <div className="p-3 bg-primary/10 text-primary rounded-xl"><ArrowUpRight size={24} /></div>
             </div>
             <div>
               <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Total Spent</p>
               <p className="font-display font-extrabold text-3xl">₦124.2k</p>
             </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
           <section className="space-y-6">
              <h2 className="font-display font-bold text-2xl px-2">Recent Transactions</h2>
              <div className="space-y-3">
                 {transactions.map((tx) => (
                   <div key={tx.id} className="flex items-center justify-between p-6 bg-surface-low rounded-2xl hover:bg-surface-container transition-all">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-3 rounded-xl",
                          tx.amount.startsWith('+') ? "bg-emerald-100 text-emerald-600" : "bg-primary/10 text-primary"
                        )}>
                           {tx.amount.startsWith('+') ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                           <p className="font-display font-bold text-sm mb-0.5">{tx.type}</p>
                           <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">{tx.date}</p>
                        </div>
                      </div>
                      <p className={cn(
                         "font-display font-extrabold text-lg",
                         tx.amount.startsWith('+') ? "text-emerald-600" : "text-on-surface"
                      )}>{tx.amount}</p>
                   </div>
                 ))}
              </div>
           </section>

           <aside className="space-y-8">
              <Card className="p-8 bg-surface-high border border-outline-variant/10 relative overflow-hidden">
                 <CreditCard size={32} className="text-on-surface/20 mb-8" />
                 <p className="font-mono text-xl tracking-wider text-on-surface">•••• •••• •••• 4412</p>
                 <p className="text-[8px] font-bold text-on-surface/30 uppercase tracking-widest mt-4">DAVID ADEBAYO</p>
              </Card>
           </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
