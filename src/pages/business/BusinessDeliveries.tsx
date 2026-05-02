import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Calendar,
  Box,
  MapPin,
  FileText,
  Download,
  Package,
  ArrowRight,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

const deliveries = [
  { id: 'LOP-4421', destination: 'Lagos → Abuja', customer: 'Agrilink Ltd', status: 'In Transit', type: 'Agriculture', price: '₦12,400', date: 'Oct 23, 2026', priority: 'High' },
  { id: 'LOP-4419', destination: 'Victoria Island → Lekki', customer: 'Fresh Foods', status: 'Delivered', type: 'Retail', price: '₦3,200', date: 'Oct 22, 2026', priority: 'Normal' },
  { id: 'LOP-4412', destination: 'Kano → Kaduna', customer: 'MedConnect', status: 'Processing', type: 'Medical', price: '₦45,000', date: 'Oct 23, 2026', priority: 'Critical' },
  { id: 'LOP-4408', destination: 'Ibadan → Lagos', customer: 'Zest Fashion', status: 'Delivered', type: 'Apparel', price: '₦8,500', date: 'Oct 21, 2026', priority: 'Normal' },
  { id: 'LOP-4405', destination: 'Abuja → Port Harcourt', customer: 'TechHub', status: 'Delayed', type: 'Electronics', price: '₦22,000', date: 'Oct 20, 2026', priority: 'High' },
  { id: 'LOP-4398', destination: 'Enugu → Onitsha', customer: 'Solely Shoes', status: 'Delivered', type: 'Retail', price: '₦5,200', date: 'Oct 19, 2026', priority: 'Normal' },
];

export default function BusinessDeliveries() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const statuses = ['All', 'In Transit', 'Delivered', 'Processing', 'Delayed'];

  const filteredDeliveries = deliveries.filter(d => {
    const matchesStatus = filter === 'All' || d.status === filter;
    const matchesSearch = d.id.toLowerCase().includes(search.toLowerCase()) || 
                          d.destination.toLowerCase().includes(search.toLowerCase()) ||
                          d.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-on-surface">Business Deliveries</h1>
            <p className="text-sm text-on-surface/60 mt-1">Track and manage all your business shipments</p>
          </div>
          <div className="flex gap-3">
            <Link to="/templates">
              <Button variant="secondary" size="sm" className="gap-2">
                <Box size={16} /> Templates
              </Button>
            </Link>
            <Link to="/new-delivery">
              <Button size="sm" className="gap-2">
                <Plus size={16} /> New Dispatch
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, destination, or customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
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

        {/* Deliveries Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Order ID</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Destination</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Customer</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Type</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Price</th>
                  <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Status</th>
                  <th className="text-right p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((delivery, idx) => (
                  <tr 
                    key={delivery.id}
                    className="border-b border-outline-variant/5 hover:bg-surface-container/50 transition-colors"
                  >
                    <td className="p-4">
                      <Link to={`/track/${delivery.id}`} className="font-bold text-primary hover:underline">
                        {delivery.id}
                      </Link>
                    </td>
                    <td className="p-4 text-on-surface">{delivery.destination}</td>
                    <td className="p-4 text-on-surface/70">{delivery.customer}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-surface-highest rounded text-xs font-bold">{delivery.type}</span>
                    </td>
                    <td className="p-4 font-bold text-on-surface">{delivery.price}</td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold",
                        delivery.status === 'Delivered' ? "bg-green-100 text-green-700" :
                        delivery.status === 'In Transit' ? "bg-blue-100 text-blue-700" :
                        delivery.status === 'Processing' ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {delivery.status === 'Delivered' && <CheckCircle2 size={12} />}
                        {delivery.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link to={`/track/${delivery.id}`}>
                        <Button variant="secondary" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDeliveries.length === 0 && (
            <div className="p-12 text-center">
              <Package size={48} className="text-on-surface/20 mx-auto mb-4" />
              <p className="font-bold text-on-surface/40">No deliveries found</p>
            </div>
          )}
        </Card>

        {/* Download Report */}
        <div className="flex justify-end">
          <Button variant="secondary" size="sm" className="gap-2">
            <Download size={14} /> Export Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function useState<T>(initial: T): [T, (val: T) => void] {
  const [state, setState] = React.useState(initial);
  return [state, setState];
}

import * as React from 'react';
