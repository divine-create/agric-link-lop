import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Box, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Users, 
  Activity, 
  Navigation, 
  CheckCircle2,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface selection:bg-secondary/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03]">
           <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] adire-texture rotate-12" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center md:text-left grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 md:space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 border border-primary/10 text-primary rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(45,90,46,0.5)]"></div>
                <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] leading-none">The Intelligence Layer for Africa</span>
              </div>

              <h1 className="font-display font-extrabold text-[48px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.9] text-on-surface tracking-tighter">
                National Scale <br />
                <span className="text-primary italic">Movement</span>.
              </h1>

              <p className="font-sans text-lg md:text-xl text-on-surface/60 max-w-xl leading-relaxed">
                LOP is the orchestration engine for West Africa's modern supply chain. We provide high-fidelity tracking, API-first infrastructure, and verified node coordination.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base shadow-2xl shadow-primary/20 group">
                    Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-10 text-base">
                    View Pricing
                  </Button>
                </Link>
              </div>

              <div className="pt-12 md:pt-16 flex flex-wrap justify-center md:justify-start gap-8 md:gap-16">
                {[
                  { label: 'Orchestrated', val: '1.4M+' },
                  { label: 'Verified Nodes', val: '6.2k' },
                  { label: 'Latency', val: '42ms' },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-[32px] md:text-[40px] font-display font-extrabold text-on-surface tracking-tighter leading-none">{stat.val}</p>
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-on-surface/30">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 5, y: 40 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[5/6] bg-primary-container rounded-[3rem] overflow-hidden adire-texture p-6 flex flex-col justify-end shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80" 
                  alt="Ports of Lagos" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay grayscale group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-container to-transparent opacity-60"></div>
                
                <Card className="relative z-10 w-full p-6 animate-float bg-white/90 backdrop-blur-md border-0 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                        <Navigation size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Live Node</p>
                        <p className="font-display font-bold text-xl text-on-surface">Lagos Hub B-4</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[28px] font-display font-extrabold text-primary leading-none">84.2%</p>
                       <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest mt-1">Load Status</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
                        <span>Utilization</span>
                        <span>Capacity</span>
                     </div>
                     <div className="w-full h-2 bg-surface-highest rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '84.2%' }}
                          transition={{ duration: 2, delay: 0.5 }}
                          className="h-full bg-primary"
                        />
                     </div>
                  </div>
                </Card>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -top-12 -left-12 p-6 bg-secondary text-white rounded-[2rem] shadow-2xl animate-float fill-secondary" style={{ animationDelay: '1s' }}>
                 <Users size={32} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 md:py-20 bg-surface border-y border-outline-variant/10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.3em]">Powering West Africa's Largest Nodes</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
             {['DHL', 'MAERSK', 'FEDEX', 'GIGL', 'CHOPNOW'].map((brand, i) => (
               <span key={i} className="text-2xl md:text-3xl font-display font-black tracking-tighter opacity-60 hover:opacity-100 transition-opacity cursor-default uppercase">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 md:py-48 bg-surface-low overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
           <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] h-full">
              {Array.from({ length: 400 }).map((_, i) => (
                <div key={i} className="aspect-square border-[0.5px] border-on-surface"></div>
              ))}
           </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-20 items-start">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] pl-1">Capabilities</div>
                  <h2 className="font-display font-extrabold text-[40px] md:text-[64px] leading-[0.95] text-on-surface">
                    Built for <span className="text-primary italic">Frictionless</span> Infrastructure.
                  </h2>
                </div>
                <p className="text-lg text-on-surface/50 leading-relaxed font-sans max-w-sm">
                  We've removed the technical overhead of logistics. Access national-scale movement through a single dashboard or a few lines of code.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                 {[
                   { 
                     icon: ShieldCheck, 
                     title: "Asset Guardian", 
                     desc: "High-integrity cargo tracking with integrated biometric security nodes.",
                     accent: "bg-primary"
                   },
                   { 
                     icon: Activity, 
                     title: "Predictive Analytics", 
                     desc: "Machine learning algorithms that anticipate corridor congestion before it happens.",
                     accent: "bg-secondary"
                   },
                   { 
                     icon: Globe, 
                     title: "Mesh Fulfillment", 
                     desc: "Distributed micro-hubs across major West African cities for sub-60min delivery.",
                     accent: "bg-surface-highest"
                   },
                   { 
                     icon: Zap, 
                     title: "Encrypted Finance", 
                     desc: "Instant bank-level settlements for every completed haul with 0% risk.",
                     accent: "bg-primary"
                   }
                 ].map((feature, idx) => (
                   <Card key={idx} className="p-8 md:p-10 bg-surface border border-outline-variant/10 space-y-8 group hover:border-primary/30 transition-all shadow-sm hover:shadow-2xl hover:translate-y-[-8px]">
                      <div className={cn(
                        "w-16 h-16 rounded-3xl flex items-center justify-center text-white transition-all shadow-lg group-hover:scale-110",
                        feature.accent
                      )}>
                        <feature.icon size={28} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-display font-bold text-2xl text-on-surface leading-tight">{feature.title}</h3>
                        <p className="text-sm text-on-surface/50 leading-relaxed font-sans">{feature.desc}</p>
                      </div>
                   </Card>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Operational Tiers Section */}
      <section className="bg-surface relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-32 md:py-48">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
             <h2 className="font-display font-extrabold text-[40px] md:text-[64px] leading-[0.95] text-on-surface mb-8 tracking-tighter">
                Orchestrate your role in the <br /> <span className="text-primary italic">Movement Economy</span>.
             </h2>
             <p className="text-lg text-on-surface/50 font-sans px-4">Choose your operational tier and gain access to the LOP intelligence layer instantly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14 items-stretch">
            
            {/* Business Card */}
            <motion.div whileHover={{ y: -12 }} className="group relative">
              <Card className="h-full bg-primary-container text-white adire-texture p-10 md:p-12 relative overflow-hidden border-0 flex flex-col items-start gap-12 z-10 transition-transform duration-500 shadow-xl group-hover:shadow-[0_40px_80px_-20px_rgba(45,90,46,0.5)]">
                 <div className="space-y-6 flex-1">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"><Box size={32} /></div>
                   <h3 className="font-display font-extrabold text-[32px] md:text-[40px] leading-[1.1] tracking-tighter">Scale without <br /> speed-bumps.</h3>
                   <p className="text-base opacity-70 leading-relaxed font-sans">For high-volume bulk orchestration. Manage thousands of shipments with zero stress.</p>
                 </div>
                 <Link to="/login" className="w-full">
                    <Button variant="primary" size="lg" className="w-full bg-white text-primary-container hover:bg-surface-container font-extrabold h-14">Business Console</Button>
                 </Link>
              </Card>
            </motion.div>

            {/* Individual Card */}
            <motion.div whileHover={{ y: -12 }} className="group relative">
              <Card className="h-full bg-surface border border-outline-variant/10 p-10 md:p-12 relative overflow-hidden flex flex-col items-start gap-12 z-10 transition-all duration-500 shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                 <div className="space-y-6 flex-1">
                   <div className="w-16 h-16 bg-surface-highest rounded-2xl flex items-center justify-center text-primary shadow-inner"><Users size={32} /></div>
                   <h3 className="font-display font-extrabold text-[32px] md:text-[40px] leading-[1.1] text-on-surface tracking-tighter">Ship anywhere, <br /> instantly.</h3>
                   <p className="text-base text-on-surface/50 leading-relaxed font-sans">For personal items & small parcels. Track gifts and marketplace sales with star reliability.</p>
                 </div>
                 <Link to="/login" className="w-full">
                    <Button variant="secondary" size="lg" className="w-full font-extrabold h-14">Individual Hub</Button>
                 </Link>
              </Card>
            </motion.div>

            {/* Provider Card */}
            <motion.div whileHover={{ y: -12 }} className="group relative">
              <Card className="h-full bg-surface-low p-10 md:p-12 relative overflow-hidden flex flex-col items-start gap-12 z-10 transition-all duration-500 border border-outline-variant/10 shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(224,122,95,0.4)]">
                 <div className="space-y-6 flex-1">
                   <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shadow-inner"><Truck size={32} /></div>
                   <h3 className="font-display font-extrabold text-[32px] md:text-[40px] leading-[1.1] text-on-surface tracking-tighter">Fleet <br /> Orchestration.</h3>
                   <p className="text-base text-on-surface/50 leading-relaxed font-sans">For fleet owners & dispatch riders. Access high-volume orders and instant settlement.</p>
                 </div>
                 <Link to="/login" className="w-full">
                    <Button variant="ghost" size="lg" className="w-full font-extrabold h-14 text-secondary hover:bg-secondary/5 border-secondary/20">Provider Console</Button>
                 </Link>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
