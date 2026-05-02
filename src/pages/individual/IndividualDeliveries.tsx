import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Search, 
  Filter, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Calendar,
  FileText,
  Download,
  Package,
  ArrowRight,
  Plus,
  Gift
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const deliveries = [
  { id: 'LOP-7721', destination: 'Victoria Island → Abuja', status: 'In Transit', eta: 'Tomorrow, 2:00 PM', icon: Package },
  { id: 'LOP-7745', destination: 'Surulere → Ikeja', status: 'Delivered', eta: 'Delivered today', icon: Gift },
  { id: 'LOP-7732', destination: 'Lekki → Yaba', status: 'Processing', eta: 'Pending pickup', icon: Package },
];

export default function IndividualDeliveries() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const statuses = ['All', 'In Transit', 'Delivered', 'Processing'];

  const filteredDeliveries = deliveries.filter(d => {
    const matchesStatus = filter === 'All' || d.status === filter;
    const matchesSearch = d.id.toLowerCase().includes(search.toLowerCase()) || 
                          d.destination.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout userType="individual">
      <div className="max-w-[1000px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-on-surface">My Deliveries</h1>
            <p className="text-sm text-on-surface/60 mt-1">Track and manage your personal shipments</p>
          </div>
          <Link to="/new-delivery">
            <Button size="sm" className="gap-2">
              <Plus size={16} /> Send Package
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or destination..." 
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

        {/* Deliveries List */}
        <div className="space-y-4">
          {filteredDeliveries.map((delivery, idx) => (
            <Card key={idx} className="p-6 md:p-8 bg-surface-low hover:bg-surface-high transition-all group border-0 shadow-sm hover:shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform",
                  delivery.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                )}>
                  <delivery.icon size={24} />
                </div>
                
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                    <span className="text-[10px] font-bold text-on-surface/40 px-2 py-0.5 bg-surface-highest rounded-full">{delivery.id}</span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                      delivery.status === 'Delivered' ? "bg-emerald-100 text-emerald-700" :
                      delivery.status === 'In Transit' ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    )}>
                      {delivery.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl leading-none mb-2">{delivery.destination}</h3>
                  <p className={cn(
                    "text-sm font-medium flex items-center justify-center sm:justify-start gap-1.5 capitalize tracking-normal",
                    delivery.status === 'Delivered' ? "text-emerald-600" : "text-on-surface/50"
                  )}>
                    {delivery.status === 'Delivered' && <CheckCircle2 size={14} />}
                    {delivery.eta}
                  </p>
                </div>

                <Link to={`/track/${delivery.id}`} className="w-full sm:w-auto">
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto gap-2">
                    Details <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredDeliveries.length === 0 && (
          <div className="p-12 text-center">
            <Package size={48} className="text-on-surface/20 mx-auto mb-4" />
            <p className="font-bold text-on-surface/40">No deliveries found</p>
          </div>
        )}

        {/* Download Report */}
        <div className="flex justify-end">
          <Button variant="secondary" size="sm" className="gap-2">
            <Download size={14} /> Export History
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
