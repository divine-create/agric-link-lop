import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Info,
  Zap
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function AcceptHaul() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated job data based on the ID or defaults
  const job = {
    id: id || 'JOB-9021',
    origin: 'Lagos Island, Hub A-4',
    destination: 'Lekki Phase 1, Node C',
    sender: 'Agrilink Ltd',
    item: 'Medical Supplies (Cold Chain)',
    weight: '2.5kg',
    reward: '₦4,500',
    distance: '12.4km',
    estTime: '24 mins',
    urgency: 'High',
    complianceNeeds: ['Cold chain lock', 'Biometric handover', 'GPS active']
  };

  const handleConfirm = () => {
    if (!agreed) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Haul successfully locked to your node. Proceed to pickup.');
      navigate(`/live-dispatch/${job.id}`);
    }, 2000);
  };

  return (
    <DashboardLayout userType="provider">
      <div className="max-w-[1000px] mx-auto space-y-10 pb-20">
        
        {/* Navigation & Header */}
        <section>
          <Link to="/dashboard/provider" className="inline-flex items-center gap-2 text-on-surface/40 hover:text-primary transition-all mb-8 group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             <span className="text-xs font-bold uppercase tracking-widest">Back to Opportunities</span>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Manual Assignment</span>
                 <span className="text-xs font-bold text-on-surface/40 uppercase tracking-widest italic">Precision Guard Active</span>
              </div>
              <h1 className="font-display font-extrabold text-[40px] md:text-[56px] text-on-surface leading-tight tracking-tighter">Review & Lock Haul.</h1>
            </div>
            <div className="text-right shrink-0">
               <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-1">Net Settlement</p>
               <p className="font-display font-black text-5xl text-primary leading-none">{job.reward}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          
          <div className="space-y-8">
            {/* Core Job Details */}
            <Card className="p-8 md:p-12 space-y-10 border-0 shadow-sm bg-surface-low">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MapPin size={14} className="text-primary" /> Routing Intelligence
                      </h3>
                      <div className="space-y-6 relative pl-6">
                         <div className="absolute left-[7px] top-2 bottom-2 w-px border-l-2 border-dotted border-outline-variant/30"></div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-on-surface/20 leading-none mb-1">Pickup Point</p>
                            <p className="font-display font-bold text-xl">{job.origin}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-on-surface/20 leading-none mb-1">Final Dropdoor</p>
                            <p className="font-display font-bold text-xl">{job.destination}</p>
                         </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-8">
                       <div className="space-y-1">
                         <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Distance</p>
                         <p className="font-display font-bold text-lg">{job.distance}</p>
                       </div>
                       <div className="space-y-1 border-l border-outline-variant/10 pl-8">
                         <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Est. Travel</p>
                         <p className="font-display font-bold text-lg">{job.estTime}</p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Package size={14} className="text-secondary" /> Payload Audit
                      </h3>
                      <div className="space-y-6 bg-surface-highest/30 p-6 rounded-2xl border border-outline-variant/5">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"><Package size={24} /></div>
                            <div>
                               <p className="font-display font-bold text-lg">{job.item}</p>
                               <p className="text-xs text-on-surface/40 font-medium">Weight class: {job.weight}</p>
                            </div>
                         </div>
                         <div className="pt-4 border-t border-outline-variant/10">
                            <p className="text-[10px] uppercase font-bold text-on-surface/30 mb-2">Sender Infrastructure</p>
                            <div className="flex items-center gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500" />
                               <span className="text-sm font-bold text-on-surface">{job.sender}</span>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="pt-10 border-t border-outline-variant/10">
                  <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-6">Provider Compliance Protocol</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {job.complianceNeeds.map((need, idx) => (
                       <div key={idx} className="flex items-center gap-3 p-4 bg-surface-highest rounded-xl border border-outline-variant/5">
                          <ShieldCheck size={16} className="text-primary" />
                          <span className="text-xs font-bold text-on-surface/70 uppercase tracking-tight">{need}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </Card>

            <Card className="p-8 bg-secondary/5 border border-secondary/10 flex items-start gap-6">
                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl shrink-0"><AlertCircle size={24} /></div>
                <div className="space-y-2">
                   <h4 className="font-display font-bold text-lg text-secondary">Dispatch Penalty Warning</h4>
                   <p className="text-sm text-on-surface/60 leading-relaxed max-w-lg">
                     Once a haul is locked to your node, failure to initiate pickup within 15 minutes will result in an efficiency rating deduction of 2.4%.
                   </p>
                </div>
            </Card>
          </div>

          <aside className="space-y-6">
             <Card className="p-8 space-y-8 bg-white border border-outline-variant/10 shadow-xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-5 text-primary group-hover:scale-110 transition-transform duration-1000">
                   <Navigation size={200} />
                </div>
                
                <h3 className="font-display font-bold text-xl relative z-10">Confirm Haul</h3>
                
                <div className="space-y-6 relative z-10">
                   <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/10 space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer group/label">
                        <div className={cn(
                          "w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all mt-0.5",
                          agreed ? "bg-primary border-primary text-white" : "border-outline-variant/40 group-hover/label:border-primary/40 text-transparent"
                        )}>
                          <CheckCircle2 size={12} strokeWidth={3} />
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={agreed} 
                          onChange={() => setAgreed(!agreed)} 
                        />
                        <span className="text-[11px] font-bold text-on-surface/60 uppercase tracking-tight leading-tight">
                          I verify that my node is equipped for {job.urgency} urgency protocols and cold-chain compliance.
                        </span>
                      </label>
                   </div>

                   <Button 
                    onClick={handleConfirm}
                    disabled={!agreed || isProcessing}
                    size="lg" 
                    className={cn(
                      "w-full h-16 text-lg gap-3 shadow-2xl relative overflow-hidden",
                      agreed ? "shadow-primary/20" : "opacity-50 grayscale cursor-not-allowed"
                    )}
                   >
                     {isProcessing ? 'Locking Node...' : 'Confirm & Lock Haul'}
                     {!isProcessing && <ChevronRight size={20} />}
                     {isProcessing && (
                       <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-1 w-full bg-white/30"
                       />
                     )}
                   </Button>

                   <div className="flex items-center gap-3 px-1">
                      <div className="w-8 h-8 rounded-full bg-surface-highest flex items-center justify-center text-on-surface/40"><Info size={14} /></div>
                      <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest leading-none">Node ID: PRO-44219</p>
                   </div>
                </div>
             </Card>

             <Card className="p-8 bg-primary-container text-white adire-texture overflow-hidden relative border-0">
                <div className="relative z-10 flex flex-col gap-4 text-center">
                   <Zap size={32} className="mx-auto mb-2 opacity-60" />
                   <h3 className="font-display font-bold text-lg">Instant Settlement</h3>
                   <p className="text-xs opacity-70 leading-relaxed">This haul qualifies for automatic bank settlement upon proof of dropdoor delivery.</p>
                </div>
             </Card>
          </aside>

        </div>

      </div>
    </DashboardLayout>
  );
}
