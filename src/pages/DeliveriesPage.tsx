import * as React from 'react';
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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

export default function DeliveriesPage() {
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
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-display font-extrabold text-[40px] text-on-surface leading-tight mb-2">Deliveries.</h1>
            <p className="font-sans text-on-surface/60">Managing the orchestration of your global shipment pipeline.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="secondary" className="flex-1 md:flex-none gap-2">
              <Download size={18} /> Export Manifest
            </Button>
            <Link to="/new-delivery" className="flex-1 md:flex-none">
              <Button className="w-full gap-2">
                <Plus size={18} /> Create Dispatch
              </Button>
            </Link>
          </div>
        </section>

        {/* Control Bar */}
        <Card className="p-4 md:p-6 bg-surface-low border border-outline-variant/10">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID, route, or business node..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-highest/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    filter === status 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-surface-highest text-on-surface/40 hover:bg-surface-container hover:text-on-surface"
                  )}
                >
                  {status}
                </button>
              ))}
              <div className="h-6 w-px bg-outline-variant/20 mx-2 hidden lg:block"></div>
              <Button variant="ghost" size="sm" className="gap-2 text-on-surface/60">
                <Filter size={16} /> Advanced Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Deliveries Table/Grid */}
        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_100px] gap-6 px-8 text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">
            <span>Shipment Hub & Route</span>
            <span>Customer Node</span>
            <span>Financials</span>
            <span>Temporal Status</span>
            <span className="text-right">Action</span>
          </div>

          <div className="space-y-4">
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery) => (
                <Card key={delivery.id} className="p-6 md:p-8 bg-surface-low hover:bg-surface-container transition-all group border-0 shadow-sm hover:shadow-xl hover:translate-y-[-2px]">
                  <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_100px] gap-6 items-center">
                    
                    {/* Identification & Route */}
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform",
                        delivery.status === 'Delivered' ? "bg-primary/10 text-primary" :
                        delivery.status === 'Delayed' ? "bg-secondary/10 text-secondary" :
                        "bg-surface-highest text-on-surface/30"
                      )}>
                        <Package size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full tracking-tighter">
                            {delivery.id}
                          </span>
                          <span className={cn(
                            "text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-[0.1em]",
                            delivery.priority === 'Critical' ? "bg-secondary text-white" :
                            delivery.priority === 'High' ? "bg-secondary/20 text-secondary" :
                            "bg-surface-container text-on-surface/40"
                          )}>
                            {delivery.priority}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg md:text-xl truncate group-hover:text-primary transition-colors">{delivery.destination}</h3>
                        <p className="text-xs text-on-surface/40 font-medium font-sans flex items-center gap-1.5 pt-1">
                          <MapPin size={10} /> Route Active • {delivery.type}
                        </p>
                      </div>
                    </div>

                    {/* Customer Node */}
                    <div className="hidden md:block">
                      <p className="font-display font-bold text-base text-on-surface">{delivery.customer}</p>
                      <p className="text-[10px] text-on-surface/40 font-bold uppercase tracking-widest mt-1">Verified Entity</p>
                    </div>

                    {/* Financials */}
                    <div className="hidden md:block">
                      <p className="font-display font-extrabold text-xl text-on-surface leading-none mb-1">{delivery.price}</p>
                      <p className="text-[10px] text-on-surface/40 font-bold uppercase tracking-widest">Settlement Active</p>
                    </div>

                    {/* Temporal Status */}
                    <div className="flex flex-col items-start md:items-start gap-2">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2",
                        delivery.status === 'Delivered' ? "bg-primary/10 text-primary" :
                        delivery.status === 'Delayed' ? "bg-secondary/10 text-secondary" :
                        delivery.status === 'In Transit' ? "bg-blue-500/10 text-blue-500" :
                        "bg-surface-highest text-on-surface/40"
                      )}>
                        {delivery.status === 'Delivered' && <CheckCircle2 size={12} />}
                        {delivery.status === 'In Transit' && <Truck size={12} />}
                        {delivery.status === 'Delayed' && <AlertCircle size={12} />}
                        {delivery.status}
                      </div>
                      <p className="text-[10px] text-on-surface/40 font-medium font-sans flex items-center gap-1.5">
                        <Calendar size={10} /> {delivery.date}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end gap-3 md:gap-2">
                       <Link to={delivery.status === 'Delivered' ? `/delivery-complete/${delivery.id}` : `/track/${delivery.id}`} className="md:hidden flex-1">
                          <Button variant="secondary" size="sm" className="w-full">Track</Button>
                       </Link>
                       <Link to={delivery.status === 'Delivered' ? `/delivery-complete/${delivery.id}` : `/track/${delivery.id}`} className="hidden md:block p-2 text-on-surface/20 hover:text-primary transition-colors">
                          <ArrowUpRight size={20} />
                       </Link>
                       <button className="p-2 text-on-surface/20 hover:text-on-surface transition-colors">
                          <MoreVertical size={20} />
                       </button>
                    </div>

                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-20 text-center bg-surface-low border border-dashed border-outline-variant/30 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-surface-highest rounded-full flex items-center justify-center text-on-surface/20">
                  <Box size={40} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-on-surface mb-2">No matching shipments.</h3>
                  <p className="text-on-surface/40 max-w-sm mx-auto leading-relaxed">We couldn't find any dispatch nodes matching your current filters. Try adjusting your search criteria.</p>
                </div>
                <Button variant="secondary" onClick={() => {setFilter('All'); setSearch('');}}>Clear All Filters</Button>
              </Card>
            )}
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <p className="text-xs text-on-surface/40 font-medium">Showing 1 to 6 of 142 total shipments</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled>Previous</Button>
            {[1, 2, 3, '...', 24].map((p, i) => (
              <button 
                key={i}
                className={cn(
                  "w-10 h-10 rounded-xl text-xs font-bold transition-all",
                  p === 1 ? "bg-primary text-white shadow-lg" : "bg-surface-highest text-on-surface/40 hover:bg-surface-container"
                )}
              >
                {p}
              </button>
            ))}
            <Button variant="secondary" size="sm" className="gap-2">Next <ArrowRight size={16} /></Button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

