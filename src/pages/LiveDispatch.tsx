import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Navigation, 
  Package, 
  MapPin, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap,
  MoreVertical,
  Activity
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '@/src/lib/utils';

type DispatchStatus = 'navigation' | 'arrived' | 'handoff' | 'complete';

export default function LiveDispatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<DispatchStatus>('navigation');
  const [progress, setProgress] = useState(65);
  const [showEmergency, setShowEmergency] = useState(false);

  // Simulated haul data
  const haul = {
    id: id || 'LOP-9021-X',
    destination: 'Lekki Phase 1, Node C',
    address: 'Plot 12, Admiralty Way, Lekki',
    recipient: 'Dr. Sarah Adebayo',
    item: 'Medical Supplies (Cold-Chain)',
    eta: '12 mins',
    distance: '4.2 km',
    telemetry: {
      speed: '42 km/h',
      temp: '4.2°C',
      battery: '82%'
    }
  };

  const statusMap = {
    navigation: { label: 'In Transit', btn: 'Arrived at Drop-off', next: 'arrived' as DispatchStatus },
    arrived: { label: 'At Destination', btn: 'Initiate Handoff', next: 'handoff' as DispatchStatus },
    handoff: { label: 'Awaiting PIN', btn: 'Verify & Complete', next: 'complete' as DispatchStatus },
    complete: { label: 'Completed', btn: 'Back to Opps', next: 'navigation' as DispatchStatus }
  };

  const handleNextStep = () => {
    if (status === 'complete') {
      navigate('/dashboard/provider');
      return;
    }
    setStatus(statusMap[status].next);
  };

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1100px] mx-auto space-y-6 pb-20">
        
        {/* Status Bar */}
        <section className="flex flex-col md:flex-row justify-between items-center bg-surface-low p-4 rounded-2xl border border-outline-variant/10 gap-4">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                 <Navigation size={20} className={cn(status === 'navigation' && "animate-pulse")} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest leading-none mb-1">Current Node Status</p>
                 <h2 className="font-display font-bold text-lg text-on-surface uppercase tracking-tight">{statusMap[status].label}</h2>
              </div>
           </div>
           
           <div className="flex-1 max-w-md w-full px-4">
              <div className="flex justify-between text-[10px] font-bold text-on-surface/30 uppercase tracking-widest mb-2">
                 <span>Progress</span>
                 <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary shadow-[0_0_8px_rgba(45,90,46,0.3)]"
                 />
              </div>
           </div>

           <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowEmergency(true)} className="text-secondary gap-2 hover:bg-secondary/5 h-10 px-4">
                 <AlertTriangle size={16} /> 
                 <span className="hidden sm:inline">Emergency Support</span>
              </Button>
              <button className="p-2 text-on-surface/20 hover:text-on-surface"><MoreVertical size={20} /></button>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
           
           {/* Primary Cockit (Visuals) */}
           <div className="space-y-6">
              <Card className="p-0 overflow-hidden relative aspect-video md:aspect-auto md:h-[500px] border-0 shadow-xl bg-surface-highest">
                 {/* Simulated Map View */}
                 <div className="absolute inset-0 adire-texture opacity-[0.03] pointer-events-none" />
                 <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                    alt="Map" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
                 />
                 
                 {/* UI Overlays */}
                 <div className="absolute inset-x-6 top-6 flex justify-between items-start">
                    <Card className="bg-white/90 backdrop-blur-md p-4 space-y-2 border-0 shadow-2xl min-w-[200px]">
                       <div className="text-secondary animate-pulse flex items-center gap-2 mb-2">
                          <Navigation size={14} fill="currentColor" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest">Next Turn: 400m</span>
                       </div>
                       <h3 className="font-display font-bold text-xl leading-tight">Turn Right onto <br/> Admiralty Way</h3>
                    </Card>

                    <div className="space-y-2">
                       <Card className="bg-primary text-white p-3 border-0 shadow-lg flex items-center gap-3">
                          <Package size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest font-display">{haul.telemetry.temp}</span>
                       </Card>
                    </div>
                 </div>

                 {/* Center Marker Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                       <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 -m-8 bg-primary rounded-full"
                       />
                       <div className="w-12 h-12 bg-primary text-white rounded-2xl shadow-xl flex items-center justify-center relative z-10 border-4 border-white">
                          <Navigation size={24} />
                       </div>
                    </div>
                 </div>

                 <div className="absolute inset-x-6 bottom-6">
                    <Card className="bg-surface/90 backdrop-blur-md p-6 border-0 shadow-2xl flex flex-wrap justify-around gap-8">
                       <div className="text-center">
                          <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Time to Node</p>
                          <p className="font-display font-black text-2xl text-on-surface">{haul.eta}</p>
                       </div>
                       <div className="w-px h-10 bg-outline-variant/10" />
                       <div className="text-center">
                          <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Distance</p>
                          <p className="font-display font-black text-2xl text-on-surface">{haul.distance}</p>
                       </div>
                       <div className="w-px h-10 bg-outline-variant/10" />
                       <div className="text-center">
                          <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Velocity</p>
                          <p className="font-display font-black text-2xl text-on-surface">{haul.telemetry.speed}</p>
                       </div>
                    </Card>
                 </div>
              </Card>

              {/* Delivery Instruction Card */}
              <Card className="p-8 bg-surface border border-outline-variant/10 flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-16 h-16 rounded-2xl bg-surface-highest flex items-center justify-center text-on-surface/30 shrink-0">
                    <MapPin size={28} />
                 </div>
                 <div className="flex-1 space-y-1 text-center md:text-left">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Delivery Point</p>
                    <h3 className="font-display font-bold text-2xl">{haul.destination}</h3>
                    <p className="text-sm text-on-surface/50 font-medium">{haul.address}</p>
                 </div>
                 <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="secondary" size="sm" className="w-12 h-12 rounded-xl px-0"><Phone size={18} /></Button>
                    <Button variant="secondary" size="sm" className="w-12 h-12 rounded-xl px-0"><MessageSquare size={18} /></Button>
                 </div>
              </Card>
           </div>

           {/* Mobile-First Controls Sidebar */}
           <aside className="space-y-6">
              <Card className="p-8 space-y-8 bg-surface border-0 shadow-2xl relative overflow-hidden ring-1 ring-outline-variant/10">
                 <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl">Recipient Details</h3>
                    <div className="flex items-center gap-4 p-4 bg-surface-highest rounded-2xl">
                       <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-display font-bold">SA</div>
                       <div>
                          <p className="font-display font-bold text-sm leading-tight">{haul.recipient}</p>
                          <p className="text-[10px] font-extrabold text-on-surface/40 uppercase tracking-widest">Member ID: LOP-9021</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest px-1">Infrastructure Telemetry</h4>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/10 space-y-1">
                          <Activity size={14} className="text-emerald-500 mb-2" />
                          <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest leading-none">Cold Lock</p>
                          <p className="font-display font-bold text-sm">{haul.telemetry.temp}</p>
                       </div>
                       <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/10 space-y-1">
                          <Zap size={14} className="text-primary mb-2" />
                          <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest leading-none">Node Power</p>
                          <p className="font-display font-bold text-sm">{haul.telemetry.battery}</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-outline-variant/10">
                    <AnimatePresence mode="wait">
                       {status === 'handoff' ? (
                          <motion.div 
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="space-y-6"
                          >
                             <div className="space-y-3">
                                <p className="text-center text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Verification Protocol</p>
                                <div className="grid grid-cols-4 gap-2">
                                   {[1, 2, 3, 4].map(i => (
                                     <input 
                                       key={i}
                                       type="text" 
                                       maxLength={1}
                                       className="w-full h-14 bg-surface-highest rounded-xl border-2 border-transparent focus:border-primary text-center font-display font-black text-2xl" 
                                       placeholder="•"
                                     />
                                   ))}
                                </div>
                             </div>
                             <Button onClick={handleNextStep} size="lg" className="w-full h-16 text-lg gap-2 shadow-xl shadow-primary/20">
                                Verify & Close Dispatch <CheckCircle2 size={20} />
                             </Button>
                          </motion.div>
                       ) : (
                          <motion.div
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="space-y-4"
                          >
                             <Button 
                               onClick={handleNextStep} 
                               size="lg" 
                               className={cn(
                                 "w-full h-16 text-lg gap-3 shadow-2xl",
                                 status === 'complete' ? "bg-emerald-500 hover:bg-emerald-600" : "shadow-primary/20"
                               )}
                             >
                                {status === 'complete' ? 'Dispatch Success' : statusMap[status].btn}
                                {status !== 'complete' && <ChevronRight size={20} />}
                                {status === 'complete' && <CheckCircle2 size={20} />}
                             </Button>
                             {status === 'navigation' && (
                                <p className="text-center text-[10px] font-bold text-on-surface/30 uppercase tracking-widest group">
                                   T-Minus {haul.eta} to Dropdoor
                                </p>
                             )}
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </Card>

              <Card className="p-6 bg-primary-container text-white adire-texture overflow-hidden relative border-0">
                 <div className="relative z-10 flex items-center gap-4">
                    <ShieldCheck size={24} className="opacity-60" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Node Integrity</p>
                       <p className="text-xs font-display font-bold">5.0 Star Professional Grade</p>
                    </div>
                 </div>
              </Card>
           </aside>
        </div>

        {/* Emergency Modal */}
        <AnimatePresence>
           {showEmergency && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-on-surface/60 backdrop-blur-md" 
                    onClick={() => setShowEmergency(false)}
                 />
                 <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-[480px] bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl space-y-8"
                 >
                    <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-secondary/40">
                       <AlertTriangle size={40} />
                    </div>
                    <div className="text-center space-y-4">
                       <h2 className="font-display font-extrabold text-3xl">Emergency Node Support</h2>
                       <p className="text-on-surface/50 font-medium leading-relaxed">
                          Do not endanger yourself. Select your current operational barrier for instant escalation to the Corridor Hub HQ.
                       </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                       <Button variant="secondary" className="w-full h-14 bg-secondary text-white border-0 hover:bg-secondary/90">Vehicle Node Breakdown</Button>
                       <Button variant="secondary" className="w-full h-14 bg-secondary text-white border-0 hover:bg-secondary/90">Safety / Physical Threat</Button>
                       <Button variant="secondary" className="w-full h-14 bg-secondary text-white border-0 hover:bg-secondary/90">Medical Infrastructure Need</Button>
                    </div>
                    <Button variant="ghost" onClick={() => setShowEmergency(false)} className="w-full h-14 text-on-surface/40 hover:text-on-surface uppercase font-bold tracking-widest">Cancel Signal</Button>
                 </motion.div>
              </div>
           )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
