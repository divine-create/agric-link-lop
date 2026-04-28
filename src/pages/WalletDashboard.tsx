import * as React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, Banknote, History, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function WalletDashboard() {
  // In a real app, this would be fetched based on auth
  const userType: 'business' | 'provider' = window.location.pathname.includes('earnings') ? 'provider' : 'business';

  const transactions = [
    { id: 'TX-9021', type: 'Settlement', amount: '+ ₦12,400', date: 'Oct 23, 2026', status: 'Completed' },
    { id: 'TX-9018', type: 'Platform Fee', amount: '- ₦2,500', date: 'Oct 22, 2026', status: 'Completed' },
    { id: 'TX-9015', type: 'Wallet Top-up', amount: '+ ₦50,000', date: 'Oct 21, 2026', status: 'Completed' },
    { id: 'TX-9012', type: 'Insurance Payout', amount: '+ ₦450,000', date: 'Oct 20, 2026', status: 'Completed' },
  ];

  return (
    <DashboardLayout userType={userType}>
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">Finance Hub.</h1>
            <p className="font-sans text-on-surface/60">Manage your infrastructure liquidity and settlement pipeline.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="secondary" className="flex-1 md:flex-none gap-2">
              <History size={18} /> Statements
            </Button>
            {userType === 'business' ? (
              <Link to="/topup" className="flex-1 md:flex-none">
                <Button className="w-full gap-2">
                  <Plus size={18} /> Top up Wallet
                </Button>
              </Link>
            ) : (
              <Button className="flex-1 md:flex-none gap-2">
                <Plus size={18} /> Withdraw Funds
              </Button>
            )}
          </div>
        </section>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-8 bg-primary-container text-white adire-texture relative overflow-hidden group border-0">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
               <Wallet size={120} strokeWidth={1} />
             </div>
             <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-4">Available Infrastructure Balance</p>
               <h2 className="font-display font-extrabold text-5xl mb-8">₦840,200</h2>
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-on-primary-container bg-white/10 w-fit px-3 py-1 rounded-full">
                  <Zap size={14} className="animate-pulse" /> Instant Settlement Active
               </div>
             </div>
          </Card>

          <Card className="p-8 space-y-6">
             <div className="flex items-center justify-between">
                <div className="p-3 bg-primary/10 text-primary rounded-xl"><ArrowUpRight size={24} /></div>
                <span className="text-secondary text-xs font-bold">+12% vs last month</span>
             </div>
             <div>
               <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Total {userType === 'business' ? 'Spent' : 'Earned'}</p>
               <p className="font-display font-extrabold text-3xl">₦4.2M</p>
             </div>
          </Card>

          <Card className="p-8 space-y-6">
             <div className="flex items-center justify-between">
                <div className="p-3 bg-secondary/10 text-secondary rounded-xl"><ArrowDownLeft size={24} /></div>
                <span className="text-primary text-xs font-bold">-5% processing cost</span>
             </div>
             <div>
               <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Pending Settlements</p>
               <p className="font-display font-extrabold text-3xl">₦15,400</p>
             </div>
          </Card>
        </div>

        {/* Transactions & Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
           
           <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="font-display font-bold text-2xl">Financial Audit Log</h2>
                 <Button variant="ghost" size="sm" className="text-primary">Download All</Button>
              </div>

              <div className="space-y-3">
                 {transactions.map((tx) => (
                   <div key={tx.id} className="flex items-center justify-between p-6 bg-surface-low rounded-2xl group hover:bg-surface-container transition-all">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-3 rounded-xl",
                          tx.amount.startsWith('+') ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        )}>
                           {tx.amount.startsWith('+') ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                           <p className="font-display font-bold text-sm leading-tight mb-0.5">{tx.type}</p>
                           <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">{tx.id} • {tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className={cn(
                           "font-display font-extrabold text-lg",
                           tx.amount.startsWith('+') ? "text-primary" : "text-on-surface"
                         )}>{tx.amount}</p>
                         <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.2em] leading-none mt-1">{tx.status}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <aside className="space-y-8">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em]">Stored Instruments</h2>
                 <Plus size={16} className="text-primary cursor-pointer" />
              </div>
              
              <Card className="p-8 bg-surface-high border border-outline-variant/10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col gap-10">
                   <div className="flex justify-between items-start">
                     <CreditCard size={32} className="text-on-surface/20" />
                     <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale" />
                   </div>
                   <div>
                     <p className="font-mono text-xl tracking-wider text-on-surface mb-4">•••• •••• •••• 4412</p>
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[8px] font-bold text-on-surface/30 uppercase tracking-widest mb-1">Infrastructure Node Member</p>
                           <p className="text-xs font-bold text-on-surface">EMEKA ONU</p>
                        </div>
                        <p className="text-xs font-bold text-on-surface/50">12/28</p>
                     </div>
                   </div>
                 </div>
              </Card>

              <Card className="bg-surface-low p-8 border border-outline-variant/5 space-y-6">
                 <h3 className="font-display font-bold text-lg">Bank Settlements</h3>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                       <Banknote size={24} />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-on-surface">Zenith Bank PLC</p>
                       <p className="text-xs text-on-surface/40 font-medium">Account: ****9012</p>
                    </div>
                    <ExternalLink size={16} className="text-on-surface/20" />
                 </div>
                 <Button variant="secondary" className="w-full">Edit Bank Nodes</Button>
              </Card>
           </aside>

        </div>

      </div>
    </DashboardLayout>
  );
}
