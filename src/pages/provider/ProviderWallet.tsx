import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  CreditCard, 
  Banknote, 
  History, 
  ExternalLink, 
  Zap 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function ProviderWallet() {
  const transactions = [
    { id: 'TX-9021', type: 'Settlement', amount: '+ ₦12,400', date: 'Oct 23, 2026', status: 'Completed' },
    { id: 'TX-9018', type: 'Platform Fee', amount: '- ₦2,500', date: 'Oct 22, 2026', status: 'Completed' },
    { id: 'TX-9015', type: 'Job Payment', amount: '+ ₦8,200', date: 'Oct 21, 2026', status: 'Completed' },
    { id: 'TX-9012', type: 'Bonus', amount: '+ ₦4,500', date: 'Oct 20, 2026', status: 'Completed' },
  ];

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-none mb-2">Earnings Wallet.</h1>
            <p className="font-sans text-on-surface/60">Manage your earnings and payout preferences.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button className="flex-1 md:flex-none gap-2">
              <Plus size={18} /> Withdraw Funds
            </Button>
          </div>
        </section>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-8 bg-primary-container text-white adire-texture relative overflow-hidden group border-0">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 opacity-60">
                <Wallet size={16} />
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Available Balance</p>
              </div>
              <p className="font-display font-extrabold text-4xl">₦450,200</p>
              <p className="text-xs opacity-60 mt-2">Wallet ID: WAL-22194-PRO</p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-110 transition-transform" />
          </Card>

          <Card className="p-8 bg-surface-low border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <ArrowUpRight size={16} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Today's Earnings</p>
            </div>
            <p className="font-display font-extrabold text-2xl text-on-surface">₦12,400</p>
            <p className="text-[10px] text-green-500 font-bold mt-1">↑ +18.4% vs yesterday</p>
          </Card>

          <Card className="p-8 bg-surface-low border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                <Zap size={16} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">This Week</p>
            </div>
            <p className="font-display font-extrabold text-2xl text-on-surface">₦84,500</p>
            <p className="text-[10px] text-on-surface/40 mt-1">42 jobs completed</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/performance" className="block">
            <Card className="p-6 hover:bg-surface-container transition-colors group border-0 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-on-surface">Performance Bonus</h4>
                  <p className="text-xs text-on-surface/40">Earn bonuses for top ratings</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/fleet" className="block">
            <Card className="p-6 hover:bg-surface-container transition-colors group border-0 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <Banknote size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-on-surface">Fleet Payouts</h4>
                  <p className="text-xs text-on-surface/40">Manage driver payments</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/dashboard/provider" className="block">
            <Card className="p-6 hover:bg-surface-container transition-colors group border-0 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                  <History size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-on-surface">View All Jobs</h4>
                  <p className="text-xs text-on-surface/40">See completed deliveries</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Transaction History */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-outline-variant/10">
            <h3 className="font-display font-bold text-lg text-on-surface">Transaction History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Transaction ID</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Type</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Amount</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Date</th>
                  <th className="text-right p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-outline-variant/5 hover:bg-surface-container/50 transition-colors">
                    <td className="p-4 font-bold text-primary">{tx.id}</td>
                    <td className="p-4 text-on-surface/70">{tx.type}</td>
                    <td className={`p-4 font-bold ${tx.amount.includes('+') ? 'text-green-600' : 'text-on-surface'}`}>{tx.amount}</td>
                    <td className="p-4 text-on-surface/60">{tx.date}</td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <CheckCircle2 size={12} /> {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function CheckCircle2({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">\n    <circle cx="12" cy="12" r="10" />\n    <path d="M9 12l2 2 4-4" />\n  </svg>;
}
