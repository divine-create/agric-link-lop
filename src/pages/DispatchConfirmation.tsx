import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Box, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CreditCard,
  Wallet,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  Star,
  Navigation
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '@/src/lib/utils';
import Navbar from '../components/Navbar';

export default function DispatchConfirmation() {
  const [isDeploying, setIsDeploying] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeploying(false);
    }, 3500); // Simulate "Deployment to Corridors"
    return () => clearTimeout(timer);
  }, []);

  const dispatchDetails = {
    id: 'LOP-NG-49202-X',
    timestamp: new Date().toLocaleString(),
    corridor: 'Lagos Island → Abuja Central',
    carrier: 'GIG Logistics',
    nodeStatus: 'Active - Transmitting',
    hash: '0x8f2d...4e1a'
  };

  if (isDeploying) {
    return (
      <div className="min-h-screen bg-on-surface flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center space-y-8 max-w-md"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Truck size={40} className="text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display font-black text-4xl uppercase tracking-tighter">Deploying Haul.</h1>
            <p className="text-on-surface/50 font-mono text-xs uppercase tracking-[0.3em]">Synching with network corridors...</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4 backdrop-blur-sm">
            <div className="flex justify-between items-center text-[10px] font-mono opacity-50 uppercase tracking-widest">
              <span>Node Handshake</span>
              <span className="text-emerald-400">Verified</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono opacity-50 uppercase tracking-widest">
              <span>SLA Propagation</span>
              <span className="text-emerald-400">Verifying...</span>
            </div>
            <div className="h-[2px] bg-white/5 w-full"></div>
            <div className="flex justify-between items-center text-[10px] font-mono opacity-50 uppercase tracking-widest">
              <span>Carrier Sync</span>
              <span className="text-emerald-400">Pending</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />

      <main className="pt-24 md:pt-40 pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-16">
          
          {/* Success Header */}
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/20"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="font-display font-black text-[56px] leading-[0.9] text-on-surface tracking-tighter">
                HAUL DEPLOYED<br />SUCCESSFULLY.
              </h1>
              <p className="font-sans text-on-surface/60 text-lg max-w-lg mx-auto">
                Protocol initiated. Your package payload is now integrated into the West African corridor mesh.
              </p>
            </motion.div>
          </div>

          {/* Infrastructure Receipt */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-0 border-outline-variant/10 overflow-hidden bg-surface-low shadow-2xl text-left">
              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Dispatch Control ID</p>
                  <p className="font-display font-black text-2xl tracking-tight">{dispatchDetails.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Status</p>
                  <p className="font-display font-bold text-lg uppercase tracking-wider">{dispatchDetails.nodeStatus}</p>
                </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.2em] mb-2">Primary Corridor</h4>
                    <p className="font-display font-bold text-lg flex items-center gap-2">
                       <Navigation size={16} className="text-primary" /> {dispatchDetails.corridor}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.2em] mb-2">Assigned Node</h4>
                    <p className="font-display font-bold text-lg flex items-center gap-2">
                       <Truck size={16} className="text-secondary" /> {dispatchDetails.carrier}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.2em] mb-2">Network Timestamp</h4>
                    <p className="font-sans font-bold text-on-surface/70 truncate">{dispatchDetails.timestamp}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.2em] mb-2">Protocol Hash</h4>
                    <p className="font-mono text-xs text-on-surface/40 bg-surface-highest p-2 rounded-lg break-all">
                       {dispatchDetails.hash}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface-highest/30 border-t border-outline-variant/5 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link to={`/track/${dispatchDetails.id}`} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full gap-3">
                       Live Tracking Canvas <ArrowRight size={20} />
                    </Button>
                 </Link>
                 <Link to="/dashboard/business" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full">Dashboard Overview</Button>
                 </Link>
              </div>
            </Card>
          </motion.div>

          <p className="text-[11px] font-bold text-on-surface/20 uppercase tracking-[0.3em]">
             Orchestrating West African Mobility Infrastructure
          </p>

        </div>
      </main>
    </div>
  );
}
