import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Package, MapPin, Truck, CheckCircle2, Clock, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function DeliveryTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const trackId = id || 'DEMO-4421-NG';

  const steps = [
    { label: 'Order Processed', time: 'Oct 23, 08:30 AM', status: 'completed', icon: Package },
    { label: 'Carrier Assigned', time: 'Oct 23, 09:15 AM', status: 'completed', icon: Truck },
    { label: 'In Transit', time: 'Oct 23, 11:45 AM', status: 'current', icon: MapPin },
    { label: 'Out for Delivery', time: 'Expected ~2 PM', status: 'pending', icon: Clock },
    { label: 'Delivered', time: '--', status: 'pending', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-4 py-2 bg-surface-low border border-outline-variant/10 rounded-xl text-on-surface/60 hover:text-primary hover:border-primary/20 hover:bg-surface-high transition-all shadow-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-on-surface/40">
             <Clock size={14} /> Real-time sync: Active
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
          
          {/* Left Column: Tracking Visualization */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Active Ship</span>
                <h1 className="font-display font-extrabold text-3xl">Track #{trackId}</h1>
              </div>
              <p className="text-on-surface/60 font-medium">Lagos Corridor → Abuja Hub. Estimated arrival in 2 hours.</p>
            </div>

            <Card className="p-0 overflow-hidden relative border border-outline-variant/10">
              <div className="aspect-video bg-surface-container relative">
                <img 
                   src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                   alt="Map Placeholder" 
                   className="w-full h-full object-cover opacity-30 grayscale"
                />
                {/* Simulated Map Markers */}
                <div className="absolute inset-0 p-20 flex flex-col justify-between">
                   <div className="flex justify-start">
                     <div className="p-3 bg-surface rounded-2xl shadow-lg border border-outline-variant/20">
                       <MapPin className="text-primary" size={24} />
                     </div>
                   </div>
                   <div className="flex justify-end pr-40">
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 ring-8 ring-primary/10"
                      >
                       <Truck size={32} />
                     </motion.div>
                   </div>
                   <div className="flex justify-end">
                     <div className="p-3 bg-surface rounded-2xl shadow-lg border border-outline-variant/20">
                       <CheckCircle2 className="text-on-surface/20" size={24} />
                     </div>
                   </div>
                </div>
              </div>
              <div className="p-10 bg-primary-container text-white adire-texture">
                 <div className="flex flex-wrap justify-between gap-10">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-2">Origin</p>
                      <p className="font-display font-bold text-lg">Murtala Muhammed Int. Hub</p>
                      <p className="text-xs opacity-70">Lagos, Nigeria</p>
                    </div>
                    <div className="border-l border-white/10 pl-10">
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-2">Current Activity</p>
                      <p className="font-display font-bold text-lg">In Transit (Lokoja Pass)</p>
                      <p className="text-xs opacity-70">Speed: 82km/h • Stability: Optimal</p>
                    </div>
                    <div className="border-l border-white/10 pl-10">
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-2">Destination</p>
                      <p className="font-display font-bold text-lg">Central Transit Hub</p>
                      <p className="text-xs opacity-70">Abuja, FCT</p>
                    </div>
                 </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Timeline & Details */}
          <div className="space-y-8 pt-10 lg:pt-0">
            <h2 className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] px-2">Shipment Timeline</h2>
            <div className="relative pl-12 space-y-12">
               {/* Vertical Line */}
               <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-outline-variant/10"></div>
               
               {steps.map((step, idx) => (
                 <div key={idx} className="relative">
                    <div className={cn(
                      "absolute -left-[35px] w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                      step.status === 'completed' ? "bg-primary text-white" : 
                      step.status === 'current' ? "bg-secondary text-white ring-8 ring-secondary/10" : 
                      "bg-surface-container text-on-surface/20"
                    )}>
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-display font-bold text-lg leading-none mb-2",
                        step.status === 'pending' ? "text-on-surface/30" : "text-on-surface"
                      )}>{step.label}</h4>
                      <p className="text-xs font-sans text-on-surface/50">{step.time}</p>
                    </div>
                 </div>
               ))}
            </div>

            <Card className="bg-surface-low p-8 space-y-6">
              <div className="flex items-center gap-3">
                <Info size={16} className="text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Shipment Metadata</h3>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                 <div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Carrier</p>
                   <p className="font-bold">GIG Logistics</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Weight</p>
                   <p className="font-bold">12.5 kg</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Service</p>
                   <p className="font-bold">Express Haul</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Safety Lock</p>
                   <p className="font-bold text-primary">Biometric Active</p>
                 </div>
              </div>

              {trackId.includes('4421') && (
                <div className="pt-6 border-t border-outline-variant/10">
                   <Link to={`/delivery-complete/${trackId}`}>
                      <Button className="w-full gap-2">
                         View Completion Summary <ArrowRight size={18} />
                      </Button>
                   </Link>
                </div>
              )}
            </Card>
          </div>

        </section>
      </main>
    </div>
  );
}
