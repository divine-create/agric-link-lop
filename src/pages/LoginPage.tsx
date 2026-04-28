import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Building2, 
  Truck, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '@/src/lib/utils';
import Navbar from '../components/Navbar';

type Persona = 'business' | 'provider' | 'individual' | 'admin';

export default function LoginPage() {
  const [persona, setPersona] = useState<Persona>('individual');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/dashboard/${persona}`);
    }, 1500);
  };

  const personas = [
    { 
      id: 'individual' as Persona, 
      label: 'Casual Shipping', 
      desc: 'For personal items & small parcels', 
      icon: User,
      benefit: 'No contract required • Pay-as-you-go'
    },
    { 
      id: 'business' as Persona, 
      label: 'Business Console', 
      desc: 'For high-volume bulk orchestration', 
      icon: Building2,
      benefit: 'Volume discounts • API integration'
    },
    { 
      id: 'provider' as Persona, 
      label: 'Provider Hub', 
      desc: 'For fleet owners & dispatch riders', 
      icon: Truck,
      benefit: 'Guaranteed volume • Instant payouts'
    },
    { 
      id: 'admin' as Persona, 
      label: 'System Admin', 
      desc: 'Infrastructure & Protocol Control', 
      icon: ShieldCheck,
      benefit: 'Root access • System governance'
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24 items-center">
          
          {/* Brand/Value Side */}
          <div className="hidden lg:block space-y-12">
            <div>
              <h1 className="font-display font-extrabold text-[56px] leading-tight text-on-surface mb-6">
                Join the <span className="text-primary italic">Intelligence</span> Layer.
              </h1>
              <p className="font-sans text-xl text-on-surface/60 max-w-lg leading-relaxed">
                Whether you're shipping a single gift or orchestrating a national supply chain, LOP provides the precision infrastructure you need.
              </p>
            </div>

            <div className="space-y-8">
               {[
                 { icon: ShieldCheck, title: 'Verified Nodes', desc: 'Every provider is pre-vetted through our 12-point security mesh.' },
                 { icon: Zap, title: 'Real-time Telemetry', desc: 'Ultra-precise tracking with sub-meter accuracy in major hubs.' },
                 { icon: Globe, title: 'Pan-African Reach', desc: 'Orchestrating movement across the entire West African corridor.' }
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-6 items-start">
                   <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0"><item.icon size={24} /></div>
                   <div>
                     <h4 className="font-display font-bold text-lg text-on-surface">{item.title}</h4>
                     <p className="text-sm text-on-surface/50 leading-relaxed max-w-sm">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Login Card */}
          <div className="space-y-8">
            <Card className="p-8 md:p-10 bg-surface-low shadow-2xl border border-outline-variant/5">
              <div className="mb-10">
                <h2 className="font-display font-bold text-2xl mb-2">Access Platform.</h2>
                <p className="text-sm text-on-surface/40">Select your operational tier to continue.</p>
              </div>

              {/* Persona Selector */}
              <div className="grid grid-cols-1 gap-3 mb-10">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl transition-all border group flex items-center gap-4",
                      persona === p.id 
                        ? "bg-primary/5 border-primary shadow-[0_0_0_1px_rgba(45,90,46,1)]" 
                        : "bg-surface-high border-outline-variant/10 hover:border-outline-variant/30"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                      persona === p.id ? "bg-primary text-white scale-110" : "bg-surface-highest text-on-surface/20"
                    )}>
                      <p.icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-on-surface mb-0.5">{p.label}</p>
                      <p className="text-[10px] text-on-surface/40 font-bold uppercase tracking-widest">{p.desc}</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                      persona === p.id ? "bg-primary text-white" : "border-2 border-outline-variant/20"
                    )}>
                      {persona === p.id && <CheckCircle2 size={12} />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
                    <input 
                      required
                      type="password" 
                      placeholder="Security Credentials" 
                      className="w-full pl-12 pr-4 py-4 bg-surface-highest/50 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 text-base gap-3 shadow-xl shadow-primary/20"
                >
                  {isLoading ? 'Decrypting Access...' : `Continue as ${persona.charAt(0).toUpperCase() + persona.slice(1)}`}
                  {!isLoading && <ArrowRight size={20} />}
                </Button>

                <div className="flex items-center justify-between px-1">
                   <Link to="/register" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4">Create New Account</Link>
                   <a href="#" className="text-xs font-bold text-on-surface/40 uppercase tracking-widest hover:text-on-surface transition-colors">Forgot Credentials?</a>
                </div>
              </form>

              <AnimatePresence>
                {persona && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 pt-8 border-t border-outline-variant/10 text-center"
                  >
                     <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-relaxed">
                        Persona Reward: {personas.find(p => p.id === persona)?.benefit}
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            <div className="flex items-center justify-center gap-4 text-on-surface/30">
               <span className="w-10 h-px bg-outline-variant/20"></span>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Platform Compliance</p>
               <span className="w-10 h-px bg-outline-variant/20"></span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
