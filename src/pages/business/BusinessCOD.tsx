import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Search,
  FileText,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '@/src/lib/utils';

const codOrders = [
  { id: 'LOP-4421', customer: 'Agrilink Ltd', amount: 12400, status: 'collected', collectedDate: 'Oct 23, 2026', remitted: true, remittedDate: 'Oct 24, 2026' },
  { id: 'LOP-4419', customer: 'Fresh Foods', amount: 3200, status: 'collected', collectedDate: 'Oct 23, 2026', remitted: true, remittedDate: 'Oct 24, 2026' },
  { id: 'LOP-4425', customer: 'MedConnect', amount: 45000, status: 'collected', collectedDate: 'Oct 24, 2026', remitted: false, remittedDate: null },
  { id: 'LOP-4428', customer: 'Zest Fashion', amount: 8200, status: 'collected', collectedDate: 'Oct 24, 2026', remitted: false, remittedDate: null },
  { id: 'LOP-4430', customer: 'TechHub', amount: 12000, status: 'pending', collectedDate: null, remitted: false, remittedDate: null },
  { id: 'LOP-4432', customer: 'Agrilink Ltd', amount: 6700, status: 'pending', collectedDate: null, remitted: false, remittedDate: null },
];

const summaryStats = {
  totalCollected: 70900,
  totalRemitted: 15600,
  outstanding: 55300,
  pendingCollection: 18700,
};

export default function BusinessCOD() {
  const [filter, setFilter] = useState<'all' | 'collected' | 'remitted' | 'outstanding'>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = codOrders.filter(order => {
    if (filter === 'collected') return order.status === 'collected';
    if (filter === 'remitted') return order.remitted;
    if (filter === 'outstanding') return order.status === 'collected' && !order.remitted;
    return true;
  }).filter(order =>
    search === '' ||
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-on-surface">COD Management</h1>
            <p className="text-sm text-on-surface/60 mt-1">Track cash collections and remittances</p>
          </div>
          <Button className="gap-2">
            <Download size={18} /> Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Collected', value: summaryStats.totalCollected, icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Total Remitted', value: summaryStats.totalRemitted, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Outstanding', value: summaryStats.outstanding, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
            { label: 'Pending Collection', value: summaryStats.pendingCollection, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:bg-surface-container transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">{stat.label}</p>
                <p className="font-display font-extrabold text-2xl text-on-surface">{formatNaira(stat.value)}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'collected', 'remitted', 'outstanding'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-surface-high text-on-surface/40 hover:text-on-surface"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Order ID</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Customer</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Amount</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Collected</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Remitted</th>
                  <th className="text-right p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-outline-variant/5 hover:bg-surface-container/50 transition-colors"
                  >
                    <td className="p-4">
                      <Link to={`/track/${order.id}`} className="font-bold text-primary hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="p-4 text-on-surface">{order.customer}</td>
                    <td className="p-4 font-bold text-on-surface">{formatNaira(order.amount)}</td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold",
                        order.status === 'collected' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      )}>
                        {order.status === 'collected' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-on-surface/60 text-xs">
                      {order.collectedDate || '--'}
                    </td>
                    <td className="p-4">
                      {order.remitted ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                          <CheckCircle2 size={12} /> {order.remittedDate}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Link to={`/track/${order.id}`}>
                        <Button variant="secondary" size="sm">View</Button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
              <DollarSign size={48} className="text-on-surface/20 mx-auto mb-4" />
              <p className="font-bold text-on-surface/40">No COD orders found</p>
            </div>
          )}
        </Card>

        {/* Reconciliation Section */}
        <Card className="p-6 bg-surface-low border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-on-surface">COD Reconciliation</h3>
              <p className="text-xs text-on-surface/40">Export detailed reports for accounting</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Daily Report', desc: 'Today\'s COD transactions' },
              { label: 'Weekly Report', desc: 'Last 7 days summary' },
              { label: 'Custom Range', desc: 'Select date range' },
            ].map((report) => (
              <button key={report.label} className="p-4 bg-surface-highest/50 rounded-2xl hover:bg-surface-highest transition-colors text-left group">
                <p className="font-bold text-sm text-on-surface mb-1">{report.label}</p>
                <p className="text-xs text-on-surface/40 mb-3">{report.desc}</p>
                <div className="flex items-center gap-1 text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download size={14} /> Export CSV
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
