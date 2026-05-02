import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';
import { 
  Package, 
  MapPin, 
  Plus, 
  ArrowRight, 
  Star, 
  History, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Zap,
  Gift,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function IndividualDashboard() {
  const [trackId, setTrackId] = useState('');
  const navigate = useNavigate();
  const activeDeliveries = [
    { id: 'LOP-7721', destination: 'Victoria Island → Abuja', status: 'In Transit', eta: 'Tomorrow, 2:00 PM', icon: Package },
    { id: 'LOP-7745', destination: 'Surulere → Ikeja', status: 'Delivered', eta: 'Delivered today', icon: Gift },
  ];

  return (
    <DashboardLayout userType="individual">
      <div className="max-w-[1000px] mx-auto space-y-12">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
               <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
               <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Personal Account Active</span>
            </div>
            <h1 className="font-display font-extrabold text-[48px] text-on-surface leading-tight">Hello, David.</h1>
            <p className="font-sans text-on-surface/60 max-w-md">Track your personal items and send local & national parcels with precision.</p>
          </div>
          <Link to="/new-delivery" className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto gap-3 h-14 px-8 shadow-2xl shadow-primary/20">
               <Plus size={20} /> Send a Package
            </Button>
          </Link>
        </section>

        {/* Dynamic Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-start">
           
           {/* Active Shipments */}
           <section className="space-y-8">
              <div className="flex items-center justify-between px-2">
                 <h2 className="font-display font-bold text-2xl">Track & Manage</h2>
                  <Link to="/individual/deliveries">
                    <Button variant="ghost" size="sm" className="text-on-surface/40"><History size={16} className="mr-2" /> Full History</Button>
                  </Link>
              </div>

              <div className="space-y-4">
                 {activeDeliveries.map((delivery, idx) => (
                   <Card key={idx} className="p-6 md:p-8 bg-surface-low hover:bg-surface-high transition-all group border-0 shadow-sm hover:shadow-xl">
                      <div className="flex flex-col sm:flex-row items-center gap-8">
                         <div className={cn(
                           "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform",
                           delivery.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                         )}>
                           <delivery.icon size={28} />
                         </div>
                         <div className="flex-1 min-w-0 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                               <span className="text-[10px] font-bold text-on-surface/40 px-2 py-0.5 bg-surface-highest rounded-full">{delivery.id}</span>
                               <span className={cn(
                                 "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                                 delivery.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                               )}>
                                 {delivery.status}
                               </span>
                            </div>
                            <h3 className="font-display font-bold text-2xl leading-none mb-2">{delivery.destination}</h3>
                            <p className="text-sm text-on-surface/50 font-medium flex items-center justify-center sm:justify-start gap-1.5 capitalize tracking-normal">
                              {delivery.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                              {delivery.eta}
                            </p>
                         </div>
                         <Link to={`/track/${delivery.id}`} className="w-full sm:w-auto">
                            <Button variant="secondary" className="w-full sm:w-auto gap-2">Details <ChevronRight size={16} /></Button>
                         </Link>
                      </div>
                   </Card>
                 ))}
              </div>

              {/* Instant Search Card */}
              <Card className="p-8 bg-primary text-white overflow-hidden relative border-0 adire-texture">
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xs text-center md:text-left">
                       <h3 className="font-display font-bold text-xl mb-2">Track by ID</h3>
                       <p className="text-sm opacity-70">Instantly locate any parcel moving through the network.</p>
                    </div>
                       <form 
                         className="flex-1 w-full relative"
                         onSubmit={(e) => {
                           e.preventDefault();
                           if (trackId) navigate(`/track/${trackId}`);
                         }}
                       >
                         <input 
                          type="text" 
                          placeholder="Enter LOP ID (Ex: LOP-9021)"
                          value={trackId}
                          onChange={(e) => setTrackId(e.target.value)}
                          className="w-full pl-6 pr-14 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 focus:ring-2 focus:ring-white/20 font-display font-bold placeholder:text-white/40 text-white"
                         />
                         <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white text-primary rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                           <Search size={20} />
                         </button>
                       </form>
                 </div>
              </Card>
           </section>

           {/* Quick Actions & Tips */}
           <aside className="space-y-8">
              <h3 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Ecosystem Perks</h3>
              
              <Card className="p-8 space-y-6 bg-surface-high border-0 shadow-sm relative overflow-hidden group">
                 <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl w-fit group-hover:scale-110 transition-transform">
                   <Zap size={24} />
                 </div>
                 <div className="space-y-2">
                   <h4 className="font-display font-bold text-xl">Carbon Neutral</h4>
                   <p className="text-xs text-on-surface/50 leading-relaxed font-medium">Your personal account automatically offsets 100% of the carbon footprint for local deliveries.</p>
                 </div>
                 <div className="pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Earth Friendly Node</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                 </div>
              </Card>

              <Card className="p-8 space-y-6 bg-secondary/10 border-0 shadow-sm relative overflow-hidden group">
                 <div className="p-3 bg-secondary/20 text-secondary rounded-xl w-fit group-hover:rotate-12 transition-transform">
                   <Gift size={24} />
                 </div>
                 <div className="space-y-2">
                   <h4 className="font-display font-bold text-xl text-secondary">Refer & Save</h4>
                   <p className="text-xs text-on-surface/70 leading-relaxed font-medium">Share your personal LOP code and get ₦500 off your next 10 national hauls.</p>
                 </div>
                 <Button variant="secondary" size="sm" className="w-full bg-secondary text-white border-0 hover:bg-secondary/90">Share Code</Button>
              </Card>

              <Card className="p-6 bg-surface-low border border-outline-variant/10 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center text-on-surface/30"><Star size={20} /></div>
                 <div>
                    <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest leading-none mb-1">Your Rating</p>
                    <p className="text-sm font-display font-bold">5.0 Star Shipper</p>
                 </div>
              </Card>
           </aside>

        </div>

      </div>
    </DashboardLayout>
  );
}
