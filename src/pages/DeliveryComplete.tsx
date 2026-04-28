import * as React from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Star, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Package,
  Calendar,
  Zap,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Footer from '../components/Footer';

export default function DeliveryComplete() {
  const { id } = useParams();
  const trackId = id || 'LOP-NG-49202-X';

  const [rating, setRating] = React.useState(0);

  const stats = [
    { label: 'Total Distance', val: '542 KM' },
    { label: 'Network Efficiency', val: '98.2%' },
    { label: 'Transit Time', val: '22h 14m' },
    { label: 'Settlement', val: 'Complete' }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-6 max-w-[1000px] mx-auto">
        <div className="space-y-12">
          
          {/* Success Hero */}
          <div className="text-center space-y-8">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="w-32 h-32 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 relative"
            >
               <CheckCircle2 size={64} />
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 rounded-full bg-primary"
               ></motion.div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="font-display font-black text-[56px] leading-[0.9] text-on-surface tracking-tighter">
                 DELIVERY<br />COMPLETE.
              </h1>
              <p className="font-sans text-on-surface/50 text-xl max-w-lg mx-auto">
                 The payload has been successfully integrated and verified at the termination hub. Mission complete.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
            
            {/* Left: Completion Report */}
            <div className="space-y-8">
              <Card className="p-0 overflow-hidden bg-surface-low border-outline-variant/10 shadow-xl">
                 <div className="bg-surface-highest p-6 flex items-center justify-between border-b border-outline-variant/10">
                    <div>
                      <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Infrastructure ID</p>
                      <h3 className="font-display font-black text-xl text-on-surface">{trackId}</h3>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                       <Download size={14} /> Waybill PDF
                    </Button>
                 </div>
                 
                 <div className="p-8 space-y-10">
                    {/* Visual Confirmation */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.2em]">Visual Proof of Delivery</h4>
                       <div className="aspect-video w-full bg-surface-container rounded-2xl overflow-hidden relative group">
                          <img 
                            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80" 
                            alt="Delivered Package" 
                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <div className="px-4 py-2 bg-primary/90 text-white rounded-lg font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm">
                                Verified by Hub Node #ABJ-04
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Corridor Metrics */}
                    <div className="grid grid-cols-2 gap-8">
                       {stats.map((stat, i) => (
                         <div key={i} className="space-y-1">
                            <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">{stat.label}</p>
                            <p className="font-display font-black text-2xl text-on-surface">{stat.val}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </Card>

              {/* FeedBack Card */}
              <Card className="p-8 bg-surface-low border-outline-variant/10 space-y-8">
                 <div className="text-center space-y-2">
                    <h3 className="font-display font-bold text-2xl">Rate the Carrier Node</h3>
                    <p className="text-sm text-on-surface/50 max-w-xs mx-auto leading-relaxed">Your feedback helps us optimize the West African logistics mesh.</p>
                 </div>
                 
                 <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                       <button 
                         key={star}
                         onClick={() => setRating(star)}
                         className="transition-transform active:scale-95"
                       >
                         <Star 
                           size={40} 
                           fill={rating >= star ? "#f2994a" : "transparent"} 
                           className={rating >= star ? "text-secondary" : "text-on-surface/10"} 
                         />
                       </button>
                    ))}
                 </div>

                 <div className="space-y-4">
                    <textarea 
                      placeholder="Optional: Provide node-specific handling feedback..."
                      className="w-full h-24 p-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-sans"
                    ></textarea>
                    <Button variant="secondary" className="w-full py-4 text-base font-bold">Submit Assessment</Button>
                 </div>
              </Card>
            </div>

            {/* Right: Settlement Summary */}
            <aside className="space-y-8">
               <Card className="p-8 bg-on-surface text-white space-y-8 overflow-hidden relative">
                  {/* Decor */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                       <CreditCard size={20} className="text-primary" />
                       <h3 className="font-display font-bold text-lg">Settlement Complete</h3>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex justify-between text-white/50 text-xs">
                          <span>Service Charge</span>
                          <span className="text-white font-bold">₦124,500</span>
                       </div>
                       <div className="flex justify-between text-white/50 text-xs shadow-sm pb-4 border-b border-white/10">
                          <span>Node Priority Fee</span>
                          <span className="text-white font-bold">₦2,500</span>
                       </div>
                       <div className="flex justify-between items-end pt-2">
                          <div>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Total Paid</p>
                             <p className="font-display font-black text-4xl tracking-tighter">₦127,000</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Transaction ID</p>
                             <p className="text-[10px] font-mono opacity-40">TX-839210-NG</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="pt-4">
                     <Link to="/deliveries" className="block">
                        <Button className="w-full gap-2 h-14 bg-white text-on-surface hover:bg-surface border-0 font-bold">
                           Return to Archive <ArrowRight size={18} />
                        </Button>
                     </Link>
                  </div>
               </Card>

               <Card className="p-6 bg-surface-low border-dashed border-2 border-outline-variant/20 flex items-start gap-4">
                  <ShieldCheck size={24} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">Verification Status</p>
                    <p className="text-xs font-bold leading-relaxed">
                       This haul was verified by the recipient using biometric node protocols. Insurance has been settled.
                    </p>
                  </div>
               </Card>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
